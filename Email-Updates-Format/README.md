# Provider update email

`email-template.html` is the HTML email for announcing newsletter updates. It follows the
layout of the September 2026 email (`HHMedicalStaffProviderUpdate_ September2026_Email.pdf`).

## Ask Claude to fill it in

Say "write the provider update email for these posts" and name the posts. Claude copies the
template to `Email-Updates-Format/<Month>-<Year>-Email.html`, writes a headline, summary, up to
three bullets and a link for each post, and keeps the template untouched.

## Blocks in the template

| Block | Use it for |
| ----- | ---------- |
| Attention callout (red) | A change that needs action or an active problem. Delete if none. |
| Item | The normal case: headline, one-line summary, bullets, "Read the full article". |
| Item with one image | A post where a screenshot helps. |
| Item with two images | Side-by-side comparison (correct vs incorrect). |

Copy an item block once per post and delete the blocks you don't use.

## Images and links

- Every link and image must be a full `https://medicalstaffnews.com/...` address. Email clients
  can't load relative paths.
- Post links are `https://medicalstaffnews.com/<post-slug>/`.
- Email images go in `public/images/email-images/` and appear at
  `https://medicalstaffnews.com/images/email-images/<file>`. **Push to `main` and wait for the
  deploy before sending**, or the images will show as broken.
- Keep images under about 100 KB and 600 px wide (290 px for side-by-side). Give each one alt text.
- Link the image to the post so a click takes readers to the article.

## Sending

1. Open the filled-in `.html` file in a browser and check it.
2. Select all (Cmd+A), copy, and paste into a new Outlook message.
3. Send yourself a test and view it on a phone before sending to providers.
