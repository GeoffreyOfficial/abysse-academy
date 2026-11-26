/* Abysse Academy · contenu FR · Mondes de la carte
   Pour ajouter un monde : un AA.content.world({...}), puis un fichier de
   modules avec world:"<id>". soon:true affiche le monde comme « bientôt ».
   color : nom d'un jeton CSS (tokens.css). */
AA.content.world({ id: "decouverte", order: 0, short: "Découverte", title: "Découverte · Le lagon", sub: "Avant le premier brevet : baptême, matériel, oreilles.", icon: "wave", color: "--world-dec", unlock: null, surface: "Plage · 0 m",
  boss: { name: "Le Poulpe malicieux", depth: "−4 m", creature: "octopus", intro: "Un petit poulpe te met au défi : as-tu retenu les bases de ta première plongée ?", win: "Le poulpe change de couleur, bluffé. Le monde N1 est ouvert.", n: 10, hp: 7 } });
AA.content.world({ id: "n1", order: 1, short: "N1", title: "Niveau 1 · La crique", sub: "Plongeur encadré : signes, pression, sécurité, milieu.", icon: "hand", color: "--world-n1", unlock: { world: "decouverte", all: true }, surface: "Crique · 0 m",
  boss: { name: "Le Crabe des rochers", depth: "−20 m", creature: "crab", intro: "Un crabe géant garde le passage vers le large. Signes, pression, sécurité : montre que tu es prêt pour le N2.", win: "Le crabe recule de côté. Le monde N2 est ouvert.", n: 14, hp: 10 } });
AA.content.world({ id: "n2", order: 2, short: "N2", title: "Niveau 2 · La descente", sub: "Écrit N2 et autonomie PA20 : de la surface à −40 m.", icon: "dive", color: "--world-n2", unlock: { world: "n1", all: true }, surface: "Surface · 0 m",
  boss: { name: "Le Gardien des 40 mètres", depth: "−45 m", creature: "grouper", intro: "Un mérou immense garde l’entrée du grand bleu. Pour passer, prouve que tu maîtrises tout le N2 : physique, physiologie, calculs, règles et autonomie.", win: "Le Gardien s’écarte lentement. Les mondes RIFAP et N3 sont ouverts.", n: 22, hp: 16 } });
AA.content.world({ id: "rifap", order: 3, short: "RIFAP", title: "RIFAP · Les récifs", sub: "Réagir face à un accident de plongée.", icon: "buoy", color: "--world-rifap", unlock: { world: "n2", boss: true },
  boss: { name: "La Murène du récif", depth: "Récif 5", creature: "moray", intro: "Au fond du récif, la murène attend. Alerte, oxygène, gestes : montre que tu sais réagir sans hésiter.", win: "La murène retourne dans son trou. Le monde Initiateur est ouvert.", n: 16, hp: 12 } });
AA.content.world({ id: "nitrox", order: 4, short: "Nitrox", title: "Nitrox · Le plateau", sub: "Plonger avec plus d’oxygène : MOD, EAD, analyse.", icon: "mol", color: "--world-nx", unlock: { world: "n2", all: true } });
AA.content.world({ id: "n3", order: 5, short: "N3", title: "Niveau 3 · Le tombant", sub: "Autonome jusqu’à 60 m : gaz, déco avancée, ADD, matériel.", icon: "compass", color: "--world-n3", unlock: { world: "n2", boss: true }, surface: "Tombant · 20 m",
  boss: { name: "Le Congre de l’épave", depth: "−60 m", creature: "conger", intro: "Au pied du tombant, un congre sort de l’épave. Narcose, oxygène, décompression : garde la tête froide.", win: "Le congre rentre dans l’épave. Le monde N4 est ouvert.", n: 16, hp: 12 } });
AA.content.world({ id: "e1", order: 6, short: "E1", title: "Initiateur · Les îles", sub: "Apprendre à transmettre, sans perdre tes bases.", icon: "teach", color: "--world-e1", unlock: { world: "rifap", boss: true },
  boss: { name: "La Raie des îles", depth: "Île 6", creature: "ray", intro: "Une raie manta tourne autour de l’île. Prouve que tu sais préparer, conduire et sécuriser une séance.", win: "La raie t’ouvre le passage. Avec le N4, le monde E2 t’attend.", n: 16, hp: 12 } });
AA.content.world({ id: "n4", order: 7, short: "N4", title: "N4 · Guide de palanquée", sub: "Conduire et sécuriser une palanquée.", icon: "users", color: "--world-n4", unlock: { world: "n3", all: true },
  boss: { name: "Le Barracuda du large", depth: "−40 m", creature: "barracuda", intro: "Un banc de barracudas tourne autour de ta palanquée. Rôle du guide, gestion de l’air, assistance : garde tout le monde en sécurité.", win: "Le banc s’écarte. Le monde E2 est ouvert.", n: 14, hp: 10 } });
AA.content.world({ id: "e2", order: 8, short: "E2", title: "E2 · Le grand bleu", sub: "Enseigner jusqu’à 20 m.", icon: "teach", color: "--world-e2", unlock: { world: "n4", all: true },
  boss: { name: "Le Poisson-lune", depth: "−20 m", creature: "sunfish", intro: "Un poisson-lune immense observe ta séance. Objectif, démonstration, sécurité : enseigne comme un pro.", win: "Le poisson-lune repart vers le large. Tu as parcouru toute l’appli : bravo !", n: 12, hp: 9 } });

/* Points que l'appli présente comme hypothèses : à faire confirmer. */
AA.content.setValidate([
  ["Format de l’écrit N2", "Nombre de questions, durée, calculatrice, barème. L’examen blanc ici est une hypothèse (QCM + calculs)."],
  ["Tables", "Version utilisée, procédures particulières, délai avant l’avion. Saisis ta propre table dans l’atelier."],
  ["Réglementation", "Âges, taille des palanquées, matériel exigé en autonomie, certificat médical."],
  ["Matériel", "Fréquences d’inspection et de requalification des blocs."],
  ["Secours", "Protocole du club : oxygène, eau, aspirine, alerte."],
  ["Initiateur et E2", "Conditions d’accès, prérogatives, contenu de formation."],
  ["Prérogatives des niveaux", "Profondeurs et conditions du N1, N3, N4 et E2 citées ici : à vérifier sur les textes de ta fédération."],
  ["Nitrox", "Pp O₂ maximale retenue (1,4 ou 1,6 bar), analyse et matériel compatible oxygène."],
  ["Simulateur", "Modèle pédagogique simplifié, seuils choisis pour l’exemple."],
  ["Valeurs simplifiées", "Air 21 % / 79 %, 1 bar par 10 m, eau de mer 1,03."]
]);
