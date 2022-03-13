import mongoose from 'mongoose';

import ScryfallCardColor from '../enums/scryfall-card-color.js';
import ScryfallCardFace from '../../types/interfaces/ScryfallCardFace';
import ScryfallCardImageURIsSchema from './scryfall-card-image-uris.js';
import ScryfallCardLayout from '../enums/scryfall-card-layout.js';

const ScryfallCardFaceSchema = new mongoose.Schema<ScryfallCardFace>(
  {
    artist: String,
    cmc: Number,
    color_indicator: {
      enum: ScryfallCardColor,
      type: [String]
    },
    colors: {
      enum: ScryfallCardColor,
      type: [String]
    },
    flavor_text: String,
    illustration_id: String,
    image_uris: ScryfallCardImageURIsSchema,
    layout: {
      enum: ScryfallCardLayout,
      type: String
    },
    loyalty: String,
    mana_cost: String,
    name: {
      required: true,
      type: String
    },
    oracle_id: String,
    oracle_text: String,
    power: String,
    printed_name: String,
    printed_text: String,
    printed_type_line: String,
    toughness: String,
    type_line: String,
    watermark: String
  },
  {
    _id: false
  }
);

export default ScryfallCardFaceSchema;
