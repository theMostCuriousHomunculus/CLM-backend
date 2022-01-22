import { MongoError } from 'mongodb';

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

  blogPost.comments.push({
    author: bearer._id,
    body
  });

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
