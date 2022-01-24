import { MongoError } from 'mongodb';

import BlogPost from '../../../../types/interfaces/BlogPost';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface EditBlogPostArgs {
  body?: string;
  image?: string;
  published?: boolean;
  subtitle?: string;
  title?: string;
}

export default async function (
  parent: any,
  args: EditBlogPostArgs,
  context: CLMRequest
) {
  const { bearer, blogPost } = context;

  if (!blogPost) {
    throw new HTTPError(
      'Could not find a blog post with the provided BlogPostID.',
      404
    );
  }

  if (!bearer || bearer._id.toString() !== blogPost.author.toString()) {
    throw new HTTPError('You are not authorized to edit this blog post.', 401);
  }

  try {
    for (const field of ['body', 'image', 'published', 'subtitle', 'title']) {
      if (field in args) {
        (blogPost[field as keyof BlogPost] as any) =
          args[field as keyof EditBlogPostArgs];
      }
    }

    blogPost.updatedAt = new Date();

    await blogPost.save();
    pubsub.publish(blogPost._id.toString(), { subscribeBlogPost: blogPost });

    return blogPost;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new HTTPError(
        'The provided title is already in use.  Titles must be unique.',
        409
      );
    } else {
      throw new HTTPError((error as Error).message, 500);
    }
  }
}
