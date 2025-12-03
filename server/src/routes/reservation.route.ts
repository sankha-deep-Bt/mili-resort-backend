import { Router } from "express";
import express from "express";
import {
  addReservation,
  cancelReservation,
  getMyReservation,
  getRooms,
  addEnquiry,
  getEnquiries,
} from "../controllers/reservation.controller";
import { authenticate, userAllowed } from "../middleware/auth.middleware";
import { deleteCancelledReservations } from "../services/admin.service";
import { updateReservation } from "../services/user.service";

const router = Router();

// router.post("/email-add", addReservationWithEmail);
router.get("/rooms", getRooms);
router.post("/event-enquiry", addEnquiry);
router.get("/event-enquiry", getEnquiries);

router.use(authenticate);
router.use(userAllowed);

router.get("/", getMyReservation);
router.post("/add", addReservation);
router.post("/cancel", cancelReservation);
router.put("/update", updateReservation);
router.delete("/delete-cancel", deleteCancelledReservations);

export default router;
