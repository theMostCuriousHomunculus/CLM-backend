import mongoose from 'mongoose';

import Cube from '../types/interfaces/Cube';
import CubeCard from '../types/interfaces/CubeCard';
import Module from '../types/interfaces/Module';
import Rotation from '../types/interfaces/Rotation';

const { model, Schema } = mongoose;

const cubeCardSchema = new Schema<CubeCard>({
  cmc: Number,
  color_identity: {
    default: undefined,
    type: [String]
  },
  name: {
    required: true,
    type: String
  },
  notes: {
    default: '',
    maxlength: 1000,
    trim: true,
    type: String
  },
  scryfall_id: {
    required: true,
    type: String
  },
  type_line: String
});

const moduleSchema = new Schema<Module>({
  cards: [cubeCardSchema],
  name: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  }
});

const rotationSchema = new Schema<Rotation>({
  cards: [cubeCardSchema],
  name: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  },
  size: {
    type: Number,
    required: true
  }
});

const cubeSchema = new Schema<Cube>({
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
  mainboard: [cubeCardSchema],
  modules: [moduleSchema],
  name: {
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  },
  published: Boolean,
  rotations: [rotationSchema],
  sideboard: [cubeCardSchema]
});

cubeSchema.index({ name: 'text', description: 'text' });

const CubeModel = model<Cube>('Cube', cubeSchema);

export { CubeModel as default, cubeCardSchema };
