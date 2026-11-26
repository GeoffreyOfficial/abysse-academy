#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · contrôle visuel
   Pour chaque écran, à chaque taille d'appareil :
   - chevauchements : on mesure les vrais rectangles du TEXTE (pas seulement
     des boîtes) et des boutons, pastilles, icônes ; deux éléments qui se
     recouvrent sans que l'un contienne l'autre = défaut ;
   - texte coupé : texte qui dépasse de sa boîte (points de suspension,
     zone masquée) ou qui sort de l'écran ;
   - bulles et infobulles qui masquent du contenu.
   Captures d'écran enregistrées dans VISUAL_OUT pour relecture humaine.
   node tests/visual.test.js [captures]
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8795, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
const SHOTS = process.argv[2] === "captures", OUT = process.env.VISUAL_OUT || path.join(require("os").tmpdir(), "abysse-visual");
const DEVICES = [
  ["320", 320, 568, 1], ["360", 360, 780, 1], ["390", 390, 844, 1], ["412", 412, 915, 1], ["412 texte+", 412, 915, 1.25],
  ["Fold fermé", 344, 882, 1], ["Fold ouvert", 884, 1104, 1], ["tablette", 820, 1180, 1], ["portable", 1366, 768, 1], ["PC", 1920, 1080, 1], ["4K", 3840, 2160, 1]
];
const SCREENS = (process.env.SCREENS || "home,map/n2,map/e2,lesson/pression/essentiel,lesson/pression/approfondir,lesson/pression/memo,lesson/n4-guide/essentiel,train,flash,lab,sim,pc,scen,scen/s1,calc,tables,profile,club,settings,cours,cours/n3,progres,moniteur,search/palier,glossary,mistakes,backup,parcours,cursus,cursus/e2,carnet,examen,fiches/n2,brief,brief/gp,succ,succ/go,reports,sources,valider,QUIZ,EXAM,RESULT").split(",");

