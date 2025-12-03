import { ReservationModel } from "../models/reservation.model";
import { RoomModel } from "../models/room.model";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

export const createUser = async (userData: {
  name: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}) => {
  const { name, email, phoneNumber, password } = userData;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // Create new user
  const newUser = new UserModel({
    name,
    email,
    phoneNumber,
    password,
  });

  await newUser.save();
  return newUser;
};

export const findByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const findUserById = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user;
};

export const createReservation = async (data: any) => {
  // const room = await RoomModel.findById(data.roomId);
  // if (!room) {
  //   throw new AppError("Room not found", 404);
  // }

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (startDate < new Date()) {
    throw new AppError("Start date cannot be in the past", 400);
  }

  if (endDate < startDate) {
    throw new AppError("End date cannot be before start date", 400);
  }

  const reservations = await ReservationModel.find({
    roomId: data.room.roomId,
    status: "approved",
    $or: [
      { startDate: { $gte: startDate, $lt: endDate } },
      { endDate: { $gt: startDate, $lte: endDate } },
    ],
  });

  if (reservations.length > 0) {
    throw new AppError("Room is already reserved", 400);
  }
  const newReservation = await ReservationModel.create({
    ...data,
    // amount: room.price,
  });
  newReservation.save();
  return newReservation;
};

// Add this import (if your file is a service)
// import { RoomModel } from './room.model';

// --- UPDATED createReservation FUNCTION ---
// export const createReservation = async (data: any) => {
//   // ... (Date Validation and initial checks remain the same) ...

//   const requestedRooms = data.rooms;
//   const roomIds = requestedRooms.map((r: any) => r.roomId);
//   const startDate = new Date(data.startDate);
//   const endDate = new Date(data.endDate);

//   // 1. Fetch total room stock for all requested rooms
//   // We assume RoomModel stores the maximum number of rooms available for that type.
//   const roomStockDetails = await RoomModel.find({ _id: { $in: roomIds } });
//   if (roomStockDetails.length !== roomIds.length) {
//     throw new AppError("One or more room IDs are invalid or not found.", 404);
//   }
//   // const roomStockMap = new Map(
//   //   roomStockDetails.map((room) => [room._id.toString(), room.stock || 1])
//   // );

//   // 2. Fetch conflicting reservations (as before)
//   const conflictingReservations = await ReservationModel.find({
//     "rooms.roomId": { $in: roomIds },
//     status: "approved",
//     $or: [
//       { startDate: { $gte: startDate, $lt: endDate } },
//       { endDate: { $gt: startDate, $lte: endDate } },
//       { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
//     ],
//   });

//   // 3. Robust Quantity Conflict Check
//   for (const requestedRoom of requestedRooms) {
//     const { roomId, name, quantity: requestedQuantity } = requestedRoom;
//     // const totalStock = roomStockMap.get(roomId.toString()) || 1;

//     let reservedCount = 0;

//     // Calculate reserved quantity during the conflicting period
//     conflictingReservations.forEach((reservation: any) => {
//       reservation.rooms.forEach((bookedRoom: any) => {
//         if (bookedRoom.roomId.toString() === roomId.toString()) {
//           reservedCount += bookedRoom.quantity || 1;
//         }
//       });
//     });

//     // CRITICAL CHECK: Does the requested amount + reserved amount exceed total stock?
//     // if (reservedCount + requestedQuantity > totalStock) {
//     //   throw new AppError(
//     //     `Only ${
//     //       totalStock - reservedCount
//     //     } of room '${name}' are available for the requested period.`,
//     //     400
//     //   );
//     // }
//   }

//   // 4. Create Reservation
//   const newReservation = await ReservationModel.create({ ...data });

//   return newReservation;
// };

export const fetchMyReservation = async (userId: string) => {
  const reservations = await ReservationModel.find({
    "user.userId": new mongoose.Types.ObjectId(userId),
  });

  return reservations;
};

export const updateReservation = async (reservationId: string, data: any) => {
  const reservation = await ReservationModel.findByIdAndUpdate(
    reservationId,
    data,
    {
      new: true,
    }
  );
  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }
  return reservation.populate({
    path: "userId",
    select: "name email",
  });
};

export const getReservedRoom = async (id: string) => {
  const rooms = await RoomModel.findById(id);
  return rooms;
};

export const findReservation = async (reservationId: string) => {
  const room = await ReservationModel.findById(reservationId);
  return room;
};
