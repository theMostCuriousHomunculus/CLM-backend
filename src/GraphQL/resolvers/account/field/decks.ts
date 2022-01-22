import Account from '../../../../types/interfaces/Account';
import DeckModel from '../../../../mongodb/models/deck.js';

export default async function (parent: Account) {
  const decks = await DeckModel.find({ creator: parent._id });

  return decks;
}
