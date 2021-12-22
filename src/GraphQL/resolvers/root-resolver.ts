// account
// import deleteAccount from './account-resolvers/delete-account.js';
import authenticate from './account/query/authenticate.js';
import deleteLocation from './account/mutation/delete-location.js';
import editAccount from './account/mutation/edit-account.js';
import fetchAccountByID from './account/query/fetch-account-by-id.js';
import location from './account/field/location.js';
import login from './account/mutation/login.js';
import logoutAllDevices from './account/mutation/logout-all-devices.js';
import logoutSingleDevice from './account/mutation/logout-single-device.js';
import postLocation from './account/mutation/post-location.js';
import register from './account/mutation/register.js';
import requestPasswordReset from './account/mutation/request-password-reset.js';
import searchAccounts from './account/query/search-accounts.js';
import submitPasswordReset from './account/mutation/submit-password-reset.js';

// blog
import createBlogPost from './blog/mutation/create-blog-post.js';
import createComment from './blog/mutation/create-comment.js';
import deleteBlogPost from './blog/mutation/delete-blog-post.js';
import deleteComment from './blog/mutation/delete-comment.js';
import editBlogPost from './blog/mutation/edit-blog-post.js';
import searchBlogPosts from './blog/query/search-blog-posts.js';
import fetchBlogPostByID from './blog/query/fetch-blog-post-by-id.js';
import subscribeBlogPost from './blog/subscription/subscribe-blog-post.js';

// cube
import addCardToCube from './cube/mutation/add-card-to-cube.js';
import cloneCube from './cube/mutation/clone-cube.js';
import createCube from './cube/mutation/create-cube.js';
import createModule from './cube/mutation/create-module.js';
import createRotation from './cube/mutation/create-rotation.js';
import deleteCard from './cube/mutation/delete-card.js';
import deleteCube from './cube/mutation/delete-cube.js';
import deleteModule from './cube/mutation/delete-module.js';
import deleteRotation from './cube/mutation/delete-rotation.js';
import editCard from './cube/mutation/edit-card.js';
import editCube from './cube/mutation/edit-cube.js';
import editModule from './cube/mutation/edit-module.js';
import editRotation from './cube/mutation/edit-rotation.js';
import fetchCubeByID from './cube/query/fetch-cube-by-id.js';
import searchCubes from './cube/query/search-cubes.js';
import subscribeCube from './cube/subscription/subscribe-cube.js';

// deck
import addCardsToDeck from './deck/mutation/add-cards-to-deck.js';
import cloneDeck from './deck/mutation/clone-deck.js';
import createDeck from './deck/mutation/create-deck.js';
import deleteDeck from './deck/mutation/delete-deck.js';
import editDeck from './deck/mutation/edit-deck.js';
import fetchDeckByID from './deck/query/fetch-deck-by-id.js';
import removeCardsFromDeck from './deck/mutation/remove-cards-from-deck.js';
import subscribeDeck from './deck/subscription/subscribe-deck.js';
import toggleMainboardSideboardDeck from './deck/mutation/toggle-mainboard-sideboard-deck.js';

// event
import addBasics from './event/mutation/add-basics.js';
import createEvent from './event/mutation/create-event.js';
import fetchEventByID from './event/query/fetch-event-by-id.js';
import removeBasics from './event/mutation/remove-basics.js';
import selectCard from './event/mutation/select-card.js';
import subscribeEvent from './event/subscription/subscribe-event.js';
import toggleMainboardSideboardEvent from './event/mutation/toggle-mainboard-sideboard-event.js';

// match
// import adjustCounters from './match-resolvers/adjust-counters.js';
// import adjustEnergyCounters from './match-resolvers/adjust-energy-counters.js';
// import adjustLifeTotal from './match-resolvers/adjust-life-total.js';
// import adjustPoisonCounters from './match-resolvers/adjust-poison-counters.js';
// import changeFaceDownImage from './match-resolvers/change-face-down-image.js';
// import concedeGame from './match-resolvers/concede-game.js';
// import createCopies from './match-resolvers/create-copies.js';
// import createMatch from './match-resolvers/create-match.js';
// import createTokens from './match-resolvers/create-tokens.js';
// import destroyCopyToken from './match-resolvers/destroy-copy-token.js';
// import dragCard from './match-resolvers/drag-card.js';
// import drawCard from './match-resolvers/draw-card.js';
// import fetchMatchByID from './match-resolvers/fetch-match-by-id.js';
// import flipCard from './match-resolvers/flip-card.js';
// import flipCoin from './match-resolvers/flip-coin.js';
// import gainControlOfCard from './match-resolvers/gain-control-of-card.js';
// import mulligan from './match-resolvers/mulligan.js';
// import ready from './match-resolvers/ready.js';
// import revealCard from './match-resolvers/reveal-card.js';
// import rollDice from './match-resolvers/roll-dice.js';
// import shuffleLibrary from './match-resolvers/shuffle-library.js';
// import subscribeMatch from './match-resolvers/subscribe-match.js';
// import tapUntapCards from './match-resolvers/tap-untap-cards.js';
// import toggleMainboardSideboardMatch from './match-resolvers/toggle-mainboard-sideboard-match.js';
// import transferCard from './match-resolvers/transfer-card.js';
// import turnCard from './match-resolvers/turn-card.js';
// import viewCard from './match-resolvers/view-card.js';
// import viewZone from './match-resolvers/view-zone.js';

