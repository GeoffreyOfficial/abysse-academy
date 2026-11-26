/* =====================================================================
   Abysse Academy 1.8
   - Examens blancs par niveau : choix du niveau et du format, barème,
     répartition par thème, note par thème, progression, correction.
   - Fiches « à retenir » imprimables (impression ou fichier à garder).
   - Mode oral : lecteur du cours (paragraphe surligné, vitesse, pause)
     et lecture automatique des questions.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, u = AA.u, t = AA.t, C = AA.content, G = AA.game, ui = AA.ui, fx = AA.fx, Q = AA.quiz;
  const S = () => AA.S;

  /* ---------- Examens blancs par niveau ---------- */
  const FMT = { full: { n: 40, calc: 10, min: 45 }, quick: { n: 20, calc: 4, min: 20 } };
  const examWorlds = () => C.worlds.filter(w => !w.soon && C.inWorld(w.id).length >= 2);
  const examsOf = wid => (S().exams || []).filter(e => (e.world || "n2") === wid);
  const sparkBars = list => list.length ? `<div class="ex-hist">${list.slice(-10).map(e => `<div title="${u.esc(e.date)}"><i style="height:${Math.max(6, e.score / 20 * 100)}%" class="${e.score >= 10 ? "ok" : ""}"></i><b>${u.num(e.score, 1)}</b><span>${e.full ? "C" : "R"}</span></div>`).join("")}</div>` : `<p class="small muted">${t("exm.noHist")}</p>`;
  AA.view("examen", {
    tab: "train", depth: 30,
    render(el, [wid0, f0]) {
      let wid = C.worldById[wid0] && C.inWorld(wid0).length >= 2 ? wid0 : Q.examWorld(), fmt = f0 === "quick" ? "quick" : "full";
      const draw = () => {
        const w = C.worldById[wid], F = FMT[fmt], mods = C.inWorld(wid), per = fmt === "full" ? 2 : 1, hist = examsOf(wid), last = hist[hist.length - 1];
        const gens = G.genKeys().filter(k => C.byId[C.generators[k].m] && C.byId[C.generators[k].m].world === wid).length;
        el.innerHTML = `${ui.head(t("exm.title"), "train")}<p class="muted">${t("exm.intro")}</p>
          <p class="eyebrow" style="margin-top:var(--sp-4)">${t("exm.level")}</p>
          <div class="ex-worlds">${examWorlds().map(x => `<button class="chip ex-w ${x.id === wid ? "on" : ""}" data-ew="${x.id}" style="--wc:var(${x.color})" aria-pressed="${x.id === wid}">${u.esc(x.short)}</button>`).join("")}</div>
          <div class="ex-fmts">${["full", "quick"].map(k => `<button class="card ex-fmt ${k === fmt ? "on" : ""}" data-ef="${k}" aria-pressed="${k === fmt}"><b>${t(k === "full" ? "mode.examFull" : "mode.examQuick")}</b>
            <span class="small">${t("exm.fmtS", { n: FMT[k].n, c: FMT[k].calc, m: FMT[k].min })}</span></button>`).join("")}</div>
          <div class="ex-grid"><section class="card ex-spec" style="--wc:var(${w.color})"><h3>${u.esc(w.title)}</h3>
            <dl class="ex-dl"><dt>${t("exm.q")}</dt><dd>${t("exm.qV", { n: F.n, c: gens ? F.calc : 0 })}</dd><dt>${t("exm.time")}</dt><dd>${F.min} min</dd>
              <dt>${t("exm.scale")}</dt><dd>${t("exm.scaleV")}</dd><dt>${t("exm.pass")}</dt><dd>${t("exm.passV")}</dd>
              <dt>${t("exm.rules")}</dt><dd>${t("exm.rulesV")}</dd></dl>
            <p class="eyebrow">${t("exm.split")}</p><div class="ex-split">${mods.map(m => `<span class="chip">${u.esc(m.title)} · ${per}+</span>`).join("")}${gens ? `<span class="chip gold">${t("exam.calcs")} · ${F.calc}</span>` : ""}</div>
            <button class="btn block" id="exgo" style="margin-top:var(--sp-4)">${AA.icon("play")} ${t("exm.start", { m: F.min })}</button>
            <p class="xs muted" style="margin:8px 0 0">${t("exm.hyp")}</p></section>
          <section class="card"><h3>${t("exm.hist")}</h3>${last ? `<p class="small">${t("exm.last", { s: u.num(last.score, 1), d: u.fmtDate ? u.fmtDate(last.date) : last.date })}</p>` : ""}${sparkBars(hist)}
            ${last && last.by ? `<p class="eyebrow" style="margin-top:var(--sp-3)">${t("exm.weak")}</p>${weakList(last.by, wid)}` : ""}</section></div>`;
        u.$$("[data-ew]", el).forEach(b => b.onclick = () => { wid = b.dataset.ew; fx.sfx.tap(); draw(); });
        u.$$("[data-ef]", el).forEach(b => b.onclick = () => { fmt = b.dataset.ef; fx.sfx.tap(); draw(); });
        u.$("#exgo", el).onclick = () => Q.exam(fmt === "full", wid);
      };
      draw();
    }
  });
  const weakList = (by, wid) => { const rows = C.inWorld(wid).filter(m => by[m.id]).map(m => [m, by[m.id][0] / by[m.id][1]]).filter(x => x[1] < .6).sort((a, b) => a[1] - b[1]);
    return rows.length ? `<div class="ex-weak">${rows.map(([m, p]) => `<div class="row"><span class="grow"><b>${u.esc(m.title)}</b> <span class="xs muted">${Math.round(p * 100)} %</span></span><a class="btn ghost sm" href="#/lesson/${m.id}">${AA.icon("book")} ${t("exm.reread")}</a><button class="btn sm" data-mq="${m.id}">${AA.icon("play")} ${t("exm.train")}</button></div>`).join("")}</div>` : `<p class="small">${AA.icon("check")} ${t("exm.noWeak")}</p>`; };
  /* Rapport détaillé en fin d'examen (appelé par quiz.js). */
  AA.examReport = (c, by, score) => {
    const wid = c.world || "n2", hist = examsOf(wid), prev = hist.length > 1 ? hist[hist.length - 2] : null;
    const rows = C.inWorld(wid).filter(m => by[m.id]).map(m => [m, by[m.id]]).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]);
    const bar = (k, n) => { const p = n ? k / n : 0; return `<div class="ex-bar"><i style="width:${Math.round(p * 100)}%" class="${p >= .8 ? "ok" : p >= .5 ? "mid" : "low"}"></i></div>`; };
    return `<div class="ex-report">
      <div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap"><span class="chip ${score >= 10 ? "ok" : "warn"}">${t(score >= 10 ? "exm.passOk" : "exm.passNo")}</span>${prev ? `<span class="chip">${t("exm.delta", { d: (score - prev.score >= 0 ? "+" : "") + u.num(score - prev.score, 1) })}</span>` : ""}</div>
      <p class="eyebrow">${t("exm.byTheme")}</p>
      <div class="ex-themes">${rows.map(([m, [k, n]]) => `<a class="ex-th" href="#/lesson/${m.id}"><span class="grow"><b>${u.esc(m.title)}</b></span><span class="mono small">${k}/${n}</span>${bar(k, n)}</a>`).join("")}
        ${by.calc ? `<div class="ex-th"><span class="grow"><b>${t("exam.calcs")}</b></span><span class="mono small">${by.calc[0]}/${by.calc[1]}</span>${bar(by.calc[0], by.calc[1])}</div>` : ""}</div>
      <p class="eyebrow">${t("exm.weak")}</p>${weakList(by, wid)}
      <a class="btn ghost block" href="#/examen/${wid}">${AA.icon("chart")} ${t("exm.histBtn")}</a></div>`;
  };
  document.addEventListener("click", e => {
    const mq = e.target.closest("[data-mq]"); if (mq) { e.preventDefault(); const m = C.byId[mq.dataset.mq]; if (m) Q.module(m); return; }
    const xq = e.target.closest("[data-expq]"); if (xq) { e.preventDefault(); const q = C.qById[xq.dataset.expq]; if (q && AA.explainMe) AA.explainMe(q, +xq.dataset.pk); }
  });

  /* ---------- Fiches imprimables ---------- */
  const textOf = h => { const d = document.createElement("div"); d.innerHTML = h || ""; return d; };
  const ficheData = m => { const d = textOf((m.essentiel || "") + (m.approfondir || ""));
    return { formulas: Array.from(d.querySelectorAll(".formula")).map(x => x.textContent.trim()).filter(Boolean).slice(0, 4),
      traps: Array.from(d.querySelectorAll(".callout.trap")).map(x => { const c = x.cloneNode(true); c.querySelectorAll(".eyebrow").forEach(e => e.remove()); return c.textContent.replace(/\s+/g, " ").trim(); }).filter(Boolean).slice(0, 2) }; };
  const ficheHtml = (mods, withDiag) => mods.map(m => { const f = ficheData(m), w = C.worldById[m.world];
    return `<section class="fiche"><header><span class="f-w">${u.esc(w.short)} · ${u.esc(m.depth)}</span><h2>${u.esc(m.title)}</h2><p>${u.esc(m.sub || "")}</p></header>
      ${f.formulas.length ? `<div class="f-formulas">${f.formulas.map(x => `<code>${u.esc(x)}</code>`).join("")}</div>` : ""}
      ${withDiag && m.diagram && C.diagrams[m.diagram] ? `<div class="f-diag">${C.diagrams[m.diagram]()}</div>` : ""}
      <dl class="f-memo">${m.memo.map(([a, b]) => `<div><dt>${u.esc(a)}</dt><dd>${u.esc(b)}</dd></div>`).join("")}</dl>
      ${f.traps.length ? `<div class="f-traps">${f.traps.map(x => `<p><b>⚠</b> ${u.esc(x)}</p>`).join("")}</div>` : ""}</section>`; }).join("");
  const PRINT_CSS = `*{box-sizing:border-box}body{font:11pt/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;background:#fff;margin:0;padding:14mm}
    h1{font-size:18pt;margin:0 0 2mm}.f-top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #0b7f86;margin-bottom:6mm;padding-bottom:2mm}.f-top span{color:#555;font-size:9pt}
    .fiche{break-inside:avoid;page-break-inside:avoid;border:1px solid #ccd;border-radius:3mm;padding:4mm 5mm;margin:0 0 5mm}.fiche header h2{font-size:13pt;margin:1mm 0}.fiche header p{margin:0;color:#555;font-size:9.5pt}.f-w{font:700 8pt monospace;letter-spacing:.05em;text-transform:uppercase;color:#0b7f86}
    .f-formulas{display:flex;flex-wrap:wrap;gap:2mm;margin:3mm 0}.f-formulas code{font:600 10pt monospace;background:#eef6f7;border:1px solid #bfdfe2;border-radius:2mm;padding:1mm 2.5mm}
    .f-memo{display:grid;grid-template-columns:1fr 1fr;gap:2mm 6mm;margin:3mm 0 0}.f-memo div{break-inside:avoid}.f-memo dt{font-weight:700}.f-memo dd{margin:0;color:#333}
    .f-traps{margin-top:3mm;font-size:9.5pt;color:#7a2a00}.f-traps p{margin:1mm 0}.f-diag{max-width:120mm;margin:2mm 0}.f-diag svg{width:100%;height:auto}.f-diag figcaption{font-size:8.5pt;color:#555}
    .d-pri{fill:#0b8a8a}.d-acc{fill:#e0603a}.d-gold{fill:#d39b00}.d-ok{fill:#2e9a5a}.d-bad{fill:#c43a3a}.d-soft{fill:#e6ecef}.d-surf{fill:#fff}.s-pri{stroke:#0b8a8a}.s-acc{stroke:#e0603a}.s-gold{stroke:#d39b00}.s-ok{stroke:#2e9a5a}.s-bad{stroke:#c43a3a}.s-line{stroke:#bbb}.s-muted{stroke:#888}
    .d-text{fill:#444;font:11px monospace}.d-strong{fill:#111;font:700 12px monospace}.t-pri,.t-acc,.t-gold,.t-ok,.t-bad,.t-num,.t-on{font:700 12px monospace}.t-pri{fill:#0b8a8a}.t-acc{fill:#e0603a}.t-gold{fill:#a77a00}.t-ok{fill:#2e9a5a}.t-bad{fill:#c43a3a}.t-num{fill:#fff}.t-on{fill:#111}.an-move{display:none}
    .f-foot{margin-top:6mm;font-size:8.5pt;color:#666;border-top:1px solid #ccc;padding-top:2mm}@page{margin:10mm}@media print{body{padding:0}}`;
  const ficheDoc = (mods, title, withDiag) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${u.esc(title)}</title><style>${PRINT_CSS}</style></head><body>
    <div class="f-top"><h1>${u.esc(title)}</h1><span>Abysse Academy · ${u.today()}${S().profile.name ? " · " + u.esc(S().profile.name) : ""}</span></div>${ficheHtml(mods, withDiag)}
    <p class="f-foot">${t("fic.foot")}</p></body></html>`;
  AA.view("fiches", {
    tab: "profile", depth: 4,
    render(el, [wid0, mid]) {
      let wid = C.worldById[wid0] ? wid0 : G.goalWorld(), one = C.byId[mid] ? mid : "", diag = true;
      const draw = () => {
        const w = C.worldById[wid], mods = one ? [C.byId[one]] : C.inWorld(wid), title = one ? t("fic.oneT", { m: C.byId[one].title }) : t("fic.worldT", { w: w.title });
        el.innerHTML = `${ui.head(t("fic.title"), "profile")}<p class="muted">${t("fic.intro")}</p>
          <div class="ex-worlds">${C.worlds.filter(x => !x.soon && C.inWorld(x.id).length).map(x => `<button class="chip ex-w ${x.id === wid && !one ? "on" : ""}" data-fw="${x.id}" style="--wc:var(${x.color})">${u.esc(x.short)}</button>`).join("")}</div>
          <div class="row fic-tools"><button class="btn" id="fprint">${AA.icon("download")} ${t("fic.print")}</button><button class="btn ghost" id="fdl">${AA.icon("save")} ${t("fic.dl")}</button>
            <label class="chip fic-diag"><input type="checkbox" id="fdiag" ${diag ? "checked" : ""}> ${t("fic.withDiag")}</label></div>
          <p class="xs muted">${t("fic.howPdf")}</p>
          <div class="fic-preview card"><div class="f-top"><h1>${u.esc(title)}</h1></div>${ficheHtml(mods, diag)}</div>`;
        u.$$("[data-fw]", el).forEach(b => b.onclick = () => { wid = b.dataset.fw; one = ""; draw(); });
        u.$("#fdiag", el).onchange = e => { diag = e.target.checked; draw(); };
        const doc = () => ficheDoc(mods, title, diag), fname = "abysse-fiches-" + (one || wid) + ".html";
        const dl = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([doc()], { type: "text/html" })); a.download = fname; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); fx.toast(t("fic.dlT"), t("fic.dlS"), "save"); };
        u.$("#fdl", el).onclick = dl;
        u.$("#fprint", el).onclick = () => {
          try { const f = document.createElement("iframe"); f.className = "print-frame"; f.setAttribute("aria-hidden", "true"); document.body.appendChild(f);
            f.srcdoc = doc(); f.onload = () => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { dl(); } setTimeout(() => f.remove(), 60000); };
          } catch (e) { dl(); } };
      };
      draw();
    }
  });

  /* ---------- Mode oral ---------- */
  const A = AA.a11y; AA.oral = {};
  let items = [], idx = 0, playing = false, bar = null;
  const RATES = [.8, 1, 1.2, 1.4];
  const clean = el => { const c = el.cloneNode(true); c.querySelectorAll("svg,button,.eyebrow:empty,figure").forEach(x => x.remove()); return (A.textOf ? A.textOf(c) : c.textContent).replace(/\s+/g, " ").trim(); };
  const collect = root => Array.from(root.querySelectorAll(".prose > h3, .prose > p, .prose > ul > li, .prose > ol > li, .prose > .callout, .prose > .tbl, .memo > div, .lesson-body > .callout, .ex-steps li, .diagram figcaption")).filter(x => clean(x).length > 2);
  const mark = () => { items.forEach((x, k) => x.classList.toggle("oral-on", k === idx && playing)); const x = items[idx]; if (x && playing) x.scrollIntoView({ block: "center", behavior: A.reduced && A.reduced() ? "auto" : "smooth" }); };
  const ui2 = () => { if (!bar) return; bar.querySelector("#orPlay").innerHTML = AA.icon(playing ? "pause" : "play"); bar.querySelector("#orPos").textContent = `${Math.min(idx + 1, items.length)} / ${items.length}`; bar.querySelector("#orRate").textContent = "×" + String(S().profile.voiceRate || 1).replace(".", ","); };
  const speakCur = () => { if (!playing || !items[idx]) { if (idx >= items.length) AA.oral.stop(); return; } mark(); ui2(); const k = idx; A.speak(clean(items[idx]), () => { if (playing && idx === k) { idx++; speakCur(); } }); };
  AA.oral.stop = () => { playing = false; A.stop(); items.forEach(x => x.classList.remove("oral-on")); if (bar) { bar.remove(); bar = null; } };
  AA.oral.start = root => {
    if (!A.canSpeak || !root) { fx.toast(t("oral.noT"), t("set.noVoice"), "sound"); return; }
    AA.oral.stop(); items = collect(root); if (!items.length) return; idx = 0; playing = true;
    bar = document.createElement("div"); bar.className = "oral-bar glass"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", t("oral.title"));
    bar.innerHTML = `<span class="or-ic">${AA.icon("sound")}</span><span class="grow"><b>${t("oral.title")}</b><span class="xs muted" id="orPos"></span></span>
      <button class="iconbtn" id="orPrev" aria-label="${t("oral.prev")}">${AA.icon("back")}</button><button class="iconbtn or-main" id="orPlay" aria-label="${t("oral.play")}"></button><button class="iconbtn" id="orNext" aria-label="${t("oral.next")}">${AA.icon("next")}</button>
      <button class="chip" id="orRate" aria-label="${t("set.voice")}"></button><button class="iconbtn" id="orStop" aria-label="${t("oral.stop")}">${AA.icon("close")}</button>`;
    document.body.appendChild(bar);
    bar.querySelector("#orPlay").onclick = () => { playing = !playing; if (playing) speakCur(); else { A.stop(); mark(); ui2(); } };
    bar.querySelector("#orPrev").onclick = () => { idx = Math.max(0, idx - 1); A.stop(); playing = true; speakCur(); };
    bar.querySelector("#orNext").onclick = () => { idx = Math.min(items.length - 1, idx + 1); A.stop(); playing = true; speakCur(); };
    bar.querySelector("#orRate").onclick = () => { const r = S().profile.voiceRate || 1, k = RATES.indexOf(r); S().profile.voiceRate = RATES[(k + 1) % RATES.length]; AA.store.save(false, true); ui2(); if (playing) { A.stop(); playing = true; speakCur(); } };
    bar.querySelector("#orStop").onclick = AA.oral.stop;
    items.forEach((x, k) => { x.classList.add("oral-item"); x.onclick = e => { if (e.target.closest("a,button")) return; idx = k; A.stop(); playing = true; speakCur(); }; });
    speakCur();
  };
  AA.oral.btn = () => A.canSpeak ? `<button class="btn ghost sm oral-btn" data-oral>${AA.icon("sound")} ${t("oral.listen")}</button>` : "";
  document.addEventListener("click", e => { if (e.target.closest("[data-oral]")) { e.preventDefault(); AA.oral.start(document.querySelector(".lesson-body")); } });
  addEventListener("hashchange", () => AA.oral.stop());
  /* Questions lues automatiquement (réglage). */
  AA.oral.quizHook = (q, answered, okNow) => {
    if (!S().profile.autoRead || !A.canSpeak) return;
    if (!answered) { const r = document.querySelector("#qc .qread"); if (r) A.speak(r.textContent); }
    else A.speak((okNow ? t("oral.ok") : t("oral.bad") + " " + q.c[q.a] + ". ") + " " + (q.e || ""));
  };
})();
