import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import logger from "../config/logger";

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  // Log the full error for debugging
  logger.error(`[ERROR] ${err.message}`, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    status: err instanceof AppError ? err.status : "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}), // only show stack in dev
  });
};
