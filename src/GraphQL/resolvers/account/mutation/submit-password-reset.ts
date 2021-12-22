import AccountModel from '../../../../models/account-model.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface SubmitPasswordResetArgs {
  email: string;
  password: string;
  reset_token: string;
}

export default async function (parent: any, args: SubmitPasswordResetArgs) {
  const { email, password, reset_token } = args;
  const account = await AccountModel.findOne({
    email,
    reset_token,
    reset_token_expiration: { $gt: Date.now() }
  });

  if (!account) throw new HTTPError('Invalid reset token.', 401);

  account.password = password;
  account.reset_token = undefined;
  account.reset_token_expiration = undefined;

  await account.generateAuthenticationToken();

  return account;
}
