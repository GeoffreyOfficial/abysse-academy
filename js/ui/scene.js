/* =====================================================================
   Abysse Academy · fond marin vivant
   Le fond change avec la profondeur de l'écran en cours :
   - 0 à 10 m : rayons de soleil, bancs de petits poissons colorés ;
   - 10 à 30 m : lumière bleue, gros poissons isolés, neige marine ;
   - au-delà : pénombre, rares silhouettes, points lumineux.
   AA.scene.set(mètres) fixe la profondeur ; elle change en douceur.
   Les vues la donnent avec depth: nombre | (args) => nombre.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const sc = (AA.scene = { depth: 0, target: 0 });
  let cv, cx, wrap, rays, tint, W = 0, H = 0, D = 1, running = false, last = 0;
  let bubbles = [], fish = [], snow = [], glow = [], pal = null, palT = 0;

  const reduced = () => AA.a11y ? AA.a11y.reduced() : matchMedia("(prefers-reduced-motion: reduce)").matches;
  const enabled = () => AA.S.profile.scene !== false;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const scale = () => u.clamp(W / 600, 1, 2.4); /* poissons plus grands sur grand écran */

  /* Profondeur d'un module : « −25 m » → 25 ; sinon valeur du monde. */
  const WORLD_DEPTH = { n2: 12, rifap: 6, e1: 4 };
  sc.depthOf = m => {
    if (!m) return 6;
    const n = String(m.depth || "").replace("−", "-").match(/-?\d+/);
    return n ? Math.abs(+n[0]) : (WORLD_DEPTH[m.world] || 6);
  };

  sc.init = () => {
    cv = document.getElementById("bubbles"); if (!cv) return;
    cx = cv.getContext("2d");
    if (!document.getElementById("scene")) {
      wrap = document.createElement("div"); wrap.id = "scene"; wrap.setAttribute("aria-hidden", "true");
      wrap.innerHTML = `<div class="rays"></div><div class="tint"></div><div class="floor"></div>`;
      cv.parentNode.insertBefore(wrap, cv);
    }
    wrap = document.getElementById("scene"); rays = u.$(".rays", wrap); tint = u.$(".tint", wrap);
    const size = () => { D = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * D; cv.height = H * D; };
    size(); addEventListener("resize", size);
    for (let i = 0; i < 14; i++) bubbles.push(bubble(true));
    sc.apply();
    document.addEventListener("visibilitychange", () => { if (!document.hidden) loop(); });
    loop();
  };
  const loop = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };

  sc.set = m => {
    sc.target = u.clamp(+m || 0, 0, 60);
    if (reduced() || !running) sc.depth = sc.target;
    sc.apply();
  };
  /* Teinte, rayons, couleur du fond : variables CSS lues par app.css. */
  sc.apply = () => {
    if (!wrap) return;
    const on = enabled(), d = sc.depth, k = d / 60;
    wrap.hidden = !on;
    document.documentElement.style.setProperty("--depth", k.toFixed(3));
    if (rays) rays.style.opacity = on ? Math.max(0, 1 - d / 22).toFixed(3) : 0;
    if (tint) tint.style.opacity = on ? Math.min(1, k * 1.15).toFixed(3) : 0;
  };

  function palette() {
    const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
    return { bubble: g("--bubble") || "rgba(191,243,247,.5)", fish: [g("--primary"), g("--accent"), g("--gold"), g("--world-e2")], ink: g("--ink"), dark: (AA.THEMES.find(t => t.id === AA.S.profile.theme) || {}).dark !== false };
  }

  /* ---------- Habitants ---------- */
  const bubble = init => ({ x: Math.random(), y: init ? Math.random() : 1.05, r: 1.5 + Math.random() * 4, s: .0006 + Math.random() * .0012, w: Math.random() * 6, amb: true });
  function spawnSchool() {
    const dir = Math.random() < .5 ? 1 : -1, n = 5 + Math.floor(Math.random() * 6), y = rnd(.15, .8), size = rnd(5, 8) * scale(), col = Math.floor(Math.random() * 3), sp = rnd(.03, .055);
    for (let i = 0; i < n; i++) fish.push({ x: dir > 0 ? -.05 - Math.random() * .12 : 1.05 + Math.random() * .12, y: y + rnd(-.05, .05), dir, size: size * rnd(.8, 1.15), col, sp: sp * rnd(.95, 1.05), ph: Math.random() * 6, kind: "small" });
  }
  function spawnBig() {
    const dir = Math.random() < .5 ? 1 : -1;
    fish.push({ x: dir > 0 ? -.15 : 1.15, y: rnd(.2, .75), dir, size: rnd(18, 30) * scale(), col: 3, sp: rnd(.012, .022), ph: Math.random() * 6, kind: sc.depth > 30 ? "deep" : "big" });
  }
  const want = () => { const d = sc.depth; return { schools: d < 12 ? 2 : d < 28 ? 1 : 0, big: d < 8 ? 0 : d < 35 ? 1 : 1, snow: d < 12 ? 0 : Math.round(Math.min(60, (d - 12) * 1.6)), glow: d < 28 ? 0 : Math.round(Math.min(14, (d - 28) / 2)) }; };

  function drawFish(f, t, alpha) {
    const x = f.x * W * D, y = (f.y * H + Math.sin(t / 700 + f.ph) * 4) * D, s = f.size * D, wag = Math.sin(t / (f.kind === "small" ? 90 : 260) + f.ph) * .35;
    cx.save(); cx.translate(x, y); cx.scale(f.dir, 1); cx.globalAlpha = alpha;
    cx.fillStyle = f.kind === "deep" ? pal.ink : pal.fish[f.col] || pal.fish[0];
    cx.beginPath(); cx.moveTo(s * 1.2, 0);
    cx.quadraticCurveTo(s * .3, -s * .62, -s * .8, 0); cx.quadraticCurveTo(s * .3, s * .62, s * 1.2, 0); cx.fill();
    cx.beginPath(); cx.moveTo(-s * .7, 0); cx.lineTo(-s * 1.35, -s * (.45 + wag * .3)); cx.lineTo(-s * 1.2, 0); cx.lineTo(-s * 1.35, s * (.45 - wag * .3)); cx.closePath(); cx.fill();
    if (f.kind === "deep") { cx.globalAlpha = alpha * 1.6; cx.fillStyle = pal.fish[0]; cx.beginPath(); cx.arc(s * .9, -s * .1, s * .08, 0, 7); cx.fill(); }
    cx.restore();
  }

  function frame(t) {
    if (!cx) { running = false; return; }
    if (document.hidden) { running = false; return; }
    const dt = Math.min(64, t - last); last = t;
    if (!pal || t - palT > 1500) { pal = palette(); palT = t; }
    if (Math.abs(sc.depth - sc.target) > .05) { sc.depth += (sc.target - sc.depth) * Math.min(1, dt / 600); sc.apply(); }
    const RM = reduced(), on = enabled();
    cx.clearRect(0, 0, W * D, H * D);
    if (on && !RM) {
      const w = want();
      if (fish.filter(f => f.kind === "small").length < w.schools * 5 && Math.random() < .004) spawnSchool();
      if (fish.filter(f => f.kind !== "small").length < w.big && Math.random() < .002) spawnBig();
      while (snow.length < w.snow) snow.push({ x: Math.random(), y: Math.random(), r: rnd(.6, 1.6), s: rnd(.00005, .00018), w: Math.random() * 6 });
      snow.length = Math.min(snow.length, w.snow);
      while (glow.length < w.glow) glow.push({ x: Math.random(), y: rnd(.1, .95), r: rnd(1, 2.4), ph: Math.random() * 6, c: Math.floor(Math.random() * 4) });
      glow.length = Math.min(glow.length, w.glow);
      /* neige marine */
      cx.fillStyle = pal.bubble; cx.globalAlpha = .45;
      snow.forEach(p => { p.y += p.s * dt; p.x += Math.sin(t / 2000 + p.w) * .00004 * dt; if (p.y > 1.02) { p.y = -.02; p.x = Math.random(); } cx.beginPath(); cx.arc(p.x * W * D, p.y * H * D, p.r * D, 0, 7); cx.fill(); });
      /* lueurs des grands fonds */
      glow.forEach(g => { const a = (Math.sin(t / 900 + g.ph) + 1) / 2; cx.globalAlpha = .15 + a * .6; cx.fillStyle = pal.fish[g.c]; cx.beginPath(); cx.arc(g.x * W * D, g.y * H * D, g.r * D * (1 + a), 0, 7); cx.fill(); });
      /* poissons : plus discrets en profondeur et sur fond clair */
      const fa = (pal.dark ? .32 : .22) * (sc.depth > 30 ? .7 : 1);
      fish.forEach(f => { f.x += f.dir * f.sp * dt / 1000; drawFish(f, t, f.kind === "deep" ? .18 : fa); });
      fish = fish.filter(f => f.x > -.25 && f.x < 1.25);
    }
    /* bulles (ambiance + éclats de réussite) */
    cx.lineWidth = 1.2 * D;
    bubbles.forEach(b => {
      if (RM && b.amb) return;
      b.y -= b.s * dt / 16; b.x += Math.sin(t / 900 + b.w) * .0004;
      if (!b.amb) b.life -= dt / 16;
      cx.beginPath(); cx.arc(b.x * W * D, b.y * H * D, b.r * D, 0, 7);
      cx.strokeStyle = b.c || pal.bubble; cx.globalAlpha = b.amb ? .55 : Math.max(0, b.life / 60); cx.stroke();
    });
    cx.globalAlpha = 1;
    bubbles = bubbles.filter(b => b.amb ? b.y > -.05 : b.life > 0 && b.y > -.05);
    const nAmb = on ? 10 + Math.round(sc.depth / 6) : 8;
    while (!RM && bubbles.filter(b => b.amb).length < nAmb) bubbles.push(bubble(false));
    if (RM && !bubbles.some(b => !b.amb) && Math.abs(sc.depth - sc.target) <= .05) { running = false; return; }
    requestAnimationFrame(frame);
  }

  sc.burst = (x, y, n, c) => {
    if (reduced() || !cv) return;
    for (let i = 0; i < n; i++) bubbles.push({ x: (x + (Math.random() - .5) * 120) / innerWidth, y: (y + (Math.random() - .5) * 40) / innerHeight, r: 2 + Math.random() * 7, s: .003 + Math.random() * .006, w: Math.random() * 6, life: 40 + Math.random() * 40, c });
    loop();
  };
})();
