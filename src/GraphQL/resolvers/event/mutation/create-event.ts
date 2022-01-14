import mongoose from 'mongoose';
import webpush from 'web-push';

import AccountModel from '../../../../models/account-model.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import CubeCard from '../../../../types/interfaces/CubeCard.js';
import EventModel from '../../../../models/event-model.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import randomSampleWithoutReplacement from '../../../../utils/random-sample-wo-replacement.js';
import shuffle from '../../../../utils/shuffle.js';

interface CreateEventArgs {
  cards_per_pack: number;
  event_type: string;
  modules: string[];
  name: string;
  other_players: string[];
  packs_per_player: number;
}

export default async function (
  parent: any,
  args: CreateEventArgs,
  context: CLMRequest
) {
  const { bearer, cube } = context;

  if (!bearer) {
    throw new HTTPError('You must be logged in to create an event.', 401);
  }

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  const {
    cards_per_pack,
    event_type,
    modules,
    name,
    other_players,
    packs_per_player
  } = args;
  let eventCardPool = [...cube.mainboard];

  cube.modules.forEach(function (module) {
    if (modules.includes(module._id.toString())) {
      eventCardPool = eventCardPool.concat(module.cards);
    }
  });

  cube.rotations.forEach(function (rotation) {
    eventCardPool = eventCardPool.concat(
      randomSampleWithoutReplacement(rotation.cards, rotation.size)
    );
  });

  shuffle(eventCardPool);

  let players = [
    {
      account: bearer._id,
      mainboard: [] as CubeCard[],
      packs: [] as CubeCard[][],
      queue: [] as CubeCard[][],
      sideboard: [] as CubeCard[]
    }
  ];

  other_players.forEach(function (other_player) {
    players.push({
      account: other_player as unknown as mongoose.Types.ObjectId,
      mainboard: [],
      packs: [],
      queue: [],
      sideboard: []
    });
  });

  shuffle(players);

  // dish out packs to players if event type is draft
  if (event_type === 'draft') {
    for (let i = 0; i < players.length; i++) {
      players[i].queue.push(eventCardPool.splice(0, cards_per_pack));
      for (let j = 1; j < packs_per_player; j++) {
        players[i].packs.push(eventCardPool.splice(0, cards_per_pack));
      }
    }
  } else {
    // dish out cards to players if event type is sealed
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < cards_per_pack * packs_per_player; j++) {
        players[i].mainboard.push(eventCardPool.pop()!);
      }
    }
  }

  const event = new EventModel({
    cube: cube._id,
    finished: event_type === 'sealed',
    host: bearer._id,
    name,
    players
  });

  await event.save();

  const otherPlayerAccounts = await AccountModel.find({
    _id: {
      $in: event.players
        .map((plr) => plr.account)
        .filter((accountID) => accountID !== bearer._id)
    }
  });
  for (const playerAccount of otherPlayerAccounts) {
    for (const pushSubscription of playerAccount.push_subscriptions) {
      webpush.sendNotification(
        pushSubscription,
        JSON.stringify({
          body: 'Wow; how thoughtful of them!  Make sure to mushroom stamp your competition real good.',
          title: `${bearer.name} invited you to their cube ${
            event_type === 'draft' ? 'draft' : 'sealed event'
          }, ${event.name}.`,
          url: `${process.env.FRONT_END_URL}/event/${event._id.toString()}`
        })
      );
    }
  }

  return event;
}
