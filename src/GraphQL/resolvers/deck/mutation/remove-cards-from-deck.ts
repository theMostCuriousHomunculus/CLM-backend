import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import Deck from '../../../../types/interfaces/Deck.js';
import DeckComponent from '../../../../types/enums/DeckComponent.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface RemoveCardsFromDeckArgs {
  cardIDs: string[];
  component: DeckComponent;
}

export default async function (
  parent: any,
  args: RemoveCardsFromDeckArgs,
  context: CLMRequest
) {
  const { bearer, deck } = context;

  if (!bearer || !deck || bearer._id.toString() !== deck.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this deck.', 401);
  }

  const { cardIDs, component } = args;

  for (const cardID of cardIDs) {
    deck[component].pull(cardID);
  }

  try {
    await deck.save();
    pubsub.publish(deck._id.toString(), { subscribeDeck: deck });

    return true;
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
