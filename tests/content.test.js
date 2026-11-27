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

section("QCM sans indice (2.2.4)");
{
  /* Une question ne doit pas se deviner sans rien connaître : la bonne
     réponse ne doit pas être systématiquement la plus longue, ni écraser
     les autres en longueur, et aucun distracteur ne doit être absurde. */
  var ABSURDE = /couleur (du|des|de son) (bloc|masque|palmes|écran)|le club s.en charge|(^|\s)à rien( du tout)?$|pour (la )?d[ée]cor|faire joli|au hasard|n.importe (où|quoi|comment)|ce n.est pas utile|sans raison|^rien( du tout)?$|barbecue|appareil photo|explose|go[ûu]te|menu du|le prix|la facture|son maillot|(^|\s)crier|huile d.olive|se transforme en eau|par habitude|par tradition|t.énerves|le grondes|l.humilies|dans son dos|3615|la mairie|le café|du café/i;
  const len = s => String(s).length;
  let longest = 0, crushing = [];
  (C.computer || []).forEach(q => (q.c || []).forEach((s, i) => { if (i !== q.a) ok(!ABSURDE.test(String(s)), `${q.id} : choix absurde « ${s} »`); }));
  C.questions.forEach(q => {
    q.c.forEach((s, i) => { if (i !== q.a) ok(!ABSURDE.test(String(s)), `${q.id} : choix absurde « ${s} »`); });
    const a = len(q.c[q.a]), o = Math.max(...q.c.filter((_, i) => i !== q.a).map(len));
    if (a > o) longest++;
    if (a > o * 1.3 && a - o > 8) crushing.push(q.id);
  });
  const share = longest / C.questions.length;
  ok(share <= 0.45, `la bonne réponse est la plus longue dans ${(share * 100).toFixed(0)} % des questions (maxi 45 %)`);
  ok(crushing.length <= C.questions.length * 0.03, `bonne réponse nettement plus longue que les autres dans ${crushing.length} questions : ${crushing.slice(0, 12).join(", ")}`);
  console.log(`  plus longue : ${(share * 100).toFixed(1)} %, nettement plus longue : ${crushing.length}`);
  /* Aventures (2.2.5) : la bonne réaction ne doit être ni toujours la première, ni toujours la plus longue. */
  let first = 0, sLong = 0, nodes = 0;
  C.stories.forEach(s => Object.values(s.nodes).forEach(n => { if (!n.choices || n.choices.length < 2) return; nodes++;
    const gi = n.choices.findIndex(c => c.ok); if (gi === 0) first++;
    const L = n.choices.map(c => len(c.t)), o = Math.max(...L.filter((_, i) => i !== gi)); if (L[gi] > o * 1.15) sLong++;
    n.choices.forEach((c, i) => { if (i !== gi) ok(!ABSURDE.test(c.t), `${s.id} : réaction absurde « ${c.t} »`); }); }));
  ok(nodes === 0 || first / nodes <= 0.5, `aventures : la bonne réaction est la première dans ${first}/${nodes} scènes`);
  ok(nodes === 0 || sLong / nodes <= 0.3, `aventures : la bonne réaction est nettement la plus longue dans ${sLong}/${nodes} scènes`);
}

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

