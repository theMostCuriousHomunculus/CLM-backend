import BlogPostModel from '../../../models/blog-post-model.js';

export default async function (parent, args) {
  let matchingBlogPosts;

  // not sure if the if-else is necessary; will test later
  if (args.search) {
    matchingBlogPosts = await BlogPostModel.find(
      { $text: { $search: args.search } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
  } else {
    matchingBlogPosts = await BlogPostModel.find().sort('-createdAt');
  }

  return matchingBlogPosts;
}
