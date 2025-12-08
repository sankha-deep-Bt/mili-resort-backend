import { Router } from "express";
import express from "express";
import {
  addReservation,
  cancelReservation,
  getMyReservation,
  getRooms,
  addEnquiry,
  getEnquiries,
  deleteReservations,
  getReservationForPayment,
} from "../controllers/reservation.controller";
import { authenticate, userAllowed } from "../middleware/auth.middleware";
// import { updateReservation } from "../services/user.service";

const router = Router();

// router.post("/email-add", addReservationWithEmail);
router.get("/event-enquiry", getEnquiries);
router.get("/rooms", getRooms);
router.get("/:id", getReservationForPayment);
router.post("/event-enquiry", addEnquiry);

router.use(authenticate);
router.use(userAllowed);

router.post("/add", addReservation);
router.post("/cancel", cancelReservation);
router.get("/", getMyReservation);
// router.put("/update", updateReservation);
router.delete("/delete-cancel", deleteReservations);
router.delete("/delete-cancel/:id", deleteReservations);

export default router;
