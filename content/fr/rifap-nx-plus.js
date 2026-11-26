/* =====================================================================
   Abysse Academy 2.3 · RIFAP et Nitrox complets
   RIFAP : bilan, réanimation et défibrillateur, sortie de l’eau,
   reconnaître les accidents. Nitrox : calculs, toxicité de l’oxygène,
   nitrox confirmé. Thèmes existants complétés à 16 questions, notions
   du tuteur. Gestes de secours : à pratiquer avec un formateur.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content, D = C.dgb || {};
  const VAL = `<div class="callout trap"><span class="eyebrow">À faire valider</span>`;

  if (D.flow) C.addDiagrams({
    "r-bilan": () => D.flow([["Conscience", "Elle répond ? Elle ouvre les yeux ? Elle serre la main ?"], ["Respiration", "Libérer les voies aériennes, regarder, écouter, sentir pendant 10 s."], ["Circulation", "Saignement, pâleur, sueurs, pouls si formé."], ["Complémentaire", "Plaintes, douleurs, troubles, paramètres de plongée, heure des signes."], ["Surveiller", "Refaire le bilan, noter l’évolution."]], "Le bilan : d’abord ce qui menace la vie, puis le reste, et on recommence."),
    "r-rcp": () => D.cycle(["30 compressions", "2 insufflations", "Défibrillateur dès qu’il arrive", "Sans interruption"], "Arrêt cardiaque", "La réanimation : compressions fortes et rapides, insufflations, défibrillateur au plus vite, sans s’arrêter jusqu’aux secours."),
    "r-sortie": () => D.flow([["Au fond", "Remonter la victime en contrôlant la vitesse."], ["En surface", "Flottabilité positive, voies aériennes hors de l’eau, signe de détresse."], ["Tractage", "Vers le bateau ou le bord, visage hors de l’eau."], ["Déséquiper", "Lest et bloc retirés dans l’eau."], ["Sortir", "Avec de l’aide, à plat si possible."]], "Du fond à la terre ferme : chaque étape doit rester sûre pour la victime et pour toi."),
    "r-acc": () => D.flow([["Barotraumatisme", "Douleur d’oreille ou de sinus, signes pulmonaires après remontée rapide."], ["ADD", "Fatigue, douleurs, fourmillements, paralysie, troubles après la plongée."], ["Noyade", "Toux, mousse, détresse respiratoire, inconscience."], ["Froid", "Frissons, gestes lents, confusion."], ["Réponse commune", "Oxygène, alerte, surveillance, fiche d’évacuation."]], "Reconnaître sans diagnostiquer : un signe suspect après une plongée, c’est oxygène et alerte."),
    "nx-calc": () => D.flow([["Pp O₂ = P abs × FO₂", "La loi de Dalton, base de tout."], ["MOD", "P abs max = Pp O₂ max ÷ FO₂, puis profondeur."], ["Meilleur mélange", "FO₂ = Pp O₂ max ÷ P abs à la profondeur prévue."], ["EAD", "Profondeur où l’air aurait la même Pp N₂."], ["Arrondir", "Toujours du côté prudent."]], "Les quatre calculs du nitrox, tous tirés de Dalton."),
    "nx-tox": () => D.cycle(["Pp O₂ élevée et courte", "Neurologique (effet Paul Bert)", "Pp O₂ modérée et longue", "Pulmonaire (effet Lorrain Smith)"], "Toxicité de l’oxygène", "Deux formes : la neurologique, brutale, quand la Pp O₂ est trop haute ; la pulmonaire, lente, quand l’exposition dure longtemps."),
    "nx-conf": () => D.flow([["Nitrox", "Mélanges courants, profondeur limitée par la MOD."], ["Nitrox confirmé", "Mélanges plus riches, utilisés aussi pour la décompression."], ["Changement de gaz", "Bloc identifié, MOD vérifiée, ordinateur réglé."], ["Rigueur", "Analyse, marquage, procédure de changement contrôlée par l’équipier."]], "Du nitrox au nitrox confirmé : plus de mélanges, plus de procédures.")
  });

  /* =========================== RIFAP =========================== */
  C.module({
    id: "r-bilan", world: "rifap", depth: "Récif 6", icon: "check",
    title: "Faire un bilan",
    sub: "Conscience, respiration, circulation, plaintes",
    diagram: "r-bilan",
    essentiel: `
<p>Le bilan sert à savoir <b>ce qui menace la vie</b>, puis à donner aux secours des <b>informations précises</b>.</p>
<h3>Le bilan vital, dans l’ordre</h3>
<ol><li><b>Conscience</b> : on lui parle, on lui demande de serrer la main, d’ouvrir les yeux.</li>
<li><b>Respiration</b> : on bascule doucement la tête en arrière, menton élevé, puis on regarde le ventre, on écoute, on sent le souffle pendant <b>10 secondes</b>.</li>
<li><b>Circulation</b> : saignement, couleur de la peau, sueurs.</li></ol>
<h3>Le bilan complémentaire</h3>
<ul><li><b>Plaintes</b> : douleur, fatigue, fourmillements, gêne pour respirer, vision, équilibre.</li>
<li><b>Ce qu’on voit</b> : paralysie, marbrures, toux, mousse aux lèvres.</li>
<li><b>La plongée</b> : profondeur, durée, paliers, incidents, remontée rapide.</li>
<li><b>L’heure</b> des premiers signes.</li></ul>
<h3>Surveiller</h3>
<p>Un bilan n’est pas fait une fois pour toutes : on le <b>refait régulièrement</b> et on <b>note</b> l’évolution sur la fiche. Un signe qui s’aggrave change l’urgence.</p>
`,
    memo: [["Vital", "Conscience, respiration (10 s), circulation."], ["Complémentaire", "Plaintes, signes vus, paramètres, heure."], ["Surveiller", "Refaire et noter."]],
    moniteur: ["Comment le club organise-t-il la fiche d’évacuation ?"],
    quiz: [
      { q: "Par quoi commence le bilan vital ?", c: ["La respiration, en regardant le ventre", "La conscience", "Les paramètres de la plongée", "La recherche de douleurs articulaires"], a: 1, e: "On lui parle et on lui demande de serrer la main." },
      { q: "Pour libérer les voies aériennes, on…", c: ["bascule la tête en arrière, menton élevé", "met la victime assise, tête penchée en avant", "tourne sa tête sur le côté et attend", "lui fait boire un peu d’eau pour dégager"], a: 0, e: "La langue ne bloque plus le passage de l’air." },
      { q: "On vérifie la respiration pendant environ…", c: ["2 à 3 secondes, pour aller vite", "10 secondes", "1 minute, pour être bien sûr", "30 secondes, montre en main"], a: 1, e: "Regarder, écouter, sentir." },
      { q: "Le bilan complémentaire comprend…", c: ["uniquement la prise du pouls et de la tension", "plaintes, signes vus, paramètres, heure", "seulement les paramètres de la plongée du jour", "le nom du club, du DP et du pilote du bateau"], a: 1, e: "Ces informations guident les secours." },
      { q: "Pourquoi refaire le bilan régulièrement ?", c: ["Pour occuper la victime et la rassurer en attendant", "Parce qu’un état peut s’aggraver", "Parce que les secours le demandent à chaque minute", "Pour vérifier le premier bilan, qui est souvent faux"], a: 1, e: "On note chaque changement." },
      { q: "Un fourmillement dans une main après la plongée, c’est…", c: ["un signe à prendre au sérieux : O₂ et alerte", "un simple effet du froid, sans aucune importance", "normal après une plongée profonde, ça passe seul", "un signe de fatigue qui passera avec du repos et du sucre"], a: 0, e: "Signe possible d’ADD neurologique." },
      { q: "L’heure des premiers signes sert…", c: ["à remplir la fiche de sécurité du directeur de plongée", "aux médecins pour décider du traitement", "à calculer la durée totale de la plongée", "à savoir à quelle heure rentrer au port"], a: 1, e: "Elle fait partie de la fiche d’évacuation." },
      { q: "Victime qui ne répond pas mais respire. Ensuite ?", c: ["PLS, oxygène, alerte", "Compressions thoraciques tout de suite", "La faire asseoir et lui donner à boire", "Attendre qu’elle se réveille seule, au calme"], a: 0, e: "PLS pour protéger ses voies aériennes." },
      { q: "Des marbrures sur la peau après une plongée évoquent…", c: ["une simple allergie à la combinaison", "un ADD cutané, à prendre au sérieux", "un coup de soleil pendant le retour", "une irritation due au sel"], a: 1, e: "Oxygène, alerte, surveillance." },
      { q: "Pour évaluer la conscience, on demande à la victime…", c: ["de raconter toute la plongée dans l’ordre", "de serrer la main, d’ouvrir les yeux", "de se lever et de marcher quelques pas", "de donner ses paramètres de plongée"], a: 1, e: "Des ordres simples." },
      { q: "Dans le bilan, la « circulation » regarde surtout…", c: ["saignement, couleur de la peau, sueurs", "la vitesse de remontée relevée sur l’ordinateur", "la consommation d’air pendant la plongée", "la température de l’eau au fond et en surface"], a: 0, e: "Un saignement abondant se traite tout de suite." },
      { q: "Où note-t-on l’évolution des signes ?", c: ["Sur la fiche d’évacuation ou de surveillance", "Sur le carnet de plongée personnel de la victime", "Dans un message envoyé au club le lendemain", "Nulle part : on la transmet de vive voix seulement"], a: 0, e: "Elle accompagne la victime." },
      { q: "Une victime consciente dit « ça va », mais elle est pâle et lente. Tu…", c: ["la crois et la laisses tranquille", "complètes le bilan et la surveilles", "lui proposes de replonger pour vérifier", "la laisses rentrer chez elle"], a: 1, e: "Ce qu’on voit compte autant que ce qu’elle dit." },
      { q: "Le bilan vital passe avant le complémentaire parce que…", c: ["il est plus court à écrire sur la fiche", "il cherche ce qui menace la vie", "les secours ne demandent que lui au téléphone", "il ne demande aucune formation particulière"], a: 1, e: "On traite l’urgence vitale d’abord." },
      { q: "Un plongeur tousse et crache une mousse rosée. On pense à…", c: ["un simple coup de froid pendant le retour", "une noyade ou une surpression pulmonaire", "un mal de mer qui irrite la gorge", "une crampe des muscles respiratoires"], a: 1, e: "Oxygène, alerte, position confortable, surveillance." },
      { q: "Les paramètres de plongée donnés aux secours comprennent…", c: ["profondeur, durée, paliers, incidents", "seulement la profondeur maximale atteinte", "la température de l’air et de l’eau du jour", "le nom du bateau et du site de plongée"], a: 0, e: "Ils aident le médecin hyperbare." }
    ]
  });

  C.module({
    id: "r-rcp", world: "rifap", depth: "Récif 7", icon: "heart",
    title: "Réanimation et défibrillateur",
    sub: "Compressions, insufflations, DAE",
    diagram: "r-rcp",
    essentiel: `
<p>Une victime <b>inconsciente qui ne respire pas</b> (ou respire anormalement, par hoquets) est en <b>arrêt cardiaque</b>. Chaque minute compte.</p>
<h3>Les gestes</h3>
<ol><li><b>Alerter</b> (ou faire alerter) et faire apporter le <b>défibrillateur</b>.</li>
<li><b>Compressions thoraciques</b> : au centre de la poitrine, bras tendus, fortes et rapides, en laissant la poitrine remonter entre chaque.</li>
<li><b>Insufflations</b> : avec un insufflateur (BAVU) relié à l’oxygène si on est formé, sinon bouche-à-bouche.</li>
<li>Alterner <b>30 compressions et 2 insufflations</b>.</li>
<li>Poser le <b>défibrillateur</b> dès qu’il arrive et suivre ses instructions vocales.</li></ol>
<h3>Le noyé</h3>
<p>Chez le noyé, l’arrêt vient du <b>manque d’oxygène</b> : on commence souvent par des <b>insufflations initiales</b> avant les compressions.</p>
<h3>On ne s’arrête pas</h3>
<p>On continue jusqu’à l’arrivée des secours, la reprise d’une respiration normale ou l’épuisement. On <b>se relaie</b> toutes les deux minutes si possible.</p>
${VAL}Rythme, profondeur des compressions, nombre d’insufflations initiales chez le noyé : selon les recommandations en vigueur. Ces gestes s’apprennent sur mannequin avec un formateur.</div>
`,
    memo: [["Reconnaître", "Inconscient + ne respire pas (ou hoquets) = arrêt."], ["Cycle", "30 compressions, 2 insufflations."], ["DAE", "Dès qu’il arrive, suivre la voix."]],
    moniteur: ["Quelles sont les recommandations actuelles pour la RCP du noyé ?"],
    quiz: [
      { q: "Une victime inconsciente respire par hoquets rares. C’est…", c: ["une respiration suffisante, on la met en PLS", "un signe d’arrêt cardiaque : on réanime", "un signe de réveil imminent", "une réaction normale au froid"], a: 1, e: "Une respiration anormale = arrêt cardiaque." },
      { q: "Les compressions se font…", c: ["sur le côté gauche, juste au-dessus du cœur", "au centre de la poitrine, bras tendus", "sur le ventre, juste sous les côtes", "sur le haut du thorax, sous le cou"], a: 1, e: "Fortes, rapides, en laissant remonter." },
      { q: "Le cycle classique chez l’adulte ?", c: ["15 compressions et 1 insufflation", "30 compressions et 2 insufflations", "10 compressions et 5 insufflations", "Compressions seules, toujours"], a: 1, e: "À valider avec les recommandations en vigueur." },
      { q: "Le défibrillateur se pose…", c: ["après 10 minutes de massage", "dès qu’il arrive", "seulement si le médecin est là", "quand la victime se réveille"], a: 1, e: "Il analyse et guide à la voix." },
      { q: "Chez un noyé, on commence souvent par…", c: ["des insufflations initiales", "la PLS pour vider l’eau des poumons", "des tapes dans le dos pour faire tousser", "le réchauffer avant tout autre geste"], a: 0, e: "L’arrêt vient du manque d’oxygène." },
      { q: "Quand arrête-t-on la réanimation ?", c: ["Après 5 minutes sans résultat visible", "Aux secours, respiration normale ou épuisement", "Quand le défibrillateur ne délivre pas de choc", "Dès qu’on a fait trois cycles complets"], a: 1, e: "On ne s’arrête pas de soi-même." },
      { q: "Pourquoi se relayer pour les compressions ?", c: ["La fatigue les rend vite moins efficaces", "Pour que chacun puisse apprendre le geste sur place", "Parce que le défibrillateur le demande toujours", "Pour pouvoir téléphoner aux secours à tour de rôle"], a: 0, e: "Toutes les deux minutes si possible." },
      { q: "Le BAVU relié à l’oxygène sert à…", c: ["insuffler de l’air enrichi en oxygène", "donner de l’O₂ à une victime consciente", "mesurer la respiration", "aspirer l’eau des poumons"], a: 0, e: "Réservé aux personnes formées." },
      { q: "Entre deux compressions, la poitrine doit…", c: ["rester enfoncée", "remonter complètement", "être maintenue avec la main", "être massée sur le côté"], a: 1, e: "C’est ce qui permet au cœur de se remplir." },
      { q: "Le défibrillateur délivre un choc. Ensuite…", c: ["on attend qu’elle se réveille sans la toucher", "on reprend tout de suite les compressions", "on retire les électrodes pour la couvrir", "on la met en PLS pour la surveiller"], a: 1, e: "On suit les instructions vocales." },
      { q: "Pendant l’analyse du défibrillateur, on…", c: ["continue à masser plus fort", "ne touche plus la victime", "lui donne de l’eau", "retire son masque à oxygène et sa combinaison"], a: 1, e: "Le mouvement fausse l’analyse." },
      { q: "Avant de poser les électrodes sur un plongeur sorti de l’eau, on…", c: ["sèche rapidement la poitrine", "attend qu’il soit complètement sec", "le laisse dans sa combinaison", "verse de l’eau douce dessus"], a: 0, e: "On ouvre ou coupe la combinaison et on sèche." },
      { q: "Qui doit alerter pendant la réanimation ?", c: ["Le sauveteur lui-même, après 10 minutes", "Une autre personne, tout de suite", "Personne avant le retour au port", "La victime, si elle se réveille entre-temps"], a: 1, e: "On fait alerter et apporter le DAE." },
      { q: "Les compressions doivent être…", c: ["douces pour ne pas blesser", "fortes et rapides", "lentes et régulières", "faites à une main"], a: 1, e: "Une côte fêlée vaut mieux qu’un cœur arrêté." },
      { q: "La victime reprend une respiration normale. Tu…", c: ["la mets en PLS sous O₂ et surveilles", "reprends les compressions par précaution", "la fais asseoir et boire de l’eau sucrée", "retires le défibrillateur et la laisses se reposer"], a: 0, e: "Les électrodes restent en place." },
      { q: "Où apprend-on vraiment ces gestes ?", c: ["Sur mannequin avec un formateur", "Dans une vidéo en ligne bien faite", "En lisant ce cours deux fois de suite", "Sur un camarade de club, au bord de la piscine"], a: 0, e: "Une formation pratique est indispensable." }
    ]
  });

  C.module({
    id: "r-sortie", world: "rifap", depth: "Récif 8", icon: "buoy",
    title: "Sortir la victime de l’eau",
    sub: "Surface, tractage, déséquipement, sortie",
    diagram: "r-sortie",
    essentiel: `
<p>Entre l’accident et l’oxygène, il y a souvent <b>de l’eau à traverser</b>. Chaque étape doit être sûre, pour la victime et pour toi.</p>
<h3>En surface</h3>
<ul><li>Donner une <b>flottabilité positive</b> : gonfler le gilet de la victime (et le sien), larguer le lest si besoin.</li>
<li>Garder le <b>visage hors de l’eau</b>, retirer le masque s’il gêne la respiration.</li>
<li>Faire le <b>signe de détresse</b> au bateau.</li></ul>
<h3>Tracter</h3>
<p>On tracte la victime <b>sur le dos</b>, en tenant la tête ou la robinetterie, visage hors de l’eau, en palmant sur le dos. On parle à la victime si elle est consciente.</p>
<h3>Déséquiper et sortir</h3>
<ul><li>On retire <b>lest et bloc dans l’eau</b>, avec l’aide de l’équipage.</li>
<li>On sort la victime <b>à plat si possible</b>, avec plusieurs personnes, sans la faire forcer.</li>
<li>Dès qu’elle est sortie : <b>bilan, oxygène, alerte</b>.</li></ul>
`,
    memo: [["Surface", "Flottabilité, visage hors de l’eau, détresse."], ["Tractage", "Sur le dos, tête tenue."], ["Sortie", "Déséquiper dans l’eau, sortir à plat, à plusieurs."]],
    moniteur: ["Comment sort-on une victime sur le bateau du club ?"],
    quiz: [
      { q: "En surface, le premier geste sur la victime ?", c: ["Lui retirer son bloc", "Lui donner une flottabilité positive", "Lui faire boire de l’eau douce", "La tracter vers le bord immédiatement"], a: 1, e: "Elle ne doit pas recouler." },
      { q: "Pendant le tractage, la victime est…", c: ["sur le ventre, tête dans l’eau", "sur le dos, visage hors de l’eau", "verticale, tenue par le bloc", "derrière toi, accrochée à ton gilet"], a: 1, e: "Ses voies aériennes restent dégagées." },
      { q: "Le signe de détresse en surface sert à…", c: ["dire au bateau que tout va bien", "faire venir le bateau, lancer les secours", "demander de l’air à un équipier proche", "appeler la palanquée suivante pour qu’elle attende"], a: 1, e: "Bras qui monte et descend." },
      { q: "On retire bloc et lest…", c: ["dans l’eau, avec l’aide de l’équipage", "une fois la victime hissée sur le pont", "jamais : on gagne du temps en sortant tout équipé", "avant de quitter le fond, pour remonter plus léger"], a: 0, e: "La sortie est plus facile et plus sûre." },
      { q: "La victime est sortie de l’eau. Ensuite ?", c: ["Bilan, oxygène, alerte", "On la laisse se reposer", "On range son matériel", "On attend le retour au port"], a: 0, e: "Ne pas perdre de temps." },
      { q: "Pourquoi sortir la victime à plat si possible ?", c: ["Pour ne pas la faire forcer", "Pour qu’elle sèche plus vite sur le pont", "Parce que c’est la méthode la plus rapide", "Pour pouvoir la peser et doser l’oxygène"], a: 0, e: "À plusieurs, sans brusquer." },
      { q: "Le masque de la victime, en surface…", c: ["se retire s’il gêne la respiration", "doit rester absolument en place", "se met sur le front pour qu’elle voie", "se donne à l’équipage en premier"], a: 0, e: "On dégage ce qui gêne l’air." },
      { q: "Si le gilet de la victime ne suffit pas à la faire flotter…", c: ["on largue son lest", "on retire son bloc au fond", "on la porte sur ses épaules", "on attend le bateau sans rien faire"], a: 0, e: "Le lest largable sert à ça." },
      { q: "Pendant le tractage d’une victime consciente, tu…", c: ["lui parles pour la rassurer", "restes silencieux pour économiser l’air", "lui demandes de palmer fort", "la laisses tenir seule sa tête"], a: 0, e: "Rassurer limite le stress." },
      { q: "Pour tracter, on tient…", c: ["la tête ou la robinetterie", "les palmes", "le bras de la victime tendu", "le flexible du détendeur"], a: 0, e: "On garde le visage hors de l’eau." },
      { q: "Toi aussi, en surface, tu…", c: ["gonfles ton gilet pour flotter", "restes gilet vide pour tracter plus vite", "retires ton masque et tes palmes", "lâches ton bloc"], a: 0, e: "Un sauveteur qui coule n’aide personne." },
      { q: "En arrivant à l’échelle du bateau, la victime inconsciente…", c: ["est hissée à plusieurs, sans l’échelle", "monte seule l’échelle, guidée par la voix", "attend dans l’eau le retour du bateau au port", "est attachée à l’échelle en attendant les secours"], a: 0, e: "L’équipage aide à la sortir à plat." },
      { q: "Pourquoi éviter que la victime fasse des efforts pour sortir ?", c: ["L’effort peut aggraver un ADD", "Elle pourrait abîmer le bateau", "Elle risque de perdre son matériel", "Ça retarde l’équipage"], a: 0, e: "Même une victime consciente se laisse aider." },
      { q: "La remontée d’une victime depuis le fond se fait…", c: ["en contrôlant la vitesse", "le plus vite possible, gilet plein", "en la laissant remonter seule", "en apnée pour aller plus vite"], a: 0, e: "Une remontée trop rapide ajoute un accident." },
      { q: "Sur le bateau, la victime consciente qui respire se met…", c: ["dans la position où elle se sent le mieux", "toujours debout, pour mieux respirer", "toujours en PLS, même si elle est consciente", "tête en bas, pour irriguer le cerveau"], a: 0, e: "Souvent allongée ou demi-assise si elle respire mal." },
      { q: "Pendant toute la sortie de l’eau, on pense à…", c: ["sa propre sécurité", "la météo du lendemain", "remplir le carnet", "photographier la scène"], a: 0, e: "Protéger, toujours en premier." }
    ]
  });

  C.module({
    id: "r-acc", world: "rifap", depth: "Récif 9", icon: "cross",
    title: "Reconnaître un accident",
    sub: "ADD, surpression, noyade, froid",
    diagram: "r-acc",
    essentiel: `
<p>Le RIFAP ne demande pas de <b>diagnostiquer</b>, mais de <b>reconnaître qu’il se passe quelque chose</b> et d’agir vite.</p>
<h3>Les signes qui doivent alerter</h3>
<ul><li><b>ADD</b> : fatigue anormale, douleur articulaire, fourmillements, faiblesse d’un membre, troubles de la vision, de l’équilibre, de la parole, envie d’uriner sans y arriver, marbrures. Souvent dans l’heure, parfois plus tard.</li>
<li><b>Surpression pulmonaire</b> : après une remontée rapide ou bloquée, douleur thoracique, toux, crachat de sang, gêne respiratoire, troubles neurologiques.</li>
<li><b>Noyade</b> : toux, mousse, respiration difficile, peau bleutée, inconscience.</li>
<li><b>Hypothermie</b> : frissons, gestes lents, confusion.</li></ul>
<h3>Une conduite commune</h3>
<p>Quelle que soit la cause : <b>oxygène, alerte, bilan, surveillance, fiche d’évacuation</b>. Une victime consciente peut boire de l’<b>eau plate</b> si elle n’a pas de troubles.</p>
<h3>Le déni</h3>
<p>Beaucoup de plongeurs minimisent leurs signes (« c’est rien, c’est le froid »). Le bon réflexe est de <b>prendre au sérieux</b> et d’<b>agir</b> : l’oxygène ne fait pas de mal, le retard si.</p>
`,
    memo: [["ADD", "Fatigue, douleurs, fourmillements, troubles, marbrures."], ["Conduite", "O₂, alerte, bilan, surveillance, fiche."], ["Déni", "Prendre au sérieux, agir vite."]],
    moniteur: [],
    quiz: [
      { q: "Au RIFAP, face à des signes suspects, on doit surtout…", c: ["poser un diagnostic précis avant d’agir", "reconnaître qu’il se passe quelque chose", "attendre l’avis d’un médecin pour l’oxygène", "comparer avec un accident déjà vu"], a: 1, e: "Agir ne demande pas de diagnostic." },
      { q: "Une fatigue anormale après une plongée…", c: ["est normale après une plongée, rien à faire", "peut être un signe d’ADD à surveiller", "vient seulement d’un manque de sommeil la veille", "se soigne en replongeant le lendemain matin"], a: 1, e: "Bilan, surveillance, oxygène si doute." },
      { q: "Douleur thoracique et toux après une remontée rapide : on pense à…", c: ["une surpression pulmonaire", "une simple crampe intercostale", "un mal de mer", "une narcose tardive"], a: 0, e: "Oxygène, alerte, position confortable." },
      { q: "Le plongeur dit « c’est rien, c’est le froid » mais a des fourmillements. Tu…", c: ["le crois et le laisses tranquille", "le prends au sérieux : oxygène et alerte", "lui proposes une boisson chaude et du repos", "attends qu’il se plaigne une deuxième fois"], a: 1, e: "Le déni est fréquent ; l’oxygène ne fait pas de mal." },
      { q: "La plupart des ADD apparaissent…", c: ["pendant la descente, dès les premiers mètres", "dans l’heure qui suit la sortie", "le lendemain seulement, après le sommeil", "toujours au fond, avant la remontée"], a: 1, e: "Parfois plus tard : on surveille." },
      { q: "Une victime consciente sans troubles peut boire…", c: ["de l’eau plate", "un café pour se réchauffer", "une boisson gazeuse", "de l’alcool pour se détendre"], a: 0, e: "Elle s’hydrate, sans excitant." },
      { q: "Envie d’uriner sans y arriver après une plongée…", c: ["peut être un signe d’ADD médullaire", "est due au froid, sans gravité", "vient de la combinaison trop serrée", "est fréquente et sans importance"], a: 0, e: "Signe grave : oxygène et alerte." },
      { q: "Frissons, gestes lents et confusion évoquent…", c: ["une hypothermie", "une narcose", "un ADD cutané", "une surpression"], a: 0, e: "On réchauffe, on surveille." },
      { q: "La conduite commune face à tous ces accidents ?", c: ["O₂, alerte, bilan, surveillance, fiche", "Recompression dans l’eau, au palier de 6 m", "Repos complet et attente du lendemain matin", "Massage des zones douloureuses et boisson chaude"], a: 0, e: "Le traitement relève du médecin." },
      { q: "Pourquoi ne pas réimmerger un plongeur pour « refaire son palier » ?", c: ["Ça aggrave souvent l’accident", "Parce que le bloc de la victime est presque vide", "Parce que c’est trop long à organiser sur le bateau", "Parce qu’elle a froid et risque l’hypothermie"], a: 0, e: "On donne de l’oxygène en surface." },
      { q: "Des troubles de la parole après la plongée…", c: ["sont un signe neurologique grave", "viennent de la fatigue de l’embout", "sont normaux après une longue plongée", "sont dus au sel"], a: 0, e: "Oxygène, alerte immédiate." },
      { q: "Toux, mousse aux lèvres et peau bleutée : on pense à…", c: ["une noyade", "un coup de chaleur", "un ADD articulaire", "une crampe"], a: 0, e: "Oxygène, et réanimation si arrêt." },
      { q: "L’oxygène peut-il nuire en cas de doute ?", c: ["Non : le retard, lui, est dangereux", "Oui, il ne faut le donner que sur avis médical", "Oui, il aggrave l’hypothermie du plongeur", "Oui, il provoque une narcose en surface"], a: 0, e: "Dans le doute, oxygène." },
      { q: "Une douleur à l’épaule 30 min après une plongée profonde. On…", c: ["pense ADD : oxygène et alerte", "masse l’épaule pour soulager", "attend le lendemain pour voir", "donne un antidouleur et c’est tout"], a: 0, e: "Une douleur articulaire après plongée est suspecte." },
      { q: "La fiche d’évacuation accompagne…", c: ["la victime vers les secours", "le directeur de plongée au retour au port", "le bateau, rangée avec les papiers de bord", "le carnet du club, pour les statistiques"], a: 0, e: "Elle contient les paramètres et l’évolution." },
      { q: "Un plongeur de la palanquée a les mêmes paramètres que la victime. On…", c: ["le surveille aussi", "le laisse rentrer chez lui", "le fait replonger", "ne s’en occupe pas"], a: 0, e: "Il a été exposé au même risque." }
    ]
  });

  /* =========================== NITROX =========================== */
  C.module({
    id: "nx-calculs", world: "nitrox", depth: "−40 m", icon: "table",
    title: "Les calculs du nitrox",
    sub: "Dalton, MOD, meilleur mélange, EAD",
    diagram: "nx-calc",
    essentiel: `
<p>Tous les calculs du nitrox viennent d’une seule loi : <b>Dalton</b>. Pp O₂ = P absolue × fraction d’O₂.</p>
<h3>La MOD (profondeur maximale)</h3>
<p>P abs max = Pp O₂ max ÷ FO₂. On retire 1 bar et on multiplie par 10 pour avoir la profondeur.</p>
<p><i>Exemple</i> : nitrox 32 %, Pp O₂ max 1,4 bar → 1,4 ÷ 0,32 = 4,375 bar → environ 33,7 m, arrondi à <b>33 m</b>.</p>
<h3>Le meilleur mélange</h3>
<p>FO₂ = Pp O₂ max ÷ P abs à la profondeur prévue, <b>arrondi vers le bas</b>.</p>
<p><i>Exemple</i> : 25 m (3,5 bar), Pp O₂ max 1,4 → 1,4 ÷ 3,5 = 0,40 → <b>40 %</b>.</p>
<h3>L’EAD (profondeur équivalente air)</h3>
<p>C’est la profondeur où l’air aurait la même Pp N₂. EAD = (P abs × FN₂ ÷ 0,79 − 1) × 10.</p>
<p><i>Exemple</i> : nitrox 32 % à 30 m → 4 × 0,68 ÷ 0,79 = 3,44 bar → environ <b>24 m</b>.</p>
<h3>Toujours arrondir prudemment</h3>
<ul><li>MOD : vers le <b>bas</b>.</li>
<li>Meilleur mélange : vers le <b>bas</b> (moins d’O₂).</li>
<li>EAD : vers le <b>haut</b> (plus profond).</li></ul>
`,
    memo: [["Dalton", "Pp O₂ = P abs × FO₂."], ["MOD", "Pp O₂ max ÷ FO₂, arrondie vers le bas."], ["EAD", "P abs × FN₂ ÷ 0,79, arrondie vers le haut."]],
    moniteur: ["Quelles Pp O₂ max utilise-t-on au club pour le fond et la décompression ?"],
    quiz: [
      { q: "La loi qui sert à tous les calculs du nitrox ?", c: ["Mariotte", "Dalton", "Henry", "Charles"], a: 1, e: "Pression partielle = P abs × fraction." },
      { q: "Pp O₂ d’un nitrox 32 % à 30 m ?", c: ["≈ 0,96 bar", "≈ 1,28 bar", "≈ 1,60 bar", "≈ 1,12 bar"], a: 1, e: "4 bar × 0,32 = 1,28 bar." },
      { q: "MOD d’un nitrox 32 % avec Pp O₂ max 1,4 bar, environ ?", c: ["40 m", "30 m", "33 m", "36 m"], a: 2, e: "1,4 ÷ 0,32 = 4,375 bar → 33,7 m, arrondi à 33 m." },
      { q: "Meilleur mélange pour 25 m avec Pp O₂ max 1,4 bar ?", c: ["32 %", "36 %", "40 %", "45 %"], a: 2, e: "1,4 ÷ 3,5 = 0,40." },
      { q: "Le meilleur mélange calculé s’arrondit…", c: ["vers le haut, plus d’O₂", "vers le bas, moins d’O₂", "au chiffre rond le plus proche", "comme on veut"], a: 1, e: "Moins d’O₂ = Pp O₂ plus basse = prudent." },
      { q: "L’EAD s’arrondit…", c: ["vers le bas", "vers le haut, plus profond", "à la dizaine la plus proche", "elle ne s’arrondit jamais"], a: 1, e: "Plus profond = décompression plus prudente." },
      { q: "EAD d’un nitrox 32 % à 30 m, environ ?", c: ["≈ 30 m", "≈ 24 m", "≈ 18 m", "≈ 34 m"], a: 1, e: "4 × 0,68 ÷ 0,79 ≈ 3,44 bar → 24,4 m." },
      { q: "Pp O₂ d’un nitrox 36 % à 20 m ?", c: ["≈ 0,72 bar", "≈ 1,08 bar", "≈ 1,44 bar", "≈ 0,36 bar"], a: 1, e: "3 bar × 0,36 = 1,08 bar." },
      { q: "MOD d’un nitrox 40 % avec Pp O₂ max 1,6 bar ?", c: ["30 m", "40 m", "25 m", "35 m"], a: 0, e: "1,6 ÷ 0,40 = 4 bar → 30 m." },
      { q: "Si la Pp O₂ max choisie baisse, la MOD…", c: ["augmente", "diminue", "ne change pas", "double"], a: 1, e: "On accepte moins d’O₂ au fond." },
      { q: "Pour calculer la MOD, on part de…", c: ["la Pp O₂ max et la fraction d’O₂", "la Pp N₂ max et la fraction d’azote du mélange", "la profondeur prévue et la durée de la plongée", "la pression du bloc et son volume en litres"], a: 0, e: "P abs max = Pp O₂ max ÷ FO₂." },
      { q: "FN₂ d’un nitrox 36 % ?", c: ["0,36", "0,64", "0,79", "0,21"], a: 1, e: "1 − 0,36 = 0,64." },
      { q: "À quoi sert l’EAD ?", c: ["À connaître la Pp O₂ au fond du site", "À utiliser une méthode de déco air", "À choisir la couleur de l’étiquette du bloc", "À calculer la consommation d’air au fond"], a: 1, e: "On décompresse comme à l’air à cette profondeur." },
      { q: "Un nitrox 32 % à 33 m avec Pp O₂ max 1,4 bar, c’est…", c: ["à la limite de la MOD", "largement sous la MOD", "bien au-delà de la MOD", "sans rapport avec la MOD"], a: 0, e: "4,3 bar × 0,32 ≈ 1,38 bar." },
      { q: "Pp O₂ de l’air à 40 m ?", c: ["≈ 0,84 bar", "≈ 1,05 bar", "≈ 1,40 bar", "≈ 0,21 bar"], a: 1, e: "5 bar × 0,21 = 1,05 bar." },
      { q: "Pour une plongée à 30 m, un nitrox 40 % avec Pp O₂ max 1,4 bar…", c: ["est utilisable", "dépasse la Pp O₂ max", "est le meilleur mélange", "est trop pauvre en O₂"], a: 1, e: "4 × 0,40 = 1,6 bar > 1,4." }
    ]
  });

  C.module({
    id: "nx-toxo", world: "nitrox", depth: "−45 m", icon: "o2",
    title: "Toxicité de l’oxygène",
    sub: "Neurologique, pulmonaire, prévention",
    diagram: "nx-tox",
    essentiel: `
<p>L’oxygène est indispensable, mais <b>toxique sous pression</b>. Avec le nitrox, c’est lui qui fixe les limites.</p>
<h3>La toxicité neurologique (effet Paul Bert)</h3>
<ul><li>Quand la <b>Pp O₂ est trop élevée</b>, même peu de temps.</li>
<li>Signes possibles : troubles visuels, bourdonnements, nausées, contractions du visage, irritabilité, vertiges, puis <b>convulsions</b> sans prévenir.</li>
<li>Une convulsion sous l’eau peut faire perdre l’embout : risque de <b>noyade</b>.</li>
<li>Facteurs aggravants : <b>effort</b>, <b>froid</b>, <b>CO₂</b> (essoufflement), fatigue.</li></ul>
<h3>La toxicité pulmonaire (effet Lorrain Smith)</h3>
<ul><li>Quand on respire une Pp O₂ <b>modérée mais longtemps</b> (plusieurs plongées, longues expositions).</li>
<li>Signes : irritation, toux, gêne respiratoire.</li>
<li>Concerne surtout les plongées longues et répétées, et l’oxygénothérapie.</li></ul>
<h3>Prévention</h3>
<ul><li>Respecter la <b>Pp O₂ max</b> et donc la <b>MOD</b>.</li>
<li>Régler l’<b>ordinateur</b> sur le bon mélange : il suit l’exposition (horloge SNC).</li>
<li>Éviter effort et essoufflement en profondeur.</li></ul>
${VAL}Les Pp O₂ maximales retenues (fond, décompression) et les limites d’exposition dépendent du cursus et de la structure. À vérifier avec ton moniteur.</div>
`,
    memo: [["Neurologique", "Pp O₂ trop haute : convulsions, risque de noyade."], ["Pulmonaire", "Exposition longue : toux, gêne."], ["Prévenir", "MOD, ordinateur réglé, pas d’effort."]],
    moniteur: ["Quelle Pp O₂ max utilise-t-on au club ?"],
    quiz: [
      { q: "La toxicité neurologique de l’O₂ apparaît quand…", c: ["la Pp O₂ est trop élevée", "on respire de l’air pendant des heures en surface", "la Pp O₂ est trop basse pendant la remontée", "on plonge longtemps en eau chaude et peu profonde"], a: 0, e: "Effet Paul Bert." },
      { q: "Le danger principal d’une convulsion sous l’eau ?", c: ["La perte de l’embout et la noyade", "Une consommation d’air plus forte", "Un ADD articulaire", "Une perte de masque sans gravité"], a: 0, e: "D’où le strict respect de la MOD." },
      { q: "Quel facteur aggrave la toxicité neurologique ?", c: ["Le repos complet, posé au fond", "L’effort et l’essoufflement", "Une eau chaude, claire et calme", "Une descente lente le long du bout"], a: 1, e: "Le CO₂ augmente la sensibilité." },
      { q: "La toxicité pulmonaire (Lorrain Smith) concerne surtout…", c: ["une Pp O₂ très haute et brève", "une exposition modérée mais longue", "les plongées à l’air peu profondes", "la descente rapide"], a: 1, e: "Plongées longues et répétées." },
      { q: "Les convulsions dues à l’O₂ sont souvent…", c: ["précédées de signes clairs à chaque fois", "brutales, parfois sans prévenir", "lentes et progressives sur des heures", "impossibles sous 40 m"], a: 1, e: "On ne compte pas sur les signes d’alerte." },
      { q: "Comment l’ordinateur aide-t-il à prévenir la toxicité ?", c: ["Il suit l’exposition à l’O₂ s’il est bien réglé", "Il augmente la Pp O₂ au palier pour compenser", "Il donne de l’oxygène pur en cas d’alerte au fond", "Il ne sert qu’à la décompression, pas à l’oxygène"], a: 0, e: "Horloge SNC et alarme de MOD." },
      { q: "Signes possibles avant une crise ?", c: ["Vision troublée, bourdonnements, contractions", "Euphorie et rires, comme une narcose", "Douleurs articulaires après la plongée", "Démangeaisons et marbrures de la peau"], a: 0, e: "Mais ils peuvent manquer." },
      { q: "Prévenir la toxicité neurologique, c’est d’abord…", c: ["respecter la MOD", "plonger plus longtemps", "boire beaucoup", "descendre vite"], a: 0, e: "La MOD découle de la Pp O₂ max." },
      { q: "Un plongeur nitrox a des contractions du visage au fond. On…", c: ["remonte de quelques mètres et termine", "continue la plongée en le surveillant de près", "descend un peu pour le rassurer près du fond", "lui fait palmer fort pour voir s’il récupère"], a: 0, e: "Baisser la Pp O₂ tout de suite." },
      { q: "Le froid, pour la toxicité de l’O₂…", c: ["la favorise", "protège", "ne change rien", "la supprime"], a: 0, e: "Comme l’effort et la fatigue." },
      { q: "La toxicité pulmonaire se manifeste par…", c: ["toux, irritation, gêne respiratoire", "convulsions brutales sans prévenir au fond", "euphorie et confusion comme une narcose", "fourmillements dans les mains et les pieds"], a: 0, e: "Elle est lente et réversible le plus souvent." },
      { q: "Pourquoi la MOD du nitrox est-elle plus faible que pour l’air ?", c: ["Plus d’O₂ : la Pp O₂ max arrive plus tôt", "Moins d’azote : la narcose est plus forte au fond", "Le bloc de nitrox est moins rempli que celui d’air", "La densité du gaz est plus forte et freine le débit"], a: 0, e: "Plus de FO₂ = moins de profondeur." },
      { q: "Respirer de l’air à 66 m, côté oxygène, c’est…", c: ["dépasser 1,6 bar de Pp O₂", "rester sous 1 bar de Pp O₂", "sans aucun risque lié à l’O₂", "une Pp O₂ normale"], a: 0, e: "7,6 bar × 0,21 ≈ 1,6 bar : l’air a aussi sa limite O₂." },
      { q: "L’effet Paul Bert est…", c: ["la toxicité neurologique de l’O₂", "la toxicité pulmonaire de l’oxygène", "la narcose due à l’azote en profondeur", "l’accident de décompression médullaire"], a: 0, e: "Paul Bert : neurologique ; Lorrain Smith : pulmonaire." },
      { q: "Un essoufflement à 30 m au nitrox est dangereux car…", c: ["le CO₂ rend plus sensible à l’O₂", "il diminue la Pp O₂ et fatigue le plongeur", "il réduit la consommation et trompe le plongeur", "il supprime la narcose et donne trop confiance"], a: 0, e: "On s’arrête, on se stabilise, on remonte un peu." },
      { q: "Qui fixe la Pp O₂ max utilisée pour une plongée ?", c: ["Le cursus et la structure", "Chaque plongeur, selon son ressenti du jour", "Le fabricant du bloc, selon le volume", "Le gonfleur, selon le mélange disponible"], a: 0, e: "À vérifier avec ton moniteur." }
    ]
  });

  C.module({
    id: "nx-confirme", world: "nitrox", depth: "−50 m", icon: "layers",
    title: "Vers le nitrox confirmé",
    sub: "Mélanges riches, changement de gaz",
    diagram: "nx-conf",
    essentiel: `
<p>Le <b>nitrox confirmé</b> élargit l’usage : mélanges plus riches en oxygène et utilisation d’un nitrox pour <b>accélérer la décompression</b>.</p>
<h3>Ce qui change</h3>
<ul><li>Des mélanges <b>plus riches</b>, donc des MOD plus faibles : la discipline sur la profondeur devient vitale.</li>
<li>Parfois <b>deux gaz</b> : un mélange fond et un mélange de décompression.</li>
<li>Un matériel <b>compatible oxygène</b> pour les mélanges riches.</li></ul>
<h3>Le changement de gaz</h3>
<ol><li>Arrivé à la profondeur prévue (sous la MOD du mélange déco), on s’arrête et on se stabilise.</li>
<li>On <b>identifie</b> le bloc et le détendeur (étiquette, MOD, couleur du flexible).</li>
<li>L’<b>équipier vérifie</b> : bon détendeur, bonne MOD, bonne profondeur.</li>
<li>On passe sur le détendeur et on <b>règle l’ordinateur</b> sur le nouveau gaz.</li></ol>
<p>Une erreur de gaz (mélange riche respiré trop profond) peut provoquer une <b>crise hyperoxique</b>.</p>
${VAL}Le cursus nitrox confirmé (mélanges autorisés, Pp O₂ max de décompression, profondeurs) est fixé par la fédération. Vérifie avec ton moniteur avant toute pratique.</div>
`,
    memo: [["Confirmé", "Mélanges riches et nitrox de décompression."], ["Changement de gaz", "S’arrêter, identifier, faire vérifier, régler l’ordinateur."], ["Danger", "Mélange riche trop profond : hyperoxie."]],
    moniteur: ["Quels mélanges et quelles Pp O₂ pour le nitrox confirmé au club ?"],
    quiz: [
      { q: "Le nitrox confirmé permet notamment…", c: ["d’utiliser un nitrox pour la décompression", "de plonger plus profond qu’à l’air grâce à l’oxygène", "de supprimer les paliers, quelle que soit la plongée", "de plonger sans ordinateur, avec des tables nitrox"], a: 0, e: "Mélanges plus riches et gaz de déco." },
      { q: "Plus un mélange est riche en O₂, plus sa MOD est…", c: ["profonde", "faible", "identique à l’air", "sans importance"], a: 1, e: "La discipline sur la profondeur devient vitale." },
      { q: "Avant de changer de gaz, le plongeur…", c: ["s’arrête, se stabilise, identifie le détendeur", "change en remontant, sans s’arrêter, pour gagner du temps", "demande au guide de choisir le détendeur pour lui", "change au fond, à la profondeur maximale de la plongée"], a: 0, e: "Puis vérification par l’équipier." },
      { q: "Pendant le changement de gaz, l’équipier…", c: ["vérifie détendeur, MOD et profondeur", "continue sa remontée", "change de gaz en même temps sans regarder", "surveille seulement le temps"], a: 0, e: "Double contrôle." },
      { q: "Après le changement de gaz, on règle…", c: ["l’ordinateur sur le nouveau mélange", "le gilet au maximum pour rester stable", "le parachute pour marquer le palier", "la profondeur du palier, plus profond"], a: 0, e: "Sinon la déco et le suivi O₂ sont faux." },
      { q: "Respirer le gaz de déco riche au fond provoque un risque…", c: ["d’hyperoxie (crise neurologique)", "de narcose plus forte qu’avec l’air au fond", "d’ADD immédiat dès la remontée suivante", "d’essoufflement seul, sans autre conséquence"], a: 0, e: "La Pp O₂ dépasse largement la limite." },
      { q: "Le matériel pour mélanges riches doit être…", c: ["compatible oxygène", "graissé à l’huile classique", "identique à celui de l’air", "en plastique uniquement"], a: 0, e: "Risque d’incendie avec les graisses ordinaires." },
      { q: "Pourquoi un nitrox riche accélère-t-il la décompression ?", c: ["Moins d’azote : il s’élimine plus vite", "Il refroidit les tissus et ralentit les bulles", "Il augmente la pression ambiante au palier", "Il supprime la narcose et calme le plongeur"], a: 0, e: "Gradient d’élimination plus fort." },
      { q: "On identifie le bon détendeur grâce à…", c: ["l’étiquette, la MOD et le marquage", "la position du bloc sur le côté gauche", "l’ordre dans lequel on les a montés", "le bruit différent de chaque détendeur"], a: 0, e: "Marquage clair indispensable." },
      { q: "Le changement de gaz se fait à une profondeur…", c: ["égale ou moins profonde que la MOD du gaz", "plus profonde que sa MOD, pour avoir de la marge", "quelconque, l’ordinateur corrige automatiquement", "toujours à 30 m, quel que soit le mélange utilisé"], a: 0, e: "Jamais plus profond que la MOD." },
      { q: "Avec deux gaz, le risque principal d’erreur est…", c: ["respirer le mauvais gaz trop profond", "consommer plus d’air à cause des deux blocs", "perdre son masque en manipulant les détendeurs", "rater la descente à cause du poids des deux blocs"], a: 0, e: "D’où les procédures strictes." },
      { q: "Le nitrox confirmé exige avant tout…", c: ["rigueur, procédures, vérification croisée", "un bloc plus grand et un deuxième détendeur", "une plongée plus profonde que pour le nitrox simple", "moins de préparation, car l’ordinateur gère tout"], a: 0, e: "L’erreur coûte cher." },
      { q: "Chaque bloc de nitrox riche est analysé…", c: ["par le plongeur avant la plongée", "une fois par an, lors de l’inspection visuelle", "par le gonfleur seulement, qui en est responsable", "jamais : la station de gonflage est fiable"], a: 0, e: "Comme pour tout nitrox." },
      { q: "L’ordinateur multigaz, mal réglé, peut…", c: ["donner une décompression fausse", "ne rien changer, il détecte le gaz tout seul", "doubler la MOD affichée sur l’écran", "supprimer l’alarme de vitesse de remontée"], a: 0, e: "Il doit connaître chaque gaz." },
      { q: "Un plongeur n’a pas fait vérifier son changement de gaz. Le risque ?", c: ["Respirer le mauvais mélange sans le voir", "Gagner du temps sur le palier de décompression", "Consommer un peu moins de gaz pendant la déco", "Aucun, l’ordinateur alerte toujours le plongeur"], a: 0, e: "La vérification par l’équipier sert à ça." },
      { q: "Qui fixe le cursus du nitrox confirmé ?", c: ["La fédération", "Chaque plongeur", "Le fabricant d’ordinateur", "Le gonfleur"], a: 0, e: "À vérifier avec ton moniteur." }
    ]
  });

  /* ---------- Compléments des thèmes existants ---------- */
  C.extend("r-role", { quiz: [
    { q: "Protéger, c’est d’abord…", c: ["éviter un suraccident, pour toi et les autres", "couvrir la victime d’une couverture de survie", "noter l’heure et prendre des photos pour le rapport", "retirer tout de suite le matériel de la victime"], a: 0, e: "Pas de deuxième victime." },
    { q: "Le RIFAP est demandé pour…", c: ["certains brevets d’encadrement et de plongeur", "le baptême en mer uniquement, pas les brevets", "le gonflage des blocs au compresseur du club", "la conduite du bateau de plongée du club"], a: 0, e: "À vérifier selon ton cursus." },
    { q: "Sur un site de plongée, le plongeur RIFAP connaît…", c: ["l’emplacement de l’O₂, de la trousse et de la radio", "l’heure de retour au port et le nom du pilote", "le nom et le niveau de tous les plongeurs à bord", "la météo prévue pour toute la semaine de plongée"], a: 0, e: "Pour agir sans chercher." },
    { q: "Examiner, dans la chaîne des secours, c’est…", c: ["faire le bilan de la victime", "regarder le matériel", "chercher la cause de l’accident", "trouver un responsable"], a: 0, e: "Conscience, respiration, circulation." },
    { q: "Secourir, c’est…", c: ["faire les gestes adaptés à l’état de la victime", "la conduire soi-même à l’hôpital le plus proche", "lui donner un médicament de la trousse de secours", "attendre les pompiers sans toucher à la victime"], a: 0, e: "O₂, PLS, réanimation selon le bilan." },
    { q: "Surveiller jusqu’aux secours, c’est…", c: ["refaire le bilan et noter l’évolution", "la laisser seule se reposer au calme dans la cabine", "repartir plonger avec les autres en attendant", "ranger le bateau pour faciliter l’arrivée des secours"], a: 0, e: "Les secours ont besoin de l’évolution." },
    { q: "Un plongeur RIFAP peut-il donner un médicament ?", c: ["Non, ce n’est pas son rôle", "Oui, de l’aspirine systématiquement", "Oui, ce qu’il a dans sa trousse", "Oui, si la victime le demande"], a: 0, e: "Les médicaments relèvent du médecin." },
    { q: "Le RIFAP se recycle…", c: ["en pratiquant régulièrement les gestes", "jamais : une fois acquis, c’est pour toujours", "seulement après avoir vécu un vrai accident", "en relisant le manuel une fois par an, sans pratique"], a: 0, e: "Les gestes s’oublient vite." }
  ] });

  C.extend("r-alerte", { quiz: [
    { q: "Le CROSS coordonne…", c: ["les secours en mer", "les secours en montagne", "les clubs de plongée", "les gonflages"], a: 0, e: "Il déclenche les moyens adaptés." },
    { q: "Le 196 depuis un portable permet de joindre…", c: ["le CROSS", "le club", "la capitainerie", "un médecin de garde"], a: 0, e: "À vérifier selon la zone." },
    { q: "Avant d’appeler, on prépare…", c: ["position, nombre de victimes, état, gestes faits", "la liste complète de tous les plongeurs du club", "la carte du site imprimée et les coordonnées du club", "les papiers du bateau et l’assurance du pilote"], a: 0, e: "Un message clair fait gagner du temps." },
    { q: "Pourquoi ne pas raccrocher le premier ?", c: ["Les secours peuvent avoir des consignes", "Pour garder la ligne occupée et éviter d’autres appels", "Par simple politesse envers l’opérateur", "Pour que l’appel soit bien enregistré jusqu’au bout"], a: 0, e: "On attend leur accord." },
    { q: "Indiquer la position en mer se fait par…", c: ["coordonnées GPS ou repères visibles", "le nom du club et celui du directeur de plongée", "la couleur et la taille du bateau seulement", "la profondeur du site et le nom de la plongée"], a: 0, e: "Les secours doivent vous trouver vite." },
    { q: "Dans l’alerte, on précise que c’est un accident de plongée car…", c: ["les secours orientent vers un caisson hyperbare", "c’est plus rapide à dire que de décrire les signes", "c’est obligatoire pour que l’assurance prenne en charge", "ça évite que les secours posent trop de questions"], a: 0, e: "Le traitement est spécifique." },
    { q: "Pendant l’alerte, qui s’occupe de la victime ?", c: ["Une autre personne, qui continue les gestes", "Personne : tout le monde écoute l’appel pour aider", "La victime elle-même, si elle est consciente", "Le pilote, en conduisant le bateau vers le port"], a: 0, e: "On se répartit les rôles." },
    { q: "La VHF canal 16 est…", c: ["le canal de détresse et d’appel", "un canal de discussion entre bateaux", "réservé aux ports", "un canal météo"], a: 0, e: "Veillé en permanence par le CROSS." }
  ] });

  C.extend("r-o2", { quiz: [
    { q: "Le débit d’O₂ classique au masque à haute concentration ?", c: ["15 L/min", "2 L/min", "50 L/min", "0,5 L/min"], a: 0, e: "Ballon réserve gonflé avant de poser le masque." },
    { q: "L’autonomie d’une bouteille d’O₂ se calcule…", c: ["volume × pression ÷ débit", "pression ÷ volume, multipliée par le débit", "débit × volume, divisé par 10", "volume ÷ débit, sans tenir compte de la pression"], a: 0, e: "Litres disponibles ÷ L/min." },
    { q: "Près de l’oxygène, on interdit…", c: ["flammes, cigarettes et corps gras", "l’eau douce et les embruns sur le détendeur", "les couvertures de survie sur la victime", "la radio VHF allumée à proximité"], a: 0, e: "L’O₂ entretient violemment la combustion." },
    { q: "Une victime qui ne respire pas reçoit l’oxygène…", c: ["par insufflation (BAVU), si on est formé", "par le masque haute concentration, débit maximal", "par le détendeur de plongée, mis en bouche", "pas du tout : l’oxygène est inutile dans ce cas"], a: 0, e: "Le masque ne sert que si elle respire." },
    { q: "Si l’autonomie d’O₂ est insuffisante pour l’attente des secours…", c: ["on le signale lors de l’alerte", "on baisse le débit à 2 L/min", "on arrête l’O₂ pour l’économiser", "on n’en parle pas"], a: 0, e: "Les secours peuvent s’organiser." },
    { q: "Avant la sortie, on vérifie la bouteille d’O₂…", c: ["pression, détendeur, masques", "seulement la couleur et l’étiquette de la bouteille", "la date d’achat inscrite sur la bouteille", "rien de plus : elle est scellée par le fournisseur"], a: 0, e: "Un matériel non vérifié peut manquer." },
    { q: "Une victime d’ADD sous O₂ va mieux. L’O₂…", c: ["continue jusqu’aux secours", "s’arrête pour économiser la bouteille pour un autre", "s’arrête après 10 minutes, quand les signes ont disparu", "baisse à 1 L/min pour durer plus longtemps"], a: 0, e: "Seuls les secours décident." }
  ] });

  C.extend("r-vict", { quiz: [
    { q: "La PLS protège la victime…", c: ["de l’étouffement (langue, vomissements)", "du froid, en la gardant serrée contre le sol", "d’un ADD en limitant la circulation du sang", "d’une chute si elle se réveille brusquement"], a: 0, e: "Les voies aériennes restent libres." },
    { q: "Une victime en PLS sous oxygène doit être…", c: ["surveillée en permanence", "laissée seule pour se reposer", "remise debout régulièrement", "couverte entièrement, visage compris"], a: 0, e: "Elle peut s’arrêter de respirer." },
    { q: "Une victime consciente qui respire mal se met…", c: ["dans la position où elle respire le mieux", "en PLS, même si elle est consciente et le refuse", "à plat ventre pour faciliter la respiration", "allongée tête en bas pour irriguer le cerveau"], a: 0, e: "On respecte sa position de confort." },
    { q: "Une victime inconsciente qui vomit…", c: ["se met sur le côté immédiatement", "reste sur le dos, tête basculée en arrière", "s’assied pour pouvoir vomir plus facilement", "boit un peu d’eau pour se rincer la bouche"], a: 0, e: "Pour éviter l’inhalation." },
    { q: "La noyade peut se dégrader…", c: ["plusieurs heures après, même si elle va bien", "jamais, si elle va bien en sortant de l’eau", "seulement tant qu’elle reste dans l’eau froide", "uniquement chez l’enfant, rarement chez l’adulte"], a: 0, e: "Toujours un avis médical." },
    { q: "Pour la PLS d’un plongeur, on retire d’abord…", c: ["le bloc et le lest", "la cagoule et les gants seulement", "les palmes, pour mieux la tourner", "la combinaison entière, avant tout"], a: 0, e: "Il doit pouvoir être tourné sur le côté." },
    { q: "Une victime inconsciente, au bilan, est…", c: ["toujours une urgence vitale", "souvent sans gravité si elle respire", "à laisser dormir au calme jusqu’au port", "à réveiller en lui faisant boire de l’eau"], a: 0, e: "Alerte et bilan respiratoire immédiats." }
  ] });

  C.extend("r-cas", { quiz: [
    { q: "Cas : un plongeur ressort fatigué, pâle, sans autre signe. Tu…", c: ["le surveilles, l’hydrates, O₂ au moindre doute", "le laisses repartir chez lui en voiture", "lui proposes une deuxième plongée plus courte", "lui donnes un café chaud et du sucre"], a: 0, e: "La fatigue anormale peut être un premier signe." },
    { q: "Cas : deux victimes en même temps, une seule bouteille d’O₂. Tu…", c: ["le signales à l’alerte et organises la priorité", "la donnes à la plus calme des deux victimes", "n’en donnes à personne pour éviter de choisir", "partages un seul masque en alternant toutes les minutes"], a: 0, e: "Les secours s’organisent en conséquence." },
    { q: "Cas : douleur au coude 2 h après la plongée, à terre. Tu…", c: ["appelles le 15 ou le 112, O₂ si disponible", "attends le lendemain pour voir si ça persiste", "masses le coude doucement pour faire partir la douleur", "remets la combinaison pour réchauffer l’articulation"], a: 0, e: "Un ADD peut être tardif." },
    { q: "Cas : un plongeur remonte trop vite mais n’a aucun signe. Tu…", c: ["informes le DP et le surveilles", "ne fais rien", "le fais redescendre faire un palier", "lui fais faire un effort pour voir"], a: 0, e: "Des signes peuvent apparaître plus tard." },
    { q: "Cas : victime inconsciente qui ne respire pas sur le bateau. Ordre ?", c: ["Alerter, réanimer, DAE dès qu’il arrive", "O₂ au masque haute concentration et attendre", "PLS, couverture et surveillance jusqu’au port", "La réchauffer d’abord, puis vérifier la respiration"], a: 0, e: "Arrêt cardiaque : réanimation sans attendre." },
    { q: "Cas : un plongeur vomit et a la tête qui tourne après la plongée. Tu…", c: ["penses ADD possible : O₂, bilan, alerte", "penses mal de mer, sans rien faire", "lui donnes un médicament contre la nausée", "le fais s’allonger seul en cabine"], a: 0, e: "Un vertige après plongée est suspect." },
    { q: "Cas : la victime refuse l’oxygène. Tu…", c: ["expliques pourquoi, insistes, puis alertes", "laisses tomber et n’appelles pas les secours", "le lui imposes de force en tenant le masque", "attends qu’elle change d’avis avant toute chose"], a: 0, e: "On explique ; on alerte de toute façon." },
    { q: "Cas : tu es seul RIFAP sur le bateau. Ta priorité ?", c: ["Répartir les rôles : alerte, O₂, surveillance", "Tout faire seul, pour éviter les erreurs des autres", "Attendre qu’un encadrant plus gradé prenne la main", "Rentrer au port le plus vite possible avant d’agir"], a: 0, e: "On délègue l’alerte." },
    { q: "Cas : la fiche d’évacuation est incomplète à l’arrivée des secours. Tu…", c: ["donnes oralement ce que tu sais", "les fais attendre pour la remplir", "ne dis rien", "inventes les paramètres"], a: 0, e: "Information exacte, même partielle." },
    { q: "Cas : le palanquier de la victime a les mêmes paramètres. Tu…", c: ["le surveilles aussi", "le renvoies chez lui", "le fais replonger", "l’ignores"], a: 0, e: "Même exposition, même risque." }
  ] });

  C.extend("nx-base", { quiz: [
    { q: "Un nitrox 32 % contient environ…", c: ["32 % d’O₂ et 68 % d’azote", "32 % d’azote et 68 % d’O₂", "21 % d’O₂ et 79 % d’azote", "50 % de chaque"], a: 0, e: "Le pourcentage indiqué est celui de l’O₂." },
    { q: "Le nitrox réduit la narcose ?", c: ["Pas vraiment : l’O₂ serait narcotique aussi", "Oui, il la supprime complètement à toute profondeur", "Oui, il la divise par deux grâce au moins d’azote", "Il l’augmente toujours à cause de l’oxygène"], a: 0, e: "On ne compte pas dessus." },
    { q: "Le nitrox est surtout intéressant…", c: ["entre 15 et 35 m environ", "au-delà de 50 m, pour réduire la narcose", "en surface et dans la zone des 6 premiers mètres", "seulement en piscine, pour l’entraînement"], a: 0, e: "Là où le gain de décompression est utile et la MOD compatible." },
    { q: "Le nitrox fatigue-t-il moins ?", c: ["Souvent ressenti, pas un argument de sécurité", "Oui, c’est prouvé et garanti par les études", "Non, il fatigue plus à cause de l’oxygène", "Il supprime toute fatigue après la plongée"], a: 0, e: "On se fonde sur la décompression, pas sur l’impression." },
    { q: "Pour plonger au nitrox, il faut…", c: ["la qualification nitrox adaptée", "seulement le N1 et un ordinateur récent", "aucune formation, juste l’accord du gonfleur", "un ordinateur réglé sur 21 % pour être prudent"], a: 0, e: "Formation spécifique." }
  ] });

  C.extend("nx-securite", { quiz: [
    { q: "Une alarme de Pp O₂ sur l’ordinateur. Tu…", c: ["remontes de quelques mètres", "continues la plongée en surveillant l’écran", "descends un peu pour vérifier la profondeur", "coupes l’alarme et termines le parcours prévu"], a: 0, e: "Baisser la Pp O₂ tout de suite." },
    { q: "Deux plongeurs d’une palanquée ont des mélanges différents. La MOD retenue…", c: ["est la plus faible des deux", "est la plus profonde, celle du mélange pauvre", "est la moyenne des deux MOD calculées", "est celle du guide, qui mène la palanquée"], a: 0, e: "La palanquée respecte la plus restrictive." },
    { q: "Un bloc nitrox non étiqueté…", c: ["ne se plonge pas avant analyse et marquage", "se plonge comme un bloc d’air, sans précaution", "se plonge en limitant la profondeur à 20 m", "se rend au club sans le signaler au gonfleur"], a: 0, e: "On ne devine pas un mélange." },
    { q: "Le nitrox permet-il de faire des plongées plus longues sans palier ?", c: ["Oui, à profondeur égale, en général", "Non, jamais : la courbe de sécurité est la même", "Oui, sans aucune limite de durée au fond", "Seulement au-delà de 40 m de profondeur"], a: 0, e: "Moins d’azote, plus de marge." },
    { q: "Plonger au nitrox avec un ordinateur réglé sur l’air reste…", c: ["prudent côté déco, si on surveille la MOD soi-même", "interdit dans tous les cas par la réglementation fédérale", "plus dangereux côté décompression que plonger à l’air", "sans aucune conséquence, ni sur la déco ni sur l’O₂"], a: 0, e: "L’ordinateur ne suit plus la Pp O₂." },
    { q: "Le risque principal propre au nitrox ?", c: ["La toxicité de l’oxygène", "La narcose, plus forte qu’à l’air", "L’ADD, plus fréquent qu’à l’air", "Le froid, dû au gaz plus sec"], a: 0, e: "D’où la MOD." }
  ] });

  C.extend("nx-pratique", { quiz: [
    { q: "On analyse un bloc nitrox…", c: ["juste avant la plongée, robinet entrouvert", "une fois par saison, après le gonflage", "seulement après la plongée, pour vérifier", "bouteille fermée, sur l’étiquette du gonfleur"], a: 0, e: "Faible débit vers l’analyseur." },
    { q: "L’analyseur indique 31,6 %. Tu notes…", c: ["31,6 % et la MOD calculée", "32 %, la valeur ronde la plus proche", "30 %, en arrondissant vers le bas", "la valeur demandée au gonfleur, 32 %"], a: 0, e: "On note la valeur mesurée." },
    { q: "Le carnet du gonfleur nitrox sert à…", c: ["tracer chaque gonflage et chaque analyse", "noter toutes les plongées faites par le club", "calculer les paliers de chaque plongeur nitrox", "réserver les blocs nitrox pour la sortie suivante"], a: 0, e: "Traçabilité de chaque mélange." },
    { q: "Un bloc nitrox se reconnaît souvent à…", c: ["un marquage spécifique", "une couleur de robinet rouge obligatoire", "sa taille plus petite", "son poids plus léger"], a: 0, e: "Le marquage dépend des règles en vigueur." },
    { q: "Pendant la plongée nitrox, on surveille en plus…", c: ["la profondeur par rapport à la MOD", "la couleur de l’eau et la visibilité au fond", "la température du bloc, qui chauffe au nitrox", "rien de plus qu’à l’air : seule la déco change"], a: 0, e: "Ne jamais dépasser la MOD." },
    { q: "Après la plongée nitrox, l’ordinateur…", c: ["garde le suivi de l’azote et de l’O₂", "s’efface automatiquement à la sortie de l’eau", "doit être remis sur l’air avant la plongée suivante", "n’enregistre rien en mode nitrox"], a: 0, e: "Il sert pour les plongées suivantes." }
  ] });

  C.addCards([
    { id: "xr-b1", m: "r-bilan", f: "Bilan vital", b: "Conscience, respiration (10 s), circulation." },
    { id: "xr-c1", m: "r-rcp", f: "Cycle de réanimation adulte", b: "30 compressions, 2 insufflations, DAE dès que possible." },
    { id: "xr-c2", m: "r-rcp", f: "Noyé", b: "Arrêt par manque d’O₂ : insufflations initiales." },
    { id: "xr-s1", m: "r-sortie", f: "Tractage", b: "Sur le dos, visage hors de l’eau, tête tenue." },
    { id: "xr-a1", m: "r-acc", f: "Signe suspect après plongée", b: "Oxygène, alerte, bilan, surveillance." },
    { id: "xn-c1", m: "nx-calculs", f: "MOD", b: "Pp O₂ max ÷ FO₂ = P abs max ; arrondir vers le bas." },
    { id: "xn-c2", m: "nx-calculs", f: "Meilleur mélange", b: "Pp O₂ max ÷ P abs ; arrondir vers le bas." },
    { id: "xn-t1", m: "nx-toxo", f: "Paul Bert", b: "Toxicité neurologique : Pp O₂ trop haute, convulsions." },
    { id: "xn-t2", m: "nx-toxo", f: "Lorrain Smith", b: "Toxicité pulmonaire : exposition longue." },
    { id: "xn-g1", m: "nx-confirme", f: "Changement de gaz", b: "S’arrêter, identifier, faire vérifier, régler l’ordinateur." }
  ]);

  C.notions = Object.assign(C.notions || {}, {
    "r-role": [["chaine", "Chaîne des secours", "proteger|examiner|alerter|secourir|surveill|ordre|chaine", "chaîne"], ["role", "Rôle du plongeur RIFAP", "rifap|role|site|medicament|recycl|demande", "RIFAP"], ["o2", "L’oxygène au cœur", "oxygene|o₂", "oxygène"]],
    "r-alerte": [["qui", "Qui appeler", "cross|15|112|196|vhf|16", "CROSS"], ["message", "Le message d’alerte", "message|dire|position|prepare|precise", "message"], ["apres", "Raccrocher et rôles", "raccroche|fiche|pendant l.alerte|parametres", "raccroche"]],
    "r-o2": [["debit", "Mise en œuvre et débit", "debit|masque|ballon|15 l|bavu|insuffl", "débit"], ["autonomie", "Autonomie", "autonomie|bouteille|l/min|insuffisante", "autonomie"], ["secu", "Sécurité et surveillance", "graiss|flamme|surveill|noter|heure|verifie|continue", "sécurité"]],
    "r-vict": [["pls", "PLS", "pls|laterale|vomit|cote", "PLS"], ["rcp", "Ne respire pas", "ne respire pas|reanim|rcp|respiration", "réanimation"], ["noyade", "Noyade", "noy|degrader", "noyade"]],
    "r-cas": [["add", "Signes après la plongée", "douleur|fatigue|coude|genou|vomit|tete qui tourne|trop vite", "douleur"], ["inconscient", "Victime inconsciente", "inconscient|ne respire|pls|defibrill", "inconscient"], ["orga", "Organiser les secours", "seul|deux victimes|refuse|fiche|palanquier|heure|malade|boire", "Organiser"]],
    "r-bilan": [["vital", "Bilan vital", "conscience|respiration|voies aeriennes|circulation|10 secondes|ne repond", "Conscience"], ["compl", "Bilan complémentaire", "complementaire|fourmill|marbrure|mousse|parametres|heure|pale", "complémentaire"], ["surv", "Surveiller et noter", "refaire|evolution|note|regulierement|avant le complementaire", "Surveiller"]],
    "r-rcp": [["reconnaitre", "Reconnaître l’arrêt", "hoquets|arret|inconsciente|alerter", "arrêt"], ["gestes", "Compressions et insufflations", "compression|insuffl|cycle|bavu|poitrine|relayer|fortes", "compressions"], ["dae", "Défibrillateur", "defibrill|electrode|analyse|choc", "défibrillateur"]],
    "r-sortie": [["surface", "En surface", "surface|flottabilite|lest|masque|detresse|gilet", "surface"], ["tractage", "Tractage", "tract|tient|parles", "Tracter"], ["sortir", "Sortir et déséquiper", "sortie|sortir|echelle|a plat|bloc|effort|position|remontee|securite", "sortir"]],
    "r-acc": [["add", "Signes d’ADD", "add|fatigue|uriner|parole|epaule|fourmill|apparaissent", "ADD"], ["autres", "Surpression, noyade, froid", "surpression|thoracique|noyade|mousse|frissons|hypotherm", "Surpression"], ["conduite", "Conduite commune", "conduite|oxygene|reimmerg|boire|fiche|diagnostic|palanquee", "Oxygène"]],
    "nx-base": [["melange", "Composition du nitrox", "contient|pourcentage|azote|32 %|composition", "nitrox"], ["mod", "MOD et EAD", "mod|ead|profondeur max|arrondit", "MOD"], ["interet", "Intérêt et limites", "avantage|narcose|fatigue|interessant|qualification|analyse", "intérêt"]],
    "nx-securite": [["analyse", "Analyse et étiquette", "analyse|etiquet|non etiquete", "analyse"], ["ordi", "Ordinateur et alarmes", "ordinateur|alarme|regle", "ordinateur"], ["mod", "MOD et mélanges", "mod|meilleur melange|differents|depasser|toxicit|risque", "MOD"]],
    "nx-pratique": [["analyse", "Analyser", "analys|calibr|31,6|23 %", "analyseur"], ["marquage", "Marquer et tracer", "etiquet|marqu|carnet du gonfleur|reconnait", "étiquette"], ["ordi", "Régler et suivre", "ordinateur|mod|apres la plongee|add", "ordinateur"]],
    "nx-calculs": [["dalton", "Dalton et Pp O₂", "dalton|pp o₂|fn₂|loi", "Dalton"], ["mod", "MOD", "mod|pp o₂ max", "MOD"], ["melange", "Meilleur mélange et EAD", "meilleur melange|ead|arrondi", "EAD"]],
    "nx-toxo": [["neuro", "Toxicité neurologique", "neurolog|paul bert|convuls|contraction|visuels", "neurologique"], ["pulmo", "Toxicité pulmonaire", "pulmonaire|lorrain|toux|longue", "pulmonaire"], ["prev", "Facteurs et prévention", "effort|froid|essouffl|mod|ordinateur|66 m|fixe", "prévenir"]],
    "nx-confirme": [["usage", "Mélanges riches et déco", "confirme|riche|decompression|accelere|cursus", "décompression"], ["changement", "Changement de gaz", "changement|changer|equipier|identifie|regle", "changement de gaz"], ["risques", "Risques et rigueur", "hyperox|mauvais|erreur|compatible|rigueur|analyse|multigaz", "rigueur"]]
  });
})();
