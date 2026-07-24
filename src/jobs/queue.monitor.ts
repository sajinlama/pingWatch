// src/queues/monitor.queue.ts
import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const monitorQueue = new Queue("monitor-pings", {
  connection,
});

interface SchedulePingInput {
  monitorId: string;
  url: string;
  checkIntervalSeconds: number;
}


export const scheduleMonitorCheck = async ({
  monitorId,
  url,
  checkIntervalSeconds,
}: SchedulePingInput) => {
  const intervalInMs = checkIntervalSeconds * 1000;

  await monitorQueue.add(
    "ping-check-job", 
    { monitorId, url }, 
    {
      jobId: `repeat:${monitorId}`, 
      repeat: {
        every: intervalInMs, 
      },
    }
  );
};


export const removeMonitorCheck = async (monitorId: string) => {
  const repeatableJobs = await monitorQueue.getRepeatableJobs();
  const job = repeatableJobs.find((j) => j.id === `repeat:${monitorId}`);

  if (job) {
    await monitorQueue.removeRepeatableByKey(job.key);
  }
};