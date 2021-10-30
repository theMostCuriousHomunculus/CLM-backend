import { Event } from '../../../models/event-model.js';

export default async function (parent) {
  const events = await Event.find({ 'players.account': parent._id });

  return events;
}
