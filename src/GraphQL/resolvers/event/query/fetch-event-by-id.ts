import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import EventPlayer from '../../../../types/interfaces/EventPlayer.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
// import pubsub from '../../../pubsub.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { event, player } = context;

  if (!event || !player) {
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );
  }

  (player as EventPlayer).present = true;
  await event.save();
  // pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return event;
}
