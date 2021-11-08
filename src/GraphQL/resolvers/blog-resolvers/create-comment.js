import { CommentModel } from '../../../models/blog-post-model.js';
import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context) {
  const { account, blogPost, pubsub } = context;

  if (!account)
    throw new HttpError('You must be logged in to comment on posts.', 401);

  const { body } = args;

  const comment = new CommentModel({
    author: account._id,
    body
  });

  blogPost.comments.push(comment);

  await blogPost.save();
  pubsub.publish(blogPost._id.toString(), { subscribeBlogPost: blogPost });

  return blogPost;
}
