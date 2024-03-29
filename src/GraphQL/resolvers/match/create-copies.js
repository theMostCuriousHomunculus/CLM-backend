import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { account, match, player, pubsub } = context;

  if (!player) throw new HTTPError('You are only a spectator.', 401);

  const { cardID, controllerID, numberOfCopies, zone } = args;
  const controller = match.players.find(
    (plr) => plr.account.toString() === controllerID
  );

  if (!controller) throw new HTTPError('Invalid controllerID.', 404);

  let card;

  if (zone === 'stack') {
    card = match.stack.find((crd) => crd._id.toString() === cardID);
    for (let i = 0; i < numberOfCopies; i++) {
      match.stack.push({
        controller: account._id,
        counters: [],
        index: match.stack.length - 1,
        isCopyToken: true,
        name: card.name,
        owner: account._id,
        scryfall_id: card.scryfall_id,
        visibility: [...card.visibility]
      });
    }
  } else if (zone === 'battlefield') {
    card = controller.battlefield.find((crd) => crd._id.toString() === cardID);
    for (let i = 0; i < numberOfCopies; i++) {
      player.battlefield.push({
        controller: account._id,
        counters: [],
        index: player.battlefield.length - 1,
        isCopyToken: true,
        name: card.name,
        owner: account._id,
        scryfall_id: card.scryfall_id,
        visibility: [...card.visibility],
        x_coordinate: i,
        y_coordinate: i
      });
    }
  } else {
    throw new HTTPError(
      'Copies can only exist on the stack or on the battlefield.',
      400
    );
  }

  await match.save();
  pubsub.publish(match._id.toString(), { subscribeMatch: match });

  return match;
}
