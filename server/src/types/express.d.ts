import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
      // audit?: {
      //   adminId?: string;
      //   action: string;
      //   entity?: string;
      //   entityId?: string | null;
      //   description?: string;
      //   oldData?: Record<string, any> | null;
      //   newData?: Record<string, any> | null;
      // };
    }
  }
}
