// Structured data (JSON-LD) describing Keshab and his projects for search
// engines and AI answer tools.
import {
  SITE_URL, profile, projects, skillGroups, timeline, allSocials, location,
  factSentence, pageTitle, portraitPath, revision, currentRole,
} from './site.js';

const personId = `${SITE_URL}/#person`;
const education = timeline.find((item) => item.type === 'education');
const [college, university] = education.org.split(/,\s*/);

export function profileGraph() {
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    givenName: 'Keshab',
    familyName: 'Poudel',
    jobTitle: 'Full-stack Developer',
    description: factSentence,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${portraitPath}`,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.locality,
      addressCountry: location.countryCode,
    },
    worksFor: { '@type': 'Organization', name: currentRole.org },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: college,
      ...(university ? { parentOrganization: { '@type': 'CollegeOrUniversity', name: university } } : {}),
    },
    knowsAbout: skillGroups.flatMap((group) => group.items),
    sameAs: allSocials.map((s) => s.href),
  };

  const works = projects.map((project) => ({
    '@type': 'SoftwareSourceCode',
    '@id': `${SITE_URL}/#${project.slug}`,
    name: project.title,
    description: project.summary,
    codeRepository: project.codeUrl,
    keywords: project.tags.join(', '),
    image: `${SITE_URL}${project.image}`,
    author: { '@id': personId },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: profile.name,
        inLanguage: 'en',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: pageTitle,
        description: factSentence,
        inLanguage: 'en',
        dateModified: revision,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': personId },
        hasPart: works.map((work) => ({ '@id': work['@id'] })),
      },
      person,
      ...works,
    ],
  };
}
