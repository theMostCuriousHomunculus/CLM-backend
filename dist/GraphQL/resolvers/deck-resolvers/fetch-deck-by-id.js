import HttpError from '../../../models/http-error.js';
export default async function (parent, args, context) {
  const { deck } = context;
  if (!deck)
    throw new HttpError('Could not find a deck with the provided ID.', 404);
  return deck;
}
//# sourceMappingURL=fetch-deck-by-id.js.map
