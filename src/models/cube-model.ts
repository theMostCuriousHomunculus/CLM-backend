import { model, Schema, Types } from 'mongoose';

interface CubeCard {
  _id: Types.ObjectId;
  cmc?: number;
  color_identity?: string[];
  name: string;
  notes: string;
  scryfall_id: string;
  type_line?: string;
}

interface Module {
  _id: Types.ObjectId;
  cards: CubeCard[];
  name: string;
}

interface Rotation {
  _id: Types.ObjectId;
  cards: CubeCard[];
  name: string;
  size: number;
}

interface Cube {
  _id: Types.ObjectId;
  creator: Types.ObjectId;
  description: string;
  mainboard: CubeCard[];
  modules: Module[];
  name: string;
  published: boolean;
  rotations: Rotation[];
  sideboard: CubeCard[];
}

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
    type: Types.ObjectId
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

export { CubeModel as default, Cube, cubeCardSchema };
