import mongoose from 'mongoose';

const cubeCardSchema = new mongoose.Schema({
  cmc: Number,
  color_identity: [String],
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

const moduleSchema = new mongoose.Schema({
  cards: [cubeCardSchema],
  name: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  }
});

const rotationSchema = new mongoose.Schema({
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

const cubeSchema = new mongoose.Schema({
  creator: {
    ref: 'Account',
    required: true,
    type: mongoose.Schema.Types.ObjectId
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

const Cube = mongoose.model('Cube', cubeSchema);

export { Cube as default, cubeCardSchema };
