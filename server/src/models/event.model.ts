import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
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
  },
  {
    timestamps: true,
  }
);

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);

export const createNewEvent = async (data: any) => {
  const event = await EventModel.create(data);
  return event;
};

export const fetchAllEvents = async () => {
  const events = await EventModel.find();
  return events;
};

export const deleteEventById = async (eventId: string) => {
  const event = await EventModel.findByIdAndDelete(eventId);
  return event;
};

export const updateEventById = async (eventId: string, data: any) => {
  const event = await EventModel.findByIdAndUpdate(eventId, data, {
    new: true,
  });
  return event;
};

export const findEventById = async (eventId: string) => {
  const event = await EventModel.findById(eventId);
  return event;
};

export const fetchHighlights = async () => {
  const highlights = await EventModel.find({ showcase: true });
  return highlights;
};
