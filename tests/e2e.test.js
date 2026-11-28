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
const ROUTES = ["home", "map/n2", "lesson/pression", "lesson/dalton/approfondir", "train", "flash", "lab", "sim", "pc", "scen", "calc", "tables", "profile", "club", "settings", "cours", "cours/n3", "progres", "moniteur", "search/palier", "jeux", "jeux/n2", "aquarium", "quests", "story", "boss/n2", "boss/n1", "gardien/pression", "paires", "vraifaux", "glossary", "mistakes", "backup", "parcours", "map/decouverte", "map/n3", "lesson/n3-gaz", "lesson/nx-base", "reports", "sources", "valider", "lesson/mariotte", "cursus", "cursus/e2", "lesson/n3-cadre", "lesson/r-cas", "carnet", "examen", "examen/n3/quick", "fiches/n2", "fiches/e2/e2-evaluer", "brief", "brief/gp", "succ", "succ/go", "palier", "chasse", "signes", "sauvetage", "incident", "story/n2-guidee"];

async function newPage(b, w, h, rich) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
  /* Les anciens parcours répondent par QCM : sans procédures ni calculs à taper (testés à part). */
  if (!rich) await ctx.addInitScript(() => { window.AA_PLAIN = 1; });
  /* La garde de session (2.6.2) a son propre test : les anciens parcours naviguent librement. */
  await ctx.addInitScript(() => { window.AA_NOGUARD = 1; });
  p.on("pageerror", e => errs.push(`${w}px ${e.message}`));
  p.on("console", m => { if (m.type() === "error" && !/vibrate|favicon/.test(m.text())) errs.push(`${w}px ${m.text()}`); });
  return { ctx, p };
}
const ready = p => p.waitForFunction(() => window.AA && AA.router && AA.router.name && document.documentElement.classList.contains("ready"));
const seed = async p => { await ready(p); return p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.xp = 500; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; AA.path.applyLevel("n1"); S.profile.goal = "n2"; AA.content.inWorld("n2").forEach(m => (S.read[m.id] = { e: AA.u.today() })); AA.content.questions.slice(0, 30).forEach((q, i) => { S.stats[q.id] = { n: 2, ok: i % 2 }; if (i % 2) S.wrong[q.id] = { [(q.a + 1) % q.c.length]: 1 }; }); AA.store.save(true); }); };

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const b = await chromium.launch();
  try {
    console.log("• Premier lancement");
    { const { ctx, p } = await newPage(b, 390, 844);
      await p.goto(URL); await p.waitForSelector("#onext");
      for (let i = 0; i < 8 && await p.$("#onext"); i++) {
        if (i === 1) await p.fill("#oname", "Test");
        if (i === 2) { ok((await p.$$("[data-lv]")).length === 8, "accueil : 8 niveaux proposés (de « pas de niveau » à E2)"); await p.click('[data-lv="n3"]'); await p.waitForTimeout(120); }
        if (i === 3) await p.click('[data-dives="100"]');
        if (i === 4) { ok(await p.evaluate(() => document.querySelector('[data-om="review"][data-w="n2"]').getAttribute("aria-pressed") === "true" && document.querySelector('[data-om="learn"][data-w="n4"]').getAttribute("aria-pressed") === "true"), "accueil : parcours pré-réglé selon le niveau (N2 en révision, N4 à apprendre)"); await p.click('[data-om="skip"][data-w="decouverte"]'); await p.waitForTimeout(120); }
        if (i === 7) ok(!!await p.$("#odrive"), "étape « Protège ta progression » (Google Drive conseillé)");
        await p.click("#onext"); await p.waitForTimeout(150);
      }
      ok(await p.evaluate(() => AA.router.name === "home" && AA.S.profile.onboarded), "accueil atteint après l’accueil");
      ok(await p.evaluate(() => { const S = AA.S; return S.profile.level === "n3" && S.profile.goal === "n4" && S.certs.n2 && S.path.decouverte === "skip" && S.path.n1 === "review" && AA.path.expert() && AA.tutor.isRead("n3-gaz") && !AA.tutor.isRead("n4-guide") && !AA.game.inPlay("d-bapteme"); }), "niveau N3 : objectif N4, niveaux obtenus acquis, Découverte passée, expérience prise en compte");
      ok(await p.$(".place-card"), "accueil : test de positionnement proposé");
      await p.click("#plgo"); await p.waitForTimeout(250);
      for (let i = 0; i < 40 && !(await p.$(".result")); i++) { await p.click(".choice >> nth=0"); await p.waitForTimeout(40); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(40); }
      ok(await p.$(".result [data-pm]"), "test de positionnement : résultat par thème et choix de la suite");
      await p.click('[data-pm="review"]'); await p.waitForTimeout(250);
      ok(await p.evaluate(() => Object.keys(AA.S.placeDone).length === 1 && !AA.S.profile.placeAsk), "positionnement enregistré, parcours adapté");
      await ctx.close(); }

    console.log("• Mon parcours");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.game.inPlay("n1-signes") && AA.game.inPlay("d-bapteme") && AA.game.inPlay("pression") && !AA.game.inPlay("n3-gaz") && AA.game.unlocked("n3-gaz")), "profil N1 : N1 acquis, N2 lu, N3 lisible mais hors révisions");
      await p.goto(URL + "#/parcours"); await p.waitForTimeout(250);
      ok((await p.$$(".pworld")).length >= 9, "« Mon parcours » liste tous les mondes");
      await p.click('[data-mode="skip"][data-w="n1"]'); await p.waitForTimeout(150);
      ok(await p.evaluate(() => AA.S.path.n1 === "skip" && !AA.game.inPlay("n1-signes") && !AA.game.dailySet().some(q => q.m && AA.content.byId[q.m] && AA.content.byId[q.m].world === "n1")), "passer un monde : il sort des révisions");
      await p.click('[data-cert="n2"]'); await p.waitForTimeout(200); await p.click('[data-cm="skip"]'); await p.waitForTimeout(250);
      ok(await p.evaluate(() => AA.S.certs.n2 && AA.S.path.n2 === "skip" && AA.game.worldOpen("n3") && AA.game.worldOpen("rifap") && AA.S.profile.goal !== "n2"), "« J’ai obtenu ce niveau » : N2 passé, N3 et RIFAP ouverts, objectif suivant");
      await p.click('[data-mode="review"][data-w="n3"]'); await p.waitForTimeout(150);
      ok(await p.evaluate(() => AA.game.unlocked("n3-materiel") && AA.game.bossOpen("n3")), "réviser : tout le monde N3 ouvert");
      await p.goto(URL + "#/lesson/n3-gaz"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => document.querySelector('[data-tab="memo"]').getAttribute("aria-pressed") === "true"), "en révision, le cours s’ouvre sur « À retenir »");
      await p.goto(URL + "#/map/n1"); await p.waitForTimeout(500);
      ok(await p.$("#wresume"), "carte : bandeau « monde passé » avec « Reprendre »");
      await p.click("#wresume"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.S.path.n1 === "review"), "reprendre un monde passé");
      await p.goto(URL + "#/parcours"); await p.waitForTimeout(200); await p.click("#chlv"); await p.waitForTimeout(200); await p.click('#lvbody [data-lv="e1"]'); await p.waitForTimeout(100); await p.click("#lvok"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.S.profile.level === "e1" && AA.S.certs.rifap && AA.game.worldOpen("e1")), "changer de niveau déclaré (Initiateur)");
      const ex = await p.evaluate(() => { AA.S.profile.goal = "n3"; AA.content.inWorld("n3").forEach(m => (AA.S.read[m.id] = { e: AA.u.today() })); AA.quiz.exam(false); const c = AA.ctx; return c.world === "n3" && c.items.length >= 10; });
      ok(ex, "examen blanc du monde visé (N3)");
      await ctx.close(); }

    console.log("• Aide, quêtes, signalements (1.4)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.click(".pill.fire"); await p.waitForTimeout(250);
      ok(await p.$(".fl-cal"), "flamme cliquable : série expliquée sur un calendrier de 5 semaines");
      await p.keyboard.press("Escape"); await p.click(".pill.xp"); await p.waitForTimeout(250);
      ok(await p.$(".help-sheet [data-hx]"), "éclair cliquable : XP et niveau expliqués");
      await p.keyboard.press("Escape"); await p.click('[data-help="tuteur"]'); await p.waitForTimeout(250);
      ok(await p.$(".help-sheet"), "bouton « ? » : fiche d’aide du tuteur");
      await p.keyboard.press("Escape"); await p.waitForTimeout(150);
      const go = await p.$('[data-tuact="0"]'); ok(!!go, "accueil : prochaine étape du tuteur");
      if (go) { await go.click(); await p.waitForTimeout(400); ok(await p.evaluate(() => AA.router.name !== "home"), "la prochaine étape emmène au bon écran (" + await p.evaluate(() => AA.router.name) + ")"); }
      await p.goto(URL + "#/train"); await p.waitForTimeout(250); await p.click('.tile[data-t="flash"] .tile-help'); await p.waitForTimeout(250);
      ok(await p.evaluate(() => !!document.querySelector(".help-sheet") && AA.router.name === "train"), "« ? » sur une tuile : explique sans ouvrir l’écran");
      await p.keyboard.press("Escape");
      await p.goto(URL + "#/lesson/mariotte"); await p.waitForTimeout(400);
      ok(await p.$("#exbox .ex-q") && await p.$("details.sources"), "cours : exemple tiré au hasard et sources");
      const q1 = await p.textContent("#exbox .ex-q"); let changed = false;
      for (let i = 0; i < 6 && !changed; i++) { await p.click("#exnew"); await p.waitForTimeout(80); changed = (await p.textContent("#exbox .ex-q")) !== q1; }
      ok(changed, "« Un autre exemple » change les chiffres");
      await p.click("#exshow"); await p.waitForTimeout(150); ok(await p.$(".ex-steps li"), "solution pas à pas de l’exemple");
      await p.click('[data-rep="essentiel"]'); await p.waitForTimeout(200); await p.click('[data-rk="unclear"]'); await p.fill("#repn", "Test"); await p.click("#repok"); await p.waitForTimeout(200);
      await p.goto(URL + "#/lesson/pression"); await p.waitForTimeout(300);
      await p.click("#dive"); await p.waitForTimeout(300); await p.click(".choice >> nth=0"); await p.waitForTimeout(150); await p.click("#qrep"); await p.waitForTimeout(200); await p.click("#repok"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.S.reports.length === 2 && AA.S.reports[0].kind === "unclear" && AA.S.reports[0].file.startsWith("content/fr/n2.js") && AA.S.reports[1].type === "question"), "signalements enregistrés (cours et question), avec le fichier à corriger");
      await p.goto(URL + "#/reports"); await p.waitForTimeout(250); ok((await p.$$(".rep-item")).length === 2 && await p.$("#repx"), "« Mes signalements » : liste et export");
      await p.goto(URL + "#/valider"); await p.waitForTimeout(250); await p.click(".val-item .switch >> nth=0"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => Object.keys(AA.S.validOk).length === 1), "« À valider » : point coché par le moniteur");
      ok(await p.evaluate(() => { const m = AA.content.byId.mariotte; AA.quiz.module(m); return AA.ctx.items.some(it => it.q.gen); }), "quiz de thème : calculs aléatoires mêlés aux questions");
      await ctx.close(); }

    console.log("• Cursus (1.5)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.goto(URL + "#/cursus/n3"); await p.waitForTimeout(400);
      ok((await p.$$(".cur-node")).length >= 9 && await p.$('.cur-node.on[data-id="n3"]') && await p.$(".dchart .dc-bar") && /Niveau 3/.test(await p.textContent(".cur-detail h2")), "cursus : tous les niveaux, schéma des profondeurs, fiche du niveau choisi");
      await p.click('.cur-node[data-id="e1"]'); await p.waitForTimeout(150); ok(/Initiateur/.test(await p.textContent(".cur-detail h2")), "cursus : toucher un niveau ouvre sa fiche");
      ok(await p.evaluate(() => /ISO/.test(document.querySelector("#view").textContent) && /CMAS/.test(document.querySelector("#view").textContent)), "cursus : équivalences ANMP, CMAS, ISO");
      await p.goto(URL + "#/map/n3"); await p.waitForTimeout(500); ok(await p.$(".lvbadge"), "carte : « pour qui · quel examen » sur le monde");
      await p.goto(URL + "#/lesson/n3-gaz"); await p.waitForTimeout(300); ok(await p.$(".lvchip"), "cours : étiquette du niveau");
      ok(await p.evaluate(() => ["n3", "n4", "rifap", "e1", "e2", "nitrox"].every(w => AA.content.inWorld(w).reduce((a, m) => a + m.quiz.length, 0) >= 30)), "au moins 30 questions par monde au-delà du N2");
      await ctx.close(); }

    console.log("• Révisions, Explique-moi, hors ligne, carnet (1.7)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.goto(URL + "#/lesson/pression"); await p.waitForTimeout(300); await p.click("#dive"); await p.waitForTimeout(300);
      /* Les séries de cours mêlent des calculs générés : on passe ceux du début pour tomber sur une vraie question. */
      for (let k = 0; k < 6 && !(await p.evaluate(() => AA.content.questions.some(x => x.q === document.querySelector("#qtext").textContent))); k++) { await p.click('.choice[data-ci="0"]'); await p.waitForTimeout(150); await p.click("#nextq"); await p.waitForTimeout(200); }
      const wrongCi = await p.evaluate(() => { const q = document.querySelector("#qtext").textContent; const Q = AA.content.questions.find(x => x.q === q); return Q ? (Q.a + 1) % Q.c.length : 0; });
      await p.click(`.choice[data-ci="${wrongCi}"]`); await p.waitForTimeout(200);
      ok(await p.$("#qexp"), "erreur : bouton « Explique-moi »");
      await p.click("#qexp"); await p.waitForTimeout(300);
      ok((await p.$$(".exp-bars .exp-dot")).length >= 3 && await p.$(".exp-step"), "Explique-moi : mini-cours en étapes");
      { const e0 = await p.textContent(".exp-step .eyebrow"); await p.waitForTimeout(7000); ok((await p.textContent(".exp-step .eyebrow")) === e0, "Explique-moi : pas d’avance automatique"); }
      ok(await p.evaluate(() => { const q = AA.content.questions.find(x => x.q === document.querySelector("#qtext").textContent); return !!q && document.querySelector(".exp-step").textContent.includes(q.q); }), "Explique-moi : part de la question ratée");
      const s1 = await p.textContent(".exp-step .eyebrow"); await p.click("#expN"); await p.waitForTimeout(150); ok((await p.textContent(".exp-step .eyebrow")) !== s1, "Explique-moi : étape suivante");
      await p.click(".exp-end [data-no]"); await p.waitForTimeout(150);
      ok(await p.evaluate(() => Object.keys(AA.S.qsrs || {}).length >= 1 && Object.values(AA.S.qsrs)[0].b === 0), "erreur : la question revient demain (révisions espacées)");
      await p.evaluate(() => { const q = AA.content.byId.pression.quiz[1]; AA.S.qsrs[q.id] = { b: 2, due: "2000-01-01", t: 1 }; AA.store.save(true); });
      await p.goto(URL + "#/train"); await p.waitForTimeout(300); ok(/à revoir/.test(await p.textContent('.tile[data-t="srs"]')), "Entraîner : révisions espacées du jour");
      await p.click('.tile[data-t="srs"]'); await p.waitForTimeout(300); ok(await p.$(".qcard"), "révisions espacées : la série démarre");
      await p.goto(URL + "#/home"); await p.waitForTimeout(300); await p.click(".pill.net"); await p.waitForTimeout(400);
      ok((await p.$$(".net-row")).length >= 3, "indicateur hors ligne et sauvegarde");
      await p.keyboard.press("Escape");
      await p.goto(URL + "#/carnet"); await p.waitForTimeout(300); await p.click(".carnet-row [data-instr] >> nth=0"); await p.waitForTimeout(200);
      await p.fill("#iname", "Moniteur Test"); await p.click("#isave"); await p.waitForTimeout(300);
      ok(await p.evaluate(() => Object.keys(AA.S.instr).length === 1), "carnet : thème validé par un moniteur");
      
      await ctx.close(); }

    console.log("• Examens, fiches, lecture (1.8)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.goto(URL + "#/examen/n2/quick"); await p.waitForTimeout(300);
      ok(await p.$('.ex-fmt.on[data-ef="quick"]') && await p.$(".ex-spec .ex-dl"), "examen : choix du format, barème et déroulement");
      await p.click('[data-ew="n3"]'); await p.waitForTimeout(150); ok(/Niveau 3|N3/.test(await p.textContent(".ex-spec h3")), "examen : choix du niveau");
      ok(/pas encore lus/.test(await p.textContent(".ex-spec")), "examen : indique les cours pas encore lus");
      await p.evaluate(() => AA.content.inWorld("n3").forEach(m => (AA.S.read[m.id] = { e: AA.u.today() })));
      await p.click('[data-ew="n3"]'); await p.waitForTimeout(150);
      await p.click("#exgo"); await p.waitForTimeout(300); ok(await p.$(".qcard"), "examen N3 : l’épreuve démarre");
      for (let i = 0; i < 30 && !(await p.$(".ex-report")); i++) { const c = await p.$(".choice:not([disabled])"); if (c) await c.click(); await p.waitForTimeout(60); const nx = await p.$("#nextq"); if (nx) await nx.click(); await p.waitForTimeout(60); }
      ok(await p.$(".ex-report .ex-th"), "examen : note par thème et thèmes à retravailler");
      ok(await p.evaluate(() => { const e = AA.S.exams[AA.S.exams.length - 1]; return e && e.world === "n3" && e.by && Object.keys(e.by).length >= 3; }), "examen : résultat enregistré par niveau et par thème");
      await p.goto(URL + "#/fiches/n2"); await p.waitForTimeout(300);
      ok((await p.$$(".fic-preview .fiche")).length >= 11 && await p.$(".fic-preview .f-memo dt"), "fiches : toutes les fiches du niveau");
      const [dl] = await Promise.all([p.waitForEvent("download", { timeout: 5000 }).catch(() => null), p.click("#fdl")]);
      ok(dl && /abysse-fiches-n2\.html/.test(dl.suggestedFilename()), "fiches : fichier à télécharger");
      await p.goto(URL + "#/lesson/pression/memo"); await p.waitForTimeout(300); ok(await p.$('.fic-link a[href="#/fiches/n2/pression"]'), "cours : imprimer la fiche du thème");
      const canSpeak = await p.evaluate(() => AA.a11y.canSpeak);
      if (canSpeak) { await p.click("[data-oral]"); await p.waitForTimeout(300); ok(await p.$(".oral-bar"), "lecture du cours : lecteur affiché"); await p.click("#orStop"); }
      else ok(true, "lecture du cours : synthèse vocale absente ici (bouton masqué)");
      await ctx.close(); }

    console.log("• Procédures d’urgence et calculs à taper (2.5)");
    { const { ctx, p } = await newPage(b, 390, 844, true); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.goto(URL + "#/procs"); await p.waitForTimeout(300);
      ok((await p.$$(".pr-item")).length >= 18, "procédures : page dédiée, tous les niveaux");
      await p.click('[data-pr="proc-n2-assist"]'); await p.waitForTimeout(300);
      ok((await p.$$(".ord-pool .ord-it")).length >= 13, "procédures : longue liste de gestes avec pièges");
      const steps = await p.evaluate(() => AA.content.qById["proc-n2-assist"].steps.flat());
      for (const s of steps) { await p.evaluate(x => [...document.querySelectorAll(".ord-pool .ord-it")].find(b => b.dataset.p === x).click(), s); await p.waitForTimeout(30); }
      await p.click("#ordGo"); await p.waitForTimeout(250);
      ok(await p.$(".feedback.ok") && (await p.$$(".ord-seq .ord-it.good")).length === steps.length, "procédures : bon enchaînement validé");
      ok(await p.evaluate(() => !!(AA.S.procs || {})["proc-n2-assist"]), "procédures : réussite enregistrée");
      await p.evaluate(() => AA.quiz.procs([AA.content.qById["proc-n1-perte"]])); await p.waitForTimeout(300);
      const fl = await p.evaluate(() => AA.content.qById["proc-n1-perte"]), bad = [fl.steps[0][0], fl.extra[0]];
      for (const s of bad) { await p.evaluate(x => [...document.querySelectorAll(".ord-pool .ord-it")].find(b => b.dataset.p === x).click(), s); await p.waitForTimeout(30); }
      await p.click("#ordGo"); await p.waitForTimeout(250);
      ok(await p.$(".feedback.bad .ord-ok") && await p.$(".ord-seq .ord-it.wrong"), "procédures : erreur corrigée avec le bon enchaînement");
      ok(await p.evaluate(() => { const ids = []; for (let k = 0; k < 4; k++) AA.quiz.examPlan("n2", true).forEach(q => q.proc && ids.push(q.id)); return ids.length === 8; }), "procédures : 2 par brevet blanc complet");
      const typed = await p.evaluate(() => { const G = AA.game, k = G.genKeys().find(k => AA.quiz.canType(G.gen(k))), q = G.gen(k); AA.quiz.start("place", [q], { title: "t" }); return q.c[q.a]; });
      await p.waitForTimeout(250); await p.evaluate(() => { AA.ctx.items[0].inp = true; AA.router.refresh(); }); await p.waitForTimeout(250);
      await p.fill("#numv", typed.replace(/\s*[^\d,.\s-].*$/, "")); await p.click("#numGo"); await p.waitForTimeout(250);
      ok(await p.$(".numres.good") && await p.$(".feedback.ok"), "calcul à taper : bonne réponse acceptée (virgule, sans unité)");
      ok(await p.evaluate(() => { const q = { calc: true, c: ["12 min", "15 min", "9 min", "20 min"], a: 0 }; return AA.quiz.canType(q) && AA.quiz.numOf("12,0") === 12 && AA.quiz.numOf("1 234,5 L") === 1234.5 && AA.quiz.numTol(q) >= .5 && AA.quiz.numTol(q) < 1.5; }), "calcul à taper : tolérance et lecture des nombres");
      await ctx.close(); }

    console.log("• Son et image disent la même chose (2.6)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.evaluate(() => { window.__snd = []; ["ok", "bad", "flip"].forEach(k => { const f = AA.fx.sfx[k]; AA.fx.sfx[k] = () => { window.__snd.push(k); f(); }; }); });
      const qs = await p.evaluate(() => AA.content.inWorld("n2")[0].quiz.slice(0, 4).map(q => q.id));
      const answerCi = good => p.evaluate(g => { const q = AA.ctx.items[AA.ctx.idx].q; return g ? q.a : (q.a + 1) % q.c.length; }, good);
      /* Brevet blanc : ni son ni image ne trahissent la réponse. */
      await p.evaluate(ids => AA.quiz.start("exam", ids.map(id => AA.content.qById[id]), { full: true, world: "n2", timeLeft: 600, title: "Examen" }), qs); await p.waitForTimeout(250);
      await p.click(`.choice[data-ci="${await answerCi(true)}"]`); await p.waitForTimeout(80);
      const ex1 = await p.evaluate(() => ({ s: window.__snd.slice(), v: !!document.querySelector(".verdict"), f: !!document.querySelector(".float") }));
      await p.click(`.choice[data-ci="${await answerCi(false)}"]`); await p.waitForTimeout(80);
      const ex2 = await p.evaluate(() => window.__snd.slice());
      ok(ex1.s.join() === "flip" && !ex1.v && !ex1.f && ex2.join() === "flip,flip", "brevet blanc : même son neutre et rien à l’écran, bonne ou mauvaise réponse");
      /* Apnée (passage immédiat) : le verdict s'affiche avec le son. */
      await p.evaluate(ids => { window.__snd = []; AA.quiz.start("apnee", ids.map(id => AA.content.qById[id]), { title: "Apnée", time: 60 }); }, qs); await p.waitForTimeout(250);
      await p.click(`.choice[data-ci="${await answerCi(true)}"]`); await p.waitForTimeout(60);
      const ap1 = await p.evaluate(() => ({ s: window.__snd.slice(), v: !!document.querySelector(".verdict.ok") }));
      await p.click(`.choice[data-ci="${await answerCi(false)}"]`); await p.waitForTimeout(60);
      const ap2 = await p.evaluate(() => ({ s: window.__snd.slice(), v: !!document.querySelector(".verdict.bad") }));
      ok(ap1.s.includes("ok") && ap1.v && ap2.s.includes("bad") && ap2.v, "apnée : « Bonne réponse » ou « Raté » affiché en même temps que le son");
      /* Quiz de thème : correction à l'écran avec le son. */
      await p.evaluate(ids => { window.__snd = []; AA.quiz.start("errors", ids.map(id => AA.content.qById[id]), { title: "Q" }); }, qs); await p.waitForTimeout(250);
      await p.click(`.choice[data-ci="${await answerCi(true)}"]`); await p.waitForTimeout(60);
      ok(await p.evaluate(() => window.__snd.includes("ok") && !!document.querySelector(".feedback.ok")), "quiz : correction affichée avec le son");
      /* Aucun effet (toast, verdict, bulle d'XP, sonar) ne doit empêcher de cliquer. */
      await p.evaluate(() => { const c = AA.ctx; c.combo = 4; AA.fx.toast("Trophée", "Un trophée cliquable", "star", () => {}); AA.fx.toast("Combo", "x", "dive"); AA.fx.verdict(true); AA.fx.float("+10 XP", document.querySelector("#nextq")); AA.fx.dive.combo({ combo: 5 }); });
      await p.waitForTimeout(350);
      const blocked = await p.evaluate(() => [...document.querySelectorAll("#view button, #view a.btn")].filter(b => { const r = b.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) return false; const pts = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 8, r.top + r.height / 2], [r.right - 8, r.top + r.height / 2]]; return pts.some(([x, y]) => { const e = document.elementFromPoint(x, Math.min(y, innerHeight - 1)); return e && !b.contains(e); }); }).map(b => b.id || b.className));
      ok(await p.$(".toast") && blocked.length === 0, "effets : toasts, verdict et bulles ne bloquent aucun bouton" + (blocked.length ? " (" + blocked.join(", ") + ")" : ""));
      await p.click("#nextq", { timeout: 2000 }); await p.waitForTimeout(150);
      ok(await p.evaluate(() => AA.ctx.idx === 1), "effets : « Continuer » reste cliquable pendant un toast");
      await p.evaluate(ids => { AA.quiz.start("errors", ids.map(id => AA.content.qById[id]), { title: "Q" }); }, qs); await p.waitForTimeout(250);
      await p.click(`.choice[data-ci="${await answerCi(true)}"]`); await p.waitForTimeout(60);
      /* Ambiance : profondeur du combo, réglage, coupure. */
      await p.click("#nextq"); await p.waitForTimeout(150); await p.click(`.choice[data-ci="${await answerCi(true)}"]`); await p.waitForTimeout(80);
      ok(await p.evaluate(() => /−6 m/.test((document.querySelector(".combo") || {}).textContent || "")), "ambiance : le combo se lit en profondeur");
      await p.goto(URL + "#/settings"); await p.waitForTimeout(300); await p.click('[data-amb="off"]'); await p.waitForTimeout(80);
      ok(await p.evaluate(() => AA.S.profile.amb === "off" && AA.fx.dive.level() === 0 && AA.fx.dive.comboLabel(4) !== "−12 m"), "ambiance : réglable et coupable dans les paramètres");
      await ctx.close(); }

    console.log("• Un seul point d’entrée par parcours (2.6.1)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.evaluate(() => { AA.S.profile.placeAsk = true; AA.S.placeDone = {}; AA.store.save(true); AA.path.startPlacement("n2"); }); await p.waitForTimeout(300);
      const n = await p.evaluate(() => AA.ctx.items.length);
      ok(n === await p.evaluate(() => AA.content.inWorld("n2").length * 2), "positionnement : 2 questions par thème");
      await p.click(".choice >> nth=0"); await p.waitForTimeout(100); await p.click("#nextq"); await p.waitForTimeout(150);
      await p.goto(URL + "#/home"); await p.waitForTimeout(400);
      ok(await p.$(".run-card") && !(await p.$(".place-card")), "accueil : positionnement en cours = seulement « Reprendre », pas « Commencer »");
      await p.goto(URL + "#/parcours"); await p.waitForTimeout(300);
      ok(/1\/\d+/.test(await p.evaluate(() => (document.querySelector('[data-place="n2"]') || {}).textContent || "")), "parcours : le bouton du test devient « Reprendre (1/n) »");
      await p.click('[data-place="n2"]'); await p.waitForTimeout(300);
      ok(await p.evaluate(n => AA.router.name === "quiz" && AA.ctx.mode === "place" && AA.ctx.answers.length === 1 && AA.ctx.items.length === n, n), "parcours : on reprend la même série au lieu d’en recommencer une");
      await p.evaluate(() => { AA.run.clear(); AA.content.inWorld("n2").slice(0, 4).forEach(m => m.quiz.slice(0, 4).forEach((q, i) => AA.game.record(q, i % 2 === 0, false, 0))); AA.store.save(true); });
      await p.goto(URL + "#/home"); await p.waitForTimeout(400);
      const dup = await p.evaluate(() => { const acts = AA.tutor._acts || []; const sess = document.querySelectorAll("#view [data-tusession]").length + acts.filter((a, i) => a.k === "session" && document.querySelector('#view [data-tuact="' + i + '"]')).length; const dg = document.querySelectorAll('#view a[href="#/diagnostic"]').length + acts.filter((a, i) => a.k === "diag" && document.querySelector('#view [data-tuact="' + i + '"]')).length; const titles = [...document.querySelectorAll("#view .tu-act b")].map(b => b.textContent); return { sess, dg, uniq: new Set(titles).size === titles.length }; });
      ok(dup.sess <= 1 && dup.dg <= 1 && dup.uniq, "accueil : une seule entrée pour la séance du tuteur et le diagnostic");
      await ctx.close(); }

    console.log("• Sessions protégées, mise en page (2.6.2)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.evaluate(() => { window.AA_NOGUARD = 0; });
      /* Quiz : retour système → question, la série reste ; pause → carte « À reprendre ». */
      await p.evaluate(() => AA.quiz.module(AA.content.inWorld("n2")[0])); await p.waitForTimeout(300);
      await p.click(".choice >> nth=0"); await p.waitForTimeout(100); await p.click("#nextq"); await p.waitForTimeout(150);
      ok(await p.evaluate(() => getComputedStyle(document.getElementById("tabbar")).display === "none" || document.getElementById("tabbar").hidden), "quiz : onglets masqués pendant la série");
      await p.evaluate(() => { location.hash = "#/cours"; }); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.router.name === "quiz" && !!document.querySelector(".sg-sheet") && AA.ctx.answers.length === 1), "quiz : quitter l’écran demande Pause ou Quitter, la série reste");
      await p.click('[data-sg="pause"]'); await p.waitForTimeout(300); await p.goto(URL + "#/home"); await p.waitForTimeout(400);
      ok(await p.$(".run-card [data-run=\"go\"]"), "quiz : en pause, la série se reprend depuis l’accueil");
      /* Combat : onglet ou retour → question ; pause → reprise au même point. */
      await p.evaluate(() => { AA.S.story["boss-n2"] = { done: AA.u.today(), node: "q1" }; AA.S.unlockAll = true; AA.store.save(true); });
      await p.goto(URL + "#/boss/n2"); await p.waitForTimeout(400); await p.click("#btGo"); await p.waitForTimeout(1200);
      ok(await p.evaluate(() => getComputedStyle(document.getElementById("tabbar")).display === "none"), "combat : onglets masqués");
      await p.click(".bt-c >> nth=0"); await p.waitForTimeout(300);
      const at = await p.evaluate(() => AA.games.battle().i);
      await p.evaluate(() => history.back()); await p.waitForTimeout(400);
      ok(await p.evaluate(() => AA.router.name === "boss" && !!document.querySelector(".sg-sheet")), "combat : le retour du téléphone demande Pause ou Quitter");
      await p.click('[data-sg="pause"]'); await p.waitForTimeout(400); await p.goto(URL + "#/home"); await p.waitForTimeout(400);
      ok(await p.$(".bt-run a.btn"), "combat : carte « À reprendre » sur l’accueil");
      await p.click(".bt-run a.btn"); await p.waitForTimeout(800);
      ok(await p.evaluate(a => AA.router.name === "boss" && !!document.querySelector("#btQbox") && AA.games.battle() && AA.games.battle().i >= a, at), "combat : reprise au même point");
      /* Réponses du boss : texte sur toute la largeur du bouton. */
      ok(await p.evaluate(() => [...document.querySelectorAll(".bt-c")].every(b => { const g = b.querySelector(".grow"); return g && g.getBoundingClientRect().width >= b.getBoundingClientRect().width - 90; })), "combat : texte des réponses sur toute la largeur");
      await p.evaluate(() => { const x = document.querySelector("#tabbar [data-tab=\"train\"]"); x && x.click(); }); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.router.name === "boss"), "combat : un onglet ne fait pas quitter sans demander");
      await p.evaluate(() => { document.querySelectorAll(".sheet-wrap").forEach(x => x._close && x._close()); AA.games.drop(); location.hash = "#/home"; }); await p.waitForTimeout(500);
      /* Aventure : rien à confirmer avant le premier choix ; ensuite pause et reprise à la même scène. */
      await p.goto(URL + "#/story/n1-mer"); await p.waitForTimeout(300); await p.evaluate(() => { location.hash = "#/train"; }); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.router.name === "train" && !document.querySelector(".sg-sheet")), "aventure : partir avant le premier choix ne demande rien");
      await p.goto(URL + "#/story/n1-mer"); await p.waitForTimeout(300);
      const gi = await p.evaluate(() => { const s = AA.content.storyById["n1-mer"], n = s.nodes[AA.ctx.story.node]; return n.choices.findIndex(c => c.ok); });
      await p.click(`.st-choice[data-i="${gi}"]`); await p.waitForTimeout(200); const nx = await p.$("#stnext"); if (nx) await nx.click(); await p.waitForTimeout(300);
      const node = await p.evaluate(() => AA.S.story["n1-mer"].node);
      await p.evaluate(() => { location.hash = "#/train"; }); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.router.name === "story" && !!document.querySelector(".sg-sheet")), "aventure commencée : partir demande Continuer ou Pause");
      await p.click('[data-sg="pause"]'); await p.waitForTimeout(300); await p.goto(URL + "#/story/n1-mer"); await p.waitForTimeout(300);
      ok(await p.evaluate(n => AA.ctx.story && AA.ctx.story.node === n, node), "aventure : reprise à la même scène");
      await p.evaluate(() => { AA.S.story["n1-mer"] = { node: AA.content.storyById["n1-mer"].start, tries: 0 }; AA.store.save(true); location.hash = "#/home"; }); await p.waitForTimeout(400);
      /* Accueil : espacement régulier entre les cartes. */
      const gaps = await p.evaluate(() => { const els = [document.querySelector("#view .hello")].concat([...document.querySelectorAll("#view .col-main > .card, #view .col-main > .stack, #view .col-side > .card")]).filter(Boolean).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top); const g = []; for (let i = 1; i < els.length; i++) g.push(Math.round(els[i].top - els[i - 1].bottom)); return g; });
      ok(gaps.length >= 3 && gaps.every(g => g >= 8), "accueil : au moins 8 px entre chaque carte (" + gaps.join(", ") + ")");
      await ctx.close(); }

    console.log("• Maîtrise exigeante et cohérente (2.7)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await ready(p);
      await p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; AA.path.applyLevel("n1"); S.profile.goal = "n2"; AA.store.save(true); });
      await p.reload(); await ready(p);
      const r = await p.evaluate(() => { const C = AA.content, G = AA.game, T = AA.tutor;
        const n1 = T.levelSum("n1");
        C.questions.filter(q => C.byId[q.m].world === "n2").slice(0, 40).forEach((q, i) => G.record(q, i % 5 !== 0));
        const L = T.levelSum("n2"), mean = Math.round(100 * L.all.reduce((a, x) => a + (T.mastery(x.n.id) || 0), 0) / L.n);
        const sum = L.solid + L.proving + L.work + L.acq + L.untested + L.unread;
        const solidOk = L.all.filter(x => T.solid(x.n.id)).length === L.solid && L.all.every(x => T.solid(x.n.id) === (x.m >= T.RULE.solid));
        /* Une notion réussie 6 fois le même jour, dans un seul format : pas solide. */
        const nid = "archimede:poussee", q = T.qsOf(nid)[0]; AA.S.read.archimede = { e: AA.u.today() }; delete (AA.S.nstat || {})[nid];
        for (let i = 0; i < 6; i++) G.record(q, true);
        const sameDay = T.solid(nid), m1 = T.mastery(nid);
        const rec = AA.S.nstat[nid]; rec.dk = [AA.u.addDays(-6), AA.u.addDays(-3), AA.u.today()]; rec.f = ["quiz:module", "vraifaux"];
        const spaced = T.solid(nid), m2 = T.mastery(nid);
        G.record(q, false); const afterErr = T.solid(nid), m3 = T.mastery(nid);
        return { n1, pct: L.pct, mean, sum, n: L.n, solid: L.solid, solidOk, sameDay, m1, spaced, m2, afterErr, m3 }; });
      ok(r.n1.acq === r.n1.n && r.n1.pct === 50, "brevet obtenu : notions « à confirmer » à 50 %, pas 0 % (" + r.n1.pct + " %)");
      ok(r.pct < 25 && r.solid === 0, "quelques quiz sans lire le cours : maîtrise basse (" + r.pct + " %), aucune notion solide");
      ok(r.pct === r.mean && r.sum === r.n && r.solidOk, "le pourcentage et les compteurs disent la même chose");
      ok(!r.sameDay && r.m1 < .8, "6 bonnes réponses le même jour dans un seul format : pas encore solide (" + Math.round(r.m1 * 100) + " %)");
      ok(r.spaced && r.m2 >= .8, "réussites sur 3 jours et 2 formats : notion solide");
      ok(!r.afterErr && r.m3 < .8, "une erreur récente : la notion n’est plus solide");
      await p.evaluate(() => { location.hash = "#/diagnostic"; }); await p.waitForTimeout(400);
      const d = await p.evaluate(() => ({ crit: document.querySelectorAll(".mq-crit li").length, counts: document.querySelectorAll(".mq-counts .chip").length, rules: !!document.querySelector(".mq-rules") }));
      ok(d.crit > 0 && d.counts >= 2 && d.rules, "diagnostic : critères par notion, compteurs et règle de calcul affichés");
      await ctx.close(); }

    console.log("• Aquarium vivant (2.7.1)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await ready(p);
      await p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.xp = 99999; AA.content.creatures.slice(0, 14).forEach(f => (S.aqua[f.id] = "2026-11-01")); delete S.fedOn; AA.store.save(true); });
      await p.reload(); await ready(p); await p.evaluate(() => { location.hash = "#/aquarium"; }); await p.waitForTimeout(1200);
      const a = await p.evaluate(() => AA.aquaLive.state()); await p.waitForTimeout(1500); const a2 = await p.evaluate(() => AA.aquaLive.state());
      const moved = a.fish.map((f, i) => Math.hypot(f.x - a2.fish[i].x, f.y - a2.fish[i].y));
      ok(a.running && new Set(a.fish.map(f => f.role)).size >= 4, "aquarium : comportements différents selon l’espèce (" + [...new Set(a.fish.map(f => f.role))].join(", ") + ")");
      ok(moved.filter(m => m > 3).length >= a.fish.length / 2 && new Set(moved.map(m => Math.round(m / 5))).size >= 4, "aquarium : les poissons nagent, à des vitesses variées");
      ok(a2.fish.every(f => f.x >= 0 && f.x <= a2.W && f.y >= 0 && f.y <= a2.H), "aquarium : tout le monde reste dans le bac");
      await p.click("#aqfeed"); await p.waitForTimeout(300); const f1 = await p.evaluate(() => AA.aquaLive.state());
      ok(f1.food >= 10 && await p.evaluate(() => AA.S.fedOn === AA.u.today()), "nourrir : les granulés tombent, le repas du jour est compté");
      await p.waitForTimeout(9000); const f2 = await p.evaluate(() => AA.aquaLive.state());
      ok(f2.eaten >= 8 && f2.fish.some(f => f.sat), "nourrir : les poissons viennent manger puis repartent rassasiés (" + f2.eaten + " granulés mangés)");
      const box = await p.evaluate(() => { const r = document.querySelector("#tank").getBoundingClientRect(), fs = [...document.querySelectorAll(".aq-fish, .aq-fs")].map(f => f.getBoundingClientRect());
        for (let y = r.top + 30; y < r.bottom - 60; y += 12) for (let x = r.left + 20; x < r.right - 20; x += 12) if (!fs.some(f => x >= f.left - 4 && x <= f.right + 4 && y >= f.top - 4 && y <= f.bottom + 4)) return { x, y };
        return { x: r.left + 10, y: r.top + 10 }; });
      await p.mouse.click(box.x, box.y); await p.waitForTimeout(100);
      ok((await p.evaluate(() => AA.aquaLive.state().food)) >= 1 && !(await p.$(".sheet-wrap")), "toucher l’eau : une pincée de nourriture, sans ouvrir de fiche");
      ok(await p.evaluate(() => AA.content.decor.length >= 28 && ["fan", "cave", "oyster", "castle", "sub", "diver", "flag", "tank"].every(k => AA.content.decor.some(d => d.kind === k))), "décors : 8 nouveaux décors à débloquer");
      await p.evaluate(() => { AA.S.profile.motion = false; AA.store.save(true); location.hash = "#/home"; }); await p.waitForTimeout(200);
      await p.evaluate(() => { location.hash = "#/aquarium"; }); await p.waitForTimeout(800); const r1 = await p.evaluate(() => AA.aquaLive.state()); await p.waitForTimeout(800); const r2 = await p.evaluate(() => AA.aquaLive.state());
      ok(r1.reduced && !r1.running && r1.fish.every((f, i) => f.x === r2.fish[i].x && f.y === r2.fish[i].y), "réduire les animations : aquarium immobile");
      await p.evaluate(() => { location.hash = "#/home"; }); await p.waitForTimeout(200);
      ok(await p.evaluate(() => !AA.aquaLive.state()), "aquarium quitté : l’animation s’arrête");
      await ctx.close(); }

    console.log("• Jamais deux fois la même question dans une série (2.7.1)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p);
      const r = await p.evaluate(() => {
        const Q = AA.quiz, C = AA.content, GM = AA.games, S = AA.S; S.unlockAll = true;
        C.questions.slice(0, 200).forEach(q => { S.seen[q.id] = 1; S.errors[q.id] = 2; }); 
        const dup = list => { const k = list.map(q => Q.key(q)), id = list.map(q => q.id); return k.length - new Set(k).size + id.length - new Set(id).size; };
        const grab = fn => { AA.ctx = {}; try { fn(); } catch (e) { return "ERR " + e.message; } const it = (AA.ctx.items || []).map(x => x.q); AA.ctx.items = null; return it; };
        const small = C.modules.filter(m => m.world === "n2").sort((a, b) => a.quiz.length - b.quiz.length)[0];
        const modes = {
          module: () => Q.module(u_pick(C.inWorld("n2"))), exam: () => Q.exam(false, "n2"), examFull: () => Q.exam(true, "n2"), place: () => AA.path.startPlacement("n2"),
          tutor: () => AA.tutor.session(), daily: () => Q.daily(), boss: () => Q.boss("n2"), duel: () => Q.duel("A", "B"), five: () => Q.five(), errors: () => Q.errors()
        };
        function u_pick(l) { return l[Math.floor(Math.random() * l.length)]; }
        const out = {};
        Object.entries(modes).forEach(([k, fn]) => { let worst = 0, n = 0; for (let i = 0; i < 15; i++) { const it = grab(fn); if (typeof it === "string") { out[k] = it; return; } n = Math.max(n, it.length); worst = Math.max(worst, dup(it)); location.hash = "#/home"; } out[k] = { worst, n }; });
        let bw = 0, bn = 0; for (let i = 0; i < 15; i++) { GM.begin(GM.mini(small.id)); const l = GM.qs(); bn = Math.max(bn, l.length); bw = Math.max(bw, dup(l)); GM.drop(); }
        out.gardien = { worst: bw, n: bn };
        /* Un doublon connu du contenu ne passe pas, et la série garde sa longueur. */
        const a = C.qById["pa20-0"], b2 = C.qById["n3-autonomie-1"]; const u1 = Q.uniq([a, b2, a].concat(C.byId.physio.quiz.slice(2, 8)), "module");
        out.known = { n: u1.length, dup: dup(u1) };
        return out; });
      Object.entries(r).filter(([k]) => k !== "known").forEach(([k, v]) => ok(typeof v === "object" && v.worst === 0 && v.n > 0, `${k} : aucune question répétée sur 15 tirages (${typeof v === "object" ? v.n + " questions" : v})`));
      ok(r.known.dup === 0 && r.known.n === 9, "doublon du contenu (même énoncé, deux identifiants) : écarté et remplacé, la série garde sa longueur");
      await ctx.close(); }

    console.log("• Réglages et thèmes alignés sur petit écran (2.7.2)");
    { const { ctx, p } = await newPage(b, 360, 820); await p.goto(URL); await seed(p); const bad = [];
      for (const w of [280, 320, 360]) for (const ts of [1, 1.4]) for (const th of ["nacre", "minuit", "auto"]) {
        await p.setViewportSize({ width: w, height: 820 });
        await p.evaluate(([ts, th]) => { AA.S.profile.textSize = ts; AA.S.profile.theme = th; AA.store.save(true); }, [ts, th]);
        await p.reload(); await ready(p);
        for (const r of ["settings", "profile"]) {
          await p.evaluate(r => { location.hash = "#/" + r; }, r); await p.waitForTimeout(300);
          const out = await p.evaluate(() => { const o = [], vw = innerWidth;
            const scroller = e => { for (let q = e.parentElement; q && q.id !== "view"; q = q.parentElement) if (/auto|scroll/.test(getComputedStyle(q).overflowX)) return true; return false; };
            document.querySelectorAll("#view .swatch").forEach(s => { const R = s.getBoundingClientRect(); s.querySelectorAll("*").forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.left < R.left - 1 || r.right > R.right + 1)) o.push("tuile de thème « " + s.textContent.trim() + " »"); }); });
            document.querySelectorAll("#view .card").forEach(c => { const R = c.getBoundingClientRect(); c.querySelectorAll("*").forEach(e => { const r = e.getBoundingClientRect(); if (!r.width || scroller(e) || getComputedStyle(e).position === "absolute") return; if (r.left < R.left - 1 || r.right > R.right + 1) o.push("sort de sa carte : " + (e.textContent || e.tagName).trim().slice(0, 24)); }); });
            document.querySelectorAll("#view *").forEach(e => { const r = e.getBoundingClientRect(); if (r.width && !scroller(e) && getComputedStyle(e).position !== "fixed" && (r.right > vw + 1 || r.left < -1)) o.push("sort de l’écran : " + (e.textContent || e.tagName).trim().slice(0, 24)); });
            return [...new Set(o)]; });
          out.forEach(x => bad.push(`${r} ${w}px ×${ts} ${th} : ${x}`));
        }
      }
      ok(!bad.length, "réglages et profil : rien ne déborde, thèmes Nacre, Minuit et Automatique, 280 à 360 px, texte ×1 et ×1,4" + (bad.length ? " — " + bad.slice(0, 5).join(" ; ") : ""));
      await ctx.close(); }

    console.log("• Hors ligne, thèmes en 3 étapes, cursus, réponses à taper (2.8)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await ready(p);
      await p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; AA.path.applyLevel("n1"); S.profile.goal = "n2"; AA.store.save(true); });
      await p.reload(); await ready(p);
      /* Hors ligne : l'appli se rouvre sans réseau une fois fermée. */
      const sw = await p.evaluate(async () => { if (!navigator.serviceWorker) return false; await navigator.serviceWorker.ready; return true; });
      if (sw) {
        await p.reload(); await ready(p); await p.waitForTimeout(300);
        await ctx.setOffline(true);
        const p2 = await ctx.newPage(); await p2.goto(URL + "#/home").catch(() => {}); await p2.waitForFunction(() => window.AA && AA.router && AA.router.name, null, { timeout: 8000 }).catch(() => {}); await p2.waitForTimeout(600);
        ok(await p2.evaluate(() => !!(window.AA && AA.router && AA.router.name)).catch(() => false), "hors ligne : l’appli se rouvre sans réseau après fermeture");
        ok(await p2.evaluate(() => { const b = document.getElementById("netbar"); return !!b && /Hors ligne/.test(b.textContent) && /appareil/.test(b.textContent); }).catch(() => false), "hors ligne : bandeau « progression gardée sur l’appareil »");
        await p2.close(); await ctx.setOffline(false);
      } else ok(true, "hors ligne : service worker indisponible ici (test sauté)");
      const sy = await p.evaluate(async () => { let called = 0; const s = AA.sync; s.linked = () => true; s.possible = () => true; s.now = () => { called++; return Promise.resolve(true); };
        Object.defineProperty(navigator, "onLine", { configurable: true, get: () => false }); dispatchEvent(new Event("offline")); await new Promise(r => setTimeout(r, 100));
        const txt = (document.getElementById("netbar") || {}).textContent || "";
        Object.defineProperty(navigator, "onLine", { configurable: true, get: () => true }); dispatchEvent(new Event("online")); await new Promise(r => setTimeout(r, 1800));
        return { txt, called, gone: !document.getElementById("netbar") }; });
      ok(/Google/.test(sy.txt) && sy.called >= 1 && sy.gone, "retour du réseau : synchro Google lancée seule, bandeau retiré");
      /* « Lu » = vraiment lu. */
      const st = await p.evaluate(() => { const T = AA.tutor, l = AA.content.inWorld("n2"), S = AA.S; S.placed = { [l[1].id]: AA.u.today() }; S.read[l[2].id] = { e: "2026-11-01", mig: 1 }; S.v28read = 0;
        const fixed = T.fixRead(); return { placed: T.state(l[1].id), read: T.worldInfo("n2").read, fixed, still: !!(S.read[l[2].id] || {}).e }; });
      ok(st.placed === "placed" && st.read === 0 && st.fixed >= 1 && !st.still, "un thème validé au test n’est pas « lu » ; les faux « lu » sont réparés");
      /* Trois étapes, gardien verrouillé avant lecture et quiz. */
      const mid = await p.evaluate(() => AA.content.inWorld("n2")[3].id);
      await p.evaluate(m => { location.hash = "#/gardien/" + m; }, mid); await p.waitForTimeout(400);
      ok(await p.$(".st3-lock") && await p.$(".tu3-card .tu3.next"), "gardien : verrouillé tant que le cours n’est pas lu et le quiz pas réussi, avec l’étape suivante");
      await p.evaluate(m => { AA.S.read[m] = { e: AA.u.today(), x: 1 }; AA.S.themes[m] = { best: 60, tries: 1 }; AA.store.save(true); location.hash = "#/home"; }, mid); await p.waitForTimeout(200);
      await p.evaluate(m => { location.hash = "#/gardien/" + m; }, mid); await p.waitForTimeout(400);
      ok(!(await p.$(".st3-lock")) && await p.$("#btGo"), "gardien : ouvert après lecture et quiz réussi");
      await p.evaluate(m => { location.hash = "#/lesson/" + m; }, mid); await p.waitForTimeout(400);
      ok(await p.evaluate(() => document.querySelectorAll(".tu3-card .tu3.done").length === 2 && !!document.querySelector(".tu3-card .tu3.next")), "page du cours : 3 étapes, lu et entraîné cochés, gardien en prochaine étape");
      await p.evaluate(() => { location.hash = "#/cours/n2"; }); await p.waitForTimeout(400);
      ok(await p.evaluate(() => document.querySelectorAll(".tu-step .tu3s").length === AA.content.inWorld("n2").length), "liste des cours : les 3 étapes sur chaque thème");
      /* Cursus en schéma. */
      await p.evaluate(() => { location.hash = "#/cursus"; }); await p.waitForTimeout(400);
      ok(await p.evaluate(() => document.querySelectorAll(".road > .rd-step").length >= 7 && !!document.querySelector(".rd-step.you .rd-you") && !!document.querySelector(".rd-node.st-next") && document.querySelectorAll(".rd-br .rd-node").length >= 3), "cursus : étapes numérotées reliées, « Tu es ici », prochaine étape, branches");
      /* Réponses à taper : aussi les valeurs chiffrées du contenu. */
      const ty = await p.evaluate(() => { const Q = AA.quiz, C = AA.content; const st = C.questions.filter(q => !q.gen && Q.canType(q)); return { n: st.length, rate: Q.typeRate, p0: Q.canType(C.qById["pression-0"]), listy: st.some(q => /parmi|lequel|laquelle/i.test(q.q)) }; });
      ok(ty.n >= 60 && ty.rate >= .8 && ty.p0 && !ty.listy, "réponses à taper : " + ty.n + " questions chiffrées du contenu en plus des calculs, 80 % des cas");
      /* Aventure du boss sur la carte. */
      await p.evaluate(() => { location.hash = "#/map/n2"; }); await p.waitForTimeout(500);
      ok(await p.evaluate(() => { const q = document.querySelector(".questspot a.node.quest"), b = document.querySelector(".bossspot"); return !!q && /#\/story\/boss-n2$/.test(q.getAttribute("href")) && !!(q.closest(".spot").nextElementSibling === b); }), "carte : l’aventure qui mène au boss apparaît juste avant lui");
      /* Calculatrice de plongée. */
      const ce = await p.evaluate(() => { const E = AA.quiz.calcEval; return [E("20×1,5+3"), E("(1,5+2)²"), E("√(16)÷2"), E("−3+5"), E("2×(3"), E("10÷4")]; });
      ok(ce[0] === 33 && ce[1] === 12.25 && ce[2] === 2 && ce[3] === 2 && ce[4] === null && ce[5] === 2.5, "calculatrice : priorités, parenthèses, carré, racine, erreurs refusées");
      await p.evaluate(() => { window.AA_PLAIN = 0; AA.quiz.typeRate = 1; AA.S.unlockAll = true; AA.quiz.start("drill", [AA.content.qById["pression-0"], AA.content.qById["mariotte-0"]], { title: "Calc", back: "home" }); }); await p.waitForTimeout(500);
      ok(await p.$("#dcopen"), "calculatrice : bouton sur une question de calcul");
      await p.click("#dcopen"); for (const k of ["3", "×", "1", "0", "÷", "1", "0", "+", "1", "="]) await p.click(`.dc-k[data-k="${k}"]`);
      const ins = await p.evaluate(() => { const b = document.getElementById("dcins"); if (b && !b.hidden) b.click(); const n = document.getElementById("numv"); return { v: n && n.value, closed: !document.getElementById("divecalc") }; });
      ok(ins.v === "4" && ins.closed, "calculatrice : le résultat se met dans la réponse à taper");
      await p.evaluate(() => { window.AA_PLAIN = 1; AA.quiz.typeRate = .8; location.hash = "#/home"; }); await p.waitForTimeout(200);
      await ctx.close(); }

    console.log("• Sauvegarde, récupération, brevet blanc, mises en situation (2.9)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await ready(p);
      await p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; S.xp = 321; S.createdAt = "2026-01-01"; S.profile.backupAt = ""; AA.path.applyLevel("n1"); S.profile.goal = "n2"; AA.content.inWorld("n2").forEach(m => (S.read[m.id] = { e: AA.u.today() })); AA.store.save(true); });
      await p.reload(); await ready(p); await p.evaluate(() => { location.hash = "#/home"; }); await p.waitForTimeout(400);
      ok(await p.$("#expcard"), "rappel d’export : carte de la semaine sur l’accueil (Drive non lié, jamais exporté)");
      await p.click("#explater"); await p.waitForTimeout(200);
      ok(!(await p.$("#expcard")) && await p.evaluate(() => AA.S.profile.exportNag > AA.u.today()), "rappel d’export : « plus tard » le repousse de 3 jours");
      /* Données locales abîmées, copie IndexedDB intacte : tout revient tout seul. */
      await p.evaluate(() => { AA.store.save(true); }); await p.waitForTimeout(400);
      await p.evaluate(() => localStorage.setItem(AA.store.KEY, "{abîmé")); await p.reload(); await ready(p); await p.waitForTimeout(900);
      ok(await p.evaluate(() => AA.S.xp === 321 && !localStorage.getItem("abysse-academy-corrupt") && !document.querySelector(".rec-sheet")), "récupération : données locales abîmées, la copie de l’appareil est restaurée sans rien perdre");
      /* Jeux : les 5 tuiles. */
      await p.evaluate(() => { location.hash = "#/jeux"; }); await p.waitForTimeout(300);
      ok((await p.$$(".g29-tile")).length === 5, "jeux : 5 mises en situation dans l’espace Jeux");
      /* Palier en direct : moteur fictif. */
      const pl = await p.evaluate(() => { const P = AA.g29.palier;
        const a = P.make(0, 150); a.v = P.SLOW; let g = 0; while (!a.done && g++ < 50000) P.step(a, .02);
        const s = P.make(0, 150); g = 0; while (!s.done && g++ < 50000) { const stp = P.stop(P.ceil(s.L)), tg = stp || (s.safeT < 3 ? 3 : 0); s.v = s.d > tg + .01 || tg === 0 ? P.SLOW : 0; P.step(s, .02); }
        const f = P.make(0, 150); f.v = P.FAST; P.step(f, .1);
        return { direct: a.over, ok: !s.over && !s.out && s.d === 0, sc: P.score(s), safe: s.safeT >= 3, fast: f.fastN, noStop: P.ceil(P.make(4, 150).L) === 0 }; });
      ok(pl.direct, "palier en direct : remonter d’un trait franchit le plafond");
      ok(pl.ok && pl.safe && pl.sc >= 90, `palier en direct : paliers respectés et palier de sécurité, score ${pl.sc}`);
      ok(pl.fast === 1 && pl.noStop, "palier en direct : alarme de vitesse comptée, plongée courte sans palier obligatoire");
      await p.evaluate(() => { location.hash = "#/palier"; }); await p.waitForTimeout(300); await p.click("#plGo"); await p.waitForTimeout(300);
      ok(await p.$(".pl-lcd") && await p.$(".pl-col") && /fictif/.test(await p.textContent(".pl-gauge")), "palier en direct : ordinateur, colonne d’eau et jauge « modèle fictif »");
      await p.click('[data-v="9"]'); await p.waitForTimeout(900);
      ok(await p.evaluate(() => AA.g29.state.palier().d < AA.g29.state.palier().dive.d), "palier en direct : la remontée avance en temps réel");
      /* Chasse aux erreurs. */
      await p.evaluate(() => { location.hash = "#/chasse"; }); await p.waitForTimeout(300);
      const bad = await p.evaluate(() => AA.g29.state.chasse().items.map((x, k) => x.bad ? k : -1).filter(k => k >= 0));
      ok(bad.length === 5 && (await p.$$(".ch-it")).length === 10, "chasse aux erreurs : 10 observations, 5 dangers");
      for (const k of bad) { await p.click(`.ch-it[data-k="${k}"]`); await p.waitForTimeout(300); }
      await p.waitForTimeout(300);
      ok(await p.$(".g29-end") && await p.evaluate(() => AA.S.games.chasse && AA.S.games.chasse.best >= 0), "chasse aux erreurs : victoire, temps enregistré, dangers expliqués");
      /* Signes sous l'eau. */
      await p.evaluate(() => { location.hash = "#/signes"; }); await p.waitForTimeout(300); await p.click("#sgGo"); await p.waitForTimeout(200);
      for (let i = 0; i < 10; i++) { const j = await p.evaluate(() => { const s = AA.g29.state.signes(); return s.rounds[s.k].i; }); await p.click(`[data-j="${j}"]`); await p.waitForTimeout(650); }
      ok(await p.$(".g29-end") && await p.evaluate(() => AA.S.games.signes.best === 10), "signes sous l’eau : 10 signes, score parfait enregistré");
      /* Sauvetage chrono. */
      await p.evaluate(() => { location.hash = "#/sauvetage/proc-n2-air"; }); await p.waitForTimeout(300);
      ok(/Panne d’air/.test(await p.textContent(".g29-scene")), "sauvetage chrono : procédure choisie par lien");
      const ex = await p.evaluate(() => AA.g29.state.sauvetage().pool.findIndex(x => x.gi < 0)); await p.click(`.sv-it[data-k="${ex}"]`); await p.waitForTimeout(600);
      ok(await p.evaluate(() => AA.g29.state.sauvetage().pen === 8), "sauvetage chrono : un geste dangereux coûte 8 s");
      for (let i = 0; i < 12; i++) { const k = await p.evaluate(() => { const s = AA.g29.state.sauvetage(); if (s.done) return -1; return s.pool.findIndex(x => !x.used && x.gi === s.gi && s.left.includes(x.txt)); }); if (k < 0) break; await p.click(`.sv-it[data-k="${k}"]`); await p.waitForTimeout(120); }
      ok(await p.$(".g29-end") && await p.evaluate(() => AA.S.games.sauvetage.by["proc-n2-air"] > 0), "sauvetage chrono : procédure terminée, temps enregistré par situation");
      /* Incident en direct. */
      await p.evaluate(() => { location.hash = "#/incident/air"; }); await p.waitForTimeout(300); await p.click("#inGo"); await p.waitForTimeout(200);
      for (let i = 0; i < 5; i++) { const k = await p.evaluate(() => { const s = AA.g29.state.incident(); return s.inc.steps[s.k].c.findIndex(c => c.ok); }); await p.click(`[data-i="${k}"]`); await p.waitForTimeout(1450); }
      ok(/maîtrisé/.test(await p.textContent(".g29-end h2")) && await p.evaluate(() => AA.S.games.incident.best === 5), "incident en direct : 5 bonnes décisions, incident maîtrisé");
      /* Brevet blanc : salle d'examen et certificat. */
      await p.evaluate(() => { location.hash = "#/home"; }); await p.waitForTimeout(200);
      await p.evaluate(() => AA.quiz.exam(false, "n2")); await p.waitForTimeout(400);
      ok(await p.$(".ex-tbar") && await p.$(".ex-hall") && await p.$(".ex-intro"), "brevet blanc : annonce, temps qui file et poissons");
      await p.evaluate(() => { const c = AA.ctx; c.items.forEach((it, i) => c.answers.push({ q: it.q, ok: i % 5 !== 0 })); c.done = true; AA.router.refresh(); }); await p.waitForTimeout(500);
      ok(await p.$(".cert") && /Test/.test(await p.textContent(".cert")) && /16/.test(await p.textContent(".cert-score")) && /très bien/i.test(await p.textContent(".cert-m")), "brevet blanc : certificat au nom, note et mention");
      ok(await p.evaluate(() => /<html/.test(AA.cert.doc({ name: "A", score: 9, date: "2026-11-27", lv: "N2", full: true })) && AA.cert.mention(9) === "no"), "brevet blanc : certificat imprimable, attestation sous 10");
      /* Cursus en carte marine. */
      await p.evaluate(() => { location.hash = "#/cursus"; }); await p.waitForTimeout(300);
      ok(await p.$(".road.chart") && (await p.$$(".rd-sound")).length >= 6, "cursus : carte marine avec la profondeur par niveau");
      ok(await p.evaluate(() => !!AA.content.storyById["n2-guidee"]), "aventure : la plongée guidée");
      await ctx.close(); }
    { /* Rien de lisible nulle part : on propose de choisir. */
      const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await ready(p); await p.waitForTimeout(500);
      await p.evaluate(() => localStorage.setItem(AA.store.KEY, "{abîmé")); await p.reload(); await ready(p); await p.waitForTimeout(1200);
      ok(await p.$(".rec-sheet") && await p.evaluate(() => localStorage.getItem("abysse-academy-corrupt") === "{abîmé"), "récupération : écran de choix, données abîmées gardées de côté");
      await p.click("#recfresh"); await p.waitForTimeout(200); await p.click(".sheet-wrap.cf [data-ok]"); await p.waitForTimeout(300);
      ok(!(await p.$(".rec-sheet")) && await p.evaluate(() => !localStorage.getItem("abysse-academy-corrupt")), "récupération : repartir de zéro ferme l’écran");
      await ctx.close(); }

    console.log("• Questions moins répétées, vrai ou faux (2.9.1)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p);
      const r = await p.evaluate(() => { const Q = AA.quiz, C = AA.content, m = C.byId.physio, S = AA.S; S.recentQ = [];
        const ids = () => AA.ctx.items.map(it => String(it.q.id).replace(/^vf:/, ""));
        Q.module(m); const a = ids(); location.hash = "#/home"; Q.module(m); const b2 = ids(); location.hash = "#/home";
        const overlap = b2.filter(id => a.includes(id)).length;
        window.AA_PLAIN = 0; let vfN = 0, vfOkAll = true; for (let i = 0; i < 6; i++) { Q.module(m); AA.ctx.items.forEach(it => { if (it.q.vf) { vfN++; const o = C.qById[it.q.vf]; vfOkAll = vfOkAll && it.q.c.length === 2 && it.order.join() === "0,1" && (it.q.a === 0) === it.q.q.includes("« " + o.c[o.a] + " »"); } }); location.hash = "#/home"; }
        window.AA_PLAIN = 1;
        const q = C.qById["physio-7"], t1 = Q.toVf(q, true), t0 = Q.toVf(q, false);
        Q.exam(false, "n2"); const exVf = AA.ctx.items.some(it => it.q.vf); location.hash = "#/home";
        return { overlap, vfN, vfOkAll, t1: t1.a === 0 && t1.q.includes(q.c[q.a]), t0: t0.a === 1 && !t0.q.includes("« " + q.c[q.a] + " »"), neg: !Q.vfOk(C.qById["accidents-5"]), exVf, rec: S.recentQ.length > 0 && S.recentQ.length <= 150 }; });
      ok(r.overlap <= 5, `séries d’un même thème : ${r.overlap} question(s) sur 10 reprises de la série précédente (maxi 5)`);
      ok(r.rec, "mémoire des questions servies : bornée à 150");
      ok(r.vfN >= 6 && r.vfOkAll, `vrai ou faux dans les séries de thème (${r.vfN} sur 6 séries), réponse juste et ordre Vrai / Faux fixe`);
      ok(r.t1 && r.t0, "vrai ou faux : proposition vraie ou fausse correctement corrigée");
      ok(r.neg && !r.exVf, "vrai ou faux : jamais sur une question négative ni en brevet blanc");
      await ctx.close(); }

    console.log("• Combats et aventures épiques (2.10)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p);
      await p.evaluate(() => { AA.S.unlockAll = false; delete AA.S.story["boss-n2"]; AA.store.save(true); });
      await p.goto(URL + "#/home"); await p.waitForTimeout(400);
      ok(!!(await p.$("#epadv a[href='#/story/boss-n2']")), "accueil : l’aventure du boss est proposée");
      await p.goto(URL + "#/boss/n2"); await p.waitForTimeout(400);
      ok(await p.evaluate(() => !AA.game.bossOpen("n2") && !!document.querySelector(".ep-lock") && !document.querySelector("#btGo") && !!document.querySelector("a[href='#/story/boss-n2']")), "boss verrouillé tant que son aventure n’est pas vécue");
      await p.goto(URL + "#/story/boss-n2"); await p.waitForTimeout(400);
      ok(!!(await p.$(".ep-chap")) && !!(await p.$(".ep-lurk")), "aventure : chapitre annoncé et boss qui rôde");
      await p.goto(URL + "#/jeux/n2"); await p.waitForTimeout(400);
      ok(!!(await p.$(".ep-advs")) && !!(await p.$(".ep-advlist a[href^='#/story/']")), "jeux : les aventures sont listées");
      await p.evaluate(() => { AA.S.story["boss-n2"] = { done: AA.u.today(), node: "q1" }; AA.store.save(true); });
      await p.goto(URL + "#/boss/n2"); await p.waitForTimeout(400);
      ok(await p.evaluate(() => AA.game.bossOpen("n2") && !document.querySelector(".ep-lock")), "boss ouvert une fois l’aventure terminée");
      await p.click("#btGo"); await p.waitForTimeout(500);
      ok(!!(await p.$(".ep-cine")) && !!(await p.$(".ep-hp")), "combat : entrée du boss et barre de vie");
      const wrong = () => p.evaluate(() => { const B = AA.games.battle(); if (!B) return false; const q = AA.games.qs()[B.i]; const x = [...document.querySelectorAll(".bt-c")].find(e => +e.dataset.ci !== q.a); x && x.click(); return !!x; });
      const right = () => p.evaluate(() => { const B = AA.games.battle(); if (!B) return false; const q = AA.games.qs()[B.i]; const x = [...document.querySelectorAll(".bt-c")].find(e => +e.dataset.ci === q.a); x && x.click(); return !!x; });
      await wrong(); await p.waitForTimeout(300);
      ok(!!(await p.$(".ep-atk")), "combat : le boss riposte avec une attaque nommée");
      /* « Suivant » pressé avant l’impact : le coup compte. */
      await p.click("#btNext"); await p.waitForTimeout(200); const hp0 = await p.evaluate(() => AA.games.battle().hp);
      await right(); await p.waitForTimeout(80); await p.click("#btNext"); await p.waitForTimeout(150);
      ok(await p.evaluate(h => AA.games.battle().hp === h - 1, hp0), "combat : un coup compte même si l’on passe vite à la suite");
      for (let i = 0; i < 40 && !(await p.$(".bt-res")); i++) { if (await p.$("#btNext")) await p.click("#btNext"); await p.waitForTimeout(120); await right(); await p.waitForTimeout(520); }
      ok(!!(await p.$(".bt-res.won")) && !!(await p.$(".ep-res.win")), "combat : victoire mise en scène");
      await p.evaluate(() => { AA.S.unlockAll = true; AA.store.save(true); }); await p.goto(URL + "#/gardien/pression"); await p.waitForTimeout(400); await p.click("#btGo"); await p.waitForTimeout(500);
      ok(!!(await p.$(".ep-cine")) && !!(await p.$(".ep-hp")), "gardien : entrée et barre de vie");
      await ctx.close(); }

    console.log("• Briefing, successives, défis, club (1.9)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.content.computer.length >= 19 && AA.content.qById["pc-" + (AA.content.computer.length - 1)]), "mode ordinateur : nouveaux cas ajoutés à la fin");
      await p.goto(URL + "#/brief"); await p.waitForTimeout(250); await p.click('.tile[data-t="gp"]'); await p.waitForTimeout(250);
      ok(await p.$(".br-card .br-facts") && (await p.$$(".br-it")).length >= 12, "briefing : plongée tirée au hasard et liste à trier");
      const idx = await p.evaluate(() => AA.ctx.brief.items.map((x, i) => x.ok ? i : -1).filter(i => i >= 0));
      for (const i of idx) await p.click(`.br-it[data-i="${i}"]`);
      await p.click("#brv"); await p.waitForTimeout(150); ok(await p.$(".br-it.res.good") && !(await p.$(".br-it.res.wrong")), "briefing : correction du contenu"); await p.click("#brn"); await p.waitForTimeout(150);
      for (let i = 0; i < 6; i++) { await p.click(`[data-p="${i}"]`); await p.waitForTimeout(60); }
      await p.click("#brv"); await p.waitForTimeout(120); ok((await p.$$(".br-order li.good")).length === 6, "briefing : ordre des parties vérifié"); await p.click("#brn"); await p.waitForTimeout(150);
      for (let i = 0; i < 8 && !(await p.$(".result")); i++) { const a = await p.evaluate(() => AA.ctx.brief.qs[AA.ctx.brief.qi].a); await p.click(`.opt[data-k="${a}"]`); await p.waitForTimeout(80); await p.click("#brn"); await p.waitForTimeout(100); }
      ok(await p.$(".result") && await p.$(".br-model .br-step") && await p.evaluate(() => AA.S.v19.brief === 1 && AA.v19.week().c.brief === 1), "briefing : réussi, briefing modèle, compté pour les défis");
      await p.goto(URL + "#/succ"); await p.waitForTimeout(250); await p.click('.tile[data-t="go"]'); await p.waitForTimeout(250);
      ok(await p.$(".su-case .su-svg"), "successives : cas illustré (profil des deux plongées)");
      for (let i = 0; i < 12 && !(await p.$(".result")); i++) { const a = await p.evaluate(() => AA.ctx.succ.steps[AA.ctx.succ.i].a); await p.click(`.opt[data-k="${a}"]`); await p.waitForTimeout(80); await p.click("#sun"); await p.waitForTimeout(100); }
      ok(await p.evaluate(() => AA.S.v19.succ === 1), "successives : cas résolu sans faute");
      await p.goto(URL + "#/quests"); await p.waitForTimeout(300); ok(await p.evaluate(() => AA.router.name === "quests" && !!document.querySelector(".wk-full")), "jeux de retour : quêtes, défis de la semaine");
      await p.goto(URL + "#/aquarium"); await p.waitForTimeout(300); ok(await p.evaluate(() => AA.router.name === "aquarium" && AA.content.creatures.length > 10), "jeux de retour : aquarium");
      await p.goto(URL + "#/story"); await p.waitForTimeout(300); ok(await p.evaluate(() => AA.router.name === "story" && document.querySelectorAll(".story-card").length > 0), "jeux de retour : aventures");
      await p.goto(URL + "#/jeux"); await p.waitForTimeout(300); ok(await p.$(".gx-day") && await p.$('a[href="#/aquarium"]') && await p.$('a[href="#/story"]'), "espace Jeux : quotidien, aventures et aquarium regroupés");
      await p.goto(URL + "#/home"); await p.waitForTimeout(300); ok(await p.$(".gx-home") && !(await p.$(".wk-card")), "accueil calme : une seule petite carte Jeux");
      await p.evaluate(() => AA.tour.start(0)); await p.waitForTimeout(300);
      ok(await p.$(".tour .tour-card") && (await p.$$(".tour-dots button")).length === await p.evaluate(() => AA.tour.STEPS.length), "visite guidée : s’ouvre avec ses étapes");
      await p.click('[data-tour="next"]'); await p.waitForTimeout(250); ok(await p.evaluate(() => AA.S.tour.step === 1 && !document.querySelector(".tour.free")), "visite : étape suivante, menu mis en lumière");
      await p.click('[data-tour-go="6"]'); await p.waitForTimeout(250); ok(await p.evaluate(() => AA.S.tour.step === 6), "visite : saut direct à une étape");
      await p.click('[data-tour="skip"]'); await p.waitForTimeout(250); ok(!(await p.$(".tour")) && await p.evaluate(() => AA.S.tour.skip === 1 && AA.S.tour.step === 6), "visite : passer toute la visite, étape gardée");
      await p.goto(URL + "#/profile"); await p.waitForTimeout(300); await p.click('.tile[data-t="tour"]'); await p.waitForTimeout(800);
      ok(await p.evaluate(() => !!document.querySelector(".tour") && document.querySelector(".tour-dots .on") === document.querySelectorAll(".tour-dots button")[6]), "visite : reprise depuis Profil à la bonne étape");
      await p.keyboard.press("Escape"); await p.waitForTimeout(200); ok(!(await p.$(".tour")), "visite : Échap la ferme");
      await p.evaluate(() => { const S = AA.S; S.days = []; for (let i = 8; i >= 0; i--) S.days.push(AA.u.addDays(-i)); S.flCel = 0; AA.store.save(true); AA.ui.hud(); document.querySelectorAll(".toasts,.toast").forEach(x => x.remove()); });
      await p.click('#topbar [data-hud="streak"]'); await p.waitForTimeout(400);
      ok(await p.evaluate(() => { const c = [...document.querySelectorAll(".fl-cal i")], tdy = c.findIndex(x => x.classList.contains("today")); return c.length === 35 && tdy >= 28 && c[tdy].classList.contains("cur") && c.filter(x => x.classList.contains("cur")).length === 9 && !!document.querySelector(".fl.fl-t3"); }), "série : calendrier lundi→dimanche, aujourd’hui en dernière semaine, flamme du palier");
      await p.waitForTimeout(1300); ok(await p.$(".fl-cel") && await p.evaluate(() => AA.S.flCel === 7), "série : palier 7 jours célébré une fois");
      await p.keyboard.press("Escape"); await p.waitForTimeout(300);
      await p.goto(URL + "#/club"); await p.waitForTimeout(250);
      const card = await p.evaluate(() => AA.v19.encode("AAC1", { id: "zz9", n: "Léa", x: 4200, l: 7, wk: AA.v19.isoWeek(), wx: 300, s: 4, e: 14.5, t: Date.now() }));
      await p.fill("#clin", "Voici ma carte : " + card + " à bientôt"); await p.click("#clgo"); await p.waitForTimeout(1200);
      ok((await p.$$(".cl-list li")).length === 2 && /Léa/.test(await p.textContent(".cl-list")), "club : carte de score ajoutée au classement");
      await p.fill("#clin", card.slice(0, 20) + (card[20] === "A" ? "B" : "A") + card.slice(21)); await p.click("#clgo"); await p.waitForTimeout(200);
      ok(/modifié|incomplet/.test(await p.textContent("#clout")), "club : code abîmé refusé avec un message clair");
      await p.click("#clnew"); await p.waitForTimeout(250);
      for (let i = 0; i < 14 && !(await p.$(".result")); i++) { const c = await p.$(".choice:not([disabled])"); if (c) await c.click(); await p.waitForTimeout(70); }
      const code = await p.inputValue(".cl-code textarea"); ok(/^AAD1\./.test(code), "duel à distance : code du défi après la partie");
      const B = await newPage(b, 390, 844); await B.p.goto(URL); await seed(B.p); await B.p.evaluate(() => { AA.S.profile.name = "Lou"; AA.store.save(); });
      await B.p.goto(URL + "#/club/d/" + code); await B.p.waitForTimeout(500); ok(await B.p.$(".cl-chal #clplay"), "duel à distance : le lien ouvre le défi chez l’ami");
      await B.p.click("#clplay"); await B.p.waitForTimeout(250);
      for (let i = 0; i < 14 && !(await B.p.$(".result")); i++) { const c = await B.p.$(".choice:not([disabled])"); if (c) await c.click(); await B.p.waitForTimeout(70); }
      ok(await B.p.$(".result .cl-vs"), "duel à distance : résultat comparé chez l’ami");
      const reply = await B.p.inputValue(".cl-code textarea"); await B.ctx.close();
      await p.goto(URL + "#/club"); await p.waitForTimeout(250); await p.fill("#clin", reply); await p.click("#clgo"); await p.waitForTimeout(250);
      ok(await p.$("#clout .cl-vs") && await p.evaluate(() => AA.S.v19.duels.some(d => d.role === "a" && d.opp && d.opp.n === "Lou")), "duel à distance : la réponse donne le résultat chez le lanceur");
      const m = await p.evaluate(() => { const a = AA.S, b = JSON.parse(JSON.stringify(a)); b.savedAt = (a.savedAt || 0) + 5; b.v19.club.members.yy1 = { id: "yy1", n: "Max", x: 10, t: 1 }; b.v19.brief = 0; const r = AA.store.merge(a, b); return r.v19.club.members.zz9 && r.v19.club.members.yy1 && r.v19.brief === 1; });
      ok(m, "fusion de sauvegardes : club et compteurs 1.9 conservés");
      const rz = await p.evaluate(() => { const old = JSON.parse(JSON.stringify(AA.S)); old.xp = 99999; old.savedAt = Date.now() + 9e6; const fresh = Object.assign(AA.store.FRESH(), { resetAt: Date.now(), savedAt: Date.now(), xp: 5 }); const a = AA.store.merge(old, fresh), b = AA.store.merge(fresh, old), c = AA.store.merge(AA.store.FRESH(), AA.store.FRESH()); return a.xp === 5 && b.xp === 5 && !!a.resetAt && !c.resetAt && !Object.keys((a.v19 && a.v19.club && a.v19.club.members) || {}).length; });
      ok(rz, "réinitialisation « Drive compris » : l’ancienne progression ne revient pas par la synchro");
      const rsd = await p.evaluate(() => { const s0 = AA.sync.possible, c0 = AA.sync.clientId; AA.sync.possible = () => true; AA.sync.clientId = () => "test"; AA.resetFlow(); document.querySelector("#rsnext").click(); const ok = !!document.querySelector("#rsdrive"); AA.sync.possible = s0; AA.sync.clientId = c0; document.querySelector(".sheet-wrap [data-no]").click(); return ok; });
      ok(rsd, "réinitialiser : case « effacer aussi le Google Drive » proposée");
      ok(await p.evaluate(() => { const F = AA.store.FRESH(), on = { profile: { onboarded: true } }, f = AA.sync.onbAfter; return f(false, F, false) === false && f(true, F, false) === true && f(false, on, false) === true && f(true, F, true) === false; }),
        "synchro Drive après réinitialisation : l’accueil (prénom, niveau, plongées) n’est plus sauté");
      { const R = await newPage(b, 390, 844); await R.p.goto(URL); await seed(R.p); await R.p.goto(URL + "#/settings"); await R.p.waitForTimeout(300);
        await R.p.evaluate(() => AA.resetFlow()); await R.p.waitForTimeout(200); await R.p.click("#rsnext"); await R.p.waitForTimeout(150);
        await R.p.check("#rsok"); await R.p.click("#rsnext"); await R.p.waitForTimeout(150); await R.p.fill("#rsword", "EFFACER");
        await R.p.waitForFunction(() => { const g = document.querySelector("#rsgo"); return g && !g.disabled; }, null, { timeout: 8000 }); await R.p.click("#rsgo"); await R.p.waitForTimeout(800);
        ok(await R.p.evaluate(() => AA.router.name === "welcome" && !AA.S.profile.onboarded && AA.S.xp === 0), "tout réinitialiser : retour à l’accueil du début (prénom, niveau, plongées, objectif)");
        await R.ctx.close(); }
      /* 2.2.2 : reprendre une série là où on s'était arrêté */
      { const R = await newPage(b, 390, 844); await R.p.goto(URL); await seed(R.p);
        const ans = async n => { for (let i = 0; i < n; i++) { await R.p.click(".choice:not([disabled])"); await R.p.waitForTimeout(120); if (i < n - 1) { await R.p.click("#nextq"); await R.p.waitForTimeout(120); } } };
        await R.p.evaluate(() => AA.path.startPlacement("n2")); await R.p.waitForTimeout(300); await ans(3);
        await R.p.reload(); await ready(R.p); await R.p.goto(URL + "#/home"); await R.p.waitForTimeout(400);
        ok(await R.p.$(".run-card") && /3 \/ /.test(await R.p.textContent(".run-card")), "série en cours : l’accueil propose « Reprendre » (3 réponses gardées)");
        await R.p.evaluate(() => AA.path.startPlacement("n2")); await R.p.waitForTimeout(400);
        ok(await R.p.evaluate(() => AA.router.name === "quiz" && AA.ctx.mode === "place" && AA.ctx.answers.length === 3 && AA.ctx.idx === 3), "positionnement relancé après fermeture : reprise à la question 4");
        await ans(1); await R.p.reload(); await ready(R.p); await R.p.goto(URL + "#/quiz"); await R.p.waitForTimeout(400);
        ok(await R.p.evaluate(() => AA.router.name === "quiz" && AA.ctx.answers.length === 4 && AA.ctx.idx === 4), "rechargement en pleine série : reprise directe, réponse donnée gardée");
        await R.p.click("#qclose"); await R.p.waitForTimeout(200); const yes = await R.p.$(".sheet-wrap.cf [data-ok]"); if (yes) await yes.click(); await R.p.waitForTimeout(400);
        ok(await R.p.evaluate(() => AA.router.name === "home") && /4 \/ /.test(await R.p.textContent(".run-card")), "2.2.5 : la croix met en pause, retour à l’accueil, série gardée");
        await R.p.evaluate(() => AA.path.startPlacement("n2")); await R.p.waitForTimeout(400);
        ok(await R.p.evaluate(() => AA.router.name === "quiz" && AA.ctx.answers.length === 4 && AA.ctx.idx === 4), "après la pause, le positionnement reprend à la question 5");
        await R.p.goto(URL + "#/home"); await R.p.waitForTimeout(300); await R.p.click('[data-run="drop"]'); await R.p.waitForTimeout(200); const y2 = await R.p.$(".sheet-wrap.cf [data-ok]"); if (y2) await y2.click(); await R.p.waitForTimeout(400);
        ok(!(await R.p.$(".run-card")) && await R.p.evaluate(() => !AA.run.get()), "« Abandonner » sur l’accueil : la série est supprimée");
        await R.p.evaluate(() => { const S = AA.S; S.days = [AA.u.today()]; AA.store.save(true); AA.ui.hud(); }); await R.p.click('#topbar [data-hud="streak"]'); await R.p.waitForTimeout(500);
        ok(await R.p.evaluate(() => { const i = document.querySelector(".fl-cal i.today"), s = i.querySelector("span"), a = i.getBoundingClientRect(), r = s.getBoundingClientRect(), f = i.querySelector("b").getBoundingClientRect(); return Math.abs((a.left + a.right) / 2 - (r.left + r.right) / 2) < 2 && f.right <= a.right + 1 && f.top >= a.top - 1; }), "série : numéro du jour centré, flamme dans la case");
        await R.p.keyboard.press("Escape"); await R.p.waitForTimeout(200);
        /* 2.2.3 : « Je ne sais pas » */
        await R.p.evaluate(() => AA.quiz.start("module", AA.content.byId.pression.quiz.slice(0, 3), { module: "pression", title: "t", back: "home" })); await R.p.waitForTimeout(300);
        await R.p.click("#qdk"); await R.p.waitForTimeout(300);
        ok(await R.p.evaluate(() => { const q = AA.ctx.items[0].q; return AA.ctx.answers[0].picked === -1 && !AA.ctx.answers[0].ok && !!AA.S.errors[q.id] && !!document.querySelector(".choice.good") && !document.querySelector(".choice.wrong") && /Pas grave/.test(document.querySelector(".feedback").textContent); }), "quiz : « Je ne sais pas » montre la réponse et la garde à revoir");
        for (let i = 0; i < 2; i++) { await R.p.click("#nextq"); await R.p.waitForTimeout(150); await R.p.click("#qdk"); await R.p.waitForTimeout(150); }
        await R.p.click("#nextq"); await R.p.waitForTimeout(300);
        ok(await R.p.evaluate(() => AA.ctx.done && !/undefined/.test(document.querySelector("#view").innerText) && /ne savais pas/.test(document.querySelector("#view").innerText)), "quiz : bilan lisible après des « Je ne sais pas »");
        /* 2.8 : le gardien demande le cours lu et le quiz du thème réussi. */
        await R.p.evaluate(() => { AA.S.read.pression = Object.assign({}, AA.S.read.pression, { e: AA.u.today(), x: 1 }); AA.S.themes.pression = Object.assign({ tries: 1 }, AA.S.themes.pression, { best: Math.max(60, (AA.S.themes.pression || {}).best || 0) }); AA.store.save(true); });
        await R.p.goto(URL + "#/gardien/pression"); await R.p.waitForTimeout(300); await R.p.click("#btGo"); await R.p.waitForTimeout(400);
        await R.p.click("#btDk"); await R.p.waitForTimeout(900);
        ok(await R.p.evaluate(() => document.querySelectorAll("#btLives span.off").length === 1 && !!document.querySelector(".bt-c.good") && !document.querySelector("#btDk")), "combat : « Je ne sais pas » montre la réponse (une vie perdue)");
        await R.ctx.close(); }
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
      await p.goto(URL + "#/train"); await p.waitForTimeout(250); await p.click('.tile[data-t="five"]'); await p.waitForTimeout(300);
      for (let i = 0; i < 14 && !(await p.$(".result")); i++) {
        if (await p.$("#show")) { await p.click("#show"); await p.waitForTimeout(80); await p.click("#yes"); }
        else { await p.click(".choice >> nth=0"); await p.waitForTimeout(60); const n = await p.$("#nextq"); if (n) await n.click(); }
        await p.waitForTimeout(80);
      }
      ok(await p.$(".result") && await p.evaluate(() => AA.S.five >= 1), "session 5 minutes terminée et comptée");
      /* Recherche et glossaire */
      await p.goto(URL + "#/search"); await p.fill("#sq", "narcose"); await p.waitForTimeout(250);
      ok(await p.$(".sr-best") && (await p.$$(".sr-row")).length > 0, "la recherche trouve « narcose » (meilleur résultat + groupes)");
      ok(await p.evaluate(() => { const S = AA.search; const top = q => (S.query(q).list[0] || {}).title || "";
        return /octopus/i.test(top("ocotpus")) && /octopus/i.test(top("detendeur de secours")) && /narcose/i.test(top("NARCOZE")) && /manom/i.test(top("mano")) && S.query("ocotpus").fuzzy && S.query("palliers").list.length > 0; }), "recherche : fautes, majuscules, accents et synonymes de plongée");
      await p.fill("#sq", "pression partielle"); await p.waitForTimeout(250);
      ok(/\d/.test(await p.textContent('#sf [data-f="question"]')) && await p.$(".sr-grp .sr-h"), "recherche : compteurs par type et résultats groupés");
      await p.click('[data-lv="n3"]'); await p.waitForTimeout(200);
      ok(await p.evaluate(() => [...document.querySelectorAll(".sr-row .sr-lv")].every(x => x.textContent.trim() === "N3")), "recherche : filtre par niveau");
      await p.click('[data-lv="all"]'); await p.waitForTimeout(150);
      await p.evaluate(() => { const L = AA.search.query("loi de dalton chaque gaz").list; const i = L.findIndex(x => x.type === "section"); AA.search.goTo(L[i], "x"); }); await p.waitForTimeout(600);
      ok(/#\/lesson\/dalton/.test(await p.evaluate(() => location.hash)) && await p.$(".lesson-body .sr-flash"), "recherche : lien direct vers le passage du cours");
      await p.goto(URL + "#/search"); await p.fill("#sq", "zzqxw"); await p.waitForTimeout(250);
      ok(await p.$(".sr-empty"), "recherche : état vide utile");
      await p.fill("#sq", ""); await p.waitForTimeout(200); ok(await p.$(".sr-browse .sr-tile"), "recherche : accueil avec raccourcis et idées");
      await p.goto(URL + "#/lesson/dalton"); await p.waitForTimeout(250);
      ok((await p.$$(".prose .gl")).length > 0, "mots du glossaire cliquables dans un cours");
      /* 2.2 : onglet Carte, boss, gardiens, mini-jeux */
      ok(await p.$('.tabbar [data-tab="map"]') && (await p.$$(".tabbar .tab")).length === 6, "onglet Carte à part (6 onglets)");
      const bossIds = await p.evaluate(() => AA.content.worlds.filter(w => w.boss && !w.soon).map(w => w.id));
      const bossBad = [];
      for (const wid of bossIds) { await p.goto(URL + "#/boss/" + wid); await p.waitForTimeout(250); if (!(await p.evaluate(() => AA.router.name === "boss" && !!document.querySelector(".bt-intro")))) bossBad.push(wid); }
      ok(bossIds.length >= 8 && !bossBad.length, `chaque boss s’ouvre (${bossIds.length}) ${bossBad.join(",")}`);
      await p.evaluate(() => { AA.S.unlockAll = true; AA.store.save(true); });
      const fightBad = [];
      for (const wid of bossIds) { await p.goto(URL + "#/boss/" + wid); await p.waitForTimeout(200); const go = await p.$("#btGo"); if (!go) { fightBad.push(wid); continue; } await go.click(); await p.waitForTimeout(250); if (!(await p.$("#btA .bt-boss")) || !(await p.$(".bt-c"))) fightBad.push(wid); }
      ok(!fightBad.length, "chaque boss se combat : arène, boss et questions " + fightBad.join(","));
      await p.evaluate(() => { AA.S.unlockAll = false; AA.store.save(true); });
      ok(await p.evaluate(() => AA.S.path.n2 !== "learn" || !AA.game.bossOpen("n2") || AA.game.questDone("n2")), "boss : la quête du gardien est demandée avant le combat");
      await p.evaluate(() => { AA.S.story["boss-n2"] = { done: AA.u.today(), node: "q1" }; AA.store.save(true); });
      await p.goto(URL + "#/boss/n2"); await p.waitForTimeout(200); await p.click("#btGo"); await p.waitForTimeout(300);
      const hp0 = await p.evaluate(() => document.querySelectorAll("#btHp i:not(.off)").length);
      await p.evaluate(() => { const q = document.querySelector(".bt-qt").textContent, Q = AA.content.questions.find(x => x.q === q); [...document.querySelectorAll(".bt-c")].find(b => +b.dataset.ci === Q.a).click(); }); await p.waitForTimeout(700);
      ok(await p.evaluate(() => document.querySelectorAll("#btHp i:not(.off)").length) === hp0 - 1 && await p.$("#btNext"), "combat : bonne réponse = le boss perd un PV");
      await p.evaluate(() => document.querySelectorAll(".toast").forEach(x => x.remove())); await p.click("#btNext"); await p.waitForTimeout(200);
      await p.evaluate(() => { const q = document.querySelector(".bt-qt").textContent, Q = AA.content.questions.find(x => x.q === q); [...document.querySelectorAll(".bt-c")].find(b => +b.dataset.ci !== Q.a).click(); }); await p.waitForTimeout(800);
      ok(await p.evaluate(() => document.querySelectorAll("#btLives span.off").length) === 1 && await p.$(".bt-c.good"), "combat : erreur = une vie perdue et la bonne réponse montrée");
      await p.evaluate(() => { AA.S.themes.pression = Object.assign({ tries: 1 }, AA.S.themes.pression, { best: 60 }); AA.store.save(true); });
      await p.goto(URL + "#/gardien/pression"); await p.waitForTimeout(250); ok(await p.$("#btGo"), "gardien d’un cours lu et entraîné prêt au combat");
      await p.goto(URL + "#/jeux/n2"); await p.waitForTimeout(250); ok((await p.$$(".gm-g")).length === 12 && await p.$(".gm-final"), "jeux : gardiens et boss final du niveau");
      await p.goto(URL + "#/paires"); await p.waitForTimeout(250); ok((await p.$$(".pg-card")).length === 12, "Paires : 12 cartes");
      await p.goto(URL + "#/vraifaux"); await p.waitForTimeout(250); await p.click("#vfGo"); await p.waitForTimeout(250); ok(await p.$("#vfCard") && await p.$("[data-v='1']"), "Vrai ou faux : partie lancée");
      await p.goto(URL + "#/map/n2"); await p.waitForTimeout(300); await p.goto(URL + "#/lesson/pression"); await p.waitForTimeout(250);
      ok(/#\/map\/n2/.test(await p.getAttribute(".pagehead a.closebtn", "href")), "cours ouvert depuis la carte : retour vers la carte");
      await p.goto(URL + "#/cours/n2"); await p.waitForTimeout(250); await p.goto(URL + "#/lesson/pression"); await p.waitForTimeout(250);
      ok(/#\/cours\/n2/.test(await p.getAttribute(".pagehead a.closebtn", "href")), "cours ouvert depuis Cours : retour vers la liste");
      /* Correction détaillée : méthode pas à pas + revoir le cours sans quitter */
      await p.evaluate(() => AA.quiz.start("gen", [AA.game.gen("prof")], { title: "t", back: "home" })); await p.waitForTimeout(300);
      const wrongCi = await p.evaluate(() => { const q = AA.ctx.items[0].q; return (q.a + 1) % q.c.length; });
      await p.click(`.choice[data-ci="${wrongCi}"]`); await p.waitForTimeout(150);
      const exp = await p.evaluate(() => ({ m: !!document.querySelector(".feedback details.method[open] ol li"), pit: !!document.querySelector(".feedback .pit"), rev: !!document.querySelector("#revcours") }));
      await p.click("#revcours"); await p.waitForTimeout(200);
      const sheet = await p.evaluate(() => !!document.querySelector(".rev-sheet .prose") && AA.router.name === "quiz");
      ok(exp.m && exp.pit && exp.rev && sheet, "correction : méthode pas à pas, piège classique et cours sans quitter la série");
      await p.keyboard.press("Escape");
      /* Labo : chaque tuile ouvre son propre écran */
      await p.goto(URL + "#/train"); await p.waitForTimeout(200);
      const tiles = ["sim", "pc", "scen", "tables", "brief", "succ", "calc"], opened = [];
      for (const id of tiles) { await p.goto(URL + "#/train"); await p.waitForTimeout(150); await p.click(`.tile[data-t="${id}"]`); await p.waitForTimeout(250); opened.push(await p.evaluate(() => AA.router.name) === id ? id : id + "→" + await p.evaluate(() => AA.router.name)); }
      ok(opened.every(x => !x.includes("→")), "chaque atelier ouvre son écran : " + opened.join(", "));
      await p.goto(URL + "#/pc"); await p.waitForTimeout(200); await p.click('.tile[data-t="quick"]'); await p.waitForFunction(() => AA.router.name === "quiz", null, { timeout: 4000 }).catch(() => {});
      ok(await p.evaluate(() => AA.router.name === "quiz" && AA.ctx.mode === "pc" && AA.ctx.items.length === 6 && !!document.querySelector("#view .dc")), "mode ordinateur : série rapide avec écran");
      await p.goto(URL + "#/train"); await p.waitForTimeout(150); await p.click(`.tile[data-t="scen"]`); await p.waitForTimeout(250); const sid = await p.$eval("#view .tile", b => b.dataset.t); await p.click("#view .tile"); await p.waitForTimeout(250);
      ok(await p.evaluate(s => location.hash === "#/scen/" + s && !!document.querySelector(".qcard"), sid), "scénario ouvert depuis les ateliers (aucun clic fantôme)");
      /* Simulateur : pause */
      await p.goto(URL + "#/sim"); await p.waitForTimeout(250); await p.click("#sdown"); await p.waitForTimeout(600);
      await p.click("#spp"); const t1 = await p.evaluate(() => AA.ctx.sim.t); await p.waitForTimeout(600);
      const t2 = await p.evaluate(() => AA.ctx.sim.t), shown = await p.isVisible("#spause");
      await p.keyboard.press("Space"); await p.waitForTimeout(500); const t3 = await p.evaluate(() => AA.ctx.sim.t);
      ok(t1 > 0 && t1 === t2 && shown && t3 > t2, "simulateur : la pause fige le temps, Espace reprend");
      await p.evaluate(() => { AA.ctx.sim = null; });
      /* Tuteur (2.0) : cours lu obligatoire, notions, lacunes */
      await p.evaluate(() => { AA.S.unlockAll = false; delete AA.S.read.archimede; delete AA.S.themes.archimede; Object.keys(AA.S.nstat || {}).forEach(k => k.startsWith("archimede:") && delete AA.S.nstat[k]); AA.store.save(true); });
      await p.goto(URL + "#/lesson/archimede"); await p.waitForTimeout(300);
      ok(await p.$('[data-turead="archimede"]') && /Quiz après lecture/.test(await p.textContent("#dive")), "cours non lu : bouton « J’ai lu ce cours » et quiz fermé");
      await p.evaluate(() => AA.quiz.module(AA.content.byId.archimede)); await p.waitForTimeout(250);
      ok(await p.evaluate(() => AA.router.name === "lesson" && !!document.querySelector(".tu-sheet") && /Lis d’abord/.test(document.querySelector(".tu-sheet").textContent)), "quiz d’un cours non lu : bloqué, lien vers le cours");
      await p.keyboard.press("Escape"); await p.waitForTimeout(100);
      ok(await p.evaluate(() => { AA.quiz.daily(); return !AA.ctx.items || AA.ctx.items.every(it => !it.q.m || !AA.content.byId[it.q.m] || it.q.m !== "archimede"); }), "révisions : aucune question d’un cours non lu");
      await p.goto(URL + "#/lesson/archimede"); await p.waitForTimeout(250); await p.click('[data-turead="archimede"]'); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.tutor.isRead("archimede") && !!document.querySelector(".tu-read.done") && !!document.querySelector(".tu-notcard .tu-nrow")), "cours marqué lu : quiz ouvert, notions affichées");
      await p.goto(URL + "#/home"); await p.waitForTimeout(250);
      { const nx = await p.textContent(".tu-next"); ok(/Archimède/.test(nx), "accueil : la prochaine étape propose le quiz du cours lu (" + nx.replace(/\s+/g, " ").slice(0, 120) + ")"); }
      const gap = await p.evaluate(() => { const T = AA.tutor, q = T.qsOf("archimede:poussee")[0]; AA.game.record(q, false); AA.game.record(q, false); return T.isGap("archimede:poussee") && T.gaps().some(g => g.id === "archimede:poussee"); });
      ok(gap, "deux erreurs sur une notion : lacune détectée");
      await p.evaluate(() => AA.tutor.drill("archimede:poussee")); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.ctx.mode === "drill" && AA.ctx.items.length >= 4), "lacune : série ciblée sur la notion");
      for (let i = 0; i < 8 && !(await p.$(".result")); i++) { const a = await p.evaluate(() => { const it = AA.ctx.items[AA.ctx.idx]; return it ? it.q.a : 0; }); const c = await p.$(`.choice[data-ci="${a}"]`); if (c) await c.click(); await p.waitForTimeout(60); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(60); }
      ok(await p.evaluate(() => !!(AA.S.gapChk || {})["archimede:poussee"]), "lacune travaillée : vérification programmée");
      await p.goto(URL + "#/cours/n2"); await p.waitForTimeout(250); ok((await p.$$(".tu-step")).length === 13, "écran Cours : 12 cours dans l’ordre et l’examen blanc");
      await p.goto(URL + "#/progres"); await p.waitForTimeout(250); ok(await p.$(".tu-mod .tu-nrow"), "écran Progrès : maîtrise notion par notion");
      /* Avatar */
      await p.goto(URL + "#/profile"); await p.waitForTimeout(200); await p.click("#avedit"); await p.waitForTimeout(150);
      await p.click('[data-hair="2"]'); await p.click('[data-k="suit"] [data-v="3"]'); await p.click("#avok"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.S.profile.avatar && AA.S.profile.avatar.hair === 2 && AA.S.profile.avatar.suit === 3 && !!document.querySelector(".profile .ava")), "avatar modifié et enregistré");
      ok(await p.evaluate(() => { const a = AA.avatar; return a.STAGES.length === 10 && a.stage(1) === 0 && a.stage(3) === 1 && a.stage(49) === 8 && a.stage(50) === 9 && /ava-s4 ava-t9/.test(a.svg(a.get(), 50)) && /ava-t3/.test(a.svg(a.get(), 10)); }), "avatar : évolutions par niveau");
      /* Compagnons : évolution */
      await p.click("#avedit"); await p.waitForTimeout(150); await p.click('[data-kind="creature"]'); await p.waitForTimeout(100);
      const nComp = (await p.$$(".ava-comp")).length; await p.click('.ava-comp[data-cid="poulpe"]'); await p.click("#avok"); await p.waitForTimeout(150);
      ok(nComp >= 15 && await p.evaluate(() => { const a = AA.avatar, av = a.get(); return av.kind === "creature" && av.id === "poulpe" && a.formName(av, 1) === "Poulpinet" && a.formName(av, 40) === "Kraken des abysses" && a.formName(av, 50) === "Kraken des abysses ★"; }), `compagnons : ${nComp} au choix, le poulpe évolue en Kraken`);
      /* Réinitialisation : 3 étapes, bouton bloqué tant que le mot n'est pas tapé */
      await p.goto(URL + "#/settings"); await p.waitForTimeout(200); await p.click("#reset"); await p.waitForTimeout(150);
      await p.click("#rsnext"); await p.waitForTimeout(100);
      const lock2 = await p.$eval("#rsnext", b => b.disabled); await p.check("#rsok"); await p.click("#rsnext"); await p.waitForTimeout(100);
      await p.fill("#rsword", "effacer"); const lock3 = await p.$eval("#rsgo", b => b.disabled);
      await p.waitForFunction(() => !document.querySelector("#rsgo").disabled, null, { timeout: 8000 }); await p.click("#rsgo"); await p.waitForTimeout(500);
      ok(lock2 && lock3 && await p.evaluate(() => AA.S.xp === 0 && !AA.S.profile.onboarded && AA.router.name === "welcome"), "réinitialisation en 3 étapes, puis retour à l’accueil");
      ok(await p.evaluate(async () => (await AA.store.snapshots()).some(s => s.reset)), "copie « avant réinitialisation » gardée");
      await seed(p); await p.goto(URL + "#/profile"); await p.waitForTimeout(250);
      const pathW = await p.evaluate(() => { const s = document.querySelector(".path li>span"); return s ? s.getBoundingClientRect().width : 0; });
      ok(pathW > 200, "parcours vers E2 : texte sur toute la largeur (" + Math.round(pathW) + " px)");
      await ctx.close(); }

    console.log("• Sauvegardes");
    { const { ctx, p } = await newPage(b, 390, 844);
      /* Appareil qui n’a connu que l’Ardoise : on attend la fin du premier lancement puis on efface aussi la copie IndexedDB. */
      await p.goto(URL); await ready(p); await p.waitForTimeout(300); await p.evaluate(() => new Promise(r => { const d = indexedDB.deleteDatabase("abysse-academy"); d.onsuccess = d.onerror = d.onblocked = () => r(); setTimeout(r, 1500); }));
      await p.evaluate(() => { localStorage.clear(); localStorage.setItem("ardoise-n2-v1", JSON.stringify({ xp: 321, pseudo: "Ancien", themes: { pression: { best: 90, tries: 1 } }, stats: {}, days: [] })); });
      await p.reload(); await ready(p); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.S.xp === 321 && AA.S.profile.name === "Ancien" && AA.S.schema === AA.store.SCHEMA), "reprise d’une sauvegarde Ardoise N2");
      await p.evaluate(() => { localStorage.setItem("abysse-academy", JSON.stringify({ schema: 2, xp: 777, profile: { name: "V1", onboarded: true }, themes: {}, stats: {} })); });
      await p.reload(); await ready(p); await p.waitForTimeout(300);
      ok(await p.evaluate(() => AA.S.xp === 777 && AA.S.schema === AA.store.SCHEMA && AA.S.aqua && AA.S.profile.textSize === 1 && AA.S.profile.level === "n1" && AA.S.certs.n1 && AA.S.profile.goal), "migration du schéma 2 vers 4 sans perte (profil existant : N1 obtenu)");
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
