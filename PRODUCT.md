# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro with static output. React only where something truly needs it; nothing planned needs it (the mode switch, the scroll line and the Creative extras are small plain scripts). Three.js (MIT) is used only for the Creative skyline and is a separate chunk that loads after switching to Creative, so Professional never downloads it. Code on GitHub, deployed by GitHub Actions with `withastro/action` to GitHub Pages on the existing domain: `site: 'https://poudelkeshab.com.np'`, `@astrojs/sitemap`, a `404.astro` page, and `public/CNAME` kept.

## Users

Primary: employers, recruiters and hiring managers deciding whether to contact Keshab about a full-stack role. They skim for about 30 seconds, often on a phone, and either reach out or leave.

Secondary: freelance clients, addressed by a single line near contact ("Also open to freelance projects.").

Search engines and AI answer tools also read the site and must be able to state who Keshab is and what he does correctly.

## Product Purpose

A personal portfolio that replaces the React/Vite site at poudelkeshab.com.np. It shows who Keshab is, what he builds, the proof (work history, three projects, skills) and how to reach him. Success: a recruiter understands his positioning from the first screen and emails him. The one main action is "Email me".

## Positioning

"I build Django + React apps and the AI automation behind them." A full-stack developer (Django, DRF, React, PostgreSQL) who also works on AI automation in production at Upveda Technology: he built the RAG system in n8n for an enterprise AI support agent, as part of a team. Every phrasing keeps the "as part of a team" qualifier. Pinecone was just one tool in that work; at Keshab's request (2026-10-30) it is no longer named anywhere on the site, and the Skills list says just "RAG".

## Operating Context

- One page plus a 404 page. No blog or case studies now; the structure must allow case-study pages to be added later without a redesign.
- Two modes on one layout. Professional is the default and the only version in the served HTML. Creative is opt-in through a switch. Both modes show the same content. The choice is remembered, the wrong mode never flashes on load, and visitors without JavaScript get Professional.
- Creative-only extras, loaded only after switching to Creative: a Kathmandu skyline at dusk behind the hero, built with Three.js (Pashupatinath, Boudhanath with prayer flags, Nyatapola, the city houses, stars and shooting stars; Keshab chose the landmarks, 2026-10-30; the Himalaya, Swayambhunath and Krishna Mandir were tried and removed; it does not follow the mouse); a pair of eyes that follow the cursor on the gaze-tracking project's thumbnail in Projects (idea from bencho.dev, recreated in plain JavaScript; no Bencho code is used); and the intro photo flipping to a 3D avatar (Microsoft Fluent Emoji "Man technologist", MIT) on hover, or on tap on phones; no motion when reduced motion is on. (A "How my tools connect" node chain was tried and removed at Keshab's request, 2026-10-20. Rejected backdrops, 2026-10-30: a particle network, a gaze heatmap, contour lines.)
- Mode switch (Keshab, 2026-10-30): everything on screen rises in on every switch, in either direction and at any scroll position. Professional keeps the hero's bottom band (faint ruled paper and a ruler edge) at the same height as Creative's skyline band, so the page never shifts when switching. The hero shows the screenshot stage with tabs in Professional and a compact "Selected projects" list in Creative. Below the fold, blocks rise once as they scroll into view. On phones the menu is one joined header card, the skyline shows two landmarks, and the gutter is 20px.
- CV: a real-text PDF generated from `src/data/` at every build (no photo), offered as "Download CV". Replaced when Keshab supplies his own.
- The email address is written out with a Copy button, because recruiters paste it into their own tools.

## Capabilities and Constraints

- Static site, no backend. Contact is by `mailto:` and profile links.
- Content source: `src/data/` (`profile`, `projects`, `skills`, `timeline`, `socials`). The old `techIcons.js` (React icon mapping) was removed as unused on 2026-10-20; it is in git history.
- Icons: Tabler Icons (MIT), inlined as SVG at build time, for both UI icons and brand logos (GitHub, LinkedIn); no icon fonts, no React.
- `src/data/familyData.js` is private and must never be imported or shown.
- Facts come only from the live site https://poudelkeshab.com.np/ (matches `src/data/` as of 2026-10-20) and Keshab's own answers. Location: Bhaktapur, Nepal (from Keshab); not shown on the page itself (removed from the intro and footer at Keshab's request, 2026-10-20), only in the CV header and the search-engine data.
- Links shown: email, CV, GitHub, LinkedIn as buttons; Facebook and Instagram only as small icons in Let's talk (Keshab, 2026-10-20) and in the search-engine data (`sameAs`) and llms.txt. No availability status line. Let's talk is the full contact page with every contact; the top menu keeps only Email me; Download CV sits in the intro and Let's talk.
- SEO and AEO: all content in static HTML; title, description, canonical, Open Graph and a share image; JSON-LD `ProfilePage` + `Person` + the three projects; `/llms.txt`; `robots.txt` allows search and AI crawlers; sitemap. No FAQ block.
- Images and favicons stay in `public/`; optimized copies are added beside the originals, which stay untouched.
- Nothing is saved through connectors or cloud services; everything stays in the repo.
- Reference sites are for ideas only (navbar.gallery, footer.design, cta.gallery, supahero.io, styles.refero.design, scrolltide.co, bencho.dev). Only the free CC0 set from 3dicons.co may be used as files: only if the chosen look suits them, only in Creative mode, and only after Keshab approves each download.
- Image generation is unavailable; build code-first.

