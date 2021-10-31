export default {
    subscribe: function (parent, args, context) {
        return context.pubsub.asyncIterator(context.match._id.toString());
    }
};
//# sourceMappingURL=subscribe-match.js.map