/* =====================================================================
   Abysse Academy 2.2 · espace Jeux et visite guidée
   - Aquarium, aventures, quêtes du jour, défis de la semaine et événements
     reviennent, rangés dans un seul espace « Jeux » (Entraîner › Jeux),
     chacun avec une phrase qui dit à quoi il sert. L'accueil reste calme :
     une seule petite carte résume les jeux du jour.
   - Visite guidée à la première utilisation : chaque menu, à quoi il sert,
     pourquoi il existe. Étape suivante / précédente, saut direct à une
     étape, « Passer la visite », reprise plus tard depuis Profil.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx, V = AA.views, S = () => AA.S;
  const esc = u.esc;
  const wrap = (name, fn) => { const v = V[name]; if (!v) return; const r = v.render; v.render = (el, args) => { r(el, args); try { fn(el, args || []); } catch (e) { console.error(e); } }; };

  /* ---------- Réinitialisation « Drive compris » : elle l'emporte sur toute copie qui ne l'a pas vue ---------- */
  const merge0 = AA.store.merge;
  AA.store.merge = (a, b) => {
    const ra = (a && a.resetAt) || 0, rb = (b && b.resetAt) || 0;
    return ra !== rb ? AA.store.migrate(u.clone(ra > rb ? a : b)) : merge0(a, b);
  };

  /* ---------- Les jeux reviennent dans l'espace Jeux ---------- */
  ["quests", "aquarium", "story"].forEach(n => { if (V[n]) V[n].tab = "train"; });
  ["quests", "aquarium"].forEach(n => wrap(n, el => { const b = u.$(".pagehead a.closebtn", el); if (b) b.setAttribute("href", "#/jeux"); }));
  wrap("story", (el, [id]) => { if (id) return; const b = u.$(".pagehead a.closebtn", el); if (b) b.setAttribute("href", "#/jeux"); });

  const daily = () => {
    const s = S(), V19 = AA.v19, out = { dq: 0, dqn: 0, wk: 0, wkn: 0, ev: null, evNext: null, claim: 0 };
    try { const dq = G.todayQuests(); out.dqn = dq.length; out.dq = dq.filter(q => { const [v, n] = G.cond(q.test); return v >= n; }).length; } catch (e) {}
    try { const ch = V19.weekChallenges(); out.wkn = ch.length; out.wk = ch.filter(c => V19.weekVal(c) >= c.n).length; } catch (e) {}
    try { out.ev = V19.events()[0] || null; if (out.ev) { const [v, n] = V19.evProgress(out.ev); out.evP = [v, n]; } else out.evNext = V19.nextEvent(); } catch (e) {}
    try { out.claim = G.claimable0 ? G.claimable0() : 0; } catch (e) {}
    out.aq = Object.keys(s.aqua || {}).filter(id => C.creatures.some(c => c.id === id)).length; out.aqn = C.creatures.length;
    out.st = (C.stories || []).filter(x => (s.story[x.id] || {}).done).length; out.stn = (C.stories || []).length;
    return out;
  };
  const meter = (ic, label, v, n, extra) => `<div class="gx-m"><span class="gx-ic">${AA.icon(ic)}</span><span class="grow"><span class="row between"><b class="small">${label}</b><span class="xs mono muted">${extra || v + "/" + n}</span></span>${ui.bar(n ? v / n : 0, "var(--gold)")}</span></div>`;

  wrap("jeux", el => {
    const d = daily(), minis = u.$(".gm-minis", el); if (!minis || u.$(".gx-day", el)) return;
    const evLine = d.ev ? meter("sparkle", t("gx.ev", { t: esc(d.ev.title) }), d.evP[0], d.evP[1]) : d.evNext ? `<p class="xs muted" style="margin:0">${AA.icon("calendar")} ${t("gx.evNext", { t: esc(d.evNext.title) })}</p>` : "";
    minis.insertAdjacentHTML("beforebegin", `
      <nav class="gx-jump" aria-label="${t("gx.jumpA")}">${[["gxDay", "sun", "gx.dayT"], ["gxMini", "cards", "gm.minis"], ["gxFight", "swords", "gx.fightT"], ["gxMore", "fish", "gx.moreT"]].map(([id, ic, k]) => `<a class="chip" href="#${id}" data-gxj="${id}">${AA.icon(ic)} ${t(k)}</a>`).join("")}</nav>
      <div class="section-title" id="gxDay"><h3>${t("gx.dayT")}</h3>${AA.helpBtn("quests")}</div><p class="small muted gx-why">${t("gx.dayS")}</p>
      <a class="card gx-day" href="#/quests">${meter("sun", t("gx.dq"), d.dq, d.dqn)}${meter("trophy", t("gx.wk"), d.wk, d.wkn)}${evLine}
        <span class="row between"><span class="small">${d.claim ? `<span class="chip gold">${t("gx.claim", { n: d.claim })}</span>` : t("gx.open")}</span>${AA.icon("next")}</span></a>
      <div class="section-title" id="gxMini"><h3>${t("gm.minis")}</h3></div><p class="small muted gx-why">${t("gx.miniS")}</p>`);
    minis.insertAdjacentHTML("afterend", `<div class="section-title" id="gxFight"><h3>${t("gx.fightT")}</h3></div><p class="small muted gx-why">${t("gx.fightS")}</p>`);
    el.insertAdjacentHTML("beforeend", `<div class="section-title" id="gxMore"><h3>${t("gx.moreT")}</h3></div><p class="small muted gx-why">${t("gx.moreS")}</p>
      <div class="gm-minis gx-more">
        <a class="gm-tile" href="#/story"><span class="medal">${AA.icon("compass")}</span><span class="grow"><b>${t("gx.story")}</b><span class="small muted">${t("gx.storyS")}</span><span class="xs">${t("gx.storyN", { n: d.st, t: d.stn })}</span></span>${AA.icon("next")}</a>
        <a class="gm-tile" href="#/aquarium"><span class="medal">${AA.icon("fish")}</span><span class="grow"><b>${t("gx.aqua")}</b><span class="small muted">${t("gx.aquaS")}</span><span class="xs">${t("gx.aquaN", { n: d.aq, t: d.aqn })}</span></span>${AA.icon("next")}</a>
      </div>`);
    u.$$("[data-gxj]", el).forEach(a => a.onclick = e => { e.preventDefault(); const x = document.getElementById(a.dataset.gxj); if (x) x.scrollIntoView({ behavior: "smooth", block: "start" }); });
  });
  /* Entraîner : la carte d'entrée dit tout ce que contient l'espace Jeux. */
  wrap("train", el => { const s = u.$(".gm-entry .small", el); if (s) s.textContent = t("gx.tileS"); const d = daily(), e = u.$(".gm-entry", el); if (e && d.claim && !u.$(".chip", e)) e.insertAdjacentHTML("beforeend", `<span class="chip gold">${d.claim}</span>`); });

  /* Accueil : une seule petite carte, calme, en bas de la colonne. */
  wrap("home", el => {
    const side = u.$(".col-side", el); if (!side || u.$(".gx-home", el)) return;
    const d = daily();
    side.insertAdjacentHTML("beforeend", `<a class="card gx-home" href="#/jeux"><span class="medal">${AA.icon("swords")}</span><span class="grow"><b>${t("gx.homeT")}</b>
      <span class="xs muted">${t("gx.homeS", { dq: d.dq, dqn: d.dqn, wk: d.wk, wkn: d.wkn })}${d.ev ? " · " + esc(d.ev.title) : ""}</span></span>${d.claim ? `<span class="chip gold">${d.claim}</span>` : ""}${AA.icon("next")}</a>`);
  });

  /* ---------- Visite guidée ---------- */
  /* 2.5 : la visite entre dans chaque onglet et montre ce qu'il contient. */
  const goal = () => { try { return AA.game.goalWorld(); } catch (e) { return "n2"; } };
  const STEPS = [
    { k: "hello" },
    { k: "home", route: "home", sel: "#view .card" },
    { k: "cours", route: () => "cours/" + goal(), sel: '.tabbar [data-tab="cours"]' },
    { k: "lesson", route: () => "lesson/" + ((C.inWorld(goal())[0] || C.modules[0]).id), sel: "#view .lesson-tabs" },
    { k: "map", route: () => "map/" + goal(), sel: '.tabbar [data-tab="map"]' },
    { k: "train", route: "train", sel: "#view .tiles" },
    { k: "jeux", route: () => "jeux/" + goal(), sel: '.tabbar [data-tab="train"]' },
    { k: "story", route: "story", sel: "#view .story-card" },
    { k: "boss", route: () => "boss/" + goal(), sel: "#view .bt-card" },
    { k: "progres", route: "progres", sel: '.tabbar [data-tab="progres"]' },
    { k: "profile", route: "profile", sel: '.tabbar [data-tab="profile"]' },
    { k: "streak", route: "home", sel: '#topbar [data-hud="streak"]' },
    { k: "xp", route: "home", sel: '#topbar [data-hud="xp"]' },
    { k: "search", route: "home", sel: '#topbar a[href="#/search"]' },
    { k: "words" },
    { k: "help" },
    { k: "end", route: "home" }
  ];
  const WORDS = ["cours", "notion", "tuteur", "lacune", "explique", "aventure", "quete", "gardien", "boss", "examen", "xp", "flamme"];
  const wordsHtml = () => `<dl class="tour-words">${WORDS.map(w => `<div><dt>${t("tour.w." + w + ".t")}</dt><dd>${t("tour.w." + w + ".s")}</dd></div>`).join("")}</dl>`;
  const TO = (AA.tour = {});
  let cur = -1, box = null;
  const st = () => { const s = S(); if (!s.tour || typeof s.tour !== "object") s.tour = {}; return s.tour; };
  const visible = el => { if (!el) return null; const r = el.getBoundingClientRect(); return r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < innerHeight ? r : null; };
  const place = () => {
    if (!box) return;
    const S1 = STEPS[cur], tgt = S1.sel ? u.$(S1.sel) : null, r = visible(tgt), spot = u.$(".tour-spot", box), card = u.$(".tour-card", box);
    box.classList.toggle("free", !r);
    if (!r) { spot.style.cssText = ""; card.style.cssText = ""; return; }
    const pad = 6; spot.style.cssText = `left:${r.left - pad}px;top:${r.top - pad}px;width:${r.width + pad * 2}px;height:${r.height + pad * 2}px`;
    const cw = Math.min(380, innerWidth - 24), ch = card.offsetHeight, gap = 14;
    let left = r.left + r.width / 2 - cw / 2, top;
    if (r.left > innerWidth * 0.6 && r.top < innerHeight / 2 && r.width < 80 && innerWidth > 700) left = r.right - cw;
    if (innerWidth >= 1024 && r.left < 140 && r.top > 60) { left = r.right + gap; top = Math.min(Math.max(12, r.top + r.height / 2 - ch / 2), innerHeight - ch - 12); }
    else top = r.top > innerHeight / 2 ? r.top - ch - gap : r.bottom + gap;
    left = Math.max(12, Math.min(left, innerWidth - cw - 12)); top = Math.max(12, Math.min(top, innerHeight - ch - 12));
    card.style.cssText = `left:${left}px;top:${top}px;width:${cw}px`;
  };
  const draw = () => {
    const S1 = STEPS[cur], n = STEPS.length, last = cur === n - 1;
    box.innerHTML = `<div class="tour-spot"></div><section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tourT" tabindex="-1">
      <div class="row between"><span class="eyebrow">${t("tour.step", { i: cur + 1, n })}</span><button class="linkbtn xs" data-tour="skip">${t(last ? "tour.close" : "tour.skipAll")}</button></div>
      <h3 id="tourT">${t("tour." + S1.k + ".t")}</h3>
      <p class="small" style="margin:0">${t("tour." + S1.k + ".s")}</p>${S1.k === "words" ? wordsHtml() : ""}
      ${t("tour." + S1.k + ".w") !== "tour." + S1.k + ".w" ? `<p class="xs muted tour-why"><b>${t(S1.k === "hello" || S1.k === "help" ? "tour.tip" : "tour.why")}</b> ${t("tour." + S1.k + ".w")}</p>` : ""}
      <div class="tour-dots" role="tablist">${STEPS.map((x, i) => `<button class="${i === cur ? "on" : i < cur ? "seen" : ""}" data-tour-go="${i}" aria-label="${t("tour.goto", { i: i + 1 })}" ${i === cur ? 'aria-current="step"' : ""}></button>`).join("")}</div>
      <div class="row tour-btns">${cur > 0 ? `<button class="btn ghost sm" data-tour="prev">${AA.icon("back")} ${t("tour.prev")}</button>` : `<button class="btn ghost sm" data-tour="later">${t("tour.later")}</button>`}
        <span class="grow"></span>${last ? `<button class="btn sm" data-tour="done">${AA.icon("play")} ${t("tour.go")}</button>` : `<button class="btn sm" data-tour="next">${t(cur === 0 ? "tour.start" : "tour.next")} ${AA.icon("next")}</button>`}</div></section>`;
    requestAnimationFrame(() => { place(); const c = u.$(".tour-card", box); if (c) c.focus({ preventScroll: true }); });
    setTimeout(place, 450);
  };
  const nav = S1 => { if (!S1 || !S1.route) return; const r = typeof S1.route === "function" ? S1.route() : S1.route; if (location.hash !== "#/" + r) { AA.router.go(r); window.scrollTo(0, 0); } };
  const go = i => { cur = Math.max(0, Math.min(STEPS.length - 1, i)); st().step = cur; AA.store.save(); fx.sfx.tap(); nav(STEPS[cur]); draw(); };
  const close = how => {
    if (!box) return; const s = st();
    if (how === "done") { s.done = 1; s.step = 0; }
    else if (how === "skip") { s.skip = 1; s.step = cur; fx.toast(t("tour.laterT"), t("tour.laterS"), "compass"); }
    else { s.later = 1; s.step = cur; fx.toast(t("tour.laterT"), t("tour.laterS"), "compass"); }
    AA.store.save(); box.remove(); box = null; cur = -1;
    removeEventListener("resize", place); removeEventListener("keydown", key, true);
  };
  const key = e => {
    if (!box) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close("later"); }
    else if (e.key === "ArrowRight") { e.preventDefault(); if (cur < STEPS.length - 1) go(cur + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); if (cur > 0) go(cur - 1); }
  };
  TO.start = from => {
    if (box) return; if (AA.router.name !== "home" && !from) AA.router.go("home");
    box = document.createElement("div"); box.className = "tour"; document.body.appendChild(box);
    cur = Math.min(from != null ? from : 0, STEPS.length - 1); nav(STEPS[cur]); draw();
    addEventListener("resize", place); addEventListener("keydown", key, true);
    box.addEventListener("click", e => {
      const g = e.target.closest("[data-tour-go]"); if (g) return go(+g.dataset.tourGo);
      const b = e.target.closest("[data-tour]"); if (!b) return;
      const a = b.dataset.tour;
      if (a === "next") go(cur + 1); else if (a === "prev") go(cur - 1);
      else if (a === "done") { close("done"); fx.sfx.up(); }
      else if (a === "skip") close(cur === STEPS.length - 1 ? "done" : "skip"); else if (a === "later") close("later");
    });
  };
  TO.active = () => !!box;
  TO.STEPS = STEPS;
  /* Première utilisation : la visite se propose une fois (jamais pendant les tests automatisés). */
  wrap("home", () => {
    const s = S(), tr = s.tour || {};
    if (box || tr.done || tr.skip || tr.later || !s.profile.onboarded || navigator.webdriver) return;
    setTimeout(() => { if (AA.router.name === "home" && !box && !u.$(".sheet-wrap")) TO.start(0); }, 900);
  });
  /* Relancer : Profil › Visite guidée (reprend où on s'était arrêté). */
  wrap("profile", el => {
    const tiles = u.$(".tiles", el); if (!tiles || u.$('[data-t="tour"]', tiles)) return;
    const tr = S().tour || {}, resume = !tr.done && tr.step > 0;
    tiles.insertAdjacentHTML("beforeend", ui.tile("tour", "compass", "var(--primary)", t("tour.tile"), t(resume ? "tour.tileResume" : "tour.tileS")));
    const b = u.$('[data-t="tour"]', tiles);
    if (b) b.addEventListener("click", e => { e.stopPropagation(); e.preventDefault(); const r = S().tour || {}; AA.router.go("home"); setTimeout(() => TO.start(!r.done && r.step > 0 ? r.step : 0), 350); }, true);
  });
  AA.view("tour", { tab: "profile", render(el) { el.innerHTML = ""; AA.router.go("home", undefined, true); setTimeout(() => TO.start(0), 350); } });
})();
