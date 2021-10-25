export default {
  subscribe: function (parent, args, context) {
    return context.pubsub.asyncIterator(context.deck._id.toString());
  }
};
