import mongoose from 'mongoose';

import CubeCard from './CubeCard';
import Module from './Module';
import Rotation from './Rotation';

export default interface Cube extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  creator: mongoose.Types.ObjectId;
  description: string;
  mainboard: mongoose.Types.DocumentArray<CubeCard>;
  modules: mongoose.Types.DocumentArray<Module>;
  name: string;
  published: boolean;
  rotations: mongoose.Types.DocumentArray<Rotation>;
  sideboard: mongoose.Types.DocumentArray<CubeCard>;
}
