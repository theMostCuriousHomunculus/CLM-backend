import mongoose from 'mongoose';

import ScryfallCardBorderColor from '../enums/ScryfallCardBorderColor';
import ScryfallCardColor from '../enums/ScryfallCardColor';
import ScryfallCardFace from './ScryfallCardFace';
import ScryfallCardFinish from '../enums/ScryfallCardFinish';
import ScryfallCardFrame from '../enums/ScryfallCardFrame';
import ScryfallCardFrameEffect from '../enums/ScryfallCardFrameEffect';
import ScryfallCardGame from '../enums/ScryfallCardGame';
import ScryfallCardImageStatus from '../enums/ScryfallCardImageStatus';
import ScryfallCardImageURIs from './ScryfallCardImageURIs';
import ScryfallCardLanguage from '../enums/ScryfallCardLanguage';
import ScryfallCardLayout from '../enums/ScryfallCardLayout';
import ScryfallCardLegality from '../enums/ScryfallCardLegality';
import ScryfallCardPreview from './ScryfallCardPreview';
import ScryfallCardPrices from './ScryfallCardPrices';
import ScryfallCardPurchaseURIs from './ScryfallCardPurchaseURIs';
import ScryfallCardRarity from '../enums/ScryfallCardRarity';
import ScryfallCardRelatedCardObject from './ScryfallCardRelatedCardObject';
import ScryfallCardRelatedURIs from './ScryfallCardRelatedURIs';
import ScryfallCardSecurityStamp from '../enums/ScryfallCardSecurityStamp';

