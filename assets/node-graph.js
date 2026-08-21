/*
 * Deterministic node-graph background (Canvas 2D).
 * Same visual system as the Ko-fi cover: teal "platform" nodes,
 * amber "AI" nodes, proximity-based edges, on a dark navy gradient.
 * Renders once — static frame, no animation loop (keeps load fast).
 */
function renderNodeGraph(canvasId, opts) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const W = (opts && opts.width) || canvas.clientWidth || 1500;
  const H = (opts && opts.height) || canvas.clientHeight || 500;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rnd = mulberry32((opts && opts.seed) || 917531);

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0B1120');
  bg.addColorStop(0.55, '#0E1830');
  bg.addColorStop(1, '#0A1120');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(90,140,170,0.07)';
  ctx.lineWidth = 1;
  const gridSize = 46;
  for (let x = 0; x <= W; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  const density = (opts && opts.density) || 0.039; // nodes per 1000px^2, tuned to the 1500x500 reference
  const NODE_COUNT = Math.round((W * H / 1000) * density);
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const isAI = rnd() < 0.24;
    nodes.push({
      x: rnd() * W,
      y: rnd() * H,
      r: isAI ? 3.2 + rnd() * 3.4 : 1.6 + rnd() * 1.8,
      ai: isAI
    });
  }

  const TEAL = [110, 190, 200];
  const AMBER = [224, 169, 74];
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  const MAX_DIST = 165;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        const t = 1 - dist / MAX_DIST;
        const bothAI = a.ai && b.ai;
        const eitherAI = a.ai || b.ai;
        const col = bothAI ? AMBER : (eitherAI ? [170, 180, 150] : TEAL);
        ctx.strokeStyle = rgba(col, 0.05 + t * 0.16);
        ctx.lineWidth = eitherAI ? 1.1 : 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST && rnd() < 0.05) {
        const t = 0.15 + rnd() * 0.7;
        const px = a.x + (b.x - a.x) * t;
        const py = a.y + (b.y - a.y) * t;
        ctx.fillStyle = rgba(AMBER, 0.85);
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (const n of nodes) {
    const col = n.ai ? AMBER : TEAL;
    ctx.save();
    ctx.shadowColor = rgba(col, n.ai ? 0.9 : 0.55);
    ctx.shadowBlur = n.ai ? 14 : 6;
    ctx.fillStyle = rgba(col, n.ai ? 0.95 : 0.8);
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (n.ai) {
      ctx.strokeStyle = rgba(AMBER, 0.35);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, W * 0.62);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(6,9,16,0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);
}
