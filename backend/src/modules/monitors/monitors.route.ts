import { Router } from "express";
import { addMonitor } from "./monitorLog.controller.js";

const router = Router();

export default router.post("/addMonitor",addMonitor)