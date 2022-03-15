import ScryfallCardModel from '../../../../mongodb/models/scryfall-card.js';
import CubeCard from '../../../../types/interfaces/CubeCard';
import DeckCard from '../../../../types/interfaces/DeckCard';

export default async function (parent: CubeCard | DeckCard) {
  return await ScryfallCardModel.findById(parent.scryfall_id);
}
