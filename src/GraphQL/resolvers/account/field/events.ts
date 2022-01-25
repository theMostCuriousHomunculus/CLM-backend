import Account from '../../../../types/interfaces/Account';
import EventModel from '../../../../mongodb/models/event.js';

interface EventsArgs {
  limit?: number;
  skip?: number;
}

export default async function (parent: Account, args: EventsArgs) {
  if (Number.isInteger(args.limit) && Number.isInteger(args.skip)) {
    const { limit, skip } = args;
    return await EventModel.find({ 'players.account': parent._id })
      .sort('-createdAt')
      .skip(skip!)
      .limit(limit!);
  } else {
    return await EventModel.find({ 'players.account': parent._id }).sort(
      '-createdAt'
    );
  }
}
