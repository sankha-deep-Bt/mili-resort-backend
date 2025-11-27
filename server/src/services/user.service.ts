import { ReservationModel } from "../models/reservation.model";
import { RoomModel } from "../models/room.model";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/AppError";

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
  const room = await RoomModel.findById(data.roomId);
  if (!room) {
    throw new AppError("Room not found", 404);
  }
  if (!room.isAvailable) {
    throw new AppError("Room is not available", 400);
  }
  const newReservation = await ReservationModel.create(data);
  newReservation.save();
  return newReservation;
};

export const fetchMyReservation = async (userId: string) => {
  const reservation = await ReservationModel.find({ userId });
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
