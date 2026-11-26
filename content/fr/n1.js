/* Abysse Academy · contenu FR · Monde N1 (plongeur encadré jusqu'à 20 m)
   Questions : ajoute à la fin d'un module, ne réordonne jamais. */
AA.content.module({
  id: "n1-signes", world: "n1", depth: "−2 m", icon: "hand",
  title: "Signes et communication",
  sub: "Se comprendre sans parler",
  essentiel: `
<p>Sous l’eau on ne parle pas : on <b>signe</b>. Un signe se fait <b>bien visible</b>, devant le masque de l’autre, et on attend sa réponse.</p>
<div class="tbl"><table><tr><th>Signe</th><th>Sens</th><th>Réponse attendue</th></tr>
<tr><td>Pouce et index en rond</td><td>« Ça va » (question ou réponse)</td><td>Même signe</td></tr>
<tr><td>Main à plat qui oscille</td><td>« Ça ne va pas »</td><td>On montre où (oreille, masque…)</td></tr>
<tr><td>Pouce vers le haut</td><td>« On remonte »</td><td>Même signe, puis on remonte ensemble</td></tr>
<tr><td>Pouce vers le bas</td><td>« On descend »</td><td>Signe « ça va »</td></tr>
<tr><td>Main tranchant sur la gorge</td><td>« Je n’ai plus d’air »</td><td>On donne son détendeur de secours</td></tr>
<tr><td>Poing fermé ouvert-fermé devant la poitrine</td><td>« Je suis sur la réserve »</td><td>On remonte</td></tr>
<tr><td>Main à plat, paume vers le bas</td><td>« Stop, on reste à cette profondeur »</td><td>« Ça va »</td></tr>
<tr><td>Poing tapé sur la poitrine / mains qui s’agitent</td><td>« Essoufflé »</td><td>On s’arrête, on aide</td></tr></table></div>
<div class="callout trap"><span class="eyebrow">Le pouce vers le haut</span>Il ne veut <b>pas</b> dire « ça va » sous l’eau : il veut dire <b>« on remonte »</b>. C’est la confusion la plus fréquente des débutants.</div>
<p>En surface, le grand signe « ça va » se fait avec le bras en rond au-dessus de la tête ; le bras qui s’agite signale une <b>détresse</b>.</p>`,
  memo: [["Ça va", "Pouce et index en rond."], ["Pouce en haut", "On remonte (pas « ça va » !)."], ["Main sur la gorge", "Plus d’air."], ["Main qui oscille", "Ça ne va pas : montrer où."]],
  moniteur: ["Quels signes utilise-t-on au club pour « réserve » et « essoufflé » ?"],
  quiz: [
    { q: "Sous l’eau, le pouce levé signifie…", c: ["ça va", "on remonte", "on descend", "super"], a: 1, e: "Pouce vers le haut = « on remonte ». Pour dire « ça va », on fait un rond avec le pouce et l’index." },
    { q: "Ton guide te fait le signe « ça va » (rond pouce-index). Tu vas bien. Tu réponds…", c: ["Pouce levé", "Le même signe « ça va »", "Rien", "Main qui oscille"], a: 1, e: "On répond toujours par le même signe pour confirmer." },
    { q: "Tu as mal à une oreille. Que signes-tu ?", c: ["« Ça va »", "« Ça ne va pas » puis tu montres l’oreille", "« On remonte »", "« Plus d’air »"], a: 1, e: "Main qui oscille (ça ne va pas), puis on désigne l’endroit : le guide sait tout de suite quoi faire." },
    { q: "Main en tranchant passée sur la gorge, cela signifie…", c: ["Je suis fatigué", "Je n’ai plus d’air", "Il fait froid", "On s’arrête"], a: 1, e: "C’est le signe « panne d’air ». La réponse : donner son détendeur de secours tout de suite." },
    { q: "En surface, un plongeur agite le bras. Cela veut dire…", c: ["Tout va bien", "Détresse, il faut venir l’aider", "Il dit bonjour", "Il a froid"], a: 1, e: "Le bras qui s’agite en surface est un signal de détresse. Le grand rond au-dessus de la tête veut dire « ça va »." },
    { q: "Comment bien faire un signe sous l’eau ?", c: ["Vite, dans son dos", "Bien visible devant le masque de l’autre, puis attendre la réponse", "En tapant sur la bouteille seulement", "En criant dans le détendeur"], a: 1, e: "Un signe doit être vu et compris. On attend toujours la réponse pour être sûr." },
    { q: "Le signe « réserve » se fait…", c: ["Poing fermé qui s’ouvre et se ferme devant la poitrine", "Pouce vers le bas", "Main sur la tête", "Deux doigts en V"], a: 0, e: "Il prévient que la réserve d’air est atteinte : la palanquée organise la remontée. (Le signe exact peut varier : vérifie au club.)" },
    { q: "Main à plat, paume vers le bas, qui reste immobile : c’est…", c: ["« Stop, on reste à cette profondeur »", "« On descend vite »", "« Plus d’air »", "« Ça va »"], a: 0, e: "C’est le signe de stabilisation : on reste à ce niveau." }
  ]
});

