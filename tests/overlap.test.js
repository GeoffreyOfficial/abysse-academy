#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · chevauchements (2.5)
   Sur chaque écran, en petit mobile avec gros texte, en mobile clair et
   sur PC : aucun bouton, titre, texte ou barre ne doit en recouvrir un
   autre. Une série « à reprendre » est créée pour tester la carte de
   l'accueil. Les schémas, décors et animations sont ignorés.
   node tests/overlap.test.js [rapide]
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8794, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
const FAST = process.argv[2] === "rapide";
const SCREENS = ["home", "map/n2", "map/n4", "train", "flash", "lab", "sim", "pc", "scen", "scen/s1", "calc", "tables", "profile", "club", "settings", "cours", "cours/n3", "progres", "progres/n3", "moniteur", "search/palier", "jeux", "jeux/n2", "aquarium", "quests", "story", "story/n1-mer", "story/rifap-port", "diagnostic", "boss/n2", "boss/n1", "gardien/pression", "paires", "vraifaux", "glossary", "mistakes", "backup", "parcours", "cursus", "cursus/e2", "carnet", "examen", "examen/n3/quick", "fiches/n2", "brief", "brief/gp", "brief/auto", "succ", "succ/go", "reports", "sources", "valider", "procs"];
const CASES = [[320, 1.4, "minuit"], [390, 1, "nacre"], [1366, 1, "abysse"]];

function scan() {
  const SKIP = ".sticky-cta, #scene, #bubbles, .diagram, svg, .map-scene, .aquarium, .aq-tank, .tank, .boss-art, .decor, #diver, .toast, .toasts, .sheet-wrap, [aria-hidden='true'], .sr-only, .visually-hidden, .reveal:not(.in), .face.back, .rip, .flip";
  const SEL = "button, .btn, .chip, h1, h2, h3, h4, p, .eyebrow, .bar, .medal, select, textarea, label, .xs, .small, .tu-step, .choice";
  const els = [...document.querySelectorAll("#view " + SEL.split(", ").join(", #view "))].filter(e => {
    if (e.closest(SKIP) || (e.closest("details:not([open])") && !e.closest("summary"))) return false;
    const cs = getComputedStyle(e); if (cs.display === "inline" || cs.display === "contents" || cs.visibility === "hidden") return false;
    if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    const r = e.getBoundingClientRect(); return r.width > 3 && r.height > 3;
  }).map(e => [e, e.getBoundingClientRect()]);
  const name = e => e.tagName.toLowerCase() + ([...e.classList].slice(0, 2).map(c => "." + c).join("")) + (e.textContent.trim() ? " « " + e.textContent.trim().slice(0, 24) + " »" : "");
  const out = [];
  for (let i = 0; i < els.length && out.length < 3; i++) for (let j = i + 1; j < els.length && out.length < 3; j++) {
    const [a, ra] = els[i], [c, rc] = els[j];
    if (a.contains(c) || c.contains(a)) continue;
    const ix = Math.min(ra.right, rc.right) - Math.max(ra.left, rc.left), iy = Math.min(ra.bottom, rc.bottom) - Math.max(ra.top, rc.top);
    if (ix <= 3 || iy <= 3) continue;
    const area = ix * iy, small = Math.min(ra.width * ra.height, rc.width * rc.height);
    if (area > small * 0.2) out.push(name(a) + " / " + name(c));
  }
  return out;
}

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch(); const bad = [], errs = []; let n = 0;
  try {
    for (const [w, ts, theme] of CASES) {
      const ctx = await b.newContext({ viewport: { width: w, height: 820 } }); await ctx.addInitScript(() => { window.AA_NOGUARD = 1; }); const p = await ctx.newPage();
      p.on("pageerror", e => errs.push(`${w}px ${e.message}`));
      await p.goto(URL); await p.waitForFunction(() => window.AA && AA.router && AA.router.name);
      await p.evaluate(([ts, theme]) => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Maximilien-Alexandre"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.unlockAll = true; S.profile.textSize = ts; S.profile.motion = false; S.profile.theme = theme; S.profile.examDate = AA.u.addDays(30); S.xp = 123456; AA.store.save(); }, [ts, theme]);
      await p.reload(); await p.waitForFunction(() => document.documentElement.classList.contains("ready"));
      /* Une série « à reprendre » au titre long, pour la carte de l'accueil. */
      await p.evaluate(() => AA.quiz.start("place", AA.content.byId.pression.quiz.slice(0, 12), { world: "n2", title: "Test de positionnement · Niveau 2 complet" }));
      await p.waitForTimeout(400); await p.click(".choice"); await p.waitForTimeout(300);
      await p.evaluate(() => (location.hash = "#/home")); await p.waitForTimeout(400);
      const lessons = await p.evaluate(() => AA.content.modules.map(m => m.id));
      const routes = SCREENS.concat(FAST || w > 340 ? [] : lessons.map(id => `lesson/${id}/essentiel`));
      for (const r of routes) {
        await p.evaluate(r => (location.hash = "#/" + r), r); await p.waitForTimeout(r.startsWith("map") ? 450 : 120);
        await p.waitForFunction(() => !document.querySelector(".view-enter"), null, { timeout: 1500 }).catch(() => {}); n++;
        const out = await p.evaluate(scan);
        if (r === "home" && !(await p.$(".run-card"))) bad.push("accueil : la carte « À reprendre » n’apparaît pas");
        out.forEach(x => bad.push(`${r} à ${w}px (${theme}, texte ×${ts}) : ${x}`));
      }
      await ctx.close();
    }
  } finally { await b.close(); server.close(); }
  bad.forEach(x => console.error("  ✗ " + x)); [...new Set(errs)].slice(0, 10).forEach(x => console.error("  ✗ erreur JS " + x));
  console.log(`\n${n} écrans vérifiés. ${bad.length + errs.length ? bad.length + errs.length + " chevauchement(s) ou erreur(s)." : "Aucun chevauchement."}`);
  process.exit(bad.length + errs.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
