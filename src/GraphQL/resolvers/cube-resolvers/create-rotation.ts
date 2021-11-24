import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';

interface CreateRotationArgs {
  name: string;
}

export default async function (
  parent: any,
  args: CreateRotationArgs,
  context: CLMRequest
) {
  const { account, cube, pubsub } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id !== cube.creator) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { name } = args;

  if (
    cube.rotations.find(
      (rotation) => rotation.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    throw new HTTPError(
      'A rotation with the provided name already exists in this cube.  Rotation names must be unique within a cube.',
      409
    );
  }

  cube.rotations.push({ name, size: 0 });

  await cube.save();
  pubsub?.publish(cube._id.toString(), { subscribeCube: cube });

  return cube;
}
