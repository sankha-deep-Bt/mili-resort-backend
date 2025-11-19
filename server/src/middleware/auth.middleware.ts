import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // 1. Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. If no header, check cookies

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);
    console.log(decoded?.role);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Authentication failed",
      error: (err as Error).message,
    });
  }
};

export const authorize =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.user);
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };

export const adminOnly = authorize(["admin"]);
export const userOnly = authorize(["user", "admin"]);
export const riderOnly = authorize(["rider", "admin"]);
