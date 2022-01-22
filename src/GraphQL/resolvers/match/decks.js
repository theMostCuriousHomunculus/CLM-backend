import DeckModel from '../../../mongodb/models/deck.js';

export default async function (parent) {
  const decks = await DeckModel.find({ _id: { $in: parent.decks } });

  return decks;
}