section("Procédures d’urgence (gestes dans l’ordre)");
{
  const P = C.procs || [], ids = new Set(), W = new Set();
  ok(P.length >= 18, `${P.length} procédures (mini 18)`);
  P.forEach(p => {
    ok(!ids.has(p.id), `procédure ${p.id} en double`); ids.add(p.id);
    ok(C.byId[p.m], `procédure ${p.id} : thème ${p.m} inconnu`); if (C.byId[p.m]) W.add(C.byId[p.m].world);
    const fl = p.steps.reduce((a, g) => a.concat(Array.isArray(g) ? g : [g]), []);
    ok(fl.length >= 5, `procédure ${p.id} : ${fl.length} gestes (mini 5)`);
    ok((p.extra || []).length >= 4, `procédure ${p.id} : ${(p.extra || []).length} pièges (mini 4)`);
    ok(new Set(fl.concat(p.extra)).size === fl.length + p.extra.length, `procédure ${p.id} : geste en double`);
    ok(p.q && p.e && p.title, `procédure ${p.id} : question, titre ou explication manquant`);
    p.extra.forEach(x => ok(!ABSURDE.test(x), `procédure ${p.id} : piège absurde « ${x} »`));
    /* Anti-indice : les pièges ne doivent pas être nettement plus courts ou plus longs que les bons gestes. */
    const avg = l => l.reduce((a, x) => a + x.length, 0) / l.length, r = avg(p.extra) / avg(fl);
    ok(r > .6 && r < 1.5, `procédure ${p.id} : longueur des pièges trop différente (${r.toFixed(2)})`);
  });
  C.worlds.filter(w => !w.soon && C.inWorld(w.id).length).forEach(w => ok(W.has(w.id), `aucune procédure d’urgence pour ${w.short}`));
}

section("Sigles définis (2.6.1)");
{
  /* Tout sigle d'une question, d'une réponse ou d'une explication doit être
     développé dans content/fr/sigles.js (affiché dans « De quoi parle la question ? »). */
  const S = (C.sigles || []).map(s => new RegExp(s[1], "g")), OKW = new Set(C.siglesOk || []);
  const LV = /^(?:[NE][1-5]|MF[12]|GP|EANx?|O[2₂]|N[2₂])$/;
  const missing = {};
  const scan = (txt, where) => {
    const s = String(txt || ""), covered = [];
    S.forEach(re => { re.lastIndex = 0; let m; while ((m = re.exec(s))) covered.push([m.index, m.index + m[0].length]); });
    const re = /\b[A-Z][A-Z0-9]+\b|\bPp ?[A-Z]/g; let m;
    while ((m = re.exec(s))) {
      const w = m[0]; if (OKW.has(w) || LV.test(w)) continue;
      if (covered.some(([a, b]) => m.index >= a && m.index < b)) continue;
      (missing[w] = missing[w] || []).push(where);
    }
  };
  C.questions.forEach(q => { scan(q.q, q.id); (q.c || []).forEach(x => scan(x, q.id)); scan(q.e, q.id); });
  (C.procs || []).forEach(p => [p.q, p.e].concat(p.steps.flat(), p.extra).forEach(x => scan(x, p.id)));
  Object.keys(missing).forEach(w => ok(false, `sigle « ${w} » non défini (${missing[w].slice(0, 3).join(", ")}${missing[w].length > 3 ? "…" : ""})`));
  ok((C.sigles || []).length >= 30, `${(C.sigles || []).length} sigles définis`);
  (C.sigles || []).forEach(s => ok(s[2] && s[3] && s[3].length > 20, `sigle ${s[0]} : définition incomplète`));
}

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

