import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { pool } from "../../config/db";
import { monitorQueue } from "../../jobs/queue.monitor";
import { check, string } from "zod";



const checkUrlStatus = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "moniter id not found denied. No token provided.",
    });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id , check_interval_seconds FROM monitors WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Monitor not found",
      });
    }

    const checkInterval = rows[0].check_interval_seconds;
    console.log(checkInterval)

      await monitorQueue.upsertJobScheduler(
        `monitor-${id}`,
        {
          every: checkInterval * 1000,
        },
        {
          name: "check-url",
          data: {
          
              monitorId: id as string,
          },
        }
      );

    return res.status(202).json({
      success: true,
      queued: true,
    });
  } catch (error) {
    console.error("Queueing error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to queue check",
    });
  }
};

export default checkUrlStatus;
