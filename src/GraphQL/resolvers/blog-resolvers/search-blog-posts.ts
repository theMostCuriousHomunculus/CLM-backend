import BlogPostModel from '../../../models/blog-post-model.js';

interface SearchBlogPostArgs {
  search: string;
}

export default async function (parent: any, args: SearchBlogPostArgs) {
  // not sure if the if-else is necessary; will test later
  if (args.search) {
    return await BlogPostModel.find(
      { $text: { $search: args.search } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
  } else {
    return await BlogPostModel.find().sort('-createdAt');
  }
}
