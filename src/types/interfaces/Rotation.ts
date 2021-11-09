import { Types } from 'mongoose';

import CubeCard from './CubeCard';

export default interface Rotation extends Types.Subdocument {
  _id: Types.ObjectId;
  cards: CubeCard[];
  name: string;
  size: number;
}
