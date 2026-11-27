/* =====================================================================
   2.7.1 · Aquarium vivant.
   Les habitants nagent en JavaScript (plus de trajets CSS en boucle) :
   chaque espèce a son comportement (bancs, croiseurs, raies qui planent,
   murènes et rascasses près des rochers, crabes et étoiles sur le fond,
   méduses qui pulsent, hippocampes qui flottent), avec pauses, vitesses
   variées, virages doux, évitement des bords et des autres poissons.
   Nourrir : les granulés coulent, les poissons viennent les manger, puis
   repartent rassasiés. Toucher l'eau dépose une pincée de nourriture,
   glisser le doigt attire les curieux. Réduire les animations : aquarium
   immobile. Courant : réglage d'ambiance (plantes et nage).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, V = AA.views;
  if (!V || !V.aquarium) return;

  const ROLE = { damsel: "school", wrasse: "school", bream: "school", fish: "school", barracuda: "cruise", grouper: "cruise", sunfish: "cruise", turtle: "cruise", ray: "glide", moray: "lurk", conger: "lurk", scorpion: "lurk", octopus: "lurk", star: "crawl", crab: "crawl", nudi: "crawl", sponge: "fixed", jelly: "drift", seahorse: "hover" };
  /* v : vitesse de croisière (px/s pour un bac de 400 px), a : accélération, pause : chance de s'arrêter, band : couche d'eau (0 = surface, 1 = fond). */
  const P = {
    school: { v: 48, a: 110, pause: .04, band: [.1, .68], eat: 1 },
    cruise: { v: 24, a: 34, pause: .18, band: [.2, .7], eat: 1 },
    glide: { v: 20, a: 22, pause: .1, band: [.45, .8], eat: 1 },
    lurk: { v: 15, a: 50, pause: .6, band: [.72, .86], eat: 1, low: 1 },
    crawl: { v: 6, a: 20, pause: .55, band: [.93, .93], eat: 1, low: 1 },
    fixed: { v: 0, a: 0, pause: 1, band: [.93, .93], eat: 0 },
    drift: { v: 8, a: 10, pause: 0, band: [.1, .6], eat: 0 },
    hover: { v: 9, a: 22, pause: .45, band: [.25, .72], eat: 1 }
  };
  const CURIOUS = { fish: 1, wrasse: 1, damsel: 1, grouper: 1, bream: 1 };
  const rnd = (a, b) => a + Math.random() * (b - a);
  let E = null;

  const stop = () => { if (E && E.raf) cancelAnimationFrame(E.raf); E = null; };

  function start(tank) {
    stop();
    const W0 = tank.clientWidth, H0 = tank.clientHeight; if (!W0 || !H0) return;
    const reduced = AA.a11y && AA.a11y.reduced(), cur = !!(AA.S.aquaCfg || {}).current;
    if (!u.$(".aq-caustics", tank)) tank.insertAdjacentHTML("afterbegin", `<div class="aq-caustics" aria-hidden="true"></div>`);
    const layer = document.createElement("div"); layer.className = "aq-food2"; layer.setAttribute("aria-hidden", "true"); tank.appendChild(layer);
    tank.classList.add("live");
    const homes = u.$$(".aq-dec", tank).map(d => parseFloat(d.style.left) / 100 + (parseFloat(d.style.width) || 10) / 200).filter(x => x > 0 && x < 1);
    const groups = {};
    const fish = u.$$(".aq-fish", tank).map((el, i) => {
      const f = C.creatures.find(x => x.id === el.dataset.f) || { shape: "fish" }, role = ROLE[f.shape] || "school", p = P[role];
      el.classList.remove("aq-swim", "aq-float", "aq-bottom", "l", "r"); el.classList.add("aq-live", "r-" + role);
      el.style.left = "0"; el.style.top = "0"; el.style.animation = "none";
      /* 2.9 : rendu premium et profondeur (les plus lointains sont plus petits et plus pâles). */
      if (f.c) el.innerHTML = AA.creature(f.shape, f.c, "premium");
      const z = role === "crawl" || role === "fixed" || role === "lurk" ? rnd(.95, 1.1) : u.pick([rnd(.72, .86), rnd(.9, 1.05), rnd(.95, 1.15)]);
      el.style.zIndex = String(2 + Math.round(z * 10)); el.classList.toggle("far", z < .87);
      const ew = el.offsetWidth || 70, w = ew * z, h = w * 2 / 3, cr = el.firstElementChild;
      const o = { el, cr, f, role, p, w, h, i, z, ew, x: rnd(w, W0 - w), y: H0 * rnd(p.band[0], p.band[1]), vx: 0, vy: 0, dir: Math.random() < .5 ? 1 : -1, tilt: 0,
        tx: 0, ty: 0, next: 0, pause: 0, sat: 0, ate: 0, ph: Math.random() * 6.28, spd: rnd(.75, 1.25), ox: rnd(-40, 40), oy: rnd(-22, 22),
        home: homes.length ? u.pick(homes) : rnd(.15, .85), chomp: 0 };
      if (role === "school") groups[f.shape] = groups[f.shape] || { x: 0, y: 0, next: 0 };
      return o;
    });
    E = { tank, layer, fish, food: [], groups, last: performance.now(), reduced, cur, lure: null, W: W0, H: H0, eaten: 0 };
    /* Pas encore nourris aujourd'hui : ils attendent près de la surface. */
    const hungry = AA.S.fedOn !== u.today();
    fish.forEach(o => { if (hungry && o.role === "school") o.y = E.H * rnd(.12, .3); pickTarget(o, 0, hungry); });
    render();
    if (!reduced) E.raf = requestAnimationFrame(loop);
  }

  function pickTarget(o, now, hungry) {
    const { W, H } = E, p = o.p, m = Math.max(o.w * .6, 24);
    o.next = now + rnd(2500, 7000) / o.spd;
    if (Math.random() < p.pause && now) { o.pause = now + rnd(1200, 4500); }
    switch (o.role) {
      case "school": {
        const g = E.groups[o.f.shape];
        if (now >= g.next) { g.x = rnd(m, W - m); g.y = H * rnd(hungry ? .1 : p.band[0], hungry ? .3 : p.band[1]); g.next = now + rnd(3000, 8000); }
        o.tx = g.x + o.ox; o.ty = g.y + o.oy; o.next = g.next; break;
      }
      case "lurk": {
        const far = Math.random() < .2;
        o.tx = far ? rnd(m, W - m) : u.clamp(o.home * W + rnd(-.12, .12) * W, m, W - m); o.ty = H * rnd(p.band[0], p.band[1]); break;
      }
      case "crawl": o.tx = u.clamp(o.x + rnd(-.25, .25) * W, m, W - m); o.ty = H * p.band[0] - o.h * .35; break;
      case "fixed": o.tx = o.x; o.ty = H * p.band[0] - o.h * .35; break;
      case "hover": o.tx = u.clamp(o.x + rnd(-.12, .12) * W, m, W - m); o.ty = H * rnd(p.band[0], p.band[1]); break;
      case "drift": o.tx = u.clamp(o.x + rnd(-.2, .2) * W, m, W - m); o.ty = H * rnd(p.band[0], p.band[1]); break;
      default: o.tx = rnd(m, W - m); o.ty = H * rnd(p.band[0], p.band[1]);
    }
  }

  function loop(now) {
    if (!E) return;
    if (!document.body.contains(E.tank)) { stop(); return; }
    const dt = Math.min(.05, (now - E.last) / 1000); E.last = now;
    E.W = E.tank.clientWidth || E.W; E.H = E.tank.clientHeight || E.H;
    step(now, dt); render();
    E.raf = requestAnimationFrame(loop);
  }

  function step(now, dt) {
    const { W, H, fish, food } = E, k = W / 400, floorY = H * .93;
    /* Nourriture : elle coule en se balançant, se pose, puis se dissout. */
    for (let i = food.length - 1; i >= 0; i--) {
      const g = food[i];
      if (!g.rest) { g.y += g.vy * dt; g.x += Math.sin(now / 400 + g.ph) * 8 * dt + (E.cur ? 6 * dt : 0); if (g.y >= floorY) { g.y = floorY; g.rest = now; } }
      else if (now - g.rest > 12000) { g.el.remove(); food.splice(i, 1); }
    }
    fish.forEach(o => {
      const p = o.p;
      if (o.role === "fixed") { o.x = u.clamp(o.x, o.w / 2, W - o.w / 2); o.y = floorY - o.h * .35; return; }
      let tx = o.tx, ty = o.ty, sp = p.v * k * o.spd, acc = p.a * k, feeding = false;
      /* Manger : la granule la plus proche, si l'espèce s'en nourrit et n'est pas rassasiée. */
      if (p.eat && food.length && now > o.sat) {
        let best = null, bd = 1e9;
        food.forEach(g => { if (p.low && g.y < H * .66) return; const d = Math.hypot(g.x - o.x, g.y - o.y); if (d < bd) { bd = d; best = g; } });
        if (best) {
          feeding = true; o.pause = 0;
          const mx = o.x + o.dir * o.w * .38, my = o.y;
          tx = best.x - o.dir * o.w * .38; ty = best.y; sp *= o.role === "crawl" ? 2.5 : 1.9; acc *= 2;
          if (Math.hypot(best.x - mx, best.y - my) < Math.max(12, o.w * .22)) {
            best.el.remove(); food.splice(food.indexOf(best), 1); E.eaten++; o.ate++; o.chomp = now + 260;
            if (o.ate >= 3) { o.sat = now + rnd(20000, 30000); o.ate = 0; o.next = 0; }
          }
        }
      }
      /* Le doigt qui glisse attire les curieux. */
      if (!feeding && E.lure && CURIOUS[o.f.shape] && now - E.lure.t < 1500) { tx = E.lure.x - o.dir * o.w * .6; ty = E.lure.y; sp *= 1.3; }
      else if (!feeding && now >= o.next) pickTarget(o, now);
      const paused = !feeding && now < o.pause;
      /* Méduse : contractions vers le haut, puis elle se laisse couler. */
      if (o.role === "drift") {
        o.pt = (o.pt || 0) + dt; if (o.pt > 2.6 / o.spd) { o.pt = 0; o.vy -= 30 * k; o.chomp = now + 400; }
        o.vy += 6 * k * dt; o.vx += Math.sign(tx - o.x) * 2 * k * dt; if (o.y < H * .08) o.vy = Math.abs(o.vy) * .3;
        if (o.y > H * .7) o.vy -= 14 * k * dt;
        o.vx *= 1 - .6 * dt; o.vy *= 1 - .9 * dt;
      } else {
        let dx = tx - o.x, dy = ty - o.y; const d = Math.hypot(dx, dy) || 1;
        const arrive = paused ? 0 : Math.min(1, d / (60 * k));
        let ax = (dx / d * sp * arrive - o.vx), ay = (dy / d * sp * arrive - o.vy) * (o.role === "crawl" ? 0 : 1);
        /* Évitement des autres (même couche d'eau). */
        fish.forEach(q => { if (q === o || q.role === "fixed") return; const ex = o.x - q.x, ey = o.y - q.y, r = (o.w + q.w) * .32, dd = Math.hypot(ex, ey); if (dd < r && dd > .1) { const f = (r - dd) / r * sp * 2.2; ax += ex / dd * f; ay += ey / dd * f * .6; } });
        /* Évitement des bords : on tourne avant le verre. */
        const mx = o.w * .55, top = H * .06, bot = o.role === "crawl" ? H : H * .88;
        if (o.x < mx) ax += (mx - o.x) * 3; if (o.x > W - mx) ax -= (o.x - (W - mx)) * 3;
        if (o.y < top + o.h / 2) ay += (top + o.h / 2 - o.y) * 3; if (o.y > bot - o.h / 2 && o.role !== "crawl") ay -= (o.y - (bot - o.h / 2)) * 3;
        const am = Math.hypot(ax, ay), lim = acc * (paused ? 1.6 : 1);
        if (am > lim) { ax = ax / am * lim; ay = ay / am * lim; }
        o.vx += ax * dt; o.vy += ay * dt;
        if (E.cur && o.role !== "crawl") o.vx += 5 * k * dt;
        const vm = Math.hypot(o.vx, o.vy), cap = sp * 1.25; if (vm > cap) { o.vx = o.vx / vm * cap; o.vy = o.vy / vm * cap; }
        if (o.role === "crawl") { o.vy = 0; o.y = floorY - o.h * .35; }
      }
      o.x += o.vx * dt; o.y += o.vy * dt;
      o.x = u.clamp(o.x, o.w * .3, W - o.w * .3); o.y = u.clamp(o.y, o.h * .4, H - o.h * .3);
      /* Sens de nage (avec une marge pour éviter les demi-tours nerveux), inclinaison douce. */
      if (o.role !== "crawl" && o.role !== "drift") { if (o.vx > 3 * k) o.dir = 1; else if (o.vx < -3 * k) o.dir = -1; }
      else if (o.f.shape !== "crab" && Math.abs(o.vx) > 1.5 * k) o.dir = Math.sign(o.vx);
      const want = o.role === "school" || o.role === "cruise" || o.role === "glide" ? u.clamp(Math.atan2(o.vy, Math.abs(o.vx) + 1) * 57, -18, 18) : 0;
      o.tilt += (want - o.tilt) * Math.min(1, dt * 4);
      o.ph += dt * (1.5 + Math.hypot(o.vx, o.vy) / (12 * k));
    });
  }

  function render() {
    if (!E) return;
    const now = performance.now();
    E.fish.forEach(o => {
      const bob = o.role === "crawl" || o.role === "fixed" || E.reduced ? 0 : Math.sin(o.ph) * (o.role === "hover" ? 3 : 1.6);
      o.el.style.transform = `translate3d(${(o.x - (o.ew || o.w) / 2).toFixed(1)}px,${(o.y - (o.ew || o.w) / 3 + bob).toFixed(1)}px,0)`;
      const sq = o.chomp > now ? (o.role === "drift" ? " scale(1.08,.9)" : " scale(1.1,.94)") : "";
      if (o.cr) o.cr.style.transform = `scale(${(o.z || 1).toFixed(3)})scaleX(${o.dir})rotate(${(o.tilt * o.dir).toFixed(1)}deg)${sq}`;
      /* La queue bat plus vite quand le poisson accélère. */
      const sp = Math.hypot(o.vx, o.vy), wag = sp > 1 ? Math.max(.28, Math.min(1.4, 22 / (sp + 8))) : 1.6;
      if (Math.abs((o.wag || 0) - wag) > .08) { o.wag = wag; o.el.style.setProperty("--wag", wag.toFixed(2) + "s"); }
    });
    E.food.forEach(g => { g.el.style.transform = `translate3d(${g.x.toFixed(1)}px,${g.y.toFixed(1)}px,0)`; });
  }

  /* Déposer de la nourriture : n granulés autour de x (0 à 1), en surface. */
  function drop(n, x, y) {
    if (!E) return;
    const { W, H } = E;
    for (let i = 0; i < n && E.food.length < 40; i++) {
      const el = document.createElement("i"); E.layer.appendChild(el);
      const g = { el, x: u.clamp((x == null ? rnd(.15, .85) : x) * W + rnd(-18, 18), 8, W - 8), y: (y == null ? H * .03 : y) - rnd(0, 20), vy: rnd(22, 34) * W / 400, ph: rnd(0, 6), rest: 0 };
      if (E.reduced) { g.y = H * .93; g.rest = performance.now(); setTimeout(() => { el.remove(); const k = E && E.food.indexOf(g); if (k >= 0) E.food.splice(k, 1); }, 2500); }
      E.food.push(g);
    }
    render();
  }
  AA.aquaLive = { state: () => E && { fish: E.fish.map(o => ({ id: o.f.id, role: o.role, x: o.x, y: o.y, vx: o.vx, vy: o.vy, dir: o.dir, sat: o.sat > performance.now() })), food: E.food.length, eaten: E.eaten, W: E.W, H: E.H, reduced: E.reduced, running: !!E.raf }, drop, stop };

  /* Branchement sur la vue existante. */
  const r0 = V.aquarium.render;
  V.aquarium.render = function (el, args) {
    const out = r0.call(this, el, args);
    const tank = u.$("#tank", el), c = AA.S.aquaCfg || {};
    /* Ambiance : courant, dans l'onglet Apparence. */
    const look = u.$('[data-night="1"]', el);
    if (look) look.closest(".seg").insertAdjacentHTML("afterend", `<p class="eyebrow">${t("aq3.current")}</p><div class="seg"><button data-cur="0" aria-pressed="${!c.current}">${t("aq3.calm")}</button><button data-cur="1" aria-pressed="${!!c.current}">${t("aq3.flow")}</button></div>`);
    u.$$("[data-cur]", el).forEach(b => b.onclick = () => { AA.S.aquaCfg.current = b.dataset.cur === "1"; AA.store.save(); fx.sfx.tap(); AA.router.refresh(); });
    if (tank && c.current) tank.classList.add("current");
    if (!tank || AA.ctx.aqEdit) { stop(); return out; }
    if (tank && !u.$(".aq-hint", el)) tank.insertAdjacentHTML("afterend", `<p class="xs muted aq-hint">${t("aq3.hint")}</p>`);
    requestAnimationFrame(() => start(tank));
    const fb = u.$("#aqfeed", el);
    if (fb) { const f0 = fb.onclick; fb.onclick = e => { if (f0) f0.call(fb, e); drop(14); }; }
    /* Toucher l'eau : une pincée de nourriture ; glisser : les curieux suivent. */
    tank.addEventListener("pointerdown", e => {
      if (!E || e.target.closest("button")) return;
      const R = tank.getBoundingClientRect(); drop(3, (e.clientX - R.left) / R.width, e.clientY - R.top); fx.sfx.tap();
    });
    tank.addEventListener("pointermove", e => { if (!E) return; const R = tank.getBoundingClientRect(); E.lure = { x: e.clientX - R.left, y: e.clientY - R.top, t: performance.now() }; });
    return out;
  };
  addEventListener("hashchange", () => { if (!/^#\/aquarium/.test(location.hash)) stop(); });
})();
