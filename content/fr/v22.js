/* =====================================================================
   Abysse Academy 2.2 · textes : onglet Carte, jeux, gardiens et boss
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, C = AA.content;
  AA.i18n.add("fr", {
    "tab.map": "Carte",
    "gm.why.read": "Disponible dès ton premier cours marqué comme lu.",
    "gm.why.srs": "Rien à revoir aujourd’hui : une question revient 1, 2, 4, 9… jours après ta réponse. Fais un quiz pour en programmer.",
    "gm.why.srsNext": "Rien à revoir aujourd’hui. Prochaines questions à revoir le {d}.",
    "gm.why.flash": "Aucune carte pour tes cours lus : lis un cours qui en a (Pression, Mariotte…).",
    "gm.why.errors": "Aucune erreur à retravailler : tes réponses ratées en quiz arriveront ici.",
    "gm.why.doubt": "Rien ici : touche « J’hésite » pendant un quiz pour retrouver la question.",
    "gm.why.calcs": "Aucun calcul dans tes cours lus : lis Pression, Mariotte ou Dalton pour en débloquer.",
    "gm.why.note": "Grisé = pas faisable pour l’instant ; la raison et ce qui le débloque sont écrits sur la carte.",
    "gm.mapT": "Carte", "gm.readN": "{n} / {t} cours lus", "gm.mapList": "Liste des cours", "gm.backCours": "Cours",
    "gm.guard": "Gardien", "gm.guardWon": "Gardien vaincu", "gm.guardOf": "Gardien de « {t} »",
    "gm.hubT": "Jeux", "gm.hubS": "Des défis rapides sur ce que tu as lu : chaque bonne réponse compte aussi pour tes notions et tes révisions.",
    "gm.tile": "Jeux et boss", "gm.tileS": "Gardiens, boss final, paires, vrai ou faux",
    "gm.minis": "Mini-jeux", "gm.guards": "Les gardiens des cours", "gm.guardsS": "Chaque cours lu a son gardien : 4 coups pour le vaincre, 3 vies pour toi.",
    "gm.final": "Boss final", "gm.finalS": "Il garde la fin du niveau. Toutes les questions des cours lus, trois phases, et il ne pardonne pas.",
    "gm.toRead": "Lis le cours pour réveiller son gardien", "gm.ready": "Prêt à l’affronter", "gm.best": "Meilleur : {p} %",
    "gm.fight": "Affronter", "gm.refight": "Revanche", "gm.lockFinal": "Encore {n} cours à lire dans ce niveau pour réveiller le boss.", "gm.finalReady": "Tous les cours sont lus : le boss t’attend.",
    "gm.paires": "Paires", "gm.pairesS": "Retrouve chaque mot et sa définition", "gm.vf": "Vrai ou faux express", "gm.vfS": "60 secondes, un maximum de bonnes réponses",
    "gm.bestScore": "Record : {n}", "gm.noBest": "Pas encore joué",
    "gm.introMini": "Un gardien surgit des profondeurs !", "gm.introBoss": "BOSS FINAL",
    "gm.rules": "{hp} coups pour le vaincre · {l} vies pour toi · 3 bonnes réponses de suite = coup critique",
    "gm.go": "Combattre", "gm.flee": "Plus tard",
    "gm.hit": "Touché !", "gm.crit": "Coup critique !", "gm.miss": "Il riposte !", "gm.answerWas": "La bonne réponse : {a}",
    "gm.next": "Suivant", "gm.phase2": "Phase 2 : il s’énerve !", "gm.phase3": "Phase 3 : dernière colère !",
    "gm.wonT": "Victoire !", "gm.lostT": "Il t’a eu cette fois", "gm.fledT": "Il s’est enfui !", "gm.fledS": "Plus de questions : il reste {n} PV au gardien. Réessaie après une révision.",
    "gm.wonMini": "Le gardien de « {t} » s’incline.", "gm.lostS": "Revois les points ci-dessous, puis prends ta revanche.",
    "gm.xpWon": "+{n} XP de victoire", "gm.accuracy": "{p} % de bonnes réponses", "gm.again": "Rejouer", "gm.backMap": "Retour à la carte", "gm.backHub": "Autres défis",
    "gm.review": "À revoir", "gm.fixGap": "Combler cette lacune",
    "gm.pv": "PV", "gm.lives": "Vies", "gm.combo": "Série ×{n}",
    "gm.needRead": "Lis au moins un cours pour débloquer ce jeu.",
    "gm.p.moves": "{n} coups", "gm.p.time": "{s} s", "gm.p.done": "Bravo, tout est associé !", "gm.p.perfect": "Parfait : aucune erreur.", "gm.p.xp": "+{n} XP", "gm.p.noXp": "XP du jour déjà gagnée pour ce jeu (3 parties).", "gm.p.term": "Mot", "gm.p.def": "Définition",
    "gm.vf.true": "Vrai", "gm.vf.false": "Faux", "gm.vf.score": "Score", "gm.vf.start": "C’est parti", "gm.vf.rules": "Une affirmation s’affiche : vrai ou faux ? Balaye à droite pour vrai, à gauche pour faux (ou flèches du clavier).",
    "gm.vf.end": "Temps écoulé !", "gm.vf.res": "{n} bonnes réponses sur {t}", "gm.vf.record": "Nouveau record !", "gm.vf.mist": "Tes erreurs", "gm.vf.xpCap": "Plafond d’XP du jour atteint pour ce jeu.",
    "gm.a.mini": "Affronte le gardien de « {t} »", "gm.a.miniS": "4 coups à porter : la meilleure façon d’ancrer ce cours.",
    "gm.a.boss": "Le boss final du {w} t’attend", "gm.a.bossS": "Tous les cours sont lus : prouve-le en combat."
  });
  /* Trophées 2.2 */
  const W = C.worlds.filter(w => w.boss && !w.soon);
  C.badges.push(
    { id: "gm-mini1", icon: "swords", name: "Premier gardien", desc: "Vaincre un gardien de cours", test: { k: "gmMini", n: 1 } },
    { id: "gm-mini5", icon: "swords", name: "Chasseur de gardiens", desc: "Vaincre 5 gardiens", test: { k: "gmMini", n: 5 } },
    { id: "gm-mini15", icon: "swords", name: "Terreur des gardiens", desc: "Vaincre 15 gardiens", test: { k: "gmMini", n: 15 } },
    { id: "gm-miniall", icon: "trophy", name: "Maître des gardiens", desc: "Vaincre tous les gardiens, de la découverte à E2", test: { k: "gmMini", n: "all" } },
    { id: "gm-boss1", icon: "trophy", name: "Tueur de boss", desc: "Vaincre un premier boss final", test: { k: "gmBoss", n: 1 } },
    { id: "gm-boss5", icon: "trophy", name: "Légende des profondeurs", desc: "Vaincre 5 boss finaux", test: { k: "gmBoss", n: 5 } },
    ...W.map(w => ({ id: "gm-b-" + w.id, icon: "swords", name: w.boss.name, desc: "Vaincre le boss final " + (w.short || w.title), test: { k: "gmBossW", w: w.id } })),
    { id: "gm-p1", icon: "cards", name: "Bonne mémoire", desc: "Terminer une partie de Paires", test: { k: "gmPaires", n: 1 } },
    { id: "gm-p10", icon: "cards", name: "Mémoire d’éléphant de mer", desc: "Terminer 10 parties de Paires", test: { k: "gmPaires", n: 10 } },
    { id: "gm-vf15", icon: "bolt", name: "Réflexes", desc: "15 bonnes réponses en une partie de Vrai ou faux", test: { k: "gmVF", n: 15 } },
    { id: "gm-vf30", icon: "bolt", name: "Éclair des abysses", desc: "30 bonnes réponses en une partie de Vrai ou faux", test: { k: "gmVF", n: 30 } }
  );
})();
