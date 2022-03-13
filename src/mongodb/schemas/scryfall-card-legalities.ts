import mongoose from 'mongoose';

const ScryfallCardLegalitiesSchema = new mongoose.Schema(
  {
    // https://mongoosejs.com/docs/schematypes.html#mixed
    any: {}
  },
  {
    _id: false
  }
);

export default ScryfallCardLegalitiesSchema;
