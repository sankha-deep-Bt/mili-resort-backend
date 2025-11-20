import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string | null;
        role: string | null;
      };
    }
  }
}
