---
name: Keshab Poudel
description: One-page portfolio for a full-stack developer. Centred intro, sticky menu, one teal accent, two modes on one layout.
colors:
  paper: "#ffffff"
  soft-sage: "#f2f5f4"
  ink: "#0f1716"
  ink-muted: "#4a5654"
  hairline: "#e1e7e5"
  teal: "#0f766e"
  teal-hover: "#0c625b"
  teal-tint: "#e3f2ef"
  teal-text: "#0b5f58"
  creative-ground: "#0a1211"
  creative-surface: "#111c1a"
  creative-soft: "#16231f"
  creative-ink: "#e9f2ef"
  creative-ink-muted: "#a3b5b0"
  creative-hairline: "#22332f"
  bright-teal: "#2dd4bf"
  bright-teal-hover: "#5eead4"
  bright-teal-ink: "#062320"
  bright-teal-tint: "rgb(45 212 191 / 0.12)"
typography:
  display:
    fontFamily: "Onest Variable, Onest, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 4.2vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  pitch:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1rem + 1.1vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.32
  title:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.3
  title-small:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "1.09375rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "1.03125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "0.96875rem"
    fontWeight: 400
    lineHeight: 1.6
  body-large:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  nav:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.6
  chip:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "0.90625rem"
    fontWeight: 600
    lineHeight: 1.6
  label-large:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.6
  label:
    fontFamily: "Onest Variable, Onest, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.6
rounded:
  focus: "4px"
  sm: "0.5rem"
  icon: "0.625rem"
  button: "0.75rem"
  tile: "1rem"
  card: "1.125rem"
  panel: "1.5rem"
  pill: "999px"
  round: "50%"
spacing:
  xxs: "0.25rem"
  xs: "0.375rem"
  sm: "0.625rem"
  md: "0.75rem"
  lg: "1.25rem"
  xl: "1.75rem"
  gutter: "clamp(1rem, 4vw, 2rem)"
  section: "clamp(3.5rem, 6vw, 4.5rem)"
  page-width: "70rem"
  menu-height: "4.125rem"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "0 1.25rem"
    height: "2.875rem"
  button-primary-hover:
    backgroundColor: "{colors.teal-hover}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 1.25rem"
    height: "2.875rem"
  button-small:
    typography: "{typography.nav}"
    rounded: "{rounded.button}"
    padding: "0 0.875rem"
    height: "2.5rem"
  menu-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  menu-link-hover:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.ink}"
  menu-link-current:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.teal-text}"
  phone-tab:
    textColor: "{colors.ink-muted}"
    typography: "{typography.nav}"
    padding: "0.5rem 0 0.625rem"
  phone-tab-current:
    textColor: "{colors.ink}"
  mode-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.round}"
    size: "3rem"
  project-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "1.125rem 1.125rem 1.25rem"
  tag-chip:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.teal-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.1875rem 0.625rem"
  row:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "1.125rem 1.25rem"
  badge:
    backgroundColor: "{colors.soft-sage}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.1875rem 0.625rem"
  badge-current:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.paper}"
  skill-group:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "1.25rem"
  skill-chip:
    backgroundColor: "{colors.soft-sage}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.6875rem"
  contact-panel:
    backgroundColor: "{colors.soft-sage}"
    rounded: "{rounded.panel}"
    padding: "clamp(2rem, 5vw, 3.5rem) 1.25rem"
  copy-button:
    backgroundColor: "{colors.paper}"
    typography: "{typography.label-large}"
    rounded: "{rounded.icon}"
    padding: "0 0.75rem"
    height: "2.25rem"
  icon-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.icon}"
    size: "2.75rem"
---

# Design System: Keshab Poudel

## Overview

**Creative North Star: "The Open Front Desk"**

The page works like a well-run front desk: a friendly face in the middle, the important things laid out on the counter, and the way to reach him always within arm's reach. The first screen holds the round photo, the name, the role line, one sentence about what he builds and four buttons (Email me, Download CV, GitHub, LinkedIn). Projects starts straight after. A sticky menu keeps Email me one click away the whole time.

Everything is plain and familiar on purpose: white page, near-black text, one teal colour, soft grey-green fills, thin borders and rounded corners, and one font (Onest) in heavy weights for headings. There are no unusual layouts to figure out. Boldness comes only from a few controlled teal touches: the main button, the ring around the photo, the menu's current section, tag chips, the "Current" badge.

Creative mode is the same page, layout and words in near-black green with a bright teal. It is switched with a round moon/sun button floating in the bottom-right corner. It adds two small extras that load only after switching: eyes on the gaze-tracking project card that follow the cursor, and the intro photo flipping over to a 3D avatar.

