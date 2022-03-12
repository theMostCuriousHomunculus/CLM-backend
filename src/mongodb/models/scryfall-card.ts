import mongoose from 'mongoose';

import ScryfallCard from '../../types/interfaces/ScryfallCard';
import ScryfallCardImageURIsSchema from '../schemas/scryfall-card-image-uris';
import ScryfallCardPricesSchema from '../schemas/scryfall-card-prices';
import ScryfallCardPurchaseURIsSchema from '../schemas/scryfall-card-purchase-uris';
import ScryfallCardRarity from '../../types/enums/ScryfallCardRarity';
import ScryfallCardRelatedURIsSchema from '../schemas/scryfall-card-related-uris';
import ScryfallCardSecurityStamp from '../../types/enums/ScryfallCardSecurityStamp';
import ScryfallCardPreviewSchema from '../schemas/scryfall-card-preview';

const { model, Schema } = mongoose;

const ScryfallCardColor = ['B', 'U', 'C', 'G', 'R', 'W'];

const ScryfallCardSchema = new Schema<ScryfallCard>({
  // all_parts: [ScryfallCardRelatedCardObject],
  arena_id: Number,
  // card_faces: [ScryfallCardFaceSchema],
  cardmarket_id: Number,
  cmc: {
    required: true,
    type: Number
  },
  color_identity: {
    enum: ScryfallCardColor,
    required: true,
    type: [String]
  },
  color_indicator: {
    enum: ScryfallCardColor,
    type: [String]
  },
  colors: {
    enum: ScryfallCardColor,
    type: [String]
  },
  edhrec_rank: Number,
  hand_modifier: String,
  keywords: {
    required: true,
    type: [String]
  },
  lang: String,
  layout: {
    enum: [
      'normal',
      'split',
      'flip',
      'transform',
      'modal_dfc',
      'meld',
      'leveler',
      'class',
      'saga',
      'adventure',
      'planar',
      'scheme',
      'vanguard',
      'token',
      'double_faced_token',
      'emblem',
      'augment',
      'host',
      'art_series',
      'reversible_card'
    ],
    required: true,
    type: String
  },
  // TODO: fix this
  legalities: {
    enum: ['banned', 'legal', 'not_legal', 'restricted'],
    required: true,
    type: String
  },
  life_modifier: String,
  loyalty: String,
  mana_cost: String,
  mtgo_foil_id: Number,
  mtgo_id: Number,
  multiverse_ids: [Number],
  name: {
    required: true,
    type: String
  },
  oracle_id: {
    required: true,
    type: String
  },
  oracle_text: String,
  oversized: {
    required: true,
    type: Boolean
  },
  power: String,
  prints_search_uri: {
    required: true,
    type: String
  },
  produced_mana: {
    enum: ScryfallCardColor,
    type: [String]
  },
  reserved: {
    required: true,
    type: Boolean
  },
  rulings_uri: {
    required: true,
    type: String
  },
  scryfall_uri: {
    required: true,
    type: String
  },
  tcgplayer_etched_id: Number,
  tcgplayer_id: Number,
  toughness: String,
  type_line: {
    required: true,
    type: String
  },
  uri: {
    required: true,
    type: String
  },
  artist: String,
  booster: {
    required: true,
    type: Boolean
  },
  border_color: {
    enum: ['black', 'borderless', 'gold', 'silver', 'white'],
    required: true,
    type: String
  },
  card_back_id: {
    required: true,
    type: String
  },
  collector_number: {
    required: true,
    type: String
  },
  digital: {
    required: true,
    type: Boolean
  },
  finishes: {
    enum: ['etched', 'foil', 'glossy', 'nonfoil'],
    required: true,
    type: [String]
  },
  flavor_name: String,
  flavor_text: String,
  frame: {
    enum: ['1993', '1997', '2003', '2015', 'future'],
    required: true,
    type: String
  },
  frame_effects: {
    enum: [
      'legendary',
      'miracle',
      'nyxtouched',
      'draft',
      'devoid',
      'tombstone',
      'colorshifted',
      'inverted',
      'sunmoondfc',
      'compasslanddfc',
      'originpwdfc',
      'mooneldrazidfc',
      'waxingandwaningmoondfc',
      'showcase',
      'extendedart',
      'companion',
      'etched',
      'snow',
      'lesson'
    ],
    type: [String]
  },
  full_art: {
    required: true,
    type: Boolean
  },
  games: {
    enum: ['arena', 'mtgo', 'paper'],
    required: true,
    type: [String]
  },
  highres_image: {
    required: true,
    type: Boolean
  },
  illustration_id: String,
  image_status: {
    enum: ['highres_scan', 'lowres', 'missing', 'placeholder'],
    type: String
  },
  image_uris: ScryfallCardImageURIsSchema,
  prices: {
    required: true,
    type: ScryfallCardPricesSchema
  },
  printed_name: String,
  printed_text: String,
  printed_type_line: String,
  promo: {
    required: true,
    type: Boolean
  },
  promo_types: [String],
  purchase_uris: {
    required: true,
    type: ScryfallCardPurchaseURIsSchema
  },
  rarity: {
    enum: ScryfallCardRarity,
    required: true,
    type: String
  },
  related_uris: {
    required: true,
    type: ScryfallCardRelatedURIsSchema
  },
  released_at: Date,
  reprint: {
    required: true,
    type: Boolean
  },
  scryfall_set_uri: {
    required: true,
    type: String
  },
  set_name: {
    required: true,
    type: String
  },
  set_search_uri: {
    required: true,
    type: String
  },
  set_type: {
    required: true,
    type: String
  },
  set_uri: {
    required: true,
    type: String
  },
  _set: {
    required: true,
    type: String
  },
  set_id: {
    required: true,
    type: String
  },
  story_spotlight: {
    required: true,
    type: Boolean
  },
  textless: {
    required: true,
    type: Boolean
  },
  variation: {
    required: true,
    type: Boolean
  },
  variation_of: String,
  security_stamp: ScryfallCardSecurityStamp,
  watermark: {
    required: true,
    type: String
  },
  preview: ScryfallCardPreviewSchema
  // name: {
  //   index: {
  //     unique: true,
  //     collation: { locale: 'en', strength: 2 }
  //   },
  //   type: String
  // }
});

// ScryfallCardSchema.index({ name: 'text' });

const ScryfallCardModel = model<ScryfallCard>(
  'ScryfallCard',
  ScryfallCardSchema
);

export default ScryfallCardModel;
