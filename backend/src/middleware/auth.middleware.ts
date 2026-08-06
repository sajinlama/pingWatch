import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get token from cookies or Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // 3. Attach userId to the custom request property
    (req as AuthenticatedRequest).userId = decoded.sub;
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};