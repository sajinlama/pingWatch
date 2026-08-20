import { Router } from "express";
import addMonitorUrl from "./controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import getUrl from "./getAllmoitors/controller.js";



const router = Router();

router.post("/monitors", authenticate, addMonitorUrl);
router.get("/getMonitors",authenticate, getUrl)

export default router;