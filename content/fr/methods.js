/* Abysse Academy · contenu FR · Méthodes pas à pas
   Affichées sous la correction (« Comprendre pas à pas ») pour expliquer le
   POURQUOI de chaque étape d'un calcul. Une méthode s'applique à une question :
   - gen : générateurs de calculs (content/fr/generators.js) ;
   - re  : expression cherchée dans le texte de la question, avec m (modules).
   steps : les étapes, dans l'ordre ; tip : astuce pour retenir. */
AA.content.methods = [
  { id: "pabs", title: "Pression absolue et profondeur", gen: ["pabs", "prof"], m: ["pression"], re: "pression absolue|bar.*profondeur|profondeur.*bar|absolue",
    steps: [
      "En surface, tu as déjà <b>1 bar</b> sur toi : c’est le poids de l’air (pression atmosphérique).",
      "L’eau ajoute <b>1 bar tous les 10 m</b>. Pression de l’eau (relative) = profondeur ÷ 10.",
      "Pression absolue = <b>1 (l’air) + profondeur ÷ 10 (l’eau)</b>. Exemple : à 20 m, 1 + 2 = 3 bar.",
      "Dans l’autre sens (on connaît la pression absolue) : on <b>retire d’abord le 1 bar de l’air</b>, car il ne correspond à aucun mètre d’eau. Il reste la pression de l’eau.",
      "Puis profondeur = pression de l’eau × 10. Exemple : 3,5 bar absolu − 1 = 2,5 bar d’eau, × 10 = 25 m."
    ], tip: "Absolue = air + eau. Pour retrouver des mètres, on enlève l’air (−1), puis × 10." },
  { id: "alti", title: "Plonger en altitude", gen: ["alti"], m: ["pression"], re: "altitude|lac",
    steps: [
      "En montagne, il y a moins d’air au-dessus de toi : la pression en surface est <b>inférieure à 1 bar</b> (environ 0,8 bar vers 2 000 m).",
      "L’eau, elle, ajoute toujours 1 bar tous les 10 m.",
      "Pression absolue = pression en surface du lac + profondeur ÷ 10.",
      "Comme la surface est plus faible, les variations de pression sont plus fortes en proportion : c’est pour ça que les procédures de déco changent en altitude."
    ], tip: "Remplace le « 1 » de la mer par la pression du lac." },
  { id: "mariotte", title: "Loi de Mariotte (volume et pression)", gen: ["ballon", "descente"], m: ["mariotte"], re: "volume|ballon|parachute|poumon|gilet|stab",
    steps: [
      "À température constante, un gaz enfermé se comprime quand la pression monte, et se dilate quand elle baisse.",
      "La règle : <b>P1 × V1 = P2 × V2</b> (pression × volume reste constant).",
      "On utilise toujours la <b>pression absolue</b> (avec le +1 de l’air), jamais la pression de l’eau seule.",
      "Calcule P1 et P2 en absolu, puis V2 = P1 × V1 ÷ P2.",
      "Exemple : 6 L à 20 m (3 bar) remontés en surface (1 bar) : 3 × 6 ÷ 1 = 18 L. Le volume triple !"
    ], tip: "Pressions TOUJOURS en absolu. Plus on remonte, plus ça gonfle." },
  { id: "conso", title: "Consommation et autonomie", gen: ["conso", "autonomie"], m: ["mariotte"], re: "autonomie|consomm|bloc|réserve|litres",
    steps: [
      "Air disponible dans le bloc = volume du bloc (L) × pression utilisable (bar). Pression utilisable = pression du bloc − réserve.",
      "Au fond, tu respires de l’air à la pression ambiante : ta consommation est <b>multipliée par la pression absolue</b>.",
      "Consommation au fond (L/min) = consommation en surface × pression absolue.",
      "Durée possible (min) = air disponible ÷ consommation au fond.",
      "Exemple : bloc 15 L à 200 bar, réserve 50 bar → 15 × 150 = 2 250 L. À 20 m (3 bar), 20 L/min × 3 = 60 L/min. 2 250 ÷ 60 ≈ 37 min."
    ], tip: "Air dispo = V × (P − réserve). Conso fond = conso surface × P abs." },
  { id: "archimede", title: "Flottabilité (Archimède)", gen: ["lest", "relevage"], m: ["archimede"], re: "lest|flott|poussée|poids apparent|relevage|parachute",
    steps: [
      "Un objet dans l’eau est poussé vers le haut par une force égale au <b>poids de l’eau qu’il déplace</b> (la poussée d’Archimède).",
      "Poussée (kg) = volume de l’objet (L) × densité de l’eau (1 en eau douce, environ 1,03 en mer).",
      "Poids apparent = poids réel − poussée. Positif : il coule. Négatif : il flotte. Zéro : il est équilibré.",
      "Pour équilibrer, on ajoute du lest (si ça flotte) ou du volume d’air (si ça coule) égal au poids apparent.",
      "En mer l’eau est plus dense : la poussée est plus forte, il faut un peu plus de lest qu’en lac."
    ], tip: "Poids apparent = poids réel − volume × densité." },
  { id: "dalton", title: "Pressions partielles (Dalton)", gen: ["ppo2", "ppn2", "co"], m: ["dalton"], re: "partielle|pp ?o|pp ?n|ppo2|ppn2|dalton|monoxyde|co\\b",
    steps: [
      "L’air est un mélange : environ <b>21 % d’oxygène et 79 % d’azote</b>.",
      "Chaque gaz « pèse » sa part de la pression totale : c’est sa pression partielle.",
      "Pression partielle = <b>pression absolue × pourcentage du gaz</b> (en décimal : 21 % = 0,21).",
      "N’oublie pas le +1 : la pression absolue à 30 m vaut 4 bar, donc PpO₂ = 4 × 0,21 = 0,84 bar.",
      "Un gaz toxique (comme le CO) devient dangereux plus vite en profondeur, car sa pression partielle augmente avec la pression."
    ], tip: "Pp = P abs × %. Toujours la pression absolue." },
  { id: "maxo2", title: "Profondeur maximale d’un mélange", gen: ["maxo2"], m: ["dalton"], re: "profondeur maxi|limite|toxicité|nitrox",
    steps: [
      "On part de la limite de PpO₂ à ne pas dépasser (par exemple 1,6 bar).",
      "Pression absolue maxi = PpO₂ limite ÷ pourcentage d’oxygène (en décimal).",
      "On retire 1 bar d’air pour garder seulement la pression de l’eau.",
      "Profondeur maxi = pression de l’eau × 10.",
      "Exemple avec l’air : 1,6 ÷ 0,21 ≈ 7,6 bar → 7,6 − 1 = 6,6 → environ 66 m."
    ], tip: "P abs max = Pp limite ÷ %, puis −1, puis × 10." },
  { id: "deco", title: "Lire une procédure de décompression", gen: ["ligne", "remontee", "consec"], m: ["deco"], re: "palier|table|remontée|GPS|successive|consécutive",
    steps: [
      "On cherche la ligne avec la <b>profondeur réelle maximale</b> atteinte (si elle n’existe pas, on prend la suivante, plus profonde).",
      "Puis la <b>durée</b> : du début de la descente au début de la remontée (si elle n’existe pas, on prend la suivante, plus longue).",
      "On lit sur cette ligne les paliers et le groupe de plongée successive.",
      "La vitesse de remontée se respecte jusqu’au premier palier, puis entre les paliers.",
      "Les valeurs exactes dépendent de la table de ton club : vérifie toujours avec ton moniteur."
    ], tip: "Toujours arrondir vers le plus défavorable : plus profond, plus long." },
  { id: "o2", title: "Réserve d’oxygène (secours)", m: ["r-o2"], re: "débit|litres|bouteille d.oxyg|autonomie",
    steps: [
      "Oxygène disponible (L) = volume de la bouteille (L) × pression (bar).",
      "Durée (min) = oxygène disponible ÷ débit (L/min).",
      "Exemple : 5 L à 200 bar = 1 000 L. À 15 L/min : 1 000 ÷ 15 ≈ 66 min.",
      "Garde une marge : on prévient les secours tôt, sans attendre la fin de la bouteille."
    ], tip: "Litres = V × P. Durée = litres ÷ débit." },
  { id: "charles", title: "Pression et température", m: ["mariotte", "materiel"], re: "température|chauffe|soleil|°C|kelvin",
    steps: [
      "À volume constant (un bloc fermé), la pression monte quand le gaz chauffe et baisse quand il refroidit.",
      "La règle : P1 ÷ T1 = P2 ÷ T2, avec des températures en <b>kelvins</b> (°C + 273).",
      "Exemple : bloc à 200 bar et 40 °C (313 K) plongé dans une eau à 15 °C (288 K) : 200 × 288 ÷ 313 ≈ 184 bar.",
      "C’est pour ça qu’un bloc gonflé chaud semble « perdre » de la pression dans l’eau froide."
    ], tip: "Températures en kelvins : + 273." }
];
