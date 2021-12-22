import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import Event from '../../../../types/interfaces/Event';
import EventPlayer from '../../../../types/interfaces/EventPlayer.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface SelectCardArgs {
  _id: string;
}

export default async function (
  parent: any,
  args: SelectCardArgs,
  context: CLMRequest
) {
  const { event, player } = context;
  const { _id } = args;

  if (!event || !player) {
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );
  }

  const cardDrafted = (player as EventPlayer).queue[0].find(
    (card) => card._id.toString() === _id
  );

  if (!cardDrafted)
    throw new HTTPError('You attempted to draft an invalid card.', 404);

  player.mainboard.push(cardDrafted);

  const packMinusCardDrafted = (player as EventPlayer).queue[0].filter(
    (card) => card._id.toString() !== _id
  );
  const passRight = (player as EventPlayer).packs.length % 2 === 0;
  const passLeft = (player as EventPlayer).packs.length % 2 === 1;
  const playerIndex = event.players.indexOf(player as EventPlayer);
  let otherPlayerIndex;

  if (playerIndex === event.players.length - 1 && passRight) {
    otherPlayerIndex = 0;
  } else if (playerIndex === 0 && passLeft) {
    otherPlayerIndex = event.players.length - 1;
  } else if (passRight) {
    otherPlayerIndex = playerIndex + 1;
  } else {
    otherPlayerIndex = playerIndex - 1;
  }

  if (packMinusCardDrafted.length > 0) {
    event.players[otherPlayerIndex].queue.push(packMinusCardDrafted);
  }

  (player as EventPlayer).queue.shift();

  event.finished = event.players.every(
    (plr) => plr.packs.length + plr.queue.length === 0
  );

  const nextPack = event.players.every(
    (plr) => plr.queue.length === 0 && plr.packs.length > 0
  );

  if (nextPack) {
    for (let plr of event.players) {
      plr.queue.push(plr.packs[0]);
      plr.packs.shift();
    }
  }

  await event.save();
  pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return event;
}
