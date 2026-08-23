import { Response } from "express"
import { AuthenticatedRequest } from "../../middleware/auth.middleware"
import userNotificationlist from "./service"

const userNotification = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userid = req.userId

        if (!userid) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: user token not found"
            })
            return
        }

        const allNotificationList = await userNotificationlist({ id: userid })

        res.status(200).json({
            success: true,
            data: allNotificationList
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default userNotification