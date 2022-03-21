import Account from '../../../../types/interfaces/Account';
import ScryfallCardModel from '../../../../mongodb/models/scryfall-card.js';

export default async function (parent: Account) {
  return await ScryfallCardModel.findById(parent.avatar);
}