// custom field resolvers
import account_decks from './account/field/decks.js';
import author from './blog/field/author.js';
import buds from './account/field/buds.js';
import cube_creator from './cube/field/cube-creator.js';
import cube from './match/cube.js';
import cubes from './account/field/cubes.js';
import current_pack from './event/field/current-pack.js';
import deck_creator from './deck/field/deck-creator.js';
import email from './account/field/email.js';
import event from './match/event.js';
import event_account from './event/field/event-account.js';
import events from './account/field/events.js';
import host from './event/field/host.js';
import match_account from './match/match-account.js';
import match_decks from './match/decks.js';
import matches from './account/field/matches.js';
import nearby_users from './account/field/nearby-users.js';
import received_bud_requests from './account/field/received-bud-requests.js';
import sent_bud_requests from './account/field/sent-bud-requests.js';
import token from './account/field/token.js';
import unknownArray from './event/field/unknown-array.js';
import unknownCard from './match/unknown-card.js';

export default {
  AccountType: {
    buds,
    cubes,
    decks: account_decks,
    email,
    events,
    location,
    matches,
    nearby_users,
    received_bud_requests,
    sent_bud_requests,
    token
  },
  BlogPostType: {
    author
  },
  CommentType: {
    author
  },
  CubeType: {
    creator: cube_creator
  },
  DeckType: {
    creator: deck_creator
  },
  EventPlayerType: {
    account: event_account,
    current_pack,
    mainboard: unknownArray,
    sideboard: unknownArray
  },
  EventType: {
    cube,
    host
  },
  MatchCardType: {
    name: unknownCard
  },
  MatchPlayerType: {
    account: match_account
  },
  MatchType: {
    cube,
    decks: match_decks,
    event
  },
  Mutation: {
    // account
    // deleteAccount,
    deleteLocation,
    editAccount,
    login,
    logoutAllDevices,
    logoutSingleDevice,
    postLocation,
    register,
    requestPasswordReset,
    submitPasswordReset,
    // blog
    createBlogPost,
    createComment,
    deleteBlogPost,
    deleteComment,
    editBlogPost,
    // cube
    addCardToCube,
    cloneCube,
    createCube,
    createModule,
    createRotation,
    deleteCard,
    deleteCube,
    deleteModule,
    deleteRotation,
    editCard,
    editCube,
    editModule,
    editRotation,
    // deck
    addCardsToDeck,
    cloneDeck,
    createDeck,
    deleteDeck,
    editDeck,
    removeCardsFromDeck,
    toggleMainboardSideboardDeck,
    // event
    addBasics,
    createEvent,
    removeBasics,
    selectCard,
    toggleMainboardSideboardEvent
    // match
    // adjustCounters,
    // adjustEnergyCounters,
    // adjustLifeTotal,
    // adjustPoisonCounters,
    // changeFaceDownImage,
    // concedeGame,
    // createCopies,
    // createMatch,
    // createTokens,
    // destroyCopyToken,
    // dragCard,
    // drawCard,
    // flipCard,
    // flipCoin,
    // gainControlOfCard,
    // mulligan,
    // ready,
    // revealCard,
    // rollDice,
    // shuffleLibrary,
    // tapUntapCards,
    // toggleMainboardSideboardMatch,
    // transferCard,
    // turnCard,
    // viewCard,
    // viewZone
  },
  Query: {
    // account
    authenticate,
    fetchAccountByID,
    searchAccounts,
    // blog
    fetchBlogPostByID,
    searchBlogPosts,
    // cube
    fetchCubeByID,
    searchCubes,
    // deck
    fetchDeckByID,
    // event
    fetchEventByID
    // match
    // fetchMatchByID
  },
  Subscription: {
    // account
    // blog
    subscribeBlogPost,
    // cube
    subscribeCube,
    // deck
    subscribeDeck,
    // event
    subscribeEvent
    // match
    // subscribeMatch
  }
};
