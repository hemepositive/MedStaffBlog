import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from '../content.config';

export type Post = CollectionEntry<'posts'>;

const SIX_WEEKS_MS = 6 * 7 * 24 * 60 * 60 * 1000;

/** URL path segment for a post (legacy posts carry an explicit slug). */
export function postSlug(post: Post): string {
  return post.data.slug ?? post.id;
}

export function postUrl(post: Post): string {
  return `/${postSlug(post)}`;
}

/** Date a post stops being eligible for the attention zone / pinned banner. */
export function attentionCutoff(post: Post): Date {
  if (post.data.expires) return post.data.expires;
  const base = post.data.effectiveDate ?? post.data.date;
  return new Date(base.getTime() + SIX_WEEKS_MS);
}

export function isInAttentionZone(post: Post, now = new Date()): boolean {
  return post.data.urgency !== 'info' && now < attentionCutoff(post);
}

export function isPinned(post: Post, now = new Date()): boolean {
  return post.data.pinned && now < attentionCutoff(post);
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
