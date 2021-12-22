import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { cardID, xCoordinate, yCoordinate } = args;
  const card = player.battlefield.find((crd) => crd._id.toString() === cardID);

  card.x_coordinate = xCoordinate;
  card.y_coordinate = yCoordinate;

  for (const crd of player.battlefield) {
    if (crd.index > card.index) crd.index -= 1;
  }

  card.index = player.battlefield.length - 1;

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
