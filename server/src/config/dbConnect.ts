import mongoose from "mongoose";
import { MONGO_URI } from "./env";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000; // 2 seconds

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const connectToDatabase = async (): Promise<void> => {
  if (!MONGO_URI) {
    throw new Error(
      "Please provide a valid MongoDB connection string in the .env<development/production>.local."
    );
  }

  mongoose.connection.on("connected", () => {
    console.log("[DB] ✅ Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[DB] ❌ Mongoose error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[DB] ⚠️ MongoDB disconnected");
  });

  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      attempts++;
      console.log(`[DB](${attempts}/${MAX_RETRIES}) Attempting to connect...`);
      await mongoose.connect(MONGO_URI);
      return; // success → exit function so server can start
    } catch (error) {
      console.error(
        `[DB] ❌ Attempt ${attempts} failed:`,
        (error as Error).message
      );

      if (attempts < MAX_RETRIES) {
        console.log(`[DB] 🔁 Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await wait(RETRY_DELAY_MS);
      }
    }
  }

  console.error(`[DB] ❌ Failed to connect to MongoDB.`);
  process.exit(1);
};

export default connectToDatabase;
