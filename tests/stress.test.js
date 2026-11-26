#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · tests de robustesse (« testeur fou »)
   node tests/stress.test.js [nbParcours] [pasParParcours]
   Chaque parcours : un utilisateur qui clique partout au hasard, revient
   en arrière, recharge, coupe le réseau, change la taille de l'écran et
   les réglages en cours de route, tape n'importe quoi dans les champs.
   Après chaque action, on vérifie : aucune erreur JavaScript, un écran
   affiché, pas de débordement horizontal, une sauvegarde lisible, pas de
   fenêtre fantôme. Les temps d'affichage et les blocages (> 200 ms) sont
   mesurés. Le hasard est reproductible (graine affichée).
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8791, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
const RUNS = +process.argv[2] || 12, STEPS = +process.argv[3] || 220;
const OUT = process.env.STRESS_OUT || path.join(require("os").tmpdir(), "abysse-stress");
const WIDTHS = [[280, 653], [360, 740], [390, 844], [600, 900], [884, 1104], [1024, 768], [1440, 900], [1920, 1080], [2560, 1440]];
const ROUTES = ["home", "map/n2", "map/n3", "map/decouverte", "lesson/pression", "lesson/dalton/approfondir", "lesson/deco", "lesson/mariotte/memo", "train", "flash", "lab", "sim", "pc", "scen", "scen/s1", "calc", "tables", "profile", "quests", "club", "settings", "aquarium", "story", "story/anse", "boss/n2", "search/palier", "glossary", "mistakes", "backup", "parcours", "cursus", "cursus/e2", "carnet", "examen", "examen/n3/quick", "fiches/n2", "brief", "brief/gp", "brief/auto", "succ", "succ/go", "reports", "sources", "valider", "nimporte/quoi", "lesson/inexistant", "map/zzz", "examen/zz/zz", "fiches/zz", "club/d/AAD1.abc.zzzz", "club/c/pasuncode"];
const TEXTS = ["", "Geoffrey", "😀🐠🤿", "<img src=x onerror=alert(1)>", "a".repeat(300), "-5", "1e9", "  ", "'; DROP TABLE", "20", "0", "3.5", "AAD1.xxxx.yyyy"];
/* Éléments qu'on ne touche pas : effacement total, liens externes, Google. */
const AVOID = '#rsgo, #don, #dsync, [href^="http"], [target="_blank"], #install, #dlapp';
const CLICKABLE = 'button, a[href], .choice, .tile, .opt, summary, label.switch, input[type=checkbox], [role=tab], .node, .br-it, [data-k]';

function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

