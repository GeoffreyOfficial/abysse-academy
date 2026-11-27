/* =====================================================================
   Abysse Academy 2.9.1 · audit des questions, tous modes
   1. Indice « seulement / jamais » : quand seules les mauvaises réponses
      sont absolues ou incomplètes (« X seulement »), on devine la bonne
      sans connaître le cours. Les mauvaises réponses deviennent des
      erreurs plausibles, rédigées comme la bonne.
   2. Bonne réponse nettement plus longue : réécrite à longueur égale.
   3. Doublons : une question qui répétait une autre (même énoncé, même
      réponse) est réécrite pour tester un AUTRE point du même cours.
      L'identifiant reste : la progression y reste attachée. Rien n'est
      supprimé ni déplacé.
   Contenus « À faire valider » auprès de ton moniteur.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  /* id → choix (même nombre, même place de la bonne réponse) */
  const CH = {
    "d-bapteme-11": ["On peut l’arrêter à tout moment par un simple signe au moniteur", "Le moniteur reste à côté de toi pendant toute la plongée", "Il faut savoir parfaitement équilibrer avant de venir, sinon c’est refusé", "On respire normalement par la bouche, dans le détendeur"],
    "d-oreilles-11": ["On équilibre avant d’avoir mal, dès les premiers mètres", "On équilibre plus souvent dans les premiers mètres de la descente", "Si ça bloque, on remonte un peu et on réessaie doucement", "Si ça bloque, on souffle de plus en plus fort jusqu’à ce que ça passe"],
    "n1-signes-2": ["Tu fais « on remonte » et tu pars vers la surface", "« Ça ne va pas » puis tu montres l’oreille", "Tu montres l’oreille et tu continues la descente", "Tu pinces le nez et souffles fort sans prévenir"],
    "n1-milieu-7": ["Parce qu’elles sont toxiques et provoquent des brûlures sur la peau", "Parce qu’elles grandissent de quelques millimètres par an et cassent", "Parce qu’elles abritent des poissons qui mordent quand on les dérange", "Parce qu’elles sont glissantes et qu’on risque de se blesser en tombant"],
    "pression-14": ["Le rapport de pression y est le plus grand", "La pression absolue y augmente plus vite qu’ailleurs", "La pression y est la plus forte de toute la plongée", "L’eau y est moins dense, on remonte donc plus vite"],
    "physio-7": ["le plasma, sous forme dissoute", "l’hémoglobine des globules rouges", "les globules blancs du sang", "la myoglobine dans le sang"],
    "environnement-10": ["rouge vif, comme en surface", "verdâtre ou sombre", "bleu clair et brillant", "orange fluo"],
    "dalton-8": ["de sa proportion et de la température de l’eau", "de la pression absolue et de sa proportion", "de la profondeur et du volume du bloc", "de la pression relative et de sa proportion"],
    "accidents-8": ["Non, si on a fait tous ses paliers", "Oui, c’est possible", "Oui, mais au-delà de 40 m", "Non, sauf après une remontée rapide"],
    "pa20-5": ["ton matériel, le reste est l’affaire de chacun", "ton matériel et celui de tes binômes", "le matériel du plus débutant de la palanquée", "les blocs et les gilets, les détendeurs au fond"],
    "r-role-1": ["les gestes dans l’eau jusqu’au bateau", "l’eau et la prise en charge jusqu’aux secours", "les gestes hors de l’eau et le transport à l’hôpital", "l’alerte et le diagnostic de l’accident"],
    "r-role-15": ["en pratiquant régulièrement les gestes", "en relisant le manuel chaque année", "en regardant les vidéos des gestes", "en assistant à une conférence sur les accidents"],
    "r-alerte-2": ["Le lieu, l’heure et le nom du club", "Qui, où, quoi, état de la victime, gestes faits", "Ton nom, le nombre de plongeurs et la météo", "L’état de la victime et ton diagnostic"],
    "r-alerte-3": ["les paramètres de plongée et l’heure des signes", "le niveau, la licence et le nom du club", "le nom du DP, du pilote et du bateau", "le diagnostic de l’accident"],
    "r-o2-0": ["Quand on est sûr qu’il s’agit d’un ADD", "Dès le moindre signe suspect", "Quand la victime le réclame", "Après avis du médecin par téléphone"],
    "r-vict-13": ["plusieurs heures après, même si elle va bien", "dans les premières minutes, puis le risque est passé", "tant qu’elle reste dans l’eau froide", "chez l’enfant, mais pas chez l’adulte"],
    "e2-role-11": ["aux baptêmes, à la piscine et aux sorties", "aux examens de niveau 3 et aux jurys", "à la gestion du compresseur et des blocs", "aux plongées profondes de nuit"],
    "e2-peda-10": ["« Parfait, on passe directement à l’exercice suivant »", "« Bien réussi ; la prochaine fois, respire plus calmement »", "« Ce n’était pas bon, on recommence depuis le début »", "« Tu étais crispé : on arrête pour aujourd’hui »"],
    "e2-seance-0": ["Profondeur, durée et faune du site", "Objectif, déroulement, signes, sécurité, incidents", "Objectif, signes et horaire de retour", "Déroulement et matériel, l’objectif se découvre sous l’eau"],
    "e2-seance-12": ["de ses élèves et le sien", "des élèves, et le sien une fois au fond", "le sien, les élèves sont autonomes", "celui que lui signale le gonfleur"],
    "n3-gaz-1": ["en surface, pas avant", "en remontant de quelques mètres", "après plusieurs minutes au même niveau", "au palier, une fois stabilisé"],
    "n3-autonomie-4": ["La conso est forte et les imprévus coûtent cher", "La réserve réglementaire y passe à 100 bar", "Le bloc se vide plus vite à cause du froid", "Les paliers obligatoires y sont plus profonds"],
    "n4-guide-3": ["Site, profondeur, durée, signes, sécurité", "Site, profondeur et faune à voir", "Signes, pression de retour et parcours", "Paramètres et parcours, la sécurité se gère sous l’eau"],
    "n4-guide-10": ["sa consommation et le risque de remontée rapide", "sa flottabilité, qui devient positive", "sa sensibilité au froid et à la narcose", "sa narcose, mais pas sa consommation"],
    "n4-air-4": ["la descente et le temps au fond", "la remontée, les paliers et une marge", "le fond et la remontée, sans marge si tout va bien", "le palier et la pression du bateau"],
    "n4-orga-6": ["la profondeur, la durée, les paliers et incidents", "la profondeur atteinte et le parcours", "les incidents, s’il y en a eu", "le parcours suivi et la faune observée"],
    "e2-securite-3": ["forme, matériel et lest de l’élève", "météo et horaire de la marée", "son propre matériel et son lest", "la pression du bloc de l’élève"],
    "e2-securite-13": ["de chaque élève", "la sienne, avant de partir", "à la fin de l’exercice", "quand l’élève le signale"],
    "nx-base-15": ["la qualification nitrox adaptée", "le N1 et un ordinateur récent", "l’accord du gonfleur et un bloc étiqueté", "un ordinateur réglé sur 21 % pour être prudent"],
    "nx-securite-2": ["Le % d’O₂, la MOD, la date et le nom", "Le % d’O₂ et la pression", "La date de gonflage et la pression", "La MOD et le nom du gonfleur"],
    "nx-securite-13": ["Oui, à profondeur égale, en général", "Non : la courbe de sécurité est la même qu’à l’air", "Oui, sans limite de durée au fond", "Oui, mais au-delà de 40 m de profondeur"],
    "e2-evaluer-3": ["un point à la fois", "tout en même temps", "le résultat final", "la flottabilité avant tout"],
    "e2-evaluer-11": ["avant l’exercice", "après la validation", "pendant le débriefing", "en cas d’échec"],
    "nx-pratique-3": ["le pourcentage, la MOD, la date, le nom", "le pourcentage d’O₂ et la pression", "la pression de gonflage et la date", "la MOD et le nom du gonfleur"],
    "nx-pratique-7": ["le % d’O₂, la MOD, la date et le nom", "le % d’O₂ et la pression de gonflage", "la date de gonflage et la pression", "la MOD et le numéro du bloc"],
    "e1-piscine-14": ["le matériel de chaque élève", "les blocs et les détendeurs du club", "les masques, le reste est fourni", "le sien, le club vérifie le reste"],
    "n3-tables-15": ["de l’ordinateur du guide, qui décide pour tous", "de la procédure de ta table et de la situation", "de la durée totale de la plongée déjà faite", "de la profondeur maximale atteinte au fond"],
    "n3-orientation-12": ["cap d’aller, repères, demi-tour, et si on rate le bout", "le cap d’aller, le reste se voit une fois au fond", "le cap d’aller et la faune qu’on va rencontrer", "la profondeur maxi, la durée et l’heure de sortie"],
    "n3-speciales-7": ["Le Code du sport français, partout", "Les règles locales et celles du centre", "Celles de la CMAS", "Celles de ta fédération d’origine"],
    "n3-speciales-15": ["Son passeport et une photo d’identité récente", "Carte de niveau, carnet, certificat ou assurance", "Son ordinateur, pour montrer son historique", "Rien : on y refait de toute façon une plongée test"],
    "n4-modeles-5": ["des paliers plus profonds et courts", "des paliers plus longs à 3 m", "une vitesse de remontée plus rapide", "des paliers plus courts, sans palier profond"],
    "n4-milieu-14": ["la veille", "la veille et le matin même", "sur le bateau, au départ", "le matin, en regardant la mer"],
    "e1-cadre-11": ["pas du tout : il applique les consignes du responsable", "si elle dépasse ses prérogatives ou semble dangereuse", "si un élève le lui demande clairement", "en piscine, mais pas en milieu naturel"],
    "e2-n1mer-7": ["en expliquant et en vérifiant que tout est tenu", "sans trop d’explication, pour ne pas l’inquiéter avant", "en piscine, pas depuis un bateau en mer", "par grosse houle, pour s’entraîner"],
    "e2-orga-4": ["de ses paramètres et des incidents", "s’il y a eu un accident grave", "le lendemain, par un message au club", "des espèces observées pendant la plongée"],
    "e2-orga-15": ["mise à l’eau, descente, exercices, découverte, remontée", "les exercices, le reste se découvre sous l’eau", "la profondeur maximale et la durée de plongée", "la liste des espèces à voir et l’horaire de retour"],
    "e2-exmer-10": ["on peut se poser sans danger ni dégâts", "l’eau y est plus claire qu’ailleurs", "il y a plus de poissons à montrer aux élèves", "le courant y est plus faible que près des roches"],
    "r-bilan-3": ["le pouls et la tension artérielle", "plaintes, signes vus, paramètres, heure", "les paramètres de la plongée du jour", "le nom du club, du DP et du pilote du bateau"],
    "r-sortie-14": ["dans la position où elle se sent le mieux", "debout, pour mieux respirer", "en PLS, même si elle est consciente", "tête en bas, pour irriguer le cerveau"],
    "r-acc-4": ["pendant la descente, dès les premiers mètres", "dans l’heure qui suit la sortie", "le lendemain, après le sommeil", "au fond, avant la remontée"],
    "nx-confirme-12": ["par le plongeur avant la plongée", "une fois par an, lors de l’inspection visuelle", "par le gonfleur, qui en est responsable", "à la station, une fois pour toutes"]
  };
  /* id → question réécrite (doublons) : { q, c, a, e } */
  const RW = {
    "n1-physique-8": { q: "Pourquoi équilibre-t-on ses oreilles plus souvent dans les premiers mètres ?", c: ["La pression y change le plus, en proportion", "L’eau y est plus froide qu’au fond", "Le détendeur y fournit moins d’air", "On y descend toujours plus vite"], a: 0, e: "Entre 0 et 10 m, la pression double : c’est là que l’écart se crée le plus vite dans les oreilles." },
    "n1-physique-9": { q: "En mer, à quelle profondeur la pression absolue atteint-elle 3 bar ?", c: ["10 m", "20 m", "30 m", "3 m"], a: 1, e: "Pression absolue = 1 bar d’air + 1 bar par 10 m d’eau : 1 + 2 = 3 bar à 20 m." },
    "environnement-0": { q: "Pourquoi ne mouille-t-on pas l’ancre dans un herbier de posidonie ?", c: ["L’herbier pousse très lentement et l’ancre l’arrache", "L’ancre y glisse et le bateau dérive", "La posidonie est urticante pour les plongeurs", "L’herbier cache souvent des épaves dangereuses"], a: 0, e: "La posidonie, plante à fleurs, pousse de quelques centimètres par an : une ancre détruit en un instant des décennies de croissance." },
    "environnement-12": { q: "Les herbiers de posidonie sont précieux parce qu’ils…", c: ["réchauffent l’eau en hiver", "abritent les jeunes poissons et oxygènent l’eau", "filtrent les méduses du large", "empêchent tout courant près des côtes"], a: 1, e: "Nurserie de nombreuses espèces, production d’oxygène et protection des plages contre l’érosion." },
    "environnement-13": { q: "À travers le masque, un poisson semble à 1 m de toi. En réalité, il est…", c: ["un peu plus près, et plus gros", "un peu plus loin, et plus petit", "exactement à 1 m", "deux fois plus loin, à 2 m"], a: 1, e: "Sous l’eau, les objets paraissent plus gros et plus proches (environ 3/4 de la distance réelle) : il est en fait vers 1,3 m." },
    "environnement-15": { q: "Un guide nourrit les poissons pour les attirer près des plongeurs. Quel est le problème ?", c: ["C’est sans risque si la nourriture est naturelle", "Les poissons changent de comportement et d’alimentation", "Les poissons ne mangent pas sous l’eau en journée", "Cela fait fuir les poissons pour la journée"], a: 1, e: "Nourrir la faune la rend dépendante, parfois agressive, et déséquilibre le milieu, même avec des oursins." },
    "physio-11": { q: "Après une forte hyperventilation, l’envie de respirer arrive en apnée…", c: ["plus tôt, car on manque d’oxygène", "plus tard, car le CO₂ a été abaissé", "au même moment qu’avant", "plus tard, car on a stocké de l’O₂"], a: 1, e: "L’hyperventilation fait baisser le CO₂ : le signal d’alerte arrive trop tard, d’où le risque de syncope." },
    "physio-12": { q: "Pourquoi équilibre-t-on mal ses oreilles avec un rhume ?", c: ["Le tympan devient plus rigide", "La muqueuse gonflée bouche la trompe d’Eustache", "Le nez ne laisse plus passer l’air du détendeur", "L’oreille interne est remplie de liquide"], a: 1, e: "La trompe d’Eustache relie l’oreille moyenne à la gorge : enflammée, elle ne laisse plus passer l’air." },
    "materiel-13": { q: "Pourquoi garde-t-on le capuchon sur le premier étage au rinçage ?", c: ["Pour que l’eau n’entre pas dans le mécanisme", "Pour éviter que le flexible ne se torde", "Pour que le manomètre reste juste", "Pour que le détendeur sèche plus vite"], a: 0, e: "De l’eau, surtout salée, dans l’entrée haute pression corrode le mécanisme et le filtre." },
    "r-alerte-7": { q: "Pendant l’appel aux secours, on te pose une question dont tu ignores la réponse. Tu…", c: ["inventes une réponse pour ne pas perdre de temps", "le dis, et tu vas vérifier si c’est possible", "raccroches et rappelleras quand tu sauras", "passes à la suite sans répondre"], a: 1, e: "Une information fausse peut tromper les secours : on dit qu’on ne sait pas et on vérifie si on peut." },
    "r-vict-6": { q: "Victime inconsciente qui ne respire pas normalement. Que fais-tu ?", c: ["La mettre en PLS et surveiller", "Alerter et commencer la RCP", "Lui donner de l’oxygène au masque", "Attendre l’avis du médecin au téléphone"], a: 1, e: "Inconsciente et ne respire pas (ou respire anormalement) : alerte et compressions sans attendre, DAE dès qu’il arrive." },
    "r-rcp-15": { q: "Chez l’adulte, à quel rythme fait-on les compressions thoraciques ?", c: ["60 à 80 par minute", "100 à 120 par minute", "140 à 160 par minute", "30 par minute"], a: 1, e: "Rythme recommandé : 100 à 120 compressions par minute, en enfonçant le thorax de 5 à 6 cm." },
    "r-cas-5": { q: "Au port, tu masses une victime qui ne respire pas. Le DAE arrive. Tu…", c: ["le mets en place tout de suite", "finis d’abord 10 minutes de massage", "attends l’avis du médecin au téléphone", "le poses quand elle a repris un pouls"], a: 0, e: "Le défibrillateur se pose dès qu’il arrive, sans interrompre le massage plus que nécessaire ; il guide ensuite les gestes." },
    "n3-tables-4": { q: "Dans une plongée successive, la majoration sert à…", c: ["allonger l’intervalle de surface", "tenir compte de l’azote restant de la 1ʳᵉ plongée", "réduire la profondeur de la 2ᵉ plongée", "compenser une remontée trop rapide"], a: 1, e: "L’azote résiduel de la 1ʳᵉ plongée est traduit en minutes ajoutées à la durée réelle de la 2ᵉ." },
    "n3-physio-8": { q: "Un plongeur essoufflé doit surtout…", c: ["inspirer plus fort pour avoir plus d’air", "expirer longuement pour chasser le CO₂", "accélérer pour rejoindre le mouillage", "retenir son souffle quelques secondes"], a: 1, e: "Respirer court ventile surtout l’espace mort : une expiration longue renouvelle l’air des alvéoles et fait baisser le CO₂." },
    "n4-air-10": { q: "Partage d’air à 30 m. Donneur : 15 L à 100 bar, réserve à garder 50 bar. À deux, 20 L/min chacun en surface. Autonomie avant la réserve ?", c: ["≈ 9 min", "≈ 5 min", "≈ 2 min", "≈ 19 min"], a: 1, e: "Air utilisable : 50 bar × 15 L = 750 L. Conso à 30 m (4 bar) : 2 × 20 × 4 = 160 L/min. 750 ÷ 160 ≈ 4,7 min." },
    "nx-base-9": { q: "Pourquoi le nitrox réduit-il l’azote absorbé ?", c: ["L’oxygène en plus chasse l’azote déjà dissous", "À profondeur égale, la Pp N₂ respirée est plus faible", "Le nitrox se dissout moins vite dans les tissus", "On respire moins souvent qu’avec de l’air"], a: 1, e: "Moins d’azote dans le mélange = pression partielle d’azote plus faible à la même profondeur, donc moins de saturation." },
    "r-role-6": { q: "Pourquoi « protéger » passe-t-il avant « examiner » ?", c: ["Pour éviter un sur-accident, à la victime comme aux sauveteurs", "Parce que l’examen demande du matériel qu’on va chercher", "Parce que le directeur de plongée l’impose par écrit", "Parce que la victime doit d’abord être mise au chaud"], a: 0, e: "Un sauveteur blessé ne sauve plus personne : on supprime d’abord le danger (bateau, houle, courant), puis on examine." },
    "n4-physio-13": { q: "Après la sortie, un plongeur de ta palanquée est très fatigué et a des fourmillements dans un bras. Tu…", c: ["lui conseilles une sieste et de bien boire", "le mets sous O₂ et préviens le DP", "attends le lendemain pour voir si ça passe", "le fais redescendre à 6 m pour recomprimer"], a: 1, e: "Fatigue anormale et fourmillements après plongée : signes possibles d’ADD. Oxygène, alerte, surveillance, jamais de recompression dans l’eau." }
  };
  const b0 = C.build;
  C.build = () => {
    const r = b0();
    Object.keys(CH).forEach(id => { const q = C.qById[id]; if (q && Array.isArray(q.c) && CH[id].length === q.c.length) q.c = CH[id].slice(); });
    Object.keys(RW).forEach(id => { const q = C.qById[id], w = RW[id]; if (q) { q.q = w.q; q.c = w.c.slice(); q.a = w.a; q.e = w.e; q.rw = 291; } });
    return r;
  };
  C.audit291 = { CH: Object.keys(CH), RW: Object.keys(RW) };
})();
