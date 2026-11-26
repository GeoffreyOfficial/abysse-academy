/* =====================================================================
   Abysse Academy · parcours personnel (pour tous les niveaux)
   - S.profile.level : niveau déclaré (none, bapteme, n1, n2, n3, n4, e1, e2).
   - S.profile.dives : expérience (0, 20, 100, 500 plongées environ).
   - S.certs[monde] = date : niveaux obtenus officiellement.
   - S.path[monde] = "learn" | "review" | "skip" :
       learn  = j'apprends (cours complets, déblocage pas à pas) ;
       review = je révise (tout ouvert, cours allégés : « À retenir » d'abord) ;
       skip   = je passe (masqué des révisions, n'empêche pas d'avancer).
   - S.placed[module] = true : acquis au test de positionnement.
   Tout reste modifiable à tout moment dans « Mon parcours ».
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, C = AA.content;
  const S = () => AA.S;
  const P = (AA.path = {});

  /* Niveaux déclarables et mondes qu'ils couvrent. */
  P.LEVELS = [
    { id: "none", worlds: [], goal: "decouverte" },
    { id: "bapteme", worlds: ["decouverte"], goal: "n1" },
    { id: "n1", worlds: ["decouverte", "n1"], goal: "n2" },
    { id: "n2", worlds: ["decouverte", "n1", "n2"], goal: "n3" },
    { id: "n3", worlds: ["decouverte", "n1", "n2", "n3"], goal: "n4" },
    { id: "n4", worlds: ["decouverte", "n1", "n2", "n3", "n4"], goal: "e2" },
    { id: "e1", worlds: ["decouverte", "n1", "n2", "rifap", "e1"], goal: "n3" },
    { id: "e2", worlds: ["decouverte", "n1", "n2", "rifap", "n3", "e1", "n4", "e2"], goal: "e2" }
  ];
  P.DIVES = [0, 1, 10, 25, 50, 100, 250, 500]; /* 1.6 : borne basse de chaque tranche (plongées en milieu naturel) */
  P.level = () => P.LEVELS.find(l => l.id === S().profile.level) || null;
  P.mode = wid => (S().path || {})[wid] || "learn";
  P.certified = wid => !!(S().certs || {})[wid];
  P.active = wid => P.mode(wid) !== "skip";
  /* Expérience : un plongeur confirmé reçoit plus de questions « Approfondir ». */
  P.expert = () => { const p = S().profile, lv = P.level(); return (p.dives || 0) >= 100 || (lv && ["n3", "n4", "e1", "e2"].includes(lv.id)); };
  P.rank = () => { const lv = P.level(); return lv ? P.LEVELS.indexOf(lv) : 0; };

  /* Applique un niveau déclaré : mondes couverts en révision (ou passés), objectif conseillé. */
  P.applyLevel = (id, opts = {}) => {
    const s = S(), lv = P.LEVELS.find(l => l.id === id) || P.LEVELS[0];
    s.profile.level = lv.id; s.certs = s.certs || {}; s.path = s.path || {};
    const extra = (opts.rifap ? ["rifap"] : []).concat(opts.nitrox ? ["nitrox"] : []);
    lv.worlds.concat(extra).forEach(w => { if (!s.certs[w]) s.certs[w] = u.today(); if (!s.path[w] || s.path[w] === "learn") s.path[w] = opts.skipKnown ? "skip" : "review"; });
    if (!opts.keepGoal) s.profile.goal = P.suggestGoal();
  };
  /* Objectif conseillé : le premier monde de la ligne principale non obtenu. */
  P.MAIN = ["decouverte", "n1", "n2", "rifap", "n3", "e1", "n4", "e2"];
  P.suggestGoal = () => P.MAIN.find(w => !P.certified(w) && P.mode(w) !== "skip") || "e2";
  P.setMode = (wid, mode) => { const s = S(); s.path = s.path || {}; s.path[wid] = mode; if (mode !== "skip" && s.profile.goal === wid && P.certified(wid)) s.profile.goal = P.suggestGoal(); };
  P.certify = (wid, mode) => { const s = S(); s.certs = s.certs || {}; s.certs[wid] = u.today(); P.setMode(wid, mode || "review"); if (s.profile.goal === wid) s.profile.goal = P.suggestGoal(); };
  P.uncertify = wid => { const s = S(); if (s.certs) delete s.certs[wid]; if (P.mode(wid) !== "learn") s.path[wid] = "learn"; };

  u.fmtDate = u.fmtDate || (d => { try { return new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return d; } });
  /* Modes conseillés pour un niveau, sans rien écrire (accueil). */
  P.defaults = (id, opts = {}) => {
    const lv = P.LEVELS.find(l => l.id === id) || P.LEVELS[0];
    const cov = lv.worlds.concat(opts.rifap ? ["rifap"] : [], opts.nitrox ? ["nitrox"] : []);
    const modes = {}; C.worlds.forEach(w => { modes[w.id] = cov.includes(w.id) ? (opts.skipKnown ? "skip" : "review") : "learn"; });
    const goal = !cov.includes(lv.goal) ? lv.goal : P.MAIN.find(w => !cov.includes(w)) || "e2";
    return { modes, cov, goal };
  };
  /* Une ligne qui résume le parcours (profil, tuile). */
  P.summary = () => {
    const lv = P.level(), g = C.worldById[AA.game.goalWorld()];
    return AA.t("path.sum", { lv: AA.t("lv." + (lv ? lv.id : "none")), goal: g ? g.short : "" });
  };

  /* Feuille de route affichée dans le profil (calculée, plus de liste fixe). */
  P.roadmap = () => {
    const goal = AA.game.goalWorld();
    return P.MAIN.map(id => C.worldById[id]).filter(Boolean).map(w => {
      const c = (S().certs || {})[w.id], won = (S().boss[w.id] || {}).won;
      const mode = P.mode(w.id);
      const d = c ? AA.t("path.rmCert", { d: u.fmtDate ? u.fmtDate(c) : c }) : won ? AA.t("path.rmBoss") : w.id === goal ? AA.t("path.rmGoal") : mode === "skip" ? AA.t("path.rmSkip") : w.sub;
      return { id: w.id, t: w.title, d, done: !!(c || won), here: w.id === goal, skip: mode === "skip" };
    });
  };

  /* Test de positionnement : 2 questions par thème du monde (hors « Approfondir »). */
  P.placementSet = wid => {
    const out = [];
    C.inWorld(wid).forEach(m => u.shuffle(m.quiz.filter(q => q.lvl !== 2)).slice(0, 2).forEach(q => out.push(q)));
    return out;
  };
  P.startPlacement = wid => {
    const w = C.worldById[wid]; if (!w) return;
    AA.quiz.start("place", P.placementSet(wid), { world: wid, title: AA.t("place.title", { w: w.short }), back: "parcours" });
  };
  /* Résultat : par thème, acquis si toutes ses questions sont justes. */
  P.placementResult = c => {
    const by = {};
    c.items.forEach(it => { by[it.q.m] = by[it.q.m] || { ok: 0, n: 0 }; by[it.q.m].n++; });
    c.answers.forEach(a => { if (a.ok && by[a.q.m]) by[a.q.m].ok++; });
    const mods = C.inWorld(c.world).map(m => ({ m, r: by[m.id] || { ok: 0, n: 0 } }));
    const good = c.answers.filter(a => a.ok).length, pct = Math.round(good / Math.max(1, c.items.length) * 100);
    return { mods, pct, rec: pct >= 85 ? "review" : pct >= 50 ? "mixed" : "learn" };
  };
  P.applyPlacement = (c, res, mode) => {
    const s = S(); s.placed = s.placed || {}; s.placeDone = s.placeDone || {};
    res.mods.forEach(({ m, r }) => { if (r.n && r.ok === r.n) s.placed[m.id] = u.today(); });
    s.placeDone[c.world] = { d: u.today(), pct: res.pct };
    if (mode) P.setMode(c.world, mode);
  };
})();
