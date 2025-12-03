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
import { sendReservationEmail } from "../template/htmlTemplate";
import {
  createNewGallery,
  deleteGalleryImageById,
  fetchAllGalleryImages,
  fetchShowcaseImages,
  findGalleryImage,
} from "../models/gallery.model";

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
    const roomId = req.params.roomId;
    const { status } = req.body;

    const room = await findRoomAndUpdate(roomId, { isAvailable: status });

    res.status(200).json({ room });
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
    const emailHtml = await sendReservationEmail(reservation, status);

    sendEmail(
      reservation.user?.email as string,
      `Reservation ${status}`,
      emailHtml
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

// export const addGalleryImage = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { image } = req.body;

//     const newGallery = createNewGallery({ image });

//     return res.status(200).json({ message: "Image added", newGallery });
//   }
// );

// export const deleteGalleryImage = asyncHandler(
//   async (req: Request, res: Response) => {
//     const imageId = req.params.imageId;
//     const image = await findGalleryImage(imageId);
//     if (!image) {
//       return res.status(404).json({ message: "Image not found" });
//     }
//     await deleteGalleryImageById(imageId);
//     return res.status(200).json({ message: "Image deleted" });
//   }
// );

// export const getAllImages = asyncHandler(
//   async (req: Request, res: Response) => {
//     const images = await fetchAllGalleryImages();
//     res.status(200).json({ images });
//   }
// );

// export const getShowcaseImages = asyncHandler(
//   async (req: Request, res: Response) => {
//     const images = await fetchShowcaseImages();
//     res.status(200).json({ images });
//   }
// );
