import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  userId: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ReservationSchema = new Schema<IReservation>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    roomId: {
      type: String,
      required: true,
      ref: "Room",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const ReservationModel = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);
