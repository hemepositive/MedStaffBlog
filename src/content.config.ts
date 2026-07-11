import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  'it-ehr': 'IT & EHR Updates',
  clinical: 'Clinical Updates',
  education: 'Education & CME',
  announcements: 'Announcements',
} as const;

export type Category = keyof typeof CATEGORIES;

const posts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*'], base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    category: z.enum(['it-ehr', 'clinical', 'education', 'announcements']),
    urgency: z.enum(['critical', 'warning', 'info']).default('info'),
    // When the change takes effect for clinicians (shown on cards/articles).
    effectiveDate: z.coerce.date().optional(),
    // Attention/pinned status never expires by date; an editor clears it by
    // setting urgency back to 'info' or removing pinned. See src/lib/posts.ts.
    pinned: z.boolean().default(false),
  }),
});

export const collections = { posts };
