import mongoose from 'mongoose';

export default interface CubeCard extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  cmc?: number;
  color_identity?: string[];
  name: string;
  notes: string;
  scryfall_id: string;
  type_line?: string;
}
