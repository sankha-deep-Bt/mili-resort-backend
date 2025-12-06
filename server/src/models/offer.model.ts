import mongoose, { Document, Schema } from "mongoose";

export interface IOffer extends Document {
  title: string;
  image: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const OfferModel = mongoose.model<IOffer>("Offer", offerSchema);

export const createNewOffer = async (offer: IOffer) => {
  const newOffer = await OfferModel.create(offer);
  return newOffer;
};

export const findOfferById = async (offerId: string) => {
  const offer = await OfferModel.findById(offerId);
  return offer;
};

export const deleteOfferById = async (offerId: string) => {
  const offer = await OfferModel.findByIdAndDelete(offerId);
  return offer;
};
