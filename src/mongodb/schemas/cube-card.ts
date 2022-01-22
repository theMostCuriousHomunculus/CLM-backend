import mongoose from 'mongoose';

import CubeCard from '../../types/interfaces/CubeCard';

const CubeCardSchema = new mongoose.Schema<CubeCard>({
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

export default CubeCardSchema;
