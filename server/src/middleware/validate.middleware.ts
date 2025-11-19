import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: ZodError | any) {
      console.error(err);
      return res.status(400).json({
        message: "Validation error",
        errors: err.message,
      });
    }
  };
