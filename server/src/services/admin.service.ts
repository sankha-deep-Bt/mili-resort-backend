import { AdminModel } from "../models/admin.model";
import { ReservationModel } from "../models/reservation.model";
import { RoomModel } from "../models/room.model";
import { AppError } from "../utils/AppError";

export const findAdmin = async (username: string) => {
  const admin = await AdminModel.findOne({ username });
  return admin;
};

export const findRoomAndUpdate = async (roomId: string, data: any) => {
  const room = await RoomModel.findByIdAndUpdate(roomId, data, {
    new: true,
  });
  if (!room) {
    throw new AppError("Room not found", 404);
  }
  return room;
};

export const fetchReservations = async () => {
  const reservations = await ReservationModel.find({ status: "approved" });
  return reservations;
};

export const fetchReservationRequest = async () => {
  const reservations = await ReservationModel.find({ status: "pending" });
  return reservations;
};

export const updateReservation = async (roomId: string, data: any) => {
  const reservation = await ReservationModel.findByIdAndUpdate(roomId, data, {
    new: true,
  });
  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }
  return reservation.populate({
    path: "userId",
    select: "name email",
  });
};

export const fetchRooms = async () => {
  const rooms = await RoomModel.find();
  return rooms;
};

export const createNewRoom = async (data: any) => {
  const room = await RoomModel.create(data);
  return room;
};

export const changeRoomStatus = async (roomId: string, data: any) => {
  const room = await RoomModel.findByIdAndUpdate(roomId, data, {
    new: true,
  });
  if (!room) {
    throw new AppError("Room not found", 404);
  }
  return room;
};
