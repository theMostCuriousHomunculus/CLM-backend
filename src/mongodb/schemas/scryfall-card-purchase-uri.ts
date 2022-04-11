import mongoose from 'mongoose';

import ScryfallCardPurchaseURI from '../../types/interfaces/ScryfallCardPurchaseURI';

const ScryfallCardPurchaseURISchema =
  new mongoose.Schema<ScryfallCardPurchaseURI>(
    {
      marketplace: {
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

export default ScryfallCardPurchaseURISchema;
