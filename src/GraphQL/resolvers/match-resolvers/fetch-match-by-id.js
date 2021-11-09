import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { match } = context;

  if (!match)
    throw new HTTPError('Could not find a match with the provided ID.', 404);

  return match;
}