async function run(b, seed) {
  const R = rng(seed), pick = a => a[Math.floor(R() * a.length)];
  let [w, h] = pick(WIDTHS);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, acceptDownloads: true });
  await ctx.route(u => !u.href.startsWith(URL), r => r.abort());
  const p = await ctx.newPage(), problems = [], trace = [], errs = [];
  p.on("pageerror", e => errs.push(e.message));
  p.on("console", m => { if (m.type() === "error" && !/vibrate|favicon|ERR_INTERNET_DISCONNECTED|ERR_FAILED|net::|Failed to load resource|gsi\/client|chrome-error/.test(m.text())) errs.push(m.text()); });
  p.on("dialog", d => { errs.push("boîte de dialogue du navigateur : " + d.message()); d.dismiss().catch(() => {}); });
  p.on("popup", pp => pp.close().catch(() => {}));
  ctx.on("page", pp => { if (pp !== p) pp.close().catch(() => {}); });
  await p.addInitScript(() => {
    window.__long = 0; window.__longMax = 0;
    try { new PerformanceObserver(l => l.getEntries().forEach(e => { window.__long++; window.__longMax = Math.max(window.__longMax, e.duration); })).observe({ type: "longtask", buffered: true }); } catch (e) {}
    window.print = () => {};
  });
  const ready = () => p.waitForFunction(() => window.AA && AA.router && AA.router.name && document.documentElement.classList.contains("ready"), null, { timeout: 15000 });
  await p.goto(URL); await ready();
  await p.evaluate(sd => {
    const S = AA.S; S.profile.onboarded = true; S.profile.name = "Stress"; S.xp = 1200 + sd % 3000; S.evoSeen = 9; S.profile.driveNag = "2099-01-01";
    AA.path.applyLevel(["", "n1", "n2", "n3"][sd % 4]); S.profile.goal = ["n2", "n3", "n4", "e2"][sd % 4]; S.unlockAll = sd % 3 === 0;
    for (let i = 0; i < 12; i++) S.days.push(AA.u.addDays(-i)); S.days = [...new Set(S.days)].sort();
    AA.store.save();
  }, seed);
  await p.reload(); await ready();
  let offline = false, lastShot = 0;
  const say = a => { trace.push(a); if (trace.length > 18) trace.shift(); };
  const check = async label => {
    if (errs.length) { problems.push({ k: "erreur JS", m: errs.splice(0).join(" | "), at: label }); }
    let r;
    try {
      r = await p.evaluate(() => {
        const v = document.querySelector("#view"), sheets = document.querySelectorAll(".sheet-wrap:not(.cf)").length;
        let save = "ok"; try { const raw = localStorage.getItem("abysse-academy"); if (raw && !JSON.parse(raw)) save = "vide"; } catch (e) { save = "illisible"; }
        const S = window.AA && AA.S;
        return {
          name: window.AA && AA.router && AA.router.name, html: v ? v.innerHTML.length : 0, sheets,
          over: document.documentElement.scrollWidth - innerWidth, save,
          xp: S ? S.xp : null, json: (() => { try { JSON.stringify(S); return true; } catch (e) { return false; } })(),
          nan: S ? /NaN|undefined|\[object Object\]/.test(v ? v.innerText : "") : false,
          keys: v ? (v.innerText.match(/\b[a-z]{2,6}\.[a-z][A-Za-z0-9]{2,}\b/g) || []).filter(x => !/^(www|abysse|github|claude|fr|en)\./.test(x) && !/\.(js|css|html|json|md|io|com|fr|ai)$/.test(x)).slice(0, 3) : []
        };
      });
    } catch (e) { problems.push({ k: "page inaccessible", m: e.message.split("\n")[0], at: label }); return; }
    if (!r.name) problems.push({ k: "pas d’écran (routeur vide)", at: label });
    else if (r.html < 40 && r.name !== "quiz") problems.push({ k: "écran vide", m: r.name, at: label });
    if (r.over > 1) { await p.waitForTimeout(800); const o2 = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth).catch(() => 0); if (o2 > 1) { const who = await p.evaluate(() => { const W = innerWidth, out = []; document.querySelectorAll("#view *, .sheet *").forEach(n => { const r = n.getBoundingClientRect(); if (r.right > W + 1 && r.width < W * 3 && out.length < 3) out.push(n.tagName.toLowerCase() + "." + [...n.classList].slice(0, 3).join(".") + "(" + Math.round(r.right - W) + ")"); }); return out.join(" "); }).catch(() => ""); problems.push({ k: "débordement horizontal", m: `${r.name} +${o2}px à ${w}px : ${who}`, at: label }); } }
    if (r.sheets > 1) problems.push({ k: "fenêtres superposées", m: r.sheets + " panneaux", at: label });
    if (r.save !== "ok") problems.push({ k: "sauvegarde " + r.save, at: label });
    if (!r.json || typeof r.xp !== "number" || !isFinite(r.xp)) problems.push({ k: "état corrompu", m: "xp=" + r.xp, at: label });
    if (r.nan) problems.push({ k: "texte NaN/undefined affiché", m: r.name, at: label });
    if (r.keys.length) problems.push({ k: "clé de texte non traduite", m: r.name + " : " + r.keys.join(", "), at: label });
  };
  for (let i = 0; i < STEPS; i++) {
    const x = R(); let act = "";
    try {
      if (x < 0.56) {
        const els = await p.$$(`${CLICKABLE}`);
        const vis = [];
        for (const e of els) { if (vis.length > 80) break; if (await e.evaluate((n, av) => { if (n.matches(av) || n.closest(av) || n.disabled) return false; const r = n.getBoundingClientRect(); if (!r.width || !r.height) return false; const s = getComputedStyle(n); return s.visibility !== "hidden" && s.pointerEvents !== "none"; }, AVOID)) vis.push(e); }
        if (vis.length) {
          const e = pick(vis); act = "clic " + await e.evaluate(n => (n.id ? "#" + n.id : n.tagName.toLowerCase() + "." + [...n.classList].slice(0, 2).join(".")) + " « " + (n.innerText || n.getAttribute("aria-label") || "").trim().slice(0, 30) + " »");
          if (R() < 0.08) { await e.dblclick({ timeout: 1500, force: true }).catch(() => {}); act = "double-" + act; }
          else await e.click({ timeout: 1500, force: R() < 0.3 }).catch(() => {});
        }
      } else if (x < 0.64) { act = "retour arrière"; await p.goBack({ timeout: 4000 }).catch(() => {}); if (!p.url().startsWith(URL)) { act += " (sorti de l’appli : on y revient)"; await p.goto(URL + "#/home").catch(() => {}); await ready().catch(() => {}); } }
      else if (x < 0.67) { act = "avancer"; await p.goForward({ timeout: 4000 }).catch(() => {}); }
      else if (x < 0.76) { const r = pick(ROUTES); act = "adresse #/" + r; await p.evaluate(r => (location.hash = "#/" + r), r); }
      else if (x < 0.80) { [w, h] = pick(WIDTHS); act = "taille " + w + "×" + h; await p.setViewportSize({ width: w, height: h }); }
      else if (x < 0.83) { offline = !offline; act = offline ? "réseau coupé" : "réseau rétabli"; await ctx.setOffline(offline); }
      else if (x < 0.85) { act = "rechargement"; await p.reload({ timeout: 15000 }).catch(() => {}); await ready().catch(() => {}); }
      else if (x < 0.90) {
        const ins = await p.$$("input:not([type=checkbox]):not([type=range]):not([type=file]):not([readonly]), textarea:not([readonly])");
        if (ins.length) { const e = pick(ins), v = pick(TEXTS); act = "saisie « " + v.slice(0, 20) + " »"; await e.fill(v, { timeout: 1500 }).catch(() => {}); if (R() < 0.5) await e.press("Enter").catch(() => {}); else await e.evaluate(n => n.dispatchEvent(new Event("change", { bubbles: true }))).catch(() => {}); }
      } else if (x < 0.94) { const k = pick(["Escape", "Enter", "a", "b", "ArrowLeft", "ArrowRight", " ", "Tab", "1"]); act = "touche " + k; await p.keyboard.press(k); }
      else if (x < 0.98) {
        act = "réglages changés en cours de route";
        await p.evaluate(sd => { const S = AA.S, pr = S.profile; pr.textSize = AA.a11y.SIZES[sd % AA.a11y.SIZES.length]; pr.theme = AA.THEMES[sd % AA.THEMES.length].id; pr.motion = sd % 2 === 0; pr.scene = sd % 3 !== 0; pr.cvd = sd % 5 === 0; pr.sound = false; AA.store.save(); try { AA.ui.applyTheme(); AA.a11y.apply(); } catch (e) {} }, Math.floor(R() * 1000));
      } else {
        act = "rafale : 6 clics rapides au même endroit";
        const e = pick(await p.$$(".choice:not([disabled]), .opt:not([disabled]), .tile, .btn")); if (e) for (let k = 0; k < 6; k++) await e.click({ timeout: 400, force: true }).catch(() => {});
      }
    } catch (e) { act += " (exception : " + e.message.split("\n")[0] + ")"; }
    say(act);
    await p.waitForTimeout(25 + Math.floor(R() * 90));
    if (!p.url().startsWith(URL)) { say("(sorti de l’appli par retour arrière : on y revient)"); await p.goto(URL + "#/home").catch(() => {}); await ready().catch(() => {}); }
    const before = problems.length;
    await check(`#${i} ${act}`);
    if (problems.length > before) {
      problems.slice(before).forEach(pr => (pr.trace = trace.slice()));
      if (Date.now() - lastShot > 2000) { lastShot = Date.now(); fs.mkdirSync(OUT, { recursive: true }); await p.screenshot({ path: path.join(OUT, `s${seed}-${i}.png`) }).catch(() => {}); problems[problems.length - 1].shot = `s${seed}-${i}.png`; }
    }
  }
  const perf = await p.evaluate(() => ({ long: window.__long, longMax: Math.round(window.__longMax) })).catch(() => ({}));
  await ctx.close();
  return { seed, problems, perf };
}

