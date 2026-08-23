import { AuthenticatedRequest } from "../../../middleware/auth.middleware";
import { Request, Response } from "express";
import getAllUrl from "./service";
import { tryCatch } from "bullmq";
import URLStatus from "./dashboard.service";

const getUrl = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;


        if (!userId) {
            res.status(401).json({ message: "Unauthorized: User ID missing" });
            return;
        }

        const allUrl = await getAllUrl({ id: userId });

        res.status(200).json({
            success: true,
            data: allUrl,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default getUrl;

export const  GetAllUrlSatus = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                message: "Unauthorized: User Id missing"
            });
            return;
        }

        const DashboardUrl = await URLStatus({ id: userId });

        res.status(200).json({
            data: DashboardUrl
        });

    } catch (error) {
        console.error("Error fetching URLs:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

