import AccountModel from '../../../../mongodb/models/account.js';
import Cube from '../../../../types/interfaces/Cube.js';
import Deck from '../../../../types/interfaces/Deck.js';

export default async function (parent: Cube | Deck) {
  return await AccountModel.findById(parent.creator);
}
