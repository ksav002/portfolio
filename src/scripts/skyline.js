// Creative-only Three.js hero backdrop: the Kathmandu valley at dusk, as layered
// silhouettes. Pashupatinath, Boudhanath (with prayer flags) and Nyatapola stand
// above the houses of the city. Windows light up, flags flutter, mist drifts,
// shooting stars cross the sky every few seconds, and
// the layers drift slowly at different speeds. Loaded as its own chunk
// after the switch to Creative.
import {
  BufferAttribute,
  BufferGeometry,
  AdditiveBlending,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';

const FLAG_COLORS = ['#4f86d6', '#e9e6df', '#d9534a', '#4caf7a', '#e8b83c'];

// CSS colours may be oklch(), which Three.js cannot parse; the 2D canvas can.
function cssColor(name, fallback) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = fallback;
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return new Color().setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
}

// Same city every visit.
function seeded(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function softTexture(stops, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  for (const [at, color] of stops) gradient.addColorStop(at, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  return new CanvasTexture(canvas);
}

// A streak that fades from nothing at the tail to bright at the head.
function streakTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 4;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 128, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.7, 'rgba(255,255,255,0.45)');
  gradient.addColorStop(1, 'rgba(255,255,255,1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 4);
  return new CanvasTexture(canvas);
}

function blobTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new CanvasTexture(canvas);
}

