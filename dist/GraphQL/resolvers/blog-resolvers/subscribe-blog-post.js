export default {
    subscribe: function (parent, args, context) {
        return context.pubsub.asyncIterator(context.blogPost._id.toString());
    }
};
//# sourceMappingURL=subscribe-blog-post.js.map