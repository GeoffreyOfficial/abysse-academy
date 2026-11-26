/* Abysse Academy · contenu FR · Monde N4 (guide de palanquée) et E2
   Contenu écrit pour l'appli, à faire valider par un moniteur.
   Questions : ajoute à la fin d'un module, ne réordonne jamais. */
AA.content.module({
  id: "n4-guide", world: "n4", depth: "−20 m", icon: "compass",
  title: "Le rôle du guide",
  sub: "Responsable de la palanquée sous l’eau",
  essentiel: `
<p>Le <b>guide de palanquée</b> (N4) conduit des plongeurs <b>encadrés</b> sous l’eau. Il est responsable du <b>déroulement de la plongée</b> et de la <b>sécurité de sa palanquée</b>, dans le cadre fixé par le directeur de plongée. <i>Prérogatives exactes et profondeurs : à vérifier selon la fédération et le Code du sport.</i></p>
<h3>Avant</h3><ul><li>Connaître le niveau, l’expérience et l’état de forme de chacun.</li><li>Vérifier le matériel et l’air de tous.</li><li>Faire un <b>briefing</b> clair : site, profondeur, durée, signes, consignes de sécurité.</li></ul>
<h3>Pendant</h3><ul><li>Garder la palanquée <b>groupée</b>, adapter le rythme au plus faible.</li><li>Surveiller <b>en continu</b> : comportement, respiration, air (demander les pressions).</li><li>Respecter les paramètres et <b>anticiper</b> le retour.</li></ul>
<h3>Après</h3><ul><li><b>Débriefing</b>, compte rendu au DP (paramètres, incidents).</li></ul>
<div class="callout trap"><span class="eyebrow">L’esprit du guide</span>Le guide ne plonge pas pour lui. Il <b>regarde ses plongeurs plus que le paysage</b>, et il décide de faire demi-tour <b>avant</b> que ce soit nécessaire.</div>`,
  memo: [["Rôle", "Conduire et sécuriser des plongeurs encadrés."], ["Avant", "Connaître, vérifier, briefer."], ["Pendant", "Groupés, surveiller, anticiper."], ["Après", "Débrief, compte rendu au DP."]],
  moniteur: ["Quelles sont exactement les prérogatives du guide de palanquée dans notre fédération ?"],
  quiz: [
    { q: "Le guide de palanquée est responsable…", c: ["de l’organisation de tout le club", "du déroulement de la plongée et de la sécurité de sa palanquée", "du bateau", "de rien sous l’eau"], a: 1, e: "Il conduit sa palanquée dans le cadre fixé par le directeur de plongée." },
    { q: "Le rythme de la palanquée s’adapte…", c: ["au plongeur le plus rapide", "au plongeur le plus faible", "au guide seulement", "au courant uniquement"], a: 1, e: "On adapte toujours la plongée à celui qui a le plus de difficultés." },
    { q: "Pendant la plongée, le guide surveille surtout…", c: ["le paysage", "ses plongeurs : comportement, respiration, air", "son appareil photo", "le bateau"], a: 1, e: "La surveillance continue permet de détecter un problème avant qu’il ne devienne grave." },
    { q: "Que contient un bon briefing ?", c: ["Site, profondeur, durée, signes, consignes de sécurité", "Seulement l’heure du repas", "Rien, on improvise", "La météo de la semaine"], a: 0, e: "Chacun doit savoir ce qui va se passer et quoi faire en cas de problème." },
    { q: "Après la plongée, le guide…", c: ["rentre chez lui", "fait le débriefing et un compte rendu au DP", "repart plonger seul", "range seulement le matériel"], a: 1, e: "Le DP doit connaître les paramètres réels et les incidents." },
    { q: "Quand décider du demi-tour ?", c: ["Quand le premier plongeur est sur la réserve", "Selon un plan prévu, avant d’être juste en air", "Jamais", "Quand le guide a froid"], a: 1, e: "On anticipe : le retour se prévoit avant le manque d’air." }
  ]
});

