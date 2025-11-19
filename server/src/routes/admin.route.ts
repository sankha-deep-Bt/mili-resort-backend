import { Router } from "express";
import {
  addEvent,
  AddRoom,
  adminLogin,
  cancelEvent,
  ChangeRoomStatus,
  confirmReservation,
  deleteEvent,
  getAllEvents,
  getAllReservations,
  getRooms,
  rejectReservation,
  updateEvent,
} from "../controllers/admin.controller";
import {
  addReservation,
  cancelReservation,
} from "../controllers/reservation.controller";

const router = Router();

router.post("/login", adminLogin);

router.get("/get-rooms", getRooms);
router.post("/add-room", AddRoom);
router.put("/change-room-status", ChangeRoomStatus);

router.get("/get-reservations", getAllReservations);
router.post("/add-reservation", addReservation);
router.put("/cancel-reservation", cancelReservation);
router.put("/confirm-reservation", confirmReservation);
router.put("/reject-reservation", rejectReservation);

router.get("/get-events", getAllEvents);
router.post("/add-event", addEvent);
router.put("/update-event", updateEvent);
router.put("/cancel-event", cancelEvent);
router.delete("/delete-event", deleteEvent);

export default router;
