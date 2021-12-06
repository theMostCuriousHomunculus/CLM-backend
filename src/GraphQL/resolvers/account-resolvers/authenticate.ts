import CLMRequest from '../../../types/interfaces/CLMRequest';
import HTTPError from '../../../types/classes/HTTPError.js';

// the front end application will store a cookie in the user's web browser with the token they receive when they login, register or reset their password.  when they later open the application, the presence of that cookie will prompt the front end to send an authenticate request to the server to query information about the user which will then get stored in the running front end application's context.

export default async function (parent: null, args: null, context: CLMRequest) {
  const { account } = context;

  if (!account) throw new HTTPError('Profile not found!', 404);

  return account;
}
