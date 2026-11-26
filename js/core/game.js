/* =====================================================================
   Abysse Academy · règles du jeu
   XP et niveaux, étoiles, déverrouillages, révisions espacées, trophées,
   quêtes. Les trophées et quêtes sont décrits dans le contenu par des
   conditions déclaratives ({k:"stars", m:"pa20", n:2}…), évaluées ici.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, C = AA.content;
  const S = () => AA.S;
  const G = (AA.game = {});
  G.BOX_DAYS = [0, 1, 3, 7, 16, 35];
  G.STALE_DAYS = 10;

  /* ---------- Niveaux ---------- */
  G.levelOf = xp => {
    let l = 1, need = 100, base = 0;
    while (xp >= base + need) { base += need; l++; need = 100 + (l - 1) * 50; }
    const ranks = AA.i18n.raw("ranks") || [];
    return { l, into: xp - base, need, rank: ranks[Math.min(l - 1, ranks.length - 1)] || "" };
  };
  G.starsFor = p => (p >= 100 ? 3 : p >= 80 ? 2 : p >= 50 ? 1 : 0);
  G.stars = id => { const r = S().themes[id]; return r ? G.starsFor(r.best) : 0; };
  G.worldModules = wid => C.inWorld(wid);
  G.worldStars = (wid, min = 1) => C.inWorld(wid).filter(m => G.stars(m.id) >= min).length;

  /* ---------- Déverrouillage ---------- */
  G.worldOpen = w => {
    if (typeof w === "string") w = C.worldById[w];
    if (!w || w.soon) return false;
    if (S().unlockAll || !w.unlock) return true;
    /* Un monde déjà commencé reste ouvert (jamais de retour en arrière). */
    if (C.inWorld(w.id).some(m => S().themes[m.id])) return true;
    if (w.unlock.boss) return !!(S().boss[w.unlock.world] || {}).won;
    const list = C.inWorld(w.unlock.world);
    if (w.unlock.all) return list.length > 0 && list.every(m => G.stars(m.id) >= 1);
    return G.worldStars(w.unlock.world) >= (w.unlock.count || 1);
  };
  G.unlocked = m => {
    if (typeof m === "string") m = C.byId[m];
    if (!m) return false;
    if (S().unlockAll || S().themes[m.id]) return true;
    const list = C.inWorld(m.world), i = list.indexOf(m);
    if (i <= 0) return G.worldOpen(m.world);
    return G.stars(list[i - 1].id) >= 1;
  };
  G.worldLockReason = w => {
    const src = C.worldById[w.unlock.world];
    if (w.unlock.boss) return AA.t("lock.worldBoss", { boss: src.boss ? src.boss.name : "", world: src.short });
    return w.unlock.all ? AA.t("lock.worldAll", { world: src.short }) : AA.t("lock.worldCount", { n: w.unlock.count, world: src.short });
  };
  G.lockReason = m => {
    const list = C.inWorld(m.world), i = list.indexOf(m), w = C.worldById[m.world];
    if (i <= 0 && w.unlock) return G.worldLockReason(w);
    return AA.t("lock.prev", { title: list[i - 1].title });
  };
  /* Boss de fin de monde : ouvert quand tous les thèmes du monde ont 1 étoile. */
  G.bossOpen = wid => { const w = C.worldById[wid]; if (!w || !w.boss || !G.worldOpen(w)) return false; if (S().unlockAll) return true; const l = C.inWorld(wid); return l.length > 0 && l.every(m => G.stars(m.id) >= 1); };
  G.bossLeft = wid => C.inWorld(wid).filter(m => G.stars(m.id) < 1);

  /* ---------- Suivi des réponses ---------- */
  G.dayc = () => {
    const d = u.today(), s = S();
    if (!s.dayc[d]) s.dayc = { [d]: { ans: 0, ok: 0, flash: 0, scen: 0, apnee: 0, read: 0 } };
    return s.dayc[d];
  };
  G.markDay = () => { const s = S(), d = u.today(); if (!s.days.includes(d)) { s.days.push(d); s.days = s.days.slice(-400); } };
  G.streak = () => {
    const set = new Set(S().days); const d = new Date();
    if (!set.has(u.today())) d.setDate(d.getDate() - 1);
    let n = 0; while (set.has(u.dstr(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  /* picked : index du choix donné (sert à la page « Mes erreurs fréquentes »). */
  G.record = (q, ok, doubt, picked) => {
    const s = S(), st = s.stats[q.id] || { n: 0, ok: 0 };
    if (!ok && picked != null && !q.calc && C.qById[q.id]) { const w = s.wrong[q.id] || {}; w[picked] = (w[picked] || 0) + 1; w.d = u.today(); s.wrong[q.id] = w; }
    if (!ok && q.calc && q.gen) { const k = "gen:" + q.gen, w = s.wrong[k] || {}; w.n = (w.n || 0) + 1; w.d = u.today(); s.wrong[k] = w; }
    st.n++; if (ok) st.ok++; s.stats[q.id] = st;
    s.seen[q.id] = ok && !doubt ? 1 : 0;
    if (C.qById[q.id]) s.last[q.id] = u.today();
    if (doubt) s.doubt[q.id] = u.today(); else if (ok) delete s.doubt[q.id];
    const dc = G.dayc(); dc.ans++; if (ok) dc.ok++;
    G.markDay();
  };
  G.lastSeen = mid => { let m = ""; const s = S(); C.byId[mid] && C.byId[mid].quiz.forEach(q => { const d = s.last[q.id]; if (d && d > m) m = d; }); return m; };
  G.isStale = mid => { if (G.stars(mid) < 1) return false; const l = G.lastSeen(mid); return !l || l <= u.addDays(-G.STALE_DAYS); };
  G.staleList = () => C.modules.filter(m => G.isStale(m.id));
  G.moduleAcc = mid => { let n = 0, ok = 0; const s = S(); (C.byId[mid] || { quiz: [] }).quiz.forEach(q => { const v = s.stats[q.id]; if (v) { n += v.n; ok += v.ok; } }); return n ? ok / n : null; };
  G.mastery = mid => { const m = C.byId[mid]; if (!m || !m.quiz.length) return 0; return m.quiz.filter(q => S().seen[q.id] === 1).length / m.quiz.length; };
  G.daysToExam = () => { const e = S().profile.examDate; return e ? u.daysBetween(u.today(), e) : null; };

  /* ---------- XP ---------- */
  G.addXp = (n, el) => {
    if (!n) return;
    const before = G.levelOf(S().xp).l;
    S().xp += n; AA.store.save();
    if (el) AA.fx.float("+" + n + " XP", el);
    const after = G.levelOf(S().xp);
    if (after.l > before) {
      AA.fx.sfx.up(); AA.fx.buzz([30, 60, 30]);
      const evo = AA.avatar && AA.avatar.stage(after.l) > AA.avatar.stage(before);
      AA.fx.toast(AA.t("toast.level", { l: after.l }), evo ? AA.t("ava.evolved", { name: AA.avatar.formName(AA.avatar.get(), after.l) }) : AA.t("toast.rank", { rank: after.rank }), "trophy");
      AA.fx.burst(innerWidth / 2, innerHeight * .6, 40, "rgba(255,200,87,.9)");
    }
    AA.ui && AA.ui.hud();
  };

  /* ---------- Flashcards (boîtes de Leitner) ---------- */
  G.cardState = c => S().cards[c.id] || { box: 0, due: "" };
  G.cardsDue = () => { const d = u.today(); return C.cards.filter(c => { const s = S().cards[c.id]; return (!s || s.due <= d) && G.unlocked(c.m); }); };
  G.rateCard = (c, ok) => {
    const s = G.cardState(c);
    s.box = ok ? Math.min(5, s.box + 1) : 0;
    s.due = u.addDays(ok ? G.BOX_DAYS[s.box] : 0);
    S().cards[c.id] = s; S().flashCount++; G.dayc().flash++; G.markDay();
  };
  G.boxes = () => { const b = [0, 0, 0, 0, 0, 0]; C.cards.forEach(c => b[G.cardState(c).box]++); return b; };

  /* ---------- Conditions déclaratives (trophées, quêtes) ---------- */
  const scenOk = () => C.scenarios.filter(x => S().scen[x.id] === 1).length;
  G.cond = c => {
    const s = S(), dc = G.dayc();
    switch (c.k) {
      case "modulesDone": return [Object.keys(s.themes).length, c.n];
      case "stars": return [G.stars(c.m), c.n];
      case "perfect": return [Object.values(s.themes).some(r => r.best === 100) ? 1 : 0, 1];
      case "worldStars": { const tot = C.inWorld(c.w).length; return [G.worldStars(c.w, c.min || 1), c.n === "all" ? tot : c.n]; }
      case "scen": return [s.scen[c.id] === 1 ? 1 : 0, 1];
      case "scenAll": return [scenOk(), C.scenarios.length];
      case "table": return [s.table.length, c.n];
      case "daily": return [Object.keys(s.daily).length, c.n];
      case "exam": return [s.exams.some(e => (!c.full || e.full) && e.score >= (c.min || 0)) ? 1 : 0, 1];
      case "noStale": { const all = C.inWorld(c.w); return [all.every(m => G.stars(m.id) >= 1) && !all.some(m => G.isStale(m.id)) ? 1 : 0, 1]; }
      case "combo": return [s.bestCombo, c.n];
      case "apnee": return [s.apnee, c.n];
      case "rescued": return [s.rescued, c.n];
      case "flash": return [s.flashCount, c.n];
      case "sim": return [s.simOk, 1];
      case "duel": return [s.duels, 1];
      case "keep": return [s.keepDone ? 1 : 0, 1];
      case "streak": return [G.streak(), c.n];
      case "level": return [G.levelOf(s.xp).l, c.n];
      case "read": return [Object.keys(s.read).filter(k => s.read[k].e).length, c.n];
      case "deep": return [Object.keys(s.read).filter(k => s.read[k].a).length, c.n];
      case "validated": return [Object.values(s.notes).filter(n => n.ok).length, c.n];
      case "chapter": return [G.chapterDone(c.id) ? 1 : 0, 1];
      case "day": return [dc[c.f] || 0, c.n];
      case "dailyDone": return [s.daily[u.today()] != null ? 1 : 0, 1];
      case "keepToday": return [s.keepDay === u.today() ? 1 : 0, 1];
      case "boss": return [(s.boss[c.w] || {}).won ? 1 : 0, 1];
      case "bossAny": return [Object.values(s.boss).filter(b => b.won).length, c.n || 1];
      case "story": return [c.id ? ((s.story[c.id] || {}).done ? 1 : 0) : Object.values(s.story).filter(x => x.done).length, c.id ? 1 : c.n];
      case "five": return [s.five, c.n];
      case "gloss": return [Object.keys(s.glossSeen).length, c.n];
      case "aqua": return [Object.keys(s.aqua).length, c.n];
      case "xp": return [s.xp, c.n];
      case "answers": return [Object.values(s.stats).reduce((a, v) => a + v.n, 0), c.n];
      case "accuracy": { const tot = Object.values(s.stats).reduce((a, v) => [a[0] + v.n, a[1] + v.ok], [0, 0]); return [tot[0] >= (c.min || 30) ? Math.round(tot[1] / tot[0] * 100) : 0, c.n]; }
      case "boxes": return [G.boxes().slice(c.box || 3).reduce((a, b) => a + b, 0), c.n];
      default: return [0, 1];
    }
  };
  G.met = c => { const [v, n] = G.cond(c); return v >= n; };

  G.checkBadges = () => {
    const s = S();
    /* Aquarium : nouvelles espèces débloquées. */
    (C.creatures || []).forEach(f => {
      if (!s.aqua[f.id] && G.met(f.test)) {
        s.aqua[f.id] = u.today(); AA.store.save();
        AA.fx.toast(AA.t("aqua.newT", { name: f.name }), AA.t("aqua.newS"), "fish", () => AA.router.go("aquarium/" + f.id));
      }
    });
    C.badges.forEach(b => {
      if (!s.badges[b.id] && G.met(b.test)) {
        s.badges[b.id] = u.today(); AA.store.save();
        AA.fx.sfx.badge(); AA.fx.buzz([20, 40, 20]);
        AA.fx.toast(AA.t("toast.badge", { name: b.name }), b.desc, b.icon);
      }
    });
  };

  /* ---------- Quêtes ---------- */
  G.chapterDone = id => {
    const c = C.chapters.find(x => x.id === id); if (!c) return false;
    return c.steps.every((st, k) => c.real ? !!S().real[c.id + k] : G.met(st.test));
  };
  G.nextStep = () => {
    for (const c of C.chapters) { if (c.real) continue; for (const st of c.steps) if (!G.met(st.test)) return { c, st }; }
    return null;
  };
  G.claimable = () => {
    let n = 0; const s = S();
    C.chapters.forEach(c => { if (!c.real) c.steps.forEach((st, k) => { if (G.met(st.test) && !s.claimed[c.id + k]) n++; }); });
    G.todayQuests().forEach(q => { if (G.met(q.test) && !s.claimed[u.today() + q.id]) n++; });
    return n;
  };
  /* 3 quêtes par jour, toujours la même liste dans la journée. La première est fixe (pinned). */
  G.todayQuests = () => {
    const pool = C.dailyQuests.slice(); if (!pool.length) return [];
    const out = []; const pin = pool.findIndex(q => q.pinned);
    if (pin >= 0) out.push(pool.splice(pin, 1)[0]);
    const r = u.seeded(u.seedOf(u.today()));
    while (out.length < 3 && pool.length) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
    return out;
  };

  /* ---------- Sélections ---------- */
  G.goalWorld = () => { const g = S().profile.goal; return C.worldById[g] && !C.worldById[g].soon ? g : "n2"; };
  G.nextModule = () => {
    const order = [G.goalWorld()].concat(C.worlds.map(w => w.id).filter(id => id !== G.goalWorld()));
    for (const wid of order) { const m = C.inWorld(wid).find(x => G.unlocked(x) && G.stars(x.id) < 1); if (m) return m; }
    const all = C.modules.filter(x => G.unlocked(x) && G.stars(x.id) < 3);
    return all.sort((a, b) => G.stars(a.id) - G.stars(b.id))[0] || C.modules[0];
  };
  G.qod = () => {
    const A = S().qodAns; /* réponse du jour déjà donnée : on garde la même question */
    if (A && A.d === u.today()) { const q = C.questions.find(x => x.id === A.id); if (q) return q; }
    const pool = C.questions.filter(q => G.unlocked(q.m));
    if (!pool.length) return null;
    return pool[u.seedOf(u.today() + "q") % pool.length];
  };
  G.weakModules = (k = 3) => C.modules.map(m => ({ m, a: G.moduleAcc(m.id) })).filter(x => x.a != null && G.unlocked(x.m)).sort((a, b) => a.a - b.a).slice(0, k);

  /* Session du jour : erreurs, thème faible, rappels anciens, doutes, inédites, 2 calculs. */
  G.dailySet = () => {
    const s = S(), used = new Set(), pick = [];
    const add = q => { if (q && !used.has(q.id) && G.unlocked(q.m)) { used.add(q.id); pick.push(q); } };
    Object.keys(s.errors).filter(id => C.qById[id] && !id.startsWith("pc-")).sort((a, b) => s.errors[b] - s.errors[a]).slice(0, 3).forEach(id => add(C.qById[id]));
    Object.keys(s.doubt).filter(id => C.qById[id]).slice(0, 2).forEach(id => add(C.qById[id]));
    const weak = C.inWorld(G.goalWorld()).filter(m => G.unlocked(m)).map(m => ({ m, a: G.moduleAcc(m.id) ?? .5 })).sort((x, y) => x.a - y.a)[0];
    if (weak) u.shuffle(weak.m.quiz).slice(0, 2).forEach(add);
    C.modules.filter(m => G.stars(m.id) >= 1).sort((a, b) => (G.lastSeen(a.id) || "").localeCompare(G.lastSeen(b.id) || "")).slice(0, 2)
      .forEach(m => add(m.quiz.slice().sort((a, b) => (s.last[a.id] || "").localeCompare(s.last[b.id] || ""))[0]));
    const pool = C.questions.filter(q => G.unlocked(q.m));
    u.shuffle(pool.filter(q => s.seen[q.id] === undefined)).forEach(q => { if (pick.length < 8) add(q); });
    u.shuffle(pool).forEach(q => { if (pick.length < 8) add(q); });
    return u.shuffle(pick).concat([G.gen(), G.gen()].filter(Boolean));
  };

  /* ---------- Générateurs de calculs ---------- */
  G.genKeys = mid => Object.keys(C.generators).filter(k => !mid || C.generators[k].m === mid);
  G.gen = key => {
    const keys = key ? [key] : G.genKeys().filter(k => G.unlocked(C.generators[k].m));
    const k = u.pick(keys.length ? keys : G.genKeys()); if (!k) return null;
    const q = C.generators[k].make();
    return Object.assign(q, { id: "gen:" + k, gen: k, m: C.generators[k].m, calc: true });
  };
  /* Fabrique un QCM chiffré avec des leurres plausibles. */
  G.mkCalc = (q, ans, wrongs, unit, e, d = 2) => {
    const A = u.num(ans, d) + unit; const set = new Set([A]); const out = [A];
    wrongs.concat([ans * 1.25, ans * .8, ans + 1, ans * 1.5, ans - 1]).forEach(w => { const s = u.num(w, d) + unit; if (out.length < 4 && w > 0 && !set.has(s)) { set.add(s); out.push(s); } });
    const c = u.shuffle(out);
    return { q, c, a: c.indexOf(A), e };
  };
})();