AA.content.module({
  id: "n4-air", world: "n4", depth: "−30 m", icon: "gauge",
  title: "Gérer l’air d’une palanquée",
  sub: "Le plus gros consommateur décide",
  gen: ["n4pal"],
  essentiel: `
<p>Dans une palanquée, la durée de plongée se règle sur <b>celui qui consomme le plus</b> (ou qui a le moins d’air).</p>
<ol><li>Demander les pressions <b>régulièrement</b>, surtout au début (repérer le gros consommateur).</li>
<li>Prévoir <b>l’air de la remontée et des paliers</b> pour le plus gros consommateur.</li>
<li>Garder une <b>marge</b> pour un partage d’air : deux plongeurs sur un seul bloc consomment double.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>À 30 m (4 bar), un plongeur consomme 25 L/min en surface, soit 100 L/min. Avec un 12 L, cela fait environ <b>8,3 bar par minute</b>. Un autre consomme 15 L/min (60 L/min, 5 bar/min dans un 12 L). <b>C’est le premier qui fixe le demi-tour.</b></div>
<div class="callout trap"><span class="eyebrow">Partage d’air</span>Si un plongeur tombe en panne d’air au fond, le donneur fournit l’air pour deux. Il faut que la remontée soit possible <b>avec l’air d’un seul bloc</b>.</div>`,
  memo: [["Règle", "Le plus gros consommateur fixe la durée."], ["Pressions", "Les demander souvent, surtout au début."], ["Partage", "Un bloc doit pouvoir remonter deux plongeurs."], ["Marge", "Toujours."]],
  moniteur: ["Quelle pression de début de remontée applique-t-on au club pour les palanquées encadrées ?"],
  quiz: [
    { q: "Qui fixe la durée de plongée d’une palanquée ?", c: ["Le guide seul", "Le plongeur qui consomme le plus", "Le plus expérimenté", "Celui qui a le plus gros bloc"], a: 1, e: "On se règle sur celui qui aura besoin de remonter le premier." },
    { q: "Lors d’un partage d’air, la consommation sur le bloc du donneur…", c: ["est divisée par deux", "double environ", "ne change pas", "devient nulle"], a: 1, e: "Deux plongeurs respirent sur le même bloc : la conso est environ doublée, voire plus avec le stress." },
    { q: "À 30 m, un plongeur consomme 20 L/min en surface avec un 12 L. Environ combien de bar par minute ?", c: ["≈ 1,7", "≈ 5", "≈ 6,7", "≈ 10"], a: 2, e: "20 × 4 = 80 L/min ; 80 ÷ 12 ≈ 6,7 bar/min." },
    { q: "Pourquoi demander les pressions tôt dans la plongée ?", c: ["Pour repérer le gros consommateur et anticiper", "Pour faire la conversation", "Ce n’est pas utile", "Pour remplir le carnet"], a: 0, e: "Plus tôt on connaît les consommations, mieux on planifie le retour." },
    { q: "Le plan d’air d’une palanquée doit prévoir…", c: ["seulement la descente", "la remontée, les paliers et une marge pour un incident", "uniquement le palier", "rien"], a: 1, e: "Un incident au fond (partage d’air) doit rester gérable." },
    { q: "Un plongeur annonce 100 bar alors que les autres ont 150 bar. Le guide…", c: ["continue comme prévu", "adapte la suite de la plongée à ce plongeur", "lui dit de respirer moins", "l’ignore"], a: 1, e: "Il faut réviser le plan en fonction de l’air le plus bas." }
  ]
});

