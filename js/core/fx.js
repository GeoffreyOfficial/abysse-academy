/* =====================================================================
   Abysse Academy · effets : son, vibrations, bulles, toasts
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const fx = (AA.fx = {});
  const RM = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Son (synthétisé, aucun fichier) ---------- */
  let ac = null;
  function tone(seq) {
    if (!AA.S.profile.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = ac.currentTime;
      seq.forEach(([f, d, st, type, vol]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = type || "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + st);
        g.gain.exponentialRampToValueAtTime(vol || 0.16, t0 + st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + st + d);
        o.connect(g).connect(ac.destination); o.start(t0 + st); o.stop(t0 + st + d + 0.05);
      });
    } catch (e) {}
  }
  fx.sfx = {
    ok: () => tone([[660, .12, 0], [990, .18, .09]]),
    bad: () => tone([[200, .26, 0, "triangle"], [150, .3, .12, "triangle"]]),
    up: () => tone([[523, .12, 0], [659, .12, .1], [784, .12, .2], [1046, .32, .3]]),
    badge: () => tone([[880, .1, 0], [1175, .1, .08], [1568, .26, .16]]),
    tick: () => tone([[1200, .04, 0, "square", .06]]),
    flip: () => tone([[420, .06, 0, "sine", .08], [620, .08, .05, "sine", .08]]),
    tap: () => tone([[520, .05, 0, "sine", .05]]),
    alarm: () => tone([[880, .12, 0, "square", .08], [880, .12, .2, "square", .08]])
  };

  /* ---------- Vibrations ---------- */
  fx.buzz = pattern => { if (AA.S.profile.haptics && navigator.vibrate) try { navigator.vibrate(pattern); } catch (e) {} };

  /* ---------- Bulles d'ambiance et éclats ---------- */
  let cv, cx, B = [], running = false;
  fx.initBubbles = () => {
    cv = document.getElementById("bubbles"); if (!cv) return;
    cx = cv.getContext("2d");
    const size = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; };
    size(); addEventListener("resize", size);
    if (!RM()) for (let i = 0; i < 14; i++) B.push(amb(true));
    if (!running) { running = true; requestAnimationFrame(frame); }
  };
  const amb = init => ({ x: Math.random(), y: init ? Math.random() : 1.05, r: 1.5 + Math.random() * 4, s: .0006 + Math.random() * .0012, w: Math.random() * 6, a: .5, amb: true });
  function color() { return getComputedStyle(document.documentElement).getPropertyValue("--bubble").trim() || "rgba(191,243,247,.5)"; }
  let col = null, colT = 0;
  function frame(t) {
    if (!cx) return;
    if (t - colT > 1000) { col = color(); colT = t; }
    const W = cv.width, H = cv.height, d = devicePixelRatio;
    cx.clearRect(0, 0, W, H);
    B.forEach(b => {
      b.y -= b.s; b.x += Math.sin(t / 900 + b.w) * .0004;
      if (!b.amb) b.life -= 1;
      cx.beginPath(); cx.arc(b.x * W, b.y * H, b.r * d, 0, 7);
      cx.strokeStyle = b.c || col; cx.globalAlpha = b.amb ? .55 : Math.max(0, b.life / 60); cx.lineWidth = 1.2 * d; cx.stroke();
    });
    cx.globalAlpha = 1;
    B = B.filter(b => b.amb ? b.y > -0.05 : b.life > 0 && b.y > -0.05);
    while (!RM() && B.filter(b => b.amb).length < 14) B.push(amb(false));
    requestAnimationFrame(frame);
  }
  fx.burst = (x, y, n, c) => {
    if (RM() || !cv) return;
    for (let i = 0; i < n; i++) B.push({ x: (x + (Math.random() - .5) * 120) / innerWidth, y: (y + (Math.random() - .5) * 40) / innerHeight, r: 2 + Math.random() * 7, s: .003 + Math.random() * .006, w: Math.random() * 6, life: 40 + Math.random() * 40, c });
  };
  fx.burstAt = (el, n, c) => { const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 }; fx.burst(r.left + r.width / 2, r.top, n || 20, c); };
  fx.float = (txt, el, cssColor) => {
    const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 };
    const f = document.createElement("div"); f.className = "float"; f.textContent = txt;
    f.style.left = (r.left + r.width / 2 - 30) + "px"; f.style.top = (r.top - 10) + "px";
    if (cssColor) f.style.color = cssColor;
    document.body.appendChild(f); setTimeout(() => f.remove(), 1000);
  };

  /* ---------- Toasts (file d'attente) ---------- */
  const q = []; let busy = false;
  fx.toast = (title, sub, icon, onClick) => { q.push({ title, sub, icon, onClick }); if (!busy) next(); };
  function next() {
    const t = q.shift(); if (!t) { busy = false; return; }
    busy = true;
    const d = document.createElement("div");
    d.className = "toast"; d.setAttribute("role", "status");
    d.innerHTML = `<span class="medal">${AA.icon(t.icon || "star")}</span><div><b>${u.esc(t.title)}</b><span>${u.esc(t.sub || "")}</span></div>`;
    if (t.onClick) { d.style.cursor = "pointer"; d.onclick = () => { t.onClick(); d.remove(); }; }
    document.body.appendChild(d);
    setTimeout(() => { d.style.transition = "opacity .3s"; d.style.opacity = "0"; setTimeout(() => { d.remove(); next(); }, 300); }, t.onClick ? 7000 : 2600);
  }
})();
