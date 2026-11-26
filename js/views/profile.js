/* =====================================================================
   Abysse Academy · profil, quêtes, club (duel, partage), réglages
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;
  const P = (AA.profile = {});

  P.spark = () => {
    const ex = AA.S.exams.slice(-12); if (!ex.length) return `<p class="muted">${t("prof.noExam")}</p>`;
    const W = 600, H = 120, X = i => 30 + (W - 50) * (ex.length === 1 ? .5 : i / (ex.length - 1)), Y = v => 10 + (H - 30) * (1 - v / 20);
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${t("prof.examChart")}">${[0, 10, 20].map(v => `<line x1="30" x2="${W - 10}" y1="${Y(v)}" y2="${Y(v)}" class="s-line"/><text x="2" y="${Y(v) + 4}" class="d-text">${v}</text>`).join("")}
      <line x1="30" x2="${W - 10}" y1="${Y(15)}" y2="${Y(15)}" class="s-ok" stroke-dasharray="4 4"/>
      <polyline fill="none" class="s-acc" stroke-width="3" vector-effect="non-scaling-stroke" points="${ex.map((e, i) => X(i) + "," + Y(e.score)).join(" ")}"/>${ex.map((e, i) => `<circle cx="${X(i)}" cy="${Y(e.score)}" r="${i === ex.length - 1 ? 6 : 4}" class="${i === ex.length - 1 ? "d-gold" : "d-acc"}"/>`).join("")}</svg>
      <p class="xs muted">${t("prof.examLine")}</p>`;
  };

  AA.view("profile", {
    tab: "profile",
    render(el) {
      const S = AA.S, lv = G.levelOf(S.xp), got = C.badges.filter(b => S.badges[b.id]).length;
      const tot = Object.values(S.stats).reduce((a, v) => [a[0] + v.n, a[1] + v.ok], [0, 0]);
      const weak = G.weakModules(3), claim = G.claimable();
      const name = S.profile.name || t("home.diver");
      el.innerHTML = `
        <section class="profile"><button class="ava-btn" id="avedit" aria-label="${t("ava.change")}">${AA.avatar.mine("lg")}<span class="ava-pen">${AA.icon("edit")}</span></button><div class="stack" style="gap:6px">
          <h1 style="font-size:var(--fs-2xl)">${u.esc(name)}</h1><span class="chip gold" style="justify-self:start">${t("prof.level", { l: lv.l, rank: u.esc(lv.rank) })}</span>
          ${ui.bar(lv.into / lv.need)}<span class="xs muted">${t("prof.toNext", { n: lv.need - lv.into })}</span>
          <span class="xs muted">${t("ava.now", { s: AA.avatar.stage(lv.l) + 1, n: AA.avatar.STAGES.length, name: u.esc(AA.avatar.formName(AA.avatar.get(), lv.l)) })}${AA.avatar.next(lv.l) ? " · " + t("ava.nextAt", { l: AA.avatar.next(lv.l), name: u.esc(AA.avatar.formName(AA.avatar.get(), AA.avatar.next(lv.l))) }) : ""}</span>
          <button class="btn ghost sm" id="avedit2" style="justify-self:start">${AA.icon("edit")} ${t("ava.change")}</button></div></section>
        <div class="stats" style="margin-top:var(--sp-5)">
          <div class="stat"><b>${S.xp}</b><span>XP</span></div>
          <div class="stat"><b>${tot[0] ? Math.round(tot[1] / tot[0] * 100) + " %" : "—"}</b><span>${t("prof.acc", { n: tot[0] })}</span></div>
          <div class="stat"><b>${G.streak()}</b><span>${t("prof.streak")}</span></div>
          <div class="stat"><b>${S.exams.length ? u.num(Math.max(...S.exams.map(e => e.score)), 1) : "—"}</b><span>${t("prof.bestExam")}</span></div></div>
        <div class="tiles" style="margin-top:var(--sp-4)">
          ${ui.tile("parcours", "compass", "var(--accent)", t("path.title"), AA.path.summary())}
          ${ui.tile("quests", "flag", "var(--gold)", t("prof.quests"), t("prof.questsS"), claim ? [t("prof.claim", { n: claim }), "gold"] : null)}
          ${ui.tile("club", "users", "var(--primary)", t("prof.club"), t("prof.clubS"))}
          ${ui.tile("aquarium", "fish", "var(--primary)", t("aqua.title"), t("home.aquaS", { n: Object.keys(S.aqua).length, tot: C.creatures.length }))}
          ${ui.tile("reports", "flag", "var(--accent)", t("rep.list"), (S.reports || []).length ? t("rep.n", { n: S.reports.length }) : t("rep.tileS"), (S.reports || []).length ? [String(S.reports.length), "warn"] : null)}
          ${ui.tile("valider", "check", "var(--ok)", t("set.validate"), t("val.tileS", { n: C.validate.filter(([a]) => (S.validOk || {})[a]).length, tot: C.validate.length }))}
          ${ui.tile("sources", "book", "var(--gold)", t("src.page"), t("src.tileS"))}
          ${ui.tile("backup", "save", "var(--ok)", t("bk.title"), AA.sync.linked() ? t("bk.driveOn") : t("prof.backupS"))}
        </div>
        ${weak.length ? `<div class="section-title"><h3>${t("prof.weak")}</h3></div><div class="row">${weak.map(w => `<a class="btn ghost sm" href="#/lesson/${w.m.id}">${u.esc(w.m.title)} · ${Math.round(w.a * 100)} %</a>`).join("")}</div>` : ""}
        <div class="section-title"><h3>${t("prof.byModule")}</h3><span class="xs muted">${t("prof.byModuleS")}</span></div>
        <section class="card">${C.worlds.filter(w => !w.soon).map(w => `<p class="eyebrow" style="margin:var(--sp-3) 0 0;color:var(${w.color})">${u.esc(w.short)}</p>` + C.inWorld(w.id).map(m => { const ms = G.mastery(m.id), a = G.moduleAcc(m.id); return `<a class="trow" href="#/lesson/${m.id}"><b>${u.esc(m.title)}</b>${ui.bar(ms, ms >= .8 ? "var(--ok)" : ms >= .5 ? "var(--gold)" : "var(--accent)")}<span>${a == null ? "—" : Math.round(a * 100) + " %"}</span></a>`; }).join("")).join("")}</section>
        <div class="section-title"><h3>${t("prof.exams")}</h3></div><section class="card">${P.spark()}</section>
        <div class="section-title"><h3>${t("mode.flash")}</h3></div><section class="card"><div class="boxes">${G.boxes().map((n, i) => `<div><b>${n}</b>${i === 0 ? t("flash.new") : t("flash.box", { n: i })}</div>`).join("")}</div></section>
        <div class="section-title"><h3>${t("prof.trophies")}</h3><span class="muted small">${got} / ${C.badges.length}</span></div>
        <div class="trophies">${C.badges.map(b => `<div class="trophy ${S.badges[b.id] ? "" : "off"}"><div class="medal">${AA.icon(b.icon)}</div><b>${u.esc(b.name)}</b><span>${u.esc(b.desc)}</span></div>`).join("")}</div>
        <div class="section-title"><h3>${t("prof.path")}</h3><a class="small" href="#/parcours">${t("path.manage")}</a></div>
        <section class="card"><p class="small muted" style="margin:0 0 var(--sp-3)">${AA.path.summary()}</p><ol class="path">${AA.path.roadmap().map(r => `<li class="${r.done ? "done" : r.here ? "here" : ""} ${r.skip ? "skip" : ""}"><span><b>${u.esc(r.t)}</b><span>${u.esc(r.d)}</span></span></li>`).join("")}</ol>
        <a class="btn block" style="margin-top:var(--sp-3)" href="#/parcours">${AA.icon("compass")} ${t("path.manage")}</a></section>
        <a class="btn ghost block" style="margin-top:var(--sp-5)" href="#/settings">${AA.icon("gear")} ${t("nav.settings")}</a>`;
      u.on(el, "click", ".tile", (e, b) => AA.router.go(b.dataset.t));
      u.$("#avedit").onclick = u.$("#avedit2").onclick = () => AA.avatar.picker(() => AA.router.refresh());
      AA.avatar.checkEvolution();
    }
  });

  /* ---------- Quêtes ---------- */
  AA.view("quests", {
    tab: "profile",
    render(el) {
      const S = AA.S, today = u.today(), dq = G.todayQuests();
      let all = true;
      const dqh = dq.map(q => { const [v, n] = G.cond(q.test), done = v >= n, key = today + q.id, cl = S.claimed[key]; if (!done) all = false;
        if (!done) return `<button class="dq dq-go" data-go="${u.esc(G.questGo(q.test) || "daily")}"><span class="ck"></span><span><b class="small">${u.esc(q.t)}</b>${ui.bar(v / n, "var(--gold)")}<span class="xs muted mono">${Math.min(v, n)}/${n}</span></span><span class="dq-do">${t("home.doIt")} ${AA.icon("next")}</span></button>`;
        return `<div class="dq done"><span class="ck">${AA.icon("check")}</span><span><b class="small">${u.esc(q.t)}</b>${ui.bar(1, "var(--gold)")}</span>${cl ? `<span class="chip ok">✓</span>` : `<button class="btn gold sm" data-claim="${key}" data-xp="20">+20 XP</button>`}</div>`; }).join("");
      const bk = today + "bonus";
      el.innerHTML = `${ui.head(t("prof.quests"), "profile", AA.helpBtn("quests"))}${ui.intro("quests")}
        <section class="card"><div class="row" style="gap:var(--sp-3)"><span class="medal">${AA.icon("sun")}</span><div class="grow"><h3>${t("quests.daily")}</h3><p class="small muted" style="margin:0">${t("quests.dailyS")}</p></div></div>
          <div style="margin-top:var(--sp-3)">${dqh}</div>
          ${all ? (S.claimed[bk] ? `<p class="small muted">${t("quests.bonusDone")}</p>` : `<button class="btn block" data-claim="${bk}" data-xp="30" style="margin-top:var(--sp-3)">${t("quests.bonus")}</button>`) : ""}</section>
        ${C.chapters.map(c => {
          const steps = c.steps.map((st, k) => ({ st, k, done: c.real ? !!S.real[c.id + k] : G.met(st.test) })), nd = steps.filter(x => x.done).length;
          return `<section class="card" style="margin-top:var(--sp-4)"><div class="row between"><h3 style="color:var(${c.color})">${u.esc(c.title)}</h3><span class="chip">${nd} / ${steps.length}</span></div>
            <p class="small muted" style="margin:4px 0 8px">${u.esc(c.desc)}</p>${ui.bar(nd / steps.length, `var(${c.color})`)}
            <div style="margin-top:var(--sp-2)">${steps.map(({ st, k, done }) => { const key = c.id + k;
              if (c.real) return `<label class="dq ${done ? "done" : ""}" style="cursor:pointer"><span class="ck">${done ? AA.icon("check") : ""}</span><b class="small">${u.esc(st.t)}</b><span class="switch"><input type="checkbox" data-real="${key}" ${done ? "checked" : ""}><i></i></span></label>`;
              const [v, n] = G.cond(st.test);
              const go = !done && G.questGo(st.test);
              if (go) return `<button class="dq dq-go" data-go="${u.esc(go)}"><span class="ck"></span><span><b class="small">${u.esc(st.t)}</b>${n > 1 ? `<span class="xs muted mono"> ${Math.min(v, n)}/${n}</span>` : ""}</span><span class="dq-do"><span class="chip">${st.xp} XP</span>${AA.icon("next")}</span></button>`;
              return `<div class="dq ${done ? "done" : ""}"><span class="ck">${done ? AA.icon("check") : ""}</span><span><b class="small">${u.esc(st.t)}</b>${!done && n > 1 ? `<span class="xs muted mono"> ${Math.min(v, n)}/${n}</span>` : ""}</span>${S.claimed[key] ? `<span class="chip ok">✓</span>` : done ? `<button class="btn gold sm" data-claim="${key}" data-xp="${st.xp}">+${st.xp} XP</button>` : `<span class="chip">${st.xp} XP</span>`}</div>`; }).join("")}</div>
            ${c.real ? `<p class="xs muted" style="margin-top:8px">${t("quests.realNote")}</p>` : ""}</section>`; }).join("")}`;
      u.$$("[data-claim]", el).forEach(b => b.onclick = () => { S.claimed[b.dataset.claim] = 1; AA.store.save(); fx.sfx.badge(); fx.buzz([20, 30, 20]); G.addXp(+b.dataset.xp, b); fx.burstAt(b, 24, "rgba(255,200,87,.9)"); G.checkBadges(); setTimeout(AA.router.refresh, 450); });
      u.$$("[data-go]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.goTo(b.dataset.go); });
      u.$$("[data-real]", el).forEach(cb => cb.onchange = () => { S.real[cb.dataset.real] = cb.checked ? today : 0; AA.store.save(); if (cb.checked) { fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 2, 50, "rgba(255,200,87,.9)"); fx.toast(t("quests.realT"), t("quests.realS"), "flag"); } AA.router.refresh(); });
    }
  });

  /* ---------- Club : duel et partage (classement en ligne désactivé) ---------- */
  AA.view("club", {
    tab: "profile",
    render(el) {
      const S = AA.S, lv = G.levelOf(S.xp), best = S.exams.length ? u.num(Math.max(...S.exams.map(e => e.score)), 1) : "—";
      const txt = t("club.shareText", { l: lv.l, rank: lv.rank, xp: S.xp, best, apnee: S.apnee });
      el.innerHTML = `${ui.head(t("prof.club"), "profile")}
        <section class="card stack"><div class="row" style="gap:var(--sp-3)"><span class="medal">${AA.icon("users")}</span><div class="grow"><h3>${t("mode.duel")}</h3><p class="small muted" style="margin:0">${t("club.duelS")}</p></div></div>
          <div class="calc-grid"><input class="input" id="p1" placeholder="${t("club.p1")}" maxlength="20" value="${u.esc(S.profile.name)}" aria-label="${t("club.p1")}"><input class="input" id="p2" placeholder="${t("club.p2")}" maxlength="20" aria-label="${t("club.p2")}"></div>
          <button class="btn block" id="duel">${AA.icon("play")} ${t("club.start")}</button></section>
        <section class="card stack" style="margin-top:var(--sp-4)"><h3>${t("club.shareT")}</h3><p class="small muted" style="margin:0">${t("club.shareS")}</p>
          <div class="out" id="sharetxt">${u.esc(txt)}</div><button class="btn gold block" id="share">${AA.icon("share")} ${t("club.share")}</button><p class="small muted" id="sharemsg" role="status"></p></section>`;
      u.$("#duel").onclick = () => AA.quiz.duel(u.$("#p1").value.trim() || t("club.p1"), u.$("#p2").value.trim() || t("club.p2"));
      u.$("#share").onclick = async () => {
        const m = u.$("#sharemsg"), url = /^https?:/.test(location.href) ? location.href.split("#")[0] : "";
        if (navigator.share) { try { await navigator.share({ title: t("app.name"), text: txt, url: url || undefined }); m.textContent = t("club.shared"); } catch (e) {} }
        else if (navigator.clipboard) navigator.clipboard.writeText(txt + (url ? " " + url : "")).then(() => (m.textContent = t("club.copied")), () => (m.textContent = t("club.copyFail")));
        else m.textContent = t("club.copyFail");
      };
    }
  });

  /* ---------- Réglages ---------- */
  AA.view("settings", {
    tab: "profile",
    render(el, [anchor]) {
      const S = AA.S, p = S.profile;
      const sw = (id, on, title, sub) => `<label class="setting"><span class="grow"><b>${title}</b><span>${sub}</span></span><span class="switch"><input type="checkbox" id="${id}" ${on ? "checked" : ""}><i></i></span></label>`;
      el.innerHTML = `${ui.head(t("nav.settings"), "profile")}
        <section class="card"><h3>${t("set.look")}</h3><p class="small muted">${t("set.lookS")}</p>${ui.swatches(p.theme)}
          ${AA.LANGS.length > 1 ? `<div class="field" style="margin-top:var(--sp-4)"><label for="lang">${t("set.lang")}</label><select class="input" id="lang">${AA.LANGS.map(l => `<option value="${l.id}" ${l.id === p.lang ? "selected" : ""}>${l.name}</option>`).join("")}</select></div>` : ""}</section>
        <section class="card" style="margin-top:var(--sp-4)"><h3>${t("set.me")}</h3>
          <div class="field" style="margin-top:var(--sp-3)"><label for="sname">${t("set.name")}</label><input class="input" id="sname" maxlength="24" value="${u.esc(p.name)}"></div>
          <div class="field" style="margin-top:var(--sp-3)"><label for="exd">${t("set.exam")}</label><input class="input" type="date" id="exd" value="${u.esc(p.examDate)}"></div>
          <div class="field" style="margin-top:var(--sp-3)"><label>${t("set.goal")}</label><div class="seg">${C.worlds.filter(w => !w.soon && C.inWorld(w.id).length).map(w => `<button data-goal="${w.id}" aria-pressed="${G.goalWorld() === w.id}">${u.esc(w.short)}</button>`).join("")}</div></div>
          <div class="field" style="margin-top:var(--sp-3)"><label>${t("set.daily")}</label><div class="seg">${[10, 20, 40].map(n => `<button data-daily="${n}" aria-pressed="${p.dailyGoal === n}">${t("onb.dailyN", { n })}</button>`).join("")}</div></div></section>
        <section class="card" style="margin-top:var(--sp-4)" id="a11y"><h3>${t("set.a11y")}</h3>
          <div class="field" style="margin-top:var(--sp-3)"><label>${t("set.textSize")}</label><div class="seg textsize">${AA.a11y.SIZES.map((z, i) => `<button data-ts="${z}" aria-pressed="${(p.textSize || 1) === z}" style="font-size:${.8 + i * .12}rem" aria-label="${Math.round(z * 100)} %">Aa</button>`).join("")}</div>
            <p class="small muted" style="margin:6px 0 0">${t("set.textSizeS")}</p></div>
          ${sw("cvd", p.cvd, t("set.cvd"), t("set.cvdS"))}
          <div class="cvd-demo" aria-hidden="true"><span class="chip ok">${AA.icon("check")} ${t("set.cvdOk")}</span><span class="chip bad">${AA.icon("x")} ${t("set.cvdBad")}</span></div>
          ${sw("mot", p.motion !== false, t("set.motion"), t("set.motionS"))}${sw("scn", p.scene !== false, t("set.scene"), t("set.sceneS"))}${sw("gst", p.gestures !== false, t("set.gestures"), t("set.gesturesS"))}
          ${AA.a11y.canSpeak ? `<div class="field" style="margin-top:var(--sp-3)"><label>${t("set.voice")}</label><div class="seg">${[[.8, "slow"], [1, "normal"], [1.2, "fast"]].map(([r, k]) => `<button data-vr="${r}" aria-pressed="${(p.voiceRate || 1) === r}">${t("set.voice." + k)}</button>`).join("")}</div>
            <div class="row" style="margin-top:8px"><button class="btn ghost sm" id="vtest">${AA.icon("sound")} ${t("set.voiceTest")}</button></div></div>` : `<p class="small muted">${t("set.noVoice")}</p>`}</section>
        <section class="card" style="margin-top:var(--sp-4)"><h3>${t("set.comfort")}</h3>
          ${sw("snd", p.sound, t("set.sound"), t("set.soundS"))}${sw("hap", p.haptics, t("set.haptics"), t("set.hapticsS"))}${sw("unl", S.unlockAll, t("set.unlock"), t("set.unlockS"))}</section>
        <a class="card linkcard" href="#/backup" style="margin-top:var(--sp-4)"><span class="medal">${AA.icon("save")}</span><span class="grow"><b>${t("bk.title")}</b><span class="small muted">${t("set.backupS")}</span></span>${AA.icon("next")}</a>
        <section class="card" style="margin-top:var(--sp-4)" id="install"><h3>${t("set.install")}</h3><p class="small muted">${t("set.installS")}</p>
          <div class="stack"><button class="btn block" id="dlapp">${AA.icon("install")} ${t("set.installBtn")}</button></div>
          <p class="small" id="dlmsg" role="status"></p>
          <p class="xs muted"><span class="chip ${navigator.onLine ? "ok" : "warn"}">${AA.icon(navigator.onLine ? "check" : "offline")} ${navigator.onLine ? t("set.online") : t("set.offline")}</span> ${t("set.offlineS")}</p></section>
        <section class="card" style="margin-top:var(--sp-4)" id="valider"><h3>${t("set.validate")}</h3><p class="small muted">${t("val.whatShort")}</p>
          <div class="row"><a class="btn ghost sm" href="#/valider">${AA.icon("check")} ${t("val.open", { n: C.validate.filter(([a]) => (S.validOk || {})[a]).length, tot: C.validate.length })}</a><a class="btn ghost sm" href="#/sources">${AA.icon("book")} ${t("src.page")}</a><a class="btn ghost sm" href="#/reports">${AA.icon("flag")} ${t("rep.list")}</a></div></section>
        <section class="card danger-zone" style="margin-top:var(--sp-4)"><h3>${AA.icon("info")} ${t("set.danger")}</h3><p class="small muted">${t("rs.zoneS")}</p><button class="btn ghost block danger" id="reset">${t("set.reset")}</button></section>
        <p class="center xs muted" style="margin-top:var(--sp-5)">${t("app.name")} · v${AA.VERSION}<br>${t("set.about")}</p>`;
      u.$$("[data-theme]", el).forEach(b => b.onclick = () => { p.theme = b.dataset.theme; AA.store.save(); ui.applyTheme(); fx.sfx.tap(); AA.router.refresh(); });
      const lg = u.$("#lang"); if (lg) lg.onchange = () => { p.lang = lg.value; AA.store.save(true); location.reload(); };
      u.$("#sname").onchange = e => { p.name = e.target.value.trim(); AA.store.save(); };
      u.$("#exd").onchange = e => { p.examDate = e.target.value; AA.store.save(); ui.hud(); };
      u.$$("[data-goal]", el).forEach(b => b.onclick = () => { p.goal = b.dataset.goal; AA.store.save(); AA.router.refresh(); });
      u.$$("[data-daily]", el).forEach(b => b.onclick = () => { p.dailyGoal = +b.dataset.daily; AA.store.save(); AA.router.refresh(); });
      u.$("#snd").onchange = e => { p.sound = e.target.checked; AA.store.save(); if (p.sound) fx.sfx.ok(); };
      u.$("#hap").onchange = e => { p.haptics = e.target.checked; AA.store.save(); fx.buzz(30); };
      u.$("#unl").onchange = e => { S.unlockAll = e.target.checked; AA.store.save(); };
      const msg = s => (u.$("#dlmsg").textContent = s);
      AA.pwa.wireSettings(msg);
      const A = AA.a11y;
      u.$$("[data-ts]", el).forEach(b => b.onclick = () => { p.textSize = +b.dataset.ts; AA.store.save(); A.apply(); fx.sfx.tap(); AA.router.refresh(); });
      u.$("#cvd").onchange = e => { p.cvd = e.target.checked; AA.store.save(); A.apply(); };
      u.$("#mot").onchange = e => { p.motion = e.target.checked; AA.store.save(); A.apply(); };
      u.$("#scn").onchange = e => { p.scene = e.target.checked; AA.store.save(); AA.scene.apply(); };
      u.$("#gst").onchange = e => { p.gestures = e.target.checked; AA.store.save(); };
      u.$$("[data-vr]", el).forEach(b => b.onclick = () => { p.voiceRate = +b.dataset.vr; AA.store.save(); u.$$("[data-vr]", el).forEach(x => x.setAttribute("aria-pressed", x === b)); A.speak(t("set.voiceSample")); });
      const vt = u.$("#vtest"); if (vt) vt.onclick = () => A.speak(t("set.voiceSample"));
      u.$("#reset").onclick = () => AA.resetFlow();
      if (anchor) { const a = u.$("#" + anchor); if (a) setTimeout(() => a.scrollIntoView({ behavior: "smooth" }), 60); }
    }
  });
})();
