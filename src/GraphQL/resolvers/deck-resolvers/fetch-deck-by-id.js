import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { deck } = context;

  if (!deck)
    throw new HTTPError('Could not find a deck with the provided ID.', 404);

  return deck;
}