AA.content.module({
  id: "n1-physique", world: "n1", depth: "−5 m", icon: "gauge",
  title: "La pression, simplement",
  sub: "Pourquoi tout change en descendant",
  gen: ["n1pabs", "n1vol"],
  essentiel: `
<p>Une seule idée à retenir au N1 : <b>l’eau pèse</b>. Tous les 10 m, elle ajoute <b>1 bar</b>. En surface, l’air pèse déjà <b>1 bar</b>.</p>
<div class="tbl"><table><tr><th>Profondeur</th><th>Pression totale (absolue)</th><th>Volume d’un ballon de 1 L pris en surface</th></tr>
<tr><td>0 m</td><td>1 bar</td><td>1 L</td></tr>
<tr><td>10 m</td><td>2 bar</td><td>½ L</td></tr>
<tr><td>20 m</td><td>3 bar</td><td>⅓ L</td></tr></table></div>
<p>Quand la pression monte, <b>l’air se comprime</b> (il prend moins de place). Quand elle baisse, <b>il se dilate</b>. Cela explique presque tout :</p>
<ul>
<li>Les <b>oreilles et le masque</b> qu’il faut équilibrer en descendant.</li>
<li>Le <b>gilet</b> qui se dégonfle en descendant et regonfle en remontant : il faut le purger à la remontée.</li>
<li>Les <b>poumons</b> : on ne bloque jamais sa respiration en remontant.</li>
<li>L’<b>air de la bouteille</b> part plus vite en profondeur : à 20 m, chaque respiration en prend 3 fois plus qu’en surface.</li>
</ul>
<div class="callout ex"><span class="eyebrow">Exemple</span>À 10 m, la pression a doublé (1 → 2 bar). Entre 10 et 20 m, elle n’augmente que de moitié (2 → 3 bar). <b>C’est près de la surface que tout change le plus vite</b> : on y fait très attention à la remontée.</div>`,
  memo: [["La règle", "1 bar d’air + 1 bar tous les 10 m."], ["L’air", "Se comprime en descendant, se dilate en remontant."], ["Le gilet", "Purger en remontant."], ["La zone sensible", "Entre 0 et 10 m."]],
  moniteur: ["Dans quelles situations le gilet risque-t-il de m’entraîner vers la surface ?"],
  quiz: [
    { q: "Quelle est la pression totale (absolue) à 10 m en mer ?", c: ["1 bar", "2 bar", "10 bar", "0,5 bar"], a: 1, e: "1 bar d’air + 1 bar d’eau (10 m) = 2 bar." },
    { q: "Un ballon de 3 L en surface descend à 20 m. Son volume devient…", c: ["1 L", "1,5 L", "3 L", "9 L"], a: 0, e: "À 20 m la pression est de 3 bar, 3 fois plus qu’en surface : le volume est divisé par 3." },
    { q: "Pourquoi faut-il purger son gilet en remontant ?", c: ["Pour descendre plus vite", "L’air dedans se dilate et ferait remonter trop vite", "Pour économiser l’air", "Pour avoir moins froid"], a: 1, e: "En remontant, l’air du gilet prend de plus en plus de place : on remonterait de plus en plus vite. On purge pour garder une vitesse lente." },
    { q: "Où la pression change-t-elle le plus, en proportion ?", c: ["Entre 0 et 10 m", "Entre 10 et 20 m", "Au-delà de 30 m", "Partout pareil"], a: 0, e: "Entre 0 et 10 m elle double (1 → 2 bar). C’est la zone où il faut être le plus prudent." },
    { q: "À 20 m, ta consommation d’air comparée à la surface est…", c: ["la même", "2 fois plus forte", "3 fois plus forte", "plus faible"], a: 2, e: "À 20 m la pression vaut 3 bar : chaque inspiration contient 3 fois plus d’air." },
    { q: "Pourquoi ne jamais bloquer sa respiration en remontant ?", c: ["Ça fait perdre du temps", "L’air des poumons se dilate et peut les abîmer", "On a froid", "Ça fait descendre"], a: 1, e: "L’air dilaté n’aurait pas de sortie : c’est la surpression pulmonaire, un accident grave." },
    { q: "1 L d’air à 10 m remonté en surface devient…", c: ["0,5 L", "1 L", "2 L", "10 L"], a: 2, e: "On passe de 2 bar à 1 bar : la pression est divisée par 2, le volume double." },
    { q: "L’air que tu respires à 20 m est…", c: ["plus comprimé qu’en surface", "moins comprimé", "identique", "de l’oxygène pur"], a: 0, e: "Le détendeur te donne de l’air à la pression ambiante, ici 3 bar : il est 3 fois plus comprimé." }
  ]
});

