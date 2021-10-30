export default {
  subscribe: function (parent, args, context) {
    return context.pubsub.asyncIterator(context.event._id.toString());
  }
};
