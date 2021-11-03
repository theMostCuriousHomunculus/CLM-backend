import Account from '../../../models/account-model.js';
import HttpError from '../../../models/http-error.js';

export default async function (parent, args) {
  const { email, password, reset_token } = args;
  const account = await Account.findOne({
    email,
    reset_token,
    reset_token_expiration: { $gt: Date.now() }
  });

  if (!account) throw new HttpError('Invalid reset token.', 401);

  account.password = password;
  account.reset_token = null;
  account.reset_token_expiration = null;

  await account.generateAuthenticationToken();

  return account;
}
