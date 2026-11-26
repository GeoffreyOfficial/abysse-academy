/* =====================================================================
   Abysse Academy · « Le cursus » : le chemin des brevets FFESSM,
   pour qui, accès, prérogatives, examen et équivalences (ANMP, CMAS, ISO).
   Données : content/fr/cursus.js
   1.5.1 : vrai schéma de parcours (lignes alignées, étapes en colonnes),
   fiche du niveau choisi à côté, profondeurs lisibles en HTML.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, ui = AA.ui;

  /* Colonnes = étapes du parcours ; chaque niveau a sa ligne et sa colonne. */
  const STEPS = ["cur.st1", "cur.st2", "cur.st3", "cur.st4", "cur.st5", "cur.st6"];
  const LINES = [["plongeur", "dive"], ["secours", "buoy"], ["qualif", "mol"], ["encadrant", "teach"]];
  const PLACE = { decouverte: ["plongeur", 1], n1: ["plongeur", 2], n2: ["plongeur", 3], n3: ["plongeur", 4], n4: ["plongeur", 5],
    rifap: ["secours", 3], nitrox: ["qualif", 3], e1: ["encadrant", 3], e2: ["encadrant", 5], mf: ["encadrant", 6] };
  const AFTER = { n1: "decouverte", n2: "n1", n3: "n2", n4: "n3", rifap: "n1", nitrox: "n1", e1: "n2", e2: "n4", mf: "e2" };

  /* Profondeurs : encadré (PE) et autonome (PA), en mètres. */
  const DEPTHS = [["decouverte", 6, 0], ["n1", 20, 0], ["n2", 40, 20], ["n3", 60, 60], ["n4", 60, 60]];
  const TICKS = [0, 6, 12, 20, 40, 60];
  const pc = d => (d / 60 * 100).toFixed(2) + "%";
  const depthChart = () => `<section class="card dchart" aria-label="${t("cur.chartL")}">
      <div class="dc-head"><h3>${t("cur.chartT")}</h3><span class="dc-leg"><i class="pe"></i>${t("cur.pe")}<i class="pa"></i>${t("cur.pa")}</span></div>
      <div class="dc-rows">${DEPTHS.map(([id, pe, pa]) => { const c = C.cursusById[id], col = (C.worldById[c.world] || {}).color || "--primary";
        return `<div class="dc-row" style="--wc:var(${col})"><span class="dc-lv"><b>${u.esc(c.lv.split(" · ")[0])}</b></span>
          <div class="dc-track">${TICKS.map(d => `<i class="tk" style="left:${pc(d)}"></i>`).join("")}
            <div class="dc-bar pe" style="width:${pc(pe)}"><span>${pe} m</span></div>
            ${pa ? `<div class="dc-bar pa" style="width:${pc(pa)}"><span>${pa} m</span></div>` : `<div class="dc-none xs muted">${t("cur.noPa")}</div>`}</div></div>`; }).join("")}
        <div class="dc-row axis"><span></span><div class="dc-axis">${TICKS.map(d => `<span class="${d === 6 || d === 12 ? "minor" : ""}" style="left:${pc(d)}">${d} m</span>`).join("")}</div></div>
      </div></section>`;

  const state = id => (AA.S.certs || {})[id] ? "got" : id === AA.game.goalWorld() ? "goal" : "";

  const track = sel => `<div class="trk" role="list">
      <div class="trk-row head"><span></span>${STEPS.map(k => `<span class="trk-step">${t(k)}</span>`).join("")}</div>
      ${LINES.map(([ln, ic]) => { const cs = C.cursus.filter(c => PLACE[c.id] && PLACE[c.id][0] === ln).sort((a, b) => PLACE[a.id][1] - PLACE[b.id][1]);
        if (!cs.length) return "";
        const a = PLACE[cs[0].id][1], b = PLACE[cs[cs.length - 1].id][1];
        return `<div class="trk-row ${ln}"><span class="trk-lab">${AA.icon(ic)}<b>${t("cur.line." + ln)}</b></span>
          ${b > a ? `<i class="trk-line" style="grid-column:${a + 1} / ${b + 2};--n:${b - a + 1}"></i>` : ""}
          ${cs.map(c => { const st = state(c.id);
            return `<button class="cur-node ${st} ${c.id === sel ? "on" : ""}" role="listitem" data-id="${c.id}" style="grid-column:${PLACE[c.id][1] + 1};--wc:var(${(C.worldById[c.world] || {}).color || "--muted"})">
              <b>${u.esc(c.lv)}</b><span class="xs">${u.esc(c.tag)}</span>${st ? `<em class="cn-st">${t("cur." + st)}</em>` : ""}</button>`; }).join("")}</div>`; }).join("")}
    </div>`;

  const detail = id => { const c = C.cursusById[id], st = state(id), n = c.world ? C.inWorld(c.world).length : 0, prev = C.cursusById[AFTER[id]];
    return `<div class="cur-detail card" style="--wc:var(${(C.worldById[c.world] || {}).color || "--muted"})" aria-live="polite">
      <p class="eyebrow">${t("cur.line." + PLACE[id][0])}${prev ? ` · ${t("cur.after", { lv: u.esc(prev.lv) })}` : ""}</p>
      <h2>${u.esc(c.lv)}</h2>
      <div class="row cd-chips"><span class="chip">${u.esc(c.tag)}</span>${st ? `<span class="chip ${st === "got" ? "ok" : "gold"}">${t("cur." + st)}</span>` : ""}</div>
      <dl class="cur-dl"><dt>${t("cur.who")}</dt><dd>${c.who}</dd><dt>${t("cur.access")}</dt><dd>${c.access}</dd><dt>${t("cur.can")}</dt><dd>${c.can}</dd><dt>${t("cur.exam")}</dt><dd>${c.exam}</dd>
        <dt>${t("cur.eq")}</dt><dd><div class="eqs">${c.eq.map(([o, nm]) => `<span class="eq"><b>${u.esc(o)}</b> ${u.esc(nm)}</span>`).join("")}</div></dd></dl>
      ${n ? `<div class="row cd-acts"><a class="btn sm" href="#/map/${c.world}">${AA.icon("map")} ${t("cur.open", { n })}</a>${st === "got" ? "" : `<button class="btn ghost sm" data-goal="${c.world}">${AA.icon("target")} ${t("cur.setGoal")}</button>`}</div>` : ""}
    </div>`; };

  AA.view("cursus", {
    tab: "profile", depth: 2,
    render(el, [focus]) {
      const S = AA.S, P = AA.path, lv = P.level(), goal = AA.game.goalWorld();
      let sel = C.cursusById[focus] ? focus : C.cursusById[goal] ? goal : "n2";
      el.innerHTML = `${ui.head(t("cur.title"), "profile")}
        <p class="muted cur-intro">${t("cur.intro")}</p>
        ${lv ? `<div class="row cur-you"><span class="chip ok">${t("cur.youLv")} : ${u.esc(t("lv." + lv.id))}</span>${(C.worldById[goal] || {}).short ? `<span class="chip gold">${t("cur.goal")} : ${u.esc(C.worldById[goal].short)}</span>` : ""}</div>` : ""}
        <div class="cur-layout">
          <section class="card trk-card"><div class="dc-head"><h3>${t("cur.pathT")}</h3><span class="xs muted">${t("cur.pathH")}</span></div>${track(sel)}</section>
          <aside class="cur-side" id="cdet">${detail(sel)}</aside>
          ${depthChart()}
        </div>
        <section class="card cur-eq"><div class="dc-head"><h3>${t("cur.eqT")}</h3></div>
        <div class="tbl"><table><tr><th>FFESSM</th><th>ANMP</th><th>CMAS</th><th>ISO</th></tr>
          ${C.cursus.filter(c => c.line === "plongeur" || c.id === "n4").map(c => { const g = k => ((c.eq.find(e => e[0].startsWith(k)) || [])[1]) || "—"; const iso = c.eq.find(e => e[0].startsWith("ISO")); return `<tr><td><b>${u.esc(c.lv)}</b></td><td>${u.esc(g("ANMP"))}</td><td>${u.esc(g("CMAS"))}</td><td>${iso ? u.esc(iso[0].replace("ISO ", "") + " · " + iso[1]) : "—"}</td></tr>`; }).join("")}</table></div></section>
        <div class="callout"><span class="eyebrow">${t("common.validate")}</span>${t("cur.note")} <a href="#/valider">${t("set.validate")}</a></div>`;
      const wire = () => u.$$("[data-goal]", el).forEach(b => b.onclick = () => { S.profile.goal = b.dataset.goal; AA.store.save(); AA.fx.sfx.up(); AA.fx.toast(t("cur.goalT"), C.worldById[b.dataset.goal].title, "target"); AA.router.refresh(); });
      const pick = id => { sel = id; u.$$(".cur-node", el).forEach(n => n.classList.toggle("on", n.dataset.id === id)); u.$("#cdet", el).innerHTML = detail(id); wire();
        if (window.innerWidth < 1200) u.$("#cdet", el).scrollIntoView({ block: "nearest", behavior: "smooth" }); };
      u.$$(".cur-node", el).forEach(n => n.onclick = () => { AA.fx.sfx && AA.fx.sfx.tap && AA.fx.sfx.tap(); pick(n.dataset.id); });
      wire();
    }
  });
  /* Bandeau « Pour qui · Quel examen » (carte et cours). */
  AA.levelBadge = (wid, small) => {
    const c = C.cursusById[wid]; if (!c) return "";
    return small ? `<a class="chip lvchip" href="#/cursus/${c.id}" style="--wc:var(${(C.worldById[wid] || {}).color})">${u.esc(c.lv)} · ${u.esc(c.tag)}</a>`
      : `<a class="lvbadge" href="#/cursus/${c.id}"><span class="eyebrow">${t("cur.forWho")}</span><span class="small">${c.who}</span><span class="xs muted">${t("cur.exam")} : ${c.exam.replace(/<[^>]+>/g, "")}</span><span class="xs lvmore">${t("cur.more")} ${AA.icon("next")}</span></a>`;
  };
})();