export default interface ScryfallCard extends mongoose.Document {
  /*
    core card fields
  */
  _id: mongoose.Types.ObjectId;
  // This card’s Arena ID, if any. A large percentage of cards are not available on Arena and do not have this ID.
  arena_id?: number;
  // A language code for this printing.
  lang: ScryfallCardLanguage;
  // This card’s Magic Online ID (also known as the Catalog ID), if any. A large percentage of cards are not available on Magic Online and do not have this ID.
  mtgo_id?: number;
  // This card’s foil Magic Online ID (also known as the Catalog ID), if any. A large percentage of cards are not available on Magic Online and do not have this ID.
  mtgo_foil_id?: number;
  // This card’s multiverse IDs on Gatherer, if any, as an array of integers. Note that Scryfall includes many promo cards, tokens, and other esoteric objects that do not have these identifiers.
  multiverse_ids?: number[];
  // This card’s ID on TCGplayer’s API, also known as the productId.
  tcgplayer_id?: number;
  // This card’s ID on TCGplayer’s API, for its etched version if that version is a separate product.
  tcgplayer_etched_id?: number;
  // This card’s ID on Cardmarket’s API, also known as the idProduct.
  cardmarket_id?: number;
  // A unique ID for this card’s oracle identity. This value is consistent across reprinted card editions, and unique among different cards with the same name (tokens, Unstable variants, etc).
  oracle_id: string;
  // A link to where you can begin paginating all re/prints for this card on Scryfall’s API.
  prints_search_uri: string;
  // A link to this card’s rulings list on Scryfall’s API.
  rulings_uri: string;
  // A link to this card’s permapage on Scryfall’s website.
  scryfall_uri: string;
  // A link to this card object on Scryfall’s API.
  uri: string;
  /*
    gameplay fields
  */
  // If this card is closely related to other cards, this property will be an array with Related Card Objects.
  all_parts?: ScryfallCardRelatedCardObject[];
  // An array of Card Face objects, if this card is multifaced.
  card_faces?: ScryfallCardFace[];
  // The card’s converted mana cost. Note that some funny cards have fractional mana costs.
  cmc: number;
  // This card’s color identity.
  color_identity: ScryfallCardColor[];
  // The colors in this card’s color indicator, if any. A null value for this field indicates the card does not have one.
  color_indicator?: ScryfallCardColor[];
  // This card’s colors, if the overall card has colors defined by the rules. Otherwise the colors will be on the card_faces objects, see below.
  colors?: ScryfallCardColor[];
  // This card’s overall rank/popularity on EDHREC. Not all cards are ranked.
  edhrec_rank?: number;
  // This card’s hand modifier, if it is Vanguard card. This value will contain a delta, such as -1.
  hand_modifier?: string;
  // An array of keywords that this card uses, such as 'Flying' and 'Cumulative upkeep'.
  keywords: string[];
  // A code for this card’s layout.
  layout: ScryfallCardLayout;
  // An object describing the legality of this card across play formats. Possible legalities are legal, not_legal, restricted, and banned.
  legalities: { [keys: string]: ScryfallCardLegality };
  // This card’s life modifier, if it is Vanguard card. This value will contain a delta, such as +2.
  life_modifier?: string;
  // This loyalty if any. Note that some cards have loyalties that are not numeric, such as X.
  loyalty?: string;
  // The mana cost for this card. This value will be any empty string "" if the cost is absent. Remember that per the game rules, a missing mana cost and a mana cost of {0} are different values. Multi-faced cards will report this value in card faces.
  mana_cost?: string;
  // The name of this card. If this card has multiple faces, this field will contain both names separated by ␣//␣.
  name: string;
  // The Oracle text for this card, if any.
  oracle_text?: string;
  // True if this card is oversized.
  oversized: boolean;
  // This card’s power, if any. Note that some cards have powers that are not numeric, such as *.
  power?: string;
  // Colors of mana that this card could produce.
  produced_mana?: ScryfallCardColor[];
  // True if this card is on the Reserved List.
  reserved: boolean;
  // This card’s toughness, if any. Note that some cards have toughnesses that are not numeric, such as *.
  toughness?: string;
  // The type line of this card.
  type_line: string;
  /*
    print fields
  */
  // The name of the illustrator of this card. Newly spoiled cards may not have this field yet.
  artist?: string;
  // Whether this card is found in boosters.
  booster: boolean;
  // This card’s border color: black, white, borderless, silver, or gold.
  border_color: ScryfallCardBorderColor;
  // The Scryfall ID for the card back design present on this card.
  card_back_id: string;
  // This card’s collector number. Note that collector numbers can contain non-numeric characters, such as letters or ★.
  collector_number: string;
  // True if this card was only released in a video game.
  digital: boolean;
  // An array of computer-readable flags that indicate if this card can come in foil, nonfoil, etched, or glossy finishes.
  finishes: ScryfallCardFinish[];
  // The just-for-fun name printed on the card (such as for Godzilla series cards).
  flavor_name?: string;
  // The flavor text, if any.
  flavor_text?: string;
  // This card’s frame layout.
  frame: ScryfallCardFrame;
  // This card’s frame effects, if any.
  frame_effects?: ScryfallCardFrameEffect[];
  // True if this card’s artwork is larger than normal.
  full_art: boolean;
  // A list of games that this card print is available in, paper, arena, and/or mtgo.
  games: ScryfallCardGame[];
  // True if this card’s imagery is high resolution.
  highres_image: boolean;
  // A unique identifier for the card artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
  illustration_id?: string;
  // A computer-readable indicator for the state of this card’s image, one of missing, placeholder, lowres, or highres_scan.
  image_status?: ScryfallCardImageStatus;
  // An object listing available imagery for this card. See the Card Imagery article for more information.
  image_uris?: ScryfallCardImageURIs;
  // An object containing daily price information for this card, including usd, usd_foil, usd_etched, eur, and tix prices, as strings.
  prices: ScryfallCardPrices;
  // The localized name printed on this card, if any.
  printed_name?: string;
  // The localized text printed on this card, if any.
  printed_text?: string;
  // The localized type line printed on this card, if any.
  printed_type_line?: string;
  // True if this card is a promotional print.
  promo: boolean;
  // An array of strings describing what categories of promo cards this card falls into.
  promo_types?: string[];
  // An object providing URIs to this card’s listing on major marketplaces.
  purchase_uris: ScryfallCardPurchaseURIs;
  // This card’s rarity. One of common, uncommon, rare, special, mythic, or bonus.
  rarity: ScryfallCardRarity;
  // An object providing URIs to this card’s listing on other Magic: The Gathering online resources.
  related_uris: ScryfallCardRelatedURIs;
  // The date this card was first released.
  released_at: Date;
  // True if this card is a reprint.
  reprint: boolean;
  // A link to this card’s set on Scryfall’s website.
  scryfall_set_uri: string;
  // This card’s full set name.
  set_name: string;
  // A link to where you can begin paginating this card’s set on the Scryfall API.
  set_search_uri: string;
  // The type of set this printing is in.
  set_type: string;
  // A link to this card’s set object on Scryfall’s API.
  set_uri: string;
  // This card’s set code.  "set" on Scryfall; "_set" here to avoid clash with mongodb Document "set".
  _set: string;
  // This card’s Set object UUID.
  set_id: string;
  // True if this card is a Story Spotlight.
  story_spotlight: boolean;
  // True if the card is printed without text.
  textless: boolean;
  // Whether this card is a variation of another printing.
  variation: boolean;
  // The printing ID of the printing this card is a variation of.
  variation_of?: string;
  // The security stamp on this card, if any. One of oval, triangle, acorn, or arena.
  security_stamp?: ScryfallCardSecurityStamp;
  // This card’s watermark, if any.
  watermark: string;
  // Information about who previewed the card and when.
  preview?: ScryfallCardPreview;
}
