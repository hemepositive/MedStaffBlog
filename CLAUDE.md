# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro v7 static site for Hannibal Health medical staff news (medicalstaffnews.com): IT & EHR updates, clinical/order-set changes, education & CME, and announcements for physicians and APPs. No frameworks, no runtime data — plain Astro components, content collections, and Pagefind search. Deployed automatically on push to `main` (`.github/workflows/deploy.yml`).

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` (search is unavailable in dev) |
| `npm run build` | Build to `./dist/` and index it with Pagefind |
| `npm run preview` | Preview the built site (use this to test search) |

There are no lint or test scripts. `npm run build` is the validation step — the content schema fails the build with a clear message on bad frontmatter.

## Publishing content

**Use the `publish-post` skill** (`.claude/skills/publish-post/SKILL.md`) when asked to publish a Word doc, Notion export, or text as a post. It covers extraction, cleanup, frontmatter, and preview.

Quick reference:

- Posts live in `src/content/posts/*.md`. Copy `_template.md` (files starting with `_` are ignored by the build). `vte-prophylaxis-gi-surgery.md` is the exemplary post — match its structure.
- Frontmatter: `title`, `excerpt`, `date`, `author`, `category` required; `urgency`, `effectiveDate`, `pinned`, `slug` optional. Schema: `src/content.config.ts`.
- Categories: `it-ehr` · `clinical` · `education` · `announcements`.
- `urgency: warning|critical` flags a post as "Needs your attention". **Flags never expire by date** (readers may visit months apart): the newest 4 flagged posts get homepage cards, and every flagged post keeps its Attention chip in streams/listings until an editor sets `urgency` back to `info`. `pinned: true` shows a red banner at the top of the homepage — active downtimes only — and must be removed manually when the event is over.
- Images: plain markdown `![alt](/images/<post-slug>/file.png)`; they render as styled figures automatically. Never wrap images in styled HTML.
- Callouts: `<div class="key-message">` and `<div class="takeaway">` (blank line inside the div so markdown renders).
- **No PDF embeds/iframes.** Extract PDF content into the post body; a plain link to `public/files/` may supplement it.
- URLs are `/{slug}` at the root. Never change an existing post's `slug` — links are bookmarked and emailed.

## Architecture

- `src/content.config.ts` — collection schema + `CATEGORIES` labels.
- `src/lib/posts.ts` — shared queries and rules: `getPostsNewestFirst`, `byCategory`, `isAttention`, `isPinned`, `postUrl`, month/day formatting. Change attention behavior here, nowhere else.
- `src/layouts/Layout.astro` — head, fonts (self-hosted IBM Plex Sans), theme bootstrap, Header/Footer/SearchDialog. `PageLayout.astro` wraps markdown pages in `.prose`.
- `src/pages/index.astro` — pinned notice → attention zone → three category streams → announcements row.
- `src/pages/[slug].astro` — article template. `it-updates.astro` (legacy URL for the it-ehr category), `clinical.astro`, `education.astro`, `announcements.astro` — thin wrappers around `components/CategoryIndex.astro`.
- `src/styles/global.css` — the design system: all color tokens (light `:root`, dark via media query + `[data-theme]` overrides), `.prose` markdown styling, chips, callouts. **Style through tokens; never hardcode colors in components.** Red (`--critical`) is reserved for active problems — never decorative.
- Static pages: `NuDESC.md`, `burnout.md`, `leadership.md` (PageLayout), `staff.astro`.
- Search: `components/SearchDialog.astro` lazy-loads Pagefind UI from `/pagefind/` (exists only after a full build).
- Feeds: `src/pages/rss.xml.ts`, sitemap via integration. `site` is `https://medicalstaffnews.com`.
