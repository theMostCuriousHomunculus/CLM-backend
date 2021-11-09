import BlogPostModel from '../../../models/blog-post-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args, context) {
  const { body, image, subtitle, title } = args;
  const { account } = context;

  if (!account || !account.admin)
    throw new HTTPError(
      'Only administrators may post articles on Cube Level Midnight.',
      401
    );

  try {
    const date = new Date();
    const blogPost = new BlogPostModel({
      author: account._id,
      body,
      comments: [],
      createdAt: date,
      image,
      subtitle,
      title,
      updatedAt: date
    });

    await blogPost.save();

    return blogPost;
  } catch (error) {
    if (error.code === 11000) {
      // 11000 appears to be the mongodb error code for a duplicate key
      error.message =
        'The provided title is already in use.  Titles must be unique.';
      error.code = 409;
    }

    throw error;
  }
}
