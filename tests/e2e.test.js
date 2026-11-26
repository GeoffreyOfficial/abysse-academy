#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · tests de bout en bout (navigateur Chromium)
   npm test   (ou : node tests/e2e.test.js)
   Lance un petit serveur sur le dossier, puis vérifie :
   - premier lancement, tous les écrans, sans erreur ni débordement
     horizontal, à plusieurs largeurs (petit téléphone → 4K) ;
   - un quiz complet, le mode 5 minutes, un boss, une aventure ;
   - reprise des anciennes sauvegardes (Ardoise N2 et schéma 2) ;
   - export/import, fusion, code de transfert compressé ;
   - fonctionnement hors ligne (service worker).
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8790, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
let fails = 0; const errs = [];
const ok = (c, m) => { if (c) console.log("  ✓ " + m); else { fails++; console.error("  ✗ " + m); } };
const WIDTHS = [[280, 653], [390, 844], [884, 1104], [1440, 900], [3840, 2160]];
const ROUTES = ["home", "map/n2", "lesson/pression", "lesson/dalton/approfondir", "train", "flash", "lab", "sim", "scen", "calc", "tables", "profile", "quests", "club", "settings", "aquarium", "story", "story/anse", "boss/n2", "search/palier", "glossary", "mistakes", "backup"];

