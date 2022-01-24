import BlogPostModel from '../../../../mongodb/models/blog-post.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';

interface SearchBlogPostArgs {
  search?: string;
}

export default async function (
  parent: any,
  args: SearchBlogPostArgs,
  context: CLMRequest
) {
  const { search } = args;
  const { bearer } = context;

  if (search) {
    return await BlogPostModel.find(
      {
        $text: { $search: search },
        $or: [{ published: true }, { author: bearer?._id }]
      },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
  } else {
    return await BlogPostModel.find({
      $or: [{ published: true }, { author: bearer?._id }]
    }).sort('-createdAt');
  }
}
