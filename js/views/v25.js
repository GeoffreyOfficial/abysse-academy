/* =====================================================================
   Abysse Academy 2.5 · examen blanc complet
   - Chaque thème du niveau est interrogé, lu ou pas (comme le jour J).
   - Dans un thème, les questions viennent de notions différentes.
   - Difficulté réaliste : on privilégie calculs, mises en situation,
     « pourquoi », questions difficiles et notions que tu maîtrises mal.
   - AA.quiz.examPlan(wid, full) renvoie la liste (testée par
     tests/exam.test.js).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, Q = AA.quiz, T = AA.tutor;
  if (!Q || !C) return;
  const FMT = { full: { n: 40, calc: 10, min: 2, time: 45 }, quick: { n: 20, calc: 4, min: 1, time: 20 } };
  const SITU = /^(tu |ton |ta |tes |un |une |pendant|lors|en |apr[eè]s|au |à \d)/i;

  /* Plus le score est haut, plus la question est exigeante. */
  Q.examHard = q => {
    let h = 0;
    if (q.lvl === 2 || q.type === "order") h += 2;
    if (/\d/.test(q.q) && (q.c || []).some(c => /\d/.test(c))) h += 1;
    if (/(pourquoi|sauf|faux|inexact|ne .{1,30} pas)/i.test(q.q)) h += 1;
    if (SITU.test(q.q)) h += 1;
    try { const nid = T && T.notionOf(q), m = nid != null && T.mastery(nid); if (m != null && m !== false && m < .6) h += 1; } catch (e) { /* tuteur absent */ }
    return h;
  };

  Q.examPlan = (wid, full) => {
    const F = full ? FMT.full : FMT.quick, mods = C.inWorld(wid);
    const gens = G.genKeys().filter(k => C.generators[k].m && C.byId[C.generators[k].m] && C.byId[C.generators[k].m].world === wid);
    /* 2.5 : une ou deux procédures d'urgence à remettre dans l'ordre. */
    const procs = window.AA_PLAIN ? [] : u.shuffle((C.procs || []).filter(p => p.world === wid)).slice(0, full ? 2 : 1);
    const nc = gens.length ? F.calc : 0, slots = F.n - nc - procs.length;
    /* Répartition : au moins « min » par thème, le reste aux thèmes les plus riches. */
    const quota = {}; mods.forEach(m => (quota[m.id] = Math.min(F.min, m.quiz.length)));
    let left = slots - Object.values(quota).reduce((a, b) => a + b, 0);
    const rich = u.shuffle(mods.slice()).sort((a, b) => (C.notions && C.notions[b.id] ? C.notions[b.id].length : 0) - (C.notions && C.notions[a.id] ? C.notions[a.id].length : 0));
    for (let k = 0; left > 0 && k < 200; k++) { const m = rich[k % rich.length]; if (quota[m.id] < m.quiz.length) { quota[m.id]++; left--; } }
    const pick = [];
    mods.forEach(m => {
      /* Regroupe par notion, puis tourne entre les notions (la plus exigeante d'abord). */
      const groups = {};
      m.quiz.forEach(q => { let nid = "x"; try { nid = (T && T.notionOf(q)) || "x"; } catch (e) {} (groups[nid] = groups[nid] || []).push(q); });
      const lists = u.shuffle(Object.values(groups)).map(g => g.map(q => [q, Q.examHard(q) + Math.random() * 1.6]).sort((a, b) => b[1] - a[1]).map(x => x[0]));
      let got = 0;
      for (let r = 0; got < quota[m.id] && r < 20; r++) lists.forEach(l => { if (got < quota[m.id] && l[r]) { pick.push(l[r]); got++; } });
    });
    const sg = u.shuffle(gens.slice()), calcs = nc ? Array.from({ length: nc }, (_, i) => G.gen(sg[i % sg.length])).filter(Boolean) : [];
    return u.shuffle(pick.concat(calcs, procs));
  };

  Q.exam = (full, wid) => {
    wid = wid || Q.examWorld();
    const w = C.worldById[wid], F = full ? FMT.full : FMT.quick;
    Q.start("exam", Q.examPlan(wid, full), { full, world: wid, timeLeft: F.time * 60, title: t(full ? "mode.examFull" : "mode.examQuick") + (w && wid !== "n2" ? " · " + w.short : ""), back: "train" });
  };
})();

