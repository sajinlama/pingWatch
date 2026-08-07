import axios from "axios";

export interface PingInput {
  url: string;
  timeoutSeconds?: number;
}

export interface PingResult {
  status: "UP" | "DOWN";
  httpStatus: number | null;
  responseTime: number;
  errorMessage: string | null;
}

export const pingUrl = async ({
  url,
  timeoutSeconds = 15,
}: PingInput): Promise<PingResult> => {
  const startTime = Date.now();

  try {
    const response = await axios({
      method: "HEAD",
      url,
      timeout: timeoutSeconds * 1000,
      headers: {
        "User-Agent": "UptimeBot/1.0",
      },
      // Do not throw on 4xx/5xx status codes so we can record httpStatus accurately
      validateStatus: () => true,
    });

    const responseTime = Date.now() - startTime;
    const isUp = response.status >= 200 && response.status < 400;

    return {
      status: isUp ? "UP" : "DOWN",
      httpStatus: response.status,
      responseTime,
      errorMessage: isUp ? null : `HTTP Status Code ${response.status}`,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error during check";

    return {
      status: "DOWN",
      httpStatus: null,
      responseTime,
      errorMessage,
    };
  }
};