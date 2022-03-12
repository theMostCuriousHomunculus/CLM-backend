import axios from 'axios';
import StreamArray from 'stream-json/streamers/StreamArray.js';

import ScryfallCardModel from '../mongodb/models/scryfall-card.js';

export default async function pullScryfallData() {
  await ScryfallCardModel.deleteMany();

  const bulkDataInfo = await axios.get('https://api.scryfall.com/bulk-data');
  const allCardsURI = bulkDataInfo.data.data.find(
    (obj) => obj.type === 'all_cards'
  ).download_uri;
  axios({ method: 'get', responseType: 'stream', url: allCardsURI }).then(
    (res) => {
      const pipeline = res.data.pipe(StreamArray.withParser());
      pipeline.on('data', ({ value }) => {
        const card = { ...value };
        card._id = card.id;
        delete card.id;
        delete card.content_warning;
        delete card.object;

        if ('all_parts' in card) {
          for (const part of card.all_parts) {
            part._id = part.id;
            delete part.id;
            delete part.object;
          }
        }

        if ('card_faces' in card) {
          for (const face of card.card_faces) {
            delete face.object;
          }
        }

        const cardDocument = new ScryfallCardModel(card);
        // const { oracle_id, scryfall_uri } = value;
        // const cardDocument = new ScryfallCardModel({ oracle_id, scryfall_uri });
        cardDocument.save();
      });
    }
  );
}
