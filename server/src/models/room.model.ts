import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  Roomtype: string;
  price: number;
  image: string[];
  description: string;
  occupancyDetails?: string;
  priceDetails?: string;
  maxInStock?: number;
  inStock?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
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
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDetails: {
      type: String,
    },
    maxInStock: {
      type: Number,
    },
    inStock: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
