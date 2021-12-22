import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface ToggleMainboardSideboardDeckArgs {
  cardID: string;
}

export default async function (
  parent: any,
  args: ToggleMainboardSideboardDeckArgs,
  context: CLMRequest
) {
  const { bearer, deck } = context;

  if (!bearer || !deck || bearer._id.toString() !== deck.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this deck.', 401);
  }

  const { cardID } = args;

  if (deck.mainboard.id(cardID)) {
    const card = deck.mainboard.id(cardID);
    deck.mainboard.pull(cardID);
    deck.sideboard.push(card!);
  } else if (deck.sideboard.id(cardID)) {
    const card = deck.sideboard.id(cardID);
    deck.sideboard.pull(cardID);
    deck.mainboard.push(card!);
  } else {
    throw new HTTPError(
      'A card with the provided ID does not exist in this deck.',
      404
    );
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
