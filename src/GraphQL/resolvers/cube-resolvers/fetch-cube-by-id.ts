import CLMRequest from '../../../types/interfaces/CLMRequest';
import HTTPError from '../../../types/classes/HTTPError';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account, cube } = context;

  if (
    !cube ||
    ((!account || cube.creator._id !== account._id) && !cube.published)
  ) {
    throw new HTTPError(
      'A cube with the provided ID was not found in our system or it has not yet been published by its creator.',
      404
    );
  } else {
    return cube;
  }
}
