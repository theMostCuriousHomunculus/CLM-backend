import { MongoError } from 'mongodb';

import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import Rotation from '../../../types/interfaces/Rotation.js';

interface EditRotationArgs {
  rotationID: string;
  name: string;
  size: number;
}

export default async function (
  parent: any,
  args: EditRotationArgs,
  context: CLMRequest
) {
  const { account, cube, pubsub } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id !== cube.creator)
    throw new HTTPError('You are not authorized to edit this cube.', 401);

  const { rotationID, name, size } = args;

  const rotation = cube.rotations.id(rotationID);

  if (!rotation) {
    throw new HTTPError(
      `A rotation with ID "${rotationID}" was not found in ${cube.name}.`,
      404
    );
  }

  const validRotationProperties = ['name', 'size'];

  for (let prop of validRotationProperties) {
    if (typeof args[prop as keyof EditRotationArgs] !== 'undefined') {
      (rotation[prop as keyof Rotation] as any) =
        args[prop as keyof EditRotationArgs];
    }
  }

  if (
    cube.rotations.find(
      (rotation) => rotation.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    throw new HTTPError(
      `A rotation named "${name}" already exists in this cube.  Rotation names must be unique within a cube.`,
      409
    );
  }

  await cube.save();
  pubsub?.publish(cube._id.toString(), { subscribeCube: cube });

  return cube;
}
