import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, deck } = context;

  if (!account || !deck || account._id.toString() !== deck.creator.toString())
    throw new HTTPError('You are not authorized to edit this deck.', 401);

  await deck.delete();

  return true;
}
