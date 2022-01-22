import AccountModel from '../../../../mongodb/models/account.js';
import Deck from '../../../../types/interfaces/Deck.js';

export default async function (parent: Deck) {
  return await AccountModel.findById(parent.creator);
}
