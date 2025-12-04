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

// export const createReservation = async (data: any) => {
//   // const room = await RoomModel.findById(data.roomId);
//   // if (!room) {
//   //   throw new AppError("Room not found", 404);
//   // }

//   const startDate = new Date(data.startDate);
//   const endDate = new Date(data.endDate);

//   if (startDate < new Date()) {
//     throw new AppError("Start date cannot be in the past", 400);
//   }

//   if (endDate < startDate) {
//     throw new AppError("End date cannot be before start date", 400);
//   }

//   const reservations = await ReservationModel.find({
//     roomId: data.room.roomId,
//     status: "approved",
//     $or: [
//       { startDate: { $gte: startDate, $lt: endDate } },
//       { endDate: { $gt: startDate, $lte: endDate } },
//     ],
//   });

//   if (reservations.length > 0) {
//     throw new AppError("Room is already reserved", 400);
//   }
//   const newReservation = await ReservationModel.create({
//     ...data,
//     // amount: room.price,
//   });
//   newReservation.save();
//   return newReservation;
// };

export const createReservation = async (data: {
  user: {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  roomIds: string[];
  startDate: string | Date;
  endDate: string | Date;
  adult: number;
  children: number;
  notes?: string;
  amount?: number;
}) => {
  // Ensure roomIds is an array
  const roomIdsArray = Array.isArray(data.roomIds) ? data.roomIds : [];
  if (roomIdsArray.length === 0) {
    throw new AppError("No rooms selected", 400);
  }

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (startDate < new Date()) {
    throw new AppError("Start date cannot be in the past", 400);
  }
  if (endDate < startDate) {
    throw new AppError("End date cannot be before start date", 400);
  }

  // Check for overlapping reservations
  const overlappingReservations = await ReservationModel.find({
    roomId: { $in: roomIdsArray },
    status: "approved",
    $or: [
      { startDate: { $gte: startDate, $lt: endDate } },
      { endDate: { $gt: startDate, $lte: endDate } },
      { startDate: { $lte: startDate }, endDate: { $gte: endDate } }, // fully overlapping
    ],
  });

  if (overlappingReservations.length > 0) {
    throw new AppError(
      "One or more rooms are already reserved for these dates",
      400
    );
  }

  // Fetch room details
  const rooms: any[] = [];
  for (const roomId of roomIdsArray) {
    const room = await RoomModel.findById(roomId);
    if (!room) {
      throw new AppError(`Room not found: ${roomId}`, 404);
    }

    rooms.push({
      roomId: room._id.toString(),
      name: room.name,
      type: room.Roomtype,
      price: room.price,
      description: room.description,
    });
  }

  // Calculate total amount if not provided
  const totalAmount = data.amount ?? rooms.reduce((sum, r) => sum + r.price, 0);

  // Create reservation
  const newReservation = await ReservationModel.create({
    user: data.user,
    rooms, // array of objects
    adult: data.adult,
    children: data.children,
    notes: data.notes || "",
    startDate,
    endDate,
    amount: totalAmount,
    status: "pending", // default status
  });

  return newReservation;
};

export const fetchMyReservation = async (userId: string) => {
  const reservation = await ReservationModel.find({ "user.userId": userId });
  return reservation;
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
