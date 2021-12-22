import CLMRequest from '../../../../types/interfaces/CLMRequest';

export default async function (parent: any, args: null, context: CLMRequest) {
  return context.blogPost;
}
