import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';

interface DeleteModuleArgs {
  _id: string;
}

export default async function (
  parent: any,
  args: DeleteModuleArgs,
  context: CLMRequest
) {
  const { account, cube, pubsub } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id !== cube.creator) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { _id } = args;

  cube.modules.pull(_id);

  await cube.save();
  pubsub?.publish(cube._id.toString(), { subscribeCube: cube });

  return true;
}