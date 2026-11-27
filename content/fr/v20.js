/* =====================================================================
   Abysse Academy 2.0 · structure pédagogique
   - Prérequis entre cours (ordre logique vers l'examen blanc).
   - Notions de chaque cours N2 (les questions y sont rattachées par
     mots-clés, sur le texte sans accents). Les autres cours tirent leurs
     notions de « À retenir ».
   - Textes d'interface de la refonte.
   ===================================================================== */
(function () {
  "use strict";
  const AA = window.AA, C = AA.content;

  /* Prérequis : à lire avant (conseillé). Sans entrée : le cours précédent du niveau. */
  C.prereq = Object.assign(C.prereq || {}, {
    pression: [], mariotte: ["pression"], archimede: ["pression"], dalton: ["pression", "mariotte"],
    physio: ["pression"], accidents: ["mariotte", "physio"], deco: ["dalton", "accidents"],
    materiel: ["mariotte"], regles: [], pa20: ["deco", "regles", "materiel"], environnement: [],
    "nx-base": ["dalton"], "n3-gaz": ["dalton"], "n3-deco": ["deco"], "r-o2": ["r-alerte"]
  });

  /* Notions : [id, titre, mots-clés (regex sans accents), mot à surligner dans le cours] */
  C.notions = Object.assign(C.notions || {}, {
    pression: [
      ["unites", "Unités et pression atmosphérique", "atmospher|altitude|pascal|hpa|unite|1,013|1013|millibar|niveau de la mer|montagne|lac", "atmosphérique"],
      ["hydro", "Pression hydrostatique", "hydrostat|colonne|eau douce|eau de mer|tous les 10|par 10 m|chaque 10|poids de l.eau|densite", "hydrostatique"],
      ["abs", "Pression absolue et relative", "absolue|relative|manometre|profondimetre|totale|a \\d+ m", "absolue"],
      ["rapport", "Rapport de pression et zone sensible", "rapport|double|triple|zone|premiers metres|variation|proche de la surface|0 et 10", "rapport"]
    ],
    mariotte: [
      ["loi", "La loi P × V = constante", "mariotte|p ?[x×*] ?v|volume|compress|dilat|ballon|gonfl|poumon", "Mariotte"],
      ["conso", "Consommation au fond", "consomm|l/min|litres? par minute|respire|essouffl|effort|froid", "consommation"],
      ["autonomie", "Autonomie, réserve et volume disponible", "autonomie|reserve|bloc de|bar restant|disponible|duree|combien de (temps|minutes)|tiendr", "autonomie"],
      ["temp", "Température et gonflage", "temperat|chaud|soleil|charles|gonflage|\\d+ ?°|refroidi", "température"]
    ],
    archimede: [
      ["poussee", "Poussée et poids apparent", "poussee|poids apparent|flott|coule|densite|volume deplace|positi|negati|neutre", "poussée"],
      ["ballast", "Poumon-ballast et gilet", "poumon|gilet|inspir|expir|stabilis|equilibr", "poumon"],
      ["lestage", "Lestage et fin de plongée", "lest|plomb|fin de plongee|bloc (vide|se vide)|eau douce|combinaison|neoprene|ecrase", "lestage"],
      ["relevage", "Parachute et relevage", "parachute|relevage|soulev|remonter (un|une|l.)|objet|ancre", "parachute"]
    ],
    dalton: [
      ["pp", "Pressions partielles (Dalton)", "partielle|dalton|pp ?o|ppn|ppo|pourcentage|%|fraction|composition|79|21", "partielle"],
      ["seuils", "Seuils et toxicités", "narcose|ivresse|toxic|hyperox|hypox|seuil|1,6|0,17|1,4|5,6|essai|paul bert|lorrain", "toxicité"],
      ["henry", "Dissolution des gaz (Henry)", "henry|dissol|saturat|sursatur|desatur|tissu|periode|soda|gazeuse|bulle|liquide", "Henry"]
    ],
    physio: [
      ["resp", "Respiration et commande", "respir|alveol|co2|ventil|essouffl|bulbe|diaphragm|trachee|bronch|poumon|volume courant|capacite vitale", "Respiration"],
      ["circ", "Circulation", "coeur|sang|circul|artere|veine|foramen|ventricul|oreillette|capillaire|hemoglobine|globule", "Circulation"],
      ["oreille", "Oreille et équilibrage", "oreille|tympan|trompe|eustache|valsalva|equilibr|vertige|sinus|cochlee|vestibul", "Oreille"]
    ],
    accidents: [
      ["baro", "Barotraumatismes (oreilles, sinus, masque)", "barotrau|oreille|sinus|placage|dent|tympan|masque", "barotraumatisme"],
      ["surp", "Surpression pulmonaire", "surpression|bloqu|expir|retenir sa respiration|remontee rapide|poumon", "surpression"],
      ["add", "Accident de décompression (ADD)", "\\badd\\b|accident de decompression|bulle|facteur|fatigue|deshydrat|effort|yoyo|fourmill|paralys", "ADD"],
      ["autres", "Narcose, essoufflement, froid, noyade", "narcose|essouffl|froid|hypotherm|co2|noyade|ivresse|malaise", "essoufflement"],
      ["cat", "Conduite à tenir et alerte", "conduite|oxygene|o2|alerte|secours|aspirine|eau plate|cross|\\b15\\b|112|196|evacu|caisson", "oxygène"]
    ],
    deco: [
      ["vocab", "Vocabulaire et lecture des tables", "profondeur|duree|palier|majoration|groupe|gps|table|lecture|valeur absente|immediatement superieur", "palier"],
      ["vitesse", "Vitesses de remontée", "vitesse|m/min|remont|entre paliers|dtr", "vitesse"],
      ["succ", "Plongées successives et consécutives", "successive|consecutive|deux plongees|intervalle|azote residuel|seconde plongee|deuxieme plongee", "successive"],
      ["ordi", "Ordinateur de plongée", "ordinateur|ordi\\b|algorithme|mode|alarme", "Ordinateur"],
      ["avion", "Altitude et avion", "altitude|avion|montagne|col\\b|vol", "avion"]
    ],
    materiel: [
      ["bloc", "Le bloc", "bloc|robinet|requalif|epreuve|tiv|inspection|gravure|acier|alu|bouteille|ogive", "bloc"],
      ["detendeur", "Le détendeur", "detendeur|etage|givr|octopus|membrane|piston|debit|embout|surpresseur|clapet", "détendeur"],
      ["gilet", "Gilet et instruments", "gilet|direct system|inflateur|purge|manometre|profondimetre|compas|instrument|ordinateur|lampe|parachute", "gilet"],
      ["entretien", "Entretien et vérifications", "entretien|rinc|verif|avant de plonger|joint|grais|stock|seche", "Entretien"]
    ],
    regles: [
      ["cadre", "Code du sport et espaces", "code du sport|espace|0.?6|6.?20|20.?40|medical|certificat|licence|assurance|arrete|federation", "espace"],
      ["n2", "Aptitudes du N2 (PA20, PE40)", "pa ?20|pe ?40|pa ?40|pe ?60|aptitude|autonom|encadr|n2 peut|prerog", "PE40"],
      ["roles", "Rôles : DP, guide de palanquée", "directeur|\\bdp\\b|guide|\\bgp\\b|serre|chef de palanquee|responsable", "directeur"],
      ["secours", "Matériel de secours et surface", "secours|oxygene|trousse|surface|pavillon|bateau|vhf|fiche|telephone|eau douce", "secours"]
    ],
    pa20: [
      ["avant", "Préparer la plongée", "prepar|avant|briefing|parametre|binome|plan|planifi|choisir|meteo", "briefing"],
      ["air", "Gérer l'air à deux ou trois", "air|reserve|manometre|\\bbar\\b|mi-pression|retour|consomm|50 bar|tiers", "réserve"],
      ["perte", "Perte de palanquée et orientation", "perte|perdu|separe|orient|compas|1 minute|une minute|rejoindre|cap", "perte"],
      ["apres", "Fin de plongée et parachute", "apres|parachute|palier|fin de plongee|surface|debrief|carnet|remontee", "parachute"]
    ],
    environnement: [
      ["milieu", "Le milieu : marées, courants, sens", "maree|douzieme|etale|courant|vent|lumiere|couleur|son\\b|visib|thermocline|absorb|rouge", "marée"],
      ["faune", "Faune et flore", "posidonie|merou|rascasse|vive|meduse|oursin|gorgone|corail|espece|poisson|murene|herbier|dorade|poulpe", "posidonie"],
      ["gestes", "Les bons gestes", "palm|touch|nourri|ancre|mouillage|respect|proteg|dechet|stabilis|ramasser|charte", "gestes"]
    ]
  });

  /* Questions ajoutées (2.0) sur les notions N2 trop peu couvertes. Ajout en fin de liste uniquement. */
  /* Barème XP 2.0 expliqué (bouton « ? » et compteur d'XP). */
  C.help.xp = Object.assign({}, C.help.xp, { html: `<p>L’XP récompense ce que tu <b>apprends</b>, pas le nombre de clics : refaire dix fois le même quiz le même jour ne rapporte presque rien.</p>
    <table class="tu-xptab"><tr><th>Action</th><th>XP</th></tr>
    <tr><td>Cours lu (la 1re fois)</td><td>25</td></tr>
    <tr><td>Bonne réponse à une question jamais réussie</td><td>10</td></tr>
    <tr><td>Bonne réponse en révision espacée (3 jours ou plus après)</td><td>7</td></tr>
    <tr><td>Révision 1 à 2 jours après / le même jour</td><td>4 / 1</td></tr>
    <tr><td>Calcul généré (15 premiers du jour, puis 1)</td><td>6</td></tr>
    <tr><td>Série de 5 bonnes réponses</td><td>+2 par réponse</td></tr>
    <tr><td>Défi éclair sans faute</td><td>15</td></tr>
    <tr><td>Notion acquise / maîtrisée (une fois chacune)</td><td>15 / 25</td></tr>
    <tr><td>Lacune comblée (vérification réussie)</td><td>30</td></tr>
    <tr><td>Séance du tuteur (1 par jour)</td><td>20</td></tr>
    <tr><td>Paliers de score d’un cours : 50 %, 80 %, 100 %</td><td>25 chacun</td></tr>
    <tr><td>Série d’un cours réussie à 60 % (1 par cours et par jour)</td><td>15</td></tr>
    <tr><td>10 réponses dans la journée (série de jours : ×2 dès 7 jours, ×3 dès 30)</td><td>10 / 20 / 30</td></tr>
    <tr><td>Examen blanc terminé (1 par jour) / réussi à 15/20 (1re fois par niveau)</td><td>30 / 150</td></tr></table>
    <p><b>Niveaux.</b> Chaque niveau demande un peu plus que le précédent. À 20 minutes par jour : niveau 5 la 1re semaine, 10 en deux semaines, 20 vers six semaines, 30 vers quatre mois. Le rang maximal, <b>Légende des abysses</b>, arrive au niveau 50, après environ un an et demi d’entretien régulier de tout le parcours jusqu’à E2 (un an à 40 minutes par jour). Les niveaux continuent ensuite.</p>
    <p><b>Avatar.</b> 10 évolutions (niveaux 1, 3, 6, 10, 15, 20, 26, 32, 40 et 50) et 12 rangs.</p>` });
  AA.i18n.add("fr", { "hud.nextRank": "nouveau rang au niveau {l}", "tu.examPassXp": "Examen blanc réussi : +{n} XP et un trophée pour ce niveau !" });
  /* Trophées 2.0 : répartis sur tout le parcours, de la découverte à E2. */
  C.badges.push(
    { id: "tu-read-decouverte", icon: "book", name: "Bibliothèque Découverte", desc: "Lire tous les cours Découverte", test: { k: "tuReadW", w: "decouverte" } },
    { id: "tu-exam-decouverte", icon: "exam", name: "Baptême réussi", desc: "Réussir l’examen blanc complet Découverte (15/20 ou plus)", test: { k: "tuExam", w: "decouverte" } },
    { id: "tu-read-n1", icon: "book", name: "Bibliothèque N1", desc: "Lire tous les cours N1", test: { k: "tuReadW", w: "n1" } },
    { id: "tu-exam-n1", icon: "exam", name: "Plongeur encadré", desc: "Réussir l’examen blanc complet N1 (15/20 ou plus)", test: { k: "tuExam", w: "n1" } },
    { id: "tu-read-n2", icon: "book", name: "Bibliothèque N2", desc: "Lire tous les cours N2", test: { k: "tuReadW", w: "n2" } },
    { id: "tu-exam-n2", icon: "exam", name: "Autonome à 20 m", desc: "Réussir l’examen blanc complet N2 (15/20 ou plus)", test: { k: "tuExam", w: "n2" } },
    { id: "tu-read-rifap", icon: "book", name: "Bibliothèque RIFAP", desc: "Lire tous les cours RIFAP", test: { k: "tuReadW", w: "rifap" } },
    { id: "tu-exam-rifap", icon: "exam", name: "Secouriste formé", desc: "Réussir l’examen blanc complet RIFAP (15/20 ou plus)", test: { k: "tuExam", w: "rifap" } },
    { id: "tu-read-nitrox", icon: "book", name: "Bibliothèque Nitrox", desc: "Lire tous les cours Nitrox", test: { k: "tuReadW", w: "nitrox" } },
    { id: "tu-exam-nitrox", icon: "exam", name: "Air enrichi", desc: "Réussir l’examen blanc complet Nitrox (15/20 ou plus)", test: { k: "tuExam", w: "nitrox" } },
    { id: "tu-read-n3", icon: "book", name: "Bibliothèque N3", desc: "Lire tous les cours N3", test: { k: "tuReadW", w: "n3" } },
    { id: "tu-exam-n3", icon: "exam", name: "Autonome à 60 m", desc: "Réussir l’examen blanc complet N3 (15/20 ou plus)", test: { k: "tuExam", w: "n3" } },
    { id: "tu-read-e1", icon: "book", name: "Bibliothèque E1", desc: "Lire tous les cours E1", test: { k: "tuReadW", w: "e1" } },
    { id: "tu-exam-e1", icon: "exam", name: "Initiateur en herbe", desc: "Réussir l’examen blanc complet E1 (15/20 ou plus)", test: { k: "tuExam", w: "e1" } },
    { id: "tu-read-n4", icon: "book", name: "Bibliothèque N4", desc: "Lire tous les cours N4", test: { k: "tuReadW", w: "n4" } },
    { id: "tu-exam-n4", icon: "exam", name: "Guide de palanquée", desc: "Réussir l’examen blanc complet N4 (15/20 ou plus)", test: { k: "tuExam", w: "n4" } },
    { id: "tu-read-e2", icon: "book", name: "Bibliothèque E2", desc: "Lire tous les cours E2", test: { k: "tuReadW", w: "e2" } },
    { id: "tu-exam-e2", icon: "exam", name: "Moniteur en vue", desc: "Réussir l’examen blanc complet E2 (15/20 ou plus)", test: { k: "tuExam", w: "e2" } },
    { id: "tu-read1", icon: "book", name: "Première lecture", desc: "Marquer un premier cours comme lu", test: { k: "tuReadN", n: 1 } },
    { id: "tu-read25", icon: "book", name: "Grand lecteur", desc: "25 cours lus", test: { k: "tuReadN", n: 25 } },
    { id: "tu-readall", icon: "book", name: "Encyclopédie vivante", desc: "Tous les cours lus, de la découverte à E2", test: { k: "tuReadN", n: "all" } },
    { id: "tu-not1", icon: "bulb", name: "Déclic", desc: "Première notion acquise", test: { k: "tuNotion", n: 1 } },
    { id: "tu-not10", icon: "bulb", name: "Ça rentre", desc: "10 notions acquises", test: { k: "tuNotion", n: 10 } },
    { id: "tu-not40", icon: "bulb", name: "Tête bien faite", desc: "40 notions acquises", test: { k: "tuNotion", n: 40 } },
    { id: "tu-not100", icon: "brain", name: "Savoir solide", desc: "100 notions acquises", test: { k: "tuNotion", n: 100 } },
    { id: "tu-mas10", icon: "star", name: "Maîtrise", desc: "10 notions maîtrisées", test: { k: "tuMaster", n: 10 } },
    { id: "tu-mas50", icon: "star", name: "Expertise", desc: "50 notions maîtrisées", test: { k: "tuMaster", n: 50 } },
    { id: "tu-mas100", icon: "star", name: "Encyclopédiste", desc: "100 notions maîtrisées", test: { k: "tuMaster", n: 100 } },
    { id: "tu-gap1", icon: "target", name: "Lacune comblée", desc: "Réussir une vérification après une lacune", test: { k: "tuGap", n: 1 } },
    { id: "tu-gap10", icon: "target", name: "Rien ne m’échappe", desc: "10 lacunes comblées", test: { k: "tuGap", n: 10 } },
    { id: "tu-ecl1", icon: "bolt", name: "Éclair", desc: "Un défi éclair sans faute", test: { k: "tuEclair", n: 1 } },
    { id: "tu-ecl10", icon: "bolt", name: "Orage de savoir", desc: "10 défis éclair sans faute", test: { k: "tuEclair", n: 10 } },
    { id: "tu-ses5", icon: "compass", name: "Bon élève", desc: "5 séances du tuteur", test: { k: "tuSess", n: 5 } },
    { id: "tu-ses30", icon: "compass", name: "Fidèle au tuteur", desc: "30 séances du tuteur", test: { k: "tuSess", n: 30 } },
    { id: "tu-ses100", icon: "compass", name: "Inséparables", desc: "100 séances du tuteur", test: { k: "tuSess", n: 100 } },
    { id: "tu-ans500", icon: "check", name: "500 réponses", desc: "Répondre à 500 questions", test: { k: "answers", n: 500 } },
    { id: "tu-ans2000", icon: "check", name: "2 000 réponses", desc: "Répondre à 2 000 questions", test: { k: "answers", n: 2000 } },
    { id: "tu-ans5000", icon: "check", name: "5 000 réponses", desc: "Répondre à 5 000 questions", test: { k: "answers", n: 5000 } },
    { id: "tu-str60", icon: "flame", name: "Deux mois de bulles", desc: "60 jours d’affilée", test: { k: "streak", n: 60 } },
    { id: "tu-str100", icon: "flame", name: "Centenaire", desc: "100 jours d’affilée", test: { k: "streak", n: 100 } },
    { id: "tu-str365", icon: "flame", name: "Une année sous l’eau", desc: "365 jours d’affilée", test: { k: "streak", n: 365 } },
    { id: "tu-lv10", icon: "trophy", name: "Niveau 10", desc: "Atteindre le niveau 10", test: { k: "level", n: 10 } },
    { id: "tu-lv20", icon: "trophy", name: "Niveau 20", desc: "Atteindre le niveau 20", test: { k: "level", n: 20 } },
    { id: "tu-lv30", icon: "trophy", name: "Niveau 30", desc: "Atteindre le niveau 30", test: { k: "level", n: 30 } },
    { id: "tu-lv40", icon: "trophy", name: "Niveau 40", desc: "Atteindre le niveau 40", test: { k: "level", n: 40 } },
    { id: "tu-lv50", icon: "trophy", name: "Légende des abysses", desc: "Atteindre le niveau 50", test: { k: "level", n: 50 } }
  );
  C.addQuestions("pression", [
    { q: "Entre la surface et 10 m, la pression absolue passe de 1 à 2 bar. Quel est le rapport de pression ?", c: ["2 : elle double", "1,5", "10", "1 : elle ne change pas"], a: 0, e: "2 bar / 1 bar = 2 : la pression double entre 0 et 10 m. C’est le plus grand rapport de toute la plongée." },
    { q: "Pourquoi dit-on que la zone des 10 premiers mètres est la plus « sensible » ?", c: ["Le rapport de pression y est le plus grand : les volumes d’air y varient le plus vite", "L’eau y est plus froide", "La pression y est la plus forte", "La visibilité y est moins bonne"], a: 0, e: "De 0 à 10 m le rapport de pression vaut 2, de 30 à 40 m seulement 1,25. Oreilles, masque, gilet et poumons y subissent les plus fortes variations : vigilance à la descente comme à la remontée." },
    { q: "Entre 30 m et 40 m, quel est le rapport de pression absolue ?", c: ["5/4 = 1,25", "2", "4/3 ≈ 1,33", "10"], a: 0, e: "À 30 m : 4 bar ; à 40 m : 5 bar. Le rapport vaut 5 / 4 = 1,25, bien moins qu’entre 0 et 10 m (× 2)." }
  ]);
  C.addQuestions("mariotte", [
    { q: "Bloc de 12 L gonflé à 200 bar, réserve à 50 bar. Quel volume d’air est disponible avant la réserve ?", c: ["1 800 L", "2 400 L", "600 L", "150 L"], a: 0, e: "(200 − 50) × 12 = 1 800 L d’air détendu disponibles avant d’atteindre la réserve." },
    { q: "Avec 1 800 L disponibles et une consommation de 60 L/min au fond, quelle autonomie environ ?", c: ["30 min", "60 min", "18 min", "45 min"], a: 0, e: "1 800 / 60 = 30 minutes au fond, sans compter la remontée ni les paliers : on garde toujours de la marge." },
    { q: "Un bloc plein reste au soleil et chauffe. Que fait sa pression ?", c: ["Elle augmente", "Elle baisse", "Elle ne change pas", "Elle devient nulle"], a: 0, e: "À volume constant, la pression d’un gaz augmente avec la température : on ne laisse pas un bloc plein au soleil." }
  ]);
  C.addQuestions("archimede", [
    { q: "Stabilisé près du fond, tu inspires profondément. Que se passe-t-il ?", c: ["Tu remontes légèrement : ton volume augmente", "Tu descends", "Rien ne change", "Ton gilet se vide"], a: 0, e: "C’est le poumon-ballast : en inspirant, ton volume augmente, donc la poussée aussi. On affine sa stabilisation avec la respiration." },
    { q: "Pourquoi gonfler son gilet par petites touches ?", c: ["Pour ajuster finement sa flottabilité sans partir vers la surface", "Pour économiser l’air du bloc", "Parce que le direct system est fragile", "Pour se réchauffer"], a: 0, e: "Trop d’air dans le gilet fait remonter, et cet air se dilate en remontant : on ajuste peu à la fois, on attend, puis on corrige." }
  ]);
  C.addQuestions("deco", [
    { q: "Qu’appelle-t-on une plongée successive ?", c: ["Une plongée faite alors qu’il reste de l’azote de la plongée précédente", "Deux plongées dans la même semaine", "Une plongée avec deux blocs", "Une plongée à trois plongeurs"], a: 0, e: "Après une plongée, l’azote résiduel met des heures à s’éliminer. Une seconde plongée dans ce délai est une plongée successive : elle doit en tenir compte." },
    { q: "Pour une plongée successive, que fait ton ordinateur ?", c: ["Il tient compte de l’azote qui reste de la plongée précédente", "Il remet tout à zéro", "Il double la durée des paliers", "Rien : chaque plongée est indépendante"], a: 0, e: "L’ordinateur garde en mémoire la saturation de tes tissus : la seconde plongée part avec un « reste » d’azote, d’où des durées sans palier plus courtes." },
    { q: "Deux plongées séparées par un intervalle très court sont traitées comme…", c: ["Une seule plongée (plongées consécutives)", "Deux plongées indépendantes", "Une plongée sans palier", "Une plongée profonde"], a: 0, e: "Quand l’intervalle est très court, on considère une seule plongée : durées additionnées, profondeur la plus grande. Le seuil exact dépend de la méthode, vu en cours." },
    { q: "Pourquoi éviter de prendre l’avion juste après une plongée ?", c: ["La pression baisse en cabine : l’azote restant peut former des bulles", "L’avion fait monter la température", "Les oreilles ne le supportent pas", "C’est interdit par la loi"], a: 0, e: "En vol, la cabine est à une pression plus faible qu’au sol : c’est comme une remontée de plus. On respecte un délai après la plongée." },
    { q: "Plonger dans un lac de montagne demande…", c: ["Une méthode adaptée à l’altitude : la pression en surface y est plus faible", "Rien de particulier", "Seulement moins de lest", "De ne faire aucun palier"], a: 0, e: "En altitude la pression atmosphérique est plus faible : les tables et réglages prévus pour la mer ne s’appliquent pas tels quels." }
  ]);
  C.addQuestions("materiel", [
    { q: "Après la plongée en mer, que fais-tu de ton détendeur ?", c: ["Je le rince à l’eau douce, capuchon de protection en place", "Je le range mouillé dans le sac", "Je le démonte moi-même", "Je le graisse à l’huile"], a: 0, e: "Rinçage à l’eau douce, capuchon de protection bien en place pour que l’eau n’entre pas, puis séchage à l’ombre : c’est l’entretien de base." },
    { q: "Juste avant de t’équiper, quelles vérifications fais-tu ?", c: ["Pression au manomètre, air qui passe bien, gilet qui gonfle et purge", "La couleur du bloc", "Rien, le club s’en charge", "Je vide un peu d’air du bloc"], a: 0, e: "Vérifications avant de plonger : pression suffisante, respiration normale sur les deux détendeurs, gilet qui gonfle et se purge. Puis vérification croisée avec ton binôme." },
    { q: "Comment stocker un bloc entre deux sorties ?", c: ["Calé, à l’abri du soleil et de la chaleur", "Couché au soleil", "Dans une voiture fermée en été", "N’importe où"], a: 0, e: "On le stocke à l’abri de la chaleur (la pression monte avec la température), calé pour ne pas tomber, et on le rince après la mer." }
  ]);
  C.addQuestions("regles", [
    { q: "Sur un site de plongée, quel matériel de secours doit être disponible ?", c: ["De l’oxygène, une trousse de secours et un moyen d’alerter", "Seulement une trousse", "Rien si le club est sérieux", "Un bloc de rechange"], a: 0, e: "Le site dispose d’oxygène, d’une trousse de premiers secours et d’un moyen d’appeler les secours (téléphone, VHF en mer). Repère où ils sont dès ton arrivée." }
  ]);
  C.addQuestions("pa20", [
    { q: "Sous l’eau, tu ne vois plus ton binôme. Que fais-tu (principe courant) ?", c: ["Tour d’horizon et recherche brève, une minute environ, puis je remonte", "Je continue la plongée seul", "Je descends le chercher plus bas", "J’attends au fond jusqu’à la réserve"], a: 0, e: "Principe courant en cas de perte de palanquée : tour d’horizon, recherche brève, puis remontée. Chacun l’applique de son côté pour se retrouver en surface." },
    { q: "Comment garder le cap pour revenir au bateau ?", c: ["En suivant un cap au compas et des repères sur le fond", "Au hasard", "En suivant les bulles des autres", "En remontant pour regarder"], a: 0, e: "Le compas et les repères naturels (roches, tombant, sable) permettent de s’orienter et de revenir au point de départ." }
  ]);
  C.addQuestions("environnement", [
    { q: "Pourquoi rester stable au-dessus du fond ?", c: ["Pour ne pas abîmer la vie fixée avec ses palmes", "Pour consommer plus", "Pour voir moins de poissons", "Ce n’est pas important"], a: 0, e: "Un coup de palme ou un genou posé détruit en un instant des organismes fragiles. On se stabilise avant d’approcher." },
    { q: "Peut-on nourrir les poissons pendant la plongée ?", c: ["Non : ça modifie leur comportement", "Oui, avec du pain", "Oui, si le guide le fait", "Seulement les mérous"], a: 0, e: "Nourrir la faune la rend dépendante et parfois agressive. On observe sans toucher ni nourrir." }
  ]);

  /* Aide (boutons « ? ») */
  C.help = C.help || {};
  Object.assign(C.help, {
    maitrise: { t: "Statuts et maîtrise", ic: "target", go: "progres", goL: "Voir mes progrès",
      html: `<p>Chaque cours passe par ces <b>statuts</b> :</p>
        <ul><li><b>À lire</b> : pas encore lu. Son quiz est fermé.</li>
        <li><b>Lu · quiz à faire</b> : tu l’as marqué lu, teste-toi dessus.</li>
        <li><b>Lu · en cours</b> : tu as commencé à répondre, la maîtrise monte.</li>
        <li><b>Acquis</b> : maîtrise d’au moins 65 %.</li>
        <li><b>Maîtrisé</b> : au moins 85 % et toutes ses notions travaillées.</li>
        <li><b>Lacune à combler</b> : au moins une notion ratée plusieurs fois.</li>
        <li><b>À réviser</b> : pas revu depuis longtemps.</li></ul>
        <p>La <b>maîtrise</b> se calcule <b>notion par notion</b> (les sous-parties d’un cours) à partir de tes réponses : les plus récentes comptent le plus, et elle baisse doucement si tu ne révises pas.</p>
        <p>Une <b>notion</b> est <i>fragile</i> sous 45 %, <i>en cours</i> jusqu’à 65 %, <i>acquise</i> au-dessus, <i>maîtrisée</i> à partir de 85 % avec au moins 4 réponses. Deux erreurs de suite sur une notion = <b>lacune</b>.</p>
        <p>Les anciennes étoiles sont remplacées par ces statuts.</p>` },
    tuteur: { t: "Le tuteur", ic: "compass", go: "home", goL: "Voir ma prochaine étape",
      html: `<p>Le tuteur choisit ta <b>prochaine étape</b>, dans cet ordre :</p>
        <ol><li>tester un cours que tu viens de lire ;</li><li>vérifier une lacune travaillée il y a 2 jours ;</li><li>combler une lacune (relire le passage, puis 5 questions ciblées) ;</li><li>faire tes révisions espacées du jour ;</li><li>lire le cours suivant de ton parcours ;</li><li>passer l’examen blanc quand tout est lu.</li></ol>
        <p>Toutes les questions viennent des <b>cours que tu as lus</b>. Rien ne dépend d’un moniteur : l’appli est faite pour apprendre seul.</p>` }
  });

  AA.i18n.add("fr", {
    /* Navigation */
    "tab.cours": "Cours", "tab.progres": "Progrès", "tu.ok": "Compris",
    /* Textes revus (moniteur plus discret) */
    "lesson.tab.moniteur": "Mes notes",
    "lesson.coachIntro": "Tes notes personnelles sur ce cours : questions, astuces, ce que tu veux retenir.",
    "common.validate": "Hypothèse",
    "exm.hyp": "Format proche de l’écrit des clubs (QCM et calculs). C’est une hypothèse : le format exact peut varier selon les centres.",
    /* Statuts d'un cours */
    "tu.st.toread": "À lire", "tu.st.quiz": "Lu · quiz à faire", "tu.st.gap": "Lacune à combler", "tu.st.review": "À réviser",
    "tu.st.learning": "Lu · en cours", "tu.st.ok": "Acquis", "tu.st.master": "Maîtrisé", "tu.st.cert": "Niveau obtenu",
    /* Notions */
    "tu.n.new": "Pas encore vue", "tu.n.weak": "Fragile", "tu.n.mid": "En cours", "tu.n.ok": "Acquise", "tu.n.master": "Maîtrisée", "tu.n.gap": "Lacune",
    "tu.general": "Vue d’ensemble",
    /* Cours lu */
    "tu.readT": "Tu as fini ce cours ?",
    "tu.readS": "Marque-le comme lu : son quiz s’ouvre et ses questions entrent dans tes révisions.",
    "tu.readBtn": "J’ai lu ce cours",
    "tu.readDone": "Cours lu le {d}",
    "tu.readDoneS": "Son quiz est ouvert et ses questions reviennent dans tes révisions.",
    "tu.unread": "Remettre en « à lire »",
    "tu.unreadQ": "Remettre ce cours en « à lire » ? Ses questions sortiront de tes révisions jusqu’à ce que tu le relises.",
    "tu.unreadOk": "Remettre à lire",
    "tu.readToast": "Cours lu", "tu.readToastS": "Le quiz de « {t} » est ouvert.",
    "tu.quizLocked": "Quiz après lecture",
    "tu.goRead": "Aller à la fin du cours",
    "tu.needT": "Lis d’abord ce cours",
    "tu.needS": "Le quiz de « {t} » s’ouvre quand tu as lu le cours et appuyé sur « J’ai lu ce cours », en bas de l’Essentiel. Tu ne tombes ainsi jamais sur une question que tu n’as pas apprise.",
    "tu.needBtn": "Lire « {t} »",
    "tu.noneT": "Aucun cours lu pour l’instant",
    "tu.noneS": "Les révisions et les quiz mélangés ne portent que sur les cours que tu as lus. Commence par lire un cours.",
    "tu.prereqT": "À lire avant, c’est conseillé",
    "tu.prereqS": "Ce cours s’appuie sur :",
    "tu.certNote": "Niveau obtenu : ces cours sont considérés comme acquis. Tu peux les relire quand tu veux.",
    "tu.notions": "Notions de ce cours",
    "tu.notionsS": "Ta maîtrise de chaque notion, d’après tes réponses.",
    "tu.reread": "Relire",
    "tu.train": "S’entraîner",
    /* Accueil */
    "tu.where": "Où tu en es",
    "tu.goal": "Objectif {w}",
    "tu.readN": "{n}/{tot} cours lus",
    "tu.notionsN": "{n}/{tot} notions vues",
    "tu.masteryN": "Maîtrise {p} %",
    "tu.next": "Ta prochaine étape",
    "tu.then": "Ensuite",
    "tu.planT": "Ton plan vers l’examen",
    "tu.planDate": "Examen dans {d} jours. Il te reste {r} cours à lire : environ {w} par semaine, puis la dernière semaine pour l’examen blanc et les révisions.",
    "tu.planDateDone": "Examen dans {d} jours. Tous les cours sont lus : passe un examen blanc chaque semaine et comble tes lacunes.",
    "tu.planNoDate": "Il te reste {r} cours à lire. Donne ta date d’examen dans les réglages pour avoir un rythme conseillé.",
    "tu.planNoDateDone": "Tous les cours sont lus. Passe l’examen blanc, puis travaille tes notions fragiles.",
    "tu.setDate": "Indiquer ma date d’examen",
    "tu.ready": "Prêt pour l’examen blanc",
    "tu.notReady": "Examen blanc conseillé quand tout est lu",
    "tu.seeAll": "Tout le parcours",
    "tu.gapsT": "Tes lacunes",
    "tu.gapsNone": "Aucune lacune détectée pour l’instant. Le tuteur les repère dès que tu te trompes plusieurs fois sur une même notion.",
    "tu.fix": "Combler",
    "tu.eclairTitle": "Défi éclair · {t}", "tu.eclairS": "Trois questions tout de suite sur « {t} » pour ancrer ce que tu viens de lire. Sans faute : +10 XP.",
    "tu.eclairBtn": "Défi éclair (3 questions)", "tu.later": "Plus tard",
    "tu.eclairOk": "Défi éclair réussi sans faute : +10 XP. C’est ancré !", "tu.eclairNo": "Pas de souci : les questions ratées reviendront dans tes prochaines révisions.",
    "tu.wonT": "{n} notion(s) désormais acquise(s) grâce à cette série",
    "tu.todayT": "Envie de réviser librement ?",
    "tu.todayS": "Questions des cours lus, choisies pour toi : lacunes, révisions espacées, notions fragiles et un calcul.",
    "tu.todayBtn": "Lancer la séance du tuteur",
    /* Actions du tuteur */
    "tu.a.quiz": "Teste-toi sur « {t} »", "tu.a.quizS": "Tu viens de lire ce cours : un quiz court pour ancrer.",
    "tu.a.check": "Vérifier : {n}", "tu.a.checkS": "Lacune travaillée il y a quelques jours, on vérifie qu’elle est comblée.",
    "tu.a.gap": "Combler une lacune : {n}", "tu.a.gapS": "Cours « {t} ». Relis le passage, puis 5 questions ciblées.",
    "tu.a.srs": "Révisions du jour", "tu.a.srsS": "{n} questions de cours lus reviennent aujourd’hui.",
    "tu.a.read": "Lire « {t} »", "tu.a.readS": "Cours {i}/{tot} de ton parcours {w}. Environ {m} min.",
    "tu.a.exam": "Passer l’examen blanc {w}", "tu.a.examS": "Tous les cours sont lus : mets-toi en condition d’examen.",
    "tu.a.weak": "Renforcer : {n}", "tu.a.weakS": "Notion encore fragile dans « {t} ».",
    "tu.a.session": "Séance du tuteur", "tu.a.sessionS": "Un mélange adapté de tes cours lus.",
    "tu.a.go": "C’est parti",
    /* Lacunes */
    "tu.gapT": "Lacune : {n}",
    "tu.gapS": "Tu t’es trompé plusieurs fois sur cette notion du cours « {t} ». Le plan : relire le passage, faire 5 questions ciblées, puis on revérifie dans 2 jours.",
    "tu.gap1": "Relire le passage du cours",
    "tu.gap2": "5 questions ciblées",
    "tu.gap3": "Vérification automatique dans 2 jours",
    "tu.drill": "Notion : {n}",
    "tu.resGapsT": "Notions à retravailler",
    "tu.resGapsS": "Le tuteur a noté ces notions. Tu les retrouveras sur l’accueil.",
    "tu.resChk": "Vérification réussie : la lacune « {n} » est comblée.",
    "tu.resChkNo": "Pas encore tout à fait : on revérifie « {n} » demain.",
    "tu.notionQ": "Notion : {n}",
    "tu.session": "Séance du tuteur",
    /* Écran Cours */
    "tu.coursT": "Cours",
    "tu.coursS": "Lis les cours dans l’ordre, marque-les lus, puis entraîne-toi dessus. Chaque cours ouvre son quiz une fois lu.",
    "tu.mapView": "Vue carte",
    "tu.listView": "Liste",
    "tu.examStep": "Examen blanc {w}",
    "tu.examStepS": "Conseillé quand les {n} cours sont lus.",
    "tu.examStepOk": "Tous les cours sont lus : à toi de jouer.",
    "tu.legend": "Statuts",
    /* Écran Progrès */
    "tu.progT": "Progrès",
    "tu.progS": "Ce que tu maîtrises, notion par notion, et ce qu’il reste à travailler.",
    "tu.byCourse": "Par cours",
    "tu.examsT": "Examens blancs",
    "tu.trophies": "Trophées",
    "tu.stats": "Statistiques",
    "tu.answers": "réponses",
    /* S'entraîner */
    "tu.trainS": "Tout ce qui t’entraîne porte sur les cours que tu as lus.",
    "tu.smart": "Révisions intelligentes",
    "tu.byCourseT": "Quiz par cours",
    "tu.byCourseS": "Les cours lus. Les autres s’ouvrent après lecture.",
    "tu.ateliers": "Ateliers",
    "tu.epreuves": "Épreuves",
    "tu.noneRead": "Lis un premier cours pour débloquer l’entraînement.",
    /* Examen */
    "tu.exUnread": "{n} cours de ce niveau ne sont pas encore lus. L’examen interroge quand même tout le programme, comme le jour J : lis tout avant pour qu’il te serve vraiment.",
    "tu.exAll": "Tous les cours de ce niveau sont lus. L’examen interroge tout le programme, avec des questions exigeantes.",
    /* Club et moniteur */
    "tu.clubT": "Club et moniteur",
    "tu.clubS": "Facultatif. Pour ceux qui suivent une formation en club.",
    "tu.clubOn": "Je suis une formation en club",
    "tu.clubOnS": "Affiche dans chaque cours la validation par ton moniteur et des idées de questions à lui poser.",
    "tu.clubIntro": "L’appli est faite pour apprendre en autonomie. Si tu suis une formation en club, ces outils t’aident à faire le lien avec ton moniteur.",
    "tu.notesIntro": "Tes notes personnelles sur ce cours : questions, astuces, ce que tu veux retenir.",
    "tu.coachIdeas": "Idées de questions à poser à ton moniteur",
    "tu.migT": "Nouveau : les cours lus",
    "tu.migS": "Les quiz et révisions ne portent plus que sur les cours lus. Les cours que tu avais déjà réussis sont comptés comme lus."
  });
})();
