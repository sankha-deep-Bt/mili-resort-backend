import { config } from "dotenv";
config(); // Load environment variables before importing env config

import mongoose from "mongoose";
import { MONGO_URI } from "../config/env";
import { EventModel } from "../models/event.model";

const events = [
  {
    title: "Live Music Band Nights",
    subtitle: "Lantern-lit lawn sessions",
    description:
      "Amplified guitars, neo-jazz percussion, and soulful vocalists score sunset cocktails while chefs pass seasonal tapas.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/6493e255-1bc1-49bc-a9db-2f5e02257575",
    showcase: true,
  },
  {
    title: "Baul Songs of Bengal",
    subtitle: "Earthy ektara storytellers",
    description:
      "Folk poets share Mukutmanipur legends through hypnotic rhythms under moonlit sal trees.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/0cb3ed38-45f1-46af-9a16-880d701bb2a2",
    showcase: true,
  },
  {
    title: "New Year's DJ Night Party",
    subtitle: "31 December · Exclusive for Guests",
    description:
      "A neon-lit courtyard concert featuring DJs, countdown visuals, and midnight fireworks.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/ae300c3a-3a66-4bc6-83ef-925613ffe6fb",
    showcase: true,
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("Clearing existing events...");
    await EventModel.deleteMany({});

    console.log("Inserting events...");
    await EventModel.insertMany(Object.values(events));

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
