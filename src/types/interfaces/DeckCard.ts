import { Types } from 'mongoose';

export default interface DeckCard {
  _id: Types.ObjectId;
  name: string;
  scryfall_id: string;
}
