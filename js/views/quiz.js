/* =====================================================================
   Abysse Academy · moteur de quiz (tous les modes) et résultats
   AA.quiz.start(mode, questions, options) lance une session.
   Modes : module, gen, daily, errors, exam, apnee, duel, pc, stale.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx;
  const NOFB = m => m === "exam" || m === "apnee" || m === "duel" || m === "rduel";
  const TIMED = m => m === "exam" || m === "apnee" || m === "five";
  const Q = (AA.quiz = {});

  /* 2.7.1 · Jamais deux fois la même question dans une série : même identifiant, même énoncé
     (doublons du contenu) ou même calcul généré (mêmes chiffres changés). Les places libérées
     sont reprises par d'autres questions du même thème, puis du même niveau. */
  const normQ = s => String(s || "").replace(/<[^>]+>/g, " ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  Q.key = q => q.gen ? "gen:" + q.gen : q.proc ? "proc:" + q.id : "q:" + normQ(q.q).replace(/\d+/g, "#");
  Q.uniq = (qs, mode, opts) => {
    if (mode === "gen" || mode === "apnee") return qs; /* calculs à la chaîne : même méthode, chiffres neufs, voulu */
    const seen = new Set(), out = [], lost = [];
    qs.forEach(q => { const k = Q.key(q); if (seen.has(k) || seen.has("id:" + q.id)) lost.push(q); else { seen.add(k); seen.add("id:" + q.id); out.push(q); } });
    if (!lost.length || ["errors", "srs", "duel", "rduel", "pc"].includes(mode)) return out;
    const ok = q => { const T = AA.tutor; return !seen.has(Q.key(q)) && !seen.has("id:" + q.id) && q.c && q.c.length > 1 && (!T || !T.qOk || ["place"].includes(mode) || T.qOk(q)); };
    lost.forEach(q => {
      const m = C.byId[q.m], w = m && m.world;
      let r = null;
      if (q.gen && w) { const k = u.shuffle(G.genKeys().filter(k => C.generators[k].m && C.byId[C.generators[k].m] && C.byId[C.generators[k].m].world === w && !seen.has("gen:" + k)))[0]; r = k ? G.gen(k) : null; }
      if (!r && m) r = u.shuffle(m.quiz.filter(x => !x.lvl || x.lvl === q.lvl || mode !== "exam")).find(ok) || null;
      if (!r && w) r = u.shuffle(C.questions.filter(x => x.world === w && x.lvl !== 2)).find(ok) || null;
      if (r) { seen.add(Q.key(r)); seen.add("id:" + r.id); out.splice(Math.floor(Math.random() * (out.length + 1)), 0, r); }
    });
    return out;
  };
  Q.start = (mode, qs, opts) => {
    const q0 = qs; qs = Q.uniq(qs.filter(Boolean), mode, opts);
    if (opts && opts.qs === q0) opts.qs = qs;
    if (!qs.length) { fx.toast(t("quiz.emptyT"), t("quiz.emptyS"), "info"); return; }
    const ctx = Object.assign({
      mode, items: qs.map(q => ({ q, order: u.shuffle(q.c.map((_, i) => i)) })), idx: 0, answers: [], picked: null,
      combo: 0, maxCombo: 0, xp: 0, doubt: false, t0: Date.now(), back: "home"
    }, opts || {});
    AA.router.go("quiz", ctx);
  };
  /* ----- Correction détaillée : méthode pas à pas, piège classique, cours ----- */
  const reOk = (re, s) => { try { return new RegExp(re, "i").test(s); } catch (e) { return false; } };
  Q.methodFor = q => {
    const L = C.methods || [], txt = q.q + " " + (q.e || "");
    if (q.gen) { const g = L.find(x => (x.gen || []).includes(q.gen)); if (g) return g; }
    if (!/\d/.test(txt)) return null; /* questions de calcul en priorité */
    return L.find(x => x.re && (!x.m || x.m.includes(q.m)) && reOk(x.re, txt)) || null;
  };
  Q.pitfallFor = q => (C.pitfalls || []).find(p => (q.gen && (p.gen || []).includes(q.gen)) || (!q.gen && p.re && (!p.m || p.m.includes(q.m)) && reOk(p.re, q.q))) || null;
  Q.explain = (q, okNow) => {
    if (!q || !q.m) return "";
    const me = Q.methodFor(q), pf = okNow ? null : Q.pitfallFor(q), mod = C.byId[q.m];
    return `${me ? `<details class="method" ${okNow ? "" : "open"}><summary>${AA.icon("brain")} ${t("ex.steps")} · ${u.esc(me.title)}</summary><ol>${me.steps.map(s => `<li>${s}</li>`).join("")}</ol>${me.tip ? `<p class="method-tip">${AA.icon("bolt")} ${me.tip}</p>` : ""}</details>` : ""}
      ${pf ? `<div class="pit"><b>${AA.icon("info")} ${t("ex.trap")} : ${u.esc(pf.title)}</b><p>${u.esc(pf.why)}</p><p><b>${t("ex.fix")}</b> ${u.esc(pf.fix)}</p></div>` : ""}
      ${mod ? `<button class="btn ghost sm rev-btn" id="revcours">${AA.icon("book")} ${t("ex.review", { title: u.esc(mod.title) })}</button>` : ""}`;
  };
  /* Revoir le cours sans quitter la série : l'essentiel et « À retenir » dans un panneau. */
  Q.review = mid => {
    const m = C.byId[mid]; if (!m) return; fx.sfx.flip();
    AA.ui.sheet(`<div class="rev-sheet"><p class="eyebrow">${t("ex.course")}</p><h3>${u.esc(m.title)}</h3>
      ${m.memo && m.memo.length ? `<p class="eyebrow">${t("ex.memo")}</p><div class="memo">${m.memo.map(([a, b]) => `<div><b>${u.esc(a)}</b><span class="muted">${u.esc(b)}</span></div>`).join("")}</div>` : ""}
      <p class="eyebrow">${t("ex.essential")}</p>${m.diagram && C.diagrams[m.diagram] ? C.diagrams[m.diagram]() : ""}<div class="prose">${m.essentiel}</div>
      <button class="btn block" data-no>${AA.icon("back")} ${t("ex.backQuiz")}</button>
      <a class="btn ghost block" href="#/lesson/${m.id}">${t("ex.fullLesson")}</a><p class="xs muted center" style="margin:0">${t("ex.fullLessonS")}</p></div>`, m.title);
    const pr = document.querySelector(".rev-sheet .prose"); if (pr && AA.gloss) try { AA.gloss.link(pr); } catch (e) {}
  };

  /* ----- Lanceurs ----- */
  Q.module = (m, deepOnly) => {
    const pool = deepOnly ? m.quiz.filter(q => q.lvl === 2) : m.quiz;
    /* Plus d'aléatoire : jusqu'à 2 calculs tirés au hasard dans la série (chiffres neufs à chaque fois). */
    const gk = deepOnly ? [] : G.genKeys(m.id), ng = gk.length ? Math.min(2, Math.max(1, Math.round(pool.length / 8))) : 0;
    const picks = u.shuffle(pool).slice(0, 10 - ng).concat(Array.from({ length: ng }, () => G.gen(u.pick(gk))).filter(Boolean));
    Q.start("module", u.shuffle(picks), { module: m.id, title: m.title, air: 200, wasStale: G.isStale(m.id), back: "lesson/" + m.id });
  };
  Q.calcs = (mid, n, title) => { const keys = G.genKeys(mid); Q.start("gen", Array.from({ length: n || 6 }, () => G.gen(u.pick(keys))), { title: title || t("quiz.calcs"), air: mid ? 200 : null, back: mid ? "lesson/" + mid : "train" }); };
  Q.daily = () => Q.start("daily", G.dailySet(), { title: t("mode.daily"), back: "home" });
  Q.errors = () => {
    const ids = Object.keys(AA.S.errors).sort((a, b) => AA.S.errors[b] - AA.S.errors[a]);
    const qs = ids.map(id => id.startsWith("gen:") ? G.gen(id.slice(4)) : C.qById[id]).filter(Boolean).slice(0, 10);
    if (!qs.length) { fx.toast(t("errors.noneT"), t("errors.noneS"), "buoy"); return; }
    Q.start("errors", qs, { title: t("mode.errors"), back: "train" });
  };
  Q.stale = () => {
    const list = G.staleList(); const qs = [];
    list.forEach(m => u.shuffle(m.quiz).slice(0, 3).forEach(q => qs.push(q)));
    Q.start("stale", u.shuffle(qs).slice(0, 12), { title: t("mode.stale"), back: "home", stale: list.map(m => m.id) });
  };
  /* Examen blanc du monde visé (N2 par défaut, ou l'objectif choisi dans « Mon parcours »). */
  Q.examWorld = () => { const g = G.goalWorld(); return C.inWorld(g).length >= 2 ? g : "n2"; };
  Q.exam = (full, wid) => {
    wid = wid || Q.examWorld();
    const mods = C.inWorld(wid), pick = [], w = C.worldById[wid];
    mods.forEach(m => pick.push(...u.shuffle(m.quiz.filter(q => q.lvl !== 2)).slice(0, full ? 2 : 1)));
    const all = C.questions.filter(q => q.world === wid && !pick.includes(q));
    const n = full ? 40 : 20, nc = full ? 10 : 4;
    const rest = u.shuffle(all).slice(0, Math.max(0, n - nc - pick.length));
    const wg = G.genKeys().filter(k => C.byId[C.generators[k].m] && C.byId[C.generators[k].m].world === wid);
    const calcs = Array.from({ length: nc }, () => G.gen(wg.length ? u.pick(wg) : undefined)).filter(Boolean);
    Q.start("exam", u.shuffle(pick.slice(0, n - calcs.length).concat(rest, calcs)), { full, world: wid, timeLeft: (full ? 45 : 20) * 60, title: t(full ? "mode.examFull" : "mode.examQuick") + (w && wid !== "n2" ? " · " + w.short : ""), back: "train" });
  };
  Q.apnee = () => Q.start("apnee", u.shuffle(C.questions.filter(q => q.world === G.goalWorld() && G.inPlay(q.m))), { time: 60, title: t("mode.apnee"), back: "train" });
  Q.computer = n => Q.start("pc", u.shuffle(C.computer).slice(0, n || C.computer.length), { title: t("mode.pc"), back: "pc", n });
  Q.duel = (a, b) => {
    const qs = u.shuffle(C.questions.filter(q => q.world === "n2" && q.lvl !== 2)).slice(0, 6).concat([G.gen(), G.gen()]);
    Q.start("duel", qs, { players: [a, b], turn: 0, qs, scores: [], times: [], title: t("mode.duel"), back: "club" });
  };
  /* Boss de fin de monde : vider sa jauge avant de vider sa bouteille. */
  Q.boss = wid => {
    const w = C.worldById[wid], b = w.boss, mods = C.inWorld(wid), pick = [];
    mods.forEach(m => pick.push(...u.shuffle(m.quiz).slice(0, 2)));
    const gens = G.genKeys().filter(k => C.generators[k].m && C.byId[C.generators[k].m] && C.byId[C.generators[k].m].world === wid);
    const calcs = gens.length ? Array.from({ length: Math.min(5, Math.round(b.n / 5)) }, () => G.gen(u.pick(gens))) : [];
    const qs = u.shuffle(u.shuffle(pick).slice(0, b.n - calcs.length).concat(calcs));
    Q.start("boss", qs, { world: wid, title: b.name, air: 200, airLoss: 40, bossHp: b.hp, bossMax: b.hp, back: "boss/" + wid });
  };
  /* 5 minutes : cartes à revoir, erreurs, doutes, nouveautés et un calcul. Fin douce au bout du temps. */
  Q.five = () => {
    const S = AA.S, qs = [], used = new Set(), add = q => { if (q && !used.has(q.id) && (q.card || q.calc || G.inPlay(q.m))) { used.add(q.id); qs.push(q); } };
    u.shuffle(G.cardsDue()).slice(0, 3).forEach(cd => add({ card: true, id: "card:" + cd.id, cid: cd.id, m: cd.m, f: cd.f, b: cd.b, q: cd.f, c: [], e: cd.b }));
    Object.keys(S.errors).filter(id => C.qById[id] && !id.startsWith("pc-")).sort((a, b) => S.errors[b] - S.errors[a]).slice(0, 3).forEach(id => add(C.qById[id]));
    Object.keys(S.doubt).filter(id => C.qById[id]).slice(0, 1).forEach(id => add(C.qById[id]));
    G.staleList().slice(0, 1).forEach(m => add(u.pick(m.quiz)));
    const pool = C.questions.filter(q => G.inPlay(q.m));
    u.shuffle(pool.filter(q => S.seen[q.id] !== 1)).forEach(q => { if (qs.length < 9) add(q); });
    u.shuffle(pool).forEach(q => { if (qs.length < 9) add(q); });
    const cards = qs.filter(q => q.card), rest = u.shuffle(qs.filter(q => !q.card));
    const order = []; rest.forEach((q, i) => { order.push(q); if (i % 3 === 1 && cards.length) order.push(cards.shift()); });
    order.push(...cards); const g = G.gen(); if (g) order.splice(Math.min(5, order.length), 0, g);
    Q.start("five", order.slice(0, 12), { title: t("mode.five"), timeLeft: 300, back: "home" });
  };
  Q.restart = c => {
    const m = c.mode;
    if (m === "module") Q.module(C.byId[c.module]);
    else if (m === "exam") Q.exam(c.full, c.world);
    else if (m === "place") AA.path.startPlacement(c.world);
    else if (m === "apnee") Q.apnee();
    else if (m === "daily") Q.daily();
    else if (m === "errors") Q.errors();
    else if (m === "pc") Q.computer(c.n);
    else if (m === "stale") Q.stale();
    else if (m === "boss") Q.boss(c.world);
    else if (m === "five") Q.five();
    else if (m === "gen") Q.start("gen", c.items.map(it => it.q.gen ? G.gen(it.q.gen) : it.q), { title: c.title, air: c.air0, back: c.back });
    else AA.router.go(c.back || "home");
  };

  /* ----- Timers ----- */
  function startTimers(c) {
    clearInterval(c.timer);
    if (c.mode === "exam") c.timer = setInterval(() => {
      if (AA.router.name !== "quiz" || c.done) return clearInterval(c.timer);
      c.timeLeft--; const el = u.$("#tmr"); if (el) { el.textContent = u.mmss(c.timeLeft); el.classList.toggle("low", c.timeLeft <= 120); }
      if (c.timeLeft <= 0) { clearInterval(c.timer); fx.toast(t("exam.timeT"), t("exam.timeS"), "timer"); finish(c); }
    }, 1000);
    /* 5 minutes : à zéro, on termine la question en cours puis on affiche le bilan. */
    if (c.mode === "five") c.timer = setInterval(() => {
      if (AA.router.name !== "quiz" || c.done) return clearInterval(c.timer);
      c.timeLeft--; const el = u.$("#tmr"); if (el) { el.textContent = u.mmss(Math.max(0, c.timeLeft)); el.classList.toggle("low", c.timeLeft <= 30); }
      if (c.timeLeft <= 0) { clearInterval(c.timer); c.timeUp = true; if (c.picked == null && !c.flipped) finish(c); else { const nx = u.$("#nextq"); if (nx) nx.innerHTML = t("quiz.seeResult") + " " + AA.icon("next"); } }
    }, 1000);
    if (c.mode === "apnee") c.timer = setInterval(() => {
      if (AA.router.name !== "quiz" || c.done) return clearInterval(c.timer);
      c.time--; const el = u.$("#tmr"); if (el) { el.textContent = c.time; el.classList.toggle("low", c.time <= 10); }
      const bar = u.$(".qprog i"); if (bar) bar.style.width = Math.max(0, c.time / 60 * 100) + "%";
      if (c.time <= 10 && c.time > 0) fx.sfx.tick();
      if (c.time <= 0) { clearInterval(c.timer); finish(c); }
    }, 1000);
  }

  /* ----- Vue ----- */
  AA.view("quiz", {
    immersive: true,
    depth: () => { const c = AA.ctx || {}; if (c.mode === "boss") return 45; if (c.module) return AA.scene.depthOf(C.byId[c.module]); return c.mode === "exam" ? 30 : c.mode === "five" ? 3 : 15; },
    guard: () => AA.ctx && AA.ctx.items,
    render(el) {
      const c = AA.ctx; c.air0 = c.air0 === undefined ? c.air : c.air0;
      if (c.done) return result(el, c);
      if (!c.timer && TIMED(c.mode)) startTimers(c);
      draw(el, c);
    },
    leave() { const c = AA.ctx; if (c) { clearInterval(c.timer); c.timer = null; } }
  });

  function hudR(c) {
    let h = "";
    if (c.mode === "exam" || c.mode === "five") h += `<div class="timer" id="tmr" aria-live="off">${u.mmss(Math.max(0, c.timeLeft))}</div>`;
    else if (c.mode === "apnee") h += `<div class="timer" id="tmr">${c.time}</div>`;
    else {
      if (c.combo > 1) h += `<div class="combo">×${c.combo}<small>${fx.dive && fx.dive.comboLabel ? fx.dive.comboLabel(c.combo) : t("quiz.combo")}</small></div>`;
      if (c.air != null) h += AA.ui.gauge(c.air);
    }
    return h;
  }

  const isEnd = c => c.idx + 1 >= c.items.length || (c.air != null && c.air <= 0) || (c.mode === "boss" && c.bossHp <= 0) || c.timeUp;
  const bossBar = c => {
    const w = C.worldById[c.world], b = w.boss, k = c.bossHp / c.bossMax;
    return `<div class="bosshud ${c.hit ? "hit" : ""}" style="--wc:var(${w.color})"><div class="bossart">${AA.creature(b.creature, null, "boss-cr")}</div>
      <div class="grow"><div class="row between xs"><b>${u.esc(b.name)}</b><span class="mono">${c.bossHp} / ${c.bossMax}</span></div>
      <div class="bar boss"><i style="width:${k * 100}%"></i></div></div></div>`;
  };
  function drawCard(el, c, it) {
    const q = it.q, n = c.items.length, prog = (c.idx + (c.flipped ? 1 : 0)) / n;
    el.innerHTML = `<div class="qtop">
        <button class="closebtn" id="qclose" aria-label="${t("quiz.quit")}">${AA.icon("close")}</button>
        <div><div class="qprog"><i style="width:${prog * 100}%"></i></div><div class="qmeta"><span>${u.esc(c.title || "")}</span><span>${c.idx + 1} / ${n}</span></div></div>
        <div class="hudr">${hudR(c)}</div></div>
      <p class="eyebrow center">${t("five.cardEyebrow")} · ${u.esc(C.moduleTitle(q.m))}</p>
      <div class="fc-wrap"><button class="fc ${c.flipped ? "flip" : ""}" id="fc" aria-label="${t("flash.flip")}"><div class="face front"><small>${t("five.recall")}</small>${u.esc(q.f)}</div><div class="face back"><small>${t("flash.answer")}</small>${u.esc(q.b)}</div></button></div>
      <div class="row" style="justify-content:center;margin-top:var(--sp-5)">${c.flipped ? `<button class="btn ghost" id="no">${AA.icon("refresh")} ${t("flash.again")}</button><button class="btn" id="yes">${AA.icon("check")} ${t("flash.knew")}</button>` : `<button class="btn" id="show">${t("flash.show")}</button>`}</div>
      ${c.flipped ? `<p class="center xs muted gesture-hint">${AA.icon("hand")} ${t("gest.cardHint")}</p>` : ""}`;
    u.$("#qclose").onclick = () => AA.ui.confirm(t("quiz.quitQ"), t("quiz.quitYes"), () => { clearInterval(c.timer); AA.router.go(c.back || "home"); }, c.answers.length === 0);
    const flip = () => { c.flipped = true; fx.sfx.flip(); AA.router.refresh(); };
    u.$("#fc").onclick = () => { if (!c.flipped) flip(); };
    const sh = u.$("#show"); if (sh) { sh.onclick = flip; sh.focus({ preventScroll: true }); }
    const rate = ok => {
      const card = C.cards.find(x => x.id === q.cid), cx = card ? G.cardXp(card) : 1; if (card) G.rateCard(card, ok);
      c.answers.push({ q, picked: ok ? 0 : 1, ok, card: true });
      if (ok) { c.xp += cx; G.addXp(cx); fx.sfx.ok(); fx.buzz(10); } else fx.sfx.bad();
      AA.store.save(); G.checkBadges();
      c.flipped = false; if (c.timeUp || c.idx + 1 >= c.items.length) return finish(c); c.idx++; AA.router.refresh();
    };
    const y = u.$("#yes"); if (y) { y.onclick = () => rate(true); u.$("#no").onclick = () => rate(false); AA.gest.swipe(u.$("#fc"), { right: () => rate(true), left: () => rate(false), follow: true }); }
  }

  /* ----- 2.5 : procédures à remettre dans l'ordre et réponses à taper ----- */
  const flatSteps = q => q.steps.reduce((a, g) => a.concat(Array.isArray(g) ? g : [g]), []);
  Q.procCheck = (q, seq) => {
    const marks = []; let i = 0;
    q.steps.forEach(g => { const set = Array.isArray(g) ? g : [g]; seq.slice(i, i + set.length).forEach(s => marks.push(set.includes(s))); i += set.length; });
    for (; i < seq.length; i++) marks.push(false);
    const n = flatSteps(q).length;
    return { ok: seq.length === n && marks.every(Boolean), marks, good: marks.filter(Boolean).length, n };
  };
  const NUMRE = /^\s*[≈~]?\s*(-?\d[\d\s  ]*(?:[.,]\d+)?)\s*(.*)$/;
  Q.numOf = s => { const m = String(s == null ? "" : s).replace(/[  ]/g, " ").match(NUMRE); if (!m) return null; const v = parseFloat(m[1].replace(/\s/g, "").replace(",", ".")); return isFinite(v) ? v : null; };
  const unitOf = s => { const m = String(s).replace(/[  ]/g, " ").match(NUMRE); return m ? m[2].trim() : ""; };
  /* Calcul « à taper » : toutes les propositions sont un nombre suivi d'une unité courte. */
  Q.canType = q => !!(q && q.calc && Array.isArray(q.c) && q.c.length >= 2 && q.c.every(x => { const m = String(x).replace(/[  ]/g, " ").match(NUMRE); return m && m[2].length <= 12 && !/\d/.test(m[2]); }) && new Set(q.c.map(Q.numOf)).size === q.c.length);
  Q.numTol = q => {
    const ans = Q.numOf(q.c[q.a]), others = q.c.filter((_, i) => i !== q.a).map(Q.numOf);
    const gap = Math.min(...others.map(o => Math.abs(o - ans)));
    const dec = ((String(q.c[q.a]).match(/[.,](\d+)/) || [, ""])[1] || "").length;
    return Math.max(.5 * Math.pow(10, -dec), Math.min(Math.abs(ans) * .02, gap / 2 * .98));
  };
  Q.yours = a => (a.typed != null ? u.esc(a.typed) : a.seq ? u.esc(a.seq.join(" → ") || "—") : u.esc(a.q.c[a.picked]));
  function ordInner(c, it, answered) {
    const q = it.q, chk = answered ? Q.procCheck(q, it.seq) : null;
    const seq = it.seq.map((s, k) => `<li><button class="ord-it on ${chk ? (chk.marks[k] ? "good" : "wrong") : ""}" data-s="${k}" ${answered ? "disabled" : ""}><b>${k + 1}</b><span>${u.esc(s)}</span>${answered ? AA.icon(chk.marks[k] ? "check" : "x") : AA.icon("close")}</button></li>`).join("");
    const pool = it.pool.filter(p => !it.seq.includes(p)).map(p => `<button class="ord-it" data-p="${u.esc(p)}" ${answered ? "disabled" : ""}><span>${u.esc(p)}</span>${AA.icon("plus")}</button>`).join("");
    return `<p class="xs muted ord-help">${t("ord.help", { n: flatSteps(q).length })}</p>
      <ol class="ord-seq ${it.seq.length ? "" : "empty"}" aria-label="${t("ord.yours")}">${seq || `<li class="ord-ph">${t("ord.empty")}</li>`}</ol>
      ${answered ? "" : `<div class="ord-pool" role="group" aria-label="${t("ord.pool")}">${pool}</div>
      <button class="btn block" id="ordGo" ${it.seq.length ? "" : "disabled"}>${AA.icon("check")} ${t("ord.go", { n: it.seq.length })}</button>`}`;
  }
  function bindOrd(el, c, it) {
    const box = u.$("#ord", el); if (!box || c.picked != null) return;
    box.onclick = e => {
      const b = e.target.closest("button"); if (!b || b.disabled) return;
      if (b.id === "ordGo") { const r = Q.procCheck(it.q, it.seq); return answer(c, r.ok ? 0 : 1, b); }
      if (b.dataset.p != null) it.seq.push(b.dataset.p); else if (b.dataset.s != null) it.seq.splice(+b.dataset.s, 1); else return;
      fx.sfx.tap(); box.innerHTML = ordInner(c, it, false);
    };
  }
  function numHtml(c, it, answered) {
    const q = it.q, unit = unitOf(q.c[q.a]);
    if (answered) { const ok = c.picked === q.a; return `<div class="numres ${ok ? "good" : "wrong"}">${AA.icon(ok ? "check" : "x")}<span>${t("num.yours")} <b>${it.typed != null ? u.esc(it.typed) : "—"}</b></span></div>`; }
    return `<form class="numin" id="numf" autocomplete="off"><label for="numv" class="small">${t("num.label")}</label>
      <div class="numrow"><input id="numv" type="text" inputmode="decimal" enterkeyhint="done" spellcheck="false" placeholder="${t("num.ph")}">${unit ? `<span class="unit">${u.esc(unit)}</span>` : ""}</div>
      <button class="btn block" type="submit" id="numGo">${AA.icon("check")} ${t("num.go")}</button>
      ${c.mode !== "exam" ? `<button class="btn ghost sm" type="button" id="numQcm">${t("num.qcm")}</button>` : ""}</form>`;
  }
  function bindNum(el, c, it) {
    const f = u.$("#numf", el); if (!f || c.picked != null) return;
    const inp = u.$("#numv", f), q = it.q;
    if (!matchMedia("(pointer:coarse)").matches) setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (e) {} }, 60);
    f.onsubmit = e => {
      e.preventDefault(); const v = Q.numOf(inp.value);
      if (v == null) { inp.classList.add("shake"); setTimeout(() => inp.classList.remove("shake"), 500); fx.toast(t("num.badT"), t("num.badS"), "calc"); return; }
      const ans = Q.numOf(q.c[q.a]), ok = Math.abs(v - ans) <= Q.numTol(q);
      let ci = q.a; if (!ok) { let best = Infinity; q.c.forEach((x, i) => { if (i === q.a) return; const d = Math.abs(Q.numOf(x) - v); if (d < best) { best = d; ci = i; } }); }
      it.typed = inp.value.trim() + (unitOf(q.c[q.a]) && !/[a-z%°]/i.test(inp.value) ? " " + unitOf(q.c[q.a]) : "");
      answer(c, ci, u.$("#numGo", f));
    };
    const qc = u.$("#numQcm", f); if (qc) qc.onclick = () => { it.inp = false; draw(el, c); };
  }

  function draw(el, c) {
    const it = c.items[c.idx];
    if (!it || (c.air != null && c.air <= 0 && c.picked == null) || (c.mode === "boss" && c.bossHp <= 0 && c.picked == null)) return finish(c);
    if (it.q.card) return drawCard(el, c, it);
    const q = it.q, n = c.mode === "apnee" ? null : c.items.length, answered = c.picked != null;
    const isOrd = q.type === "order" && Array.isArray(q.steps);
    if (isOrd && !it.pool) { it.pool = u.shuffle(flatSteps(q).concat(q.extra || [])); it.seq = []; }
    if (!isOrd && it.inp == null) it.inp = !window.AA_PLAIN && c.mode !== "duel" && c.mode !== "rduel" && Q.canType(q) && Math.random() < (Q.typeRate || .6);
    const isNum = !isOrd && it.inp;
    const okNow = answered && c.picked === q.a;
    const prog = c.mode === "apnee" ? c.time / 60 : (c.idx + (answered ? 1 : 0)) / n;
    const tags = [];
    if (q.m && C.byId[q.m]) tags.push(`<span class="chip">${u.esc(C.byId[q.m].title)}</span>`);
    if (isOrd) tags.push(`<span class="chip warn">${AA.icon("plan")}${t("ord.chip")}</span>`);
    if (isNum) tags.push(`<span class="chip pri">${AA.icon("edit")}${t("num.chip")}</span>`);
    if (q.calc) tags.push(`<span class="chip gold">${AA.icon("calc")}${t("quiz.calc")}</span>`);
    if (q.lvl === 2) tags.push(`<span class="chip pri">${AA.icon("layers")}${t("lesson.deep")}</span>`);
    if (c.mode === "duel") tags.unshift(`<span class="chip warn">${u.esc(c.players[c.turn])}</span>`);
    if (AA.S.doubt[q.id] && !answered) tags.push(`<span class="chip warn">${t("quiz.wasDoubt")}</span>`);

    el.innerHTML = `<div class="qtop">
        <button class="closebtn" id="qclose" aria-label="${t("quiz.quit")}">${AA.icon("close")}</button>
        <div><div class="qprog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(prog * 100)}"><i style="width:${prog * 100}%"></i></div>
          <div class="qmeta"><span>${u.esc(c.title || "")}</span><span>${n ? (c.idx + 1) + " / " + n : t("quiz.answers", { n: c.answers.length })}</span></div></div>
        <div class="hudr">${hudR(c)}</div></div>
      ${c.mode === "boss" ? bossBar(c) : ""}
      <div class="qcard" id="qc">
        <div class="qtag">${tags.join("")}</div>
        ${c.mode === "pc" ? AA.lab.computerScreen(q.scr) : ""}
        <div class="qhead"><h2 class="qtext" id="qtext">${u.esc(q.q)}</h2>${AA.a11y.button("#qc .qread", t("a11y.listenQ"))}</div>
        <div class="qread" hidden>${u.esc(q.q)} ${isOrd ? it.pool.map(u.esc).join(". ") : isNum ? "" : it.order.map((ci, k) => "ABCD"[k] + ". " + u.esc(q.c[ci]) + ".").join(" ")}</div>
        ${isOrd ? `<div class="ord" id="ord">${ordInner(c, it, answered)}</div>` : isNum ? numHtml(c, it, answered) : `<div class="choices ${c.mode !== "pc" && q.c.every(x => String(x).length <= 38) ? "two" : ""}" role="group" aria-labelledby="qtext">${it.order.map((ci, k) => {
          let cls = ""; if (answered) { if (ci === q.a) cls = "good"; else if (ci === c.picked) cls = "wrong"; }
          const mk = answered && (ci === q.a || ci === c.picked) ? AA.icon(ci === q.a ? "check" : "x") : "";
          return `<button class="choice ${cls}" data-ci="${ci}" ${answered ? "disabled" : ""}><span class="k">${"ABCD"[k]}</span><span>${u.esc(q.c[ci])}</span><span class="mk">${mk}</span></button>`;
        }).join("")}</div>`}
        ${!answered && !NOFB(c.mode) ? `<div class="qactions"><button class="chip ${c.doubt ? "warn" : ""}" id="doubt" aria-pressed="${c.doubt}">${AA.icon("doubt")}${t("quiz.doubt")}</button></div>
          ${AA.S.profile.gestures !== false && (AA.S.gestHint || 0) < 4 ? `<p class="xs muted gesture-hint">${AA.icon("hand")} ${t("gest.quizHint")}</p>` : ""}` : ""}
        ${!answered && c.mode !== "duel" ? `<div class="qactions qdk-row"><button class="btn ghost sm qdk" id="qdk">${AA.icon("doubt")} ${t("quiz.dk")}</button></div>` : ""}
        ${answered ? `<div class="feedback ${okNow ? "ok" : "bad"}" role="status"><h4>${okNow ? u.pick(AA.i18n.raw("quiz.okList")) : c.picked === -1 ? t("quiz.dkT") : t("quiz.bad")}</h4>
          ${Q.context ? Q.context(q, !okNow) : ""}
          ${isOrd ? (() => { const r = Q.procCheck(q, it.seq); return `<p class="small"><b>${t("ord.score", { g: r.good, n: r.n })}</b></p>${okNow ? "" : `<p><b>${t("ord.right")}</b></p><ol class="ord-ok">${q.steps.map(g => `<li>${Array.isArray(g) ? g.map(u.esc).join(" <i>+</i> ") + ` <span class="chip">${t("ord.free")}</span>` : u.esc(g)}</li>`).join("")}</ol>${(q.extra || []).some(x => it.seq.includes(x)) ? `<p class="small"><b>${t("ord.extraT")}</b> ${(q.extra || []).filter(x => it.seq.includes(x)).map(u.esc).join(" · ")}</p>` : ""}`}`; })() : okNow ? "" : `<p><b>${t("quiz.answer")}</b> ${u.esc(q.c[q.a])}</p>`}<p>${u.esc(q.e)}</p>
          ${c.doubt && okNow ? `<p class="small muted">${t("quiz.doubtNote")}</p>` : ""}
          ${okNow || isOrd || !C.byId[q.m] ? "" : `<button class="btn exp-btn block" id="qexp">${AA.icon("play")} ${t("exp.btn")}<span class="xs">${t("exp.btnS")}</span></button>`}${Q.explain(q, okNow)}<div class="row" style="justify-content:flex-end">${AA.reportBtn('id="qrep"')}</div></div>
          <div class="qactions"><button class="btn block" id="nextq">${isEnd(c) ? t("quiz.seeResult") : t("quiz.next")} ${AA.icon("next")}</button></div>` : ""}
      </div>`;
    u.$("#qclose").onclick = () => AA.ui.confirm(t("quiz.quitQ"), t("quiz.quitYes"), () => { clearInterval(c.timer); AA.router.go(c.back || "home"); }, c.answers.length === 0);
    const rv = u.$("#revcours"); if (rv) rv.onclick = () => Q.review(q.m);
    const rp = u.$("#qrep"); if (rp) rp.onclick = () => AA.report({ type: "question", q });
    const qx = u.$("#qexp"); if (qx) qx.onclick = () => AA.explainMe(q, c.picked < 0 ? null : c.picked);
    if (AA.oral && AA.oral.quizHook && c.mode !== "duel") try { AA.oral.quizHook(q, answered, okNow); } catch (e) {}
    u.$$(".choice", el).forEach(b => {
      b.onclick = () => answer(c, +b.dataset.ci, b);
      if (answered) return;
      /* Gestes : balayer un choix vers la droite = répondre ; appui long = répondre avec « Je doute ». */
      AA.gest.swipe(b, { right: () => answer(c, +b.dataset.ci, b) });
      if (!NOFB(c.mode)) AA.gest.hold(b, () => { c.doubt = true; AA.S.gestHint = (AA.S.gestHint || 0) + 1; fx.toast(t("gest.doubtT"), t("gest.doubtS"), "doubt"); answer(c, +b.dataset.ci, b); });
    });
    if (isOrd) bindOrd(el, c, it); else if (isNum) bindNum(el, c, it);
    const d = u.$("#doubt"); if (d) d.onclick = () => { c.doubt = !c.doubt; fx.sfx.tap(); draw(el, c); };
    const dk = u.$("#qdk"); if (dk) dk.onclick = () => answer(c, -1, dk);
    const goNext = () => { if (c.timeUp || (c.mode === "boss" && c.bossHp <= 0)) return finish(c); c.idx++; c.picked = null; c.doubt = false; c.hit = false; AA.router.refresh(); };
    const nx = u.$("#nextq"); if (nx) { nx.focus({ preventScroll: true }); nx.onclick = goNext; AA.gest.swipe(u.$("#qc"), { left: goNext }); }
  }

  function answer(c, ci, btn) {
    const it = c.items[c.idx], q = it.q; if (c.picked != null) return;
    c.picked = ci; const ok = ci === q.a, S = AA.S;
    c.answers.push({ q, picked: ci, ok, player: c.turn, doubt: c.doubt });
    if (it.inp && it.typed != null && ci >= 0) c.answers[c.answers.length - 1].typed = it.typed;
    if (q.type === "order" && it.seq) c.answers[c.answers.length - 1].seq = ci < 0 ? [] : it.seq.slice();
    if (c.mode === "boss") { c.hit = ok; if (ok) c.bossHp = Math.max(0, c.bossHp - 1); }
    if (c.mode !== "duel") {
      const prev = G.qPrev(q);
      G.record(q, ok, c.doubt, ci < 0 ? null : ci);
      const wasErr = !!S.errors[q.id];
      if (!String(q.id).startsWith("tab-")) { if (ok) delete S.errors[q.id]; else S.errors[q.id] = (S.errors[q.id] || 0) + 1; }
      if (ok) {
        c.combo++; c.maxCombo = Math.max(c.maxCombo, c.combo); S.bestCombo = Math.max(S.bestCombo, c.combo);
        let gain = G.answerXp(q, prev, c);
        if (c.mode === "errors" && wasErr) { gain += 5; S.rescued++; }
        /* Brevet blanc : pas de « +XP » à l'écran, il trahirait la bonne réponse. */
        c.xp += gain; G.addXp(gain, c.mode === "exam" ? null : btn);
      }
    } else if (ok) { c.combo++; }
    /* 2.6 : son et image disent toujours la même chose. Au brevet blanc, ni l'un
       ni l'autre ne révèle la réponse (son neutre plus bas) ; ailleurs, le verdict
       s'affiche en même temps que le son, même quand on passe tout de suite à la suite. */
    if (ok) {
      if (c.mode !== "exam") {
        fx.sfx.ok(); fx.buzz(15); fx.burstAt(btn, 18, "rgba(61,220,151,.85)");
        if (fx.dive && fx.dive.ok) fx.dive.ok(btn, c);
        if (c.combo > 1 && !NOFB(c.mode)) { if (fx.dive && fx.dive.combo) fx.dive.combo(c); else if (c.combo % 5 === 0) fx.toast(t("toast.combo", { n: c.combo }), t("toast.comboS"), "bolt"); }
      }
    } else {
      c.combo = 0; if (c.mode !== "exam") { if (ci < 0) fx.sfx.flip(); else { fx.sfx.bad(); fx.buzz([40, 40, 40]); if (fx.dive && fx.dive.bad) fx.dive.bad(c); } }
      if (c.air != null) c.air = Math.max(0, c.air - (c.airLoss || 50));
      if (c.mode === "apnee") { c.time = Math.max(0, c.time - 5); fx.float("−5 s", btn, "var(--bad)"); }
    }
    AA.store.save(); G.checkBadges();
    if (NOFB(c.mode)) {
      if (c.mode === "exam") fx.sfx.flip();
      c.idx++; c.picked = null;
      if (c.mode === "duel" && c.idx >= c.items.length) return duelNext(c);
      AA.router.refresh();
      if (!ok && c.mode === "apnee") { const qc = u.$("#qc"); qc && qc.classList.add("shake"); }
      if (c.mode !== "exam" && fx.verdict) fx.verdict(ok, ci < 0);
      return;
    }
    AA.router.refresh();
    const qc = u.$("#qc"); if (qc && ci >= 0) qc.classList.add(ok ? "pop" : "shake");
  }

  /* ----- Fin de session ----- */
  function finish(c) { c.done = true; clearInterval(c.timer); AA.router.refresh(); }

  function result(el, c) {
    const S = AA.S;
    const n = c.mode === "apnee" ? c.answers.length : c.items.length, good = c.answers.filter(a => a.ok).length;
    const pct = Math.round(good / Math.max(n, 1) * 100);
    let head = "", sub = "", extra = "";
    if (c.mode === "pc" && !c.pcSaved) { c.pcSaved = true; S.pcBest = Math.max(S.pcBest || 0, pct); S.pcRuns = (S.pcRuns || 0) + 1; AA.store.save(); }
    if (c.mode === "exam") {
      const score = Math.round(good / n * 20 * 2) / 2;
      const by = {}; c.answers.forEach(a => { const k = a.q.calc || a.q.gen ? "calc" : a.q.m; by[k] = by[k] || [0, 0]; by[k][1]++; if (a.ok) by[k][0]++; });
      c.items.forEach(it => { if (!c.answers.some(a => a.q === it.q)) { const k = it.q.calc || it.q.gen ? "calc" : it.q.m; by[k] = by[k] || [0, 0]; by[k][1]++; } });
      if (!c.saved) { S.exams.push({ date: u.today(), score, full: !!c.full, world: c.world || "n2", by }); c.saved = true; AA.store.save(); G.checkBadges(); }
      head = `<p class="eyebrow">${t(c.full ? "exam.fullLabel" : "exam.quickLabel")}</p><div class="big">${u.num(score, 1)}<span class="muted" style="font-size:.4em"> / 20</span></div>`;
      sub = t(score >= 15 ? "exam.good" : score >= 10 ? "exam.mid" : "exam.low") + (c.answers.length < n ? " " + t("exam.unanswered", { n: n - c.answers.length }) : "");
      extra = AA.examReport ? AA.examReport(c, by, score) : `<div class="tbl"><table><tr><th>${t("exam.part")}</th><th>${t("exam.success")}</th></tr>${C.inWorld(c.world || "n2").filter(m => by[m.id]).map(m => `<tr><td><a href="#/lesson/${m.id}">${u.esc(m.title)}</a></td><td class="mono">${by[m.id][0]} / ${by[m.id][1]}</td></tr>`).join("")}${by.calc ? `<tr><td><b>${t("exam.calcs")}</b></td><td class="mono">${by.calc[0]} / ${by.calc[1]}</td></tr>` : ""}</table></div>`;
    } else if (c.mode === "apnee") {
      const rec = good > S.apnee;
      if (!c.saved) { if (rec) S.apnee = good; const dc = G.dayc(); dc.apnee = Math.max(dc.apnee || 0, good); c.saved = true; AA.store.save(); G.checkBadges(); }
      head = `<p class="eyebrow">${t("mode.apnee")}</p><div class="big">${good}</div><p class="muted">${t("apnee.good", { n: good })}</p>`;
      sub = rec && good ? t("apnee.record") : t("apnee.best", { n: S.apnee });
    } else if (c.mode === "duel") {
      return duelResult(el, c);
    } else if (c.mode === "place") {
      return AA.pathView.placeResult(el, c);
    } else if (c.mode === "boss") {
      return bossResult(el, c);
    } else {
      const st = G.starsFor(pct), air0 = c.air != null && c.air <= 0;
      if (!c.saved) {
        c.saved = true;
        if (c.mode === "module") {
          if (c.wasStale && pct >= 50) { S.keepDone = true; S.keepDay = u.today(); }
          const r = S.themes[c.module] || { best: 0, tries: 0 }; const old = G.starsFor(r.best);
          r.best = Math.max(r.best, pct); r.tries++; S.themes[c.module] = r;
          const now = G.starsFor(r.best);
          if (now > old) { const b = (now - old) * 25; c.xp += b; G.addXp(b); c.newStars = now; }
          /* Série terminée avec au moins 60 % : bonus une fois par cours et par jour (pas de farm). */
          if (!air0 && pct >= 60) { S.modDay = S.modDay || {}; if (S.modDay[c.module] !== u.today()) { S.modDay[c.module] = u.today(); c.xp += 15; G.addXp(15); } }
        }
        if (c.mode === "stale" && pct >= 50) { S.keepDone = true; S.keepDay = u.today(); }
        if (c.mode === "daily") { if (S.daily[u.today()] == null) { c.xp += 30; G.addXp(30); } S.daily[u.today()] = pct; }
        if (c.mode === "five" && c.answers.length >= 4) { S.five = (S.five || 0) + 1; const dc = G.dayc(); dc.five = (dc.five || 0) + 1; if (dc.five === 1) { c.xp += 15; G.addXp(15); } }
        AA.store.save(); G.checkBadges();
      }
      head = `<p class="eyebrow">${air0 ? t("result.air0") : t("result.done", { title: c.title || "" })}</p>
        ${c.mode === "module" ? `<div class="rstars">${[1, 2, 3].map(k => AA.star(k <= st).replace("<svg", `<svg class="in" style="animation-delay:${k * .18}s"`)).join("")}</div>` : ""}
        <div class="big">${pct}<span class="muted" style="font-size:.4em"> %</span></div>`;
      sub = t("result.score", { good, n }) + " " + (c.mode !== "module" ? "" : air0 ? t("result.air0Tip") : st >= 3 ? t("result.s3") : st >= 1 ? t("result.s1") : t("result.s0"));
      if (st >= 2) setTimeout(() => fx.burst(innerWidth / 2, innerHeight * .35, 50, "rgba(255,200,87,.9)"), 200);
      if (st >= 1) fx.sfx.up();
    }
    if (c.onResult) { try { extra += c.onResult(c, good, n) || ""; } catch (e) {} }
    const m = c.module && C.byId[c.module];
    el.innerHTML = `<div class="topclose"><button class="closebtn" id="rclose" aria-label="${t("nav.back")}">${AA.icon("close")}</button></div>
      <section class="card result stack-lg">${head}<p>${sub}</p>
      <div class="row" style="justify-content:center"><span class="chip gold">${AA.icon("bolt")} +${c.xp} XP</span>${c.maxCombo > 1 ? `<span class="chip warn">${t("result.combo", { n: c.maxCombo })}</span>` : ""}</div>
      ${extra}
      <div class="stack"><button class="btn block" id="again">${AA.icon("refresh")} ${t(c.mode === "module" ? "result.redive" : "result.again")}</button>
      ${m ? `<a class="btn ghost block" href="#/lesson/${m.id}">${AA.icon("book")} ${t("result.reread")}</a>` : ""}
      <a class="btn ghost block" href="#/${c.mode === "module" ? "map/" + (m ? m.world : "") : c.back || "home"}">${t("result.continue")}</a></div></section>
      ${c.answers.length ? `<div class="section-title"><h3>${t("result.review")}</h3><span class="muted small">${t("result.reviewHint")}</span></div>
      <div class="review">${c.answers.filter(a => !a.card).map(a => `<div class="rv ${a.ok ? "ok" : ""}"><b>${u.esc(a.q.q)}</b>
        <span class="small">${a.ok ? t("result.yours") + " " + Q.yours(a) + " ✓" : (a.picked < 0 ? t("quiz.dkYours") : t("result.yours") + " " + Q.yours(a)) + "<br>" + t("quiz.answer") + " <b>" + u.esc(a.q.c[a.q.a]) + "</b>"}</span>
        <p class="small muted" style="margin:6px 0 0">${u.esc(a.q.e)}</p>${!a.ok && a.q.m && C.byId[a.q.m] ? `<div class="row rv-acts"><a class="small" href="#/lesson/${a.q.m}">${t("result.toLesson", { title: u.esc(C.byId[a.q.m].title) })}</a>${C.qById[a.q.id] && !a.q.steps ? `<button class="btn ghost sm" data-expq="${a.q.id}" data-pk="${a.picked}">${AA.icon("play")} ${t("exp.btn")}</button>` : ""}</div>` : ""}</div>`).join("")}</div>` : ""}`;
    u.$("#again").onclick = () => Q.restart(c);
    u.$("#rclose").onclick = () => AA.router.go(c.back || "home");
  }

  /* ----- Boss ----- */
  function bossResult(el, c) {
    const S = AA.S, w = C.worldById[c.world], b = w.boss, won = c.bossHp <= 0, good = c.answers.filter(a => a.ok).length;
    const pct = Math.round(good / Math.max(1, c.answers.length) * 100);
    if (!c.saved) {
      c.saved = true; const r = S.boss[c.world] || { best: 0, tries: 0, won: "" };
      r.tries++; r.best = Math.max(r.best, pct); const first = won && !r.won; if (won && !r.won) r.won = u.today(); S.boss[c.world] = r;
      if (first) { c.xp += 150; G.addXp(150); } else if (won) { c.xp += 30; G.addXp(30); }
      AA.store.save(); G.checkBadges(); c.first = first;
    }
    if (won) { fx.sfx.up(); setTimeout(() => fx.burst(innerWidth / 2, innerHeight * .35, 70, "rgba(255,200,87,.9)"), 200); } else fx.sfx.bad();
    const next = C.worlds.find(x => x.unlock && x.unlock.world === c.world && x.unlock.boss);
    el.innerHTML = `<div class="topclose"><button class="closebtn" id="rclose" aria-label="${t("nav.back")}">${AA.icon("close")}</button></div>
      <section class="card result stack-lg boss-result ${won ? "won" : "lost"}" style="--wc:var(${w.color})">
        <div class="bossart big">${AA.creature(b.creature, null, won ? "boss-cr calm" : "boss-cr")}</div>
        <p class="eyebrow">${won ? t("boss.won") : t("boss.lost")}</p><h2>${won ? u.esc(b.win) : t("boss.lostS", { n: c.bossHp })}</h2>
        <div class="row" style="justify-content:center"><span class="chip">${t("result.score", { good, n: c.answers.length })}</span><span class="chip gold">${AA.icon("bolt")} +${c.xp} XP</span></div>
        ${won && c.first && next ? `<a class="btn gold block" href="#/map/${next.id}">${AA.icon("map")} ${t("boss.toWorld", { world: u.esc(next.short) })}</a>` : ""}
        <div class="stack"><button class="btn ${won ? "ghost" : ""} block" id="again">${AA.icon("refresh")} ${t("boss.retry")}</button>
        ${won ? "" : `<a class="btn ghost block" href="#/mistakes">${AA.icon("brain")} ${t("boss.study")}</a>`}</div></section>
      ${c.answers.some(a => !a.ok) ? `<div class="section-title"><h3>${t("boss.toReview")}</h3></div><div class="review">${c.answers.filter(a => !a.ok).map(a => `<div class="rv"><b>${u.esc(a.q.q)}</b><span class="small">${t("quiz.answer")} <b>${u.esc(a.q.c[a.q.a])}</b></span><p class="small muted" style="margin:6px 0 0">${u.esc(a.q.e)}</p></div>`).join("")}</div>` : ""}`;
    u.$("#again").onclick = () => Q.boss(c.world);
    u.$("#rclose").onclick = () => AA.router.go("map/" + c.world);
  }

  /* ----- Duel ----- */
  function duelNext(c) {
    const good = c.answers.filter(a => a.player === c.turn && a.ok).length;
    c.scores[c.turn] = good; c.times[c.turn] = Math.round((Date.now() - c.t0) / 1000);
    if (c.turn === 0) {
      const el = u.$("#view");
      el.innerHTML = `<section class="card result stack-lg"><p class="eyebrow">${t("mode.duel")}</p><h2>${t("duel.done", { name: u.esc(c.players[0]) })}</h2><p>${t("duel.pass", { name: u.esc(c.players[1]) })}</p><button class="btn block" id="go2">${t("duel.go", { name: u.esc(c.players[1]) })}</button></section>`;
      u.$("#go2").onclick = () => { c.turn = 1; c.idx = 0; c.picked = null; c.combo = 0; c.t0 = Date.now(); c.items = c.qs.map(q => ({ q, order: u.shuffle(q.c.map((_, i) => i)) })); AA.router.refresh(); };
      return;
    }
    AA.S.duels++; AA.store.save(); G.checkBadges();
    c.done = true; AA.router.refresh();
  }
  function duelResult(el, c) {
    const [a, b] = c.scores, [ta, tb] = c.times; const w = a > b ? 0 : b > a ? 1 : ta <= tb ? 0 : 1;
    fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 2, 50, "rgba(255,200,87,.9)");
    el.innerHTML = `<section class="card result stack-lg"><p class="eyebrow">${t("duel.result")}</p><h1 style="color:var(--gold)">${t("duel.wins", { name: u.esc(c.players[w]) })}</h1>
      <div class="stats" style="grid-template-columns:1fr 1fr">${[0, 1].map(i => `<div class="stat"><b>${c.scores[i]}/${c.qs.length}</b><span>${u.esc(c.players[i])} · ${c.times[i]} s</span></div>`).join("")}</div>
      <div class="stack"><a class="btn block" href="#/club">${t("duel.again")}</a><button class="btn ghost block" id="cor">${t("duel.correction")}</button></div><div id="corr" class="review"></div></section>`;
    u.$("#cor").onclick = () => { u.$("#corr").innerHTML = c.qs.map(q => `<div class="rv ok"><b>${u.esc(q.q)}</b><span class="small">${t("quiz.answer")} <b>${u.esc(q.c[q.a])}</b></span><p class="small muted" style="margin:6px 0 0">${u.esc(q.e)}</p></div>`).join(""); };
  }

  /* Clavier : A-D pour répondre, Entrée pour continuer. */
  document.addEventListener("keydown", e => {
    if (AA.router.name !== "quiz" || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    const i = "ABCD".indexOf(e.key.toUpperCase());
    if (i >= 0 && AA.ctx.picked == null) { const b = u.$$(".choice")[i]; if (b) b.click(); }
    else if (e.key === "Enter") { const nx = u.$("#nextq"); if (nx) { e.preventDefault(); nx.click(); } }
  });
})();
