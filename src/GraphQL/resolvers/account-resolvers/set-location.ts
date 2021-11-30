import CLMRequest from '../../../types/interfaces/CLMRequest';
import HTTPError from '../../../types/classes/HTTPError.js';

interface SetLocationArgs {
  latitude: number;
  longitude: number;
}

export default async function (
  parent: any,
  args: SetLocationArgs,
  context: CLMRequest
) {
  const { account } = context;
  const { latitude, longitude } = args;

  if (!account) {
    throw new HTTPError(
      'You must be logged in to store your location data.',
      409
    );
  }

  account.location = {
    coordinates: [longitude, latitude],
    type: 'Point'
  };

  await account.save();

  return account;
}