AA.content.module({
  id: "n4-assistance", world: "n4", depth: "−35 m", icon: "buoy",
  title: "Assister un plongeur",
  sub: "Remontée assistée, prise en charge",
  essentiel: `
<p>Le guide doit savoir <b>ramener en surface</b> un plongeur en difficulté, puis le <b>prendre en charge</b>.</p>
<h3>Sous l’eau</h3><ul><li><b>Contrôler</b> le plongeur (bonne prise, face à face ou de côté).</li><li>Assurer sa <b>respiration</b> (détendeur en bouche, partage d’air si besoin).</li><li><b>Remonter à vitesse contrôlée</b> en gérant les deux gilets, et en restant attentif à la palanquée.</li></ul>
<h3>En surface</h3><ul><li><b>Flottabilité positive</b> pour la victime et pour soi (gonfler les gilets, larguer le lest si nécessaire).</li><li>Se <b>signaler</b> au bateau (signe de détresse).</li><li>Tracter jusqu’au bateau, aider à la sortie, puis les gestes du RIFAP.</li></ul>
<div class="callout trap"><span class="eyebrow">Ne pas oublier</span>Le reste de la palanquée ! L’intervention ne doit pas mettre en danger les autres plongeurs.</div>`,
  memo: [["Contrôler", "Bonne prise sur la victime."], ["Respirer", "Détendeur en bouche, partage si besoin."], ["Remonter", "Vitesse contrôlée, gilets gérés."], ["Surface", "Flottabilité, signaler, tracter, secourir."]],
  moniteur: ["Quelle technique de remontée assistée travaille-t-on au club ?"],
  quiz: [
    { q: "Première chose en surface avec une victime ?", c: ["Retirer ses palmes", "Assurer la flottabilité de la victime et la sienne", "Faire un palier", "Retourner chercher la palanquée"], a: 1, e: "On gonfle les gilets (et on largue le lest si besoin) pour garder les voies respiratoires hors de l’eau." },
    { q: "Pendant une remontée assistée, la vitesse est…", c: ["la plus rapide possible", "contrôlée en gérant les deux gilets", "nulle", "fixée par la victime"], a: 1, e: "On évite une remontée incontrôlée, dangereuse pour les deux." },
    { q: "Comment se signaler au bateau en surface ?", c: ["Bras qui s’agite (détresse)", "Grand rond au-dessus de la tête", "Pouce levé", "En sifflant seulement"], a: 0, e: "Le bras agité signale la détresse. Le rond veut dire « ça va »." },
    { q: "Pendant l’assistance, le reste de la palanquée…", c: ["doit être pris en compte et rester en sécurité", "n’a pas d’importance", "doit remonter seul et vite", "continue la plongée"], a: 0, e: "Le guide garde la responsabilité de tous ses plongeurs." },
    { q: "Après la sortie de l’eau, on enchaîne avec…", c: ["les gestes de secours du RIFAP et l’alerte", "une nouvelle plongée", "le rangement du matériel", "rien"], a: 0, e: "Bilan, alerte, oxygène, surveillance : la chaîne de secours continue." },
    { q: "La victime n’a plus son détendeur en bouche à la remontée. On…", c: ["remonte quand même vite", "lui remet le détendeur ou lui donne de l’air si possible", "la laisse", "attend au fond"], a: 1, e: "Assurer la respiration fait partie du contrôle de la victime." }
  ]
});

