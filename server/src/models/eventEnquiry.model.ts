import mongoose, { Document, Schema } from "mongoose";

export interface IEventEnquiry extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  eventType: string;
  eventDate: Date;
  guestCount: number;
  message: string;
}

export const EventEnquirySchema = new Schema<IEventEnquiry>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["corporate", "pre-wedding", "wedding", "celebrations"],
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EventEnquiryModel = mongoose.model<IEventEnquiry>(
  "Event_Enquiry",
  EventEnquirySchema
);

export default EventEnquiryModel;
