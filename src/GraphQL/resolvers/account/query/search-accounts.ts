import AccountModel from '../../../../mongodb/models/account.js';

interface SearchAccountArgs {
  name: string;
}

export default async function (parent: undefined, args: SearchAccountArgs) {
  return await AccountModel.find(
    { $text: { $search: args.name } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
}
