import Event from '../../../models/event-model.js';

export default async function (parent) {
  const event = await Event.findById(parent.event);

  return event;
}