## Brand Commitments

- Name: Keshab Poudel. Role line: Full stack developer (shown as "Full-stack developer"). Tagline: "Builds scalable web applications with Django and React, and engineers automated workflows with n8n and AI agents."
- Voice: first person ("I build…"), calm and plain. Professional mode carries small human touches only (his photo, the first-person voice); playfulness lives in Creative mode.
- Professional mode is light. Creative mode is dark.
- The site must not look like a generic AI-made or template site.
- Navigation first (Keshab's standing preference, 2026-10-20): recruiters must find things fast. A familiar, scannable structure with an always-visible menu, Email me always one click away, the CV in the intro and Let's talk, nothing hidden behind hover; boldness only through a few controlled accents, never layout gimmicks or personal/heritage themes. One exception, Keshab's own request (2026-10-30): the Creative-only Kathmandu skyline backdrop.
- Chosen look (redesign 2026-10-30, Hallmark, Keshab let the designer decide): "Console", a well-kept engineering logbook. Professional is the light paper colourway (warm off-white, near-black ink, amber for the main action, cool blue for dates); Creative is the dark graphite colourway of the same layout. Host Grotesk for reading, Atkinson Hyperlegible Mono only for what a system writes (dates, the email address). Hairline panels, no shadows. Hero: name, one sentence, Email me, Download CV, GitHub and LinkedIn (the last two as outlined buttons) beside a screenshot stage with three project tabs in Professional (works without JavaScript) or a compact project list in Creative. A thin amber scroll-progress line runs along the top of the window and the scrollbar is themed. Portrait small and black and white. His email address set large as the closing statement in Let’s talk. No fact tiles; his current employer appears only in Experience.
- Assets: favicon set and `site.webmanifest` in `public/`; portrait `public/images/keshab-poudel.png` (actually a 3261 px JPEG); project screenshots in `public/images/`; Creative-mode avatar `public/images/avatar-3d.png`. Favicons are made by `npm run favicons` (amber "KP" on graphite). Third-party credits only where a licence requires them (Keshab, 2026-10-20): just the avatar's MIT notice, in `THIRD_PARTY_NOTICES.md`.

## Evidence on Hand

- Projects, each with a public GitHub repo and a screenshot in `public/images/`: Real-time gaze tracking system (featured), Stock prediction system (featured), Karyalaya, an assignment digitalization app (shown smaller). The old "This portfolio" entry is dropped.
- Work: Full-stack Developer, Upveda Technology, August 2025 to present (contributed to an enterprise AI support agent as part of a team, building its RAG system in n8n; Keshab's own wording, 2026-10-20). Intern, Upveda Technology, March to August 2025 (built and maintained Django REST Framework APIs and React interfaces across internal projects).
- Education: Bachelor of Computer Applications, Pascal National College, Tribhuvan University, 2021 to 2025. Final-year project: the gaze tracking system.
- Skills: Frontend (React, JavaScript, HTML, CSS: the last three also appear in the Karyalaya project's tags); Backend (Python, Django, DRF, PostgreSQL); AI and automation (n8n, RAG, AI agents).
- Contact: ksavpoudel2@gmail.com, WhatsApp @poudelkeshab (wa.me/poudelkeshab), github.com/ksav002, linkedin.com/in/keshabpoudel, plus Facebook and Instagram (small icons only).
- Absent and never to be fabricated: testimonials, client work, metrics, case studies, details of the Upveda agent beyond the one line above, live demo URLs, an original CV, a phone number, an availability status.

## Product Principles

1. Clear before clever: name, positioning and the Email button land in the first screen.
2. Professional is the default; Creative is a reward for curiosity and is never needed to get the facts.
3. One content source, two moods: no duplicated copy and no diverging structure between modes.
4. Every claim traces back to the live site or Keshab's own words.
5. Fast, accessible and machine-readable by construction: static HTML, minimal JavaScript.

## Accessibility & Inclusion

WCAG AA contrast in both modes. Full keyboard use, including the mode switch, which is a real button that announces its state. Visible focus everywhere. `prefers-reduced-motion` stops all motion, including the Creative extras. Semantic headings and descriptive image text.
