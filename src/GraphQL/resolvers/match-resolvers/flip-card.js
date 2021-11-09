import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { cardID, zone } = args;
  const card = player[zone].find((crd) => crd._id.toString() === cardID);

  card.flipped = !card.flipped;

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
