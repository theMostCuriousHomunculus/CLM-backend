import { CommentModel } from '../../../models/blog-post-model.js';
import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';

interface CreateCommentArgs {
  body: string;
}

export default async function (
  parent: any,
  args: CreateCommentArgs,
  context: CLMRequest
) {
  const { account, blogPost, pubsub } = context;
  const { body } = args;

  if (!account) {
    throw new HTTPError('You must be logged in to comment on posts.', 401);
  }

  if (!blogPost) {
    throw new HTTPError(
      'Could not find a blog post with the provided ID.',
      404
    );
  }

  const comment = new CommentModel({
    author: account._id,
    body
  });

  blogPost.comments.push(comment);

  await blogPost.save();
  pubsub?.publish(blogPost._id.toString(), { subscribeBlogPost: blogPost });

  return blogPost;
}
