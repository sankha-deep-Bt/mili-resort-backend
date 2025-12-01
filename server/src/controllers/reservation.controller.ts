import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createEnquiry,
  createReservation,
  fetchEnquiries,
  fetchMyReservation,
  findUserById,
  getReservedRoom,
} from "../services/user.service";
import {
  changeRoomStatus,
  fetchRooms,
  updateReservation,
} from "../services/admin.service";

export const getMyReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const reservation = await fetchMyReservation(userId);

    return res.status(200).json(reservation);
  }
);

export const getRooms = asyncHandler(async (req: Request, res: Response) => {
  const rooms = await fetchRooms();

  return res.status(200).json({ message: "Rooms fetched successfully", rooms });
});

export const addReservationWithEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      email,
      phoneNumber,
      startDate,
      endDate,
      adult,
      children,
      roomId,
    } = req.body;

    const room = await getReservedRoom(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });
    if (room.isAvailable === false) {
      return res
        .status(400)
        .json({ error: "Room is not available at the moment" });
    }

    // Create reservation (embed user + room)
    const newReservation = await createReservation({
      user: {
        userId: null,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
      room: {
        roomId: room._id,
        name: room.name,
        type: room.Roomtype,
        price: room.price,
        description: room.description,
      },
      adult: adult,
      children: children,
      startDate,
      endDate,
    });

    return res.status(200).json({
      message: "Reservation created",
      data: newReservation,
    });
  }
);

export const addReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId || req.params.userId;
    const { roomId, startDate, endDate, adult, children } = req.body;

    if (!userId) return res.status(400).json({ error: "User ID missing" });
    if (!roomId) return res.status(400).json({ error: "Room ID missing" });

    // Fetch user details
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch room details
    const room = await getReservedRoom(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    // Create reservation (embed user + room)
    const newReservation = await createReservation({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      room: {
        roomId: room._id,
        name: room.name,
        type: room.Roomtype,
        price: room.price,
        description: room.description,
      },
      adult: adult,
      children: children,
      startDate,
      endDate,
    });

    return res.status(200).json({
      message: "Reservation created",
      data: newReservation,
    });
  }
);

export const cancelReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const { reservationId } = req.body;

    const reservation = await updateReservation(reservationId, {
      status: "cancelled",
    });

    // const room = await changeRoomStatus(roomId, { isAvailable: true });

    return res.status(200).json({
      message: "Reservation cancelled",
      reservation,
    });
  }
);

export const addEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    phoneNumber,
    eventType,
    eventDate,
    guestCount,
    message,
  } = req.body;

  const enquiry = createEnquiry({
    name,
    email,
    phoneNumber,
    eventType,
    eventDate,
    guestCount,
    message,
  });

  return res.status(200).json({ message: "Enquiry added", data: enquiry });
});

export const getEnquiries = asyncHandler(
  async (req: Request, res: Response) => {
    const enquiries = await fetchEnquiries();

    return res
      .status(200)
      .json({ message: "Enquiries fetched", data: enquiries });
  }
);
