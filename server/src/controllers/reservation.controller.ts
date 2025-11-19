import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

export const getReservations = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("get reservations route");
  }
);

export const addReservation = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("add reservation route");
  }
);

export const cancelReservation = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("cancel reservation route");
  }
);
