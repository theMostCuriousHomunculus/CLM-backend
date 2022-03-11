import mongoose from 'mongoose';

import ScryfallCard from '../../types/interfaces/ScryfallCard';

const { model, Schema } = mongoose;

const ScryfallCardSchema = new Schema<ScryfallCard>(/* {
  name: {
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    type: String
  }
} */);

// ScryfallCardSchema.index({ name: 'text' });

const ScryfallCardModel = model<ScryfallCard>(
  'ScryfallCard',
  ScryfallCardSchema
);

export default ScryfallCardModel;
