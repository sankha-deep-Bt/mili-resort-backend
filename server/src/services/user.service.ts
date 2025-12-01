import { Response } from "express";
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
