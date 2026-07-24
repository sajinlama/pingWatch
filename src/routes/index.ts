// src/routes/index.ts
import { Router } from "express";
import authRouter from "../modules/auth/auth.router.ts";
import monitorsRoute from "../modules/monitors/monitors.route.ts";

const router = Router();


router.use("/auth", authRouter);
router.use("/monitor",monitorsRoute);

export default router;