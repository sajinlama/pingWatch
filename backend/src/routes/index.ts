// src/routes/index.ts
import { Router } from "express";
import authRouter from "../modules/auth/auth.router.ts";
import AddUrlRoute from "../modules/monitors/route.ts"
import pingUrlStatus from "../modules/urlPing/route.ts"


const router = Router();


router.use("/auth", authRouter);
router.use("/addUrl",AddUrlRoute)
router.use("/pingUrl",pingUrlStatus)



export default router;