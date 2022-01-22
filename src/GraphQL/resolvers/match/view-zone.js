import HTTPError from '../../../types/classes/HTTPError.js';
import AccountModel from '../../../mongodb/models/account.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { controllerID, zone } = args;
  const controller = match.players.find(
    (plr) => plr.account.toString() === controllerID
  );

  if (!controller) throw new HTTPError('Invalid controllerID.', 404);

  const controllerAccount = await AccountModel.findById(controllerID);

  for (const card of controller[zone]) {
    if (card.face_down) card.face_down = false;
    if (!card.visibility.includes(account._id))
      card.visibility.push(account._id);
  }

  match.log.push(`${account.name} viewed ${controllerAccount.name}'s ${zone}.`);

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