AA.content.module({
  id: "n4-orga", world: "n4", depth: "−40 m", icon: "users",
  title: "Organisation et réglementation",
  sub: "DP, palanquées, matériel de sécurité",
  essentiel: `
<p>Une plongée en club se fait sous l’autorité d’un <b>directeur de plongée (DP)</b>. Il organise, compose les palanquées et fixe les paramètres. Les règles viennent du <b>Code du sport</b> et des fédérations. <i>Les valeurs exactes (taille des palanquées, profondeurs, matériel obligatoire) sont à vérifier sur les textes en vigueur.</i></p>
<div class="tbl"><table><tr><th>Qui</th><th>Rôle</th></tr>
<tr><td>Directeur de plongée</td><td>Organise, compose les palanquées, fixe les paramètres, déclenche les secours.</td></tr>
<tr><td>Guide de palanquée</td><td>Conduit une palanquée encadrée sous l’eau.</td></tr>
<tr><td>Plongeurs autonomes</td><td>Plongent sans guide, dans le cadre fixé par le DP.</td></tr></table></div>
<h3>Le matériel de secours sur le site</h3>
<p>Moyen d’alerte, oxygène (avec masque adapté), trousse de secours, eau, fiche d’évacuation, tablette ou fiche de paramètres. <i>Liste exacte : à vérifier.</i></p>
<h3>La fiche de sécurité</h3>
<p>Le DP note les palanquées, les noms, les niveaux, les paramètres prévus et réalisés. Elle sert à <b>vérifier que tout le monde est revenu</b>.</p>`,
  memo: [["DP", "Organise, compose, fixe les paramètres, déclenche les secours."], ["Guide", "Conduit une palanquée encadrée."], ["Fiche de sécurité", "Qui plonge, avec qui, paramètres prévus et réels."], ["Textes", "Code du sport + fédération : à vérifier."]],
  moniteur: ["Quel matériel de secours est obligatoire sur nos sites de plongée ?", "Combien de plongeurs au maximum dans une palanquée encadrée ?"],
  quiz: [
    { q: "Qui compose les palanquées ?", c: ["Le directeur de plongée", "Le plus ancien du club", "Les plongeurs eux-mêmes, librement", "Le pilote du bateau"], a: 0, e: "Le DP compose les palanquées et fixe leurs paramètres." },
    { q: "À quoi sert la fiche de sécurité ?", c: ["À noter les palanquées et vérifier que tout le monde est revenu", "À noter les poissons vus", "À la comptabilité du club", "À rien"], a: 0, e: "Elle trace qui plonge, avec qui, où, et les paramètres." },
    { q: "D’où viennent les règles d’organisation de la plongée en France ?", c: ["Du Code du sport et des fédérations", "Uniquement des habitudes", "Du fabricant d’ordinateurs", "D’aucune règle"], a: 0, e: "Le Code du sport fixe le cadre ; les fédérations le précisent." },
    { q: "Lequel fait partie du matériel de secours habituel sur le site ?", c: ["Oxygène avec masque adapté", "Un barbecue", "Une seconde paire de palmes", "Un appareil photo"], a: 0, e: "L’oxygène est un élément central du secours en plongée." },
    { q: "Qui déclenche les secours en cas d’accident ?", c: ["Le directeur de plongée (ou par délégation)", "Personne", "Le plongeur accidenté", "La victime à son retour"], a: 0, e: "Le DP organise l’alerte et la prise en charge." },
    { q: "Le guide de palanquée doit respecter…", c: ["les paramètres fixés par le DP", "seulement ses envies", "les paramètres de la palanquée voisine", "aucun paramètre"], a: 0, e: "Le cadre est donné par le DP." }
  ]
});

/* ---------- Monde E2 (enseigner jusqu'à 20 m) ---------- */
AA.content.module({
  id: "e2-enseigner20", world: "e2", depth: "−15 m", icon: "teach",
  title: "Enseigner jusqu’à 20 m",
  sub: "Progression, démonstration, évaluation",
  essentiel: `
<p>L’E2 enseigne en général jusqu’à <b>20 m</b> (notamment pour le N1). <i>Conditions d’accès et prérogatives exactes : à vérifier.</i></p>
<h3>Une séance réussie</h3>
<ol><li><b>Objectif</b> clair et mesurable (« vider son masque à 6 m sans lâcher la palanquée »).</li>
<li><b>Démonstration</b> lente et parfaite.</li>
<li><b>Essai de l’élève</b>, puis <b>correction</b> sur un seul point à la fois.</li>
<li><b>Répétition</b> jusqu’à l’aisance.</li>
<li><b>Bilan</b> positif et concret.</li></ol>
<h3>Progression</h3><p>Du simple au complexe, du peu profond au plus profond, du statique au dynamique. On ne passe à 20 m que lorsque les gestes sont <b>automatiques</b> à 6 m.</p>
<div class="callout trap"><span class="eyebrow">Sécurité d’abord</span>En exercice, l’enseignant garde le <b>contrôle</b> de l’élève : position, flottabilité, air. Un exercice raté ne doit jamais devenir un incident.</div>`,
  memo: [["Séance", "Objectif, démo, essai, correction, répétition, bilan."], ["Progression", "Simple → complexe, 6 m → 20 m."], ["Correction", "Un seul point à la fois."], ["Sécurité", "Contrôle permanent de l’élève."]],
  moniteur: ["Quelles sont les conditions d’accès à l’E2 et son contenu de formation ?"],
  quiz: [
    { q: "Dans une séance, après la démonstration vient…", c: ["l’essai de l’élève", "le bilan", "la remontée", "l’examen final"], a: 0, e: "On montre, puis l’élève essaie, puis on corrige." },
    { q: "Comment corriger un élève efficacement ?", c: ["Tout corriger d’un coup", "Un seul point à la fois", "Ne jamais corriger", "Seulement à la fin du stage"], a: 1, e: "Trop d’informations à la fois bloquent l’apprentissage." },
    { q: "Quand passer un exercice de 6 m à 20 m ?", c: ["Dès le premier essai", "Quand le geste est automatique à faible profondeur", "Jamais", "Dès que l’élève le demande"], a: 1, e: "La profondeur ajoute narcose, froid et stress : le geste doit être acquis avant." },
    { q: "Un bon objectif de séance est…", c: ["« Faire de la plongée »", "« Vider son masque à 6 m sans lâcher la palanquée »", "« S’amuser »", "« Aller au fond »"], a: 1, e: "Un objectif clair et mesurable permet de savoir s’il est atteint." },
    { q: "Pendant un exercice, l’enseignant garde…", c: ["le contrôle de l’élève : position, flottabilité, air", "les yeux sur le paysage", "ses distances", "le silence total"], a: 0, e: "C’est la condition pour qu’un exercice raté reste sans danger." },
    { q: "Le bilan de fin de séance doit être…", c: ["négatif pour motiver", "positif et concret", "inexistant", "uniquement écrit"], a: 1, e: "On valorise ce qui est acquis et on donne un objectif clair pour la suite." }
  ]
});

