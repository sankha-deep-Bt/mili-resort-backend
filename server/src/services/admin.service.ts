import { object } from "zod";
import { AdminModel } from "../models/admin.model";
import { ReservationModel } from "../models/reservation.model";
import { RoomModel } from "../models/room.model";
import { AppError } from "../utils/AppError";
import { findUserById } from "./user.service";
import mongoose from "mongoose";

export const findAdmin = async (email: string) => {
  const admin = await AdminModel.findOne({ email });
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
  const reservations = await ReservationModel.find();

  return reservations;
};

export const fetchReservationRequest = async () => {
  const reservations = await ReservationModel.find();
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
  return reservation;
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

export const deleteCancelledReservations = async () => {
  const reservations = await ReservationModel.deleteMany({
    status: "cancelled",
  });
  return reservations;
};
