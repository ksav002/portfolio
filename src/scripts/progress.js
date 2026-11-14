// Fills the thin line along the top edge as the page scrolls. It follows the
// real scroll position, so it reads the same in every browser and always
// reaches the full width by the bottom of the page.
const line = document.querySelector('.progress');
const root = document.documentElement;
let frame = 0;

function update() {
  frame = 0;
  const room = root.scrollHeight - window.innerHeight;
  // Full a little before the very bottom, so rounding or a collapsing phone
  // address bar never leaves it short.
  const ratio = room > 0 ? Math.min(1, window.scrollY / (room - Math.min(room * 0.02, 60))) : 0;
  line.style.setProperty('--progress', String(Math.max(0, ratio)));
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(update);
};

if (line) {
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  // Images and fonts change the page height as they load.
  new ResizeObserver(schedule).observe(document.body);
  update();
}
