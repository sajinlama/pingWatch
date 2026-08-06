// src/queues/monitor.worker.ts
import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { pingUrl } from "../utils/pingUrl.js"; 

export const monitorWorker = new Worker(
  "monitor-pings", 
  async (job) => {
   
    const { url, monitorId } = job.data;

    console.log(`[Worker] Starting ping check for ${url}...`);

    
    const result = await pingUrl({
      url: url,
      timeoutSeconds: 15,
    });

    console.log(`[Worker] ${url} is ${result.status} (${result.responseTime}ms)`);

   
  },
  { connection }
);