import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createReservation,
  fetchMyReservation,
} from "../services/user.service";
import { changeRoomStatus, updateReservation } from "../services/admin.service";

export const getMyReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const reservation = await fetchMyReservation(userId);

    return res.status(200).json({ reservation });
  }
);

export const addReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId || (req.user?.userId as string);
    const { roomId, startDate, endDate } = req.body;

    const newReservation = await createReservation({
      roomId,
      userId,
      startDate,
      endDate,
    });

    return res
      .status(200)
      .json({ message: "Reservation created", data: newReservation });
  }
);

export const cancelReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const { roomId } = req.body;

    const reservation = await updateReservation(roomId, {
      status: "cancelled",
    });

    const room = await changeRoomStatus(roomId, { isAvailable: true });

    return res.status(200).json({
      message: "Reservation cancelled",
      ...reservation,
    });
  }
);
