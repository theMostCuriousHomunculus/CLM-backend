import { Types } from 'mongoose';

import Counter from './Counter';
import FaceDown from '../enums/FaceDown';

export default interface MatchCard extends Types.Subdocument {
  _id: Types.ObjectId;
  controller: Types.ObjectId;
  counters: Types.Array<Counter>;
  face_down: boolean;
  face_down_image: FaceDown;
  flipped: boolean;
  isCopyToken: boolean;
  index: number;
  owner: Types.ObjectId;
  scryfall_id: string;
  sideboarded: boolean;
  tapped: boolean;
  targets: Types.Array<Types.ObjectId>;
  visibility: Types.Array<Types.ObjectId>;
  x_coordinate: number;
  y_coordinate: number;
}
