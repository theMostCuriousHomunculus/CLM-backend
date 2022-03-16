import mongoose from 'mongoose';

export default interface DeckCard extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  mainboard_count: number;
  scryfall_id: string;
  sideboard_count: number;
}
