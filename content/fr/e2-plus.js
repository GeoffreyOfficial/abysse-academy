/* =====================================================================
   Abysse Academy 2.3 · E2 (enseigner jusqu’à 20 m) complet
   Quatre thèmes ajoutés : le N1 en milieu naturel, organiser une séance
   en mer, exercices du N1 en mer, incidents d’élève. Notions du tuteur.
   Les points réglementaires sont signalés « à faire valider ».
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content, D = C.dgb || {};
  const VAL = `<div class="callout trap"><span class="eyebrow">À faire valider</span>`;

  if (D.flow) C.addDiagrams({
    "e2-mer": () => D.flow([["Piscine", "Gestes appris au calme, eau chaude, fond visible."], ["Mer peu profonde", "Les mêmes gestes, sur fond de sable, près d’un repère."], ["Mer jusqu’à 12-15 m", "Gestes en mouvement, stabilisation en pleine eau."], ["Mer jusqu’à 20 m", "Plongée complète, l’élève gère ses gestes sans y penser."]], "Le transfert piscine vers mer : on recommence peu profond, puis on descend quand c’est automatique."),
    "e2-orga": () => D.flow([["La veille", "Météo, site, matériel, liste d’élèves et objectifs."], ["Au départ", "Fiche de sécurité, consignes du DP, vérification du matériel."], ["Briefing", "Objectif, déroulé, signes, profondeur, durée, incidents."], ["Immersion", "Descente au bout, exercices, découverte, remontée."], ["Retour", "Compte rendu au DP, débriefing, carnet rempli."]], "Une séance en mer, de la veille au carnet."),
    "e2-exmer": () => D.flow([["Descente", "Au bout ou au pendeur, en contrôlant les oreilles."], ["Sur le fond", "Exercices à genoux ou stabilisés, près d’un repère."], ["En pleine eau", "Stabilisation, palmage, signes en mouvement."], ["Remontée", "Lente, en expirant, palier de sécurité ensemble."]], "Où placer chaque exercice pendant une plongée d’enseignement en mer."),
    "e2-inc": () => D.cycle(["Voir tôt", "Stabiliser", "Régler ou remonter", "Rendre compte"], "Tout incident d’élève", "La même logique pour tous les incidents : repérer, stabiliser, décider, puis informer le DP.")
  });

  C.module({
    id: "e2-n1mer", world: "e2", depth: "−10 m", icon: "wave",
    title: "Le N1 en milieu naturel",
    sub: "Passer de la piscine à la mer",
    diagram: "e2-mer",
    essentiel: `
<p>L’E2 accompagne l’élève de la piscine jusqu’aux <b>plongées du N1 en mer</b>. Le défi : retrouver en mer des gestes appris au calme.</p>
<h3>Ce qui change en mer</h3>
<ul><li><b>Froid</b> : combinaison plus épaisse, plus de lest, gestes moins précis.</li>
<li><b>Visibilité</b> : on voit moins le fond, moins son encadrant.</li>
<li><b>Mouvement</b> : houle, courant, mise à l’eau du bateau.</li>
<li><b>Émotion</b> : la profondeur impressionne, le stress réduit l’attention.</li></ul>
<h3>Comment faire</h3>
<ul><li>Les premières plongées se font <b>peu profond</b>, sur un fond de sable, avec un repère.</li>
<li>On <b>refait</b> les gestes de piscine : vidage de masque, embout, demande d’air.</li>
<li>On descend plus profond <b>quand ils sont automatiques</b>.</li>
<li>On laisse une grande place à la <b>découverte</b> : c’est la récompense.</li></ul>
<h3>Ce que l’élève apprend en plus</h3>
<ul><li><b>Mise à l’eau</b> : bascule arrière, saut droit, selon le bateau.</li>
<li><b>Descente au bout</b> en contrôlant ses oreilles.</li>
<li><b>Remontée</b> lente, en regardant son encadrant, palier de sécurité ensemble.</li>
<li><b>Retour au bateau</b> : se déséquiper dans l’eau, monter à l’échelle.</li></ul>
${VAL}Profondeurs autorisées pour chaque étape de la formation N1 en milieu naturel, et prérogatives exactes de l’E2 : à vérifier dans les textes en vigueur avec ton formateur.</div>
`,
    memo: [["Transfert", "En mer, on recommence peu profond."], ["Descendre", "Quand le geste est automatique moins profond."], ["En plus", "Mise à l’eau, descente au bout, retour au bateau."]],
    moniteur: ["Quelle progression de profondeur suit-on au club pour les N1 en mer ?"],
    quiz: [
      { q: "Pour sa première plongée en mer, l’élève N1 descend…", c: ["directement à la profondeur maximale prévue pour le N1", "peu profond, sur un fond de sable avec un repère", "dans le bleu, pour découvrir tout de suite la pleine eau", "à la profondeur choisie par l’élève lui-même"], a: 1, e: "On retrouve d’abord les gestes de piscine." },
      { q: "Qu’est-ce qui rend les gestes plus difficiles en mer ?", c: ["Froid, visibilité, mouvement et émotion", "Uniquement le sel, qui irrite les yeux sous le masque", "La densité plus forte de l’eau salée", "Rien de particulier, si la piscine a été bien faite"], a: 0, e: "Tout réduit l’attention disponible." },
      { q: "En mer, l’élève a besoin d’un peu plus de lest parce que…", c: ["l’eau de mer et la combinaison épaisse le portent plus", "le bloc utilisé en mer est plus léger qu’en piscine", "l’encadrant le demande toujours pour les débutants", "la houle de surface a tendance à le faire remonter"], a: 0, e: "On refait un contrôle de lestage en surface." },
      { q: "On emmène l’élève plus profond quand…", c: ["il le demande avec insistance depuis plusieurs séances", "ses gestes sont automatiques moins profond", "il a fait au moins trois plongées en mer", "l’eau est claire et calme ce jour-là"], a: 1, e: "La profondeur ajoute de la difficulté." },
      { q: "Pourquoi garder du temps de découverte en milieu naturel ?", c: ["C’est la récompense qui donne envie de continuer", "Pour finir l’air du bloc avant de remonter", "Pour pouvoir noter les espèces vues dans le carnet", "Pour reposer l’encadrant entre deux exercices"], a: 0, e: "On vient en mer pour voir." },
      { q: "La descente des débutants se fait de préférence…", c: ["en pleine eau, tête en bas, en palmant", "le long d’un bout ou du relief", "en se laissant couler vite, gilet vide", "en palmant fort vers le fond, sans s’arrêter"], a: 1, e: "Un repère aide à contrôler la vitesse et les oreilles." },
      { q: "Pendant la remontée, l’élève regarde…", c: ["la surface pour voir le bateau", "son encadrant et ses bulles", "le fond qui s’éloigne", "son manomètre seulement"], a: 1, e: "Il suit le rythme de l’encadrant." },
      { q: "La mise à l’eau en bascule arrière s’enseigne…", c: ["en expliquant et en vérifiant que tout est tenu", "sans trop d’explication, pour ne pas l’inquiéter avant", "seulement en piscine, jamais depuis un bateau en mer", "uniquement par grosse houle, pour s’entraîner"], a: 0, e: "Masque et détendeur tenus, zone dégagée." },
      { q: "Un élève réussit tout en piscine mais panique à 8 m en mer. Tu…", c: ["remontes à une profondeur où il est à l’aise", "le pousses à continuer, il va s’habituer", "lui fais faire un vidage de masque pour l’occuper", "remontes en surface et arrêtes sa formation"], a: 0, e: "On reprend là où il est bien." },
      { q: "Le retour au bateau, pour un débutant, demande…", c: ["de monter seul à l’échelle tout équipé", "de l’aide pour se déséquiper et monter", "d’attendre que le bateau se rapproche de la côte", "de retirer le masque en premier"], a: 1, e: "Fatigue et houle : on aide." },
      { q: "Le palier de sécurité d’un N1 en mer se fait…", c: ["seul, à son rythme, en lisant son ordinateur", "ensemble, l’encadrant contrôlant la profondeur", "seulement si l’ordinateur de l’élève l’indique", "en surface, en se tenant à l’échelle du bateau"], a: 1, e: "Le N1 n’est pas autonome au palier." },
      { q: "En mer, la visibilité réduite oblige l’encadrant à…", c: ["rester plus près de ses élèves", "plonger plus profond pour trouver de l’eau claire", "donner plus de consignes sous l’eau", "écourter systématiquement la plongée"], a: 0, e: "Garder le contact visuel et à portée de main." },
      { q: "La houle en surface gêne surtout…", c: ["la mise à l’eau, le regroupement et le retour au bateau", "les exercices posés sur le fond, à cause du ressac", "la lecture de l’ordinateur pendant toute la plongée", "la descente sous 10 m, qui devient bien plus lente"], a: 0, e: "On adapte le briefing et l’aide en surface." },
      { q: "Les premiers gestes à revoir en mer sont…", c: ["ceux appris en dernier en piscine", "ventilation, équilibrage, vidage, embout", "les plus difficiles pour gagner du temps", "aucun : ils sont acquis"], a: 1, e: "On revérifie les bases dans le nouveau milieu." },
      { q: "Un élève a froid dès la 10e minute. Tu…", c: ["continues : il s’habituera vite à la température", "écourtes et prévois plus de protection", "lui fais palmer fort pour qu’il se réchauffe", "lui proposes de remonter seul se réchauffer au bateau"], a: 1, e: "Le froid gâche l’apprentissage et augmente les risques." },
      { q: "Le bon fond pour enseigner en mer ?", c: ["Sable, abrité, sans courant", "Tombant rocheux profond et spectaculaire", "Herbier de posidonies dense", "Épave à visiter pour motiver"], a: 0, e: "On se pose sans danger et sans abîmer la vie." }
    ]
  });

  C.module({
    id: "e2-orga", world: "e2", depth: "−12 m", icon: "plan",
    title: "Organiser une séance en mer",
    sub: "Site, DP, briefing, compte rendu",
    diagram: "e2-orga",
    essentiel: `
<p>En mer, une séance d’enseignement se prépare <b>la veille</b> et s’insère dans l’organisation du <b>directeur de plongée</b>.</p>
<h3>Préparer</h3>
<ul><li><b>Météo et site</b> : un site abrité, un fond adapté, peu de courant.</li>
<li><b>Élèves</b> : niveau, objectif de chacun, carnet à jour, matériel et lestage.</li>
<li><b>Plan B</b> : un autre site ou un autre objectif si les conditions changent.</li></ul>
<h3>Avec le DP</h3>
<p>Le DP <b>compose les palanquées</b>, fixe la profondeur et la durée, et note tout sur la <b>fiche de sécurité</b>. L’E2 lui annonce ses objectifs et respecte ses consignes. Au retour, il lui <b>rend compte</b> : paramètres et incidents.</p>
<h3>Le briefing des élèves</h3>
<ol><li><b>Objectif</b> du jour.</li>
<li><b>Déroulé</b> : mise à l’eau, descente, exercices, découverte, remontée.</li>
<li><b>Signes</b> utiles, revus et refaits par les élèves.</li>
<li><b>Paramètres</b> : profondeur, durée, pression de retour.</li>
<li><b>Que faire si</b> : perte de l’encadrant, panne d’air, problème d’oreille.</li></ol>
${VAL}Nombre maximal d’élèves par encadrant en enseignement et conditions de composition des palanquées : fixés par le Code du sport. À vérifier avec ton formateur.</div>
`,
    memo: [["Veille", "Météo, site, élèves, objectifs, plan B."], ["DP", "Il compose et fixe ; tu annonces et rends compte."], ["Briefing", "Objectif, déroulé, signes, paramètres, que faire si."]],
    moniteur: ["Combien d’élèves un E2 peut-il emmener en mer au club ?"],
    quiz: [
      { q: "Qui compose les palanquées et fixe les paramètres ?", c: ["L’E2 qui enseigne aux élèves", "Le directeur de plongée", "Le pilote du bateau, seul à bord", "Les élèves entre eux, selon leur niveau"], a: 1, e: "L’E2 annonce ses objectifs et applique." },
      { q: "Le site idéal pour une séance N1 en mer ?", c: ["Abrité, fond de sable, peu de courant", "Exposé, avec un beau tombant à montrer", "Profond, pour avoir de la marge en dessous", "Une épave pour motiver les élèves du jour"], a: 0, e: "Le confort de l’élève passe avant le spectacle." },
      { q: "Le plan B sert si…", c: ["un élève veut changer de groupe le jour même", "la météo, le site ou un élève empêchent le plan", "le DP n’est pas présent ce jour-là sur le bateau", "le bateau arrive très en avance au mouillage"], a: 1, e: "On a toujours une alternative prête." },
      { q: "Dans le briefing, les élèves doivent apprendre quoi faire s’ils…", c: ["perdent l’encadrant ou manquent d’air", "voient un poisson rare et veulent le suivre", "veulent prendre une photo pendant un exercice", "ont envie de descendre plus profond que prévu"], a: 0, e: "Les incidents prévus font moins peur." },
      { q: "Au retour, l’E2 rend compte au DP…", c: ["de ses paramètres et des incidents", "seulement s’il y a eu un accident grave", "le lendemain, par un message au club", "uniquement des espèces observées pendant la plongée"], a: 0, e: "Le DP clôt la fiche de sécurité." },
      { q: "Avant la sortie, l’E2 vérifie pour chaque élève…", c: ["le niveau, l’objectif et le carnet à jour", "uniquement le paiement de la sortie au club", "la marque et l’âge de son matériel personnel", "son nombre de plongées faites en vacances"], a: 0, e: "Il sait où en est chacun." },
      { q: "Le DP refuse le site prévu à cause du vent. Tu…", c: ["insistes : tes élèves sont prêts", "appliques et passes au plan B", "annules sans prévenir les élèves", "plonges ailleurs sans le dire"], a: 1, e: "Le DP a la vue d’ensemble." },
      { q: "Les signes au briefing sont…", c: ["montrés une fois rapidement par l’encadrant", "revus et refaits par les élèves", "distribués sur une feuille plastifiée à lire", "laissés pour sous l’eau, au moment voulu"], a: 1, e: "Faire faire vérifie qu’ils sont compris." },
      { q: "La pression de retour se fixe…", c: ["au briefing, avant la mise à l’eau", "au fond, selon la consommation de chacun ce jour-là", "à la fin, quand le bloc est presque vide", "par l’élève lui-même, librement, selon son ressenti"], a: 0, e: "Elle fait partie des paramètres annoncés." },
      { q: "La fiche de sécurité est tenue par…", c: ["le directeur de plongée", "chaque élève, pour sa palanquée", "le pilote du bateau, seul", "l’E2, pour ses seuls élèves"], a: 0, e: "Elle trace qui plonge, où, combien de temps." },
      { q: "Un élève a oublié son carnet. Tu…", c: ["refuses qu’il plonge ce jour-là", "notes la séance et la reportes ensuite", "ne notes rien, la séance ne compte pas", "valides tout de mémoire à la fin de la saison"], a: 1, e: "Ce n’est pas un problème de sécurité, mais la trace doit être faite." },
      { q: "Le lestage d’un élève en mer se vérifie…", c: ["en surface, gilet vide, en début de plongée", "au fond, en le laissant flotter quelques secondes", "à terre, en pesant le lest sur une balance", "jamais : on reprend celui qui allait en piscine"], a: 0, e: "Contrôle simple, avant la descente." },
      { q: "La veille d’une séance, l’E2 consulte la météo pour…", c: ["choisir un site adapté et prévoir le plan B", "savoir s’il fera assez beau pour les photos", "annuler la sortie à la moindre brise annoncée", "fixer l’heure de départ la plus agréable possible"], a: 0, e: "Il prépare au lieu de subir." },
      { q: "Pendant la séance, l’E2 respecte la profondeur…", c: ["fixée par le DP et adaptée aux élèves", "que l’élève demande, s’il se sent bien", "la plus grande permise par ses prérogatives", "indiquée sur la carte du site de plongée"], a: 0, e: "La plus restrictive s’applique." },
      { q: "L’E2 a deux élèves aux objectifs différents. Au briefing, il…", c: ["donne un objectif adapté à chacun", "donne le même objectif aux deux pour simplifier", "laisse chacun choisir librement le sien", "ne donne aucun objectif, pour ne pas les stresser"], a: 0, e: "Même plongée, objectifs individualisés." },
      { q: "Le déroulé annoncé au briefing comprend…", c: ["mise à l’eau, descente, exercices, découverte, remontée", "seulement les exercices, le reste se découvre sous l’eau", "seulement la profondeur maximale et la durée de plongée", "la liste des espèces à voir et l’horaire de retour au port"], a: 0, e: "Les élèves savent ce qui les attend." }
    ]
  });

  C.module({
    id: "e2-exmer", world: "e2", depth: "−15 m", icon: "target",
    title: "Exercices du N1 en mer",
    sub: "Où, quand, comment, en sécurité",
    diagram: "e2-exmer",
    essentiel: `
<p>Les exercices du N1 se refont en mer, mais <b>pas n’importe où</b> dans la plongée.</p>
<h3>Où les placer</h3>
<ul><li><b>Au début</b>, sur le fond, après la descente : l’élève a de l’air et n’a pas froid.</li>
<li>Sur un <b>fond de sable</b> ou près d’un <b>repère</b>, à une profondeur maîtrisée.</li>
<li>Jamais juste avant la remontée, jamais en fin de bloc.</li></ul>
<h3>Comment les faire</h3>
<ul><li><b>Vidage de masque</b> : d’abord posé, puis stabilisé, puis en palmant.</li>
<li><b>Lâcher-reprise d’embout</b> : surveiller l’expiration.</li>
<li><b>Demande d’air</b> : l’élève vient prendre l’octopus de l’encadrant, puis on palme ensemble quelques mètres.</li>
<li><b>Stabilisation</b> : au gilet, puis au poumon-ballast, en pleine eau près du relief.</li>
<li><b>Remontée contrôlée</b> : lente, en expirant, l’encadrant tenant l’élève si besoin.</li></ul>
<h3>Sécurité</h3>
<ul><li>Pas de <b>yo-yo</b> : on limite les remontées répétées.</li>
<li>On surveille l’<b>air</b> de chacun avant chaque exercice.</li>
<li>Ceux qui attendent restent <b>groupés et visibles</b>.</li></ul>
`,
    memo: [["Quand", "Au début, sur le fond, avec de l’air."], ["Progression", "Posé, puis stabilisé, puis en mouvement."], ["Sécurité", "Pas de yo-yo, air vérifié, groupe visible."]],
    moniteur: ["Quels exercices le club fait-il faire au N1 en mer, et à quelle profondeur ?"],
    quiz: [
      { q: "Les exercices se placent plutôt…", c: ["en fin de plongée, juste avant la remontée", "au début, sur le fond, après la descente", "pendant le palier de sécurité", "en surface, avant l’immersion"], a: 1, e: "L’élève a de l’air et n’a pas encore froid." },
      { q: "En mer, le vidage de masque progresse…", c: ["posé, puis stabilisé, puis en palmant", "en palmant, puis stabilisé, puis posé", "directement en pleine eau", "seulement posé, jamais en mouvement"], a: 0, e: "Du statique au dynamique." },
      { q: "Pendant la demande d’air, après la prise de l’octopus…", c: ["on remonte tout de suite très vite", "on palme ensemble quelques mètres", "l’élève rend l’octopus immédiatement", "l’encadrant s’éloigne pour voir"], a: 1, e: "On vérifie que l’élève respire calmement en se déplaçant." },
      { q: "Pourquoi éviter les exercices en fin de bloc ?", c: ["L’élève n’a plus assez d’air de marge", "Le détendeur fonctionne moins bien", "La visibilité baisse en fin de plongée", "Le bateau risque de partir"], a: 0, e: "Un exercice raté consomme beaucoup d’air." },
      { q: "Les élèves qui attendent leur tour…", c: ["restent groupés et visibles", "explorent librement le site", "remontent attendre en surface", "font l’exercice entre eux"], a: 0, e: "L’encadrant doit voir tout le monde." },
      { q: "Le principal danger d’enchaîner plusieurs remontées d’exercice ?", c: ["Le profil en yo-yo : oreilles et décompression", "Une consommation d’air un peu plus forte que prévu", "La fatigue des jambes de l’élève à force de palmer", "La perte du mouillage"], a: 0, e: "On limite les remontées répétées." },
      { q: "La stabilisation au poumon-ballast se travaille…", c: ["en pleine eau, près du relief", "posé à genoux sur le sable, gilet vide", "en surface, gilet gonflé, avant l’immersion", "pendant la descente au bout, en s’arrêtant"], a: 0, e: "Le relief sert de repère sans être un appui." },
      { q: "Avant chaque exercice, l’encadrant vérifie…", c: ["l’air de chaque élève", "l’heure exacte", "la direction du courant de surface", "la position du soleil"], a: 0, e: "Un exercice se fait avec de la marge." },
      { q: "Pendant la remontée contrôlée d’exercice, l’encadrant…", c: ["tient l’élève si besoin et surveille son expiration", "remonte devant lui pour lui montrer la bonne vitesse", "reste au fond pour surveiller les autres élèves", "laisse l’élève remonter seul pour juger son autonomie"], a: 0, e: "Contact et contrôle de la vitesse." },
      { q: "Pendant le lâcher-reprise d’embout en mer, tu surveilles surtout…", c: ["l’expiration de l’élève", "la position de son ordinateur", "la couleur de ses bulles", "son palmage"], a: 0, e: "Il ne doit pas bloquer sa respiration." },
      { q: "Le fond de sable est préféré pour les exercices car…", c: ["on peut se poser sans danger ni dégâts", "l’eau y est toujours plus claire qu’ailleurs", "il y a plus de poissons à montrer aux élèves", "le courant y est plus faible que près des roches, toujours"], a: 0, e: "Sécurité et respect du milieu." },
      { q: "Un élève remonte pendant l’exercice. Tu…", c: ["le retiens et le ramènes doucement", "le laisses remonter, il redescendra", "lui fais signe depuis le fond", "remontes plus vite que lui"], a: 0, e: "On ne laisse pas un exercice raté finir vers la surface." },
      { q: "Après les exercices, la plongée se termine par…", c: ["de la découverte, puis la remontée", "un dernier exercice difficile pour finir", "une remontée immédiate après le dernier exercice", "un deuxième passage de tous les exercices"], a: 0, e: "On finit sur le plaisir." },
      { q: "La profondeur des exercices en mer est…", c: ["fixée et maîtrisée, près d’un repère", "la plus grande autorisée par le DP ce jour-là", "libre, selon l’envie et l’aisance de l’élève", "celle du mouillage, quelle que soit sa profondeur"], a: 0, e: "On choisit une profondeur où l’élève est à l’aise." },
      { q: "En pleine eau, la position de l’encadrant face à l’élève sert à…", c: ["voir son visage et intervenir tout de suite", "lui montrer le fond et les repères du site autour", "mieux voir le bateau et la ligne de mouillage", "se placer dans le courant pour le protéger de face"], a: 0, e: "Les premiers signes se lisent sur le visage." },
      { q: "Pourquoi palmer ensemble après une demande d’air ?", c: ["Pour vérifier qu’il respire calmement en mouvement", "Pour rejoindre plus vite le bateau ou le mouillage ensemble", "Pour économiser l’air du donneur en palmant doucement", "Pour finir l’exercice plus vite et passer à la suite"], a: 0, e: "En vrai, après un partage, on se déplace." }
    ]
  });

  C.module({
    id: "e2-incidents", world: "e2", depth: "−18 m", icon: "cross",
    title: "Incidents d’élève",
    sub: "Panne d’air, remontée rapide, malaise, perte",
    diagram: "e2-inc",
    essentiel: `
<p>Avec des débutants, les incidents sont <b>fréquents mais souvent bénins</b> s’ils sont vus tôt. La logique est toujours la même : <b>voir tôt, stabiliser, décider, rendre compte</b>.</p>
<h3>Les incidents fréquents</h3>
<ul><li><b>Panne ou manque d’air</b> : l’élève vient chercher l’octopus. On le stabilise, on contrôle sa respiration, on remonte ensemble à vitesse normale.</li>
<li><b>Remontée incontrôlée</b> : on tente de le retenir ou de le freiner (purge du gilet) <b>sans se mettre en danger</b> ni laisser les autres seuls. En surface, on vérifie son état et on informe le DP.</li>
<li><b>Oreille</b> : on remonte un peu, on réessaie doucement ; si ça ne passe pas, on arrête la plongée.</li>
<li><b>Masque arraché</b> : on tient l’élève, on l’aide à le remettre et à le vider.</li>
<li><b>Essoufflement</b> : arrêt de l’effort, stabilisation, expiration appuyée, remontée de quelques mètres.</li>
<li><b>Froid, nausée, malaise</b> : on arrête et on remonte calmement.</li>
<li><b>Perte de l’encadrant</b> : l’élève a appris au briefing quoi faire ; l’encadrant cherche brièvement puis applique la procédure prévue.</li></ul>
<h3>Après l’incident</h3>
<p>Même bénin, on <b>informe le DP</b>, on surveille l’élève après la plongée et on note l’incident. Une remontée rapide peut donner des signes <b>plus tard</b>.</p>
${VAL}La procédure en cas de perte de palanquée (temps de recherche, remontée) se fixe au briefing selon le DP et le club : à faire valider.</div>
`,
    memo: [["Logique", "Voir tôt, stabiliser, décider, rendre compte."], ["Remontée rapide", "Freiner sans se mettre en danger, informer le DP, surveiller."], ["Après", "Toujours informer le DP et surveiller l’élève."]],
    moniteur: ["Quelle procédure de perte de palanquée annonce-t-on au club ?"],
    quiz: [
      { q: "La logique commune à tous les incidents d’élève ?", c: ["Remonter le plus vite possible avec l’élève, quoi qu’il arrive", "Voir tôt, stabiliser, décider, rendre compte", "Attendre que l’élève se calme seul avant d’agir", "Appeler les secours depuis le fond par un signe"], a: 1, e: "Stabiliser d’abord évite d’aggraver." },
      { q: "Un élève arrive en manque d’air et prend ton octopus. D’abord…", c: ["tu remontes en flèche vers la surface", "tu le stabilises et contrôles sa respiration", "tu lui reprends l’octopus pour vérifier son bloc", "tu continues la visite avec lui"], a: 1, e: "Puis remontée ensemble à vitesse normale." },
      { q: "Ton élève part en remontée incontrôlée. Tu…", c: ["le freines si possible, sans te mettre en danger", "le suis à la même vitesse quoi qu’il arrive", "le laisses partir et continues la séance avec les autres", "lâches ton lest pour le rattraper plus vite"], a: 0, e: "Ne pas créer un deuxième accident." },
      { q: "Après une remontée rapide d’élève, même s’il va bien…", c: ["on n’en parle pas pour ne pas l’inquiéter", "on informe le DP et on le surveille", "on le fait redescendre faire son palier", "on lui fait refaire la plongée"], a: 1, e: "Des signes peuvent apparaître plus tard." },
      { q: "L’élève n’arrive plus à équilibrer à 8 m. Tu…", c: ["remontes un peu et le laisses réessayer doucement", "l’aides à descendre plus vite pour passer le cap difficile", "lui demandes de forcer le Valsalva, nez bien pincé", "continues la descente, ça passera sûrement plus bas"], a: 0, e: "S’il ne passe pas, on arrête la plongée." },
      { q: "Le masque d’un élève est arraché par un coup de palme. Tu…", c: ["le tiens et l’aides à le remettre et le vider", "remontes immédiatement avec lui jusqu’à la surface", "lui donnes ton propre masque et remontes sans", "attends qu’il se débrouille seul pour apprendre"], a: 0, e: "Le contact physique rassure et empêche la remontée." },
      { q: "Un élève est essoufflé. Le bon réflexe ?", c: ["Le faire palmer plus fort pour sortir de la zone d’effort", "Arrêt de l’effort, stabilisation, expiration appuyée", "Lui donner ton détendeur principal pour qu’il respire mieux", "Le faire remonter en apnée jusqu’à la surface"], a: 1, e: "Puis remonter de quelques mètres si besoin." },
      { q: "Nausée et pâleur chez un élève au fond. Tu…", c: ["arrêtes et remontes calmement", "continues l’exercice prévu", "le laisses se reposer au fond", "lui fais faire une apnée"], a: 0, e: "Un malaise met fin à la plongée." },
      { q: "Pourquoi prévoir au briefing la conduite en cas de perte de l’encadrant ?", c: ["Parce que sous l’eau, on ne peut plus l’expliquer", "Parce que c’est inscrit tel quel sur la fiche de sécurité", "Pour occuper le temps d’attente du briefing", "Parce que l’élève le demande toujours avant de plonger"], a: 0, e: "Une procédure connue évite la panique." },
      { q: "Pendant que tu gères un élève en difficulté, les autres…", c: ["restent avec toi, groupés", "continuent la visite sans toi", "remontent seuls en surface", "t’attendent au fond sans bouger"], a: 0, e: "On ne laisse personne seul." },
      { q: "Un incident bénin doit-il être signalé au DP ?", c: ["Non, seulement les accidents graves", "Oui, toujours", "Seulement si l’élève le demande", "Seulement s’il a eu lieu en surface"], a: 1, e: "Le DP doit avoir une vision complète." },
      { q: "En surface, après une remontée rapide, tu vérifies d’abord…", c: ["son état : conscience, respiration, signes", "la pression restante de son bloc et du tien", "s’il a perdu du matériel pendant la remontée", "son ordinateur, pour voir la vitesse atteinte"], a: 0, e: "Puis flottabilité, signe au bateau." },
      { q: "Un élève a froid et grelotte à 12 m. Tu…", c: ["termines la plongée", "lui fais palmer fort", "continues encore cinq minutes", "lui donnes ta lampe pour se réchauffer"], a: 0, e: "Le froid augmente tous les risques." },
      { q: "Freiner une remontée incontrôlée, c’est notamment…", c: ["purger le gilet de l’élève", "gonfler son propre gilet pour le suivre", "lui retirer son lest pour l’alléger", "lui donner ton octopus pendant la remontée"], a: 0, e: "Le gilet qui se dilate accélère la remontée." },
      { q: "Pourquoi éviter de suivre un élève en remontée rapide à tout prix ?", c: ["Pour ne pas faire soi-même un accident et laisser les autres", "Parce que c’est interdit par les conditions de la licence fédérale", "Parce qu’il redescendra tout seul une fois calmé", "Pour économiser son air pour le reste du groupe"], a: 0, e: "L’encadrant reste responsable du groupe." },
      { q: "Après un incident, sur le carnet ou la fiche, on…", c: ["note ce qui s’est passé", "efface toute trace", "attend une semaine", "ne note que la profondeur"], a: 0, e: "La trace sert au suivi et à la sécurité." }
    ]
  });

  C.addCards([
    { id: "x2-m1", m: "e2-n1mer", f: "Transfert piscine vers mer", b: "Recommencer peu profond, descendre quand c’est automatique." },
    { id: "x2-o1", m: "e2-orga", f: "Briefing en mer", b: "Objectif, déroulé, signes, paramètres, que faire si." },
    { id: "x2-x1", m: "e2-exmer", f: "Quand faire les exercices ?", b: "Au début, sur le fond, avec de l’air et pas froid." },
    { id: "x2-i1", m: "e2-incidents", f: "Incident d’élève", b: "Voir tôt, stabiliser, décider, rendre compte." },
    { id: "x2-i2", m: "e2-incidents", f: "Remontée rapide", b: "Freiner sans se mettre en danger, informer le DP, surveiller." }
  ]);

  C.notions = Object.assign(C.notions || {}, {
    "e2-n1mer": [["transfert", "Piscine vers mer", "piscine|premiere plongee|froid|visibilit|panique|revoir|lest", "piscine"], ["progression", "Descendre progressivement", "profond|automatique|fond|sable|decouverte", "profond"], ["gestes", "Gestes propres à la mer", "mise a l.eau|bascule|descente|remontee|palier|bateau|houle", "Mise à l’eau"]],
    "e2-orga": [["prep", "Préparer la sortie", "veille|meteo|site|plan b|carnet|lestage|verifie", "météo"], ["dp", "Le rôle du DP", "directeur|dp|fiche|compose|rend compte|profondeur", "directeur"], ["brief", "Le briefing", "briefing|signes|pression de retour|deroule|objectif", "briefing"]],
    "e2-exmer": [["quand", "Où et quand", "debut|fin de bloc|place|fond de sable|profondeur|decouverte", "début"], ["comment", "Faire les gestes en mer", "vidage|octopus|demande d.air|poumon|embout|palmer", "vidage"], ["secu", "Sécurité des exercices", "yo-yo|remontee|air|groupes|attendent|retiens|visage", "yo-yo"]],
    "e2-incidents": [["logique", "Logique d’intervention", "logique|stabilis|signale|dp|carnet|briefing|perte", "stabiliser"], ["air", "Air et remontée rapide", "air|octopus|remontee|freiner|purger|surface", "remontée"], ["autres", "Oreilles, masque, malaise", "equilibr|masque|essouffl|nausee|froid|autres", "masque"]]
  });
})();
