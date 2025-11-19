import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  res.send("Admin login route");
});

export const getRooms = asyncHandler(async (req: Request, res: Response) => {
  res.send("get rooms route");
});

export const AddRoom = asyncHandler(async (req: Request, res: Response) => {
  res.send("add room route");
});

export const ChangeRoomStatus = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("change room route");
  }
);

export const getAllReservations = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("get reservations route");
  }
);

export const confirmReservation = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("confirm reservation route");
  }
);

export const rejectReservation = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("reject reservation route");
  }
);

export const getAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("events route");
  }
);

export const addEvent = asyncHandler(async (req: Request, res: Response) => {
  res.send("add event route");
});

export const cancelEvent = asyncHandler(async (req: Request, res: Response) => {
  res.send("cancel event route");
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  res.send("update event route");
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  res.send("delete event route");
});
