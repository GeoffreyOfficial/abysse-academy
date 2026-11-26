/* =====================================================================
   Abysse Academy 1.9
   - Briefing de palanquée simulé (choisir, ordonner, répondre, modèle).
   - Atelier plongées successives : la méthode pas à pas, avec des
     majorations d'exercice (jamais les valeurs de la table).
   - Défis de la semaine (3 par semaine) et événements de saison.
   - Duels à distance par code ou lien, classement de club sans serveur
     (cartes de score échangées, codes vérifiés par une somme de contrôle).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx, Q = AA.quiz;
  const S = () => AA.S;
  const V = (AA.v19 = {});

  /* ---------- État (anciens profils : champs créés à la demande) ---------- */
  const st = () => {
    const s = S();
    if (!s.v19 || typeof s.v19 !== "object") s.v19 = {};
    const v = s.v19;
    ["brief", "succ", "weeks", "events", "rduel"].forEach(k => { if (typeof v[k] !== "number") v[k] = 0; });
    if (!v.ev || typeof v.ev !== "object") v.ev = {};
    if (!v.club || typeof v.club !== "object") v.club = { name: "", members: {} };
    if (!v.club.members || typeof v.club.members !== "object") v.club.members = {};
    if (!Array.isArray(v.duels)) v.duels = [];
    if (!v.cid) v.cid = Math.random().toString(36).slice(2, 10);
    return v;
  };
  V.state = st;

  /* ---------- Semaine ISO ---------- */
  const isoWeek = day => {
    const x = new Date((day || u.today()) + "T12:00:00"), wd = (x.getDay() + 6) % 7;
    x.setDate(x.getDate() - wd + 3);
    const y = x.getFullYear(), j4 = new Date(y, 0, 4, 12);
    const w = 1 + Math.round(((x - j4) / 864e5 - 3 + ((j4.getDay() + 6) % 7)) / 7);
    return y + "-W" + String(w).padStart(2, "0");
  };
  const weekStart = () => { const x = new Date(u.today() + "T12:00:00"); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return u.dstr(x); };
  V.isoWeek = isoWeek;
  V.week = () => {
    const v = st(), id = isoWeek();
    if (!v.week || v.week.id !== id) v.week = { id, c: {}, got: {} };
    if (!v.week.c) v.week.c = {}; if (!v.week.got) v.week.got = {};
    return v.week;
  };
  V.weekChallenges = () => {
    const pool = (C.weekly || []).slice(), r = u.seeded(u.seedOf(isoWeek() + "aa")), out = [];
    while (out.length < 3 && pool.length) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
    return out;
  };

  /* ---------- Événements de saison ---------- */
  const md = d => d.slice(5);
  V.events = () => { const today = md(u.today()); return (C.events || []).filter(e => e.from <= today && today <= e.to); };
  V.nextEvent = () => {
    const today = md(u.today()), list = (C.events || []).slice().sort((a, b) => a.from.localeCompare(b.from));
    return list.find(e => e.from > today) || list[0] || null;
  };
  const evKey = e => e.id + "-" + u.today().slice(0, 4);
  const evState = e => { const v = st(), k = evKey(e); if (!v.ev[k] || typeof v.ev[k] !== "object") v.ev[k] = { c: {}, got: 0 }; if (!v.ev[k].c) v.ev[k].c = {}; return v.ev[k]; };
  const evDays = e => { const y = u.today().slice(0, 4); return (S().days || []).filter(d => d >= y + "-" + e.from && d <= y + "-" + e.to).length; };
  V.evProgress = e => { const n = e.goal.n, v = e.goal.k === "days" ? evDays(e) : (evState(e).c[e.goal.k] || 0); return [Math.min(v, n), n]; };
  const daysLeft = e => u.daysBetween(u.today(), u.today().slice(0, 4) + "-" + e.to);

  /* ---------- Compteurs ---------- */
  let quiet = 0;
  const bump = (k, n) => {
    n = n == null ? 1 : n;
    try {
      const w = V.week(); w.c[k] = (w.c[k] || 0) + n;
      V.events().forEach(e => { const r = evState(e); r.c[k] = (r.c[k] || 0) + n; });
    } catch (e) {}
  };
  V.bump = bump;
  V.weekVal = ch => { if (ch.k === "days") { const ws = weekStart(); return (S().days || []).filter(d => d >= ws).length; } return V.week().c[ch.k] || 0; };

  const rec = G.record;
  G.record = function (q, ok) {
    const r = rec.apply(this, arguments);
    bump("ans"); if (ok) bump("ok");
    if (q && (q.calc || q.gen) && ok) bump("calcOk");
    if (AA.ctx && AA.ctx.mode === "srs") bump("srs");
    return r;
  };
  const rate = G.rateCard;
  G.rateCard = function () { const r = rate.apply(this, arguments); bump("flash"); return r; };
  const addXp = G.addXp;
  G.addXp = function (n) { const r = addXp.apply(this, arguments); if (n > 0 && !quiet) bump("xp", n); return r; };
  const giveXp = (n, el) => { quiet++; try { G.addXp(n, el); } finally { quiet--; } };
  if (AA.examReport) { const er = AA.examReport; AA.examReport = function (c) { if (c && !c._v19) { c._v19 = 1; bump("exam"); } return er.apply(this, arguments); }; }
  /* Mode ordinateur et duel sur place : comptés à partir des totaux. */
  const watch = { pc: () => S().pcRuns || 0, duel: () => S().duels || 0 };
  const lastTot = {};
  const syncTotals = () => { Object.keys(watch).forEach(k => { const v = watch[k](); if (lastTot[k] != null && v > lastTot[k]) bump(k, v - lastTot[k]); lastTot[k] = v; }); };
  AA.store.onSave && AA.store.onSave(() => { try { syncTotals(); } catch (e) {} });
  V.resetTotals = () => Object.keys(watch).forEach(k => (lastTot[k] = watch[k]()));

  /* Trophées de la 1.9 */
  const cond = G.cond;
  G.cond = function (c) { if (c && c.k === "v19") return [st()[c.f] || 0, c.n || 1]; return cond.apply(this, arguments); };
  const qg = G.questGo;
  G.questGo = function (c) { if (c && c.k === "v19") return { brief: "brief", succ: "succ", rduel: "club", weeks: "quests", events: "quests" }[c.f] || "quests"; return qg.apply(this, arguments); };

  /* Fusion de deux sauvegardes : on garde le plus avancé. */
  const merge = AA.store.merge;
  AA.store.merge = function (a, b) {
    const r = merge.apply(this, arguments);
    try {
      const x = (a && a.v19) || {}, y = (b && b.v19) || {}, z = Object.assign({}, x, y);
      ["brief", "succ", "weeks", "events", "rduel"].forEach(k => (z[k] = Math.max(x[k] || 0, y[k] || 0)));
      z.ev = Object.assign({}, x.ev || {}, y.ev || {});
      z.club = { name: (y.club || {}).name || (x.club || {}).name || "", members: Object.assign({}, (x.club || {}).members || {}) };
      Object.entries((y.club || {}).members || {}).forEach(([id, m]) => { const o = z.club.members[id]; if (!o || (m.t || 0) >= (o.t || 0)) z.club.members[id] = m; });
      const all = (x.duels || []).concat(y.duels || []), seen = {};
      z.duels = all.filter(d => { if (!d || !d.i) return false; const k = d.i + d.role; if (seen[k]) { if (d.opp && !seen[k].opp) seen[k].opp = d.opp; return false; } seen[k] = d; return true; }).slice(-60);
      z.cid = x.cid || y.cid;
      r.v19 = z;
    } catch (e) {}
    return r;
  };

  /* =====================================================================
     Défis de la semaine : carte de l'accueil et section des quêtes
     ===================================================================== */
  const chLine = (ch, full) => {
    const w = V.week(), v = Math.min(V.weekVal(ch), ch.n), done = v >= ch.n, got = w.got[ch.id];
    const right = got ? `<span class="chip ok">✓</span>` : done ? (full ? `<button class="btn gold sm" data-wclaim="${ch.id}">+50 XP</button>` : `<span class="chip gold">${t("wk.claim")}</span>`) : `<span class="xs muted mono">${v}/${ch.n}</span>`;
    return `<div class="wk-ch ${done ? "done" : ""}"><span class="wk-ic">${AA.icon(done ? "check" : ch.ic || "target")}</span><span class="wk-tx"><b class="small">${u.esc(ch.t)}</b>${ui.bar(v / ch.n, "var(--gold)")}</span>${right}${full && !done && ch.go ? `<button class="btn ghost sm" data-wgo="${u.esc(ch.go)}" aria-label="${t("home.doIt")}">${AA.icon("next")}</button>` : ""}</div>`;
  };
  const evCard = (full) => {
    const e = V.events()[0];
    if (!e) { const n = V.nextEvent(); return n && full ? `<section class="card ev-card ev-soon" style="--ec:var(${n.color || "--primary"})"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon(n.ic)}</span><div class="grow"><p class="eyebrow">${t("ev.soon")}</p><h3>${u.esc(n.title)}</h3><p class="small muted" style="margin:0">${t("ev.from", { d: evDate(n.from) })}</p></div></div></section>` : ""; }
    const [v, n] = V.evProgress(e), done = v >= n, s = evState(e), left = daysLeft(e);
    return `<section class="card ev-card" style="--ec:var(${e.color || "--primary"})"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal ev-medal">${AA.icon(e.ic)}</span><div class="grow"><p class="eyebrow">${t("ev.now")} · ${t(left > 1 ? "ev.left" : "ev.last", { n: left })}</p><h3>${u.esc(e.title)}</h3></div></div>
      <p class="small" style="margin:var(--sp-2) 0">${u.esc(e.text)}</p>${ui.bar(v / n, `var(${e.color || "--primary"})`)}
      <div class="row between" style="margin-top:6px"><span class="xs muted mono">${v}/${n}</span>${s.got ? `<span class="chip ok">${t("ev.done")}</span>` : done ? (full ? `<button class="btn gold sm" data-evclaim="${e.id}">+${e.xp} XP</button>` : `<a class="chip gold" href="#/quests">${t("wk.claim")}</a>`) : `<span class="chip">+${e.xp} XP</span>`}</div></section>`;
  };
  const evDate = mmdd => { const [m, d] = mmdd.split("-").map(Number); return new Date(2000, m - 1, d).toLocaleDateString(AA.i18n ? AA.i18n.locale : "fr-FR", { day: "numeric", month: "long" }); };
  AA.weekCard = () => {
    const chs = V.weekChallenges(), w = V.week(), nd = chs.filter(c => V.weekVal(c) >= c.n).length;
    return `<div class="section-title"><h3>${t("wk.title")} ${AA.helpBtn("week")}</h3><a class="small" href="#/quests">${t("wk.see")}</a></div>
      <a class="card wk-card" href="#/quests" aria-label="${t("wk.title")} : ${nd}/3">${chs.map(c => chLine(c, false)).join("")}<p class="xs muted" style="margin:6px 0 0">${t("wk.ends", { n: 7 - ((new Date().getDay() + 6) % 7) })}${w.got.all ? " · " + t("wk.allDone") : ""}</p></a>
      ${evCard(false)}`;
  };
  AA.weekSection = () => {
    const chs = V.weekChallenges(), w = V.week(), all = chs.every(c => V.weekVal(c) >= c.n);
    return `<section class="card wk-full"><div class="row" style="gap:var(--sp-3)"><span class="medal">${AA.icon("trophy")}</span><div class="grow"><h3>${t("wk.title")}</h3><p class="small muted" style="margin:0">${t("wk.sub", { n: 7 - ((new Date().getDay() + 6) % 7) })}</p></div></div>
      <div class="stack" style="margin-top:var(--sp-3);gap:var(--sp-2)">${chs.map(c => chLine(c, true)).join("")}</div>
      ${all ? (w.got.all ? `<p class="small muted">${t("wk.allDone")}</p>` : `<button class="btn block" data-wclaim="all" style="margin-top:var(--sp-3)">${AA.icon("trophy")} ${t("wk.bonus")}</button>`) : `<p class="xs muted" style="margin:var(--sp-2) 0 0">${t("wk.bonusS")}</p>`}</section>
      <div style="margin-top:var(--sp-4)">${evCard(true)}</div>`;
  };
  /* Réclamer : délégation globale (accueil et quêtes). */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-wclaim],[data-evclaim],[data-wgo]"); if (!b) return;
    e.preventDefault();
    if (b.dataset.wgo) { fx.sfx.tap(); AA.goTo(b.dataset.wgo); return; }
    const v = st();
    if (b.dataset.evclaim) {
      const ev = V.events().find(x => x.id === b.dataset.evclaim); if (!ev) return;
      const s = evState(ev), [p, n] = V.evProgress(ev); if (s.got || p < n) return;
      s.got = u.today(); v.events++; giveXp(ev.xp, b);
    } else {
      const w = V.week(), id = b.dataset.wclaim, chs = V.weekChallenges();
      if (w.got[id]) return;
      if (id === "all") { if (!chs.every(c => V.weekVal(c) >= c.n)) return; w.got.all = u.today(); v.weeks++; giveXp(100, b); }
      else { const ch = chs.find(c => c.id === id); if (!ch || V.weekVal(ch) < ch.n) return; w.got[id] = u.today(); giveXp(50, b); }
    }
    AA.store.save(); fx.sfx.badge(); fx.buzz([20, 30, 20]); fx.burstAt(b, 24, "rgba(255,200,87,.9)"); G.checkBadges(); setTimeout(AA.router.refresh, 450);
  });

  /* =====================================================================
     Briefing de palanquée
     ===================================================================== */
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const DIVERS = { n1: { l: "N1", pe: 20, pa: 0 }, n1d: { l: "N1 débutant", pe: 20, pa: 0 }, n2: { l: "N2", pe: 40, pa: 20 }, n3: { l: "N3", pe: 60, pa: 60 } };
  V.newBrief = role => {
    const B = C.brief, site = u.pick(B.sites), cond = u.pick(B.conds);
    role = role === "auto" ? "auto" : "gp";
    let team, lim;
    if (role === "auto") { team = ["n2"]; lim = 20; }
    else { team = u.pick([["n1", "n2", "n2"], ["n1d", "n1"], ["n2", "n2", "n2"], ["n1", "n1", "n2"], ["n2", "n3"]]); lim = Math.min(...team.map(k => DIVERS[k].pe)); }
    const dp = role === "auto" ? u.pick([20, 20, 18, 15]) : u.pick([20, 25, 30, 35, 40].filter(x => x <= 40));
    const max = Math.min(dp, lim, site.deep), dur = u.pick([35, 40, 45, 50]);
    const tank = u.pick([[12, 200], [12, 230], [15, 200], [15, 230]]);
    return { role, site, cond, team, lim, dp, max, dur, tank, mid: Math.round(tank[1] / 2 / 10) * 10 };
  };
  const teamTxt = b => b.role === "auto" ? t("br.teamAuto") : t("br.teamGp", { list: b.team.map(k => DIVERS[k].l).join(", ") });
  const opts4 = (good, wrongs) => { const vals = [good].concat(wrongs.filter(x => x !== good)).filter((x, i, A) => A.indexOf(x) === i).slice(0, 4); const c = u.shuffle(vals); return { c, a: c.indexOf(good) }; };
  const briefQs = b => {
    const B = C.brief, qs = [], unit = x => x + " m";
    const d = opts4(unit(b.max), [unit(b.dp), unit(b.site.deep), unit(b.lim === 20 && b.dp > 20 ? b.dp : b.max + 5), unit(Math.max(10, b.max - 5))]);
    qs.push({ q: t("br.qDepth", { dp: b.dp, site: b.site.deep, team: teamTxt(b) }), c: d.c, a: d.a, e: b.max < b.dp ? t(b.max === b.lim ? "br.eDepthLim" : "br.eDepthSite", { m: b.max, lim: b.lim }) : t("br.eDepthDp", { m: b.max }) });
    const p = b.tank[1], m = opts4(b.mid + " bar", [50 + " bar", (p - 50) + " bar", 70 + " bar", (b.mid + 30) + " bar"]);
    qs.push({ q: t("br.qMid", { v: b.tank[0], p }), c: m.c, a: m.a, e: t("br.eMid", { m: b.mid }) });
    const hz = opts4(b.site.hz, u.shuffle(C.brief.sites.filter(s => s.id !== b.site.id).map(s => s.hz)));
    qs.push({ q: t("br.qSite", { site: b.site.n }), c: hz.c, a: hz.a, e: t("br.eSite") });
    const cd = opts4(b.cond.c[0], b.cond.c.slice(1)); qs.push({ q: b.cond.q, c: cd.c, a: cd.a, e: b.cond.e });
    const lo = opts4(B.lost.c[0], B.lost.c.slice(1)); qs.push({ q: B.lost.q, c: lo.c, a: lo.a, e: B.lost.e });
    if (b.team.includes("n1d")) qs.push(Object.assign({ e: t("br.eNew") }, opts4(t("br.aNew"), [t("br.wNew1"), t("br.wNew2"), t("br.wNew3")]), { q: t("br.qNew") }));
    else { const w = opts4(B.who.c[0], B.who.c.slice(1)); qs.push({ q: B.who.q, c: w.c, a: w.a, e: B.who.e }); }
    return qs;
  };
  const modelBrief = b => {
    const s = b.site, lines = [
      [t("br.plan1"), t("br.m1", { site: s.n, see: s.see, cond: b.cond.n.toLowerCase(), hz: s.hz })],
      [t("br.plan2"), t("br.m2", { max: b.max, dur: b.dur, mid: b.mid })],
      [t("br.plan3"), b.role === "auto" ? t("br.m3auto") : t("br.m3gp", { team: b.team.map(k => DIVERS[k].l).join(", ") })],
      [t("br.plan4"), b.cond.id === "courant" ? t("br.m4cur") : t("br.m4")],
      [t("br.plan5"), t("br.m5")],
      [t("br.plan6"), t("br.m6")]
    ];
    return `<div class="br-model">${lines.map(([h, p], i) => `<div class="br-step"><span class="br-n">${i + 1}</span><div><b>${h}</b><p class="small" style="margin:2px 0 0">${p}</p></div></div>`).join("")}</div>`;
  };
  const briefCtx = role => {
    const b = V.newBrief(role), B = C.brief;
    const items = u.shuffle(B.items.map(x => ({ t: x.t, w: x.w, ok: 1 })).concat(u.shuffle(B.wrong).slice(0, 4).map(x => ({ t: x.t, w: x.w, ok: 0 }))));
    return { b, phase: 0, items, sel: {}, order: [], plan: u.shuffle(B.plan.map((x, i) => Object.assign({ i }, x))), qs: briefQs(b), qi: 0, pick: null, sc: [0, 0, 0], saved: false };
  };
  const briefHead = (c, step) => `<div class="pagehead"><a class="closebtn" href="#/brief" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${t("br.title")} · ${t("br.step", { i: step, n: 3 })}</span></div>
    <div class="br-steps" aria-hidden="true">${[1, 2, 3].map(k => `<i class="${k < step ? "done" : k === step ? "on" : ""}"></i>`).join("")}</div>`;
  const briefCard = b => `<section class="card br-card"><div class="br-site"><span class="medal">${AA.icon("flag")}</span><div><p class="eyebrow">${t("br.dive")}</p><h3>${u.esc(b.site.n)}</h3></div></div>
    <dl class="br-facts"><div><dt>${t("br.fDp")}</dt><dd>${b.dp} m · ${b.dur} min</dd></div><div><dt>${t("br.fSite")}</dt><dd>${t("br.fSiteV", { d: b.site.deep })}</dd></div><div><dt>${t("br.fCond")}</dt><dd>${u.esc(b.cond.n)}</dd></div><div><dt>${t("br.fTank")}</dt><dd>${b.tank[0]} L · ${b.tank[1]} bar</dd></div><div class="wide"><dt>${t("br.fTeam")}</dt><dd>${u.esc(teamTxt(b))}</dd></div></dl></section>`;
  AA.view("brief", {
    tab: "lab", depth: 30,
    render(el, [role]) {
      const v = st();
      if (!role) {
        el.innerHTML = `${ui.head(t("br.title"), "lab", AA.helpBtn("brief"))}<p class="muted">${t("br.intro")}</p>
          <div class="tiles one-sm" style="margin-top:var(--sp-4)">
            ${ui.tile("gp", "users", "var(--world-n4, var(--primary))", t("br.gp"), t("br.gpS"))}
            ${ui.tile("auto", "dive", "var(--ok)", t("br.auto"), t("br.autoS"))}
          </div>
          ${v.brief ? `<p class="small muted" style="margin-top:var(--sp-4)">${t("br.stats", { n: v.brief })}</p>` : ""}
          ${ui.callout("check", t("common.validate"), u.esc(C.brief.note))}`;
        u.on(el, "click", ".tile", (e, b) => { fx.sfx.tap(); AA.ctx.brief = briefCtx(b.dataset.t); AA.router.go("brief/" + b.dataset.t); });
        return;
      }
      const c = AA.ctx.brief && AA.ctx.brief.b && AA.ctx.brief.b.role === (role === "auto" ? "auto" : "gp") ? AA.ctx.brief : (AA.ctx.brief = briefCtx(role)), b = c.b;
      if (c.phase === 0) {
        el.innerHTML = `${briefHead(c, 1)}${briefCard(b)}<h2 class="qtext" style="margin-top:var(--sp-4)">${t("br.p1")}</h2><p class="small muted">${t("br.p1S")}</p>
          <div class="br-items">${c.items.map((x, i) => `<button class="br-it ${c.sel[i] ? "on" : ""}" data-i="${i}" aria-pressed="${!!c.sel[i]}"><span class="ck">${c.sel[i] ? AA.icon("check") : ""}</span><span>${u.esc(x.t)}</span></button>`).join("")}</div>
          <button class="btn block" id="brv" style="margin-top:var(--sp-4)">${t("br.check")}</button>`;
        u.$$(".br-it", el).forEach(x => x.onclick = () => { const i = +x.dataset.i; c.sel[i] = !c.sel[i]; fx.sfx.tap(); x.classList.toggle("on", c.sel[i]); x.setAttribute("aria-pressed", c.sel[i]); u.$(".ck", x).innerHTML = c.sel[i] ? AA.icon("check") : ""; });
        u.$("#brv").onclick = () => {
          const good = c.items.filter((x, i) => x.ok && c.sel[i]).length, bad = c.items.filter((x, i) => !x.ok && c.sel[i]).length, tot = c.items.filter(x => x.ok).length;
          c.sc[0] = Math.max(0, good - bad) / tot; c.phase = 0.5; c.p1 = { good, bad, tot }; (c.sc[0] >= .8 ? fx.sfx.ok : fx.sfx.bad)(); AA.router.refresh();
        };
        return;
      }
      if (c.phase === 0.5) {
        el.innerHTML = `${briefHead(c, 1)}<section class="card stack"><h3>${t("br.p1R", { g: c.p1.good, n: c.p1.tot })}${c.p1.bad ? " · " + t("br.p1Bad", { n: c.p1.bad }) : ""}</h3>
          <div class="br-items">${c.items.map((x, i) => { const s = !!c.sel[i], cls = x.ok ? (s ? "good" : "miss") : (s ? "wrong" : "skip"); return `<div class="br-it res ${cls}"><span class="ck">${AA.icon(x.ok ? "check" : "x")}</span><span><b class="small">${u.esc(x.t)}</b>${cls !== "good" && cls !== "skip" || !x.ok ? `<span class="xs muted" style="display:block">${u.esc(x.w)}</span>` : ""}</span></div>`; }).join("")}</div>
          <button class="btn block" id="brn">${t("quiz.next")} ${AA.icon("next")}</button></section>`;
        u.$("#brn").onclick = () => { c.phase = 1; AA.router.refresh(); };
        return;
      }
      if (c.phase === 1) {
        const done = c.order.length === c.plan.length;
        el.innerHTML = `${briefHead(c, 2)}<h2 class="qtext">${t("br.p2")}</h2><p class="small muted">${t("br.p2S")}</p>
          <ol class="br-order">${c.order.map((k, i) => { const x = c.plan.find(p => p.i === k); return `<li class="${c.checked ? (x.i === i ? "good" : "wrong") : ""}"><span class="br-n">${i + 1}</span>${u.esc(x.t)}${c.checked && x.i !== i ? `<span class="xs muted"> · ${t("br.pos", { n: x.i + 1 })}</span>` : ""}</li>`; }).join("")}</ol>
          ${c.checked ? "" : `<div class="br-pool">${c.plan.filter(p => !c.order.includes(p.i)).map(p => `<button class="btn ghost" data-p="${p.i}">${u.esc(p.t)}</button>`).join("")}</div>`}
          <div class="row" style="margin-top:var(--sp-4);gap:var(--sp-2)">${c.checked ? `<button class="btn block" id="brn">${t("quiz.next")} ${AA.icon("next")}</button>` : `<button class="btn ghost" id="brr" ${c.order.length ? "" : "disabled"}>${AA.icon("refresh")} ${t("br.undo")}</button><button class="btn grow" id="brv" ${done ? "" : "disabled"}>${t("br.check")}</button>`}</div>
          ${c.checked ? `<p class="small muted">${t("br.p2Note")}</p>` : ""}`;
        u.$$("[data-p]", el).forEach(x => x.onclick = () => { c.order.push(+x.dataset.p); fx.sfx.tap(); AA.router.refresh(); });
        const rr = u.$("#brr"); if (rr) rr.onclick = () => { c.order.pop(); AA.router.refresh(); };
        const vv = u.$("#brv"); if (vv) vv.onclick = () => { c.checked = true; c.sc[1] = c.order.filter((k, i) => k === i).length / c.plan.length; (c.sc[1] >= .8 ? fx.sfx.ok : fx.sfx.bad)(); AA.router.refresh(); };
        const nn = u.$("#brn"); if (nn) nn.onclick = () => { c.phase = 2; AA.router.refresh(); };
        return;
      }
      if (c.phase === 2) {
        const q = c.qs[c.qi], ans = c.pick != null;
        el.innerHTML = `${briefHead(c, 3)}<p class="eyebrow">${t("br.p3")} · ${c.qi + 1}/${c.qs.length}</p>
          <section class="qcard"><p class="story">${AA.icon("chat")} ${t("br.asks")}</p><h2 class="qtext">${u.esc(q.q)}</h2>
          ${q.c.map((o, k) => `<button class="opt ${ans ? (k === q.a ? "good" : k === c.pick ? "wrong" : "") : ""}" data-k="${k}" ${ans ? "disabled" : ""}>${u.esc(o)}</button>`).join("")}
          ${ans ? `<div class="feedback ${c.pick === q.a ? "ok" : "bad"}"><h4>${c.pick === q.a ? t("scen.good") : t("scen.bad")}</h4><p>${u.esc(q.e)}</p></div><div class="qactions"><button class="btn block" id="brn">${t("quiz.next")} ${AA.icon("next")}</button></div>` : ""}</section>`;
        u.$$(".opt", el).forEach(x => x.onclick = () => { c.pick = +x.dataset.k; const ok = c.pick === q.a; if (ok) { c.sc[2] += 1 / c.qs.length; fx.sfx.ok(); fx.buzz(15); } else { fx.sfx.bad(); fx.buzz([40, 40, 40]); } G.markDay(); AA.router.refresh(); });
        const nn = u.$("#brn"); if (nn) { nn.focus({ preventScroll: true }); nn.onclick = () => { c.qi++; c.pick = null; if (c.qi >= c.qs.length) c.phase = 3; AA.router.refresh(); }; }
        return;
      }
      /* Résultat */
      const pct = Math.round((c.sc[0] * .35 + c.sc[1] * .2 + c.sc[2] * .45) * 100), ok = pct >= 80;
      if (!c.saved) { c.saved = true; const xp = 20 + Math.round(pct / 4); G.addXp(xp); c.xp = xp; if (ok) { v.brief++; bump("brief"); fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 3, 40, "rgba(61,220,151,.9)"); } AA.store.save(); G.checkBadges(); }
      el.innerHTML = `<section class="card result stack-lg"><p class="eyebrow">${t("br.title")} · ${u.esc(b.site.n)}</p><div class="big">${pct}<span class="muted" style="font-size:.4em"> %</span></div>
        <p>${t(ok ? "br.ok" : "br.ko")}</p>
        <div class="br-sc">${[["br.sc1", c.sc[0]], ["br.sc2", c.sc[1]], ["br.sc3", c.sc[2]]].map(([k, x]) => `<div><span class="small">${t(k)}</span>${ui.bar(x, x >= .8 ? "var(--ok)" : "var(--gold)")}<b class="mono xs">${Math.round(x * 100)} %</b></div>`).join("")}</div>
        <div class="row" style="justify-content:center"><span class="chip gold">${AA.icon("bolt")} +${c.xp} XP</span></div>
        <div class="stack"><button class="btn block" id="bre">${AA.icon("refresh")} ${t("br.again")}</button><a class="btn ghost block" href="#/brief">${t("br.other")}</a></div></section>
        <div class="section-title"><h3>${t("br.model")}</h3><span class="small muted">${t("br.modelS")}</span></div>
        <section class="card">${modelBrief(b)}<p class="xs muted" style="margin:var(--sp-3) 0 0">${u.esc(C.brief.note)}</p></section>`;
      u.$("#bre").onclick = () => { AA.ctx.brief = briefCtx(b.role); AA.router.refresh(); };
    }
  });

  /* =====================================================================
     Atelier plongées successives
     ===================================================================== */
  const hm = min => min >= 60 ? Math.floor(min / 60) + " h" + (min % 60 ? " " + String(min % 60).padStart(2, "0") : "") : min + " min";
  V.newSucc = () => {
    const kind = u.pick(["succ", "succ", "succ", "succ", "consec", "isol"]);
    const p1 = u.pick([15, 18, 20, 22, 25, 28, 30, 35, 40]), t1 = R(3, 9) * 5;
    const inv = kind === "succ" && Math.random() < .25;
    const p2 = inv ? Math.min(40, p1 + u.pick([5, 8, 10])) : u.pick([12, 15, 18, 20, 22, 25].filter(x => x <= p1) .concat([12]));
    const t2 = R(4, 9) * 5;
    const I = kind === "consec" ? R(3, 14) : kind === "isol" ? R(13, 20) * 60 : u.pick([20, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 480]);
    const maj = R(3, 30);
    return { kind, p1, t1, p2, t2, I, maj, inv };
  };
  const succSteps = s => {
    const steps = [], O = (good, w, e, q) => { const o = opts4(good, w); return { q, c: o.c, a: o.a, e }; };
    steps.push(O(t(s.kind === "consec" ? "su.tConsec" : s.kind === "isol" ? "su.tIsol" : "su.tSucc"), [t("su.tConsec"), t("su.tSucc"), t("su.tIsol")], t("su.eType", { i: hm(s.I) }), t("su.qType", { i: hm(s.I) })));
    if (s.kind === "consec") {
      steps.push(O(t("su.aConsecHow"), [t("su.wConsec1"), t("su.wConsec2"), t("su.wConsec3")], t("su.eConsecHow"), t("su.qConsecHow")));
      const d = Math.max(s.p1, s.p2), tt = s.t1 + s.t2;
      steps.push(O(t("su.pt", { p: d, t: tt }), [t("su.pt", { p: s.p2, t: s.t2 }), t("su.pt", { p: d, t: s.t2 }), t("su.pt", { p: d, t: tt + s.I }), t("su.pt", { p: Math.round((s.p1 + s.p2) / 2), t: tt })], t("su.eConsecV", { p: d, t1: s.t1, t2: s.t2, t: tt }), t("su.qConsecV")));
    } else if (s.kind === "isol") {
      steps.push(O(t("su.aIsol"), [t("su.wIsol1"), t("su.wIsol2"), t("su.wIsol3")], t("su.eIsol"), t("su.qIsol")));
    } else {
      steps.push(O(t("su.aGps"), [t("su.wGps1"), t("su.wGps2"), t("su.wGps3")], t("su.eGps"), t("su.qGps", { p: s.p1, t: s.t1 })));
      steps.push(O(t("su.aN2"), [t("su.wN21"), t("su.wN22"), t("su.wN23")], t("su.eN2"), t("su.qN2", { i: hm(s.I) })));
      steps.push(O(t("su.aMaj"), [t("su.wMaj1"), t("su.wMaj2"), t("su.wMaj3")], t("su.eMaj"), t("su.qMaj", { p: s.p2 })));
      const dt = s.t2 + s.maj;
      steps.push(O(dt + " min", [s.t2 + " min", s.maj + " min", (dt + s.t1) + " min", (s.t2 - s.maj > 0 ? s.t2 - s.maj : dt + 5) + " min"], t("su.eDur", { t: s.t2, m: s.maj, d: dt }), t("su.qDur", { m: s.maj, t: s.t2 })));
      steps.push(O(s.p2 + " m", [s.p1 + " m", Math.max(s.p1, s.p2) + 3 + " m", Math.round((s.p1 + s.p2) / 2) + " m"].filter(x => x !== s.p2 + " m"), t("su.eDepth", { p: s.p2 }), t("su.qDepth")));
      if (s.inv) steps.push(O(t("su.aInv"), [t("su.wInv1"), t("su.wInv2"), t("su.wInv3")], t("su.eInv"), t("su.qInv", { p1: s.p1, p2: s.p2 })));
    }
    steps.push(O(t("su.aPc"), [t("su.wPc1"), t("su.wPc2"), t("su.wPc3")], t("su.ePc"), t("su.qPc")));
    return steps;
  };
  const succSvg = s => {
    const W = 320, H = 120, top = 18, sc = 80 / 40, x0 = 10, w1 = 95, gap = 70, w2 = 95;
    const y1 = top + s.p1 * sc, y2 = top + s.p2 * sc, a = x0, b = a + w1, c2 = b + gap, d = c2 + w2;
    const dive = (x, w, y, lab, dur) => `<path d="M${x} ${top} L${x + 12} ${y} L${x + w - 18} ${y} L${x + w} ${top}" class="su-dive"/><text x="${x + w / 2}" y="${y + 13}" text-anchor="middle" class="su-t">${lab}</text><text x="${x + w / 2}" y="${top - 6}" text-anchor="middle" class="su-t mute">${dur}</text>`;
    return `<svg class="su-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("su.svg")}"><line x1="0" y1="${top}" x2="${W}" y2="${top}" class="su-surf"/>
      ${dive(a, w1, y1, s.p1 + " m", s.t1 + " min")}<line x1="${b + 4}" y1="${top + 1}" x2="${c2 - 4}" y2="${top + 1}" class="su-int"/><text x="${(b + c2) / 2}" y="${top + 16}" text-anchor="middle" class="su-t acc">${hm(s.I)}</text>
      ${dive(c2, w2, y2, s.p2 + " m", s.t2 + " min")}</svg>`;
  };
  const succCtx = () => { const s = V.newSucc(); return { s, steps: succSteps(s), i: 0, pick: null, good: 0, saved: false }; };
  AA.view("succ", {
    tab: "lab", depth: 30,
    render(el, [go]) {
      const v = st();
      if (go !== "go") {
        el.innerHTML = `${ui.head(t("su.title"), "lab", AA.helpBtn("succ"))}<p class="muted">${t("su.intro")}</p>
          <section class="card stack" style="margin-top:var(--sp-4)"><h3>${t("su.methodT")}</h3><ol class="su-method">${AA.i18n.raw("su.method").map(x => `<li>${x}</li>`).join("")}</ol></section>
          <div class="tiles one-sm" style="margin-top:var(--sp-4)">${ui.tile("go", "table", "var(--gold)", t("su.start"), t("su.startS"), v.succ ? [t("su.okN", { n: v.succ }), "ok"] : null)}${ui.tile("pc", "watch", "var(--ok)", t("mode.pc"), t("lab.pcS", { n: C.computer.length }))}</div>
          ${ui.callout("trap", t("su.noteT"), u.esc(C.succNote))}`;
        u.on(el, "click", ".tile", (e, b) => { fx.sfx.tap(); if (b.dataset.t === "pc") AA.router.go("pc"); else { AA.ctx.succ = succCtx(); AA.router.go("succ/go"); } });
        return;
      }
      const c = AA.ctx.succ && AA.ctx.succ.steps ? AA.ctx.succ : (AA.ctx.succ = succCtx()), s = c.s, q = c.steps[c.i];
      const caseCard = `<section class="card su-case"><p class="eyebrow">${t("su.case")}</p><p class="small" style="margin:0">${t("su.caseS", { p1: s.p1, t1: s.t1, i: hm(s.I), p2: s.p2, t2: s.t2 })}</p>${succSvg(s)}</section>`;
      if (!q) {
        const n = c.steps.length, ok = c.good === n;
        if (!c.saved) { c.saved = true; G.addXp(c.good * 5); if (ok) { v.succ++; bump("succ"); fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 3, 40, "rgba(255,200,87,.9)"); } AA.store.save(); G.checkBadges(); }
        el.innerHTML = `<section class="card result stack-lg"><p class="eyebrow">${t("su.title")}</p><div class="big">${c.good}<span class="muted" style="font-size:.4em"> / ${n}</span></div><p>${t(ok ? "su.perfect" : "su.retry")}</p>
          <div class="row" style="justify-content:center"><span class="chip gold">${AA.icon("bolt")} +${c.good * 5} XP</span></div>
          <div class="stack"><button class="btn block" id="sun">${AA.icon("refresh")} ${t("su.next")}</button><a class="btn ghost block" href="#/succ">${t("su.back")}</a><a class="btn ghost block" href="#/lesson/deco">${t("su.lesson")}</a></div></section>${caseCard}`;
        u.$("#sun").onclick = () => { AA.ctx.succ = succCtx(); AA.router.refresh(); };
        return;
      }
      const ans = c.pick != null;
      el.innerHTML = `<div class="pagehead"><a class="closebtn" href="#/succ" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${t("su.title")} · ${t("scen.step", { i: c.i + 1, n: c.steps.length })}</span></div>
        ${caseCard}<section class="qcard" style="margin-top:var(--sp-3)"><h2 class="qtext">${u.esc(q.q)}</h2>
        ${q.c.map((o, k) => `<button class="opt ${ans ? (k === q.a ? "good" : k === c.pick ? "wrong" : "") : ""}" data-k="${k}" ${ans ? "disabled" : ""}>${u.esc(o)}</button>`).join("")}
        ${ans ? `<div class="feedback ${c.pick === q.a ? "ok" : "bad"}"><h4>${c.pick === q.a ? t("scen.good") : t("scen.bad")}</h4><p>${u.esc(q.e)}</p></div><div class="qactions"><button class="btn block" id="sun">${t("quiz.next")} ${AA.icon("next")}</button></div>` : ""}</section>`;
      u.$$(".opt", el).forEach(x => x.onclick = () => { c.pick = +x.dataset.k; const ok = c.pick === q.a; bump("ans"); if (ok) { c.good++; bump("ok"); if (/\d/.test(q.c[q.a])) bump("calcOk"); fx.sfx.ok(); fx.buzz(15); } else { fx.sfx.bad(); fx.buzz([40, 40, 40]); } G.markDay(); AA.router.refresh(); });
      const nn = u.$("#sun"); if (nn) { nn.focus({ preventScroll: true }); nn.onclick = () => { c.i++; c.pick = null; AA.router.refresh(); }; }
    }
  });

  /* =====================================================================
     Codes : JSON → base64 URL + somme de contrôle (détecte les erreurs de
     copie, ce n'est pas une protection contre la triche).
     ===================================================================== */
  const b64u = str => { const by = new TextEncoder().encode(str); let s = ""; by.forEach(b => (s += String.fromCharCode(b))); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const unb64u = str => { const s = atob(str.replace(/-/g, "+").replace(/_/g, "/")); return new TextDecoder().decode(Uint8Array.from(s, c => c.charCodeAt(0))); };
  const sum = s => (u.seedOf("aa19" + s) % 1679616).toString(36).padStart(4, "0");
  V.encode = (pre, o) => { const b = b64u(JSON.stringify(o)); return pre + "." + b + "." + sum(pre + b); };
  /* Renvoie { ok, kind, data } ou { ok:false, err } (err : clé de texte). */
  V.decode = txt => {
    const m = String(txt || "").match(/(AAD1|AAC1)\.([A-Za-z0-9_-]{8,4000})\.([0-9a-z]{4})/);
    if (!m) return { ok: false, err: "cl.errNone" };
    if (sum(m[1] + m[2]) !== m[3]) return { ok: false, err: "cl.errSum" };
    try { const d = JSON.parse(unb64u(m[2])); if (!d || typeof d !== "object") throw 0; return { ok: true, kind: m[1] === "AAD1" ? "duel" : "card", data: d, code: m[0] }; }
    catch (e) { return { ok: false, err: "cl.errSum" }; }
  };
  const clean = (s, n) => String(s == null ? "" : s).replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, n || 20);
  const num = (x, a, b) => { x = Number(x); return isFinite(x) ? u.clamp(Math.round(x), a, b) : a; };
  const canLink = () => /^https?:$/.test(location.protocol) && !AA.BUNDLED && !(window.claude && window.claude.use);
  const linkFor = (kind, code) => location.origin + location.pathname + "#/club/" + kind + "/" + code;
  const myName = () => clean(S().profile.name) || t("cl.me");

  /* ---------- Carte de score (classement de club) ---------- */
  V.myCard = () => {
    const s = S(), v = st(), lv = G.levelOf(s.xp), w = V.week();
    const best = (s.exams || []).reduce((m, e) => Math.max(m, e.score || 0), 0);
    return { id: v.cid, n: myName(), x: s.xp, l: lv.l, wk: w.id, wx: w.c.xp || 0, s: G.streak(), e: best, g: s.profile.goal || "", t: Date.now() };
  };
  const cardOk = d => d && typeof d.id === "string" && d.id.length <= 16 && d.n != null;
  V.addCard = d => {
    if (!cardOk(d)) return "cl.errBad";
    const v = st(); if (d.id === v.cid) return "cl.errSelf";
    const m = { id: clean(d.id, 16), n: clean(d.n) || "?", x: num(d.x, 0, 1e8), l: num(d.l, 0, 999), wk: clean(d.wk, 9), wx: num(d.wx, 0, 1e7), s: num(d.s, 0, 9999), e: Math.max(0, Math.min(20, Number(d.e) || 0)), g: clean(d.g, 8), t: num(d.t, 0, 9e12) };
    const old = v.club.members[m.id];
    if (old && (old.t || 0) > m.t) return "cl.errOld";
    if (!old && Object.keys(v.club.members).length >= 80) return "cl.errFull";
    v.club.members[m.id] = m; AA.store.save(); return "";
  };

  /* ---------- Duel à distance ---------- */
  const duelPool = wid => C.questions.filter(q => q.world === wid && q.lvl !== 2 && q.c && q.c.length >= 2 && !String(q.id).startsWith("pc-"));
  V.duelWorlds = () => C.worlds.filter(w => !w.soon && duelPool(w.id).length >= 12);
  V.startDuel = (wid, from) => {
    let qs, payload;
    if (from) {
      qs = (from.q || []).map(id => C.qById[id]).filter(Boolean);
      if (qs.length < Math.min(5, (from.q || []).length)) { fx.toast(t("cl.errVerT"), t("cl.errVer"), "info"); return; }
      payload = from;
    } else {
      const pool = duelPool(wid); qs = u.shuffle(pool).slice(0, 10);
      payload = { v: 1, i: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), w: wid, q: qs.map(q => q.id), d: u.today() };
    }
    Q.start("rduel", qs, { title: t("cl.rduel"), back: "club", rd: payload, role: from ? "b" : "a", onResult: duelDone });
  };
  const duelDone = (c, good, n) => {
    const v = st(), secs = Math.round((Date.now() - c.t0) / 1000), me = { n: myName(), r: good, s: secs };
    if (!c.rdSaved) {
      c.rdSaved = true; v.rduel++; bump("duel");
      const p = c.rd, entry = { i: p.i, role: c.role, w: p.w, n: (p.q || []).length, d: u.today(), me, opp: c.role === "b" ? p.a : null };
      v.duels = v.duels.filter(x => !(x.i === entry.i && x.role === entry.role)).concat([entry]).slice(-60);
      c.rdCode = V.encode("AAD1", c.role === "b" ? Object.assign({}, p, { b: me }) : Object.assign({}, p, { a: me }));
      AA.store.save(); G.checkBadges();
    }
    const entry = v.duels.find(x => x.i === c.rd.i && x.role === c.role);
    return `<div class="card cl-code stack">${entry && entry.opp ? duelVs(entry) : ""}
      <p class="eyebrow">${t(c.role === "b" ? "cl.replyT" : "cl.sendT")}</p><p class="small" style="margin:0">${t(c.role === "b" ? "cl.replyS" : "cl.sendS", { n: entry && entry.opp ? u.esc(entry.opp.n) : "" })}</p>
      ${codeBox(c.rdCode, "d")}</div>`;
  };
  const duelVs = e => {
    const a = e.me, b = e.opp, win = a.r > b.r || (a.r === b.r && a.s < b.s) ? 1 : a.r === b.r && a.s === b.s ? 0 : -1;
    return `<div class="cl-vs ${win > 0 ? "win" : win < 0 ? "lose" : ""}"><div><b>${u.esc(a.n)}</b><span class="big2">${a.r}/${e.n}</span><span class="xs muted">${u.mmss(a.s)}</span></div><span class="cl-x">${AA.icon("swords")}</span><div><b>${u.esc(b.n)}</b><span class="big2">${b.r}/${e.n}</span><span class="xs muted">${u.mmss(b.s)}</span></div></div>
      <p class="center"><b>${t(win > 0 ? "cl.youWin" : win < 0 ? "cl.youLose" : "cl.draw")}</b></p>`;
  };
  const codeBox = (code, kind) => `<div class="cl-box"><textarea class="input mono cl-ta" readonly rows="3" aria-label="${t("cl.code")}">${u.esc(code)}</textarea>
    <div class="row" style="gap:var(--sp-2)"><button class="btn gold grow" data-clshare="${kind}" data-code="${u.esc(code)}">${AA.icon("share")} ${t("cl.share")}</button><button class="btn ghost" data-clcopy data-code="${u.esc(code)}">${AA.icon("save")} ${t("cl.copy")}</button></div><p class="xs muted cl-msg" role="status" style="margin:0"></p></div>`;
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-clshare],[data-clcopy]"); if (!b) return;
    const code = b.dataset.code, msg = b.closest(".cl-box") && u.$(".cl-msg", b.closest(".cl-box")), say = k => msg && (msg.textContent = t(k));
    const kind = b.dataset.clshare, link = kind && canLink() ? linkFor(kind, code) : "";
    const text = kind ? t(kind === "d" ? "cl.shareDuel" : "cl.shareCard", { n: myName() }) + "\n" + (link || code) : code;
    if (kind && navigator.share) { try { await navigator.share({ title: t("app.name"), text }); say("club.shared"); return; } catch (err) { if (err && err.name === "AbortError") return; } }
    try { await navigator.clipboard.writeText(kind ? text : code); say("club.copied"); }
    catch (err) { const ta = b.closest(".cl-box") && u.$("textarea", b.closest(".cl-box")); if (ta) { ta.focus(); ta.select(); } say("cl.selectCopy"); }
  });

  /* Importer un code (collé ou reçu par lien). Renvoie le HTML du message. */
  const handleCode = (txt, el) => {
    const r = V.decode(txt), out = u.$("#clout", el);
    const show = h => { if (out) { out.innerHTML = h; out.scrollIntoView({ block: "nearest", behavior: "smooth" }); } };
    if (!r.ok) { fx.sfx.bad(); show(`<div class="callout trap"><span class="eyebrow">${t("cl.errT")}</span>${t(r.err)}</div>`); return; }
    if (r.kind === "card") {
      const err = V.addCard(r.data);
      if (err) { show(`<div class="callout trap"><span class="eyebrow">${t("cl.errT")}</span>${t(err)}</div>`); return; }
      fx.sfx.up(); show(`<div class="callout check"><span class="eyebrow">${t("cl.cardOk")}</span>${t("cl.cardOkS", { n: u.esc(clean(r.data.n)) })}</div>`);
      setTimeout(() => AA.router.go("club"), 900); return;
    }
    const d = r.data, v = st();
    if (!d.i || !Array.isArray(d.q) || !d.a) { show(`<div class="callout trap"><span class="eyebrow">${t("cl.errT")}</span>${t("cl.errBad")}</div>`); return; }
    d.a = { n: clean(d.a.n) || "?", r: num(d.a.r, 0, 99), s: num(d.a.s, 0, 99999) };
    if (d.b) d.b = { n: clean(d.b.n) || "?", r: num(d.b.r, 0, 99), s: num(d.b.s, 0, 99999) };
    const mine = v.duels.find(x => x.i === d.i && x.role === "a");
    if (mine && d.b) { mine.opp = d.b; AA.store.save(); fx.sfx.up(); show(`<div class="card stack">${duelVs(mine)}</div>`); return; }
    if (mine) { show(`<div class="callout info"><span class="eyebrow">${t("cl.ownT")}</span>${t("cl.own")}</div>`); return; }
    const played = v.duels.find(x => x.i === d.i && x.role === "b");
    if (played) { show(`<div class="card stack">${duelVs(played)}<p class="small muted center" style="margin:0">${t("cl.already")}</p></div>`); return; }
    const w = C.worldById[d.w];
    show(`<div class="card stack cl-chal"><p class="eyebrow">${t("cl.chalT")}</p><h3>${t("cl.chal", { n: u.esc(d.a.n) })}</h3><p class="small muted" style="margin:0">${t("cl.chalS", { n: d.q.length, w: w ? u.esc(w.short) : "?" })}</p><button class="btn block" id="clplay">${AA.icon("play")} ${t("cl.accept")}</button></div>`);
    u.$("#clplay", el).onclick = () => V.startDuel(d.w, d);
  };

  /* ---------- Écran Club ---------- */
  const RANK_K = { x: "cl.rkXp", wx: "cl.rkWeek", e: "cl.rkExam" };
  AA.view("club", {
    tab: "profile", depth: 30,
    render(el, [kind, code]) {
      const s = S(), v = st(), me = V.myCard(), wk = V.week().id;
      const sortK = AA.ctx.clSort && RANK_K[AA.ctx.clSort] ? AA.ctx.clSort : "x";
      const rows = Object.values(v.club.members).map(m => Object.assign({}, m, { wx: m.wk === wk ? m.wx : 0 })).concat([Object.assign({ me: 1 }, me)]).sort((a, b) => (b[sortK] || 0) - (a[sortK] || 0) || (b.x || 0) - (a.x || 0));
      const worlds = V.duelWorlds(), dw = AA.ctx.clWorld && worlds.some(w => w.id === AA.ctx.clWorld) ? AA.ctx.clWorld : (worlds.find(w => w.id === Q.examWorld()) || worlds[0] || {}).id;
      const recent = v.duels.slice(-5).reverse();
      const best = (s.exams || []).filter(e => e.full).reduce((m, e) => Math.max(m, e.score), 0);
      const lv = G.levelOf(s.xp), share = t("club.shareText", { l: lv.l, rank: lv.rank, xp: s.xp, best, apnee: s.apnee });
      el.innerHTML = `${ui.head(t("prof.club"), "profile", AA.helpBtn("club"))}
        <div class="cl-grid">
        <section class="card stack cl-rank"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("trophy")}</span><div class="grow"><h3>${v.club.name ? u.esc(v.club.name) : t("cl.rankT")}</h3><p class="small muted" style="margin:0">${t("cl.rankS")}</p></div></div>
          <div class="ex-worlds cl-seg" role="tablist">${Object.keys(RANK_K).map(k => `<button class="chip ex-w ${k === sortK ? "on" : ""}" style="--wc:var(--gold)" data-sort="${k}" role="tab" aria-selected="${k === sortK}">${t(RANK_K[k])}</button>`).join("")}</div>
          <ol class="cl-list">${rows.map((m, i) => `<li class="${m.me ? "me" : ""}"><span class="cl-pos">${i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}</span><span class="cl-nm"><b>${u.esc(m.n)}${m.me ? ` <span class="chip cl-you">${t("cl.you")}</span>` : ""}</b><span class="xs muted">${t("cl.lv", { l: m.l })}${m.s ? " · " + t("cl.streak", { n: m.s }) : ""}${!m.me && m.t ? " · " + t("cl.upd", { d: new Date(m.t).toLocaleDateString(AA.i18n ? AA.i18n.locale : "fr-FR", { day: "numeric", month: "short" }) }) : ""}</span></span>
            <span class="cl-val mono">${sortK === "e" ? (m.e ? u.num(m.e, 1) + "/20" : "—") : u.num(m[sortK] || 0, 0) + " XP"}</span>${m.me ? "" : `<button class="btn ghost sm" data-rm="${u.esc(m.id)}" aria-label="${t("common.remove")} ${u.esc(m.n)}">${AA.icon("x")}</button>`}</li>`).join("")}</ol>
          ${rows.length < 2 ? `<p class="small muted" style="margin:0">${t("cl.empty")}</p>` : ""}
          <details class="cl-more"><summary>${t("cl.myCard")}</summary><p class="small muted">${t("cl.myCardS")}</p>${codeBox(V.encode("AAC1", me), "c")}
            <label class="small" style="display:block;margin-top:var(--sp-3)">${t("cl.clubName")}<input class="input" id="clname" maxlength="30" value="${u.esc(v.club.name)}" placeholder="${t("cl.clubNameP")}"></label></details>
        </section>
        <div class="stack-lg">
        <section class="card stack"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("swords")}</span><div class="grow"><h3>${t("cl.rduel")}</h3><p class="small muted" style="margin:0">${t("cl.rduelS")}</p></div></div>
          <div class="ex-worlds">${worlds.map(w => `<button class="chip ex-w ${w.id === dw ? "on" : ""}" data-dw="${w.id}" style="--wc:var(${w.color})" aria-pressed="${w.id === dw}">${u.esc(w.short)}</button>`).join("")}</div>
          <button class="btn block" id="clnew" ${dw ? "" : "disabled"}>${AA.icon("play")} ${t("cl.newDuel")}</button>
          ${recent.length ? `<div class="cl-recent">${recent.map(e => `<div class="cl-r"><span class="small"><b>${e.opp ? u.esc(e.opp.n) : t("cl.waiting")}</b> · ${u.esc((C.worldById[e.w] || {}).short || "")}</span><span class="mono small">${e.me.r}${e.opp ? " – " + e.opp.r : ""}/${e.n}</span>${e.opp ? `<span class="chip ${e.me.r > e.opp.r || (e.me.r === e.opp.r && e.me.s < e.opp.s) ? "ok" : e.me.r === e.opp.r && e.me.s === e.opp.s ? "" : "warn"}">${t(e.me.r > e.opp.r || (e.me.r === e.opp.r && e.me.s < e.opp.s) ? "cl.w" : e.me.r === e.opp.r && e.me.s === e.opp.s ? "cl.d" : "cl.l")}</span>` : `<span class="chip">${t("cl.pending")}</span>`}</div>`).join("")}</div>` : ""}</section>
        <section class="card stack"><h3>${t("cl.pasteT")}</h3><p class="small muted" style="margin:0">${t("cl.pasteS")}</p>
          <textarea class="input mono" id="clin" rows="3" placeholder="AAD1.… / AAC1.…" aria-label="${t("cl.pasteT")}">${code ? u.esc(code) : ""}</textarea>
          <button class="btn block" id="clgo">${AA.icon("download")} ${t("cl.read")}</button><div id="clout"></div></section>
        <section class="card stack"><div class="row" style="gap:var(--sp-3);flex-wrap:nowrap"><span class="medal">${AA.icon("users")}</span><div class="grow"><h3>${t("mode.duel")}</h3><p class="small muted" style="margin:0">${t("club.duelS")}</p></div></div>
          <div class="calc-grid"><input class="input" id="p1" placeholder="${t("club.p1")}" maxlength="20" value="${u.esc(s.profile.name)}" aria-label="${t("club.p1")}"><input class="input" id="p2" placeholder="${t("club.p2")}" maxlength="20" aria-label="${t("club.p2")}"></div>
          <button class="btn ghost block" id="duel">${AA.icon("play")} ${t("club.start")}</button></section>
        <section class="card stack"><h3>${t("club.shareT")}</h3><p class="small muted" style="margin:0">${t("club.shareS")}</p>
          <div class="out" id="sharetxt">${u.esc(share)}</div><button class="btn ghost block" id="share">${AA.icon("share")} ${t("club.share")}</button><p class="small muted" id="sharemsg" role="status"></p></section>
        </div></div>
        <p class="xs muted" style="margin-top:var(--sp-4)">${t("cl.privacy")}</p>`;
      u.$$("[data-sort]", el).forEach(b => b.onclick = () => { AA.ctx.clSort = b.dataset.sort; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-dw]", el).forEach(b => b.onclick = () => { AA.ctx.clWorld = b.dataset.dw; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-rm]", el).forEach(b => b.onclick = () => { delete v.club.members[b.dataset.rm]; AA.store.save(); AA.router.refresh(); });
      u.$("#clnew").onclick = () => dw && V.startDuel(dw);
      u.$("#clgo").onclick = () => handleCode(u.$("#clin").value, el);
      const nm = u.$("#clname"); nm.onchange = () => { v.club.name = clean(nm.value, 30); AA.store.save(); AA.router.refresh(); };
      u.$("#duel").onclick = () => AA.quiz.duel(u.$("#p1").value.trim() || t("club.p1"), u.$("#p2").value.trim() || t("club.p2"));
      u.$("#share").onclick = async () => {
        const m = u.$("#sharemsg"), url = /^https?:/.test(location.href) && !AA.BUNDLED ? location.origin + location.pathname : "";
        if (navigator.share) { try { await navigator.share({ title: t("app.name"), text: share, url: url || undefined }); m.textContent = t("club.shared"); } catch (e) {} }
        else if (navigator.clipboard) navigator.clipboard.writeText(share + (url ? " " + url : "")).then(() => (m.textContent = t("club.copied")), () => (m.textContent = t("club.copyFail")));
        else m.textContent = t("club.copyFail");
      };
      /* Lien reçu : #/club/d/<code> ou #/club/c/<code> */
      if ((kind === "d" || kind === "c") && code && !AA.ctx.clDone) { AA.ctx.clDone = code; setTimeout(() => handleCode(code, el), 50); }
    }
  });
  /* Un nouveau lien reçu doit être relu. */
  addEventListener("hashchange", () => { if (!/^#\/club\/[dc]\//.test(location.hash)) AA.ctx && (AA.ctx.clDone = ""); });

  /* Démarrage : totaux de référence (pas de défi validé par l'historique). */
  setTimeout(() => { try { if (AA.S) V.resetTotals(); } catch (e) {} }, 0);
})();
