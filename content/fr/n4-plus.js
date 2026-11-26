/* =====================================================================
   Abysse Academy 2.3 · N4 (guide de palanquée) complet
   Six thèmes ajoutés : physique N4, accidents (mécanismes), modèles de
   décompression, matériel en profondeur, responsabilités, milieu
   (météo, marées, courants). Cours existants complétés, 16 questions par
   thème, notions du tuteur. Aucune valeur de table recopiée ; points
   réglementaires à faire valider par ton moniteur.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content, D = C.dgb || {};
  const VAL = `<div class="callout trap"><span class="eyebrow">À faire valider</span>`;

  if (D.flow) C.addDiagrams({
    "n4-maree": () => D.flow([["1re heure", "1/12 du marnage : l’eau bouge peu."], ["2e heure", "2/12 : le courant s’installe."], ["3e heure", "3/12 : courant le plus fort."], ["4e heure", "3/12 : toujours fort."], ["5e heure", "2/12 : il faiblit."], ["6e heure", "1/12 : étale, le meilleur moment pour plonger."]], "Règle des douzièmes : la mer monte (ou descend) de 1, 2, 3, 3, 2, 1 douzièmes du marnage, heure par heure."),
    "n4-acc": () => D.flow([["Mécanique", "Barotraumatismes : écart de pression avec une cavité d’air (oreille, sinus, poumon)."], ["Biochimique", "Toxicité des gaz : narcose (N₂), hyperoxie (O₂), essoufflement (CO₂), CO."], ["Biophysique", "ADD : bulles d’azote à la décompression."], ["Environnement", "Froid, noyade, faune, courant, fatigue."], ["Pour le guide", "Prévenir, reconnaître, agir, rendre compte."]], "Classer les accidents pour mieux les prévenir : quatre familles et le rôle du guide."),
    "n4-modele": () => D.cycle(["Charge (descente)", "Saturation", "Désaturation (remontée)", "Sursaturation tolérée"], "Tension d’azote dans chaque compartiment", "Le modèle de Haldane : chaque compartiment se charge et se décharge à sa propre vitesse ; on remonte sans dépasser la sursaturation tolérée."),
    "n4-det": () => D.flow([["Bloc", "Haute pression : jusqu’à 200-230 bar."], ["1er étage", "Détente vers une moyenne pression stable (≈ 8-10 bar au-dessus de l’ambiante)."], ["Flexibles MP", "Vers 2e étages, direct system, octopus."], ["2e étage", "Clapet aval : s’ouvre à l’inspiration, livre l’air à la pression ambiante."], ["Sécurité", "Si la MP monte trop, le 2e étage fuit (débit continu) au lieu de bloquer."]], "Le chemin de l’air dans un détendeur, du bloc à ta bouche."),
    "n4-resp": () => D.cycle(["Prévenir", "Respecter le cadre", "Porter secours", "Rendre compte"], "Obligation de sécurité du guide", "La responsabilité du guide : agir avec prudence, dans le cadre fixé par le DP et la réglementation."),
    "n4-phys": () => D.bubbles("En descendant, tout volume d’air diminue (gilet, poumons, néoprène) ; en remontant, il augmente. Le guide gère la flottabilité de toute la palanquée, la sienne et celle d’un plongeur en difficulté.", "volume au fond", "volume en remontant")
  });

  C.module({
    id: "n4-physique", world: "n4", depth: "−40 m", icon: "scale",
    title: "Physique du guide",
    sub: "Calculs de l’examen, flottabilité, optique",
    diagram: "n4-phys",
    essentiel: `
<p>À l’examen de guide de palanquée, la physique est notée avec des <b>problèmes en plusieurs étapes</b>. Les lois sont celles du N3 ; ce qui change, c’est la rigueur et les pièges.</p>
<h3>Méthode en 5 étapes</h3>
<ol><li>Faire un <b>schéma</b> : surface, fond, ce qui bouge.</li><li>Noter les <b>données</b> avec leurs unités (bar, L, kg).</li><li>Choisir la <b>loi</b> : Archimède, Mariotte, Dalton, Charles.</li><li>Calculer <b>étape par étape</b>, en pression absolue.</li><li>Vérifier que le résultat est <b>vraisemblable</b> et répondre à la question posée.</li></ol>
<h3>Mariotte au service du guide</h3>
<div class="callout ex"><span class="eyebrow">Exemple</span>Un plongeur gonfle son gilet de 4 L à 35 m puis remonte sans purger jusqu’à 10 m. P abs : 4,5 bar → 2 bar. Volume : 4 × 4,5 ÷ 2 = <b>9 L</b>, soit 5 L de poussée en plus : remontée incontrôlée si personne ne purge.</div>
<h3>Archimède et relevage</h3>
<div class="callout ex"><span class="eyebrow">Exemple</span>Moteur de 80 kg, volume 20 L, à 25 m en mer. Poids apparent = 80 − 20 × 1,03 = 59,4 kg → ≈ 60 L d’air au fond. À 3,5 bar, cela fait 210 L détendus : ≈ 14 bar dans un 15 L.</div>
<h3>Dalton et le mélange</h3>
<p>La profondeur maximale d’un mélange se calcule à partir de la Pp O₂ limite : P abs max = Pp O₂ max ÷ fraction d’O₂. La profondeur équivalente air (EAD) compare la Pp N₂ d’un nitrox à celle de l’air.</p>
<h3>Optique</h3>
<p>La lumière change de milieu en passant de l’eau à l’air du masque : elle est <b>réfractée</b> (indice de l’eau ≈ 1,33). Résultat : objets plus proches (≈ ¾) et plus gros (≈ 4/3), <b>champ de vision réduit</b>. L’eau absorbe aussi la lumière : couleurs perdues, visibilité réduite par les particules (turbidité).</p>`,
    approfondir: `
<h3>Les pièges classiques</h3>
<ul><li>Utiliser la pression <b>relative</b> au lieu de l’absolue.</li>
<li>Oublier la <b>densité</b> de l’eau de mer (1,03).</li>
<li>Calculer Charles en <b>°C</b> au lieu de kelvins (K = °C + 273).</li>
<li>Répondre en litres « fond » quand la question demande des bar consommés au bloc.</li></ul>
<h3>Le gaz réel</h3>
<p>Au-delà de 200 bar, l’air ne suit plus parfaitement Mariotte : un bloc à 300 bar contient un peu moins que « 1,5 fois » un bloc à 200 bar. À l’examen, on calcule en gaz parfait sauf indication contraire.</p>`,
    memo: [["Méthode", "Schéma, données, loi, calcul en P abs, vérification."], ["Gilet", "Volume × P abs fond ÷ P abs arrivée."], ["Relevage", "Poids apparent → L au fond → × P abs → ÷ volume bloc."], ["MOD", "P abs max = Pp O₂ max ÷ fraction d’O₂."], ["Optique", "Réfraction : ¾ de la distance, 4/3 de la taille, champ réduit."], ["Pièges", "Relative au lieu d’absolue, densité 1,03, Celsius au lieu de kelvins."]],
    moniteur: ["Peux-tu me donner des annales de physique de l’examen GP ?", "Quel niveau de détail attend le jury dans la rédaction d’un calcul ?"],
    quiz: [
      { q: "4 L d’air dans un gilet à 35 m. Volume à 10 m sans purger ?", c: ["9 L", "14 L", "8 L", "4,5 L"], a: 0, e: "4,5 bar → 2 bar : 4 × 4,5 ÷ 2 = 9 L. Le piège : faire le rapport des profondeurs (35/10)." },
      { q: "Objet de 80 kg, 20 L, en mer. Air à mettre au fond pour l’équilibrer ?", c: ["≈ 60 L", "≈ 80 L", "≈ 20 L", "≈ 100 L"], a: 0, e: "Poids apparent = 80 − 20 × 1,03 = 59,4 kg → ≈ 60 L d’air au fond." },
      { q: "60 L d’air au fond à 25 m. Litres détendus pris au bloc ?", c: ["150 L", "210 L", "60 L", "250 L"], a: 1, e: "P abs = 3,5 bar : 60 × 3,5 = 210 L. Avec 2,5 (pression relative), on trouve 150 L : le piège." },
      { q: "Bloc gonflé à 230 bar à 47 °C. À 17 °C, il affiche environ…", c: ["≈ 85 bar", "≈ 208 bar", "≈ 230 bar", "≈ 252 bar"], a: 1, e: "230 × (17 + 273) ÷ (47 + 273) = 230 × 290 ÷ 320 ≈ 208 bar. En °C on trouverait 85 bar : absurde." },
      { q: "MOD d’un nitrox 32 % avec une Pp O₂ max de 1,4 bar ?", c: ["≈ 33 m", "≈ 40 m", "≈ 34 m", "≈ 44 m"], a: 0, e: "1,4 ÷ 0,32 = 4,375 bar absolu → 33,75 m, arrondi vers le bas : 33 m. À 1,6 bar on trouverait 40 m." },
      { q: "Indice de réfraction de l’eau, environ ?", c: ["1", "1,33", "1,03", "4"], a: 1, e: "C’est lui qui explique les ¾ et 4/3. 1,03, c’est la densité de l’eau de mer : ne pas confondre." },
      { q: "Pourquoi le champ de vision est-il réduit avec un masque ?", c: ["La vitre est trop épaisse", "La réfraction et la jupe du masque", "L’eau absorbe les couleurs", "Le froid contracte l’œil"], a: 1, e: "La réfraction resserre le champ, la jupe cache les côtés : le guide se tourne souvent pour voir ses plongeurs." },
      { q: "Un plongeur de 85 kg équipé, volume 88 L, en mer. Sans lest, il est…", c: ["négatif de 5,6 kg", "positif d’environ 5,6 kg", "équilibré", "positif de 3 kg"], a: 1, e: "Poussée = 88 × 1,03 = 90,6 kg > 85 kg : il flotte avec ≈ 5,6 kg de poussée en trop, à compenser par du lest." },
      { q: "Erreur classique dans un calcul de Mariotte ?", c: ["Utiliser la pression relative", "Utiliser des litres et non des m³", "Faire un schéma avant de calculer", "Arrondir seulement à la fin"], a: 0, e: "Mariotte se calcule toujours en pression absolue." },
      { q: "Un parachute de 30 L rempli à 20 m, fermé en bas, remonte. Volume théorique en surface ?", c: ["60 L", "90 L", "30 L", "120 L"], a: 1, e: "3 bar → 1 bar : 30 × 3 = 90 L. Fermé, il ne peut pas purger : il éclate ou s’emballe." },
      { q: "À 40 m, un plongeur consomme 25 L/min en surface. Bloc 15 L : combien de bar par minute ?", c: ["≈ 8,3 bar/min", "≈ 6,7 bar/min", "≈ 1,7 bar/min", "≈ 10 bar/min"], a: 0, e: "25 × 5 = 125 L/min ; ÷ 15 ≈ 8,3 bar/min." },
      { q: "La conversion de 20 °C en kelvins donne…", c: ["253 K", "293 K", "273 K", "313 K"], a: 1, e: "K = °C + 273." },
      { q: "Un bloc 300 bar contient-il exactement 1,5 fois l’air d’un 200 bar ?", c: ["Oui, Mariotte s’applique parfaitement", "Non, un peu moins : l’air n’est plus un gaz parfait", "Non, un peu plus : l’air se comprime mieux", "Oui, si la température reste stable"], a: 1, e: "À très haute pression, les molécules se gênent : le gaz est moins compressible que prévu. À l’examen, on reste en gaz parfait." },
      { q: "EAD : on compare…", c: ["la Pp O₂ du nitrox à celle de l’air", "la Pp N₂ du nitrox à celle de l’air", "le volume des deux blocs", "la densité des deux mélanges"], a: 1, e: "Profondeur à laquelle l’air donnerait la même Pp N₂ : elle sert à lire une table air." },
      { q: "Pour un problème en plusieurs étapes, la bonne pratique ?", c: ["Arrondir à chaque étape, au nombre entier", "Garder les valeurs exactes et arrondir à la fin, du côté prudent", "Arrondir au plus proche pour simplifier les calculs", "Ne donner que le résultat, sans les étapes"], a: 1, e: "Arrondir trop tôt cumule les erreurs. Et le jury veut voir la méthode." },
      { q: "Moteur de 80 kg relevé : à mi-remontée, que fait le guide ?", c: ["Il accélère pour finir la remontée", "Il s’écarte et contrôle la purge du parachute", "Il se met dessous pour guider la charge", "Il gonfle encore pour garder la vitesse"], a: 1, e: "L’air se dilate : le relevage accélère. On reste à côté, prêt à purger ou à lâcher." }
    ]
  });

  C.module({
    id: "n4-accidents", world: "n4", depth: "−35 m", icon: "cross",
    title: "Accidents : mécanismes",
    sub: "Comprendre pour prévenir et réagir",
    diagram: "n4-acc",
    essentiel: `
<p>Le guide doit <b>expliquer</b> les accidents, pas seulement les citer : le jury attend le mécanisme, les signes, la conduite à tenir et la prévention.</p>
<h3>Barotraumatismes (mécaniques)</h3>
<p>Cavité d’air + variation de pression + communication insuffisante = lésion. Oreille moyenne à la descente, surpression pulmonaire à la remontée, oreille interne au Valsalva forcé. <b>Prévention</b> : équilibrer tôt, ne jamais forcer, expirer à la remontée, remontée contrôlée.</p>
<h3>Toxicité des gaz (biochimiques)</h3>
<ul><li><b>Narcose</b> : azote sous forte Pp, effet anesthésiant. Variable, aggravée par froid, CO₂, fatigue. On remonte de quelques mètres.</li>
<li><b>Hyperoxie</b> : Pp O₂ trop forte. Neurologique (convulsions) ; pulmonaire sur longue durée.</li>
<li><b>Essoufflement</b> : hypercapnie (CO₂ en excès) par effort, air dense, détendeur dur, stress. Cercle vicieux : respiration rapide et superficielle qui élimine mal le CO₂.</li>
<li><b>Monoxyde de carbone</b> : air pollué au gonflage. Il se fixe sur l’hémoglobine à la place de l’O₂.</li></ul>
<h3>ADD (biophysique)</h3>
<p>Les tissus se chargent en azote au fond (Henry). À la remontée, si la sursaturation dépasse ce qui est toléré, des <b>bulles</b> se forment : elles compriment, bouchent des vaisseaux et déclenchent une réaction inflammatoire. Formes : ostéo-articulaire, cutanée, neurologique (médullaire, cérébrale), vestibulaire, pulmonaire. Facteurs : profil, effort, froid, déshydratation, fatigue, âge, surpoids, foramen ovale perméable, yo-yo, remontée rapide.</p>
<h3>Accidents liés au milieu</h3>
<p>Hypothermie, noyade (inhalation d’eau, souvent après une perte de connaissance ou une panique), faune (piqûres, morsures), courant, malaise.</p>
<h3>La conduite du guide</h3>
<p>Sous l’eau : <b>stopper, rassurer, contrôler, remonter</b> si besoin, en gérant toute la palanquée. En surface : flottabilité, signe de détresse, sortie, puis gestes RIFAP (oxygène, alerte, surveillance) et compte rendu au DP.</p>`,
    approfondir: `
<h3>Pourquoi l’ADD neurologique est-il souvent médullaire ?</h3>
<p>La moelle épinière est entourée d’un réseau de veines lent (plexus) où les bulles s’accumulent et gênent l’évacuation du sang : d’où des signes aux jambes, aux sphincters, une faiblesse. C’est une urgence absolue.</p>
<h3>Bulles « silencieuses »</h3>
<p>Après une plongée normale, on détecte souvent des petites bulles dans le sang veineux, sans aucun signe : les poumons les filtrent. Le danger vient quand elles sont nombreuses ou qu’elles passent côté artériel (foramen ovale, surpression).</p>
<h3>Noyade</h3>
<p>L’eau inhalée empêche les échanges gazeux : manque d’oxygène. Une victime « sauvée » peut se dégrader plusieurs heures après : toute noyade, même légère, est vue par un médecin.</p>`,
    memo: [["4 familles", "Mécaniques, biochimiques, biophysiques, environnement."], ["Essoufflement", "Hypercapnie : effort, air dense, stress → cercle vicieux."], ["ADD", "Sursaturation excessive → bulles → compression, obstruction, inflammation."], ["Médullaire", "Jambes, sphincters, faiblesse : urgence absolue."], ["Noyade", "Toujours un avis médical, même si ça va."], ["Guide", "Stopper, rassurer, contrôler, remonter, puis RIFAP et DP."]],
    moniteur: ["Quel plan attend le jury pour une question d’accident (mécanisme, signes, CAT, prévention) ?", "Quels cas d’accident a-t-on vécus au club et qu’en a-t-on appris ?"],
    quiz: [
      { q: "L’essoufflement est d’abord un excès de…", c: ["azote", "CO₂ (hypercapnie)", "oxygène", "monoxyde de carbone"], a: 1, e: "Le CO₂ s’accumule : la respiration s’accélère et devient superficielle, ce qui l’élimine encore moins bien." },
      { q: "Pourquoi l’essoufflement s’entretient-il seul ?", c: ["L’azote dissous augmente avec l’effort", "Une respiration rapide ventile surtout l’espace mort", "Le détendeur débite moins quand on force", "L’oxygène devient toxique avec l’effort"], a: 1, e: "L’air reste dans les voies et le tuyau : le CO₂ s’élimine mal, l’envie de respirer augmente. On casse le cycle par l’arrêt de l’effort et l’expiration longue." },
      { q: "Le monoxyde de carbone est dangereux parce qu’il…", c: ["provoque une narcose comme l’azote", "prend la place de l’O₂ sur l’hémoglobine", "forme des bulles dans le sang veineux", "bloque l’élimination de l’azote"], a: 1, e: "Il se fixe bien plus fort que l’oxygène : le sang ne transporte plus assez d’O₂, et la pression l’aggrave." },
      { q: "Signes aux jambes et troubles urinaires après plongée. Forme d’ADD ?", c: ["Cutanée", "Médullaire (neurologique)", "Ostéo-articulaire", "Vestibulaire"], a: 1, e: "La moelle épinière est touchée : urgence absolue, oxygène et évacuation vers un caisson." },
      { q: "Les « bulles silencieuses », ce sont…", c: ["des bulles artérielles sans gravité, éliminées seules", "des bulles veineuses fréquentes, sans signe, filtrées par les poumons", "des bulles qui apparaissent seulement après les paliers", "des bulles qui se forment dans le détendeur en eau froide"], a: 1, e: "Elles existent après beaucoup de plongées normales. Le risque vient de leur nombre ou de leur passage côté artériel." },
      { q: "Lequel n’est PAS un facteur favorisant l’ADD ?", c: ["La déshydratation", "Un effort après la plongée", "Une remontée lente avec palier", "Le froid"], a: 2, e: "La remontée lente et le palier sont justement ce qui protège." },
      { q: "Une victime de noyade va bien en sortant de l’eau. Que fait le guide ?", c: ["Rien de plus, elle a bien récupéré", "Il demande un avis médical : elle peut se dégrader plus tard", "Il la met au repos et la laisse rentrer chez elle", "Il lui donne à boire et la réchauffe, c’est tout"], a: 1, e: "L’eau dans les poumons peut provoquer une détresse respiratoire retardée." },
      { q: "Les accidents « biochimiques » regroupent…", c: ["les barotraumatismes", "les toxicités des gaz", "les ADD", "les piqûres"], a: 1, e: "Narcose, hyperoxie, hypercapnie, CO : c’est la chimie des gaz sous pression qui pose problème." },
      { q: "À 38 m, un plongeur encadré ne répond plus et fixe le fond. Le guide…", c: ["attend qu’il se reprenne en restant à côté de lui", "le prend, remonte la palanquée de quelques mètres et observe", "le remonte seul en surface sans délai, en laissant la palanquée", "lui donne son octopus et continue la plongée"], a: 1, e: "Narcose probable : on remonte un peu, toute la palanquée, et on évalue. Si ça ne passe pas : fin de plongée." },
      { q: "Pour répondre à une question d’accident à l’examen, le plan attendu ?", c: ["Signes, puis conduite à tenir", "Mécanisme, signes, conduite à tenir, prévention", "Facteurs favorisants et un exemple vécu", "Définition, causes et liste des facteurs"], a: 1, e: "Comprendre le mécanisme permet de déduire signes, CAT et prévention : c’est ce que le jury vérifie." },
      { q: "L’hyperoxie pulmonaire apparaît plutôt…", c: ["avec une Pp O₂ très forte et brève", "avec une Pp O₂ modérée mais longtemps", "à faible profondeur à l’air", "avec la narcose"], a: 1, e: "Effet Lorrain Smith : oxygénothérapie longue, plongées techniques. L’effet neurologique, lui, est rapide et à forte Pp." },
      { q: "Un foramen ovale perméable augmente le risque d’ADD…", c: ["ostéo-articulaire", "neurologique", "cutané", "vestibulaire seulement"], a: 1, e: "Les bulles veineuses peuvent passer dans les artères vers le cerveau ou la moelle." },
      { q: "En surface avec une victime, la priorité du guide ?", c: ["Lui retirer son masque", "Assurer la flottabilité et signaler la détresse", "Ramener tout de suite les autres plongeurs", "Lui faire deux insufflations"], a: 1, e: "Victime et sauveteur flottent, le bateau est alerté ; ensuite tractage, sortie, RIFAP." },
      { q: "Prévenir l’essoufflement dans la palanquée, c’est surtout…", c: ["descendre vite pour profiter du fond", "éviter l’effort, le courant de face et le stress", "gonfler un peu les gilets pour moins palmer", "prendre des blocs plus gros pour la marge"], a: 1, e: "Le guide adapte le rythme, s’abrite du courant et surveille la respiration de chacun." },
      { q: "Le barotraumatisme d’oreille interne se distingue par…", c: ["une simple douleur à la descente", "vertiges, acouphènes, baisse d’audition", "des marbrures de la peau", "des crachats sanglants"], a: 1, e: "Signes proches d’un ADD vestibulaire : dans le doute, oxygène et avis médical." },
      { q: "Après un incident, le guide rend compte au DP…", c: ["seulement s’il y a eu un blessé", "toujours, même si tout va bien", "le lendemain", "seulement si le plongeur le demande"], a: 1, e: "Le DP doit savoir pour surveiller, adapter la suite et organiser les secours si des signes apparaissent." }
    ]
  });

  C.module({
    id: "n4-modeles", world: "n4", depth: "−45 m", icon: "timer",
    title: "Modèles de décompression",
    sub: "Haldane, compartiments, ordinateurs, bulles",
    diagram: "n4-modele",
    essentiel: `
<p>Tables et ordinateurs reposent sur des <b>modèles</b> du corps humain. Le guide doit savoir ce qu’ils calculent et où sont leurs limites.</p>
<h3>Le modèle de Haldane</h3>
<ul><li>Le corps est découpé en <b>compartiments</b> (tissus théoriques), chacun défini par sa <b>période</b> : le temps pour faire la moitié du chemin vers la saturation.</li>
<li>Chaque compartiment a une <b>tension</b> d’azote. En descente, elle monte vers la Pp N₂ ambiante ; en remontée, elle redescend.</li>
<li>On peut remonter tant que, pour chaque compartiment, le rapport tension / pression ambiante reste sous un <b>coefficient de sursaturation critique</b>. Sinon : palier.</li>
<li>Compartiments courts (périodes brèves) : se chargent et se vident vite, dirigent les plongées courtes et profondes. Compartiments longs : imposent les longs paliers et l’azote résiduel.</li></ul>
<p>Les tables MN90 utilisent ce principe avec 12 compartiments.</p>
<h3>Les ordinateurs</h3>
<p>Ils appliquent un modèle (souvent un Haldane modifié, parfois un modèle à bulles) en temps réel à partir de la profondeur mesurée. Beaucoup permettent de régler la prudence (niveaux, « facteurs de gradient »). Ils ne connaissent ni ton état de fatigue, ni ta déshydratation, ni le froid ressenti.</p>
<h3>Les modèles à bulles</h3>
<p>Ils partent de l’idée que des micro-bulles existent toujours et cherchent à limiter leur croissance : ils ajoutent souvent des <b>paliers plus profonds</b> et courts. Haldane, lui, raisonne sur l’azote dissous.</p>
<h3>Pour la palanquée</h3>
<p>On suit le plus pénalisant, on évite le yo-yo et les profils inversés, on remonte lentement et on garde le palier de sécurité. Un ordinateur respecté n’empêche pas tous les ADD.</p>`,
    approfondir: `
<h3>Les facteurs de gradient</h3>
<p>Ils réduisent la sursaturation autorisée : le premier chiffre (GF bas) fixe la profondeur du premier palier, le second (GF haut) la sursaturation tolérée en surface. Des valeurs plus basses = plus prudent. Exemple : 30/85 est plus prudent que 50/95.</p>
<h3>Pourquoi la table est plus pénalisante qu’un ordinateur</h3>
<p>Elle suppose que tu es resté au maximum pendant toute la durée (profil carré). L’ordinateur intègre chaque mètre réel : un profil en escalier lui donne plus de marge.</p>
${VAL}Les réglages de prudence utilisés au club et la façon de suivre plusieurs ordinateurs se décident avec ton moniteur et le DP.</div>`,
    memo: [["Compartiment", "Tissu théorique défini par sa période."], ["Période", "Temps pour faire la moitié du chemin vers la saturation."], ["Coefficient critique", "Sursaturation maxi tolérée : au-delà, palier."], ["Courts / longs", "Courts : plongées profondes et courtes. Longs : paliers longs, azote résiduel."], ["Modèles à bulles", "Limiter la croissance des micro-bulles : paliers plus profonds."], ["GF", "Plus bas = plus prudent (30/85 < 50/95)."]],
    moniteur: ["Quel réglage de prudence conseilles-tu pour mon ordinateur ?", "Comment le jury pose-t-il les questions sur les modèles ?"],
    quiz: [
      { q: "Dans le modèle de Haldane, un compartiment est défini par…", c: ["sa profondeur maximale", "sa période", "sa température", "sa vascularisation réelle"], a: 1, e: "La période fixe la vitesse de charge et de décharge du tissu théorique." },
      { q: "Combien de compartiments utilisent les tables MN90 ?", c: ["5", "9", "12", "16"], a: 2, e: "12 compartiments. Les modèles d’ordinateurs en ont souvent 16 (Bühlmann)." },
      { q: "La « tension » d’azote d’un compartiment, c’est…", c: ["la pression de l’eau sur le tissu", "la pression de l’azote dissous dans ce tissu", "la quantité d’azote que le tissu peut contenir", "la vitesse à laquelle le tissu se charge"], a: 1, e: "Elle tend vers la Pp N₂ ambiante : elle monte en descente, baisse en remontée." },
      { q: "Le coefficient de sursaturation critique fixe…", c: ["la vitesse de remontée entre les paliers", "jusqu’où on peut remonter sans palier", "la profondeur maxi selon le mélange", "la durée minimale de l’intervalle"], a: 1, e: "Tant que tension / pression ambiante reste sous ce coefficient, on peut remonter ; sinon on s’arrête au palier." },
      { q: "Ce sont surtout les compartiments longs qui…", c: ["imposent les premiers paliers d’une plongée courte et profonde", "imposent les longs paliers et pèsent sur l’azote résiduel", "ne servent jamais", "se vident en quelques minutes"], a: 1, e: "Ils se chargent lentement mais se vident lentement aussi." },
      { q: "Les modèles à bulles ajoutent souvent…", c: ["des paliers plus profonds et courts", "des paliers plus longs à 3 m seulement", "une vitesse de remontée plus rapide", "aucune différence"], a: 0, e: "Ils cherchent à empêcher les micro-bulles de grossir dès le début de la remontée." },
      { q: "Facteurs de gradient : lequel est le plus prudent ?", c: ["50/95", "30/85", "100/100", "70/90"], a: 1, e: "Plus les valeurs sont basses, moins on tolère de sursaturation." },
      { q: "Pourquoi un ordinateur respecté n’empêche-t-il pas tous les ADD ?", c: ["Il est réglé pour des plongeurs moyens", "Il ignore la fatigue, le froid, l’hydratation, le FOP", "Il mesure mal la profondeur en eau froide", "Il ne compte pas les plongées de la veille"], a: 1, e: "Le modèle est une moyenne statistique : chaque corps et chaque jour sont différents." },
      { q: "Pourquoi la table est-elle plus pénalisante qu’un ordinateur ?", c: ["Elle est plus ancienne", "Elle suppose un profil carré au maximum", "Elle ne compte pas la descente", "Elle utilise moins de compartiments"], a: 1, e: "L’ordinateur intègre le profil réel : un profil en escalier lui laisse plus de marge." },
      { q: "Un compartiment de période 10 min : après 20 min au fond, il est chargé à…", c: ["25 %", "50 %", "75 %", "100 %"], a: 2, e: "1 période : 50 %, 2 périodes : 75 %." },
      { q: "Dans la palanquée, les ordinateurs ne sont pas d’accord. Le guide…", c: ["suit le sien, il est responsable", "suit le plus pénalisant pour tous", "fait la moyenne des ordinateurs", "suit le plus récent de la palanquée"], a: 1, e: "La palanquée reste ensemble au palier le plus long." },
      { q: "Le profil inversé (le plus profond en fin de plongée) est déconseillé car…", c: ["il augmente la consommation d’air en fin de plongée", "des bulles déjà formées peuvent grossir à la remontée finale", "il oblige à des paliers plus profonds que prévu", "il empêche l’ordinateur de calculer la désaturation"], a: 1, e: "Les modèles gèrent mal ces profils : on va du plus profond au moins profond." },
      { q: "Le GF bas d’un ordinateur influence surtout…", c: ["la profondeur du premier palier", "la vitesse de descente", "la durée de l’intervalle", "la Pp O₂ maximale"], a: 0, e: "Un GF bas plus faible fait arrêter plus profond ; le GF haut règle la sursaturation tolérée en surface." },
      { q: "Le principe de Haldane repose sur…", c: ["la formation et la croissance des bulles", "la charge et la décharge de l’azote dissous", "la toxicité de l’oxygène sous pression", "la pression partielle de chaque gaz"], a: 1, e: "Haldane raisonne sur le gaz dissous (loi de Henry) ; les modèles à bulles, sur les micro-bulles." },
      { q: "Pour une plongée courte et profonde, quels compartiments dirigent la remontée ?", c: ["Les plus longs", "Les plus courts", "Tous également", "Aucun, il n’y a pas de palier"], a: 1, e: "Ils se sont chargés vite au fond : ce sont eux qui atteignent d’abord leur limite." },
      { q: "Prêter son ordinateur à un ami pour l’après-midi…", c: ["est possible s’il le remet à zéro avant", "est à proscrire : il garde ton azote, pas le sien", "est possible s’il plonge moins profond", "ne pose pas de problème en mode profondimètre"], a: 1, e: "Chaque ordinateur suit l’historique d’un seul plongeur." }
    ]
  });

  C.module({
    id: "n4-materiel", world: "n4", depth: "−20 m", icon: "gauge",
    title: "Matériel en profondeur",
    sub: "Détendeur, compresseur, ordinateur, gilet",
    diagram: "n4-det",
    essentiel: `
<p>Le guide sait expliquer le fonctionnement du matériel, reconnaître une panne et en déduire le bon réflexe pour toute la palanquée.</p>
<h3>Le détendeur</h3>
<ul><li><b>1er étage</b> : un clapet, commandé par une membrane ou un piston, laisse passer l’air du bloc jusqu’à obtenir une <b>moyenne pression</b> (MP) d’environ 8 à 10 bar au-dessus de la pression ambiante. La pression de l’eau agit sur la membrane ou le piston : la MP suit la profondeur.</li>
<li><b>Compensé</b> : la MP ne baisse pas quand le bloc se vide. Non compensé : elle varie avec la pression du bloc.</li>
<li><b>2e étage</b> : quand tu inspires, la membrane s’enfonce, un levier ouvre le <b>clapet aval</b>. Si la MP monte trop (1er étage défaillant), le clapet aval s’ouvre : <b>débit continu</b>. Ça vide le bloc, mais ça laisse respirer.</li>
<li><b>Givrage</b> : la détente refroidit l’air ; en eau froide, de la glace bloque un clapet ouvert. Prévention : détendeur adapté, ne pas respirer dessus hors de l’eau au froid, deux 1ers étages.</li></ul>
<h3>Le compresseur</h3>
<p>Il comprime l’air en <b>plusieurs étages</b> avec refroidissement entre chaque, purge l’eau condensée et filtre (charbon actif, tamis moléculaire) l’humidité, l’huile et les odeurs. Prise d’air au vent, loin des moteurs (monoxyde de carbone). Entretien et changement des filtres tracés.</p>
<h3>Le gilet et l’ordinateur</h3>
<p>Le gilet a des <b>purges</b> (haute, basse) et une soupape de surpression. Un direct system bloqué ouvert gonfle sans s’arrêter : on débranche le flexible et on purge. L’ordinateur mesure la pression (profondeur) et le temps ; s’il est intégré à l’air, il lit aussi la pression du bloc et calcule l’autonomie.</p>`,
    approfondir: `
<h3>Diagnostiquer une panne en palanquée</h3>
<ul><li><b>Débit continu</b> : on respire « à côté » du flux, on ferme la sortie concernée si deux 1ers étages, sinon fin de plongée et remontée accompagnée.</li>
<li><b>Détendeur dur</b> : MP basse, robinet mal ouvert, filtre bouché, bloc presque vide.</li>
<li><b>Inflateur bloqué</b> : débrancher le flexible, purger, contrôler la vitesse.</li>
<li><b>Ordinateur en panne</b> : table de secours ou ordinateur du binôme le plus pénalisant, fin de plongée prudente.</li></ul>
<h3>Entretien</h3>
<p>Rinçage à l’eau douce, capuchon en place, révision régulière par un technicien, stockage à l’abri de la chaleur et des UV.</p>`,
    memo: [["1er étage", "Membrane ou piston ; MP ≈ 8-10 bar au-dessus de l’ambiante."], ["Compensé", "MP stable même bloc presque vide."], ["Clapet aval", "Si la MP monte trop : débit continu, pas blocage."], ["Givrage", "Clapet bloqué ouvert : fermer la sortie, passer sur l’autre."], ["Compresseur", "Plusieurs étages, purges, filtres, prise d’air propre."], ["Inflateur bloqué", "Débrancher le flexible, purger."]],
    moniteur: ["Peut-on démonter un détendeur ensemble pour voir les pièces ?", "Qui gère les filtres du compresseur au club ?"],
    quiz: [
      { q: "Pourquoi la moyenne pression suit-elle la profondeur ?", c: ["Le bloc se vide et la pression baisse", "L’eau agit sur la membrane ou le piston du 1er étage", "Le 2e étage règle la MP selon la profondeur", "L’ordinateur la corrige grâce à son capteur"], a: 1, e: "La MP reste ainsi ≈ 8-10 bar au-dessus de la pression ambiante, quelle que soit la profondeur." },
      { q: "Le 2e étage utilise un clapet aval. Conséquence d’une MP trop forte ?", c: ["Il se bloque fermé", "Il se met en débit continu", "Il ne change rien", "Il réduit la MP"], a: 1, e: "Le clapet aval s’ouvre sous l’excès de pression : le plongeur peut encore respirer, mais le bloc se vide." },
      { q: "Un 1er étage non compensé…", c: ["délivre une MP qui varie avec la pression du bloc", "donne une MP fixe, quelle que soit la profondeur", "ne fonctionne pas correctement sous 50 bar", "est interdit en plongée à plus de 20 m"], a: 0, e: "Respiration plus dure bloc presque vide. Le compensé corrige ce défaut." },
      { q: "Ton plongeur respire sur un détendeur en débit continu. Tu…", c: ["lui fais remonter vite avant que le bloc soit vide", "lui montres de respirer à côté du flux, puis vous remontez", "lui donnes ton octopus et vous continuez la plongée", "tapes sur le 2e étage pour décoincer la membrane"], a: 1, e: "On respire en laissant l’excès s’échapper ; fermer la sortie fautive s’il y en a deux, sinon fin de plongée accompagnée." },
      { q: "Le détendeur devient dur à respirer à 35 m, bloc à 120 bar. Cause possible ?", c: ["Bloc trop plein, la pression freine", "Robinet mal ouvert ou filtre encrassé", "Narcose qui donne cette impression", "Eau trop chaude pour le détendeur"], a: 1, e: "Un robinet à moitié ouvert ou un filtre colmaté limite le débit, surtout en profondeur où on consomme plus." },
      { q: "Pourquoi un compresseur a-t-il plusieurs étages ?", c: ["Pour gonfler plusieurs blocs en même temps", "Pour comprimer progressivement en refroidissant entre chaque", "Pour filtrer l’humidité à chaque étape de compression", "Pour enrichir l’air en oxygène au dernier étage"], a: 1, e: "Comprimer d’un coup chaufferait énormément ; entre chaque étage, on refroidit et on purge l’eau." },
      { q: "Les filtres du compresseur retiennent surtout…", c: ["l’azote et le gaz carbonique", "l’eau, l’huile et les odeurs", "le monoxyde de carbone en excès", "le sel et le sable aspirés"], a: 1, e: "Charbon actif et tamis moléculaire : un air sec et propre. Ils ne retirent pas tout le CO, d’où la prise d’air propre." },
      { q: "Le direct system d’un plongeur gonfle sans s’arrêter. Le guide…", c: ["dégonfle en tirant la purge haute seulement", "débranche le flexible et purge", "lui fait lâcher son lest", "le laisse remonter"], a: 1, e: "Débrancher coupe l’arrivée d’air ; on purge et on contrôle la vitesse ensemble." },
      { q: "Un ordinateur « intégré air » mesure en plus…", c: ["la température", "la pression du bloc", "la Pp N₂ du sang", "le rythme cardiaque"], a: 1, e: "Par un capteur sur le 1er étage ; il calcule alors l’autonomie restante." },
      { q: "Le givrage est plus probable…", c: ["en eau chaude et peu profonde", "en eau froide, avec un fort débit", "avec un bloc presque vide", "avec un détendeur compensé"], a: 1, e: "Fort débit = forte détente = froid intense. On évite aussi de respirer dessus hors de l’eau par grand froid." },
      { q: "La soupape de surpression du gilet sert…", c: ["à gonfler plus vite en surface, avec la bouche", "à éviter que l’enveloppe éclate en cas de surgonflage", "à purger rapidement pendant toute la descente", "à garder une pression stable pendant le palier"], a: 1, e: "Elle s’ouvre seule si la pression intérieure devient trop forte." },
      { q: "Pourquoi deux 1ers étages sur un bloc en eau froide ?", c: ["Pour avoir le double d’air disponible", "Pour isoler un étage givré et respirer sur l’autre", "Pour gonfler le gilet et le parachute séparément", "Pour que le guide et le plongeur aient chacun le sien"], a: 1, e: "La redondance permet de fermer la sortie fautive et de finir la plongée normalement." },
      { q: "Un piston ou une membrane, dans un 1er étage, sert à…", c: ["mesurer la pression restante du bloc", "commander l’ouverture du clapet selon la pression", "limiter le débit quand on inspire fort", "éviter le givrage en eau froide"], a: 1, e: "Il équilibre la MP, la pression de l’eau et un ressort : le clapet s’ouvre ou se ferme en conséquence." },
      { q: "Après chaque plongée en mer, l’entretien de base du détendeur ?", c: ["Rinçage à l’eau douce, capuchon en place", "Rinçage à l’eau douce, capuchon retiré", "Graissage léger du 2e étage à l’huile", "Trempage du 1er étage dans l’eau savonneuse"], a: 0, e: "Le capuchon empêche l’eau d’entrer dans le 1er étage. La révision complète, c’est le technicien." },
      { q: "Ordinateur en panne au fond pour un plongeur encadré. Le guide…", c: ["continue la plongée prévue en restant près de lui", "termine prudemment en suivant l’ordinateur le plus pénalisant", "le fait remonter avec un autre plongeur de la palanquée", "lui fait suivre les tables pour la suite de la plongée"], a: 1, e: "On sécurise : fin de plongée, remontée lente, palier sur l’ordinateur le plus pénalisant de la palanquée." },
      { q: "Une odeur d’huile dans l’air du bloc vient probablement…", c: ["d’un détendeur trop graissé", "d’un compresseur mal entretenu", "d’un bloc mal rincé à l’intérieur", "d’un robinet récemment changé"], a: 1, e: "Filtres saturés ou huile surchauffée : on n’utilise pas le bloc et on prévient le responsable." }
    ]
  });

  C.module({
    id: "n4-resp", world: "n4", depth: "−6 m", icon: "scroll",
    title: "Responsabilités du guide",
    sub: "Civile, pénale, cadre et assurance",
    diagram: "n4-resp",
    essentiel: `
<p>Encadrer, c’est être <b>responsable</b> de la sécurité d’autres personnes. Le guide agit dans un <b>cadre</b> : Code du sport, règles fédérales, consignes du directeur de plongée.</p>
<h3>Deux responsabilités</h3>
<ul><li><b>Civile</b> : réparer un dommage causé à autrui (faute, imprudence, négligence). Elle est couverte par l’<b>assurance responsabilité civile</b> (licence, structure).</li>
<li><b>Pénale</b> : sanctionner une infraction (blessures ou homicide involontaires, mise en danger délibérée de la vie d’autrui, non-assistance à personne en danger). Elle est <b>personnelle</b> : aucune assurance ne la prend en charge.</li></ul>
<h3>Ce que l’on attend d’un guide</h3>
<ul><li>Respecter ses <b>prérogatives</b> et les paramètres fixés par le DP.</li>
<li>Préparer la plongée (briefing, vérifications) et l’adapter au niveau de ses plongeurs et aux conditions.</li>
<li>Surveiller, prévenir, porter assistance, rendre compte.</li>
<li>Refuser ce qui n’est pas raisonnable : un plongeur pas en état, des conditions dangereuses.</li></ul>
<p>On parle d’<b>obligation de moyens</b> : on n’exige pas qu’aucun accident n’arrive, mais que tout ait été fait avec prudence et compétence.</p>
<h3>L’assurance</h3>
<p>La RC couvre les dommages causés aux autres. L’<b>individuelle accident</b> couvre tes propres dommages. Le guide vérifie que ses plongeurs sont licenciés ou assurés selon les règles de la structure.</p>
${VAL}Les prérogatives exactes du guide de palanquée (espaces, nombre de plongeurs encadrés, conditions particulières) sont fixées par le Code du sport et la fédération : vérifie-les dans les textes en vigueur avec ton moniteur.</div>`,
    approfondir: `
<h3>La faute, concrètement</h3>
<p>Un juge se demande ce qu’aurait fait un guide « normalement prudent et compétent » à ta place : briefing fait ? Paramètres respectés ? Plongeurs surveillés ? Secours organisés ? Le carnet, la fiche de sécurité et les témoignages servent de preuves.</p>
<h3>Non-assistance</h3>
<p>Ne pas porter secours alors qu’on le pouvait sans danger est une infraction. Porter secours maladroitement, mais de bonne foi, ne l’est pas.</p>`,
    memo: [["Civile", "Réparer un dommage : couverte par l’assurance RC."], ["Pénale", "Sanctionner une infraction : personnelle, non assurable."], ["Obligation de moyens", "Avoir agi avec prudence et compétence."], ["Cadre", "Code du sport, fédération, consignes du DP."], ["Refuser", "Un plongeur pas en état, des conditions dangereuses."], ["Preuves", "Briefing, fiche de sécurité, compte rendu."]],
    moniteur: ["Quelles sont exactement les prérogatives du guide de palanquée aujourd’hui ?", "Que couvre l’assurance de la structure pour un guide bénévole ?"],
    quiz: [
      { q: "La responsabilité pénale du guide…", c: ["est couverte par l’assurance de la licence", "est personnelle et ne s’assure pas", "est portée par le club", "n’existe pas pour un bénévole"], a: 1, e: "Une amende ou une peine ne peut pas être payée par une assurance : c’est personnel." },
      { q: "La responsabilité civile sert à…", c: ["punir une faute", "réparer un dommage causé à autrui", "contrôler les prérogatives", "délivrer les brevets"], a: 1, e: "Elle se traduit en indemnisation, prise en charge par l’assurance RC." },
      { q: "Le guide a une obligation…", c: ["de résultat : aucun accident possible", "de moyens : agir avec prudence et compétence", "d’assurance individuelle pour chaque plongeur", "de diriger le site"], a: 1, e: "On ne lui reproche pas un accident imprévisible, mais une imprudence ou une négligence." },
      { q: "Un plongeur se présente fatigué et malade. Le guide…", c: ["l’emmène quand même en restant peu profond", "peut refuser de l’emmener et en parle au DP", "le laisse décider seul", "le fait plonger avec un autre guide"], a: 1, e: "Refuser une plongée déraisonnable fait partie de la prudence attendue." },
      { q: "Ne pas porter secours alors qu’on le pouvait sans danger, c’est…", c: ["une simple maladresse", "une infraction pénale", "une faute civile seulement", "autorisé si on n’est pas guide"], a: 1, e: "La non-assistance à personne en danger est punie, guide ou pas." },
      { q: "Un juge apprécie la faute du guide en se demandant…", c: ["si l’accident a eu des suites graves", "ce qu’aurait fait un guide prudent et compétent", "combien de plongées le guide a encadrées", "si le guide respectait les habitudes du club"], a: 1, e: "C’est la comparaison avec un professionnel « normalement prudent » dans la même situation." },
      { q: "Qui fixe les paramètres que le guide doit respecter sur le site ?", c: ["Le guide lui-même", "Le directeur de plongée", "Le plus ancien de la palanquée", "L’assureur"], a: 1, e: "Le DP, dans le cadre du Code du sport et des prérogatives de chacun." },
      { q: "L’assurance individuelle accident couvre…", c: ["les dommages causés aux autres", "tes propres dommages corporels", "la responsabilité pénale", "le bateau du club"], a: 1, e: "Rapatriement, soins, caisson : ce que la RC ne couvre pas." },
      { q: "Quels documents peuvent prouver qu’un guide a été prudent ?", c: ["Son carnet de plongée et son brevet", "Fiche de sécurité, compte rendu au DP, témoignages", "Les données de son propre ordinateur seulement", "L’attestation d’assurance de la structure"], a: 1, e: "Ils montrent que le cadre a été respecté et que l’incident a été géré." },
      { q: "Mise en danger délibérée de la vie d’autrui : par exemple…", c: ["faire un briefing trop court avant la plongée", "emmener sciemment des N1 à 35 m malgré les règles", "oublier de vérifier le compas d’un plongeur", "faire un palier plus court que prévu"], a: 1, e: "Violer délibérément une règle de sécurité en exposant d’autres à un risque grave." },
      { q: "Un secours maladroit mais de bonne foi…", c: ["est toujours puni", "n’est pas une non-assistance", "engage la responsabilité pénale de la victime", "est interdit sans diplôme"], a: 1, e: "La loi punit l’abstention, pas l’aide sincère. Mieux vaut agir que rester passif." },
      { q: "Le guide vérifie avant la plongée…", c: ["la météo, le site et le matériel de secours à bord", "niveau, état, matériel et assurance de ses plongeurs", "son propre matériel et la pression de son bloc", "les cartes de niveau, c’est le DP qui fait le reste"], a: 1, e: "Le DP organise, mais le guide contrôle sa palanquée avant de l’emmener." },
      { q: "Les prérogatives du guide sont fixées par…", c: ["son expérience personnelle", "le Code du sport et la fédération", "le pilote du bateau", "ses plongeurs"], a: 1, e: "À vérifier dans les textes en vigueur : espaces, nombre de plongeurs, conditions." },
      { q: "Un plongeur refuse de suivre une consigne de sécurité sous l’eau. Le guide…", c: ["le laisse faire, chacun est responsable de lui", "met fin à la plongée pour lui si besoin et rend compte au DP", "continue la plongée et en parle au DP à la sortie", "le confie à un autre plongeur et poursuit avec les autres"], a: 1, e: "La sécurité du groupe prime ; le DP doit être informé." },
      { q: "L’assurance RC du guide est souvent…", c: ["à souscrire seul, à titre personnel, chaque année", "comprise dans la licence ou l’assurance de la structure", "à prendre en plus pour chaque sortie encadrée", "réservée aux moniteurs, pas aux guides de palanquée"], a: 1, e: "Vérifie les garanties de ta licence et de ta structure." },
      { q: "Après un accident, le guide…", c: ["rentre et attend d’être contacté par le DP", "participe aux secours puis rend compte précisément au DP", "note ses paramètres et rédige seul son rapport", "laisse le DP gérer et s’occupe des autres plongeurs"], a: 1, e: "Secourir, puis transmettre des faits précis : heure, paramètres, gestes faits." }
    ]
  });

  C.module({
    id: "n4-milieu", world: "n4", depth: "−12 m", icon: "wave",
    title: "Milieu : météo, marées, courants",
    sub: "Choisir le bon moment et le bon site",
    diagram: "n4-maree",
    essentiel: `
<p>Le guide choisit son parcours en fonction du <b>milieu</b> : vent, houle, marée, courant, visibilité. Une bonne lecture évite la plupart des difficultés.</p>
<h3>Vent, mer et houle</h3>
<ul><li>L’échelle de <b>Beaufort</b> mesure la force du vent (0 à 12). Au-delà de force 4 à 5, la mise à l’eau et la récupération deviennent délicates.</li>
<li>La <b>mer du vent</b> est créée par le vent local ; la <b>houle</b> vient d’un vent lointain et peut être forte par beau temps.</li>
<li>Un vent de terre éloigne les plongeurs en surface de la côte : danger pour la plongée du bord.</li></ul>
<h3>Les marées</h3>
<ul><li><b>Marnage</b> : différence de hauteur entre pleine mer et basse mer.</li>
<li><b>Coefficient</b> : de 20 (mortes-eaux) à 120 (vives-eaux). Plus il est fort, plus le marnage et les courants sont forts.</li>
<li><b>Règle des douzièmes</b> : la mer monte de 1/12, 2/12, 3/12, 3/12, 2/12, 1/12 du marnage au fil des six heures. Le courant est le plus fort aux 3e et 4e heures.</li>
<li><b>L’étale</b> : autour de la pleine mer ou de la basse mer, le courant est faible. C’est souvent le bon créneau.</li></ul>
<h3>Les courants</h3>
<p>Courants de marée, courants généraux, courants de vent. Le guide les anticipe : départ face au courant, abri derrière le relief, mouillage repéré, parachute pour la dérive. En Méditerranée, la marée est faible, mais le vent crée des courants.</p>
<h3>Visibilité et faune</h3>
<p>Après un coup de vent ou de fortes pluies, la visibilité baisse : palanquée plus serrée. Le guide connaît la faune à risque du site (rascasses, vives, méduses, murènes) et le briefe.</p>`,
    approfondir: `
<h3>Calcul avec la règle des douzièmes</h3>
<div class="callout ex"><span class="eyebrow">Exemple</span>Marnage de 6 m : 1/12 = 0,5 m. Après 3 heures, la mer a monté de 1 + 2 + 3 = 6 douzièmes, soit <b>3 m</b>. Pendant la 3e heure seule : 3/12 = 1,5 m, c’est là que le courant est le plus fort.</div>
<h3>Lire un bulletin</h3>
<p>Direction et force du vent, état de la mer, houle (hauteur, période), tendance. On le lit la veille et le matin, et le DP décide.</p>
${VAL}Les limites de vent et de houle retenues pour plonger dépendent du site, du bateau et du DP.</div>`,
    memo: [["Beaufort", "Force du vent 0 à 12 ; au-delà de 4-5, prudence."], ["Houle", "Vient d’un vent lointain, peut être forte par beau temps."], ["Coefficient", "20 à 120 : plus fort = plus de marnage et de courant."], ["Douzièmes", "1, 2, 3, 3, 2, 1 : courant maximal aux 3e et 4e heures."], ["Étale", "Autour de la pleine ou basse mer : courant faible."], ["Vent de terre", "Pousse au large : danger en surface."]],
    moniteur: ["Quelles limites de vent et de houle retenons-nous pour nos sites ?", "À quelle heure de marée plonge-t-on habituellement sur nos sites à courant ?"],
    quiz: [
      { q: "Marnage de 6 m. De combien la mer monte-t-elle pendant les 3 premières heures ?", c: ["1,5 m", "3 m", "4,5 m", "6 m"], a: 1, e: "1 + 2 + 3 = 6 douzièmes = la moitié du marnage : 3 m." },
      { q: "Le courant de marée est le plus fort…", c: ["à l’étale", "aux 3e et 4e heures", "à la 1re heure", "à la 6e heure"], a: 1, e: "C’est là que la mer monte ou descend le plus vite (3/12 par heure)." },
      { q: "Le meilleur créneau sur un site à fort courant de marée ?", c: ["À mi-marée, quand l’eau est claire", "L’étale de pleine ou de basse mer", "Aux vives-eaux, l’eau se renouvelle", "Une heure après la pleine mer"], a: 1, e: "Courant faible : mise à l’eau, plongée et récupération plus faciles." },
      { q: "Un coefficient de 110, c’est…", c: ["des mortes-eaux, avec peu de courant", "des vives-eaux, fort marnage et forts courants", "une marée moyenne, avec des courants modérés", "une mer agitée, avec une houle de 1,10 m"], a: 1, e: "Le coefficient va de 20 à 120 : 110, ce sont de grandes marées." },
      { q: "La houle se distingue de la mer du vent car…", c: ["elle vient d’un vent lointain", "elle n’existe qu’en Méditerranée", "elle est toujours faible", "elle suit la marée"], a: 0, e: "Elle peut arriver par beau temps local, avec de longues périodes." },
      { q: "Pourquoi un vent de terre est-il traître pour la plongée du bord ?", c: ["Il refroidit fortement l’eau de surface", "Il pousse les plongeurs en surface vers le large", "Il crée une houle forte qui déferle sur la côte", "Il trouble l’eau près du bord en soulevant le sable"], a: 1, e: "La mer paraît plate près du bord, mais un plongeur fatigué en surface dérive au large." },
      { q: "L’échelle de Beaufort mesure…", c: ["la hauteur de la houle", "la force du vent", "la marée", "la visibilité"], a: 1, e: "De 0 (calme) à 12 (ouragan)." },
      { q: "En Méditerranée, les courants viennent surtout…", c: ["de la marée, comme en Atlantique", "du vent et des courants généraux", "des rivières et des fleuves côtiers", "des différences de température"], a: 1, e: "La marée y est faible ; le vent peut créer des courants nets, surtout sur les caps et les secs." },
      { q: "Marnage de 4 m. Pendant la 3e heure seule, la mer monte de…", c: ["0,33 m", "0,67 m", "1 m", "2 m"], a: 2, e: "1/12 = 0,33 m ; 3/12 = 1 m." },
      { q: "Après un fort coup de vent, la visibilité est mauvaise. Le guide…", c: ["prévoit le même parcours", "serre la palanquée, réduit les distances et adapte le parcours", "plonge plus profond pour trouver de l’eau claire", "annule toujours"], a: 1, e: "Avec peu de visibilité, une palanquée se perd vite. Le DP peut aussi annuler." },
      { q: "Qui décide, en dernier, de plonger ou non selon la météo ?", c: ["Le guide de palanquée", "Le directeur de plongée", "Le pilote du bateau seul", "Le président du club"], a: 1, e: "Le DP décide, en lien avec le pilote pour ce qui concerne le bateau." },
      { q: "La rascasse est dangereuse par…", c: ["sa morsure", "ses épines venimeuses", "son électricité", "son poison quand on la mange crue"], a: 1, e: "On ne la touche pas ; une piqûre se soigne à l’eau très chaude (sans se brûler) puis consultation." },
      { q: "Un départ face au courant permet…", c: ["d’aller plus loin à l’aller, sans se fatiguer", "de revenir courant dans le dos, quand l’air est plus bas", "de consommer moins à l’aller grâce au courant", "de faire le palier à l’abri du courant"], a: 1, e: "On fait l’effort quand on est frais et plein d’air." },
      { q: "Le marnage, c’est…", c: ["la vitesse du courant au moment de la marée", "la différence de hauteur entre pleine et basse mer", "la durée entre deux pleines mers successives", "le coefficient de marée ramené en mètres"], a: 1, e: "Il varie avec le coefficient et le lieu." },
      { q: "On lit le bulletin météo…", c: ["seulement la veille", "la veille et le matin même", "seulement sur le bateau", "jamais, on regarde la mer"], a: 1, e: "Les prévisions évoluent ; on compare aussi avec ce qu’on voit sur place." },
      { q: "Une houle longue de 2 m par beau temps. Risque principal ?", c: ["Le courant de surface qui l’accompagne toujours", "Mise à l’eau et récupération difficiles, ressac sur les roches", "Une eau plus froide remontée du fond par la houle", "Une mauvaise visibilité au fond à cause du sable"], a: 1, e: "La houle peut être dangereuse près des roches et à l’échelle du bateau, même sans vent." }
    ]
  });

  /* ---------- Compléments des thèmes existants ---------- */
  C.extend("n4-guide", { quiz: [
    { q: "Avant la mise à l’eau, le guide vérifie chez chaque plongeur…", c: ["la pression du bloc et le réglage de l’ordinateur", "air ouvert, gilet, lest, signes compris", "le masque, les palmes et la combinaison fermée", "la date d’épreuve du bloc et le carnet de plongée"], a: 1, e: "Une vérification croisée rapide évite la plupart des incidents de début de plongée." },
    { q: "Pendant la descente, le guide se place…", c: ["devant, pour ouvrir le chemin vers le fond", "de façon à voir tous ses plongeurs, en contrôlant la vitesse", "derrière la palanquée, pour pousser les retardataires", "au-dessus, pour pouvoir remonter vite si besoin"], a: 1, e: "La descente est un moment à risque (oreilles, flottabilité) : contact visuel permanent." },
    { q: "Un plongeur montre son oreille à 6 m. Le guide…", c: ["lui fait signe de continuer, il compensera plus bas", "arrête la palanquée, remonte un peu avec lui", "le confie au plus expérimenté et poursuit la descente", "lui demande de souffler fort, nez pincé, sans s’arrêter"], a: 1, e: "Toute la palanquée s’adapte : on ne laisse jamais un plongeur seul." },
    { q: "Le guide demande les pressions…", c: ["une fois au fond, puis au moment du demi-tour", "régulièrement, plus souvent en profondeur", "seulement quand un plongeur montre un signe", "au départ du palier, pour noter sur la fiche"], a: 1, e: "Plus on est profond, plus l’air baisse vite." },
    { q: "La palanquée doit rester…", c: ["étalée pour mieux voir", "groupée, à portée de vue du guide", "en file indienne serrée derrière le guide", "chacun à son rythme"], a: 1, e: "Le guide doit pouvoir intervenir à tout moment." }
  ] });

  C.extend("n4-air", { quiz: [
    { q: "Air de remontée : 6 min de remontée et paliers à une pression moyenne de 2 bar, conso 20 L/min. Litres ?", c: ["120 L", "240 L", "360 L", "60 L"], a: 1, e: "6 × 20 × 2 = 240 L, auxquels on ajoute une marge." },
    { q: "Pourquoi le guide garde-t-il lui-même plus de marge que ses plongeurs ?", c: ["Il consomme plus car il nage autour d’eux", "Il doit pouvoir donner de l’air à un plongeur", "Il doit rendre un bloc plein pour le gonflage", "Il fait des paliers plus longs que ses plongeurs"], a: 1, e: "En cas de panne d’air, c’est souvent son octopus qui sert." },
    { q: "Un partage d’air à 30 m : sur le bloc du donneur, la consommation est…", c: ["inchangée", "environ doublée", "divisée par deux", "nulle"], a: 1, e: "Deux plongeurs sur un bloc : il faut remonter tout de suite et calmement." },
    { q: "Un plongeur annonce 70 bar alors que le demi-tour était à 100. Le guide…", c: ["termine le parcours prévu en surveillant son mano", "commence la remontée en adaptant le parcours", "lui donne son octopus et continue la visite", "attend 50 bar pour annoncer le retour"], a: 1, e: "On revient vers le mouillage ou on remonte en pleine eau avec parachute selon la situation." },
    { q: "Bloc 12 L à 200 bar, conso 20 L/min, fond à 30 m. Temps avant 100 bar environ ?", c: ["≈ 10 min", "≈ 15 min", "≈ 20 min", "≈ 30 min"], a: 1, e: "100 bar × 12 = 1 200 L ; conso 80 L/min ; 1 200 ÷ 80 = 15 min." },
    { q: "Le stress augmente surtout…", c: ["la flottabilité", "la consommation", "la narcose seule", "l’autonomie"], a: 1, e: "Respiration rapide : le plongeur stressé vide son bloc beaucoup plus vite." },
    { q: "La pression de demi-tour est annoncée…", c: ["sous l’eau, au feeling", "au briefing, pour tous", "à mi-plongée", "seulement au plus jeune"], a: 1, e: "Chacun sait d’avance quand il doit prévenir." },
    { q: "Un plongeur ne sait pas lire son manomètre (débutant). Le guide…", c: ["lui apprend la lecture en surface après la plongée", "lit lui-même le mano régulièrement", "lui demande de montrer le signe à mi-bloc", "se fie à sa propre consommation pour les deux"], a: 1, e: "Avec des débutants, le guide contrôle directement leur air." }
  ] });

  C.extend("n4-assistance", { quiz: [
    { q: "Pendant une remontée assistée, le guide contrôle la vitesse avec…", c: ["ses palmes uniquement", "les gilets, surtout en purgeant", "le gilet de la victime gonflé à fond", "le parachute"], a: 1, e: "On gère les deux volumes d’air, en purgeant tôt pour ne pas accélérer." },
    { q: "Le tractage en surface d’une victime se fait…", c: ["sur le ventre, tête dans l’eau", "en maintenant ses voies aériennes hors de l’eau", "en la poussant sous l’eau", "en la laissant dériver vers le bateau"], a: 1, e: "Victime sur le dos, visage hors de l’eau, gilet gonflé." },
    { q: "Pendant l’assistance, la victime doit…", c: ["bloquer sa respiration pour garder l’air", "expirer (ou au moins ne pas bloquer)", "palmer fort pour aider à la remontée", "gonfler son gilet pour aider le guide"], a: 1, e: "On surveille l’expiration pendant la remontée : risque de surpression." },
    { q: "Le reste de la palanquée pendant une assistance ?", c: ["Il termine la plongée avec le plus gradé", "Il suit, en sécurité, si possible avec un serre-file", "Il remonte directement, chacun à son rythme", "Il attend au fond le retour du guide"], a: 1, e: "Le guide garde ses autres plongeurs en sécurité, idéalement avec l’aide d’un plongeur expérimenté." },
    { q: "Arrivé en surface avec une victime, le premier geste ?", c: ["Faire le signe OK au bateau pour le rassurer", "Gonfler les gilets et faire le signe de détresse", "Retirer son lest et celui de la victime", "Lui retirer le masque et le détendeur"], a: 1, e: "Flotter et alerter : le bateau vient, les secours se préparent." },
    { q: "Une victime inconsciente est ramenée à bord. On commence par…", c: ["la déséquiper complètement dans l’eau", "la sortir de l’eau puis bilan : respire-t-elle ?", "lui faire boire de l’eau", "l’asseoir"], a: 1, e: "Sortie, allongement, bilan : PLS sous O₂ si elle respire, RCP sinon." },
    { q: "Pour assister un plongeur, la prise la plus courante ?", c: ["Par les palmes", "Face à face ou de côté, au gilet", "Par le bloc, par derrière seulement", "Par le détendeur"], a: 1, e: "Une prise ferme permet de contrôler la position, l’expiration et les gilets." },
    { q: "Pendant l’assistance, le guide surveille aussi…", c: ["la direction du bateau et du mouillage", "son propre air et ses paliers", "le temps total de plongée prévu au départ", "la palanquée voisine pour demander de l’aide"], a: 1, e: "Il ne doit pas devenir une deuxième victime." }
  ] });

  C.extend("n4-orga", { quiz: [
    { q: "La fiche de sécurité est remplie…", c: ["après la plongée seulement", "avant la mise à l’eau et à la sortie", "par chaque plongeur pour lui-même", "à la fin de la semaine"], a: 1, e: "Elle sert à savoir qui est à l’eau et à vérifier que tout le monde est revenu." },
    { q: "Le matériel de secours sur le site comprend notamment…", c: ["un compresseur", "oxygène, trousse de secours, moyen d’alerte", "un caisson", "un défibrillateur obligatoire partout"], a: 1, e: "Liste fixée par la réglementation : à vérifier avec ton DP." },
    { q: "Qui affecte un guide à une palanquée ?", c: ["Le guide choisit", "Le directeur de plongée", "Les plongeurs votent", "Le pilote"], a: 1, e: "Il compose les palanquées selon niveaux et aptitudes." },
    { q: "Le guide rend compte au DP…", c: ["seulement en cas d’accident ou d’incident", "à chaque retour : paramètres et incidents", "le soir, en remplissant le carnet du club", "quand le DP le lui demande au mouillage"], a: 1, e: "Le DP valide les retours sur la fiche et surveille la suite." },
    { q: "Le guide peut modifier les paramètres du DP…", c: ["librement", "seulement pour les réduire par prudence", "pour les augmenter si tout va bien", "jamais, même pour les réduire"], a: 1, e: "Réduire (moins profond, plus court) reste dans le cadre ; dépasser, non." },
    { q: "Un plongeur manque à l’appel au retour. Le DP…", c: ["attend la fin de la journée", "déclenche les recherches et l’alerte", "pense qu’il est rentré à pied", "repart plonger"], a: 1, e: "La fiche de sécurité sert à ça : réagir immédiatement." },
    { q: "Le DP doit être…", c: ["dans l’eau avec chaque palanquée", "présent sur le site", "joignable par téléphone seulement", "le guide le plus ancien"], a: 1, e: "Il organise et supervise depuis le site." },
    { q: "Avant de partir, le guide connaît…", c: ["la profondeur maxi et le temps prévus par les plongeurs", "les paramètres, le site, les consignes de secours", "le niveau et l’expérience de chaque plongeur seulement", "le parcours et les espèces à montrer en chemin"], a: 1, e: "Il doit pouvoir réagir en cas de problème sans improviser." },
    { q: "Un guide peut-il refuser une palanquée qu’il juge dangereuse ?", c: ["Non, le DP décide de tout", "Oui, il en parle au DP", "Oui, sans rien dire", "Seulement s’il est moniteur"], a: 1, e: "La sécurité prime ; le dialogue avec le DP aussi." }
  ] });

  C.extend("n4-deco", { quiz: [
    { q: "Le palier de sécurité, le guide le fait faire…", c: ["seulement si l’ordinateur l’exige", "systématiquement, toute la palanquée", "aux débutants seulement", "jamais en mer"], a: 1, e: "Quelques minutes vers 3-5 m : une marge simple et efficace." },
    { q: "Un plongeur remonte trop vite et s’échappe. Le guide…", c: ["le suit à la même vitesse pour le rattraper", "garde sa palanquée sous contrôle, puis gère en surface", "laisse sa palanquée au fond pour aller le chercher", "fait signe aux autres de remonter aussi vite que lui"], a: 1, e: "Ne pas mettre en danger le reste de la palanquée ; en surface : surveillance, O₂ si besoin, DP." },
    { q: "Pendant le palier, la palanquée se tient…", c: ["chacun à la profondeur que donne son ordinateur", "ensemble, à la profondeur la plus pénalisante", "ensemble, à la profondeur moyenne de la palanquée", "à 3 m, plus confortable pour tout le monde"], a: 1, e: "On suit l’ordinateur le plus exigeant et on reste groupés." },
    { q: "Tenir un palier en pleine eau, sans bout, demande…", c: ["un gilet bien gonflé et un lest léger", "un parachute et une bonne stabilisation", "un lest plus lourd pour ne pas dériver", "de palmer doucement vers le haut"], a: 1, e: "Le parachute donne un repère et signale la palanquée." },
    { q: "Deux plongées dans la journée : le guide conseille…", c: ["la plus profonde en second", "la plus profonde en premier", "deux plongées identiques", "aucune règle"], a: 1, e: "On évite les profils inversés sur la journée aussi." },
    { q: "Pourquoi éviter l’effort pendant le palier ?", c: ["Il refroidit le plongeur au palier", "Il favorise la formation de bulles", "Il fait consommer et raccourcit le palier", "Il fait varier la profondeur du palier"], a: 1, e: "On se stabilise, on respire calmement." },
    { q: "Le guide oriente la remontée…", c: ["vers le bateau ou le mouillage, en remontant le relief", "droit vers la surface, à la verticale du point le plus profond", "face au courant, pour finir le palier près du bateau", "vers la zone la plus claire, pour mieux voir la surface"], a: 0, e: "Remonter le relief donne une remontée progressive et un repère pour les paliers." },
    { q: "Un plongeur veut sortir avant la fin du palier, il a froid. Le guide…", c: ["le laisse sortir, le froid est une urgence", "le garde au palier en le rassurant, puis le surveille", "lui fait finir le palier un peu plus haut, à 1 m", "le fait sortir avec un autre plongeur de la palanquée"], a: 1, e: "On ne saute pas un palier obligatoire ; on signale le froid au DP à la sortie." },
    { q: "Le guide contrôle la vitesse de remontée en surveillant…", c: ["les petites bulles des plongeurs", "son ordinateur et ses plongeurs", "le bout du mouillage et la lumière", "le profondimètre du plus léger"], a: 1, e: "Il donne le rythme et s’assure que tout le monde le suit." },
    { q: "Une plongée de 3 jours de suite : le risque d’ADD…", c: ["diminue, on s’habitue", "augmente avec l’azote accumulé", "ne change pas", "disparaît avec un ordinateur"], a: 1, e: "Les plongées répétées sur plusieurs jours accumulent l’azote : un jour de pause est souvent conseillé." }
  ] });

  C.extend("n4-physio", { quiz: [
    { q: "Un plongeur pâle et nauséeux sur le bateau avant la plongée. Le guide…", c: ["le fait plonger pour qu’il aille mieux", "évite qu’il plonge et en parle au DP", "lui donne un café", "le met en tête de palanquée"], a: 1, e: "Mal de mer, fatigue : risque de vomir sous l’eau, de paniquer, de mal désaturer." },
    { q: "Un plongeur vomit dans son détendeur. Il doit…", c: ["retirer le détendeur et vomir dans l’eau, puis le remettre", "garder le détendeur en bouche et vomir dedans, puis purger", "passer sur l’octopus du guide avant de vomir", "remonter immédiatement en expirant doucement"], a: 1, e: "Le détendeur évite d’inhaler de l’eau. Puis on purge et on remonte calmement." },
    { q: "Les signes d’hypothermie chez un plongeur encadré ?", c: ["Euphorie et rires inhabituels", "Frissons, gestes lents et maladroits", "Douleur au coude et à l’épaule", "Toux et crachats mousseux"], a: 1, e: "On remonte, on réchauffe, on surveille." },
    { q: "Après la plongée, un plongeur se plaint de démangeaisons et de marbrures. On pense…", c: ["coup de soleil", "ADD cutané", "allergie au néoprène", "piqûre de méduse"], a: 1, e: "Oxygène, avis médical : un ADD cutané peut précéder d’autres signes." },
    { q: "Pourquoi le guide fait-il boire ses plongeurs après la plongée ?", c: ["Pour éliminer l’azote par les urines", "La déshydratation favorise l’ADD", "Pour réchauffer le corps après le froid", "Pour éviter la narcose à la plongée suivante"], a: 1, e: "Eau plate, pas d’alcool : un sang moins épais désature mieux." },
    { q: "Un plongeur très essoufflé en surface après la plongée. Le guide…", c: ["le fait palmer vite vers le bateau pour le sortir", "gonfle son gilet, le rassure, le tracte si besoin", "lui fait remettre son détendeur pour respirer", "lui demande de retenir sa respiration un instant"], a: 1, e: "Flottabilité, calme, effort minimal." },
    { q: "Une crampe au mollet sous l’eau. Le geste ?", c: ["Palmer plus fort pour chasser la crampe", "Étirer le muscle : tirer la palme vers soi", "Remonter vite pour masser en surface", "Retirer la palme et continuer à palmer"], a: 1, e: "On étire, on se repose, le guide aide si besoin." },
    { q: "Le guide observe ses plongeurs après la sortie car…", c: ["une hypothermie se déclare souvent à la sortie", "des signes d’ADD peuvent apparaître plus tard", "la narcose peut durer encore une heure", "il doit noter la consommation de chacun"], a: 1, e: "La plupart des ADD apparaissent dans l’heure qui suit." },
    { q: "Un plongeur prend un médicament contre le mal de mer qui endort. Risque ?", c: ["Aucun, il protège même de la narcose", "Somnolence qui s’ajoute à la narcose", "Il favorise surtout les barotraumatismes", "Il accélère la désaturation"], a: 1, e: "Certains médicaments réduisent la vigilance : avis médical avant de plonger avec." },
    { q: "Un débutant se fige et ne réagit plus à 15 m. Le guide…", c: ["attend qu’il se reprenne, sans le toucher", "le prend, le stabilise, le rassure, puis décide de la suite", "lui fait signe de remonter et l’accompagne des yeux", "continue lentement, il suivra en se reprenant"], a: 1, e: "Le blocage précède souvent la panique : contact, calme, stabilisation." }
  ] });

  C.addCards([
    { id: "x4-p1", m: "n4-physique", f: "Méthode d’un calcul d’examen", b: "Schéma, données, loi, calcul en P abs, vérification du résultat." },
    { id: "x4-p2", m: "n4-physique", f: "Pièges classiques en physique", b: "Pression relative, densité 1,03 oubliée, Celsius au lieu de kelvins." },
    { id: "x4-a1", m: "n4-accidents", f: "Les 4 familles d’accidents", b: "Mécaniques, biochimiques, biophysiques, liés au milieu." },
    { id: "x4-a2", m: "n4-accidents", f: "Plan d’une réponse sur un accident", b: "Mécanisme, signes, conduite à tenir, prévention." },
    { id: "x4-m1", m: "n4-modeles", f: "Coefficient de sursaturation critique", b: "Rapport tension / pression ambiante à ne pas dépasser : sinon palier." },
    { id: "x4-m2", m: "n4-modeles", f: "Facteurs de gradient", b: "Valeurs plus basses = plus prudent (30/85 < 50/95)." },
    { id: "x4-d1", m: "n4-materiel", f: "Clapet aval du 2e étage", b: "MP trop forte → débit continu, pas blocage." },
    { id: "x4-d2", m: "n4-materiel", f: "Compresseur", b: "Plusieurs étages, refroidissement, purges, filtres, prise d’air propre." },
    { id: "x4-r1", m: "n4-resp", f: "Civile ou pénale ?", b: "Civile : réparer (assurée). Pénale : sanctionner (personnelle)." },
    { id: "x4-r2", m: "n4-resp", f: "Obligation de moyens", b: "Avoir agi avec la prudence d’un guide compétent." },
    { id: "x4-e1", m: "n4-milieu", f: "Règle des douzièmes", b: "1, 2, 3, 3, 2, 1 : courant maximal aux 3e et 4e heures." },
    { id: "x4-e2", m: "n4-milieu", f: "Coefficient de marée", b: "20 (mortes-eaux) à 120 (vives-eaux)." }
  ]);

  C.notions = Object.assign(C.notions || {}, {
    "n4-guide": [["brief", "Briefing et vérifications", "briefing|verifi|questions|air ouvert|gilet|lest", "briefing"], ["place", "Placer et surveiller ses plongeurs", "place|portee|vue|groupe|rythme|faible|descente", "Placer"], ["stress", "Stress et signes d’alerte", "stress|respire vite|palme beaucoup|oreille|anticip", "stress"]],
    "n4-air": [["plan", "Plan d’air et demi-tour", "demi-tour|plan|remontee|marge|pression", "demi-tour"], ["conso", "Gros consommateur", "consomm|stress|100 bar|bar par minute|l/min", "consommation"], ["partage", "Partage d’air", "partage|donneur|octopus|double", "partage"]],
    "n4-assistance": [["remontee", "Remontée assistée", "remontee|vitesse|gilet|purg|expir", "remontée"], ["surface", "En surface et sortie", "surface|tractage|detresse|flottabilite|bateau|sortie|bord", "surface"], ["palanquee", "Le reste de la palanquée", "reste de la palanquee|serre-file|autres plongeurs", "palanquée"]],
    "n4-orga": [["dp", "Rôle du directeur de plongée", "directeur|dp|compose|parametres|present", "directeur"], ["fiche", "Fiche de sécurité et retours", "fiche|retour|manque|appel|compte", "fiche"], ["secours", "Matériel de secours", "oxygene|trousse|alerte|secours", "secours"]],
    "n4-deco": [["palier", "Palier de la palanquée", "palier|penalisant|ensemble|parachute|pleine eau", "palier"], ["profil", "Profils à éviter", "yo-yo|yoyo|inverse|profond.*premier|redescend", "yo-yo"], ["vitesse", "Vitesse et contrôle", "vitesse|rapide|controle|echappe", "vitesse"]],
    "n4-physio": [["signes", "Repérer un plongeur en difficulté", "pale|nause|fige|essouffl|frisson|crampe|vomi", "signes"], ["apres", "Après la plongée", "apres la plongee|boire|deshydrat|marbrure|epaule|fatigue", "après"], ["medic", "Médicaments et forme", "medicament|mal de mer|fatigue|forme", "forme"]],
    "n4-physique": [["mariotte", "Mariotte : gilet, parachute, conso", "mariotte|gilet|parachute|volume|l/min|bar par minute", "Mariotte"], ["archi", "Archimède : relevage et lestage", "archimede|relev|poids apparent|lest|kg|flott", "Archimède"], ["charles", "Température (kelvins)", "kelvin|°c|charles|temperat", "kelvins"], ["dalton", "MOD et EAD", "mod|ead|nitrox|pp ?o2|fraction", "MOD"], ["optique", "Optique et réfraction", "refraction|indice|vision|champ|masque", "réfraction"]],
    "n4-accidents": [["meca", "Barotraumatismes", "barotrauma|oreille|surpression|mecanique", "Barotraumatismes"], ["gaz", "Toxicité des gaz", "narcose|hyperox|co2|hypercap|essouffl|monoxyde|biochim", "Toxicité"], ["add", "ADD : mécanisme et formes", "add|bulle|medullaire|foramen|sursaturation|neurolog", "ADD"], ["milieu", "Noyade, froid, conduite du guide", "noyade|hypotherm|froid|guide|compte|surface", "Noyade"]],
    "n4-modeles": [["haldane", "Compartiments et périodes", "haldane|compartiment|periode|tension|charge", "compartiments"], ["coef", "Sursaturation critique", "coefficient|sursaturation|critique|palier", "coefficient"], ["ordi", "Ordinateurs et prudence", "ordinateur|gf|gradient|prudence|prete", "ordinateurs"], ["bulles", "Modèles à bulles et profils", "bulle|profond|inverse|carre|profil", "bulles"]],
    "n4-materiel": [["det", "Fonctionnement du détendeur", "etage|membrane|piston|clapet|moyenne pression|compense", "1er étage"], ["pannes", "Pannes et réflexes", "debit continu|givr|dur|inflateur|panne|bloque", "Givrage"], ["compr", "Compresseur et qualité de l’air", "compresseur|filtre|huile|etage|odeur", "compresseur"]],
    "n4-resp": [["civ", "Civile et pénale", "civile|penale|assur|indemn|personnelle", "Civile"], ["faute", "Faute et obligation de moyens", "moyens|prudent|faute|juge|mise en danger|non-assistance|assistance", "obligation de moyens"], ["cadre", "Cadre et prérogatives", "prerogativ|code du sport|dp|directeur|refuser|consigne", "Respecter"]],
    "n4-milieu": [["maree", "Marées et douzièmes", "maree|douzieme|marnage|coefficient|etale|vives|mortes", "marées"], ["vent", "Vent, houle, météo", "vent|beaufort|houle|meteo|bulletin|terre", "Beaufort"], ["courant", "Courants et visibilité", "courant|visibil|mediterranee|face", "courants"]]
  });
})();
