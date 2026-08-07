
import { pool } from "../config/db.js";
import { pingUrl } from "../utils/pingUrl.js";
import {  Worker, Job } from "bullmq";
import { connection } from "../config/redis.js";


export interface CheckJobData {
  monitorId: string;
}
interface MonitorRow {
  id: string;
  url: string;
  timeout_seconds: number;
  is_active: boolean;
  status: "UP" | "DOWN" | null;
}


export const MONITOR_QUEUE_NAME = "monitor-check"

const performCheck = async (job: Job<CheckJobData>) => {
  const { monitorId } = job.data;

  // 1. Fetch monitor details from DB
  const { rows } = await pool.query<MonitorRow>(
    `SELECT id, url, timeout_seconds, is_active, status FROM monitors WHERE id = $1`,
    [monitorId]
  );
  const monitor = rows[0];

  if (!monitor || !monitor.is_active) return;

  
  const pingResult = await pingUrl({
    url: monitor.url,
    timeoutSeconds: monitor.timeout_seconds,
  });

  // 3. Write detailed log entry
  await pool.query(
    `INSERT INTO monitor_logs (monitor_id, status, http_status, response_time, error_message)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      monitorId,
      pingResult.status,
      pingResult.httpStatus,
      pingResult.responseTime,
      pingResult.errorMessage,
    ]
  );

  // 4. Update the latest snapshot state on the monitor record
  await pool.query(
    `UPDATE monitors
     SET status = $1, http_status = $2, response_time = $3, last_checked = NOW()
     WHERE id = $4`,
    [pingResult.status, pingResult.httpStatus, pingResult.responseTime, monitorId]
  );

  const previousStatus = monitor.status;
  if (previousStatus && previousStatus !== pingResult.status) {
    console.log(
      `[Alert Trigger] Monitor ${monitorId} flipped from ${previousStatus} to ${pingResult.status}`
    );
   
  }
};

export const monitorCheckWorker = new Worker<CheckJobData>(
  MONITOR_QUEUE_NAME,
  performCheck,
  { connection}
);

monitorCheckWorker.on("failed", (job, err) => {
  console.error(`Check failed for monitor ${job?.data.monitorId}:`, err);
});