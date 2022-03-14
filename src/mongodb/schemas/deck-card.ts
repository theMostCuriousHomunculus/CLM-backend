import mongoose from 'mongoose';

import DeckCard from '../../types/interfaces/DeckCard';

const DeckCardSchema = new mongoose.Schema<DeckCard>({
  // name: {
  //   required: true,
  //   type: String
  // },
  scryfall_id: {
    ref: 'ScryfallCardModel',
    required: true,
    type: String
  }
});

export default DeckCardSchema;
