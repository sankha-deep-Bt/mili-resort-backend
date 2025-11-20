import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  capacity: number;
  type: string;
  description?: string;
  image?: string;
  price: number;
  floor?: number;
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
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
