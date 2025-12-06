import mongoose, { Document, Schema } from "mongoose";

export interface IOffer extends Document {
  title: string;
  description: string;
  imageUrl: string;
  priceLabel: string;
  ctaLabel: string;
  ctaHref: string;
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },

    priceLabel: {
      type: String,
      required: true,
    },
    ctaLabel: {
      type: String,
      required: true,
    },
    ctaHref: {
      type: String,
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
