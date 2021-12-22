import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import Format from '../../../../types/enums/Format.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface EditDeckArgs {
  description?: string;
  format?: Format;
  name?: string;
}

export default async function (
  parent: any,
  args: EditDeckArgs,
  context: CLMRequest
) {
  const { bearer, deck } = context;

  if (!bearer || !deck || bearer._id.toString() !== deck.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this deck.', 401);
  }

  const { description, format, name } = args;

  if (description) deck.description = description;

  if (format) deck.format = format;

  if (name) deck.name = name;

  try {
    await deck.save();
    pubsub?.publish(deck._id.toString(), { subscribeDeck: deck });

    return deck;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new HTTPError(
        'The provided deck name has already been used.  Deck names must be unique.',
        409
      );
    } else if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
