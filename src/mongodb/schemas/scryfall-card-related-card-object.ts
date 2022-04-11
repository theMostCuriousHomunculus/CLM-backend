import mongoose from 'mongoose';

import ScryfallCardRelatedCardObject from '../../types/interfaces/ScryfallCardRelatedCardObject';

const ScryfallCardRelatedCardObjectSchema =
  new mongoose.Schema<ScryfallCardRelatedCardObject>({
    _id: String,
    component: {
      enum: ['combo_piece', 'meld_part', 'meld_result', 'token'],
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    type_line: {
      required: true,
      type: String
    },
    uri: {
      required: true,
      type: String
    }
  });

export default ScryfallCardRelatedCardObjectSchema;
