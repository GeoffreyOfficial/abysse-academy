/* =====================================================================
   Abysse Academy 2.4
   - Thèmes : Nacre (clair premium), Minuit (sombre premium), Automatique
     (suit le réglage clair/sombre de l'appareil).
   - Cours premium : « L'essentiel en 30 s », chapitres numérotés,
     tableaux lisibles sur téléphone, encadrés illustrés, mots clés surlignés
     à l'apparition, schémas animés quand ils entrent à l'écran.
   - Tuteur : diagnostic par notion (cause probable + action), erreurs
     répétées repérées dans « Explique-moi », révisions mieux ciblées.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx, Q = AA.quiz, T = AA.tutor, V = AA.views;
  const S = () => AA.S;
  const esc = s => u.esc(String(s == null ? "" : s));

  /* ---------- Thèmes ---------- */
  const add = th => { if (!AA.THEMES.some(x => x.id === th.id)) AA.THEMES.push(th); };
  add({ id: "nacre", preview: ["#F7F3EC", "#0F5C78", "#C8963E"], dark: false, meta: "#F7F3EC", mode: "light" });
  add({ id: "minuit", preview: ["#070B16", "#7FD1E8", "#E2B867"], dark: true, meta: "#070B16", mode: "dark" });
  add({ id: "auto", preview: ["#050E1A", "#EAF5F7", "#3EE6D8"], dark: null, meta: "#050E1A", mode: "auto" });
  AA.THEMES.forEach(th => { if (!th.mode) th.mode = th.dark ? "dark" : "light"; });
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  const resolve = id => id === "auto" ? (mq && !mq.matches ? "lagon" : "abysse") : id;
  ui.applyTheme = () => {
    const p = AA.S.profile, want = (AA.THEMES.find(x => x.id === p.theme) || AA.THEMES[0]).id, id = resolve(want);
    const th = AA.THEMES.find(x => x.id === id) || AA.THEMES[0];
    document.documentElement.dataset.aaTheme = th.id;
    document.documentElement.dataset.aaMode = th.dark ? "dark" : "light";
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = th.meta;
  };
  if (mq && mq.addEventListener) mq.addEventListener("change", () => { if (AA.S && AA.S.profile.theme === "auto") ui.applyTheme(); });
  /* Pastilles regroupées : clair, sombre, automatique. */
  ui.swatches = cur => {
    const grp = mode => AA.THEMES.filter(th => th.mode === mode);
    const btn = th => `<button class="swatch" data-theme="${th.id}" aria-pressed="${cur === th.id}"><i style="background:linear-gradient(135deg,${th.preview[0]} 0 50%,${th.preview[1]} 50% 75%,${th.preview[2]} 75%)"></i><span>${t("theme." + th.id)}</span></button>`;
    return `<div class="sw-groups" role="group" aria-label="${t("set.theme")}">${["light", "dark", "auto"].map(mo => grp(mo).length ? `<div class="sw-group"><p class="eyebrow">${t("theme.mode." + mo)}</p><div class="swatches">${grp(mo).map(btn).join("")}</div></div>` : "").join("")}</div>`;
  };
  AA.ui.swatches = ui.swatches;

  /* ---------- Cours premium ---------- */
  const wrap = (name, fn) => { const v = V[name]; if (!v) return; const r = v.render; v.render = (el, args) => { r(el, args); try { fn(el, args || []); } catch (e) { console.error(e); } }; };
  const CALL_IC = { ex: "bulb", trap: "info", check: "check", ok: "check", "": "book" };
  AA.lessonPolish = (body, m, tab) => {
    if (!body || body.dataset.polished) return; body.dataset.polished = 1;
    const prose = u.$$(".prose", body);
    /* Tableaux : en-têtes recopiés sur chaque cellule, empilés sur petit écran. */
    u.$$("table", body).forEach(tb => {
      const hs = u.$$("thead th, tr:first-child th", tb).map(th => th.textContent.trim());
      u.$$("tbody tr, tr", tb).forEach(tr => u.$$("td", tr).forEach((td, i) => { if (hs[i]) td.dataset.label = hs[i]; }));
      tb.classList.add("tbl-stack"); const w = tb.closest(".tbl"); if (w) w.classList.add("tbl-pro");
    });
    /* Chapitres numérotés. */
    let n = 0; prose.forEach(p => u.$$(":scope > h3", p).forEach(h => { if (h.querySelector(".sec-n")) return; n++; h.insertAdjacentHTML("afterbegin", `<span class="sec-n" aria-hidden="true">${String(n).padStart(2, "0")}</span>`); h.classList.add("sec-h"); }));
    /* Encadrés : une icône selon le type. */
    u.$$(".callout", body).forEach(c => { const e = u.$(".eyebrow", c); if (!e || e.querySelector("svg")) return; const k = ["ex", "trap", "check", "ok"].find(x => c.classList.contains(x)) || ""; e.insertAdjacentHTML("afterbegin", AA.icon(CALL_IC[k]) + " "); e.classList.add("ce-eb"); });
    /* Mots clés : surlignage animé à l'apparition. */
    prose.forEach(p => u.$$("b, strong", p).forEach(b => { if (!b.closest(".callout pre, table, h3")) b.classList.add("kw"); }));
    /* Points clés en tête de l'essentiel. */
    if (tab === "essentiel" && m.memo && m.memo.length && !u.$(".keypts", body)) {
      const pts = m.memo.slice(0, 3);
      const html = `<section class="keypts" aria-label="${t("les24.key")}"><p class="eyebrow">${AA.icon("star")} ${t("les24.key")}</p><div class="keypts-g">${pts.map(([a, b], i) => `<div class="kp" style="--i:${i}"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div></section>`;
      body.insertAdjacentHTML("afterbegin", html);
    }
    /* Apparition progressive et schémas qui s'animent à l'écran. */
    const items = u.$$(".keypts, .prose > *, .diagram, .callout, .memo > div", body).filter(x => !x.classList.contains("reveal"));
    if (AA.a11y.reduced() || !("IntersectionObserver" in window)) { items.forEach(x => x.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    items.forEach(x => { x.classList.add("reveal"); io.observe(x); });
  };
  wrap("lesson", (el, [id, tab0]) => {
    const m = C.byId[id]; if (!m) return; const tb = u.$(".lesson-tabs [aria-pressed=true]", el), tab = tb ? tb.dataset.tab : tab0 || "essentiel";
    AA.lessonPolish(u.$(".lesson-body", el), m, tab);
    const hero = u.$(".lesson-hero", el); if (hero) hero.classList.add("hero24");
  });

  /* ---------- Tuteur : diagnostic ---------- */
  const zerosRecent = nid => { const r = T.stat(nid); if (!r) return 0; return (r.h.slice(-4).match(/0/g) || []).length; };
  T.repeated = nid => zerosRecent(nid) >= 2;
  /* Cause probable d'une difficulté, et l'action qui va avec. */
  T.cause = nid => {
    const n = T.notion(nid); if (!n) return null; const r = T.stat(nid), st = T.nState(nid);
    if (!T.isRead(n.mid)) return { k: "unread", ic: "book" };
    if (!r || !r.n) return { k: "untested", ic: "play" };
    if (st === "master" || st === "ok") { const days = r.d ? u.daysBetween(r.d, u.today()) : 0; return days > 21 ? { k: "stale", ic: "refresh", d: days } : { k: "solid", ic: "check" }; }
    if (n.gen || /calc|gen/.test(n.id)) return { k: "calc", ic: "calc" };
    if (T.repeated(nid)) return { k: "confusion", ic: "buoy" };
    const days = r.d ? u.daysBetween(r.d, u.today()) : 0;
    if (days > 14 && /1/.test(r.h.slice(0, -2))) return { k: "forgot", ic: "refresh", d: days };
    return { k: "fragile", ic: "target" };
  };
  const PRIO = { confusion: 0, calc: 1, fragile: 2, forgot: 3, stale: 4, untested: 5, unread: 6, solid: 9 };
  T.diagnose = wid => {
    const out = [];
    C.inWorld(wid).forEach(m => T.notions(m.id).filter(n => !n.gen).forEach(n => { const c = T.cause(n.id); if (c) out.push({ n, c, m: T.mastery(n.id) }); }));
    return out;
  };
  const DW = () => { const g = G.goalWorld(); return AA.ctx.dw && C.worldById[AA.ctx.dw] ? AA.ctx.dw : g; };
  AA.view("diagnostic", {
    tab: "train", depth: 2,
    render(el) {
      const wid = DW(), W = C.worldById[wid], all = T.diagnose(wid);
      const by = k => all.filter(x => x.c.k === k);
      const solid = by("solid").length, tot = all.length || 1, tested = all.filter(x => x.m != null);
      const avg = tested.length ? tested.reduce((a, x) => a + x.m, 0) / tested.length : 0;
      const prio = all.filter(x => !["solid", "unread"].includes(x.c.k)).sort((a, b) => PRIO[a.c.k] - PRIO[b.c.k] || (a.m ?? .5) - (b.m ?? .5)).slice(0, 3);
      const worlds = C.worlds.filter(w => !w.soon && C.inWorld(w.id).length);
      const pctTxt = Math.round(avg * 100), dash = Math.round(avg * 283);
      const row = x => { const k = x.c.k; return `<div class="dg-row dg-${k}"><span class="dg-ic">${AA.icon(x.c.ic)}</span><div class="grow"><b>${esc(x.n.t)}</b><span class="xs muted">${esc(C.byId[x.n.mid].title)} · ${t("dg.c." + k, { d: x.c.d || "" })}</span>
        ${x.m != null ? `<i class="dg-bar"><b style="width:${Math.round(x.m * 100)}%"></b></i>` : ""}</div>
        ${k === "unread" ? `<a class="btn ghost sm" href="#/lesson/${x.n.mid}">${AA.icon("book")}</a>` : k === "solid" ? "" : `<button class="btn ghost sm" data-dgo="${x.n.id}" aria-label="${t("dg.train")}">${AA.icon("play")}</button><button class="btn ghost sm" data-dread="${x.n.id}" aria-label="${t("dg.read")}">${AA.icon("book")}</button>`}</div>`; };
      const sec = (k, list) => list.length ? `<details class="card dg-sec" ${["confusion", "calc", "fragile"].includes(k) ? "open" : ""}><summary><b>${t("dg.s." + k)}</b><span class="chip">${list.length}</span></summary>${list.map(row).join("")}</details>` : "";
      el.innerHTML = `${ui.head(t("dg.title"), "train")}
        <div class="seg dg-worlds" role="tablist">${worlds.map(w => `<button data-dw="${w.id}" aria-pressed="${w.id === wid}">${esc(w.short)}</button>`).join("")}</div>
        <section class="card dg-hero"><svg class="dg-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" class="tr"/><circle cx="50" cy="50" r="45" class="fg" style="stroke-dasharray:${dash} 283"/></svg>
          <div class="grow"><p class="eyebrow">${esc(W.short)}</p><h2>${t("dg.mastery", { p: pctTxt })}</h2><p class="small muted">${t("dg.sum", { s: solid, n: all.length, c: by("confusion").length + by("calc").length + by("fragile").length })}</p></div></section>
        ${prio.length ? `<section class="card dg-prio"><p class="eyebrow">${AA.icon("target")} ${t("dg.prio")}</p>${prio.map((x, i) => `<div class="dg-p" style="--i:${i}"><span class="dg-num">${i + 1}</span><div class="grow"><b>${esc(x.n.t)}</b><span class="small muted">${t("dg.why." + x.c.k, { d: x.c.d || "" })}</span></div><button class="btn sm" data-dgo="${x.n.id}">${t("dg.go")}</button></div>`).join("")}</section>` : `<p class="callout ok">${t("dg.none")}</p>`}
        ${["confusion", "calc", "fragile", "forgot", "stale", "untested", "unread", "solid"].map(k => sec(k, by(k))).join("")}
        <p class="small muted">${t("dg.how")}</p>`;
      u.$$("[data-dw]", el).forEach(b => b.onclick = () => { AA.ctx.dw = b.dataset.dw; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-dgo]", el).forEach(b => b.onclick = () => T.drill(b.dataset.dgo));
      u.$$("[data-dread]", el).forEach(b => b.onclick = () => T.openNotion(b.dataset.dread));
    }
  });
  /* Le diagnostic apparaît dans les prochaines étapes du tuteur. */
  const act0 = T.actions;
  T.actions = () => { const a = act0(); const any = Object.keys(S().nstat || {}).length >= 6; if (any) a.splice(Math.min(3, a.length), 0, { k: "diag", ic: "chart", t: t("dg.actT"), s: t("dg.actS"), run: () => AA.router.go("diagnostic") }); return a; };
  /* Séance du tuteur : d'abord les confusions, puis ce qui s'oublie. */
  const sess0 = T.session;
  T.session = () => {
    const conf = Object.keys(S().nstat || {}).filter(nid => T.notion(nid) && T.repeated(nid) && T.isRead(nid.split(":")[0]) && G.inPlay(nid.split(":")[0]));
    const stale = Object.keys(S().nstat || {}).filter(nid => { const c = T.notion(nid) && T.cause(nid); return c && (c.k === "stale" || c.k === "forgot"); });
    AA.ctx.tuBoost = u.shuffle(conf).slice(0, 2).concat(u.shuffle(stale).slice(0, 2));
    return sess0();
  };
  const start0 = Q.start;
  Q.start = (mode, qs, opts) => {
    if (mode === "tutor" && AA.ctx.tuBoost && AA.ctx.tuBoost.length) {
      const have = new Set(qs.map(q => q.id)), extra = [];
      AA.ctx.tuBoost.forEach(nid => { const q = u.shuffle(T.qsOf(nid)).find(x => !have.has(x.id)); if (q) { extra.push(q); have.add(q.id); } });
      AA.ctx.tuBoost = null;
      if (extra.length) { const keep = qs.filter(q => !q.gen).slice(0, Math.max(6, 11 - extra.length)), gens = qs.filter(q => q.gen); qs = u.shuffle(keep.concat(extra)).concat(gens); }
    }
    return start0(mode, qs, opts);
  };

  /* ---------- Explique-moi : erreurs répétées ---------- */
  const exp0 = AA.explainMe;
  AA.explainMe = (q, picked) => {
    exp0(q, picked);
    const nid = T.notionOf(q); if (!nid || !T.repeated(nid)) return;
    const n = T.notion(nid), r = T.stat(nid), root = document.querySelector(".exp-sheet"); if (!root || !n) return;
    const errs = (r.h.slice(-4).match(/0/g) || []).length, tot = Math.min(4, r.h.length);
    const box = `<div class="callout trap exp-rep"><span class="eyebrow">${AA.icon("buoy")} ${t("exp3.repT")}</span>${t("exp3.rep", { e: errs, n: tot, t: esc(n.t) })}<button class="btn sm block" id="expDrill" style="margin-top:8px">${AA.icon("target")} ${t("exp3.drill")}</button></div>`;
    const bars = root.querySelector(".exp-bars"); if (bars) bars.insertAdjacentHTML("afterend", box); else root.insertAdjacentHTML("afterbegin", box);
    const b = root.querySelector("#expDrill"); if (b) b.onclick = () => { document.querySelectorAll(".sheet-wrap").forEach(x => x._close && x._close()); T.drill(nid); };
  };
})();
