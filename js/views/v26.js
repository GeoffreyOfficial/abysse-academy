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

  addEventListener("hashchange", () => { const v = document.querySelector(".verdict"); if (v) v.remove(); setTimeout(() => { if (fx.busy && fx.busy()) document.querySelectorAll(".toast").forEach(x => { x.classList.add("passive", "toast-top"); x.onclick = null; }); }, 120); });

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

/* =====================================================================
   2.6.1 · « De quoi parle la question ? » : avant la correction, on
   explique la question elle-même (thème, notion, sigles développés,
   termes techniques). Repris dans « Explique-moi ».
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, Q = AA.quiz, T = AA.tutor;
  if (!Q || !C) return;
  const esc = u.esc, norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  let RX = null;
  const rx = () => RX || (RX = (C.sigles || []).map(s => [s, new RegExp(s[1])]));
  /* Sigles et termes du glossaire présents dans la question (puis dans la bonne réponse). */
  Q.contextItems = q => {
    if (!q || !q.q) return [];
    const main = String(q.q), ans = Array.isArray(q.c) && q.c[q.a] != null && !q.steps ? String(q.c[q.a]) : "";
    const both = main + " " + ans + (q.steps ? " " + q.steps.flat().join(" ") : "");
    const out = [], seen = new Set();
    rx().forEach(([s, re]) => { if (re.test(both) && !seen.has(s[0])) { seen.add(s[0]); out.push({ k: s[0], f: s[2], d: s[3], main: re.test(main) }); } });
    if (out.some(x => /^Pp./.test(x.k))) { const i = out.findIndex(x => x.k === "Pp"); if (i >= 0) out.splice(i, 1); }
    out.sort((a, b) => b.main - a.main);
    const nm = " " + norm(main).replace(/[^a-z0-9]+/g, " ") + " ";
    const gl = (C.glossary || []).filter(g => { if (seen.has(g.t)) return false; return [g.t].concat(g.alt || []).some(w => { const n = norm(w).replace(/[^a-z0-9]+/g, " ").trim(); return n.length > 3 && nm.includes(" " + n + " "); }); });
    gl.slice(0, 2).forEach(g => out.push({ k: g.t, f: "", d: g.d }));
    return out.slice(0, 4);
  };
  Q.context = (q, open) => {
    if (!q || !q.m || !C.byId[q.m]) return "";
    const items = Q.contextItems(q);
    let notion = ""; try { const nid = T && T.notionOf(q), n = nid && T.notion(nid); if (n) notion = n.t; } catch (e) { /* tuteur absent */ }
    const theme = C.byId[q.m].title;
    return `<details class="ctxq" ${open || items.length ? "open" : ""}><summary>${AA.icon("info")} ${t("cq.title")}</summary>
      <p class="small ctx-th">${t("cq.theme", { t: esc(theme) })}${notion && norm(notion) !== norm(theme) ? " · " + t("cq.notion", { n: esc(notion) }) : ""}</p>
      ${items.length ? `<dl class="ctx-dl">${items.map(x => `<div><dt>${esc(x.k)}</dt><dd>${x.f ? `<b>${esc(x.f)}</b>. ` : ""}${esc(x.d)}</dd></div>`).join("")}</dl>` : ""}</details>`;
  };
})();

/* =====================================================================
   2.6.1 · Un seul point d'entrée par parcours : si un test de
   positionnement est en cours, on ne propose plus de le « Commencer »,
   seulement de le reprendre (ou de l'abandonner depuis l'accueil).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, V = AA.views;
  const live = () => { try { const o = AA.run && AA.run.get(); return o && o.answers && o.items && o.answers.length < o.items.length ? o : null; } catch (e) { return null; } };
  const placeRun = wid => { const o = live(); return o && o.mode === "place" && (!wid || o.world === wid) ? o : null; };
  AA.run && (AA.run.live = live);
  if (AA.path && AA.path.startPlacement) {
    const sp0 = AA.path.startPlacement;
    AA.path.startPlacement = wid => (placeRun(wid) && AA.run.resume ? AA.run.resume() : sp0(wid));
  }
  if (V.home) {
    const h0 = V.home.render;
    V.home.render = function (el, args) {
      const r = h0.call(this, el, args);
      try { if (placeRun()) u.$$(".place-card", el).forEach(c => c.remove()); } catch (e) { /* accueil modifié */ }
      return r;
    };
  }
  if (V.parcours) {
    const p0 = V.parcours.render;
    V.parcours.render = function (el, args) {
      const r = p0.call(this, el, args);
      try {
        u.$$("[data-place]", el).forEach(b => { const o = placeRun(b.dataset.place); if (o) b.innerHTML = `${AA.icon("play")} ${t("run.go")} (${o.answers.length}/${o.items.length})`; });
      } catch (e) { /* parcours modifié */ }
      return r;
    };
  }
})();

/* =====================================================================
   2.6.1 · Accueil sans répétitions : une seule entrée par fonction.
   - « Ta prochaine étape » : l'action prioritaire du tuteur.
   - « Ensuite » : 3 autres actions au plus, sans séance ni diagnostic
     (et sans lacune déjà listée dans « Tes lacunes »).
   - Un seul bloc « Ton tuteur » : séance adaptée + diagnostic.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, T = AA.tutor, V = AA.views;
  if (!T || !T.actions || !V.home) return;
  const act0 = T.actions;
  T.actions = () => {
    const a = act0().filter(x => x.k !== "diag");
    if (!a.length) return a;
    const head = a[0], rest = a.slice(1).filter(x => x.k !== "session" && x.k !== "gap");
    return [head].concat(rest);
  };
  const diagOk = () => Object.keys((AA.S && AA.S.nstat) || {}).length >= 6;
  const h0 = V.home.render;
  V.home.render = function (el, args) {
    const r = h0.call(this, el, args);
    try {
      const today = u.$(".tu-today", el), a0 = (T._acts || [])[0], diag = diagOk();
      const session = !!today && !(a0 && a0.k === "session");
      if (today && !session && !diag) { today.remove(); return r; }
      if (!today && !diag) return r;
      const html = `<section class="card tu-coach"><p class="eyebrow">${AA.icon("compass")} ${t("hm.coachT")}</p>
        <p class="small muted">${t(session ? "hm.coachS" : "hm.coachDiag")}</p>
        <div class="row tu-coach-btns">${session ? `<button class="btn sm" data-tusession>${AA.icon("play")} ${t("hm.coachGo")}</button>` : ""}${diag ? `<a class="btn ghost sm" href="#/diagnostic">${AA.icon("chart")} ${t("hm.coachDg")}</a>` : ""}</div></section>`;
      if (today) today.outerHTML = html;
      else { const main = u.$(".col-main", el); if (main) main.insertAdjacentHTML("beforeend", html); }
    } catch (e) { /* accueil modifié */ }
    return r;
  };
})();
