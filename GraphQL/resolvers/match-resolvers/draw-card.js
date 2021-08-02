import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context, info) {

  const { account, match, player, pubsub } = context;

  if (!player) throw new HttpError("You are only a spectator.", 401);

  const card = player.library.pop();

  if (!card) throw new HttpError("Your library is empty!", 409);
  
  if (!card.visibility.includes(account._id)) card.visibility.push(account._id);
  card.face_down = false;
  card.index = player.hand.length;

  player.hand.push(card);
  match.log.push(`${account.name} drew a card.`);

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
};