async function newPage(b, w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
  p.on("pageerror", e => errs.push(`${w}px ${e.message}`));
  p.on("console", m => { if (m.type() === "error" && !/vibrate|favicon/.test(m.text())) errs.push(`${w}px ${m.text()}`); });
  return { ctx, p };
}
const ready = p => p.waitForFunction(() => window.AA && AA.router && AA.router.name && document.documentElement.classList.contains("ready"));
const seed = async p => { await ready(p); return p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.xp = 500; AA.content.questions.slice(0, 30).forEach((q, i) => { S.stats[q.id] = { n: 2, ok: i % 2 }; if (i % 2) S.wrong[q.id] = { [(q.a + 1) % q.c.length]: 1 }; }); AA.store.save(true); }); };

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch();
  try {
    console.log("• Premier lancement");
    { const { ctx, p } = await newPage(b, 390, 844);
      await p.goto(URL); await p.waitForSelector("#onext");
      for (let i = 0; i < 5; i++) { if (i === 1) await p.fill("#oname", "Test"); await p.click("#onext"); await p.waitForTimeout(150); }
      ok(await p.evaluate(() => AA.router.name === "home" && AA.S.profile.onboarded), "accueil atteint après l’accueil en 5 étapes");
      await ctx.close(); }

    console.log("• Écrans et largeurs");
    for (const [w, h] of WIDTHS) {
      const { ctx, p } = await newPage(b, w, h); await p.goto(URL); await p.waitForTimeout(200); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      const bad = [];
      for (const r of ROUTES) { await p.goto(URL + "#/" + r); await p.waitForTimeout(r.startsWith("map") ? 700 : 220); const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ov > 1) bad.push(r + " (+" + ov + "px)"); }
      ok(!bad.length, `${w}px : aucun débordement horizontal${bad.length ? " → " + bad.join(", ") : ""}`);
      await ctx.close();
    }

    console.log("• Parties de jeu");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      /* Quiz d'un thème */
      await p.goto(URL + "#/lesson/pression"); await p.click("#dive"); await p.waitForTimeout(300);
      for (let i = 0; i < 10; i++) { await p.click(".choice >> nth=0"); await p.waitForTimeout(60); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(60); if (await p.$(".result")) break; }
      ok(await p.$(".result"), "quiz de thème jusqu’au résultat");
      /* 5 minutes */
      await p.goto(URL + "#/home"); await p.click("#five"); await p.waitForTimeout(300);
      for (let i = 0; i < 14 && !(await p.$(".result")); i++) {
        if (await p.$("#show")) { await p.click("#show"); await p.waitForTimeout(80); await p.click("#yes"); }
        else { await p.click(".choice >> nth=0"); await p.waitForTimeout(60); const n = await p.$("#nextq"); if (n) await n.click(); }
        await p.waitForTimeout(80);
      }
      ok(await p.$(".result") && await p.evaluate(() => AA.S.five >= 1), "session 5 minutes terminée et comptée");
      /* Boss (tout débloqué) : réponses justes */
      await p.evaluate(() => { AA.S.unlockAll = true; AA.store.save(true); });
      await p.goto(URL + "#/boss/n2"); await p.click("#fight"); await p.waitForTimeout(300);
      for (let i = 0; i < 30 && !(await p.$(".boss-result")); i++) {
        const a = await p.evaluate(() => { const it = AA.ctx.items[AA.ctx.idx]; return it ? it.q.a : 0; });
        await p.click(`.choice[data-ci="${a}"]`); await p.waitForTimeout(60); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(60);
      }
      ok(await p.evaluate(() => !!(AA.S.boss.n2 || {}).won), "boss N2 vaincu, monde RIFAP ouvert : " + await p.evaluate(() => AA.game.worldOpen("rifap")));
      /* Aventure : toujours le bon choix */
      await p.goto(URL + "#/story/anse"); await p.waitForTimeout(200);
      for (let i = 0; i < 20 && !(await p.$(".story-end")); i++) {
        const k = await p.evaluate(() => { const c = AA.ctx.story, s = AA.content.storyById[c.id]; return s.nodes[c.node].choices.findIndex(x => x.ok); });
        await p.click(`.st-choice[data-i="${k}"]`); await p.waitForTimeout(80); await p.click("#stnext"); await p.waitForTimeout(120);
      }
      ok(await p.evaluate(() => !!(AA.S.story.anse || {}).done), "aventure « L’Anse aux Mérous » terminée");
      /* Recherche et glossaire */
      await p.goto(URL + "#/search"); await p.fill("#sq", "narcose"); await p.waitForTimeout(250);
      ok((await p.$$(".result")).length > 0, "la recherche trouve « narcose »");
      await p.goto(URL + "#/lesson/dalton"); await p.waitForTimeout(250);
      ok((await p.$$(".prose .gl")).length > 0, "mots du glossaire cliquables dans un cours");
      await ctx.close(); }

    console.log("• Sauvegardes");
    { const { ctx, p } = await newPage(b, 390, 844);
      await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem("ardoise-n2-v1", JSON.stringify({ xp: 321, pseudo: "Ancien", themes: { pression: { best: 90, tries: 1 } }, stats: {}, days: [] })); });
      await p.reload(); await ready(p); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.S.xp === 321 && AA.S.profile.name === "Ancien" && AA.S.schema === AA.store.SCHEMA), "reprise d’une sauvegarde Ardoise N2");
      await p.evaluate(() => { localStorage.setItem("abysse-academy", JSON.stringify({ schema: 2, xp: 777, profile: { name: "V1", onboarded: true }, themes: {}, stats: {} })); });
      await p.reload(); await ready(p); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.S.xp === 777 && AA.S.schema === 3 && AA.S.aqua && AA.S.profile.textSize === 1), "migration du schéma 2 vers 3 sans perte");
      const r = await p.evaluate(async () => {
        const code = await AA.store.toCodeAsync(), back = await AA.store.fromCodeAsync("https://x/#/import/" + code);
        const a = AA.store.parse(AA.store.exportText()); const b2 = AA.u.clone(a); b2.xp = 50; b2.themes = { dalton: { best: 100, tries: 3 } }; b2.savedAt = a.savedAt + 1000;
        const m = AA.store.merge(a, b2);
        return { code: code.startsWith("AA3.") || !AA.store.canCompress, round: back && back.xp === AA.S.xp, merge: m.xp === a.xp && m.themes.dalton && m.themes.dalton.best === 100 };
      });
      ok(r.code && r.round, "code de transfert compressé : aller-retour");
      ok(r.merge, "fusion : XP maximal et thèmes des deux côtés");
      await ctx.close(); }

    console.log("• Hors ligne");
    { const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
      await p.goto(URL); await p.waitForTimeout(300); await seed(p);
      await p.evaluate(() => navigator.serviceWorker.ready); await p.reload(); await p.waitForTimeout(1500);
      await ctx.setOffline(true); await p.reload().catch(() => {});
      const back = await p.waitForFunction(() => window.AA && AA.router && AA.router.name, null, { timeout: 8000 }).then(() => true, () => false);
      ok(back, "l’appli se recharge sans réseau");
      await p.goto(URL + "#/lesson/deco"); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.router.name === "lesson"), "un cours s’ouvre hors ligne");
      await ctx.close(); }
  } finally {
    await b.close(); server.close();
  }
  ok(!errs.length, "aucune erreur JavaScript" + (errs.length ? " → " + [...new Set(errs)].slice(0, 6).join(" | ") : ""));
  console.log(fails ? `\n${fails} échec(s).` : "\nTout est vert.");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
