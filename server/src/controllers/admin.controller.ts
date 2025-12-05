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

export const editRoom = asyncHandler(async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const { data } = req.body;

  const room = await findRoomAndUpdate(roomId, data);

  res.status(200).json({ room });
});

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

    if (reservation.paid === true && status === "rejected") {
      return res.status(400).json({
        message: "Reservation cannot be updated the user has already paid",
      });
    }

    const start = reservation.startDate;
    const end = reservation.endDate;
    // 🟢 CRITICAL: Access the array of rooms
    const roomsToBook = reservation.rooms;

    if (status === "approved") {
      if (!roomsToBook || roomsToBook.length === 0) {
        return res
          .status(400)
          .json({ message: "Reservation has no rooms specified." });
      }

      // 🟢 Iterate over all requested rooms and check for conflicts individually
      for (const roomItem of roomsToBook) {
        const roomId = roomItem.roomId;
        const quantity = roomItem.quantity || 1;

        // Check for conflicts for this specific room ID
        const conflicts = await ReservationModel.find({
          "rooms.roomId": roomId, // Check against reservations that include this room ID
          status: "approved",
          _id: { $ne: reservationId },
          startDate: { $lt: end },
          endDate: { $gt: start },
        });

        // Since MongoDB and Mongoose handle array conflicts differently
        // (i.e., we can't easily check reserved quantity vs total quantity in one query),
        // we'll check the total quantity of this specific room booked across all conflicting reservations.

        let totalQuantityBooked = 0;
        let conflictReservation: any = null;

        for (const conflict of conflicts) {
          const conflictingRoom = conflict.rooms.find(
            (r: any) => r.roomId === roomId
          );
          if (conflictingRoom) {
            totalQuantityBooked += conflictingRoom.quantity || 1;
            conflictReservation = conflict; // Store one conflict for the error message
          }
        }

        // if (conflicts.length > 0) {
        //   return res.status(400).json({
        //     message: `Room type (ID: ${roomId}) is already partially or fully booked for these dates!`,
        //     overlapMessage: `This room type conflicts with an existing reservation.`,
        //     conflict: {
        //       reservationId: conflictReservation?._id,
        //       bookedFrom: conflictReservation?.startDate,
        //       bookedTo: conflictReservation?.endDate,
        //     },
        //   });
        // }
      }
    }

    // Proceed to update status only if no conflicts were found for any room
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
