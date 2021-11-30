import mongoose from 'mongoose';

import DeckCard from './DeckCard';

export default interface Player extends mongoose.Types.Subdocument {
  account: mongoose.Types.ObjectId;
  mainboard: mongoose.Types.DocumentArray<DeckCard>;
  packs: mongoose.Types.Array<mongoose.Types.DocumentArray<DeckCard>>;
  queue: mongoose.Types.Array<mongoose.Types.DocumentArray<DeckCard>>;
  sideboard: mongoose.Types.DocumentArray<DeckCard>;
}
