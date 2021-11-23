import { MongoError } from 'mongodb';
import BlogPost from '../../../types/interfaces/BlogPost';
import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';

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
  const { account, blogPost, pubsub } = context;

  if (!blogPost) {
    throw new HTTPError(
      'Could not find a blog post with the provided BlogPostID.',
      404
    );
  }

  if (account?._id.toString() !== blogPost.author.toString()) {
    throw new HTTPError('You are not authorized to edit this blog post.', 401);
  }

  try {
    for (const field of [
      'body' as keyof (EditBlogPostArgs | BlogPost),
      'image' as keyof (EditBlogPostArgs | BlogPost),
      'subtitle' as keyof (EditBlogPostArgs | BlogPost),
      'title' as keyof (EditBlogPostArgs | BlogPost)
    ]) {
      if (args[field]) blogPost[field] = args[field];
    }

    blogPost.updatedAt = new Date();

    await blogPost.save();
    pubsub?.publish(blogPost._id.toString(), { subscribeBlogPost: blogPost });

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
