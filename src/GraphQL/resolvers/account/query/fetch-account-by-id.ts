import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account } = context;

  if (!account) throw new HTTPError('Account not found!', 404);

  return account;
}
