import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.ts"

const app: Express = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

// 4. Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, 
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes ───────────────────────────────────────────
// All module routes (Auth, Monitors, Logs, Notifications) mounted under /api/v1
app.use("/api/v1", routes);

// ── 404 Fallback Handler ─────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}); 

// ── Centralized Error Handler Middleware ─────────────────
// Catches errors thrown by AppError or express-async-handler


export default app;