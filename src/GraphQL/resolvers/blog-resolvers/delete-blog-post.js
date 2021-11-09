import BlogPostModel from '../../../models/blog-post-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const blogPost = await BlogPostModel.findById(args._id);

  if (blogPost.author.toString() === context.account._id.toString()) {
    await blogPost.delete();
  } else {
    throw new HTTPError(
      'You are not authorized to delete this blog post.',
      401
    );
  }

  return true;
}
