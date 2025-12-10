import { config } from "dotenv";
config(); // Load environment variables before importing env config

import mongoose from "mongoose";
import { MONGO_URI } from "../config/env";
import { OfferModel } from "../models/offer.model";

const offers = [
  {
    title: "Flat 10% Off All Rooms",
    description:
      "Book your stay now and enjoy a flat 10% discount on all room categories, including complimentary breakfast.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/595b9948-f517-4407-bec4-488fe0266a5b",
    priceLabel: "Flat 10% Off",
    ctaLabel: "Book Now",
    ctaHref: "/rooms",
  },
  {
    title: "Celebration Weekend",
    description:
      "Poolside high-tea, private bonfire dinners, and décor styling for anniversaries and milestone events.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/594daab9-4f31-4193-83e9-93b452d634ad",
    priceLabel: "Event Packages",
    ctaLabel: "Plan an Event",
    ctaHref: "/#cultural-events",
  },
  {
    title: "Gourmet Getaway",
    description:
      "Chef's tasting menus, curated beverage pairings, and late checkout for culinary-led adventures.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/9333e614-1155-4f90-be8b-1e2c47685e97",
    priceLabel: "Complimentary F&B",
    ctaLabel: "View Dining",
    ctaHref: "/dining",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("Clearing existing offers...");
    await OfferModel.deleteMany({});

    console.log("Inserting offers...");
    await OfferModel.insertMany(Object.values(offers));

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
