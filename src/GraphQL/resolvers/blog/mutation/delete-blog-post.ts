import BlogPostModel from '../../../../mongodb/models/blog-post.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface DeleteBlogPostArgs {
  _id: string;
}

export default async function (
  parent: any,
  args: DeleteBlogPostArgs,
  context: CLMRequest
) {
  const { bearer } = context;
  const blogPost = await BlogPostModel.findById(args._id);

  if (!blogPost) {
    throw new HTTPError(
      'Could not find a blog post with the provided ID.',
      404
    );
  }

  if (blogPost.author.toString() === bearer?._id.toString()) {
    await blogPost.delete();
  } else {
    throw new HTTPError(
      'You are not authorized to delete this blog post.',
      401
    );
  }

  return true;
}
