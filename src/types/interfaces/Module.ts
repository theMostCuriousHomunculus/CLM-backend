import mongoose from 'mongoose';

import CubeCard from './CubeCard';

export default interface Module extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  cards: mongoose.Types.DocumentArray<CubeCard>;
  name: string;
}
