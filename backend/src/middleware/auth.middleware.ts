import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
 
  

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  if (!process.env.JWT_SECRET) {
    // Fail loudly in your own code rather than letting jwt.verify throw
    // an opaque error when the secret is missing.
    console.error("JWT_SECRET is not set");
    return res.status(500).json({
      success: false,
      message: "Server configuration error.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!decoded.sub) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    // 3. Attach userId to the request
    req.userId = decoded.sub;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};