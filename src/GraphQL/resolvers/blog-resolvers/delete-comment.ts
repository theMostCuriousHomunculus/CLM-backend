import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';

interface DeleteCommentArgs {
  commentID: string;
}

export default async function (
  parent: any,
  args: DeleteCommentArgs,
  context: CLMRequest
) {
  const { commentID } = args;
  const { account, blogPost } = context;

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

  if (account?.admin || account?._id === comment.author) {
    blogPost.comments.pull({ _id: commentID });
    await blogPost.save();
    return true;
  } else {
    throw new HTTPError('You are not authorized to delete this comment.', 401);
  }
}
