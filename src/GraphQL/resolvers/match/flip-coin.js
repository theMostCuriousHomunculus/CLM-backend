import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const result = Math.floor(Math.random() * 2);

  match.log.push(
    `${account.name} flipped a coin and got ${
      result === 0 ? 'TAILS' : 'HEADS'
    }.`
  );

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