section("Mises en situation (2.9)");
{
  const G29 = C.games29 || {};
  ok((G29.scenes || []).length >= 3, "chasse aux erreurs : au moins 3 scènes");
  (G29.scenes || []).forEach(sc => {
    ok(sc.items.length === 10 && sc.items.filter(x => x[1]).length === 5, `chasse ${sc.id} : 10 observations dont 5 dangers`);
    sc.items.forEach(x => { ok(x[2] && x[2].length > 20, `chasse ${sc.id} : explication manquante`); ok(C.byId[x[3]], `chasse ${sc.id} : module ${x[3]} inconnu`); });
    const L = k => sc.items.filter(x => !!x[1] === k).map(x => x[0].length), avg = l => l.reduce((a, b) => a + b, 0) / l.length;
    ok(Math.abs(avg(L(true)) - avg(L(false))) < 12, `chasse ${sc.id} : dangers et observations sûres de longueur comparable`);
  });
  const sg = G29.signs || [];
  ok(sg.length >= 12 && new Set(sg.map(x => x[1])).size === sg.length && new Set(sg.map(x => x[0])).size === sg.length, "signes : au moins 12, gestes et sens uniques");
  ok(C.byId[G29.signsModule], "signes : module de cours existant");
  (G29.incidents || []).forEach(inc => {
    ok(C.byId[inc.m] && inc.steps.length === 5 && inc.learn && inc.learn.length, `incident ${inc.id} : 5 étapes, module et points à retenir`);
    inc.steps.forEach((st, i) => { ok(st.c.length === 3 && st.c.filter(c => c.ok).length === 1 && st.c.every(c => c.e), `incident ${inc.id}/${i} : 3 choix, 1 bon, tous expliqués`);
      const g = st.c.find(c => c.ok).t.length, o = Math.max(...st.c.filter(c => !c.ok).map(c => c.t.length)); ok(g <= o * 1.15, `incident ${inc.id}/${i} : la bonne réponse ne doit pas être nettement la plus longue`);
      st.c.forEach(c => ok(!ABSURDE.test(c.t), `incident ${inc.id}/${i} : réaction absurde « ${c.t} »`)); });
    ok(new Set(inc.steps.map(st => st.c.findIndex(c => c.ok))).size >= 2, `incident ${inc.id} : la bonne réponse change de place`);
  });
}

