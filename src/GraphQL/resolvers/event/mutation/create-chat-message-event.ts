import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface CreateChatMessageEventArgs {
  body: string;
}

export default async function (
  parent: any,
  args: CreateChatMessageEventArgs,
  context: CLMRequest
) {
  const { bearer, event } = context;
  const { body } = args;

  if (!bearer || !event) {
    throw new HTTPError(
      'An event with the provided EventID does not exist or you were not invited to it.',
      404
    );
  }

  event.chat_log.push({
    author: bearer._id,
    body
  });

  try {
    await event.save();
    pubsub.publish(event._id.toString(), { subscribeEvent: event });

    return event;
  } catch (error) {
    throw new HTTPError((error as Error).message, 500);
  }
}
