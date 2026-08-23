import { Request, Response, Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import userNotification from "./controller";


const router : Router= Router()

router.get("/getNotificationList", authenticate, userNotification)

export default router