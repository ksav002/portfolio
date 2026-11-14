# Design: Keshab Poudel portfolio

The site's design system, as built in the Hallmark redesign of 2026-10-30 and refined with Impeccable afterwards (the Creative backdrop, mode-switch motion, hero and scroll details below). `src/styles/tokens.css` is the source of truth for every value; this file says what the values are for. Change it on purpose.

## System

- **Genre:** modern-minimal. **Theme:** Console, "a well-kept engineering logbook".
- **Shape:** one page, index-first: hero, Projects, Experience beside Education, Skills, Let's talk, footer. A 404 page in the same look.
- **Two modes, one layout:** Professional (default) is Console's light *paper* colourway; Creative (`data-mode="creative"`) is the dark *graphite* colourway. The saved mode is applied before first paint.

## Colors

Both modes fill the same roles, so every component works in either.

| Role | Used for |
| --- | --- |
| `--color-paper`, `-2`, `-3` | page, panels one step up, the deepest step (footer, image wells) |
| `--color-ink`, `-ink-2`, `-muted` | headings, secondary text, body and labels |
| `--color-rule`, `-rule-2` | every 1px hairline; the stronger one for outlines and the timeline spine |
| `--color-accent` (amber) | the person and the one main action: Email me, the current job, focus; the current menu item is an amber tint with ink text |
| `--color-cool` (blue) | what a system measured: dates, the selected screenshot tab |
| `--color-ok` | the "Copied" state only |

Never swap amber and blue, never add a third signal colour.

## Typography

- **Host Grotesk** 400 and 500 for everything a person reads; headings 500 with tight tracking, never bold.
- **Atkinson Hyperlegible Mono** only for what a system writes: dates on the timeline, the email address in Let's talk, the year in the footer. Never on a label, heading or button.
- Labels, chips and footer titles are the body face a step smaller, in sentence case. No all-caps.

## Surfaces

- Panels are a 1px rule with `--color-paper-2` inside, 10px corners (6px on controls, 4px on chips). Panels that sit together are one surface split by 1px seams (the project index, the skills).
- No shadows or glows in the page itself. Elevation is lightness only. The exceptions are the Professional hero's ruled-paper band (flat hairline gradients that fade out) and the Creative skyline backdrop, an illustration inside its own canvas, which uses a dusk glow.
- The portrait is small, round and black and white. Screenshots sit in the Professional hero stage at 2:1 from the top-left.

## Components

- **Buttons:** 48px tall (44px small); amber fill for the main action, hairline outline for the rest; icon plus label. In the hero, Email me and Download CV share a row and GitHub and LinkedIn are the same outlined buttons in a second row (they were plain text links and read as footnotes).
- **Navigation:** a floating pill (name, four section links, Email me). Below 60rem the links move to a row of tabs that joins the pill into one header card, which saves height on phones.
- **Hero, Professional:** the screenshot stage: three screenshots and a row of tabs; plain radio buttons, so it works without JavaScript. Its width is capped at 50rem so it is never taller than the copy beside it.
- **Hero, Creative:** a compact "Selected projects" list in the same place (title, stack, arrow; each row jumps to its project below), with no images, so more of the skyline shows. Both are in the served HTML; CSS shows the one for the current mode.
- **Hero bottom band:** the hero's bottom padding is the `--band` variable, `clamp(8rem, 21vh, 13rem)` (`clamp(7rem, 15vh, 9rem)` on phones), in both modes, so the page does not shift when the mode changes. Creative stands its skyline there. Professional shows faint ruled paper (32px grid fading upward) with a ruler of tick marks along the bottom edge.
- **Scroll progress line:** a 3px amber line along the top of the window, full window width, filled by `src/scripts/progress.js` from the scroll position (complete just before the bottom).
- **Scrollbar:** thin, rounded thumb on a paper-coloured track, warming to amber on hover (pseudo-elements in Chromium and Safari, standard properties in Firefox).
- **Timeline:** dates in cool mono, title, organisation, description, on a 1px spine; a "Current" chip in amber tint.
- **Let's talk:** the email address set large in mono with Copy beside it, then every contact as buttons, then small Facebook and Instagram links.
- **Footer:** index columns: who, Contact, Profiles, On this page.
- **Mode button:** fixed bottom-right, 48px, moon in Professional and sun in Creative.

## Creative extras

Loaded only after switching to Creative, hidden from screen readers, still under reduced motion:

- **Kathmandu skyline** (`src/scripts/skyline.js`, Three.js, its own lazy chunk): the valley at dusk in layered silhouettes. Pashupatinath (redrawn on 2026-10-30 from photographs: two gilded roofs, the tall dark wall between them, the bell-topped pinnacle, a pavilion, the long house with lit windows and the pale ghat shrines), Boudhanath (pale whitewashed dome on three terraces, a gilded tower with a red band and the painted eyes, prayer flags that flutter) and Nyatapola (five steeply pitched roofs on a tall five-step plinth); all three were redrawn from photographs above the city houses, with lit windows, drifting mist, a warm haze along the ground, stars (kept off the text column) and a shooting star every 3 to 8 seconds. The monuments stand on dark terraces slightly above the ground so their bases show, and on phones the skyline shows two landmarks (Pashupatinath and Boudhanath) at a larger size. It does not react to the mouse. It starts 600ms after the switch, fades in, and shows a single still frame under reduced motion. Keshab chose these landmarks (2026-10-30); the Himalaya, Swayambhunath and Krishna Mandir were tried and removed.
- **Eyes** that follow the cursor, on the gaze-tracking thumbnail in Projects.
- The portrait flipping to a 3D avatar on hover (tap on phones).

## Motion

Colour and border changes over 220ms; no scroll reveals, parallax or hover lifts. Two authored moments. Below the fold, blocks rise once as they scroll into view (`src/scripts/reveal.js`; only blocks that start off-screen are marked, so nothing is hidden if the script fails). And when the mode switches, everything on screen rises in (0.7s, staggered 70ms, in either direction and at any scroll position; `playEntrance` in `mode.js`). The scroll progress line and the Creative backdrop's own motion are the only others. Everything stops under `prefers-reduced-motion`.

## Related files

- `src/styles/tokens.css` (values), `src/styles/base.css` (resets), `src/styles/global.css` (components; its first lines are the Hallmark stamp), `src/scripts/creative.css` (Creative-only styles).
- `src/scripts/mode.js` (mode switch and entrance), `src/scripts/creative.js` and `src/scripts/skyline.js` (Creative extras), `src/scripts/progress.js` (scroll line).
- Share image `src/pages/og.png.js`, favicons `scripts/make-favicons.mjs` (amber "KP" on graphite), CV accent in `src/pages/keshab-poudel-cv.pdf.js`.
