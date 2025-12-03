import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  Roomtype: string;
  capacity: number;
  occupancyDetails?: string;
  description?: string;
  image?: string;
  price: number;
  priceDetails?: string;
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    occupancyDetails: {
      type: String,
    },
    Roomtype: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDetails: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
