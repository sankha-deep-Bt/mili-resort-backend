import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createReservation,
  fetchMyReservation,
  findUserById,
  getReservedRoom,
} from "../services/user.service";
import {
  deleteCancelledReservations,
  fetchRooms,
  updateReservation,
} from "../services/admin.service";
import { createEnquiry, fetchEnquiries } from "../models/eventEnquiry.model";
import { RoomModel } from "../models/room.model";
import { ReservationModel } from "../models/reservation.model";

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

// export const addReservationWithEmail = asyncHandler(
//   async (req: Request, res: Response) => {
//     const {
//       name,
//       email,
//       phoneNumber,
//       startDate,
//       endDate,
//       adult,
//       children,
//       roomId,
//     } = req.body;

//     const room = await getReservedRoom(roomId);
//     if (!room) return res.status(404).json({ error: "Room not found" });
//     if (room.isAvailable === false) {
//       return res
//         .status(400)
//         .json({ error: "Room is not available at the moment" });
//     }

//     // Create reservation (embed user + room)
//     const newReservation = await createReservation({
//       user: {
//         userId: null,
//         name: name,
//         email: email,
//         phoneNumber: phoneNumber,
//       },
//       room: {
//         roomId: room._id,
//         name: room.name,
//         type: room.Roomtype,
//         price: room.price,
//         description: room.description,
//       },
//       adult: adult,
//       children: children,
//       startDate,
//       endDate,
//     });

//     return res.status(200).json({
//       message: "Reservation created",
//       data: newReservation,
//     });
//   }
// );

export const addReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId || req.params.userId;

    // 1. Expect 'rooms' to be an array of objects { roomId, quantity }
    const { rooms, startDate, endDate, adult, children, notes, food } =
      req.body;

    // --- Validation ---
    if (!userId) {
      return res.status(400).json({ error: "User ID missing" });
    }

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return res.status(400).json({ error: "Rooms must be a non-empty array" });
    }

    // Validate Date format
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (end <= start) {
      return res
        .status(400)
        .json({ error: "End date must be after start date" });
    }

    // --- Fetch Data ---

    // Fetch user (assuming findUserById is a helper you have)
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Extract just the IDs to query the database
    const roomIdsToFetch = rooms.map((r: any) => r.roomId);

    // Fetch room details from DB to get real prices
    const dbRooms = await RoomModel.find({ _id: { $in: roomIdsToFetch } });

    if (!dbRooms || dbRooms.length === 0) {
      return res.status(404).json({ error: "No valid rooms found" });
    }

    // --- Calculations ---

    // 1. Calculate Duration (Nights)
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((end.getTime() - start.getTime()) / oneDay)
    );
    const nights = diffDays > 0 ? diffDays : 1; // Ensure at least 1 night charge

    // 2. Validate Rooms & Calculate Total Amount
    let totalAmount = 0;
    const formattedRooms = [];

    for (const requestRoom of rooms) {
      const dbRoom = dbRooms.find(
        (r) => r._id.toString() === requestRoom.roomId
      );

      if (!dbRoom) {
        return res.status(404).json({
          error: `Room with ID ${requestRoom.roomId} not found`,
        });
      }

      // Check if requested quantity is available (Optional logic)
      // if (dbRoom.stock < requestRoom.quantity) ...

      // Math: Price * Quantity * Nights
      totalAmount += dbRoom.price * requestRoom.quantity * nights;

      // Prepare object for Schema
      formattedRooms.push({
        roomId: dbRoom._id.toString(),
        name: dbRoom.name,
        quantity: requestRoom.quantity,
        price: dbRoom.price,
      });
    }

    // --- Create Reservation ---
    const newReservation = await ReservationModel.create({
      user: {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      rooms: formattedRooms, // Matches [{ roomId: String, quantity: Number }]
      startDate: start,
      endDate: end,
      adult,
      children,
      notes,
      food,
      amount: totalAmount,
      status: "pending",
    });

    return res.status(200).json({
      message: "Reservation created successfully",
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

export const deleteReservations = asyncHandler(
  async (req: Request, res: Response) => {
    const reservations = await deleteCancelledReservations();
    return res.status(200).json({ message: "All reservations deleted" });
  }
);
