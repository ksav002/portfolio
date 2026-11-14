// Professional / Creative switch. The saved choice is applied before the first
// paint by an inline script in Base.astro; this file wires the button, keeps
// the choice, and loads the Creative-only extras on demand.
const root = document.documentElement;
const KEY = 'kp-mode';
const THEME = { professional: '#f9f6f1', creative: '#0e1115' };
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let extras;
let wanted;
let enterTimer;

const currentMode = () => (root.dataset.mode === 'creative' ? 'creative' : 'professional');
const loadExtras = () => (extras ??= import('./creative.js'));

function sync(mode) {
  for (const button of document.querySelectorAll('[data-mode-switch]')) {
    button.setAttribute('aria-pressed', String(mode === 'creative'));
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME[mode]);
}

function apply(mode) {
  if (mode === 'creative') root.dataset.mode = 'creative';
  else delete root.dataset.mode;
  sync(mode);
}

function transition(update) {
  if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(update);
  else update();
}

// Everything on screen rises in on every switch, in either direction and at any
// scroll position. These are the blocks that take part; the ones in view get a
// stagger delay, and global.css plays the animation while data-enter is set.
const RISE = '.hero__copy > *, .hero .stage, .hero .work, .section__head, .index__row, .record__part, .skill-group, .contact > *';
const RISE_MS = 1500;
// The skyline starts once the entrance is well under way, not after it ends.
const SKYLINE_DELAY_MS = 600;

function clearEntrance() {
  root.removeAttribute('data-enter');
  for (const el of document.querySelectorAll('[data-rise]')) {
    el.removeAttribute('data-rise');
    el.style.removeProperty('--rise-delay');
  }
}

function playEntrance() {
  if (reduceMotion.matches) return;
  clearEntrance();
  let order = 0;
  for (const el of document.querySelectorAll(RISE)) {
    const box = el.getBoundingClientRect();
    if (el.offsetParent === null || box.bottom <= 0 || box.top >= innerHeight) continue;
    el.style.setProperty('--rise-delay', `${Math.min(order++ * 70, 560)}ms`);
    el.setAttribute('data-rise', '');
  }
  void root.offsetWidth;
  root.setAttribute('data-enter', '');
  clearTimeout(enterTimer);
  enterTimer = setTimeout(clearEntrance, RISE_MS);
}

function setMode(mode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    // Storage can be blocked; the switch still works for this visit.
  }
  // The colours change at once (they are plain CSS); the extras follow when loaded.
  wanted = mode;
  transition(() => {
    apply(mode);
    playEntrance();
  });
  if (mode === 'creative') {
    // Starting WebGL blocks the page for a moment, which made the entrance stall
    // and then pop. Wait until the entrance is well under way (the code has
    // usually been fetched already, see warm()).
    const start = () => loadExtras().then((module) => {
      if (wanted === 'creative') module.enable();
    });
    if (reduceMotion.matches) start();
    else setTimeout(start, SKYLINE_DELAY_MS);
  } else {
    extras?.then((module) => module.disable());
  }
}

// Fetch the Creative code as soon as someone shows intent to switch (hover,
// focus or touch), so the skyline can appear early without delaying the
// default view for visitors who never switch.
let warmed = false;
function warm() {
  if (warmed || currentMode() === 'creative') return;
  warmed = true;
  loadExtras();
  import('./skyline.js');
}
for (const type of ['pointerenter', 'focusin', 'touchstart']) {
  document.addEventListener(type, (event) => {
    if (event.target.closest?.('[data-mode-switch]')) warm();
  }, { passive: true, capture: true });
}

sync(currentMode());
if (currentMode() === 'creative') loadExtras().then((module) => module.enable());

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-mode-switch]');
  if (button) setMode(currentMode() === 'creative' ? 'professional' : 'creative');
});
