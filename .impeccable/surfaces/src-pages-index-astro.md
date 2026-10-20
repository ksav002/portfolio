---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface brief: one-page portfolio (src/pages/index.astro)

Scope: the one-page site at `/`, plus the 404 page, the generated CV PDF and the share image, which follow the same look. Visitor mode: Persuade.

Audience and job: recruiters and hiring managers decide in about 30 seconds whether to contact Keshab; freelance clients get one line near contact. Action: Email me (`mailto:`), always one click away in the menu; Download CV sits in the intro and in Let's talk; the address is also written out with Copy.

Proof and content: only `src/data/` (matches the live site) plus "Bhaktapur, Nepal". No location on the page (Keshab, 2026-10-20); it stays in the CV header and search-engine data only. Pinecone is just a tool: only in the Skills list. Order: intro, Projects, Experience, Education (own section, not in the menu), Skills, Let's talk, footer. Let's talk holds every contact: Email, WhatsApp, CV, GitHub, LinkedIn, plus small Facebook and Instagram icons. No fact tiles, and no current employer in the intro (Keshab, 2026-10-20: it belongs in Experience only). The Upveda work keeps "as part of a team".

Constraints: navigation first (Keshab's standing preference). Professional (light) is the default and the only served markup; Creative (dark) is opt-in, remembered, with no flash; Creative extras (eyes that follow the cursor on the gaze-tracking project card, and the intro photo flipping to a 3D avatar on hover, or on tap on phones) load only after switching; the mode switch is a floating moon/sun button in the bottom-right corner; the "How my tools connect" chain was removed at Keshab's request. No React. Icons: Tabler (MIT), inline SVG. WCAG AA in both modes, full keyboard use, reduced motion respected.

History: replaces the engineering-datasheet direction (built, then rejected by Keshab on 2026-10-20 as too hard to scan). Chosen from round-3 wireframe 3, "centred intro", after three mockup rounds; seen and approved as a detailed mockup (all mockups and prototype files were deleted at Keshab's request on 2026-10-20; the shipped site is now the reference).

Small-screen deviation (recorded at finish review): Experience rows put date and badge on one line with the text full width below.

Memorable moment: the centred intro with the round, teal-ringed photo, the one-line pitch and the Email me button, with projects right below.

Change after approval (Keshab, 2026-10-20): the four fact tiles from the approved mockup were removed as repetitive.

## Direction contract

THESIS: A recruiter-first page that answers who, what and how to reach him in one centred first screen, then gets out of the way with a familiar, sticky menu and scannable sections. It refuses concept-led layouts that make visitors work to find facts.

OWN-WORLD: White ground, near-black ink, one teal accent (#0f766e) for buttons, tag chips, the "Current" badge and the photo ring; soft grey-green tiles with hairline borders and 16–18px rounded corners; one confident grotesk (Onest) at bold display weights. Creative: near-black green ground, bright teal (#2dd4bf) accent, same layout.

STORY: The visitor sees the photo, name and one-line pitch, clicks Email me from the menu at any point or Download CV in the intro, or scrolls through projects with screenshots and a short experience list.

FIRST VIEWPORT: Sticky top menu: name left; Projects, Experience, Skills, Contact; Email me right. Mode switch: floating round button, bottom right. Centred: round photo with teal ring, name large, "Full-stack developer", pitch, buttons (Email me, Download CV, GitHub, LinkedIn, with icons). Projects start right below. On phones the menu becomes a row of underlined section tabs under a header that keeps Email me.

FORM: Centred intro, wireframe 3 from the navigation-first round, chosen by Keshab. seed: none (no roll assigned this direction: it followed the user-requested safer-register re-roll, which suspends assignment and prints no seed reference, and Keshab picked it from hand-drawn wireframes)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
