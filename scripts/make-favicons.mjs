// Makes the favicon set in public/ from one design: "KP" in Host Grotesk on
// Console's graphite with an amber mark. Run with `npm run favicons` after
// changing the colours.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const pub = (file) => path.join(root, 'public', file);
const GRAPHITE = '#16191d';
const AMBER = '#f2b33d';

const font = await readFile(path.join(root, 'node_modules/@fontsource/host-grotesk/files/host-grotesk-latin-500-normal.woff'));

// Satori draws the letters as outlines, so the SVG needs no font to display.
async function mark({ size, round }) {
  const h = (type, style, children) => ({ type, props: { style, children } });
  return satori(
    h('div', {
      width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: GRAPHITE, borderRadius: round ? size * 0.22 : 0, color: AMBER,
      fontFamily: 'Host Grotesk', fontWeight: 500, fontSize: size * 0.46, letterSpacing: -size * 0.02,
    }, 'KP'),
    { width: size, height: size, fonts: [{ name: 'Host Grotesk', data: font, weight: 500, style: 'normal' }] },
  );
}

const circle = await mark({ size: 512, round: true });
const square = await mark({ size: 512, round: false });
const png = (svg, px) => sharp(Buffer.from(svg)).resize(px, px).png({ compressionLevel: 9 }).toBuffer();

await writeFile(pub('favicon.svg'), circle);
await writeFile(pub('android-chrome-192x192.png'), await png(circle, 192));
await writeFile(pub('android-chrome-512x512.png'), await png(circle, 512));
// iPhones round the corners themselves, so the touch icon is a full square.
await writeFile(pub('apple-touch-icon.png'), await png(square, 180));

// favicon.ico with 16, 32 and 48 px images stored as PNG (all current browsers read this).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((px) => png(circle, px)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((px, i) => {
  const at = 6 + 16 * i;
  header.writeUInt8(px, at);
  header.writeUInt8(px, at + 1);
  header.writeUInt8(0, at + 2);
  header.writeUInt8(0, at + 3);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(images[i].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += images[i].length;
});
await writeFile(pub('favicon.ico'), Buffer.concat([header, ...images]));
console.log('Favicons written to public/');
