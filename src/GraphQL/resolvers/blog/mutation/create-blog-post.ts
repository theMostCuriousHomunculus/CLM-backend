import webpush from 'web-push';
import { MongoError } from 'mongodb';

import AccountModel from '../../../../models/account-model.js';
import BlogPostModel from '../../../../models/blog-post-model.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface CreateBlogPostArgs {
  body: string;
  image: string;
  subtitle: string;
  title: string;
}

export default async function (
  parent: any,
  args: CreateBlogPostArgs,
  context: CLMRequest
) {
  const { body, image, subtitle, title } = args;
  const { bearer } = context;

  if (!bearer || !bearer.admin) {
    throw new HTTPError(
      'Only administrators may post articles on Cube Level Midnight.',
      401
    );
  }

  try {
    const date = new Date();
    const blogPost = new BlogPostModel({
      author: bearer._id,
      body,
      comments: [],
      createdAt: date,
      image,
      subtitle,
      title,
      updatedAt: date
    });

    await blogPost.save();

    const allAccounts = await AccountModel.find();

    for (const account of allAccounts) {
      for (const pushSubscription of account.push_subscriptions) {
        webpush.sendNotification(
          pushSubscription,
          JSON.stringify({
            body: `${blogPost.title}`,
            title: `🔥🔥🔥 new article on Cube Level Midnight from ${bearer.name}!`,
            url: `${process.env.FRONT_END_URL}/blog/${blogPost._id.toString()}`
          })
        );
      }
    }

    return blogPost;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new HTTPError(
        'The provided title has already been used.  Titles must be unique.',
        409
      );
    } else if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
