import mongoose from 'mongoose';

import ScryfallCardPrices from '../../types/interfaces/ScryfallCardPrices';

const ScryfallCardPricesSchema = new mongoose.Schema<ScryfallCardPrices>(
  {
    eur: String,
    eur_foil: String,
    tix: String,
    usd: String,
    usd_etched: String,
    usd_foil: String
  },
  {
    _id: false
  }
);

export default ScryfallCardPricesSchema;
