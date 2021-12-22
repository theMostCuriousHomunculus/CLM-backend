import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface ToggleMainboardSideboardEventArgs {
  cardID: string;
}

export default async function (
  parent: any,
  args: ToggleMainboardSideboardEventArgs,
  context: CLMRequest
) {
  const { event, player } = context;

  if (!event || !player) {
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );
  }

  const { cardID } = args;

  let card;

  if (player.mainboard.id(cardID)) {
    card = player.mainboard.id(cardID);
    player.mainboard.pull(cardID);
    if (card) {
      player.sideboard.push(card);
    }
  } else if (player.sideboard.id(cardID)) {
    card = player.sideboard.id(cardID);
    player.sideboard.pull(cardID);
    if (card) {
      player.mainboard.push(card);
    }
  } else {
    throw new HTTPError(
      'A card with the provided ID does not exist in this deck.',
      404
    );
  }

  await event.save();
  pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return event;
}
