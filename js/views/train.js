/* =====================================================================
   Abysse Academy · entraînement et flashcards
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;

  AA.view("train", {
    tab: "train",
    render(el) {
      const S = AA.S, nErr = Object.keys(S.errors).length, due = G.cardsDue().length, best = S.exams.length ? Math.max(...S.exams.map(e => e.score)) : null;
      const doubts = Object.keys(S.doubt).filter(id => C.qById[id]).length, stale = G.staleList().length;
      el.innerHTML = `${ui.head(t("tab.train"))}
        <p class="muted">${t("train.intro")}</p>${ui.intro("flash")}
        <div class="section-title"><h3>${t("train.daily")}</h3></div>
        <div class="tiles">
          ${ui.tile("daily", "sun", "var(--gold)", t("mode.daily"), t("train.dailyS"), S.daily[u.today()] != null ? [t("train.doneToday"), "ok"] : ["+30 XP", "gold"])}
          ${(() => { const n = AA.game.qDue ? AA.game.qDue().length : 0; return ui.tile("srs", "brain", "var(--world-n3)", t("mode.srs"), t("train.srsS"), n ? [t("srs.dueN", { n }), "pri"] : [t("srs.upShort"), "ok"]); })()}
          ${ui.tile("flash", "cards", "var(--primary)", t("mode.flash"), t("train.flashS"), due ? [t("home.due", { n: due }), "pri"] : null)}
          ${ui.tile("errors", "buoy", "var(--accent)", t("mode.errors"), t("train.errorsS"), nErr ? [String(nErr), "warn"] : null)}
          ${ui.tile("stale", "refresh", "var(--accent)", t("mode.stale"), t("train.staleS"), stale ? [String(stale), "warn"] : null)}
          ${ui.tile("doubt", "doubt", "var(--world-e2)", t("mode.doubt"), t("train.doubtS"), doubts ? [String(doubts), "pri"] : null)}
          ${ui.tile("calcs", "calc", "var(--gold)", t("mode.calcs"), t("train.calcsS"))}
        </div>
        <div class="section-title"><h3>${t("train.play")}</h3></div>
        <div class="tiles">
          ${ui.tile("five", "timer", "var(--primary)", t("mode.five"), t("train.fiveS"), S.five ? [t("train.fiveN", { n: S.five }), "pri"] : null)}
          ${ui.tile("story", "scroll", "var(--world-e2)", t("story.title"), t("train.storyS"), [t("train.storyN", { n: Object.values(S.story).filter(x => x.done).length, tot: C.stories.length }), "pri"])}
          ${ui.tile("mistakes", "brain", "var(--accent)", t("mist.short"), t("train.mistS"))}
          ${ui.tile("boss", "swords", "var(--bad)", t("train.boss"), t("train.bossS"), C.worlds.some(w => w.boss && G.bossOpen(w.id) && !(S.boss[w.id] || {}).won) ? [t("boss.readyShort"), "warn"] : null)}
        </div>
        <div class="section-title"><h3>${t("train.tests")}</h3></div>
        <div class="tiles">
          ${ui.tile("examfull", "exam", "var(--accent)", t("mode.examFull"), t("train.examFullS") + " · " + u.esc(C.worldById[AA.quiz.examWorld()].short), best != null ? [t("home.best", { s: u.num(best, 1) }), "gold"] : null)}
          ${ui.tile("examquick", "exam", "var(--accent)", t("mode.examQuick"), t("train.examQuickS") + " · " + u.esc(C.worldById[AA.quiz.examWorld()].short))}
          ${ui.tile("apnee", "timer", "var(--gold)", t("mode.apnee"), t("train.apneeS"), S.apnee ? [t("train.record", { n: S.apnee }), "gold"] : null)}
          ${ui.tile("duel", "users", "var(--primary)", t("mode.duel"), t("train.duelS"))}
        </div>
        ${S.exams.length ? `<div class="section-title"><h3>${t("train.examHist")}</h3></div><section class="card">${AA.profile.spark()}</section>` : ""}
        <p class="small muted" style="margin-top:var(--sp-5)">${t("train.examNote")} <a href="#/valider">${t("train.examNoteLink")}</a></p>`;
      u.on(el, "click", ".tile", (e, b) => {
        fx.sfx.tap();
        ({
          daily: AA.quiz.daily, srs: () => AA.quiz.srs(), flash: () => AA.router.go("flash"), errors: AA.quiz.errors, stale: () => G.staleList().length ? AA.quiz.stale() : fx.toast(t("train.noStaleT"), t("train.noStaleS"), "refresh"),
          doubt: () => { const qs = Object.keys(AA.S.doubt).map(id => C.qById[id]).filter(Boolean); qs.length ? AA.quiz.start("errors", u.shuffle(qs).slice(0, 10), { title: t("mode.doubt"), back: "train" }) : fx.toast(t("train.noDoubtT"), t("train.noDoubtS"), "doubt"); },
          calcs: () => AA.quiz.calcs(null, 10, t("mode.calcs")),
          five: AA.quiz.five, story: () => AA.router.go("story"), mistakes: () => AA.router.go("mistakes"),
          boss: () => { const w = C.worlds.find(x => x.boss && G.bossOpen(x.id) && !(AA.S.boss[x.id] || {}).won) || C.worlds.find(x => x.boss && G.worldOpen(x)) || C.worlds[0]; AA.router.go("boss/" + w.id); }, examfull: () => AA.quiz.exam(true), examquick: () => AA.quiz.exam(false), apnee: AA.quiz.apnee, duel: () => AA.router.go("club")
        })[b.dataset.t]();
      });
    }
  });

  /* ---------- Flashcards ---------- */
  AA.view("flash", {
    tab: "train", immersive: false,
    render(el, [mid]) {
      const c = AA.ctx.flash && AA.ctx.flash.mid === (mid || "") ? AA.ctx.flash : (AA.ctx.flash = { mid: mid || "", deck: null, i: 0, flipped: false, done: 0, all: false });
      if (!c.deck) {
        let pool = mid ? C.cards.filter(x => x.m === mid) : c.all ? C.cards.filter(x => G.inPlay(x.m)) : G.cardsDue();
        if (mid && !c.all) { const d = u.today(); const due = pool.filter(x => { const s = AA.S.cards[x.id]; return !s || s.due <= d; }); pool = due.length ? due : pool; }
        c.deck = u.shuffle(pool).slice(0, 20); c.i = 0; c.flipped = false;
      }
      const boxes = G.boxes(), card = c.deck[c.i];
      const back = mid ? "lesson/" + mid + "/memo" : "train";
      const head = `${ui.head(mid ? t("flash.of", { title: u.esc(C.moduleTitle(mid)) }) : t("mode.flash"), back)}
        <div class="boxes" aria-label="${t("flash.boxes")}">${boxes.map((n, i) => `<div><b>${n}</b>${i === 0 ? t("flash.new") : t("flash.box", { n: i })}</div>`).join("")}</div>
        <p class="small muted" style="margin:var(--sp-3) 0 var(--sp-5)">${t("flash.how")} ${AA.helpBtn("flash")}</p>`;
      if (!card) {
        el.innerHTML = head + ui.empty("cards", c.done ? t("flash.bravo", { n: c.done }) : t("flash.none"), t("flash.noneS"), `<button class="btn" id="allc">${t("flash.all")}</button>`);
        u.$("#allc").onclick = () => { c.deck = null; c.all = true; c.done = 0; AA.router.refresh(); };
        return;
      }
      el.innerHTML = head + `<p class="center mono small muted">${c.i + 1} / ${c.deck.length}</p>
        <div class="fc-wrap"><button class="fc ${c.flipped ? "flip" : ""}" id="fc" aria-label="${t("flash.flip")}"><div class="face front"><small>${u.esc(C.moduleTitle(card.m))}</small>${u.esc(card.f)}</div><div class="face back"><small>${t("flash.answer")}</small>${u.esc(card.b)}</div></button></div>
        <div class="row" style="justify-content:center;margin-top:var(--sp-5)">${c.flipped ? `<button class="btn ghost" id="no">${AA.icon("refresh")} ${t("flash.again")}</button><button class="btn" id="yes">${AA.icon("check")} ${t("flash.knew")}</button>` : `<button class="btn" id="show">${t("flash.show")}</button>`}</div>`;
      const flip = () => { c.flipped = true; fx.sfx.flip(); AA.router.refresh(); };
      u.$("#fc").onclick = () => { if (!c.flipped) flip(); };
      const sh = u.$("#show"); if (sh) sh.onclick = flip;
      const rate = ok => {
        G.rateCard(card, ok); if (!ok) c.deck.push(card); c.i++; c.flipped = false; if (ok) c.done++;
        AA.store.save(); if (ok) G.addXp(3); G.checkBadges(); AA.router.refresh();
      };
      const y = u.$("#yes"); if (y) { y.onclick = () => { fx.sfx.ok(); fx.buzz(10); rate(true); }; u.$("#no").onclick = () => { fx.sfx.bad(); rate(false); }; }
    }
  });
  document.addEventListener("keydown", e => {
    if (AA.router.name !== "flash" || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === " " || e.key === "Enter") { const s = u.$("#show"); if (s) { e.preventDefault(); s.click(); } }
    if (e.key === "ArrowRight") { const y = u.$("#yes"); y && y.click(); }
    if (e.key === "ArrowLeft") { const n = u.$("#no"); n && n.click(); }
  });
})();
