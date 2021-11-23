import AccountModel from '../../../models/account-model.js';

interface SearchAccountArgs {
  name: string;
}

export default async function (parent: any, args: SearchAccountArgs) {
  console.log(parent);
  return await AccountModel.find(
    { $text: { $search: args.name } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
}
