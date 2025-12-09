import { Router } from "express";

import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  getHighlight,
} from "../controllers/event.controller";
import { upload } from "../utils/multer";

const router = Router();

// router.get("/highlight", getHighlight);
router.get("/get-all", getAllEvents);
router.get("/event/get/:eventId", getEvent);
router.post("/event/add", upload.single("image"), addEvent);
router.put("/event/update", upload.single("image"), updateEvent);
router.delete("/event/:eventId", deleteEvent);

export default router;
