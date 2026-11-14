// Scroll-in for the blocks below the fold: each rises once as it enters the
// screen. Only blocks that start off-screen are marked, so nothing is hidden
// if this script fails, and the blocks already in view never flash.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const TARGETS = '.section__head, .index__row, .record__part, .skill-group, .contact > *, .footer__grid > *';

if (!reduce.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px' },
  );
  for (const el of document.querySelectorAll(TARGETS)) {
    if (el.getBoundingClientRect().top < window.innerHeight) continue;
    const index = [...el.parentElement.children].indexOf(el);
    el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  }

  // Safety net: at the very bottom of the page, show anything still waiting.
  window.addEventListener(
    'scroll',
    () => {
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
      for (const el of document.querySelectorAll('[data-reveal]:not([data-revealed])')) el.setAttribute('data-revealed', '');
    },
    { passive: true },
  );
}
