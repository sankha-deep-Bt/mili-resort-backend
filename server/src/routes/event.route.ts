import { Router } from "express";

import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  getHighlight,
} from "../controllers/event.controller";

const router = Router();

router.get("/highlight", getHighlight);
router.get("/get-all", getAllEvents);
router.get("/get/:eventId", getEvent);
router.post("/add", addEvent);
router.put("/update", updateEvent);
router.delete("/:eventId", deleteEvent);

export default router;
