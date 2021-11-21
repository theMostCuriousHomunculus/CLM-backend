import { Types } from 'mongoose';

import CubeCard from './CubeCard';
import Module from './Module';
import Rotation from './Rotation';

export default interface Cube {
  _id: Types.ObjectId;
  creator: Types.ObjectId;
  description: string;
  mainboard: Types.DocumentArray<CubeCard>;
  modules: Types.DocumentArray<Module>;
  name: string;
  published: boolean;
  rotations: Types.DocumentArray<Rotation>;
  sideboard: Types.DocumentArray<CubeCard>;
}
