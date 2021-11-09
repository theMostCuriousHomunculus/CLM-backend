import { Types } from 'mongoose';

export default interface CubeCard {
  _id: Types.ObjectId;
  cmc?: number;
  color_identity?: string[];
  name: string;
  notes: string;
  scryfall_id: string;
  type_line?: string;
}
