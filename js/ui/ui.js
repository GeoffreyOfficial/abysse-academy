/* =====================================================================
   Abysse Academy · coquille et composants d'interface
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t;
  const ui = (AA.ui = {});
  const TABS = [["home", "home"], ["map", "map"], ["train", "train"], ["lab", "lab"], ["profile", "user"]];

  ui.applyTheme = () => {
    const p = AA.S.profile, th = AA.THEMES.find(x => x.id === p.theme) || AA.THEMES[0];
    document.documentElement.dataset.aaTheme = th.id;
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = th.meta;
  };

  ui.frame = v => {
    const top = document.getElementById("topbar"), tab = document.getElementById("tabbar");
    top.hidden = !!v.immersive; tab.hidden = !!v.immersive;
    document.body.classList.toggle("immersive", !!v.immersive);
    if (!tab.dataset.built) {
      tab.dataset.built = 1;
      tab.innerHTML = `<nav aria-label="${t("nav.label")}">${TABS.map(([id, ic]) => `<button class="tab" data-tab="${id}">${AA.icon(ic)}<span>${t("tab." + id)}</span></button>`).join("")}</nav>`;
      u.on(tab, "click", "[data-tab]", (e, b) => { AA.fx.sfx.tap(); AA.router.go(b.dataset.tab === "home" ? "home" : b.dataset.tab); });
    }
    u.$$(".tab", tab).forEach(b => { if (b.dataset.tab === v.tab) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
  };

  ui.hud = () => {
    const top = document.getElementById("topbar"); if (!top || top.hidden) return;
    const S = AA.S, G = AA.game, lv = G.levelOf(S.xp), st = G.streak(), dx = G.daysToExam();
    top.innerHTML = `<a class="brand" href="#/home" aria-label="${t("app.name")}">${AA.logo()}<b>Abysse<span>Academy</span></b></a>
      <span class="grow"></span>
      ${dx != null && dx >= 0 ? `<button class="pill cd" data-hud="countdown" title="${t("hud.exam")}" aria-label="${t("hud.exam")} : J−${dx}">${AA.icon("calendar")}J−${dx}</button>` : ""}
      <button class="pill fire" data-hud="streak" title="${t("hud.streak")}" aria-label="${t("hud.streak")} : ${st}">${AA.icon("flame")}${st}</button>
      <button class="pill xp" data-hud="xp" title="${t("hud.level", { l: lv.l })}" aria-label="${S.xp} XP · ${t("hud.level", { l: lv.l })}">${AA.icon("bolt")}${S.xp}</button>
      <a class="iconbtn" href="#/search" aria-label="${t("search.title")}">${AA.icon("search")}</a>
      <a class="iconbtn" href="#/settings" aria-label="${t("nav.settings")}">${AA.icon("gear")}</a>`;
    u.$$("[data-hud]", top).forEach(b => b.onclick = () => { AA.fx.sfx.tap(); AA.hudSheet(b.dataset.hud); });
    const dot = G.claimable(); const pt = u.$('[data-tab="profile"]');
    if (pt) { let d = u.$(".dot", pt); if (dot && !d) { d = document.createElement("i"); d.className = "dot"; pt.appendChild(d); } else if (!dot && d) d.remove(); }
  };

  /* ---------- Petits composants (renvoient du HTML) ---------- */
  ui.head = (title, backTo, extra) => `<div class="pagehead">${backTo ? `<a class="closebtn" href="#/${backTo}" aria-label="${t("nav.back")}">${AA.icon("back")}</a>` : ""}<h1 class="pagetitle">${title}</h1>${extra || ""}</div>`;
  /* Chaque tuile qui a une fiche d'aide reçoit un petit « ? » (content/fr/help.js). */
  const TILE_HELP = { examfull: "exam", examquick: "exam", errors: "errors", stale: "stale", doubt: "doubt", calcs: "calcs", parcours: "parcours", quests: "quests", aquarium: "aquarium", story: "story", mistakes: "mistakes", boss: "boss", sim: "sim", pc: "pc", scen: "scen", tables: "tables", calc: "calc", daily: "daily", flash: "flash", five: "five", apnee: "apnee", duel: "duel", reports: "reports", sources: "sources", valider: "validate", cursus: "cursus" };
  ui.tile = (id, icon, color, title, sub, badge) => { const hk = TILE_HELP[id], has = hk && AA.content.help && AA.content.help[hk];
    return `<button class="tile" data-t="${id}" style="--c:${color}"><span class="ic">${AA.icon(icon)}</span><b>${title}</b><span>${sub}</span>${badge ? `<span class="badge chip ${badge[1] || ""}">${badge[0]}</span>` : ""}${has ? `<span class="helpbtn tile-help" role="button" tabindex="0" data-help="${hk}" aria-label="${t("help.what")}">?</span>` : ""}</button>`; };
  ui.bar = (p, color) => `<div class="bar"><i style="width:${Math.round(u.clamp(p, 0, 1) * 100)}%${color ? ";background:" + color : ""}"></i></div>`;
  ui.ring = (p, big, small, done) => {
    const r = 46, c = 2 * Math.PI * r, off = c * (1 - u.clamp(p, 0, 1));
    return `<div class="ring ${done ? "done" : ""}"><svg viewBox="0 0 108 108"><circle class="ring-bg" cx="54" cy="54" r="${r}" fill="none" stroke-width="10"/><circle class="ring-fg" cx="54" cy="54" r="${r}" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg><div class="rt"><div><b>${big}</b><br><span>${small}</span></div></div></div>`;
  };
  /* Manomètre de la jauge d'air (0 à 200 bar). */
  ui.gauge = bar => {
    const P = (a, r) => { const x = a * Math.PI / 180; return [(32 + r * Math.sin(x)).toFixed(1), (34 - r * Math.cos(x)).toFixed(1)]; };
    const a = -120 + 240 * u.clamp(bar, 0, 200) / 200, [nx, ny] = P(a, 20), [r0x, r0y] = P(-120, 24), [r1x, r1y] = P(-72, 24), [s0x, s0y] = P(-120, 24), [s1x, s1y] = P(120, 24);
    return `<svg class="gauge" viewBox="0 0 64 64" role="img" aria-label="${t("quiz.air", { n: bar })}"><circle class="g-face" cx="32" cy="34" r="29" stroke-width="2"/>
      <path class="g-track" d="M${s0x} ${s0y} A24 24 0 1 1 ${s1x} ${s1y}" fill="none" stroke-width="5"/>
      <path class="g-red" d="M${r0x} ${r0y} A24 24 0 0 1 ${r1x} ${r1y}" fill="none" stroke-width="5"/>
      <line x1="32" y1="34" x2="${nx}" y2="${ny}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" style="transition:all .5s"/><circle cx="32" cy="34" r="3.5" fill="var(--ink)"/>
      <text x="32" y="56" text-anchor="middle" class="d-strong" style="font-size:10px">${bar}</text></svg>`;
  };
  ui.empty = (icon, title, sub, btn) => `<div class="card soft center empty"><div class="medal" style="margin:0 auto 10px">${AA.icon(icon)}</div><h3>${title}</h3><p class="muted">${sub}</p>${btn || ""}</div>`;
  ui.callout = (kind, label, html) => `<div class="callout ${kind}"><span class="eyebrow">${label}</span>${html}</div>`;
  /* Fenêtre de confirmation maison (pas de confirm() du navigateur). */
  ui.confirm = (msg, okLabel, onOk, skip) => {
    if (skip) return onOk();
    const d = document.createElement("div"); d.className = "sheet-wrap";
    d.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${u.esc(msg)}"><p class="sheet-msg">${u.esc(msg)}</p><div class="stack"><button class="btn accent block" data-ok>${u.esc(okLabel)}</button><button class="btn ghost block" data-no>${t("common.cancel")}</button></div></div>`;
    const close = () => { d.remove(); document.removeEventListener("keydown", esc); removeEventListener("hashchange", close); };
    const esc = e => { if (e.key === "Escape") close(); };
    d.onclick = e => { if (e.target === d || e.target.closest("[data-no]")) close(); else if (e.target.closest("[data-ok]")) { close(); onOk(); } };
    document.addEventListener("keydown", esc); addEventListener("hashchange", close);
    document.body.appendChild(d); u.$("[data-ok]", d).focus();
  };
  /* Feuille du bas générique (glossaire, détails…). Renvoie une fonction de fermeture. */
  ui.sheet = (html, label) => {
    const d = document.createElement("div"); d.className = "sheet-wrap";
    d.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${u.esc(label || "")}"><button class="closebtn sheet-x" data-no aria-label="${t("nav.back")}">${AA.icon("close")}</button>${html}</div>`;
    const prev = document.activeElement;
    const close = () => { d.remove(); document.removeEventListener("keydown", esc); removeEventListener("hashchange", close); prev && prev.focus && prev.focus({ preventScroll: true }); };
    const esc = e => { if (e.key === "Escape") close(); };
    d.addEventListener("click", e => { if (e.target === d || e.target.closest("[data-no]")) close(); else if (e.target.closest("a[href^='#/']")) close(); });
    document.addEventListener("keydown", esc); addEventListener("hashchange", close);
    document.body.appendChild(d); u.$(".sheet-x", d).focus({ preventScroll: true });
    return close;
  };

  /* Micro-animation : onde au toucher sur les boutons (désactivée si animations réduites). */
  document.addEventListener("pointerdown", e => {
    const b = e.target.closest(".btn,.choice,.tile,.quick,.node,.tab,.continue,.chip[id],.aq-fish,.st-choice"); if (!b || b.disabled || (AA.a11y && AA.a11y.reduced())) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2, i = document.createElement("span");
    i.className = "rip"; i.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(i); setTimeout(() => i.remove(), 600);
  }, { passive: true });

  /* Petit utilitaire : branche data-go="route" sur des boutons. */
  ui.wireGo = el => u.on(el, "click", "[data-go]", (e, b) => { AA.fx.sfx.tap(); AA.router.go(b.dataset.go); });
})();
