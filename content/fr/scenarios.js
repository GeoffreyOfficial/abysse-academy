/* Abysse Academy · contenu FR · Scénarios d’accident
   Format : voir CONTRIBUTING.md. Le HTML des cours utilise les classes
   callout ex / trap / check, formula, tbl (voir css/app.css). */
/* Chaque étape : q, c = [[texte, bon (1/0), explication]]. */
AA.content.addScenarios([
 {
  "id": "s1",
  "title": "Fourmillements sur le bateau",
  "intro": "Plongée à 32 m, 25 min, paliers faits. 20 min après la sortie, ton binôme Léo se plaint de fourmillements dans la main gauche et d’une grande fatigue.",
  "steps": [
   {
    "q": "Quelle est ta première pensée ?",
    "c": [
     [
      "Il a dormi sur son bras",
      0,
      "Ne jamais banaliser des signes neurologiques après une plongée."
     ],
     [
      "Suspicion d’accident de désaturation",
      1,
      "Oui : même paliers respectés, un ADD reste possible."
     ],
     [
      "Il a froid",
      0,
      "Le froid peut aggraver, mais des fourmillements localisés évoquent un ADD."
     ]
    ]
   },
   {
    "q": "Que fais-tu en priorité ?",
    "c": [
     [
      "Tu l’allonges et lances l’oxygène à haut débit",
      1,
      "L’O₂ est le geste numéro un."
     ],
     [
      "Tu lui donnes un café",
      0,
      "Pas d’excitant. Eau plate s’il est conscient."
     ],
     [
      "Tu le renvoies faire un palier à 3 m",
      0,
      "Jamais de recompression dans l’eau."
     ]
    ]
   },
   {
    "q": "Et en même temps ?",
    "c": [
     [
      "Tu alertes : VHF canal 16 ou 196",
      1,
      "Le CROSS organise l’évacuation vers un caisson."
     ],
     [
      "Tu attends de voir si ça passe",
      0,
      "Le délai compte : alerte immédiate."
     ],
     [
      "Tu postes sur le groupe du club",
      0,
      "Alerte les secours d’abord."
     ]
    ]
   },
   {
    "q": "En attendant les secours…",
    "c": [
     [
      "Eau plate s’il est conscient, couverture, surveillance, noter heure et paramètres",
      1,
      "Ces infos seront précieuses pour le médecin."
     ],
     [
      "Tu le fais marcher pour activer la circulation",
      0,
      "Pas d’effort."
     ],
     [
      "Tu enlèves l’oxygène dès qu’il va mieux",
      0,
      "On maintient l’O₂ jusqu’à la prise en charge."
     ]
    ]
   }
  ],
  "m": "accidents"
 },
 {
  "id": "s2",
  "title": "Panne d’air à 18 m",
  "intro": "Tu plonges en autonomie avec Sarah à 18 m. Elle te fait le signe « je n’ai plus d’air ».",
  "steps": [
   {
    "q": "Ton premier geste ?",
    "c": [
     [
      "Tu lui donnes ton octopus (ou ton détendeur) et la tiens",
      1,
      "Air d’abord, et contact pour éviter qu’elle s’échappe."
     ],
     [
      "Tu lui montres la surface",
      0,
      "Une remontée sans air depuis 18 m est très dangereuse."
     ],
     [
      "Tu vas chercher le guide d’une autre palanquée",
      0,
      "C’est toi le plus proche : agis tout de suite."
     ]
    ]
   },
   {
    "q": "Elle respire sur ton octopus. Ensuite ?",
    "c": [
     [
      "Vous restez au fond pour finir la plongée",
      0,
      "Tu respires maintenant pour deux : on remonte."
     ],
     [
      "Remontée contrôlée ensemble, en vous tenant, en surveillant la vitesse",
      1,
      "Tu gères la flottabilité pour deux, vitesse lente."
     ],
     [
      "Tu lâches pour remonter plus vite",
      0,
      "Jamais."
     ]
    ]
   },
   {
    "q": "Pendant la remontée, Sarah gonfle trop son gilet et vous accélérez.",
    "c": [
     [
      "Tu purges et freines, palmes en opposition si besoin",
      1,
      "Mariotte : plus vous montez, plus vous accélérez. On purge tôt."
     ],
     [
      "Tu laisses faire, vous arrivez plus vite",
      0,
      "Risque de surpression et d’ADD."
     ],
     [
      "Tu lâches ton embout",
      0,
      "Non !"
     ]
    ]
   },
   {
    "q": "En surface ?",
    "c": [
     [
      "Gonfler les gilets, signaler au bateau, rendre compte au DP et surveiller",
      1,
      "Puis on cherche la cause : manomètre pas consulté ?"
     ],
     [
      "Rien à signaler, tout va bien",
      0,
      "Il faut rendre compte et surveiller l’apparition de signes."
     ],
     [
      "Replonger pour finir",
      0,
      "Non."
     ]
    ]
   }
  ],
  "m": "pa20"
 },
 {
  "id": "s3",
  "title": "Essoufflement à 25 m",
  "intro": "Vous palmez contre le courant à 25 m. Ton binôme respire très vite, fait des grands gestes et te fait un signe confus.",
  "steps": [
   {
    "q": "Que se passe-t-il probablement ?",
    "c": [
     [
      "Un essoufflement",
      1,
      "Effort + profondeur + détendeur sollicité : le CO₂ s’accumule."
     ],
     [
      "Une narcose agréable",
      0,
      "Les signes évoquent un manque d’air ressenti."
     ],
     [
      "Une hyperoxie",
      0,
      "Pas à l’air à 25 m."
     ]
    ]
   },
   {
    "q": "Ta réaction ?",
    "c": [
     [
      "Stopper l’effort, se tenir à l’abri du courant, l’aider à expirer longuement",
      1,
      "Casser le cercle vicieux du CO₂."
     ],
     [
      "Accélérer pour sortir du courant vite",
      0,
      "Plus d’effort = plus de CO₂."
     ],
     [
      "Le laisser remonter seul",
      0,
      "Jamais seul."
     ]
    ]
   },
   {
    "q": "Il ne récupère pas.",
    "c": [
     [
      "Remonter de quelques mètres ensemble, en contrôlant",
      1,
      "La pression baisse, la respiration devient plus facile."
     ],
     [
      "Descendre pour se mettre à l’abri",
      0,
      "Ça aggrave."
     ],
     [
      "Lui retirer son masque",
      0,
      "Non."
     ]
    ]
   }
  ],
  "m": "accidents"
 },
 {
  "id": "s4",
  "title": "Remontée en panique",
  "intro": "En exercice à 12 m, ton binôme panique, lâche tout et file vers la surface en retenant sa respiration. En surface, il tousse et se plaint d’une douleur dans la poitrine.",
  "steps": [
   {
    "q": "Qu’est-ce qu’on peut suspecter ?",
    "c": [
     [
      "Une surpression pulmonaire",
      1,
      "Remontée glotte fermée : l’air dilaté lèse les poumons."
     ],
     [
      "Une simple fatigue",
      0,
      "La douleur thoracique après une remontée rapide est un signe d’alerte."
     ],
     [
      "Un placage de masque",
      0,
      "Non."
     ]
    ]
   },
   {
    "q": "Que fais-tu ?",
    "c": [
     [
      "Le sortir de l’eau, oxygène, alerte",
      1,
      "Urgence vitale."
     ],
     [
      "Le faire redescendre pour « recompresser »",
      0,
      "Jamais."
     ],
     [
      "Lui faire faire des respirations forcées",
      0,
      "Repos, O₂."
     ]
    ]
   },
   {
    "q": "Pour prévenir ce type d’accident chez un élève (esprit E2)…",
    "c": [
     [
      "Insister sur l’expiration à la remontée et surveiller de près en faible profondeur",
      1,
      "La zone 0 à 10 m est la plus risquée pour les poumons."
     ],
     [
      "Faire les exercices plus profond",
      0,
      "Ce n’est pas la solution."
     ],
     [
      "Laisser l’élève seul pour qu’il apprenne",
      0,
      "Non."
     ]
    ]
   }
  ],
  "m": "accidents"
 }
]);
