import AccountModel from '../../../mongodb/models/account.js';
import DeckModel from '../../../mongodb/models/deck.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import MatchModel from '../../../mongodb/models/match.js';
import EventModel from '../../../mongodb/models/event.js';

export default async function (parent, args, context) {
  const { account } = context;

  if (!account)
    throw new HTTPError('You must be logged in to create a match.', 401);

  const { deckIDs, eventID, playerIDs } = args;
  const matchInfo = {
    game_winners: [],
    log: [],
    players: [],
    stack: []
  };

  if (eventID) {
    const event = await EventModel.findById(eventID);
    matchInfo.cube = event.cube;
    matchInfo.event = event._id;

    for (const player of event.players) {
      if (playerIDs.includes(player.account.toString())) {
        const plr = {
          account: player.account,
          battlefield: [],
          energy: 0,
          exile: [],
          graveyard: [],
          hand: [],
          library: [],
          life: 20,
          mainboard: [],
          poison: 0,
          sideboard: [],
          temporary: []
        };

        ['mainboard', 'sideboard'].forEach((component) => {
          for (const card of player[component]) {
            plr[component].push({
              controller: player.account,
              counters: [],
              flipped: false,
              isCopyToken: false,
              name: card.name,
              owner: player.account,
              scryfall_id: card.scryfall_id,
              sideboarded: false,
              tapped: false,
              targets: [],
              visibility: [player.account],
              x_coordinate: 0,
              y_coordinate: 0,
              index: 0
            });
          }
        });

        matchInfo.players.push(plr);
      }
    }
  } else {
    matchInfo.decks = deckIDs;

    for (let i = 0; i < deckIDs.length; i++) {
      const deck = await DeckModel.findById(deckIDs[i]);
      const player = await AccountModel.findById(playerIDs[i]);
      const plr = {
        account: player._id,
        battlefield: [],
        energy: 0,
        exile: [],
        graveyard: [],
        hand: [],
        library: [],
        life: 20,
        mainboard: [],
        poison: 0,
        sideboard: [],
        temporary: []
      };

      ['mainboard', 'sideboard'].forEach((component) => {
        for (const card of deck[component]) {
          plr[component].push({
            controller: player._id,
            counters: [],
            flipped: false,
            isCopyToken: false,
            name: card.name,
            owner: player._id,
            scryfall_id: card.scryfall_id,
            sideboarded: false,
            tapped: false,
            targets: [],
            visibility: [player._id],
            x_coordinate: 0,
            y_coordinate: 0,
            index: 0
          });
        }
      });

      matchInfo.players.push(plr);
    }
  }

  const match = new MatchModel(matchInfo);
  await match.save();

  return match;
}
