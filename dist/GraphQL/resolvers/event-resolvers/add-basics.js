import HttpError from '../../../models/http-error.js';
export default async function (parent, args, context) {
    const { event, player, pubsub } = context;
    if (!event || !player)
        throw new HttpError('An event with the provided ID does not exist or you were not invited to it.', 404);
    const { component, name, numberOfCopies, oracle_id, scryfall_id } = args;
    for (let i = 0; i < numberOfCopies; i++) {
        player[component.toString()].push({
            name,
            oracle_id,
            scryfall_id
        });
    }
    await event.save();
    pubsub.publish(event._id.toString(), { subscribeEvent: event });
    return event;
}
//# sourceMappingURL=add-basics.js.map