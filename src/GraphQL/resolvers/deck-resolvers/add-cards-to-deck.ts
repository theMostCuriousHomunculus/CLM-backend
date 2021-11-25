import { MongoError } from 'mongodb';

import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import Deck from '../../../types/interfaces/Deck';
import HTTPError from '../../../types/classes/HTTPError.js';

interface AddCardsToDeckArgs {
  component: string;
  name: string;
  numberOfCopies: number;
  scryfall_id: string;
}

export default async function (
  parent: any,
  args: AddCardsToDeckArgs,
  context: CLMRequest
) {
  const { account, deck, pubsub } = context;

  if (!deck) {
    throw new HTTPError('Could not find a deck with the provided ID.', 404);
  }

  if (!account || account._id !== deck.creator) {
    throw new HTTPError('You are not authorized to edit this deck.', 401);
  }

  const { component, name, numberOfCopies, scryfall_id } = args;

  for (let i = 0; i < numberOfCopies; i++) {
    deck[component as keyof Deck].push({
      name,
      scryfall_id
    });
  }

  try {
    await deck.save();
    pubsub?.publish(deck._id.toString(), { subscribeDeck: deck });

    return deck;
  } catch (error) {
    if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
