import Match from '../../../models/match-model.js';
export default async function (parent) {
    const matches = await Match.find({
        players: { $elemMatch: { account: parent._id } }
    });
    return matches;
}
//# sourceMappingURL=matches.js.map