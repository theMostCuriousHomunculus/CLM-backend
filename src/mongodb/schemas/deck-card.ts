import mongoose from 'mongoose';

import DeckCard from '../../types/interfaces/DeckCard';

const DeckCardSchema = new mongoose.Schema<DeckCard>({
  mainboard_count: Number,
  scryfall_id: {
    ref: 'ScryfallCardModel',
    required: true,
    type: String
  },
  sideboard_count: Number
});

export default DeckCardSchema;
