import mongoose from 'mongoose';

import deleteDocumentIDs from '../../../../utils/delete-document-ids.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import DeckModel from '../../../../models/deck-model.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer, deck } = context;

  if (!bearer) {
    throw new HTTPError('You must be logged in to clone a deck.', 401);
  }

  if (!deck) {
    throw new HTTPError('Could not find a deck with the provided ID.', 404);
  }

  const copy = JSON.parse(JSON.stringify(deck));

  deleteDocumentIDs(copy);

  const newDeckID = new mongoose.Types.ObjectId();
  copy._id = newDeckID;
  // deck names must be unique and have a limit of 64 characters (IDs are 24 characters)
  copy.name = `Copy of ${deck.name.slice(0, 29)} - ${newDeckID}`;
  copy.creator = bearer._id;

  const clonedDeck = new DeckModel(copy);
  await clonedDeck.save();

  return clonedDeck;
}
