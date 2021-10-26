import Deck from '../../../models/deck-model.js';
export default async function (parent) {
    const decks = await Deck.find({ _id: { $in: parent.decks } });
    return decks;
}
//# sourceMappingURL=decks.js.map