import { Queue, Worker, Job } from "bullmq";
import { connection } from "../config/redis.js";


export interface CheckJobData {
  monitorId: string;
}


export const MONITOR_QUEUE_NAME = "monitor-check";


export const monitorQueue = new Queue<CheckJobData>(MONITOR_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: { count: 1000, age: 3600 },
    removeOnFail: { age: 86400 },
  },
});
