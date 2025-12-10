import { config } from "dotenv";
config(); // Load environment variables before importing env config

import mongoose from "mongoose";
import { MONGO_URI } from "../config/env";
import { AdminModel } from "../models/admin.model";

const admin = {
  email: "miliresorts.ofc@gmail.com",
  password: "mili123",
};

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("Clearing existing admin...");
    await AdminModel.deleteMany({});

    console.log("Inserting admin...");
    await AdminModel.insertOne(admin);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
