import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { cardID, counterAmount, counterType, zone } = args;

  let card;

  if (zone.toString() === 'stack') {
    card = match.stack.find((crd) => crd._id.toString() === cardID);
  } else {
    card = player[zone].find((crd) => crd._id.toString() === cardID);
  }

  const counterObject = card.counters.find((obj) => obj.type === counterType);

  if (!counterObject) {
    match.log.push(
      `${account.name} added ${counterAmount} ${counterType} counters to ${card.name}.`
    );
    card.counters.push({ counterAmount, counterType });
  } else if (counterAmount > counterObject.amount) {
    match.log.push(
      `${account.name} added ${
        counterAmount - counterObject.amount
      } ${counterType} counters to ${card.name}; from ${
        counterObject.amount
      } to ${counterAmount}.`
    );
    counterObject.amount = counterAmount;
  } else if (counterAmount < counterObject.amount) {
    match.log.push(
      `${account.name} removed ${
        counterObject.amount - counterAmount
      } ${counterType} counters from ${card.name}; from ${
        counterObject.amount
      } to ${counterAmount}.`
    );
    counterObject.amount = counterAmount;
  } else {
    throw new HTTPError(
      `Amount of ${counterType} counters did not change.`,
      400
    );
  }

  card.counters = card.counters.filter((obj) => obj.amount > 0);

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
