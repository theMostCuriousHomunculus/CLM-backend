import mongoose from 'mongoose';

import CubeCard from './CubeCard';

export default interface Rotation extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  cards: mongoose.Types.DocumentArray<CubeCard>;
  name: string;
  size: number;
}
