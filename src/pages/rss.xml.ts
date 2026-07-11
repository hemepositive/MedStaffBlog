import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPostsNewestFirst, postUrl } from '../lib/posts';
import { CATEGORIES } from '../content.config';

export async function GET(context: APIContext) {
  const posts = await getPostsNewestFirst();
  return rss({
    title: 'HH Medical Staff News',
    description: 'News and updates for the Huntsville Hospital medical staff.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [CATEGORIES[post.data.category]],
    })),
  });
}
