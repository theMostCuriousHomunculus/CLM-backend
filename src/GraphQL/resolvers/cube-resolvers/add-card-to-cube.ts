import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import returnComponent from '../../../utils/return-component.js';

interface AddCardToCubeArgs {
  componentID: string;
  name: string;
  scryfall_id: string;
}

export default async function (
  parent: any,
  args: AddCardToCubeArgs,
  context: CLMRequest
) {
  const { account, cube, pubsub } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id.toString() !== cube.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { componentID, name, scryfall_id } = args;
  const component = await returnComponent(cube, componentID);

  component.push({
    name,
    scryfall_id
  });

  await cube.save();
  pubsub?.publish(cube._id.toString(), { subscribeCube: cube });

  return cube;
}