AA.content.module({
  id: "e2-securite", world: "e2", depth: "−20 m", icon: "shield",
  title: "Sécurité des élèves",
  sub: "Anticiper, surveiller, intervenir",
  essentiel: `
<p>Un élève ne sait pas encore réagir : <b>l’enseignant anticipe pour lui</b>.</p>
<ul><li><b>Avant</b> : état de forme, matériel vérifié, lest adapté, consignes simples.</li>
<li><b>Pendant</b> : à portée de main, regard sur les yeux et la respiration de l’élève, air vérifié souvent.</li>
<li><b>Signes d’alerte</b> : regard fixe ou affolé, respiration rapide, mouvements désordonnés, remontée involontaire.</li>
<li><b>Intervenir tôt</b> : un contact, un signe calme, s’arrêter, stabiliser.</li></ul>
<div class="callout ex"><span class="eyebrow">Exemple</span>Un élève à 12 m respire vite et regarde vers la surface. Avant qu’il ne panique : tu le prends en main, tu le stabilises, tu fais signe « on souffle », tu attends que sa respiration ralentisse, puis vous remontez calmement si besoin.</div>`,
  memo: [["Anticiper", "Forme, matériel, lest, consignes."], ["Surveiller", "Yeux, respiration, air."], ["Alertes", "Regard affolé, respiration rapide, mouvements désordonnés."], ["Intervenir", "Tôt, calmement, au contact."]],
  moniteur: ["Comment gérer deux élèves à 20 m si l’un des deux a un problème ?"],
  quiz: [
    { q: "Un signe d’alerte chez un élève ?", c: ["Respiration lente et régulière", "Regard affolé et respiration rapide", "Il regarde les poissons", "Il signe « ça va »"], a: 1, e: "Ce sont des signes de stress qui peuvent annoncer une panique." },
    { q: "Face à un élève qui stresse, le premier geste ?", c: ["Le prendre en main et le stabiliser calmement", "Remonter vite", "L’ignorer", "Lui faire faire un exercice difficile"], a: 0, e: "Un contact rassurant et une stabilisation calment souvent la situation." },
    { q: "Pourquoi rester à portée de main de l’élève ?", c: ["Pour pouvoir intervenir immédiatement", "Pour le gêner", "Ce n’est pas utile", "Pour prendre des photos"], a: 0, e: "Une intervention rapide évite qu’un incident devienne un accident." },
    { q: "Avant la plongée, l’enseignant vérifie…", c: ["forme, matériel et lest de l’élève", "seulement la météo", "rien", "son propre maillot"], a: 0, e: "Une bonne préparation évite la plupart des problèmes." },
    { q: "Une remontée involontaire d’un élève vient souvent…", c: ["d’un gilet mal géré ou d’un lest insuffisant", "d’un excès de calme", "de la narcose", "du froid seulement"], a: 0, e: "D’où l’importance du lestage et du contrôle de la flottabilité." },
    { q: "L’air de l’élève se vérifie…", c: ["une fois à la fin", "souvent pendant la séance", "jamais", "seulement s’il le demande"], a: 1, e: "Un élève oublie souvent de surveiller son air : c’est à l’enseignant d’y penser." }
  ]
});

