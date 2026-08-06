import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { AppError, loginUser, registerUser } from "./authService.js";


const DEV_COOKIE_OPTIONS = {
  httpOnly: true, 
  secure: false, 
  sameSite: "lax" as const, 
  maxAge: 24 * 60 * 60 * 1000,
  
};

// ── Register ────────────────────────────────────────────────
export const UserRegister = async (req: Request, res: Response) => {
  const parsedData = registerSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsedData.error.flatten().fieldErrors,
    });
  }

  try {
    const { user, token } = await registerUser(parsedData.data);

    res.cookie("token", token, DEV_COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ── Login ───────────────────────────────────────────────────
export const userLogin = async (req: Request, res: Response) => {
  const parsedData = loginSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsedData.error.flatten().fieldErrors,
    });
  }

  try {
    const { user, token } = await loginUser(parsedData.data);

    // Set auth cookie on login
    res.cookie("token", token, DEV_COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const userLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};