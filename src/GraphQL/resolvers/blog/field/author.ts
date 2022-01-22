import BlogPost from '../../../../types/interfaces/BlogPost';
import AccountModel from '../../../../mongodb/models/account.js';

export default async function (parent: BlogPost) {
  return await AccountModel.findById(parent.author);
}
