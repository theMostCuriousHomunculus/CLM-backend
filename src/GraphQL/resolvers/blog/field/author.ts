import BlogPost from '../../../../types/interfaces/BlogPost';
import AccountModel from '../../../../models/account-model.js';

export default async function (parent: BlogPost) {
  return await AccountModel.findById(parent.author);
}
