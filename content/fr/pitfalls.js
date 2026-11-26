/* Abysse Academy · contenu FR · Pièges fréquents
   Utilisés par la page « Mes erreurs fréquentes » pour expliquer POURQUOI
   on se trompe. Un piège regroupe des erreurs par :
   - gen : générateurs de calculs (content/fr/generators.js) ;
   - re  : expression cherchée dans le texte de la question ;
   - m   : modules (utilisé avec re, ou seul).
   why = l'erreur de raisonnement ; fix = le réflexe pour ne plus la faire. */
AA.content.addPitfalls([
  { id: "oubli1", title: "Oublier le « + 1 » de l’atmosphère", gen: ["pabs", "prof", "alti", "ppo2", "ppn2", "maxo2", "co"], re: "absolue|bar.*m\\b", m: ["pression", "dalton"],
    why: "On calcule la pression de l’eau (profondeur / 10) et on oublie l’air au-dessus de la surface. À 20 m, on trouve 2 bar au lieu de 3.",
    fix: "Écris toujours « 1 + » avant de faire le reste. Pression absolue = 1 (air) + profondeur / 10 (eau)." },
  { id: "relabs", title: "Mélanger pression relative et absolue", re: "relative|hydrostatique|manomètre|profondimètre", m: ["pression"],
    why: "Les deux mots se ressemblent. La relative ne compte que l’eau ; l’absolue ajoute l’air. Les lois (Mariotte, Dalton) utilisent toujours l’absolue.",
    fix: "Dans un calcul de gaz, demande-toi : « est-ce que j’ai compté l’air de la surface ? ». Si non, ce n’est pas la bonne pression." },
  { id: "mariotte", title: "Volume et pression dans le mauvais sens", gen: ["ballon", "descente", "remontee"], re: "volume|ballon|poumon", m: ["mariotte"],
    why: "On multiplie au lieu de diviser. Quand la pression double, le volume est divisé par deux, et inversement en remontant.",
    fix: "Avant de calculer, prédis : « ça grossit ou ça rétrécit ? ». Si ta réponse ne va pas dans ce sens, recommence. P1 × V1 = P2 × V2." },
  { id: "surface", title: "Le danger est près de la surface", re: "surface|derniers mètres|variation", m: ["mariotte", "accidents"],
    why: "On croit que c’est le fond qui est dangereux. En réalité, les variations de volume sont les plus fortes entre 10 m et la surface (de 2 à 1 bar : volume doublé).",
    fix: "Retiens : les 10 derniers mètres = la plus grande variation. Remontée lente et expiration jusqu’au bout." },
  { id: "archi", title: "Poids apparent : signe et unités", gen: ["lest", "relevage"], re: "poussée|lest|apparent|flott|eau douce|eau de mer", m: ["archimede"],
    why: "On oublie que la poussée dépend du volume déplacé et de la densité de l’eau (mer plus porteuse que l’eau douce), ou on se trompe de signe.",
    fix: "Poids apparent = poids réel − poussée. Positif : ça coule. Négatif : ça flotte. Eau de mer ≈ 1,03 kg par litre." },
  { id: "dalton", title: "Pression partielle : multiplier par la bonne proportion", gen: ["ppo2", "ppn2", "maxo2", "co"], re: "partielle|ppo|ppn|dalton|%", m: ["dalton"],
    why: "On utilise la profondeur au lieu de la pression absolue, ou on se trompe de pourcentage (21 % d’O₂, 79 % d’azote dans l’air simplifié).",
    fix: "Pp = P absolue × proportion du gaz. Commence toujours par calculer la pression absolue, puis multiplie." },
  { id: "conso", title: "Consommation : penser à la profondeur", gen: ["conso", "autonomie"], re: "consomm|autonomie|litres|réserve", m: ["materiel", "pa20"],
    why: "On garde la consommation de surface au fond. À 30 m (4 bar), chaque inspiration prend quatre fois plus d’air.",
    fix: "Conso au fond = conso surface × P absolue. Et on retire la réserve avant de calculer l’autonomie." },
  { id: "deco", title: "Tables : lecture et successive", gen: ["consec", "ligne"], re: "table|palier|majoration|successive|groupe|intervalle", m: ["deco"],
    why: "On lit la mauvaise ligne (on arrondit vers le bas), on oublie la majoration d’une plongée successive, ou on confond durée et heure de sortie.",
    fix: "Toujours arrondir vers le haut (profondeur et durée). Successive : groupe → azote résiduel → majoration → nouvelle lecture." },
  { id: "acc", title: "Confondre les accidents entre eux", re: "symptôme|signe|accident|ADD|surpression|narcose|essouffl|baro", m: ["accidents", "physio"],
    why: "Plusieurs accidents ont des signes proches. On les confond quand on ne relie pas le signe à sa cause (pression, azote, CO₂, effort).",
    fix: "Pour chaque accident, retiens le trio : cause → quand ça arrive (descente, fond, remontée, après) → premier geste." },
  { id: "regles", title: "Prérogatives et organisation", re: "prérogative|autonom|encadr|directeur|palanquée|PE|PA|guide|âge", m: ["regles", "pa20"],
    why: "Les sigles se ressemblent (PE, PA, GP, DP) et les chiffres changent selon le niveau. Le cadre réglementaire peut aussi évoluer.",
    fix: "Fais-toi une fiche : qui décide (DP), qui guide (GP), jusqu’où en encadré (PE40) et en autonomie (PA20). Vérifie les détails avec ton moniteur." },
  { id: "secours", title: "Ordre des gestes de secours", re: "alerte|oxygène|O2|victime|PLS|RCP|bilan|secours", m: ["r-role", "r-alerte", "r-o2", "r-vict"],
    why: "On connaît les gestes, mais pas leur ordre ni leur priorité : on perd du temps à faire un geste secondaire avant l’essentiel.",
    fix: "Protéger, bilan, alerter, oxygène, surveiller. Récite la chaîne à voix haute : elle doit sortir sans réfléchir." }
]);
