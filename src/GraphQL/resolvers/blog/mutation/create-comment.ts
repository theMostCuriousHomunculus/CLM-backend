import { MongoError } from 'mongodb';

import { CommentModel } from '../../../../models/blog-post-model.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface CreateCommentArgs {
  body: string;
}

export default async function (
  parent: any,
  args: CreateCommentArgs,
  context: CLMRequest
) {
  const { bearer, blogPost } = context;
  const { body } = args;

  if (!bearer) {
    throw new HTTPError('You must be logged in to comment on posts.', 401);
  }

  if (!blogPost) {
    throw new HTTPError(
      'Could not find a blog post with the provided ID.',
      404
    );
  }

  const comment = new CommentModel({
    author: bearer._id,
    body
  });

  blogPost.comments.push(comment);

  try {
    await blogPost.save();
    pubsub.publish(blogPost._id.toString(), { subscribeBlogPost: blogPost });

    return blogPost;
  } catch (error) {
    if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
