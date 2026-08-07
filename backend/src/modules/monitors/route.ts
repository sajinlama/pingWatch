import { Router } from "express";
import addMonitorUrl from "./controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";



const router = Router();

router.post("/monitors", authenticate, addMonitorUrl);

export default router;