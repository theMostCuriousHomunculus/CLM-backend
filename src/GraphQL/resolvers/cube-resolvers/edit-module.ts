import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';

interface EditModuleArgs {
  moduleID: string;
  name: string;
}

export default async function (
  parent: any,
  args: EditModuleArgs,
  context: CLMRequest
) {
  const { account, cube, pubsub } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id !== cube.creator) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { moduleID, name } = args;
  const module = cube.modules.id(moduleID);

  if (!module) {
    throw new HTTPError(
      `A module with ID "${moduleID}" was not found in ${cube.name}.`,
      404
    );
  }

  if (
    cube.modules.find(
      (module) => module.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    throw new HTTPError(
      `A module named "${name}" already exists in this cube.  Module names must be unique within a cube.`,
      409
    );
  }

  module.name = name;

  await cube.save();
  pubsub?.publish(cube._id.toString(), { subscribeCube: cube });

  return cube;
}
