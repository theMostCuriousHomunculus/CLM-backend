import BlogPostModel, {
  CommentModel
} from '../../../models/blog-post-model.js';
import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context) {
  const { blogPostID, commentID } = args;
  const article = await BlogPostModel.findById(blogPostID);
  const comment = await CommentModel.findById(commentID);

  if (context.account.admin || context.account._id === comment.author) {
    article.comments.pull({ _id: commentID });
    await article.save();
  } else {
    throw new HttpError('You are not authorized to delete this comment.', 401);
  }

  return true;
}
