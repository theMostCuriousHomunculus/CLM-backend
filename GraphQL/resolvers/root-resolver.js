// account
// import deleteAccount from './account-resolvers/delete-account.js';
import editAccount from './account-resolvers/edit-account.js';
import fetchAccountByID from './account-resolvers/fetch-account-by-id.js';
import login from './account-resolvers/login.js';
import logoutAllDevices from './account-resolvers/logout-all-devices.js';
import logoutSingleDevice from './account-resolvers/logout-single-device.js';
import register from './account-resolvers/register.js';
import requestPasswordReset from './account-resolvers/request-password-reset.js';
import searchAccounts from './account-resolvers/search-accounts.js';
import submitPasswordReset from './account-resolvers/submit-password-reset.js';

// blog
import createBlogPost from './blog-resolvers/create-blog-post.js';
import createComment from './blog-resolvers/create-comment.js';
import deleteBlogPost from './blog-resolvers/delete-blog-post.js';
import deleteComment from './blog-resolvers/delete-comment.js';
import editBlogPost from './blog-resolvers/edit-blog-post.js';
import searchBlogPosts from './blog-resolvers/search-blog-posts.js';
import fetchBlogPostByID from './blog-resolvers/fetch-blog-post-by-id.js';
import subscribeBlogPost from './blog-resolvers/subscribe-blog-post.js';

// cube
import addCardToCube from './cube-resolvers/add-card-to-cube.js';
import cloneCube from './cube-resolvers/clone-cube.js';
import createCube from './cube-resolvers/create-cube.js';
import createModule from './cube-resolvers/create-module.js';
import createRotation from './cube-resolvers/create-rotation.js';
import deleteCard from './cube-resolvers/delete-card.js';
import deleteCube from './cube-resolvers/delete-cube.js';
import deleteModule from './cube-resolvers/delete-module.js';
import deleteRotation from './cube-resolvers/delete-rotation.js';
import editCard from './cube-resolvers/edit-card.js';
import editCube from './cube-resolvers/edit-cube.js';
import editModule from './cube-resolvers/edit-module.js';
import editRotation from './cube-resolvers/edit-rotation.js';
import fetchCubeByID from './cube-resolvers/fetch-cube-by-id.js';
import searchCubes from './cube-resolvers/search-cubes.js';
import subscribeCube from './cube-resolvers/subscribe-cube.js';

// deck
import addCardsToDeck from './deck-resolvers/add-cards-to-deck.js';
import cloneDeck from './deck-resolvers/clone-deck.js';
import createDeck from './deck-resolvers/create-deck.js';
import deleteDeck from './deck-resolvers/delete-deck.js';
import editDeck from './deck-resolvers/edit-deck.js';
import fetchDeckByID from './deck-resolvers/fetch-deck-by-id.js';
import removeCardsFromDeck from './deck-resolvers/remove-cards-from-deck.js';
import subscribeDeck from './deck-resolvers/subscribe-deck.js';
import toggleMainboardSideboardDeck from './deck-resolvers/toggle-mainboard-sideboard-deck.js';

// event
import addBasics from './event-resolvers/add-basics.js';
import createEvent from './event-resolvers/create-event.js';
import fetchEventByID from './event-resolvers/fetch-event-by-id.js';
import removeBasics from './event-resolvers/remove-basics.js';
import selectCard from './event-resolvers/select-card.js';
import sortCard from './event-resolvers/sort-card.js';
import subscribeEvent from './event-resolvers/subscribe-event.js';
import toggleMainboardSideboardEvent from './event-resolvers/toggle-mainboard-sideboard-event.js';

// match
import adjustCounters from './match-resolvers/adjust-counters.js';
import adjustEnergyCounters from './match-resolvers/adjust-energy-counters.js';
import adjustLifeTotal from './match-resolvers/adjust-life-total.js';
import adjustPoisonCounters from './match-resolvers/adjust-poison-counters.js';
import changeFaceDownImage from './match-resolvers/change-face-down-image.js';
import concedeGame from './match-resolvers/concede-game.js';
import current_pack from './event-resolvers/current-pack.js';
import createCopies from './match-resolvers/create-copies.js';
import createMatch from './match-resolvers/create-match.js';
import createTokens from './match-resolvers/create-tokens.js';
import destroyCopyToken from './match-resolvers/destroy-copy-token.js';
import dragCard from './match-resolvers/drag-card.js';
import drawCard from './match-resolvers/draw-card.js';
import fetchMatchByID from './match-resolvers/fetch-match-by-id.js';
import flipCard from './match-resolvers/flip-card.js';
import flipCoin from './match-resolvers/flip-coin.js';
import gainControlOfCard from './match-resolvers/gain-control-of-card.js';
import mulligan from './match-resolvers/mulligan.js';
import ready from './match-resolvers/ready.js';
import revealCard from './match-resolvers/reveal-card.js';
import rollDice from './match-resolvers/roll-dice.js';
import shuffleLibrary from './match-resolvers/shuffle-library.js';
import subscribeMatch from './match-resolvers/subscribe-match.js';
import tapUntapCards from './match-resolvers/tap-untap-cards.js';
import toggleMainboardSideboardMatch from './match-resolvers/toggle-mainboard-sideboard-match.js';
import transferCard from './match-resolvers/transfer-card.js';
import turnCard from './match-resolvers/turn-card.js';
import viewCard from './match-resolvers/view-card.js';
import viewZone from './match-resolvers/view-zone.js';

// custom field resolvers
import account_decks from './account-resolvers/decks.js';
import author from './blog-resolvers/author.js';
import buds from './account-resolvers/buds.js';
import creator from './cube-resolvers/creator.js';
import cube from './match-resolvers/cube.js';
import cubes from './account-resolvers/cubes.js';
import email from './account-resolvers/email.js';
import event from './match-resolvers/event.js';
import event_account from './event-resolvers/event-account.js';
import events from './account-resolvers/events.js';
import host from './event-resolvers/host.js';
import match_account from './match-resolvers/match-account.js';
import match_decks from './match-resolvers/decks.js';
import matches from './account-resolvers/matches.js';
import received_bud_requests from './account-resolvers/received-bud-requests.js';
import sent_bud_requests from './account-resolvers/sent-bud-requests.js';
import unknownArray from './event-resolvers/unknown-array.js';
import unknownCard from './match-resolvers/unknown-card.js';

export default {
  AccountType: {
    buds,
    cubes,
    decks: account_decks,
    email,
    events,
    matches,
    received_bud_requests,
    sent_bud_requests
  },
  BlogPostType: {
    author
  },
  CommentType: {
    author
  },
  CubeType: {
    creator
  },
  DeckType: {
    creator
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
    back_image: unknownCard,
    image: unknownCard,
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
    editAccount,
    login,
    logoutAllDevices,
    logoutSingleDevice,
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
    sortCard,
    toggleMainboardSideboardEvent,
  // match
    adjustCounters,
    adjustEnergyCounters,
    adjustLifeTotal,
    adjustPoisonCounters,
    changeFaceDownImage,
    concedeGame,
    createCopies,
    createMatch,
    createTokens,
    destroyCopyToken,
    dragCard,
    drawCard,
    flipCard,
    flipCoin,
    gainControlOfCard,
    mulligan,
    ready,
    revealCard,
    rollDice,
    shuffleLibrary,
    tapUntapCards,
    toggleMainboardSideboardMatch,
    transferCard,
    turnCard,
    viewCard,
    viewZone,
  },
  Query: {
  // account
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
    fetchEventByID,
  // match
    fetchMatchByID
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
    subscribeEvent,
  // match
    subscribeMatch
  }
};