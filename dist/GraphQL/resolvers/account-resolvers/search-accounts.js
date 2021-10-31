import Account from '../../../models/account-model.js';
export default async function (parent, args) {
    const matchingUsers = await Account.find({ $text: { $search: args.name } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
    return matchingUsers;
}
//# sourceMappingURL=search-accounts.js.map