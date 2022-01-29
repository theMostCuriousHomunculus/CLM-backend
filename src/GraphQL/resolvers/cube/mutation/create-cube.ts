import axios from 'axios';
import CSVString from 'csv-string';
import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import CubeModel from '../../../../mongodb/models/cube.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface CreateCubeArgs {
  cobraID?: string;
  description: string;
  name: string;
}

interface CardIdentifier {
  [key: string]: string;
}

export default async function (
  parent: any,
  args: CreateCubeArgs,
  context: CLMRequest
) {
  try {
    const { bearer } = context;

    if (!bearer) {
      throw new HTTPError('You must be logged in to create a cube.', 401);
    }

    const { cobraID, description, name } = args;

    if (await CubeModel.findOne({ name })) {
      throw new HTTPError(
        `A cube named "${name}" already exists.  Cube names must be unique.`,
        409
      );
    }

    const cardArray = [] as CardIdentifier[];

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

      for (const request of scryfallRequestArrays) {
        const scryfallResponse = await axios.post(
          'https://api.scryfall.com/cards/collection',
          {
            identifiers: request
          }
        );

        for (const card of scryfallResponse.data.data) {
          cardArray.push({ name: card.name, scryfall_id: card.id });
        }
      }
    }

    const cube = new CubeModel({
      creator: bearer._id,
      description,
      mainboard: await Promise.all(cardArray),
      name
    });
    await cube.save();

    return cube;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new HTTPError(
        'The provided cube name has already been used.  Cube names must be unique.',
        409
      );
    } else if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
