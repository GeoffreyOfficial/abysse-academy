/* =====================================================================
   Abysse Academy · « Mon parcours »
   Niveau, expérience, objectif, et pour chaque monde : j'apprends,
   je révise ou je passe ; « J'ai obtenu ce niveau » ; test de positionnement.
   Rien n'est définitif : tout se change ici, à tout moment.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;
  const PV = (AA.pathView = {});
  const P = () => AA.path;
  const MODES = ["learn", "review", "skip"];
  const MODE_IC = { learn: "book", review: "refresh", skip: "next" };
  const LV_IC = { none: "sparkle", bapteme: "wave", n1: "hand", n2: "dive", n3: "compass", n4: "users", e1: "teach", e2: "trophy" };
  const worldsWithContent = () => C.worlds.filter(w => !w.soon && C.inWorld(w.id).length);

  /* Choix du niveau : cartes, avec RIFAP / Nitrox en plus. Utilisé à l'accueil et ici. */
  PV.levelCards = cur => `<div class="choicecards lvcards">${P().LEVELS.map(l => `<button data-lv="${l.id}" aria-pressed="${cur === l.id}"><span class="ic">${AA.icon(LV_IC[l.id] || "dive")}</span><span><b>${t("lv." + l.id)}</b><span>${t("lv.s." + l.id)}</span></span></button>`).join("")}</div>`;
  /* 1.6 : 8 tranches plus précises ; une ancienne valeur (20…) tombe dans sa tranche. */
  const DVN = ["path.dvN0", "path.dvN1", "path.dvN2", "path.dvN3", "path.dvN4", "path.dvN5", "path.dvN6", "path.dvN7"], DVS = ["path.dvS0", "path.dvS1", "path.dvS2", "path.dvS3", "path.dvS4", "path.dvS5", "path.dvS6", "path.dvS7"];
  PV.divesSeg = cur => { const D = P().DIVES, sel = D.filter(n => n <= (cur || 0)).pop() || 0;
    return `<div class="divegrid" role="group" aria-label="${t("path.dives")}">${D.map((n, i) => `<button class="divebtn" data-dives="${n}" aria-pressed="${sel === n}"><b>${t(DVN[i])}</b><span class="xs">${t(DVS[i])}</span></button>`).join("")}</div>
      <p class="xs muted divehint">${AA.icon("info")} ${t("path.divesHint")}</p>`; };
  PV.modeSeg = (wid, cur) => `<div class="seg pmode" role="group" aria-label="${t("path.modeQ")}">${MODES.map(m => `<button data-mode="${m}" data-w="${wid}" aria-pressed="${cur === m}">${AA.icon(MODE_IC[m])} ${t("path.m." + m)}</button>`).join("")}</div>`;

  AA.view("parcours", {
    tab: "profile", depth: 3,
    render(el) {
      const S = AA.S, pr = S.profile, lv = P().level(), goal = G.goalWorld();
      const ws = worldsWithContent();
      const card = w => {
        const mode = P().mode(w.id), cert = (S.certs || {})[w.id], pd = (S.placeDone || {})[w.id];
        const list = C.inWorld(w.id), done = list.filter(m => G.stars(m.id) >= 1 || (S.placed || {})[m.id]).length;
        return `<section class="card pworld m-${mode}" style="--wc:var(${w.color})" data-pw="${w.id}">
          <div class="pw-head"><span class="ic">${AA.icon(w.icon)}</span><span class="grow"><b>${u.esc(w.title)}</b><span class="xs muted">${t("path.modules", { n: done, tot: list.length })}${w.id === goal ? " · " + t("path.isGoal") : ""}</span></span>
            ${cert ? `<span class="chip ok">${AA.icon("check")} ${t("path.got", { d: u.fmtDate(cert) })}</span>` : ""}</div>
          ${ui.bar(done / Math.max(1, list.length), "var(--wc)")}
          ${PV.modeSeg(w.id, mode)}
          <p class="xs muted" style="margin:0">${t("path.mh." + mode)}</p>
          ${pd ? `<p class="xs" style="margin:0">${AA.icon("target")} ${t("path.placed", { pct: pd.pct, d: u.fmtDate(pd.d) })}</p>` : ""}
          <div class="pw-acts">
            ${cert ? `<button class="btn ghost sm" data-uncert="${w.id}">${t("path.uncert")}</button>` : `<button class="btn sm" data-cert="${w.id}">${AA.icon("trophy")} ${t("path.cert")}</button>`}
            <button class="btn ghost sm" data-place="${w.id}">${AA.icon("target")} ${t(pd ? "path.placeAgain" : "path.place")}</button>
            <a class="btn ghost sm" href="#/map/${w.id}">${AA.icon("map")} ${t("path.open")}</a></div>
        </section>`;
      };
      el.innerHTML = `<div class="pagehead"><a class="closebtn" href="#/profile" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${t("tab.profile")}</span></div>
        <h1>${t("path.title")}</h1><p class="muted">${t("path.intro")}</p><a class="btn ghost sm" href="#/cursus">${AA.icon("layers")} ${t("cur.title")}</a>
        <section class="card stack pcfg">
          <div class="row between"><span><p class="eyebrow" style="margin:0">${t("path.level")}</p><b class="h4">${t("lv." + (lv ? lv.id : "none"))}</b></span><button class="btn ghost sm" id="chlv">${AA.icon("edit")} ${t("path.change")}</button></div>
          <div><p class="eyebrow">${t("path.dives")}</p>${PV.divesSeg(pr.dives)}<p class="xs muted" style="margin:6px 0 0">${t(P().expert() ? "path.expertOn" : "path.expertOff")}</p></div>
          <div><p class="eyebrow">${t("path.goal")}</p><div class="seg" role="group">${ws.map(w => `<button data-goal="${w.id}" aria-pressed="${goal === w.id}">${u.esc(w.short)}</button>`).join("")}</div></div>
        </section>
        <div class="section-title"><h3>${t("path.worlds")}</h3><span class="xs muted">${t("path.worldsS")}</span></div>
        <div class="pworlds">${ws.map(card).join("")}</div>
        <p class="small muted center" style="margin-top:var(--sp-5)">${t("path.free")}</p>`;

      u.$$("[data-mode]", el).forEach(b => b.onclick = () => { P().setMode(b.dataset.w, b.dataset.mode); AA.store.save(); fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-dives]", el).forEach(b => b.onclick = () => { pr.dives = +b.dataset.dives; AA.store.save(); fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-goal]", el).forEach(b => b.onclick = () => { pr.goal = b.dataset.goal; AA.store.save(); fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-cert]", el).forEach(b => b.onclick = () => PV.certSheet(b.dataset.cert));
      u.$$("[data-uncert]", el).forEach(b => b.onclick = () => ui.confirm(t("path.uncertQ", { w: C.worldById[b.dataset.uncert].short }), t("path.uncert"), () => { P().uncertify(b.dataset.uncert); AA.store.save(); AA.router.refresh(); }));
      u.$$("[data-place]", el).forEach(b => b.onclick = () => P().startPlacement(b.dataset.place));
      u.$("#chlv").onclick = () => PV.levelSheet();
    }
  });

  /* « J'ai obtenu ce niveau » : on fête, puis on choisit la suite. */
  PV.certSheet = wid => {
    const w = C.worldById[wid];
    const close = ui.sheet(`<div class="stack"><p class="eyebrow">${t("path.certEyebrow")}</p><h3>${t("path.certT", { w: u.esc(w.short) })}</h3><p class="muted">${t("path.certS")}</p>
      <div class="choicecards">${["review", "skip", "learn"].map(m => `<button data-cm="${m}"><span class="ic">${AA.icon(MODE_IC[m])}</span><span><b>${t("path.c." + m)}</b><span>${t("path.cs." + m)}</span></span></button>`).join("")}</div></div>`, t("path.cert"));
    u.$$("[data-cm]").forEach(b => b.onclick = () => {
      P().certify(wid, b.dataset.cm); AA.store.save(); close();
      fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 2, 60, "rgba(255,200,87,.9)");
      fx.toast(t("path.certOkT", { w: w.short }), t("path.certOkS", { goal: (C.worldById[G.goalWorld()] || {}).short || "" }), "trophy");
      AA.router.refresh();
    });
  };
  /* Changer de niveau déclaré : les mondes couverts passent en révision (jamais l'inverse). */
  PV.levelSheet = () => {
    const S = AA.S, o = { lv: S.profile.level || "none", rifap: !!(S.certs || {}).rifap, nitrox: !!(S.certs || {}).nitrox };
    const body = () => `<p class="eyebrow">${t("path.level")}</p><h3>${t("onb.levelQ")}</h3>${PV.levelCards(o.lv)}${PV.extras(o)}
      <button class="btn block" id="lvok" style="margin-top:var(--sp-4)">${t("path.apply")}</button><p class="xs muted center">${t("path.applyS")}</p>`;
    const close = ui.sheet(`<div id="lvbody" class="stack">${body()}</div>`, t("path.level"));
    const wire = () => {
      u.$$("#lvbody [data-lv]").forEach(b => b.onclick = () => { o.lv = b.dataset.lv; u.$("#lvbody").innerHTML = body(); wire(); });
      PV.wireExtras(o, () => { u.$("#lvbody").innerHTML = body(); wire(); });
      u.$("#lvok").onclick = () => { P().applyLevel(o.lv, { rifap: o.rifap, nitrox: o.nitrox }); AA.store.save(); close(); fx.toast(t("path.updT"), AA.path.summary(), "compass"); AA.router.refresh(); };
    };
    wire();
  };
  PV.extras = o => `<p class="eyebrow" style="margin-top:var(--sp-3)">${t("onb.extraQ")}</p>
    <label class="setting"><span class="grow"><b>RIFAP</b><span>${t("onb.rifapS")}</span></span><span class="switch"><input type="checkbox" data-x="rifap" ${o.rifap ? "checked" : ""}><i></i></span></label>
    <label class="setting"><span class="grow"><b>Nitrox</b><span>${t("onb.nitroxS")}</span></span><span class="switch"><input type="checkbox" data-x="nitrox" ${o.nitrox ? "checked" : ""}><i></i></span></label>`;
  PV.wireExtras = (o, again) => u.$$("[data-x]").forEach(i => i.onchange = () => { o[i.dataset.x] = i.checked; if (again) again(); });

  /* ---------- Résultat du test de positionnement ---------- */
  PV.placeResult = (el, c) => {
    const S = AA.S, w = C.worldById[c.world], res = c.res || (c.res = P().placementResult(c));
    if (!c.saved) { c.saved = true; P().applyPlacement(c, res); c.xp += 20; G.addXp(20); AA.store.save(); G.checkBadges(); }
    const got = res.mods.filter(x => x.r.n && x.r.ok === x.r.n).length;
    const opts = [["review", "refresh"], ["learn", "book"], ["skip", "next"]];
    const recMode = res.rec === "mixed" ? "learn" : res.rec;
    el.innerHTML = `<div class="topclose"><button class="closebtn" id="rclose" aria-label="${t("nav.back")}">${AA.icon("close")}</button></div>
      <section class="card result stack-lg"><p class="eyebrow">${t("place.title", { w: u.esc(w.short) })}</p>
        <div class="big">${res.pct}<span class="muted" style="font-size:.4em"> %</span></div>
        <p>${t("place.r." + res.rec, { n: got, tot: res.mods.length })}</p>
        <div class="placelist">${res.mods.map(({ m, r }) => { const ok = r.n && r.ok === r.n; return `<a class="prow ${ok ? "ok" : ""}" href="#/lesson/${m.id}"><span class="pi">${AA.icon(ok ? "check" : "book")}</span><span class="grow"><b>${u.esc(m.title)}</b><span class="xs muted">${ok ? t("place.ok") : t("place.todo", { ok: r.ok, n: r.n })}</span></span></a>`; }).join("")}</div>
        <p class="eyebrow" style="margin:0">${t("place.next")}</p>
        <div class="choicecards">${opts.map(([m, ic]) => `<button data-pm="${m}" aria-pressed="${m === recMode}"><span class="ic">${AA.icon(ic)}</span><span><b>${t("place.m." + m)}${m === recMode ? ` <span class="chip ok xs">${t("place.rec")}</span>` : ""}</b><span>${t("place.ms." + m)}</span></span></button>`).join("")}</div>
        <span class="chip gold" style="justify-self:center">${AA.icon("bolt")} +${c.xp} XP</span>
      </section>
      ${c.answers.some(a => !a.ok) ? `<div class="section-title"><h3>${t("place.fix")}</h3></div><div class="review">${c.answers.filter(a => !a.ok).map(a => `<div class="rv"><b>${u.esc(a.q.q)}</b><span class="small">${t("quiz.answer")} <b>${u.esc(a.q.c[a.q.a])}</b></span><p class="small muted" style="margin:6px 0 0">${u.esc(a.q.e)}</p></div>`).join("")}</div>` : ""}`;
    u.$$("[data-pm]", el).forEach(b => b.onclick = () => {
      P().setMode(c.world, b.dataset.pm); AA.S.profile.placeAsk = false; AA.store.save(); fx.sfx.up();
      fx.toast(t("place.doneT"), t("place.doneS." + b.dataset.pm, { w: w.short }), "compass");
      AA.router.go(b.dataset.pm === "skip" ? "parcours" : "map/" + c.world);
    });
    u.$("#rclose").onclick = () => AA.router.go("parcours");
  };

  /* Carte d'accueil : propose le test de positionnement demandé à l'accueil. */
  PV.placeTarget = () => {
    const S = AA.S, done = S.placeDone || {};
    const cand = P().MAIN.filter(id => C.inWorld(id).length && !done[id] && P().active(id));
    return cand.filter(id => P().certified(id)).pop() || (cand.includes(G.goalWorld()) ? G.goalWorld() : cand[0]);
  };
  PV.homeCard = () => {
    const S = AA.S; if (!S.profile.placeAsk) return "";
    const wid = PV.placeTarget(); if (!wid) return "";
    const w = C.worldById[wid], n = P().placementSet(wid).length;
    return `<section class="card place-card" style="--wc:var(${w.color})"><div class="drive-ic">${AA.icon("target")}</div><div class="stack" style="gap:6px">
      <b class="h4">${t("place.cardT", { w: u.esc(w.short) })}</b><p class="small" style="margin:0">${t("place.cardS", { n, min: Math.max(2, Math.round(n / 3)) })}</p>
      <div class="row"><button class="btn sm" id="plgo" data-w="${wid}">${AA.icon("play")} ${t("place.start")}</button><button class="btn ghost sm" id="pllater">${t("dr.later")}</button></div></div></section>`;
  };
  PV.wireHome = () => {
    const g = u.$("#plgo"), l = u.$("#pllater");
    if (g) g.onclick = () => P().startPlacement(g.dataset.w);
    if (l) l.onclick = () => { AA.S.profile.placeAsk = false; AA.store.save(); const c = u.$(".place-card"); if (c) c.remove(); fx.toast(t("place.laterT"), t("place.laterS"), "compass"); };
  };
})();
