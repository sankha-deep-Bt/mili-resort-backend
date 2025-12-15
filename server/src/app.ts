import express, { Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import logger from "./config/logger";

import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import reservationRoutes from "./routes/reservation.route";
import eventRoutes from "./routes/event.route";
import paymentRoutes from "./routes/payment.route";
import galleryRoutes from "./routes/gallery.route";

import { errorHandler } from "./middleware/errorHandler";

const app = express();

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(
  morgan("combined", {
    stream: { write: (message: string) => logger.info(message) },
  })
);
app.use(
  cors({
    origin: [
      "miliresort.in",
      "http://localhost:4000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (req: Request, res) => {
  return res.status(200).json({
    message: "health Ok",
  });
});

app.get("/", (req: Request, res) => {
  return res.status(200).json({
    message: "Server is running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/reservation", reservationRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/gallery", galleryRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
