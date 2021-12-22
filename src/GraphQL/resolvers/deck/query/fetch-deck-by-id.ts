import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { deck } = context;

  if (!deck) {
    throw new HTTPError('Could not find a deck with the provided ID.', 404);
  }

  return deck;
}