/* Temps d'affichage de chaque écran (moyenne de 3 passages, téléphone et PC). */
async function timing(b) {
  const out = [];
  for (const [w, h] of [[390, 844], [1920, 1080]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    await p.goto(URL); await p.waitForFunction(() => window.AA && AA.router && AA.router.name);
    await p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "T"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.unlockAll = true; AA.store.save(); });
    await p.reload(); await p.waitForFunction(() => document.documentElement.classList.contains("ready"));
    for (const r of ROUTES.filter(r => !/zz|quoi|inexistant|AAD1|pasun/.test(r))) {
      let tot = 0, max = 0;
      for (let k = 0; k < 3; k++) {
        await p.evaluate(() => (location.hash = "#/home")); await p.waitForTimeout(120);
        const ms = await p.evaluate(r => new Promise(res => { const t0 = performance.now(); location.hash = "#/" + r; requestAnimationFrame(() => requestAnimationFrame(() => res(performance.now() - t0))); }), r);
        tot += ms; max = Math.max(max, ms);
      }
      out.push({ w, r, avg: Math.round(tot / 3), max: Math.round(max) });
    }
    await ctx.close();
  }
  return out;
}

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch();
  const base = +process.env.SEED || 1000, all = []; let long = 0, longMax = 0;
  try {
    for (let s = 0; s < RUNS; s++) {
      const res = await run(b, base + s); all.push(res); long += res.perf.long || 0; longMax = Math.max(longMax, res.perf.longMax || 0);
      console.log(`• parcours ${res.seed} : ${STEPS} actions, ${res.problems.length} problème(s), blocages > 50 ms : ${res.perf.long}, pire ${res.perf.longMax} ms`);
      const seen = new Set();
      res.problems.forEach(pr => { const k = pr.k + (pr.m || ""); if (seen.has(k)) return; seen.add(k); console.log(`  ✗ ${pr.k}${pr.m ? " : " + pr.m : ""}\n    à : ${pr.at}${pr.shot ? "  [" + pr.shot + "]" : ""}\n    avant : ${pr.trace.slice(-8).join(" → ")}`); });
    }
    if (!process.env.NOTIMING) {
      const tm = await timing(b), slow = tm.filter(x => x.max > 250).sort((a, b) => b.max - a.max);
      console.log(`• temps d’affichage : ${tm.length} mesures, moyenne ${Math.round(tm.reduce((a, x) => a + x.avg, 0) / tm.length)} ms`);
      slow.slice(0, 12).forEach(x => console.log(`  ⚠ ${x.r} à ${x.w}px : ${x.avg} ms (max ${x.max})`));
    }
  } finally { await b.close(); server.close(); }
  const n = all.reduce((a, r) => a + r.problems.length, 0);
  console.log(`\n${RUNS} parcours × ${STEPS} actions. Blocages > 50 ms : ${long}, le pire ${longMax} ms. ${n ? n + " problème(s)." : "Aucun problème."}`);
  process.exit(n ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
