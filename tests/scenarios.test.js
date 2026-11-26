#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · scénarios difficiles
   Situations réelles qui cassent souvent une appli : quitter un quiz au
   milieu, revenir en arrière, changer les réglages pendant un examen,
   perdre le réseau, recharger au pire moment, deux onglets ouverts,
   mémoire pleine, sauvegarde abîmée, changement de jour ou de semaine,
   clics en rafale, saisies énormes.
   node tests/scenarios.test.js
   ===================================================================== */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require("@playwright/test")); }
const ROOT = path.resolve(__dirname, ".."), PORT = 8793, URL = `http://localhost:${PORT}/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
let fails = 0; const errs = [];
const ok = (c, m) => { if (c) console.log("  ✓ " + m); else { fails++; console.error("  ✗ " + m); } };
const ready = p => p.waitForFunction(() => window.AA && AA.router && AA.router.name && document.documentElement.classList.contains("ready"), null, { timeout: 15000 });
async function page(ctx, w) {
  const p = await ctx.newPage(); if (w) await p.setViewportSize({ width: w, height: 844 });
  p.on("pageerror", e => errs.push(e.message));
  p.on("console", m => { if (m.type() === "error" && !/vibrate|favicon|net::|Failed to load/.test(m.text())) errs.push(m.text()); });
  p.on("dialog", d => { errs.push("dialog " + d.message()); d.dismiss().catch(() => {}); });
  return p;
}
const seed = p => p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Scén"; S.xp = 800; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; AA.path.applyLevel("n1"); S.profile.goal = "n2"; S.unlockAll = true; AA.store.save(); });
const fresh = async (b, w) => { const ctx = await b.newContext({ viewport: { width: w || 390, height: 844 } }); await ctx.route(u => !u.href.startsWith(URL), r => r.abort()); const p = await page(ctx); await p.goto(URL); await ready(p); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(150); return { ctx, p }; };
const answers = p => p.evaluate(() => Object.values(AA.S.stats).reduce((a, v) => a + v.n, 0));
const overflow = p => p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
const answerOne = async p => { const c = await p.$(".choice:not([disabled])"); if (c) await c.click(); await p.waitForTimeout(80); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(80); };

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch();
  try {
    console.log("• Quitter et revenir");
    { const { ctx, p } = await fresh(b);
      await p.goto(URL + "#/lesson/pression/essentiel"); await p.waitForTimeout(200);
      await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); await p.waitForTimeout(250);
      for (let i = 0; i < 3; i++) await answerOne(p);
      const n0 = await answers(p);
      await p.goBack(); await p.waitForTimeout(300); ok(await p.evaluate(() => AA.router.name !== "quiz" || !!document.querySelector(".qcard,.result")), "retour arrière pendant un quiz : écran cohérent");
      await p.goForward(); await p.waitForTimeout(300); ok(await p.evaluate(() => AA.router.name === "home" || !!document.querySelector(".qcard,.result,.pagehead,.card")), "avancer de nouveau : pas d’écran vide");
      ok(await answers(p) === n0, "aucune réponse comptée deux fois après retour/avancer");
      await p.goto(URL + "#/quiz"); await p.reload(); await ready(p); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.router.name !== "quiz" || !!document.querySelector(".qcard")), "recharger sur un quiz sans contexte : redirection propre");
      await p.goto(URL + "#/home"); await p.waitForTimeout(150);
      await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); await p.waitForTimeout(250);
      const before = await answers(p), ch = await p.$(".choice");
      await ch.click({ clickCount: 2 }); await ch.click({ force: true }).catch(() => {}); await p.waitForTimeout(200);
      ok(await answers(p) === before + 1, "triple clic sur une réponse : comptée une seule fois");
      await ctx.close(); }

    console.log("• Examen : réglages, minuterie, départ en cours");
    { const { ctx, p } = await fresh(b);
      await p.evaluate(() => AA.quiz.exam(false, "n2")); await p.waitForTimeout(250);
      for (let i = 0; i < 3; i++) await answerOne(p);
      const idx = await p.evaluate(() => AA.ctx.idx);
      await p.evaluate(() => { const pr = AA.S.profile; pr.textSize = 1.4; pr.theme = "lagon"; pr.motion = false; AA.store.save(); AA.ui.applyTheme(); AA.a11y.apply(); });
      await p.waitForTimeout(200);
      ok(await p.evaluate(i => AA.router.name === "quiz" && AA.ctx.idx === i && !!document.querySelector(".qcard"), idx), "réglages changés pendant l’examen : on reste à la même question");
      ok(await overflow(p) <= 1, "examen en texte ×1,4 : rien ne déborde");
      await p.evaluate(() => (AA.ctx.timeLeft = 2)); await p.evaluate(() => (location.hash = "#/train")); await p.waitForTimeout(3200);
      ok(await p.evaluate(() => AA.router.name === "train"), "minuterie qui expire sur un autre écran : pas de retour forcé");
      await p.evaluate(() => AA.quiz.exam(false, "n2")); await p.waitForTimeout(200); await p.evaluate(() => (AA.ctx.timeLeft = 2)); await p.waitForTimeout(3300);
      ok(await p.$(".card.result") && await p.evaluate(() => AA.S.exams.length >= 1), "temps écoulé : copie rendue et résultat enregistré");
      const tmr = await p.evaluate(() => { const t = document.querySelector("#tmr"); return t ? t.textContent : ""; }); ok(!/-/.test(tmr), "aucun temps négatif affiché");
      await ctx.close(); }

    console.log("• Réseau coupé, rechargements");
    { const { ctx, p } = await fresh(b);
      await p.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 10000 }).catch(() => {});
      await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); await p.waitForTimeout(250);
      await answerOne(p); await answerOne(p);
      await ctx.setOffline(true); await answerOne(p); await answerOne(p);
      const n = await answers(p);
      await p.reload().catch(() => {}); const back = await ready(p).then(() => true, () => false);
      ok(back, "réseau coupé au milieu d’un quiz puis rechargement : l’appli revient");
      ok(back && await answers(p) === n, "les réponses données hors ligne sont gardées (" + n + ")");
      await p.goto(URL + "#/brief/gp").catch(() => {}); await p.waitForTimeout(300); ok(await p.$(".br-card"), "briefing hors ligne");
      await p.click(".br-it"); await p.reload().catch(() => {}); await ready(p).catch(() => {}); await p.waitForTimeout(300);
      ok(await p.$(".br-card"), "rechargement au milieu d’un briefing : nouveau briefing, pas d’écran vide");
      await p.goto(URL + "#/club").catch(() => {}); await p.waitForTimeout(250); await p.click("#clnew"); await p.waitForTimeout(250);
      for (let i = 0; i < 14 && !(await p.$(".card.result")); i++) { const c = await p.$(".choice:not([disabled])"); if (c) await c.click(); await p.waitForTimeout(60); }
      ok(await p.$(".cl-code textarea"), "duel à distance joué hors ligne : code obtenu");
      await ctx.setOffline(false); await ctx.close(); }

    console.log("• Deux onglets ouverts");
    { const { ctx, p } = await fresh(b);
      const p2 = await page(ctx); await p2.goto(URL + "#/profile"); await ready(p2); await p2.waitForTimeout(200);
      await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); await p.waitForTimeout(200);
      for (let i = 0; i < 4; i++) await answerOne(p);
      const xpA = await p.evaluate(() => AA.S.xp), nA = await answers(p);
      await p2.waitForTimeout(300);
      await p2.evaluate(() => { AA.S.profile.name = "Autre onglet"; AA.store.save(); }); await p2.waitForTimeout(200);
      await p.reload(); await ready(p);
      ok(await p.evaluate(() => AA.S.xp) >= xpA && await answers(p) >= nA, "l’onglet resté ouvert n’efface pas la progression de l’autre");
      ok(await p.evaluate(() => AA.S.profile.name) === "Autre onglet", "et sa modification est bien gardée");
      await ctx.close(); }

    console.log("• Mémoire pleine, sauvegarde abîmée");
    { const { ctx, p } = await fresh(b);
      await p.evaluate(() => { const o = Storage.prototype.setItem; window.__lsOrig = o; Storage.prototype.setItem = function () { const e = new Error("quota"); e.name = "QuotaExceededError"; throw e; }; });
      await p.evaluate(() => AA.quiz.module(AA.content.byId.pression)); await p.waitForTimeout(200);
      for (let i = 0; i < 3; i++) await answerOne(p);
      ok(await p.evaluate(() => AA.router.name === "quiz"), "mémoire du navigateur pleine : le quiz continue");
      await p.evaluate(() => (Storage.prototype.setItem = window.__lsOrig)); await ctx.close(); }
    { const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await page(ctx);
      await p.goto(URL); await ready(p); await seed(p);
      await p.evaluate(() => localStorage.setItem("abysse-academy", "{\"xp\": 12, \"profile\": nul")); await p.reload();
      ok(await ready(p).then(() => true, () => false), "sauvegarde abîmée (JSON coupé) : l’appli démarre");
      await p.evaluate(() => localStorage.setItem("abysse-academy", JSON.stringify({ schema: 4, xp: "beaucoup", profile: null, stats: [], days: "hier", themes: 5 }))); await p.reload();
      ok(await ready(p).then(() => true, () => false) && await p.evaluate(() => typeof AA.S.xp === "number" && isFinite(AA.S.xp)), "sauvegarde aux types faux : l’appli démarre avec des valeurs saines");
      for (const r of ["home", "profile", "quests", "map/n2", "train", "club"]) { await p.evaluate(r => (location.hash = "#/" + r), r); await p.waitForTimeout(150); }
      ok(await p.evaluate(() => !!document.querySelector("#view").innerHTML.length), "et tous les écrans principaux s’ouvrent");
      await ctx.close(); }

    console.log("• Changement de jour et de semaine");
    { const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await page(ctx);
      await p.clock.install({ time: new Date("2026-11-29T23:59:50") });
      await p.goto(URL); await ready(p); await seed(p); await p.reload(); await ready(p);
      const w1 = await p.evaluate(() => { AA.v19.week().c.ans = 40; AA.store.save(); return AA.v19.isoWeek(); });
      await p.clock.fastForward(30000); await p.evaluate(() => (location.hash = "#/home")); await p.waitForTimeout(200); await p.evaluate(() => (location.hash = "#/quests")); await p.waitForTimeout(300);
      const w2 = await p.evaluate(() => AA.v19.isoWeek()), c2 = await p.evaluate(() => AA.v19.week().c.ans || 0);
      ok(w1 !== w2 && c2 === 0 && await p.$(".wk-full"), "minuit le dimanche : nouveaux défis de la semaine, compteurs remis à zéro");
      await p.clock.setSystemTime(new Date("2026-12-01T09:00:00")); await p.evaluate(() => (location.hash = "#/home")); await p.waitForTimeout(150); await p.evaluate(() => (location.hash = "#/quests")); await p.waitForTimeout(300);
      ok(await p.$(".ev-card") && /Avent/.test(await p.textContent(".ev-card")), "1er décembre : l’événement « Calendrier de l’Avent » apparaît");
      await ctx.close(); }

    console.log("• Clics en rafale, navigation frénétique");
    { const { ctx, p } = await fresh(b);
      const tabs = ["home", "map/n2", "train", "lab", "profile"];
      for (let i = 0; i < 40; i++) await p.evaluate(r => (location.hash = "#/" + r), tabs[i % 5]);
      await p.waitForTimeout(900);
      ok(await p.evaluate(() => AA.router.name === "profile" && document.querySelectorAll("#view .pagehead, #view .prof-hero, #view h1").length >= 1), "40 changements d’onglet en rafale : le bon écran à la fin");
      ok(await p.evaluate(() => document.querySelectorAll("#view > *").length < 60 && document.querySelectorAll(".sheet-wrap").length === 0), "pas d’écran ni de panneau en double");
      await p.goto(URL + "#/home"); await p.waitForTimeout(200);
      for (let i = 0; i < 8; i++) await p.click("button.pill.xp", { force: true }).catch(() => {});
      await p.waitForTimeout(200); ok(await p.evaluate(() => document.querySelectorAll(".sheet-wrap").length) <= 1, "8 clics sur le compteur d’XP : un seul panneau");
      await p.keyboard.press("Escape"); await p.waitForTimeout(100);
      await p.goto(URL + "#/sim"); await p.waitForTimeout(300);
      const go = await p.$("#spp"); if (go) await go.click().catch(() => {}); await p.waitForTimeout(500);
      await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(300); await p.setViewportSize({ width: 300, height: 700 }); await p.waitForTimeout(300);
      await p.goto(URL + "#/home"); await p.waitForTimeout(800); await p.goto(URL + "#/sim"); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.router.name === "sim" && document.documentElement.scrollWidth - innerWidth <= 1), "simulateur : redimensionné, quitté puis repris sans casse");
      await ctx.close(); }

    console.log("• Saisies extrêmes");
    { const { ctx, p } = await fresh(b, 320);
      await p.evaluate(() => { AA.S.profile.name = "Maximilien-Alexandre 🐠🤿🐙 de la Grande Barrière".slice(0, 60); AA.store.save(); });
      for (const r of ["home", "profile", "club", "carnet", "quests"]) { await p.goto(URL + "#/" + r); await p.waitForTimeout(250); ok(await overflow(p) <= 1, "nom très long, écran " + r + " à 320 px : rien ne déborde"); }
      await p.goto(URL + "#/club"); await p.waitForTimeout(200);
      const t0 = Date.now(); await p.fill("#clin", "x".repeat(400000) + "AAD1." + "A".repeat(20) + ".abcd"); await p.click("#clgo"); await p.waitForTimeout(200);
      ok(Date.now() - t0 < 4000 && /trouvé|modifié|incomplet|reconnu/.test(await p.textContent("#clout")), "code de 400 000 caractères : refus rapide, sans blocage");
      await p.goto(URL + "#/search/" + encodeURIComponent("<script>alert(1)</script>")); await p.waitForTimeout(300);
      ok(await p.evaluate(() => !document.querySelector("#view script")), "recherche avec du code : affiché comme du texte");
      await p.goto(URL + "#/backup"); await p.waitForTimeout(250);
      await p.evaluate(() => { const d = document.querySelector("details:has(#pastebox)"); if (d) d.open = true; });
      for (const junk of ["n’importe quoi {", "{\"xp\": 99999999", "AA3.zzzzzzzz", JSON.stringify({ app: "autre", xp: 5 })]) { await p.fill("#pastebox", junk, { force: true }).catch(() => p.evaluate(v => (document.querySelector("#pastebox").value = v), junk)); await p.evaluate(() => document.querySelector("#paste").click()); await p.waitForTimeout(300); await p.keyboard.press("Escape"); }
      ok(await p.evaluate(() => AA.S.profile.name.startsWith("Maximilien")), "import d’une sauvegarde invalide : rien n’est écrasé");
      await ctx.close(); }
  } finally { await b.close(); server.close(); }
  ok(!errs.length, "aucune erreur JavaScript" + (errs.length ? " → " + [...new Set(errs)].slice(0, 6).join(" | ") : ""));
  console.log(fails ? `\n${fails} échec(s).` : "\nTout est vert.");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
