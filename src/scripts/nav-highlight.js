// Marks the menu link for the section currently in view (aria-current), so
// visitors always know where they are. Nothing is marked at the very top, or
// in a section that has no menu link (Education).
const links = [...document.querySelectorAll('[data-section-link]')];
const sections = [...document.querySelectorAll('section[id]')];
const tabs = document.querySelector('[data-tabs]');

function mark(id) {
  for (const link of links) {
    if (link.dataset.sectionLink === id) {
      link.setAttribute('aria-current', 'true');
      // On phones, slide the tab row so the current tab is visible.
      if (tabs?.contains(link) && tabs.scrollWidth > tabs.clientWidth) {
        tabs.scrollTo({ left: link.offsetLeft - tabs.clientWidth / 3, behavior: 'smooth' });
      }
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) if (entry.isIntersecting) mark(entry.target.id);
    if (window.scrollY < 200) mark(null);
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
sections.forEach((section) => observer.observe(section));
