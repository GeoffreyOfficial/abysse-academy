#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · balayage visuel
   Chaque écran et chaque cours (tous les onglets), à toutes les largeurs
   (280 px → 4K) et aux tailles de texte extrêmes : aucun débordement
   horizontal, aucune erreur, aucun texte « undefined/NaN ».
   node tests/sweep.test.js [rapide]
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8792, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
const FAST = process.argv[2] === "rapide";
const SCREENS = ["home", "map/n2", "map/n4", "train", "flash", "lab", "sim", "pc", "scen", "scen/s1", "calc", "tables", "profile", "club", "settings", "cours", "cours/n3", "progres", "progres/n3", "moniteur", "search/palier", "jeux", "jeux/n2", "aquarium", "quests", "story", "boss/n2", "boss/n1", "gardien/pression", "paires", "vraifaux", "glossary", "mistakes", "backup", "parcours", "cursus", "cursus/e2", "carnet", "examen", "examen/n3/quick", "fiches/n2", "brief", "brief/gp", "brief/auto", "succ", "succ/go", "reports", "sources", "valider"];
const CASES = FAST ? [[280, 1.4], [390, 1], [1440, 1.25]] : [[280, 1], [280, 1.4], [360, 1.25], [390, 1.4], [600, 1.4], [884, 1.4], [1024, 1], [1440, 1.4], [3840, 1]];

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch(); const bad = [], errs = []; let n = 0;
  try {
    for (const [w, ts] of CASES) {
      const ctx = await b.newContext({ viewport: { width: w, height: 800 } }); await ctx.addInitScript(() => { window.AA_NOGUARD = 1; }); const p = await ctx.newPage();
      p.on("pageerror", e => errs.push(`${w}px ${e.message}`));
      await p.goto(URL); await p.waitForFunction(() => window.AA && AA.router && AA.router.name);
      await p.evaluate(ts => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Balayage"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.unlockAll = true; S.profile.textSize = ts; S.profile.motion = false; S.profile.examDate = AA.u.addDays(30); S.days = Array.from({ length: 120 }, (_, i) => AA.u.addDays(-i)).reverse(); S.xp = 123456; AA.store.save(); }, ts);
      await p.reload(); await p.waitForFunction(() => document.documentElement.classList.contains("ready"));
      const lessons = await p.evaluate(() => AA.content.modules.map(m => m.id));
      const routes = SCREENS.concat(FAST && w > 300 ? [] : lessons.flatMap(id => [`lesson/${id}/essentiel`, `lesson/${id}/approfondir`, `lesson/${id}/memo`]));
      for (const r of routes) {
        await p.evaluate(r => (location.hash = "#/" + r), r); await p.waitForTimeout(r.startsWith("map") ? 450 : 90); await p.waitForFunction(() => !document.querySelector(".view-enter"), null, { timeout: 1500 }).catch(() => {}); n++;
        const res = await p.evaluate(() => {
          const W = innerWidth, over = document.documentElement.scrollWidth - W, out = [];
          if (over > 1) document.querySelectorAll("#view *").forEach(e => { const rc = e.getBoundingClientRect(); if (rc.right > W + 1 && out.length < 2 && !e.closest(".tbl, .ttable, pre")) out.push(e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 2).join(".") + "(+" + Math.round(rc.right - W) + ")"); });
          const txt = (document.querySelector("#view") || {}).innerText || "";
          const items = [...document.querySelectorAll("#topbar .brand, #topbar .pill, #topbar .iconbtn, #topbar button")].filter(e => e.getBoundingClientRect().width > 0).map(e => [e, e.getBoundingClientRect()]);
          let clash = "";
          items.forEach(([a, ra], i) => items.slice(i + 1).forEach(([c, rc]) => { if (!clash && !a.contains(c) && !c.contains(a) && ra.left < rc.right - 2 && rc.left < ra.right - 2 && ra.top < rc.bottom - 2 && rc.top < ra.bottom - 2) clash = (a.className || a.tagName) + " / " + (c.className || c.tagName); }));
          if (clash) out.push("barre du haut : " + clash);
          return { over: clash ? Math.max(over, 2) : over, out: out.join(" "), nan: /\bNaN\b|\bundefined\b|\[object Object\]/.test(txt), name: AA.router.name };
        });
        if (res.over > 1) bad.push(`${r} à ${w}px, texte ×${ts} : +${res.over}px ${res.out}`);
        if (res.nan) bad.push(`${r} à ${w}px : « NaN/undefined » affiché`);
      }
      await ctx.close();
    }
  } finally { await b.close(); server.close(); }
  bad.forEach(x => console.error("  ✗ " + x)); [...new Set(errs)].slice(0, 10).forEach(x => console.error("  ✗ erreur JS " + x));
  console.log(`\n${n} écrans vérifiés. ${bad.length + errs.length ? bad.length + errs.length + " problème(s)." : "Tout est vert."}`);
  process.exit(bad.length + errs.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