/* =====================================================================
   2.5 · Quêtes des gardiens : il faut vivre l'aventure « boss-<monde> »
   pour affronter le boss. Avant le combat, le récit ; après la victoire,
   la suite de l'histoire.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, GM = AA.games, V = AA.views;
  if (!G || !GM || !V.boss) return;
  const quest = wid => C.storyById["boss-" + wid];
  G.questDone = wid => { const s = quest(wid); return !s || !!((AA.S.story || {})[s.id] || {}).done; };
  const bo0 = G.bossOpen;
  /* Niveau déjà obtenu ou en simple révision : pas besoin de revivre la quête. */
  const passed = wid => { try { return !!AA.path && (AA.path.mode(wid) !== "learn" || AA.path.certified(wid)); } catch (e) { return false; } };
  G.bossOpen = wid => bo0(wid) && (!!AA.S.unlockAll || G.questDone(wid) || GM.bossWon(wid) || passed(wid));
  const v = V.boss, r0 = v.render;
  v.render = function (el, args) {
    const out = r0.call(this, el, args);
    try {
      const wid = (args && args[0]) || G.goalWorld(), s = quest(wid); if (!s) return out;
      const card = u.$(".bt-card", el), won = GM.bossWon(wid);
      if (card && !won && !AA.S.unlockAll && !G.questDone(wid) && !passed(wid)) {
        const warn = u.$(".callout.warn", card), btn = warn && warn.nextElementSibling;
        const html = `<a class="btn block bt-quest" href="#/story/${s.id}">${AA.icon("scroll")} ${t("bq.go")} · ${u.esc(s.title)}</a>`;
        if (GM.toRead(wid).length === 0 && warn) { warn.innerHTML = t("bq.need", { t: u.esc(s.title) }); if (btn && btn.tagName === "A") btn.outerHTML = html; else warn.insertAdjacentHTML("afterend", html); }
        else if (warn) warn.insertAdjacentHTML("beforeend", " " + t("bq.also", { t: u.esc(s.title) }));
      }
      if (card && (G.questDone(wid) || won) && s.bossIntro && !u.$(".bt-story", card)) {
        const h = u.$(".bt-h", card);
        if (h) h.insertAdjacentHTML("afterend", `<div class="bt-story"><p class="eyebrow">${AA.icon("scroll")} ${t("bq.story")}</p><p>${u.esc(s.bossIntro)}</p></div>`);
      }
      const res = u.$(".bt-res.won", el);
      if (res && s.epilogue && !u.$(".bt-epi", res)) {
        const h1 = u.$("h1", res);
        if (h1) h1.insertAdjacentHTML("afterend", `<div class="bt-epi"><p class="eyebrow">${t("bq.epi")}</p><p>${u.esc(s.epilogue)}</p></div>`);
      }
    } catch (e) { console.error(e); }
    return out;
  };
})();

/* =====================================================================
   2.5 · Procédures d'urgence : remettre les gestes dans l'ordre, en
   choisissant les bons parmi une longue liste. Une page par niveau.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, Q = AA.quiz, ui = AA.ui, fx = AA.fx;
  if (!Q || !C) return;
  const P = () => C.procs || [];
  const esc = u.esc, done = () => (AA.S.procs = AA.S.procs || {});
  const nSteps = p => p.steps.reduce((a, g) => a + (Array.isArray(g) ? g.length : 1), 0);
  /* Les procédures se travaillent même sans avoir lu le cours (urgence = réflexe). */
  const qo = AA.tutor && AA.tutor.qOk; if (qo) AA.tutor.qOk = q => !!(q && q.proc) || qo(q);
  /* Quiz de thème : une procédure d'urgence du thème remplace une question (si le thème en a). */
  const st0 = Q.start;
  Q.start = (mode, qs, opts) => {
    if (mode === "module" && !window.AA_PLAIN && opts && opts.module && Array.isArray(qs) && qs.length > 3 && !qs.some(q => q && q.proc)) {
      const l = P().filter(p => p.m === opts.module); if (l.length) qs = qs.slice(0, qs.length - 1).concat([u.pick(l)]);
    }
    return st0(mode, qs, opts);
  };
  const rec0 = G.record;
  G.record = (q, ok, doubt, picked) => { rec0(q, ok, doubt, picked); if (q && q.proc && ok) done()[q.id] = 1; };
  const worlds = () => { const g = G.goalWorld(); return C.worlds.filter(w => P().some(p => p.world === w.id)).sort((a, b) => (b.id === g) - (a.id === g) || a.order - b.order); };
  Q.procs = (list, title) => Q.start("drill", u.shuffle(list.slice()), { title: title || t("pr.title"), back: "procs", procs: list.map(p => p.id) });
  const rs0 = Q.restart;
  Q.restart = c => (c && c.procs ? Q.procs(c.procs.map(id => C.qById[id]).filter(Boolean), c.title) : rs0(c));
  AA.view("procs", {
    tab: "train", depth: 2,
    render(el) {
      const D = done(), tot = P().length, ok = P().filter(p => D[p.id]).length;
      el.innerHTML = `${ui.head(t("pr.title"), "train")}
        <section class="card pr-hero"><p class="eyebrow">${AA.icon("buoy")} ${t("pr.eyebrow")}</p><p>${t("pr.intro")}</p>
          <p class="small muted">${t("pr.how")}</p><p class="small"><b>${t("pr.count", { n: ok, tot })}</b></p></section>
        ${worlds().map(w => { const l = P().filter(p => p.world === w.id), n = l.filter(p => D[p.id]).length;
          return `<div class="section-title"><h3>${esc(w.short)}</h3><span class="chip ${n === l.length ? "ok" : ""}">${n} / ${l.length}</span></div>
          <div class="pr-list">${l.map(p => `<button class="card pr-item" data-pr="${p.id}"><span class="pr-ic ${D[p.id] ? "ok" : ""}">${AA.icon(D[p.id] ? "check" : "buoy")}</span><span class="grow"><b>${esc(p.title)}</b><span class="xs muted">${esc(C.byId[p.m] ? C.byId[p.m].title : "")} · ${t("pr.steps", { n: nSteps(p), x: nSteps(p) + p.extra.length })}</span></span>${AA.icon("play")}</button>`).join("")}</div>
          ${l.length > 1 ? `<button class="btn ghost block pr-all" data-prw="${w.id}">${AA.icon("play")} ${t("pr.all", { w: esc(w.short), n: l.length })}</button>` : ""}`; }).join("")}`;
      u.$$("[data-pr]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); const p = C.qById[b.dataset.pr]; Q.procs([p], p.title); });
      u.$$("[data-prw]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); const w = C.worldById[b.dataset.prw]; Q.procs(P().filter(p => p.world === w.id), t("pr.title") + " · " + w.short); });
    }
  });
})();
