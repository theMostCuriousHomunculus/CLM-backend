import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface CreateRotationArgs {
  name: string;
}

export default async function (
  parent: any,
  args: CreateRotationArgs,
  context: CLMRequest
) {
  const { bearer, cube } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!bearer || bearer._id.toString() !== cube.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { name } = args;

  if (
    cube.rotations.find(
      (rotation) => rotation.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    throw new HTTPError(
      `A rotation named ${name} already exists in this cube.  Rotation names must be unique within a cube.`,
      409
    );
  }

  cube.rotations.push({ name, size: 0 });

  try {
    await cube.save();
    pubsub.publish(cube._id.toString(), { subscribeCube: cube });

    return cube;
  } catch (error) {
    if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
