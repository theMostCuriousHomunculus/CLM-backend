import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { cardID, faceDownImage, zone } = args;
  let card;

  if (zone.toString() === 'stack') {
    card = match.stack.find((crd) => crd._id.toString() === cardID);
  } else {
    card = player[zone].find((crd) => crd._id.toString() === cardID);
  }

  card.face_down_image = faceDownImage.toString();

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
