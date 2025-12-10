import app from "./app";

//file imports
import { PORT } from "./config/env";
import connectToDatabase from "./config/dbConnect";
import logger from "./config/logger";
import { Server } from "http";

// import { config } from "dotenv";

// const currentEnv = process.env.NODE_ENV || "development";

// if (currentEnv !== "production") {
//   config({
//     path: `./.env.${currentEnv}.local`,
//   });
// }

let server: Server | null = null;
connectToDatabase()
  .then(
    () =>
      (server = app.listen(PORT, () => {
        console.log(
          `[${
            process.env.NODE_ENV
          }] Server started successfully - http://localhost:${PORT} - ${new Date()}`
        );

        const shutdown = async (signal: string) => {
          logger.warn(`${signal} received. Shutting down server`);
          server?.close(() => {
            // logger.info("HTTP server closed");
            process.exit(0);
          });
        };

        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGINT", () => shutdown("SIGINT"));
      }))
  )
  .catch((error) => {
    console.error("[DB]Failed to connect to the database:", error);
  });
