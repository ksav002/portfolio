// /og.png: the 1200×630 share image, drawn at build time from the same data
// in the site's style (centred photo, name, pitch, teal accent). Satori turns
// the layout into an SVG with the text as outlines, and sharp turns that into a PNG.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_URL, profile, headline, repoPath } from '../lib/site.js';

const root = process.cwd();
const fontFile = (file) => readFile(path.join(root, 'node_modules/@fontsource/onest/files', file));
const h = (type, style, children, props = {}) => ({ type, props: { style, children, ...props } });

export async function GET() {
  const [regular, semibold, extrabold, portrait] = await Promise.all([
    fontFile('onest-latin-400-normal.woff'),
    fontFile('onest-latin-600-normal.woff'),
    fontFile('onest-latin-800-normal.woff'),
    readFile(path.join(root, 'public/images/opt/keshab-poudel-480.jpg')),
  ]);

  const ink = '#0f1716';
  const grey = '#4a5654';
  const teal = '#0f766e';

  const tree = h(
    'div',
    {
      width: 1200, height: 630, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', background: '#ffffff', color: ink, fontFamily: 'Onest',
      borderBottom: `16px solid ${teal}`,
    },
    [
      h('div', { display: 'flex', width: 190, height: 190, borderRadius: 95, background: teal, alignItems: 'center', justifyContent: 'center' }, [
        h('img', { width: 176, height: 176, borderRadius: 88, objectFit: 'cover' }, undefined, {
          src: `data:image/jpeg;base64,${portrait.toString('base64')}`,
          width: 176,
          height: 176,
        }),
      ]),
      h('div', { marginTop: 30, fontSize: 84, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1 }, profile.name),
      h('div', { display: 'flex', marginTop: 16, fontSize: 30, fontWeight: 600, color: grey }, 'Full-stack developer'),
      h('div', { display: 'flex', marginTop: 26, fontSize: 38, fontWeight: 600, maxWidth: 900, textAlign: 'center', lineHeight: 1.25 }, headline),
      h('div', { display: 'flex', marginTop: 34, fontSize: 26, fontWeight: 600, color: teal }, repoPath(SITE_URL)),
    ],
  );

  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Onest', data: regular, weight: 400, style: 'normal' },
      { name: 'Onest', data: semibold, weight: 600, style: 'normal' },
      { name: 'Onest', data: extrabold, weight: 800, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