AA.content.module({
  id: "n1-accidents", world: "n1", depth: "−8 m", icon: "cross",
  title: "Petits et grands soucis",
  sub: "Oreilles, masque, essoufflement, froid",
  essentiel: `
<p>Au N1 on apprend à <b>prévenir</b> et à <b>reconnaître</b> les problèmes les plus fréquents. À chaque fois : <b>je signale</b>, et on agit ensemble.</p>
<div class="tbl"><table><tr><th>Problème</th><th>Cause</th><th>Prévenir</th><th>Que faire ?</th></tr>
<tr><td>Douleur d’oreille</td><td>Pression non équilibrée</td><td>Équilibrer tôt et souvent</td><td>Remonter un peu, réessayer, ne jamais forcer</td></tr>
<tr><td>Douleur des sinus</td><td>Sinus bouchés (rhume)</td><td>Ne pas plonger enrhumé</td><td>Remonter un peu, arrêter si ça persiste</td></tr>
<tr><td>Masque qui serre (« plaquage »)</td><td>Air du masque comprimé</td><td>Souffler par le nez</td><td>Souffler un peu d’air dans le masque</td></tr>
<tr><td>Essoufflement</td><td>Effort, stress, froid, détendeur dur</td><td>Palmer calmement</td><td>S’arrêter, s’accrocher, expirer longuement, signaler</td></tr>
<tr><td>Froid</td><td>L’eau refroidit vite le corps</td><td>Bonne combinaison, plongée courte</td><td>Signaler, écourter la plongée</td></tr>
<tr><td>Surpression pulmonaire</td><td>Blocage de la respiration à la remontée</td><td>Ne jamais bloquer</td><td>Urgence : alerte, oxygène</td></tr></table></div>
<div class="callout trap"><span class="eyebrow">L’essoufflement</span>Il s’auto-entretient : plus on s’essouffle, plus on s’essouffle. La clé est d’<b>arrêter l’effort</b> et de <b>vider ses poumons longuement</b>. Puis on le signale : c’est le guide qui décide.</div>`,
  memo: [["Oreilles", "Tôt, souvent, doucement."], ["Essoufflé", "Stop, expirer longuement, signaler."], ["Froid", "Le signaler, on écourte."], ["Remontée", "Jamais bloquer sa respiration."]],
  moniteur: ["Que faire si je me sens essoufflé alors que le guide ne me voit pas ?"],
  quiz: [
    { q: "Tu es essoufflé sous l’eau. Que fais-tu en premier ?", c: ["Tu palmes plus fort pour rejoindre le guide", "Tu arrêtes l’effort et tu expires longuement", "Tu remontes très vite", "Tu retires ton détendeur"], a: 1, e: "On stoppe l’effort, on vide bien ses poumons, puis on signale « essoufflé ». La palanquée s’arrête avec toi." },
    { q: "Tu as un rhume et le nez bouché. Plonger est…", c: ["une bonne idée", "déconseillé : risque de douleurs aux sinus et aux oreilles", "obligatoire", "sans importance"], a: 1, e: "Sinus et trompes bouchés ne s’équilibrent pas : douleurs et blessures possibles." },
    { q: "Le masque te serre le visage. Remède ?", c: ["Souffler un peu par le nez dans le masque", "Le serrer davantage", "Remonter vite", "Le retirer"], a: 0, e: "C’est le plaquage de masque : l’air comprimé fait ventouse. Un peu d’air par le nez rééquilibre." },
    { q: "Quel accident grave est causé par une respiration bloquée à la remontée ?", c: ["La narcose", "La surpression pulmonaire", "L’essoufflement", "Le froid"], a: 1, e: "L’air qui se dilate dans des poumons fermés peut les déchirer : c’est une urgence vitale." },
    { q: "Tu commences à avoir froid. Que fais-tu ?", c: ["Rien, ça passera", "Tu le signales au guide", "Tu palmes très vite", "Tu descends plus profond"], a: 1, e: "Le froid fatigue et favorise d’autres soucis. On le signale, et le guide écourte la plongée." },
    { q: "Pourquoi l’essoufflement est-il dangereux ?", c: ["Il s’entretient tout seul et peut mener à la panique", "Il donne chaud", "Il fait descendre", "Il n’est pas dangereux"], a: 0, e: "On respire vite et mal, le gaz carbonique s’accumule, on respire encore plus vite… On casse le cercle en s’arrêtant et en expirant." },
    { q: "Ton oreille fait mal à 4 m malgré l’équilibrage. Tu…", c: ["continues en forçant", "remontes d’un mètre et réessaies doucement", "descends plus vite pour en finir", "n’en parles pas"], a: 1, e: "Moins de pression = équilibrage plus facile. Forcer peut abîmer le tympan." },
    { q: "Un détendeur qui « tire » (difficile à respirer) peut provoquer…", c: ["un essoufflement", "un coup de soleil", "une narcose", "rien du tout"], a: 0, e: "Respirer devient un effort : c’est une cause classique d’essoufflement. On le signale." }
  ]
});

