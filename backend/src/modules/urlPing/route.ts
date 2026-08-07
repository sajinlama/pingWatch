import { Router } from "express";
import { monitorQueue } from "../../jobs/queue.monitor.js";
import checkUrlStatus from "./checkUrlStatus.js";

const router = Router();

router.post("/check-Status:moniterid",checkUrlStatus)

export default router;