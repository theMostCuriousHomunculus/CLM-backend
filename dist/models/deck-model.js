import mongoose from 'mongoose';
const deckCardSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    scryfall_id: {
        required: true,
        type: String
    }
});
const deckSchema = new mongoose.Schema({
    creator: {
        ref: 'Account',
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        default: '',
        index: {
            collation: { locale: 'en', strength: 2 }
        },
        type: String
    },
    format: {
        enum: [
            'Classy',
            'Freeform',
            'Legacy',
            'Modern',
            'Pauper',
            'Pioneer',
            'Standard',
            'Vintage'
        ],
        required: false,
        type: String
    },
    mainboard: [deckCardSchema],
    name: {
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        },
        required: true,
        trim: true,
        type: String
    },
    sideboard: [deckCardSchema]
});
deckSchema.index({ name: 'text', description: 'text' });
const Deck = mongoose.model('Deck', deckSchema);
export { Deck as default };
//# sourceMappingURL=deck-model.js.map