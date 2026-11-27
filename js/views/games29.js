/* =====================================================================
   Abysse Academy 2.9 · cinq mises en situation dans l'espace Jeux
   - Palier en direct : remonter au bon rythme, respecter le plafond et
     faire ses paliers. Modèle de saturation FICTIF et pédagogique (un seul
     compartiment) : ce n'est ni MN90 ni un algorithme d'ordinateur.
   - Chasse aux erreurs : trouver 5 dangers cachés dans une scène.
   - Signes sous l'eau : reconnaître les signes de plongée, en temps limité.
   - Sauvetage chrono : remettre une procédure d'urgence dans l'ordre.
   - Incident en direct : décider vite, étape par étape.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx, V = AA.views, esc = u.esc;
  const games = () => { const s = AA.S; s.games = s.games || {}; return s.games; };
  const here = r => (location.hash.replace(/^#\/?/, "").split("/")[0] || "home") === r;
  const hall = () => (AA.hallFish ? AA.hallFish().replace('class="ex-hall"', 'class="ex-hall g29-hall"') : "");
  const shake = el => { if (!el) return; el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); };
  /* Score enregistré, XP pour les 3 premières parties du jour. */
  const record = (id, score, better, xp) => {
    const g = games()[id] = games()[id] || { n: 0 }, today = u.today(), dn = g.d === today ? (g.dn || 0) : 0;
    const rec = g.best == null || better(score, g.best);
    g.n = (g.n || 0) + 1; if (rec) g.best = score; g.d = today; g.dn = dn + 1;
    const gain = dn < 3 ? xp : 0; if (gain) G.addXp(gain);
    AA.store.save(true); G.checkBadges && G.checkBadges();
    return { rec, gain };
  };
  const endCard = (icon, title, big, sub, res, again, extra) => `<section class="card center gm-end g29-end"><div class="medal" style="margin:0 auto">${AA.icon(icon)}</div><h2>${title}</h2>${big != null ? `<div class="big gm-big">${big}</div>` : ""}<p class="muted">${sub}</p>
    ${res.rec ? `<p class="chip gold">${AA.icon("trophy")} ${t("g29.record")}</p>` : ""}<p>${res.gain ? `<span class="chip gold">+${res.gain} XP</span>` : `<span class="xs muted">${t("g29.noXp")}</span>`}</p>
    <div class="stack"><button class="btn block" id="${again}">${AA.icon("refresh")} ${t("gm.again")}</button><a class="btn ghost block" href="#/jeux">${t("gm.backHub")}</a></div></section>${extra || ""}`;
  const validNote = () => `<p class="xs muted g29-valid">${AA.icon("info")} ${t("g29.valid")}</p>`;

  /* =================================================================
     1. Palier en direct
     ================================================================= */
  const PL = {
    HL: 12, R: 1.7, N2: .79, SCALE: 1 / 3, SLOW: 9, FAST: 18,
    tol: d => PL.R * (1 + d / 10),
    ceil: L => { const c = (L / PL.R - 1) * 10; return c < 1 ? 0 : c; },
    stop: c => c <= 0.05 ? 0 : Math.ceil(c / 3 - 1e-9) * 3,
    DIVES: [{ d: 30, bt: 25 }, { d: 25, bt: 30 }, { d: 35, bt: 20 }, { d: 20, bt: 40 }, { d: 18, bt: 20 }],
    make(i, air) {
      const D = PL.DIVES[i != null ? i % PL.DIVES.length : Math.floor(Math.random() * PL.DIVES.length)];
      const pn = PL.N2 * (1 + D.d / 10), L = PL.N2 + (pn - PL.N2) * (1 - Math.pow(2, -D.bt / PL.HL));
      return { dive: D, d: D.d, L, air: air != null ? air : 110 + Math.round(Math.random() * 30), v: 0, t: 0, fastT: 0, fastN: 0, safeT: 0, stopT: 0, maxCeil: PL.ceil(L), over: false, out: false, done: false, ff: 1 };
    },
    /* Avance de dt minutes (simulées). */
    step(s, dt) {
      if (s.done) return s;
      const d0 = s.d; s.d = Math.max(0, s.d - s.v * dt); const dm = (d0 + s.d) / 2;
      const pn = PL.N2 * (1 + dm / 10); s.L = pn + (s.L - pn) * Math.pow(2, -dt / PL.HL);
      s.air -= 20 * (1 + dm / 10) / 12 * dt; s.t += dt;
      if (s.v >= PL.FAST) { if (!s.fastOn) s.fastN++; s.fastOn = true; s.fastT += dt; } else s.fastOn = false;
      if (s.v === 0 && s.d > 0) s.stopT += dt;
      if (s.d >= 2.5 && s.d <= 6.5 && s.v === 0) s.safeT += dt;
      const c = PL.ceil(s.L);
      if (s.d < c - .3) { s.over = true; s.done = true; }
      else if (s.air <= 0) { s.air = 0; s.out = true; s.done = true; }
      else if (s.d <= 0) { s.done = true; }
      return s;
    },
    score(s) {
      if (s.over || s.out) return 0;
      let p = 100 - Math.min(40, s.fastN * 15) - (s.air < 50 ? 20 : 0) - (s.safeT >= 3 ? 0 : 15);
      return Math.max(10, p);
    }
  };
  AA.g29 = { palier: PL };
  let PS = null;
  AA.view("palier", {
    tab: "train", depth: (() => PS && !PS.done ? Math.max(4, PS.d) : 12),
    render(el) {
      const g = games().palier || {};
      const stopLoop = () => { if (PS && PS.raf) { cancelAnimationFrame(PS.raf); PS.raf = null; } };
      const intro = () => {
        stopLoop(); PS = null;
        el.innerHTML = `${ui.head(t("g29.pl.t"), "jeux")}${hall()}<section class="card g29-intro"><div class="medal">${AA.icon("gauge")}</div><div class="stack"><h2>${t("g29.pl.t")}</h2><p>${t("g29.pl.rules")}</p>
          <ul class="small g29-rules"><li>${t("g29.pl.r1")}</li><li>${t("g29.pl.r2")}</li><li>${t("g29.pl.r3")}</li><li>${t("g29.pl.r4")}</li></ul>
          <p class="xs g29-fict">${AA.icon("info")} ${t("g29.pl.fict")}</p>${g.best != null ? `<p class="chip gold">${t("gm.bestScore", { n: g.best })}</p>` : ""}
          <button class="btn block" id="plGo">${AA.icon("play")} ${t("g29.start")}</button></div></section>`;
        u.$("#plGo", el).onclick = () => { fx.sfx.up(); PS = PL.make(); draw(); loop(); };
      };
      const lcd = () => {
        const c = PL.ceil(PS.L), stp = PL.stop(c), sat = Math.min(1.2, PS.L / PL.tol(PS.d)), near = PS.d < c + .8 && c > 0;
        const status = PS.v >= PL.FAST ? t("g29.pl.fastS") : near ? t("g29.pl.near") : stp ? t("g29.pl.stopAt", { d: stp }) : PS.safeT < 3 ? t("g29.pl.safe") : t("g29.pl.free");
        return { c, stp, sat, near, status };
      };
      const col = () => {
        const max = Math.max(PS.dive.d, 9), y = d => (d / max * 100).toFixed(2) + "%", L = lcd(), marks = [];
        for (let m = 3; m <= max; m += 3) marks.push(`<i class="pl-mk" style="top:${y(m)}"><b>${m}</b></i>`);
        return `<div class="pl-col" aria-hidden="true"><div class="pl-ceil" style="height:${y(L.c)}"></div>${marks.join("")}${L.stp ? `<i class="pl-stopln" style="top:${y(L.stp)}"></i>` : ""}<span class="pl-diver ${PS.v ? "up" : ""}" style="top:${y(PS.d)}">${AA.icon("dive")}</span></div>`;
      };
      const draw = () => {
        if (!here("palier") || !PS) return;
        if (PS.done) return end();
        const L = lcd(), satP = Math.round(L.sat * 100), airP = Math.max(0, Math.min(100, PS.air / 2));
        el.innerHTML = `${ui.head(t("g29.pl.t"), "jeux", `<span class="chip mono">${u.mmss(Math.round(PS.t * 60))}</span>`)}${hall()}
          <div class="pl-wrap">${col()}
            <div class="pl-pc card"><div class="pl-lcd ${L.near ? "warn" : ""}" role="status" aria-live="polite">
              <div><span class="xs">${t("g29.pl.depth")}</span><b class="mono" id="plD">${u.num(PS.d, 1)} m</b></div>
              <div><span class="xs">${t("g29.pl.ceil")}</span><b class="mono" id="plC">${L.c > 0 ? u.num(L.c, 1) + " m" : "—"}</b></div>
              <div><span class="xs">${t("g29.pl.stop")}</span><b class="mono">${L.stp ? L.stp + " m" : PS.safeT < 3 ? t("g29.pl.safeShort") : "OK"}</b></div>
              <p class="pl-status" id="plS">${L.status}</p></div>
              <div class="pl-gauge"><span class="xs">${t("g29.pl.sat")}</span><div class="bar"><i id="plSat" class="${satP >= 92 ? "low" : satP >= 75 ? "mid" : ""}" style="width:${Math.min(100, satP)}%"></i></div></div>
              <div class="pl-gauge"><span class="xs">${t("g29.pl.air")} · <b class="mono" id="plA">${Math.round(PS.air)} bar</b></span><div class="bar"><i class="${PS.air < 50 ? "low" : ""}" style="width:${airP}%"></i></div></div>
              <div class="pl-btns">
                <button class="btn ${PS.v === 0 ? "" : "ghost"} g29-opt" data-v="0" aria-pressed="${PS.v === 0}">${AA.icon("pause")} ${t("g29.pl.hold")}</button>
                <button class="btn ${PS.v === PL.SLOW ? "" : "ghost"} g29-opt" data-v="${PL.SLOW}" aria-pressed="${PS.v === PL.SLOW}">${AA.icon("next")} ${t("g29.pl.slow")}</button>
                <button class="btn ${PS.v === PL.FAST ? "accent" : "ghost"} g29-opt" data-v="${PL.FAST}" aria-pressed="${PS.v === PL.FAST}">${AA.icon("bolt")} ${t("g29.pl.fast")}</button>
                <button class="btn ghost g29-opt" id="plFF" aria-pressed="${PS.ff > 1}" ${PS.v ? "disabled" : ""}>${AA.icon("timer")} ${t("g29.pl.ff")}</button>
              </div></div></div>${validNote()}`;
        u.$$("[data-v]", el).forEach(b => b.onclick = () => { PS.v = +b.dataset.v; if (PS.v) PS.ff = 1; fx.sfx.tap(); draw(); });
        u.$("#plFF", el).onclick = () => { PS.ff = PS.ff > 1 ? 1 : 4; fx.sfx.tap(); draw(); };
      };
      const refresh = () => {
        const L = lcd(), q = s => u.$(s, el);
        if (!q("#plD")) return draw();
        q("#plD").textContent = u.num(PS.d, 1) + " m"; q("#plC").textContent = L.c > 0 ? u.num(L.c, 1) + " m" : "—"; q("#plS").textContent = L.status;
        q("#plA").textContent = Math.round(PS.air) + " bar"; const sb = q("#plSat"); sb.style.width = Math.min(100, Math.round(L.sat * 100)) + "%"; sb.className = L.sat >= .92 ? "low" : L.sat >= .75 ? "mid" : "";
        const c = q(".pl-col"); if (c) c.outerHTML = col();
        const lc = q(".pl-lcd"); if (lc) lc.classList.toggle("warn", L.near);
        if (AA.scene && AA.scene.set) AA.scene.set(Math.max(3, PS.d));
      };
      let last = 0, acc = 0, beeped = 0;
      const loop = () => {
        const f = ts => {
          if (!here("palier") || !PS) return stopLoop();
          if (!last) last = ts; const dt = Math.min(.1, (ts - last) / 1000); last = ts;
          PL.step(PS, dt * PL.SCALE * PS.ff);
          if (PS.done) { fx.sfx[PS.over || PS.out ? "alarm" : "up"](); return end(); }
          const L = lcd(); if ((L.near || PS.v >= PL.FAST) && ts - beeped > 2500) { beeped = ts; fx.sfx.ping && fx.sfx.ping(); }
          acc += dt; if (acc > .2) { acc = 0; refresh(); }
          PS.raf = requestAnimationFrame(f);
        };
        last = 0; PS.raf = requestAnimationFrame(f);
      };
      const end = () => {
        stopLoop(); if (!PS) return intro();
        const sc = PL.score(PS);
        if (!PS.res) PS.res = record("palier", sc, (a, b) => a > b, sc >= 70 ? 30 : sc ? 15 : 5);
        const why = PS.over ? t("g29.pl.over") : PS.out ? t("g29.pl.out") : [PS.fastN ? t("g29.pl.fastN", { n: PS.fastN }) : t("g29.pl.speedOk"), PS.air < 50 ? t("g29.pl.lowAir", { b: Math.round(PS.air) }) : t("g29.pl.airOk", { b: Math.round(PS.air) }), PS.safeT >= 3 ? t("g29.pl.safeOk") : t("g29.pl.safeNo")].join(" · ");
        el.innerHTML = `${ui.head(t("g29.pl.t"), "jeux")}${hall()}${endCard(PS.over || PS.out ? "x" : "gauge", t(PS.over ? "g29.pl.overT" : PS.out ? "g29.pl.outT" : "g29.pl.doneT"), sc, why, PS.res, "plAgain",
          `<section class="card g29-learn"><p class="eyebrow">${t("g29.learn")}</p><ul class="small"><li>${t("g29.pl.l1")}</li><li>${t("g29.pl.l2")}</li><li>${t("g29.pl.l3")}</li></ul><a class="small" href="#/lesson/deco">${t("g29.toLesson")}</a></section>${validNote()}`)}`;
        u.$("#plAgain", el).onclick = () => { fx.sfx.tap(); PS = PL.make(); draw(); loop(); };
      };
      if (PS && !PS.done) { draw(); if (!PS.raf) loop(); } else if (PS && PS.done) end(); else intro();
    },
    leave() { if (PS && PS.raf) { cancelAnimationFrame(PS.raf); PS.raf = null; } }
  });

  /* =================================================================
     2. Chasse aux erreurs
     ================================================================= */
  const ART = {
    boat: `<svg viewBox="0 0 320 120" class="g29-art" aria-hidden="true"><rect width="320" height="70" fill="var(--sky,#9fd8f0)" opacity=".35"/><path d="M0 70 Q40 62 80 70 T160 70 T240 70 T320 70 V120 H0Z" fill="var(--primary)" opacity=".35"/><path d="M60 58 H250 L230 82 H82Z" fill="var(--surface-3,#ccd)" stroke="var(--ink)" stroke-opacity=".4"/><rect x="120" y="30" width="60" height="28" rx="3" fill="var(--surface-2,#eef)" stroke="var(--ink)" stroke-opacity=".3"/><path d="M200 58 V18 L226 26 L200 34" fill="var(--accent)" opacity=".8"/><circle cx="95" cy="50" r="5" fill="var(--ink)" opacity=".5"/><rect x="88" y="54" width="14" height="5" fill="var(--gold)"/></svg>`,
    reef: `<svg viewBox="0 0 320 120" class="g29-art" aria-hidden="true"><rect width="320" height="120" fill="var(--primary)" opacity=".18"/><path d="M0 120 V96 Q30 80 60 94 T120 88 T180 98 T240 84 T320 92 V120Z" fill="var(--accent)" opacity=".35"/><path d="M40 96 v-26 M40 80 l-10 -8 M40 76 l10 -10 M250 88 v-30 M250 70 l12 -9 M250 64 l-9 -8" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity=".7"/><circle cx="150" cy="40" r="3" fill="var(--bubble,#fff)" opacity=".6"/><circle cx="156" cy="28" r="2" fill="var(--bubble,#fff)" opacity=".6"/></svg>`,
    ascent: `<svg viewBox="0 0 320 120" class="g29-art" aria-hidden="true"><defs><linearGradient id="g29a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--primary)" stop-opacity=".1"/><stop offset="1" stop-color="var(--primary)" stop-opacity=".45"/></linearGradient></defs><rect width="320" height="120" fill="url(#g29a)"/><path d="M0 8 Q40 2 80 8 T160 8 T240 8 T320 8" stroke="var(--primary)" fill="none" opacity=".6"/><path d="M160 110 V20" stroke="var(--gold)" stroke-dasharray="4 5" opacity=".7"/><circle cx="160" cy="60" r="4" fill="var(--bubble,#fff)" opacity=".6"/><circle cx="166" cy="44" r="3" fill="var(--bubble,#fff)" opacity=".6"/></svg>`
  };
  let CH = null;
  const chNew = () => { const L = C.games29.scenes, last = CH && CH.sc.id, pool = L.filter(s => s.id !== last), sc = u.pick(pool.length ? pool : L);
    return { sc, items: u.shuffle(sc.items.map((x, i) => ({ i, t: x[0], bad: !!x[1], e: x[2], m: x[3] }))), found: new Set(), miss: [], lives: 3, t0: Date.now(), done: false, open: null }; };
  AA.view("chasse", {
    tab: "train", depth: () => CH && CH.sc.id === "fond" ? 18 : CH && CH.sc.id === "remontee" ? 8 : 2,
    render(el) {
      if (!CH || CH.shown) CH = chNew();
      const nBad = () => CH.items.filter(x => x.bad).length;
      const draw = () => {
        if (!here("chasse")) return;
        if (CH.done) return end();
        el.innerHTML = `${ui.head(t("g29.ch.t"), "jeux", `<span class="chip">${AA.icon("heart")} ${CH.lives}</span>`)}${hall()}
          <section class="card g29-scene"><div class="g29-artw">${ART[CH.sc.art] || ""}</div><p class="eyebrow">${esc(CH.sc.title)}</p><p class="small muted">${esc(CH.sc.sub)}</p>
            <p class="small"><b>${t("g29.ch.goal", { n: nBad() })}</b> · ${t("g29.ch.found", { n: CH.found.size, tot: nBad() })}</p></section>
          <div class="ch-grid">${CH.items.map((x, k) => { const st = CH.found.has(x.i) ? "hit" : CH.miss.includes(x.i) ? "miss" : ""; return `<button class="ch-it g29-opt ${st}" data-k="${k}" ${st ? "disabled" : ""}><span class="ch-ic">${AA.icon(st === "hit" ? "check" : st === "miss" ? "x" : "eye")}</span><span>${esc(x.t)}</span>${st ? `<small>${esc(x.e)}</small>` : ""}</button>`; }).join("")}</div>${validNote()}`;
        u.$$(".ch-it", el).forEach(b => b.onclick = () => pick(+b.dataset.k, b));
      };
      const pick = (k, b) => {
        const x = CH.items[k]; if (CH.done || CH.found.has(x.i) || CH.miss.includes(x.i)) return;
        if (x.bad) { CH.found.add(x.i); fx.sfx.ok(); fx.burstAt(b, 14, "rgba(61,220,151,.85)"); if (CH.found.size === nBad()) { CH.done = true; CH.win = true; CH.t1 = Date.now(); } }
        else { CH.miss.push(x.i); CH.lives--; fx.sfx.bad(); fx.buzz && fx.buzz(30); shake(b); if (CH.lives <= 0) { CH.done = true; CH.win = false; CH.t1 = Date.now(); } }
        setTimeout(draw, x.bad ? 250 : 500);
      };
      const end = () => {
        CH.shown = true; const sec = Math.round((CH.t1 - CH.t0) / 1000);
        if (!CH.res) CH.res = CH.win ? record("chasse", sec, (a, b) => a < b, CH.lives === 3 ? 30 : 20) : record("chasse-x", 0, () => false, 5);
        el.innerHTML = `${ui.head(t("g29.ch.t"), "jeux")}${hall()}${endCard(CH.win ? "eye" : "x", t(CH.win ? "g29.ch.win" : "g29.ch.lose"), CH.win ? sec + " s" : null, CH.win ? t("g29.ch.winS", { l: CH.lives }) : t("g29.ch.loseS"), CH.res, "chAgain",
          `<div class="section-title"><h3>${t("g29.ch.all")}</h3></div><div class="review gm-rv">${CH.items.filter(x => x.bad).map(x => `<div class="rv"><b>${esc(x.t)}</b><span class="small">${esc(x.e)}</span><a class="small" href="#/lesson/${x.m}">${esc((C.byId[x.m] || {}).title || "")}</a></div>`).join("")}</div>${validNote()}`)}`;
        u.$("#chAgain", el).onclick = () => { fx.sfx.tap(); CH = chNew(); draw(); };
      };
      draw();
    }
  });

  /* =================================================================
     3. Signes sous l'eau
     ================================================================= */
  let SG = null;
  const SG_N = 10, SG_T = 12;
  const sgNew = () => { const L = C.games29.signs, order = u.shuffle(L.map((_, i) => i)).slice(0, SG_N);
    return { rounds: order.map((i, k) => { const rev = k % 3 === 2, wrong = u.shuffle(L.map((_, j) => j).filter(j => j !== i)).slice(0, 3), opts = u.shuffle([i].concat(wrong));
      return { i, rev, opts }; }), k: 0, good: 0, mist: [], phase: "ready", left: SG_T }; };
  AA.view("signes", {
    tab: "train", depth: 6,
    render(el) {
      if (!SG || SG.shown) SG = sgNew();
      const L = C.games29.signs, g = games().signes || {};
      const stop = () => { clearInterval(SG.timer); SG.timer = null; };
      const draw = () => {
        if (!here("signes")) return stop();
        if (SG.phase === "ready") {
          el.innerHTML = `${ui.head(t("g29.sg.t"), "jeux")}${hall()}<section class="card g29-intro"><div class="medal">${AA.icon("hand")}</div><div class="stack"><h2>${t("g29.sg.t")}</h2><p>${t("g29.sg.rules", { n: SG_N, s: SG_T })}</p>${g.best != null ? `<p class="chip gold">${t("gm.bestScore", { n: g.best + " / " + SG_N })}</p>` : ""}<button class="btn block" id="sgGo">${AA.icon("play")} ${t("g29.start")}</button></div></section>${validNote()}`;
          u.$("#sgGo", el).onclick = () => { fx.sfx.up(); SG.phase = "play"; tick(); draw(); };
          return;
        }
        if (SG.phase === "end") return end();
        const r = SG.rounds[SG.k], ask = r.rev ? L[r.i][1] : L[r.i][0];
        el.innerHTML = `${ui.head(t("g29.sg.t"), "jeux", `<span class="chip mono">${SG.k + 1} / ${SG_N}</span>`)}${hall()}
          <div class="bar vf-bar"><i id="sgBar" style="width:${SG.left / SG_T * 100}%"></i></div>
          <section class="card sg-card"><div class="sg-diver" aria-hidden="true">${AA.icon("hand")}</div><p class="eyebrow">${t(r.rev ? "g29.sg.askGesture" : "g29.sg.askMeaning")}</p><p class="sg-q">${esc(ask)}</p><div id="sgFb" class="small" aria-live="polite"></div></section>
          <div class="sg-opts">${r.opts.map(j => `<button class="choice g29-opt" data-j="${j}"><span>${esc(r.rev ? L[j][0] : L[j][1])}</span></button>`).join("")}</div>`;
        u.$$("[data-j]", el).forEach(b => b.onclick = () => pick(+b.dataset.j, b));
      };
      const tick = () => { stop(); SG.left = SG_T; SG.timer = setInterval(() => { if (!here("signes")) return stop(); SG.left = Math.max(0, SG.left - .2); const b = u.$("#sgBar", el); if (b) b.style.width = SG.left / SG_T * 100 + "%"; if (SG.left <= 0) pick(-1); }, 200); };
      const pick = (j, b) => {
        if (SG.lock || SG.phase !== "play") return; SG.lock = true; stop();
        const r = SG.rounds[SG.k], ok = j === r.i;
        if (ok) { SG.good++; fx.sfx.ok(); if (b) b.classList.add("good"); }
        else { SG.mist.push(r.i); fx.sfx.bad(); if (b) { b.classList.add("wrong"); shake(b); } const gb = u.$(`[data-j="${r.i}"]`, el); if (gb) gb.classList.add("good");
          const fb = u.$("#sgFb", el); if (fb) fb.textContent = j < 0 ? t("g29.sg.late") : t("g29.sg.was", { a: L[r.i][1] }); }
        setTimeout(() => { SG.lock = false; SG.k++; if (SG.k >= SG_N) { SG.phase = "end"; } else tick(); draw(); }, ok ? 500 : 1500);
      };
      const end = () => {
        SG.shown = true; stop();
        if (!SG.res) SG.res = record("signes", SG.good, (a, b) => a > b, SG.good >= 8 ? 25 : 10);
        el.innerHTML = `${ui.head(t("g29.sg.t"), "jeux")}${hall()}${endCard("hand", t("g29.sg.end"), SG.good + " / " + SG_N, t(SG.good >= 9 ? "g29.sg.top" : SG.good >= 6 ? "g29.sg.mid" : "g29.sg.low"), SG.res, "sgAgain",
          `${SG.mist.length ? `<div class="section-title"><h3>${t("g29.sg.mist")}</h3></div><div class="review gm-rv">${SG.mist.map(i => `<div class="rv"><b>${esc(L[i][1])}</b><span class="small">${esc(L[i][0])}</span></div>`).join("")}</div>` : ""}${validNote()}`)}`;
        u.$("#sgAgain", el).onclick = () => { fx.sfx.tap(); SG = sgNew(); SG.phase = "play"; tick(); draw(); };
      };
      draw();
    },
    leave() { if (SG && SG.timer) { clearInterval(SG.timer); SG.timer = null; if (SG.phase === "play") SG.lock = false; } }
  });

  /* =================================================================
     4. Sauvetage chrono
     ================================================================= */
  let SV = null;
  const procs = () => (C.procs || []).filter(p => p.steps && p.steps.flat().length >= 4);
  const svNew = id => {
    const L = procs(), p = (id && L.find(x => x.id === id)) || u.pick(L.filter(x => !SV || x.id !== SV.p.id)) || L[0];
    const groups = p.steps.map(s => [].concat(s)), extra = u.shuffle((p.extra || []).slice()).slice(0, 2);
    const pool = u.shuffle(groups.flatMap((g, gi) => g.map(txt => ({ txt, gi }))).concat(extra.map(txt => ({ txt, gi: -1 }))));
    return { p, groups, pool, placed: [], gi: 0, left: groups[0].slice(), pen: 0, errs: 0, t0: 0, done: false };
  };
  AA.view("sauvetage", {
    tab: "train", depth: 10,
    render(el, [pid]) {
      if (!SV || SV.shown || (pid && SV.p.id !== pid)) SV = svNew(pid);
      const g = games().sauvetage || {}, best = (g.by || {})[SV.p.id];
      const stop = () => { clearInterval(SV.timer); SV.timer = null; };
      const secs = () => SV.t0 ? Math.round(((SV.t1 || Date.now()) - SV.t0) / 1000) + SV.pen : 0;
      const draw = () => {
        if (!here("sauvetage")) return stop();
        if (SV.done) return end();
        const total = SV.groups.flat().length;
        el.innerHTML = `${ui.head(t("g29.sv.t"), "jeux", `<span class="chip mono" id="svT">${secs()} s</span>`)}${hall()}
          <section class="card g29-scene"><p class="eyebrow">${esc(SV.p.title)}${best ? " · " + t("g29.sv.best", { s: best }) : ""}</p><p>${esc(SV.p.q)}</p>
            <p class="xs muted">${t("g29.sv.rules")}</p></section>
          <ol class="sv-done">${SV.placed.map(x => `<li>${esc(x)}</li>`).join("")}${SV.placed.length < total ? `<li class="sv-next">${t("g29.sv.next", { n: SV.placed.length + 1, tot: total })}</li>` : ""}</ol>
          <div class="sv-pool">${SV.pool.map((x, k) => x.used ? "" : `<button class="choice g29-opt sv-it" data-k="${k}"><span>${esc(x.txt)}</span></button>`).join("")}</div>
          <div class="row"><button class="btn ghost sm" id="svOther">${AA.icon("refresh")} ${t("g29.sv.other")}</button></div>${validNote()}`;
        u.$$(".sv-it", el).forEach(b => b.onclick = () => pick(+b.dataset.k, b));
        u.$("#svOther", el).onclick = () => { stop(); SV = svNew(); draw(); };
      };
      const pick = (k, b) => {
        const x = SV.pool[k]; if (SV.done || x.used) return;
        if (!SV.t0) { SV.t0 = Date.now(); SV.timer = setInterval(() => { if (!here("sauvetage")) return stop(); const e = u.$("#svT", el); if (e) e.textContent = secs() + " s"; }, 500); }
        if (x.gi === SV.gi && SV.left.includes(x.txt)) {
          x.used = true; SV.placed.push(x.txt); SV.left.splice(SV.left.indexOf(x.txt), 1); fx.sfx.ok();
          if (!SV.left.length) { SV.gi++; if (SV.gi >= SV.groups.length) { SV.done = true; SV.t1 = Date.now(); stop(); fx.sfx.up(); } else SV.left = SV.groups[SV.gi].slice(); }
          draw();
        } else {
          SV.errs++; SV.pen += x.gi < 0 ? 8 : 5; fx.sfx.bad(); fx.buzz && fx.buzz(30); shake(b);
          if (x.gi < 0) { x.used = true; fx.toast(t("g29.sv.trapT"), t("g29.sv.trapS"), "x"); setTimeout(draw, 500); }
          else fx.float && fx.float("+5 s", b, "var(--bad)");
        }
      };
      const end = () => {
        SV.shown = true; const s = secs(), gg = games().sauvetage = games().sauvetage || { n: 0 }; gg.by = gg.by || {};
        if (!SV.res) { const prev = gg.by[SV.p.id]; SV.res = record("sauvetage", s, (a, b) => a < b, SV.errs === 0 ? 25 : 15); SV.res.rec = !prev || s < prev; if (SV.res.rec) gg.by[SV.p.id] = s; AA.store.save(true); }
        el.innerHTML = `${ui.head(t("g29.sv.t"), "jeux")}${hall()}${endCard("timer", t("g29.sv.end"), s + " s", t("g29.sv.endS", { e: SV.errs, p: SV.pen }), SV.res, "svAgain",
          `<section class="card g29-learn"><p class="eyebrow">${esc(SV.p.title)}</p><ol class="small">${SV.groups.map(gr => `<li>${gr.map(esc).join(` <span class="muted">${t("g29.sv.or")}</span> `)}</li>`).join("")}</ol><p class="small">${esc(SV.p.e)}</p></section>${validNote()}`)}`;
        u.$("#svAgain", el).onclick = () => { fx.sfx.tap(); SV = svNew(); draw(); };
      };
      draw();
    },
    leave() { if (SV && SV.timer) { clearInterval(SV.timer); SV.timer = null; } }
  });

  /* =================================================================
     5. Incident en direct
     ================================================================= */
  let IN = null;
  const IN_T = 15;
  const inNew = id => { const L = C.games29.incidents, inc = (id && L.find(x => x.id === id)) || u.pick(L.filter(x => !IN || x.id !== IN.inc.id)) || L[0];
    return { inc, k: 0, stress: 30, good: 0, log: [], left: IN_T, phase: "ready", order: inc.steps.map(s => u.shuffle(s.c.map((_, i) => i))) }; };
  AA.view("incident", {
    tab: "train", depth: () => { if (!IN) return 15; const s = IN.inc.steps[Math.min(IN.k, IN.inc.steps.length - 1)]; return s.d != null ? Math.max(2, s.d) : IN.inc.depth; },
    render(el, [iid]) {
      if (!IN || IN.shown || (iid && IN.inc.id !== iid)) IN = inNew(iid);
      const stop = () => { clearInterval(IN.timer); IN.timer = null; };
      const gauges = () => `<div class="in-gauges"><div class="pl-gauge"><span class="xs">${t("g29.in.stress")}</span><div class="bar"><i class="${IN.stress >= 70 ? "low" : IN.stress >= 45 ? "mid" : "okc"}" style="width:${IN.stress}%"></i></div></div>
        <div class="pl-gauge"><span class="xs">${t("g29.in.air")} · <b class="mono">${IN.inc.steps[Math.min(IN.k, IN.inc.steps.length - 1)].air} bar</b></span><div class="bar"><i style="width:${IN.inc.steps[Math.min(IN.k, IN.inc.steps.length - 1)].air / 2}%"></i></div></div></div>`;
      const draw = () => {
        if (!here("incident")) return stop();
        if (IN.phase === "ready") {
          el.innerHTML = `${ui.head(t("g29.in.t"), "jeux")}${hall()}<section class="card g29-intro"><div class="medal">${AA.icon("bolt")}</div><div class="stack"><h2>${esc(IN.inc.title)}</h2><p>${esc(IN.inc.sub)}</p><p class="small">${t("g29.in.rules", { s: IN_T })}</p>
            <div class="row">${C.games29.incidents.map(x => `<a class="chip ${x.id === IN.inc.id ? "on" : ""}" href="#/incident/${x.id}" aria-pressed="${x.id === IN.inc.id}">${esc(x.title)}</a>`).join("")}</div>
            <button class="btn block" id="inGo">${AA.icon("play")} ${t("g29.start")}</button></div></section>${validNote()}`;
          u.$("#inGo", el).onclick = () => { fx.sfx.up(); IN.phase = "play"; tick(); draw(); };
          return;
        }
        if (IN.phase === "end") return end();
        const s = IN.inc.steps[IN.k];
        el.innerHTML = `${ui.head(esc(IN.inc.title), "jeux", `<span class="chip mono">${IN.k + 1} / ${IN.inc.steps.length}</span>`)}${hall()}
          <div class="bar vf-bar"><i id="inBar" style="width:${IN.left / IN_T * 100}%"></i></div>${gauges()}
          <section class="card in-scene"><p class="eyebrow">${s.d != null ? s.d + " m" : IN.inc.depth + " m"}</p><p>${esc(s.scene)}</p><p><b>${esc(s.q)}</b></p><div id="inFb" class="small" aria-live="polite"></div></section>
          <div class="sg-opts">${IN.order[IN.k].map(i => `<button class="choice g29-opt" data-i="${i}"><span>${esc(s.c[i].t)}</span></button>`).join("")}</div>`;
        u.$$("[data-i]", el).forEach(b => b.onclick = () => pick(+b.dataset.i, b));
      };
      const tick = () => { stop(); IN.left = IN_T; IN.timer = setInterval(() => { if (!here("incident")) return stop(); IN.left = Math.max(0, IN.left - .2); const b = u.$("#inBar", el); if (b) b.style.width = IN.left / IN_T * 100 + "%"; if (IN.left <= 0) pick(-1); }, 200); };
      const pick = (i, b) => {
        if (IN.lock || IN.phase !== "play") return; IN.lock = true; stop();
        const s = IN.inc.steps[IN.k], c = s.c[i], ok = !!(c && c.ok), right = s.c.find(x => x.ok);
        if (ok) { IN.good++; IN.stress = Math.max(0, IN.stress - 10); fx.sfx.ok(); b && b.classList.add("good"); }
        else { IN.stress = Math.min(100, IN.stress + (c ? c.s : 30)); fx.sfx.bad(); if (b) { b.classList.add("wrong"); shake(b); } const gi = s.c.indexOf(right), gb = u.$(`[data-i="${gi}"]`, el); if (gb) gb.classList.add("good"); }
        IN.log.push({ q: s.q, ok, t: c ? c.t : t("g29.in.late"), e: c ? c.e : t("g29.in.lateE"), right: right.t, re: right.e });
        const fb = u.$("#inFb", el); if (fb) fb.innerHTML = `${ok ? AA.icon("check") : AA.icon("x")} ${esc(c ? c.e : t("g29.in.lateE"))}`;
        setTimeout(() => { IN.lock = false; IN.k++; if (IN.stress >= 100 || IN.k >= IN.inc.steps.length) IN.phase = "end"; else tick(); draw(); }, ok ? 1300 : 2400);
      };
      const end = () => {
        IN.shown = true; stop(); const n = IN.inc.steps.length, lost = IN.stress >= 100;
        const lvl = lost ? "lost" : IN.good === n ? "top" : IN.good >= 3 ? "mid" : "low";
        if (!IN.res) IN.res = record("incident", lost ? 0 : IN.good, (a, b) => a > b, lvl === "top" ? 30 : lvl === "mid" ? 15 : 5);
        el.innerHTML = `${ui.head(esc(IN.inc.title), "jeux")}${hall()}${endCard(lost ? "x" : "shield", t("g29.in.end." + lvl), IN.good + " / " + n, t("g29.in.endS." + lvl), IN.res, "inAgain",
          `<section class="card g29-learn"><p class="eyebrow">${t("g29.learn")}</p><ul class="small">${IN.inc.learn.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
           <div class="section-title"><h3>${t("g29.in.replay")}</h3></div><div class="review gm-rv">${IN.log.map(x => `<div class="rv"><b>${esc(x.q)}</b><span class="small">${x.ok ? AA.icon("check") : AA.icon("x")} ${esc(x.t)}</span>${x.ok ? "" : `<span class="small">${AA.icon("check")} ${esc(x.right)}</span>`}<span class="xs muted">${esc(x.ok ? x.e : x.re)}</span></div>`).join("")}</div>
           <a class="small" href="#/lesson/${IN.inc.m}">${t("g29.toLesson")}</a>${validNote()}`)}`;
        u.$("#inAgain", el).onclick = () => { fx.sfx.tap(); IN = inNew(); draw(); };
      };
      draw();
    },
    leave() { if (IN && IN.timer) { clearInterval(IN.timer); IN.timer = null; IN.lock = false; } }
  });

  /* ---------- Tuiles dans l'espace Jeux ---------- */
  const TILES = [["palier", "gauge", "g29.pl.t", "g29.pl.s", g => g.best != null ? t("gm.bestScore", { n: g.best }) : ""],
    ["chasse", "eye", "g29.ch.t", "g29.ch.s", g => g.best != null ? t("gm.bestScore", { n: g.best + " s" }) : ""],
    ["signes", "hand", "g29.sg.t", "g29.sg.s", g => g.best != null ? t("gm.bestScore", { n: g.best + " / " + SG_N }) : ""],
    ["sauvetage", "timer", "g29.sv.t", "g29.sv.s", g => g.n ? t("g29.sv.played", { n: g.n }) : ""],
    ["incident", "bolt", "g29.in.t", "g29.in.s", g => g.best != null ? t("gm.bestScore", { n: g.best + " / 5" }) : ""]];
  AA.g29.tiles = TILES.map(x => x[0]);
  AA.g29.state = { chasse: () => CH, signes: () => SG, sauvetage: () => SV, incident: () => IN, palier: () => PS };
  if (V.jeux) {
    const j0 = V.jeux.render;
    V.jeux.render = function (el, args) {
      const out = j0.call(this, el, args), m = u.$(".gm-minis", el);
      if (m && !u.$(".g29-tiles", el)) {
        const gs = games();
        m.insertAdjacentHTML("afterend", `<div class="section-title g29-sec"><h3>${t("g29.secT")}</h3><span class="xs muted">${t("g29.secS")}</span></div>
          <section class="gm-minis g29-tiles">${TILES.map(([id, ic, tt, ss, b]) => `<a class="gm-tile g29-tile" href="#/${id}"><span class="medal">${AA.icon(ic)}</span><span class="grow"><b>${t(tt)}</b><span class="small muted">${t(ss)}</span><span class="xs">${b(gs[id] || {}) || t("gm.noBest")}</span></span></a>`).join("")}</section>`);
      }
      return out;
    };
  }
})();
