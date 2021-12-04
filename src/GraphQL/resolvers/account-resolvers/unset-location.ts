import CLMRequest from '../../../types/interfaces/CLMRequest';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account } = context;

  if (!account) {
    throw new HTTPError(
      'You must be logged in to clear your location data.',
      409
    );
  }

  account.location = undefined;

  await account.save();

  return account;
}
