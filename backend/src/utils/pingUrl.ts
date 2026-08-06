import axios from "axios";

export interface PingInput {
  url: string;
  timeoutSeconds?: number; 
}

export interface PingResult {
  status: "UP" | "DOWN";
  httpStatus: number | null;
  responseTime: number;
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
      
      validateStatus: () => true, 
    });

    const responseTime = Date.now() - startTime;
    console.log(responseTime);

    
    const isUp = response.status >= 200 && response.status < 400;

    return {
      status: isUp ? "UP" : "DOWN",
      httpStatus: response.status,
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    
    return {
      status: "DOWN",
      httpStatus: null, 
      responseTime,
    };
  }
};