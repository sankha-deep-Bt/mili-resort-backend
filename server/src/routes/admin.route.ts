import { Router } from "express";
import {
  AddRoom,
  adminLogin,
  editRoom,
  changeReservationStatus,
  getAllBooking,
  getAllReservationRequest,
  getUser,
  getAllOffers,
  deleteOffer,
  addOffer,
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
import { upload } from "../utils/multer";

const router = Router();

router.post("/login", validate(adminLoginSchema), adminLogin);
router.get("/event/get-all", getAllEvents);

router.get("/latest-offers", getAllOffers);
router.use(authenticate);
router.use(adminOnly);

router.get("/event/get/:eventId", getEvent);
router.post("/event/add", upload.single("image"), addEvent);
router.put("/event/update", upload.single("image"), updateEvent);
router.delete("/event/:eventId", deleteEvent);

router.get("/rooms", getRooms);
router.post("/rooms/add-room", AddRoom);
router.put("/rooms/:roomId/edit", upload.single("image"), editRoom);

router.get("/users", getUser);

router.get("/booking", getAllBooking);
router.get("/reservations", getAllReservationRequest);
// router.post("/reservation/add/:userId", addReservation);
// router.put("/reservation/cancel", cancelReservation);
router.put("/reservation/change-status", changeReservationStatus);

// router.get("/latest-offers/:eventId", getEvent);
router.post("/latest-offers/add", upload.single("image"), addOffer);
// router.put("/latest-offers/update",upload.single("image"), updateOffer);
router.delete("/latest-offers/:offerId", deleteOffer);

export default router;
