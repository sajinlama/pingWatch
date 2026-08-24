import { pool } from "../config/db.js";
import { pingUrl } from "../utils/pingUrl.js";
import { Worker, Job } from "bullmq";
import { connection } from "../config/redis.js";
import {
  NOTIFICATION_QUEUE_NAME,
  notificationQueue,
  MONITOR_QUEUE_NAME,
  CheckJobData,
  NotificationJobData,
} from "./queue.monitor.js";
import { notifyMonitorStatusChange, MonitorStatus } from "../notification/notification.service.js";

interface MonitorRow {
  id: string;
  url: string;
  timeout_seconds: number;
  is_active: boolean;
  status: MonitorStatus | null;
}

const performCheck = async (job: Job<CheckJobData>) => {
  const { monitorId } = job.data;

  const { rows } = await pool.query<MonitorRow>(
    `SELECT id, url, timeout_seconds, is_active, status FROM monitors WHERE id = $1`,
    [monitorId]
  );
  const monitor = rows[0];
  if (!monitor || !monitor.is_active) return;

  const pingResult = await pingUrl({
    url: monitor.url,
    timeoutSeconds: monitor.timeout_seconds || 30,
  });

  // Always keep the current state fresh
  await pool.query(
    `UPDATE monitors
     SET status = $1, http_status = $2, response_time = $3, last_checked = NOW()
     WHERE id = $4`,
    [pingResult.status, pingResult.httpStatus, pingResult.responseTime, monitorId]
  );

  const previousStatus = monitor.status;

  // Only touch monitor_logs when status changes
  if (previousStatus !== pingResult.status) {
    console.log(
      `[Alert Trigger] Monitor ${monitorId} flipped from ${previousStatus} to ${pingResult.status}`
    );

    await pool.query(
      `INSERT INTO monitor_logs (monitor_id, status, http_status, response_time, error_message)
       VALUES ($1, $2, $3, $4, $5)`,
      [monitorId, pingResult.status, pingResult.httpStatus, pingResult.responseTime, pingResult.errorMessage]
    );

    await notificationQueue.add(
      "send-notification",
      {
        monitorId,
        previousStatus,
        newStatus: pingResult.status,
      } satisfies NotificationJobData,
      {
        removeOnComplete: 100, // Prune old completed jobs to keep Redis lean
        removeOnFail: 50,
      }
    );
  }
};

// --- MONITOR CHECK WORKER ---
export const monitorCheckWorker = new Worker<CheckJobData>(
  MONITOR_QUEUE_NAME,
  performCheck,
  {
    connection,
    concurrency: 15,          // Number of parallel checks to process
    lockDuration: 60000,      // 60s lock window (gives HTTP timeouts ample headroom)
    lockRenewTime: 20000,     // Renew lock every 20s
    maxStalledCount: 1,       // Prevent endless zombie retries if worker restarts
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  }
);

monitorCheckWorker.on("failed", (job, err) => {
  console.error(`[Worker] Check failed for monitor ${job?.data.monitorId}:`, err.message);
});

monitorCheckWorker.on("error", (err) => {
  console.error(`[Worker Error - Monitor Queue]:`, err.message);
});

// --- NOTIFICATION DISPATCHER ---
const sendNotification = async (job: Job<NotificationJobData>) => {
  const { monitorId, previousStatus, newStatus } = job.data;
  await notifyMonitorStatusChange({ monitorId, previousStatus, newStatus });
};

export const notificationWorker = new Worker<NotificationJobData>(
  NOTIFICATION_QUEUE_NAME,
  sendNotification,
  {
    connection,
    concurrency: 5,
    lockDuration: 30000,
    lockRenewTime: 10000,
    maxStalledCount: 1,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  }
);

notificationWorker.on("failed", (job, err) => {
  console.error(`[Worker] Notification failed for monitor ${job?.data.monitorId}:`, err.message);
});

notificationWorker.on("error", (err) => {
  console.error(`[Worker Error - Notification Queue]:`, err.message);
});