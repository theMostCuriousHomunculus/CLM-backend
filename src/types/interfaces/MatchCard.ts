import mongoose from 'mongoose';

import Counter from './Counter';
import FaceDown from '../enums/FaceDown';

export default interface MatchCard extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  controller: mongoose.Types.ObjectId;
  counters: mongoose.Types.Array<Counter>;
  face_down: boolean;
  face_down_image: FaceDown;
  flipped: boolean;
  isCopyToken: boolean;
  index: number;
  owner: mongoose.Types.ObjectId;
  scryfall_id: string;
  sideboarded: boolean;
  tapped: boolean;
  targets: mongoose.Types.Array<mongoose.Types.ObjectId>;
  visibility: mongoose.Types.Array<mongoose.Types.ObjectId>;
  x_coordinate: number;
  y_coordinate: number;
}
