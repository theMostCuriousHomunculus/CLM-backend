import HttpError from '../../../models/http-error.js';
import returnComponent from '../../../utils/return-component.js';
export default async function (parent, args, context) {
    const { account, cube, pubsub } = context;
    if (!account || !cube || account._id.toString() !== cube.creator.toString())
        throw new HttpError('You are not authorized to edit this cube.', 401);
    const { componentID, name, scryfall_id } = args;
    const component = await returnComponent(cube, componentID);
    component.push({
        name,
        scryfall_id
    });
    await cube.save();
    console.log(component[component.length - 1]);
    pubsub.publish(cube._id.toString(), {
        subscribeCube: {
            change: 'addCardToCube',
            componentID,
            card: component[component.length - 1]
        }
    });
    return cube;
}
//# sourceMappingURL=add-card-to-cube.js.map