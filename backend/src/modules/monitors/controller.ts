import { Response } from "express";
import { createMonitorSchema } from "./validation.js";
import createMonitorUrl from "./service.js";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

const addMonitorUrl = async (req: AuthenticatedRequest, res: Response) => {
  const parsed = createMonitorSchema.safeParse(req.body);

  if (!parsed.success) {
    const flatErrors = parsed.error.flatten();

    return res.status(400).json({
      message: "Validation failed",
      errors: {
        ...flatErrors.fieldErrors,
        ...(flatErrors.formErrors.length > 0 ? { root: flatErrors.formErrors } : {}),
      },
    });
  }

  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const monitor = await createMonitorUrl({
      ...parsed.data,
      user_id: userId,
    });

    return res.status(201).json({
      message: "Monitor created",
      data: monitor,
    });
  } catch (error) {
    console.error(error);

    if ((error as { code?: string }).code === "23505") {
      return res.status(409).json({
        message: "You already have a monitor for this URL",
      });
    }

    return res.status(500).json({
      message: "Failed to create monitor",
    });
  }
};

export default addMonitorUrl;