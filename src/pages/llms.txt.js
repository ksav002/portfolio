// /llms.txt: a plain-text summary for AI tools, built from the same data.
import {
  SITE_URL, profile, projects, skillGroups, timeline, allSocials, whatsapp, factSentence, cvPath, parsePeriod,
} from '../lib/site.js';

export function GET() {
  const period = (text) => {
    const p = parsePeriod(text);
    return `${p.start} to ${p.current ? 'present' : p.end}`;
  };
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${factSentence}`,
    '',
    profile.tagline,
    '',
    '## Experience',
    ...timeline.filter((t) => t.type === 'work').map((t) => `- ${t.title}, ${t.org} (${period(t.period)}): ${t.description}`),
    '',
    '## Education',
    ...timeline.filter((t) => t.type === 'education').map((t) => `- ${t.title}, ${t.org} (${period(t.period)}): ${t.description}`),
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.title}](${p.codeUrl}): ${p.summary} Built with ${p.tags.join(', ')}.`),
    '',
    '## Skills',
    ...skillGroups.map((g) => `- ${g.category}: ${g.items.join(', ')}`),
    '',
    '## Contact',
    `- Email: ${profile.email}`,
    `- WhatsApp: ${whatsapp.handle}`,
    ...allSocials.map((s) => `- ${s.label}: ${s.href}`),
    `- CV (PDF): ${SITE_URL}${cvPath}`,
    `- Website: ${SITE_URL}/`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
