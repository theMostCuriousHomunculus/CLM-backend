import Account from '../../../../types/interfaces/Account.js';
import AccountModel from '../../../../models/account-model.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import transporter from '../../../../utils/sendgrid-transporter.js';

interface RegisterArgs {
  avatar: string;
  email: string;
  name: string;
  password: string;
}

export default async function (parent: Account, args: RegisterArgs) {
  const { avatar, email, name, password } = args;

  const existingUsersWithEmail = await AccountModel.find({ email });

  if (existingUsersWithEmail.length > 0)
    throw new HTTPError(
      'An account with that email address already exists.  Use a different email address to register or try logging in instead.',
      409
    );

  const existingUsersWithName = await AccountModel.find({ name });

  if (existingUsersWithName.length > 0)
    throw new HTTPError(
      'An account with that name already exists.  Please choose a different name so that other users can uniquely identify you.',
      409
    );

  const account = new AccountModel({ avatar, email, name, password });

  await account.generateAuthenticationToken();

  transporter.sendMail({
    to: email,
    from: 'CubeLevelMidnight@gmail.com',
    subject: 'Welcome to Cube Level Midnight',
    html: '<h1>Hells Yeah!</h1>\n<p>Cube Level Midnight is the dopest.</p>'
  });

  return account;
}