**Key Characteristics:**
- Centred intro: round photo with teal ring, big name, role line, pitch, four icon buttons.
- Sticky top menu: name, four section links, Email me. On phones the links become a row of underlined text tabs under the bar.
- One teal accent per mode; everything else is ink, grey and soft grey-green.
- Soft rounded boxes (16 to 18px corners) with 1px hairline borders.
- One font, Onest, weights 400 to 800.
- Professional (light) is the default; Creative (dark) is the same layout plus two extras.

## Colors

One teal accent on a white and grey-green base; Creative swaps to near-black and a brighter teal. Both modes fill the same roles (page, surface, soft, ink, muted ink, hairline, accent, accent hover, text on accent, accent tint, accent text, focus), so every component works in either mode without its own rules.

### Primary
- **Deep Teal** (teal): the Professional accent. Primary buttons, the photo ring, the "All on GitHub" link, the menu's current-section underline, phone tab underline, focus outlines, the "Current" badge, text selection, the copied state of Copy, and the scrollbar thumb.
- **Deep Teal Hover** (teal-hover): primary button hover only.
- **Teal Tint** (teal-tint): tag chip background, and the fill behind a hovered or current menu link.
- **Teal Text** (teal-text): teal text on the tint (tag chips, current menu link). Darker than Deep Teal so small bold text stays readable.
- **Bright Teal** (bright-teal): the Creative accent, in all the same places, plus the edge of the eye pupils and the back of the flipped photo.
- **Bright Teal Hover** (bright-teal-hover): Creative button hover, focus outline and accent text.
- **Bright Teal Ink** (bright-teal-ink): dark text on bright teal; the eye pupils.
- **Bright Teal Tint** (bright-teal-tint): Creative tag chip and menu link fills.

### Neutral
- **Paper** (paper): Professional page and every surface (cards, rows, skill groups, outline buttons, mode button); also text on teal.
- **Soft Sage** (soft-sage): skill chips, plain badges, the Let's talk panel, the card image backing, footer icon hover.
- **Ink** (ink): headings and main text.
- **Muted Ink** (ink-muted): role line, descriptions, dates, menu links and tabs at rest, footer, social icons.
- **Hairline** (hairline): every 1px border and divider, and the 1.5px borders of outline buttons, Copy and the mode button.
- **Creative Ground / Surface / Soft** (creative-ground, creative-surface, creative-soft): Creative page, surface and soft fills, darkest to lightest.
- **Creative Ink / Muted Ink / Hairline** (creative-ink, creative-ink-muted, creative-hairline): Creative text and borders.

### Named Rules
**The One Teal Rule.** Each mode has exactly one accent colour. Teal marks what matters (the main action, where you are, the current job, the tools); everything else stays ink, grey or grey-green.

