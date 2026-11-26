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
const ROUTES = ["home", "map/n2", "lesson/pression", "lesson/dalton/approfondir", "train", "flash", "lab", "sim", "pc", "scen", "calc", "tables", "profile", "quests", "club", "settings", "aquarium", "story", "story/anse", "boss/n2", "search/palier", "glossary", "mistakes", "backup", "parcours", "map/decouverte", "map/n3", "lesson/n3-gaz", "lesson/nx-base", "reports", "sources", "valider", "lesson/mariotte", "cursus", "cursus/e2", "lesson/n3-cadre", "lesson/r-cas"];

async function newPage(b, w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
  p.on("pageerror", e => errs.push(`${w}px ${e.message}`));
  p.on("console", m => { if (m.type() === "error" && !/vibrate|favicon/.test(m.text())) errs.push(`${w}px ${m.text()}`); });
  return { ctx, p };
}
const ready = p => p.waitForFunction(() => window.AA && AA.router && AA.router.name && document.documentElement.classList.contains("ready"));
const seed = async p => { await ready(p); return p.evaluate(() => { const S = AA.S; S.profile.onboarded = true; S.profile.name = "Test"; S.xp = 500; S.evoSeen = 9; S.profile.driveNag = "2099-01-01"; AA.path.applyLevel("n1"); S.profile.goal = "n2"; AA.content.questions.slice(0, 30).forEach((q, i) => { S.stats[q.id] = { n: 2, ok: i % 2 }; if (i % 2) S.wrong[q.id] = { [(q.a + 1) % q.c.length]: 1 }; }); AA.store.save(true); }); };

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
      ok(await p.evaluate(() => { const S = AA.S; return S.profile.level === "n3" && S.profile.goal === "n4" && S.certs.n2 && S.path.decouverte === "skip" && S.path.n1 === "review" && AA.path.expert() && AA.game.worldOpen("n4") && !AA.game.worldOpen("e2") && AA.game.worldOpen("n3"); }), "niveau N3 : objectif N4, mondes obtenus, Découverte passée, expérience prise en compte");
      ok(await p.$(".place-card"), "accueil : test de positionnement proposé");
      await p.click("#plgo"); await p.waitForTimeout(250);
      for (let i = 0; i < 40 && !(await p.$(".result")); i++) { await p.click(".choice >> nth=0"); await p.waitForTimeout(40); const n = await p.$("#nextq"); if (n) await n.click(); await p.waitForTimeout(40); }
      ok(await p.$(".result [data-pm]"), "test de positionnement : résultat par thème et choix de la suite");
      await p.click('[data-pm="review"]'); await p.waitForTimeout(250);
      ok(await p.evaluate(() => Object.keys(AA.S.placeDone).length === 1 && !AA.S.profile.placeAsk), "positionnement enregistré, parcours adapté");
      await ctx.close(); }

    console.log("• Mon parcours");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.game.worldOpen("n2") && !AA.game.worldOpen("n3") && AA.game.unlocked("n1-signes") && AA.game.inPlay("d-bapteme")), "profil N1 : N1 et N2 ouverts, N3 fermé");
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
      const ex = await p.evaluate(() => { AA.S.profile.goal = "n3"; AA.quiz.exam(false); const c = AA.ctx; return c.world === "n3" && c.items.length >= 10; });
      ok(ex, "examen blanc du monde visé (N3)");
      await ctx.close(); }

    console.log("• Aide, quêtes, signalements (1.4)");
    { const { ctx, p } = await newPage(b, 390, 844); await p.goto(URL); await seed(p); await p.reload(); await ready(p); await p.waitForTimeout(200);
      await p.click(".pill.fire"); await p.waitForTimeout(250);
      ok(await p.$(".streak-cal"), "flamme cliquable : série expliquée sur 14 jours");
      await p.keyboard.press("Escape"); await p.click(".pill.xp"); await p.waitForTimeout(250);
      ok(await p.$(".help-sheet [data-hx]"), "éclair cliquable : XP et niveau expliqués");
      await p.keyboard.press("Escape"); await p.click('[data-help="quests"]'); await p.waitForTimeout(250);
      ok(await p.$(".help-sheet"), "bouton « ? » : fiche d’aide des quêtes");
      await p.keyboard.press("Escape"); await p.waitForTimeout(150);
      const go = await p.$(".dq-go[data-go]"); ok(!!go, "quête du jour cliquable");
      if (go) { await go.click(); await p.waitForTimeout(400); ok(await p.evaluate(() => AA.router.name !== "home"), "la quête emmène au bon écran (" + await p.evaluate(() => AA.router.name) + ")"); }
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
      await p.goto(URL + "#/lab"); await p.waitForTimeout(200);
      const tiles = await p.$$eval("#view .tile", a => a.map(b => b.dataset.t)), opened = [];
      for (const id of tiles) { await p.goto(URL + "#/lab"); await p.waitForTimeout(150); await p.click(`.tile[data-t="${id}"]`); await p.waitForTimeout(250); opened.push(await p.evaluate(() => AA.router.name) === id ? id : id + "→" + await p.evaluate(() => AA.router.name)); }
      ok(opened.every(x => !x.includes("→")), "chaque tuile du labo ouvre son écran : " + opened.join(", "));
      await p.goto(URL + "#/pc"); await p.waitForTimeout(200); await p.click('.tile[data-t="quick"]'); await p.waitForFunction(() => AA.router.name === "quiz", null, { timeout: 4000 }).catch(() => {});
      ok(await p.evaluate(() => AA.router.name === "quiz" && AA.ctx.mode === "pc" && AA.ctx.items.length === 6 && !!document.querySelector("#view .dc")), "mode ordinateur : série rapide avec écran");
      await p.goto(URL + "#/lab"); await p.waitForTimeout(150); await p.click(`.tile[data-t="scen"]`); await p.waitForTimeout(250); const sid = await p.$eval("#view .tile", b => b.dataset.t); await p.click("#view .tile"); await p.waitForTimeout(250);
      ok(await p.evaluate(s => location.hash === "#/scen/" + s && !!document.querySelector(".qcard"), sid), "scénario ouvert depuis le labo (aucun clic fantôme)");
      /* Simulateur : pause */
      await p.goto(URL + "#/sim"); await p.waitForTimeout(250); await p.click("#sdown"); await p.waitForTimeout(600);
      await p.click("#spp"); const t1 = await p.evaluate(() => AA.ctx.sim.t); await p.waitForTimeout(600);
      const t2 = await p.evaluate(() => AA.ctx.sim.t), shown = await p.isVisible("#spause");
      await p.keyboard.press("Space"); await p.waitForTimeout(500); const t3 = await p.evaluate(() => AA.ctx.sim.t);
      ok(t1 > 0 && t1 === t2 && shown && t3 > t2, "simulateur : la pause fige le temps, Espace reprend");
      await p.evaluate(() => { AA.ctx.sim = null; });
      /* Question du jour : la réponse reste après un redémarrage */
      await p.goto(URL + "#/home"); await p.waitForTimeout(250);
      if (await p.$("#qod .choice")) {
        await p.click("#qod .choice >> nth=1"); await p.waitForTimeout(150); const xp1 = await p.evaluate(() => AA.S.xp);
        await p.reload(); await ready(p); await p.goto(URL + "#/home"); await p.waitForTimeout(300);
        const st = await p.evaluate(() => ({ dis: [...document.querySelectorAll("#qod .choice")].every(b => b.disabled), good: !!document.querySelector("#qod .choice.good"), fb: !!document.querySelector("#qodx .feedback") }));
        ok(st.dis && st.good && st.fb && await p.evaluate(() => AA.S.xp) === xp1, "question du jour : réponse gardée après redémarrage");
      } else ok(false, "question du jour absente");
      /* Avatar */
      await p.goto(URL + "#/profile"); await p.waitForTimeout(200); await p.click("#avedit"); await p.waitForTimeout(150);
      await p.click('[data-hair="2"]'); await p.click('[data-k="suit"] [data-v="3"]'); await p.click("#avok"); await p.waitForTimeout(200);
      ok(await p.evaluate(() => AA.S.profile.avatar && AA.S.profile.avatar.hair === 2 && AA.S.profile.avatar.suit === 3 && !!document.querySelector(".profile .ava")), "avatar modifié et enregistré");
      ok(await p.evaluate(() => { const a = AA.avatar; return a.stage(1) === 0 && a.stage(3) === 1 && a.stage(9) === 4 && /ava-s4/.test(a.svg(a.get(), 10)); }), "avatar : évolutions par niveau");
      /* Compagnons : évolution */
      await p.click("#avedit"); await p.waitForTimeout(150); await p.click('[data-kind="creature"]'); await p.waitForTimeout(100);
      const nComp = (await p.$$(".ava-comp")).length; await p.click('.ava-comp[data-cid="poulpe"]'); await p.click("#avok"); await p.waitForTimeout(150);
      ok(nComp >= 15 && await p.evaluate(() => { const a = AA.avatar, av = a.get(); return av.kind === "creature" && av.id === "poulpe" && a.formName(av, 1) === "Poulpinet" && a.formName(av, 9) === "Kraken des abysses"; }), `compagnons : ${nComp} au choix, le poulpe évolue en Kraken`);
      /* Aquarium : décorer */
      await p.evaluate(() => { AA.S.xp = 5000; AA.S.aqua = { castagnole: "2026-11-01", girelle: "2026-11-02" }; AA.store.save(true); });
      await p.goto(URL + "#/aquarium"); await p.waitForTimeout(300); await p.click("#aqedit"); await p.waitForTimeout(250);
      const dec = await p.$(".aq-dec.edit"); const bb = dec && await dec.boundingBox();
      if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.mouse.down(); await p.mouse.move(bb.x + bb.width / 2 + 60, bb.y + bb.height / 2, { steps: 5 }); await p.mouse.up(); }
      const moved = await p.evaluate(() => Object.values(AA.S.aquaCfg.dec || {}).find(d => d.x != null) ? 1 : null);
      await p.click('[data-tab="look"]'); await p.waitForTimeout(150); await p.click('[data-bg="lagon"]'); await p.waitForTimeout(150);
      const bgOk = await p.evaluate(() => AA.S.aquaCfg.bg === "lagon" && !!document.querySelector(".tank.bg-lagon"));
      ok(moved != null && bgOk, "aquarium : décor déplacé, fond changé (" + moved + ", " + bgOk + ")");
      await p.click("#aqfeed"); await p.waitForTimeout(100);
      ok(await p.evaluate(() => AA.S.fedOn === AA.u.today()), "aquarium : poissons nourris");
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
