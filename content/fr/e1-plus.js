/* =====================================================================
   Abysse Academy 2.3 · E1 (initiateur) complet
   Six thèmes ajoutés : le cursus N1 à enseigner, comment on apprend un
   geste, exercices types et leur sécurité, faire un cours théorique,
   publics particuliers, cadre et responsabilités. Thèmes existants
   complétés à 16 questions, notions du tuteur. Les points réglementaires
   sont signalés « à faire valider » par ton formateur.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content, D = C.dgb || {};
  const VAL = `<div class="callout trap"><span class="eyebrow">À faire valider</span>`;

  if (D.flow) C.addDiagrams({
    "e1-cursus": () => D.flow([["S’équiper", "Monter et vérifier son matériel, s’équiper avec l’aide d’un équipier."], ["Entrer et sortir", "Mises à l’eau simples, sortie en sécurité."], ["Respirer et s’équilibrer", "Ventiler calmement sur le détendeur, équilibrer les oreilles et le masque."], ["Évoluer", "Palmer, se stabiliser, communiquer par signes, rester avec le guide."], ["Réagir", "Vider son masque, lâcher et reprendre l’embout, demander de l’air."], ["Remonter", "Remonter lentement en expirant, palier de sécurité si demandé."]], "Le fil du N1 que l’initiateur enseigne : du matériel en surface jusqu’à la remontée."),
    "e1-appr": () => D.flow([["Découverte", "L’élève comprend ce qu’il faut faire. Gestes lents, beaucoup d’erreurs, attention saturée."], ["Stabilisation", "Le geste se fixe. Il réussit souvent, à condition d’y penser."], ["Automatisation", "Le geste se fait sans y penser : l’attention est libre pour le reste."]], "Les trois phases de l’apprentissage d’un geste. On ne passe à l’étape suivante que lorsque la précédente est solide."),
    "e1-exos": () => D.flow([["Préparer", "Expliquer à terre, montrer le signe, fixer la profondeur."], ["Se placer", "Face à l’élève, à portée de main, une main libre pour lui."], ["Faire faire", "Un essai, à son rythme, sans précipiter."], ["Surveiller", "Regard, respiration, flottabilité, expiration."], ["Conclure", "Signe OK, retour simple, on recommence ou on change."]], "Le déroulé de tout exercice en immersion, quel qu’il soit."),
    "e1-cours": () => D.flow([["Accroche", "Une question ou une situation vécue : pourquoi c’est utile."], ["Objectif", "Ce qu’ils sauront faire à la fin, en une phrase."], ["Corps", "Deux ou trois idées, un schéma, un exemple de plongée."], ["Vérifier", "Questions, mini-quiz, faire reformuler."], ["Conclure", "Résumé en trois points et lien avec la prochaine plongée."]], "Le plan d’un cours théorique court et efficace."),
    "e1-public": () => D.cycle(["Enfant", "Adulte anxieux", "Senior", "Handicap"], "Adapter sans baisser la sécurité", "Chaque public demande d’adapter le rythme, le matériel et la communication. La sécurité reste la même."),
    "e1-cadre": () => D.cycle(["Prérogatives", "Autorité du moniteur ou du DP", "Licence et assurance", "Compte rendu"], "Le cadre de l’initiateur", "L’initiateur enseigne dans un cadre précis : il ne le dépasse pas et rend compte.")
  });

  C.module({
    id: "e1-cursus", world: "e1", depth: "Île 7", icon: "scroll",
    title: "Le N1 à enseigner",
    sub: "Les compétences du premier niveau, dans l’ordre",
    diagram: "e1-cursus",
    essentiel: `
<p>L’initiateur prépare surtout au <b>niveau 1</b>. Pour bien l’enseigner, il faut connaître ce que l’élève doit savoir faire à la fin, et dans quel ordre l’amener.</p>
<h3>Ce que vise le N1</h3>
<ul><li>Plonger <b>encadré</b> par un guide, jusqu’à 20 m, en milieu naturel.</li>
<li>Être <b>autonome sur son matériel</b> : le monter, le vérifier, s’équiper.</li>
<li>Maîtriser les <b>gestes de base</b> : ventilation, équilibrage, vidage de masque, lâcher-reprise d’embout, stabilisation, palmage.</li>
<li>Savoir <b>réagir</b> : demander de l’air, suivre son guide, remonter correctement.</li>
<li>Avoir des <b>connaissances simples</b> : pourquoi on expire en remontant, pourquoi on équilibre, ce qu’est un palier, le froid.</li></ul>
<h3>L’ordre logique</h3>
<p>On va <b>du confort vers l’autonomie</b> : d’abord respirer sereinement, puis s’équilibrer, puis réagir à un incident simple (eau dans le masque, embout perdu), enfin évoluer et se stabiliser. Un élève qui ne respire pas calmement n’apprendra rien d’autre.</p>
<h3>Compétences, pas exercices</h3>
<p>Le cursus se valide par <b>compétences</b> : ce que l’élève sait faire dans une vraie plongée, pas seulement réussir un exercice une fois en piscine. Un vidage de masque est acquis quand il le fait calmement, sans remonter, dans des conditions variées.</p>
${VAL}Le contenu exact du N1 (liste et intitulé des compétences, conditions de validation) est fixé par le manuel de formation technique FFESSM en vigueur. Fais-toi montrer la version actuelle par ton formateur.</div>
`,
    approfondir: `
<h3>Le carnet de formation</h3>
<p>Chaque compétence validée est notée dans le <b>carnet</b> de l’élève, avec la date et le signataire. Il permet à un autre encadrant de reprendre la formation là où elle en est.</p>
<h3>Ce que l’initiateur valide</h3>
<p>Selon le cadre fédéral, l’initiateur participe à la formation et à la validation de certaines compétences, sous la responsabilité d’un moniteur. La délivrance du brevet relève du moniteur.</p>
<h3>Théorie du N1</h3>
<p>Elle reste <b>pratique</b> : on explique les lois physiques par leurs conséquences (oreilles, masque, gilet, poumons), sans calcul compliqué. La table de plongée n’est pas une priorité du N1.</p>
`,
    memo: [["But du N1", "Plonger encadré, autonome sur son matériel, gestes de base maîtrisés."], ["Ordre", "Respirer, s’équilibrer, réagir, évoluer, se stabiliser."], ["Validation", "Une compétence, c’est réussir calmement et plusieurs fois."]],
    moniteur: ["Quelle est la version actuelle du référentiel N1 ?", "Quelles compétences un initiateur peut-il valider dans notre club ?"],
    quiz: [
      { q: "Le N1 permet surtout de plonger…", c: ["encadré par un guide de palanquée", "en autonomie avec un autre N1", "seul jusqu’à 12 m en mer", "encadré, mais seulement en fosse"], a: 0, e: "Le N1 plonge encadré ; l’autonomie vient au N2." },
      { q: "Par quoi commence logiquement l’apprentissage en immersion ?", c: ["Vider son masque tout de suite", "Respirer calmement sur le détendeur", "Apprendre à se stabiliser au gilet", "Faire un premier lâcher d’embout"], a: 1, e: "Sans une ventilation sereine, aucun autre geste ne s’apprend." },
      { q: "Une compétence du N1 est acquise quand l’élève…", c: ["l’a réussie une fois devant le moniteur", "l’a vue faire et l’a bien comprise", "la réussit calmement, plusieurs fois, en situation", "sait l’expliquer à un autre élève"], a: 2, e: "Une réussite isolée peut être un coup de chance." },
      { q: "Où note-t-on les compétences validées d’un élève ?", c: ["Sur la fiche de sécurité du jour", "Dans son carnet de formation", "Sur son certificat médical", "Dans le carnet du gonfleur"], a: 1, e: "Le carnet suit l’élève d’un encadrant à l’autre." },
      { q: "Qui délivre le brevet N1 ?", c: ["L’initiateur qui l’a formé", "Le président du club", "Le guide de sa première plongée", "Un moniteur, dans le cadre fédéral"], a: 3, e: "L’initiateur forme et participe ; la délivrance relève du moniteur." },
      { q: "En théorie N1, on explique la loi de Mariotte surtout par…", c: ["ses conséquences : oreilles, masque, gilet, poumons", "des calculs de consommation d’air à différentes profondeurs", "la formule complète, avec ses unités et des exercices chiffrés", "les calculs de flottabilité et de lestage vus au N2"], a: 0, e: "Au N1, la théorie sert à comprendre ses gestes." },
      { q: "Un élève vide parfaitement son masque en piscine mais remonte à chaque fois de 1 m. La compétence…", c: ["est acquise : le geste lui-même est correct", "n’est pas encore acquise : il doit rester à sa profondeur", "est acquise en piscine, à revoir seulement en mer", "sera validée d’office à la prochaine séance"], a: 1, e: "Remonter pendant un incident est justement ce qu’on veut éviter." },
      { q: "Pourquoi apprendre l’équilibrage avant d’aller plus profond ?", c: ["Parce qu’il est noté en premier au carnet", "Parce qu’il fatigue moins que le palmage", "Parce que la gêne apparaît dès les premiers mètres", "Parce qu’on en a besoin seulement en piscine"], a: 2, e: "C’est près de la surface que le volume varie le plus." },
      { q: "Le N1 doit savoir monter son matériel…", c: ["avec l’aide permanente de l’encadrant", "seul et le vérifier avant de plonger", "seulement s’il a son propre matériel", "après sa troisième plongée en mer"], a: 1, e: "L’autonomie sur le matériel fait partie du N1." },
      { q: "Quelle réaction le N1 doit-il savoir avoir face à une panne d’air ?", c: ["Remonter seul en expirant fort tout le long", "Faire le signe et prendre l’air de son guide", "Attendre calmement que le guide le remarque", "Passer sur son propre octopus et continuer"], a: 1, e: "Le N1 demande de l’air à son guide, qui gère la remontée." },
      { q: "Un élève très anxieux à la respiration rapide. Le reste de la séance…", c: ["suit le programme prévu, il va se détendre", "passe vite au vidage de masque pour l’occuper", "revient à la ventilation calme avant toute chose", "s’arrête définitivement pour la saison"], a: 2, e: "Respirer calmement est le socle de tout le reste." },
      { q: "La table de plongée, au N1…", c: ["n’est pas une priorité de la formation", "doit être maîtrisée pour le brevet", "se calcule à chaque plongée en mer", "remplace l’ordinateur du guide"], a: 0, e: "Le N1 plonge encadré ; la décompression est gérée par le guide." },
      { q: "Le lâcher-reprise d’embout sert à préparer l’élève…", c: ["à respirer sans détendeur en apnée", "à retrouver son détendeur s’il le perd", "à prêter son embout au guide", "à vider son masque plus vite"], a: 1, e: "Un embout perdu n’est plus un incident grave pour qui l’a travaillé." },
      { q: "Pourquoi parler du froid dès le N1 ?", c: ["Parce qu’il fatigue, fait consommer et favorise les accidents", "Parce qu’il est noté comme une compétence à part", "Parce que le N1 plonge surtout l’hiver", "Parce qu’il protège de la narcose au fond"], a: 0, e: "Le froid est un facteur commun de fatigue, d’essoufflement et d’ADD." },
      { q: "Un autre initiateur reprend ton élève la semaine suivante. Il sait où il en est grâce…", c: ["au souvenir de l’élève lui-même", "à son carnet de formation à jour", "à la fiche de sécurité de la plongée", "au nombre de plongées sur son ordinateur"], a: 1, e: "D’où l’importance de remplir le carnet après chaque séance." },
      { q: "Le palier de sécurité, pour un N1…", c: ["se calcule seul avec sa table", "se fait sur ordre et à côté de son guide", "ne le concerne pas, il plonge peu profond", "se fait seul si le guide est occupé"], a: 1, e: "Le N1 reste avec son guide jusqu’en surface." }
    ]
  });

  C.module({
    id: "e1-apprendre", world: "e1", depth: "Île 8", icon: "brain",
    title: "Comment on apprend",
    sub: "Phases d’apprentissage, attention, motivation",
    diagram: "e1-appr",
    essentiel: `
<p>Enseigner, c’est d’abord comprendre <b>comment l’élève apprend</b>. Un geste de plongée suit toujours le même chemin.</p>
<h3>Trois phases</h3>
<ul><li><b>Découverte</b> : l’élève découvre ce qu’il faut faire. Il pense à tout, fait des erreurs, se fatigue vite. Il a besoin d’une <b>consigne simple</b> et d’une démonstration claire.</li>
<li><b>Stabilisation</b> : le geste se fixe. Il réussit souvent, mais il doit y penser. Il faut le <b>répéter</b> et varier un peu les conditions.</li>
<li><b>Automatisation</b> : le geste se fait seul. L’attention est libre pour autre chose (palanquée, paysage). C’est seulement là qu’on peut <b>compliquer</b> : plus profond, en mouvement, avec un peu de stress.</li></ul>
<h3>L’attention est limitée</h3>
<p>Un débutant ne retient que <b>deux ou trois consignes</b> à la fois. Sous l’eau, avec le froid et l’émotion, encore moins. On donne <b>une consigne</b>, on corrige <b>un point</b>.</p>
<h3>Le retour (feedback)</h3>
<p>L’élève sent lui-même certaines choses (eau dans le nez, air qui manque) : c’est le retour <b>interne</b>. L’encadrant ajoute un retour <b>externe</b> : un signe, puis un commentaire en surface. Un bon retour est <b>rapide, précis et positif</b>.</p>
<h3>La motivation</h3>
<ul><li>Elle vient surtout du <b>sentiment de progresser</b> et de réussir.</li>
<li>Un objectif <b>atteignable</b> motive ; un échec répété démotive.</li>
<li>Le plaisir de plonger reste le moteur : on garde du temps pour découvrir.</li></ul>
`,
    approfondir: `
<h3>Le transfert</h3>
<p>Un geste appris en piscine ne se retrouve pas toujours en mer : l’eau froide, la visibilité, la profondeur changent tout. On revient donc à une <b>étape facile</b> en milieu naturel avant de compliquer.</p>
<h3>Erreur et peur</h3>
<p>L’erreur fait partie de l’apprentissage. Ce qui bloque, c’est la <b>peur de l’erreur</b>. Un encadrant calme, qui dédramatise, fait plus progresser qu’un encadrant pressé.</p>
<h3>Les différents élèves</h3>
<p>Certains apprennent en regardant, d’autres en écoutant, d’autres en faisant. On mélange les trois : expliquer, montrer, faire faire.</p>
`,
    memo: [["Phases", "Découverte, stabilisation, automatisation."], ["Attention", "Une consigne, un point corrigé à la fois."], ["Motivation", "Réussir, progresser, prendre du plaisir."]],
    moniteur: ["Comment repérer qu’un geste est automatisé chez un élève ?"],
    quiz: [
      { q: "En phase de découverte, l’élève a surtout besoin…", c: ["d’une consigne simple et d’une démonstration claire", "d’exercices variés en conditions difficiles", "de corrections détaillées sur plusieurs points", "d’essais seul, sans encadrant à côté"], a: 0, e: "Il découvre : on simplifie au maximum." },
      { q: "Un geste est automatisé quand l’élève…", c: ["le réussit à condition d’y penser fort", "le fait sans y penser, l’attention libre", "l’a réussi trois fois de suite en piscine", "sait décrire chaque étape du geste"], a: 1, e: "L’automatisme libère l’attention pour la sécurité et la palanquée." },
      { q: "Quand peut-on compliquer un exercice (plus profond, en mouvement) ?", c: ["Dès la première réussite de l’élève", "Quand l’élève le demande lui-même", "Quand le geste est automatisé", "À la deuxième séance, quoi qu’il arrive"], a: 2, e: "Compliquer trop tôt fait régresser." },
      { q: "Combien de consignes un débutant retient-il à la fois ?", c: ["Autant qu’on lui en donne au briefing", "Deux ou trois, encore moins sous l’eau", "Cinq ou six s’il est attentif", "Une dizaine s’il les note"], a: 1, e: "Le froid et l’émotion réduisent encore l’attention." },
      { q: "Un retour interne, c’est…", c: ["ce que l’élève ressent lui-même", "le commentaire de l’encadrant en surface", "le signe OK fait par le moniteur", "la note dans le carnet de formation"], a: 0, e: "Eau dans le nez, air qui manque : l’élève le sent seul." },
      { q: "Un bon retour de l’encadrant est…", c: ["long et complet, pour tout dire d’un coup", "donné le lendemain, à froid", "rapide, précis et positif", "réservé aux erreurs de sécurité"], a: 2, e: "On commence par ce qui est réussi, puis un point à améliorer." },
      { q: "Qu’est-ce qui motive le plus un débutant ?", c: ["Un diplôme rapide", "Le sentiment de progresser et de réussir", "La comparaison avec les autres élèves", "Des exercices toujours plus difficiles"], a: 1, e: "Réussir donne envie de continuer." },
      { q: "Un élève échoue quatre fois de suite. Sa motivation…", c: ["augmente, il veut réussir", "ne change pas, il comprend", "baisse : il faut une étape plus facile", "n’a pas d’importance pour la suite"], a: 2, e: "On redécoupe pour qu’il retrouve une réussite." },
      { q: "En phase de stabilisation, on…", c: ["arrête de répéter, c’est acquis", "répète en variant un peu les conditions", "passe directement en mer à 20 m", "corrige trois points à chaque essai"], a: 1, e: "La répétition fixe le geste." },
      { q: "Un geste réussi en piscine échoue en mer. On parle d’un problème de…", c: ["motivation", "transfert", "matériel", "mémoire"], a: 1, e: "Les conditions changent : on revient à une étape facile." },
      { q: "Face à l’erreur d’un élève, l’encadrant…", c: ["dédramatise et propose de recommencer", "répète l’explication plus fort", "montre son agacement pour motiver", "passe à un autre élève plus doué"], a: 0, e: "La peur de l’erreur bloque plus que l’erreur elle-même." },
      { q: "Pourquoi expliquer, montrer ET faire faire ?", c: ["Pour bien remplir toute la durée prévue de la séance", "Parce que les élèves n’apprennent pas tous de la même façon", "Parce que c’est imposé par le règlement fédéral de formation", "Pour que l’élève se repose un peu entre deux essais au fond"], a: 1, e: "Certains retiennent en voyant, d’autres en faisant." },
      { q: "Pourquoi garder du temps de découverte dans une séance ?", c: ["Pour récupérer l’air dépensé pendant les exercices", "Parce que le plaisir entretient la motivation", "Pour pouvoir remplir la fiche de séance au retour", "Pour laisser l’encadrant se reposer un moment"], a: 1, e: "On vient plonger pour le plaisir : il ne faut pas l’oublier." },
      { q: "Un élève réussit seulement quand tu es à côté de lui. Il est en phase…", c: ["de découverte", "de stabilisation", "d’automatisation", "d’évaluation finale"], a: 1, e: "Il réussit en y pensant : on continue à répéter." },
      { q: "L’encadrant corrige pendant l’exercice sous l’eau…", c: ["par une longue série de signes", "par un signe simple, puis il précise en surface", "en retirant son détendeur pour parler", "en refaisant tout l’exercice à sa place"], a: 1, e: "Sous l’eau, la communication est limitée : on fait court." },
      { q: "Un objectif qui motive est…", c: ["très ambitieux pour stimuler", "atteignable dans la séance", "fixé pour toute la saison", "identique pour tous les élèves"], a: 1, e: "Atteindre son objectif donne envie de revenir." }
    ]
  });

  C.module({
    id: "e1-exercices", world: "e1", depth: "Île 9", icon: "target",
    title: "Exercices types et sécurité",
    sub: "Vidage, embout, partage d’air, stabilisation",
    diagram: "e1-exos",
    essentiel: `
<p>Chaque exercice du N1 a <b>son déroulé</b> et <b>ses risques</b>. L’initiateur les connaît avant de les faire faire.</p>
<h3>Les exercices classiques</h3>
<ul><li><b>Vidage de masque</b> : souffler par le nez, haut du masque tenu, tête qui remonte. Risque : eau dans le nez, panique, envie de remonter.</li>
<li><b>Lâcher-reprise d’embout</b> : on lâche, on souffle de petites bulles, on reprend (par le bras ou en suivant le flexible), on purge. Risque : <b>bloquer sa respiration</b>.</li>
<li><b>Demander et recevoir de l’air</b> : signe, prise de l’octopus de l’encadrant, tenue mutuelle. Risque : précipitation, prise du mauvais détendeur.</li>
<li><b>Stabilisation</b> : au gilet, puis au poumon-ballast. Risque : remontée involontaire.</li>
<li><b>Palmage</b> : jambes tendues, mouvement ample, sans pédaler. Risque : essoufflement.</li></ul>
<h3>Les règles de sécurité communes</h3>
<ul><li><b>Expliquer à terre</b>, signe compris, avant chaque exercice.</li>
<li>Rester <b>face à l’élève, à portée de main</b>, une main prête à le tenir.</li>
<li>Surveiller <b>l’expiration</b> : un élève qui retient son souffle et remonte risque la surpression pulmonaire, même à faible profondeur.</li>
<li><b>Ne jamais</b> faire d’apnée prolongée ni d’hyperventilation : risque de syncope.</li>
<li>Limiter les <b>remontées répétées</b> (yo-yo) : oreilles et décompression.</li>
<li>Arrêter si l’élève a <b>froid</b> ou se fatigue.</li></ul>
`,
    approfondir: `
<h3>Où faire l’exercice ?</h3>
<p>Près d’un repère (fond, bord, pendeur) pour que l’élève voie qu’il reste à sa profondeur. Sur un fond de sable, en mer, pour qu’il puisse se poser si besoin, sans abîmer la vie.</p>
<h3>Ordre dans une plongée</h3>
<p>On fait les exercices <b>au début</b>, quand l’élève a de l’air et n’a pas froid, puis on termine par de la découverte. Jamais d’exercice difficile juste avant la remontée.</p>
<h3>Quand l’élève rate</h3>
<p>Si l’élève remonte, on le <b>retient</b> et on le ramène doucement. On ne laisse jamais un élève finir seul un exercice raté vers la surface.</p>
`,
    memo: [["Avant", "Expliquer à terre, signe compris."], ["Pendant", "Face à lui, à portée de main, expiration surveillée."], ["Interdits", "Pas d’apnée prolongée, pas d’hyperventilation, pas de yo-yo."]],
    moniteur: ["Quels exercices un initiateur peut-il faire en milieu naturel dans notre club ?"],
    quiz: [
      { q: "Pendant le vidage de masque, l’élève…", c: ["souffle par la bouche en penchant la tête en avant", "souffle par le nez, haut du masque tenu, tête qui remonte", "retire le masque, le rince et le remet en place", "remonte d’un mètre pour souffler plus facilement"], a: 1, e: "L’air chasse l’eau par le bas du masque." },
      { q: "Le principal risque du lâcher-reprise d’embout ?", c: ["Que l’élève bloque sa respiration", "Que le détendeur se mette en débit continu", "Que l’élève perde son masque", "Que le bloc se vide plus vite"], a: 0, e: "On lui demande de souffler de petites bulles tant qu’il n’a pas l’embout." },
      { q: "Pour retrouver son embout, l’élève peut…", c: ["attendre que l’encadrant le lui donne", "passer le bras en arrière ou suivre le flexible", "remonter en surface pour le chercher", "prendre l’octopus de l’encadrant à chaque fois"], a: 1, e: "Deux méthodes simples, à enseigner toutes les deux." },
      { q: "Où se place l’initiateur pendant un exercice ?", c: ["derrière l’élève pour ne pas le gêner", "au-dessus de lui pour voir l’ensemble", "face à lui, à portée de main", "à deux mètres pour le laisser autonome"], a: 2, e: "Il voit son visage et peut intervenir tout de suite." },
      { q: "Pourquoi l’hyperventilation est-elle interdite avant une apnée ?", c: ["Elle fait consommer trop d’air au bloc", "Elle refroidit l’élève très vite", "Elle peut provoquer une syncope", "Elle gêne l’équilibrage des oreilles"], a: 2, e: "Elle retarde le besoin de respirer au-delà du raisonnable." },
      { q: "Les remontées répétées pendant une séance favorisent…", c: ["la narcose et une fatigue rapide", "les problèmes d’oreilles et de décompression", "le givrage du détendeur en eau froide", "l’essoufflement et une consommation forte"], a: 1, e: "On limite les yo-yo, même peu profond." },
      { q: "Un élève remonte pendant son vidage de masque. Tu…", c: ["le laisses finir en surface", "le retiens et le ramènes doucement", "lui fais signe de redescendre seul", "recommences toi-même l’exercice"], a: 1, e: "On ne laisse jamais un exercice raté finir vers la surface." },
      { q: "À quel moment de la plongée placer les exercices ?", c: ["juste avant la remontée, pour finir", "au début, quand l’élève a de l’air et chaud", "pendant le palier de sécurité", "en milieu de plongée, après la visite"], a: 1, e: "On termine par de la découverte, pas par la difficulté." },
      { q: "Pour la demande d’air, l’élève prend en général…", c: ["le détendeur principal de l’encadrant", "l’octopus de l’encadrant", "son propre octopus", "le détendeur d’un autre élève"], a: 1, e: "Selon l’organisation du club, à préciser au briefing." },
      { q: "Le palmage efficace se fait…", c: ["jambes pliées, comme à vélo", "jambes tendues, mouvement ample", "avec les bras pour aider", "très vite, en petits battements"], a: 1, e: "Pédaler fatigue et fait consommer." },
      { q: "Un élève a froid au milieu des exercices. Tu…", c: ["accélères pour finir l’exercice", "lui proposes de palmer pour se réchauffer", "arrêtes et passes à la remontée", "lui demandes de faire une apnée"], a: 2, e: "Le froid fatigue et augmente les risques." },
      { q: "Pourquoi faire l’exercice près d’un repère (fond, bord, pendeur) ?", c: ["Pour que l’élève se repose dessus", "Pour qu’il voie qu’il reste à sa profondeur", "Pour attacher le matériel de l’encadrant", "Parce que le courant y est plus fort"], a: 1, e: "Un repère visuel aide à maîtriser sa profondeur." },
      { q: "Même à 3 m, un élève qui remonte poumons bloqués risque…", c: ["rien, c’est trop peu profond", "seulement un mal d’oreille", "une surpression pulmonaire", "une narcose légère"], a: 2, e: "Les variations de volume sont fortes près de la surface." },
      { q: "Avant chaque exercice, l’élève doit connaître…", c: ["le signe de l’exercice et ce qu’on attend de lui", "la durée totale de la séance et l’heure de sortie", "la pression exacte de son bloc au départ du bord", "le nom et le niveau des autres élèves du groupe"], a: 0, e: "Sous l’eau, on ne peut presque pas expliquer." },
      { q: "La stabilisation s’apprend d’abord…", c: ["au poumon-ballast seul, sans toucher au gilet", "au gilet, puis affinée au poumon-ballast", "en palmant doucement sur place, à la verticale", "avec un lest plus lourd pour rester posé au fond"], a: 1, e: "Le gilet dégrossit, le poumon affine." },
      { q: "Pendant un exercice, l’encadrant surveille surtout…", c: ["le paysage et la faune autour du groupe", "regard, respiration, flottabilité, expiration", "son propre ordinateur et son temps de plongée", "les bulles des autres palanquées du site"], a: 1, e: "Ce sont les premiers signes d’un problème." }
    ]
  });

  C.module({
    id: "e1-cours", world: "e1", depth: "Île 10", icon: "book",
    title: "Faire un cours théorique",
    sub: "Préparer, captiver, vérifier",
    diagram: "e1-cours",
    essentiel: `
<p>L’initiateur fait aussi des <b>cours en salle</b> : pourquoi on équilibre, le matériel, les signes, les accidents simples. Un bon cours est <b>court, concret et vérifié</b>.</p>
<h3>Préparer</h3>
<ul><li><b>Un objectif</b> : « À la fin, ils sauront expliquer pourquoi on expire en remontant. »</li>
<li><b>Deux ou trois idées</b> maximum. Le reste ira dans un autre cours.</li>
<li>Un <b>support simple</b> : un schéma au tableau, un objet (masque, détendeur, ballon).</li>
<li>Une <b>durée courte</b> : l’attention baisse vite, surtout après une plongée.</li></ul>
<h3>Le déroulé</h3>
<ol><li><b>Accroche</b> : une question, une situation vécue.</li>
<li><b>Objectif</b> annoncé.</li>
<li><b>Développement</b> : une idée, un schéma, un exemple de plongée.</li>
<li><b>Vérification</b> : questions, mini-quiz, faire reformuler.</li>
<li><b>Conclusion</b> : trois points à retenir, lien avec la prochaine plongée.</li></ol>
<h3>Parler à des débutants</h3>
<ul><li><b>Mots simples</b> : on explique chaque mot technique la première fois.</li>
<li>On part de <b>ce qu’ils connaissent</b> : les oreilles en avion, une bouteille d’eau qui s’écrase.</li>
<li>On <b>fait participer</b> : poser des questions, faire manipuler.</li></ul>
`,
    approfondir: `
<h3>Les questions</h3>
<p>Une question ouverte (« pourquoi ? ») fait réfléchir ; une question fermée (« oui ou non ? ») vérifie vite. On évite « Vous avez compris ? » : tout le monde dit oui.</p>
<h3>Le schéma</h3>
<p>Un bon schéma montre <b>une seule idée</b>, avec peu de mots. On le construit devant eux, étape par étape, plutôt que de l’afficher d’un coup.</p>
<h3>Après le cours</h3>
<p>On le relie à la pratique : « Demain, au moment de descendre, pensez à… ». C’est ce lien qui fixe la théorie.</p>
`,
    memo: [["Plan", "Accroche, objectif, développement, vérification, conclusion."], ["Contenu", "Deux ou trois idées, un schéma, un exemple."], ["Vérifier", "Faire reformuler, pas « vous avez compris ? »."]],
    moniteur: ["Quels cours théoriques un initiateur fait-il dans notre club ?"],
    quiz: [
      { q: "Combien d’idées principales dans un cours pour débutants ?", c: ["Toutes celles du programme", "Deux ou trois", "Une dizaine bien classées", "Autant que le temps le permet"], a: 1, e: "Le reste ira dans un autre cours." },
      { q: "Un bon début de cours, c’est…", c: ["une accroche : question ou situation vécue", "la liste complète du programme", "les formules à apprendre par cœur", "un rappel du règlement intérieur"], a: 0, e: "L’accroche montre pourquoi c’est utile." },
      { q: "Pour vérifier qu’ils ont compris, on évite de demander…", c: ["« Pourquoi expire-t-on en remontant ? »", "« Vous avez compris ? »", "« Que ferais-tu dans ce cas ? »", "« Peux-tu le redire avec tes mots ? »"], a: 1, e: "Tout le monde répond oui, même sans avoir compris." },
      { q: "Pour expliquer la pression aux oreilles, on part de préférence…", c: ["de la formule de Mariotte", "de l’avion ou de la montagne", "des tables de plongée", "de la loi de Dalton"], a: 1, e: "On part de ce que les élèves connaissent déjà." },
      { q: "Un bon schéma au tableau…", c: ["montre une seule idée, avec peu de mots", "résume tout le cours sur une page", "est affiché tout fait dès le début", "contient toutes les valeurs chiffrées"], a: 0, e: "On le construit devant eux, étape par étape." },
      { q: "Pourquoi un cours court après une plongée ?", c: ["Parce que la salle est réservée", "Parce que l’attention baisse vite avec la fatigue", "Parce que le moniteur l’impose", "Parce que la théorie est moins importante"], a: 1, e: "Mieux vaut 20 minutes efficaces qu’une heure perdue." },
      { q: "La première fois qu’on utilise un mot technique…", c: ["on l’explique simplement", "on le fait noter sans commentaire", "on l’évite pour toujours", "on le donne en anglais aussi"], a: 0, e: "Un mot non compris bloque toute la suite." },
      { q: "Une question ouverte sert surtout à…", c: ["vérifier très vite par oui ou non", "faire réfléchir l’élève", "terminer le cours", "occuper le temps restant"], a: 1, e: "« Pourquoi ? » oblige à construire la réponse." },
      { q: "En conclusion du cours, on…", c: ["ajoute une notion nouvelle pour aller plus loin", "résume en trois points et relie à la pratique", "distribue le programme de toute l’année à venir", "pose une question difficile pour finir en beauté"], a: 1, e: "Le lien avec la plongée suivante fixe la théorie." },
      { q: "Un objet à manipuler (détendeur, masque) en cours sert à…", c: ["décorer la table du cours", "rendre le cours concret et faire participer", "remplacer complètement l’explication", "montrer le matériel du club à vendre"], a: 1, e: "Toucher aide à comprendre et à retenir." },
      { q: "Un objectif de cours bien formulé ?", c: ["« Parler des accidents de plongée pendant 30 minutes »", "« Ils sauront expliquer pourquoi on expire en remontant »", "« Faire tout le chapitre 3 du manuel de formation »", "« Voir la physique utile au plongeur de niveau 1 »"], a: 1, e: "Un objectif dit ce que l’élève saura faire." },
      { q: "Un élève pose une question hors sujet intéressante. Tu…", c: ["l’ignores pour tenir le plan prévu jusqu’au bout", "y réponds brièvement ou la gardes pour la fin", "changes tout ton cours pour y répondre en détail", "lui demandes de la garder pour son prochain niveau"], a: 1, e: "On respecte la question sans perdre le fil." },
      { q: "Le meilleur exemple pour illustrer un cours ?", c: ["une situation de plongée qu’ils vont vivre", "une statistique nationale d’accidents", "un cas rare et spectaculaire", "une citation d’un grand plongeur"], a: 0, e: "Ce qui les concerne directement se retient." },
      { q: "Pendant le cours, faire participer les élèves sert…", c: ["à gagner du temps de parole", "à garder leur attention et vérifier", "à évaluer le meilleur élève", "à remplir la feuille de présence"], a: 1, e: "Un élève actif retient mieux." },
      { q: "Tu prépares un cours sur le matériel. Première étape ?", c: ["Choisir la salle et l’horaire", "Fixer l’objectif du cours", "Faire un diaporama complet", "Lister toutes les marques"], a: 1, e: "Tout le reste découle de l’objectif." },
      { q: "Après une explication, un élève reformule faux. Tu…", c: ["répètes la même phrase plus fort", "réexpliques autrement, avec un exemple", "passes au point suivant", "demandes à un autre de corriger en riant"], a: 1, e: "Changer d’angle aide souvent à comprendre." }
    ]
  });

  C.module({
    id: "e1-public", world: "e1", depth: "Île 11", icon: "users",
    title: "Publics particuliers",
    sub: "Enfants, anxieux, seniors, handicap",
    diagram: "e1-public",
    essentiel: `
<p>Tous les élèves ne se ressemblent pas. On <b>adapte le rythme, le matériel et la communication</b>, jamais le niveau de sécurité.</p>
<h3>Les enfants</h3>
<ul><li><b>Attention courte</b> : séances brèves, consignes très simples, beaucoup de jeux.</li>
<li><b>Froid</b> : ils se refroidissent plus vite ; on écourte dès les premiers signes.</li>
<li><b>Matériel adapté</b> : petit bloc, gilet et combinaison à leur taille, masque bien ajusté.</li>
<li>Ils ne disent pas toujours qu’ils ont mal ou peur : on <b>observe</b>.</li>
<li>Des <b>brevets et limites spécifiques</b> existent pour les enfants.</li></ul>
<h3>Les adultes anxieux</h3>
<ul><li>On <b>prend le temps</b> : découverte en surface, visage dans l’eau, puis immersion très progressive.</li>
<li>On <b>explique ce qui va se passer</b> et on donne un moyen d’arrêter (un signe convenu).</li>
<li>On ne force jamais : un mauvais souvenir peut dégoûter de la plongée.</li></ul>
<h3>Les seniors</h3>
<p>On tient compte de la <b>forme physique</b>, du froid et de la fatigue ; le matériel lourd se porte avec aide. Le certificat médical prend toute son importance.</p>
<h3>Le handicap</h3>
<p>La plongée est accessible à beaucoup de personnes en situation de handicap, avec des <b>formations d’encadrants spécifiques</b> (handisub). L’initiateur oriente vers un encadrant formé.</p>
${VAL}Âges minimum, profondeurs et brevets enfants, ainsi que les qualifications handisub, sont fixés par la FFESSM. Vérifie les valeurs actuelles auprès de ton formateur.</div>
`,
    memo: [["Règle", "Adapter rythme, matériel, communication ; jamais la sécurité."], ["Enfant", "Court, jeu, froid surveillé, matériel à sa taille."], ["Anxieux", "Progressif, expliquer, signe d’arrêt, ne jamais forcer."]],
    moniteur: ["Quels brevets enfants le club propose-t-il, et avec quelles limites ?", "Qui est formé handisub au club ?"],
    quiz: [
      { q: "Avec un public particulier, on adapte…", c: ["le niveau de sécurité à la baisse", "le rythme, le matériel et la communication", "uniquement la durée de la plongée", "rien : tout le monde est traité pareil"], a: 1, e: "La sécurité ne s’adapte jamais à la baisse." },
      { q: "Pourquoi surveiller le froid de près chez un enfant ?", c: ["Il se refroidit plus vite qu’un adulte", "Il consomme plus d’air que l’adulte", "Il porte une combinaison plus épaisse", "Il plonge toujours en hiver"], a: 0, e: "Rapport surface/volume plus grand : il perd vite sa chaleur." },
      { q: "Une séance avec des enfants doit être…", c: ["longue pour rentabiliser la piscine", "courte, simple, avec beaucoup de jeux", "identique à celle des adultes", "centrée sur la théorie"], a: 1, e: "L’attention d’un enfant est courte." },
      { q: "Un enfant ne dit rien mais grimace en descendant. Tu…", c: ["continues, il le dirait s’il avait mal", "t’arrêtes et vérifies ses oreilles", "lui demandes d’aller plus vite", "le confies à un autre élève"], a: 1, e: "Les enfants n’expriment pas toujours la douleur : on observe." },
      { q: "Le matériel d’un enfant doit être…", c: ["celui des adultes, bien serré", "adapté à sa taille et à son poids", "le plus léger possible, sans gilet", "choisi par l’enfant lui-même"], a: 1, e: "Un masque qui fuit ou un gilet trop grand gâchent la séance." },
      { q: "Un adulte anxieux pour son premier essai. On commence par…", c: ["une descente directe à 3 m, en le tenant bien", "la surface, visage dans l’eau, puis très progressivement", "un vidage de masque, pour voir comment il réagit", "un long cours sur les accidents, pour le rassurer"], a: 1, e: "On construit la confiance pas à pas." },
      { q: "Pourquoi convenir d’un signe d’arrêt avec un élève anxieux ?", c: ["Pour qu’il garde le contrôle et ose essayer", "Pour pouvoir le noter dans son carnet", "Parce qu’il ne connaît pas le signe OK", "Pour accélérer la séance"], a: 0, e: "Savoir qu’on peut arrêter rassure." },
      { q: "Un élève anxieux refuse de descendre. Tu…", c: ["insistes doucement, il sera content après coup", "respectes son refus et proposes autre chose", "le tires doucement vers le fond en le tenant", "lui dis que tous les autres élèves y arrivent"], a: 1, e: "Forcer peut créer un dégoût durable de la plongée." },
      { q: "Chez un senior, on fait particulièrement attention…", c: ["à la forme physique, au froid et à la fatigue", "à la vitesse de son palmage", "au choix de la couleur de sa combinaison", "à sa capacité à faire des apnées"], a: 0, e: "Et on l’aide à porter le matériel lourd." },
      { q: "Une personne en fauteuil veut découvrir la plongée. L’initiateur…", c: ["refuse : la plongée ne lui est pas accessible", "l’oriente vers un encadrant formé handisub", "l’emmène seul en fosse pour une découverte", "lui propose seulement une sortie en palmes-masque-tuba"], a: 1, e: "Des formations spécifiques existent pour bien l’accueillir." },
      { q: "Les consignes données à un enfant doivent être…", c: ["les mêmes qu’aux adultes", "très simples et peu nombreuses", "écrites sur une ardoise", "données par ses parents"], a: 1, e: "Une ou deux idées à la fois." },
      { q: "Pour un enfant, le jeu sert à…", c: ["passer le temps entre les exercices", "apprendre sans stress et garder l’envie", "remplacer complètement les exercices", "récompenser seulement les meilleurs"], a: 1, e: "Un jeu bien choisi travaille un vrai geste." },
      { q: "Les profondeurs maximales des enfants…", c: ["sont les mêmes que celles des adultes", "sont fixées par des règles spécifiques", "dépendent seulement de leur taille", "sont libres si un parent plonge"], a: 1, e: "Des brevets et limites enfants existent : à vérifier." },
      { q: "Un élève de 60 ans essoufflé au bord après s’être équipé. Tu…", c: ["le fais descendre tout de suite", "le laisses récupérer avant l’immersion", "lui donnes un bloc plus gros", "annules sa saison"], a: 1, e: "On ne plonge jamais essoufflé." },
      { q: "Ce qui change avec un public anxieux, c’est surtout…", c: ["la vitesse de progression", "la profondeur de la piscine", "le matériel de sécurité du bord", "la durée de vie du bloc"], a: 0, e: "Même chemin, plus lentement." },
      { q: "Avant d’accueillir un public particulier, l’initiateur vérifie…", c: ["le certificat médical et les règles fédérales", "uniquement la taille de la combinaison prêtée", "la météo prévue pour la semaine suivante", "l’ancienneté de sa licence au club"], a: 0, e: "Le cadre médical et réglementaire passe en premier." }
    ]
  });

  C.module({
    id: "e1-cadre", world: "e1", depth: "Île 12", icon: "shield",
    title: "Cadre et responsabilités",
    sub: "Prérogatives, autorité, assurance, compte rendu",
    diagram: "e1-cadre",
    essentiel: `
<p>L’initiateur enseigne dans un <b>cadre précis</b>. Le connaître, c’est se protéger et protéger ses élèves.</p>
<h3>Prérogatives</h3>
<ul><li>Il enseigne en <b>milieu artificiel</b> (piscine, fosse) et en <b>milieu naturel dans l’espace proche</b>, sous l’autorité d’un moniteur ou du directeur de plongée.</li>
<li>Il <b>ne dépasse pas</b> ses prérogatives, même si l’élève est à l’aise et le demande.</li></ul>
<h3>Sous l’autorité de qui ?</h3>
<p>En piscine, un <b>responsable de séance</b> organise ; en mer, le <b>directeur de plongée</b> compose les palanquées et fixe les paramètres. L’initiateur applique et <b>rend compte</b>.</p>
<h3>Responsabilités</h3>
<ul><li><b>Civile</b> : réparer un dommage causé à un élève. Elle est couverte par l’assurance (licence et structure).</li>
<li><b>Pénale</b> : sanction personnelle en cas de faute (imprudence, négligence, non-respect des règles). Aucune assurance ne la couvre.</li>
<li>L’encadrant a une <b>obligation de moyens</b> : faire ce qu’aurait fait un encadrant prudent et compétent.</li></ul>
<h3>Avant chaque séance</h3>
<ul><li>Élèves <b>licenciés</b>, <b>certificat médical</b> valide selon les règles en vigueur.</li>
<li><b>Matériel de secours</b> présent et connu : oxygène, trousse, moyen d’alerte.</li>
<li><b>Fiche de séance</b> ou de sécurité remplie.</li></ul>
${VAL}Prérogatives exactes de l’initiateur (espace d’évolution, effectifs, conditions de présence d’un moniteur), validité du certificat médical : fixées par le Code du sport et la FFESSM. À vérifier avec ton formateur.</div>
`,
    approfondir: `
<h3>Ce qui protège l’initiateur</h3>
<p>Une fiche de séance remplie, un briefing fait, un compte rendu au responsable, des élèves dans les règles : en cas d’accident, c’est la preuve d’une conduite prudente.</p>
<h3>Refuser</h3>
<p>Un initiateur peut et doit <b>refuser</b> une situation qui dépasse ses prérogatives ou qui lui semble dangereuse (élève malade, conditions mauvaises). Il en parle au responsable.</p>
`,
    memo: [["Autorité", "Moniteur ou DP : l’initiateur applique et rend compte."], ["Civile / pénale", "Civile assurée, pénale personnelle."], ["Avant", "Licence, certificat, secours, fiche."]],
    moniteur: ["Quel est exactement mon espace d’évolution en milieu naturel ?", "Combien d’élèves puis-je encadrer à la fois ?", "Quelle est la règle actuelle de validité du certificat médical ?"],
    quiz: [
      { q: "En mer, l’initiateur enseigne sous l’autorité…", c: ["du directeur de plongée", "du pilote du bateau", "de l’élève le plus expérimenté", "de personne s’il est diplômé"], a: 0, e: "Le DP compose les palanquées et fixe les paramètres." },
      { q: "Ton élève très à l’aise te demande d’aller plus profond que tes prérogatives. Tu…", c: ["acceptes, il en est capable", "refuses et en parles au responsable", "acceptes pour quelques minutes", "le confies à un autre élève"], a: 1, e: "Les prérogatives ne se négocient pas." },
      { q: "La responsabilité civile sert à…", c: ["sanctionner une faute", "réparer un dommage causé", "valider un brevet", "fixer les prérogatives"], a: 1, e: "Elle est couverte par l’assurance." },
      { q: "La responsabilité pénale…", c: ["est couverte par l’assurance de la licence", "est personnelle : aucune assurance ne la couvre", "ne concerne que le président et le club", "ne s’applique pas aux encadrants bénévoles"], a: 1, e: "Elle sanctionne une faute personnelle." },
      { q: "L’obligation de moyens, c’est…", c: ["garantir qu’aucun accident n’arrivera", "agir comme un encadrant prudent et compétent", "avoir le meilleur matériel du marché", "avoir assez de moyens financiers"], a: 1, e: "On juge la conduite, pas seulement le résultat." },
      { q: "Avant une séance, l’initiateur s’assure que ses élèves ont…", c: ["leur propre matériel complet et vérifié", "licence et certificat médical en règle", "déjà fait un baptême en milieu naturel", "un niveau de natation attesté par écrit"], a: 1, e: "C’est la base du cadre fédéral." },
      { q: "Le matériel de secours doit être…", c: ["dans le local du club", "présent et connu de l’encadrant", "apporté par les élèves", "dans la voiture du président"], a: 1, e: "Oxygène, trousse, moyen d’alerte : à portée et vérifiés." },
      { q: "Après la séance, l’initiateur…", c: ["range et part", "rend compte au responsable", "attend qu’on lui pose des questions", "envoie un message aux élèves"], a: 1, e: "Le compte rendu fait partie de l’organisation." },
      { q: "Un élève arrive enrhumé et fiévreux. Tu…", c: ["le fais plonger peu profond", "refuses qu’il plonge aujourd’hui", "lui donnes un décongestionnant", "le laisses décider"], a: 1, e: "Rhume : risque de barotraumatisme. On refuse et on en parle." },
      { q: "En cas d’accident, qu’est-ce qui prouve une conduite prudente ?", c: ["Le témoignage enthousiaste des élèves du jour", "Fiche remplie, briefing, compte rendu, élèves en règle", "Le nombre de plongées et de brevets de l’initiateur", "L’accord oral du président du club avant la séance"], a: 1, e: "Ce sont des traces objectives." },
      { q: "En piscine, qui organise la séance de l’initiateur ?", c: ["Le maître-nageur de la piscine", "Un responsable de séance qualifié", "L’initiateur lui-même, seul", "Le plus ancien du club"], a: 1, e: "L’initiateur s’inscrit dans une organisation." },
      { q: "Un initiateur peut refuser une situation…", c: ["jamais : il applique les consignes du responsable", "si elle dépasse ses prérogatives ou semble dangereuse", "seulement si un élève le lui demande clairement", "uniquement en piscine, jamais en milieu naturel"], a: 1, e: "Refuser est parfois la meilleure décision de sécurité." },
      { q: "La faute d’imprudence, c’est par exemple…", c: ["un briefing un peu long", "laisser un élève seul en immersion", "oublier le nom d’un élève", "commencer la séance en retard"], a: 1, e: "Un manque de prudence qui crée un risque." },
      { q: "Les prérogatives de l’initiateur sont fixées par…", c: ["le club, selon ses habitudes", "le Code du sport et la FFESSM", "l’initiateur lui-même", "le moniteur de chaque séance"], a: 1, e: "Ce sont des règles nationales." },
      { q: "Le DP modifie l’exercice prévu à cause du courant. Tu…", c: ["fais quand même ce qui était prévu", "appliques sa décision", "demandes l’avis des élèves", "annules toute la séance seul"], a: 1, e: "Le DP a la vue d’ensemble." },
      { q: "L’assurance qui couvre la responsabilité civile est souvent…", c: ["liée à la licence ou à la structure", "à prendre à chaque séance", "réservée aux moniteurs", "inexistante pour les initiateurs"], a: 0, e: "À vérifier selon ta licence et ton club." }
    ]
  });

  /* ---------- Compléments des thèmes existants ---------- */
  C.extend("e2-role", { quiz: [
    { q: "Ton élève te demande pourquoi tu purges ton gilet avant de descendre. C’est l’occasion…", c: ["de lui dire de ne pas s’en occuper", "d’expliquer simplement, en montrant", "de lui faire un cours complet sur Mariotte", "de remettre l’explication à son N2"], a: 1, e: "L’exemplarité passe aussi par l’explication." },
    { q: "Ta posture d’initiateur, c’est d’être…", c: ["bienveillant et exigeant sur la sécurité", "très strict pour être respecté par tous", "copain avec tous les élèves du groupe", "discret pour ne jamais gêner les élèves"], a: 0, e: "Encourager sans laisser passer un geste dangereux." },
    { q: "Un élève te voit plonger sans vérifier ton bloc. Le message qu’il retient ?", c: ["Que c’est inutile pour un encadrant", "Que tu as beaucoup d’expérience", "Que la vérification est facultative", "Qu’il faut toujours vérifier avant"], a: 2, e: "On enseigne aussi par l’exemple, bon ou mauvais." },
    { q: "Pour devenir initiateur, on suit en général…", c: ["un stage de formation et une évaluation", "une simple journée d’observation", "un examen écrit seulement", "rien de plus que le N2"], a: 0, e: "Formation et prérequis : à vérifier avec ton formateur." },
    { q: "Dans la vie du club, l’initiateur participe souvent…", c: ["aux baptêmes, à la piscine et aux sorties", "uniquement aux examens de niveau 3", "seulement à la gestion du compresseur", "aux plongées profondes de nuit"], a: 0, e: "C’est un rôle de terrain, au contact des débutants." },
    { q: "Un élève se trompe de signe pendant l’exercice. Tu réagis…", c: ["en montrant ton agacement", "calmement, en refaisant le bon signe", "en arrêtant toute la séance", "en le notant comme échec au carnet"], a: 1, e: "Calme et clarté rassurent l’élève." },
    { q: "Ce qui distingue l’initiateur d’un simple plongeur confirmé ?", c: ["Il a beaucoup plus de plongées à son carnet", "Il sait transmettre et sécuriser un apprentissage", "Il possède un matériel plus complet et récent", "Il plonge plus profond que les autres membres"], a: 1, e: "Savoir faire ne suffit pas : il faut savoir faire apprendre." },
    { q: "Ton élève progresse moins vite que les autres. Tu…", c: ["le compares aux autres pour le motiver", "adaptes le rythme sans le mettre à l’écart", "le confies à quelqu’un d’autre", "lui conseilles d’arrêter"], a: 1, e: "Chacun progresse à son rythme." },
    { q: "Le premier objectif de l’initiateur, à chaque séance ?", c: ["finir tout le programme prévu", "que l’élève progresse en sécurité", "valider le plus de compétences possible", "faire une séance plus longue"], a: 1, e: "Sécurité et progrès, dans cet ordre." }
  ] });

  C.extend("e2-peda", { quiz: [
    { q: "Un objectif « vérifiable », c’est…", c: ["un objectif dont on peut constater la réussite", "un objectif écrit dans le carnet", "un objectif fixé par le président", "un objectif que l’élève choisit seul"], a: 0, e: "On doit pouvoir dire : réussi ou pas encore." },
    { q: "Pendant ta démonstration, l’élève doit être placé…", c: ["derrière toi, pour copier exactement tes gestes", "face à toi, à bonne distance pour bien voir", "à côté de toi, en regardant le fond du bassin", "en surface, pour voir l’ensemble du geste de haut"], a: 1, e: "Il doit voir le geste en entier." },
    { q: "Une démonstration décomposée sert à…", c: ["montrer chaque étape d’un geste complexe", "gagner du temps sur la séance", "montrer qu’on maîtrise le geste", "occuper l’élève pendant la pause"], a: 0, e: "On montre le geste en entier, puis par étapes." },
    { q: "Ton élève a réussi l’exercice mais très crispé. Ton retour…", c: ["« Parfait, on passe tout de suite à la suite »", "« Bien réussi ; la prochaine fois, respire plus calmement »", "« Ce n’était pas bon du tout, on recommence »", "Aucun retour : il a réussi, c’est l’essentiel"], a: 1, e: "Ce qui est réussi, puis un point d’amélioration." },
    { q: "Du statique au dynamique, cela veut dire…", c: ["d’abord immobile, puis en mouvement", "d’abord en mouvement, puis immobile", "d’abord en piscine, puis en mer", "d’abord seul, puis en groupe"], a: 0, e: "Exemple : vider son masque posé, puis en palmant." },
    { q: "Pourquoi un seul point de correction à la fois ?", c: ["Pour ne pas surcharger l’attention de l’élève", "Pour que la séance dure plus longtemps", "Parce que les autres points sont inutiles", "Pour garder des choses à dire la fois suivante"], a: 0, e: "Plusieurs corrections à la fois, aucune ne passe." },
    { q: "Après ta démonstration, l’élève…", c: ["essaie à son tour, tu observes", "regarde une deuxième démonstration", "passe à l’exercice suivant", "écrit ce qu’il a vu"], a: 0, e: "Expliquer, montrer, faire faire, corriger." },
    { q: "Pour corriger un geste, il est souvent plus efficace…", c: ["de montrer à nouveau le bon geste", "de faire une longue explication en surface", "de lister toutes les erreurs", "de laisser l’élève trouver seul"], a: 0, e: "Une image vaut beaucoup de mots sous l’eau." },
    { q: "La progression d’une saison va…", c: ["du simple au complexe", "du complexe au simple", "selon l’envie de l’élève", "dans l’ordre du manuel uniquement"], a: 0, e: "Chaque étape s’appuie sur la précédente." }
  ] });

  C.extend("e2-seance", { quiz: [
    { q: "Le plan B d’une séance sert…", c: ["si les conditions ou l’élève empêchent le plan prévu", "pour organiser une deuxième séance le même jour", "à remplacer le briefing quand on manque de temps", "à occuper les élèves arrivés en avance au bord"], a: 0, e: "Froid, élève fatigué, piscine bondée : on s’adapte." },
    { q: "Dans la fiche de séance, l’objectif doit être…", c: ["un seul, précis et vérifiable", "la liste de tout le programme", "le même pour tous les élèves de l’année", "facultatif si la séance est courte"], a: 0, e: "Un objectif clair guide toute la séance." },
    { q: "Au briefing, on précise les signes…", c: ["utiles pour l’exercice du jour", "de tout le manuel fédéral", "seulement si l’élève les demande", "après l’immersion"], a: 0, e: "Les signes du jour, revus juste avant." },
    { q: "Pendant la séance, la durée de chaque exercice…", c: ["s’adapte au froid et à la fatigue de l’élève", "est fixée à l’avance sans exception", "dépend du temps de piscine restant", "est la même pour tous"], a: 0, e: "La séance sert l’élève, pas la montre." },
    { q: "Au débriefing, après le ressenti de l’élève, tu…", c: ["donnes ton avis : réussites, puis un point à travailler", "passes directement à la préparation de la séance suivante", "lui fais signer la fiche de séance pour la valider", "lui donnes une note sur 20 et la liste de ses erreurs"], a: 0, e: "On termine par la suite de la progression." },
    { q: "Avant de partir en séance, l’initiateur vérifie le matériel…", c: ["de ses élèves et le sien", "seulement le sien", "seulement celui des élèves", "jamais, c’est le rôle du gonfleur"], a: 0, e: "Air ouvert, gilet, lest, masque : pour tous." },
    { q: "Tu as deux élèves de niveaux différents. Tu…", c: ["adaptes l’exercice à chacun", "fais tout au rythme du plus rapide", "fais tout au rythme du plus lent", "laisses le plus avancé seul"], a: 0, e: "Même séance, objectifs individualisés." },
    { q: "La fin d’une séance doit laisser l’élève…", c: ["sur une réussite", "sur un échec à retravailler", "fatigué pour progresser", "sans retour pour réfléchir"], a: 0, e: "On finit sur ce qu’il réussit." },
    { q: "Une séance trop chargée provoque surtout…", c: ["fatigue, froid et confusion", "une meilleure mémorisation", "plus de motivation", "un gain de temps sur la saison"], a: 0, e: "Mieux vaut un objectif atteint que trois survolés." }
  ] });

  C.extend("e2-secu", { quiz: [
    { q: "En baptême, l’encadrant tient en général le baptisé…", c: ["par le bras ou le gilet, en contact permanent", "à distance pour lui laisser de l’autonomie", "seulement en cas de problème", "par la palme"], a: 0, e: "Le contact permet d’agir immédiatement." },
    { q: "Avant un baptême, on vérifie surtout que le baptisé…", c: ["n’a pas de contre-indication et se sent bien", "connaît tous les signes de plongée", "sait vider son masque", "a déjà plongé en piscine"], a: 0, e: "Questionnaire de santé et état du jour." },
    { q: "Le premier signe à apprendre au baptisé ?", c: ["OK et « ça ne va pas »", "La réserve et le mi-bloc", "Le froid et la remontée", "Descendre et remonter"], a: 0, e: "Pouvoir dire « ça va » et « ça ne va pas » suffit au début." },
    { q: "Un baptisé respire très vite en surface avant l’immersion. Tu…", c: ["attends qu’il se calme avant de descendre", "descends vite pour le distraire de son stress", "lui fais faire une petite apnée pour le calmer", "annules le baptême sans lui donner de raison"], a: 0, e: "On ne descend jamais avec un plongeur essoufflé ou stressé." },
    { q: "Pendant un baptême, la profondeur…", c: ["reste faible et contrôlée par l’encadrant", "dépend de l’envie du baptisé", "est la plus grande possible pour impressionner", "n’est pas surveillée"], a: 0, e: "L’encadrant gère profondeur et flottabilité." },
    { q: "Le baptisé lâche son embout. Tu…", c: ["le lui remets en bouche et le fais purger", "attends qu’il le retrouve seul", "remontes en surface rapidement", "lui donnes ton détendeur principal"], a: 0, e: "Il ne connaît pas le geste : c’est à toi d’agir." },
    { q: "Un baptisé a de l’eau dans le masque et s’agite. Tu…", c: ["le stabilises et vides son masque avec lui", "le laisses gérer seul pour apprendre", "remontes vite à la surface", "lui retires le masque"], a: 0, e: "On rassure d’abord, on règle ensuite." },
    { q: "La fin du baptême se fait…", c: ["par une remontée lente, en contact", "par une remontée libre du baptisé", "en surface, avec l’élève seul", "par une remontée rapide pour finir"], a: 0, e: "Contrôle jusqu’à la surface." },
    { q: "Après le baptême, on…", c: ["demande son ressenti et l’aide à se déséquiper", "le laisse sortir seul de l’eau", "range son matériel en premier", "lui propose une deuxième plongée profonde"], a: 0, e: "Un bon souvenir donne envie de revenir." }
  ] });

  C.extend("e2-com", { quiz: [
    { q: "Une consigne efficace est…", c: ["courte, positive et précise", "longue et détaillée", "donnée sous l’eau", "répétée en criant"], a: 0, e: "« Expire en remontant » plutôt que « ne bloque pas »." },
    { q: "Ton signe sous l’eau doit être…", c: ["ample, lent et bien visible", "rapide et discret", "fait contre ton corps", "accompagné de bruits"], a: 0, e: "Visibilité réduite, attention réduite : on exagère." },
    { q: "L’élève ne répond pas à ton OK. Tu…", c: ["t’approches et refais le signe face à lui", "continues l’exercice, il a sûrement mal vu", "remontes immédiatement seul pour prévenir", "attends la fin de la séance pour lui en parler"], a: 0, e: "Pas de réponse = on vérifie tout de suite." },
    { q: "En surface, pour être entendu malgré le vent…", c: ["tu te rapproches et parles face à l’élève", "tu cries plus fort depuis l’échelle du bateau", "tu utilises les signes de plongée en surface", "tu attends d’être au bord pour lui expliquer"], a: 0, e: "La communication en surface demande de la proximité." },
    { q: "Un élève dit qu’il a peur. Ta première réponse ?", c: ["L’écouter et prendre sa peur au sérieux", "Lui dire qu’il n’y a pas de raison", "Le comparer à un élève courageux", "Changer de sujet"], a: 0, e: "Écouter avant de rassurer." },
    { q: "Pour motiver un élève, il vaut mieux…", c: ["souligner ses progrès concrets", "le comparer aux autres", "lui fixer un objectif très dur", "ne rien lui dire"], a: 0, e: "Le progrès vu motive." },
    { q: "Un élève bloque à cause du froid. La cause est…", c: ["physique : on agit sur le froid", "pédagogique : on réexplique", "psychologique : on le rassure", "inconnue : on continue"], a: 0, e: "Chercher la vraie cause avant d’agir." },
    { q: "Au briefing, pour vérifier les signes, tu…", c: ["les fais refaire par l’élève", "les montres une fois rapidement", "les écris sur une ardoise", "supposes qu’il les connaît"], a: 0, e: "Faire faire vérifie mieux qu’expliquer." },
    { q: "Ta voix et ton attitude, avec un élève stressé…", c: ["calmes et posées", "énergiques et rapides", "fermes et sévères", "indifférentes"], a: 0, e: "Le calme de l’encadrant se transmet." }
  ] });

  C.extend("e1-piscine", { essentiel: `
<h3>La progression type en piscine</h3>
<ol><li>Respirer sur le détendeur en surface, visage dans l’eau.</li>
<li>S’immerger en douceur, équilibrer les oreilles.</li>
<li>Respirer calmement au fond, à genoux ou allongé.</li>
<li>Lâcher et reprendre l’embout.</li>
<li>Vider le masque, d’abord partiellement, puis complètement.</li>
<li>Demander de l’air et respirer sur l’octopus.</li>
<li>Palmer, se stabiliser au gilet, puis au poumon-ballast.</li></ol>
<p>On ne passe à l’étape suivante que lorsque la précédente est <b>calme et répétée</b>.</p>
<h3>Organisation du bassin</h3>
<ul><li>Un <b>espace défini</b> pour son groupe, à l’écart des autres activités.</li>
<li>Un nombre d’élèves <b>limité</b>, que l’on voit tous à chaque instant.</li>
<li>Du matériel <b>vérifié</b> avant d’entrer dans l’eau.</li></ul>
` , quiz: [
    { q: "Avant la première immersion, l’élève respire sur le détendeur…", c: ["en surface, visage dans l’eau", "directement au fond du bassin", "hors de l’eau, assis au bord", "en apnée d’abord"], a: 0, e: "On découvre la sensation sans pression ni profondeur." },
    { q: "Le vidage de masque s’apprend d’abord…", c: ["avec un masque partiellement rempli", "masque complètement retiré, puis remis", "en pleine eau, en palmant doucement", "en apnée, sans détendeur en bouche"], a: 0, e: "On augmente la difficulté pas à pas." },
    { q: "Pourquoi un espace défini pour son groupe ?", c: ["Pour voir tous ses élèves et éviter les autres activités", "Pour avoir la meilleure place du bassin pendant le créneau", "Pour que les élèves de groupes différents ne se mélangent pas", "Pour pouvoir limiter précisément la durée de la séance"], a: 0, e: "Surveillance et sécurité." },
    { q: "Le poumon-ballast s’apprend…", c: ["après la stabilisation au gilet", "avant la respiration sur le détendeur", "en même temps que le vidage de masque", "uniquement en mer"], a: 0, e: "On affine une stabilisation déjà dégrossie." },
    { q: "Un élève ne peut pas équilibrer à 2 m. Tu…", c: ["remontes un peu, il réessaie doucement", "l’aides à descendre plus vite pour passer", "lui dis de souffler plus fort, nez pincé", "continues avec les autres, il rejoindra"], a: 0, e: "On ne force jamais sur les oreilles." },
    { q: "En piscine, les jeux doivent toujours…", c: ["travailler un vrai geste de plongée", "remplacer les exercices trop difficiles", "être faits en apnée pour varier la séance", "être compétitifs pour motiver les élèves"], a: 0, e: "Un jeu utile vaut mieux qu’un jeu pour occuper." },
    { q: "Combien d’élèves l’initiateur suit-il dans l’eau ?", c: ["Un nombre limité qu’il voit à tout instant", "Tous ceux inscrits sur le créneau du jour", "Autant que la ligne d’eau peut en contenir", "Un seul obligatoirement, quel que soit le cas"], a: 0, e: "Effectifs fixés par les règles : à vérifier." },
    { q: "Pourquoi éviter les apnées prolongées en fin de séance ?", c: ["Risque de syncope avec la fatigue", "Elles font consommer de l’air", "Elles abîment le matériel", "Elles sont interdites aux adultes"], a: 0, e: "Fatigue et froid augmentent le risque." },
    { q: "Avant d’entrer dans l’eau, on vérifie…", c: ["le matériel de chaque élève", "seulement les blocs", "seulement les masques", "rien, le matériel du club est sûr"], a: 0, e: "Air ouvert, gilet, détendeur, masque." },
    { q: "L’élève fait le signe « ça ne va pas » au fond. Tu…", c: ["t’approches, cherches la cause, remontes si besoin", "lui fais signe de continuer, ça va sûrement passer", "termines d’abord l’exercice des autres élèves", "remontes seul prévenir le responsable de séance"], a: 0, e: "Le signe d’un élève passe avant tout le reste." }
  ] });

  C.extend("e2-enseigner20", { quiz: [
    { q: "En mer, le premier exercice d’une séance se fait plutôt…", c: ["peu profond, près d’un repère", "au plus profond prévu", "en pleine eau, sans repère", "pendant la remontée"], a: 0, e: "On commence là où l’élève est le plus à l’aise." },
    { q: "Pourquoi enseigner sur un fond de sable ?", c: ["L’élève peut se poser sans abîmer la vie", "L’eau y est plus chaude", "Le courant y est plus fort", "La visibilité y est toujours meilleure"], a: 0, e: "Un appui sûr et respectueux du milieu." },
    { q: "Le nombre d’élèves par encadrant, en enseignement…", c: ["est limité par la réglementation", "dépend de la visibilité seulement", "est libre si l’eau est calme", "est fixé par l’élève"], a: 0, e: "À vérifier avec ton formateur." },
    { q: "Plus profond, l’élève…", c: ["consomme plus et peut être gêné par la narcose", "consomme moins car il respire plus lentement", "n’a plus besoin d’équilibrer ses oreilles", "est plus calme car la lumière est plus douce"], a: 0, e: "On adapte la durée et la complexité." }
  ] });

  C.extend("e2-securite", { essentiel: `
<h3>Le partage de l’attention</h3>
<p>En enseignement, l’encadrant surveille à la fois <b>l’élève qui fait l’exercice</b> et <b>ceux qui attendent</b>. Ceux qui attendent restent groupés, posés ou stabilisés, dans son champ de vision.</p>
<h3>Le matériel de l’encadrant</h3>
<p>Il porte un équipement complet de secours : <b>octopus</b> accessible, éventuellement un <b>parachute</b>, et il connaît l’emplacement de l’oxygène et de la trousse.</p>
`, quiz: [
    { q: "Pendant qu’un élève fait l’exercice, les autres…", c: ["restent groupés dans le champ de vision", "visitent un peu le site en attendant leur tour", "remontent attendre en surface près du bateau", "font un autre exercice seuls à côté du groupe"], a: 0, e: "L’encadrant doit voir tout le monde." },
    { q: "L’octopus de l’encadrant doit être…", c: ["accessible et bien visible", "rangé dans une poche fermée", "facultatif en enseignement", "prêté à l’élève au début"], a: 0, e: "Il sert en cas de panne d’air d’un élève." },
    { q: "Un élève fait une remontée rapide. Pour toi, la priorité est…", c: ["le reste du groupe, puis la surface en sécurité", "le rattraper à toute vitesse pour le freiner", "noter l’heure et la profondeur pour le rapport", "terminer l’exercice des autres avant de remonter"], a: 0, e: "Ne pas mettre le reste du groupe en danger." },
    { q: "Avant l’exercice, l’encadrant vérifie l’air…", c: ["de chaque élève", "seulement le sien", "seulement à la fin", "jamais, l’élève le dit"], a: 0, e: "Un exercice se fait avec assez d’air." },
    { q: "En séance, l’encadrant connaît l’emplacement…", c: ["de l’oxygène et de la trousse de secours", "du compresseur et du tableau de gonflage", "du local à matériel et des blocs de secours", "des vestiaires et du poste de surveillance"], a: 0, e: "Pour agir vite en cas d’accident." },
    { q: "Un élève devient pâle et nauséeux au fond. Tu…", c: ["arrêtes et remontes calmement avec lui", "continues pour finir l’exercice", "le laisses se reposer seul", "lui fais boire de l’eau"], a: 0, e: "Signe d’un malaise : on arrête." }
  ] });

  C.extend("e2-evaluer", { essentiel: `
<h3>Les erreurs d’évaluation</h3>
<ul><li><b>L’effet de halo</b> : juger tout l’élève sur une seule qualité (il est sympa, donc il plonge bien).</li>
<li><b>La première impression</b> : un premier essai raté colle à l’élève.</li>
<li><b>La comparaison</b> : juger par rapport aux autres plutôt que par rapport aux critères.</li></ul>
<p>Le remède : des <b>critères observables</b>, connus de l’élève, vérifiés plusieurs fois.</p>
`, quiz: [
    { q: "L’effet de halo, c’est…", c: ["juger l’élève sur une seule qualité", "juger dans l’eau trouble", "juger plusieurs élèves à la fois", "juger trop tard"], a: 0, e: "Un critère précis évite ce piège." },
    { q: "Pour évaluer, on compare l’élève…", c: ["aux critères de la compétence", "aux autres élèves du groupe", "à l’encadrant", "à ses parents plongeurs"], a: 0, e: "On juge un geste, pas une personne." },
    { q: "L’élève doit connaître les critères…", c: ["avant l’exercice", "après la validation", "jamais, pour ne pas tricher", "seulement s’il échoue"], a: 0, e: "Il sait ce qu’on attend de lui." },
    { q: "Un premier essai raté, puis trois réussis. Tu retiens…", c: ["les réussites récentes et régulières", "le premier échec, plus révélateur", "la moyenne des quatre essais réalisés", "rien : il faut tout recommencer"], a: 0, e: "Attention à l’effet de première impression." },
    { q: "Un critère observable, par exemple ?", c: ["« Reste à moins d’un mètre de sa profondeur »", "« Se sent bien à l’aise pendant tout l’exercice »", "« Fait vraiment de son mieux à chaque essai »", "« Comprend bien le but et le déroulé de l’exercice »"], a: 0, e: "On doit pouvoir le voir." },
    { q: "Une validation se note…", c: ["dans le carnet, avec la date", "sur une feuille volante", "dans sa tête", "sur la fiche de sécurité"], a: 0, e: "Elle doit être retrouvée par un autre encadrant." },
    { q: "Un élève n’a pas encore validé. Tu lui dis…", c: ["ce qui manque et comment y arriver", "qu’il a échoué", "rien, pour ne pas le décourager", "de recommencer sans précision"], a: 0, e: "« Pas encore » plutôt que « raté »." }
  ] });

  C.addCards([
    { id: "x1-c1", m: "e1-cursus", f: "But du N1", b: "Plonger encadré, autonome sur son matériel, gestes de base maîtrisés." },
    { id: "x1-c2", m: "e1-cursus", f: "Compétence acquise", b: "Réussie calmement, plusieurs fois, en situation." },
    { id: "x1-a1", m: "e1-apprendre", f: "Trois phases d’apprentissage", b: "Découverte, stabilisation, automatisation." },
    { id: "x1-a2", m: "e1-apprendre", f: "Bon retour", b: "Rapide, précis, positif : ce qui est réussi, puis un point." },
    { id: "x1-x1", m: "e1-exercices", f: "Risque du lâcher d’embout", b: "Bloquer sa respiration : souffler de petites bulles." },
    { id: "x1-x2", m: "e1-exercices", f: "Interdits en séance", b: "Apnée prolongée, hyperventilation, remontées répétées." },
    { id: "x1-t1", m: "e1-cours", f: "Plan d’un cours", b: "Accroche, objectif, développement, vérification, conclusion." },
    { id: "x1-p1", m: "e1-public", f: "Enfants", b: "Court, ludique, froid surveillé, matériel à sa taille." },
    { id: "x1-r1", m: "e1-cadre", f: "Civile ou pénale ?", b: "Civile : réparer, assurée. Pénale : sanctionner, personnelle." },
    { id: "x1-r2", m: "e1-cadre", f: "Avant la séance", b: "Licence, certificat médical, matériel de secours, fiche." }
  ]);

  C.notions = Object.assign(C.notions || {}, {
    "e2-role": [["posture", "Posture et exemplarité", "exemple|exemplair|copie|posture|bienveill|exige", "posture"], ["cadre", "Cadre et parcours", "moniteur|autorite|0 a 6|e2|guide|stage|zone", "autorité"], ["priorite", "La sécurité d’abord", "securite|conflit|purge|progress", "sécurité"]],
    "e2-peda": [["obj", "Objectif pédagogique", "objectif|verifiable", "objectif"], ["demo", "Démonstration", "demonstr|montrer|decompos|face", "démonstration"], ["retour", "Retour et correction", "retour|corrig|point|reussi|progression|statique", "retour"]],
    "e2-seance": [["avant", "Préparer : fiche et briefing", "fiche|briefing|objectif|plan b|signes|verifie le materiel", "briefing"], ["pendant", "Pendant la séance", "pendant|contact|duree|froid|niveaux|charge", "Pendant"], ["apres", "Débriefing et suite", "debrief|ressenti|noter|fin d.une seance|reussite", "débriefing"]],
    "e2-secu": [["bapteme", "Le baptême", "bapte|consignes|contre-indication|tient|profondeur|fin du", "baptême"], ["stress", "Stress et panique", "stress|panique|respire tres vite|agite|yeux", "stress"], ["incidents", "Incidents fréquents", "oreille|masque|embout|douleur|0 a 6", "Incidents"]],
    "e2-com": [["consigne", "Consignes et signes", "consigne|signe|ok|ample", "consigne"], ["difficulte", "Élève en difficulté", "bloque|echoue|cause|froid|peur", "difficulté"], ["motiver", "Motiver", "motiv|progres|calme|voix", "Motiver"]],
    "e1-piscine": [["progression", "Progression en piscine", "premier|surface|vidage|poumon|gilet|equilibr|apres les gestes", "progression"], ["jeu", "Jeux pédagogiques", "jeu|jeux", "jeux"], ["secu", "Sécurité du bassin", "apnee|surpression|espace|eleves|verifie|ne va pas|responsable", "Sécurité"]],
    "e2-enseigner20": [["seance", "Séance en milieu naturel", "seance|briefing|ordre|objectif|sable|repere|premier exercice", "séance"], ["progression", "Progression en profondeur", "6 m|20 m|automatique|profond|panique", "Progresser"], ["eval", "Corriger et évaluer", "corrig|maitris|bilan|point", "Corriger"]],
    "e2-securite": [["anticiper", "Anticiper", "verifie|forme|lest|air|avant|oxygene|octopus", "Anticiper"], ["surveiller", "Surveiller le groupe", "portee|groupe|surveill|champ|autres", "Surveiller"], ["intervenir", "Intervenir", "stress|remontee|froid|pale|panne|intervenir", "Intervenir"]],
    "e2-evaluer": [["observer", "Observer", "observ|regarde|un point", "Observer"], ["corriger", "Corriger", "corrig|montrer|commence|valoris", "Corriger"], ["valider", "Valider sans biais", "valid|critere|carnet|halo|compare|premier essai", "Valider"]],
    "e1-cursus": [["but", "But et contenu du N1", "n1|encadre|brevet|materiel|table|theorie|palier", "N1"], ["ordre", "Ordre de la progression", "commence|ordre|equilibr|respir|anxieux|embout|panne", "ordre"], ["valid", "Valider une compétence", "acquise|carnet|valid|reprend|competence", "compétence"]],
    "e1-apprendre": [["phases", "Les trois phases", "decouverte|stabilisation|automatis|compliquer|transfert", "phases"], ["attention", "Attention et retour", "consigne|retour|corrige|attention|expliquer, montrer", "retour"], ["motiv", "Motivation", "motiv|echoue|objectif|plaisir|erreur", "motivation"]],
    "e1-exercices": [["gestes", "Gestes du N1", "vidage|embout|air|palmage|stabilis|octopus", "vidage"], ["secu", "Règles de sécurité", "hyperventil|apnee|remontees|surpression|froid|place|surveille", "sécurité"], ["deroule", "Déroulé d’un exercice", "moment|repere|signe|retiens|avant chaque", "déroulé"]],
    "e1-cours": [["preparer", "Préparer un cours", "idees|objectif|court|prepare|schema|objet", "Préparer"], ["captiver", "Captiver et faire participer", "accroche|exemple|particip|mot technique|avion|hors sujet", "accroche"], ["verifier", "Vérifier et conclure", "compris|question ouverte|conclusion|reformule", "Vérifier"]],
    "e1-public": [["enfant", "Les enfants", "enfant", "enfant"], ["anxieux", "Adultes anxieux", "anxieux|peur|refuse|signe d.arret", "anxieux"], ["autres", "Seniors et handicap", "senior|60 ans|fauteuil|handisub|certificat|adapte", "Seniors"]],
    "e1-cadre": [["prerog", "Prérogatives et autorité", "prerogativ|autorite|dp|directeur|responsable|refuser", "prérogatives"], ["resp", "Responsabilités", "civile|penale|obligation|assurance|imprudence|faute|prouve", "responsabilité"], ["avant", "Avant et après la séance", "licence|certificat|secours|compte|enrhume", "licence"]]
  });
})();
