import AccountModel from '../../../../mongodb/models/account.js';
import Conversation from '../../../../types/interfaces/Conversation';

export default async function (parent: Conversation) {
  return await AccountModel.find({ _id: { $in: parent.participants } });
}
