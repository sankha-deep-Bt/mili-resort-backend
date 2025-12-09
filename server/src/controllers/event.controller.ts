import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createNewEvent,
  deleteEventById,
  fetchAllEvents,
  fetchHighlights,
  findEventById,
  updateEventById,
} from "../models/event.model";
import { uploadToCloudinary } from "../config/cloudinary";

export const getAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const events = await fetchAllEvents();
    if (!events) {
      return res.status(404).json({ message: "Events not found" });
    }
    res.status(200).json({ events });
  }
);

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const event = await findEventById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.status(200).json({ event });
});

export const addEvent = asyncHandler(async (req: Request, res: Response) => {
  const { title, subtitle, description } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    return res.status(400).json({ message: "Image is required" });
  }

  const image = await uploadToCloudinary(imagePath);
  const event = createNewEvent({ title, subtitle, description, image });

  return res.status(200).json({ message: "Event created", data: event });
});

export const cancelEvent = asyncHandler(async (req: Request, res: Response) => {
  res.send("cancel event route");
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const { title, subtitle, description, showcase } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    return res.status(400).json({ message: "Image is required" });
  }

  const image = await uploadToCloudinary(imagePath);
  const event = await updateEventById(eventId, {
    title,
    subtitle,
    description,
    image,
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json({ message: "Event updated", data: event });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const event = await deleteEventById(eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.status(200).json({ message: "Event deleted" });
});

export const getHighlight = asyncHandler(
  async (req: Request, res: Response) => {
    const highlights = await fetchHighlights();
    if (!highlights) {
      return res.status(404).json({ message: "Highlights not found" });
    }
    res.status(200).json({ highlights });
  }
);
