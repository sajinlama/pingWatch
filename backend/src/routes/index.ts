// src/routes/index.ts
import { Router } from "express";
import authRouter from "../modules/auth/auth.router.ts";
import AddUrlRoute from "../modules/monitors/route.ts"
import pingUrlStatus from "../modules/urlPing/route.ts"
import botRoutes from "../bot/botRoutes.ts"
import notificationRoutes from "../modules/notification/routes.ts"
import { authLimiter } from "../middleware/ratelimiter.ts";


const router = Router();


router.use("/auth", authLimiter,authRouter);
router.use("/addUrl",AddUrlRoute);
router.use("/tel",botRoutes)
router.use("/pingUrl",pingUrlStatus);
router.use("/notification",notificationRoutes)




export default router;