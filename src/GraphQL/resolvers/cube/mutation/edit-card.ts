import { MongoError } from 'mongodb';

import CubeCard from '../../../../types/interfaces/CubeCard';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';
import returnComponent from '../../../../utils/return-component.js';

interface EditCardArgs {
  cardID: string;
  componentID: string;
  cmc: number;
  color_identity: string[];
  notes: string;
  scryfall_id: string;
  type_line: string;
}

export default async function (
  parent: any,
  args: EditCardArgs,
  context: CLMRequest
) {
  const { bearer, cube } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!bearer || bearer._id.toString() !== cube.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  const { cardID, componentID } = args;

  const component = await returnComponent(cube, componentID);
  const card = component.id(cardID);

  if (!card) {
    throw new HTTPError(
      `Could not find a card with ID "${cardID}" in the component with ID "${componentID}".`,
      404
    );
  }

  const validCardProperties = [
    'cmc',
    'color_identity',
    'notes',
    'scryfall_id',
    'type_line'
  ];

  for (let prop of validCardProperties) {
    (card[prop as keyof CubeCard] as any) = args[prop as keyof EditCardArgs];
  }

  try {
    await cube.save();
    pubsub.publish(cube._id.toString(), { subscribeCube: cube });

    return card;
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
