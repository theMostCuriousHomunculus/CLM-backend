import HttpError from '../../../models/http-error.js';
import returnComponent from '../../../utils/return-component.js';

export default async function (parent, args, context) {
  const { account, cube, pubsub } = context;

  if (!account || !cube || account._id.toString() !== cube.creator.toString())
    throw new HttpError('You are not authorized to edit this cube.', 401);

  const { cardID, componentID } = args;

  const component = await returnComponent(cube, componentID);
  const card = component.id(cardID);

  if (!card) {
    throw new HttpError(
      'Could not find a card with the provided ID in the provided component.',
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

  for (let property of validCardProperties) {
    card[property] = args[property];
  }

  await cube.save();
  pubsub.publish(cube._id.toString(), { subscribeCube: cube });

  return card;
}
