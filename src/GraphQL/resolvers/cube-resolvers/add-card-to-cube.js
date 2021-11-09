import HTTPError from '../../../types/classes/HTTPError.js';
import returnComponent from '../../../utils/return-component.js';

export default async function (parent, args, context) {
  const { account, cube, pubsub } = context;

  if (!account || !cube || account._id.toString() !== cube.creator.toString())
    throw new HTTPError('You are not authorized to edit this cube.', 401);

  const { componentID, name, scryfall_id } = args;
  const component = await returnComponent(cube, componentID);

  component.push({
    name,
    scryfall_id
  });

  await cube.save();
  pubsub.publish(cube._id.toString(), { subscribeCube: cube });

  return cube;
}
