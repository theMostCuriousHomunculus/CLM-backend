import deleteDocumentIDs from '../../../utils/delete-document-ids.js';
import Deck from '../../../models/deck-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, deck } = context;

  if (!account)
    throw new HTTPError('You must be logged in to clone a deck.', 401);

  const copy = JSON.parse(JSON.stringify(deck));

  deleteDocumentIDs(copy);

  copy.creator = account._id;
  copy.name = `Copy of ${deck.name}`;

  const clonedDeck = new Deck(copy);
  await clonedDeck.save();

  return clonedDeck;
}
