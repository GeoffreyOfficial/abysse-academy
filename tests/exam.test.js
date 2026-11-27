#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · couverture des examens blancs (2.5)
   Pour chaque niveau et chaque format, sur 12 tirages :
   - tous les thèmes du niveau sont interrogés (2 questions minimum en
     examen complet, 1 en express), même ceux qui ne sont pas lus ;
   - dans un thème, les questions viennent de notions différentes ;
   - pas de doublon, le bon nombre de questions, des calculs ;
   - sur l'ensemble des tirages, l'essentiel des notions est couvert ;
   - l'examen est exigeant : une bonne part de questions difficiles.
   node tests/exam.test.js
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

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch(); let fails = 0, checks = 0;
  try {
    const p = await b.newPage(); const errs = []; p.on("pageerror", e => errs.push(e.message));
    await p.goto(URL); await p.waitForFunction(() => window.AA && AA.router && AA.router.name && AA.quiz && AA.quiz.examPlan);
    const rep = await p.evaluate(() => {
      const C = AA.content, T = AA.tutor, Q = AA.quiz, out = [];
      const worlds = C.worlds.filter(w => !w.soon && C.inWorld(w.id).length >= 2);
      worlds.forEach(w => [true, false].forEach(full => {
        const mods = C.inWorld(w.id), min = full ? 2 : 1, seenN = new Set(), allN = new Set();
        mods.forEach(m => m.quiz.forEach(q => allN.add(T.notionOf(q))));
        let hard = 0, tot = 0, calcs = 0;
        for (let k = 0; k < 12; k++) {
          const qs = Q.examPlan(w.id, full), ids = qs.filter(q => q.id && !q.calc).map(q => q.id);
          if (new Set(ids).size !== ids.length) out.push(`${w.short} ${full ? "complet" : "express"} : question en double`);
          const want = full ? 40 : 20, poss = mods.reduce((a, m) => a + m.quiz.length, 0);
          if (qs.length < Math.min(want, poss)) out.push(`${w.short} ${full ? "complet" : "express"} : ${qs.length} questions au lieu de ${want}`);
          mods.forEach(m => {
            const mine = qs.filter(q => q.m === m.id && !q.calc && !q.gen);
            if (mine.length < Math.min(min, m.quiz.length)) out.push(`${w.short} ${full ? "complet" : "express"} : thème « ${m.title} » interrogé ${mine.length} fois`);
            const ns = new Set(mine.map(q => T.notionOf(q)));
            if (full && mine.length >= 2 && ns.size < 2 && new Set(m.quiz.map(q => T.notionOf(q))).size >= 2) out.push(`${w.short} complet : « ${m.title} » ne teste qu’une notion`);
            mine.forEach(q => seenN.add(T.notionOf(q)));
          });
          qs.forEach(q => { if (q.calc || q.gen) calcs++; else { tot++; if (Q.examHard(q) >= 1) hard++; } });
        }
        const cov = seenN.size / allN.size;
        if (full && cov < .8) out.push(`${w.short} complet : ${Math.round(cov * 100)} % des notions vues en 12 examens (mini 80 %)`);
        if (hard / tot < .4) out.push(`${w.short} ${full ? "complet" : "express"} : seulement ${Math.round(hard / tot * 100)} % de questions exigeantes (mini 40 %)`);
        out.push(`ok ${w.short} ${full ? "complet" : "express"} : ${mods.length} thèmes, notions vues ${Math.round(cov * 100)} %, exigeantes ${Math.round(hard / tot * 100)} %, calculs ${Math.round(calcs / 12)}`);
      }));
      return out;
    });
    rep.forEach(x => { checks++; if (x.startsWith("ok ")) console.log("  ✓ " + x.slice(3)); else { fails++; console.error("  ✗ " + x); } });
    errs.forEach(e => { fails++; console.error("  ✗ erreur JS " + e); });
  } finally { await b.close(); server.close(); }
  console.log(`\n${checks} vérifications. ${fails ? fails + " échec(s)." : "Tout est vert."}`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