section("Questions ni devinables ni répétées (2.9.1)");
{
  const nrm = s => String(s || "").replace(/<[^>]+>/g, " ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const STOP = new Set("dans pour avec plus moins elle elles ils sont cette cela quand quel quelle quels quelles comment pourquoi entre leur leurs tout tous toute toutes votre vous nous etre avoir fait faire peut doit mais donc alors ainsi aussi tres bien encore apres avant sous chez sans selon dont plongee plongeur plongeurs".split(" "));
  const W = s => nrm(s).split(/[^a-z0-9]+/).filter(w => w.length >= 5 && !STOP.has(w));
  /* Indice « seulement / jamais » : seules les mauvaises réponses sont absolues ou incomplètes. */
  const ABS = /\b(toujours|jamais|uniquement|seulement|aucun|aucune|systematiquement|obligatoirement|tout de suite)\b/;
  const absClue = C.questions.filter(q => { const wr = q.c.filter((_, i) => i !== q.a); return !ABS.test(nrm(q.c[q.a])) && wr.length >= 2 && wr.filter(x => ABS.test(nrm(x))).length >= 2; }).map(q => q.id);
  ok(absClue.length <= 3, `indice « seulement / jamais » dans ${absClue.length} questions : ${absClue.slice(0, 10).join(", ")}`);
  /* Quasi-doublons dans un même cours (même énoncé et même réponse, mots différents), hors calculs. */
  const near = [];
  C.modules.forEach(m => { const qs = m.quiz.filter(q => !/\d/.test(q.q)); for (let i = 0; i < qs.length; i++) for (let j = i + 1; j < qs.length; j++) {
    const A = new Set(W(qs[i].q + " " + qs[i].c[qs[i].a])), B = new Set(W(qs[j].q + " " + qs[j].c[qs[j].a])), inter = [...A].filter(w => B.has(w)).length, uni = new Set([...A, ...B]).size;
    if (uni >= 4 && inter / uni >= .6) near.push(qs[i].id + "≈" + qs[j].id); } });
  ok(near.length === 0, `questions qui se répètent dans un même cours : ${near.join(" ; ")}`);
  /* Écho : un mot de l'énoncé repris seulement par la bonne réponse (au moins 2 mots). */
  const echo = C.questions.filter(q => { const sw = new Set(W(q.q).map(w => w.slice(0, 6))), okW = W(q.c[q.a]).map(w => w.slice(0, 6)).filter(w => sw.has(w)), wr = new Set(q.c.filter((_, i) => i !== q.a).flatMap(x => W(x).map(w => w.slice(0, 6)))); return okW.length >= 2 && okW.every(w => !wr.has(w)); }).map(q => q.id);
  ok(echo.length <= 2, `la bonne réponse reprend les mots de l’énoncé : ${echo.join(", ")}`);
  /* Chaque cours : assez de questions, au moins une question « pourquoi » ou de situation. */
  C.modules.forEach(m => ok(m.quiz.some(q => /pourquoi|\b(tu|ton|ta|tes)\b|\d|^(un|une|le|la|si|pendant|face) [^?…]{5,90}[.,] /i.test(q.q)), `${m.id} : aucune question de compréhension ou de situation`));
}

section("Doublons d’énoncé (2.7.1)");
{
  /* Même clé que AA.quiz.key : énoncé normalisé, chiffres masqués. Les doublons déjà publiés restent
     (on ne supprime pas de questions) mais ne peuvent plus revenir dans une même série. Tout NOUVEAU doublon bloque. */
  const KNOWN = 11; /* 2.9.1 : 11 doublons réécrits */
  const normQ = s => String(s || "").replace(/<[^>]+>/g, " ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\d+/g, "#");
  const g = {}; C.questions.forEach(q => { const k = normQ(q.q); (g[k] = g[k] || []).push(q.id); });
  const dups = Object.values(g).filter(l => l.length > 1);
  ok(dups.length <= KNOWN, `nouveaux énoncés en double (${dups.length} groupes, ${KNOWN} connus) : ${dups.slice(KNOWN - 2).map(l => l.join("=")).join(" ; ")}`);
}

section("Pièges, aquarium, boss");
C.pitfalls.forEach(p => {
  try { if (p.re) new RegExp(p.re, "i"); } catch (e) { ok(false, `piège ${p.id} : expression invalide`); }
  (p.m || []).forEach(m => ok(C.byId[m], `piège ${p.id} : module ${m} inconnu`));
  (p.gen || []).forEach(g => ok(C.generators[g], `piège ${p.id} : générateur ${g} inconnu`));
});
const shapes = fs.readFileSync(path.join(ROOT, "js/ui/creatures.js"), "utf8");
C.creatures.forEach(f => { ok(new RegExp("\\b" + f.shape + ":").test(shapes), `espèce ${f.id} : forme ${f.shape} inconnue`); ok(f.test && f.test.k, `espèce ${f.id} : condition manquante`); });
(C.companions || []).forEach(f => { ok(new RegExp("\\b" + f.shape + ":").test(shapes), `compagnon ${f.id} : forme inconnue`); ok(f.n && f.n.length === 5 && f.c.length === 3 && f.L.length === 3, `compagnon ${f.id} : 5 noms et 2 palettes attendus`); });
ok(new Set((C.companions || []).map(f => f.id)).size === (C.companions || []).length && C.companions.length >= 15, "compagnons : au moins 15, identifiants uniques");
C.decor.forEach(d => ok(d.how && d.test, `décor ${d.id} : condition manquante`));
C.worlds.filter(w => w.boss).forEach(w => { ok(new RegExp("\\b" + w.boss.creature + ":").test(shapes), `boss ${w.id} : créature inconnue`); ok(w.boss.hp <= w.boss.n, `boss ${w.id} : plus de points de vie que de questions`); });

section("Textes d'interface");
const dict = {}; vm.runInContext("AA.i18n", sandbox);
const used = new Set();
(function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith(".js")) { const s = fs.readFileSync(p, "utf8"); for (const m of s.matchAll(/\bt\("([a-zA-Z0-9_.\-]+)"/g)) if (!m[1].endsWith(".")) used.add(m[1]); } }); })(path.join(ROOT, "js"));
used.forEach(k => ok(AA.i18n.raw(k) != null, `texte « ${k} » manquant dans locales/fr.js`));

console.log(`\n${checks} vérifications, ${fails} échec(s).`);
process.exit(fails ? 1 : 0);
