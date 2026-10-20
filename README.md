# Keshab Poudel — portfolio

My personal portfolio, live at **[poudelkeshab.com.np](https://poudelkeshab.com.np)**.

It's a one-page site about who I am, what I build, and how to reach me. The page has two looks:

- **Professional** (light) is the default.
- **Creative** (dark) is turned on with the round button in the bottom-right corner. It adds a couple of small extras and remembers your choice.

The site is static, built with [Astro](https://astro.build), with no front-end framework. Hosting is GitHub Pages.

## Stack

| Part | What it uses |
|---|---|
| Site | Astro 7 (static output), plain CSS and a few small JavaScript files |
| Font and icons | Onest (self-hosted through Fontsource), Tabler icons (inlined as SVG at build time) |
| CV | `pdf-lib`: a text PDF built from the site data on every build |
| Share image, favicons, images | `satori` and `sharp` |
| SEO | `@astrojs/sitemap`, JSON-LD (`ProfilePage`, `Person`, projects), `llms.txt` |
| Hosting | GitHub Pages, deployed by GitHub Actions |

## Run it locally

You need Node.js 22.22 or newer.

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:4321.

| Command | What it does |
|---|---|
| `npm run build` | Builds the site into `dist/` |
| `npm run preview` | Serves the built site locally |
| `npm run images` | Makes the small AVIF, WebP and JPEG copies in `public/images/opt/` |
| `npm run favicons` | Redraws the favicon set in `public/` |

## Project structure

```
src/
  data/          content: profile, projects, skills, timeline, socials
  lib/           shared facts (site.js), JSON-LD (seo.js), image sizes (image-manifest.json)
  layouts/       Base.astro: head tags, menu, footer, mode button
  pages/
    index.astro              the one page
    404.astro                not-found page
    keshab-poudel-cv.pdf.js  builds /keshab-poudel-cv.pdf
    og.png.js                builds /og.png (link preview image)
    llms.txt.js              builds /llms.txt (plain-text summary for AI tools)
  components/    Icon.astro (Tabler icons), Picture.astro (responsive images)
  scripts/       mode switch, Creative extras, copy button, menu highlight
  styles/        global.css: both modes and every component
scripts/         image and favicon generators
public/          images, favicons, robots.txt, CNAME
```

## Editing content

All content lives in `src/data/`. The page, the CV, the share image, `llms.txt` and the search-engine data are all built from these files, so each change only has to be made once.

- **Profile, skills, socials:** edit `profile.js`, `skills.js` or `socials.js`.
- **Experience and education:** edit `timeline.js`.
  - Set `type` to `'work'` or `'education'`.
  - Write `period` like `August 2025 — Present` or `2021 — 2025`.
- **A new project:**
  1. Add an entry to `projects.js`.
  2. Put its screenshot at `public/images/<slug>.png`.
  3. Add that file to the list in `scripts/optimize-images.mjs`.
  4. Run `npm run images`.

## Deployment

GitHub Pages hosts the site. `.github/workflows/deploy.yml` builds it with `withastro/action` on every push to `main`, then publishes it. This needs **Settings → Pages → Build and deployment → Source** set to **GitHub Actions**. The earlier React site was published from the `gh-pages` branch instead.

The domain's DNS is on Cloudflare, which sits in front of GitHub Pages:

- Cloudflare serves the HTTPS certificate.
- `www` redirects to the bare domain.
- `public/CNAME` holds the custom domain for GitHub.

Because traffic goes through Cloudflare, GitHub's Pages settings show "DNS Check in Progress" and can't offer "Enforce HTTPS". HTTPS still works through Cloudflare.

Cloudflare also caches static files such as the favicon, so a changed file can take a few hours to appear.

## Design notes

- `PRODUCT.md` explains who the site is for and the decisions behind it.
- `DESIGN.md` records the visual system: colours, type, components and rules.

Both are kept with [Impeccable](https://github.com/pbakaus/impeccable).
