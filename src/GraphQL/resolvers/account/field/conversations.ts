import Account from '../../../../types/interfaces/Account';
import ConversationModel from '../../../../mongodb/models/conversation.js';

interface ConversationsArgs {
  limit?: number;
  skip?: number;
}

export default async function (parent: Account, args: ConversationsArgs) {
  if (Number.isInteger(args.limit) && Number.isInteger(args.skip)) {
    const { limit, skip } = args;
    return await ConversationModel.find({ participants: parent._id })
      .skip(skip!)
      .limit(limit!);
  } else {
    return await ConversationModel.find({ participants: parent._id });
  }
}
