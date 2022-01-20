import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import DeckComponent from '../../../../types/enums/DeckComponent.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface AddBasicsArgs {
  component: DeckComponent;
  name: string;
  numberOfCopies: number;
  scryfall_id: string;
}

export default async function (
  parent: any,
  args: AddBasicsArgs,
  context: CLMRequest
) {
  const { event, player } = context;

  if (!event || !player)
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );

  const { component, name, numberOfCopies, scryfall_id } = args;

  for (let i = 0; i < numberOfCopies; i++) {
    player[component].push({
      name,
      scryfall_id
    });
  }

  await event.save();
  pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return event;
}
