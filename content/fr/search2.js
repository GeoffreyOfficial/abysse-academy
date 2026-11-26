/* =====================================================================
   Abysse Academy 2.1 · recherche : synonymes de plongée et textes
   Chaque groupe réunit des mots équivalents : chercher l'un trouve les autres.
   Écrire sans accents, en minuscules.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, C = AA.content;
  C.synonyms = [
    ["octopus", "detendeur de secours", "second detendeur", "deuxieme detendeur", "source d'air de secours"],
    ["gilet", "stab", "stabilisateur", "sgs", "bcd"],
    ["bloc", "bouteille", "scaphandre"],
    ["manometre", "mano"],
    ["ordinateur", "ordi"],
    ["detendeur", "regulateur"],
    ["combinaison", "combi"],
    ["add", "accident de decompression", "maladie de decompression"],
    ["palier", "decompression"],
    ["narcose", "ivresse des profondeurs"],
    ["essoufflement", "hypercapnie"],
    ["barotraumatisme", "baro"],
    ["valsalva", "equilibrage", "compensation", "manoeuvre"],
    ["surpression pulmonaire", "spp"],
    ["mariotte", "boyle"],
    ["archimede", "flottabilite", "poussee"],
    ["dalton", "pression partielle"],
    ["henry", "dissolution", "saturation"],
    ["mn90", "table", "tables de plongee"],
    ["nitrox", "air enrichi", "eanx"],
    ["oxygene", "o2"],
    ["rifap", "secourisme", "secours"],
    ["signe", "geste", "communication"],
    ["remontee", "ascension"],
    ["palanquee", "binome"],
    ["pa20", "plongeur autonome"],
    ["hypothermie", "froid"],
    ["oreille", "tympan"],
    ["consommation", "conso"],
    ["guide de palanquee", "gp", "n4"],
    ["initiateur", "e1"],
    ["moniteur", "e2"],
    ["prerogatives", "pe", "pa"],
    ["successive", "plongees successives", "majoration"],
    ["hyperoxie", "effet paul bert", "toxicite de l'oxygene"]
  ];
  AA.i18n.add("fr", {
    "search.suggest": ["octopus", "pression absolue", "palier", "narcose", "gilet", "consommation", "signes", "Mariotte", "réserve", "essoufflement"],
    "sr.ph": "Une notion, un mot, une question… (fautes acceptées)",
    "sr.phPc": "Chercher partout · Ctrl K",
    "sr.clear": "Effacer",
    "sr.best": "Meilleur résultat",
    "sr.g.lesson": "Cours", "sr.g.section": "Passages de cours", "sr.g.notion": "Notions", "sr.g.gloss": "Glossaire",
    "sr.g.memo": "À retenir", "sr.g.tool": "Outils et écrans", "sr.g.card": "Flashcards", "sr.g.question": "Questions",
    "sr.f.all": "Tout", "sr.f.lesson": "Cours", "sr.f.notion": "Notions", "sr.f.gloss": "Glossaire", "sr.f.tool": "Outils", "sr.f.card": "Cartes", "sr.f.question": "Questions",
    "sr.lvAll": "Tous niveaux", "sr.lvLabel": "Niveau",
    "sr.more": "Voir les {n}",
    "sr.open": "Ouvrir", "sr.read": "Lire le cours", "sr.readFirst": "À lire d’abord", "sr.quiz": "Quiz", "sr.passage": "Lire ce passage",
    "sr.drill": "Réviser cette notion", "sr.sheet": "Voir la fiche", "sr.answer": "Voir la réponse", "sr.course": "Aller au cours",
    "sr.unreadQ": "Cours pas encore lu : lis-le avant de t’entraîner sur cette question.",
    "sr.did": "Tu voulais dire :", "sr.fuzzy": "Résultats approchés pour « {q} »", "sr.partial": "Aucun résultat avec tous les mots : voici les plus proches.",
    "sr.syn": "Synonymes inclus : {s}",
    "sr.noneT": "Rien trouvé pour « {q} »", "sr.noneS": "Essaie un mot plus court, un synonyme, ou parcours le glossaire.", "sr.noFilters": "Chercher dans tout",
    "sr.forYou": "Pour toi", "sr.gap": "Lacune : {n}", "sr.next": "À lire : {t}",
    "sr.browse": "Parcourir", "sr.ideas": "Idées de recherche", "sr.recent": "Recherches récentes",
    "sr.tip": "Astuce : les fautes, les accents et les synonymes sont acceptés (« octopus » trouve aussi « détendeur de secours »).",
    "sr.tipPc": "Sur ordinateur : Ctrl K ou / depuis n’importe quel écran, flèches pour parcourir, Entrée pour ouvrir, Échap pour effacer.",
    "sr.b.gloss": "Glossaire illustré", "sr.b.cours": "Tous les cours", "sr.b.exam": "Examen blanc", "sr.b.flash": "Flashcards", "sr.b.fiches": "Fiches à imprimer", "sr.b.progres": "Mes progrès", "sr.b.backup": "Sauvegarde et synchro"
  });
})();
