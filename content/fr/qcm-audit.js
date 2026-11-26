/* =====================================================================
   Abysse Academy 2.2.4 · audit des QCM
   Les mauvaises réponses deviennent de vraies erreurs d'élève : valeurs
   proches, règles voisines, confusions classiques, longueur comparable.
   On ne touche ni à l'énoncé, ni à l'ordre, ni à l'index de la bonne
   réponse : la progression reste attachée aux mêmes questions.
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content;
  const CH = {
"pression-7": [
"augmente",
"diminue",
"ne change pas",
"augmente car l’air y est plus froid"
],
"pression-9": [
"en eau douce",
"en mer",
"c’est identique",
"en eau douce froide, plus dense"
],
"pression-14": [
"Le rapport de pression y est le plus grand : les volumes varient le plus vite",
"La pression absolue y augmente plus vite qu’ailleurs",
"La pression y est la plus forte de toute la plongée",
"L’eau y est moins dense, on remonte donc plus vite"
],
"mariotte-4": [
"Le CO₂ s’accumule et déclenche un essoufflement",
"L’air des poumons se dilate et peut déchirer les alvéoles",
"L’azote dissous forme des bulles dans le sang",
"La pression dans les poumons chute et les écrase"
],
"mariotte-12": [
"L’eau froide resserre les bronches",
"Le détendeur délivre moins d’air au fond",
"L’azote dissous ralentit les muscles",
"L’air plus dense circule mal et le CO₂ s’accumule"
],
"mariotte-15": [
"Elle augmente",
"Elle baisse",
"Elle ne change pas",
"Elle baisse car l’air se dilate"
],
"archimede-0": [
"au poids de l’objet",
"au poids du volume de liquide déplacé",
"au poids du liquide au-dessus de l’objet",
"à la masse de l’objet multipliée par la densité"
],
"archimede-4": [
"te rend plus léger car l’eau te porte mieux",
"te rend plus lourd car elle s’écrase",
"ne change rien à ta flottabilité",
"te rend plus léger car elle se comprime"
],
"archimede-7": [
"gonfles ton gilet",
"vides ton gilet et expires",
"palmes tête en bas sans toucher au gilet",
"inspires à fond pour t’alourdir"
],
"archimede-9": [
"Il devient plus lourd en remontant",
"L’air se dilate, la poussée augmente",
"L’eau devient moins dense près de la surface",
"Le courant de surface l’aspire"
],
"archimede-11": [
"≈ 15 kg",
"≈ 1,5 kg",
"≈ 2,9 kg",
"≈ 0,3 kg"
],
"archimede-12": [
"Le néoprène s’écrase et perd du volume",
"L’eau est plus dense au fond",
"Le bloc s’alourdit en profondeur",
"L’air du gilet se dilate au fond"
],
"archimede-14": [
"Tu remontes légèrement : ton volume augmente",
"Tu descends : l’air inspiré t’alourdit",
"Rien ne change : l’air vient du bloc",
"Tu descends : la pression dans tes poumons augmente"
],
"archimede-15": [
"Pour ajuster finement sans partir vers la surface",
"Pour économiser l’air du bloc",
"Pour ne pas geler le direct system",
"Pour éviter un barotraumatisme du gilet"
],
"dalton-8": [
"uniquement de sa proportion",
"de la pression absolue et de sa proportion",
"uniquement de la profondeur",
"de la pression relative et de sa proportion"
],
"dalton-9": [
"l’oxygène sous pression",
"le CO₂ accumulé",
"l’azote sous pression",
"le froid et l’obscurité"
],
"physio-3": [
"Uniquement quand ça commence à faire mal",
"Dès le début de la descente, avant toute gêne",
"Tous les 5 m, à partir de 5 m de fond",
"Au fond, une fois bien stabilisé"
],
"physio-4": [
"Expirer normalement",
"Faire une manœuvre de Valsalva",
"Purger son gilet",
"Déglutir pour aider les oreilles"
],
"physio-5": [
"le cœur droit puis les poumons",
"le cœur gauche puis le corps",
"le cœur droit puis le corps",
"directement les artères du corps"
],
"physio-6": [
"protège des barotraumatismes d’oreille",
"peut laisser passer des bulles côté artériel",
"favorise la narcose en profondeur",
"augmente la consommation d’air"
],
"physio-7": [
"le plasma, dissous",
"l’hémoglobine des globules rouges",
"les globules blancs",
"la myoglobine du sang"
],
"physio-8": [
"Il provoque une narcose rapide",
"Il prend la place de l’O₂ sur l’hémoglobine",
"Il bloque l’élimination de l’azote",
"Il augmente l’envie de respirer"
],
"physio-9": [
"de l’audition et de l’équilibre",
"de l’équilibrage des pressions",
"de la transmission du son au tympan",
"de l’audition seulement"
],
"physio-10": [
"des cavités du crâne reliées à l’oreille moyenne",
"des cavités osseuses pleines d’air reliées au nez",
"des cavités pleines de liquide",
"des conduits reliant le nez à la gorge"
],
"accidents-1": [
"Il se repose, ça va passer",
"Il retourne faire un palier",
"Oxygène et alerte des secours",
"Eau, repos, et on voit dans une heure"
],
"accidents-2": [
"Le faire boire abondamment",
"L’oxygène à haut débit",
"L’allonger jambes surélevées",
"Le réchauffer avant tout"
],
"accidents-3": [
"remonter de quelques mètres",
"descendre pour se stabiliser",
"faire un Valsalva",
"ralentir sa respiration et continuer"
],
"accidents-4": [
"Tu remontes vite pour respirer en surface",
"Tu stoppes l’effort et tu expires longuement",
"Tu inspires à fond pour avoir plus d’air",
"Tu passes sur ton octopus"
],
"accidents-6": [
"serrer la sangle",
"souffler un peu par le nez dans le masque",
"faire un Valsalva plus fort",
"équilibrer plus souvent les oreilles"
],
"accidents-7": [
"la VHF canal 16 ou le 196 (CROSS)",
"le 17 (police), qui transmet aux secours",
"la VHF canal 72, celle des plaisanciers",
"le 18 (pompiers), même en pleine mer"
],
"accidents-9": [
"un coup de soleil",
"un ADD cutané",
"une allergie au néoprène",
"une piqûre de méduse"
],
"accidents-10": [
"c’est possible tout de suite",
"il faut attendre plusieurs heures",
"c’est interdit 7 jours",
"il suffit d’attendre 1 h"
],
"accidents-11": [
"est recommandé pour éliminer l’azote",
"est déconseillé",
"n’a aucun effet",
"est conseillé à faible profondeur"
],
"accidents-12": [
"d’un air de bloc pollué au gonflage",
"d’un détendeur mal entretenu",
"d’une respiration trop rapide",
"d’un effort intense au fond"
],
"accidents-13": [
"biophysique (bulles d’azote)",
"mécanique (variation de volume)",
"toxique (gaz sous pression)",
"biochimique (CO₂)"
],
"accidents-14": [
"passent avec une douche chaude",
"peuvent être un ADD : O₂, alerte, surveillance",
"sont dues au sel : on rince",
"sont une allergie : antihistaminique"
],
"deco-0": [
"6 m/min",
"10 m/min",
"15 à 17 m/min",
"20 à 25 m/min"
],
"deco-3": [
"jusqu’à la sortie de l’eau",
"du départ de la surface jusqu’au début de la remontée",
"du départ jusqu’à l’arrivée au premier palier",
"seulement le temps passé au fond"
],
"deco-4": [
"Deux plongées simples",
"Plongée successive avec majoration",
"Une seule plongée : profondeur maxi, durées additionnées",
"Deux plongées, paliers de la plus profonde doublés"
],
"deco-5": [
"s’ajoute à la durée réelle de la 2e plongée",
"s’ajoute à la profondeur de la 2e plongée",
"s’ajoute à la durée des paliers",
"s’ajoute à l’intervalle de surface"
],
"deco-8": [
"À équilibrer les oreilles avant la surface",
"À laisser l’azote s’éliminer sans former de bulles",
"À vider le CO₂ accumulé au fond",
"À laisser l’oxygène se dissoudre"
],
"deco-11": [
"suis la table : elle fait référence",
"fais le palier de l’ordinateur",
"remontes directement",
"fais la moyenne"
],
"deco-12": [
"Oui, sans changement",
"Non, il faut une méthode altitude",
"Oui, en ajoutant 3 min au palier",
"Oui, si on reste au-dessus de 20 m"
],
"deco-15": [
"20 m",
"31 m : la ligne de la table juste au-dessus",
"25 m, la profondeur la plus longue",
"28 m (moyenne)"
],
"deco-16": [
"Une plongée faite alors qu’il reste de l’azote de la précédente",
"Deux plongées séparées de moins de 15 minutes",
"Toute deuxième plongée faite dans la même journée",
"Une plongée qui suit une plongée avec paliers obligatoires"
],
"deco-17": [
"Il tient compte de l’azote restant de la plongée précédente",
"Il remet tout à zéro après 10 min en surface",
"Il ajoute une majoration fixe de 10 min",
"Il applique la table de la plongée la plus profonde"
],
"deco-18": [
"Une seule plongée (consécutive)",
"Une plongée successive avec majoration",
"Deux plongées indépendantes",
"Une plongée successive sans majoration"
],
"deco-19": [
"La pression baisse en cabine : risque de bulles",
"La pression monte en cabine et comprime l’azote",
"L’air de cabine est pauvre en oxygène",
"Le froid en altitude ralentit la désaturation"
],
"deco-20": [
"Une méthode adaptée : la pression en surface y est plus faible",
"Rien de spécial : seule la profondeur compte",
"Seulement moins de lest, car c’est de l’eau douce",
"Des paliers plus courts, car l’eau y est plus froide"
],
"materiel-0": [
"donne l’air directement à la pression ambiante",
"réduit la haute pression du bloc à une moyenne pression",
"sert de manomètre pour lire la pression du bloc",
"réduit la pression du bloc à 1 bar pour le 2e étage"
],
"materiel-2": [
"Tu continues en respirant au coin de l’embout",
"Tu passes sur l’autre source d’air et tu remontes",
"Tu tapes le 2e étage pour le débloquer",
"Tu purges le 2e étage jusqu’à ce que ça cesse"
],
"materiel-3": [
"Pour que le bloc soit prêt pour la prochaine plongée",
"Pour éviter que l’humidité entre et corrode le bloc",
"Pour que le robinet reste étanche plus longtemps",
"Pour éviter qu’il s’écrase sous la pression de l’eau"
],
"materiel-4": [
"À l’eau de mer, juste après la plongée",
"À l’eau douce, capuchon sec en place",
"À l’eau douce, en appuyant sur le bouton de purge",
"À l’eau douce chaude savonneuse"
],
"materiel-5": [
"servir de second manomètre si le premier tombe en panne",
"donner de l’air à un autre plongeur ou avoir une source de secours",
"gonfler le parachute de palier en priorité",
"alimenter le direct system si son tuyau casse"
],
"materiel-6": [
"haute pression du 1er étage",
"moyenne pression du 1er étage",
"du 2e étage",
"du direct system"
],
"materiel-8": [
"se visse dans le robinet",
"est réservé au Nitrox",
"supporte moins de pression",
"se fixe par une vis de serrage"
],
"materiel-9": [
"remonter plus vite en cas de panne d’air",
"signaler la palanquée en surface pendant les paliers",
"remplacer le gilet en cas de panne",
"stabiliser la descente"
],
"materiel-12": [
"devenir flottant",
"devenir plus lourd",
"rester neutre",
"couler davantage qu’un bloc acier"
],
"materiel-13": [
"Je le rince à l’eau douce, capuchon en place",
"Je le rince à l’eau douce, capuchon retiré",
"Je le laisse sécher au soleil avant rinçage",
"Je le démonte pour le sécher"
],
"materiel-14": [
"Pression au mano, air qui passe, gilet qui gonfle et purge",
"Pression au manomètre seulement",
"Robinet ouvert puis refermé d’un quart de tour",
"Respiration sur le détendeur, sans regarder le mano"
],
"materiel-15": [
"Calé, à l’abri du soleil et de la chaleur",
"Debout, robinet ouvert pour qu’il respire",
"Couché au soleil pour sécher",
"Vide, pour ne pas fatiguer le métal"
],
"regles-5": [
"bateau en panne, ne pas approcher",
"plongeurs immergés : s’écarter, ralentir",
"zone de baignade réservée aux nageurs",
"homme à la mer, venir en aide"
],
"regles-7": [
"choisit seule ses paramètres",
"reçoit ses paramètres du DP",
"les fixe avec le pilote du bateau",
"prend ceux de son ordinateur"
],
"regles-9": [
"une assurance responsabilité civile",
"une assurance individuelle accident obligatoire",
"le prêt de matériel",
"un certificat médical"
],
"regles-12": [
"le règlement de la FFESSM seulement",
"le règlement intérieur du port",
"le Code du sport",
"le Code de l’environnement"
],
"regles-13": [
"De l’oxygène, une trousse de secours et un moyen d’alerter",
"Seulement une trousse de secours complète",
"Un défibrillateur et une couverture de survie",
"De l’oxygène seul, avec son masque adapté"
],
"pa20-2": [
"de celui qui a le plus d’air",
"de celui qui a le moins d’air",
"de la moyenne des pressions",
"du plus expérimenté"
],
"pa20-3": [
"Remonter tout de suite à 15 m/min vers la surface",
"Chercher autour de toi environ 1 min (bulles, lumière)",
"Descendre de quelques mètres pour mieux le voir",
"Attendre sur place jusqu’à la mi-pression"
],
"pa20-4": [
"Tu continues seul le parcours prévu, lentement",
"Tu remontes normalement avec tes paliers et le retrouves en surface",
"Tu restes sur place jusqu’à ta pression de réserve",
"Tu remontes vite, sans palier, pour prévenir le bateau"
],
"pa20-5": [
"seulement ton matériel",
"ton matériel et celui de tes binômes",
"le matériel du plus débutant",
"seulement les blocs de chacun"
],
"pa20-6": [
"Pour savoir quand passer sur la réserve",
"Pour décider du demi-tour avec assez d’air pour revenir",
"Pour savoir à quel moment commencer les paliers",
"Pour que le DP puisse le noter sur la fiche"
],
"pa20-7": [
"range son matériel puis part",
"rend compte au DP de ses paramètres et incidents",
"note ses paramètres sur son carnet seulement",
"attend que le DP vienne la voir"
],
"pa20-8": [
"Une narcose ou un début d’essoufflement",
"Un accident de décompression en cours de plongée",
"Une hypoglycémie liée à l’effort",
"Un problème de lest mal réparti"
],
"pa20-9": [
"Tu restes 15 min de plus",
"Tu respectes les 40 min du DP",
"Tu restes 5 min de plus par sécurité",
"Tu restes si tout le monde a de l’air"
],
"pa20-11": [
"dans le sens du vent",
"contre le courant",
"avec le courant",
"en travers, toujours"
],
"pa20-12": [
"verticale devant le masque",
"sur le côté, bras tendu",
"posée sur le gilet, inclinée",
"à plat, alignée avec l’axe du corps"
],
"pa20-13": [
"Tour d’horizon, recherche brève (1 min), puis je remonte",
"Je continue la plongée prévue, il me retrouvera",
"Je remonte immédiatement sans chercher",
"J’attends sur place jusqu’à la réserve"
],
"pa20-14": [
"Avec un cap au compas et des repères sur le fond",
"En suivant le sens du courant jusqu’au bateau",
"En suivant les bulles des autres palanquées",
"En remontant regarder où est le bateau"
],
"environnement-1": [
"De la glace pour calmer la douleur, puis repos",
"Eau très chaude sans se brûler, puis consulter",
"Du vinaigre sur la piqûre, puis frotter au sable",
"Un garrot au-dessus de la piqûre, puis consulter"
],
"environnement-4": [
"d’où il vient exactement",
"qu’il est là, mais pas sa direction",
"à quelle distance il se trouve",
"s’il est au-dessus ou en dessous"
],
"environnement-5": [
"un courant de fond froid",
"une couche où la température chute brusquement",
"une zone où l’eau douce rencontre la mer",
"une remontée d’eau profonde"
],
"environnement-6": [
"Se tenir aux rochers pour se stabiliser",
"Maîtriser sa flottabilité et son palmage",
"Nager en restant tout près du fond",
"Porter des gants pour ne rien abîmer"
],
"environnement-7": [
"Ça attire les requins",
"Ça modifie leur comportement et leur alimentation",
"C’est interdit seulement dans les réserves",
"Ils risquent de mordre les plongeurs"
],
"environnement-9": [
"jette l’ancre dans l’herbier, c’est solide",
"utilise une bouée d’amarrage",
"ancre au milieu de l’herbier peu profond",
"ancre sur la roche la plus proche"
],
"environnement-10": [
"rouge vif",
"verdâtre ou sombre",
"bleu",
"orange"
],
"environnement-14": [
"Pour ne pas abîmer la vie fixée avec ses palmes",
"Pour éviter la narcose près du fond",
"Pour mieux équilibrer ses oreilles",
"Pour rester bien visible depuis le bateau"
],
"environnement-15": [
"Non : ça modifie leur comportement",
"Oui, avec du pain",
"Oui, si le guide le fait",
"Oui, avec leur nourriture naturelle (oursins)"
],
"d-bapteme-0": [
"Toi, avec ton gilet",
"Le moniteur à côté de toi",
"Ton ordinateur de plongée",
"Le moniteur, depuis la surface"
],
"d-bapteme-1": [
"Respirer lentement pour économiser l’air",
"Ne jamais bloquer sa respiration",
"Toujours inspirer par la bouche",
"Faire une pause après chaque inspiration"
],
"d-bapteme-2": [
"Tu inspires plus fort pour avoir plus d’air",
"Tu expires longuement et tu le signales",
"Tu remontes d’un mètre sans rien dire",
"Tu palmes pour te réchauffer"
],
"d-bapteme-3": [
"Environ 6 m au maximum",
"Environ 12 m",
"Environ 20 m",
"Environ 2 m, pas plus"
],
"d-bapteme-4": [
"À vérifier que la bouteille est pleine",
"À apprendre les signes et poser ses questions",
"À choisir la profondeur du baptême",
"À signer la décharge du club"
],
"d-bapteme-5": [
"diminue",
"gonfle",
"ne change pas",
"se comprime"
],
"d-bapteme-6": [
"Attendre la fin pour en parler",
"Faire un signe au moniteur",
"Remonter doucement tout seul",
"Retenir son souffle le temps que ça passe"
],
"d-bapteme-7": [
"On respire dans le détendeur, tête dans l’eau",
"On vide complètement son gilet d’un coup",
"On inspire à fond et on bloque son souffle",
"On enlève le masque pour bien le rincer"
],
"d-bapteme-8": [
"respirer très lentement et peu",
"respirer normalement",
"inspirer à fond à chaque fois",
"souffler fort à chaque mètre"
],
"d-materiel-0": [
"De l’oxygène pur",
"De l’air comprimé",
"De l’air enrichi en oxygène",
"De l’azote et de l’hélium"
],
"d-materiel-1": [
"Pour que le masque tienne mieux",
"Pour pouvoir souffler dedans et l’équilibrer",
"Pour respirer par le nez en secours",
"Pour éviter la buée sur la vitre"
],
"d-materiel-2": [
"À gonfler le gilet",
"À te donner l’air à la bonne pression",
"À stocker l’air sous haute pression",
"À indiquer l’air restant"
],
"d-materiel-3": [
"L’eau refroidit bien plus vite que l’air",
"Pour mieux flotter en surface",
"Pour se protéger du soleil",
"Pour glisser plus vite dans l’eau"
],
"d-materiel-4": [
"gonfle un peu le gilet",
"vide le gilet",
"inspire à fond",
"palme vers le bas, gilet gonflé"
],
"d-materiel-5": [
"Le serrer fort : s’il ne fuit pas, c’est bon",
"Sans sangle, inspirer par le nez : il tient",
"L’essayer directement sous l’eau",
"Vérifier la taille écrite dessus"
],
"d-materiel-6": [
"À descendre plus vite",
"À compenser la flottabilité de la combinaison",
"À rester bien droit dans l’eau",
"À compenser le poids de la bouteille"
],
"d-materiel-7": [
"20 bar",
"100 bar",
"200 bar",
"500 bar"
],
"d-oreilles-0": [
"Dès qu’on sent une petite gêne",
"Tôt et souvent, dès le début de la descente",
"Tous les 5 mètres, régulièrement",
"Une fois arrivé au fond, stabilisé"
],
"d-oreilles-1": [
"Tu souffles plus fort",
"Tu remontes un peu et tu réessaies doucement",
"Tu continues : ça finit par passer",
"Tu avales plusieurs fois en descendant"
],
"d-oreilles-2": [
"Pincer le nez et souffler doucement",
"Souffler par la bouche dans le détendeur",
"Inspirer fort par le nez",
"Pincer le nez et souffler très fort"
],
"d-oreilles-3": [
"La sangle est trop serrée sur la tête",
"L’air dedans se comprime : souffle par le nez",
"L’eau entre par le bas de la jupe",
"La jupe du masque durcit avec le froid"
],
"d-oreilles-4": [
"Inspirer profondément",
"Une longue expiration",
"Respirer plus vite mais moins fort",
"Bloquer quelques secondes"
],
"d-oreilles-5": [
"À la poitrine",
"Aux oreilles",
"Au masque",
"Aux mains"
],
"n1-signes-0": [
"ça va",
"on remonte",
"bravo, réussi",
"j’ai compris"
],
"n1-signes-1": [
"Pouce levé",
"Le même signe « ça va »",
"Un hochement de tête",
"Main à plat qui ne bouge pas"
],
"n1-signes-2": [
"« Ça ne va pas » seulement",
"« Ça ne va pas » puis tu montres l’oreille",
"Tu montres l’oreille seulement",
"« On remonte »"
],
"n1-signes-3": [
"Je suis essoufflé",
"Je n’ai plus d’air",
"Je suis sur la réserve",
"On arrête l’exercice"
],
"n1-signes-4": [
"Il demande qu’on vienne, sans urgence",
"Détresse, il faut venir l’aider",
"Il signale qu’il est prêt à remonter à bord",
"Il indique où est sa palanquée"
],
"n1-signes-5": [
"Vite, pour ne pas gêner",
"Devant son masque, puis attendre la réponse",
"De loin, en grand, pour tout le groupe",
"Après avoir tapé sur sa bouteille, sans attendre"
],
"n1-signes-6": [
"Poing fermé qui s’ouvre et se ferme",
"Main en tranchant sur la gorge",
"Pouce vers le bas",
"Main à plat qui oscille"
],
"n1-signes-7": [
"« Stop, on reste à cette profondeur »",
"« Doucement, on descend lentement »",
"« Ça ne va pas, je ne sais pas quoi »",
"« On remonte un peu, puis on s’arrête »"
],
"n1-physique-0": [
"1 bar",
"2 bar",
"3 bar",
"1,5 bar"
],
"n1-physique-1": [
"1 L",
"1,5 L",
"2 L",
"0,5 L"
],
"n1-physique-2": [
"Pour ne pas couler au palier",
"L’air se dilate : tu accélérerais",
"L’air se comprime en remontant",
"Pour ne pas être surgonflé en surface"
],
"n1-physique-3": [
"Entre 0 et 10 m",
"Entre 10 et 20 m",
"Entre 20 et 30 m",
"Au-delà de 30 m"
],
"n1-physique-4": [
"la même",
"2 fois plus forte",
"3 fois plus forte",
"20 fois plus forte"
],
"n1-physique-5": [
"L’azote s’accumule dans le sang",
"L’air des poumons se dilate et les abîme",
"On manque vite d’oxygène",
"Ça provoque un essoufflement"
],
"n1-physique-6": [
"0,5 L",
"1 L",
"2 L",
"3 L"
],
"n1-physique-7": [
"plus comprimé qu’en surface",
"moins comprimé",
"au même état qu’en surface",
"plus riche en oxygène"
],
"n1-physique-8": [
"Près de la surface",
"Vers 20 m",
"Vers 40 m",
"Partout pareil"
],
"n1-accidents-0": [
"Tu palmes plus fort vers le guide",
"Tu arrêtes l’effort et tu expires longuement",
"Tu inspires à fond plusieurs fois",
"Tu remontes seul de quelques mètres"
],
"n1-accidents-1": [
"possible avec un spray décongestionnant avant",
"déconseillé : sinus et oreilles risquent d’avoir mal",
"possible si on reste à moins de 6 m de fond",
"possible si on équilibre plus fort et plus souvent"
],
"n1-accidents-2": [
"Souffler un peu par le nez dans le masque",
"Desserrer un peu la sangle du masque",
"Remonter d’un mètre et attendre",
"Faire une manœuvre de Valsalva"
],
"n1-accidents-3": [
"L’accident de décompression",
"La surpression pulmonaire",
"L’essoufflement",
"Le barotraumatisme d’oreille"
],
"n1-accidents-4": [
"Tu palmes plus pour te réchauffer",
"Tu le signales au guide",
"Tu attends la fin de la plongée",
"Tu remontes seul au palier"
],
"n1-accidents-5": [
"Il s’auto-entretient et mène à la panique",
"Il provoque un accident de décompression",
"Il refroidit le corps",
"Il vide le bloc en quelques secondes"
],
"n1-accidents-6": [
"continues en équilibrant plus fort",
"remontes d’un mètre et réessaies doucement",
"descends vite pour passer le cap",
"attends sans bouger que ça passe"
],
"n1-accidents-7": [
"un essoufflement",
"une narcose",
"un accident de décompression",
"une surpression pulmonaire"
],
"n1-secu-0": [
"en autonomie jusqu’à 12 m",
"encadré, jusqu’à 20 m",
"en autonomie jusqu’à 20 m",
"encadré, jusqu’à 40 m"
],
"n1-secu-1": [
"Tu remontes seul en expirant tout du long",
"Signe « plus d’air », puis l’octopus d’un équipier",
"Tu respires l’air de ton gilet en remontant",
"Tu remontes doucement en gardant le palier"
],
"n1-secu-2": [
"Regarder souvent son mano et annoncer sa pression",
"Respirer le plus lentement possible",
"Regarder le mano au début et à la fin",
"Toujours partir avec un plus gros bloc"
],
"n1-secu-3": [
"Très lente, environ 3 m/min",
"Lente, environ 10 à 15 m/min",
"Environ 20 à 25 m/min",
"Environ 30 m/min"
],
"n1-secu-4": [
"se comprime : il faut en rajouter",
"se dilate : il faut le purger",
"ne change pas",
"se dilate : il faut en rajouter"
],
"n1-secu-5": [
"Le bateau qui emmène les plongeurs",
"Le groupe qui plonge ensemble avec son guide",
"La liste des plongeurs inscrits du jour",
"Le binôme formé avec ton équipier"
],
"n1-secu-6": [
"Continuer vers le point de demi-tour",
"Chercher 1 min, puis remonter et attendre",
"Attendre au fond sans bouger",
"Remonter tout de suite sans chercher"
],
"n1-secu-7": [
"vers 3 à 5 m, quelques minutes",
"vers 6 m, une minute",
"à 10 m, 3 minutes",
"en surface, avant de sortir"
],
"n1-secu-8": [
"Remonter seul en expirant",
"Faire le signe « plus d’air » au guide",
"Respirer plus lentement pour tenir",
"Lâcher ton lest"
],
"n1-milieu-0": [
"une algue",
"une plante à fleurs",
"un corail mou",
"une éponge"
],
"n1-milieu-1": [
"Oui, elle n’est pas dangereuse",
"Non, ses épines sont venimeuses",
"Oui, si on la touche doucement",
"Non, elle mord"
],
"n1-milieu-2": [
"Pour ne pas abîmer le fond avec les palmes",
"Pour garder le contact avec le guide",
"Pour mieux voir les poissons",
"Pour éviter de couler"
],
"n1-milieu-3": [
"sans effet si c’est seulement du pain",
"déconseillé : ça perturbe leur comportement",
"conseillé pour mieux les observer de près",
"autorisé partout en dehors des réserves"
],
"n1-milieu-4": [
"protégé",
"pêchable hors saison",
"dangereux pour le plongeur",
"pêchable au harpon"
],
"n1-milieu-5": [
"Le suivre pour mieux l’observer",
"L’observer calmement sans le gêner",
"Le toucher doucement",
"S’approcher vite avant qu’il parte"
],
"r-role-0": [
"Réactions et Intervention Face à un Accident de Plongée",
"Réanimation et Intervention Fédérale en Accident de Plongée",
"Remontée, Intervention et Formation à l’Assistance en Plongée",
"Règles d’Intervention Face aux Accidents de Plongée"
],
"r-role-1": [
"uniquement les gestes dans l’eau",
"l’eau et la prise en charge jusqu’aux secours",
"uniquement les gestes hors de l’eau",
"l’alerte et l’oxygène seulement"
],
"r-role-2": [
"L’aspirine",
"L’oxygène",
"L’eau plate",
"Le sérum physiologique"
],
"r-role-3": [
"Alerter, protéger, examiner, secourir, surveiller",
"Protéger, examiner, alerter, secourir, surveiller",
"Examiner, protéger, alerter, secourir, surveiller",
"Protéger, alerter, secourir, examiner, surveiller"
],
"r-role-4": [
"Il donne le droit de diriger une plongée",
"Un enseignant doit savoir secourir ses élèves",
"Il remplace le diplôme de secourisme",
"Il autorise seul l’usage de l’oxygène"
],
"r-role-5": [
"vérifies que tu ne te mets pas en danger et alertes",
"plonges le chercher sans rien dire",
"attends qu’il reprenne ses esprits",
"l’examines d’abord, l’alerte viendra après"
],
"r-role-6": [
"Alerter, protéger, secourir, examiner",
"Protéger, examiner, alerter, secourir",
"Examiner, alerter, protéger, secourir",
"Protéger, alerter, examiner, secourir"
],
"r-role-7": [
"jusqu’à l’arrivée des secours",
"jusqu’à l’arrivée au port",
"seulement dans l’eau",
"jusqu’au caisson hyperbare"
],
"r-alerte-0": [
"le 18 (pompiers)",
"le CROSS : VHF 16 ou 196",
"le 17 (police)",
"le club, qui préviendra"
],
"r-alerte-1": [
"Toi, une fois le message passé",
"Le secours, quand il te le dit",
"Le premier qui a fini de parler",
"Toi, pour libérer la ligne"
],
"r-alerte-2": [
"Le lieu et le nombre de victimes seulement",
"Qui, où, quoi, état de la victime, gestes faits",
"Ton nom et ton numéro seulement",
"L’état de la victime seulement"
],
"r-alerte-3": [
"les paramètres de plongée et l’heure des signes",
"le niveau et la licence du plongeur seulement",
"le nom du club et du DP seulement",
"le diagnostic de l’accident"
],
"r-alerte-4": [
"le 15 ou le 112",
"le 196",
"le 17",
"le CROSS en VHF 16"
],
"r-alerte-5": [
"où sont l’O₂, la trousse, la radio et les numéros",
"seulement le numéro du CROSS, c’est le principal",
"la profondeur maxi du site et le courant",
"le nom du DP, il gère tout le reste"
],
"r-alerte-6": [
"les paramètres de la plongée",
"le niveau de plongée de la victime",
"le numéro de licence",
"le nom du moniteur"
],
"r-alerte-7": [
"L’appelant",
"Les secours",
"Le premier qui a tout dit",
"Celui qui a le plus d’informations"
],
"r-o2-0": [
"Seulement si on est sûr de l’ADD",
"Dès le moindre signe suspect",
"Seulement si la victime le demande",
"Après avis du médecin par téléphone"
],
"r-o2-1": [
"Masque à haute concentration, débit élevé",
"Lunettes à oxygène, débit de 2 L/min",
"Masque simple sans réserve, 6 L/min",
"Insufflateur manuel (BAVU) relié à l’O₂"
],
"r-o2-3": [
"Oui, avec une graisse silicone",
"Non, risque d’incendie",
"Oui, si le raccord fuit",
"Seulement le joint torique"
],
"r-o2-4": [
"on surveille et on note l’évolution",
"on retire l’O₂ dès que ça va mieux",
"on fait boire beaucoup d’eau d’un coup",
"on la laisse dormir sans la déranger"
],
"r-o2-7": [
"gonfle le ballon réserve",
"règle le débit à 2 L/min",
"vide le ballon réserve",
"ouvre le robinet à moitié"
],
"r-o2-8": [
"Pour les secours et le médecin",
"Pour calculer la quantité facturée",
"Pour savoir quand l’arrêter",
"Pour la fiche de sécurité seulement"
],
"r-vict-0": [
"Assise, adossée",
"Position latérale de sécurité",
"Sur le dos, jambes surélevées",
"Sur le dos, tête en arrière"
],
"r-vict-1": [
"PLS sous oxygène et surveillance",
"Alerte, RCP et défibrillateur au plus vite",
"Oxygène au masque et attente des secours",
"Insufflations seules jusqu’aux secours"
],
"r-vict-2": [
"3 secondes",
"10 secondes",
"30 secondes",
"1 minute"
],
"r-vict-3": [
"un problème cardiaque",
"le manque d’oxygène",
"le froid",
"l’eau dans l’estomac"
],
"r-vict-4": [
"Avec une appli sur son téléphone",
"Sur mannequin avec un formateur",
"Dans le manuel RIFAP, chapitre par chapitre",
"En regardant une vidéo de démonstration"
],
"r-vict-5": [
"lui donnes de l’O₂, alertes et la surveilles",
"lui dis de se reposer et de voir demain",
"lui donnes un antidouleur",
"lui masses l’articulation"
],
"r-vict-6": [
"Assise",
"Latérale de sécurité (PLS)",
"Sur le dos",
"Sur le dos, jambes surélevées"
],
"r-vict-7": [
"3 secondes",
"10 secondes environ",
"30 secondes",
"1 minute"
],
"r-vict-8": [
"la met en PLS sous oxygène",
"alerte et commence la réanimation",
"lui donne de l’oxygène au masque",
"fait 2 insufflations puis attend"
],
"environnement-0": [
"une algue",
"une plante à fleurs",
"un corail",
"une éponge"
],
"r-cas-0": [
"Un antidouleur et du repos",
"Penser ADD : oxygène et alerte",
"Un massage et de la chaleur",
"Attendre 2 h pour voir"
],
"r-cas-1": [
"plonge s’il reste peu profond",
"ne plonge pas",
"plonge s’il a pris un médicament",
"plonge avec un guide"
],
"r-cas-2": [
"le met en PLS sous oxygène et alerte",
"l’assoit et lui donne de l’O₂",
"le met sur le dos sous oxygène",
"commence un massage cardiaque"
],
"r-cas-3": [
"Elle aide les médecins à décider du traitement",
"Pour le carnet de plongée de la victime",
"Pour l’assurance du club seulement",
"Pour calculer la désaturation restante"
],
"r-cas-4": [
"de l’eau plate, si elle n’a pas de troubles",
"de l’eau sucrée en grande quantité",
"un café pour la réveiller",
"rien du tout, jamais"
],
"r-cas-5": [
"dès qu’il arrive, si la victime ne respire pas",
"après 10 min de massage seulement",
"seulement sur une peau sèche à l’hôpital",
"sur toute victime inconsciente"
],
"e2-role-0": [
"un guide de palanquée",
"un premier niveau d’enseignant",
"un assistant du directeur de plongée",
"un plongeur autonome confirmé"
],
"e2-role-1": [
"0 à 6 m",
"0 à 12 m",
"0 à 20 m",
"0 à 3 m"
],
"e2-role-2": [
"N3",
"Guide de palanquée (N4)",
"Moniteur fédéral 1ᵉʳ degré",
"N2 depuis un an"
],
"e2-role-3": [
"Aucun s’il a un ordinateur",
"Il copiera ce comportement",
"Il se sentira moins surveillé",
"Il perdra confiance en lui"
],
"e2-role-4": [
"valides : l’essentiel de l’exercice est acquis",
"le félicites pour le reste et fais refaire avec la purge",
"fais refaire tout l’exercice sans rien lui dire",
"notes l’oubli pour en parler à la séance suivante"
],
"e2-role-5": [
"on finit vite l’exercice",
"la sécurité passe d’abord",
"on demande l’avis de l’élève",
"on termine puis on fait le point"
],
"e2-role-6": [
"d’un moniteur",
"du directeur de plongée seulement",
"du président du club",
"d’un guide de palanquée"
],
"e2-peda-0": [
"Comprendre le vidage de masque",
"Vider son masque à 3 m sans remonter",
"Savoir vider son masque",
"Être à l’aise avec le masque"
],
"e2-peda-1": [
"rapide, pour garder l’attention",
"lente, décomposée, bien visible",
"commentée sous l’eau par gestes",
"faite une seule fois, en entier"
],
"e2-peda-2": [
"Tous, pour gagner du temps",
"Un seul",
"Trois",
"Deux : le plus grave et le plus facile"
],
"e2-peda-3": [
"Du milieu naturel vers la piscine, pour le réalisme",
"Du complexe au simple, pour motiver",
"Du simple au complexe, du statique au dynamique",
"Du dynamique au statique, pour mettre en confiance"
],
"e2-peda-4": [
"Montrer, expliquer, faire faire, corriger",
"Expliquer, montrer, faire faire, corriger",
"Faire faire, expliquer, montrer, corriger",
"Expliquer, faire faire, montrer, corriger"
],
"e2-peda-5": [
"ce qui ne va pas",
"ce qui était réussi",
"la note obtenue",
"le prochain exercice"
],
"e2-peda-6": [
"vite, en entier, comme en vrai",
"lentement, en entier, puis décomposé",
"décomposé seulement",
"une seule fois pour ne pas lasser"
],
"e2-seance-0": [
"Profondeur et durée seulement",
"Objectif, déroulement, signes, sécurité, incidents",
"Objectif et signes seulement",
"Le déroulement, l’objectif se découvre sous l’eau"
],
"e2-seance-1": [
"se tenir à distance pour laisser faire",
"garder le contact visuel et rester à portée",
"rester derrière l’élève hors de sa vue",
"nager devant pour montrer le chemin"
],
"e2-seance-2": [
"donner la liste des erreurs à corriger",
"faire parler l’élève sur son ressenti",
"donner la note de la séance du jour",
"annoncer ce qu’on fera la prochaine fois"
],
"e2-seance-3": [
"insistes jusqu’à la réussite",
"écourtes et reprends une autre fois",
"changes d’exercice sans remonter",
"lui fais faire plus d’efforts pour se réchauffer"
],
"e2-seance-4": [
"ne noter que les échecs",
"noter acquis et suite de la progression",
"noter seulement la profondeur atteinte",
"attendre la fin du stage pour noter"
],
"e2-seance-5": [
"identique pour tout le groupe",
"adapté au niveau de l’élève",
"un peu au-dessus de son niveau",
"fixé par l’élève lui-même"
],
"e2-seance-6": [
"le public et l’objectif",
"le matériel à prévoir",
"la durée de la séance",
"le lieu et l’heure"
],
"e2-secu-0": [
"L’essentiel, le moins possible",
"Toutes celles du N1, pour être complet",
"Aucune, on explique sous l’eau",
"Les signes et les règles de décompression"
],
"e2-secu-1": [
"Le baptisé, guidé par signes",
"L’encadrant",
"Le baptisé pour la profondeur, toi pour le gilet",
"Le directeur de plongée depuis la surface"
],
"e2-secu-2": [
"Respiration lente, gestes calmes et posés",
"Yeux écarquillés, respiration rapide, gestes saccadés",
"Il fait OK très souvent, sans qu’on lui demande",
"Il reste immobile près du fond, calme et stable"
],
"e2-secu-3": [
"le laisses remonter en surveillant",
"le tiens et contrôles une remontée lente en expirant",
"le maintiens au fond jusqu’à ce qu’il se calme",
"remontes seul chercher de l’aide"
],
"e2-secu-4": [
"L’eau y est plus agitée par la houle",
"Les variations de volume y sont les plus fortes",
"La narcose peut déjà y commencer",
"Les paliers de décompression s’y font"
],
"e2-secu-5": [
"Descendre un peu pour la faire passer",
"Remonter un peu et équilibrer doucement",
"Faire un Valsalva plus fort",
"Continuer : ça passe souvent seul"
],
"e2-secu-6": [
"le laisses monter seul en le surveillant d’en bas",
"remontes lentement avec lui en contrôlant son expiration",
"le tiens au fond jusqu’à ce qu’il se calme",
"lui donnes ton octopus et restes avec lui au fond"
],
"e2-com-0": [
"ne rien faire si tout va bien",
"répondre OK (ou un signe de problème)",
"remonter vers toi",
"faire le signe « on remonte »"
],
"e2-com-1": [
"Ne bloque pas ta respiration",
"Expire en remontant",
"Évite de retenir ton air",
"Ne retiens jamais ton souffle"
],
"e2-com-2": [
"demander « C’est compris ? »",
"faire reformuler l’élève",
"répéter la consigne deux fois",
"demander s’il a des questions"
],
"e2-com-3": [
"Chercher la cause",
"Le refaire faire jusqu’à réussite",
"Montrer de nouveau le geste",
"Passer à l’exercice suivant"
],
"e2-com-4": [
"à côté de lui, du même côté",
"face à lui, à sa hauteur",
"au-dessus de lui",
"un peu en retrait pour voir tout le geste"
],
"e2-com-5": [
"reviens à la dernière étape réussie, par petits pas",
"refais la démonstration et insistes sur l’erreur",
"passes à un autre exercice pour changer d’air",
"allonges la séance jusqu’à ce qu’il y arrive"
],
"e2-com-6": [
"le fais recommencer encore",
"proposes une étape plus petite",
"refais une explication complète",
"passes à l’exercice suivant"
],
"n3-gaz-1": [
"seulement en surface",
"en remontant de quelques mètres",
"après plusieurs minutes au même niveau",
"au palier seulement"
],
"n3-gaz-2": [
"La chaleur et une eau très claire",
"Le froid, l’effort, le stress, le CO₂",
"Une descente lente et contrôlée",
"Un mélange un peu plus riche en O₂"
],
"n3-gaz-4": [
"La narcose, plus forte et plus rapide",
"Des convulsions (toxicité neurologique)",
"Un essoufflement difficile à arrêter",
"Un accident de décompression"
],
"n3-gaz-5": [
"Il augmente le CO₂ : narcose et essoufflement",
"Il augmente la Pp O₂ dans les tissus",
"Il fait absorber moins d’azote",
"Il fait refroidir le corps plus vite"
],
"n3-gaz-7": [
"Relire trois fois son mano sans comprendre",
"Avoir très froid aux mains et aux pieds",
"Une gêne aux oreilles qui ne passe pas",
"Une douleur aux articulations en profondeur"
],
"n3-gaz-8": [
"Tu lui fais signe de se calmer et continues",
"Tu lui fais signe et vous remontez de quelques mètres",
"Tu remontes avec lui directement en surface",
"Tu lui donnes ton octopus"
],
"n3-gaz-10": [
"la toxicité neurologique de l’oxygène",
"la toxicité pulmonaire de l’oxygène",
"la narcose",
"l’essoufflement"
],
"n3-gaz-11": [
"L’azote sous pression perturbe les nerfs",
"L’oxygène sous pression excite le cerveau",
"Le CO₂ s’accumule dans le sang",
"Le cerveau manque d’oxygène"
],
"n3-gaz-12": [
"impossible : le seuil de narcose est fixe",
"normal : elle varie selon forme, froid, stress",
"un problème de détendeur à faire réviser",
"un signe d’accident de décompression"
],
"n3-gaz-13": [
"la pression absolue",
"la pression relative",
"le pourcentage d’azote",
"la profondeur en mètres"
],
"n3-deco-0": [
"L’azote encore dissous après une plongée",
"L’azote restant dans le bloc",
"L’azote éliminé au palier",
"L’azote fixé définitivement dans les graisses"
],
"n3-deco-3": [
"une lettre de groupe",
"une majoration",
"un temps de palier",
"un coefficient d’azote"
],
"n3-deco-4": [
"Pour planifier et réagir en cas de panne",
"Parce que la table est plus précise",
"Parce que l’ordinateur ne gère pas les successives",
"Parce que la table est obligatoire sous l’eau"
],
"n3-deco-6": [
"la durée maxi sans palier obligatoire",
"la profondeur maxi sans palier",
"la vitesse de remontée maxi",
"le temps de palier minimum"
],
"n3-deco-7": [
"Par les poumons, à l’expiration",
"Par les reins, dans l’urine",
"Par la peau, en surface",
"Par le sang, vers le foie"
],
"n3-deco-8": [
"se déchargent aussi lentement",
"se déchargent plus vite",
"ne saturent jamais",
"fixent l’azote définitivement"
],
"n3-deco-9": [
"sa période",
"son volume",
"sa profondeur maximale",
"sa vascularisation seule"
],
"n3-deco-10": [
"Il calcule le profil réel, pas le maxi",
"Il est moins prudent par défaut",
"Il ignore les paliers de sécurité",
"Il utilise moins de compartiments"
],
"n3-deco-11": [
"la remontée et les paliers, avec une marge",
"le temps au fond prévu, sans marge",
"la remontée seule, les paliers sont courts",
"les paliers seulement, avec une marge"
],
"n3-autonomie-0": [
"×5",
"×6",
"×4",
"×3"
],
"n3-autonomie-1": [
"Le plus expérimenté de la palanquée",
"Le directeur de plongée",
"Les membres de la palanquée ensemble",
"Le pilote du bateau"
],
"n3-autonomie-3": [
"au fond, selon la conso réelle",
"avant la plongée",
"à la moitié du temps prévu",
"quand le premier atteint 100 bar"
],
"n3-autonomie-4": [
"La conso est forte et les imprévus coûtent cher",
"La réserve doit toujours être de 100 bar",
"Le bloc se vide plus vite à cause du froid",
"Les paliers y sont toujours plus longs"
],
"n3-autonomie-5": [
"de la procédure en cas de perte de palanquée",
"du point de demi-tour seulement",
"de l’ordre de mise à l’eau du bateau",
"de la profondeur maxi de chacun"
],
"n3-autonomie-7": [
"tu attends au fond qu’ils reviennent",
"tu remontes normalement et les retrouves en surface",
"tu remontes sans palier pour aller plus vite",
"tu cherches encore 5 minutes au fond"
],
"n3-autonomie-8": [
"agir tout de suite",
"respirer, se stabiliser, réfléchir, agir",
"remonter d’abord, réfléchir ensuite",
"prévenir le binôme, puis remonter"
],
"n3-autonomie-9": [
"Le directeur de plongée",
"Le pilote du bateau",
"Le plus expérimenté de la palanquée",
"La palanquée elle-même"
],
"n3-accidents-0": [
"une crampe liée à l’effort de palmage",
"un accident de décompression ostéo-articulaire",
"une tendinite liée au port du bloc",
"un barotraumatisme de l’articulation"
],
"n3-accidents-1": [
"Le réimmerger au palier",
"L’oxygène au masque",
"De l’aspirine sans attendre",
"L’allonger au chaud et attendre"
],
"n3-accidents-2": [
"Bien s’hydrater avant et après",
"Un effort intense juste après la plongée",
"Remonter lentement jusqu’au palier",
"Faire un palier de sécurité de 3 min"
],
"n3-accidents-3": [
"un ADD vestibulaire",
"un simple mal de mer",
"une narcose tardive",
"une surpression pulmonaire"
],
"n3-accidents-4": [
"Par recompression dans l’eau",
"En caisson hyperbare",
"Sous oxygène seulement, sur le bateau",
"Par réimmersion au palier"
],
"n3-accidents-5": [
"un ADD cutané",
"le froid seulement",
"une allergie au néoprène",
"une piqûre de méduse"
],
"n3-accidents-6": [
"La pression baisse en altitude : bulles",
"L’air de l’avion est trop sec",
"La narcose réapparaît en altitude",
"Les oreilles ne s’équilibrent pas"
],
"n3-accidents-7": [
"d’un blocage de l’expiration à la remontée",
"d’un excès d’azote dissous dans le sang",
"d’une remontée trop lente avec paliers",
"d’un détendeur qui tire en profondeur"
],
"n3-accidents-8": [
"remonte vite pour respirer",
"arrête l’effort et expire longuement",
"inspire à fond plusieurs fois",
"change de détendeur"
],
"n3-accidents-9": [
"l’heure des signes et les paramètres de plongée",
"le niveau et l’expérience du plongeur",
"le matériel utilisé et son état",
"le nom du DP et du guide de palanquée"
],
"n3-accidents-10": [
"certains ADD neurologiques sans faute apparente",
"certaines narcoses précoces vers 30 m",
"certaines surpressions pulmonaires",
"certains essoufflements en profondeur"
],
"n3-materiel-0": [
"Pour isoler celle qui a un souci et passer sur l’autre",
"Pour avoir deux fois plus d’air",
"Pour respirer plus facilement en profondeur",
"Pour alimenter le gilet et le parachute"
],
"n3-materiel-1": [
"Tu remontes très vite",
"Tu fermes son robinet et passes sur l’autre",
"Tu tapes le 2ᵉ étage pour le débloquer",
"Tu respires dessus jusqu’au palier"
],
"n3-materiel-2": [
"À remonter plus vite en cas de souci",
"À se signaler et tenir un palier en pleine eau",
"À remonter un objet lourd",
"À descendre le long d’un repère"
],
"n3-materiel-3": [
"Le bleu",
"Le rouge",
"Le jaune",
"Le vert"
],
"n3-materiel-4": [
"Pour couper un bout d’ancre coincé",
"Pour se libérer d’un fil ou d’un filet",
"Pour se défendre d’un animal",
"Pour détacher le lest en urgence"
],
"n3-materiel-5": [
"Un ordinateur et une montre + profondimètre",
"Un ordinateur et un manomètre",
"Deux manomètres",
"Un ordinateur et sa sauvegarde en mémoire"
],
"n3-materiel-6": [
"pouvoir subir une panne sans être en danger",
"avoir du matériel récent et révisé",
"avoir le même matériel que son binôme",
"emporter plus d’air que prévu"
],
"n3-materiel-7": [
"d’être entraîné vers la surface",
"de perdre ton masque",
"de vider ton bloc",
"de couler sous le poids du dévidoir"
],
"n3-materiel-8": [
"mélange et niveau de prudence",
"l’heure et la date du jour",
"les unités (mètres ou pieds)",
"le mode d’affichage de nuit"
],
"n4-guide-0": [
"de toutes les palanquées présentes sur le site",
"du déroulement et de la sécurité de sa palanquée",
"du bateau, du matériel et du mouillage",
"de l’organisation complète de la sortie"
],
"n4-guide-1": [
"au plongeur le plus rapide",
"au plongeur le plus faible",
"au rythme habituel du guide",
"à la moyenne du groupe"
],
"n4-guide-2": [
"l’itinéraire, le fond et les repères",
"ses plongeurs : comportement, respiration, air",
"son ordinateur et sa propre consommation",
"la position du bateau et le courant"
],
"n4-guide-3": [
"Site, profondeur, durée, signes, sécurité",
"Site et profondeur seulement",
"Signes et pression de retour seulement",
"Les paramètres, la sécurité se fait sous l’eau"
],
"n4-guide-4": [
"note la plongée dans son carnet",
"débriefe et rend compte au DP",
"vérifie le matériel des plongeurs",
"prépare la plongée suivante"
],
"n4-guide-5": [
"Quand le premier passe sur la réserve",
"Selon un plan prévu, avant d’être juste en air",
"À mi-temps de la plongée",
"Quand le guide arrive à 100 bar"
],
"n4-guide-6": [
"à l’arrière pour être surveillé",
"près du guide",
"en tête, devant le guide",
"à côté du plus expérimenté"
],
"n4-guide-7": [
"accélère pour finir plus tôt",
"ralentit, se rapproche et vérifie que tout va bien",
"lui fait signe de respirer moins vite",
"lui fait signe de remonter avec un autre"
],
"n4-guide-8": [
"Pour vérifier que tout le monde a compris",
"Par politesse envers les plongeurs",
"Pour repérer qui semble stressé",
"Parce que c’est imposé par le Code du sport"
],
"n4-guide-9": [
"en pleine eau, face au courant",
"en s’abritant derrière les reliefs",
"en surface, puis descente sur le site",
"dans le sens du courant, sans palmer"
],
"n4-guide-10": [
"sa consommation et le risque de remontée rapide",
"sa flottabilité, qui devient positive",
"sa sensibilité au froid seulement",
"sa narcose seulement, pas sa consommation"
],
"n4-air-0": [
"Le guide",
"Le plongeur qui consomme le plus",
"Le plus expérimenté",
"Celui qui a le plus petit bloc"
],
"n4-air-3": [
"Pour repérer le gros consommateur et anticiper",
"Pour remplir la fiche de sécurité du DP",
"Pour vérifier que les manomètres marchent",
"Pour fixer à l’avance le temps de palier"
],
"n4-air-4": [
"la descente et le fond seulement",
"la remontée, les paliers et une marge",
"la remontée seulement",
"le palier seulement"
],
"n4-air-5": [
"continue comme prévu",
"adapte la suite à ce plongeur",
"lui fait signe de respirer moins",
"le confie à un autre plongeur"
],
"n4-air-6": [
"le plongeur qui consomme le moins",
"le plongeur qui consomme le plus",
"le guide uniquement",
"la moyenne de la palanquée"
],
"n4-assistance-0": [
"Lui retirer ses palmes pour la tracter",
"Assurer sa flottabilité à elle et la tienne",
"Lui retirer son masque et son détendeur",
"Lui faire tout de suite des insufflations"
],
"n4-assistance-1": [
"la plus rapide possible",
"contrôlée en gérant les deux gilets",
"contrôlée par le gilet de la victime seul",
"fixée par le parachute"
],
"n4-assistance-2": [
"Bras qui s’agite",
"Grand rond au-dessus de la tête",
"Pouce levé",
"Main à plat sur la tête"
],
"n4-assistance-3": [
"doit rester en sécurité et pris en compte",
"remonte seul derrière, à son rythme",
"attend au fond le retour du guide",
"continue la plongée avec le plus ancien"
],
"n4-assistance-4": [
"les gestes du RIFAP et l’alerte",
"un palier de sécurité en surface",
"le déséquipement complet à l’eau",
"une immersion de contrôle"
],
"n4-assistance-5": [
"remonte quand même vite, sans s’arrêter",
"lui remet le détendeur si possible",
"la laisse sans détendeur, elle expire",
"s’arrête pour faire un palier de sécurité"
],
"n4-assistance-6": [
"attend qu’il reprenne conscience",
"le remonte immédiatement en l’assistant",
"lui remet le détendeur et attend",
"remonte chercher de l’aide"
],
"n4-assistance-7": [
"d’arrêter l’effort et de rassurer",
"de remonter le plus vite possible",
"de lui donner ton octopus",
"de gonfler son gilet"
],
"n4-orga-0": [
"Le directeur de plongée",
"Le plus ancien du club",
"Les plongeurs eux-mêmes",
"Le guide de chaque palanquée"
],
"n4-orga-1": [
"À noter les palanquées et vérifier les retours",
"À noter les paramètres pour le carnet",
"À la comptabilité du club",
"À l’assurance en cas d’accident"
],
"n4-orga-2": [
"Du Code du sport et des fédérations",
"Uniquement des fédérations de plongée",
"Des contrats d’assurance des clubs",
"Des notices des fabricants de matériel"
],
"n4-orga-3": [
"Oxygène avec masque adapté",
"Un compas",
"Une seconde paire de palmes",
"Un dévidoir"
],
"n4-orga-4": [
"Le directeur de plongée (ou par délégation)",
"Le guide de la palanquée concernée",
"Le pilote du bateau seul",
"La victime elle-même"
],
"n4-orga-5": [
"les paramètres fixés par le DP",
"les paramètres de son ordinateur",
"les souhaits de ses plongeurs",
"les paramètres de la palanquée voisine"
],
"n4-orga-6": [
"la profondeur, la durée, les paliers et incidents",
"la profondeur atteinte seulement",
"les incidents seulement, s’il y en a eu",
"le parcours suivi et la faune observée"
],
"e2-enseigner20-0": [
"l’essai de l’élève",
"le bilan",
"une seconde démonstration",
"la correction"
],
"e2-enseigner20-1": [
"Tout corriger d’un coup",
"Un seul point à la fois",
"Le plus grave d’abord, puis tout le reste",
"Seulement à la fin de la séance"
],
"e2-enseigner20-2": [
"Dès la première réussite à 6 m",
"Quand le geste est automatique moins profond",
"Après un nombre fixe de séances",
"Dès que l’élève se sent prêt et le demande"
],
"e2-enseigner20-3": [
"« Savoir vider son masque correctement »",
"« Vider son masque à 6 m sans lâcher la palanquée »",
"« Améliorer son vidage de masque en mer »",
"« Être à l’aise avec le masque sous l’eau »"
],
"e2-enseigner20-4": [
"le contrôle de l’élève : position, flottabilité, air",
"une certaine distance pour le laisser faire",
"un œil sur son ordinateur et sa propre conso",
"le rythme prévu, quoi qu’il arrive"
],
"e2-enseigner20-5": [
"exigeant, centré sur les erreurs",
"positif et concret",
"court, réservé aux échecs",
"uniquement écrit"
],
"e2-enseigner20-6": [
"clair, unique et vérifiable",
"large pour s’adapter",
"une liste de plusieurs exercices",
"fixé en cours de séance"
],
"e2-enseigner20-7": [
"Briefing, objectif, exercice, débriefing",
"Objectif, briefing, exercice, débriefing",
"Exercice, objectif, débriefing",
"Briefing, exercice, objectif, débriefing"
],
"e2-enseigner20-8": [
"une fois, même de justesse",
"calmement et plusieurs fois",
"avec l’aide du moniteur",
"en piscine seulement"
],
"e2-enseigner20-9": [
"reviens moins profond et refais l’étape",
"insistes à 8 m en le tenant",
"valides : il sait le faire en piscine",
"passes à un autre exercice à 8 m"
],
"e2-enseigner20-10": [
"Sous l’eau, on ne peut presque pas expliquer",
"Pour économiser l’air pendant la séance",
"Parce que le Code du sport l’impose",
"Pour vérifier le matériel de chacun"
],
"e2-enseigner20-11": [
"12 m",
"20 m",
"40 m",
"6 m"
],
"e2-securite-0": [
"Respiration lente et régulière",
"Regard affolé et respiration rapide",
"Il regarde souvent son manomètre",
"Il fait OK sans hésiter"
],
"e2-securite-1": [
"Le prendre en main et le stabiliser calmement",
"Remonter tout de suite",
"Lui faire signe de se calmer à distance",
"Arrêter l’exercice et attendre"
],
"e2-securite-2": [
"Pour pouvoir intervenir immédiatement",
"Pour mieux voir ses gestes",
"Pour qu’il entende les consignes",
"Parce que c’est plus rassurant pour lui seulement"
],
"e2-securite-3": [
"forme, matériel et lest de l’élève",
"seulement la météo",
"seulement son propre matériel",
"seulement la pression du bloc"
],
"e2-securite-4": [
"d’un gilet mal géré ou d’un lest insuffisant",
"d’un lest trop lourd mal compensé",
"d’une narcose à faible profondeur",
"du froid qui fait respirer plus vite"
],
"e2-securite-5": [
"au début et à la fin",
"souvent pendant la séance",
"à mi-séance seulement",
"quand il le demande"
],
"e2-securite-6": [
"à portée de main du moniteur",
"à quelques mètres, en vue",
"seul pour gagner en autonomie",
"à côté d’un autre élève"
],
"e2-securite-7": [
"Elles favorisent les accidents de décompression",
"Elles fatiguent l’élève et le démotivent",
"Elles consomment trop d’air pour la séance",
"Elles abîment les oreilles à chaque fois"
],
"e2-securite-8": [
"écourtes la séance",
"continues comme prévu",
"lui fais palmer plus vite",
"passes à un exercice plus court au fond"
],
"e2-securite-9": [
"que l’élève connaît le signe et la procédure",
"que son octopus est neuf et bien révisé",
"que l’élève est déjà sur la réserve",
"que la remontée se fera seul, sans aide"
],
"nx-base-0": [
"plus d’oxygène et moins d’azote",
"moins d’oxygène et plus d’azote",
"plus d’oxygène et autant d’azote",
"de l’hélium en plus"
],
"nx-base-2": [
"Aller plus profond",
"Moins d’azote dissous",
"Moins de narcose garantie",
"Consommer moins d’air"
],
"nx-base-3": [
"analyse son mélange soi-même",
"lit l’étiquette du gonfleur",
"fait analyser par son binôme",
"se fie à l’analyse de la veille"
],
"nx-base-4": [
"Le mélange est plus dense",
"La Pp O₂ atteint plus vite la limite",
"L’azote y est plus narcotique",
"La décompression est plus longue"
],
"nx-base-7": [
"vers le bas",
"vers le haut",
"au mètre le plus proche",
"à la dizaine supérieure"
],
"nx-base-9": [
"plus d’oxygène et moins d’azote que l’air",
"moins d’oxygène et plus d’azote que l’air",
"de l’hélium à la place d’une partie de l’azote",
"autant d’azote, mais plus d’oxygène"
],
"nx-base-10": [
"diminue",
"augmente",
"ne change pas",
"dépend de la Pp N₂"
],
"nx-securite-0": [
"Aucune, il est plus prudent",
"Alarmes O₂ fausses : MOD dépassable sans alerte",
"Il calcule plus de paliers, c’est tout",
"Il passe en mode erreur"
],
"nx-securite-2": [
"Le % d’O₂, la MOD, la date et le nom",
"Le % d’O₂ seulement",
"La date de gonflage et la pression",
"La MOD seulement"
],
"nx-securite-3": [
"Le plongeur lui-même",
"Le gonfleur seulement",
"Le directeur de plongée",
"Le binôme"
],
"nx-securite-4": [
"sans danger, la marge le couvre",
"à éviter : la Pp O₂ dépasse la limite",
"toléré si c’est bref",
"toléré à 1,6 bar"
],
"nx-securite-5": [
"compatible oxygène",
"en acier uniquement",
"neuf de moins d’un an",
"identique à celui de l’air"
],
"nx-securite-6": [
"Le plongeur lui-même, avant la plongée",
"Le gonfleur seulement, au remplissage",
"Le directeur de plongée, pour tout le monde",
"L’ordinateur, automatiquement, à la mise à l’eau"
],
"nx-securite-7": [
"Déco plus prudente, mais pas de suivi de la Pp O₂",
"Rien de grave : l’air est toujours plus prudent",
"Il te donne trop de temps sans palier",
"Il surveille quand même ta Pp O₂ réelle"
],
"nx-securite-8": [
"la toxicité neurologique de l’oxygène",
"la narcose seule",
"l’accident de décompression",
"la toxicité pulmonaire immédiate"
],
"nx-securite-9": [
"existe toujours (l’O₂ peut être narcotique)",
"disparaît totalement grâce à moins d’azote",
"augmente forcément à cause de l’oxygène",
"n’apparaît qu’au-delà de 40 m de fond"
],
"n3-cadre-0": [
"20 m",
"40 m",
"60 m",
"50 m"
],
"n3-cadre-1": [
"Le directeur de plongée",
"Le plus expérimenté",
"Le pilote du bateau",
"Les plongeurs eux-mêmes"
],
"n3-cadre-2": [
"Un moyen de connaître profondeur et temps",
"Une source d’air de secours",
"Une lampe de plongée",
"Un gilet"
],
"n3-cadre-3": [
"plongée autonome jusqu’à 60 m",
"plongée encadrée jusqu’à 60 m",
"palier à 60 m",
"plongée de 60 minutes"
],
"n3-cadre-4": [
"Du Code du sport",
"Des fédérations seulement",
"Des assurances",
"Des tables MN90"
],
"n3-cadre-5": [
"Les règles locales",
"Toujours le Code du sport français",
"Celles de ta fédération",
"Celles de ton brevet le plus haut"
],
"n3-physio-0": [
"Pour bien éliminer le CO₂",
"Pour économiser l’oxygène",
"Pour mieux s’équilibrer",
"Pour éliminer l’azote"
],
"n3-physio-1": [
"moins vite que dans l’air, grâce au néoprène",
"aussi vite que dans l’air à même température",
"beaucoup plus vite que dans l’air",
"deux fois moins vite que dans l’air"
],
"n3-physio-2": [
"l’air est plus dense",
"l’air est plus froid",
"le détendeur s’ouvre moins",
"l’oxygène est plus rare"
],
"n3-physio-3": [
"l’espace mort",
"les alvéoles",
"les bronchioles",
"le sang"
],
"n3-physio-4": [
"de la plus forte Pp vers la plus faible",
"de la plus faible Pp vers la plus forte",
"seulement à l’inspiration",
"selon la pression absolue seule"
],
"n3-physio-5": [
"une marge plus large (air, déco)",
"moins de lest pour mieux palmer",
"une descente plus rapide au fond",
"une remontée un peu plus rapide"
],
"n4-deco-0": [
"l’ordinateur le moins pénalisant",
"l’ordinateur le plus pénalisant",
"la moyenne",
"l’ordinateur du guide"
],
"n4-deco-1": [
"favorise la formation de bulles",
"réduit la conso",
"ne pose problème qu’à plus de 40 m",
"n’a aucun effet"
],
"n4-deco-2": [
"fait 6 min ensemble",
"fait 3 min et lui finit seul",
"fait la moyenne : 4 min 30",
"fait 3 min et remonte doucement"
],
"n4-deco-3": [
"du plus profond vers le moins profond",
"du moins profond vers le plus profond",
"en dents de scie",
"toujours à la même profondeur"
],
"n4-deco-4": [
"Les bulles déjà formées peuvent grossir",
"On consomme plus d’air à la fin",
"Le courant est souvent plus fort",
"La narcose revient en fin de plongée"
],
"n4-deco-5": [
"Le guide",
"Le plus rapide",
"Chacun pour soi",
"Le plus lent"
],
"n4-physio-0": [
"le pousse doucement vers le bas pour l’aider",
"remonte un peu avec lui pour qu’il équilibre",
"lui fait faire un Valsalva bien plus fort",
"le laisse au-dessus et continue avec les autres"
],
"n4-physio-1": [
"lui conseille du repos et de l’eau",
"pense à un ADD : oxygène et avis médical",
"pense à une tendinite liée au bloc",
"lui donne un antidouleur et le surveille"
],
"n4-physio-2": [
"l’hypothermie",
"la narcose",
"un ADD",
"un essoufflement"
],
"n4-physio-3": [
"Un ADD peut apparaître plus tard",
"Pour vérifier leur matériel",
"Pour remplir le carnet",
"Pour le débriefing"
],
"n4-physio-4": [
"La surpression pulmonaire",
"La narcose",
"L’essoufflement",
"Le barotraumatisme d’oreille"
],
"n4-physio-5": [
"la narcose",
"un ADD",
"une hypoxie",
"un essoufflement"
],
"e2-evaluer-0": [
"ce qui est réussi",
"l’erreur la plus grave",
"une note",
"le prochain exercice"
],
"e2-evaluer-1": [
"Une, la plus importante",
"Toutes, pour gagner du temps",
"Deux : la plus grave et la plus simple",
"Trois au maximum"
],
"e2-evaluer-2": [
"sur des critères connus, plusieurs fois",
"sur une impression générale du moniteur",
"une seule fois, si c’est bien fait",
"selon le nombre de séances suivies"
],
"e2-evaluer-3": [
"un point à la fois",
"tout en même temps",
"le résultat final seulement",
"seulement la flottabilité"
],
"e2-evaluer-4": [
"Dans le carnet de formation",
"Dans le carnet de plongée",
"Sur la fiche de sécurité",
"Sur la licence"
],
"e2-evaluer-5": [
"montrer à nouveau le geste",
"réexpliquer plus en détail",
"donner un document",
"faire refaire sans rien dire"
],
"e2-evaluer-6": [
"observable",
"général",
"laissé à l’appréciation",
"identique pour tous les exercices"
],
"e2-evaluer-7": [
"juste après la séance, au calme",
"le lendemain, à froid",
"en fin de stage, en groupe",
"sous l’eau, pendant l’exercice"
],
"e2-evaluer-8": [
"motiver et fixer le bon geste",
"faire plaisir",
"passer plus vite à la suite",
"noter l’élève"
],
"nx-pratique-0": [
"à l’air (21 %)",
"à 32 %",
"à 100 % uniquement",
"dans le bloc à analyser"
],
"nx-pratique-1": [
"Pour ne pas le confondre avec un bloc d’air",
"Pour indiquer la date de requalification",
"Pour le gonfleur seulement",
"Pour la pression maximale"
],
"nx-pratique-2": [
"Non, il le réduit si on garde le profil air",
"Oui, totalement, si on respecte la MOD",
"Il l’augmente à cause de l’oxygène",
"Oui, tant qu’on reste au-dessus de 20 m"
],
"nx-pratique-3": [
"le pourcentage, la MOD, la date, le nom",
"le pourcentage d’O₂ seulement",
"la pression de gonflage et la date",
"la MOD seulement, en gros"
],
"nx-pratique-4": [
"le % d’O₂ mesuré et la Pp O₂ max",
"l’air, par prudence",
"le % d’O₂ de l’étiquette du gonfleur",
"le % d’O₂ seulement"
],
"nx-pratique-5": [
"34 %, ta propre mesure",
"32 %, c’est écrit",
"33 %, la moyenne",
"32 %, par prudence"
],
"nx-pratique-6": [
"le recalibres avant de mesurer ton bloc",
"mesures ton bloc quand même, c’est proche",
"retires 2 % au résultat de ton bloc",
"changes de capteur sans recalibrer"
],
"nx-pratique-7": [
"le % d’O₂, la MOD, la date et le nom",
"le % d’O₂ seulement, c’est l’essentiel",
"la date de gonflage et la pression",
"la MOD seulement, bien visible"
],
"nx-pratique-8": [
"le plongeur qui va l’utiliser",
"uniquement le gonfleur",
"le directeur de plongée",
"le binôme"
],
"nx-pratique-9": [
"déco plus prudente, mais pas de suivi de la Pp O₂",
"déco dangereuse : il donne trop de temps",
"aucune différence",
"il surveille quand même la Pp O₂"
],
"e1-piscine-0": [
"Respirer sur le détendeur",
"Vider son masque",
"Équilibrer ses oreilles",
"Gonfler le gilet"
],
"e1-piscine-1": [
"Pour apprendre sans stress",
"Pour occuper la fin de séance",
"Pour remplacer les exercices",
"Pour les enfants seulement"
],
"e1-piscine-2": [
"existe si l’élève remonte poumons bloqués",
"n’existe pas à si faible profondeur",
"n’existe qu’en mer",
"existe seulement au-delà de 10 m"
],
"e1-piscine-3": [
"après les gestes de base",
"avant de respirer sur le détendeur",
"dès la première séance",
"seulement en mer"
],
"e1-piscine-4": [
"les apnées prolongées",
"le débriefing",
"les exercices de masque",
"la palme en surface"
],
"e1-piscine-5": [
"Un moniteur responsable",
"L’initiateur seul",
"Le maître-nageur",
"Le président du club"
],
"accidents-5": [
"Bien s’hydrater avant la plongée",
"Le froid pendant et après la plongée",
"Un effort important à la remontée",
"Un profil en yoyo pendant la plongée"
],
"accidents-15": [
"descendre trop vite sans équilibrer",
"respirer trop vite au fond, à l’effort",
"plonger dans une eau très froide",
"bloquer son expiration en remontant"
],
"materiel-10": [
"qui baisse au fur et à mesure que le bloc se vide",
"égale à la pression qui reste dans le bloc",
"égale à la pression ambiante, quelle que soit la profondeur",
"stable quelle que soit la pression du bloc"
]
};
  const EX = {
"d-oreilles-0": "Piège : « dès qu’on sent une gêne » paraît prudent, mais la gêne veut dire que tu as déjà pris du retard.",
"d-materiel-6": "Piège : le lest ne compense pas la bouteille (elle est déjà lourde), il compense surtout le néoprène qui flotte.",
"n1-physique-4": "Piège : « 2 fois » vient de la confusion avec 10 m. À 20 m, c’est 3 bar, donc 3 fois.",
"n1-accidents-1": "Piège : un spray peut déboucher au départ puis cesser d’agir au fond : le blocage arrive à la remontée.",
"n1-accidents-2": "Piège : le Valsalva envoie l’air vers les oreilles (nez pincé) ; pour le masque, on souffle simplement par le nez.",
"n1-secu-1": "Piège : la remontée seul en expirant est une solution de dernier recours, pas le premier geste quand un équipier est là.",
"r-role-3": "Piège : alerter avant d’examiner, c’est appeler sans savoir quoi dire. Et protéger passe toujours en premier.",
"r-o2-0": "Piège : attendre d’être sûr fait perdre le temps qui compte le plus.",
"r-o2-4": "Piège : on n’arrête pas l’oxygène quand ça va mieux ; seuls les secours décident.",
"r-vict-8": "Piège : la PLS, c’est pour une victime qui respire. Sans respiration, on masse.",
"n4-air-0": "Piège : ce n’est ni le guide ni le plus expérimenté, mais celui qui vide son bloc le plus vite.",
"n4-deco-2": "Piège : faire la moyenne ou 3 min laisserait un plongeur seul au palier.",
"nx-pratique-5": "Piège : l’étiquette de la veille peut être fausse ou d’un autre bloc ; seule ta mesure du jour compte.",
"nx-securite-7": "Piège : « l’air est plus prudent » n’est vrai que pour la décompression, pas pour l’oxygène.",
"nx-base-2": "Piège : le nitrox ne permet pas d’aller plus profond, au contraire : sa MOD est plus faible.",
"e2-peda-4": "Piège : montrer avant d’expliquer, l’élève ne sait pas quoi regarder.",
"e2-com-1": "Piège : une consigne négative (« ne bloque pas ») fait penser au mauvais geste. On dit ce qu’il faut faire.",
"n3-accidents-4": "Piège : la réimmersion au palier semble logique mais aggrave souvent l’accident.",
"n3-gaz-12": "Piège : il n’y a pas de seuil fixe de narcose ; froid, fatigue et stress la font varier d’un jour à l’autre."
};
  const EXR = {"n3-cadre-2": "Profondimètre, montre, source d’air de secours et gilet sont exigés ; la lampe n’est pas obligatoire de jour."};
  const b0 = C.build;
  C.build = () => {
    b0();
    Object.keys(CH).forEach(id => { const q = C.qById[id]; if (q && Array.isArray(q.c) && CH[id].length === q.c.length) q.c = CH[id].slice(); });
    Object.keys(EX).forEach(id => { const q = C.qById[id]; if (q && q.e && q.e.indexOf(EX[id]) < 0) q.e = q.e + " " + EX[id]; });
    Object.keys(EXR).forEach(id => { const q = C.qById[id]; if (q) q.e = EXR[id]; });
  };
})();
