import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface DeleteCommentArgs {
  commentID: string;
}

export default async function (
  parent: any,
  args: DeleteCommentArgs,
  context: CLMRequest
) {
  const { commentID } = args;
  const { bearer, blogPost } = context;

  if (!blogPost) {
    throw new HTTPError(
      'Could not find a blog post with the provided ID.',
      404
    );
  }

  const comment = blogPost.comments.id(commentID);

  if (!comment) {
    throw new HTTPError('Could not find a comment with the provided ID.', 404);
  }

  if (
    !bearer ||
    (!bearer.admin && bearer._id.toString() !== comment.author.toString())
  ) {
    throw new HTTPError('You are not authorized to delete this comment.', 401);
  }

  try {
    blogPost.comments.pull({ _id: commentID });
    await blogPost.save();
    return true;
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
