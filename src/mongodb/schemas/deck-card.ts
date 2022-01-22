import mongoose from 'mongoose';

import DeckCard from '../../types/interfaces/DeckCard';

const DeckCardSchema = new mongoose.Schema<DeckCard>({
  name: {
    required: true,
    type: String
  },
  scryfall_id: {
    required: true,
    type: String
  }
});

export default DeckCardSchema;
