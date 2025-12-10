import { config } from "dotenv";
config(); // Load environment variables before importing env config

import mongoose from "mongoose";
import { MONGO_URI } from "../config/env";
import { RoomModel } from "../models/room.model";

export const ROOM_SHOWCASE = [
  {
    name: "Ground floor Executive cottage Double bed room",
    Roomtype: "Garden Deluxe Suite",
    price: 4500,
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/595b9948-f517-4407-bec4-488fe0266a5b",
    description:
      "Ground-level comfort with direct garden access. Includes breakfast.",
    capacity: 4,
    occupancyDetails: "( 2-adult & 1 kids under 5 year)",
    priceDetails: "4500/- including breakfast ( 2-adult & 1 kids under 5 year)",
    maxInStock: 3,
    inStock: 3,
  },
  {
    name: "Ground floor Executive cottage Four bed room",
    Roomtype: "Family Cottage",
    price: 5500,
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/89f4a0d1-4505-4bf7-9c06-f445bb2e93a4",
    description:
      "Elevated suites with sweeping lake vistas. Includes breakfast.",
    capacity: 8,
    occupancyDetails: "(2-adult & 1 kids under 5 year)",
    priceDetails: "5500/- including breakfast (2-adult & 1 kids under 5 year)",
    maxInStock: 3,
    inStock: 3,
  },
  {
    name: "Ground floor Deluxe room Double bed room",
    Roomtype: "Couple Cottage",
    price: 6000,
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/6546e674-a31b-4cd0-920c-ca8d3300081b",
    description: "Independent cottage with private porch. Includes breakfast.",
    capacity: 4,
    occupancyDetails: "(2-adult & 1 kids under 5 year)",
    priceDetails: "6000/- including breakfast (2-adult & 1 kids under 5 year)",
    maxInStock: 3,
    inStock: 3,
  },
  {
    name: "1st floor super Deluxe Room double bed room",
    Roomtype: "Family Cottage",
    price: 7000,
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/594daab9-4f31-4193-83e9-93b452d634ad",
    description:
      "Spacious family layout with twin sleeping zones. Includes breakfast.",
    capacity: 4,
    occupancyDetails: "(4-adult & 2 kids under 5 year)",
    priceDetails: "7000/- including breakfast (4-adult & 2 kids under 5 year)",
    maxInStock: 3,
    inStock: 3,
  },
  {
    name: "Standard AC room 1st floor & 2nd floor Double Bed",
    Roomtype: "Standard AC Double",
    price: 2500,
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/9333e614-1155-4f90-be8b-1e2c47685e97",
    description: "Minimal aesthetic with warm neutrals. Includes breakfast.",
    capacity: 4,
    occupancyDetails: "(2-adult & 1-kids under 5 year)",
    priceDetails: "2500/- including breakfast (2-adult & 1-kids under 5 year)",
    maxInStock: 3,
    inStock: 3,
  },
  {
    name: "Standard AC room 1st floor & 2nd floor Four Bed Room",
    Roomtype: "Standard AC Double",
    price: 3500,
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/19c1e9be-8454-4a15-981b-598bfe66a02c",
    description: "Standerd AC room with warm neutrals.",
    capacity: 8,
    occupancyDetails: "(2-adult & 1kids under 5 year)",
    priceDetails: "3500/- including breakfast (2-adult & 1kids under 5 year)",
    maxInStock: 3,
    inStock: 3,
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("Clearing existing rooms...");
    await RoomModel.deleteMany({});

    console.log("Inserting rooms...");
    await RoomModel.insertMany(ROOM_SHOWCASE);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
