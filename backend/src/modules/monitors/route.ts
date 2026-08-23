import { Router } from "express";
import addMonitorUrl from "./controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import getUrl, { GetAllUrlSatus } from "./getAllmoitors/controller.js";



const router = Router();

router.post("/monitors", authenticate, addMonitorUrl);
router.get("/getMonitors",authenticate, getUrl)
router.get("/GetAllURLStauts", authenticate , GetAllUrlSatus)


export default router;