import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  user?: {
    _id: false;
    userId?: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  room: {
    _id: false;
    roomId: string;
    name: string;
    type: string;
    price: number;
    description: string;
  };
  startDate: Date;
  endDate: Date;
  adult: number;
  children: number;
  status: string;
  amount?: number;
  paid?: boolean;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ReservationSchema = new Schema<IReservation>(
  {
    user: {
      type: {
        _id: false,
        userId: String,
        name: String,
        email: String,
        phoneNumber: String,
      },
      required: true,
      ref: "User",
    },
    room: {
      type: {
        _id: false,
        roomId: String,
        name: String,
        Roomtype: String,
        price: Number,
        description: String,
      },
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
      enum: ["pending", "approved", "rejected", "canceled"],
      default: "pending",
    },
    adult: {
      type: Number,
      required: true,
      default: 1,
    },
    children: {
      type: Number,
      required: true,
      default: 0,
    },
    amount: {
      type: Number,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
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
