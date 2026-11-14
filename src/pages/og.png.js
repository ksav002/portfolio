// /og.png: the 1200×630 share image, drawn at build time from the same data
// in the site's Console look (light paper, ink, the address in the measured
// face). Satori turns the layout into an SVG with the text as
// outlines, and sharp turns that into a PNG.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_URL, profile, headline, repoPath } from '../lib/site.js';

const root = process.cwd();
const font = (pkg, file) => readFile(path.join(root, 'node_modules/@fontsource', pkg, 'files', file));
const h = (type, style, children, props = {}) => ({ type, props: { style, children, ...props } });

// Console's paper colourway, as hex for Satori.
const PAPER = '#f9f6f1';
const PANEL = '#fdfcfa';
const RULE = '#dcd8d1';
const INK = '#1c1916';
const MUTED = '#5b554f';
const COOL = '#2a5fae';

export async function GET() {
  const [regular, medium, mono, portraitJpeg] = await Promise.all([
    font('host-grotesk', 'host-grotesk-latin-400-normal.woff'),
    font('host-grotesk', 'host-grotesk-latin-500-normal.woff'),
    font('atkinson-hyperlegible-mono', 'atkinson-hyperlegible-mono-latin-400-normal.woff'),
    readFile(path.join(root, 'public/images/opt/keshab-poudel-480.jpg')),
  ]);
  const portrait = await sharp(portraitJpeg).grayscale().jpeg({ quality: 85 }).toBuffer();

  const tree = h(
    'div',
    {
      width: 1200, height: 630, display: 'flex', flexDirection: 'column',
      padding: '64px 80px', background: PAPER, color: INK, fontFamily: 'Host Grotesk',
    },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 28 }, [
        h('img', { width: 120, height: 120, borderRadius: 60, objectFit: 'cover', border: `1px solid ${RULE}` }, undefined, {
          src: `data:image/jpeg;base64,${portrait.toString('base64')}`,
          width: 120,
          height: 120,
        }),
        h('div', { display: 'flex', flexDirection: 'column', gap: 6 }, [
          h('div', { fontSize: 76, fontWeight: 500, letterSpacing: -2.4, lineHeight: 1 }, profile.name),
          h('div', { display: 'flex', fontSize: 30, fontWeight: 400, color: MUTED }, 'Full-stack developer'),
        ]),
      ]),
      h('div', { display: 'flex', marginTop: 72, fontSize: 44, fontWeight: 500, letterSpacing: -1, lineHeight: 1.2, maxWidth: 920 }, headline),
      h('div', {
        display: 'flex', alignSelf: 'flex-start', marginTop: 64, padding: '14px 22px', border: `1px solid ${RULE}`, borderRadius: 10,
        background: PANEL, fontFamily: 'Atkinson Hyperlegible Mono', fontSize: 28, color: COOL,
      }, repoPath(SITE_URL)),
    ],
  );

  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Host Grotesk', data: regular, weight: 400, style: 'normal' },
      { name: 'Host Grotesk', data: medium, weight: 500, style: 'normal' },
      { name: 'Atkinson Hyperlegible Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
