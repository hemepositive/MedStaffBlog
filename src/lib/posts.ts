import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from '../content.config';

export type Post = CollectionEntry<'posts'>;

/** URL path segment for a post (legacy posts carry an explicit slug). */
export function postSlug(post: Post): string {
  return post.data.slug ?? post.id;
}

export function postUrl(post: Post): string {
  return `/${postSlug(post)}`;
}

/**
 * Attention flags never expire by date — many readers visit infrequently.
 * A post stays flagged until an editor sets its urgency back to 'info'.
 * The homepage caps the attention *cards* at the newest few; older flagged
 * posts keep their "Attention" chip in streams and category listings.
 */
export function isAttention(post: Post): boolean {
  return post.data.urgency !== 'info';
}

/** Pinned banner shows until an editor removes `pinned: true`. */
export function isPinned(post: Post): boolean {
  return post.data.pinned;
}

/** Unlike attention flags, announcements are time-sensitive and drop off after 12 months. */
export function isRecent(post: Post): boolean {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setUTCMonth(twelveMonthsAgo.getUTCMonth() - 12);
  return post.data.date.getTime() >= twelveMonthsAgo.getTime();
}

export async function getPostsNewestFirst(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function byCategory(posts: Post[], category: Category): Post[] {
  return posts.filter((p) => p.data.category === category);
}

/** "June 2026" — the site shows month-level dates only. */
export function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** "July 19, 2026" — effective dates keep the day; they are clinically meaningful. */
export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
