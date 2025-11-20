import { ReservationModel } from "../models/reservation.model";
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
  const newReservation = await ReservationModel.create(data);
  newReservation.save();
  return newReservation;
};

export const fetchMyReservation = async (userId: string) => {
  const reservation = await ReservationModel.find({ userId });
  return reservation;
};
