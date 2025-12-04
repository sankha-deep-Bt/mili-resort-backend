import { Router } from "express";
import {
  AddRoom,
  adminLogin,
  editRoom,
  changeReservationStatus,
  getAllBooking,
  getAllReservationRequest,
  getUser,
} from "../controllers/admin.controller";
import {
  addEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  getEvent,
} from "../controllers/event.controller";
import { getRooms } from "../controllers/reservation.controller";
import { adminOnly, authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { adminLoginSchema } from "../validation/admin.schema";

const router = Router();

router.post("/login", validate(adminLoginSchema), adminLogin);
router.get("/event/get-all", getAllEvents);
router.get("/event/get/:eventId", getEvent);
router.post("/event/add", addEvent);
router.put("/event/update", updateEvent);
router.delete("/event/:eventId", deleteEvent);

router.use(authenticate);
router.use(adminOnly);

router.get("/rooms", getRooms);
router.post("/rooms/add-room", AddRoom);
router.put("/rooms/:roomId/edit", editRoom);

router.get("/users", getUser);

router.get("/booking", getAllBooking);
router.get("/reservations", getAllReservationRequest);
// router.post("/reservation/add/:userId", addReservation);
// router.put("/reservation/cancel", cancelReservation);
router.put("/reservation/change-status", changeReservationStatus);

export default router;
