// Motion for the app landing pages. Same behaviours as home.js (progress bar, solid top bar, reveal on
// scroll, the hero dot field and pulse line), without the pulse data, so these pages stay light.
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const browser = typeof window.IntersectionObserver === "function";
  const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const hero = $(".hero");
  const topbar = $(".topbar");
  const progress = $("[data-progress]");

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    topbar.classList.toggle("solid", y > hero.offsetHeight - 80);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if (!browser) { document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest?.(".spot");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  const canvas = $("[data-hero-canvas]");
  const ctx = canvas.getContext?.("2d");
  if (!ctx) return;
  let w = 0, h = 0, dpr = 1, mouse = { x: -999, y: -999 }, visible = true, frame = 0;
  let dot = "184, 192, 212", trace = "232, 163, 61";
  // The logo polyline as offsets from its centre and baseline (same motion as the homepage).
  const BLIP = [[-40, 0], [-22, -22], [0, 0], [22, -28], [40, 0]];
  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const style = getComputedStyle(canvas);
    dot = style.getPropertyValue("--field-dot").trim() || dot;
    trace = style.getPropertyValue("--field-trace").trim() || trace;
  };
  const draw = (time) => {
    ctx.clearRect(0, 0, w, h);
    const gap = 32;
    for (let x = gap / 2; x < w; x += gap) {
      for (let y = gap / 2; y < h; y += gap) {
        const glow = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 180);
        ctx.fillStyle = `rgba(${dot}, ${0.08 + glow * 0.55})`;
        ctx.fillRect(x - 0.75 - glow, y - 0.75 - glow, 1.5 + glow * 2, 1.5 + glow * 2);
      }
    }
    // One pulse crosses the bottom edge of the hero every 9 seconds.
    const baseline = h - 2;
    const span = w + 240;
    const cx = calm ? w * 0.66 : ((time * span) / 9000) % span - 120;
    ctx.strokeStyle = `rgba(${trace}, 0.9)`;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, baseline);
    for (const [dx, dy] of BLIP) ctx.lineTo(cx + dx, baseline + dy);
    ctx.lineTo(w, baseline);
    ctx.stroke();
    if (!calm && visible) frame = requestAnimationFrame(draw);
  };
  size();
  window.addEventListener("resize", () => { size(); if (calm) draw(0); });
  hero.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; if (calm) draw(0); }, { passive: true });
  hero.addEventListener("pointerleave", () => { mouse = { x: -999, y: -999 }; });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame);
    if (visible) frame = requestAnimationFrame(draw);
  }).observe(hero);
  if (calm) draw(0);
})();
