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
import { findByEmail, findUserById } from "../services/user.service";

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

export const getRooms = asyncHandler(async (req: Request, res: Response) => {
  const rooms = await fetchRooms();

  return res
    .status(200)
    .json({ message: "Rooms fetched successfully", ...rooms });
});

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
    res.status(200).json({ reservation });
  }
);

export const getAllReservationRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingRequest = await fetchReservationRequest();

    res.status(200).json({ ...bookingRequest });
  }
);

export const changeReservationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { roomId, userId, status } = req.body;

    await updateReservation(roomId, { status: status });

    const user = await findUserById(userId);

    if (status === "approved") {
      await sendEmail(
        user?.email as string,
        "Reservation Approved",
        "Your reservation has been approved"
      );
    }

    const room = await findRoomAndUpdate(roomId, { isAvailable: false });

    res.status(200).json({ message: "Reservation confirmed", room });
  }
);

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
