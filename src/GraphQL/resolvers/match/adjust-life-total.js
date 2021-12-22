import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { life } = args;

  if (player.life === life) {
    throw new HTTPError('Life total did not change.', 400);
  } else if (life > player.life) {
    match.log.push(
      `${account.name} gained ${life - player.life} life; from ${
        player.life
      } up to ${life}.`
    );
  } else {
    match.log.push(
      `${account.name} lost ${player.life - life} life; from ${
        player.life
      } down to ${life}.`
    );
  }

  player.life = life;

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
