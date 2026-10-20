// Professional / Creative switch. The saved choice is applied before the first
// paint by an inline script in Base.astro; this file wires the button, keeps
// the choice, and loads the Creative-only extras on demand.
const root = document.documentElement;
const KEY = 'kp-mode';
const THEME = { professional: '#ffffff', creative: '#0a1211' };
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let extras;
let wanted;

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

function setMode(mode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    // Storage can be blocked; the switch still works for this visit.
  }
  // The colours change at once (they are plain CSS); the extras follow when loaded.
  wanted = mode;
  transition(() => apply(mode));
  if (mode === 'creative') {
    loadExtras().then((module) => {
      if (wanted === 'creative') module.enable();
    });
  } else {
    extras?.then((module) => module.disable());
  }
}

sync(currentMode());
if (currentMode() === 'creative') loadExtras().then((module) => module.enable());

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-mode-switch]');
  if (button) setMode(currentMode() === 'creative' ? 'professional' : 'creative');
});
