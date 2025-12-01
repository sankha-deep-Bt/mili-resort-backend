import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createNewRoom,
  fetchReservationRequest,
  fetchReservations,
  fetchRooms,
  findAdmin,
  findRoomAndUpdate,
  updateReservation,
} from "../services/admin.service";
import { generateTokens } from "../utils/jwt";
import { setAuthCookies } from "../utils/cookies";
import { AdminLoginInput } from "../validation/admin.schema";
import { sendEmail } from "../utils/nodemailer";
import {
  findReservation,
  findUserById,
  getReservedRoom,
} from "../services/user.service";
import { ReservationModel } from "../models/reservation.model";

export const adminLogin = asyncHandler(
  async (req: Request<{}, {}, AdminLoginInput>, res: Response) => {
    const { email, password } = req.body;

    const user = await findAdmin(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: String(user._id),
      role: "admin",
    });

    setAuthCookies({ res, accessToken, refreshToken });

    return res.status(200).json({
      message: "Admin Login successful",
      user: user.omitPassword(),
    });
  }
);

// export const getRooms = asyncHandler(async (req: Request, res: Response) => {
//   const rooms = await fetchRooms();

//   return res
//     .status(200)
//     .json({ message: "Rooms fetched successfully", rooms: rooms });
// });

export const AddRoom = asyncHandler(async (req: Request, res: Response) => {
  const { name, capacity, type, description, price, floor } = req.body;

  const newRoom = createNewRoom({
    name,
    capacity,
    type,
    description,
    price,
    floor,
  });

  return res.status(200).json({ message: "Room created", ...newRoom });
});

export const ChangeRoomStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { roomId, isAvailable } = req.body;

    const room = await findRoomAndUpdate(roomId, { isAvailable: isAvailable });

    res.status(200).json({ ...room });
  }
);

export const getAllBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const reservation = await fetchReservations();
    res.status(200).json({ reservation: reservation });
  }
);

export const getAllReservationRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingRequest = await fetchReservationRequest();

    res.status(200).json({ ...bookingRequest });
  }
);

// export const changeReservationStatus = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { reservationId, status } = req.body;

//     const reservation = await updateReservation(reservationId, {
//       status: status,
//     });

//     sendEmail(
//       reservation.user?.email as string,
//       `Reservation ${status}`,
//       `Hello ${reservation.user?.name}, Your reservation for room ${reservation.room?.name} has been ${reservation.status}.`
//     ).catch((err) => console.error("Email error:", err));

//     res.status(200).json({
//       message: "Reservation status updated",
//       reservation,
//     });
//   }
// );

export const changeReservationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { reservationId, status } = req.body;

    const reservation = await findReservation(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const roomId = reservation.room?.roomId;
    const start = reservation.startDate;
    const end = reservation.endDate;

    if (status === "approved") {
      const conflict = await ReservationModel.findOne({
        "room.roomId": roomId,
        status: "approved",
        _id: { $ne: reservationId },
        startDate: { $lt: end },
        endDate: { $gt: start },
      });

      if (conflict) {
        return res.status(400).json({
          message: "Room already booked for these dates!",
          conflict: {
            reservationId: conflict._id,
            bookedFrom: conflict.startDate,
            bookedTo: conflict.endDate,
          },
          overlapMessage: `This overlaps with an existing reservation from ${new Date(
            conflict.startDate
          ).toLocaleDateString()} to ${new Date(
            conflict.endDate
          ).toLocaleDateString()}.`,
        });
      }
    }

    const updated = await updateReservation(reservationId, { status });

    sendEmail(
      reservation.user?.email as string,
      `Reservation ${status}`,
      `Hello ${reservation.user?.name}, your reservation for room ${reservation.room?.name} has been ${status}.`
    ).catch((err) => console.error("Email error:", err));

    return res.status(200).json({
      message: "Reservation status updated",
      reservation: updated,
    });
  }
);

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await findUserById(userId);
  res.status(200).json({ user });
});

// export const getAllEvents = asyncHandler(
//   async (req: Request, res: Response) => {
//     res.send("events route");
//   }
// );

// export const addEvent = asyncHandler(async (req: Request, res: Response) => {
//   res.send("add event route");
// });

// export const cancelEvent = asyncHandler(async (req: Request, res: Response) => {
//   res.send("cancel event route");
// });

// export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
//   res.send("update event route");
// });

// export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
//   res.send("delete event route");
// });
