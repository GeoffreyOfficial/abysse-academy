/* Abysse Academy · contenu FR · N4 (guide de palanquée), E2 et Nitrox approfondis (1.5)
   Complète content/fr/n4.js sans le réordonner. À faire valider par ton moniteur. */
(function () {
  "use strict";
  const C = AA.content;

  /* ================= N4 · guide de palanquée ================= */
  C.extend("n4-guide", {
    essentiel: `
<h3>Le briefing en 6 points (méthode)</h3>
<ol><li><b>Le site</b> : fond, relief, courant, repères, point de sortie.</li><li><b>Les paramètres</b> : profondeur maximale, durée, pression de début de remontée.</li><li><b>L’ordre de la palanquée</b> : qui est à côté de qui.</li><li><b>Les signes</b> : rappel des principaux, en particulier « combien d’air ? », « ça ne va pas », « on remonte ».</li><li><b>Les incidents</b> : perte de palanquée, panne d’air, procédure de remontée.</li><li><b>Les questions</b> : on vérifie que tout le monde a compris.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple de briefing</span>« On descend le long du mouillage jusqu’à 25 m, on suit le tombant à gauche, demi-tour à 120 bar ou à 25 minutes. Je demande les pressions toutes les 5 minutes. Si vous me perdez : une minute de recherche, puis remontée lente et rendez-vous sous le bateau. Des questions ? »</div>
<h3>Placer ses plongeurs</h3>
<p>Le guide se place pour <b>voir tout le monde</b> : en général légèrement devant et au-dessus, en se retournant souvent. Le plongeur le plus fragile reste <b>près du guide</b>. Dans le courant, on progresse en se protégeant derrière les reliefs.</p>`,
    approfondir: `
<h3>Anticiper plutôt que réagir</h3>
<p>Un bon guide voit le problème <b>avant</b> qu’il arrive : une respiration qui s’accélère, un plongeur qui palme beaucoup, qui se tient mal (lest), qui regarde trop souvent vers la surface. Il ralentit, se rapproche, demande « ça va ? », et adapte la plongée sans attendre l’incident.</p>
<h3>Le stress du plongeur encadré</h3>
<p>Le stress augmente la consommation, l’essoufflement et le risque de remontée rapide. Un ton calme au briefing, des gestes lents et une plongée à la portée de tous font partie de la sécurité.</p>`,
    memo: [["Briefing", "Site, paramètres, ordre, signes, incidents, questions."], ["Position", "Voir tout le monde, le plus fragile près du guide."], ["Anticiper", "Respiration, palmage, regard vers la surface."]],
    quiz: [
      { q: "Le plongeur le plus fragile de la palanquée se place…", c: ["loin derrière", "près du guide", "en tête, seul", "n’importe où"], a: 1, e: "Le guide garde sous ses yeux celui qui risque le plus d’avoir un problème." },
      { q: "Un plongeur encadré palme beaucoup et respire vite. Le guide…", c: ["accélère pour finir vite", "ralentit, se rapproche et vérifie que tout va bien", "l’ignore", "lui fait signe de remonter seul"], a: 1, e: "Signes d’effort et d’essoufflement possible : on ralentit et on anticipe." },
      { q: "Pourquoi demander « des questions ? » à la fin du briefing ?", c: ["Pour vérifier que tout le monde a compris", "Par politesse seulement", "Pour gagner du temps", "Ce n’est pas utile"], a: 0, e: "Un briefing mal compris est un briefing inutile." },
      { q: "Dans le courant, la palanquée progresse…", c: ["en pleine eau face au courant", "en s’abritant derrière les reliefs", "le plus vite possible", "en surface"], a: 1, e: "Les reliefs protègent du courant et économisent l’effort et l’air." },
      { q: "Le stress d’un plongeur encadré augmente…", c: ["sa consommation et le risque de remontée rapide", "sa flottabilité", "son autonomie", "rien"], a: 0, e: "Le stress fait respirer plus vite et pousse à remonter : le guide rassure et adapte.", lvl: 2 }
    ]
  });

  C.extend("n4-air", {
    essentiel: `
<h3>Méthode : quand faire demi-tour ?</h3>
<ol><li>Repère le <b>plus gros consommateur</b> (pressions demandées tôt).</li><li>Calcule l’air dont il a besoin pour <b>revenir, remonter et faire les paliers</b>, plus une marge.</li><li>Ajoute ce besoin à la pression de fin de plongée prévue : c’est sa <b>pression de demi-tour</b>.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple</span>Bloc 15 L, retour prévu en 8 minutes à 25 m (3,5 bar), conso 22 L/min en surface. Air du retour : 22 × 3,5 × 8 = 616 L, soit environ 41 bar. Si la remontée doit commencer à 80 bar, le demi-tour se fait vers <b>120 bar</b> (80 + 41, arrondi).</div>`,
    quiz: [
      { q: "La pression de demi-tour se calcule pour…", c: ["le plongeur qui consomme le moins", "le plongeur qui consomme le plus", "le guide uniquement", "le bloc le plus gros"], a: 1, e: "C’est le plus gros consommateur qui arrive le premier à sa limite." },
      { q: "Retour de 10 minutes à 20 m, conso 20 L/min, bloc 12 L. Air du retour environ ?", c: ["≈ 25 bar", "≈ 50 bar", "≈ 100 bar", "≈ 17 bar"], a: 1, e: "20 × 3 × 10 = 600 L. 600 ÷ 12 = 50 bar." }
    ]
  });

  C.extend("n4-assistance", {
    essentiel: `
<h3>Les situations à reconnaître</h3>
<div class="tbl"><table><tr><th>Situation</th><th>Signes</th><th>Réponse du guide</th></tr>
<tr><td>Essoufflement</td><td>Respiration rapide, regard inquiet, bulles en continu</td><td>Arrêter l’effort, contact, remonter de quelques mètres, expirations longues</td></tr>
<tr><td>Panne d’air</td><td>Signe « plus d’air », panique possible</td><td>Donner sa source de secours, contrôler, remontée</td></tr>
<tr><td>Narcose</td><td>Comportement anormal, réponses lentes</td><td>Remonter de quelques mètres avec le plongeur</td></tr>
<tr><td>Perte de connaissance</td><td>Plongeur inerte, détendeur parfois hors de la bouche</td><td>Remontée assistée immédiate, puis secours (RIFAP)</td></tr></table></div>
<p>Dans tous les cas : <b>contact physique</b>, <b>contrôle de la respiration</b>, puis décision de remonter ou non.</p>`,
    quiz: [
      { q: "Un plongeur est inerte au fond, détendeur hors de la bouche. Le guide…", c: ["attend qu’il se réveille", "le remonte immédiatement en l’assistant", "fait un palier avec lui", "remonte seul chercher de l’aide"], a: 1, e: "Perte de connaissance sous l’eau : remontée assistée sans attendre, puis secours." },
      { q: "Face à un essoufflement, la première action est…", c: ["d’arrêter l’effort et de rassurer", "de remonter le plus vite possible", "de donner son masque", "de continuer"], a: 0, e: "On supprime la cause (effort), on rassure et on remonte de quelques mètres." }
    ]
  });

  C.extend("n4-orga", {
    essentiel: `
<h3>La palanquée encadrée, en pratique</h3>
<p>Le nombre de plongeurs encadrés par un guide est <b>limité</b> par le Code du sport, selon l’espace et le niveau des plongeurs (souvent 4 plongeurs encadrés, parfois avec un serre-file). Les débutants sont encadrés dans des espaces plus petits. <i>Chiffres exacts : à faire valider par ton moniteur.</i></p>
<h3>Le guide et le DP</h3>
<p>Le guide reçoit du DP : la composition de la palanquée, la profondeur et la durée maximales. Il rend compte au retour : <b>heure de sortie, profondeur atteinte, durée, paliers</b> et incidents éventuels.</p>`,
    quiz: [
      { q: "Au retour, le guide rend compte au DP de…", c: ["la profondeur, la durée, les paliers et les incidents", "la couleur de l’eau", "uniquement des poissons vus", "rien"], a: 0, e: "La fiche de sécurité doit être complète : c’est aussi une information pour les secours si besoin." }
    ]
  });

  C.module({
    id: "n4-deco", world: "n4", depth: "−45 m", icon: "timer",
    title: "Décompression du guide",
    sub: "Gérer les paliers de toute une palanquée",
    essentiel: `
<p>Le guide gère la décompression <b>de tous ses plongeurs</b>. Chacun a son ordinateur, avec des réglages et des profils parfois différents.</p>
<h3>Les règles du guide</h3>
<ul><li>Choisir un profil de plongée qui <b>reste dans la courbe de sécurité</b> si des plongeurs débutants sont encadrés.</li><li>Faire remonter la palanquée <b>groupée</b>, à vitesse lente, le guide contrôlant la vitesse.</li><li>Aux paliers, suivre <b>l’ordinateur le plus pénalisant</b> de la palanquée.</li><li>Surveiller les plongeurs pendant le palier : flottabilité, froid, air.</li></ul>
<h3>Plongée « en yo-yo »</h3>
<p>Les montées et descentes répétées favorisent les bulles. Le guide conduit un profil <b>du plus profond vers le moins profond</b>, sans remonter puis redescendre.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Deux plongeurs ont 3 minutes de palier à 3 m, un troisième 6 minutes. Toute la palanquée fait <b>6 minutes</b> : on ne laisse personne seul au palier.</div>`,
    approfondir: `
<h3>Pourquoi un profil « inversé » est dangereux</h3>
<p>Descendre profond en fin de plongée, alors que le corps est déjà chargé en azote, augmente le risque : les petites bulles formées au début peuvent être comprimées puis grossir à la remontée. On termine toujours <b>par le plus haut</b>.</p>`,
    memo: [["Ordinateur", "On suit le plus pénalisant."], ["Profil", "Du plus profond au moins profond, pas de yo-yo."], ["Palier", "Toute la palanquée ensemble."]],
    moniteur: ["Quelle vitesse de remontée et quels paliers de principe applique-t-on avec des débutants ?"],
    quiz: [
      { q: "Au palier, la palanquée suit…", c: ["l’ordinateur le moins pénalisant", "l’ordinateur le plus pénalisant", "la moyenne", "le guide seul"], a: 1, e: "Personne ne fait moins que ce que demande son ordinateur." },
      { q: "Un profil en « yo-yo »…", c: ["favorise la formation de bulles", "est recommandé", "économise l’air", "n’a aucun effet"], a: 0, e: "Les remontées et redescentes répétées sont à éviter." },
      { q: "Un plongeur a 6 min de palier, les autres 3 min. La palanquée…", c: ["fait 6 min ensemble", "laisse le plongeur seul", "fait 3 min", "remonte sans palier"], a: 0, e: "On reste groupé : on suit le plus long." },
      { q: "Le profil conseillé est…", c: ["du plus profond vers le moins profond", "du moins profond vers le plus profond", "au hasard", "toujours à la même profondeur"], a: 0, e: "On commence profond et on termine plus haut." },
      { q: "Pourquoi éviter de redescendre profond en fin de plongée ?", c: ["Les bulles déjà formées peuvent grossir à la remontée suivante", "On consomme moins", "Le courant change", "Ce n’est pas un problème"], a: 0, e: "Le profil inversé augmente le risque d’accident de décompression.", lvl: 2 }
    ]
  });

  C.module({
    id: "n4-physio", world: "n4", depth: "−50 m", icon: "heart",
    title: "Physiologie et accidents (niveau guide)",
    sub: "Comprendre pour prévenir chez les autres",
    essentiel: `
<p>Le guide doit <b>reconnaître tôt</b> les problèmes chez des plongeurs moins expérimentés.</p>
<div class="tbl"><table><tr><th>Accident</th><th>Mécanisme</th><th>Ce que voit le guide</th></tr>
<tr><td>Barotraumatisme d’oreille</td><td>Pression mal équilibrée</td><td>Plongeur qui s’arrête, se tient l’oreille, descend mal</td></tr>
<tr><td>Surpression pulmonaire</td><td>Expiration bloquée à la remontée</td><td>Remontée paniquée, détendeur lâché</td></tr>
<tr><td>Essoufflement</td><td>CO₂ en excès</td><td>Respiration rapide, agitation</td></tr>
<tr><td>Narcose</td><td>Azote sous pression</td><td>Comportement inhabituel</td></tr>
<tr><td>ADD</td><td>Bulles d’azote</td><td>Après la plongée : fatigue anormale, douleurs, troubles</td></tr>
<tr><td>Hypothermie</td><td>Froid</td><td>Frissons, gestes maladroits</td></tr></table></div>
<h3>Le rôle du guide après la plongée</h3>
<p>Il observe ses plongeurs <b>après la sortie</b> : un ADD peut apparaître dans les minutes ou les heures qui suivent. Un plongeur qui « ne se sent pas bien » est pris au sérieux : oxygène et avis médical.</p>`,
    memo: [["Avant", "Reconnaître les signes chez les autres."], ["Après", "Observer : l’ADD peut arriver plus tard."], ["Doute", "Oxygène et avis médical."]],
    quiz: [
      { q: "Un plongeur se tient l’oreille et n’arrive pas à descendre. Le guide…", c: ["le pousse vers le bas", "remonte un peu avec lui pour qu’il équilibre", "continue sans lui", "lui dit de forcer"], a: 1, e: "On remonte de quelques mètres et on laisse le temps d’équilibrer. Jamais forcer." },
      { q: "Après la plongée, un plongeur se dit très fatigué et a mal à l’épaule. Le guide…", c: ["lui conseille une sieste", "pense à un ADD : oxygène et avis médical", "l’ignore", "lui propose de replonger"], a: 1, e: "Un doute d’ADD se traite : oxygène, alerte, avis médical." },
      { q: "Des frissons et des gestes maladroits sous l’eau évoquent…", c: ["l’hypothermie", "la narcose seulement", "un ADD", "rien"], a: 0, e: "Le froid rend maladroit : on écourte la plongée." },
      { q: "Pourquoi le guide observe-t-il ses plongeurs après la sortie ?", c: ["Un ADD peut apparaître plus tard", "Pour ranger le matériel", "Par habitude", "Pour la photo"], a: 0, e: "Les signes d’ADD apparaissent souvent après la plongée." }
    ]
  });

  /* ================= E2 · enseigner jusqu'à 20 m ================= */
  C.extend("e2-enseigner20", {
    essentiel: `
<h3>Une séance en milieu naturel, étape par étape</h3>
<ol><li><b>Objectif</b> clair et unique (exemple : « vidage de masque à 10 m »).</li><li><b>Briefing</b> à terre : démonstration, critères de réussite, signes.</li><li><b>Exercice</b> sous l’eau : démonstration, essai de l’élève, correction.</li><li><b>Débriefing</b> : ce qui est réussi, ce qui reste à travailler, prochaine étape.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple d’objectif bien écrit</span>« À la fin de la séance, l’élève sait lâcher et reprendre son détendeur à 6 m, sans remonter et sans paniquer, trois fois de suite. »</div>
<h3>Progresser du plus facile au plus difficile</h3>
<p>Piscine → fond de sable peu profond → milieu naturel plus profond. Un exercice est maîtrisé quand il est réussi <b>calmement et plusieurs fois</b>.</p>`,
    quiz: [
      { q: "Un bon objectif de séance est…", c: ["clair, unique et vérifiable", "vague pour s’adapter", "une liste de dix exercices", "secret"], a: 0, e: "L’élève et le moniteur doivent savoir quand l’objectif est atteint." },
      { q: "Ordre d’une séance ?", c: ["Exercice, briefing, objectif", "Objectif, briefing, exercice, débriefing", "Débriefing d’abord", "Sans ordre"], a: 1, e: "On prépare, on fait, puis on tire les leçons." },
      { q: "Un exercice est maîtrisé quand il est réussi…", c: ["une fois, par chance", "calmement et plusieurs fois", "avec l’aide du moniteur", "en piscine seulement"], a: 1, e: "La répétition calme montre la maîtrise." }
    ]
  });

  C.extend("e2-securite", {
    essentiel: `
<h3>Le rapport élève-moniteur</h3>
<p>En enseignement, le moniteur garde ses élèves <b>à portée de main</b>. Il peut intervenir immédiatement : rattraper un élève qui remonte, lui donner de l’air, le stabiliser.</p>
<h3>Les risques propres à l’enseignement</h3>
<ul><li><b>Remontées répétées</b> lors des exercices (yo-yo) : on limite et on espace.</li><li><b>Fatigue et froid</b> des élèves qui attendent leur tour : séances courtes.</li><li><b>Exercices de panne d’air</b> : toujours contrôlés, jamais improvisés.</li></ul>`,
    quiz: [
      { q: "Pendant un exercice, l’élève reste…", c: ["à portée de main du moniteur", "à 10 m du moniteur", "seul pour apprendre", "en surface"], a: 0, e: "Le moniteur doit pouvoir intervenir immédiatement." },
      { q: "Pourquoi limiter les remontées répétées en séance ?", c: ["Elles favorisent les accidents de décompression", "Elles ennuient l’élève", "Elles usent le matériel", "Sans raison"], a: 0, e: "Les profils en yo-yo augmentent le risque." }
    ]
  });

  C.module({
    id: "e2-evaluer", world: "e2", depth: "−20 m", icon: "check",
    title: "Évaluer et faire progresser",
    sub: "Observer, corriger, valider",
    essentiel: `
<p>Enseigner, c’est aussi <b>savoir dire où en est l’élève</b>.</p>
<h3>Observer</h3>
<p>Le moniteur regarde <b>un point à la fois</b> : la respiration, puis la position, puis le geste. Il note mentalement ce qui est réussi et ce qui ne l’est pas.</p>
<h3>Corriger</h3>
<ul><li>Commencer par ce qui est <b>réussi</b>.</li><li>Une seule correction à la fois, la plus importante pour la sécurité.</li><li>Montrer à nouveau plutôt que longuement expliquer.</li></ul>
<h3>Valider</h3>
<p>Une compétence se valide sur des <b>critères connus</b> à l’avance, en conditions réelles, plusieurs fois. Le carnet de formation garde la trace.</p>
<div class="callout ex"><span class="eyebrow">Exemple de critères</span>Remontée contrôlée de 10 m : vitesse lente régulière, regard vers le haut, expiration, arrêt au repère de 3 m, gilet géré seul.</div>`,
    memo: [["Observer", "Un point à la fois."], ["Corriger", "Réussite d’abord, une correction, démontrer."], ["Valider", "Critères connus, plusieurs fois, trace écrite."]],
    quiz: [
      { q: "Pour corriger un élève, on commence par…", c: ["ce qui est réussi", "toutes les erreurs", "une note sur 20", "rien"], a: 0, e: "Commencer par le positif rend la correction acceptable et motivante." },
      { q: "Combien de corrections à la fois ?", c: ["Une, la plus importante", "Toutes", "Aucune", "Cinq"], a: 0, e: "Trop d’informations noient l’élève." },
      { q: "Une compétence se valide…", c: ["sur des critères connus, plusieurs fois", "sur une impression", "une seule fois", "sans que l’élève le sache"], a: 0, e: "Critères clairs et répétition : la validation est juste et compréhensible." },
      { q: "Pour observer un exercice, le moniteur regarde…", c: ["un point à la fois", "tout en même temps", "seulement le paysage", "seulement le manomètre"], a: 0, e: "On décompose pour bien voir." }
    ]
  });

  /* ================= Nitrox ================= */
  C.extend("nx-base", {
    essentiel: `
<h3>Méthode : la profondeur maximale (MOD)</h3>
<ol><li>Choisis la <b>Pp O₂ maximale</b> (souvent 1,4 ou 1,6 bar selon la fédération et l’usage).</li><li>Divise par la <b>fraction d’O₂</b> : tu obtiens la pression absolue maximale.</li><li>Retire 1 bar (l’air), multiplie par 10.</li><li><b>Arrondis vers le bas</b>.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple</span>Nitrox 33 %, Pp O₂ max 1,4 bar : 1,4 ÷ 0,33 ≈ 4,24 bar ; − 1 = 3,24 ; × 10 ≈ <b>32 m</b>.</div>
<h3>Pourquoi moins d’azote = moins de décompression</h3>
<p>Avec 32 % d’O₂, il n’y a que 68 % d’azote au lieu de 79 %. À la même profondeur, tu dissous moins d’azote : c’est comme si tu plongeais <b>moins profond</b> pour la décompression (profondeur équivalente air).</p>`,
    quiz: [
      { q: "Nitrox 30 %, Pp O₂ max 1,4 bar. MOD environ ?", c: ["36 m", "43 m", "50 m", "26 m"], a: 0, e: "1,4 ÷ 0,30 ≈ 4,67 bar ; − 1 = 3,67 ; × 10 ≈ 36 m." },
      { q: "On arrondit la MOD…", c: ["vers le bas", "vers le haut", "au hasard", "jamais"], a: 0, e: "On reste du côté de la sécurité." }
    ]
  });

  C.extend("nx-securite", {
    essentiel: `
<h3>Les règles d’or du nitrox</h3>
<ul><li><b>Analyser soi-même</b> son bloc avant de plonger et noter le pourcentage.</li><li><b>Régler l’ordinateur</b> sur le bon mélange.</li><li>Ne jamais dépasser la <b>MOD</b> inscrite sur le bloc.</li><li>Utiliser du matériel <b>compatible</b> avec l’oxygène pour les mélanges riches.</li></ul>`,
    quiz: [
      { q: "Qui analyse le mélange du bloc nitrox ?", c: ["Le plongeur lui-même, avant la plongée", "Personne", "Le gonfleur seulement", "L’ordinateur tout seul"], a: 0, e: "Chacun vérifie son gaz : une erreur de mélange peut être grave." },
      { q: "Ton ordinateur est réglé sur l’air mais tu plonges au nitrox 32. Conséquence ?", c: ["Il calcule une décompression plus prudente mais ne surveille pas ta Pp O₂", "Rien", "Il explose", "Il te donne trop de temps"], a: 0, e: "Il ne surveillera pas la toxicité de l’oxygène : réglage toujours sur le bon mélange.", lvl: 2 }
    ]
  });

  C.module({
    id: "nx-pratique", world: "nitrox", depth: "−35 m", icon: "tank",
    title: "Le nitrox en pratique",
    sub: "Analyser, marquer, régler, plonger",
    essentiel: `
<h3>Avant la plongée</h3>
<ol><li><b>Analyse</b> : l’analyseur se calibre à l’air (21 %), puis on mesure le bloc. On note le pourcentage, la MOD, la date et son nom sur l’étiquette ou le registre.</li><li><b>Marquage</b> : un bloc nitrox est identifié (bande, étiquette) pour ne pas être confondu avec un bloc d’air.</li><li><b>Ordinateur</b> : régler le pourcentage d’O₂ et la Pp O₂ maximale.</li></ol>
<h3>Pendant la plongée</h3>
<p>On respecte la <b>MOD</b>. L’ordinateur alerte si la Pp O₂ devient trop forte. La décompression est plus courte à profondeur égale, mais on garde les bonnes habitudes (vitesse lente, palier de principe).</p>
<h3>Après</h3>
<p>Le nitrox ne supprime pas le risque d’accident de décompression : il le réduit si on garde le même profil qu’à l’air.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Bloc analysé à 31,6 % : on retient 32 % pour régler l’ordinateur ? Non : on règle <b>la valeur mesurée</b> (31 ou 32 % selon l’ordinateur, en restant prudent) et on calcule la MOD avec elle.</div>`,
    memo: [["Analyse", "Calibrer à 21 %, mesurer, noter."], ["Marquage", "Bloc nitrox identifié."], ["Ordinateur", "Bon pourcentage, bonne Pp O₂ max."]],
    quiz: [
      { q: "On calibre l’analyseur d’oxygène…", c: ["à l’air (21 %)", "dans l’eau", "à 100 % uniquement", "jamais"], a: 0, e: "La référence la plus simple est l’air ambiant à 21 %." },
      { q: "Pourquoi marquer un bloc nitrox ?", c: ["Pour ne pas le confondre avec un bloc d’air", "Pour la décoration", "Pour le peser", "Sans raison"], a: 0, e: "Une confusion de bloc peut fausser la MOD et l’ordinateur." },
      { q: "Le nitrox supprime-t-il le risque d’ADD ?", c: ["Non, il le réduit si le profil reste celui de l’air", "Oui, totalement", "Il l’augmente", "Il n’a aucun lien"], a: 0, e: "Moins d’azote, moins de risque, mais jamais zéro." },
      { q: "Sur l’étiquette d’analyse, on note…", c: ["le pourcentage, la MOD, la date, le nom", "la couleur du bloc", "la météo", "rien"], a: 0, e: "La trace écrite évite les erreurs." }
    ]
  });


  /* Compléments de questions des nouveaux thèmes */
  C.addQuestions("n4-deco", [
    { q: "Qui contrôle la vitesse de remontée de la palanquée ?", c: ["Le guide", "Le plus rapide", "Chacun pour soi", "Le bateau"], a: 0, e: "Le guide fixe et contrôle une vitesse lente, palanquée groupée." }
  ]);
  C.addQuestions("n4-physio", [
    { q: "Un plongeur encadré lâche son détendeur et fonce vers la surface. Risque principal ?", c: ["La surpression pulmonaire", "La narcose", "Le froid", "Aucun"], a: 0, e: "Remontée paniquée, souvent poumons bloqués : risque majeur de surpression pulmonaire." },
    { q: "Un comportement inhabituel à 38 m chez un plongeur encadré évoque d’abord…", c: ["la narcose", "un ADD", "le mal de mer", "la faim"], a: 0, e: "À cette profondeur, la narcose est la première hypothèse : on remonte de quelques mètres." }
  ]);
  C.addQuestions("e2-evaluer", [
    { q: "Où garde-t-on la trace des compétences validées ?", c: ["Dans le carnet de formation", "Nulle part", "Dans sa tête", "Sur le bloc"], a: 0, e: "Le carnet suit la progression d’un moniteur à l’autre." },
    { q: "Plutôt que de longues explications, il vaut souvent mieux…", c: ["montrer à nouveau le geste", "parler plus fort", "passer à autre chose", "noter l’élève"], a: 0, e: "La démonstration est plus efficace qu’un long discours sous l’eau." }
  ]);
  C.addQuestions("nx-pratique", [
    { q: "Avant de plonger au nitrox, l’ordinateur doit être réglé sur…", c: ["le pourcentage d’O₂ mesuré et la Pp O₂ max", "l’air", "la température", "la date"], a: 0, e: "Sinon il ne surveille ni la toxicité de l’oxygène ni la bonne décompression." },
    { q: "Ton bloc est analysé à 34 %. Ce qui est écrit sur l’étiquette de la veille indique 32 %. Tu retiens…", c: ["34 %, ta propre mesure", "32 %, c’est écrit", "21 %", "la moyenne"], a: 0, e: "On se fie à sa propre analyse du jour : la MOD change avec le mélange." }
  ]);


  /* 1.5 · questions en plus (E2 et Nitrox) */
  C.addQuestions("e2-enseigner20", [
    { q: "Un élève réussit l’exercice en piscine mais panique à 8 m en mer. Tu…", c: ["reviens à une profondeur plus faible et refais l’étape", "insistes à 8 m", "valides quand même", "arrêtes la formation"], a: 0, e: "On revient à l’étape où l’élève réussit, puis on progresse doucement." },
    { q: "Pourquoi un briefing à terre avant l’exercice ?", c: ["Sous l’eau, on ne peut presque pas expliquer", "Pour gagner du temps sous l’eau seulement", "Par tradition", "Ce n’est pas utile"], a: 0, e: "Tout ce qui peut être expliqué se fait à terre : sous l’eau on montre et on corrige." },
    { q: "L’E2 enseigne jusqu’à…", c: ["6 m", "20 m", "40 m", "60 m"], a: 1, e: "L’E2 enseigne jusqu’à 20 m, sous l’autorité d’un moniteur (à faire valider)." }
  ]);
  C.addQuestions("e2-securite", [
    { q: "Un élève a froid au milieu de la séance. Tu…", c: ["écourtes la séance", "continues comme prévu", "lui demandes de palmer plus vite", "descends plus profond"], a: 0, e: "Le froid augmente les risques : on écourte." },
    { q: "Avant un exercice de panne d’air, on vérifie…", c: ["que l’élève connaît le signe et la procédure", "la météo de demain", "rien de particulier", "la couleur de son masque"], a: 0, e: "Un exercice de panne d’air est préparé et contrôlé." }
  ]);
  C.addQuestions("e2-evaluer", [
    { q: "Un critère de réussite doit être…", c: ["observable", "secret", "flou", "le même pour tous les exercices"], a: 0, e: "On doit pouvoir voir si l’élève l’atteint ou non." },
    { q: "Le débriefing se fait…", c: ["juste après la séance, à chaud mais au calme", "une semaine plus tard", "jamais", "sous l’eau"], a: 0, e: "Le souvenir est frais : on fixe ce qui a été appris." },
    { q: "Valoriser un progrès sert à…", c: ["motiver et fixer le bon geste", "flatter seulement", "perdre du temps", "rien"], a: 0, e: "Ce qui est reconnu se répète." }
  ]);
  C.addQuestions("nx-base", [
    { q: "Nitrox 36 %, Pp O₂ max 1,6 bar. MOD environ ?", c: ["34 m", "44 m", "54 m", "28 m"], a: 0, e: "1,6 ÷ 0,36 ≈ 4,44 bar ; − 1 = 3,44 ; × 10 ≈ 34 m." },
    { q: "Un nitrox contient…", c: ["plus d’oxygène et moins d’azote que l’air", "moins d’oxygène que l’air", "de l’hélium", "uniquement de l’oxygène"], a: 0, e: "Air enrichi en oxygène : l’azote diminue d’autant." },
    { q: "Plus le pourcentage d’O₂ est élevé, plus la MOD…", c: ["diminue", "augmente", "ne change pas", "dépend de la température"], a: 0, e: "L’oxygène atteint plus vite sa Pp limite : la profondeur maximale baisse." }
  ]);
  C.addQuestions("nx-securite", [
    { q: "Dépasser la MOD expose surtout à…", c: ["la toxicité neurologique de l’oxygène", "la narcose seule", "l’hypothermie", "rien"], a: 0, e: "Au-delà de la MOD, la Pp O₂ dépasse la limite choisie : risque de convulsions." },
    { q: "Avec du nitrox, la narcose…", c: ["existe toujours (l’oxygène peut aussi être narcotique)", "disparaît totalement", "augmente forcément", "n’existe qu’en surface"], a: 0, e: "On reste prudent : le nitrox n’est pas un mélange « anti-narcose »." }
  ]);
  C.addQuestions("nx-pratique", [
    { q: "Analyse : l’analyseur affiche 23 % à l’air libre. Tu…", c: ["le recalibres avant de mesurer ton bloc", "mesures ton bloc quand même", "ajoutes 2 % au résultat", "ignores"], a: 0, e: "À l’air, il doit indiquer 21 % : sinon on recalibre." }
  ]);


  C.addQuestions("nx-pratique", [
    { q: "Sur l’étiquette d’un bloc nitrox, on note au minimum…", c: ["le % d’O₂ analysé, la MOD, la date et le nom de qui a analysé", "seulement la couleur du bloc", "la marque du détendeur", "rien, l’analyse suffit"], a: 0, e: "L’étiquette permet à chacun de vérifier le mélange avant de plonger." },
    { q: "Qui doit analyser le mélange avant la plongée ?", c: ["le plongeur qui va l’utiliser", "uniquement le gonfleur", "personne", "le binôme seulement après la plongée"], a: 0, e: "On analyse soi-même son bloc : c’est la règle de base du nitrox." },
    { q: "Ton ordinateur est réglé sur l’air alors que tu plonges au nitrox 32 %. Conséquence ?", c: ["il est plus prudent sur la désaturation mais ne surveille pas ta Pp O₂", "il est dangereux pour la désaturation", "aucune différence", "il refuse de s’allumer"], a: 0, e: "Mieux vaut le régler sur le bon mélange pour suivre la MOD et l’oxygène (à faire valider)." }
  ]);

  /* Calculs en plus */
  const u = AA.u, G = AA.game, PK = u.pick, N = u.num, M = (...a) => G.mkCalc(...a);
  C.addGenerators({
    n4demi: { m: "n4-air", make: () => { const V = PK([12, 15]), d = PK([20, 25, 30, 35]), c = PK([18, 20, 22, 25]), tr = PK([5, 6, 8, 10]), Pr = PK([70, 80, 100]); const p = 1 + d / 10, b = Math.ceil(c * p * tr / V);
      return M(`Bloc ${V} L. Retour prévu de ${tr} min à ${d} m, conso ${c} L/min en surface, remontée à ${Pr} bar. Pression de demi-tour environ ?`, Pr + b, [Pr, Pr + Math.ceil(c * tr / V), Pr + 2 * b], ` bar`, `Air du retour = ${c} × ${N(p)} × ${tr} = ${N(c * p * tr)} L, soit ${N(c * p * tr)} ÷ ${V} ≈ ${b} bar. Demi-tour = ${Pr} + ${b} = ${Pr + b} bar.`, 0); } }
  });
  C.byId["n4-air"].gen.push("n4demi");
})();
