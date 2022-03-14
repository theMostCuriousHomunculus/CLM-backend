import mongoose from 'mongoose';

const ScryfallCardLegalitiesSchema = new mongoose.Schema(
  {
    banned: {
      required: true,
      type: [String]
    },
    legal: {
      required: true,
      type: [String]
    },
    not_legal: {
      required: true,
      type: [String]
    },
    restricted: {
      required: true,
      type: [String]
    }
  },
  {
    _id: false
  }
);

export default ScryfallCardLegalitiesSchema;
