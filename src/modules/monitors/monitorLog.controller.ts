import { Request, Response } from "express";
import { createMonitorSchema } from "./monitorlog.validation";
import { addMonitorValue } from "./monitorlog.service";

export const addMonitor = async (req: Request, res: Response) => {
  try {

    const parsedData = createMonitorSchema.safeParse(req.body);
    console.log(parsedData);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    // 2. Call service layer with validated type-safe payload
    const newMonitor = await addMonitorValue(parsedData.data);

    // 3. Return successful 201 Created response
    return res.status(201).json({
      success: true,
      message: "Monitor created successfully",
      data: newMonitor,
    });
  } catch (error: any) {
    // Handle unique constraint violation (duplicate URL for the user)
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A monitor with this URL already exists for this user.",
      });
    }

    console.error("Error creating monitor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};