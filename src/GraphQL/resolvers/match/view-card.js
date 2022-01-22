import AccountModel from '../../../mongodb/models/account.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { cardID, controllerID, zone } = args;
  const controller = match.players.find(
    (plr) => plr.account.toString() === controllerID
  );

  if (!controller) throw new HTTPError('Invalid controllerID.', 404);

  const controllerAccount = await AccountModel.findById(controllerID);
  let card;

  if (zone.toString() === 'stack') {
    card = match.stack.find((crd) => crd._id.toString() === cardID);
  } else {
    card = controller[zone].find((crd) => crd._id.toString() === cardID);
  }

  if (!card.visibility.includes(account._id)) card.visibility.push(account._id);

  match.log.push(
    `${
      match.players.every((plr) => card.visibility.includes(plr.account))
        ? card.name
        : 'A card'
    } ${
      zone.toString() === 'stack'
        ? 'on the stack'
        : 'in ' + controllerAccount.name + "'s " + zone
    } is now visible to ${account.name}.`
  );

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
