import axios from "axios";

export interface PingInput {
  url: string;
  timeoutSeconds?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}

export interface PingResult {
  status: "UP" | "DOWN";
  httpStatus: number | null;
  responseTime: number;
  errorMessage: string | null;
}

// Helper utility to pause execution using setTimeout
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const pingUrl = async ({
  url,
  timeoutSeconds = 15,
  maxRetries = 3,
  retryDelayMs = 15000, // 15 seconds
}: PingInput): Promise<PingResult> => {
  let lastResult: PingResult = {
    status: "DOWN",
    httpStatus: null,
    responseTime: 0,
    errorMessage: "No attempts made",
  };
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const startTime = Date.now();

    try {
      const response = await axios({
        method: "HEAD",
        url,
        timeout: timeoutSeconds * 1000,
        headers: {
          "User-Agent": "UptimeBot/1.0",
        },
        validateStatus: () => true,
      });

      const responseTime = Date.now() - startTime;
      const isUp = response.status >= 200 && response.status < 400;

      lastResult = {
        status: isUp ? "UP" : "DOWN",
        httpStatus: response.status,
        responseTime,
        errorMessage: isUp ? null : `HTTP Status Code ${response.status}`,
      };

      // If the target responded with a success/redirect status, return immediately
      if (isUp) {
        return lastResult;
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error during check";

      lastResult = {
        status: "DOWN",
        httpStatus: null,
        responseTime,
        errorMessage,
      };
    }

    // If it is down and we haven't reached the final retry, wait 15 seconds before trying again
    if (attempt < maxRetries) {
      await sleep(retryDelayMs);
    }
  }

  return lastResult;
};