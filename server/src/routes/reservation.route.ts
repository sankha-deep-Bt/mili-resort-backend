import { Router } from "express";
import {
  addReservation,
  cancelReservation,
} from "../controllers/reservation.controller";

const router = Router();

router.post("/add-reservation", addReservation);
router.post("/cancel-reservation", cancelReservation);

export default router;
