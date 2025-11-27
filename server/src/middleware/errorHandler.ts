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

  // Prevent sending response twice
  if (res.headersSent) {
    return next(err);
  }

  // Log safe metadata only (no circular objects)
  logger.error(`[ERROR] ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Send safe error response
  return res.status(statusCode).json({
    status: err instanceof AppError ? err.status : "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
