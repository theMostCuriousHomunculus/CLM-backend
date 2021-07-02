import axios from 'axios';

import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context, info) {

  const { event, player, pubsub } = context;

  if (!event) throw new HttpError("An event with the provided ID does not exist or you were not invited to it.", 404);

  const { input: { numberOfCopies, scryfallID } } = args;
  const scryfallResponse = await axios.get(`https://api.scryfall.com/cards/${scryfallID}`);

  for (let i = 0; i < numberOfCopies; i++) {
    player.mainboard.push({
      cmc: 0,
      color_identiy: [],
      image: scryfallResponse.data.image_uris.normal,
      mtgo_id: scryfallResponse.data.mtgo_id,
      name: scryfallResponse.data.name,
      oracle_id: scryfallResponse.data.oracle_id,
      printing: `${scryfallResponse.data.set_name} - ${scryfallResponse.data.collector_number}`,
      type_line: scryfallResponse.data.type_line
    });
  }

  await event.save();
  pubsub.publish(event._id.toString(), { subscribeEvent: event });

  return event;
};