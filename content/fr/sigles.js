/* =====================================================================
   Abysse Academy 2.6.1 · sigles et abréviations
   Chaque sigle employé dans une question, une réponse ou une explication
   est développé ici : [sigle affiché, motif de recherche, forme
   développée, la notion en une phrase]. Affiché dans « De quoi parle la
   question ? » avant la correction, et dans « Explique-moi ».
   tests/content.test.js échoue si un sigle des questions n'est pas ici.
   ===================================================================== */
(function () {
  "use strict";
  const C = window.AA.content;
  C.sigles = [
    ["ADD", "\\bADD\\b", "Accident de désaturation (on dit aussi accident de décompression)", "Des bulles d’azote se forment dans le corps pendant ou après la remontée. Signes possibles : fatigue, douleurs, fourmillements, troubles neurologiques. C’est une urgence : oxygène et alerte."],
    ["DP", "\\bDP\\b", "Directeur de plongée", "Le responsable de l’organisation et de la sécurité de la plongée : il compose les palanquées, fixe les paramètres et organise les secours."],
    ["MOD", "\\bMOD\\b", "Profondeur maximale d’utilisation (Maximum Operating Depth)", "La profondeur à ne pas dépasser avec un mélange, pour que la pression partielle d’oxygène reste sous la limite choisie."],
    ["PpO₂", "\\bPp ?O[₂2]", "Pression partielle d’oxygène", "La part de la pression totale due à l’oxygène : pression absolue × proportion d’oxygène. Trop haute, elle devient toxique."],
    ["PpN₂", "\\bPp ?N[₂2]", "Pression partielle d’azote", "La part de la pression totale due à l’azote : elle règle la narcose et la quantité d’azote dissoute dans le corps."],
    ["FO₂", "\\bFO[₂2]", "Fraction d’oxygène", "La proportion d’oxygène dans le mélange, écrite en décimal (0,21 pour l’air, 0,32 pour un nitrox 32)."],
    ["FN₂", "\\bFN[₂2]", "Fraction d’azote", "La proportion d’azote dans le mélange, écrite en décimal (environ 0,79 pour l’air)."],
    ["CO₂", "\\bCO[₂2]", "Dioxyde de carbone (gaz carbonique)", "Le gaz produit par le corps, surtout à l’effort. S’il s’accumule (respiration courte, effort), il déclenche l’essoufflement."],
    ["CO", "\\bCO\\b(?![₂2])", "Monoxyde de carbone", "Un gaz toxique sans odeur (par exemple des gaz d’échappement aspirés par un compresseur) : il prend la place de l’oxygène dans le sang."],
    ["Pp", "\\bPp ?(?:CO|[A-Z])", "Pression partielle", "La part de la pression totale due à un seul gaz du mélange : pression absolue × proportion de ce gaz (loi de Dalton)."],
    ["PLS", "\\bPLS\\b", "Position latérale de sécurité", "On couche sur le côté une victime inconsciente qui respire, pour garder ses voies aériennes libres."],
    ["RIFAP", "\\bRIFAP\\b", "Réactions et intervention face à un accident de plongée", "La qualification secourisme du plongeur : alerter, sortir la victime de l’eau, donner l’oxygène, ranimer si besoin."],
    ["NDL", "\\bNDL\\b", "Limite sans palier (No Decompression Limit)", "Le temps qu’il reste à une profondeur avant de devoir faire des paliers obligatoires."],
    ["VHF", "\\bVHF\\b", "Radio marine (Very High Frequency)", "La radio du bateau : le canal 16 sert à appeler les secours en mer."],
    ["CROSS", "\\bCROSS\\b", "Centre régional opérationnel de surveillance et de sauvetage", "Il coordonne les secours en mer. On le joint par la VHF (canal 16) ou au 196."],
    ["CMAS", "\\bCMAS\\b", "Confédération mondiale des activités subaquatiques", "La fédération internationale : ses brevets permettent de faire reconnaître son niveau à l’étranger."],
    ["FFESSM", "\\bFFESSM\\b", "Fédération française d’études et de sports sous-marins", "La fédération qui délivre les niveaux N1 à N4, les brevets d’encadrant et le RIFAP."],
    ["ANMP", "\\bANMP\\b", "Association nationale des moniteurs de plongée", "Un réseau de moniteurs professionnels qui délivre aussi ses propres niveaux."],
    ["MP", "\\bMP\\b", "Moyenne pression", "La pression intermédiaire entre le premier étage du détendeur et le deuxième étage (et l’inflateur)."],
    ["HP", "\\bHP\\b", "Haute pression", "La pression du bloc, lue au manomètre branché sur la sortie HP du premier étage."],
    ["PS", "\\bPS\\b", "Pression de service", "La pression de gonflage normale du bloc, gravée sur l’ogive."],
    ["PA / PE", "\\bP[AE](?:\\d{2})?\\b", "Aptitudes : plongée autonome (PA) ou encadrée (PE)", "Le nombre qui suit donne la profondeur maximale en mètres : PE40 = encadré jusqu’à 40 m, PA20 = autonome jusqu’à 20 m."],
    ["MN90", "\\bMN90\\b", "Tables de la Marine nationale (version 1990)", "Les tables de décompression utilisées dans l’enseignement fédéral pour calculer paliers et durée de remontée."],
    ["DIN", "\\bDIN\\b", "Raccord DIN", "Le détendeur se visse dans le robinet du bloc (par opposition au raccord à étrier)."],
    ["RC", "\\bRC\\b", "Responsabilité civile", "L’assurance qui couvre les dommages que tu causes aux autres."],
    ["EAD", "\\bEAD\\b", "Équivalent air en profondeur", "La profondeur à laquelle l’air donnerait la même pression d’azote que le nitrox utilisé : elle sert à utiliser des tables à l’air."],
    ["RCP", "\\bRCP\\b", "Réanimation cardio-pulmonaire", "Compressions thoraciques et insufflations pour une victime en arrêt cardiaque, en attendant le défibrillateur et les secours."],
    ["FOP", "\\bFOP\\b", "Foramen ovale perméable", "Une petite communication entre les deux oreillettes du cœur, qui peut laisser passer des bulles et favoriser certains ADD."],
    ["BAVU", "\\bBAVU\\b", "Ballon autoremplisseur à valve unidirectionnelle", "Un ballon avec masque pour insuffler de l’air ou de l’oxygène à une victime qui ne respire pas."],
    ["GF", "\\bGF\\b", "Facteurs de gradient (Gradient Factors)", "Le réglage de prudence de certains ordinateurs : plus les valeurs sont basses, plus la décompression est prudente."],
    ["GPS", "\\bGPS\\b", "Positionnement par satellite", "Il donne la position exacte du bateau ou du site, utile pour l’alerte."],
    ["DAE", "\\bDAE\\b", "Défibrillateur automatisé externe", "L’appareil qui analyse le cœur et délivre un choc si besoin. Il guide le sauveteur à la voix."],
    ["DTR", "\\bDTR\\b", "Durée totale de remontée", "Le temps qu’il faut pour revenir en surface, paliers compris."],
    ["TIV", "\\bTIV\\b", "Technicien en inspection visuelle", "Un plongeur formé pour inspecter chaque année l’intérieur et l’extérieur des blocs du club."],
    ["SAMU", "\\bSAMU\\b", "Service d’aide médicale urgente", "Les secours médicaux, joignables au 15 (ou au 112)."],
    ["SNC", "\\bSNC\\b", "Système nerveux central", "Le cerveau et la moelle épinière."],
    ["CAT", "\\bCAT\\b", "Conduite à tenir", "Ce qu’il faut faire, dans l’ordre, face à un incident ou un accident."],
    ["NO FLY", "\\bNO FLY\\b", "Interdiction de vol", "Le temps à attendre après la plongée avant de prendre l’avion (la pression en cabine est plus basse)."],
    ["SAFETY STOP", "\\bSAFETY STOP\\b", "Palier de sécurité", "Une pause de quelques minutes vers 3 à 5 m avant de faire surface, même quand aucun palier n’est obligatoire."]
  ];
  /* Mots en capitales qui ne sont pas des sigles (insistance, signes). */
  C.siglesOk = ["OK", "PAS", "ET", "NE", "NON", "OUI", "SAUF", "FAUX", "VRAI", "JAMAIS", "TOUJOURS", "NO", "FLY", "SAFETY", "STOP", "PA", "PE"];
})();
