/* =====================================================================
   Abysse Academy 2.2.2 (2.2.5) · reprendre là où on s'était arrêté
   Une série en cours (positionnement, examen blanc, quiz d'un cours,
   révisions…) est enregistrée sur l'appareil à chaque réponse. Si on
   quitte l'écran, ferme l'appli ou recharge la page :
   - relancer le même positionnement / examen / quiz de cours reprend à la
     même question (un toast permet de recommencer à zéro) ;
   - l'accueil propose « Reprendre » ;
   - recharger sur #/quiz reprend directement.
   « Quitter » (croix + confirmation) abandonne la série, comme avant.
   Non concernés : duels (deux joueurs), défis à distance, séries chronométrées
   courtes (5 minutes, apnée).
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, fx = AA.fx, V = AA.views, Q = AA.quiz, S = () => AA.S;
  const KEY = "abysse-run", SKIP = new Set(["duel", "rduel", "five", "apnee", "boss"]);
  /* Une série enregistrée par type (mode + niveau + cours) : faire un petit quiz ne perd pas le positionnement. */
  const keyOf = c => [c.mode, c.world || "", c.module || "", c.full ? 1 : 0].join("|");
  const all = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || "null"); return o && o.v === 2 && o.runs ? o : { v: 2, runs: {} }; } catch (e) { return { v: 2, runs: {} }; } };
  const put = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} };
  const ls = {
    get: k => { const r = all().runs; if (k) return r[k] || null; return Object.values(r).filter(o => o && Array.isArray(o.items) && o.answers.length < o.items.length).sort((a, b) => b.at - a.at)[0] || null; },
    set: o => { const a = all(); a.runs[keyOf(o)] = o; const ks = Object.keys(a.runs).sort((x, y) => a.runs[y].at - a.runs[x].at); ks.slice(6).forEach(k => delete a.runs[k]); put(a); },
    del: k => { if (!k) { try { localStorage.removeItem(KEY); } catch (e) {} return; } const a = all(); delete a.runs[k]; put(a); }
  };
  const RUN = (AA.run = { get: ls.get, clear: ls.del });
  const ok = c => c && Array.isArray(c.items) && c.items.length && !SKIP.has(c.mode) && !c.players;
  const qOut = q => (q && q.id && C.qById[q.id] === q ? { id: q.id } : { q });
  const qIn = x => (x && x.id ? C.qById[x.id] : x && x.q) || null;

  /* Instantané : les champs simples du contexte + questions et réponses. */
  RUN.save = c => {
    if (!ok(c) || c.done || RUN._quit) return;
    const o = { v: 2, at: Date.now(), elapsed: Date.now() - (c.t0 || Date.now()) };
    Object.keys(c).forEach(k => { const v = c[k]; if (["items", "answers", "timer", "t0", "res", "picked", "air0"].includes(k)) return; if (v == null || ["string", "number", "boolean"].includes(typeof v)) o[k] = v; });
    o.items = c.items.map(it => Object.assign(qOut(it.q), { o: it.order }));
    o.answers = c.answers.map(a => Object.assign(qOut(a.q), { p: a.picked, k: a.ok ? 1 : 0, d: a.doubt ? 1 : 0, c: a.card ? 1 : 0 }));
    ls.set(o);
  };
  RUN.restore = o => {
    if (!o) return null;
    const items = o.items.map(x => ({ q: qIn(x), order: x.o })).filter(x => x.q && Array.isArray(x.order));
    if (!items.length) return null;
    const answers = o.answers.map(x => ({ q: qIn(x), picked: x.p, ok: !!x.k, doubt: !!x.d, card: !!x.c })).filter(a => a.q);
    const c = {};
    Object.keys(o).forEach(k => { if (!["v", "at", "elapsed", "items", "answers"].includes(k)) c[k] = o[k]; });
    Object.assign(c, { items, answers, idx: Math.min(answers.length, items.length - 1), picked: null, doubt: false, flipped: false, done: false, timer: null, t0: Date.now() - (o.elapsed || 0), resumed: true });
    /* Bilan de fin (tuteur) : la fonction ne s'enregistre pas, on la remet. */
    if (AA.tutor && AA.tutor.resultExtra) c.onResult = (x, g, n) => AA.tutor.resultExtra(x, g, n);
    if (answers.length >= items.length) { c.idx = items.length - 1; c.done = true; }
    return c;
  };
  RUN.label = o => o.title || t("run.quiz");
  RUN.resume = () => { const o = ls.get(), c = RUN.restore(o); if (!c) { if (o) ls.del(keyOf(o)); return false; } AA.router.go("quiz", c); return true; };

  /* Enregistrer à chaque affichage (nouvelle question) et à chaque réponse. */
  const QV = V.quiz;
  if (QV) {
    const r0 = QV.render, l0 = QV.leave, g0 = QV.guard;
    QV.render = function (el, args) { const c = AA.ctx; const r = r0.call(this, el, args); try { if (c && c.done) { if (ok(c)) ls.del(keyOf(c)); } else RUN.save(c); } catch (e) {} return r; };
    QV.leave = function () { try { const c = AA.ctx; if (c && !c.done) RUN.save(c); } catch (e) {} RUN._quit = false; return l0 ? l0.apply(this, arguments) : undefined; };
    /* Rechargement sur #/quiz : on reprend la série enregistrée. */
    QV.guard = () => { if (g0 ? g0() : AA.ctx && AA.ctx.items) return true; const c = RUN.restore(ls.get()); if (!c) return false; AA.ctx = c; return true; };
  }
  const G = AA.game, rec0 = G.record;
  G.record = function () { const r = rec0.apply(this, arguments); try { if (AA.router.name === "quiz") setTimeout(() => RUN.save(AA.ctx), 0); } catch (e) {} return r; };
  /* La croix « Quitter » confirmée = abandon voulu. */
  const conf0 = AA.ui.confirm;
  /* 2.2.5 : la croix met la série de côté (reprise depuis l'accueil ou en
     relançant le même positionnement) et ramène à l'accueil. On abandonne
     vraiment avec « Abandonner » sur la carte de l'accueil. */
  AA.ui.confirm = (msg, label, onOk, skip) => {
    if (msg !== t("quiz.quitQ")) return conf0(msg, label, onOk, skip);
    const c = AA.ctx, keep = ok(c) && !c.done && c.answers && c.answers.length > 0;
    if (!keep) return conf0(msg, label, () => { RUN._quit = true; if (c && c.mode) ls.del(keyOf(c)); onOk(); }, skip);
    return conf0(t("run.quitQ", { i: c.answers.length, n: c.items.length }), t("run.quitYes"), () => { RUN.save(c); RUN._quit = true; c.back = "home"; onOk(); }, skip);
  };
  addEventListener("pagehide", () => { try { if (AA.router.name === "quiz") RUN.save(AA.ctx); } catch (e) {} });
  document.addEventListener("visibilitychange", () => { try { if (document.hidden && AA.router.name === "quiz") RUN.save(AA.ctx); } catch (e) {} });

  /* Relancer le même positionnement / examen / quiz de cours : on reprend. */
    const start0 = Q.start;
  Q.start = function (mode, qs, opts) {
    const k = keyOf(Object.assign({ mode }, opts || {})), o = ls.get(k);
    if (["place", "exam", "module"].includes(mode) && o && o.answers.length > 0 && o.answers.length < o.items.length) {
      const c = RUN.restore(o);
      if (c) {
        const args = arguments, self = this;
        AA.router.go("quiz", c);
        fx.toast(t("run.backT", { i: c.answers.length + 1, n: c.items.length }), t("run.backS"), "refresh", () => { ls.del(k); RUN._quit = true; start0.apply(self, args); RUN._quit = false; });
        return;
      }
    }
    if (o) ls.del(k);
    return start0.apply(this, arguments);
  };

  /* Accueil : « Reprendre » en tête quand une série est en cours. */
  const hv = V.home;
  if (hv) {
    const h0 = hv.render;
    hv.render = function (el, args) {
      const r = h0.call(this, el, args);
      try {
        const o = ls.get(); if (!o || u.$(".run-card", el) || o.answers.length >= o.items.length) return r;
        const main = u.$(".col-main", el) || el; const n = o.items.length, i = o.answers.length;
        main.insertAdjacentHTML("afterbegin", `<section class="card run-card"><span class="medal">${AA.icon("refresh")}</span><div class="grow"><p class="eyebrow">${t("run.eyebrow")}</p><b>${u.esc(RUN.label(o))}</b>${AA.ui.bar(i / n, "var(--primary)")}<span class="xs muted">${t("run.where", { i, n })}</span></div>
          <div class="run-btns"><button class="btn sm" data-run="go">${AA.icon("play")} ${t("run.go")}</button><button class="btn ghost sm" data-run="drop">${t("run.drop")}</button></div></section>`);
        u.$('[data-run="go"]', el).onclick = () => { fx.sfx.tap(); RUN.resume(); };
        u.$('[data-run="drop"]', el).onclick = () => AA.ui.confirm(t("run.dropQ"), t("run.dropYes"), () => { ls.del(keyOf(o)); AA.router.refresh(); });
      } catch (e) { console.error(e); }
      return r;
    };
  }
  /* Réinitialisation : la série en cours part avec le reste. */
  const rs0 = AA.store.reset;
  AA.store.reset = async function () { ls.del(); return rs0.apply(this, arguments); };
})();
