/* Abysse Academy · contenu FR · Mondes de la carte
   Pour ajouter un monde : un AA.content.world({...}), puis un fichier de
   modules avec world:"<id>". soon:true affiche le monde comme « bientôt ».
   color : nom d'un jeton CSS (tokens.css). */
AA.content.world({ id: "n2", order: 1, short: "N2", title: "Niveau 2 · La descente", sub: "Écrit N2 et autonomie PA20 : de la surface à −40 m.", icon: "dive", color: "--world-n2", unlock: null, surface: "Surface · 0 m" });
AA.content.world({ id: "rifap", order: 2, short: "RIFAP", title: "RIFAP · Les récifs", sub: "Réagir face à un accident de plongée.", icon: "buoy", color: "--world-rifap", unlock: { world: "n2", count: 5 } });
AA.content.world({ id: "e1", order: 3, short: "E1", title: "Initiateur · Les îles", sub: "Apprendre à transmettre, sans perdre tes bases.", icon: "teach", color: "--world-e1", unlock: { world: "rifap", all: true } });
AA.content.world({ id: "abysses", order: 4, short: "N3 → E2", title: "Les abysses · N3, N4, E2", sub: "Décompression avancée, guide de palanquée, enseignement jusqu’à 20 m. Prochaine extension.", icon: "compass", color: "--world-e2", soon: true });

/* Parcours réel affiché dans le profil. here:true = étape en cours. */
AA.content.setRoadmap([
  { t: "N1 (ANMP)", d: "Acquis.", done: true },
  { t: "N2 · en cours", d: "PE40 et PA20. Monde N2 de la carte.", here: true },
  { t: "RIFAP", d: "Secourisme spécifique plongée, souvent demandé pour avancer." },
  { t: "Initiateur (E1)", d: "Enseigner en zone 0 à 6 m. Conditions d’accès à confirmer." },
  { t: "N3", d: "Autonomie jusqu’à 60 m, théorie plus poussée." },
  { t: "N4 · Guide de palanquée", d: "Guider jusqu’à 40 m." },
  { t: "E2 · objectif", d: "Hypothèse courante : initiateur + N4. Enseigner jusqu’à 20 m." }
]);

/* Points que l'appli présente comme hypothèses : à faire confirmer. */
AA.content.setValidate([
  ["Format de l’écrit N2", "Nombre de questions, durée, calculatrice, barème. L’examen blanc ici est une hypothèse (QCM + calculs)."],
  ["Tables", "Version utilisée, procédures particulières, délai avant l’avion. Saisis ta propre table dans l’atelier."],
  ["Réglementation", "Âges, taille des palanquées, matériel exigé en autonomie, certificat médical."],
  ["Matériel", "Fréquences d’inspection et de requalification des blocs."],
  ["Secours", "Protocole du club : oxygène, eau, aspirine, alerte."],
  ["Initiateur et E2", "Conditions d’accès, prérogatives, contenu de formation."],
  ["Simulateur", "Modèle pédagogique simplifié, seuils choisis pour l’exemple."],
  ["Valeurs simplifiées", "Air 21 % / 79 %, 1 bar par 10 m, eau de mer 1,03."]
]);
