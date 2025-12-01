import { Router } from "express";
import {
  addReservation,
  addReservationWithEmail,
  cancelReservation,
  getMyReservation,
  getRooms,
} from "../controllers/reservation.controller";
import { authenticate, userAllowed } from "../middleware/auth.middleware";

const router = Router();

router.post("/email-add", addReservationWithEmail);
router.get("/rooms", getRooms);

router.use(authenticate);
router.use(userAllowed);

router.get("/", getMyReservation);
router.post("/add", addReservation);
router.post("/cancel", cancelReservation);

export default router;
