import mongoose from 'mongoose';

import ScryfallCardImageURIs from '../../types/interfaces/ScryfallCardImageURIs';

const ScryfallCardImageURIsSchema = new mongoose.Schema<ScryfallCardImageURIs>(
  {
    art_crop: String,
    border_crop: String,
    large: String,
    normal: String,
    png: String,
    small: String
  },
  {
    _id: false
  }
);

export default ScryfallCardImageURIsSchema;
