/* Abysse Academy · contenu FR · Aquarium personnel
   Chaque espèce arrive dans l'aquarium quand sa condition est remplie
   (mêmes conditions que les trophées, voir js/core/game.js G.cond).
   shape : forme dessinée par js/ui/creatures.js ; c : [corps, motif, nageoires].
   Les anecdotes sont écrites pour l'appli : simples, à vérifier en sortie bio. */
AA.content.addCreatures([
  { id: "castagnole", name: "Castagnole", shape: "damsel", c: ["#5B4A3A", "#3B2E24", "#2B6FD6"], test: { k: "modulesDone", n: 1 }, how: "Terminer un premier thème", fact: "Toujours en petits groupes au-dessus des roches. Les jeunes sont d’un bleu électrique, les adultes brun foncé." },
  { id: "girelle", name: "Girelle", shape: "wrasse", c: ["#E8763A", "#2BA8C8", "#F3C64A"], test: { k: "read", n: 3 }, how: "Lire 3 cours", fact: "Elle peut changer de sexe et de couleurs au cours de sa vie. La nuit, elle s’enfouit dans le sable pour dormir." },
  { id: "saupe", name: "Saupe", shape: "wrasse", c: ["#9DB3BD", "#E6B93C", "#7E95A0"], test: { k: "combo", n: 5 }, how: "Combo ×5", fact: "Un poisson brouteur : il mange les algues en bancs serrés. Repère ses fines lignes dorées." },
  { id: "oblade", name: "Oblade", shape: "bream", c: ["#B8C4CC", "#14202A", "#8C9BA5"], test: { k: "flash", n: 30 }, how: "Revoir 30 flashcards", fact: "La tache noire au bout de la queue la trahit. Elle nage souvent en pleine eau, près de la surface." },
  { id: "sar", name: "Sar commun", shape: "fish", c: ["#C9D2D8", "#3A4650", "#9AA6AE"], test: { k: "streak", n: 3 }, how: "3 jours d’affilée", fact: "Des bandes verticales sombres et une tache près de la queue. Curieux, il suit parfois les plongeurs qui remuent le sable." },
  { id: "etoile", name: "Étoile de mer rouge", shape: "star", c: ["#D9402B", "#F6A07C", "#D9402B"], test: { k: "deep", n: 2 }, how: "Lire 2 parties « Approfondir »", fact: "Elle peut refaire un bras perdu. Elle se déplace grâce à des centaines de petits pieds sous son corps." },
  { id: "flabelline", name: "Flabelline", shape: "nudi", c: ["#B56CD6", "#F08A3C", "#E7D2F5"], test: { k: "stars", m: "pression", n: 3 }, how: "3 étoiles sur Pression", fact: "Une limace de mer violette. Certaines de ses cousines gardent les cellules urticantes des proies qu’elles mangent pour se défendre." },
  { id: "hippocampe", name: "Hippocampe", shape: "seahorse", c: ["#D9A441", "#9C6B1E", "#F2D38A"], test: { k: "worldStars", w: "n2", n: 4 }, how: "1 étoile sur 4 thèmes N2", fact: "C’est le mâle qui porte les œufs dans une poche ventrale jusqu’à l’éclosion. Il s’accroche aux herbiers avec sa queue." },
  { id: "rascasse", name: "Rascasse", shape: "scorpion", c: ["#B7472A", "#6E2A1A", "#D9785C"], test: { k: "rescued", n: 5 }, how: "Rattraper 5 erreurs", fact: "Maîtresse du camouflage, immobile sur la roche. Ses épines sont venimeuses : on regarde, on ne touche pas." },
  { id: "poulpe", name: "Poulpe", shape: "octopus", c: ["#C0704E", "#8E4630", "#C0704E"], test: { k: "daily", n: 3 }, how: "Faire 3 sessions du jour", fact: "Trois cœurs, un sang bleuté, et une peau qui change de couleur et de texture en une fraction de seconde." },
  { id: "pelagie", name: "Pélagie", shape: "jelly", c: ["#D58FD0", "#F2B8EE", "#FFE2FB"], test: { k: "apnee", n: 8 }, how: "8 bonnes réponses en apnée", fact: "Méduse qui pique, fréquente certains étés. Elle peut briller dans le noir quand on la dérange." },
  { id: "murene", name: "Murène", shape: "moray", c: ["#6B4A2E", "#F0D27A", "#4A3220"], test: { k: "scenAll" }, how: "Réussir tous les scénarios", fact: "Elle ouvre et ferme la bouche pour faire passer l’eau sur ses branchies : ce n’est pas une menace. Garde quand même tes doigts loin de son trou." },
  { id: "corb", name: "Corb", shape: "fish", c: ["#6A4C2C", "#3E2A16", "#2A1B0E"], test: { k: "five", n: 3 }, how: "Finir 3 sessions « 5 minutes »", fact: "Il produit des sons en faisant vibrer sa vessie natatoire. Espèce fragile, protégée en France par un moratoire de pêche." },
  { id: "girellepaon", name: "Girelle paon", shape: "wrasse", c: ["#2FA37A", "#3A6FD8", "#F07A3A"], test: { k: "gloss", n: 10 }, how: "Ouvrir 10 mots du glossaire", fact: "Couleurs vives de récif tropical, pourtant bien présente en Méditerranée. Signe d’eaux qui se réchauffent dans le nord du bassin." },
  { id: "denti", name: "Denti", shape: "fish", c: ["#C3B6C8", "#7B6A80", "#A797AE"], test: { k: "accuracy", n: 75, min: 60 }, how: "75 % de réussite (60 réponses min.)", fact: "Un prédateur argenté qui chasse en pleine eau. Il passe souvent vite, en lisière du bleu." },
  { id: "araignee", name: "Araignée de mer", shape: "crab", c: ["#B8563A", "#E6C79A", "#9A4128"], test: { k: "table" , n: 1 }, how: "Saisir une ligne de table", fact: "Elle se camoufle en collant des algues et des éponges sur sa carapace. Ses longues pattes la rendent très lente." },
  { id: "eponge", name: "Éponge", shape: "sponge", c: ["#E0A63A", "#8C5E14", "#C88A22"], test: { k: "validated", n: 2 }, how: "Valider 2 thèmes avec ton moniteur", fact: "C’est un animal ! Elle filtre des milliers de litres d’eau par jour pour se nourrir." },
  { id: "congre", name: "Congre", shape: "conger", c: ["#5D6B73", "#C9D2D8", "#3E4950"], test: { k: "boxes", box: 3, n: 20 }, how: "20 cartes en boîte 3 ou plus", fact: "Plus grand que la murène, sans écailles, gris uni. Il aime les épaves et sort surtout la nuit." },
  { id: "barracuda", name: "Barracuda", shape: "barracuda", c: ["#AFC0CC", "#3F5562", "#8FA2AF"], test: { k: "exam", min: 15 }, how: "15/20 à un examen blanc", fact: "En Méditerranée, il tourne en bancs immobiles en pleine eau. Impressionnant, mais pas dangereux pour le plongeur." },
  { id: "merou", name: "Mérou brun", shape: "grouper", c: ["#6B4E32", "#E8D8B0", "#4E3622"], test: { k: "boss", w: "n2" }, how: "Vaincre le Gardien des 40 mètres", fact: "Il peut vivre plus de 50 ans. Protégé en France depuis des années, il est redevenu curieux des plongeurs." },
  { id: "torpille", name: "Raie torpille", shape: "ray", c: ["#B89A6A", "#3A2A1A", "#8C7450"], test: { k: "story", n: 1 }, how: "Finir une aventure", fact: "Elle peut envoyer une décharge électrique pour se défendre ou assommer une proie. Posée sur le sable, elle se laisse oublier." },
  { id: "tortue", name: "Tortue caouanne", shape: "turtle", c: ["#8A6A3A", "#4E3A1E", "#A88A58"], test: { k: "level", n: 8 }, how: "Atteindre le niveau 8", fact: "Elle respire de l’air : au repos, elle peut rester longtemps sous l’eau. On ne la touche pas, on ne la suit pas de trop près." },
  { id: "poissonlune", name: "Poisson-lune", shape: "sunfish", c: ["#9BAAB4", "#6C7A84", "#B8C4CC"], test: { k: "answers", n: 1000 }, how: "Répondre à 1 000 questions", fact: "Le plus lourd des poissons osseux. Il vient parfois se faire nettoyer près de la surface par d’autres poissons." },
  { id: "manta", name: "Raie des îles", shape: "ray", c: ["#2E3C4A", "#EAF2F6", "#1E2832"], test: { k: "boss", w: "e1" }, how: "Vaincre la Raie des îles", fact: "Le trophée des initiateurs. Une grande raie qui plane au-dessus des tombants, comme en vol." }
]);

