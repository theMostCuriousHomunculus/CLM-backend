import mongoose from 'mongoose';

import DeckCard from '../../types/interfaces/DeckCard';

const DeckCardSchema = new mongoose.Schema<DeckCard>({
  mainboard_count: {
    default: 0,
    type: Number
  },
  maybeboard_count: {
    default: 0,
    type: Number
  },
  scryfall_id: {
    ref: 'ScryfallCardModel',
    required: true,
    type: String
  },
  sideboard_count: {
    default: 0,
    type: Number
  }
});

export default DeckCardSchema;
