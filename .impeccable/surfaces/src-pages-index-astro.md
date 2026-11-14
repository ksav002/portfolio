---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface brief: one-page portfolio (src/pages/index.astro)

Scope: the one-page site at `/`, plus the 404 page, the generated CV PDF and the share image, which follow the same look. Visitor mode: Persuade.

Audience and job: recruiters and hiring managers decide in about 30 seconds whether to contact Keshab; freelance clients get one line near contact. Action: Email me (`mailto:`), always one click away in the menu; Download CV sits in the intro and in Let's talk; the address is also written out with Copy.

Proof and content: only `src/data/` (matches the live site) plus "Bhaktapur, Nepal". No location on the page (Keshab, 2026-10-20); it stays in the CV header and search-engine data only. Pinecone and webhooks are no longer named anywhere (Keshab, 2026-10-30): the Skills list says "RAG", and Redux was dropped from Frontend. Order: intro, Projects, Experience, Education (own section, not in the menu), Skills, Let's talk, footer. Let's talk holds every contact: Email, WhatsApp, CV, GitHub, LinkedIn, plus small Facebook and Instagram icons. No fact tiles, and no current employer in the intro (Keshab, 2026-10-20: it belongs in Experience only). The Upveda work keeps "as part of a team".

Constraints: navigation first (Keshab's standing preference). Professional (light) is the default and the only served markup for the mode look; Creative (dark) is opt-in, remembered, with no flash. Creative extras load only after switching: a Three.js Kathmandu skyline behind the hero (Pashupatinath, Boudhanath with prayer flags, Nyatapola, city houses, stars, shooting stars; no mouse movement), eyes that follow the cursor on the gaze-tracking project's thumbnail in Projects, and the intro photo flipping to a 3D avatar on hover (tap on phones). The mode switch is a floating moon/sun button in the bottom-right corner, and everything on screen rises in on every switch in either direction. The hero shows a screenshot stage with tabs in Professional and a compact "Selected projects" list in Creative; the hero's bottom band keeps the same height in both modes (Creative: skyline; Professional: faint ruled paper with a ruler edge). A thin amber scroll-progress line runs along the top, the scrollbar is themed, blocks below the fold rise once as they scroll in, and on phones the menu is one joined header card and the Creative skyline shows two landmarks. No React; Three.js is a lazy Creative-only chunk. Icons: Tabler (MIT), inline SVG. WCAG AA in both modes, full keyboard use, reduced motion respected. The "How my tools connect" chain, a particle network, a gaze heatmap, contour lines and the Himalaya backdrop were all removed or rejected at Keshab's request.

History: the first direction (engineering datasheet, then a centred intro with a teal accent) was rejected or replaced. The current look is the Hallmark redesign of 2026-10-30, "Console", chosen by the designer with Keshab's blessing, then refined with Impeccable (critique of the skyline: 23/32, see `.impeccable/critique/`).

Memorable moment: Professional: the name, the one-line pitch and Email me beside the project screenshots. Creative: the Kathmandu skyline standing under the same hero.

## Direction contract

THESIS: A recruiter-first page that answers who, what and how to reach him in one centred first screen, then gets out of the way with a familiar, sticky menu and scannable sections. It refuses concept-led layouts that make visitors work to find facts.

OWN-WORLD: Console, a well-kept engineering logbook. Professional: warm off-white paper, near-black ink, amber for the person and the main action, cool blue for dates and the selected screenshot tab, hairline panels, no shadows. Creative: the dark graphite colourway of the same layout. Host Grotesk for reading, Atkinson Hyperlegible Mono only for what a system writes.

STORY: The visitor sees the small portrait, the name, one line of pitch and Email me, can open the CV, GitHub or LinkedIn, sees the work beside it, and scrolls through projects, experience and skills; in Creative the same page stands over a Kathmandu dusk.

FIRST VIEWPORT: Floating pill menu (name; Projects, Experience, Skills, Contact; Email me). Mode switch bottom right. Left: round black-and-white portrait, name, "Full-stack developer", the pitch, buttons (Email me, Download CV, then GitHub and LinkedIn as outlined buttons). Right: the screenshot stage with tabs (Professional) or the compact project list (Creative). On phones the menu gets a second row of tabs and the hero stacks.

FORM: Index-first (Hallmark shape draw b2e2da), recorded in `.hallmark/log.json`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
