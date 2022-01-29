import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import Cube from '../../../../types/interfaces/Cube';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface EditCubeArgs {
  description?: string;
  image?: string;
  name?: string;
  published?: boolean;
}

export default async function (
  parent: any,
  args: EditCubeArgs,
  context: CLMRequest
) {
  const { bearer, cube } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!bearer || bearer._id.toString() !== cube.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const validCubeProperties = ['description', 'image', 'name', 'published'];

  for (const prop of validCubeProperties) {
    if (typeof args[prop as keyof EditCubeArgs] !== 'undefined') {
      (cube[prop as keyof Cube] as any) = args[prop as keyof EditCubeArgs];
    }
  }

  try {
    await cube.save();
    pubsub.publish(cube._id.toString(), { subscribeCube: cube });

    return cube;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new HTTPError(
        'The provided cube name has already been used.  Cube names must be unique.',
        409
      );
    } else if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
