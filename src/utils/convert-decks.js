import mongoose from 'mongoose';

import DeckModel from '../mongodb/models/deck.js';

export default async function () {
  const allDecks = await DeckModel.find();

  for (const deck of allDecks) {
    // for (const component of ['mainboard', 'sideboard']) {
    //   const newArray = [];
    //   for (const oldCardObject of deck[component]) {
    //     const newCardObject = newArray.find(
    //       (cardObject) => cardObject.scryfall_id === oldCardObject.scryfall_id
    //     );
    //     if (newCardObject) {
    //       newCardObject.count++;
    //     } else {
    //       newArray.push({
    //         _id: new mongoose.Types.ObjectId(),
    //         count: 1,
    //         scryfall_id: oldCardObject.scryfall_id
    //       });
    //     }
    //   }
    //   deck[component] = newArray;
    // }
    // deck.save

    const cards = [];
    for (const oldCardObject of deck.mainboard) {
      const newCardObject = cards.find(
        (cardObject) => cardObject.scryfall_id === oldCardObject.scryfall_id
      );
      if (newCardObject) {
        newCardObject.mainboard_count = oldCardObject.count;
      } else {
        cards.push({
          _id: new mongoose.Types.ObjectId(),
          mainboard_count: oldCardObject.count,
          scryfall_id: oldCardObject.scryfall_id,
          sideboard_count: 0
        });
      }
    }
    for (const oldCardObject of deck.sideboard) {
      const newCardObject = cards.find(
        (cardObject) => cardObject.scryfall_id === oldCardObject.scryfall_id
      );
      if (newCardObject) {
        newCardObject.sideboard_count = oldCardObject.count;
      } else {
        cards.push({
          _id: new mongoose.Types.ObjectId(),
          mainboard_count: 0,
          scryfall_id: oldCardObject.scryfall_id,
          sideboard_count: oldCardObject.count
        });
      }
    }
    // for (const component of ['mainboard', 'sideboard']) {
    //   for (const oldCardObject of deck[component]) {
    //     const newCardObject = cards.find(
    //       (cardObject) => cardObject.scryfall_id === oldCardObject.scryfall_id
    //     );
    //     if (newCardObject) {
    //       if (component === 'mainboard') {
    //         newCardObject.mainboard_count = oldCardObject.count;
    //       }
    //       if (component === 'sideboard') {
    //         newCardObject.sideboard_count = oldCardObject.count;
    //       }
    //     } else {
    //       if (component === 'mainboard') {
    //         cards.push({
    //           _id: new mongoose.Types.ObjectId(),
    //           mainboard_count: oldCardObject.count,
    //           scryfall_id: oldCardObject.scryfall_id,
    //           sideboard_count: 0
    //         });
    //       }
    //       if (component === 'sideboard') {
    //         cards.push({
    //           _id: new mongoose.Types.ObjectId(),
    //           mainboard_count: 0,
    //           scryfall_id: oldCardObject.scryfall_id,
    //           sideboard_count: oldCardObject.count
    //         });
    //       }
    //     }
    //   }
    // }
    deck.cards = cards;
    // delete deck.mainboard;
    // delete deck.sideboard;
    deck.mainboard = undefined;
    deck.sideboard = undefined;
    // deck.mainboard = [];
    // deck.sideboard = [];
    deck.save();
  }
}
