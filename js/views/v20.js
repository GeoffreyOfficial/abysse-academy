/* =====================================================================
   Abysse Academy 2.0 · le tuteur
   - « Cours lu » obligatoire : un quiz ne porte que sur des cours lus.
   - Maîtrise par notion (sous-parties d'un cours), lacunes, vérification.
   - Prochaine meilleure étape, plan d'étude vers l'examen blanc.
   - Navigation : Accueil · Cours · Entraîner · Progrès · Profil.
   - Moniteur facultatif (Profil › Club et moniteur). Jeux allégés.
   Rien n'est effacé dans la sauvegarde : les anciens écrans renvoient
   simplement ailleurs.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, fx = AA.fx, ui = AA.ui, Q = AA.quiz;
  const S = () => AA.S;
  const T = (AA.tutor = {});
  const norm = s => String(s || "").replace(/<[^>]+>/g, " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const esc = u.esc;

  /* ---------- Cours lus ---------- */
  T.explicitRead = mid => !!(S().read[mid] || {}).e;
  T.isRead = mid => {
    const m = C.byId[mid]; if (!m) return true;
    const s = S(); if (s.unlockAll || T.explicitRead(mid) || (s.placed || {})[mid]) return true;
    return !!(AA.path && AA.path.certified(m.world));
  };
  T.markRead = (mid, el) => {
    const s = S(), first = !(s.read[mid] || {}).x;
    s.read[mid] = Object.assign({}, s.read[mid], { e: u.today(), ts: Date.now(), x: 1 });
    G.dayc().read++; G.markDay(); AA.store.save();
    if (first) G.addXp(T.XP.read, el);
    fx.sfx.ok(); G.checkBadges();
  };
  T.unmarkRead = mid => { const r = Object.assign({}, S().read[mid]); delete r.e; S().read[mid] = r; AA.store.save(); };
  /* Une question est jouable si son cours est lu (cartes, calculs compris). */
  T.qOk = q => { if (!q) return false; const mid = q.m; return !mid || !C.byId[mid] || T.isRead(mid); };

  /* ---------- Notions ---------- */
  const cache = { list: {}, q: {} };
  const STOP = new Set("avec dans pour plus moins entre leur leurs cette celui celle comme quand alors aussi faire sont etre avoir toute toutes votre notre quelle quelles quels mais donc sans chez plongee plongeur plongeurs toujours jamais".split(" "));
  const words = s => new Set(norm(s).split(/[^a-z0-9]+/).filter(w => w.length >= 5 && !STOP.has(w)));
  T.notions = mid => {
    if (cache.list[mid]) return cache.list[mid];
    const m = C.byId[mid]; if (!m) return [];
    let list = [];
    const cur = (C.notions || {})[mid];
    if (cur) list = cur.map(([id, title, kw, hl]) => ({ id: mid + ":" + id, mid, t: title, re: new RegExp(kw, "g"), hl }));
    else (m.memo || []).forEach(([a, b], i) => {
      const k = norm(a), same = list.find(n => norm(n.t) === k);
      if (same) words(b).forEach(w => same.w.add(w)); else list.push({ id: mid + ":m" + i, mid, t: a, w: words(a + " " + b), hl: a });
    });
    list.push({ id: mid + ":gen", mid, t: t("tu.general"), gen: true, hl: "" });
    cache.list[mid] = list; return list;
  };
  T.notion = nid => { const mid = String(nid).split(":")[0]; return T.notions(mid).find(n => n.id === nid) || null; };
  T.notionOf = q => {
    if (!q || !q.m || !C.byId[q.m]) return null;
    const key = q.gen ? "gen:" + q.gen : q.id;
    if (cache.q[key]) return cache.q[key];
    const list = T.notions(q.m), txt = norm(q.q + " " + (q.c ? q.c[q.a] : "") + " " + (q.e || "")), tw = txt.split(/[^a-z0-9]+/);
    let best = null, bs = 0;
    list.forEach(n => {
      if (n.gen) return;
      const s = n.re ? (txt.match(n.re) || []).length : tw.filter(w => n.w.has(w)).length;
      if (s > bs) { bs = s; best = n; }
    });
    const id = (best || list[list.length - 1]).id; cache.q[key] = id; return id;
  };
  T.qsOf = nid => C.questions.filter(q => T.notionOf(q) === nid);
  T.tabOf = n => {
    const m = C.byId[n.mid]; if (!n.hl) return "essentiel";
    const h = norm(n.hl).split(/\s+/).filter(x => x.length > 2), has = s => h.some(x => norm(s).includes(x));
    return has(m.essentiel) ? "essentiel" : m.approfondir && has(m.approfondir) ? "approfondir" : m.memo.length ? "memo" : "essentiel";
  };
  T.openNotion = nid => { const n = T.notion(nid); if (!n) return; fx.sfx.tap(); AA.router.go("lesson/" + n.mid + "/" + T.tabOf(n), { hl: n.hl || null }); };

  /* ---------- Maîtrise ---------- */
  T.note = (q, ok) => {
    const nid = T.notionOf(q); if (!nid) return;
    const s = S(); s.nstat = s.nstat || {};
    const r = s.nstat[nid] || { h: "", n: 0, ok: 0, d: "" };
    r.h = (r.h + (ok ? 1 : 0)).slice(-10); r.n++; if (ok) r.ok++; r.d = u.today(); s.nstat[nid] = r;
  };
  T.stat = nid => (S().nstat || {})[nid] || null;
  /* Réponses récentes pondérées (la dernière compte le plus), petit a priori à 50 %,
     baisse douce après 10 jours sans réviser. */
  T.mastery = nid => {
    const r = T.stat(nid); if (!r || !r.n) return null;
    let w = 1, sw = .6, sx = .3;
    for (let i = r.h.length - 1; i >= 0; i--) { sx += w * +r.h[i]; sw += w; w *= .75; }
    let m = sx / sw;
    const days = r.d ? u.daysBetween(r.d, u.today()) : 0;
    if (days > 10) m *= 1 - Math.min(.25, (days - 10) / 120);
    return m;
  };
  T.isGap = nid => { const r = T.stat(nid); if (!r || r.n < 2) return false; return /00$/.test(r.h) || (r.n >= 3 && T.mastery(nid) < .45); };
  T.nState = nid => {
    const m = T.mastery(nid); if (m == null) return "new";
    if (T.isGap(nid)) return "gap";
    if (m >= .85 && T.stat(nid).n >= 4) return "master";
    return m >= .65 ? "ok" : m >= .45 ? "mid" : "weak";
  };
  T.modInfo = mid => {
    const ns = T.notions(mid).filter(n => T.stat(n.id) || T.qsOf(n.id).length);
    const ms = ns.map(n => T.mastery(n.id)), seen = ms.filter(x => x != null);
    return { ns, seen: seen.length, tot: ns.length, mastery: ns.length ? seen.reduce((a, b) => a + b, 0) / ns.length : 0, gaps: ns.filter(n => T.isGap(n.id)) };
  };
  T.state = mid => {
    const m = C.byId[mid]; if (!m) return "toread";
    if (!T.isRead(mid)) return "toread";
    const I = T.modInfo(mid);
    if (!I.seen && !S().themes[mid]) return AA.path.certified(m.world) && !T.explicitRead(mid) ? "cert" : "quiz";
    if (I.gaps.length) return "gap";
    if (G.isStale(mid)) return "review";
    if (I.mastery >= .85 && I.seen === I.tot) return "master";
    return I.mastery >= .65 ? "ok" : "learning";
  };
  const ST_IC = { toread: "book", quiz: "play", gap: "buoy", review: "refresh", learning: "chart", ok: "check", master: "trophy", cert: "check" };
  const ST_CL = { toread: "", quiz: "pri", gap: "warn", review: "warn", learning: "pri", ok: "ok", master: "gold", cert: "ok" };
  T.chip = mid => { const st = T.state(mid); return `<span class="chip tu-st st-${st} ${ST_CL[st]}">${AA.icon(ST_IC[st])} ${t("tu.st." + st)}</span>`; };
  const N_CL = { new: "", weak: "warn", mid: "pri", ok: "ok", master: "gold", gap: "warn" };
  const nChip = nid => { const st = T.nState(nid); return `<span class="chip xs ${N_CL[st]}">${t("tu.n." + st)}</span>`; };
  const pct = x => Math.round((x || 0) * 100);
  const barCol = x => x >= .85 ? "var(--gold)" : x >= .65 ? "var(--ok)" : x >= .45 ? "var(--primary)" : "var(--accent)";

  /* ---------- Parcours ---------- */
  T.prereqs = mid => {
    if (C.prereq && C.prereq[mid]) return C.prereq[mid].filter(x => C.byId[x]);
    const m = C.byId[mid]; if (!m) return [];
    const l = C.inWorld(m.world), i = l.indexOf(m); return i > 0 ? [l[i - 1].id] : [];
  };
  T.nextToRead = wid => { const l = C.inWorld(wid).filter(m => !T.isRead(m.id)); return l.find(m => T.prereqs(m.id).every(T.isRead)) || l[0] || null; };
  T.worldInfo = wid => {
    const l = C.inWorld(wid); let seen = 0, tot = 0, ms = 0;
    l.forEach(m => { const I = T.modInfo(m.id); seen += I.seen; tot += I.tot; ms += I.mastery * I.tot; });
    return { l, read: l.filter(m => T.isRead(m.id)).length, n: l.length, seen, tot, mastery: tot ? ms / tot : 0 };
  };
  const activeMod = mid => { const m = C.byId[mid]; return !!m && T.isRead(mid) && (!AA.path || AA.path.active(m.world)); };
  T.gaps = () => {
    const chk = S().gapChk || {}, goal = G.goalWorld();
    return Object.keys(S().nstat || {}).filter(nid => T.isGap(nid) && activeMod(nid.split(":")[0]) && T.notion(nid))
      .map(nid => ({ id: nid, n: T.notion(nid), m: T.mastery(nid), wait: !!chk[nid] && chk[nid] > u.today() }))
      .sort((a, b) => ((C.byId[b.n.mid].world === goal) - (C.byId[a.n.mid].world === goal)) || a.m - b.m);
  };
  T.checksDue = () => Object.entries(S().gapChk || {}).filter(([nid, d]) => d <= u.today() && T.notion(nid)).map(([nid]) => nid);
  T.weakNotions = () => Object.keys(S().nstat || {}).filter(nid => activeMod(nid.split(":")[0]) && T.notion(nid) && ["weak", "mid"].includes(T.nState(nid)))
    .sort((a, b) => T.mastery(a) - T.mastery(b));
  const readMin = m => Math.max(1, Math.round(((m.essentiel || "") + (m.approfondir || "")).replace(/<[^>]+>/g, " ").split(/\s+/).length / 200));

  /* Prochaines étapes, de la plus utile à la moins urgente. */
  T.actions = () => {
    const s = S(), out = [], wid = G.goalWorld(), W = C.worldById[wid];
    const goalFirst = (a, b) => ((s.read[b.id] || {}).ts || 0) - ((s.read[a.id] || {}).ts || 0) || (C.byId[b.id].world === wid) - (C.byId[a.id].world === wid);
    const untested = C.modules.filter(m => T.explicitRead(m.id) && !s.themes[m.id] && !T.modInfo(m.id).seen && AA.path.active(m.world)).sort(goalFirst);
    if (untested[0]) { const m = untested[0]; out.push({ k: "quiz", ic: "play", t: t("tu.a.quiz", { t: m.title }), s: t("tu.a.quizS"), run: () => Q.module(m) }); }
    T.checksDue().slice(0, 1).forEach(nid => { const n = T.notion(nid); out.push({ k: "check", ic: "target", t: t("tu.a.check", { n: n.t }), s: t("tu.a.checkS"), run: () => T.drill(nid, true) }); });
    T.gaps().filter(g => !g.wait).slice(0, 2).forEach(g => out.push({ k: "gap", ic: "buoy", t: t("tu.a.gap", { n: g.n.t }), s: t("tu.a.gapS", { t: C.byId[g.n.mid].title }), run: () => T.fixGap(g.id) }));
    const due = G.qDue ? G.qDue().length : 0;
    if (due >= 6) out.push({ k: "srs", ic: "brain", t: t("tu.a.srs"), s: t("tu.a.srsS", { n: due }), run: () => Q.srs() });
    const nx = T.nextToRead(wid);
    if (nx) { const l = C.inWorld(wid); out.push({ k: "read", ic: "book", t: t("tu.a.read", { t: nx.title }), s: t("tu.a.readS", { i: l.indexOf(nx) + 1, tot: l.length, w: W.short, m: readMin(nx) }), run: () => AA.router.go("lesson/" + nx.id) }); }
    else {
      const recent = (s.exams || []).some(e => (e.world || "n2") === wid && e.date && e.date >= u.addDays(-6));
      if (!recent) out.push({ k: "exam", ic: "exam", t: t("tu.a.exam", { w: W.short }), s: t("tu.a.examS"), run: () => AA.router.go("examen/" + wid) });
    }
    T.weakNotions().slice(0, 1).forEach(nid => { const n = T.notion(nid); out.push({ k: "weak", ic: "target", t: t("tu.a.weak", { n: n.t }), s: t("tu.a.weakS", { t: C.byId[n.mid].title }), run: () => T.drill(nid) }); });
    if (C.modules.some(m => activeMod(m.id))) out.push({ k: "session", ic: "compass", t: t("tu.a.session"), s: t("tu.a.sessionS"), run: () => T.session() });
    return out;
  };
  T.planText = wid => {
    const WI = T.worldInfo(wid), r = WI.n - WI.read, dx = G.daysToExam();
    if (dx != null && dx > 0) { if (!r) return t("tu.planDateDone", { d: dx }); const weeks = Math.max(1, Math.floor(dx / 7) - 1); return t("tu.planDate", { d: dx, r, w: Math.ceil(r / weeks) }); }
    return r ? t("tu.planNoDate", { r }) : t("tu.planNoDateDone");
  };

  /* ---------- Séances ---------- */
  T.drill = (nid, check) => {
    const n = T.notion(nid); if (!n) return;
    if (!T.isRead(n.mid)) return T.needRead(n.mid);
    const s = S(), rank = q => (s.errors[q.id] || s.seen[q.id] === 0 ? 0 : s.seen[q.id] === undefined ? 1 : 2) + Math.random() * .9;
    let qs = T.qsOf(nid).sort((a, b) => rank(a) - rank(b)).slice(0, 5);
    const gk = G.genKeys(n.mid).filter(k => { const g = G.gen(k); return g && T.notionOf(g) === nid; });
    if (qs.length < 5) T.notions(n.mid).filter(x => x.id !== nid).sort((a, b) => (T.mastery(a.id) ?? .5) - (T.mastery(b.id) ?? .5))
      .forEach(x => T.qsOf(x.id).sort((a, b) => rank(a) - rank(b)).forEach(q => { if (qs.length < 5 && !qs.includes(q)) qs.push(q); }));
    const calc = gk.length ? [G.gen(u.pick(gk))].filter(Boolean) : [];
    Q.start("drill", u.shuffle(qs).concat(calc), { notion: nid, check: !!check, title: t("tu.drill", { n: n.t }), back: "home" });
  };
  T.session = () => {
    const s = S(), used = new Set(), pick = [];
    const add = q => { if (q && !used.has(q.id) && G.inPlay(q.m)) { used.add(q.id); pick.push(q); } };
    T.gaps().slice(0, 2).forEach(g => u.shuffle(T.qsOf(g.id)).slice(0, 2).forEach(add));
    (G.qDue ? G.qDue() : []).slice(0, 5).forEach(add);
    C.modules.filter(m => T.explicitRead(m.id)).sort((a, b) => s.read[b.id].e.localeCompare(s.read[a.id].e)).slice(0, 2)
      .forEach(m => u.shuffle(m.quiz.filter(q => s.seen[q.id] === undefined)).slice(0, 2).forEach(add));
    T.weakNotions().slice(0, 3).forEach(nid => add(u.pick(T.qsOf(nid))));
    /* Rappels des niveaux précédents : les questions lues il y a le plus longtemps. */
    const goal = G.goalWorld();
    C.questions.filter(q => G.inPlay(q.m) && C.byId[q.m].world !== goal && q.lvl !== 2).sort((a, b) => (s.last[a.id] || "").localeCompare(s.last[b.id] || "") || Math.random() - .5).slice(0, 2).forEach(add);
    const pool = C.questions.filter(q => G.inPlay(q.m));
    u.shuffle(pool.filter(q => s.seen[q.id] === undefined)).forEach(q => { if (pick.length < 10) add(q); });
    u.shuffle(pool).forEach(q => { if (pick.length < 10) add(q); });
    const calcs = [G.gen()].filter(Boolean);
    Q.start("tutor", u.shuffle(pick.slice(0, 11)).concat(calcs), { title: t("tu.session"), back: "home" });
  };
  /* Conditions des trophées 2.0. */
  const cond0 = G.cond;
  G.cond = c => {
    const s = S(), nw = Object.values(s.nwon || {});
    switch (c.k) {
      case "tuReadW": { const ms = C.inWorld(c.w); return [ms.filter(m => T.explicitRead(m.id)).length, ms.length || 1]; }
      case "tuReadN": return [C.modules.filter(m => T.explicitRead(m.id)).length, c.n === "all" ? C.modules.length : c.n];
      case "tuExam": return [(s.examOk || {})[c.w] ? 1 : 0, 1];
      case "tuNotion": return [nw.filter(v => v >= 1).length, c.n];
      case "tuMaster": return [nw.filter(v => v >= 2).length, c.n];
      case "tuGap": return [s.gapFixed || 0, c.n];
      case "tuEclair": return [s.eclairOk || 0, c.n];
      case "tuSess": return [s.tuSess || 0, c.n];
      default: return cond0(c);
    }
  };
  /* Barème XP 2.0 des actions d'apprentissage (les réponses sont dans game.js). */
  T.XP = { read: 25, eclair: 15, notion: 15, master: 25, gap: 30, session: 20, examPass: 150, examDay: 30 };
  /* Défi éclair : 3 questions juste après la lecture, pour ancrer. */
  T.eclair = mid => {
    const m = C.byId[mid]; if (!m) return; const s = S();
    const qs = u.shuffle(m.quiz.filter(q => q.lvl !== 2)).sort((a, b) => (s.seen[a.id] === undefined ? 0 : 1) - (s.seen[b.id] === undefined ? 0 : 1)).slice(0, 3);
    if (!qs.length) return;
    Q.start("eclair", qs, { title: t("tu.eclairTitle", { t: m.title }), back: "lesson/" + mid });
  };
  T.offerEclair = m => {
    fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight * .4, 30, "rgba(61,220,151,.85)");
    ui.sheet(`<div class="tu-sheet"><span class="medal">${AA.icon("check")}</span><h3>${t("tu.readToast")} · +5 XP</h3><p>${t("tu.eclairS", { t: esc(m.title) })}</p>
      <button class="btn block" data-tueclair="${m.id}">${AA.icon("bolt")} ${t("tu.eclairBtn")}</button><button class="btn ghost block" data-no>${t("tu.later")}</button></div>`, m.title);
  };
  T.fixGap = nid => {
    const n = T.notion(nid); if (!n) return; fx.sfx.flip();
    ui.sheet(`<div class="tu-sheet"><span class="medal">${AA.icon("buoy")}</span><h3>${t("tu.gapT", { n: esc(n.t) })}</h3><p class="small muted">${t("tu.gapS", { t: esc(C.byId[n.mid].title) })}</p>
      <ol class="tu-steps"><li><button class="btn ghost block" data-tunotion="${n.id}">${AA.icon("book")} ${t("tu.gap1")}</button></li>
      <li><button class="btn block" data-tudrill="${n.id}">${AA.icon("play")} ${t("tu.gap2")}</button></li>
      <li class="small muted">${AA.icon("calendar")} ${t("tu.gap3")}</li></ol></div>`, n.t);
  };
  T.needRead = mid => {
    const m = C.byId[mid]; if (!m) return; fx.sfx.bad();
    ui.sheet(`<div class="tu-sheet"><span class="medal">${AA.icon("lock")}</span><h3>${t("tu.needT")}</h3><p>${t("tu.needS", { t: esc(m.title) })}</p>
      <a class="btn block" href="#/lesson/${m.id}">${AA.icon("book")} ${t("tu.needBtn", { t: esc(m.title) })}</a></div>`, t("tu.needT"));
  };
  T.needAny = wid => {
    const m = T.nextToRead(wid || G.goalWorld()) || C.modules[0]; fx.sfx.bad();
    ui.sheet(`<div class="tu-sheet"><span class="medal">${AA.icon("book")}</span><h3>${t("tu.noneT")}</h3><p>${t("tu.noneS")}</p>
      <a class="btn block" href="#/lesson/${m.id}">${AA.icon("book")} ${t("tu.needBtn", { t: esc(m.title) })}</a></div>`, t("tu.noneT"));
  };
  /* Bilan du tuteur à la fin de chaque série : lacunes repérées, vérification. */
  T.resultExtra = c => {
    const s = S(); let out = "";
    if (c.mode === "drill" && c.notion) {
      const n = T.notion(c.notion), good = c.answers.filter(a => a.ok).length, p = good / Math.max(1, c.answers.length);
      if (!c._tu) {
        c._tu = true; s.gapChk = s.gapChk || {};
        if (c.check && p >= .8) { delete s.gapChk[c.notion]; c._msg = t("tu.resChk", { n: n.t }); s.gapFixed = (s.gapFixed || 0) + 1; c.xp += T.XP.gap; G.addXp(T.XP.gap); }
        else if (c.check) { s.gapChk[c.notion] = u.addDays(1); c._msg = t("tu.resChkNo", { n: n.t }); }
        else s.gapChk[c.notion] = u.addDays(2);
        AA.store.save(true);
      }
      if (c._msg) out += `<p class="callout ${c.check && p >= .8 ? "ok" : ""}">${esc(c._msg)}</p>`;
    }
    if (c.mode === "eclair") {
      const good = c.answers.filter(a => a.ok).length, all = good === c.answers.length && good > 0;
      if (!c._tu) { c._tu = true; if (all) { c.xp += T.XP.eclair; G.addXp(T.XP.eclair); s.eclairOk = (s.eclairOk || 0) + 1; } }
      out += `<p class="callout ${all ? "ok" : ""}">${all ? t("tu.eclairOk") : t("tu.eclairNo")}</p>`;
    }
    if (c.mode === "tutor" && !c._tu) {
      c._tu = true; s.tuSess = (s.tuSess || 0) + 1;
      if (c.answers.length >= 8 && s.tuDay !== u.today()) { s.tuDay = u.today(); c.xp += T.XP.session; G.addXp(T.XP.session); }
    }
    if (c.mode === "exam" && !c._tu) {
      c._tu = true; const ex = s.exams[s.exams.length - 1], w = c.world || "n2"; s.examOk = s.examOk || {};
      if (ex && ex.score >= 15 && c.full && !s.examOk[w]) { s.examOk[w] = u.today(); c.xp += T.XP.examPass; G.addXp(T.XP.examPass); out += `<p class="callout ok">${t("tu.examPassXp", { n: T.XP.examPass })}</p>`; }
      else if (c.answers.length >= Math.min(20, c.items.length) && s.examDay !== u.today()) { s.examDay = u.today(); c.xp += T.XP.examDay; G.addXp(T.XP.examDay); }
      AA.store.save(); G.checkBadges();
    }
    /* Notions gagnées pendant la série : la progression se voit tout de suite. */
    const won = Object.keys(c._ns0 || {}).filter(nid => !["ok", "master"].includes(c._ns0[nid]) && ["ok", "master"].includes(T.nState(nid)));
    if (won.length) out += `<section class="card soft tu-res tu-won"><p class="eyebrow">${AA.icon("sparkle")} ${t("tu.wonT", { n: won.length })}</p><div class="row">${won.slice(0, 6).map(nid => `<span class="chip gold">${AA.icon("check")} ${esc(T.notion(nid).t)}</span>`).join("")}</div></section>`;
    const ids = [...new Set(c.answers.filter(a => !a.ok && !a.card).map(a => T.notionOf(a.q)).filter(Boolean))].filter(nid => T.isGap(nid) && nid !== c.notion);
    if (ids.length) out += `<section class="card soft tu-res"><p class="eyebrow">${t("tu.resGapsT")}</p><p class="small muted">${t("tu.resGapsS")}</p>
      ${ids.slice(0, 4).map(nid => { const n = T.notion(nid); return `<div class="row between tu-gaprow"><span class="grow"><b class="small">${esc(n.t)}</b><span class="xs muted"> · ${esc(C.byId[n.mid].title)}</span></span><button class="btn sm" data-tufix="${nid}">${t("tu.fix")}</button></div>`; }).join("")}</section>`;
    return out;
  };

  /* ---------- Branchements dans le moteur existant ---------- */
  const rec = G.record;
  G.record = (q, ok, doubt, picked) => {
    const nid = T.notionOf(q), st0 = nid ? T.nState(nid) : "";
    rec(q, ok, doubt, picked);
    try { T.note(q, ok && !doubt); if (nid) T.notionXp(nid, st0); T.dailyXp(); } catch (e) {}
  };
  /* XP d'apprentissage : notion acquise (+15) puis maîtrisée (+25), une seule fois chacune. */
  T.notionXp = (nid, st0) => {
    const s = S(), now = T.nState(nid); s.nwon = s.nwon || {};
    const lvl = now === "master" ? 2 : now === "ok" ? 1 : 0, had = s.nwon[nid] || 0;
    if (lvl > had) { s.nwon[nid] = lvl; const x = (lvl >= 1 && had < 1 ? T.XP.notion : 0) + (lvl >= 2 ? T.XP.master : 0); if (x) G.addXp(x); }
  };
  /* Bonus du jour : 10 réponses dans la journée = +10 XP (+20 dès 7 jours de série, +30 dès 30). */
  T.dailyXp = () => {
    const dc = G.dayc(); if (dc.ans < 10 || dc.bonus) return;
    dc.bonus = 1; const st = G.streak(); G.addXp(st >= 30 ? 30 : st >= 7 ? 20 : 10);
  };
  G.unlocked = m => { if (typeof m === "string") m = C.byId[m]; return !!m; };
  G.worldOpen = w => { if (typeof w === "string") w = C.worldById[w]; return !!w && !w.soon; };
  G.inPlay = m => { if (typeof m === "string") m = C.byId[m]; return !!m && (!AA.path || AA.path.active(m.world)) && T.isRead(m.id); };
  const gen0 = G.gen;
  G.gen = key => { if (key) return gen0(key); return G.genKeys().some(k => G.inPlay(C.generators[k].m)) ? gen0() : null; };
  G.nextModule = () => T.nextToRead(G.goalWorld()) || C.modules.find(m => !T.isRead(m.id)) || C.inWorld(G.goalWorld())[0] || C.modules[0];
  G.claimable0 = G.claimable; G.claimable = () => 0;
  AA.stars = () => "";

  const FREE = new Set(["place", "pc"]);
  const start0 = Q.start;
  Q.start = (mode, qs, opts) => {
    opts = opts || {};
    if (mode === "module" && opts.module && !T.isRead(opts.module)) return T.needRead(opts.module);
    if (mode === "gen" && /^lesson\//.test(opts.back || "")) { const mid = opts.back.split("/")[1]; if (!T.isRead(mid)) return T.needRead(mid); }
    if (!FREE.has(mode)) { qs = (qs || []).filter(q => q && T.qOk(q)); if (!qs.length) return T.needAny(opts.world); }
    const ns0 = {}; qs.forEach(q => { const nid = T.notionOf(q); if (nid) ns0[nid] = T.nState(nid); }); opts._ns0 = ns0;
    const prev = opts.onResult;
    opts.onResult = (c, good, n) => (prev ? prev(c, good, n) || "" : "") + T.resultExtra(c, good, n);
    return start0(mode, qs, opts);
  };
  const restart0 = Q.restart;
  Q.restart = c => c && c.mode === "drill" ? T.drill(c.notion, c.check) : c && c.mode === "tutor" ? T.session() : restart0(c);
  Q.calcs = (mid, n, title) => {
    const keys = G.genKeys(mid).filter(k => T.isRead(C.generators[k].m));
    if (!keys.length) return mid ? T.needRead(mid) : T.needAny();
    Q.start("gen", Array.from({ length: n || 6 }, () => G.gen(u.pick(keys))), { title: title || t("quiz.calcs"), air: mid ? 200 : null, back: mid ? "lesson/" + mid : "train" });
  };
  /* Examen blanc : toujours ouvert, mais seulement sur les cours lus. */
  Q.exam = (full, wid) => {
    wid = wid || Q.examWorld();
    const mods = C.inWorld(wid).filter(m => T.isRead(m.id)), pick = [], w = C.worldById[wid];
    if (!mods.length) return T.needAny(wid);
    mods.forEach(m => pick.push(...u.shuffle(m.quiz.filter(q => q.lvl !== 2)).slice(0, full ? 2 : 1)));
    const all = C.questions.filter(q => q.world === wid && T.qOk(q) && !pick.includes(q));
    const n = full ? 40 : 20, nc = full ? 10 : 4;
    const rest = u.shuffle(all).slice(0, Math.max(0, n - nc - pick.length));
    const wg = G.genKeys().filter(k => C.byId[C.generators[k].m] && C.byId[C.generators[k].m].world === wid && T.isRead(C.generators[k].m));
    const calcs = wg.length ? Array.from({ length: nc }, () => G.gen(u.pick(wg))).filter(Boolean) : [];
    Q.start("exam", u.shuffle(pick.slice(0, n - calcs.length).concat(rest, calcs)), { full, world: wid, timeLeft: (full ? 45 : 20) * 60, title: t(full ? "mode.examFull" : "mode.examQuick") + (w && wid !== "n2" ? " · " + w.short : ""), back: "train" });
  };

  /* Jeux retirés (choix de Geoffrey) : trophées associés masqués, écrans redirigés. */
  /* 2.2 : aquarium, aventures, quêtes, défis et événements reviennent (espace Jeux) ; seuls les anciens trophées de boss restent masqués (remplacés par ceux de 2.2). */
  const HIDE_K = new Set(["boss", "bossAny"]), HIDE_F = new Set();
  T.badgeHidden = b => !b.test || HIDE_K.has(b.test.k) || (b.test.k === "v19" && HIDE_F.has(b.test.f));

  /* Migration 2.0 : cours réussis (≥ 1 étoile) = lus ; historique → notions. */
  /* Barème XP 2.0 : pas de rattrapage massif. Les notions déjà acquises et les cours
     déjà lus sont notés comme « déjà récompensés » ; la scène d'évolution repart du palier actuel. */
  T.migrateXp = () => {
    const s = S(); if (s.v20xp) return;
    s.nwon = s.nwon || {};
    Object.keys(s.nstat || {}).forEach(nid => { const st = T.nState(nid); if (st === "master") s.nwon[nid] = 2; else if (st === "ok") s.nwon[nid] = 1; });
    Object.keys(s.read || {}).forEach(k => { if (s.read[k] && s.read[k].e) s.read[k].x = 1; });
    if (AA.avatar) s.evoSeen = AA.avatar.stage(G.levelOf(s.xp).l);
    s.v20xp = 1;
  };
  T.migrate = () => {
    const s = S();
    C.badges = C.badges.filter(b => !T.badgeHidden(b));
    if (s.v20) { T.migrateXp(); return; }
    C.modules.forEach(m => { if (G.stars(m.id) >= 1 && !T.explicitRead(m.id)) s.read[m.id] = Object.assign({}, s.read[m.id], { e: (s.read[m.id] || {}).a || u.today(), mig: 1 }); });
    s.nstat = s.nstat || {};
    if (!Object.keys(s.nstat).length) {
      Object.keys(s.stats || {}).filter(id => C.qById[id] && !id.startsWith("pc-")).sort((a, b) => (s.last[a] || "").localeCompare(s.last[b] || "")).forEach(id => {
        const q = C.qById[id], st = s.stats[id], nid = T.notionOf(q); if (!nid || !st || !st.n) return;
        const r = s.nstat[nid] || { h: "", n: 0, ok: 0, d: "" };
        r.h = (r.h + (s.seen[id] === 1 ? 1 : 0)).slice(-10); r.n += st.n; r.ok += st.ok; if ((s.last[id] || "") > r.d) r.d = s.last[id] || r.d; s.nstat[nid] = r;
      });
    }
    s.v20 = 1; s.v20note = Object.keys(s.themes || {}).length > 0; T.migrateXp();
    AA.store.save(true);
  };
  const rstart = AA.router.start;
  AA.router.start = () => { try { T.migrate(); } catch (e) { console.error(e); } rstart(); };
  if (AA.store.onSave) { /* rien : la migration est idempotente (drapeau v20) */ }

  /* ---------- Navigation ---------- */
  ui.TABS = [["home", "home"], ["cours", "book"], ["train", "train"], ["progres", "chart"], ["profile", "user"]];
  const V = AA.views;
  const setTab = (tab, list) => list.forEach(n => { if (V[n]) V[n].tab = tab; });
  setTab("cours", ["map", "lesson"]);
  setTab("train", ["lab", "pc", "scen", "tables", "sim", "calc", "brief", "succ", "examen", "flash", "mistakes"]);
  setTab("profile", ["carnet", "valider", "cursus", "club", "fiches", "parcours", "reports", "sources", "backup", "settings"]);

  /* Clics délégués (fonctionnent dans les panneaux aussi). */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-turead],[data-tuunread],[data-tuquiz],[data-tunotion],[data-tudrill],[data-tufix],[data-tuact],[data-tusession],[data-tumig],[data-tueclair]");
    if (!b) return;
    const d = b.dataset;
    if (d.turead) { const m = C.byId[d.turead]; T.markRead(d.turead, b); AA.router.refresh(); T.offerEclair(m); }
    else if (d.tueclair) { fx.sfx.tap(); document.querySelectorAll(".sheet-wrap").forEach(x => x._close && x._close()); T.eclair(d.tueclair); }
    else if (d.tuunread) ui.confirm(t("tu.unreadQ"), t("tu.unreadOk"), () => { T.unmarkRead(d.tuunread); AA.router.refresh(); });
    else if (d.tuquiz) { fx.sfx.tap(); Q.module(C.byId[d.tuquiz]); }
    else if (d.tunotion) T.openNotion(d.tunotion);
    else if (d.tudrill) { fx.sfx.tap(); T.drill(d.tudrill); }
    else if (d.tufix) T.fixGap(d.tufix);
    else if (d.tuact != null && T._acts && T._acts[+d.tuact]) { fx.sfx.tap(); T._acts[+d.tuact].run(); }
    else if (d.tusession != null) { fx.sfx.tap(); T.session(); }
    else if (d.tumig != null) { S().v20note = false; AA.store.save(); const c = b.closest(".tu-mig"); if (c) c.remove(); }
  });

  /* ---------- Accueil : le tuteur ---------- */
  const bars = WI => `<div class="tu-bars">
      <div><span class="small">${t("tu.readN", { n: WI.read, tot: WI.n })}</span>${ui.bar(WI.read / Math.max(1, WI.n), "var(--primary)")}</div>
      <div><span class="small">${t("tu.notionsN", { n: WI.seen, tot: WI.tot })}</span>${ui.bar(WI.seen / Math.max(1, WI.tot), "var(--world-n3)")}</div>
      <div><span class="small">${t("tu.masteryN", { p: pct(WI.mastery) })}</span>${ui.bar(WI.mastery, barCol(WI.mastery))}</div></div>`;
  const gapRows = list => list.map(g => `<div class="tu-gaprow"><span class="grow"><b class="small">${esc(g.n.t)}</b><span class="xs muted">${esc(C.byId[g.n.mid].title)} · ${pct(g.m)} %</span>${ui.bar(g.m, "var(--accent)")}</span><button class="btn sm" data-tufix="${g.id}">${t("tu.fix")}</button></div>`).join("");
  AA.view("home", {
    tab: "home", depth: 0,
    render(el) {
      const s = S(), P = s.profile, wid = G.goalWorld(), W = C.worldById[wid], WI = T.worldInfo(wid);
      const hr = new Date().getHours(), hello = t(hr < 5 ? "home.night" : hr < 18 ? "home.hello" : "home.evening", { name: esc(P.name || t("home.diver")) });
      const dx = G.daysToExam(), st = G.streak(), line = dx != null && dx >= 0 ? t("home.examIn", { n: dx }) : st ? t("home.streak", { n: st }) : t("home.first");
      const acts = (T._acts = T.actions()), a0 = acts[0], rest = acts.slice(1, 4), gaps = T.gaps().slice(0, 3), anyRead = C.modules.some(m => activeMod(m.id));
      el.innerHTML = `
        <header class="hello has-ava"><a class="ava-link" href="#/profile" aria-label="${t("tab.profile")}">${AA.avatar.mine("md")}</a><div><h1>${hello}</h1><p>${line}</p></div></header>
        ${AA.pathView && AA.pathView.homeCard ? AA.pathView.homeCard() : ""}
        ${s.v20note ? `<div class="callout tu-mig"><span class="eyebrow">${t("tu.migT")}</span>${t("tu.migS")} <button class="linkbtn small" data-tumig>${t("tu.ok")}</button></div>` : ""}
        <div class="home-grid"><div class="col-main">
        ${a0 ? `<section class="card tu-next" style="--wc:var(${W.color})"><div class="row between"><p class="eyebrow">${t("tu.next")}</p>${AA.helpBtn("tuteur")}</div>
          <div class="tu-next-main"><span class="orb">${AA.icon(a0.ic)}</span><div class="grow"><h2 class="tu-next-t">${esc(a0.t)}</h2><p class="small muted">${esc(a0.s)}</p></div></div>
          <button class="btn block" data-tuact="0">${AA.icon("play")} ${t("tu.a.go")}</button></section>` : ""}
        ${rest.length ? `<div class="section-title"><h3>${t("tu.then")}</h3></div><div class="stack tu-then">${rest.map((a, i) => `<button class="card tu-act" data-tuact="${i + 1}"><span class="medal">${AA.icon(a.ic)}</span><span class="grow"><b>${esc(a.t)}</b><span class="small muted">${esc(a.s)}</span></span>${AA.icon("next")}</button>`).join("")}</div>` : ""}
        ${anyRead ? `<section class="card tu-today"><div><b>${t("tu.todayT")}</b><p class="small muted">${t("tu.todayS")}</p></div><button class="btn ghost block" data-tusession>${AA.icon("compass")} ${t("tu.todayBtn")}</button></section>` : ""}
        </div><aside class="col-side">
        <section class="card tu-where" style="--wc:var(${W.color})"><div class="row between"><p class="eyebrow">${t("tu.where")}</p>${AA.helpBtn("maitrise")}</div>
          <h3>${t("tu.goal", { w: esc(W.short) })}</h3>${bars(WI)}
          <p class="small" style="margin:var(--sp-3) 0">${T.planText(wid)}</p>
          <div class="row">${!P.examDate ? `<a class="btn ghost sm" href="#/settings">${AA.icon("calendar")} ${t("tu.setDate")}</a>` : ""}<a class="btn ghost sm" href="#/cours/${wid}">${AA.icon("book")} ${t("tu.seeAll")}</a></div></section>
        <div class="section-title"><h3>${t("tu.gapsT")}</h3>${AA.helpBtn("maitrise")}</div>
        <section class="card tu-gaps">${gaps.length ? gapRows(gaps) : `<p class="small muted" style="margin:0">${t("tu.gapsNone")}</p>`}</section>
        </aside></div>`;
      if (AA.pathView && AA.pathView.wireHome) AA.pathView.wireHome();
      AA.avatar.checkEvolution();
    }
  });

  /* ---------- Cours : le parcours dans l'ordre ---------- */
  const worldChips = (cur, attr) => `<div class="wstrip tu-wstrip" role="tablist">${C.worlds.filter(x => !x.soon && C.inWorld(x.id).length).map(x => { const WI = T.worldInfo(x.id);
    return `<button role="tab" class="wchip m-${AA.path.mode(x.id)}" data-${attr}="${x.id}" aria-pressed="${x.id === cur}" aria-selected="${x.id === cur}" style="--wc:var(${x.color})"><span class="wring" style="--p:${WI.read / Math.max(1, WI.n)}">${AA.icon(x.icon)}</span><b>${esc(x.short)}</b><span class="xs">${AA.path.certified(x.id) ? "✓ " + t("map.got") : WI.read + "/" + WI.n}</span></button>`; }).join("")}</div>`;
  const centerChip = () => { const ws = u.$(".tu-wstrip [aria-pressed=true]"); if (ws) { const st = ws.parentElement; st.scrollLeft = ws.offsetLeft - (st.clientWidth - ws.offsetWidth) / 2; } };
  AA.view("cours", {
    tab: "cours", depth: 8,
    render(el, [wid0]) {
      const wid = C.worldById[wid0] && !C.worldById[wid0].soon && C.inWorld(wid0).length ? wid0 : G.goalWorld(), W = C.worldById[wid], l = C.inWorld(wid), WI = T.worldInfo(wid), nx = T.nextToRead(wid);
      el.innerHTML = `${ui.head(t("tu.coursT"), null, `<a class="btn ghost sm" href="#/map/${wid}">${AA.icon("map")} ${t("tu.mapView")}</a>`)}
        <p class="muted">${t("tu.coursS")} ${AA.helpBtn("maitrise")}</p>
        ${worldChips(wid, "cw")}
        <section class="card tu-where" style="--wc:var(${W.color});margin-top:var(--sp-4)"><h2 class="h3">${esc(W.title)}</h2><p class="small muted" style="margin:4px 0 var(--sp-3)">${esc(W.sub)}</p>${bars(WI)}
          ${AA.path.certified(wid) ? `<p class="xs muted" style="margin:var(--sp-3) 0 0">${t("tu.certNote")}</p>` : `<p class="small" style="margin:var(--sp-3) 0 0">${T.planText(wid)}</p>`}</section>
        <ol class="tu-path">${l.map((m, i) => { const st = T.state(m.id), pre = T.prereqs(m.id).filter(x => !T.isRead(x)), I = T.modInfo(m.id);
          return `<li class="tu-step st-${st} ${nx && nx.id === m.id ? "here" : ""}"><a class="tu-step-a" href="#/lesson/${m.id}"><span class="tu-num">${i + 1}</span>
            <span class="grow tu-step-b"><b>${esc(m.title)}</b><span class="xs muted">${esc(m.sub)}</span><span class="tu-step-c">${T.chip(m.id)}${T.isRead(m.id) && I.seen ? `<span class="xs muted">${t("tu.masteryN", { p: pct(I.mastery) })}</span>` : ""}</span>
            ${pre.length ? `<span class="xs muted">${t("tu.prereqT")} : ${pre.map(x => esc(C.byId[x].title)).join(", ")}</span>` : ""}
            ${T.isRead(m.id) && I.seen ? ui.bar(I.mastery, barCol(I.mastery)) : ""}</span>${AA.icon("next")}</a></li>`; }).join("")}
          <li class="tu-step exam ${!nx ? "here" : ""}"><a class="tu-step-a" href="#/examen/${wid}"><span class="tu-num">${AA.icon("exam")}</span><span class="grow tu-step-b"><b>${t("tu.examStep", { w: esc(W.short) })}</b><span class="xs muted">${nx ? t("tu.examStepS", { n: l.length }) : t("tu.examStepOk")}</span></span>${AA.icon("next")}</a></li></ol>`;
      u.$$("[data-cw]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.router.go("cours/" + b.dataset.cw, undefined, true); });
      requestAnimationFrame(centerChip);
    }
  });

  /* ---------- Progrès : notion par notion ---------- */
  AA.view("progres", {
    tab: "progres", depth: 6,
    render(el, [wid0]) {
      const s = S(), wid = C.worldById[wid0] && C.inWorld(wid0).length ? wid0 : G.goalWorld(), W = C.worldById[wid], WI = T.worldInfo(wid), gaps = T.gaps();
      const tot = Object.values(s.stats).reduce((a, v) => [a[0] + v.n, a[1] + v.ok], [0, 0]), got = C.badges.filter(b => s.badges[b.id]).length;
      el.innerHTML = `${ui.head(t("tu.progT"), null, AA.helpBtn("maitrise"))}<p class="muted">${t("tu.progS")}</p>
        <div class="stats" style="margin-top:var(--sp-4)"><div class="stat"><b>${s.xp}</b><span>XP</span></div><div class="stat"><b>${G.streak()}</b><span>${t("prof.streak")}</span></div>
          <div class="stat"><b>${tot[0] ? pct(tot[1] / tot[0]) + " %" : "—"}</b><span>${t("prof.acc", { n: tot[0] })}</span></div><div class="stat"><b>${s.exams.length ? u.num(Math.max(...s.exams.map(e => e.score)), 1) : "—"}</b><span>${t("prof.bestExam")}</span></div></div>
        <div class="section-title"><h3>${t("tu.gapsT")}</h3></div>
        <section class="card tu-gaps">${gaps.length ? gapRows(gaps.slice(0, 8)) : `<p class="small muted" style="margin:0">${t("tu.gapsNone")}</p>`}</section>
        <div class="section-title"><h3>${t("tu.byCourse")}</h3></div>
        ${worldChips(wid, "pw")}
        <section class="card tu-where" style="--wc:var(${W.color});margin-top:var(--sp-3)"><h3>${esc(W.title)}</h3>${bars(WI)}</section>
        <div class="tu-mods">${WI.l.map(m => { const I = T.modInfo(m.id), r = T.isRead(m.id);
          return `<section class="card tu-mod"><div class="tu-mod-h"><a href="#/lesson/${m.id}"><b>${esc(m.title)}</b></a>${T.chip(m.id)}</div>
            ${r ? `<div class="tu-notions">${I.ns.map(n => { const mm = T.mastery(n.id), has = T.qsOf(n.id).length;
              return `<div class="tu-nrow"><span class="grow"><span class="small">${esc(n.t)}</span> ${nChip(n.id)}${ui.bar(mm || 0, barCol(mm || 0))}</span>
                <span class="tu-nbtn"><button class="iconbtn" data-tunotion="${n.id}" aria-label="${t("tu.reread")} : ${esc(n.t)}">${AA.icon("book")}</button>${has ? `<button class="iconbtn" data-tudrill="${n.id}" aria-label="${t("tu.train")} : ${esc(n.t)}">${AA.icon("play")}</button>` : ""}</span></div>`; }).join("")}</div>`
              : `<a class="btn ghost sm" href="#/lesson/${m.id}">${AA.icon("book")} ${t("tu.needBtn", { t: esc(m.title) })}</a>`}</section>`; }).join("")}</div>
        <div class="section-title"><h3>${t("tu.examsT")}</h3><a class="small" href="#/examen/${wid}">${t("exm.histBtn")}</a></div><section class="card">${AA.profile.spark()}</section>
        <details class="card tu-troph" style="margin-top:var(--sp-5)"><summary><b>${t("tu.trophies")}</b> <span class="muted small">${got} / ${C.badges.length}</span></summary>
        <div class="trophies" style="margin-top:var(--sp-3)">${C.badges.map(b => `<div class="trophy ${s.badges[b.id] ? "" : "off"}"><div class="medal">${AA.icon(b.icon)}</div><b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join("")}</div></details>`;
      u.$$("[data-pw]", el).forEach(b => b.onclick = () => { fx.sfx.tap(); AA.router.go("progres/" + b.dataset.pw, undefined, true); });
      requestAnimationFrame(centerChip);
    }
  });

  /* ---------- Entraîner ---------- */
  AA.view("train", {
    tab: "train",
    render(el) {
      const s = S(), nErr = Object.keys(s.errors).filter(id => !C.qById[id] || G.inPlay(C.qById[id].m)).length, due = G.cardsDue().length, dq = G.qDue ? G.qDue().length : 0;
      const doubts = Object.keys(s.doubt).filter(id => C.qById[id] && G.inPlay(C.qById[id].m)).length, best = s.exams.length ? Math.max(...s.exams.map(e => e.score)) : null;
      const wid = G.goalWorld(), read = C.modules.filter(m => activeMod(m.id)), goalRead = read.filter(m => m.world === wid), other = read.filter(m => m.world !== wid);
      const lab = document.createElement("div"); try { V.lab.render(lab, []); } catch (e) {}
      const labTiles = (u.$(".tiles", lab) || { innerHTML: "" }).innerHTML;
      el.innerHTML = `${ui.head(t("tab.train"))}<p class="muted">${t("tu.trainS")}</p>
        ${read.length ? "" : `<div class="callout"><span class="eyebrow">${t("tu.noneT")}</span>${t("tu.noneRead")} <a href="#/lesson/${(T.nextToRead(wid) || C.modules[0]).id}">${t("tu.needBtn", { t: esc((T.nextToRead(wid) || C.modules[0]).title) })}</a></div>`}
        <div class="section-title"><h3>${t("tu.smart")}</h3>${AA.helpBtn("tuteur")}</div>
        <div class="tiles">
          ${ui.tile("tutor", "compass", "var(--primary)", t("tu.session"), t("tu.a.sessionS"))}
          ${ui.tile("diagnostic", "chart", "var(--world-n3)", t("dg.actT"), t("dg.actS"))}
          ${ui.tile("srs", "brain", "var(--world-n3)", t("mode.srs"), t("train.srsS"), dq ? [t("srs.dueN", { n: dq }), "pri"] : null)}
          ${ui.tile("flash", "cards", "var(--primary)", t("mode.flash"), t("train.flashS"), due ? [t("home.due", { n: due }), "pri"] : null)}
          ${ui.tile("errors", "buoy", "var(--accent)", t("mode.errors"), t("train.errorsS"), nErr ? [String(nErr), "warn"] : null)}
          ${ui.tile("doubt", "doubt", "var(--world-e2)", t("mode.doubt"), t("train.doubtS"), doubts ? [String(doubts), "pri"] : null)}
          ${ui.tile("calcs", "calc", "var(--gold)", t("mode.calcs"), t("train.calcsS"))}
          ${C.procs && C.procs.length ? ui.tile("procs", "buoy", "var(--bad)", t("pr.title"), t("pr.tileS"), [t("pr.count", { n: C.procs.filter(p => (s.procs || {})[p.id]).length, tot: C.procs.length }), "warn"]) : ""}
        </div>
        <div class="section-title"><h3>${t("tu.byCourseT")}</h3></div><p class="small muted" style="margin-top:0">${t("tu.byCourseS")}</p>
        <div class="tu-quizlist">${goalRead.concat(other).map(m => `<button class="chip tu-qchip" data-tuquiz="${m.id}">${AA.icon("play")} ${esc(m.title)}</button>`).join("") || `<span class="small muted">${t("tu.noneRead")}</span>`}</div>
        <div class="section-title"><h3>${t("tu.epreuves")}</h3></div>
        <div class="tiles">
          ${ui.tile("examfull", "exam", "var(--accent)", t("mode.examFull"), t("train.examFullS") + " · " + esc(C.worldById[Q.examWorld()].short), best != null ? [t("home.best", { s: u.num(best, 1) }), "gold"] : null)}
          ${ui.tile("examquick", "exam", "var(--accent)", t("mode.examQuick"), t("train.examQuickS") + " · " + esc(C.worldById[Q.examWorld()].short))}
          ${ui.tile("five", "timer", "var(--primary)", t("mode.five"), t("train.fiveS"))}
          ${ui.tile("apnee", "timer", "var(--gold)", t("mode.apnee"), t("train.apneeS"), s.apnee ? [t("train.record", { n: s.apnee }), "gold"] : null)}
          ${ui.tile("duel", "users", "var(--primary)", t("mode.duel"), t("train.duelS"))}
          ${ui.tile("mistakes", "brain", "var(--accent)", t("mist.short"), t("train.mistS"))}
        </div>
        <div class="section-title"><h3>${t("tu.ateliers")}</h3></div>
        <div class="tiles">${labTiles}</div>`;
      u.on(el, "click", ".tile", (e, b) => {
        fx.sfx.tap();
        const k = b.dataset.t, acts = {
          tutor: T.session, srs: () => Q.srs(), flash: () => AA.router.go("flash"), errors: Q.errors, calcs: () => Q.calcs(null, 10, t("mode.calcs")),
          doubt: () => { const qs = Object.keys(S().doubt).map(id => C.qById[id]).filter(Boolean); qs.length ? Q.start("errors", u.shuffle(qs).slice(0, 10), { title: t("mode.doubt"), back: "train" }) : fx.toast(t("train.noDoubtT"), t("train.noDoubtS"), "doubt"); },
          examfull: () => AA.router.go("examen/" + Q.examWorld() + "/full"), examquick: () => AA.router.go("examen/" + Q.examWorld() + "/quick"),
          five: Q.five, apnee: Q.apnee, duel: () => AA.router.go("club"), mistakes: () => AA.router.go("mistakes")
        };
        (acts[k] || (() => AA.router.go(k)))();
      });
    }
  });
  V.lab.render0 = V.lab.render0 || V.lab.render;
  AA.view("lab", { tab: "train", render() {}, guard: () => false, fallback: "train", render0: V.lab.render0 });
  V.lab.render = V.lab.render0; /* gardé pour fabriquer les tuiles « Ateliers » */

  /* ---------- Club et moniteur (facultatif) ---------- */
  AA.view("moniteur", {
    tab: "profile", depth: 4,
    render(el) {
      const s = S(), on = !!s.profile.club;
      el.innerHTML = `${ui.head(t("tu.clubT"), "profile")}<p class="muted">${t("tu.clubIntro")}</p>
        <label class="setting card" style="margin-top:var(--sp-4)"><span class="grow"><b>${t("tu.clubOn")}</b><span>${t("tu.clubOnS")}</span></span><span class="switch"><input type="checkbox" id="tuclub" ${on ? "checked" : ""}><i></i></span></label>
        <div class="tiles" style="margin-top:var(--sp-4)">
          ${ui.tile("carnet", "teach", "var(--world-e1)", t("instr.view"), t("instr.tileS", { n: C.modules.filter(m => (s.instr || {})[m.id]).length, all: C.modules.length }))}
          ${ui.tile("valider", "check", "var(--ok)", t("set.validate"), t("val.tileS", { n: C.validate.filter(([a]) => (s.validOk || {})[a]).length, tot: C.validate.length }))}
          ${ui.tile("cursus", "layers", "var(--world-n3)", t("cur.title"), t("cur.tileS"))}
        </div>`;
      u.$("#tuclub").onchange = e => { s.profile.club = e.target.checked; AA.store.save(); fx.sfx.tap(); };
      u.on(el, "click", ".tile", (e, b) => AA.router.go(b.dataset.t));
    }
  });

  /* ---------- Retouches d'écrans existants ---------- */
  const wrap = (name, fn) => { const v = V[name]; if (!v) return; const r = v.render; v.render = (el, args) => { r(el, args); try { fn(el, args || []); } catch (e) { console.error(e); } }; };

  /* Profil : jeux et outils moniteur sortis, une seule tuile « Club et moniteur ». */
  wrap("profile", el => {
    u.$$('.tile[data-t="quests"],.tile[data-t="aquarium"],.tile[data-t="valider"],.tile[data-t="carnet"],.tile[data-t="cursus"]', el).forEach(x => x.remove());
    const tiles = u.$(".tiles", el); if (tiles) tiles.insertAdjacentHTML("beforeend", ui.tile("moniteur", "teach", "var(--world-e1)", t("tu.clubT"), t("tu.clubS")));
    const pm = u.$(".pm-grid", el); if (pm) { const h = pm.previousElementSibling; if (h && h.classList.contains("section-title")) h.remove(); pm.remove(); }
    const tr = u.$(".trophies", el); if (tr) { const h = tr.previousElementSibling; if (h && h.classList.contains("section-title")) h.remove(); tr.remove(); }
  });
  /* Réglages : plus de rappel « à faire valider » ; sources et signalements restent. */
  wrap("settings", el => { const v = u.$("#valider", el); if (!v) return; const a = u.$('a[href="#/valider"]', v); if (a) a.remove(); const p = u.$("p", v); if (p) p.remove(); const h = u.$("h3", v); if (h) h.textContent = t("src.page") + " · " + t("rep.list"); });
  /* Ordinateur, scénarios, cursus : encadré « à valider » retiré. */
  ["pc", "scen", "cursus"].forEach(n => wrap(n, el => u.$$(".callout", el).forEach(c => { const e = u.$(".eyebrow", c); if (e && e.textContent.trim() === t("common.validate")) c.remove(); })));
  /* Examen : ce qui n'est pas lu. */
  wrap("examen", el => {
    const obs = () => { const sp = u.$(".ex-spec", el); if (!sp || u.$(".tu-exnote", sp)) return; const b = u.$("[data-ew].on", el), wid = b ? b.dataset.ew : Q.examWorld();
      const left = C.inWorld(wid).filter(m => !T.isRead(m.id)).length; const h = u.$("h3", sp);
      if (h) h.insertAdjacentHTML("afterend", `<p class="callout ${left ? "" : "ok"} tu-exnote small">${left ? t("tu.exUnread", { n: left }) : t("tu.exAll")}</p>`); };
    obs(); new MutationObserver(obs).observe(el, { childList: true });
  });
  /* Carte : statut du cours sous chaque thème. */
  wrap("map", el => {
    u.$$(".spot", el).forEach(sp => { const b = u.$(".node[data-id]", sp), info = u.$(".info", sp); if (b && info) info.insertAdjacentHTML("beforeend", T.chip(b.dataset.id)); });
    u.$$(".ml-row[href^='#/lesson/']", el).forEach(a => { const g = u.$(".grow", a); if (g) g.insertAdjacentHTML("beforeend", T.chip(a.getAttribute("href").split("/")[2])); });
  });

  /* Cours : statut, prérequis, « J'ai lu ce cours », notions, notes personnelles. */
  T.readCard = mid => { const r = (S().read[mid] || {}).e;
    return r ? `<section class="card tu-read done" id="tuRead"><div class="tu-read-h"><span class="medal">${AA.icon("check")}</span><div class="grow"><b>${t("tu.readDone", { d: esc(u.fmtDate(r)) })}</b><p class="small muted" style="margin:2px 0 0">${t("tu.readDoneS")}</p></div></div>
        <div class="row"><button class="btn sm" data-tuquiz="${mid}">${AA.icon("play")} ${t("tu.train")}</button><button class="linkbtn small" data-tuunread="${mid}">${t("tu.unread")}</button></div></section>`
      : `<section class="card tu-read" id="tuRead"><b class="h4">${t("tu.readT")}</b><p class="small muted" style="margin:4px 0 var(--sp-3)">${t("tu.readS")}</p><button class="btn block" data-turead="${mid}">${AA.icon("check")} ${t("tu.readBtn")} <span class="chip gold">+5 XP</span></button></section>`; };
  wrap("lesson", (el, [id, tab0]) => {
    const m = C.byId[id]; if (!m) return;
    const s = S(), isR = T.isRead(id), club = !!s.profile.club, tab = u.$(".lesson-tabs [aria-pressed=true]", el), cur = tab ? tab.dataset.tab : tab0;
    const hero = u.$(".lesson-hero", el), first = hero && u.$(".row .chip", hero);
    if (first) first.outerHTML = `<button class="chip tu-stbtn" data-help="maitrise">${T.chip(id)}</button>`;
    if (!club && hero) u.$$(".chip.gold", hero).forEach(c => { if (c.textContent.includes(t("lesson.coachOk"))) c.remove(); });
    const pre = T.prereqs(id).filter(x => !T.isRead(x));
    if (hero && pre.length) hero.insertAdjacentHTML("afterend", `<div class="callout tu-pre"><span class="eyebrow">${t("tu.prereqT")}</span>${t("tu.prereqS")} ${pre.map(x => `<a href="#/lesson/${x}">${esc(C.byId[x].title)}</a>`).join(", ")}</div>`);
    if (hero && AA.path.certified(m.world) && !T.explicitRead(id)) hero.insertAdjacentHTML("afterend", `<p class="xs muted tu-cert">${t("tu.certNote")}</p>`);
    const rd = u.$(".readdone", el);
    if (rd && cur === "essentiel") rd.outerHTML = T.readCard(id);
    if (cur === "moniteur") {
      if (!club) { u.$$(".coachq", el).forEach(x => { const st = x.parentElement; x.remove(); if (st && !st.children.length) st.remove(); }); const v = u.$("#valid", el); if (v) { const lab = v.closest("label"); if (lab) lab.remove(); } }
      else { const st = u.$(".coachq", el); if (st) st.parentElement.insertAdjacentHTML("beforebegin", `<p class="eyebrow">${t("tu.coachIdeas")}</p>`); }
    }
    const dive = u.$("#dive", el), cb = u.$("#calc", el);
    if (!isR && dive) {
      dive.innerHTML = `${AA.icon("lock")} ${t("tu.quizLocked")}`; dive.disabled = false; dive.classList.add("ghost");
      dive.onclick = () => { fx.sfx.tap(); const r = u.$("#tuRead"); if (r) r.scrollIntoView({ behavior: AA.a11y.reduced() ? "auto" : "smooth", block: "center" }); else AA.router.go("lesson/" + id + "/essentiel", { toRead: 1 }); };
      if (cb) cb.remove();
    }
    u.$$(".lesson-side .ml-row[href^='#/lesson/']", el).forEach(a => { const g = u.$(".grow", a); if (g) g.insertAdjacentHTML("beforeend", T.chip(a.getAttribute("href").split("/")[2])); });
    const body = u.$(".lesson-body", el);
    if (body && isR) {
      const I = T.modInfo(id);
      body.insertAdjacentHTML("afterend", `<section class="card tu-notcard"><div class="row between"><p class="eyebrow">${t("tu.notions")}</p>${AA.helpBtn("maitrise")}</div><p class="xs muted" style="margin:0 0 var(--sp-3)">${t("tu.notionsS")}</p>
        <div class="tu-notions">${I.ns.map(n => { const mm = T.mastery(n.id), has = T.qsOf(n.id).length;
          return `<div class="tu-nrow"><span class="grow"><span class="small">${esc(n.t)}</span> ${nChip(n.id)}${ui.bar(mm || 0, barCol(mm || 0))}</span><span class="tu-nbtn"><button class="iconbtn" data-tunotion="${n.id}" aria-label="${t("tu.reread")} : ${esc(n.t)}">${AA.icon("book")}</button>${has ? `<button class="iconbtn" data-tudrill="${n.id}" aria-label="${t("tu.train")} : ${esc(n.t)}">${AA.icon("play")}</button>` : ""}</span></div>`; }).join("")}</div></section>`);
    }
    if (AA.ctx.toRead) { AA.ctx.toRead = 0; setTimeout(() => { const r = u.$("#tuRead"); if (r) r.scrollIntoView({ block: "center" }); }, 150); }
  });
})();