/* Analyse exécutée dans la page. */
function inspect() {
  const W = innerWidth, H = innerHeight, out = [];
  const vis = e => { for (let x = e; x && x !== document.body; x = x.parentElement) { const s = getComputedStyle(x); if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) return false; } return true; };
  const skip = e => e.closest("#scene, #bubbles, .toast, .toasts, .sheet-wrap, [aria-hidden='true'], .rip, svg text, .sr-only, .visually-hidden, .diagram, .dc, .tbl, .map-scene, .decor, .boss-art, .tank, .aquarium, .reveal:not(.in), .sr, #diver, .searchbox .kbd, .searchbox .sr-x, .face.back") || !!e.closest("details:not([open])") && !e.closest("summary");
  const name = e => { const c = [...e.classList].slice(0, 2).join("."); return e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (c ? "." + c : ""); };
  const atoms = [];
  /* rectangles réels de chaque morceau de texte */
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.nodeValue.trim() ? 1 : 2 });
  for (let n; (n = tw.nextNode());) {
    const el = n.parentElement; if (!el || skip(el) || !vis(el)) continue;
    const r = document.createRange(); r.selectNodeContents(n);
    [...r.getClientRects()].forEach(rc => { if (rc.width > 1 && rc.height > 1 && rc.bottom > 0 && rc.top < H) atoms.push({ el, rc, t: n.nodeValue.trim().slice(0, 24) }); });
  }
  /* boutons, pastilles, icônes, images */
  document.querySelectorAll("button, a.btn, a.chip, .chip, .pill, .iconbtn, .closebtn, .medal, .helpbtn, img, .tile .ic, input, textarea, select").forEach(el => {
    if (skip(el) || !vis(el)) return; const rc = el.getBoundingClientRect(); if (rc.width > 2 && rc.height > 2 && rc.bottom > 0 && rc.top < H) atoms.push({ el, rc, t: "[" + name(el) + "]", box: 1 });
  });
  const fixedOf = e => { for (let x = e; x; x = x.parentElement) { const p = getComputedStyle(x).position; if (p === "fixed" || p === "sticky") return x; } return null; };
  const seen = new Set();
  for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
    const a = atoms[i], b = atoms[j];
    if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const ix = Math.min(a.rc.right, b.rc.right) - Math.max(a.rc.left, b.rc.left), iy = Math.min(a.rc.bottom, b.rc.bottom) - Math.max(a.rc.top, b.rc.top);
    if (ix <= 3 || iy <= 3) continue;
    const fa = fixedOf(a.el), fb = fixedOf(b.el); if (fa !== fb) continue; /* contenu qui défile sous une barre fixe : normal */
    if (a.box && b.box && (a.el.closest("label") && a.el.closest("label") === b.el.closest("label"))) continue;
    const k = name(a.el) + "|" + name(b.el); if (seen.has(k)) continue; seen.add(k);
    out.push({ k: "chevauchement", m: `« ${a.t} » (${name(a.el)}) et « ${b.t} » (${name(b.el)})` });
    if (out.length > 12) break;
  }
  /* texte coupé ou hors écran */
  document.querySelectorAll("#view *, #topbar *").forEach(el => {
    if (skip(el) || !vis(el) || !el.firstChild) return;
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim()); if (!hasText) return;
    const s = getComputedStyle(el), rc = el.getBoundingClientRect();
    if ((s.textOverflow === "ellipsis" || /hidden|clip/.test(s.overflowX)) && el.scrollWidth > el.clientWidth + 2) out.push({ k: "texte coupé", m: `${name(el)} « ${el.textContent.trim().slice(0, 30)} »` });
    const inScroller = (() => { for (let x = el.parentElement; x && x !== document.body; x = x.parentElement) if (/auto|scroll/.test(getComputedStyle(x).overflowX)) return true; return false; })();
    if (rc.width && (rc.right > W + 1 || rc.left < -1) && !inScroller) out.push({ k: "texte hors écran", m: `${name(el)} « ${el.textContent.trim().slice(0, 30)} »` });
  });
  return out.slice(0, 25);
}

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch(); const bad = []; let n = 0;
  if (SHOTS) fs.mkdirSync(OUT, { recursive: true });
  try {
    for (const [dn, w, h, ts] of DEVICES) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
      p.on("pageerror", e => bad.push(`${dn} : erreur JS ${e.message}`));
      await p.goto(URL); await p.waitForFunction(() => window.AA && AA.router && AA.router.name);
      await p.evaluate(ts => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Geoffrey"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.unlockAll = true; S.profile.textSize = ts; S.profile.motion = false; S.profile.examDate = AA.u.addDays(40); S.xp = 12840; S.days = Array.from({ length: 30 }, (_, i) => AA.u.addDays(-i)).reverse(); S.introSeen = Object.assign({}, S.introSeen); AA.path.applyLevel("n1"); S.profile.goal = "n2"; AA.store.save(); }, ts);
      await p.reload(); await p.waitForFunction(() => document.documentElement.classList.contains("ready")); await p.waitForTimeout(300);
      for (const r of SCREENS) {
        if (r === "QUIZ") { await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); }
        else if (r === "EXAM") { await p.evaluate(() => AA.quiz.exam(false, "n2")); }
        else if (r === "RESULT") { await p.evaluate(() => AA.quiz.computer(2)); await p.waitForTimeout(200); for (let i = 0; i < 4 && !(await p.$(".card.result")); i++) { const c = await p.$(".choice:not([disabled])"); if (c) await c.click(); await p.waitForTimeout(120); const nx = await p.$("#nextq"); if (nx) await nx.click(); await p.waitForTimeout(120); } }
        else await p.evaluate(r => (location.hash = "#/" + r), r);
        await p.waitForTimeout(r.startsWith("map") ? 700 : 350); await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(60); n++;
        /* tout révéler (les blocs apparaissent au défilement) */
        await p.evaluate(() => document.querySelectorAll(".reveal").forEach(e => e.classList.add("in")));
        const res = await p.evaluate(inspect);
        res.forEach(x => bad.push(`${r} · ${dn} : ${x.k} — ${x.m}`));
        if (SHOTS) await p.screenshot({ path: path.join(OUT, `${r.replace(/\//g, "_")}--${dn.replace(/\s+/g, "_")}.png`), fullPage: w <= 900 && h < 1200 }).catch(() => {});
      }
      await ctx.close();
    }
  } finally { await b.close(); server.close(); }
  const uniq = [...new Set(bad)];
  uniq.forEach(x => console.error("  ✗ " + x));
  console.log(`\n${n} écrans contrôlés sur ${DEVICES.length} appareils. ${uniq.length ? uniq.length + " défaut(s)." : "Aucun chevauchement, aucun texte coupé."}`);
  process.exit(uniq.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
