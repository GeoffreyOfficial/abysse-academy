/* =====================================================================
   Abysse Academy · registre des contenus
   Les fichiers de content/<langue>/ déclarent des mondes, des modules
   (cours + quiz), des flashcards, des écrans d'ordinateur, des scénarios,
   des générateurs de calculs, des trophées et des quêtes.
   Ils n'appellent que les fonctions ci-dessous : le moteur ne connaît
   aucun contenu en dur.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA;
  const C = (AA.content = {
    worlds: [], modules: [], cards: [], computer: [], scenarios: [], badges: [], chapters: [], dailyQuests: [],
    generators: {}, diagrams: {}, icons: {}, roadmap: [], validate: [],
    byId: {}, worldById: {}, qById: {}, questions: [], scenById: {}
  });

  /* Un monde = une zone de la carte (N2, RIFAP, E1…).
     unlock : null (ouvert), {world, stars, count} (count modules étoilés dans world)
              ou {world, all:true} (tous les modules de world étoilés). */
  C.world = def => {
    const w = Object.assign({ order: C.worlds.length, unlock: null, color: "--world-n2", soon: false }, def);
    C.worlds.push(w); C.worlds.sort((a, b) => a.order - b.order); C.worldById[w.id] = w;
    return w;
  };

  /* Un module = un cours en couches + son quiz.
     Champs : id, world, depth, title, sub, icon, essentiel (HTML), approfondir (HTML),
     memo [[titre, texte]], moniteur [questions], quiz [{q,c,a,e,id?,lvl?}],
     gen [clés de générateurs liés], after (id du module précédent, sinon ordre d'ajout). */
  C.module = def => {
    const m = Object.assign({ memo: [], moniteur: [], quiz: [], gen: [], approfondir: "" }, def);
    if (C.byId[m.id]) Object.assign(C.byId[m.id], m); else { C.modules.push(m); C.byId[m.id] = m; }
    return m;
  };
  /* Ajoute des questions à un module existant (pratique pour un pack d'extension). */
  C.addQuestions = (id, qs) => { const m = C.byId[id]; if (m) m.quiz.push(...qs); };
  /* Flashcards : [{id, m (module), f (recto), b (verso)}] */
  C.addCards = list => C.cards.push(...list);
  C.addComputer = list => C.computer.push(...list);
  C.addScenarios = list => { C.scenarios.push(...list); list.forEach(s => (C.scenById[s.id] = s)); };
  C.addGenerators = obj => Object.assign(C.generators, obj);
  C.addDiagrams = obj => Object.assign(C.diagrams, obj);
  C.addBadges = list => C.badges.push(...list);
  C.addChapters = list => C.chapters.push(...list);
  C.addDailyQuests = list => C.dailyQuests.push(...list);
  C.setRoadmap = list => (C.roadmap = list);
  C.setValidate = list => (C.validate = list);

  C.inWorld = wid => C.modules.filter(m => m.world === wid);

  /* Construit l'index des questions. Identifiant stable : q.id si fourni,
     sinon "<module>-<position>". Ne jamais réordonner les questions
     existantes : la progression y est attachée. */
  C.build = () => {
    C.questions = []; C.qById = {};
    C.modules.forEach(m => m.quiz.forEach((q, i) => {
      q.id = q.id || m.id + "-" + i; q.m = m.id; q.world = m.world;
      C.questions.push(q); C.qById[q.id] = q;
    }));
    C.computer.forEach((s, i) => { const id = "pc-" + i; Object.assign(s, { id, m: "computer", world: "lab" }); C.qById[id] = s; });
  };
  C.moduleTitle = id => (C.byId[id] ? C.byId[id].title : id);
})();