AA.content.module({
  id: "n1-secu", world: "n1", depth: "−12 m", icon: "shield",
  title: "Plonger encadré en sécurité",
  sub: "Palanquée, panne d’air, remontée",
  essentiel: `
<p>Le plongeur <b>N1</b> (en général « plongeur encadré 20 m ») plonge <b>toujours avec un guide de palanquée</b>, jusqu’à <b>20 m</b>. <i>Prérogatives exactes : à vérifier avec ta fédération.</i></p>
<h3>La palanquée</h3>
<ul><li>C’est le petit groupe qui plonge ensemble, avec son guide. On reste <b>groupés</b>, à portée de vue et de main.</li>
<li>On regarde <b>régulièrement son manomètre</b> et on annonce sa pression au guide quand il le demande.</li></ul>
<h3>La panne d’air</h3>
<p>Elle se prévient : on vérifie son air avant et pendant la plongée. Si elle arrive : <b>signe « plus d’air »</b>, le guide ou un équipier te donne son <b>détendeur de secours</b>, et vous remontez ensemble, lentement.</p>
<h3>La remontée</h3>
<ul><li><b>Lente</b> : pas plus vite que les petites bulles (environ 10 à 15 m par minute selon les procédures).</li>
<li>On <b>purge son gilet</b> et on <b>respire normalement</b>.</li>
<li>Souvent un <b>palier de sécurité</b> de quelques minutes vers 3 à 5 m.</li></ul>
<div class="callout trap"><span class="eyebrow">Ne jamais</span>Remonter seul et vite, quitter la palanquée, bloquer sa respiration. En cas de doute : <b>signe, et on décide ensemble</b>.</div>`,
  memo: [["N1", "Encadré, jusqu’à 20 m (à vérifier selon fédération)."], ["Palanquée", "Groupés, à portée de vue et de main."], ["Panne d’air", "Signe, détendeur de secours, remontée ensemble."], ["Remontée", "Lente, gilet purgé, palier de sécurité."]],
  moniteur: ["Quelle vitesse de remontée et quel palier de sécurité applique-t-on au club ?", "Quelle est ma profondeur maximale exacte selon mon brevet ?"],
  quiz: [
    { q: "Un plongeur N1 plonge…", c: ["seul jusqu’à 40 m", "encadré par un guide, jusqu’à 20 m", "en autonomie jusqu’à 20 m", "sans limite"], a: 1, e: "Le N1 est un plongeur encadré, en général jusqu’à 20 m. Les détails exacts dépendent de la fédération." },
    { q: "Tu n’as plus d’air. Que fais-tu ?", c: ["Tu remontes seul très vite", "Signe « plus d’air », tu prends le détendeur de secours d’un équipier", "Tu retiens ton souffle", "Tu attends au fond"], a: 1, e: "Le partage d’air permet de remonter calmement ensemble. Remonter seul et vite est très dangereux." },
    { q: "Comment éviter la panne d’air ?", c: ["Regarder souvent son manomètre et annoncer sa pression", "Respirer le moins possible", "Plonger plus profond", "Ne jamais regarder son manomètre"], a: 0, e: "La panne d’air se prévient : on surveille son air et on prévient le guide à la réserve." },
    { q: "Quelle est la bonne vitesse de remontée pour un N1 ?", c: ["Le plus vite possible", "Lente, environ 10 à 15 m/min", "50 m/min", "Peu importe"], a: 1, e: "On remonte lentement, en général pas plus vite que les petites bulles. Ton club te précisera la valeur." },
    { q: "Pendant la remontée, l’air de ton gilet…", c: ["diminue", "se dilate : il faut le purger", "disparaît", "se refroidit seulement"], a: 1, e: "Sans purge, le gilet gonfle tout seul et la remontée s’accélère." },
    { q: "Qu’est-ce qu’une palanquée ?", c: ["Le bateau de plongée", "Le groupe de plongeurs qui plongent ensemble avec leur guide", "Un type de palme", "Le palier de sécurité"], a: 1, e: "La palanquée reste groupée du début à la fin de la plongée." },
    { q: "Tu perds de vue ta palanquée. Le réflexe le plus courant ?", c: ["Continuer seul", "Chercher brièvement, puis remonter lentement et attendre en surface", "Descendre plus bas", "Retirer son masque"], a: 1, e: "Consigne habituelle : un court tour d’horizon, puis remontée lente avec palier, et regroupement en surface. Vérifie la consigne de ton club." },
    { q: "Le palier de sécurité se fait souvent…", c: ["vers 3 à 5 m, quelques minutes", "à 20 m", "en surface", "jamais"], a: 0, e: "Un arrêt de quelques minutes près de la surface laisse le corps éliminer un peu d’azote. Bonne habitude." }
  ]
});