/* Décors : on les place où on veut dans l'aquarium (mode « Décorer »).
   kind : dessin dans js/views/aquarium.js. how : comment l'obtenir. */
AA.content.addDecor([
  { id: "sable", kind: "shells", name: "Coquillages", how: "Dès le départ", test: { k: "modulesDone", n: 0 } },
  { id: "rocher", kind: "rock", name: "Rochers", how: "Niveau 2", test: { k: "level", n: 2 } },
  { id: "posidonie", kind: "grass", name: "Herbier de posidonie", how: "Niveau 3", test: { k: "level", n: 3 } },
  { id: "gorgone", kind: "gorgon", name: "Gorgone rouge", how: "Niveau 5", test: { k: "level", n: 5 } },
  { id: "amphore", kind: "amphora", name: "Amphore", how: "10/20 ou plus à un examen", test: { k: "exam", min: 10 } },
  { id: "ancre", kind: "anchor", name: "Vieille ancre", how: "Vaincre un boss", test: { k: "bossAny", n: 1 } },
  { id: "epave", kind: "wreck", name: "Épave", how: "Niveau 10", test: { k: "level", n: 10 } },
  { id: "coffre", kind: "chest", name: "Coffre", how: "3 étoiles partout en N2", test: { k: "worldStars", w: "n2", n: "all", min: 3 } },
  { id: "anemone", kind: "anemone", name: "Anémone", how: "Niveau 2", test: { k: "level", n: 2 } },
  { id: "bulleur", kind: "bubbler", name: "Diffuseur de bulles", how: "Niveau 3", test: { k: "level", n: 3 } },
  { id: "oursins", kind: "urchins", name: "Oursins", how: "3 jours d’affilée", test: { k: "streak", n: 3 } },
  { id: "corail", kind: "coral", name: "Corail cerveau", how: "Niveau 4", test: { k: "level", n: 4 } },
  { id: "lanterne", kind: "lantern", name: "Lanterne", how: "3 sessions « 5 minutes »", test: { k: "five", n: 3 } },
  { id: "colonne", kind: "column", name: "Colonne antique", how: "Finir une aventure", test: { k: "story", n: 1 } },
  { id: "benitier", kind: "clam", name: "Bénitier", how: "300 réponses", test: { k: "answers", n: 300 } },
  { id: "scaphandre", kind: "helmet", name: "Casque de scaphandrier", how: "Niveau 6", test: { k: "level", n: 6 } },
  { id: "laminaires", kind: "kelp", name: "Laminaires géantes", how: "Niveau 7", test: { k: "level", n: 7 } },
  { id: "arche", kind: "arch", name: "Arche rocheuse", how: "Niveau 8", test: { k: "level", n: 8 } },
  { id: "statue", kind: "statue", name: "Statue engloutie", how: "Vaincre 2 boss", test: { k: "bossAny", n: 2 } },
  { id: "phare", kind: "lighthouse", name: "Petit phare", how: "Niveau 9", test: { k: "level", n: 9 } }
]);

/* Fonds d'aquarium et sols, débloqués avec le niveau. */
AA.content.aquaBgs = [
  { id: "med", name: "Méditerranée", lvl: 1 }, { id: "lagon", name: "Lagon", lvl: 2 }, { id: "sunset", name: "Coucher de soleil", lvl: 4 },
  { id: "grotte", name: "Grotte", lvl: 6 }, { id: "recif", name: "Récif tropical", lvl: 8 }, { id: "abysse", name: "Abysses", lvl: 10 }
];
AA.content.aquaFloors = [{ id: "sand", name: "Sable fin", lvl: 1 }, { id: "pebble", name: "Galets", lvl: 3 }, { id: "black", name: "Sable volcanique", lvl: 6 }];
/* Taille de l'aquarium selon le niveau : nombre d'habitants visibles et bonus. */
AA.content.aquaTiers = [
  { lvl: 1, name: "Bocal", max: 4, size: .8 }, { lvl: 3, name: "Aquarium", max: 8, size: .9 }, { lvl: 5, name: "Grand bac", max: 12, size: 1 },
  { lvl: 7, name: "Lagon privé", max: 18, size: 1.1 }, { lvl: 9, name: "Océan", max: 99, size: 1.2 }
];
