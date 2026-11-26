/* =====================================================================
   Abysse Academy · labo : simulateur, ordinateur, scénarios, tables, calculette
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, G = AA.game, C = AA.content, fx = AA.fx, ui = AA.ui;
  const L = (AA.lab = {});

  AA.view("lab", {
    tab: "lab",
    render(el) {
      const S = AA.S, sc = C.scenarios.filter(s => S.scen[s.id] === 1).length;
      el.innerHTML = `${ui.head(t("tab.lab"))}<p class="muted">${t("lab.intro")}</p>${ui.intro("sim")}
        <div class="tiles" style="margin-top:var(--sp-4)">
          ${ui.tile("sim", "dive", "var(--primary)", t("lab.sim"), t("lab.simS"), S.simOk ? [t("lab.simOk", { n: S.simOk }), "ok"] : null)}
          ${ui.tile("pc", "watch", "var(--ok)", t("mode.pc"), t("lab.pcS", { n: C.computer.length }), S.pcRuns ? [t("pc.best", { n: S.pcBest }), S.pcBest === 100 ? "ok" : ""] : null)}
          ${ui.tile("scen", "cross", "var(--accent)", t("lab.scen"), t("lab.scenS"), [sc + "/" + C.scenarios.length, sc === C.scenarios.length ? "ok" : ""])}
          ${ui.tile("tables", "table", "var(--gold)", t("lab.tables"), t("lab.tablesS"), S.table.length ? [t("lab.rows", { n: S.table.length }), "gold"] : null)}
          ${ui.tile("calc", "calc", "var(--world-e2)", t("lab.calc"), t("lab.calcS"))}
        </div>`;
      u.on(el, "click", ".tile", (e, b) => { fx.sfx.tap(); AA.router.go(b.dataset.t); });
    }
  });

  /* ---------- Écran d'ordinateur ---------- */
  L.computerScreen = s => `<div class="dc" aria-label="${t("lab.screen")}"><div class="dc-scr"><div class="dc-top"><span>${s.alarm ? `<b class="dc-al">${u.esc(s.alarm)}</b>` : "AIR"}</span><span>${s.tank} bar</span></div>
    <div class="dc-main"><div><small>PROF</small><b>${s.d}<i>m</i></b></div><div><small>${s.stop ? (s.deco ? "PALIER" : "SÉCU") : "NDL"}</small><b class="${s.stop && s.deco ? "dc-deco" : ""}">${s.stop ? u.esc(s.stop) : s.ndl != null ? s.ndl + "<i>min</i>" : "—"}</b></div></div>
    <div class="dc-bot"><span>MAX ${s.max} m</span><span>${s.t} min</span><span class="dc-asc">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= s.bar ? "on" : ""} ${k >= 4 && k <= s.bar ? "hot" : ""}"></i>`).join("")}</span></div></div>
    ${s.dual ? `<p class="small muted" style="margin:6px 0 0">${t("lab.buddyPc")} <b>${u.esc(s.dual.ndl2)}</b></p>` : ""}</div>`;

  /* ---------- Mode ordinateur : écran d'accueil, comme les scénarios ---------- */
  AA.view("pc", {
    tab: "lab",
    render(el) {
      const S = AA.S, n = C.computer.length, demo = (C.computer[0] || {}).scr;
      el.innerHTML = `${ui.head(t("mode.pc"), "lab")}<p class="muted">${t("pc.intro")}</p>
        <div class="pc-intro" style="margin-top:var(--sp-4)">
          <section class="card stack">${demo ? L.computerScreen(demo) : ""}<p class="xs muted" style="margin:0">${t("pc.demo")}</p></section>
          <section class="card stack"><h3>${t("pc.readT")}</h3>
            <ul class="pc-legend">${AA.i18n.raw("pc.legend").map(([k, v]) => `<li><b class="mono">${k}</b><span>${v}</span></li>`).join("")}</ul></section>
        </div>
        ${S.pcRuns ? `<p class="small muted" style="margin-top:var(--sp-4)">${t("pc.stats", { b: S.pcBest, r: S.pcRuns })}</p>` : ""}
        <div class="tiles one-sm" style="margin-top:var(--sp-4)">
          ${ui.tile("quick", "bolt", "var(--ok)", t("pc.quick"), t("pc.quickS", { n: Math.min(6, n) }))}
          ${ui.tile("all", "watch", "var(--primary)", t("pc.all"), t("pc.allS", { n }), S.pcBest === 100 ? [t("scen.ok"), "ok"] : null)}
        </div>
        ${ui.callout("check", t("common.validate"), t("pc.validate"))}`;
      u.on(el, "click", ".tile", (e, b) => { fx.sfx.tap(); AA.quiz.computer(b.dataset.t === "quick" ? Math.min(6, n) : n); });
    }
  });

  /* ---------- Scénarios ---------- */
  AA.view("scen", {
    tab: "lab",
    render(el, [sid]) {
      const S = AA.S;
      if (!sid || !C.scenById[sid]) {
        el.innerHTML = `${ui.head(t("lab.scen"), "lab")}<p class="muted">${t("scen.intro")}</p>
          <div class="tiles one-sm" style="margin-top:var(--sp-4)">${C.scenarios.map(s => ui.tile(s.id, "cross", S.scen[s.id] === 1 ? "var(--ok)" : "var(--accent)", u.esc(s.title), t("scen.steps", { n: s.steps.length }), S.scen[s.id] === 1 ? [t("scen.ok"), "ok"] : null)).join("")}</div>
          ${ui.callout("check", t("common.validate"), t("scen.validate"))}`;
        u.on(el, "click", ".tile", (e, b) => { AA.ctx.scen = { i: 0, good: 0, pick: null }; AA.router.go("scen/" + b.dataset.t); });
        return;
      }
      const s = C.scenById[sid], c = AA.ctx.scen && AA.ctx.scen.id === sid ? AA.ctx.scen : (AA.ctx.scen = { id: sid, i: 0, good: 0, pick: null });
      c.id = sid;
      const st = s.steps[c.i];
      if (!st) {
        const ok = c.good === s.steps.length;
        if (!c.saved) { c.saved = true; G.dayc().scen++; G.markDay(); if (ok && S.scen[s.id] !== 1) G.addXp(40); S.scen[s.id] = ok ? 1 : (S.scen[s.id] || 0); AA.store.save(); G.checkBadges(); if (ok) { fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 2, 40, "rgba(61,220,151,.9)"); } }
        el.innerHTML = `<section class="card result stack-lg"><p class="eyebrow">${u.esc(s.title)}</p><div class="big">${c.good}<span class="muted" style="font-size:.4em"> / ${s.steps.length}</span></div><p>${ok ? t("scen.perfect") : t("scen.retry")}</p>
          <div class="stack"><button class="btn block" id="re">${AA.icon("refresh")} ${t("result.again")}</button><a class="btn ghost block" href="#/scen">${t("scen.others")}</a>${s.m ? `<a class="btn ghost block" href="#/lesson/${s.m}">${t("result.toLesson", { title: u.esc(C.moduleTitle(s.m)) })}</a>` : ""}</div></section>`;
        u.$("#re").onclick = () => { AA.ctx.scen = { id: sid, i: 0, good: 0, pick: null }; AA.router.refresh(); };
        return;
      }
      const answered = c.pick != null;
      el.innerHTML = `<div class="pagehead"><a class="closebtn" href="#/scen" aria-label="${t("nav.back")}">${AA.icon("back")}</a><span class="eyebrow grow">${u.esc(s.title)} · ${t("scen.step", { i: c.i + 1, n: s.steps.length })}</span></div>
        <section class="qcard">${c.i === 0 ? `<p class="story">${u.esc(s.intro)}</p>` : ""}<h2 class="qtext">${u.esc(st.q)}</h2>
        ${st.c.map((o, k) => `<button class="opt ${answered ? (o[1] ? "good" : k === c.pick ? "wrong" : "") : ""}" data-k="${k}" ${answered ? "disabled" : ""}>${u.esc(o[0])}</button>`).join("")}
        ${answered ? `<div class="feedback ${st.c[c.pick][1] ? "ok" : "bad"}"><h4>${st.c[c.pick][1] ? t("scen.good") : t("scen.bad")}</h4><p>${u.esc(st.c[c.pick][2])}${st.c[c.pick][1] ? "" : " " + t("scen.right", { a: u.esc(st.c.find(o => o[1])[0]) })}</p></div><div class="qactions"><button class="btn block" id="nx">${t("quiz.next")} ${AA.icon("next")}</button></div>` : ""}</section>`;
      u.$$(".opt", el).forEach(b => b.onclick = () => { c.pick = +b.dataset.k; const ok = st.c[c.pick][1]; if (ok) { c.good++; fx.sfx.ok(); fx.buzz(15); } else { fx.sfx.bad(); fx.buzz([40, 40, 40]); } G.markDay(); AA.router.refresh(); });
      const nx = u.$("#nx"); if (nx) { nx.focus({ preventScroll: true }); nx.onclick = () => { c.i++; c.pick = null; AA.router.refresh(); }; }
    }
  });

  /* ---------- Atelier tables ---------- */
  AA.view("tables", {
    tab: "lab",
    render(el) {
      const S = AA.S, rows = S.table.slice().sort((a, b) => a.p - b.p || a.t - b.t);
      el.innerHTML = `${ui.head(t("lab.tables"), "lab")}
        ${ui.callout("trap", t("tables.whyT"), t("tables.why"))}
        <section class="card stack"><h3>${t("tables.methodT")}</h3><p class="muted" style="margin:0">${t("tables.methodS")}</p><button class="btn block" id="meth">${AA.icon("play")} ${t("tables.method")}</button></section>
        <section class="card stack" style="margin-top:var(--sp-4)"><h3>${t("tables.mineT")}</h3>
          <div class="tbl"><table class="ttable"><tr><th>${t("tables.p")}</th><th>${t("tables.t")}</th><th>6 m</th><th>3 m</th><th>GPS</th><th></th></tr>
          ${rows.map(r => `<tr><td class="mono">${r.p}</td><td class="mono">${r.t}</td><td class="mono">${r.p6 || "—"}</td><td class="mono">${r.p3 || "—"}</td><td class="mono">${u.esc(r.g || "—")}</td><td><button class="btn ghost sm" data-del="${r.k}" aria-label="${t("common.remove")}">${AA.icon("x")}</button></td></tr>`).join("")}
          <tr><td><input class="input" id="tp" type="number" inputmode="numeric" placeholder="20" aria-label="${t("tables.p")}"></td><td><input class="input" id="tt" type="number" inputmode="numeric" placeholder="40" aria-label="${t("tables.t")}"></td><td><input class="input" id="t6" type="number" inputmode="numeric" placeholder="0" aria-label="6 m"></td><td><input class="input" id="t3" type="number" inputmode="numeric" placeholder="0" aria-label="3 m"></td><td><input class="input" id="tg" maxlength="2" placeholder="H" aria-label="GPS"></td><td><button class="btn sm" id="add" aria-label="${t("common.add")}">${AA.icon("plus")}</button></td></tr></table></div>
          <p class="small muted" style="margin:0">${t("tables.hint")}</p>
          <button class="btn gold block" id="tq" ${rows.length < 3 ? "disabled" : ""}>${t("tables.train")}</button></section>`;
      u.$("#meth").onclick = () => AA.quiz.start("gen", Array.from({ length: 8 }, () => G.gen(u.pick(["ligne", "ligne", "remontee", "remontee", "consec"]))), { title: t("tables.methodT"), back: "tables" });
      u.$("#add").onclick = () => {
        const v = id => parseFloat(u.$("#" + id).value); const p = v("tp"), tt = v("tt");
        if (!(p > 0 && tt > 0)) { fx.toast(t("tables.incT"), t("tables.incS"), "table"); return; }
        S.table.push({ k: Date.now() + "", p, t: tt, p6: v("t6") || 0, p3: v("t3") || 0, g: u.$("#tg").value.trim().toUpperCase().slice(0, 2) });
        AA.store.save(); G.checkBadges(); AA.router.refresh(); setTimeout(() => { const i = u.$("#tp"); i && i.focus(); }, 50);
      };
      u.$$("[data-del]", el).forEach(b => b.onclick = () => { S.table = S.table.filter(r => r.k !== b.dataset.del); AA.store.save(); AA.router.refresh(); });
      u.$("#tq").onclick = () => { if (rows.length >= 3) AA.quiz.start("gen", u.shuffle(rows).slice(0, 8).map(tableQ), { title: t("tables.mineT"), back: "tables" }); };
    }
  });
  function tableQ(r) {
    const others = AA.S.table.filter(x => x !== r), kind = u.pick(r.g ? ["p3", "p6", "g"] : ["p3", "p6"]);
    const fmt = x => x ? x + " min" : t("tables.none");
    if (kind === "g") {
      const vals = [...new Set([r.g].concat(u.shuffle(others.map(x => x.g).filter(Boolean)), ["C", "F", "J", "M"]))].slice(0, 4), c = u.shuffle(vals);
      return { id: "tab-" + r.k, m: "deco", q: t("tables.qG", { p: r.p, t: r.t }), c, a: c.indexOf(r.g), e: t("tables.eG", { g: r.g, p: r.p, t: r.t }) };
    }
    const ans = fmt(r[kind]), depth = kind === "p3" ? "3" : "6";
    const vals = [...new Set([ans].concat(u.shuffle(others.map(x => fmt(x[kind]))), [fmt((r[kind] || 0) + 2), fmt(Math.max(0, (r[kind] || 0) - 1)), fmt((r[kind] || 0) + 5), t("tables.none")]))].slice(0, 4), c = u.shuffle(vals);
    return { id: "tab-" + r.k + kind, m: "deco", q: t("tables.qP", { p: r.p, t: r.t, d: depth }), c, a: c.indexOf(ans), e: t("tables.eP", { a: ans, d: depth, p: r.p, t: r.t }) };
  }

  /* ---------- Simulateur ---------- */
  const HT = [5, 10, 20, 40, 80];
  const fresh = () => ({ t: 0, d: 0, v: 0, air: 200, tis: HT.map(() => .79), hist: [[0, 0]], max: 0, alerts: new Set(), maxRatio: 1, started: false, ended: false, rate: 10, speed: 20, lastAlarm: 0 });
  let simTimer = null, simKeys = () => {}, simHide = () => {};
  AA.view("sim", {
    tab: "lab",
    leave() { clearInterval(simTimer); document.removeEventListener("keydown", simKeys); document.removeEventListener("visibilitychange", simHide); const s = AA.ctx.sim; if (s && s.started && !s.ended) s.paused = true; },
    render(el) {
      const s = AA.ctx.sim || (AA.ctx.sim = fresh());
      if (s.autoPause == null) s.autoPause = true;
      el.innerHTML = `${ui.head(t("lab.sim"), "lab", `<button class="btn ghost sm" id="shelp" aria-expanded="false">${AA.icon("info")} ${t("sim.howBtn")}</button>`)}
        <div class="sim-how card" id="showto" hidden><ol>${AA.i18n.raw("sim.how").map(x => `<li>${x}</li>`).join("")}</ol><p class="xs muted" style="margin:0">${t("sim.intro")}</p></div>
        <div class="sim">
          <div class="stack">
            <div class="sim-screen"><canvas class="simcv" id="simcv" aria-label="${t("sim.graph")}"></canvas>
              <div class="sim-pause" id="spause" hidden><b>${AA.icon("pause")} ${t("sim.paused")}</b><span id="spwhy">${t("sim.pausedS")}</span><button class="btn" id="sresume">${AA.icon("play")} ${t("sim.resume")}</button></div></div>
            <p class="alertline" id="salert" role="status"></p>
            <div class="sim-pad" role="group" aria-label="${t("sim.pad")}">
              <button class="padbtn down" id="sdown" aria-pressed="false"><span class="pi">▼</span><b>${t("sim.down")}</b><small>20 m/min</small></button>
              <button class="padbtn hold" id="sstop" aria-pressed="false"><span class="pi">■</span><b>${t("sim.stop")}</b><small>${t("sim.holdS")}</small></button>
              <button class="padbtn up" id="sup" aria-pressed="false"><span class="pi">▲</span><b>${t("sim.up")}</b><small id="supv">${s.rate} m/min</small></button>
              <button class="padbtn pause" id="spp"><span class="pi" id="sppi">${AA.icon("pause")}</span><b id="sppl">${t("sim.pause")}</b><small>${t("sim.spaceKey")}</small></button>
            </div>
            <details class="sim-set"><summary>${AA.icon("gear")} ${t("sim.settings")}</summary>
              <div class="stack" style="margin-top:var(--sp-3)">
                <div class="row"><span class="xs muted">${t("sim.rate")}</span><div class="seg">${[6, 10, 15, 25].map(r => `<button data-rate="${r}" aria-pressed="${s.rate === r}">${r} m/min</button>`).join("")}</div></div>
                <div class="row"><span class="xs muted">${t("sim.speed")}</span><div class="seg">${[10, 20, 60].map(r => `<button data-sp="${r}" aria-pressed="${s.speed === r}">×${r}</button>`).join("")}</div></div>
                <label class="row small"><input type="checkbox" id="sauto" ${s.autoPause ? "checked" : ""}> ${t("sim.autoPause")}</label>
                <button class="btn ghost sm" id="sreset" style="justify-self:start">${AA.icon("refresh")} ${t("sim.reset")}</button></div></details>
          </div>
          <div><div class="readout">${[["r-d", t("sim.depth"), "m"], ["r-t", t("sim.time"), ""], ["r-a", t("sim.air"), "bar"], ["r-p", t("sim.pabs"), "bar"], ["r-n", "PP N₂", "bar"], ["r-c", t("sim.conso"), "L/min"]].map(([id, l, un]) => `<div><small>${l}</small><b id="${id}">0</b> <span class="xs muted">${un}</span></div>`).join("")}</div>
          <div id="tis" style="margin-top:var(--sp-3)"></div><p class="xs muted">${t("sim.tissues")}</p></div></div>
        <div id="simres"></div>
        ${ui.callout("check", t("sim.modelT"), t("sim.model"))}`;
      const live = () => s.started && !s.ended;
      const setMove = v => { if (s.ended) return; s.v = v; if (v > 0) s.started = true; if (s.paused) s.paused = false; if (s.started) run(); sync(); };
      u.$("#sdown").onclick = () => { fx.sfx.tap(); setMove(20); };
      u.$("#sstop").onclick = () => { fx.sfx.tap(); setMove(0); };
      u.$("#sup").onclick = () => { fx.sfx.tap(); setMove(-s.rate); };
      u.$("#spp").onclick = () => togglePause();
      u.$("#sresume").onclick = () => togglePause(false);
      u.$("#shelp").onclick = e => { const h = u.$("#showto"); h.hidden = !h.hidden; e.currentTarget.setAttribute("aria-expanded", !h.hidden); };
      u.$("#sauto").onchange = e => { s.autoPause = e.target.checked; };
      u.$$("[data-rate]", el).forEach(b => b.onclick = () => { s.rate = +b.dataset.rate; if (s.v < 0) s.v = -s.rate; u.$("#supv").textContent = s.rate + " m/min"; u.$$("[data-rate]", el).forEach(x => x.setAttribute("aria-pressed", x === b)); });
      u.$$("[data-sp]", el).forEach(b => b.onclick = () => { s.speed = +b.dataset.sp; u.$$("[data-sp]", el).forEach(x => x.setAttribute("aria-pressed", x === b)); });
      u.$("#sreset").onclick = () => { clearInterval(simTimer); AA.ctx.sim = fresh(); AA.router.refresh(); };
      function togglePause(force, why) {
        if (!live()) return;
        s.paused = force == null ? !s.paused : force;
        if (s.paused) clearInterval(simTimer); else run();
        s.pauseWhy = s.paused ? why || "" : "";
        sync();
      }
      function sync() {
        const p = u.$("#spause"); if (!p) return;
        p.hidden = !s.paused;
        u.$("#spwhy").textContent = s.pauseWhy || t("sim.pausedS");
        u.$("#sppl").textContent = s.paused ? t("sim.resume") : t("sim.pause");
        u.$("#sppi").innerHTML = AA.icon(s.paused ? "play" : "pause");
        u.$("#spp").disabled = !live();
        [["sdown", s.v > 0], ["sstop", live() && s.v === 0], ["sup", s.v < 0]].forEach(([id, on]) => u.$("#" + id).setAttribute("aria-pressed", on));
        u.$("#sdown").disabled = s.ended; u.$("#sup").disabled = s.ended || !s.started; u.$("#sstop").disabled = s.ended || !s.started;
      }
      simKeys = e => {
        if (AA.router.name !== "sim" || e.target.closest("input,textarea,select") || e.ctrlKey || e.metaKey || e.altKey) return;
        const k = e.key;
        if (k === " " || k === "p" || k === "P") { e.preventDefault(); togglePause(); }
        else if (k === "ArrowDown") { e.preventDefault(); setMove(20); }
        else if (k === "ArrowUp") { e.preventDefault(); if (s.started) setMove(-s.rate); }
        else if (k === "s" || k === "S" || k === "Enter") { if (s.started) { e.preventDefault(); setMove(0); } }
      };
      simHide = () => { if (document.hidden && live() && !s.paused) togglePause(true); };
      document.addEventListener("keydown", simKeys); document.addEventListener("visibilitychange", simHide);
      function run() { clearInterval(simTimer); if (!s.paused) simTimer = setInterval(step, 100); }
      function step() {
        if (AA.router.name !== "sim") return clearInterval(simTimer);
        if (s.paused) return clearInterval(simTimer);
        const dt = .1 * s.speed / 60;
        s.d = u.clamp(s.d + s.v * dt, 0, 60); if (s.d >= 60 && s.v > 0) s.v = 0;
        if (s.d <= 0 && s.v < 0) s.v = 0;
        const P = 1 + s.d / 10, pn = .79 * P; s.t += dt; s.air = Math.max(0, s.air - 20 * P * dt / 15);
        s.tis = s.tis.map((x, i) => x + (pn - x) * (1 - Math.exp(-Math.LN2 / HT[i] * dt))); s.max = Math.max(s.max, s.d);
        s.hist.push([s.t, s.d]); if (s.hist.length > 4000) s.hist = s.hist.filter((_, i) => i % 2 === 0);
        const ratio = Math.max(...s.tis) / P; s.maxRatio = Math.max(s.maxRatio, ratio);
        let al = "", bad = false, key = "";
        if (s.v < 0 && -s.v > 17 && s.d > .5) { al = t("sim.aFast"); key = "vitesse"; bad = true; }
        else if (ratio > 2) { al = t("sim.aSat"); key = "sursat"; bad = true; }
        else if (s.air <= 0) { al = t("sim.aAir"); key = "air"; bad = true; }
        else if (s.air < 50) { al = t("sim.aRes"); key = "reserve"; bad = true; }
        else if (s.d > 40) { al = t("sim.aDeep"); key = "prof"; bad = true; }
        else if (pn > 3.2) al = t("sim.aNarc");
        else if (s.v > 0) al = t("sim.aEq");
        const first = key && !s.alerts.has(key); if (key) s.alerts.add(key);
        const ae = u.$("#salert"); if (ae) { ae.textContent = al; ae.style.color = bad ? "var(--bad)" : "var(--muted)"; ae.classList.toggle("hot", bad); }
        if (bad && s.t - s.lastAlarm > .5) { fx.sfx.alarm(); fx.buzz(60); s.lastAlarm = s.t; }
        draw();
        if (s.started && s.d <= 0 && s.max > 3 && s.v <= 0) { clearInterval(simTimer); s.ended = true; s.paused = false; sync(); finish(); return; }
        /* Première fois qu'une alarme sonne : pause pour réfléchir. */
        if (first && s.autoPause) togglePause(true, al + " " + t("sim.thinkS"));
      }
      function draw() {
        const cv = u.$("#simcv"); if (!cv) return;
        const css = getComputedStyle(document.documentElement), col = k => css.getPropertyValue(k).trim();
        const dpr = devicePixelRatio, W = cv.clientWidth, H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr;
        const g = cv.getContext("2d"); g.scale(dpr, dpr);
        const tmax = Math.max(30, Math.ceil(s.t / 10) * 10 + 5), dmax = Math.max(30, Math.ceil(s.max / 10) * 10 + 5), X = x => 36 + (W - 46) * x / tmax, Y = d => 14 + (H - 30) * d / dmax;
        g.font = "11px JetBrains Mono, monospace"; g.fillStyle = col("--muted"); g.strokeStyle = col("--line"); g.lineWidth = 1;
        for (let d = 0; d <= dmax; d += 10) { g.beginPath(); g.moveTo(36, Y(d)); g.lineTo(W - 10, Y(d)); g.stroke(); g.fillText(d + " m", 2, Y(d) + 4); }
        for (let x = 0; x <= tmax; x += 10) g.fillText(x + "'", X(x) - 6, H - 2);
        g.strokeStyle = col("--accent"); g.lineWidth = 3; g.lineJoin = "round"; g.beginPath(); s.hist.forEach(([x, d], i) => i ? g.lineTo(X(x), Y(d)) : g.moveTo(X(x), Y(d))); g.stroke();
        const [lt, ld] = s.hist[s.hist.length - 1]; g.fillStyle = col("--gold"); g.beginPath(); g.arc(X(lt), Y(ld), 5, 0, 7); g.fill();
        if (!s.started) { g.fillStyle = col("--ink"); g.font = "600 14px " + (col("--font-body") || "sans-serif"); g.textAlign = "center"; g.fillText(t("sim.start"), W / 2, H / 2); g.textAlign = "left"; }
        const P = 1 + s.d / 10, set = (id, v) => { const e = u.$("#" + id); if (e) e.textContent = v; };
        set("r-d", u.num(s.d, 1)); set("r-t", u.mmss(Math.floor(s.t * 60))); set("r-p", u.num(P, 2)); set("r-a", Math.round(s.air)); set("r-n", u.num(.79 * P, 2)); set("r-c", Math.round(20 * P));
        const te = u.$("#tis"); if (te) te.innerHTML = s.tis.map((x, i) => { const r = x / P, c = r > 2 ? "var(--bad)" : r > 1.05 ? "var(--gold)" : "var(--ok)"; return `<div class="tissue"><span>${HT[i]} min</span>${ui.bar(x / 4, c)}<span>${u.num(x, 2)}</span></div>`; }).join("");
      }
      function finish() {
        const clean = s.alerts.size === 0 && s.maxRatio <= 2;
        if (clean && !s.saved) { s.saved = true; AA.S.simOk++; G.addXp(30); AA.store.save(); G.checkBadges(); fx.sfx.up(); fx.burst(innerWidth / 2, innerHeight / 2, 40, "rgba(61,220,151,.9)"); }
        const names = AA.i18n.raw("sim.alertNames");
        const r = u.$("#simres"); if (r) r.innerHTML = `<div class="feedback ${clean ? "ok" : "bad"}" style="margin-top:var(--sp-4)"><h4>${clean ? t("sim.clean") : t("sim.alerts")}</h4><p>${t("sim.summary", { d: u.num(s.max, 1), t: Math.round(s.t), a: Math.round(s.air) })}${s.alerts.size ? " " + t("sim.alertList", { l: [...s.alerts].map(a => names[a]).join(", ") }) : ""}</p>${clean ? "" : `<p class="small">${t("sim.tip")}</p>`}<button class="btn block" id="sagain" style="margin-top:var(--sp-3)">${AA.icon("refresh")} ${t("sim.reset")}</button></div>`;
        const ag = u.$("#sagain"); if (ag) ag.onclick = () => { AA.ctx.sim = fresh(); AA.router.refresh(); };
      }
      requestAnimationFrame(() => { draw(); sync(); if (s.paused && live()) s.pauseWhy = s.pauseWhy || t("sim.backS"), sync(); if (live()) run(); else if (s.ended) finish(); });
    }
  });

  /* ---------- Calculette ---------- */
  AA.view("calc", {
    tab: "lab",
    render(el) {
      const F = (id, label, v, step) => `<div class="kv"><label for="${id}">${label}</label><input class="input" id="${id}" type="number" inputmode="decimal" value="${v}" ${step ? `step="${step}"` : ""}></div>`;
      el.innerHTML = `${ui.head(t("lab.calc"), "lab")}<p class="muted">${t("calc.intro")}</p>
        <div class="calc-grid" style="margin-top:var(--sp-4)">
          <section class="card"><h3>${t("calc.gas")}</h3>${F("c-d", t("calc.depth"), 35)}${F("c-pa", t("calc.patm"), 1, .05)}${F("c-o2", t("calc.o2"), 21)}<div class="out" id="o1"></div></section>
          <section class="card"><h3>${t("calc.auto")}</h3>${F("a-v", t("calc.vol"), 15)}${F("a-p", t("calc.p0"), 200)}${F("a-r", t("calc.res"), 50)}${F("a-c", t("calc.conso"), 20)}${F("a-d", t("calc.depth"), 20)}<div class="out" id="o2"></div></section>
          <section class="card"><h3>${t("calc.lest")}</h3>${F("l-m", t("calc.mass"), 90)}${F("l-v", t("calc.volume"), 92)}${F("l-r", t("calc.rho"), 1.03, .01)}<div class="out" id="o3"></div></section>
          <section class="card"><h3>${t("calc.mariotte")}</h3>${F("m-v", t("calc.v1"), 6)}${F("m-d1", t("calc.d1"), 20)}${F("m-d2", t("calc.d2"), 0)}<div class="out" id="o4"></div></section>
          <section class="card"><h3>${t("calc.charles")}</h3>${F("k-p", t("calc.p1"), 200)}${F("k-t1", t("calc.t1"), 40)}${F("k-t2", t("calc.t2"), 15)}<div class="out" id="o5"></div></section>
          <section class="card"><h3>${t("calc.oxy")}</h3>${F("x-v", t("calc.vol"), 5)}${F("x-p", t("calc.p0"), 200)}${F("x-q", t("calc.flow"), 15)}<div class="out" id="o6"></div></section>
        </div>`;
      const v = id => parseFloat(u.$("#" + id).value) || 0, f = (x, d = 2) => u.num(x, d), set = (id, s) => (u.$("#" + id).textContent = s);
      function upd() {
        const d = v("c-d"), pa = v("c-pa"), o = v("c-o2") / 100, P = pa + d / 10;
        set("o1", `P abs = ${f(pa)} + ${f(d)}/10 = ${f(P)} bar\nPp O₂ = ${f(P)} × ${f(o)} = ${f(P * o)} bar${P * o > 1.6 ? "  ⚠ > 1,6" : ""}\nPp N₂ = ${f(P)} × ${f(1 - o)} = ${f(P * (1 - o))} bar${P * (1 - o) >= 3.2 ? "  ⚠ " + t("calc.narc") : ""}\n${t("calc.volRatio", { r: f(P / (pa || 1)) })}`);
        const V = v("a-v"), Pd = v("a-p"), Rr = v("a-r"), Cs = v("a-c"), D = v("a-d"), Pa = 1 + D / 10, air = V * (Pd - Rr), cf = Cs * Pa;
        set("o2", `${t("calc.usable")} = ${f(V)} × (${f(Pd)} − ${f(Rr)}) = ${f(air, 0)} L\n${t("calc.bottom")} = ${f(Cs)} × ${f(Pa)} = ${f(cf)} L/min\n${t("calc.autoRes", { n: cf > 0 ? f(air / cf, 1) : "—" })}`);
        const M = v("l-m"), Lv = v("l-v"), rho = v("l-r"), pap = M - Lv * rho;
        set("o3", `${t("calc.push")} = ${f(Lv)} × ${f(rho)} = ${f(Lv * rho)} kg\n${t("calc.app")} = ${f(M)} − ${f(Lv * rho)} = ${f(pap)} kg\n${pap < 0 ? t("calc.floats", { n: f(-pap, 1) }) : pap > 0 ? t("calc.sinks", { n: f(pap, 1) }) : t("calc.neutral")}`);
        const mv = v("m-v"), p1 = 1 + v("m-d1") / 10, p2 = 1 + v("m-d2") / 10;
        set("o4", `${f(p1)} × ${f(mv)} = ${f(p2)} × V₂\nV₂ = ${f(p1 * mv / p2)} L`);
        const kp = v("k-p"), T1 = v("k-t1") + 273, T2 = v("k-t2") + 273;
        set("o5", `P₂ = ${f(kp)} × ${f(T2, 0)} / ${f(T1, 0)} = ${f(kp * T2 / T1, 1)} bar`);
        const xv = v("x-v"), xp = v("x-p"), xq = v("x-q");
        set("o6", `${f(xv)} × ${f(xp)} = ${f(xv * xp, 0)} L\n${t("calc.oxyRes", { n: xq > 0 ? f(xv * xp / xq, 0) : "—" })}`);
      }
      u.$$("input", el).forEach(i => i.addEventListener("input", upd)); upd();
    }
  });
})();
