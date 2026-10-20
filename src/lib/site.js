// Facts shared by the page, the CV, the share image and llms.txt.
// Everything comes from src/data (which matches the live site) plus the
// location Keshab gave directly. Never import src/data/familyData.js.
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';
import { socials } from '../data/socials.js';
import { timeline } from '../data/timeline.js';

export { profile, projects, skillGroups, timeline };

export const SITE_URL = 'https://poudelkeshab.com.np';
export const location = { locality: 'Bhaktapur', country: 'Nepal', countryCode: 'NP' };
export const locationText = `${location.locality}, ${location.country}`;

// GitHub and LinkedIn are the main profile links. Facebook and Instagram
// appear only as small icons in Let's talk and in the search-engine data.
export const shownSocials = socials.filter((s) => ['GitHub', 'LinkedIn'].includes(s.label));
export const extraSocials = socials.filter((s) => ['Facebook', 'Instagram'].includes(s.label));
export const allSocials = [...shownSocials, ...extraSocials];

// WhatsApp username (from Keshab). Username links open a chat without showing his number.
export const whatsapp = { handle: '@poudelkeshab', href: 'https://wa.me/poudelkeshab' };

export const headline = 'I build Django + React apps and the AI automation behind them.';
export const factSentence =
  'Keshab Poudel is a full-stack developer in Bhaktapur, Nepal, building Django and React apps and AI automation (n8n workflows and RAG) at Upveda Technology.';
export const pageTitle = 'Keshab Poudel — Full-stack developer: Django, React and AI automation';
export const cvPath = '/keshab-poudel-cv.pdf';
export const ogImagePath = '/og.png';
export const portraitPath = '/images/opt/keshab-poudel-720.jpg';

// Build date in Nepal time (YYYY-MM-DD): the page's last-updated date.
export const revision = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kathmandu' }).format(new Date());
export const year = revision.slice(0, 4);

export const currentRole = timeline.find((item) => item.type === 'work' && /present/i.test(item.period));

const MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

function toIso(text) {
  const match = text.trim().match(/^(?:([A-Za-z]+)\s+)?(\d{4})$/);
  if (!match) return undefined;
  const month = match[1] ? MONTHS[match[1].toLowerCase()] : undefined;
  return month ? `${match[2]}-${month}` : match[2];
}

// "August 2025 — Present" → { start: '2025-08', end: null, current: true }
export function parsePeriod(period) {
  const [startText, endText = ''] = period.split(/\s+[—–-]\s+/);
  const current = /present/i.test(endText);
  return {
    start: toIso(startText),
    end: current ? null : toIso(endText),
    current,
  };
}

export const repoPath = (url) => url.replace(/^https?:\/\/(www\.)?/, '');
