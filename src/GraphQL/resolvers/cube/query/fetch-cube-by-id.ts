import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer, cube } = context;

  if (
    cube &&
    (cube.published || cube.creator.toString() === bearer?._id.toString())
  ) {
    return cube;
  } else {
    throw new HTTPError(
      'A cube with the provided ID was not found in our system or it has not yet been published by its creator.',
      404
    );
  }
}
