import mongoose from 'mongoose';

import Cube from '../../types/interfaces/Cube';
import CubeCardSchema from '../schemas/cube-card.js';
import ModuleSchema from '../schemas/module.js';
import RotationSchema from '../schemas/rotation.js';

const { model, Schema } = mongoose;

const CubeSchema = new Schema<Cube>({
  creator: {
    ref: 'AccountModel',
    required: true,
    type: 'ObjectId'
  },
  description: {
    default: '',
    index: {
      collation: { locale: 'en', strength: 2 }
    },
    type: String
  },
  image: {
    ref: 'ScryfallCardModel',
    type: String
  },
  mainboard: [CubeCardSchema],
  modules: [ModuleSchema],
  name: {
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    maxlength: 64,
    required: true,
    trim: true,
    type: String
  },
  published: {
    default: true,
    type: Boolean
  },
  rotations: [RotationSchema],
  sideboard: [CubeCardSchema]
});

CubeSchema.index({ name: 'text', description: 'text' });

const CubeModel = model<Cube>('Cube', CubeSchema);

export default CubeModel;
