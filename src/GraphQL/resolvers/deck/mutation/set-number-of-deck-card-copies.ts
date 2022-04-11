import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface SetNumberOfDeckCardCopiesArgs {
  mainboard_count: number;
  maybeboard_count: number;
  scryfall_id: string;
  sideboard_count: number;
}

export default async function (
  parent: any,
  args: SetNumberOfDeckCardCopiesArgs,
  context: CLMRequest
) {
  const { bearer, deck } = context;

  if (!deck) {
    throw new HTTPError('Could not find a deck with the provided ID.', 404);
  }

  if (!bearer || bearer._id.toString() !== deck.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this deck.', 401);
  }

  const { mainboard_count, maybeboard_count, scryfall_id, sideboard_count } =
    args;

  if (mainboard_count < 0 || maybeboard_count < 0 || sideboard_count < 0) {
    throw new HTTPError("Negative copies aren't allowed.", 400);
  }

  const existingCard = deck.cards.find(
    (card) => card.scryfall_id === scryfall_id
  );

  if (existingCard) {
    if (mainboard_count + maybeboard_count + sideboard_count === 0) {
      deck.cards.pull(existingCard._id);
    } else {
      existingCard.mainboard_count = mainboard_count;
      existingCard.maybeboard_count = maybeboard_count;
      existingCard.sideboard_count = sideboard_count;
    }
  }

  if (
    !existingCard &&
    mainboard_count + maybeboard_count + sideboard_count > 0
  ) {
    deck.cards.push({
      mainboard_count,
      maybeboard_count,
      scryfall_id,
      sideboard_count
    });
  }

  try {
    await deck.save();
    pubsub?.publish(deck._id.toString(), { subscribeDeck: deck });

    return deck;
  } catch (error) {
    throw new HTTPError(
      (error as Error | MongoError).message || 'An unknown error occurred.',
      500
    );
  }
}
