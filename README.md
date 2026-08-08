# poudelkeshab — portfolio

Personal portfolio site for Keshab Poudel. Built with React 19, Vite, and CSS Modules. No UI framework or CSS-in-JS — all styling is hand-written. Deployed to GitHub Pages at [poudelkeshab.com.np](https://poudelkeshab.com.np).

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Bundler | Vite 6 |
| Routing | React Router 7 |
| Styling | CSS Modules + global design tokens |
| Icons | Lucide React + React Icons (Simple Icons) |
| Animation | CSS keyframes + Canvas (river timeline) |
| Noise | simplex-noise (river wobble) |
| Deployment | GitHub Pages with a custom domain |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output → dist/
npm run preview    # preview the production build locally
```

Node 18 or later required.

---

## Project structure

```
src/
  data/           # All editable content lives here
    profile.js      # Name, role, tagline, email, avatar path
    projects.js     # Project list (title, tags, links, featured flag)
    skills.js       # Skill groups shown on Home and About
    socials.js      # Social links + their Lucide icons
    techIcons.js    # Tag string → icon component map for project cards
    timeline.js     # Experience and education entries
  hooks/
    useSEO.js       # Sets <title>, meta description, og: tags, canonical per page
    useReveal.js    # IntersectionObserver hook — triggers fadeUp once on scroll entry
  layouts/
    MainLayout.jsx  # Navbar + main + Footer wrapper
    BareLayout.jsx  # No chrome — for hidden/custom pages
  components/
    Navbar.jsx
    Footer.jsx
    LoadingIndicator.jsx
  pages/
    Home.jsx
    Projects.jsx
    Experience.jsx
    About.jsx
    Contact.jsx
    NotFound.jsx
  routes.jsx        # Central route registry
  styles/
    tokens.css      # Design tokens (colors, type, spacing, easing)
    global.css      # Resets, base styles, shared utilities
public/
  images/           # Avatar and project screenshots
  CNAME             # Custom domain for GitHub Pages
  sitemap.xml
  robots.txt
  404.html          # Redirects unknown paths to / for SPA routing on GitHub Pages
```

---

## Editing content

All content is in `src/data/`. No CMS, no database — just edit the JS files and redeploy.

### Personal info

Edit `src/data/profile.js`:

```js
export const profile = {
  name: 'Keshab Poudel',
  role: 'Full stack developer',
  tagline: '...',
  email: 'you@example.com',
  avatar: '/images/avatar.jpg',
}
```

Replace `/images/avatar-placeholder.svg` with a real photo at `public/images/avatar.jpg` and update the `avatar` path.

### Projects

Edit `src/data/projects.js`. Each project takes:

```js
{
  slug: 'my-project',          // unique, URL-safe string (not used in routing yet, just as React key)
  title: 'My project',
  summary: 'One paragraph.',
  tags: ['React', 'Django'],   // must match keys in techIcons.js to render as icons
  status: 'public',            // 'public' shows a code link; 'private' shows a badge instead
  codeUrl: 'https://github.com/...', // only used when status is 'public'
  image: '/images/my-project.jpg',
  featured: true,              // true = appears on Home page (keep to 2 featured max)
  role: 'Team project',        // optional — omit for solo work
}
```

Add screenshots to `public/images/` and reference them in `image`.

### Adding a tech icon for a new tag

Open `src/data/techIcons.js`. Import the icon and add the tag:

```js
import { SiNextdotjs } from 'react-icons/si'

export const techIcons = {
  // ...existing entries
  'Next.js': SiNextdotjs,
}
```

Simple Icons (via `react-icons/si`) covers most tech brands. If there's no official icon, use a Lucide generic (e.g. `Layers`, `Database`, `Cpu`). Any unmapped tag falls back to a text pill automatically — nothing breaks.

### Skills

Edit `src/data/skills.js`. Groups appear in order on Home (as chips) and About (as labeled sections):

```js
export const skillGroups = [
  { category: 'Frontend', items: ['React', 'TypeScript'] },
  { category: 'Backend',  items: ['Django', 'PostgreSQL'] },
]
```

### Experience and education

Edit `src/data/timeline.js`. Entries are listed most-recent first (the river timeline reverses them so time flows left-to-right):

```js
{
  id: 'work-my-role',        // unique string
  type: 'work',              // 'work' or 'education'
  title: 'Senior Engineer',
  org: 'Company Name',
  period: 'Jan 2024 — Present',
  description: 'One or two sentences about the role.',
}
```

### Social links

Edit `src/data/socials.js`. Each entry needs a Lucide icon component:

```js
import { Github, Twitter } from 'lucide-react'

export const socials = [
  { label: 'GitHub',  href: 'https://github.com/you', Icon: Github  },
  { label: 'Twitter', href: 'https://twitter.com/you', Icon: Twitter },
]
```

The `label` is used as `aria-label` and `title` on the link. Socials appear in the Footer, Contact page, and the Home connect banner.

---

## Adding a new page

1. Create `src/pages/MyPage.jsx` and `src/pages/MyPage.module.css`.
2. Add a route entry in `src/routes.jsx`:

```js
import MyPage from './pages/MyPage.jsx'

export const routes = [
  // ...existing routes
  {
    path: '/my-page',
    element: <MyPage />,
    label: 'My page',
    showInNav: true,   // false to hide from Navbar
    layout: 'main',   // 'main' for Navbar+Footer, 'bare' for no chrome
  },
]
```

That's it. The Navbar, router, and layout wrapper all pick it up automatically.

---

## SEO

Each page calls `useSEO` to set its own `<title>`, meta description, Open Graph tags, and canonical URL:

```js
useSEO({
  title: 'Projects',
  description: 'A short description for search engines.',
  path: '/projects',
})
```

The site URL is set in `src/hooks/useSEO.js` as `SITE_URL`. Update it if the domain changes. The hook does not use react-helmet — it manipulates the DOM directly, because neither react-helmet nor react-helmet-async currently declare support for React 19.

The JSON-LD structured data block and og:image in `index.html` are static. Update them manually when the domain, name, or avatar change.

---

## Design tokens

All colors, typography, spacing, and easing live in `src/styles/tokens.css` as CSS custom properties. Change the accent color site-wide by editing `--accent` and `--accent-strong` in one place:

```css
--accent: #ff8a3d;
--accent-strong: #ff9f5a;
--accent-soft: rgba(255, 138, 61, 0.16);
```

---

## Motion

Entrance animations use the `.fadeUp` class defined in `global.css`. The `useReveal` hook attaches this class once, via `IntersectionObserver`, when the element first scrolls into view. This means animations only fire once — not on every SPA navigation.

The Experience page river uses `requestAnimationFrame` + simplex noise for the wobble animation. Both the rAF loop and all CSS animations respect `prefers-reduced-motion`: the rAF loop exits early and the global CSS override zeroes all durations.

---

## Deployment

The site is deployed to GitHub Pages via the `gh-pages` branch. The `public/CNAME` file sets the custom domain to `poudelkeshab.com.np`. The `public/404.html` file redirects all unknown paths back to `/` so that React Router handles client-side navigation correctly on GitHub Pages (which otherwise returns a real 404 for deep links).

To deploy manually:

```bash
npm run build
# then push dist/ to the gh-pages branch, or use the gh-pages npm package
npx gh-pages -d dist
```

The `base` in `vite.config.js` is `/` because the site is served from the apex domain, not a subpath like `/portfolio/`.
