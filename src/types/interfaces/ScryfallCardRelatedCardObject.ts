import mongoose from 'mongoose';

import ScryfallCardComponent from '../enums/ScryfallCardComponent';

export default interface ScryfallCardRelatedCardObject
  extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  // A field explaining what role this card plays in this relationship, one of token, meld_part, meld_result, or combo_piece.
  component: ScryfallCardComponent;
  // The name of this particular related card.
  name: string;
  // The type line of this card.
  type_line: string;
  // A URI where you can retrieve a full object describing this card on Scryfall’s API.
  uri: string;
}
