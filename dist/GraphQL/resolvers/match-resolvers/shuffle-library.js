import HttpError from '../../../models/http-error.js';
import shuffle from '../../../utils/shuffle.js';
export default async function (parent, args, context) {
    const { account, match, player, pubsub } = context;
    if (!player)
        throw new HttpError('You are only a spectator.', 401);
    for (const card of player.library) {
        card.visibility = [];
    }
    shuffle(player.library);
    for (let i = 0; i < player.library.length; i++) {
        player.library[i].index = i;
    }
    match.log.push(`${account.name} shuffled their library.`);
    await match.save();
    pubsub.publish(match._id.toString(), { subscribeMatch: match });
    return match;
}
//# sourceMappingURL=shuffle-library.js.map