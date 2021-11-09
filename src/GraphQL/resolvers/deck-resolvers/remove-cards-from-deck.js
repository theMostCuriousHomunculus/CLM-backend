import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, deck, pubsub } = context;

  if (!account || !deck || account._id.toString() !== deck.creator.toString())
    throw new HTTPError('You are not authorized to edit this deck.', 401);

  const { cardIDs, component } = args;

  for (const cardID of cardIDs) {
    deck[component].pull(cardID);
  }

  await deck.save();
  pubsub.publish(deck._id.toString(), { subscribeDeck: deck });

  return true;
}