**The Same Roles Rule.** Components only use the shared roles. Creative changes the values, never the components. The only fixed colours outside the roles are the Creative eyes (white #f4fbf9 eyeballs on a dark see-through pill).

## Typography

**Display Font:** Onest Variable (with Onest, system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Onest Variable (same stack)

**Character:** One friendly, solid sans-serif does everything. Headings are heavy (700 to 800) and slightly tightened; body text is regular with relaxed line spacing.

### Hierarchy
- **Display** (800, clamp 2.5rem to 4rem, line height 1.03, -0.03em): the name in the intro and the 404 heading. Once per page.
- **Headline** (700, clamp 1.75rem to 2.25rem, line height 1.1, -0.02em): section titles. "Let's talk" goes up to 2.5rem.
- **Pitch** (600, clamp 1.25rem to 1.625rem, line height 1.32, max 30 characters wide, balanced lines): the one sentence under the name. The role line above it is 600 at 1.1875rem in muted ink.
- **Title** (700, 1.1875rem): project card titles. Skill group titles are 1.0625rem.
- **Title Small** (700, 1.09375rem, line height 1.35): job and study titles in rows; the company line below is 600.
- **Body** (400, 1.03125rem, line height 1.6): all running text. Card descriptions use Body Small (0.96875rem) in muted ink.
- **Body Large** (1.125rem): the 404 explanation (400), the written-out email address (700), the menu name (800, -0.01em; 1rem on very small phones).
- **Nav** (600, 0.9375rem): phone tabs, small buttons, footer text.
- **Chip** (600, 0.90625rem): skill chips.
- **Label Large** (700, 0.875rem): the Copy button.
- **Label** (700, 0.8125rem): tag chips and badges. Sentence case, no letter spacing.

Dates use even-width numbers (tabular figures).

### Named Rules
**The One Voice Rule.** Onest is the only typeface on the site, the share image and the favicon. Hierarchy comes from size and weight. (The CV PDF is the one exception: it uses Helvetica, and Courier for dates, so it opens the same in every reader.)

**The Sentence Case Rule.** Labels, chips, tabs and badges are short, sentence case and unspaced. No all-caps labels and no small text above headings.

## Layout

A single centred column, at most 70rem wide, with side padding growing from 1rem to 2rem. The menu bar is 4.125rem tall and sticks to the top on a 92% page-colour background with a 10px blur. The intro is centred; everything after it is left-aligned. Jumping to a section leaves room for the menu (scroll padding).

Order: intro, Projects (three cards in a row, "All on GitHub" link at the right of the title), Experience (stacked rows), Education (its own section of plain rows, not in the menu), Skills (three groups in a row), Let's talk panel, footer. Sections start 3.5rem to 4.5rem apart; the Let's talk panel has 4rem to 5.5rem around it. The footer leaves 5rem at the bottom so the floating mode button never covers it.

Gaps are small and steady: 0.375rem between chips, 0.625rem between buttons, 0.75rem between rows, 1.25rem between cards and skill groups.

Below 56rem: the section links leave the bar and a row of text tabs (Projects, Experience, Skills, Contact) sits under it, scrolling sideways if needed and sliding to keep the current tab in view; Email me stays in the bar. Cards and skill groups stack. Rows put the date and badge on one line with the text full width below (Education rows: date, then text). The photo shrinks from 8.25rem to 6.5rem. Below 26rem the menu name drops to 1rem.

## Elevation & Depth

Mostly flat. Rows, skill groups and the Let's talk panel sit flat with a 1px hairline border. Two things float and carry the one soft shadow: the project cards (to lift the screenshots a little) and the round mode button (because it sits above the page). Creative uses a darker version of the same shadow. The menu bar separates by a hairline and blur, not a shadow.

### Shadow Vocabulary
- **Lift, Professional** (`box-shadow: 0 1px 2px rgb(15 23 22 / 0.05), 0 8px 24px rgb(15 23 22 / 0.06)`): project cards and the mode button.
- **Lift, Creative** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.4), 0 10px 30px rgb(0 0 0 / 0.35)`): the same two in Creative.
- **Photo ring** (`box-shadow: 0 0 0 4px <surface>, 0 0 0 7px <accent>`): a page-coloured gap, then a 3px accent ring.
- **Eyes pill** (`box-shadow: 0 4px 14px rgb(0 0 0 / 0.35)`): Creative eyes only.

### Named Rules
**The Flat Tiles Rule.** Borders, not shadows, separate tiles, rows and panels. Shadow is only for things that float: project cards and the mode button.

## Shapes

Soft corners that grow with the box: 0.5rem for menu links and skill chips, 0.625rem for Copy and icon links, 0.75rem for buttons, 1rem for rows and skill groups, 1.125rem for project cards, 1.5rem for the Let's talk panel. Tags, badges and the scrollbar thumb are full pills. The photo, the mode button and the eyes are circles. Focus outlines have 4px corners. Borders are 1px hairlines; buttons, Copy and the mode button use 1.5px.

Project screenshots are cropped to 2:1 from the top-left corner, so the app's header and menu stay in view.

Icons are Tabler outline icons (MIT), inlined as SVG with a 2px stroke, sized 1.15 times the text beside them (1.375rem for icon-only links and the mode button). No icon fonts.

The favicon is a white "KP" in Onest 800 on Deep Teal.

## Components

### Buttons
Solid and easy to hit, always an icon plus a short label.
- **Shape:** 0.75rem corners, at least 2.875rem tall, 1.25rem side padding, bold text, 0.5rem between icon and label.
- **Primary:** teal with white text (dark text on bright teal in Creative). Email me, and "Back to the homepage" on the 404 page.
- **Outline:** surface background, ink text, 1.5px hairline border. Download CV, GitHub, LinkedIn, WhatsApp, View code.
- **Small:** 2.5rem tall, 0.875rem padding, 0.9375rem text. The menu's Email me and each card's View code.
- **Hover / Focus:** primary darkens; outline border turns muted ink; 160ms fade. Focus everywhere is a 2px accent outline, 3px away, with 4px corners.

### Chips
- **Tag chips (project cards):** pill, teal tint, teal text, 0.8125rem bold. Not clickable.
- **Skill chips:** 0.5rem corners, soft sage, ink text, 0.90625rem at 600. Not clickable.

### Cards / Containers
- **Project card:** surface, 1px hairline, 1.125rem corners, soft lift shadow. A 2:1 screenshot on a soft sage backing with a hairline under it, then title, short description in muted ink, tag chips pushed to the bottom, and a small outline "View code" button.
- **Rows (Experience):** surface, 1px hairline, 1rem corners, three columns: date (11.75rem, muted, 600), title / company / text, badge on the right.
- **Plain rows (Education):** the same row without the badge column.
- **Badges:** pill. "Internship" is soft sage with muted text; "Current" is solid teal.
- **Skill groups:** surface, 1px hairline, 1rem corners, 1.25rem padding, bold title then chips.
- **Let's talk panel:** soft sage, 1px hairline, 1.5rem corners, centred. Title, one line ("Email is the fastest way to reach me. Also open to freelance projects."), the email address written out with Copy, then Email me, WhatsApp, Download CV, GitHub, LinkedIn, then small Facebook and Instagram icon links (2.75rem, muted, surface fill on hover).

### Copy Button
Small outline button (2.25rem tall, 0.625rem corners, 0.875rem bold) beside the email address. Hidden unless the clipboard works. After copying, border and text turn teal and the label reads "Copied" for 2.4 seconds; a hidden status line tells screen readers.

### Navigation
- **Menu bar:** sticky, hairline bottom border, blurred see-through page colour. Name on the left (800), four section links, then a small primary Email me.
- **Section links:** muted ink, 600, 0.5rem corners. Hover: teal tint fill, ink text. Current section: teal tint fill, a 2px teal underline inside the bottom edge, teal text, same weight. Nothing is marked at the top of the page or in Education.
- **Phone tabs:** plain muted text (0.9375rem, 600) with a transparent 2px bottom border; the current tab gets a teal underline and ink text. No fills, no pills.
- **Footer:** hairline top border, muted text: copyright on the left, GitHub and LinkedIn icon links (2.75rem, soft sage on hover) on the right.

### Mode Button
A round 3rem button fixed 1rem from the bottom-right corner (respecting phone safe areas): surface fill, 1.5px hairline border, the lift shadow, a moon icon in Professional and a sun in Creative. Hover turns the border teal and the icon teal. It is a real button with a pressed state. Switching cross-fades the page in 320ms where supported, and not at all with reduced motion. The saved mode is applied before first paint.

### Scrollbar
A slim 12px bar: page-coloured track, a pill thumb in teal mixed 55% with the page colour (inset by a 3px page-coloured border), full teal on hover. Firefox gets the thin version in the same colours. Phones keep their own.

### Creative Extras
Only in Creative, loaded after switching, hidden from screen readers.
- **Following eyes:** two round white eyes in a dark pill at the top right of the gaze-tracking card's screenshot; dark pupils with an accent edge follow the cursor (90ms).
- **Photo flip:** the intro photo turns over (700ms) to a 3D avatar on a bright teal circle on hover, or on tap on phones; the ring stays still.
- **Reduced motion:** the eyes stay still and the flip has no animation.

### CV and Share Image
- **CV PDF:** generated at every build in the site's colours: near-black text, grey secondary text, thin grey rules, teal rules under the header and section titles, teal links. Helvetica and Courier (dates).
- **Share image (1200 by 630):** white, teal-ringed round photo, name in Onest 800, role line and pitch in Onest 600, the site address in teal, and a 16px teal bar along the bottom.
- **404 page:** centred display heading, one muted sentence, primary "Back to the homepage" button.

## Do's and Don'ts

### Do:
- **Do** keep Email me in the sticky menu on every screen size, and Download CV in the intro and Let's talk.
- **Do** use the accent only for the main action, the current section, the current job, tags, the photo ring and focus outlines.
- **Do** build new boxes from the shared roles (surface, soft, hairline, accent) so they work in both modes without extra rules.
- **Do** separate tiles and rows with 1px hairline borders and soft corners (1rem for tiles, 1.125rem for cards).
- **Do** put a Tabler outline icon, inlined as SVG, next to every button label.
- **Do** keep Creative the same layout and words, with extras that load only after switching and stop when motion is reduced.

### Don't:
- **Don't** add a second accent colour or a second font.
- **Don't** hide navigation or facts behind hover, or use unusual layouts that make visitors hunt for information.
- **Don't** add small all-caps labels above headings.
- **Don't** put shadows on tiles, rows or panels; shadow is for project cards and the mode button.
- **Don't** make anything in Creative needed to find a fact.
