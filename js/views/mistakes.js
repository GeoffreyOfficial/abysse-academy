/* =====================================================================
   Abysse Academy · Mes erreurs fréquentes
   Analyse toutes les réponses passées (AA.S.stats, AA.S.wrong) pour
   montrer où et POURQUOI on se trompe :
   - pièges de raisonnement (content/fr/pitfalls.js) classés par fréquence ;
   - thèmes les plus fragiles ;
   - questions les plus ratées, avec la réponse qu'on donne souvent ;
   - calculs ratés ; réponses justes mais « au doute ».
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;
  const miss = id => { const s = AA.S.stats[id]; return s ? s.n - s.ok : 0; };
  const reOf = p => { try { return p.re ? new RegExp(p.re, "i") : null; } catch (e) { return null; } };
  const qOf = p => { const re = reOf(p); return C.questions.filter(q => (!p.m || p.m.includes(q.m)) && (!re || re.test(q.q + " " + q.c[q.a]))); };

  /* Poids d'un piège = erreurs sur ses questions + erreurs sur ses calculs. */
  AA.mistakes = {
    pitfalls() {
      const W = AA.S.wrong;
      return C.pitfalls.map(p => {
        const qs = qOf(p), nq = u.sum(qs.map(q => miss(q.id))), ng = u.sum((p.gen || []).map(k => (W["gen:" + k] || {}).n || 0));
        return { p, qs, n: nq + ng, ng };
      }).filter(x => x.n > 0).sort((a, b) => b.n - a.n);
    },
    train(p) {
      const qs = qOf(p).filter(q => G.unlocked(q.m)).sort((a, b) => miss(b.id) - miss(a.id));
      const pick = qs.slice(0, 6).concat(u.shuffle(qs.slice(6)).slice(0, 2));
      const gens = (p.gen || []).filter(k => C.generators[k] && G.unlocked(C.generators[k].m));
      const calc = gens.length ? [G.gen(u.pick(gens)), G.gen(u.pick(gens))] : [];
      AA.quiz.start("errors", u.shuffle(pick.concat(calc)).slice(0, 10), { title: p.title, back: "mistakes" });
    }
  };

  AA.view("mistakes", {
    tab: "train", depth: 18,
    render(el) {
      const S = AA.S, all = Object.entries(S.stats).filter(([id]) => C.qById[id]);
      const tot = all.reduce((a, [, v]) => [a[0] + v.n, a[1] + v.ok], [0, 0]), errs = tot[0] - tot[1];
      const pits = AA.mistakes.pitfalls();
      const top = all.map(([id, v]) => ({ q: C.qById[id], n: v.n - v.ok, tries: v.n })).filter(x => x.n > 0 && !x.q.id.startsWith("pc-")).sort((a, b) => b.n - a.n || a.tries - b.tries).slice(0, 8);
      const mods = C.modules.map(m => { const a = G.moduleAcc(m.id); const n = u.sum(m.quiz.map(q => miss(q.id))); return { m, a, n }; }).filter(x => x.n > 0).sort((a, b) => b.n - a.n).slice(0, 6);
      const gens = Object.entries(S.wrong).filter(([k]) => k.startsWith("gen:") && C.generators[k.slice(4)]).map(([k, v]) => ({ k: k.slice(4), n: v.n || 0 })).sort((a, b) => b.n - a.n);
      const doubts = Object.keys(S.doubt).filter(id => C.qById[id]);
      if (!tot[0]) { el.innerHTML = ui.head(t("mist.title"), "train") + ui.empty("brain", t("mist.emptyT"), t("mist.emptyS"), `<button class="btn" data-go="home">${t("mist.start")}</button>`); ui.wireGo(el); return; }
      const commonWrong = q => { const w = S.wrong[q.id]; if (!w) return null; const best = Object.entries(w).filter(([k]) => /^\d$/.test(k)).sort((a, b) => b[1] - a[1])[0]; return best ? { txt: q.c[+best[0]], n: best[1] } : null; };
      const pitOf = q => pits.find(x => x.qs.includes(q));
      el.innerHTML = `${ui.head(t("mist.title"), "train")}<p class="muted">${t("mist.intro")}</p>
        <div class="stats" style="margin-top:var(--sp-4)">
          <div class="stat"><b>${errs}</b><span>${t("mist.errs")}</span></div>
          <div class="stat"><b>${Math.round(tot[1] / tot[0] * 100)} %</b><span>${t("mist.acc", { n: tot[0] })}</span></div>
          <div class="stat"><b>${Object.keys(S.errors).length}</b><span>${t("mist.toRescue")}</span></div>
          <div class="stat"><b>${doubts.length}</b><span>${t("mist.doubts")}</span></div></div>
        ${pits.length ? `<div class="section-title"><h3>${t("mist.pitfalls")}</h3><span class="xs muted">${t("mist.pitfallsS")}</span></div>
        <div class="pit-list">${pits.slice(0, 5).map((x, i) => `<article class="card pit ${i === 0 ? "top" : ""}">
          <div class="row between"><h4>${u.esc(x.p.title)}</h4><span class="chip warn">${t("mist.times", { n: x.n })}</span></div>
          <p class="pit-why"><span class="eyebrow">${t("mist.why")}</span>${u.esc(x.p.why)}</p>
          <p class="pit-fix"><span class="eyebrow">${t("mist.fix")}</span>${u.esc(x.p.fix)}</p>
          <div class="row"><button class="btn sm" data-train="${x.p.id}">${AA.icon("target")} ${t("mist.train")}</button>${(x.p.m || []).slice(0, 2).filter(id => C.byId[id]).map(id => `<a class="btn ghost sm" href="#/lesson/${id}">${AA.icon("book")} ${u.esc(C.moduleTitle(id))}</a>`).join("")}</div></article>`).join("")}</div>` : ""}
        ${mods.length ? `<div class="section-title"><h3>${t("mist.themes")}</h3></div><section class="card">${mods.map(x => `<a class="trow" href="#/lesson/${x.m.id}"><b>${u.esc(x.m.title)}</b>${ui.bar(x.a || 0, (x.a || 0) >= .8 ? "var(--ok)" : (x.a || 0) >= .5 ? "var(--gold)" : "var(--accent)")}<span>${t("mist.nErr", { n: x.n })}</span></a>`).join("")}</section>` : ""}
        ${top.length ? `<div class="section-title"><h3>${t("mist.top")}</h3><button class="btn ghost sm" id="rescue">${AA.icon("buoy")} ${t("mode.errors")}</button></div>
        <div class="review">${top.map(x => { const cw = commonWrong(x.q), pf = pitOf(x.q); return `<div class="rv"><b>${u.esc(x.q.q)}</b>
          <span class="small">${cw ? `${t("mist.youSay", { n: cw.n })} <span class="bad-txt">${u.esc(cw.txt)}</span><br>` : ""}${t("quiz.answer")} <b>${u.esc(x.q.c[x.q.a])}</b></span>
          <p class="small muted" style="margin:6px 0 0">${u.esc(x.q.e)}</p>
          <div class="row" style="margin-top:6px"><span class="chip">${t("mist.missed", { n: x.n, tries: x.tries })}</span>${pf ? `<span class="chip pri">${AA.icon("brain")} ${u.esc(pf.p.title)}</span>` : ""}<a class="small" href="#/lesson/${x.q.m}">${t("result.toLesson", { title: u.esc(C.moduleTitle(x.q.m)) })}</a></div></div>`; }).join("")}</div>` : ""}
        ${gens.length ? `<div class="section-title"><h3>${t("mist.calcs")}</h3></div><section class="card">${gens.slice(0, 6).map(g => { const pf = C.pitfalls.find(p => (p.gen || []).includes(g.k)); return `<div class="dq"><span class="ck">${AA.icon("calc")}</span><span><b class="small">${u.esc(C.moduleTitle(C.generators[g.k].m))} · ${u.esc(g.k)}</b>${pf ? `<span class="xs muted"> ${u.esc(pf.title)}</span>` : ""}</span><button class="btn gold sm" data-gen="${g.k}">${t("mist.nErr", { n: g.n })} · ${t("mist.redo")}</button></div>`; }).join("")}</section>` : ""}
        ${doubts.length ? `<div class="section-title"><h3>${t("mist.fragile")}</h3></div><section class="card soft"><p class="small muted" style="margin-top:0">${t("mist.fragileS")}</p><button class="btn ghost block" id="doubtq">${AA.icon("doubt")} ${t("mist.fragileGo", { n: doubts.length })}</button></section>` : ""}`;
      u.on(el, "click", "[data-train]", (e, b) => { fx.sfx.tap(); AA.mistakes.train(C.pitfalls.find(p => p.id === b.dataset.train)); });
      u.on(el, "click", "[data-gen]", (e, b) => { fx.sfx.tap(); AA.quiz.start("gen", Array.from({ length: 5 }, () => G.gen(b.dataset.gen)), { title: t("mist.calcs"), back: "mistakes" }); });
      const r = u.$("#rescue"); if (r) r.onclick = () => AA.quiz.errors();
      const d = u.$("#doubtq"); if (d) d.onclick = () => AA.quiz.start("errors", u.shuffle(doubts.map(id => C.qById[id])).slice(0, 10), { title: t("mode.doubt"), back: "mistakes" });
    }
  });
})();
