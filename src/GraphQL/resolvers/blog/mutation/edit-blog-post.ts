import { MongoError } from 'mongodb';

import BlogPost from '../../../../types/interfaces/BlogPost';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface EditBlogPostArgs {
  body: string;
  image: string;
  subtitle: string;
  title: string;
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
    for (const field of ['body', 'image', 'subtitle', 'title']) {
      if (args[field as keyof EditBlogPostArgs]) {
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
    } else if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
