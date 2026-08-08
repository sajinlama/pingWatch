import { Router } from "express"
import { GetCode, getConnectionStatus } from "./botcontroller"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

router.get("/getCode", authenticate, GetCode)
router.get("/status", authenticate, getConnectionStatus)

export default router