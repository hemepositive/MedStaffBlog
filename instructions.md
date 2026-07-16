# Instructions for updating this site with a coding assistant

This file is for whoever is asking a coding assistant (GitHub Copilot, Claude,
etc.) to make changes to this website — you don't need to write any code
yourself. You just need to describe what you want clearly, using the
vocabulary below, and the assistant will do the technical work and open a
pull request for review.

After the assistant makes a change, **always ask it to show you a preview
link or screenshot before merging**, and have a second person glance at the
pull request if it's anything clinically important.

---

## 1. Posting a news update

Every post on the site belongs to exactly one **category** and has an
**importance level**. There is no separate "tagging" system — those two
settings are all that control where a post shows up and how prominently.

### The four categories

Tell the assistant which one fits:

| Category | Use it for |
|---|---|
| **IT & EHR** | EHR/system changes, downtimes, order-set or toolbar changes, technical workflow updates |
| **Clinical** | Order sets, clinical workflows, policy changes, patient safety updates |
| **Education** | CME, training, clinical guidelines/summaries for education |
| **Announcements** | Events, people/staffing news, general non-clinical news |

If you're not sure which one fits, just describe the update and ask the
assistant to recommend a category — it will look at similar existing posts.

### Importance level — this is what puts a post in "Needs your attention"

This is the part that answers "what if we post several updates of different
importance at once?" — **each post is marked independently**, regardless of
category. Tell the assistant which level applies to each individual update:

| Level | What it does | Use it for |
|---|---|---|
| **Normal** (default — you don't need to say anything) | Shows normally in its category list | Routine updates, FYI items |
| **Warning** | Adds an "Attention" flag and puts it in the homepage "Needs your attention" section | Something clinicians need to know or a workflow that's changing |
| **Critical** | Same as Warning, plus can be pinned (see below) | Serious/urgent issues |
| **Pinned** | A red banner across the very top of the homepage, above everything else | **Only** for an active or imminent system downtime/outage — nothing else |

Important behavior to know:

- **Attention flags and pins do not expire automatically.** If you mark
  something "Warning" or "Critical," it stays flagged on the site until
  someone explicitly tells the assistant to clear it (set it back to
  Normal). If you have several old flagged posts, periodically ask the
  assistant: *"Are there any old flagged updates that should be cleared
  back to normal now?"*
- **Pinned banners must be removed manually** once the downtime/event is
  over — ask the assistant to remove the pin as soon as it's resolved.
- **Announcements older than 12 months automatically drop off** the
  homepage announcements list (they still exist and stay in the full
  Announcements archive) — you don't need to do anything for this.

### What to tell the assistant

A good request includes:

1. The source content (paste the text, or attach/point to a Word doc,
   Notion export, or PDF).
2. Which category it belongs to (or ask it to suggest one).
3. How important it is (Normal / Warning / Critical / Pinned) — or ask
   it to suggest a level and confirm before publishing.
4. Any "effective date" if the change goes live on a specific date.
5. Author or department name to credit.

**Example prompts:**

> "Post this as a news update in the IT & EHR category. It's about a
> change to the PowerChart toolbar that affects Dragon dictation, so I
> think it should be flagged as Warning since people need to change how
> they launch Dragon. Effective date is August 1, 2026. Show me a preview
> before publishing."

> "Here's a Word doc about a new sepsis order set going live next month.
> Publish it as a Clinical update. Recommend whether this should be
> Warning or Normal, and confirm with me before you publish."

> "There's a network outage happening right now affecting EHR access.
> Post an urgent notice — this should be Critical and pinned to the top
> of the homepage. I'll tell you when it's resolved so you can remove
> the pin."

The assistant should always confirm the category and importance level
with you before publishing, and should never invent clinical facts —
if source content is unclear or incomplete, it should ask you rather than
guess.

---

## 2. Updating or adding a resource page

"Resource pages" are the static pages linked from the footer's Resources
section — things like Medical Staff Leadership, the Medical Staff Office
directory, Burnout Help, and the NuDESC Tip Sheet. These aren't dated news
posts; they're reference pages that change occasionally (a new leadership
roster, an updated phone number, a new tip sheet).

### Updating an existing resource page

Just describe the change in plain language:

> "Update the Medical Staff Leadership page — Dr. Jane Smith is the new
> Vice President of Staff, replacing Dr. Jessica Branscome, effective
> October 1, 2026."

> "Add a new credentialing specialist to the Medical Staff Office page:
> name, title, and phone number are [details]."

### Adding a brand-new resource page

Tell the assistant:

1. The page title and the full content (text is fine — the assistant
   will format it).
2. Which footer section it should appear under ("Resources" alongside
   the existing ones).
3. A short label for the link text if it should differ from the title.

**Example prompt:**

> "Add a new resource page called 'New Provider Onboarding Checklist'
> with this content: [paste content]. Link it in the footer's Resources
> section as 'Onboarding Checklist.' Show me a preview before merging."

The assistant should tell you the page's web address (URL) once it's
built, and should ask before changing the wording of an existing page's
title if a lot of people may have it bookmarked.

---

## 3. Frontmatter reference (for the assistant, not you)

You never need to type this yourself — this section exists so the
assistant has the exact technical format handy. If an assistant asks you
clarifying questions, they'll map back to the plain-language options
above.

**News posts** live in `src/content/posts/*.md`, copied from
`_template.md`, with this frontmatter:

```yaml
---
title: 'Post Title in Title Case'
excerpt: One to two sentences shown on listing pages and in search results.
date: 2026-01-15
author: Author Name or Department
category: it-ehr # one of: it-ehr | clinical | education | announcements
# optional:
# urgency: warning        # warning|critical → "Needs your attention"; never expires on its own
# effectiveDate: 2026-02-01
# pinned: true             # red homepage banner; downtimes only; remove manually when resolved
---
```

Mapping from the plain-language levels above: Normal = omit `urgency`
entirely; Warning = `urgency: warning`; Critical = `urgency: critical`;
Pinned = also add `pinned: true`.

**Resource pages** are markdown files in `src/pages/` (e.g.
`leadership.md`, `burnout.md`, `NuDESC.md`) with this frontmatter:

```yaml
---
layout: '../layouts/PageLayout.astro'
title: 'Page Title'
---
```

A new resource page also needs a link added to the Resources list in
`src/components/Footer.astro`.

Full technical details, validation rules, and the publishing workflow are
in `CLAUDE.md` and `.claude/skills/publish-post/SKILL.md` — an AI coding
assistant working in this repo should already follow those automatically.
