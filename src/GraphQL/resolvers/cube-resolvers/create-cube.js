import axios from 'axios';
import CSVString from 'csv-string';

import Cube from '../../../models/cube-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  if (!context.account)
    throw new HTTPError('You must be logged in to create a cube.', 401);

  const { cobraID, description, name } = args;
  const cardArray = [];

  if (cobraID) {
    const cubeCobraResponse = await axios.get(
      `https://cubecobra.com/cube/download/csv/${cobraID}`
    );

    CSVString.forEach(cubeCobraResponse.data, ',', function (card, index) {
      if (index > 0 && card[4] && card[5]) {
        cardArray.push({
          set: card[4],
          collector_number: card[5]
        });
      }
    });

    // according to scryfall api documentation, "A maximum of 75 card references may be submitted per request."
    const numberOfScryfallRequests = Math.ceil(cardArray.length / 75);
    const scryfallRequestArrays = [];

    for (
      let requestNumber = 0;
      requestNumber < numberOfScryfallRequests;
      requestNumber++
    ) {
      scryfallRequestArrays.push(cardArray.splice(0, 75));
    }

    for (let request of scryfallRequestArrays) {
      const scryfallResponse = await axios.post(
        'https://api.scryfall.com/cards/collection',
        {
          identifiers: request
        }
      );

      for (let card of scryfallResponse.data.data) {
        cardArray.push({ name: card.name, scryfall_id: card.id });
      }
    }
  }

  const cube = new Cube({
    creator: context.account._id,
    description,
    mainboard: await Promise.all(cardArray),
    name
  });
  await cube.save();

  return cube;
}
