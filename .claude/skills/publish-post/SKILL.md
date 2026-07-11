---
name: publish-post
description: Publish a Word document, Notion export, or pasted text as a post on the Med Staff News site. Handles content cleanup, image extraction, frontmatter, validation, and preview. Use when asked to publish, post, or add an article/update to the site.
---

# Publish a post

Turn source content (Word `.docx`, Notion export, Google Doc text, or pasted text) into a
post in `src/content/posts/`. The person asking may be non-technical — do all technical
work yourself and confirm only editorial decisions (category, urgency, wording).

## 1. Extract the content

- **Word (.docx):** convert with pandoc: `pandoc input.docx -t gfm --extract-media=public/images/<slug> -o out.md`. Move extracted media to `public/images/<slug>/` if pandoc nested it; give files descriptive kebab-case names.
- **Notion export (md or HTML):** treat as tainted; apply every cleanup rule below.
- **Pasted text:** use as-is, then apply cleanup.

## 2. Clean up (required, especially for Notion exports)

- Fix mojibake / encoding artifacts (`â€™`, `â­`, `ðŸ¢`, stray `Â`). If garbled, re-read the file as UTF-8 or repair with a latin-1→utf-8 round trip.
- **Remove links pointing to notion.com / app.notion.com** — they are workspace-internal and dead for readers. Convert citation links to a plain `## References` numbered list with real external URLs.
- Deduplicate repeated bullets/paragraphs (Notion and Word exports often duplicate lines).
- Remove empty paragraphs, column-layout wrappers, and any `<style>` blocks.
- Normalize headings: post body starts at `##` (the template renders the title as h1); fix inverted hierarchies (a heading immediately followed by another heading of the same level is usually a subtitle — merge or demote it).
- Metadata out of prose: dates like "**Date:** June 1, 2026" belong in frontmatter, not the body.

## 3. Create the post

- Copy `src/content/posts/_template.md` to `src/content/posts/<kebab-case-slug>.md`.
- Fill frontmatter (see template comments). Rules:
  - `category`: `it-ehr` (EHR/systems/downtime), `clinical` (order sets, workflows, policies, patient safety), `education` (CME, training, guidelines), `announcements` (events, people, general news).
  - `urgency: warning` only if clinicians must act or their workflow changes; `critical` + `pinned: true` only for active/imminent downtimes. Default is `info` (omit the field).
  - Attention flags and pins **never expire on their own**. When asked to publish, also ask whether any currently flagged/pinned posts are settled and should be demoted (set `urgency: info` / remove `pinned`).
  - `effectiveDate` when the change has a go-live date.
  - Propose category and urgency to the requester and confirm before publishing.
- Images: plain markdown `![meaningful alt text](/images/<slug>/name.png)` — never `<div style=...>` wrappers. Images are auto-styled as figures.
- Optional callouts: `<div class="key-message">…</div>` near the top, `<div class="takeaway">…</div>` at the end (keep a blank line inside the div so markdown renders).
- **No PDF embeds.** If a PDF is supplied, extract its content into the post body. Linking to a file in `public/files/` is allowed as a supplement, never as the content.

## 4. Validate and preview

1. `npm run build` — the schema fails the build with a clear message if frontmatter is wrong; fix and rebuild.
2. `npm run preview` and check the post page, the homepage, and its category page.
3. Show the requester the post URL path and a summary of frontmatter choices.

## 5. Publish

Commit with a message like `Add post: <title>` and push to `main` only after the requester confirms. Deployment is automatic on push to `main`.
