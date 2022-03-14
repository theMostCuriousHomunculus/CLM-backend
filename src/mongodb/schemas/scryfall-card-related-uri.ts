import mongoose from 'mongoose';

import ScryfallCardRelatedURI from '../../types/interfaces/ScryfallCardRelatedURI';

const ScryfallCardRelatedURISchema =
  new mongoose.Schema<ScryfallCardRelatedURI>(
    {
      site: {
        required: true,
        type: String
      },
      uri: {
        required: true,
        type: String
      }
    },
    {
      _id: false
    }
  );

export default ScryfallCardRelatedURISchema;
