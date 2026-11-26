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
const ROUTES = ["home", "map/n2", "lesson/pression", "lesson/dalton/approfondir", "train", "flash", "lab", "sim", "pc", "scen", "calc", "tables", "profile", "club", "settings", "cours", "cours/n3", "progres", "moniteur", "search/palier", "jeux", "jeux/n2", "aquarium", "quests", "story", "boss/n2", "boss/n1", "gardien/pression", "paires", "vraifaux", "glossary", "mistakes", "backup", "parcours", "map/decouverte", "map/n3", "lesson/n3-gaz", "lesson/nx-base", "reports", "sources", "valider", "lesson/mariotte", "cursus", "cursus/e2", "lesson/n3-cadre", "lesson/r-cas", "carnet", "examen", "examen/n3/quick", "fiches/n2", "fiches/e2/e2-evaluer", "brief", "brief/gp", "succ", "succ/go"];

async function newPage(b, w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
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
      ok((await p.$$(".exp-bars i")).length >= 3 && await p.$(".exp-step"), "Explique-moi : mini-cours en étapes");
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
        await R.p.goto(URL + "#/home"); await R.p.waitForTimeout(300);
        ok(!(await R.p.$(".run-card")) && await R.p.evaluate(() => !AA.run.get()), "« Quitter » confirmé : la série est abandonnée");
        await R.p.evaluate(() => { const S = AA.S; S.days = [AA.u.today()]; AA.store.save(true); AA.ui.hud(); }); await R.p.click('#topbar [data-hud="streak"]'); await R.p.waitForTimeout(500);
        ok(await R.p.evaluate(() => { const i = document.querySelector(".fl-cal i.today"), s = i.querySelector("span"), a = i.getBoundingClientRect(), r = s.getBoundingClientRect(), f = i.querySelector("b").getBoundingClientRect(); return Math.abs((a.left + a.right) / 2 - (r.left + r.right) / 2) < 2 && f.right <= a.right + 1 && f.top >= a.top - 1; }), "série : numéro du jour centré, flamme dans la case");
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
      await p.goto(URL + "#/boss/n2"); await p.waitForTimeout(200); await p.click("#btGo"); await p.waitForTimeout(300);
      const hp0 = await p.evaluate(() => document.querySelectorAll("#btHp i:not(.off)").length);
      await p.evaluate(() => { const q = document.querySelector(".bt-qt").textContent, Q = AA.content.questions.find(x => x.q === q); [...document.querySelectorAll(".bt-c")].find(b => +b.dataset.ci === Q.a).click(); }); await p.waitForTimeout(700);
      ok(await p.evaluate(() => document.querySelectorAll("#btHp i:not(.off)").length) === hp0 - 1 && await p.$("#btNext"), "combat : bonne réponse = le boss perd un PV");
      await p.click("#btNext"); await p.waitForTimeout(200);
      await p.evaluate(() => { const q = document.querySelector(".bt-qt").textContent, Q = AA.content.questions.find(x => x.q === q); [...document.querySelectorAll(".bt-c")].find(b => +b.dataset.ci !== Q.a).click(); }); await p.waitForTimeout(800);
      ok(await p.evaluate(() => document.querySelectorAll("#btLives span.off").length) === 1 && await p.$(".bt-c.good"), "combat : erreur = une vie perdue et la bonne réponse montrée");
      await p.goto(URL + "#/gardien/pression"); await p.waitForTimeout(250); ok(await p.$("#btGo"), "gardien d’un cours lu prêt au combat");
      await p.goto(URL + "#/jeux/n2"); await p.waitForTimeout(250); ok((await p.$$(".gm-g")).length === 11 && await p.$(".gm-final"), "jeux : gardiens et boss final du niveau");
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
      await p.goto(URL + "#/cours/n2"); await p.waitForTimeout(250); ok((await p.$$(".tu-step")).length === 12, "écran Cours : 11 cours dans l’ordre et l’examen blanc");
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
      await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem("ardoise-n2-v1", JSON.stringify({ xp: 321, pseudo: "Ancien", themes: { pression: { best: 90, tries: 1 } }, stats: {}, days: [] })); });
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
