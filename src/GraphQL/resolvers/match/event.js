import Event from '../../../mongodb/models/event.js';

export default async function (parent) {
  const event = await Event.findById(parent.event);

  return event;
}
