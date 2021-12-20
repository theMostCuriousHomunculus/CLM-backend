import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import returnComponent from '../../../utils/return-component.js';

interface DeleteCardArgs {
  cardID: string;
  destinationID?: string;
  originID: string;
}

export default async function (
  parent: any,
  args: DeleteCardArgs,
  context: CLMRequest
) {
  const { account, cube, pubsub } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id.toString() !== cube.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { cardID, destinationID, originID } = args;

  const originComponent = await returnComponent(cube, originID);
  const card = originComponent.id(cardID);

  if (!card) {
    throw new HTTPError(
      `Could not find a card with ID "${cardID}" in the component with ID "${originID}"".`,
      404
    );
  }

  originComponent.pull(cardID);

  if (destinationID) {
    const destinationComponent = await returnComponent(cube, destinationID);
    destinationComponent.push(card);
  }

  await cube.save();
  pubsub?.publish(cube._id.toString(), { subscribeCube: cube });

  return true;
}
