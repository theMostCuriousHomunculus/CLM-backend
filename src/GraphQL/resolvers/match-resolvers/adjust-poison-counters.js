import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { poison } = args;

  if (player.poison === poison) {
    throw new HTTPError('Poison counters did not change.', 400);
  } else if (poison > player.poison) {
    match.log.push(
      `${account.name} gained ${poison - player.poison} poison counters; from ${
        player.poison
      } up to ${poison}.`
    );
  } else {
    match.log.push(
      `${account.name} lost ${player.poison - poison} poison counters; from ${
        player.poison
      } down to ${poison}.`
    );
  }

  player.poison = poison;

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
