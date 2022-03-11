import axios from 'axios';

import ScryfallCardModel from '../mongodb/models/scryfall-card.js';

export default async function pullScryfallData() {
  if (ScryfallCardModel.collection) await ScryfallCardModel.collection.drop();

  const bulkDataInfo = await axios.get('https://api.scryfall.com/bulk-data');
  console.log(bulkDataInfo.data);
  const allCardsURI = bulkDataInfo.data.data.find(
    (obj: { download_uri: string; type: string }) => obj.type === 'all_cards'
  ).download_uri;
  const allCardsData = await axios.get(allCardsURI);
  console.log(allCardsData.data[0]);

  for (const card of allCardsData.data) {
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

    const newScryfallCard = new ScryfallCardModel(card);
    newScryfallCard.save();
  }
}
