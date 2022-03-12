import mongoose from 'mongoose';

import ScryfallCardPreview from '../../types/interfaces/ScryfallCardPreview';

const ScryfallCardPreviewSchema = new mongoose.Schema<ScryfallCardPreview>(
  {
    previewed_at: Date,
    source: String,
    source_uri: String
  },
  {
    _id: false
  }
);

export default ScryfallCardPreviewSchema;
