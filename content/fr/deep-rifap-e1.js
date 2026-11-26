/* Abysse Academy · contenu FR · RIFAP, Initiateur, N1 et Découverte approfondis (1.5)
   Complète les cours existants sans les réordonner. Gestes de secours : selon les
   recommandations en vigueur et ta formation (à faire valider par ton moniteur). */
(function () {
  "use strict";
  const C = AA.content;

  /* ================= RIFAP ================= */
  C.extend("r-role", {
    essentiel: `
<h3>La chaîne des secours</h3>
<ol><li><b>Protéger</b> : sortir la victime de l’eau sans se mettre en danger, la mettre à l’abri (soleil, vent, mouvement du bateau).</li><li><b>Examiner</b> : conscience, respiration, signes d’accident.</li><li><b>Alerter</b> : faire alerter tôt, avec un message complet.</li><li><b>Secourir</b> : oxygène, position adaptée, réanimation si besoin, surveillance.</li></ol>
<p>Le RIFAP t’apprend à tenir ta place dans cette chaîne <b>jusqu’à l’arrivée des secours</b>.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Au retour d’une plongée, un plongeur se plaint de fourmillements dans la main. Toi : tu l’installes à l’abri, tu préviens le directeur de plongée, tu mets l’oxygène en route pendant que quelqu’un alerte, et tu notes l’heure.</div>`,
    quiz: [
      { q: "Ordre de la chaîne des secours ?", c: ["Alerter, protéger, secourir, examiner", "Protéger, examiner, alerter, secourir", "Secourir, alerter, protéger", "Examiner seulement"], a: 1, e: "On se protège et on protège la victime, on examine, on alerte, on secourt." },
      { q: "Le RIFAP te prépare à agir…", c: ["jusqu’à l’arrivée des secours", "à la place des médecins", "seulement sous l’eau", "après l’hôpital"], a: 0, e: "Tu es le premier maillon : tu tiens jusqu’au relais des secours." }
    ]
  });

  C.extend("r-alerte", {
    essentiel: `
<h3>Le message d’alerte, mot à mot</h3>
<ol><li><b>Qui</b> appelle et d’où (nom du bateau, position, numéro de rappel).</li><li><b>Quoi</b> : accident de plongée, nombre de victimes.</li><li><b>État</b> de chaque victime : consciente ou non, respire ou non, signes.</li><li><b>Gestes faits</b> : oxygène depuis quelle heure.</li><li><b>Paramètres</b> de la plongée : profondeur, durée, paliers, mélange.</li><li>On <b>ne raccroche pas</b> le premier.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple</span>« Ici le bateau Galatée, au mouillage devant la pointe Est, rappel au 06… Un plongeur de 42 ans, conscient, douleur au genou depuis 15 minutes, plongée à 38 m pendant 30 minutes avec paliers. Il est sous oxygène depuis 14 h 20. »</div>`,
    quiz: [
      { q: "Dans le message d’alerte, on donne aussi…", c: ["les paramètres de la plongée", "le prix de la plongée", "la météo de demain", "rien de plus"], a: 0, e: "Profondeur, durée, paliers et mélange aident le médecin." },
      { q: "Qui raccroche en premier ?", c: ["L’appelant", "Les secours", "Peu importe", "Personne ne raccroche"], a: 1, e: "On attend que les secours aient toutes les informations et raccrochent." }
    ]
  });

  C.extend("r-o2", {
    essentiel: `
<h3>Mettre l’oxygène en route, étape par étape</h3>
<ol><li>Vérifier la <b>pression</b> de la bouteille d’oxygène.</li><li>Ouvrir doucement, régler le <b>débit</b> selon le masque (fort débit pour un masque à haute concentration, selon le protocole de ta formation).</li><li>Gonfler le <b>ballon réserve</b> avant de poser le masque.</li><li>Poser le masque, expliquer à la victime, noter <b>l’heure</b>.</li><li>Surveiller la <b>réserve</b> d’oxygène : prévoir le relais.</li></ol>
<div class="callout ex"><span class="eyebrow">Combien de temps ?</span>Une bouteille de 5 L à 200 bar contient environ 1 000 L d’oxygène. À 15 L/min, cela fait environ <b>66 minutes</b>. Moins si la pression de départ est plus basse : on calcule tôt.</div>
<div class="callout trap"><span class="eyebrow">Sécurité</span>Pas de graisse sur le matériel oxygène, pas de flamme ni de cigarette à proximité.</div>`,
    quiz: [
      { q: "Une bouteille d’O₂ de 5 L à 150 bar, débit 15 L/min. Autonomie environ ?", c: ["≈ 25 min", "≈ 50 min", "≈ 100 min", "≈ 10 min"], a: 1, e: "5 × 150 = 750 L. 750 ÷ 15 = 50 min." },
      { q: "Avant de poser le masque à haute concentration, on…", c: ["gonfle le ballon réserve", "coupe l’oxygène", "graisse le détendeur", "attend 10 minutes"], a: 0, e: "Le ballon doit être plein pour que la victime respire de l’oxygène pur dès le début." },
      { q: "Pourquoi noter l’heure de mise sous oxygène ?", c: ["Pour les secours et le médecin", "Pour la facture", "Par habitude", "Ce n’est pas utile"], a: 0, e: "La durée d’oxygénothérapie guide la suite de la prise en charge." }
    ]
  });

  C.extend("r-vict", {
    essentiel: `
<h3>Le bilan en 4 questions</h3>
<ol><li>Répond-elle ? (conscience)</li><li>Respire-t-elle normalement ? (regarder, écouter, sentir, 10 secondes)</li><li>Saigne-t-elle ?</li><li>Que s’est-il passé ? (plongée, symptômes, heure)</li></ol>
<div class="tbl"><table><tr><th>État</th><th>Conduite (selon ta formation)</th></tr>
<tr><td>Consciente</td><td>Position confortable (souvent allongée), oxygène, eau si elle peut boire, surveillance.</td></tr>
<tr><td>Inconsciente qui respire</td><td>Position latérale de sécurité (PLS), oxygène, surveillance de la respiration.</td></tr>
<tr><td>Inconsciente qui ne respire pas</td><td>Alerte, réanimation cardio-pulmonaire (compressions et insufflations), défibrillateur dès qu’il arrive.</td></tr></table></div>
<p>Après une noyade, la réanimation commence souvent par des <b>insufflations</b> : le manque d’oxygène est la cause. Suis le protocole appris en formation.</p>`,
    quiz: [
      { q: "Victime inconsciente qui respire. Position ?", c: ["Assise", "Latérale de sécurité (PLS)", "Debout", "Sur le ventre, tête dans l’eau"], a: 1, e: "La PLS garde les voies aériennes libres." },
      { q: "Pour vérifier la respiration, on regarde, écoute et sent pendant…", c: ["2 secondes", "10 secondes environ", "1 minute", "5 minutes"], a: 1, e: "Une dizaine de secondes suffit pour décider." },
      { q: "Victime inconsciente qui ne respire pas : on…", c: ["attend les secours sans rien faire", "alerte et commence la réanimation", "lui donne à boire", "la met en PLS"], a: 1, e: "Sans respiration, chaque minute compte : alerte et RCP, défibrillateur dès que possible." }
    ]
  });

  C.module({
    id: "r-cas", world: "rifap", depth: "Récif 5", icon: "heart",
    title: "Cas pratiques",
    sub: "Trois situations, les bons réflexes",
    essentiel: `
<p>Le RIFAP s’évalue en <b>situation</b>. Voici trois cas pour t’entraîner à enchaîner les gestes.</p>
<h3>Cas 1 · Douleur après la plongée</h3>
<p>Trente minutes après une plongée à 35 m, Lina se plaint d’une douleur à l’épaule qui augmente. <b>Réflexes</b> : penser ADD, l’allonger à l’abri, oxygène, faire boire de l’eau, alerter, noter l’heure et les paramètres, surveiller.</p>
<h3>Cas 2 · Plongeur sorti inconscient</h3>
<p>Un plongeur est remonté inconscient. <b>Réflexes</b> : le sortir de l’eau, bilan (respire-t-il ?), alerte immédiate, PLS et oxygène s’il respire, réanimation sinon, défibrillateur.</p>
<h3>Cas 3 · Malaise sur le bateau</h3>
<p>Avant même la plongée, un plongeur est pâle et nauséeux (mal de mer ?). <b>Réflexes</b> : il ne plonge pas, on l’installe à l’air, on surveille ; si des signes apparaissent après une plongée, on pense d’abord à un accident de plongée.</p>
<div class="callout trap"><span class="eyebrow">Règle d’or</span>Tout signe anormal après une plongée est un <b>accident de plongée jusqu’à preuve du contraire</b>.</div>`,
    memo: [["Après plongée", "Tout signe = accident de plongée jusqu’à preuve du contraire."], ["Inconscient", "Bilan, alerte, PLS ou RCP, oxygène."], ["Douleur", "Penser ADD : oxygène, eau, alerte."]],
    quiz: [
      { q: "Une douleur au genou 40 min après une plongée profonde. Premier réflexe ?", c: ["Un antidouleur et on oublie", "Penser ADD : oxygène et alerte", "Un massage", "Une nouvelle plongée"], a: 1, e: "Tout signe après plongée est un accident jusqu’à preuve du contraire." },
      { q: "Un plongeur malade avant la plongée…", c: ["plonge quand même", "ne plonge pas", "plonge plus profond", "plonge seul"], a: 1, e: "On ne plonge pas malade : le risque augmente pour lui et pour la palanquée." },
      { q: "Un plongeur remonté inconscient respire. On…", c: ["le met en PLS sous oxygène et on alerte", "le fait asseoir", "attend qu’il se réveille", "lui fait boire de l’eau"], a: 0, e: "PLS, oxygène, alerte et surveillance de la respiration." },
      { q: "Pourquoi noter l’heure des premiers signes ?", c: ["Elle aide les médecins à décider du traitement", "Pour le carnet de plongée", "Pour l’assurance seulement", "Ce n’est pas utile"], a: 0, e: "L’évolution dans le temps est une information médicale importante." },
      { q: "Une victime consciente d’ADD peut boire…", c: ["de l’eau plate, si elle n’a pas de troubles", "de l’alcool", "du café fort", "rien du tout, jamais"], a: 0, e: "L’hydratation aide, si la victime est consciente et peut avaler (selon le protocole)." },
      { q: "Le défibrillateur se pose…", c: ["dès qu’il arrive, sur une victime qui ne respire pas", "jamais en plongée", "seulement à l’hôpital", "sur une victime consciente"], a: 0, e: "Le défibrillateur guide les gestes : on l’utilise dès que possible en cas d’arrêt." }
    ]
  });

  /* ================= Initiateur ================= */
  C.extend("e2-role", {
    essentiel: `
<h3>L’initiateur au quotidien</h3>
<p>En piscine, il fait découvrir les premiers gestes (vidage de masque, lâcher-reprise du détendeur, palmage). En milieu protégé (0-6 m), il fait vivre les premières plongées des débutants et les baptêmes, <b>sous l’autorité d’un moniteur</b> qui organise.</p>
<div class="callout ex"><span class="eyebrow">Une matinée type</span>Préparer le matériel des élèves, briefing à terre, deux élèves maximum dans l’eau avec lui, exercices simples, retour, débriefing, carnet rempli.</div>`,
    quiz: [
      { q: "L’initiateur enseigne sous l’autorité…", c: ["d’un moniteur", "de personne", "du pilote du bateau", "de ses élèves"], a: 0, e: "Il fait partie d’une équipe pédagogique dirigée par un moniteur." }
    ]
  });

  C.extend("e2-peda", {
    essentiel: `
<h3>La démonstration réussie</h3>
<ol><li>Se placer <b>face à l’élève</b>, à sa hauteur.</li><li>Faire le geste <b>lentement</b>, en entier, une première fois.</li><li>Le refaire en <b>décomposant</b> les étapes clés.</li><li>Laisser l’élève essayer, puis corriger <b>une chose</b>.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple</span>Vidage de masque : expiration par le nez, main en haut du masque, regard vers le haut. L’initiateur montre d’abord le geste entier, puis insiste sur « souffler par le nez ».</div>`,
    quiz: [
      { q: "Pour démontrer un geste, on le fait…", c: ["vite, pour gagner du temps", "lentement, en entier, puis décomposé", "une seule fois", "dos à l’élève"], a: 1, e: "Lentement puis décomposé : l’élève voit et retient." }
    ]
  });

  C.extend("e2-seance", {
    essentiel: `
<h3>Fiche de séance (modèle)</h3>
<div class="tbl"><table><tr><th>Rubrique</th><th>Exemple</th></tr>
<tr><td>Public</td><td>2 débutants adultes, 3ᵉ séance piscine</td></tr>
<tr><td>Objectif</td><td>Lâcher-reprise du détendeur à 3 m, calme, 3 fois</td></tr>
<tr><td>Matériel</td><td>Blocs, gilets, lests vérifiés</td></tr>
<tr><td>Déroulé</td><td>Rappel (5 min), démonstration, essais, jeu de fin</td></tr>
<tr><td>Sécurité</td><td>Élèves à portée de main, signes rappelés</td></tr>
<tr><td>Bilan</td><td>Réussi / à revoir, prochaine étape</td></tr></table></div>`,
    quiz: [
      { q: "Une fiche de séance indique d’abord…", c: ["le public et l’objectif", "la couleur des blocs", "le prix", "le nom de la piscine"], a: 0, e: "On adapte toute la séance au public et à un objectif clair." }
    ]
  });

  C.extend("e2-secu", {
    essentiel: `
<h3>Les incidents fréquents en baptême</h3>
<ul><li><b>Oreilles</b> : l’enfant ou l’adulte n’arrive pas à équilibrer → on remonte un peu, on recommence doucement, on n’insiste pas.</li><li><b>Panique</b> : regard affolé, veut remonter → contact, calme, on remonte lentement en contrôlant l’expiration.</li><li><b>Froid</b> : on écourte.</li></ul>`,
    quiz: [
      { q: "Un baptisé panique et veut remonter. Tu…", c: ["le laisses monter seul", "gardes le contact et remontes lentement avec lui en contrôlant son expiration", "le tiens au fond", "lui retires son détendeur"], a: 1, e: "Contrôle, calme et remontée lente : on évite la surpression pulmonaire." }
    ]
  });

  C.extend("e2-com", {
    essentiel: `
<h3>Motiver sans mettre la pression</h3>
<p>Fixer des étapes <b>atteignables</b>, valoriser chaque progrès, adapter le rythme. Un élève qui échoue a besoin d’une étape plus petite, pas d’un discours.</p>`,
    quiz: [
      { q: "Un élève échoue trois fois au même exercice. Tu…", c: ["le fais recommencer encore", "proposes une étape plus petite", "abandonnes", "le grondes"], a: 1, e: "On découpe la difficulté pour retrouver la réussite." }
    ]
  });

  C.module({
    id: "e1-piscine", world: "e1", depth: "Île 6", icon: "wave",
    title: "Enseigner en piscine",
    sub: "Les premiers gestes, dans l’ordre",
    essentiel: `
<p>La piscine est l’endroit idéal pour apprendre : eau claire, chaude, peu profonde. Voici une progression classique (à adapter).</p>
<ol><li><b>Respirer</b> sur le détendeur, debout puis à genoux.</li><li><b>Vider le masque</b> partiellement puis totalement.</li><li><b>Lâcher et reprendre</b> le détendeur.</li><li><b>Palmer</b> efficacement, en surface puis immergé.</li><li><b>Équilibrer</b> ses oreilles en descendant au fond du bassin.</li><li><b>Se stabiliser</b> avec le gilet.</li><li><b>Signes</b> et réactions : « ça ne va pas », « plus d’air ».</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple de jeu</span>Le « relais du lest » : les élèves se passent un petit lest au fond, en restant stabilisés. Ils travaillent la flottabilité sans s’en rendre compte.</div>
<h3>Sécurité en piscine</h3>
<p>Même à 4 m, on <b>surveille</b> en continu : pas de remontée poumons pleins, pas d’apnée prolongée en fin de séance, matériel vérifié.</p>`,
    memo: [["Progression", "Respirer, masque, détendeur, palmes, oreilles, gilet, signes."], ["Jeu", "Apprendre sans s’en rendre compte."], ["Sécurité", "Surveillance continue, même à 4 m."]],
    quiz: [
      { q: "Premier exercice classique en piscine ?", c: ["Respirer sur le détendeur", "Descendre à 6 m", "Vider le masque en remontant", "Remonter sans détendeur"], a: 0, e: "On commence par le geste de base : respirer calmement sous l’eau." },
      { q: "Pourquoi utiliser des jeux ?", c: ["Pour apprendre sans stress", "Pour perdre du temps", "Pour remplacer la sécurité", "Sans raison"], a: 0, e: "Le jeu détend et fait travailler les gestes." },
      { q: "Même à 4 m de profondeur, le risque de surpression pulmonaire…", c: ["existe si l’élève remonte poumons bloqués", "n’existe pas", "n’existe qu’en mer", "dépend de l’eau chlorée"], a: 0, e: "Les plus grandes variations de volume sont près de la surface." },
      { q: "Le gilet s’apprend…", c: ["après les gestes de base", "avant de respirer sur le détendeur", "jamais en piscine", "seulement en mer"], a: 0, e: "On construit sur des bases solides : respirer, masque, détendeur." },
      { q: "En fin de séance, on évite…", c: ["les apnées prolongées", "le débriefing", "de ranger le matériel", "de sourire"], a: 0, e: "Fatigue et apnée font un mauvais mélange." },
      { q: "Qui organise la séance de l’initiateur en piscine ?", c: ["Un moniteur responsable", "L’élève", "Le maître-nageur seul", "Personne"], a: 0, e: "L’initiateur agit dans un cadre fixé par un moniteur." }
    ]
  });

  /* ================= N1 et Découverte ================= */
  C.extend("n1-physique", {
    essentiel: `
<h3>Pourquoi les oreilles font mal en descendant</h3>
<p>Le tympan est une petite membrane. Dehors, l’eau pousse de plus en plus fort ; dedans, l’air de l’oreille reste à la pression de départ. Le tympan est poussé vers l’intérieur : ça fait mal. En <b>équilibrant</b> (Valsalva, déglutition), tu envoies de l’air derrière le tympan pour égaliser.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Entre la surface et 10 m, la pression double (1 → 2 bar). Entre 30 et 40 m, elle passe de 4 à 5 bar (+25 %). C’est pour ça que <b>les premiers mètres</b> demandent le plus d’équilibrages.</div>`,
    quiz: [
      { q: "Où la pression change-t-elle le plus, en proportion ?", c: ["Près de la surface", "Vers 40 m", "Partout pareil", "Au fond seulement"], a: 0, e: "De 0 à 10 m, elle double : on équilibre souvent dès le début." }
    ]
  });
  C.extend("n1-secu", {
    essentiel: `
<h3>Panne d’air : la procédure du N1</h3>
<ol><li>Faire le signe <b>« plus d’air »</b> au guide ou au binôme.</li><li>Prendre la <b>source d’air de secours</b> qu’on te donne.</li><li>Remonter <b>ensemble</b>, lentement, en se tenant.</li></ol>
<p>C’est pour ça qu’on surveille son manomètre et qu’on annonce sa pression quand le guide la demande.</p>`,
    quiz: [
      { q: "Tu n’as presque plus d’air. Premier geste ?", c: ["Remonter seul très vite", "Faire le signe « plus d’air » au guide", "Retenir ta respiration", "Lâcher ton lest"], a: 1, e: "On prévient : le guide te donne de l’air et vous remontez ensemble." }
    ]
  });
  C.extend("d-bapteme", {
    essentiel: `
<h3>Les 3 réflexes à retenir avant ton baptême</h3>
<ol><li><b>Respire normalement</b> : ne retiens jamais ta respiration.</li><li><b>Équilibre tes oreilles</b> souvent, avant d’avoir mal.</li><li><b>Fais un signe</b> au moniteur dès que quelque chose ne va pas.</li></ol>`,
    quiz: [
      { q: "Pendant un baptême, tu dois…", c: ["retenir ta respiration pour économiser l’air", "respirer normalement", "descendre vite", "ne rien dire si tu as mal"], a: 1, e: "On ne bloque jamais sa respiration sous l’eau." }
    ]
  });

  /* Calcul en plus : autonomie d'une bouteille d'oxygène (RIFAP). */
  const u = AA.u, G = AA.game, PK = u.pick, N = u.num, M = (...a) => G.mkCalc(...a);
  C.addGenerators({
    ro2: { m: "r-o2", make: () => { const V = PK([2, 3, 5, 15]), P = PK([120, 150, 180, 200]), d = PK([9, 12, 15]); const t = Math.floor(V * P / d);
      return M(`Bouteille d’oxygène de ${V} L à ${P} bar, débit ${d} L/min. Autonomie environ ?`, t, [Math.floor(V * P / 10), Math.floor(P / d), t * 2], ` min`, `Oxygène disponible = ${V} × ${P} = ${V * P} L. ÷ ${d} L/min ≈ ${t} min. (En pratique on garde une petite réserve.)`, 0); } }
  });
  C.byId["r-o2"].gen = (C.byId["r-o2"].gen || []).concat("ro2");
})();
