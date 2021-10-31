import HttpError from '../../../models/http-error.js';
export default async function (parent, args, context) {
    const { event, player, pubsub } = context;
    if (!event || !player)
        throw new HttpError('An event with the provided ID does not exist or you were not invited to it.', 404);
    const { cardIDs, component } = args;
    for (const cardID of cardIDs) {
        player[component].pull(cardID);
    }
    await event.save();
    pubsub.publish(event._id.toString(), { subscribeEvent: event });
    return true;
}
//# sourceMappingURL=remove-basics.js.map