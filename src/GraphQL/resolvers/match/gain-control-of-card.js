import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const {
    input: { cardID, controllerID, zone }
  } = args;
  const controller = match.players.find(
    (plr) => plr.account.toString() === controllerID
  );

  if (!controller) throw new HTTPError('Invalid controllerID.', 404);

  let card;

  if (zone.toString() === 'stack') {
    card = match.stack.find((crd) => crd._id.toString() === cardID);
    card.controller = account._id;

    if (
      !card.visibility.some(
        (plrID) => plrID.toString() === account._id.toString()
      )
    )
      card.visibility.push(account._id);
  } else {
    card = controller[zone].find((crd) => crd._id.toString() === cardID);
    card.controller = account._id;
    card.index = player[zone].length;

    if (
      !card.visibility.some(
        (plrID) => plrID.toString() === account._id.toString()
      )
    )
      card.visibility.push(account._id);

    controller[zone] = controller[zone].filter((crd) => crd !== card);
    player[zone].push(card);
  }

  match.log.push(`${account.name} gained control of ${card.name}.`);

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
