// /keshab-poudel-cv.pdf: a one-page CV generated from src/data on every
// build, as real text (readable by recruiter software), in the site's style.
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';
import {
  SITE_URL, profile, projects, skillGroups, timeline, shownSocials, locationText, factSentence,
  revision, parsePeriod, repoPath, currentRole,
} from '../lib/site.js';

const INK = rgb(0.063, 0.078, 0.071);
const GREY = rgb(0.278, 0.314, 0.294);
const HAIR = rgb(0.773, 0.804, 0.784);
const TEAL = rgb(0.059, 0.463, 0.431); // teal #0f766e, the site's accent

export async function GET() {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${profile.name} — CV`);
  pdf.setAuthor(profile.name);
  pdf.setSubject(factSentence);
  pdf.setKeywords(skillGroups.flatMap((g) => g.items));
  pdf.setCreator(SITE_URL);
  pdf.setLanguage('en');
  pdf.setCreationDate(new Date());
  pdf.setModificationDate(new Date());

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const mono = await pdf.embedFont(StandardFonts.Courier);

  const M = 48;
  let page = pdf.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const right = width - M;
  let y = height - M;

  const newPageIfNeeded = (needed) => {
    if (y - needed > M + 24) return;
    page = pdf.addPage([595.28, 841.89]);
    y = height - M;
  };

  const link = (x, yy, w, h, url) => {
    const annot = pdf.context.register(
      pdf.context.obj({
        Type: 'Annot',
        Subtype: 'Link',
        Rect: [x, yy - 2, x + w, yy + h],
        Border: [0, 0, 0],
        A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) },
      }),
    );
    page.node.addAnnot(annot);
  };

  const wrap = (text, font, size, maxWidth) => {
    const lines = [];
    let line = '';
    for (const word of text.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const paragraph = (text, { x = M, size = 9.5, font = regular, color = INK, maxWidth = right - x, leading = 1.38 } = {}) => {
    for (const line of wrap(text, font, size, maxWidth)) {
      newPageIfNeeded(size * leading);
      page.drawText(line, { x, y, size, font, color });
      y -= size * leading;
    }
  };

  const rule = (thickness = 0.75, color = HAIR) => {
    page.drawLine({ start: { x: M, y }, end: { x: right, y }, thickness, color });
  };

  const heading = (title) => {
    newPageIfNeeded(48);
    y -= 14;
    rule(1.5, TEAL);
    y -= 17;
    page.drawText(title, { x: M, y, size: 12.5, font: bold, color: INK });
    y -= 16;
  };

  // Title block
  page.drawText(profile.name, { x: M, y: y - 22, size: 26, font: bold, color: INK });
  page.drawText(`Full-stack developer  ·  ${locationText}`, { x: M, y: y - 42, size: 11, font: regular, color: GREY });

  const contacts = [
    { text: profile.email, url: `mailto:${profile.email}` },
    ...shownSocials.map((s) => ({ text: repoPath(s.href).replace(/\/$/, ''), url: s.href })),
    { text: repoPath(SITE_URL), url: `${SITE_URL}/` },
  ];
  let cy = y - 8;
  for (const c of contacts) {
    const w = regular.widthOfTextAtSize(c.text, 9);
    page.drawText(c.text, { x: right - w, y: cy, size: 9, font: regular, color: INK });
    link(right - w, cy, w, 9, c.url);
    cy -= 13;
  }
  y -= 64;
  page.drawLine({ start: { x: M, y }, end: { x: right, y }, thickness: 2.5, color: TEAL });
  y -= 20;

  // Summary
  paragraph(`${profile.tagline} Currently ${currentRole.title} at ${currentRole.org}.`, { size: 10.5 });

  const col = M + 118;
  const entry = (item) => {
    newPageIfNeeded(44);
    const p = parsePeriod(item.period);
    page.drawText(`${p.start} – ${p.current ? 'present' : p.end}`, { x: M, y, size: 8.5, font: mono, color: GREY });
    paragraph(item.title, { x: col, size: 10.5, font: bold });
    paragraph(item.org, { x: col, size: 9.5 });
    y -= 2;
    paragraph(item.description, { x: col, size: 9.5, color: GREY });
    y -= 8;
  };

  // Experience
  heading('Experience');
  timeline.filter((item) => item.type === 'work').forEach(entry);

  // Education
  heading('Education');
  timeline.filter((item) => item.type === 'education').forEach(entry);

  // Projects
  heading('Projects');
  for (const project of projects) {
    newPageIfNeeded(56);
    page.drawText(project.title, { x: M, y, size: 10.5, font: bold, color: INK });
    const url = repoPath(project.codeUrl);
    const uw = regular.widthOfTextAtSize(url, 8.5);
    page.drawText(url, { x: right - uw, y, size: 8.5, font: regular, color: TEAL });
    link(right - uw, y, uw, 8.5, project.codeUrl);
    y -= 14;
    paragraph(project.summary, { size: 9.5, color: INK });
    paragraph(`Built with: ${project.tags.join(', ')}`, { size: 8.5, color: GREY });
    y -= 8;
  }

  // Skills
  heading('Skills');
  for (const group of skillGroups) {
    newPageIfNeeded(16);
    page.drawText(group.category, { x: M, y, size: 9.5, font: bold, color: INK });
    paragraph(group.items.join(', '), { x: col, size: 9.5 });
    y -= 3;
  }

  // Footer on every page
  for (const p of pdf.getPages()) {
    p.drawLine({ start: { x: M, y: M }, end: { x: right, y: M }, thickness: 0.75, color: HAIR });
    p.drawText(`${profile.name}  ·  ${repoPath(SITE_URL)}`, { x: M, y: M - 14, size: 8, font: regular, color: GREY });
    const rev = `Rev. ${revision}`;
    p.drawText(rev, { x: right - mono.widthOfTextAtSize(rev, 8), y: M - 14, size: 8, font: mono, color: GREY });
  }

  pdf.catalog.set(PDFName.of('PageMode'), PDFName.of('UseNone'));
  const bytes = await pdf.save();
  return new Response(bytes, { headers: { 'Content-Type': 'application/pdf' } });
}