/* ---------- Monde Nitrox ---------- */
AA.content.module({
  id: "nx-base", world: "nitrox", depth: "−20 m", icon: "mol",
  title: "Le nitrox, c’est quoi ?",
  sub: "Plus d’oxygène, moins d’azote",
  gen: ["nxmod", "nxead"],
  essentiel: `
<p>Le <b>nitrox</b> est un mélange d’azote et d’oxygène <b>plus riche en oxygène que l’air</b> (par exemple 32 % ou 36 % d’O₂).</p>
<h3>L’intérêt</h3><p>Moins d’azote respiré → <b>moins d’azote dissous</b> → durées sans palier plus longues ou marge de sécurité plus grande.</p>
<h3>La limite</h3><p>Plus d’oxygène → la Pp O₂ monte plus vite → <b>profondeur maximale plus faible</b>.</p>
<div class="formula">Profondeur max (MOD) = (Pp O₂ max ÷ %O₂ − 1) × 10</div>
<div class="callout ex"><span class="eyebrow">Exemple</span>Nitrox 32 %, Pp O₂ max 1,4 bar : 1,4 ÷ 0,32 = 4,375 bar → 3,375 × 10 ≈ <b>33 m</b>. Avec 1,6 bar : 1,6 ÷ 0,32 = 5 bar → <b>40 m</b>.</div>
<h3>La profondeur équivalente air (EAD)</h3>
<div class="formula">EAD = (P abs × %N₂ du mélange ÷ 0,79 − 1) × 10</div>
<p>Elle donne la profondeur à laquelle l’air ferait respirer autant d’azote : c’est elle qu’on utilise pour lire une table air.</p>
<div class="callout trap"><span class="eyebrow">Toujours</span><b>Analyser son mélange</b> soi-même avant la plongée, et noter le % et la MOD sur le bloc. <i>Seuils (1,4 ou 1,6 bar) et formation : à vérifier.</i></div>`,
  memo: [["Nitrox", "Plus d’O₂, moins de N₂."], ["MOD", "(Pp max ÷ %O₂ − 1) × 10."], ["EAD", "Profondeur air équivalente pour l’azote."], ["Avant", "Analyser son mélange, marquer le bloc."]],
  moniteur: ["Quelle Pp O₂ maximale utilise-t-on au club : 1,4 ou 1,6 bar ?"],
  quiz: [
    { q: "Le nitrox contient, par rapport à l’air…", c: ["plus d’oxygène et moins d’azote", "moins d’oxygène", "de l’hélium", "exactement la même chose"], a: 0, e: "Exemple : 32 % d’O₂ et 68 % d’N₂ au lieu de 21/79." },
    { q: "Profondeur maximale d’un nitrox 32 % avec Pp O₂ max de 1,6 bar ?", c: ["33 m", "40 m", "56 m", "66 m"], a: 1, e: "1,6 ÷ 0,32 = 5 bar absolu → 40 m." },
    { q: "Le principal avantage du nitrox ?", c: ["Aller plus profond", "Moins d’azote dissous", "Respirer moins", "Avoir moins froid"], a: 1, e: "Moins d’azote : plus de marge vis-à-vis de la décompression." },
    { q: "Avant de plonger au nitrox, on…", c: ["analyse son mélange soi-même", "fait confiance au voisin", "ne vérifie rien", "goûte l’air"], a: 0, e: "Une erreur de mélange change la profondeur maximale : on analyse toujours." },
    { q: "Pourquoi la profondeur max est-elle plus faible qu’à l’air ?", c: ["Le mélange est plus lourd", "La Pp O₂ atteint plus vite la limite", "L’azote est toxique", "Le bloc est plus petit"], a: 1, e: "Plus d’oxygène = Pp O₂ plus élevée à profondeur égale." },
    { q: "EAD d’un nitrox 36 % à 30 m (environ) ?", c: ["≈ 22 m", "≈ 30 m", "≈ 36 m", "≈ 10 m"], a: 0, e: "4 × 0,64 = 2,56 bar d’azote ; ÷ 0,79 = 3,24 bar → (3,24 − 1) × 10 ≈ 22 m." }
  ]
});