AA.content.module({
  id: "n1-milieu", world: "n1", depth: "−15 m", icon: "fish",
  title: "Le milieu et son respect",
  sub: "Faune, flore, bons gestes",
  essentiel: `
<p>On plonge chez les poissons : on y entre <b>en invité</b>.</p>
<ul>
<li><b>Ne rien toucher</b> : beaucoup d’animaux sont fragiles (gorgones, posidonies) ou se défendent (oursins, rascasses, vives, méduses).</li>
<li><b>Bien se stabiliser</b> : une palme qui racle le fond détruit en un instant ce qui a mis des années à pousser.</li>
<li><b>Ne rien prélever</b> et ne pas nourrir les animaux.</li>
<li><b>Ne pas poursuivre</b> les animaux : on observe, ils viennent parfois d’eux-mêmes.</li>
</ul>
<h3>Quelques rencontres en Méditerranée</h3>
<div class="tbl"><table><tr><th>Espèce</th><th>À savoir</th></tr>
<tr><td>Posidonie</td><td>Une plante à fleurs (pas une algue). Ses herbiers abritent la vie : protégés.</td></tr>
<tr><td>Rascasse</td><td>Immobile et camouflée. Épines venimeuses : on ne touche pas.</td></tr>
<tr><td>Mérou</td><td>Gros et curieux, protégé.</td></tr>
<tr><td>Poulpe</td><td>Change de couleur et de texture en un instant.</td></tr>
<tr><td>Oursin</td><td>Piquant : attention aux mains et aux genoux.</td></tr></table></div>
<div class="callout ex"><span class="eyebrow">Piqûre ou brûlure</span>On sort de l’eau, on prévient, et on suit les consignes du club (souvent : chaleur pour certains venins de poissons, ne pas frotter pour les méduses).</div>`,
  memo: [["Règle", "Ne rien toucher, ne rien prendre."], ["Stabilisation", "Pas de palme dans le fond."], ["Posidonie", "Plante à fleurs, protégée."], ["Rascasse", "Venimeuse, on observe."]],
  moniteur: ["Quelles espèces protégées peut-on voir sur nos sites ?"],
  quiz: [
    { q: "La posidonie est…", c: ["une algue", "une plante à fleurs", "un corail", "un poisson"], a: 1, e: "C’est une vraie plante, avec racines, feuilles et fleurs. Ses herbiers sont protégés." },
    { q: "Peut-on toucher une rascasse ?", c: ["Oui, elle est douce", "Non, ses épines sont venimeuses", "Oui si elle dort", "Seulement avec des gants"], a: 1, e: "Ses épines injectent un venin douloureux. On observe sans toucher." },
    { q: "Pourquoi bien se stabiliser près du fond ?", c: ["Pour ne pas abîmer la faune et la flore avec les palmes", "Pour aller plus vite", "Pour consommer plus", "Ce n’est pas utile"], a: 0, e: "Un coup de palme peut détruire en une seconde ce qui a mis des années à pousser." },
    { q: "Nourrir les poissons pendant la plongée est…", c: ["recommandé", "déconseillé : ça perturbe leur comportement", "obligatoire", "sans effet"], a: 1, e: "Cela change leurs habitudes et peut les rendre agressifs ou dépendants." },
    { q: "Le mérou en Méditerranée est…", c: ["protégé", "chassé librement", "dangereux", "un mammifère"], a: 0, e: "Le mérou brun est protégé sur de nombreuses côtes : c’est grâce à ça qu’on le revoit." },
    { q: "Le bon comportement face à un animal ?", c: ["Le poursuivre pour la photo", "L’observer calmement sans le gêner", "Le toucher pour voir s’il bouge", "Lui faire peur"], a: 1, e: "On observe à distance. Souvent, un plongeur calme voit plus de choses." }
  ]
});
