import ScryfallCardModel from '../../../../mongodb/models/scryfall-card.js';
import DeckCard from '../../../../types/interfaces/DeckCard';

export default async function (parent: DeckCard) {
  return await ScryfallCardModel.findById(parent.scryfall_id);
}
