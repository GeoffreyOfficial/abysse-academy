#!/usr/bin/env node
/* =====================================================================
   Abysse Academy · tests du contenu (sans navigateur, sans dépendance)
   node tests/content.test.js            vérifie tout
   node tests/content.test.js --update   met à jour l'empreinte des questions
   Vérifie : format des questions, ordre des questions INCHANGÉ (la
   progression y est attachée), calculs générés, glossaire, aventures,
   pièges, aquarium, textes d'interface manquants.
   ===================================================================== */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto");
const ROOT = path.resolve(__dirname, ".."), FILES = require(path.join(ROOT, "js/manifest.js"));
let fails = 0, checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) { fails++; console.error("  ✗ " + msg); } };
const section = s => console.log("• " + s);

/* Contexte minimal : on charge le moteur de contenu et les fichiers de content/ */
const sandbox = { window: {}, console, Intl, Math, Date, JSON, navigator: {}, matchMedia: () => ({ matches: false }) };
sandbox.window = sandbox; vm.createContext(sandbox);
const load = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
["js/core/ns.js", "js/core/i18n.js", "js/core/content.js"].forEach(load);
vm.runInContext("AA.game = { mkCalc: null }; AA.S = { profile: {} };", sandbox);
/* mkCalc (game.js) sert aux générateurs : on le charge à part. */
const gameSrc = fs.readFileSync(path.join(ROOT, "js/core/game.js"), "utf8");
const mk = gameSrc.slice(gameSrc.indexOf("G.mkCalc ="), gameSrc.indexOf("\n  };", gameSrc.indexOf("G.mkCalc =")) + 5);
vm.runInContext(`(function(){ const AA = window.AA, u = AA.u, G = AA.game; ${mk} })();`, sandbox);
FILES.js.filter(f => f.startsWith("content/") || f.startsWith("locales/")).forEach(load);
vm.runInContext("AA.content.build()", sandbox);
const AA = sandbox.AA, C = AA.content;

section("Questions");
C.questions.forEach(q => {
  const where = q.id + " « " + String(q.q).slice(0, 40) + " »";
  ok(typeof q.q === "string" && q.q.length > 5, where + " : texte manquant");
  ok(Array.isArray(q.c) && q.c.length >= 2 && q.c.length <= 4, where + " : 2 à 4 choix attendus");
  ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.c.length, where + " : index de bonne réponse invalide");
  ok(new Set(q.c).size === q.c.length, where + " : choix en double");
  ok(typeof q.e === "string" && q.e.length > 5, where + " : explication manquante");
});
C.modules.forEach(m => ok(m.quiz.length >= 6, m.id + " : au moins 6 questions"));
ok(new Set(C.questions.map(q => q.id)).size === C.questions.length, "identifiants de questions uniques");

