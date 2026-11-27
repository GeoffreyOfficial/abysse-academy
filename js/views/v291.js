/* =====================================================================
   Abysse Academy 2.9.1 · questions moins répétitives, formats variés
   - Mémoire des questions servies (AA.S.recentQ, 150 dernières) : les
     tirages des thèmes, boss, gardiens et brevets blancs préfèrent les
     questions qui ne sont pas sorties récemment (Q.recentPen / freshSort).
   - « Vrai ou faux ? » : dans les séries de thème, le défi du jour et la
     séance du tuteur, 1 à 2 QCM deviennent une proposition à juger
     (format différent, même notion). Jamais en brevet blanc ni en combat.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, C = AA.content, Q = AA.quiz, GM = AA.games;
  if (!Q) return;
  const RK = 150;
  const recent = () => { const S = AA.S; if (!Array.isArray(S.recentQ)) S.recentQ = []; return S.recentQ; };
  const baseId = id => String(id || "").replace(/^vf:/, "");
  /* 0 = pas vue récemment … 1 = vient de sortir */
  Q.recentPen = q => { if (!q || !q.id) return 0; const i = recent().indexOf(baseId(q.id)); return i < 0 ? 0 : 1 - i / RK; };
  Q.freshSort = list => list.map(q => [q, Q.recentPen(q) * 2 + Math.random()]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  Q.remember = qs => {
    const R = recent();
    qs.forEach(q => { const id = q && baseId(q.id); if (!id || !C.qById[id]) return; const k = R.indexOf(id); if (k >= 0) R.splice(k, 1); R.unshift(id); });
    if (R.length > RK) R.length = RK;
  };

  /* ---------- Vrai ou faux ---------- */
  const NOVF = /parmi|lequel|laquelle|lesquel|quelle affirmation|toutes|aucune|faux|vrai|n[’']est pas|ne .{1,30} pas|sauf|inexact|intrus|ordre/i;
  Q.vfOk = q => !!(q && C.qById[q.id] && !q.gen && !q.calc && !q.proc && !q.card && Array.isArray(q.c) && q.c.length >= 3 && !NOVF.test(q.q) && !q.c.some(c => /toutes|aucune|les deux|ci-dessus/i.test(c)));
  Q.toVf = (q, truth) => {
    truth = truth == null ? Math.random() < .5 : truth;
    const wrong = q.c.map((_, i) => i).filter(i => i !== q.a), shown = truth ? q.a : u.pick(wrong);
    const lead = /[…?]\s*$/.test(q.q) ? q.q.replace(/\s*\?\s*$/, " :") : q.q + " :";
    return { id: "vf:" + q.id, vf: q.id, m: q.m, world: q.world, lvl: q.lvl, q: AA.t("vf2.lead") + " " + lead + " « " + q.c[shown] + " »", c: [AA.t("gm.vf.true"), AA.t("gm.vf.false")], a: truth ? 0 : 1,
      e: (truth ? AA.t("vf2.true") : AA.t("vf2.false", { a: q.c[q.a] })) + " " + q.e };
  };
  const VF_N = { module: 2, daily: 1, tutor: 1 };
  const s0 = Q.start;
  Q.start = function (mode, qs, opts) {
    let list = qs;
    if (VF_N[mode] && Array.isArray(qs) && !window.AA_PLAIN) {
      const idx = qs.map((q, i) => (Q.vfOk(q) ? i : -1)).filter(i => i >= 0);
      const pick = new Set(u.shuffle(idx).slice(0, VF_N[mode]));
      if (pick.size) list = qs.map((q, i) => (pick.has(i) ? Q.toVf(q) : q));
    }
    const out = s0.call(this, mode, list, opts);
    try { const c = AA.ctx; if (c && c.items) { c.items.forEach(it => { if (it.q && it.q.vf) it.order = [0, 1]; }); Q.remember(c.items.map(it => it.q)); } } catch (e) {}
    return out;
  };
  if (GM && GM.begin) {
    const b0 = GM.begin;
    GM.begin = function () { const r = b0.apply(this, arguments); try { if (GM.qs) Q.remember(GM.qs() || []); } catch (e) {} return r; };
  }
})();
