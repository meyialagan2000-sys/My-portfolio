# Meiyazhagan R — Portfolio (v2, multi-page)

A 6-page static site: `index.html`, `about.html`, `skills.html`,
`experience.html`, `projects.html`, `contact.html`. Shared styling lives in
`css/style.css`, shared behavior in `js/main.js`.

## Run it
Open the folder in VS Code, install **Live Server**, right-click
`index.html` → **Open with Live Server**. No build step, no dependencies.

## What's real vs. what to double-check
Pulled directly from your résumé PDF and photo:
- Name, email (`meyialagan2000@gmail.com`), phone (`+91 86681 21239`),
  location, LinkedIn URL
- Zofonix role, dates, and responsibilities
- BCA education, both certifications
- Zenora and Zofonix WordPress projects
- Your photo (`assets/profile.png`)

**Two things I filled in that you should check:**
1. **Project names** — your résumé just says "Ongoing Store Base Projects
   (Shopify)." I named them **Glowza** and **Store Base 02** based on the
   store URLs. Rename them in `index.html` and `projects.html` if you have
   better names.
2. **Zenora/Zofonix live links** — I didn't have URLs for these two, so
   there's no "view live" button on those two cards. Add `<a href="...">`
   around them in `projects.html` once you have links.

## About the password-protected preview links
The "View live preview" buttons on Glowza and Store Base 02 open the store
in a new tab and auto-submit Shopify's own password form (the same
`form_type=storefront_password` fields Shopify's theme uses), so in most
cases the store unlocks with no typing needed.

**Caveat:** some Shopify themes add extra protection to that form. If a
store still shows the password screen after clicking, the password is
already copied to the clipboard (you'll see a toast confirming it) — just
paste and hit enter. This is implemented in the `openProject()` function in
`js/main.js` if you want to adjust it.

## Design tokens used
- Colors: `#F1F0EE` (background), `#403BFE` (accent), near-black ink text
- Type: **Montserrat** (headings) + **Inter** (body)
- Header: sticky, glassmorphism (`backdrop-filter: blur`)
- Custom two-part cursor (dot + lagging ring) on desktop only — automatically
  disabled on touch devices
- Scroll-triggered reveals, a subtle parallax blob behind your hero photo,
  and an auto-scrolling tool-logo marquee pulling real brand marks live from
  Simple Icons (no image files needed for those)

## Deploying
Drag the whole `site` folder into Netlify or Vercel, or push it to a GitHub
repo and turn on GitHub Pages — it's already structured as a static multi-page
site so nothing else is needed.
