import { Router } from "express";
import {
  AddRoom,
  adminLogin,
  ChangeRoomStatus,
  changeReservationStatus,
  getAllBooking,
  getAllReservationRequest,
  getRooms,

  // getAllEvents,
  // addEvent,
  // cancelEvent,
  // deleteEvent,
  // updateEvent,
} from "../controllers/admin.controller";
import {
  addReservation,
  cancelReservation,
} from "../controllers/reservation.controller";
import { adminOnly, authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { adminLoginSchema } from "../validation/admin.schema";

const router = Router();

router.post("/login", validate(adminLoginSchema), adminLogin);

router.use(authenticate);
router.use(adminOnly);

router.get("/rooms", getRooms);
router.post("/rooms/add-room", AddRoom);
router.put("/rooms/change-status", ChangeRoomStatus);

router.get("/booking", getAllBooking);
router.get("/reservations", getAllReservationRequest);
router.post("/reservation/add/:userId", addReservation);
router.put("/reservation/cancel", cancelReservation);
router.put("/reservation/change-status", changeReservationStatus);

// router.get("/get-events", getAllEvents);
// router.post("/add-event", addEvent);
// router.put("/update-event", updateEvent);
// router.put("/cancel-event", cancelEvent);
// router.delete("/delete-event", deleteEvent);

export default router;
