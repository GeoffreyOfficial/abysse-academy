/* =====================================================================
   2.7.0 · Maîtrise exigeante et expliquée.
   Une notion n'est « solide » qu'avec des preuves : cours lu, au moins
   5 réponses, 80 % de bonnes sur les 10 dernières, les 3 dernières justes,
   des bonnes réponses sur 3 jours différents, dans 2 formats différents,
   et une révision il y a moins de 30 jours. Le pourcentage affiché est la
   moyenne sur TOUTES les notions du niveau (non lues et non testées = 0 %),
   donc il colle aux compteurs. Niveau déjà obtenu : les notions partent
   à 50 % (« Brevet obtenu, à confirmer ») et 3 bonnes réponses d'affilée
   les confirment.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, T = AA.tutor, Q = AA.quiz, fx = AA.fx, ui = AA.ui, esc = u.esc;
  if (!T || !T.mastery) return;
  const S = () => AA.S;
  const RULE = T.RULE = { n: 5, acc: .8, last: 3, days: 3, fmt: 2, fresh: 30, solid: .8, certStart: .5, certLast: 3 };

  /* ---------- Traces : jours de bonnes réponses et formats ---------- */
  const fmtNow = () => {
    try {
      const r = AA.router.name || "", c = AA.ctx || {};
      if (r === "quiz") { const it = c.items && c.items[c.i]; return "quiz:" + (it && it.inp ? "saisie" : it && it.q && it.q.type === "order" ? "ordre" : (c.mode || "qcm")); }
      return r || "autre";
    } catch (e) { return "autre"; }
  };
  const note0 = T.note;
  T.note = (q, ok) => {
    note0(q, ok);
    const nid = T.notionOf(q); if (!nid) return;
    const r = (S().nstat || {})[nid]; if (!r) return;
    if (!r.f) r.f = r.n > 1 ? ["quiz:ancien"] : [];
    if (!r.dk) r.dk = r.ok > 1 && r.d ? [r.d] : [];
    if (ok) {
      const f = fmtNow(); if (!r.f.includes(f)) r.f = r.f.concat(f).slice(-6);
      const d = u.today(); if (!r.dk.includes(d)) r.dk = r.dk.concat(d).slice(-6);
    }
  };

  /* ---------- Exactitude récente (pour les lacunes et les priorités) ---------- */
  T.acc = nid => {
    const r = T.stat(nid); if (!r || !r.n) return null;
    let w = 1, sw = .6, sx = .3;
    for (let i = r.h.length - 1; i >= 0; i--) { sx += w * +r.h[i]; sw += w; w *= .75; }
    return sx / sw;
  };
  T.isGap = nid => { const r = T.stat(nid); if (!r || r.n < 2) return false; return /00$/.test(r.h) || (r.n >= 3 && T.acc(nid) < .45); };

  /* ---------- Preuves d'une notion ---------- */
  const certOf = nid => { const n = T.notion(nid), m = n && C.byId[n.mid]; return !!(m && AA.path && AA.path.certified(m.world)); };
  T.proof = nid => {
    const n = T.notion(nid), r = T.stat(nid), cert = certOf(nid);
    const read = !!(n && T.isRead(n.mid));
    const h = r ? r.h : "", last = h.slice(-10);
    const okN = (last.match(/1/g) || []).length;
    const dk = r ? (r.dk || (r.ok && r.d ? [r.d] : [])) : [], f = r ? (r.f || (r.n ? ["quiz:ancien"] : [])) : [];
    const age = r && r.d ? u.daysBetween(r.d, u.today()) : null;
    const p = {
      cert, read, n: r ? r.n : 0, okN, ratio: last.length ? okN / last.length : 0,
      lastOk: h.length >= RULE.last && /^1+$/.test(h.slice(-RULE.last)),
      lastRun: (h.match(/1*$/) || [""])[0].length,
      days: dk.length, fmt: f.length, age, lastErr: h.lastIndexOf("0") >= 0 ? h.length - 1 - h.lastIndexOf("0") : null
    };
    /* Critères, dans l'ordre où on les remplit. */
    p.crit = cert && !T.explicitRead(n ? n.mid : "") && p.n < RULE.n
      ? [{ k: "cert", ok: true }, { k: "run", ok: p.lastRun >= RULE.certLast, v: Math.min(p.lastRun, RULE.certLast), of: RULE.certLast }, { k: "fresh", ok: age != null && age <= RULE.fresh, v: age }]
      : [{ k: "read", ok: read },
        { k: "n", ok: p.n >= RULE.n, v: Math.min(p.n, RULE.n), of: RULE.n },
        { k: "acc", ok: last.length >= RULE.n && p.ratio >= RULE.acc, v: Math.round(p.ratio * 100) },
        { k: "last", ok: p.lastOk },
        { k: "days", ok: p.days >= RULE.days, v: Math.min(p.days, RULE.days), of: RULE.days },
        { k: "fmt", ok: p.fmt >= RULE.fmt, v: Math.min(p.fmt, RULE.fmt), of: RULE.fmt },
        { k: "fresh", ok: age != null && age <= RULE.fresh, v: age }];
    p.solid = p.crit.every(c => c.ok);
    p.todo = p.crit.filter(c => !c.ok);
    return p;
  };
  T.solid = nid => T.proof(nid).solid;

  /* ---------- Maîtrise : 0 à 1, sous 80 % tant qu'il manque une preuve ---------- */
  T.mastery = nid => {
    const r = T.stat(nid);
    if (!r || !r.n) return certOf(nid) ? RULE.certStart : null;
    const p = T.proof(nid);
    let m;
    if (p.crit[0].k === "cert") {
      /* Niveau obtenu : on part de 50 %, chaque bonne réponse d'affilée confirme. */
      m = p.ratio * (RULE.certStart + (1 - RULE.certStart) * Math.min(1, p.lastRun / RULE.certLast));
    } else {
      const cN = Math.min(1, p.n / RULE.n), cD = Math.min(1, p.days / RULE.days), cF = Math.min(1, p.fmt / RULE.fmt);
      m = p.ratio * (.4 + .25 * cN + .2 * cD + .15 * cF) * (p.read ? 1 : .5);
    }
    if (p.age > RULE.fresh) m *= 1 - Math.min(.4, (p.age - RULE.fresh) / 90);
    return p.solid ? Math.max(RULE.solid, m) : Math.min(RULE.solid - .01, m);
  };
  T.nState = nid => {
    const r = T.stat(nid);
    if (!r || !r.n) return certOf(nid) ? "acq" : "new";
    if (T.isGap(nid)) return "gap";
    if (T.solid(nid)) return "master";
    const a = T.acc(nid);
    return a >= .65 ? "ok" : a >= .45 ? "mid" : "weak";
  };
  T.modInfo = mid => {
    const ns = T.notions(mid).filter(n => T.stat(n.id) || T.qsOf(n.id).length);
    const seen = ns.filter(n => T.stat(n.id)).length;
    const ms = ns.map(n => T.mastery(n.id) || 0);
    return { ns, seen, tot: ns.length, solid: ns.filter(n => T.solid(n.id)).length, mastery: ns.length ? ms.reduce((a, b) => a + b, 0) / ns.length : 0, gaps: ns.filter(n => T.isGap(n.id)) };
  };
  const state0 = T.state;
  T.state = mid => {
    const st = state0(mid);
    if (st !== "master" && st !== "ok") return st;
    const I = T.modInfo(mid);
    return I.tot && I.solid === I.tot ? "master" : I.mastery >= .6 ? "ok" : "learning";
  };

  /* ---------- Diagnostic : cause et prochaine étape ---------- */
  T.cause = nid => {
    const n = T.notion(nid); if (!n) return null; const r = T.stat(nid);
    if (!T.isRead(n.mid) && (!r || !r.n)) return { k: "unread", ic: "book" };
    if (!r || !r.n) return certOf(nid) ? { k: "acq", ic: "check" } : { k: "untested", ic: "play" };
    const p = T.proof(nid);
    if (p.solid) return p.age > 21 ? { k: "stale", ic: "refresh", d: p.age } : { k: "solid", ic: "check" };
    if ((n.gen || /calc|gen/.test(n.id)) && /0/.test(r.h.slice(-4))) return { k: "calc", ic: "calc" };
    if (T.repeated(nid)) return { k: "confusion", ic: "buoy" };
    if (p.age > 14 && /1/.test(r.h.slice(0, -2))) return { k: "forgot", ic: "refresh", d: p.age };
    if (T.acc(nid) >= .65) return { k: "proving", ic: "target" };
    return { k: "fragile", ic: "target" };
  };
  const PRIO = { confusion: 0, calc: 1, fragile: 2, forgot: 3, proving: 4, stale: 5, acq: 6, untested: 7, unread: 8, solid: 9 };
  const ORDER = ["confusion", "calc", "fragile", "forgot", "proving", "stale", "acq", "untested", "unread", "solid"];
  T.diagnose = wid => {
    const out = [];
    C.inWorld(wid).forEach(m => T.notions(m.id).filter(n => !n.gen).forEach(n => { const c = T.cause(n.id); if (c) out.push({ n, c, m: T.mastery(n.id) || 0 }); }));
    return out;
  };
  /* Synthèse d'un niveau : les mêmes chiffres partout (diagnostic, tuteur, tests). */
  T.levelSum = wid => {
    const all = T.diagnose(wid), by = k => all.filter(x => x.c.k === k).length;
    const pct = all.length ? Math.round(100 * all.reduce((a, x) => a + x.m, 0) / all.length) : 0;
    return { all, n: all.length, pct, solid: by("solid") + by("stale"), work: by("confusion") + by("calc") + by("fragile") + by("forgot"), proving: by("proving"), acq: by("acq"), untested: by("untested"), unread: by("unread") };
  };
  const critTxt = c => t("mq.c." + c.k, { v: c.v == null ? "" : c.v, of: c.of || "" });
  const nextStep = (x, p) => {
    if (x.c.k === "unread") return t("mq.next.read");
    if (x.c.k === "untested") return t("mq.next.test");
    if (x.c.k === "acq") return t("mq.next.acq", { n: RULE.certLast });
    if (p.solid) return t("mq.next.keep");
    const c = p.todo[0];
    return c ? t("mq.next." + c.k, { n: c.of ? c.of - (c.v || 0) : "" }) : "";
  };
  const DW = () => { const g = G.goalWorld(); return AA.ctx.dw && C.worldById[AA.ctx.dw] ? AA.ctx.dw : g; };
  AA.view("diagnostic", {
    tab: "train", depth: 2,
    render(el) {
      const wid = DW(), W = C.worldById[wid], L = T.levelSum(wid), all = L.all;
      const by = k => all.filter(x => x.c.k === k);
      const prio = all.filter(x => !["solid", "unread", "acq", "untested"].includes(x.c.k)).sort((a, b) => PRIO[a.c.k] - PRIO[b.c.k] || (T.acc(a.n.id) ?? .5) - (T.acc(b.n.id) ?? .5)).slice(0, 3);
      const worlds = C.worlds.filter(w => !w.soon && C.inWorld(w.id).length);
      const cert = AA.path.certified(wid), dash = Math.round(L.pct / 100 * 283);
      const row = x => {
        const k = x.c.k, p = T.proof(x.n.id), r = T.stat(x.n.id);
        const facts = r && r.n ? t("mq.facts", { n: r.n, ok: p.okN, of: Math.min(10, r.h.length), d: p.age === 0 ? t("mq.today") : t("mq.ago", { d: p.age }) }) + (p.lastErr != null ? " · " + (p.lastErr === 0 ? t("mq.errLast") : t("mq.errAgo", { n: p.lastErr })) : "") : "";
        const crit = ["unread", "untested"].includes(k) ? "" : `<ul class="mq-crit">${p.crit.map(c => `<li class="${c.ok ? "ok" : ""}">${c.ok ? AA.icon("check") : `<i class="mq-o"></i>`}<span>${critTxt(c)}</span></li>`).join("")}</ul>`;
        return `<details class="dg-row dg-${k}"><summary><span class="dg-ic">${AA.icon(x.c.ic)}</span><div class="grow"><b>${esc(x.n.t)}</b><span class="xs muted">${esc(C.byId[x.n.mid].title)} · ${t("dg.c." + k, { d: x.c.d || "" })} · ${Math.round(x.m * 100)} %</span>
          <i class="dg-bar"><b style="width:${Math.round(x.m * 100)}%"></b></i></div></summary>
          <div class="mq-det">${facts ? `<p class="xs muted">${facts}</p>` : ""}${crit}<p class="small"><b>${t("mq.next")}</b> ${nextStep(x, p)}</p>
          <div class="row">${k === "unread" ? `<a class="btn ghost sm" href="#/lesson/${x.n.mid}">${AA.icon("book")} ${t("dg.read")}</a>` : `<button class="btn sm" data-dgo="${x.n.id}">${AA.icon("play")} ${t("dg.train")}</button><button class="btn ghost sm" data-dread="${x.n.id}">${AA.icon("book")} ${t("dg.read")}</button>`}</div></div></details>`;
      };
      const sec = (k, list) => list.length ? `<details class="card dg-sec" ${["confusion", "calc", "fragile", "proving"].includes(k) ? "open" : ""}><summary><b>${t("dg.s." + k)}</b><span class="chip">${list.length}</span></summary>${list.map(row).join("")}</details>` : "";
      const counts = [["solid", L.solid], ["proving", L.proving], ["work", L.work], ["acq", L.acq], ["untested", L.untested], ["unread", L.unread]].filter(([, v]) => v);
      el.innerHTML = `${ui.head(t("dg.title"), "train")}
        <div class="seg dg-worlds" role="tablist">${worlds.map(w => `<button data-dw="${w.id}" aria-pressed="${w.id === wid}">${esc(w.short)}</button>`).join("")}</div>
        <section class="card dg-hero"><svg class="dg-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" class="tr"/><circle cx="50" cy="50" r="45" class="fg" style="stroke-dasharray:${dash} 283"/></svg>
          <div class="grow"><p class="eyebrow">${esc(W.short)}${cert ? " · " + t("mq.cert") : ""}</p><h2>${t("dg.mastery", { p: L.pct })}</h2>
          <p class="small muted">${t("mq.sum", { s: L.solid, n: L.n })}</p>
          <div class="mq-counts">${counts.map(([k, v]) => `<span class="chip xs mq-${k}">${t("mq.k." + k, { n: v })}</span>`).join("")}</div></div></section>
        ${cert ? `<p class="callout">${t("mq.certS", { n: RULE.certLast })}</p>` : ""}
        ${prio.length ? `<section class="card dg-prio"><p class="eyebrow">${AA.icon("target")} ${t("dg.prio")}</p>${prio.map((x, i) => `<div class="dg-p" style="--i:${i}"><span class="dg-num">${i + 1}</span><div class="grow"><b>${esc(x.n.t)}</b><span class="small muted">${t("dg.why." + x.c.k, { d: x.c.d || "" })}</span></div><button class="btn sm" data-dgo="${x.n.id}">${t("dg.go")}</button></div>`).join("")}</section>`
          : L.unread === L.n ? `<p class="callout">${t("mq.allUnread")}</p>` : L.solid === L.n ? `<p class="callout ok">${t("dg.none")}</p>` : `<p class="callout">${t("mq.noPrio")}</p>`}
        ${ORDER.map(k => sec(k, by(k))).join("")}
        <details class="card mq-rules"><summary><b>${t("mq.rulesT")}</b></summary><p class="small">${t("mq.rules", { n: RULE.n, a: Math.round(RULE.acc * 100), l: RULE.last, d: RULE.days, f: RULE.fmt, r: RULE.fresh, c: RULE.certLast })}</p></details>`;
      u.$$("[data-dw]", el).forEach(b => b.onclick = () => { AA.ctx.dw = b.dataset.dw; fx.sfx.tap(); AA.router.refresh(); });
      u.$$("[data-dgo]", el).forEach(b => b.onclick = () => T.drill(b.dataset.dgo));
      u.$$("[data-dread]", el).forEach(b => b.onclick = () => T.openNotion(b.dataset.dread));
    }
  });

  /* ---------- Tuteur plus exigeant ---------- */
  /* Notions « en bonne voie » qui attendent une preuve espacée (pas déjà réussie aujourd'hui). */
  T.toProve = () => Object.keys(S().nstat || {}).filter(nid => {
    const n = T.notion(nid); if (!n || n.gen || !G.inPlay(n.mid)) return false;
    if (T.nState(nid) !== "ok") return false;
    const r = T.stat(nid); return !(r.dk || []).includes(u.today());
  }).sort((a, b) => (T.mastery(b) || 0) - (T.mastery(a) || 0));
  const acts0 = T.actions;
  T.actions = () => {
    const a = acts0(), pv = T.toProve();
    if (pv.length >= 2 && !a.some(x => x.k === "prove")) {
      const i = a.findIndex(x => x.k === "session");
      a.splice(i < 0 ? a.length : i, 0, { k: "prove", ic: "target", t: t("mq.actT", { n: Math.min(pv.length, 5) }), s: t("mq.actS"), run: () => T.proveRun() });
    }
    return a;
  };
  T.proveRun = () => {
    const used = new Set(), qs = [];
    T.toProve().slice(0, 5).forEach(nid => u.shuffle(T.qsOf(nid)).filter(q => !used.has(q.id)).slice(0, 2).forEach(q => { used.add(q.id); qs.push(q); }));
    if (!qs.length) return T.session();
    Q.start("drill", u.shuffle(qs), { title: t("mq.actTitle"), back: "home" });
  };
  /* La séance du tuteur glisse aussi une preuve espacée. */
  const start1 = Q.start;
  Q.start = (mode, qs, opts) => {
    if (mode === "tutor") { try { const pv = T.toProve().slice(0, 2); if (pv.length) AA.ctx.tuBoost = (AA.ctx.tuBoost || []).concat(pv.filter(x => !(AA.ctx.tuBoost || []).includes(x))); } catch (e) {} }
    return start1(mode, qs, opts);
  };
})();
