import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer, deck } = context;

  if (
    !deck ||
    ((!bearer || deck.creator._id.toString() !== bearer._id.toString()) &&
      !deck.published)
  ) {
    throw new HTTPError(
      'A deck with the provided ID was not found in our system or it has not yet been published by its creator.',
      404
    );
  } else {
    return deck;
  }
}
