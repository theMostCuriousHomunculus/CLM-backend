import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface CreateModuleArgs {
  name: string;
}

export default async function (
  parent: any,
  args: CreateModuleArgs,
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
    cube.modules.find(
      (module) => module.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    throw new HTTPError(
      `A module named ${name} already exists in this cube.  Module names must be unique within a cube.`,
      409
    );
  }

  cube.modules.push({ name });

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
