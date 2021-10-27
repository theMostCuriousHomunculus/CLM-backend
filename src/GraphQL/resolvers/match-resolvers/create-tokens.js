import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HttpError('You are only a spectator.', 401);

  const { back_image, image, name, scryfall_id, numberOfTokens } = args;

  for (let i = 0; i < numberOfTokens; i++) {
    player.battlefield.push({
      back_image: back_image,
      controller: account._id,
      counters: [],
      image: image,
      index: player.battlefield.length - 1,
      isCopyToken: true,
      name: name,
      owner: account._id,
      scryfall_id: scryfall_id,
      visibility: match.players.map((plr) => plr.account),
      x_coordinate: i,
      y_coordinate: i
    });
  }

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}