section("Ordre des questions (progression)");
const FP = path.join(__dirname, "question-ids.json");
const now = {}; C.questions.forEach(q => (now[q.id] = crypto.createHash("sha1").update(q.q).digest("hex").slice(0, 10)));
if (process.argv.includes("--update") || !fs.existsSync(FP)) { fs.writeFileSync(FP, JSON.stringify(now, null, 0).replace(/,"/g, ',\n"') + "\n"); console.log("  empreinte enregistrée (" + Object.keys(now).length + " questions)"); }
else {
  const before = JSON.parse(fs.readFileSync(FP, "utf8"));
  Object.keys(before).forEach(id => {
    ok(id in now, `question ${id} supprimée : la progression qui y est attachée serait perdue`);
    if (id in now && now[id] !== before[id]) console.warn(`  ! ${id} : texte modifié (normal si c’est une correction ; si l’ordre a changé, c’est une erreur). Lance --update après vérification.`);
  });
}

section("Calculs générés");
Object.entries(C.generators).forEach(([k, g]) => {
  ok(C.byId[g.m], `générateur ${k} : module ${g.m} inconnu`);
  for (let i = 0; i < 60; i++) {
    let q; try { q = g.make(); } catch (e) { ok(false, `générateur ${k} : erreur ${e.message}`); break; }
    ok(q && q.c && q.c.length >= 3 && q.a >= 0 && q.a < q.c.length, `générateur ${k} : QCM invalide`);
    ok(q && new Set(q.c).size === q.c.length, `générateur ${k} : choix en double (${q && q.c.join(" | ")})`);
    ok(q && !q.c.some(x => /NaN|Infinity|undefined/.test(x)), `générateur ${k} : valeur invalide (${q && q.c.join(" | ")})`);
  }
});

section("Flashcards");
ok(new Set(C.cards.map(c => c.id)).size === C.cards.length, "identifiants de cartes uniques");
C.cards.forEach(c => ok(C.byId[c.m] && c.f && c.b, `carte ${c.id} incomplète ou module inconnu`));

section("Glossaire");
C.glossary.forEach(g => {
  ok(g.t && g.d && g.d.length > 20, `terme ${g.id} : définition trop courte`);
  ok(!g.m || C.byId[g.m], `terme ${g.id} : module ${g.m} inconnu`);
  (g.see || []).forEach(s => ok(C.glossById[s], `terme ${g.id} : voir aussi ${s} inconnu`));
  ok(!g.dg || C.diagrams[g.dg], `terme ${g.id} : schéma ${g.dg} inconnu`);
});

section("Aventures");
C.stories.forEach(s => {
  ok(s.nodes[s.start], `${s.id} : scène de départ absente`);
  const seen = new Set(), stack = [s.start];
  while (stack.length) { const id = stack.pop(); if (seen.has(id)) continue; seen.add(id); const n = s.nodes[id]; if (!n) { ok(false, `${s.id} : scène ${id} absente`); continue; } (n.choices || []).forEach(c => c.go && stack.push(c.go)); }
  ok(Object.keys(s.nodes).every(id => seen.has(id)), `${s.id} : scènes inaccessibles`);
  ok([...seen].some(id => s.nodes[id] && s.nodes[id].end), `${s.id} : pas de fin atteignable`);
  Object.entries(s.nodes).forEach(([id, n]) => {
    if (n.end) return;
    ok(n.choices && n.choices.filter(c => c.ok).length === 1, `${s.id}/${id} : exactement un bon choix attendu`);
    n.choices.forEach(c => { ok(c.e, `${s.id}/${id} : explication manquante`); ok(!c.m || C.byId[c.m], `${s.id}/${id} : module ${c.m} inconnu`); ok(!c.ok || c.go, `${s.id}/${id} : le bon choix doit mener quelque part`); });
  });
});

section("Pièges, aquarium, boss");
C.pitfalls.forEach(p => {
  try { if (p.re) new RegExp(p.re, "i"); } catch (e) { ok(false, `piège ${p.id} : expression invalide`); }
  (p.m || []).forEach(m => ok(C.byId[m], `piège ${p.id} : module ${m} inconnu`));
  (p.gen || []).forEach(g => ok(C.generators[g], `piège ${p.id} : générateur ${g} inconnu`));
});
const shapes = fs.readFileSync(path.join(ROOT, "js/ui/creatures.js"), "utf8");
C.creatures.forEach(f => { ok(new RegExp("\\b" + f.shape + ":").test(shapes), `espèce ${f.id} : forme ${f.shape} inconnue`); ok(f.test && f.test.k, `espèce ${f.id} : condition manquante`); });
C.worlds.filter(w => w.boss).forEach(w => { ok(new RegExp("\\b" + w.boss.creature + ":").test(shapes), `boss ${w.id} : créature inconnue`); ok(w.boss.hp <= w.boss.n, `boss ${w.id} : plus de points de vie que de questions`); });

section("Textes d'interface");
const dict = {}; vm.runInContext("AA.i18n", sandbox);
const used = new Set();
(function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith(".js")) { const s = fs.readFileSync(p, "utf8"); for (const m of s.matchAll(/\bt\("([a-zA-Z0-9_.\-]+)"/g)) if (!m[1].endsWith(".")) used.add(m[1]); } }); })(path.join(ROOT, "js"));
used.forEach(k => ok(AA.i18n.raw(k) != null, `texte « ${k} » manquant dans locales/fr.js`));

console.log(`\n${checks} vérifications, ${fails} échec(s).`);
process.exit(fails ? 1 : 0);
