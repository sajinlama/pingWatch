import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.ts"
import { globalLimiter } from "./middleware/ratelimiter.ts";
import helmet from "helmet";

const app: Express = express();

app.use(express.json());
app.use(helmet());


app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.set('trust proxy', 1); 
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});


app.use("/api/v1", globalLimiter ,routes);


app.use((err: Error, _req: Request, res: Response, _next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



export default app;