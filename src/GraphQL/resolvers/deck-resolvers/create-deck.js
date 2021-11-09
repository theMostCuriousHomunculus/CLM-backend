import axios from 'axios';
import CSVString from 'csv-string';

import Deck from '../../../models/deck-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';
// TODO: import deck list from tappedout or mtggoldfish

export default async function (parent, args, context) {
  if (!context.account)
    throw new HTTPError('You must be logged in to create a deck.', 401);

  const { description, existingListID, format, name } = args;
  const deckInfo = {
    creator: context.account._id,
    description,
    format: format ? format.toString() : undefined,
    mainboard: [],
    name,
    sideboard: []
  };

  if (existingListID) {
    const listResponse = await axios.get(
      `https://api.scryfall.com/decks/${existingListID}/export/csv`
    );
    // columns are "section", "count", "name", "mana_cost", "type", "set", "set_code", "collector_number", "lang", "rarity", "artist", "foil", "usd_price", "eur_price", "tix_price", "scryfall_uri", "scryfall_id"
    CSVString.forEach(listResponse.data, ',', function (card, index) {
      if (index > 0 && card[0] && card[1] && card[2] && card[16]) {
        if (card[0] === 'mainboard') {
          for (let i = 0; i < parseInt(card[1]); i++) {
            deckInfo.mainboard.push({
              name: card[2],
              scryfall_id: card[16]
            });
          }
        }

        if (card[0] === 'sideboard') {
          for (let i = 0; i < parseInt(card[1]); i++) {
            deckInfo.sideboard.push({
              name: card[2],
              scryfall_id: card[16]
            });
          }
        }
      }
    });
  }

  const deck = new Deck(deckInfo);
  await deck.save();

  return deck;
}
