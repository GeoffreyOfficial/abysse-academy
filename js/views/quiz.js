/* =====================================================================
   Abysse Academy · moteur de quiz (tous les modes) et résultats
   AA.quiz.start(mode, questions, options) lance une session.
   Modes : module, gen, daily, errors, exam, apnee, duel, pc, stale.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx;
  const NOFB = m => m === "exam" || m === "apnee" || m === "duel";
  const Q = (AA.quiz = {});

  Q.start = (mode, qs, opts) => {
    qs = qs.filter(Boolean);
    if (!qs.length) { fx.toast(t("quiz.emptyT"), t("quiz.emptyS"), "info"); return; }
    const ctx = Object.assign({
      mode, items: qs.map(q => ({ q, order: u.shuffle(q.c.map((_, i) => i)) })), idx: 0, answers: [], picked: null,
      combo: 0, maxCombo: 0, xp: 0, doubt: false, t0: Date.now(), back: "home"
    }, opts || {});
    AA.router.go("quiz", ctx);
  };
  /* ----- Lanceurs ----- */
  Q.module = (m, deepOnly) => {
    const pool = deepOnly ? m.quiz.filter(q => q.lvl === 2) : m.quiz;
    Q.start("module", u.shuffle(pool).slice(0, 10), { module: m.id, title: m.title, air: 200, wasStale: G.isStale(m.id), back: "lesson/" + m.id });
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
  Q.exam = full => {
    const wid = "n2", mods = C.inWorld(wid), pick = [];
    mods.forEach(m => pick.push(...u.shuffle(m.quiz.filter(q => q.lvl !== 2)).slice(0, full ? 2 : 1)));
    const all = C.questions.filter(q => q.world === wid && !pick.includes(q));
    const n = full ? 40 : 20, nc = full ? 10 : 4;
    const rest = u.shuffle(all).slice(0, Math.max(0, n - nc - pick.length));
    const calcs = Array.from({ length: nc }, () => G.gen());
    Q.start("exam", u.shuffle(pick.slice(0, n - nc).concat(rest, calcs)), { full, timeLeft: (full ? 45 : 20) * 60, title: t(full ? "mode.examFull" : "mode.examQuick"), back: "train" });
  };
  Q.apnee = () => Q.start("apnee", u.shuffle(C.questions.filter(q => q.world === G.goalWorld() && G.unlocked(q.m))), { time: 60, title: t("mode.apnee"), back: "train" });
  Q.computer = () => Q.start("pc", u.shuffle(C.computer), { title: t("mode.pc"), back: "lab" });
  Q.duel = (a, b) => {
    const qs = u.shuffle(C.questions.filter(q => q.world === "n2" && q.lvl !== 2)).slice(0, 6).concat([G.gen(), G.gen()]);
    Q.start("duel", qs, { players: [a, b], turn: 0, qs, scores: [], times: [], title: t("mode.duel"), back: "club" });
  };
  Q.restart = c => {
    const m = c.mode;
    if (m === "module") Q.module(C.byId[c.module]);
    else if (m === "exam") Q.exam(c.full);
    else if (m === "apnee") Q.apnee();
    else if (m === "daily") Q.daily();
    else if (m === "errors") Q.errors();
    else if (m === "pc") Q.computer();
    else if (m === "stale") Q.stale();
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
    guard: () => AA.ctx && AA.ctx.items,
    render(el) {
      const c = AA.ctx; c.air0 = c.air0 === undefined ? c.air : c.air0;
      if (c.done) return result(el, c);
      if (!c.timer && (c.mode === "exam" || c.mode === "apnee")) startTimers(c);
      draw(el, c);
    },
    leave() { const c = AA.ctx; if (c) { clearInterval(c.timer); c.timer = null; } }
  });

  function hudR(c) {
    let h = "";
    if (c.mode === "exam") h += `<div class="timer" id="tmr" aria-live="off">${u.mmss(c.timeLeft)}</div>`;
    else if (c.mode === "apnee") h += `<div class="timer" id="tmr">${c.time}</div>`;
    else {
      if (c.combo > 1) h += `<div class="combo">×${c.combo}<small>${t("quiz.combo")}</small></div>`;
      if (c.air != null) h += AA.ui.gauge(c.air);
    }
    return h;
  }

  function draw(el, c) {
    const it = c.items[c.idx];
    if (!it || (c.air != null && c.air <= 0 && c.picked == null)) return finish(c);
    const q = it.q, n = c.mode === "apnee" ? null : c.items.length, answered = c.picked != null;
    const okNow = answered && c.picked === q.a;
    const prog = c.mode === "apnee" ? c.time / 60 : (c.idx + (answered ? 1 : 0)) / n;
    const tags = [];
    if (q.m && C.byId[q.m]) tags.push(`<span class="chip">${u.esc(C.byId[q.m].title)}</span>`);
    if (q.calc) tags.push(`<span class="chip gold">${AA.icon("calc")}${t("quiz.calc")}</span>`);
    if (q.lvl === 2) tags.push(`<span class="chip pri">${AA.icon("layers")}${t("lesson.deep")}</span>`);
    if (c.mode === "duel") tags.unshift(`<span class="chip warn">${u.esc(c.players[c.turn])}</span>`);
    if (AA.S.doubt[q.id] && !answered) tags.push(`<span class="chip warn">${t("quiz.wasDoubt")}</span>`);

    el.innerHTML = `<div class="qtop">
        <button class="closebtn" id="qclose" aria-label="${t("quiz.quit")}">${AA.icon("close")}</button>
        <div><div class="qprog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(prog * 100)}"><i style="width:${prog * 100}%"></i></div>
          <div class="qmeta"><span>${u.esc(c.title || "")}</span><span>${n ? (c.idx + 1) + " / " + n : t("quiz.answers", { n: c.answers.length })}</span></div></div>
        <div class="hudr">${hudR(c)}</div></div>
      <div class="qcard" id="qc">
        <div class="qtag">${tags.join("")}</div>
        ${c.mode === "pc" ? AA.lab.computerScreen(q.scr) : ""}
        <h2 class="qtext" id="qtext">${u.esc(q.q)}</h2>
        <div class="choices" role="group" aria-labelledby="qtext">${it.order.map((ci, k) => {
          let cls = ""; if (answered) { if (ci === q.a) cls = "good"; else if (ci === c.picked) cls = "wrong"; }
          const mk = answered && (ci === q.a || ci === c.picked) ? AA.icon(ci === q.a ? "check" : "x") : "";
          return `<button class="choice ${cls}" data-ci="${ci}" ${answered ? "disabled" : ""}><span class="k">${"ABCD"[k]}</span><span>${u.esc(q.c[ci])}</span><span class="mk">${mk}</span></button>`;
        }).join("")}</div>
        ${!answered && !NOFB(c.mode) ? `<div class="qactions"><button class="chip ${c.doubt ? "warn" : ""}" id="doubt" aria-pressed="${c.doubt}">${AA.icon("doubt")}${t("quiz.doubt")}</button></div>` : ""}
        ${answered ? `<div class="feedback ${okNow ? "ok" : "bad"}" role="status"><h4>${okNow ? u.pick(AA.i18n.raw("quiz.okList")) : t("quiz.bad")}</h4>
          ${okNow ? "" : `<p><b>${t("quiz.answer")}</b> ${u.esc(q.c[q.a])}</p>`}<p>${u.esc(q.e)}</p>
          ${c.doubt && okNow ? `<p class="small muted">${t("quiz.doubtNote")}</p>` : ""}</div>
          <div class="qactions"><button class="btn block" id="nextq">${c.idx + 1 >= c.items.length || (c.air != null && c.air <= 0) ? t("quiz.seeResult") : t("quiz.next")} ${AA.icon("next")}</button></div>` : ""}
      </div>`;
    u.$("#qclose").onclick = () => AA.ui.confirm(t("quiz.quitQ"), t("quiz.quitYes"), () => { clearInterval(c.timer); AA.router.go(c.back || "home"); }, c.answers.length === 0);
    u.$$(".choice", el).forEach(b => b.onclick = () => answer(c, +b.dataset.ci, b));
    const d = u.$("#doubt"); if (d) d.onclick = () => { c.doubt = !c.doubt; fx.sfx.tap(); draw(el, c); };
    const nx = u.$("#nextq"); if (nx) { nx.focus({ preventScroll: true }); nx.onclick = () => { c.idx++; c.picked = null; c.doubt = false; AA.router.refresh(); }; }
  }

  function answer(c, ci, btn) {
    const it = c.items[c.idx], q = it.q; if (c.picked != null) return;
    c.picked = ci; const ok = ci === q.a, S = AA.S;
    c.answers.push({ q, picked: ci, ok, player: c.turn, doubt: c.doubt });
    if (c.mode !== "duel") {
      G.record(q, ok, c.doubt);
      const wasErr = !!S.errors[q.id];
      if (!String(q.id).startsWith("tab-")) { if (ok) delete S.errors[q.id]; else S.errors[q.id] = (S.errors[q.id] || 0) + 1; }
      if (ok) {
        c.combo++; c.maxCombo = Math.max(c.maxCombo, c.combo); S.bestCombo = Math.max(S.bestCombo, c.combo);
        let gain = 10 + (c.mode === "exam" ? 0 : Math.min(c.combo - 1, 5) * 2);
        if (c.mode === "errors" && wasErr) { gain += 5; S.rescued++; }
        c.xp += gain; G.addXp(gain, btn);
      }
    } else if (ok) { c.combo++; }
    if (ok) {
      fx.sfx.ok(); fx.buzz(15); fx.burstAt(btn, 18, "rgba(61,220,151,.85)");
      if (c.combo > 1 && c.combo % 5 === 0 && !NOFB(c.mode)) fx.toast(t("toast.combo", { n: c.combo }), t("toast.comboS"), "bolt");
    } else {
      c.combo = 0; if (c.mode !== "exam") { fx.sfx.bad(); fx.buzz([40, 40, 40]); }
      if (c.air != null) c.air = Math.max(0, c.air - 50);
      if (c.mode === "apnee") { c.time = Math.max(0, c.time - 5); fx.float("−5 s", btn, "var(--bad)"); }
    }
    AA.store.save(); G.checkBadges();
    if (NOFB(c.mode)) {
      if (c.mode === "exam") fx.sfx.flip();
      c.idx++; c.picked = null;
      if (c.mode === "duel" && c.idx >= c.items.length) return duelNext(c);
      AA.router.refresh();
      if (!ok && c.mode === "apnee") { const qc = u.$("#qc"); qc && qc.classList.add("shake"); }
      return;
    }
    AA.router.refresh();
    const qc = u.$("#qc"); if (qc) qc.classList.add(ok ? "pop" : "shake");
  }

  /* ----- Fin de session ----- */
  function finish(c) { c.done = true; clearInterval(c.timer); AA.router.refresh(); }

  function result(el, c) {
    const S = AA.S;
    const n = c.mode === "apnee" ? c.answers.length : c.items.length, good = c.answers.filter(a => a.ok).length;
    const pct = Math.round(good / Math.max(n, 1) * 100);
    let head = "", sub = "", extra = "";
    if (c.mode === "exam") {
      const score = Math.round(good / n * 20 * 2) / 2;
      if (!c.saved) { S.exams.push({ date: u.today(), score, full: !!c.full }); c.saved = true; AA.store.save(); G.checkBadges(); }
      head = `<p class="eyebrow">${t(c.full ? "exam.fullLabel" : "exam.quickLabel")}</p><div class="big">${u.num(score, 1)}<span class="muted" style="font-size:.4em"> / 20</span></div>`;
      sub = t(score >= 15 ? "exam.good" : score >= 10 ? "exam.mid" : "exam.low") + (c.answers.length < n ? " " + t("exam.unanswered", { n: n - c.answers.length }) : "");
      const by = {}; c.answers.forEach(a => { const k = a.q.calc ? "calc" : a.q.m; by[k] = by[k] || [0, 0]; by[k][1]++; if (a.ok) by[k][0]++; });
      extra = `<div class="tbl"><table><tr><th>${t("exam.part")}</th><th>${t("exam.success")}</th></tr>${C.inWorld("n2").filter(m => by[m.id]).map(m => `<tr><td><a href="#/lesson/${m.id}">${u.esc(m.title)}</a></td><td class="mono">${by[m.id][0]} / ${by[m.id][1]}</td></tr>`).join("")}${by.calc ? `<tr><td><b>${t("exam.calcs")}</b></td><td class="mono">${by.calc[0]} / ${by.calc[1]}</td></tr>` : ""}</table></div>`;
    } else if (c.mode === "apnee") {
      const rec = good > S.apnee;
      if (!c.saved) { if (rec) S.apnee = good; const dc = G.dayc(); dc.apnee = Math.max(dc.apnee || 0, good); c.saved = true; AA.store.save(); G.checkBadges(); }
      head = `<p class="eyebrow">${t("mode.apnee")}</p><div class="big">${good}</div><p class="muted">${t("apnee.good", { n: good })}</p>`;
      sub = rec && good ? t("apnee.record") : t("apnee.best", { n: S.apnee });
    } else if (c.mode === "duel") {
      return duelResult(el, c);
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
          if (!air0) { c.xp += 20; G.addXp(20); }
        }
        if (c.mode === "stale" && pct >= 50) { S.keepDone = true; S.keepDay = u.today(); }
        if (c.mode === "daily") { if (S.daily[u.today()] == null) { c.xp += 30; G.addXp(30); } S.daily[u.today()] = pct; }
        AA.store.save(); G.checkBadges();
      }
      head = `<p class="eyebrow">${air0 ? t("result.air0") : t("result.done", { title: c.title || "" })}</p>
        ${c.mode === "module" ? `<div class="rstars">${[1, 2, 3].map(k => AA.star(k <= st).replace("<svg", `<svg class="in" style="animation-delay:${k * .18}s"`)).join("")}</div>` : ""}
        <div class="big">${pct}<span class="muted" style="font-size:.4em"> %</span></div>`;
      sub = t("result.score", { good, n }) + " " + (c.mode !== "module" ? "" : air0 ? t("result.air0Tip") : st >= 3 ? t("result.s3") : st >= 1 ? t("result.s1") : t("result.s0"));
      if (st >= 2) setTimeout(() => fx.burst(innerWidth / 2, innerHeight * .35, 50, "rgba(255,200,87,.9)"), 200);
      if (st >= 1) fx.sfx.up();
    }
    const m = c.module && C.byId[c.module];
    el.innerHTML = `<div class="topclose"><button class="closebtn" id="rclose" aria-label="${t("nav.back")}">${AA.icon("close")}</button></div>
      <section class="card result stack-lg">${head}<p>${sub}</p>
      <div class="row" style="justify-content:center"><span class="chip gold">${AA.icon("bolt")} +${c.xp} XP</span>${c.maxCombo > 1 ? `<span class="chip warn">${t("result.combo", { n: c.maxCombo })}</span>` : ""}</div>
      ${extra}
      <div class="stack"><button class="btn block" id="again">${AA.icon("refresh")} ${t(c.mode === "module" ? "result.redive" : "result.again")}</button>
      ${m ? `<a class="btn ghost block" href="#/lesson/${m.id}">${AA.icon("book")} ${t("result.reread")}</a>` : ""}
      <a class="btn ghost block" href="#/${c.mode === "module" ? "map/" + (m ? m.world : "") : c.back || "home"}">${t("result.continue")}</a></div></section>
      ${c.answers.length ? `<div class="section-title"><h3>${t("result.review")}</h3><span class="muted small">${t("result.reviewHint")}</span></div>
      <div class="review">${c.answers.map(a => `<div class="rv ${a.ok ? "ok" : ""}"><b>${u.esc(a.q.q)}</b>
        <span class="small">${a.ok ? t("result.yours") + " " + u.esc(a.q.c[a.picked]) + " ✓" : t("result.yours") + " " + u.esc(a.q.c[a.picked]) + "<br>" + t("quiz.answer") + " <b>" + u.esc(a.q.c[a.q.a]) + "</b>"}</span>
        <p class="small muted" style="margin:6px 0 0">${u.esc(a.q.e)}</p>${!a.ok && a.q.m && C.byId[a.q.m] ? `<a class="small" href="#/lesson/${a.q.m}">${t("result.toLesson", { title: u.esc(C.byId[a.q.m].title) })}</a>` : ""}</div>`).join("")}</div>` : ""}`;
    u.$("#again").onclick = () => Q.restart(c);
    u.$("#rclose").onclick = () => AA.router.go(c.back || "home");
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
