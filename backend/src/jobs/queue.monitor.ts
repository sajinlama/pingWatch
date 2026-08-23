import { Queue } from "bullmq";
import { connection } from "../config/redis.js";
import type { MonitorStatus } from "../notification/notification.service.js";

export interface CheckJobData {
  monitorId: string;
}

export interface NotificationJobData {
  monitorId: string;
  previousStatus: MonitorStatus | null;
  newStatus: MonitorStatus;
}

export const MONITOR_QUEUE_NAME = "monitor-check";

export const monitorQueue = new Queue<CheckJobData>(MONITOR_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { count: 1000, age: 3600 },
    removeOnFail: { age: 86400 },
  },
});

export const NOTIFICATION_QUEUE_NAME = "notification-alerts";

export const notificationQueue = new Queue<NotificationJobData>(NOTIFICATION_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: true,
  },
});