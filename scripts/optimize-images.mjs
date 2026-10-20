// Makes small, modern-format copies of the images in public/images.
// The originals are never changed. Run with `npm run images` after adding
// or replacing an image, then commit the files in public/images/opt.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'public/images');
const outDir = path.join(srcDir, 'opt');
const manifestPath = path.join(root, 'src/lib/image-manifest.json');

const images = [
  { file: 'keshab-poudel.png', name: 'keshab-poudel', widths: [240, 480, 720], square: true, jpeg: true },
  { file: 'gaze-tracking-system.png', name: 'gaze-tracking-system', widths: [640, 960, 1440] },
  { file: 'stock-prediction-system.png', name: 'stock-prediction-system', widths: [640, 960, 1200] },
  { file: 'karyalaya.png', name: 'karyalaya', widths: [480, 960] },
];

await mkdir(outDir, { recursive: true });
const manifest = {};

for (const image of images) {
  const input = sharp(path.join(srcDir, image.file)).rotate();
  const meta = await input.metadata();
  const side = Math.min(meta.width, meta.height);
  const ratio = image.square ? 1 : meta.height / meta.width;
  const entry = { width: 0, height: 0, avif: [], webp: [], jpeg: [] };

  for (const width of image.widths.filter((w) => w <= meta.width)) {
    const height = Math.round(width * ratio);
    const base = image.square
      ? sharp(path.join(srcDir, image.file)).rotate().resize(side, side, { fit: 'cover' })
      : sharp(path.join(srcDir, image.file)).rotate();
    const resized = await base.resize(width, height, { fit: 'cover' }).toBuffer();

    const formats = [
      ['avif', (s) => s.avif({ quality: 55, effort: 6 })],
      ['webp', (s) => s.webp({ quality: 78 })],
      ...(image.jpeg ? [['jpeg', (s) => s.jpeg({ quality: 80, mozjpeg: true })]] : []),
    ];
    for (const [format, encode] of formats) {
      const ext = format === 'jpeg' ? 'jpg' : format;
      const outName = `${image.name}-${width}.${ext}`;
      await writeFile(path.join(outDir, outName), await encode(sharp(resized)).toBuffer());
      entry[format].push({ src: `/images/opt/${outName}`, width });
    }
    entry.width = width;
    entry.height = height;
  }
  manifest[image.name] = entry;
  console.log(`${image.file}: ${entry.webp.map((s) => s.width).join(', ')} px`);
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, manifestPath)}`);
