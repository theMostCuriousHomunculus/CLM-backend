import AccountModel from '../../../../models/account-model.js';
import Deck from '../../../../types/interfaces/Deck.js';

export default async function (parent: Deck) {
  return await AccountModel.findById(parent.creator);
}
