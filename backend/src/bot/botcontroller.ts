import { Response } from "express"
import { AuthenticatedRequest } from "../middleware/auth.middleware"
import { createTelegramLinkCode, getTelegramLinkStatus } from "./botService"

export const GetCode = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId!
    const code = await createTelegramLinkCode(userId)

    return res.status(200).json({
      success: true,
      code,
    })
  } catch (err) {
    console.error("GetCode error:", err)
    return res.status(500).json({
      success: false,
      message: "Failed to generate code",
    })
  }
}

// Frontend polls this after showing the code, to know when linking is done
export const getConnectionStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId!
    const connected = await getTelegramLinkStatus(userId);
    console.log(connected,"this is connected")

    return res.status(200).json({
      success: true,
      connected,
    })
  } catch (err) {
    console.error("getConnectionStatus error:", err)
    return res.status(500).json({
      success: false,
      message: "Failed to check status",
    })
  }
}