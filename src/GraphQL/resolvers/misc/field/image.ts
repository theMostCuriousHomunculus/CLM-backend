import ScryfallCardModel from '../../../../mongodb/models/scryfall-card.js';
import Cube from '../../../../types/interfaces/Cube.js';
import Deck from '../../../../types/interfaces/Deck.js';

export default async function (parent: Cube | Deck) {
  return await ScryfallCardModel.findById(parent.image);
}
