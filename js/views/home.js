/* =====================================================================
   Abysse Academy · premier lancement et accueil du jour
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx;

  /* ---------- Premier lancement ---------- */
  AA.view("welcome", {
    immersive: true, depth: 0,
    guard: () => !AA.S.profile.onboarded, fallback: "home",
    render(el) {
      const S = AA.S, P = S.profile;
      const o = AA.ctx.onb || (AA.ctx.onb = { step: 0, name: P.name, goal: "", daily: P.dailyGoal, theme: P.theme, exam: P.examDate, lv: P.level || "none", rifap: false, nitrox: false, dives: P.dives || 0, place: true, modes: null, key: "" });
      const drv = AA.sync.possible() && !!AA.sync.clientId() && !AA.sync.linked();
      const steps = drv ? 8 : 7, last = steps - 1, dots = `<div class="dots" aria-hidden="true">${Array.from({ length: steps }, (_, i) => `<i class="${i === o.step ? "on" : ""}"></i>`).join("")}</div>`;
      const nav = (label, extra) => `<div class="stack">${dots}<button class="btn block" id="onext">${label} ${AA.icon("next")}</button>${extra || ""}</div>`;
      const PV = AA.pathView, PA = AA.path;
      /* Modes conseillés recalculés seulement si le niveau déclaré change. */
      const key = [o.lv, o.rifap, o.nitrox].join("|");
      if (o.key !== key) { const d = PA.defaults(o.lv, o); o.modes = d.modes; o.cov = d.cov; o.goal = d.goal; o.key = key; }
      let h = "";
      if (o.step === 0) {
        const mods = Object.keys(S.themes).length;
        h = `<div class="logo-big">${AA.logo()}</div><div><p class="eyebrow">${t("onb.eyebrow")}</p><h1>${t("app.name")}</h1><p class="muted">${t("onb.tagline")}</p></div>
          ${P.imported ? `<div class="card soft"><b>${t("onb.importedT")}</b><p class="muted small" style="margin:4px 0 0">${t("onb.importedS", { xp: S.xp, n: mods })}</p></div>` : ""}
          <ul class="onb-points">${["onb.p1", "onb.p2", "onb.p3"].map((k, i) => `<li>${AA.icon(["book", "sparkle", "refresh"][i])}<span>${t(k)}</span></li>`).join("")}</ul>
          ${nav(t("onb.start"), `<a class="linkbtn" href="#/backup">${AA.icon("transfer")} ${t("onb.have")}</a>`)}`;
      } else if (o.step === 1) {
        h = `<div><p class="eyebrow">1 / ${last}</p><h1>${t("onb.nameQ")}</h1><p class="muted">${t("onb.nameS")}</p></div>
          <div class="field"><label for="oname" class="sr">${t("onb.nameQ")}</label><input class="input center" id="oname" maxlength="24" autocomplete="given-name" placeholder="${t("onb.namePh")}" value="${u.esc(o.name)}"></div>${nav(t("common.next"))}`;
      } else if (o.step === 2) {
        h = `<div><p class="eyebrow">2 / ${last}</p><h1>${t("onb.levelQ")}</h1><p class="muted">${t("onb.levelS")}</p></div>
          ${PV.levelCards(o.lv)}<div class="card soft stack" style="gap:0;text-align:left">${PV.extras(o)}</div>${nav(t("common.next"))}`;
      } else if (o.step === 3) {
        h = `<div><p class="eyebrow">3 / ${last}</p><h1>${t("onb.divesQ")}</h1><p class="muted">${t("onb.divesS")}</p></div>
          ${PV.divesSeg(o.dives)}<p class="small muted">${t(o.dives >= 100 || ["n3", "n4", "e1", "e2"].includes(o.lv) ? "path.expertOn" : "path.expertOff")}</p>${nav(t("common.next"))}`;
      } else if (o.step === 4) {
        const ws = C.worlds.filter(w => !w.soon && C.inWorld(w.id).length);
        h = `<div><p class="eyebrow">4 / ${last}</p><h1>${t("onb.pathQ")}</h1><p class="muted">${t("onb.pathS")}</p></div>
          <div class="field"><label>${t("onb.goalQ")}</label><div class="seg">${ws.map(w => `<button data-goal="${w.id}" aria-pressed="${o.goal === w.id}">${u.esc(w.short)}</button>`).join("")}</div></div>
          <div class="pmlist">${ws.map(w => `<div class="pmrow" style="--wc:var(${w.color})"><span class="ic">${AA.icon(w.icon)}</span><b>${u.esc(w.short)}</b><div class="seg">${["learn", "review", "skip"].map(m => `<button data-om="${m}" data-w="${w.id}" aria-pressed="${o.modes[w.id] === m}" aria-label="${u.esc(w.short)} : ${t("path.m." + m)}">${t("path.m." + m)}</button>`).join("")}</div></div>`).join("")}</div>
          <p class="xs muted" style="margin:0">${t("onb.pathHint")}</p>
          <label class="setting"><span class="grow"><b>${t("onb.placeQ")}</b><span>${t("onb.placeS")}</span></span><span class="switch"><input type="checkbox" id="oplace" ${o.place ? "checked" : ""}><i></i></span></label>
          <div class="field"><label for="oexam">${t("onb.examQ")}</label><input class="input" type="date" id="oexam" value="${u.esc(o.exam)}"></div>${nav(t("common.next"))}`;
      } else if (o.step === 5) {
        h = `<div><p class="eyebrow">5 / ${last}</p><h1>${t("onb.dailyQ")}</h1><p class="muted">${t("onb.dailyS")}</p></div>
          <div class="choicecards">${[[10, "relax", "wave"], [20, "regular", "target"], [40, "intense", "flame"]].map(([n, k, ic]) => `<button data-daily="${n}" aria-pressed="${o.daily === n}"><span class="ic">${AA.icon(ic)}</span><span><b>${t("onb.d." + k)}</b><span>${t("onb.dailyN", { n })}</span></span></button>`).join("")}</div>${nav(t("common.next"))}`;
      } else if (o.step === 6) {
        h = `<div><p class="eyebrow">6 / ${last}</p><h1>${t("onb.themeQ")}</h1><p class="muted">${t("onb.themeS")}</p></div>
          ${swatches(o.theme)}${nav(drv ? t("common.next") : t("onb.go"))}`;
      } else {
        h = `<div><p class="eyebrow">7 / ${last}</p><div class="drive-hero">${AA.icon("save")}</div><h1>${t("dr.onbT")}</h1><p class="muted">${t("dr.onbS")}</p></div>
          <ul class="onb-points">${["dr.p1", "dr.p2", "dr.p3"].map((k, i) => `<li>${AA.icon(["check", "transfer", "lock"][i])}<span>${t(k)}</span></li>`).join("")}</ul>
          <div class="stack">${dots}<button class="btn block" id="odrive">${AA.icon("transfer")} ${t("dr.link")}</button>
          <button class="btn ghost block" id="onext">${t("dr.later")}</button><p class="xs muted center" style="margin:0">${t("dr.laterS")}</p></div>`;
      }
      el.innerHTML = `<section class="onb">${h}${o.step ? `<button class="linkbtn" id="oback">${t("nav.back")}</button>` : ""}</section>`;
      const save = () => { const n = u.$("#oname"); if (n) o.name = n.value.trim(); const e = u.$("#oexam"); if (e) o.exam = e.value; const pl = u.$("#oplace"); if (pl) o.place = pl.checked; };
      u.$$("[data-lv]", el).forEach(b => b.onclick = () => { o.lv = b.dataset.lv; fx.sfx.tap(); AA.router.refresh(); });
      AA.pathView.wireExtras(o, () => AA.router.refresh());
      u.$$("[data-dives]", el).forEach(b => b.onclick = () => { o.dives = +b.dataset.dives; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-om]", el).forEach(b => b.onclick = () => { save(); o.modes[b.dataset.w] = b.dataset.om; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-goal]", el).forEach(b => b.onclick = () => { save(); o.goal = b.dataset.goal; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-daily]", el).forEach(b => b.onclick = () => { o.daily = +b.dataset.daily; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-theme]", el).forEach(b => b.onclick = () => { o.theme = b.dataset.theme; AA.S.profile.theme = o.theme; AA.ui.applyTheme(); fx.sfx.tap(); AA.router.refresh(); });
      const ob = u.$("#oback"); if (ob) ob.onclick = () => { save(); o.step--; AA.router.refresh(); };
      const n = u.$("#oname"); if (n) { n.focus(); n.onkeydown = e => { if (e.key === "Enter") u.$("#onext").click(); }; }
      u.$("#onext").onclick = () => {
        save(); fx.sfx.tap();
        if (o.step < last) { o.step++; AA.router.refresh(); return; }
        finish();
        if (drv) { AA.S.profile.driveNag = u.addDays(3); AA.S.profile.driveNagN = 1; AA.store.save(true); }
      };
      const finish = () => {
        const S2 = AA.S; S2.certs = S2.certs || {}; S2.path = Object.assign({}, o.modes);
        (o.cov || []).forEach(w => { if (!S2.certs[w]) S2.certs[w] = u.today(); });
        Object.assign(S2.profile, { name: o.name, goal: o.goal, dailyGoal: o.daily, theme: o.theme, examDate: o.exam, level: o.lv, dives: o.dives, placeAsk: !!o.place, onboarded: true });
        AA.store.save(true); fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 2, 50, "rgba(62,230,216,.8)");
        AA.router.go("home", {}, true);
      };
      const od = u.$("#odrive"); if (od) od.onclick = () => { finish(); AA.sync.connect().then(ok => fx.toast(ok ? t("dr.okT") : t("dr.failT"), ok ? t("dr.okS") : t("dr.failS"), ok ? "check" : "info")); };
    }
  });
  const swatches = cur => `<div class="swatches" role="group" aria-label="${t("set.theme")}">${AA.THEMES.map(th => `<button class="swatch" data-theme="${th.id}" aria-pressed="${cur === th.id}"><i style="background:linear-gradient(135deg,${th.preview[0]} 0 50%,${th.preview[1]} 50% 75%,${th.preview[2]} 75%)"></i>${t("theme." + th.id)}</button>`).join("")}</div>`;
  AA.ui.swatches = swatches;

  /* Ordre des choix stable dans la journée, mais mélangé. */
  const qodOrder = q => { const r = u.seeded(u.seedOf(u.today() + q.id)); return q.c.map((_, i) => i).map(i => [r(), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]); };
  /* ---------- Conseil : lier Google Drive (jamais obligatoire) ---------- */
  const driveCard = () => {
    const P = AA.S.profile, sy = AA.sync, today = u.today();
    if (sy.linked() || (P.driveNag && P.driveNag > today)) return "";
    const can = sy.possible() && !!sy.clientId();
    return `<section class="card drive-card" id="drivecard"><div class="drive-ic">${AA.icon("save")}</div><div class="stack" style="gap:6px">
      <b class="h4">${t("dr.cardT")}</b><p class="small" style="margin:0">${can ? t("dr.cardS", { xp: AA.S.xp }) : t("dr.cardArt")}</p>
      <div class="row">${can ? `<button class="btn sm" id="drlink">${AA.icon("transfer")} ${t("dr.link")}</button>` : `<a class="btn sm" href="#/backup">${AA.icon("save")} ${t("dr.save")}</a>`}<button class="btn ghost sm" id="drlater">${t("dr.later")}</button></div></div></section>`;
  };
  const wireDrive = () => {
    const l = u.$("#drlink"), z = u.$("#drlater");
    if (l) l.onclick = () => { l.disabled = true; AA.sync.connect().then(ok => { fx.toast(ok ? t("dr.okT") : t("dr.failT"), ok ? t("dr.okS") : t("dr.failS"), ok ? "check" : "info"); AA.router.refresh(); }); };
    if (z) z.onclick = () => {
      const P = AA.S.profile, n = (P.driveNagN || 0) + 1, days = n <= 1 ? 3 : 7;
      P.driveNag = u.addDays(days); P.driveNagN = n; AA.store.save();
      fx.toast(t("dr.snoozeT"), t("dr.snoozeS", { n: days }), "calendar");
      const c = u.$("#drivecard"); if (c) c.remove();
    };
  };

  /* ---------- Accueil ---------- */
  AA.view("home", {
    tab: "home", depth: 0,
    render(el) {
      const S = AA.S, P = S.profile, dc = G.dayc(), goal = P.dailyGoal || 20;
      const done = dc.ans + dc.flash, dailyDone = S.daily[u.today()] != null;
      const hr = new Date().getHours(), hello = t(hr < 5 ? "home.night" : hr < 18 ? "home.hello" : "home.evening", { name: u.esc(P.name || t("home.diver")) });
      const dx = G.daysToExam(), st = G.streak();
      const line = dx != null && dx >= 0 ? t("home.examIn", { n: dx }) : st ? t("home.streak", { n: st }) : t("home.first");
      const next = G.nextModule(), w = next && C.worldById[next.world];
      const due = G.cardsDue().length, errs = Object.keys(S.errors).length, best = S.exams.length ? Math.max(...S.exams.map(e => e.score)) : null;
      const stale = G.staleList();
      const ns = G.nextStep();
      const qod = G.qod();
      el.innerHTML = `
        <header class="hello has-ava"><a class="ava-link" href="#/profile" aria-label="${t("tab.profile")}">${AA.avatar.mine("md")}</a><div><h1>${hello}</h1><p>${line}</p></div></header>
        ${driveCard()}${AA.pathView.homeCard()}${AA.ui.intro("daily")}
        <div class="home-grid"><div class="col-main">
        <section class="card today" style="margin-top:var(--sp-5)">
          ${AA.ui.ring(done / goal, Math.min(done, 999), "/ " + goal, done >= goal)}
          <div class="stack"><div><p class="eyebrow">${t("home.goal")}</p><b class="h4">${done >= goal ? t("home.goalDone") : t("home.goalLeft", { n: goal - done })}</b></div>
            <button class="btn ${dailyDone ? "ghost" : ""} block" id="daily">${AA.icon(dailyDone ? "refresh" : "play")} ${dailyDone ? t("home.dailyAgain") : t("home.daily")}</button>
            <span class="small muted">${t("home.dailyHint")} ${AA.helpBtn("daily")}</span></div>
        </section>
        <button class="five-cta" id="five"><span class="five-ic">${AA.icon("timer")}<b>5</b></span><span class="grow"><b>${t("home.fiveT")}</b><span class="small">${t("home.fiveS")}</span></span>${AA.icon("play")}</button>
        ${next ? `<div class="section-title"><h3>${t("home.continue")}</h3><a class="small" href="#/map/${next.world}">${t("home.seeMap")}</a></div>
        <a class="continue" href="#/lesson/${next.id}" style="--wc:var(${w.color})"><span class="orb">${AA.icon(next.icon)}</span><span><span class="eyebrow">${u.esc(w.short)} · ${u.esc(next.depth)}</span><b>${u.esc(next.title)}</b><span class="small muted">${u.esc(next.sub)}</span></span><span class="go">${AA.icon("next")}</span></a>` : ""}
        ${stale.length ? `<button class="card stalebox" id="stale"><span class="medal">${AA.icon("refresh")}</span><span><b>${t("home.staleT", { n: stale.length })}</b><span class="small muted">${stale.slice(0, 3).map(m => u.esc(m.title)).join(" · ")}</span></span><span class="chip warn">+XP</span></button>` : ""}
        <div class="section-title"><h3>${t("home.quick")}</h3><button class="linkbtn small" data-help="flash">${t("home.whatFlash")}</button></div>
        <div class="quicks">
          <a class="quick" href="#/flash" style="--c:var(--primary)">${AA.icon("cards")}<b>${t("mode.flash")}</b><span>${t("home.due", { n: due })}</span></a>
          <button class="quick" id="rescue" style="--c:var(--accent)">${AA.icon("buoy")}<b>${t("mode.errors")}</b><span>${t("home.errs", { n: errs })}</span></button>
          <a class="quick" href="#/train" style="--c:var(--gold)">${AA.icon("exam")}<b>${t("home.exam")}</b><span>${best != null ? t("home.best", { s: u.num(best, 1) }) : t("home.noExam")}</span></a>
        </div>
        <div class="section-title"><h3>${t("home.explore")}</h3></div>
        <div class="explore">
          <a class="xcard" href="#/story" style="--c:var(--world-e2)">${AA.icon("scroll")}<b>${t("story.title")}</b><span>${t("home.storyS")}</span></a>
          <a class="xcard" href="#/aquarium" style="--c:var(--primary)">${AA.icon("fish")}<b>${t("aqua.title")}</b><span>${t("home.aquaS", { n: Object.keys(S.aqua).length, tot: C.creatures.length })}</span></a>
          <a class="xcard" href="#/mistakes" style="--c:var(--accent)">${AA.icon("brain")}<b>${t("mist.short")}</b><span>${t("home.mistS")}</span></a>
          <a class="xcard" href="#/glossary" style="--c:var(--gold)">${AA.icon("book")}<b>${t("gloss.title")}</b><span>${t("home.glossS", { n: C.glossary.length })}</span></a>
        </div>
        </div><aside class="col-side">
        <div class="section-title"><h3>${t("home.quests")} ${AA.helpBtn("quests")}</h3><a class="small" href="#/quests">${t("home.allQuests")}</a></div>
        <section class="card">${G.todayQuests().map(q => { const [v, n] = G.cond(q.test), ok = v >= n, cl = S.claimed[u.today() + q.id], go = G.questGo(q.test);
          return ok ? `<a class="dq done dq-go" href="#/quests"><span class="ck">${AA.icon("check")}</span><span><b class="small">${u.esc(q.t)}</b>${AA.ui.bar(1)}</span>${cl ? `<span class="chip ok">✓</span>` : `<span class="chip gold">${t("home.claim")}</span>`}</a>`
            : `<button class="dq dq-go" data-go="${u.esc(go || "")}"><span class="ck"></span><span><b class="small">${u.esc(q.t)}</b>${AA.ui.bar(v / n)}</span><span class="dq-do">${t("home.doIt")} ${AA.icon("next")}</span></button>`; }).join("")}
          ${ns ? `<a class="questline" href="#/quests"><span class="eyebrow">${t("home.questNow")}</span><b>${u.esc(ns.st.t)}</b><span class="small muted">${u.esc(ns.c.title)}</span></a>` : ""}</section>
        ${qod ? `<div class="section-title"><h3>${t("home.qod")} ${AA.helpBtn("qod")}</h3><span class="chip">${u.esc(C.moduleTitle(qod.m))}</span></div>
        <section class="card" id="qod"><p class="qtext" style="margin-bottom:var(--sp-4)">${u.esc(qod.q)}</p><div class="choices">${qodOrder(qod).map((i, k) => `<button class="choice" data-qi="${i}"><span class="k">${"ABCD"[k]}</span><span>${u.esc(qod.c[i])}</span><span class="mk"></span></button>`).join("")}</div><div id="qodx"></div></section>` : ""}
        </aside></div>
      `;
      wireDrive(); AA.pathView.wireHome(); AA.avatar.checkEvolution();
      u.$("#daily").onclick = () => AA.quiz.daily();
      u.$$("[data-go]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.goTo(b.dataset.go || "daily"); });
      u.$("#five").onclick = () => { fx.sfx.tap(); AA.quiz.five(); };
      u.$("#rescue").onclick = () => AA.quiz.errors();
      const sb = u.$("#stale"); if (sb) sb.onclick = () => AA.quiz.stale();
      const showQod = (i, b, fresh) => {
        const ok = i === qod.a;
        u.$$("#qod .choice").forEach(x => { x.disabled = true; const k = +x.dataset.qi; if (k === qod.a) { x.classList.add("good"); u.$(".mk", x).innerHTML = AA.icon("check"); } else if (k === i) { x.classList.add("wrong"); u.$(".mk", x).innerHTML = AA.icon("x"); } });
        u.$("#qodx").innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}"><h4>${ok ? t("home.qodOk") : t("quiz.bad")}</h4><p>${u.esc(qod.e)}</p><a class="small" href="#/lesson/${qod.m}">${t("result.toLesson", { title: u.esc(C.moduleTitle(qod.m)) })}</a></div>`;
        if (!fresh) { u.$("#qod").classList.add("answered"); return; }
        S.qodAns = { d: u.today(), id: qod.id, pick: i, ok };
        G.record(qod, ok);
        if (ok) { fx.sfx.ok(); fx.burstAt(b, 18, "rgba(61,220,151,.85)"); if (S.qod !== u.today()) { S.qod = u.today(); G.addXp(15, b); } } else { fx.sfx.bad(); fx.buzz([40, 40, 40]); }
        AA.store.save(true); G.checkBadges();
      };
      u.$$("#qod .choice").forEach(b => b.onclick = () => showQod(+b.dataset.qi, b, true));
      const QA = S.qodAns; if (qod && QA && QA.d === u.today() && QA.id === qod.id) showQod(QA.pick, null, false);
    }
  });
})();
