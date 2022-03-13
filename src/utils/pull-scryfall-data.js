import axios from 'axios';
import fs from 'fs';
import https from 'https';
import StreamArray from 'stream-json/streamers/StreamArray.js';

import ScryfallCardModel from '../mongodb/models/scryfall-card.js';

export default async function pullScryfallData() {
  console.time('Scryfall download');
  const bulkDataInfo = await axios.get('https://api.scryfall.com/bulk-data');
  const allCardsURI = bulkDataInfo.data.data.find(
    (obj) => obj.type === 'all_cards'
  ).download_uri;
  fs.rm('scryfall-card-data.json', () => {
    https.get(allCardsURI, (res) => {
      const filename = 'scryfall-card-data.json';
      const JSONDataFile = fs.createWriteStream(filename);
      res.pipe(JSONDataFile);
      JSONDataFile.on('finish', async () => {
        JSONDataFile.close();
        console.timeEnd('Scryfall download');
        console.time('Database update');
        // await ScryfallCardModel.deleteMany();
        const pipeline = fs
          .createReadStream(filename)
          .pipe(StreamArray.withParser());
        pipeline.on('data', ({ value }) => {
          const card = { ...value };
          try {
            card._id = card.id;
            delete card.id;
            card._set = card.set;
            delete card.set;
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

            ScryfallCardModel.findByIdAndUpdate(
              card._id,
              { card },
              { upsert: true },
              (err, doc) => {
                console.log('***');
                console.log(doc);
                console.log(err);
                console.log('***');
              }
            );
            // const cardDocument = new ScryfallCardModel(card);
            // cardDocument.save();
          } catch (error) {
            console.log('---');
            console.log(card);
            console.log(error);
            console.log('---');
          }
        });
        pipeline.on('end', () => console.timeEnd('Database update'));
      });
    });
  });
}
