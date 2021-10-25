import Deck from '../../../models/deck-model.js';

export default async function (parent) {
  const decks = await Deck.find({ creator: parent._id });

  return decks;
}
