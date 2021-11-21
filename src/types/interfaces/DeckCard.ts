import { Types } from 'mongoose';

export default interface DeckCard extends Types.Subdocument {
  _id: Types.ObjectId;
  name: string;
  scryfall_id: string;
}
