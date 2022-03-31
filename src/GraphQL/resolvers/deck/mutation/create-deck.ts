import axios from 'axios';
import CSVString from 'csv-string';

import CLMRequest from '../../../../types/interfaces/CLMRequest';
import DeckModel from '../../../../mongodb/models/deck.js';
import Format from '../../../../types/enums/Format';
import HTTPError from '../../../../types/classes/HTTPError.js';

// TODO: import deck list from tappedout or mtggoldfish

interface CardIdentifier {
  [key: string]: string;
}

interface CreateDeckArgs {
  description?: string;
  existingListID?: string;
  format?: Format;
  name: string;
}

export default async function (
  parent: any,
  args: CreateDeckArgs,
  context: CLMRequest
) {
  const { bearer } = context;

  if (!bearer) {
    throw new HTTPError('You must be logged in to create a deck.', 401);
  }

  const { description, existingListID, format, name } = args;

  if (await DeckModel.findOne({ name })) {
    throw new HTTPError(
      `A deck named "${name}" already exists.  Deck names must be unique.`,
      409
    );
  }

  const deckInfo = {
    creator: bearer._id,
    description,
    format: format ? format.toString() : undefined,
    mainboard: [] as CardIdentifier[],
    name,
    sideboard: [] as CardIdentifier[]
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

  const deck = new DeckModel(deckInfo);
  await deck.save();

  return deck;
}
