import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer, cube } = context;

  if (
    !cube ||
    ((!bearer || cube.creator._id.toString() !== bearer._id.toString()) &&
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