export function mountSkyline(host) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-skyline';
  canvas.setAttribute('data-creative', '');
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);

  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    // No WebGL: the page simply has no backdrop.
    canvas.remove();
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const paper = cssColor('--color-paper', '#212428');
  const shade = cssColor('--color-paper-3', '#14171a');
  const cool = cssColor('--color-cool', '#7fb0ff');
  const accent = cssColor('--color-accent', '#f2c14e');
  const far = paper.clone().lerp(cool, 0.12);
  const mid = shade.clone().multiplyScalar(0.8);
  const near = shade.clone().multiplyScalar(0.5);

  const scene = new Scene();
  const camera = new OrthographicCamera(-2, 2, 1, -1, 0.1, 20);
  camera.position.z = 5;

  const backdrop = new Group(); // sky: glow and stars, in canvas units
  const root = new Group(); // the city, scaled to sit in the bottom band
  scene.add(backdrop, root);
  const disposables = [];
  let order = 0;
  const track = (thing) => {
    disposables.push(thing);
    return thing;
  };
  const place = (object) => {
    object.renderOrder = order++;
    return object;
  };
  const flat = (color, opacity = 1) =>
    track(new MeshBasicMaterial({ color, transparent: true, opacity, depthTest: false, depthWrite: false }));

  let layers = [];
  let flags;
  let windows = [];
  let stars;
  let meteors = [];
  let nextMeteor = 0;
  let mists = [];

  function polygon(group, pts, material) {
    const shape = new Shape(pts.map(([x, y]) => ({ x, y })));
    const mesh = place(new Mesh(track(new ShapeGeometry(shape)), material));
    group.add(mesh);
  }

  function rect(group, x, y, w, h, material) {
    polygon(group, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], material);
  }

  // Boudhanath, drawn from photographs: a very wide whitewashed dome on three
  // terraces, with a gilded tower above it: a square harmika with a thin red band
  // and the painted eyes, thirteen gilded steps, an umbrella and a crown.
  function stupa(group, cx, base, s, m) {
    const terraces = [[0.42, 0.035], [0.36, 0.035], [0.3, 0.035]];
    let y = base;
    for (const [half, h] of terraces) {
      rect(group, cx - half * s, y, half * 2 * s, h * s, m.plinth);
      y += h * s;
    }
    const dome = [];
    for (let i = 0; i <= 40; i++) {
      const a = (i / 40) * Math.PI;
      dome.push([cx + Math.cos(a) * 0.27 * s, y + Math.sin(a) * 0.21 * s]);
    }
    polygon(group, dome, m.dome);
    // The harmika sits in the dome's crown.
    const h0 = y + 0.2 * s;
    rect(group, cx - 0.07 * s, h0, 0.14 * s, 0.065 * s, m.gold);
    rect(group, cx - 0.074 * s, h0, 0.148 * s, 0.012 * s, m.band);
    for (const dx of [-0.032, 0.014]) rect(group, cx + dx * s, h0 + 0.033 * s, 0.018 * s, 0.009 * s, m.dark);
    const h1 = h0 + 0.065 * s;
    const left = [[cx - 0.052 * s, h1]];
    const right = [[cx + 0.052 * s, h1]];
    for (let i = 0; i < 13; i++) {
      const half = (0.052 - i * 0.0029) * s;
      const top = h1 + (i + 1) * 0.0145 * s;
      left.push([cx - half, top], [cx - half + 0.004 * s, top]);
      right.push([cx + half, top], [cx + half - 0.004 * s, top]);
    }
    polygon(group, [...left, ...right.reverse()], m.gold);
    const h2 = h1 + 13 * 0.0145 * s;
    rect(group, cx - 0.032 * s, h2, 0.064 * s, 0.012 * s, m.gold);
    polygon(group, [[cx - 0.022 * s, h2 + 0.012 * s], [cx + 0.022 * s, h2 + 0.012 * s], [cx + 0.012 * s, h2 + 0.042 * s], [cx - 0.012 * s, h2 + 0.042 * s]], m.gold);
    polygon(group, [[cx - 0.008 * s, h2 + 0.042 * s], [cx + 0.008 * s, h2 + 0.042 * s], [cx, h2 + 0.09 * s]], m.gold);
    return { tip: [cx, h2 + 0.09 * s] };
  }

  // Nyatapola, drawn from photographs: a tall five-step brick plinth (with a pair
  // of guardian figures on each step beside the stairs) carrying five closely
  // stacked, steeply pitched roofs that shrink sharply toward the top, and a
  // gold pinnacle.
  function tiered(group, cx, base, s, { tiers, hw, shrink, body, roof, steps }, material, roofMaterial, goldMaterial) {
    let y = base;
    for (let i = 0; i < steps; i++) {
      const w = (hw * 2 - i * 0.045) * s;
      rect(group, cx - w, y, w * 2, 0.034 * s, material);
      // Guardians: a small figure on each side of the stairs.
      for (const side of [-1, 1]) rect(group, cx + side * 0.075 * s - 0.011 * s, y + 0.034 * s, 0.022 * s, 0.03 * s, material);
      y += 0.034 * s;
    }
    for (let t = 0; t < tiers; t++) {
      const bw = (hw * 1.1 - t * shrink * 0.9) * s;
      rect(group, cx - bw / 2, y, bw, body * s, material);
      y += body * s;
      const rw = (hw - t * shrink) * s;
      const rh = roof * s;
      polygon(group, [[cx - rw * 1.05, y + rh * 0.14], [cx - rw, y], [cx + rw, y], [cx + rw * 1.05, y + rh * 0.14], [cx + rw * 0.62, y + rh * 0.55], [cx + rw * 0.42, y + rh], [cx - rw * 0.42, y + rh], [cx - rw * 0.62, y + rh * 0.55]], roofMaterial);
      y += rh;
    }
    rect(group, cx - 0.012 * s, y, 0.024 * s, 0.025 * s, material);
    polygon(group, [[cx - 0.016 * s, y + 0.025 * s], [cx + 0.016 * s, y + 0.025 * s], [cx, y + 0.115 * s]], goldMaterial);
    return y + 0.115 * s;
  }

  // Pashupatinath, drawn from photographs of the temple: a dark square sanctum
  // under two gilded copper roofs (the lower one much wider, both gently pitched
  // with hardly any lift at the corners), a tall dark wall between them, and a
  // gold pinnacle with a bell-shaped base. Beside it: a pavilion with a dark
  // hipped roof, the long white house with its row of lit windows, and the small
  // beehive shikhara shrines of the ghat, each with a gold tip.
  function pashupatinath(group, cx, base, s, material, goldMaterial, shadeMaterial, windowMaterial, shrineMaterial) {
    // The ghat shrines in front: three steps narrowing to a gold-tipped peak.
    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        const x = cx + side * (0.98 + i * 0.1) * s;
        const k = 1 - i * 0.1;
        const w = 0.045 * k * s;
        rect(group, x - w, base, w * 2, 0.045 * k * s, shrineMaterial);
        let y = base + 0.045 * k * s;
        for (let step = 0; step < 3; step++) {
          const half = w * (1.15 - step * 0.3);
          rect(group, x - half, y, half * 2, 0.022 * k * s, shrineMaterial);
          y += 0.022 * k * s;
        }
        polygon(group, [[x - w * 0.22, y], [x + w * 0.22, y], [x, y + 0.04 * k * s]], goldMaterial);
      }
    }

    // The pavilion on the left: dark hipped roof and a small gold finial.
    const pl = cx - 0.5 * s;
    rect(group, pl - 0.15 * s, base, 0.3 * s, 0.1 * s, material);
    polygon(group, [[pl - 0.2 * s, base + 0.1 * s], [pl + 0.2 * s, base + 0.1 * s], [pl + 0.06 * s, base + 0.175 * s], [pl - 0.06 * s, base + 0.175 * s]], material);
    polygon(group, [[pl - 0.012 * s, base + 0.175 * s], [pl + 0.012 * s, base + 0.175 * s], [pl, base + 0.215 * s]], goldMaterial);

    // The long house on the right, with its row of lit windows.
    const hr = cx + 0.34 * s;
    rect(group, hr, base, 0.5 * s, 0.17 * s, material);
    rect(group, hr + 0.02 * s, base + 0.17 * s, 0.46 * s, 0.015 * s, material);
    for (let i = 0; i < 7; i++) rect(group, hr + (0.04 + i * 0.065) * s, base + 0.1 * s, 0.02 * s, 0.028 * s, windowMaterial);

    // Platform and the dark sanctum.
    rect(group, cx - 0.4 * s, base, 0.8 * s, 0.03 * s, material);
    rect(group, cx - 0.33 * s, base + 0.03 * s, 0.66 * s, 0.03 * s, material);
    rect(group, cx - 0.28 * s, base + 0.06 * s, 0.56 * s, 0.11 * s, material);

    // Lower roof: wide and low, with a thin darker eave.
    const roof1 = base + 0.17 * s;
    polygon(group, [[cx - 0.36 * s, roof1], [cx + 0.36 * s, roof1], [cx + 0.17 * s, roof1 + 0.07 * s], [cx - 0.17 * s, roof1 + 0.07 * s]], goldMaterial);
    rect(group, cx - 0.36 * s, roof1 - 0.012 * s, 0.72 * s, 0.012 * s, shadeMaterial);

    // The tall dark wall between the roofs, then the upper roof.
    const wall = roof1 + 0.07 * s;
    rect(group, cx - 0.16 * s, wall, 0.32 * s, 0.085 * s, material);
    const roof2 = wall + 0.085 * s;
    polygon(group, [[cx - 0.2 * s, roof2], [cx + 0.2 * s, roof2], [cx + 0.09 * s, roof2 + 0.058 * s], [cx - 0.09 * s, roof2 + 0.058 * s]], goldMaterial);
    rect(group, cx - 0.2 * s, roof2 - 0.01 * s, 0.4 * s, 0.01 * s, shadeMaterial);

    // The gajur: a gold bell on the ridge, then a slim spire.
    const top = roof2 + 0.058 * s;
    rect(group, cx - 0.045 * s, top, 0.09 * s, 0.012 * s, goldMaterial);
    polygon(group, [[cx - 0.036 * s, top + 0.012 * s], [cx + 0.036 * s, top + 0.012 * s], [cx + 0.022 * s, top + 0.045 * s], [cx - 0.022 * s, top + 0.045 * s]], goldMaterial);
    polygon(group, [[cx - 0.014 * s, top + 0.045 * s], [cx + 0.014 * s, top + 0.045 * s], [cx, top + 0.115 * s]], goldMaterial);
  }

  function city(group, rng, from, to, base, minH, maxH, material, windowCount) {
    const spots = [];
    let x = from;
    while (x < to) {
      const w = 0.07 + rng() * 0.11;
      const h = minH + rng() * (maxH - minH);
      const roof = rng();
      if (roof < 0.22) polygon(group, [[x, base], [x + w, base], [x + w, base + h], [x + w * 0.5, base + h + w * 0.28], [x, base + h]], material);
      else rect(group, x, base, w, h, material);
      if (roof > 0.78) rect(group, x + w * 0.2, base + h, w * 0.3, w * 0.34, material); // rooftop water tank
      if (roof > 0.55 && roof < 0.66) rect(group, x + w * 0.6, base + h, 0.004, w * 0.55, material); // antenna
      spots.push([x, base, w, h]);
      x += w + rng() * 0.012;
    }
    const picked = [];
    for (let i = 0; i < windowCount; i++) {
      const [bx, by, bw, bh] = spots[Math.floor(rng() * spots.length)];
      picked.push([bx + 0.012 + rng() * Math.max(bw - 0.024, 0.01), by + 0.02 + rng() * Math.max(bh - 0.04, 0.01)]);
    }
    return picked;
  }

  function addWindows(group, picked) {
    if (!picked.length) return;
    const positions = new Float32Array(picked.length * 3);
    picked.forEach(([x, y], i) => positions.set([x, y, 0], i * 3));
    const colors = new Float32Array(picked.length * 3);
    const geometry = track(new BufferGeometry());
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    const material = track(new PointsMaterial({ size: 2.6 * renderer.getPixelRatio(), sizeAttenuation: false, vertexColors: true, transparent: true, depthTest: false, depthWrite: false }));
    const points = place(new Points(geometry, material));
    group.add(points);
    const state = picked.map(() => ({ on: Math.random() < 0.7, level: 0 }));
    windows.push({ geometry, state });
  }

  function build(A) {
    for (const item of disposables.splice(0)) item.dispose();
    root.clear();
    backdrop.clear();
    layers = [];
    windows = [];
    mists = [];
    order = 0;
    const rng = seeded(7);
    const W = 2 * A;
    const reach = A * 1.14;
    // On a phone-shaped canvas show two landmarks, larger, instead of three tiny ones.
    const narrow = aspect < 0.9;
    const sc = narrow ? 0.95 : Math.min(Math.max(A / 2.6, 0.45), 1);
    const gold = flat(accent, 0.9);
    const at = (f) => (f - 0.5) * W;
    const BASE = -1.02;

    const sky = track(softTexture([[0, 'rgba(0,0,0,0)'], [0.45, 'rgba(0,0,0,0)'], [1, `rgba(${Math.round(accent.r * 255)},${Math.round(accent.g * 255)},${Math.round(accent.b * 255)},0.2)`]], 4, 256));
    const glow = place(new Mesh(track(new PlaneGeometry(aspect * 2.8, 2)), track(new MeshBasicMaterial({ map: sky, transparent: true, depthTest: false, depthWrite: false }))));
    backdrop.add(glow);

    const starCount = 46;
    const starPositions = new Float32Array(starCount * 3);
    // Stars stay clear of the copy: right of the text column on wide screens, and in
    // the strip above the photo on phones, where the text fills the width.
    for (let i = 0; i < starCount; i++) {
      const x = narrow ? (rng() * 2 - 1) * aspect : (rng() * 1.35 - 0.35) * aspect;
      const y = narrow ? 0.84 + rng() * 0.14 : -0.2 + rng() * 1.15;
      starPositions.set([x, y, 0], i * 3);
    }
    const starGeometry = track(new BufferGeometry());
    starGeometry.setAttribute('position', new BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new BufferAttribute(new Float32Array(starCount * 3), 3));
    stars = place(new Points(starGeometry, track(new PointsMaterial({ size: 1.8 * renderer.getPixelRatio(), sizeAttenuation: false, vertexColors: true, transparent: true, depthTest: false, depthWrite: false }))));
    backdrop.add(stars);

    // Shooting stars: a small pool of tapered streaks, spawned from step().
    const streak = track(streakTexture());
    const tail = track(new BufferGeometry());
    tail.setAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0, 1, -0.5, 0, 1, 0.5, 0]), 3));
    tail.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0.5, 1, 0, 1, 1]), 2));
    const meteorColor = accent.clone().lerp(new Color(1, 1, 1), 0.75);
    meteors = Array.from({ length: 3 }, () => {
      const mesh = place(new Mesh(tail, track(new MeshBasicMaterial({ map: streak, color: meteorColor, transparent: true, opacity: 0, blending: AdditiveBlending, side: DoubleSide, depthTest: false, depthWrite: false }))));
      mesh.visible = false;
      backdrop.add(mesh);
      return { mesh, active: false, born: 0, life: 1, x: 0, y: 0, vx: 0, vy: 0, length: 0.5 };
    });

    const sprite = track(blobTexture());
    for (let i = 0; i < 4; i++) {
      const mist = place(new Mesh(track(new PlaneGeometry(1.9 * sc, 0.5)), track(new MeshBasicMaterial({ map: sprite, color: cool, transparent: true, opacity: 0.1, depthTest: false, depthWrite: false }))));
      mist.position.set(at(0.1 + i * 0.27), -0.36 - (i % 2) * 0.14, 0);
      mist.userData = { speed: 0.004 + i * 0.0015 };
      mists.push(mist);
      root.add(mist);
    }

    const add = (parallax) => {
      const group = new Group();
      layers.push({ group, parallax: parallax * A });
      root.add(group);
      return group;
    };

    // 1. Far city
    const farCity = add(0.04);
    addWindows(farCity, city(farCity, rng, -reach, reach, BASE, 0.08, 0.3, flat(far), 26));

    // 2. Three landmarks in front of the mid city
    const midGroup = add(0.07);
    const midMaterial = flat(mid);
    const roofGold = flat(accent, 0.85);
    // Lamp-glow behind the gilded roofs and behind the stupa, so their dark silhouettes stand out.
    // The monuments stand on dark terraces a little above the ground, so their
    // plinths show above the rooftops in front instead of being buried in them.
    const RAISE = 0.09;
    const pPos = narrow ? 0.3 : 0.2;
    const bPos = narrow ? 0.72 : 0.5;
    for (const [f, w, opacity] of [[pPos, 1.9, 0.2], [bPos, 1.7, 0.14]]) {
      const halo = place(new Mesh(track(new PlaneGeometry(w * sc, 1.5 * sc)), track(new MeshBasicMaterial({ map: sprite, color: accent, transparent: true, opacity, depthTest: false, depthWrite: false }))));
      halo.position.set(at(f), BASE + RAISE + 0.4 * sc, 0);
      midGroup.add(halo);
    }
    addWindows(midGroup, city(midGroup, rng, -reach, reach, BASE, 0.05, 0.26, midMaterial, 40));
    rect(midGroup, at(pPos) - 1.4 * sc, BASE, 2.8 * sc, RAISE + 0.03, midMaterial);
    pashupatinath(midGroup, at(pPos), BASE + 0.02 + RAISE, 1.05 * sc, midMaterial, roofGold, flat(accent, 0.5), flat(accent, 0.75), flat(far.clone().lerp(new Color(1, 1, 1), 0.3), 0.9));
    const pale = far.clone().lerp(new Color(1, 0.95, 0.86), 0.5);
    rect(midGroup, at(bPos) - 0.5 * sc, BASE, 1.0 * sc, RAISE + 0.03, midMaterial);
    const dome = stupa(midGroup, at(bPos), BASE + 0.02 + RAISE, 1.0 * sc, {
      dome: flat(pale, 0.95),
      plinth: flat(far.clone().lerp(new Color(1, 0.95, 0.86), 0.28), 0.95),
      gold: flat(accent, 0.9),
      band: flat(new Color(0.8, 0.2, 0.16), 0.9),
      dark: midMaterial,
    });
    if (!narrow) {
      rect(midGroup, at(0.8) - 0.45 * sc, BASE, 0.9 * sc, RAISE + 0.03, midMaterial);
      tiered(midGroup, at(0.8), BASE + 0.02 + RAISE, 1.0 * sc, { tiers: 5, hw: 0.2, shrink: 0.034, body: 0.028, roof: 0.062, steps: 5 }, midMaterial, midMaterial, gold);
    }

    // Prayer flags: strings from the tip of Boudhanath's spire out to the ground.
    const strings = [];
    const quads = [];
    const [tx, ty] = dome.tip;
    for (const side of [-1, 1]) {
      for (const spread of [0.45, 0.66, 0.88]) {
        const ex = tx + side * spread * sc;
        const ey = BASE + 0.1;
        strings.push([tx, ty - 0.03, 0, ex, ey, 0]);
        for (let k = 1; k <= 9; k++) {
          const f = k / 10;
          quads.push({ x: tx + (ex - tx) * f, y: ty - 0.03 + (ey - ty + 0.03) * f, color: new Color(FLAG_COLORS[(k + (side > 0 ? 2 : 0)) % 5]), phase: rng() * 6, side });
        }
      }
    }
    const lineGeometry = track(new BufferGeometry());
    lineGeometry.setAttribute('position', new BufferAttribute(new Float32Array(strings.flat()), 3));
    midGroup.add(place(new LineSegments(lineGeometry, track(new LineBasicMaterial({ color: cool, transparent: true, opacity: 0.4, depthTest: false, depthWrite: false })))));
    const flagPositions = new Float32Array(quads.length * 4 * 3);
    const flagColors = new Float32Array(quads.length * 4 * 3);
    const flagIndex = [];
    quads.forEach((q, i) => {
      for (let v = 0; v < 4; v++) flagColors.set([q.color.r * 0.8, q.color.g * 0.8, q.color.b * 0.8], (i * 4 + v) * 3);
      flagIndex.push(i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 1, i * 4 + 3, i * 4 + 2);
    });
    const flagGeometry = track(new BufferGeometry());
    flagGeometry.setAttribute('position', new BufferAttribute(flagPositions, 3));
    flagGeometry.setAttribute('color', new BufferAttribute(flagColors, 3));
    flagGeometry.setIndex(flagIndex);
    midGroup.add(place(new Mesh(flagGeometry, track(new MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.85, side: DoubleSide, depthTest: false, depthWrite: false })))));
    flags = { geometry: flagGeometry, quads, sc };

    // 3. Near rooftops with wires
    const nearGroup = add(0.11);
    const nearMaterial = flat(near);
    addWindows(nearGroup, city(nearGroup, rng, -reach, reach, BASE, 0.02, 0.13, nearMaterial, 18));
    const wires = [];
    for (let i = 0; i < 4; i++) {
      const x0 = at(0.05 + i * 0.3);
      const x1 = x0 + 0.5 * sc;
      let prev = null;
      for (let k = 0; k <= 12; k++) {
        const f = k / 12;
        const p = [x0 + (x1 - x0) * f, BASE + 0.19 - Math.sin(f * Math.PI) * 0.045 - i * 0.012];
        if (prev) wires.push(prev[0], prev[1], 0, p[0], p[1], 0);
        prev = p;
      }
    }
    const wireGeometry = track(new BufferGeometry());
    wireGeometry.setAttribute('position', new BufferAttribute(new Float32Array(wires), 3));
    nearGroup.add(place(new LineSegments(wireGeometry, track(new LineBasicMaterial({ color: near, transparent: true, opacity: 0.9, depthTest: false, depthWrite: false })))));

    // A warm haze lying along the ground, in front of the rooftops, so the city
    // melts into the page instead of ending in a dark slab.
    const rgb = [accent.r, accent.g, accent.b].map((v) => Math.round(Math.pow(v, 1 / 2.2) * 255)).join(',');
    const haze = track(softTexture([[0, `rgba(${rgb},0)`], [0.55, `rgba(${rgb},0.4)`], [1, `rgba(${rgb},0)`]], 4, 128));
    const ground = place(new Mesh(track(new PlaneGeometry(W * 1.4, 0.34)), track(new MeshBasicMaterial({ map: haze, transparent: true, opacity: 0.45, depthTest: false, depthWrite: false }))));
    ground.position.set(0, BASE + 0.07, 0);
    root.add(ground);
  }

  let aspect = 2;
  function resize() {
    const { clientWidth: w, clientHeight: h } = host;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.left = -aspect;
    camera.right = aspect;
    camera.updateProjectionMatrix();
    // The city lives in the hero's bottom padding: fit the tallest landmark
    // (about 0.9 units) into that band, ground on the canvas bottom edge.
    const band = parseFloat(getComputedStyle(host).paddingBottom) || h * 0.2;
    const k = Math.min(Math.max(((band / h) * 2) / 0.9, 0.25), 0.8);
    root.scale.set(k, k, 1);
    root.position.y = -1 + 1.02 * k;
    build(aspect / k);
  }

  function step(t) {
    const still = reduceMotion.matches;
    const sway = still ? 0 : Math.sin(t * 0.05) * 0.35;
    for (const layer of layers) layer.group.position.x = -sway * layer.parallax;

    for (const mist of mists) {
      if (!still) mist.position.x += mist.userData.speed * 0.016;
      if (mist.position.x > aspect + 1) mist.position.x = -aspect - 1;
    }

    if (flags) {
      const p = flags.geometry.attributes.position.array;
      flags.quads.forEach((q, i) => {
        const wave = still ? 0 : Math.sin(t * 2.2 + q.phase) * 0.006 * flags.sc;
        const w = 0.028 * flags.sc;
        const h = 0.02 * flags.sc;
        const x = q.x;
        const y = q.y;
        p.set([x, y, 0, x + w, y + wave, 0, x, y - h, 0, x + w, y - h + wave, 0], i * 12);
      });
      flags.geometry.attributes.position.needsUpdate = true;
    }

    for (const set of windows) {
      const colors = set.geometry.attributes.color.array;
      if (!still && Math.random() < 0.04) {
        const i = Math.floor(Math.random() * set.state.length);
        set.state[i].on = !set.state[i].on;
      }
      set.state.forEach((s, i) => {
        s.level += ((s.on ? 1 : 0) - s.level) * 0.08;
        const b = 0.15 + 0.85 * s.level;
        colors.set([accent.r * b, accent.g * b, accent.b * b], i * 3);
      });
      set.geometry.attributes.color.needsUpdate = true;
    }

    if (!still) {
      if (!nextMeteor) nextMeteor = t + 2.5;
      if (t > nextMeteor) {
        const free = meteors.find((m) => !m.active);
        if (free) {
          const left = Math.random() < 0.6;
          const angle = left ? Math.PI + 0.35 + Math.random() * 0.3 : -0.35 - Math.random() * 0.3;
          const speed = 1.1 + Math.random() * 0.5;
          free.active = true;
          free.born = t;
          free.life = 0.8 + Math.random() * 0.4;
          free.length = 0.45 + Math.random() * 0.35;
          free.x = (Math.random() * 1.8 - 0.9) * aspect;
          free.y = 0.15 + Math.random() * 0.8;
          free.vx = Math.cos(angle) * speed;
          free.vy = Math.sin(angle) * speed;
          free.mesh.rotation.z = angle;
          free.mesh.scale.set(free.length, 0.014, 1);
          free.mesh.visible = true;
        }
        nextMeteor = t + 3 + Math.random() * 5;
      }
      for (const m of meteors) {
        if (!m.active) continue;
        const age = t - m.born;
        if (age > m.life) {
          m.active = false;
          m.mesh.visible = false;
          continue;
        }
        const p = age / m.life;
        const dirX = Math.cos(m.mesh.rotation.z);
        const dirY = Math.sin(m.mesh.rotation.z);
        m.mesh.position.set(m.x + m.vx * age - dirX * m.length, m.y + m.vy * age - dirY * m.length, 0);
        m.mesh.material.opacity = Math.pow(Math.sin(Math.PI * p), 0.6) * 0.9;
      }
    }

    if (stars) {
      const colors = stars.geometry.attributes.color.array;
      for (let i = 0; i < colors.length / 3; i++) {
        const b = 0.25 + 0.3 * (0.5 + 0.5 * Math.sin(t * (0.6 + (i % 5) * 0.25) + i));
        colors.set([b, b, b * 1.1], i * 3);
      }
      stars.geometry.attributes.color.needsUpdate = true;
    }
    renderer.render(scene, camera);
  }

  let frame = 0;
  let visible = true;
  const loop = (now) => {
    step(now / 1000);
    frame = visible && !document.hidden && !reduceMotion.matches ? requestAnimationFrame(loop) : 0;
  };
  const start = () => {
    if (!frame) frame = requestAnimationFrame(loop);
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });
  observer.observe(host);
  const onVisibility = () => !document.hidden && start();

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
  start();

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    for (const item of disposables) item.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
