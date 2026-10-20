// Creative-only extras, loaded only after a visitor switches to Creative:
// eyes that follow the cursor on the gaze tracking project (idea from
// bencho.dev's "Eye tracker" block, rebuilt in plain JavaScript), and the
// intro photo flipping over to a 3D avatar on hover (Microsoft Fluent 3D
// emoji, MIT).
import './creative.css';

const MARK = 'data-creative';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let stopEyes = () => {};
let stopFlip = () => {};

function mountEyes() {
  const media = document.querySelector('[data-project="gaze-tracking-system"] .card__media');
  if (!media) return;
  const eyes = document.createElement('div');
  eyes.className = 'eyes';
  eyes.setAttribute(MARK, '');
  eyes.setAttribute('aria-hidden', 'true');
  eyes.innerHTML = '<span class="eye"><span class="pupil"></span></span><span class="eye"><span class="pupil"></span></span>';
  media.append(eyes);

  const pupils = [...eyes.querySelectorAll('.pupil')];
  let frame = 0;
  const follow = (event) => {
    if (reduceMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      for (const pupil of pupils) {
        const box = pupil.parentElement.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const angle = Math.atan2(dy, dx);
        const reach = Math.min(box.width * 0.22, Math.hypot(dx, dy) / 12);
        pupil.style.transform = `translate(${Math.cos(angle) * reach}px, ${Math.sin(angle) * reach}px)`;
      }
    });
  };
  window.addEventListener('pointermove', follow, { passive: true });
  stopEyes = () => window.removeEventListener('pointermove', follow);
}

function mountFlip() {
  const photo = document.querySelector('.intro__photo');
  const picture = photo?.querySelector('picture');
  if (!photo || !picture) return;

  // The circle stays still; only this inner card turns. Hovering the still
  // circle keeps the hover steady mid-turn (no flicker).
  const card = document.createElement('div');
  card.className = 'flip-card';
  const back = document.createElement('div');
  back.className = 'flip-back';
  back.setAttribute('aria-hidden', 'true');
  back.innerHTML = '<img src="/images/opt/avatar-3d-256.webp" alt="" width="256" height="256" />';
  photo.prepend(card);
  card.append(picture, back);
  photo.classList.add('is-flippable');

  // Phones have no hover, so a tap flips it there.
  const touch = window.matchMedia('(hover: none)');
  const toggle = () => {
    if (touch.matches) photo.classList.toggle('is-flipped');
  };
  photo.addEventListener('click', toggle);
  stopFlip = () => {
    photo.removeEventListener('click', toggle);
    photo.prepend(picture);
    card.remove();
    photo.classList.remove('is-flippable', 'is-flipped');
  };
}

export function enable() {
  if (document.querySelector(`[${MARK}]`)) return;
  mountEyes();
  mountFlip();
}

export function disable() {
  stopEyes();
  stopFlip();
  for (const el of document.querySelectorAll(`[${MARK}]`)) el.remove();
}
