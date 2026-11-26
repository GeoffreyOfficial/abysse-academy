/* =====================================================================
   Abysse Academy · « Le cursus » : le chemin des brevets FFESSM,
   pour qui, accès, prérogatives, examen et équivalences (ANMP, CMAS, ISO).
   Données : content/fr/cursus.js
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, ui = AA.ui;

  /* Schéma des profondeurs : qui peut aller où, encadré ou autonome. */
  const depthChart = () => {
    const rows = [["N1", 20, 0, "--world-n1"], ["N2", 40, 20, "--world-n2"], ["N3", 60, 60, "--world-n3"], ["N4", 60, 60, "--world-n4"]];
    const W = 320, X = d => 70 + d / 60 * (W - 80);
    return `<figure class="diagram dchart"><svg viewBox="0 0 ${W} ${rows.length * 34 + 40}" role="img" aria-label="${t("cur.chartL")}">
      ${[0, 6, 12, 20, 40, 60].map(d => `<line x1="${X(d)}" x2="${X(d)}" y1="8" y2="${rows.length * 34 + 10}" class="s-line"/><text x="${X(d)}" y="${rows.length * 34 + 28}" class="d-text" text-anchor="middle">${d === 60 ? "60 m" : d}</text>`).join("")}
      ${rows.map(([n, pe, pa, c], i) => { const y = 14 + i * 34; return `<text x="4" y="${y + 15}" class="d-text b">${n}</text>
        <rect x="${X(0)}" y="${y}" width="${X(pe) - X(0)}" height="10" rx="5" style="fill:var(${c});opacity:.35" class="grow-bar"/>
        <rect x="${X(0)}" y="${y + 12}" width="${Math.max(0, X(pa) - X(0))}" height="10" rx="5" style="fill:var(${c})" class="grow-bar"/>`; }).join("")}
      </svg><figcaption class="xs muted"><span class="lg pe"></span> ${t("cur.pe")} <span class="lg pa"></span> ${t("cur.pa")}</figcaption></figure>`;
  };

  AA.view("cursus", {
    tab: "profile", depth: 2,
    render(el, [focus]) {
      const S = AA.S, P = AA.path, lv = P.level(), goal = AA.game.goalWorld();
      const here = id => (S.certs || {})[id] ? "got" : id === goal ? "goal" : "";
      const lines = [["plongeur", "dive"], ["secours", "buoy"], ["qualif", "mol"], ["encadrant", "teach"]];
      const card = c => `<details class="cur-card ${here(c.id)}" id="cur-${c.id}" ${c.id === focus || (!focus && c.id === goal) ? "open" : ""} style="--wc:var(${(C.worldById[c.world] || {}).color || "--muted"})">
        <summary><span class="cur-dot"></span><span class="grow"><b>${u.esc(c.lv)}</b><span class="xs muted">${u.esc(c.tag)}</span></span>
          ${(S.certs || {})[c.id] ? `<span class="chip ok xs">${t("cur.got")}</span>` : c.id === goal ? `<span class="chip gold xs">${t("cur.goal")}</span>` : ""}</summary>
        <dl class="cur-dl"><dt>${t("cur.who")}</dt><dd>${c.who}</dd><dt>${t("cur.access")}</dt><dd>${c.access}</dd><dt>${t("cur.can")}</dt><dd>${c.can}</dd><dt>${t("cur.exam")}</dt><dd>${c.exam}</dd>
          <dt>${t("cur.eq")}</dt><dd><div class="eqs">${c.eq.map(([o, n]) => `<span class="eq"><b>${u.esc(o)}</b> ${u.esc(n)}</span>`).join("")}</div></dd></dl>
        ${c.world && C.inWorld(c.world).length ? `<div class="row"><a class="btn sm" href="#/map/${c.world}">${AA.icon("map")} ${t("cur.open", { n: C.inWorld(c.world).length })}</a><button class="btn ghost sm" data-goal="${c.world}">${AA.icon("target")} ${t("cur.setGoal")}</button></div>` : ""}
      </details>`;
      el.innerHTML = `${ui.head(t("cur.title"), "profile")}
        <p class="muted">${t("cur.intro")}</p>
        ${lv ? `<p class="small">${t("cur.you", { lv: t("lv." + lv.id), goal: (C.worldById[goal] || {}).short || "" })}</p>` : ""}
        ${depthChart()}
        <div class="cur-cols">${lines.map(([ln, ic]) => { const cs = C.cursus.filter(c => c.line === ln); return cs.length ? `<div class="cur-col"><div class="section-title"><h3>${AA.icon(ic)} ${t("cur.line." + ln)}</h3></div><div class="cur-line ${ln}">${cs.map(card).join("")}</div></div>` : ""; }).join("")}</div>
        <div class="section-title"><h3>${t("cur.eqT")}</h3></div>
        <div class="tbl"><table><tr><th>FFESSM</th><th>ANMP</th><th>CMAS</th><th>ISO</th></tr>
          ${C.cursus.filter(c => c.line === "plongeur" || c.id === "n4").map(c => { const g = k => ((c.eq.find(e => e[0].startsWith(k)) || [])[1]) || "—"; const iso = c.eq.find(e => e[0].startsWith("ISO")); return `<tr><td><b>${u.esc(c.lv)}</b></td><td>${u.esc(g("ANMP"))}</td><td>${u.esc(g("CMAS"))}</td><td>${iso ? u.esc(iso[0].replace("ISO ", "") + " · " + iso[1]) : "—"}</td></tr>`; }).join("")}</table></div>
        <div class="callout"><span class="eyebrow">${t("common.validate")}</span>${t("cur.note")} <a href="#/valider">${t("set.validate")}</a></div>`;
      u.$$("[data-goal]", el).forEach(b => b.onclick = () => { S.profile.goal = b.dataset.goal; AA.store.save(); AA.fx.sfx.up(); AA.fx.toast(t("cur.goalT"), C.worldById[b.dataset.goal].title, "target"); AA.router.refresh(); });
      if (focus) { const f = u.$("#cur-" + focus); if (f) setTimeout(() => f.scrollIntoView({ block: "start", behavior: "smooth" }), 150); }
    }
  });
  /* Bandeau « Pour qui · Quel examen » (carte et cours). */
  AA.levelBadge = (wid, small) => {
    const c = C.cursusById[wid]; if (!c) return "";
    return small ? `<a class="chip lvchip" href="#/cursus/${c.id}" style="--wc:var(${(C.worldById[wid] || {}).color})">${u.esc(c.lv)} · ${u.esc(c.tag)}</a>`
      : `<a class="lvbadge" href="#/cursus/${c.id}"><span class="eyebrow">${t("cur.forWho")}</span><span class="small">${c.who}</span><span class="xs muted">${t("cur.exam")} : ${c.exam.replace(/<[^>]+>/g, "")}</span><span class="xs lvmore">${t("cur.more")} ${AA.icon("next")}</span></a>`;
  };
})();
