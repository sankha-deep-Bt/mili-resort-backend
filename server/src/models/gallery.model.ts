import mongoose, { Document, Schema } from "mongoose";

export interface IGallery extends Document {
  image: string;
  title: string;
  description: string;
  showcase: boolean;
}

export const GallerySchema = new Schema<IGallery>({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  showcase: {
    type: Boolean,
    default: false,
  },
});

export const GalleryModel = mongoose.model<IGallery>("Gallery", GallerySchema);

export const createNewGallery = async (data: any) => {
  const gallery = await GalleryModel.create(data);
  return gallery;
};

export const findGalleryImage = async (imageId: string) => {
  const image = await GalleryModel.findById(imageId);
  return image;
};

export const deleteGalleryImageById = async (imageId: string) => {
  const image = await GalleryModel.findByIdAndDelete(imageId);
  return image;
};

export const fetchAllGalleryImages = async () => {
  const images = await GalleryModel.find();
  return images;
};

export const fetchShowcaseImages = async () => {
  const images = await GalleryModel.find({ showcase: true });
  return images;
};

export const updateGalleryImageById = async (imageId: string, data: any) => {
  const image = await GalleryModel.findByIdAndUpdate(imageId, data, {
    new: true,
  });
  return image;
};
