import Account from '../../../../types/interfaces/Account';
import EventModel from '../../../../mongodb/models/event.js';

export default async function (parent: Account) {
  return (await EventModel.find({ 'players.account': parent._id })).length;
}
