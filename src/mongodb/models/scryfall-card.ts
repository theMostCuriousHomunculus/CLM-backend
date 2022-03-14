import mongoose from 'mongoose';

import ScryfallCard from '../../types/interfaces/ScryfallCard';
import ScryfallCardColor from '../enums/scryfall-card-color.js';
import ScryfallCardFaceSchema from '../schemas/scryfall-card-face.js';
import ScryfallCardImageURIsSchema from '../schemas/scryfall-card-image-uris.js';
import ScryfallCardLayout from '../enums/scryfall-card-layout.js';
import ScryfallCardPreviewSchema from '../schemas/scryfall-card-preview.js';
import ScryfallCardPricesSchema from '../schemas/scryfall-card-prices.js';
import ScryfallCardPurchaseURISchema from '../schemas/scryfall-card-purchase-uri.js';
import ScryfallCardRelatedURISchema from '../schemas/scryfall-card-related-uri.js';
import ScryfallCardRelatedCardObjectSchema from '../schemas/scryfall-card-related-card-object.js';
import ScryfallCardLegalitiesSchema from '../schemas/scryfall-card-legalities.js';

const { model, Schema } = mongoose;

const ScryfallCardSchema = new Schema<ScryfallCard>({
  _id: String,
  all_parts: {
    default: undefined,
    required: false,
    type: [ScryfallCardRelatedCardObjectSchema]
  },
  arena_id: Number,
  card_faces: {
    default: undefined,
    required: false,
    type: [ScryfallCardFaceSchema]
  },
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
    default: undefined,
    enum: ScryfallCardColor,
    required: false,
    type: [String]
  },
  colors: {
    default: undefined,
    enum: ScryfallCardColor,
    required: false,
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
    enum: ScryfallCardLayout,
    required: true,
    type: String
  },
  legalities: {
    required: true,
    type: ScryfallCardLegalitiesSchema
  },
  life_modifier: String,
  loyalty: String,
  mana_cost: String,
  mtgo_foil_id: Number,
  mtgo_id: Number,
  multiverse_ids: {
    default: undefined,
    required: false,
    type: [Number]
  },
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
    default: undefined,
    enum: ScryfallCardColor,
    required: false,
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
  card_back_id: String,
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
    default: undefined,
    enum: [
      'legendary',
      'miracle',
      'nyxtouched',
      'draft',
      'devoid',
      'fullart',
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
    required: false,
    type: [String]
  },
  full_art: {
    required: true,
    type: Boolean
  },
  games: {
    enum: ['arena', 'astral', 'mtgo', 'paper', 'sega'],
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
    required: true,
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
  promo_types: {
    default: undefined,
    required: false,
    type: [String]
  },
  purchase_uris: [ScryfallCardPurchaseURISchema],
  rarity: {
    enum: ['bonus', 'common', 'mythic', 'rare', 'special', 'uncommon'],
    required: true,
    type: String
  },
  related_uris: {
    required: true,
    type: [ScryfallCardRelatedURISchema]
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
  security_stamp: {
    default: undefined,
    enum: ['acorn', 'arena', 'oval', 'triangle'],
    required: false,
    type: String
  },
  watermark: String,
  preview: ScryfallCardPreviewSchema
});

const ScryfallCardModel = model<ScryfallCard>(
  'ScryfallCard',
  ScryfallCardSchema
);

export default ScryfallCardModel;
