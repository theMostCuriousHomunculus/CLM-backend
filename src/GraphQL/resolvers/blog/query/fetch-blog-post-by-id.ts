import HTTPError from '../../../../types/classes/HTTPError.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer, blogPost } = context;

  if (
    blogPost &&
    (blogPost.published ||
      blogPost.author.toString() === bearer?._id.toString())
  ) {
    return blogPost;
  } else {
    throw new HTTPError(
      'A blog post with the provided ID was not found in our system or it has not yet been published by its author.',
      404
    );
  }
}
