import crypto from 'crypto';

import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../models/account-model.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import transporter from '../../../../utils/sendgrid-transporter.js';

interface RequestPasswordResetArgs {
  email: string;
}

export default async function (
  parent: Account,
  args: RequestPasswordResetArgs
) {
  const { email } = args;
  const buffer = crypto.randomBytes(32);
  const reset_token = buffer.toString('hex');
  const account = await AccountModel.findOne({ email });

  if (!account) {
    throw new HTTPError(
      'Could not find a user with the provided email address.',
      404
    );
  } else {
    account.reset_token = reset_token;
    account.reset_token_expiration = Date.now() + 900000;
    await account.save();
    transporter.sendMail({
      to: email,
      from: 'CubeLevelMidnight@gmail.com',
      subject: 'Password Reset Link',
      html: `
      <h1>We received a request to reset your password.</h1>
      <p>Click this <a href="${process.env.FRONT_END_URL}/reset/${reset_token}">link</a> to change your password.</p>
      <p>The link will expire after 15 minutes.</p>
      `
    });

    return true;
  }
}
