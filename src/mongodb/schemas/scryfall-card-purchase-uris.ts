import mongoose from 'mongoose';

import ScryfallCardPurchaseURIs from '../../types/interfaces/ScryfallCardPurchaseURIs';

const ScryfallCardPurchaseURIsSchema =
  new mongoose.Schema<ScryfallCardPurchaseURIs>(
    {
      // https://mongoosejs.com/docs/schematypes.html#mixed
      any: {}
    },
    {
      _id: false
    }
  );

export default ScryfallCardPurchaseURIsSchema;
