/* =====================================================================
   Abysse Academy 2.6 · ambiance plongée
   - Verdict visuel toujours affiché en même temps que le son (fx.verdict).
   - Sons « sous l'eau » : bulles, sonar, remontée.
   - Combos = descente (−3 m par bonne réponse) avec paliers nommés,
     « +XP » en bulle, flamme des jours d'affilée en immersion.
   - Réglage : Complète / Discrète / Coupée (profil.amb). « Réduire les
     animations » coupe tout ce qui bouge, jamais le verdict.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, fx = AA.fx, V = AA.views;
  if (!fx) return;
  const P = () => (AA.S && AA.S.profile) || {};
  const level = () => (P().amb === "off" ? 0 : P().amb === "calm" ? 1 : 2);
  const RM = () => !!(AA.a11y && AA.a11y.reduced());
  const full = () => level() === 2;
  const moving = () => full() && !RM();
  const dive = (fx.dive = { level });

  /* ---------- Sons : glissandos synthétisés (aucun fichier) ---------- */
  function glide(seq) {
    const ac = fx.audio && fx.audio(); if (!ac) return;
    try {
      const t0 = ac.currentTime;
      seq.forEach(([f0, f1, d, st, type, vol]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = type || "sine";
        o.frequency.setValueAtTime(f0, t0 + st); o.frequency.exponentialRampToValueAtTime(f1, t0 + st + d);
        g.gain.setValueAtTime(0.0001, t0 + st);
        g.gain.exponentialRampToValueAtTime(vol || 0.14, t0 + st + Math.min(.03, d / 3));
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + st + d);
        o.connect(g).connect(ac.destination); o.start(t0 + st); o.stop(t0 + st + d + .05);
      });
    } catch (e) { /* audio indisponible */ }
  }
  const base = Object.assign({}, fx.sfx);
  const SND = {
    /* Deux bulles qui montent, puis un petit carillon. */
    ok: () => glide([[340, 760, .09, 0, "sine", .13], [480, 1080, .08, .08, "sine", .11], [1320, 1320, .22, .15, "sine", .05]]),
    /* Choc sourd et lointain, comme un sonar qui ne trouve rien. */
    bad: () => glide([[240, 110, .32, 0, "sine", .16], [180, 90, .3, .1, "triangle", .08]]),
    /* Remontée : un chapelet de bulles. */
    up: () => glide([[300, 600, .08, 0], [400, 800, .08, .08], [520, 1040, .08, .16], [660, 1320, .1, .24], [880, 1760, .28, .34, "sine", .1]]),
    ping: () => glide([[1480, 1460, .9, 0, "sine", .09], [1480, 1460, .6, .38, "sine", .035]])
  };
  ["ok", "bad", "up"].forEach(k => { fx.sfx[k] = () => (full() ? SND[k]() : base[k]()); });
  fx.sfx.ping = () => (full() ? SND.ping() : base.badge());

  /* ---------- Verdict : toujours visible, même quand on passe tout de suite à la suite ---------- */
  fx.verdict = (ok, dk) => {
    const old = document.querySelector(".verdict"); if (old) old.remove();
    const d = document.createElement("div");
    d.className = "verdict " + (dk ? "dk" : ok ? "ok" : "bad"); d.setAttribute("role", "status");
    d.innerHTML = `${AA.icon(dk ? "doubt" : ok ? "check" : "x")}<span>${t(dk ? "dv.dk" : ok ? "dv.ok" : "dv.bad")}</span>`;
    document.body.appendChild(d); setTimeout(() => d.remove(), 1200);
  };

  addEventListener("hashchange", () => { const v = document.querySelector(".verdict"); if (v) v.remove(); });

  /* ---------- Bonne réponse, erreur ---------- */
  dive.ok = btn => { if (moving()) fx.burstAt(btn, 14, "rgba(150,235,255,.9)"); };
  dive.bad = () => { if (!moving()) return; setTimeout(() => { const qc = u.$("#qc"); if (qc) { qc.classList.remove("silt"); void qc.offsetWidth; qc.classList.add("silt"); } }, 0); };

  /* ---------- Combos : on descend de 3 m par bonne réponse ---------- */
  const STEPS = [[3, "bulles"], [5, "thermo"], [8, "sonar"], [10, "bleu"], [15, "tombant"], [20, "abysses"], [30, "fosse"]];
  dive.depth = n => n * 3;
  dive.comboLabel = n => (full() ? t("dv.depth", { m: dive.depth(n) }) : t("quiz.combo"));
  const ring = () => {
    if (!moving()) return;
    const qc = u.$("#qc"), r = qc ? qc.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const d = document.createElement("div"); d.className = "sonar-ring";
    d.style.left = (r.left + r.width / 2) + "px"; d.style.top = (r.top + Math.min(r.height / 2, 160)) + "px";
    document.body.appendChild(d); setTimeout(() => d.remove(), 1100);
  };
  dive.combo = c => {
    const n = c.combo;
    if (!full()) { if (n % 5 === 0) fx.toast(t("toast.combo", { n }), t("toast.comboS"), "bolt"); return; }
    const st = STEPS.find(s => s[0] === n) || (n > 30 && n % 10 === 0 ? [n, "legende"] : null);
    if (!st) return;
    setTimeout(() => { fx.sfx.ping(); ring(); }, 120);
    fx.toast(t("dv.c." + st[1] + ".t", { n }), t("dv.comboS", { n, m: dive.depth(n), s: t("dv.c." + st[1] + ".s") }), "dive");
  };

  /* ---------- « +XP » en bulle ---------- */
  const fl0 = fx.float;
  fx.float = (txt, el, color) => {
    fl0(txt, el, color);
    if (!full() || color) return;
    const f = document.body.lastElementChild; if (f && f.classList.contains("float")) f.classList.add("bub");
  };

  /* ---------- Jours d'affilée : toujours en immersion ; passage de niveau : remontée ---------- */
  const toast0 = fx.toast;
  fx.toast = (title, sub, icon, onClick) => {
    if (full() && icon === "flame") {
      const n = +((String(title).match(/\d+/) || [])[0] || 0);
      if (n) sub = t("dv.streak", { n }) + " " + (sub || "");
      setTimeout(() => { fx.sfx.ping(); if (moving()) fx.burst(innerWidth / 2, innerHeight - 90, 26, "rgba(255,190,110,.85)"); }, 200);
    }
    return toast0(title, sub, icon, onClick);
  };
  const up0 = fx.sfx.up;
  fx.sfx.up = () => { up0(); if (moving()) fx.burst(innerWidth / 2, innerHeight - 60, 40, "rgba(150,235,255,.9)"); };

  /* ---------- Réglage dans Paramètres ---------- */
  if (V.settings) {
    const r0 = V.settings.render;
    V.settings.render = function (el, args) {
      const out = r0.call(this, el, args);
      try {
        const snd = u.$("#snd", el), row = snd && snd.closest(".setting"); if (!row) return out;
        const cur = P().amb || "full";
        row.insertAdjacentHTML("beforebegin", `<div class="field dv-set" style="margin-top:var(--sp-3)"><label>${t("dv.set")}</label>
          <div class="seg">${["full", "calm", "off"].map(k => `<button data-amb="${k}" aria-pressed="${cur === k}">${t("dv.set." + k)}</button>`).join("")}</div>
          <p class="small muted" style="margin:6px 0 0">${t("dv.setS")}</p></div>`);
        u.$$("[data-amb]", el).forEach(b => b.onclick = () => {
          P().amb = b.dataset.amb; AA.store.save();
          u.$$("[data-amb]", el).forEach(x => x.setAttribute("aria-pressed", x === b));
          fx.sfx.ok(); if (b.dataset.amb === "full" && !RM()) fx.burstAt(b, 16, "rgba(150,235,255,.9)");
        });
      } catch (e) { /* écran des réglages modifié */ }
      return out;
    };
  }
})();
