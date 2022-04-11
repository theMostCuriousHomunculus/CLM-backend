import Account from '../../../../types/interfaces/Account';
import CLMRequest from '../../../../types/interfaces/CLMRequest';
import ConversationModel from '../../../../mongodb/models/conversation.js';

interface ConversationsArgs {
  limit?: number;
  skip?: number;
}

export default async function (
  parent: Account,
  args: ConversationsArgs,
  context: CLMRequest
) {
  const { bearer } = context;
  if (!bearer || bearer._id.toString() !== parent._id.toString()) {
    return null;
  } else {
    if (Number.isInteger(args.limit) && Number.isInteger(args.skip)) {
      const { limit, skip } = args;
      return await ConversationModel.find({ participants: parent._id })
        .skip(skip!)
        .limit(limit!);
    } else {
      return await ConversationModel.find({ participants: parent._id });
    }
  }
}
