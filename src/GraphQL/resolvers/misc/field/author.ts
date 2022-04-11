import AccountModel from '../../../../mongodb/models/account.js';
import BlogPost from '../../../../types/interfaces/BlogPost';
import Message from '../../../../types/interfaces/Message';

export default async function (parent: BlogPost | Message) {
  return await AccountModel.findById(parent.author);
}
