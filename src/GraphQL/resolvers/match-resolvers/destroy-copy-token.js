import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HttpError('You are only a spectator.', 401);

  const { cardID, zone } = args;

  let card;

  if (zone === 'stack') {
    card = match.stack.find((crd) => crd._id.toString() === cardID);

    if (card.isCopyToken) {
      for (const crd of match.stack) {
        if (crd.index > card.index) crd.index -= 1;
      }
      match.stack = match.stack.filter((crd) => crd._id.toString() !== cardID);
    } else {
      throw new Error('Cannot destroy cards that are not copies or tokens.');
    }
  } else {
    card = player[zone].find((crd) => crd._id.toString() === cardID);

    if (card.isCopyToken) {
      for (const crd of player[zone]) {
        if (crd.index > card.index) crd.index -= 1;
      }
      player[zone] = player[zone].filter(
        (crd) => crd._id.toString() !== cardID
      );
    } else {
      throw new Error('Cannot destroy cards that are not copies or tokens.');
    }
  }

  match.log.push(`${account.name} destroyed their copy/token of ${card.name}.`);

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
