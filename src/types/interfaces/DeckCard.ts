import mongoose from 'mongoose';

export default interface DeckCard extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  // name: string;
  scryfall_id: string;
}