AA.content.module({
  id: "nx-securite", world: "nitrox", depth: "−30 m", icon: "shield",
  title: "Plonger nitrox en sécurité",
  sub: "Analyse, marquage, ordinateur, oxygène",
  gen: ["nxbest"],
  essentiel: `
<p>Plonger au nitrox ajoute <b>trois réflexes</b> à ceux de l’air.</p>
<ol><li><b>Analyser</b> : un analyseur d’oxygène donne le % réel du bloc. On l’écrit sur une étiquette avec la <b>MOD</b>, la date et son nom.</li>
<li><b>Régler l’ordinateur</b> sur le bon % d’O₂. Sinon ses calculs (paliers, alarmes) sont faux.</li>
<li><b>Respecter la MOD</b> : ne jamais la dépasser, même de quelques mètres.</li></ol>
<h3>Le meilleur mélange pour une plongée</h3>
<div class="formula">% O₂ idéal = Pp O₂ max ÷ P abs à la profondeur prévue</div>
<div class="callout ex"><span class="eyebrow">Exemple</span>Plongée prévue à 30 m (4 bar), Pp O₂ max 1,4 bar : 1,4 ÷ 4 = 0,35 → un <b>nitrox 35 %</b> au maximum (on arrondit vers le bas).</div>
<div class="callout trap"><span class="eyebrow">Matériel</span>Au-delà d’un certain % d’O₂, le matériel doit être <b>compatible oxygène</b> (nettoyage, graisses). <i>Seuils et règles : à vérifier.</i></div>`,
  memo: [["Analyser", "Soi-même, étiqueter % et MOD."], ["Ordinateur", "Réglé sur le bon %."], ["MOD", "Jamais dépassée."], ["Meilleur mélange", "Pp max ÷ P abs prévue."]],
  moniteur: ["Quelle procédure d’analyse et d’étiquetage utilise-t-on au club ?"],
  quiz: [
    { q: "Ton ordinateur est réglé sur 21 % mais tu plonges au nitrox 32 %. Conséquence ?", c: ["Aucune", "Les alarmes d’oxygène sont fausses : risque de dépasser la MOD sans alerte", "Il calcule plus de paliers, c’est tout", "Il s’éteint"], a: 1, e: "L’ordinateur ne connaît pas ton vrai mélange : ses alarmes de Pp O₂ ne te protègent plus." },
    { q: "Meilleur mélange pour 30 m avec Pp O₂ max 1,4 bar ?", c: ["28 %", "35 %", "40 %", "21 %"], a: 1, e: "1,4 ÷ 4 = 0,35 → 35 % au maximum." },
    { q: "Que note-t-on sur l’étiquette d’un bloc nitrox ?", c: ["Le % d’O₂, la MOD, la date et le nom", "La couleur du bloc", "Rien", "Le prix"], a: 0, e: "Toute personne qui prend le bloc doit savoir ce qu’il contient." },
    { q: "Qui analyse le mélange avant la plongée ?", c: ["Le plongeur lui-même", "Personne", "Le pilote", "Le premier venu"], a: 0, e: "On ne plonge pas un mélange qu’on n’a pas vérifié soi-même." },
    { q: "Dépasser la MOD de quelques mètres est…", c: ["sans danger", "à éviter absolument : la Pp O₂ dépasse la limite", "recommandé", "obligatoire"], a: 1, e: "La MOD est une limite, pas un objectif." },
    { q: "Le matériel pour des mélanges riches en O₂ doit être…", c: ["compatible oxygène", "plus grand", "de couleur jaune", "sans importance"], a: 0, e: "L’oxygène favorise la combustion : graisses et nettoyage adaptés sont nécessaires." }
  ]
});
