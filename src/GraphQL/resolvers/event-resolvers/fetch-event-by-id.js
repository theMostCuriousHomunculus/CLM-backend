import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { event } = context;

  if (!event)
    throw new HTTPError(
      'An event with the provided ID does not exist or you were not invited to it.',
      404
    );

  return event;
}
