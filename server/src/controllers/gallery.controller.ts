import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  createNewGallery,
  deleteGalleryImageById,
  fetchAllGalleryImages,
  fetchShowcaseImages,
  findGalleryImage,
  updateGalleryImageById,
} from "../models/gallery.model";

export const addGalleryImage = asyncHandler(
  async (req: Request, res: Response) => {
    const { image } = req.body;

    const newGallery = createNewGallery({ image });

    return res.status(200).json({ message: "Image added", newGallery });
  }
);

export const deleteGalleryImage = asyncHandler(
  async (req: Request, res: Response) => {
    const imageId = req.params.imageId;
    const image = await findGalleryImage(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    await deleteGalleryImageById(imageId);
    return res.status(200).json({ message: "Image deleted" });
  }
);

export const getAllImages = asyncHandler(
  async (req: Request, res: Response) => {
    const images = await fetchAllGalleryImages();
    res.status(200).json({ images });
  }
);

export const getShowcaseImages = asyncHandler(
  async (req: Request, res: Response) => {
    const images = await fetchShowcaseImages();
    res.status(200).json({ images });
  }
);

export const setShowcaseImage = asyncHandler(
  async (req: Request, res: Response) => {
    const imageId = req.params.imageId;
    const image = await findGalleryImage(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await updateGalleryImageById(imageId, { showcase: !image.showcase });

    return res.status(200).json({ message: "Image updated" });
  }
);
