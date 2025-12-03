import { Router } from "express";

import {
  addGalleryImage,
  getAllImages,
  deleteGalleryImage,
  getShowcaseImages,
  setShowcaseImage,
} from "../controllers/gallery.controller";

const router = Router();

router.post("/add", addGalleryImage);
router.post("/", getAllImages);
router.delete("/:id", deleteGalleryImage);
router.get("/showcase", getShowcaseImages);
router.put("/showcase/:id", setShowcaseImage);

export default router;
