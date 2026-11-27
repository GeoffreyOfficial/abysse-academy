/* =====================================================================
   Abysse Academy · effets : son, vibrations, bulles, toasts
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u;
  const fx = (AA.fx = {});
  
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
  /* Accès au synthé pour les sons d'ambiance (js/views/v26.js). */
  fx.audio = () => { if (!AA.S.profile.sound) return null; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); return ac; } catch (e) { return null; } };
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
  fx.buzz = pattern => { if (AA.S.profile.haptics && navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) try { navigator.vibrate(pattern); } catch (e) {} };

  /* ---------- Bulles et éclats : dessinés par le fond marin (js/ui/scene.js) ---------- */
  fx.initBubbles = () => AA.scene && AA.scene.init();
  fx.burst = (x, y, n, c) => AA.scene && AA.scene.burst(x, y, n, c);
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
  const ACT = "#qc,#btNext,.bt-c,#btGo,.st-choice,#stnext,.opt";
  fx.busy = () => !!document.querySelector(ACT);
  fx.toast = (title, sub, icon, onClick) => { q.push({ title, sub, icon, onClick }); if (!busy) next(); };
  function next() {
    const t = q.shift(); if (!t) { busy = false; return; }
    busy = true;
    const d = document.createElement("div");
    /* 2.6.1 : pendant un quiz, un combat ou une aventure, les toasts s'affichent
       en haut et ne captent jamais un clic (on doit pouvoir répondre et continuer). */
    const onTask = fx.busy();
    d.className = "toast" + (onTask || !t.onClick ? " passive" : "") + (onTask ? " toast-top" : ""); d.setAttribute("role", "status");
    if (onTask) t.onClick = null;
    d.innerHTML = `<span class="medal">${AA.icon(t.icon || "star")}</span><div><b>${u.esc(t.title)}</b><span>${u.esc(t.sub || "")}</span></div>`;
    if (t.onClick) { d.style.cursor = "pointer"; d.onclick = () => { t.onClick(); d.remove(); }; }
    document.body.appendChild(d);
    setTimeout(() => { d.style.transition = "opacity .3s"; d.style.opacity = "0"; setTimeout(() => { d.remove(); next(); }, 300); }, t.onClick ? 7000 : 2600);
  }
})();
