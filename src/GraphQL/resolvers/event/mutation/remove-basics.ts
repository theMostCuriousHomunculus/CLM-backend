import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import DeckComponent from '../../../../types/enums/DeckComponent.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface RemoveBasicsArgs {
  cardIDs: string[];
  component: DeckComponent;
}

export default async function (
  parent: any,
  args: RemoveBasicsArgs,
  context: CLMRequest
) {
  const { event, player } = context;

  if (!event || !player)
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );

  const { cardIDs, component } = args;

  for (const cardID of cardIDs) {
    player[component].pull(cardID);
  }

  await event.save();
  pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return true;
}
