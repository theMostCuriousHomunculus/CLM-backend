import CLMRequest from '../../../types/interfaces/CLMRequest';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account, cube } = context;

  if (
    !cube ||
    ((!account || cube.creator._id.toString() !== account._id.toString()) &&
      !cube.published)
  ) {
    throw new HTTPError(
      'A cube with the provided ID was not found in our system or it has not yet been published by its creator.',
      404
    );
  } else {
    return cube;
  }
}
