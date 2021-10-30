export default {
  subscribe: function (parent, args, context) {
    return context.pubsub.asyncIterator(context.cube._id.toString());
  }
};
