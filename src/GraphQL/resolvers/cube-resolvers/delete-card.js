import HTTPError from '../../../types/classes/HTTPError.js';
import returnComponent from '../../../utils/return-component.js';

export default async function (parent, args, context) {
  const { account, cube, pubsub } = context;

  if (!account || !cube || account._id.toString() !== cube.creator.toString())
    throw new HTTPError('You are not authorized to edit this cube.', 401);

  const { cardID, destinationID, originID } = args;

  const originComponent = await returnComponent(cube, originID);
  const card = originComponent.id(cardID);

  if (!card) {
    throw new HTTPError(
      'Could not find a card with the provided ID in the provided component.',
      404
    );
  }

  originComponent.pull(cardID);

  if (destinationID) {
    const destinationComponent = await returnComponent(cube, destinationID);
    destinationComponent.push(card);
  }

  await cube.save();
  pubsub.publish(cube._id.toString(), { subscribeCube: cube });

  return true;
}
