import { Router } from "express";
import { monitorQueue } from "../../jobs/queue.monitor.js";
import checkUrlStatus from "./checkUrlStatus.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

// router.js
router.post("/check-Status/:id", authenticate, checkUrlStatus);

export default router;