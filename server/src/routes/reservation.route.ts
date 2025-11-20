import { Router } from "express";
import {
  addReservation,
  cancelReservation,
  getMyReservation,
} from "../controllers/reservation.controller";
import { authenticate, userAllowed } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(userAllowed);

router.get("/", getMyReservation);
router.post("/add", addReservation);
router.post("/cancel", cancelReservation);

export default router;
