import mongoose from 'mongoose';

import ScryfallCardRelatedURIs from '../../types/interfaces/ScryfallCardRelatedURIs';

const ScryfallCardRelatedURIsSchema =
  new mongoose.Schema<ScryfallCardRelatedURIs>(
    {
      // https://mongoosejs.com/docs/schematypes.html#mixed
      any: {}
    },
    {
      _id: false
    }
  );

export default ScryfallCardRelatedURIsSchema;
