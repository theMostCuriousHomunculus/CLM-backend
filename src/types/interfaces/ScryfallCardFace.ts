import mongoose from 'mongoose';

import ScryfallCardColor from '../enums/ScryfallCardColor';
import ScryfallCardLayout from '../enums/ScryfallCardLayout';
import ScryfallCardImageURIs from './ScryfallCardImageURIs';

export default interface ScryfallCardFace extends mongoose.Types.Subdocument {
  // The name of the illustrator of this card face. Newly spoiled cards may not have this field yet.
  artist?: string;
  // The mana value of this particular face, if the card is reversible.
  cmc?: number;
  // The colors in this face’s color indicator, if any.
  color_indicator?: ScryfallCardColor[];
  // This face’s colors, if the game defines colors for the individual face of this card.
  colors?: ScryfallCardColor[];
  // The flavor text printed on this face, if any.
  flavor_text?: string;
  // A unique identifier for the card face artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
  illustration_id?: string;
  // An object providing URIs to imagery for this face, if this is a double-sided card. If this card is not double-sided, then the image_uris property will be part of the parent object instead.
  image_uris?: ScryfallCardImageURIs;
  // The layout of this card face, if the card is reversible.
  layout?: ScryfallCardLayout;
  // This face’s loyalty, if any.
  loyalty?: string;
  // The mana cost for this face. This value will be any empty string "" if the cost is absent. Remember that per the game rules, a missing mana cost and a mana cost of {0} are different values.
  mana_cost: string;
  // The name of this particular face.
  name: string;
  // The Oracle ID of this particular face, if the card is reversible.
  oracle_id?: string;
  // The Oracle text for this face, if any.
  oracle_text?: string;
  // This face’s power, if any. Note that some cards have powers that are not numeric, such as *.
  power?: string;
  // The localized name printed on this face, if any.
  printed_name?: string;
  // The localized text printed on this face, if any.
  printed_text?: string;
  // The localized type line printed on this face, if any.
  printed_type_line?: string;
  // This face’s toughness, if any.
  toughness?: string;
  // The type line of this particular face, if the card is reversible.
  type_line?: string;
  // The watermark on this particulary card face, if any.
  watermark?: string;
}
