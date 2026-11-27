/* =====================================================================
   Abysse Academy 2.4 · N2 · L’ordinateur de plongée
   Nouveau thème : lire l’écran, régler, plonger en palanquée, gérer une
   panne et l’après-plongée. Aucune valeur de table MN90.
   Points réglementaires ou propres au club : « À faire valider ».
   ===================================================================== */
(function () {
  "use strict";
  const C = AA.content, D = C.dgb || {};

  if (D.flow) C.addDiagrams({
    "n2-ordi": () => D.flow([["Capteur", "Il mesure la pression (donc la profondeur) et le temps, plusieurs fois par seconde."], ["Modèle", "Des « tissus » théoriques se chargent en azote selon la profondeur et la durée."], ["Écran", "Profondeur, durée, temps sans palier, vitesse de remontée, paliers."], ["Remontée", "Il calcule où et combien de temps s’arrêter pour que l’azote sorte doucement."], ["Après", "Il continue à compter : désaturation, plongée successive, avion."]], "Ce que fait ton ordinateur : il mesure, il modélise, il te dit quoi faire, puis il continue après la plongée."),
    "n2-ordi-ecran": () => D.flow([["Profondeur", "Actuelle, et maximale atteinte."], ["Durée", "Depuis le début de la descente."], ["NDL", "Temps restant sans palier obligatoire à cette profondeur."], ["Flèches ou barre", "Vitesse de remontée : trop vite = alarme."], ["STOP / DECO", "Palier de sécurité conseillé ou palier obligatoire : profondeur et durée."]], "Lire l’écran en cinq zones, de haut en bas (la disposition varie selon les modèles).")
  });

  const ex = (h) => `<div class="callout ex"><span class="eyebrow">Exemple</span>${h}</div>`;
  const val = (h) => `<div class="callout trap"><span class="eyebrow">À faire valider</span>${h}</div>`;

  C.module({
    id: "n2-ordi", world: "n2", depth: "−20 m", icon: "watch", diagram: "n2-ordi",
    title: "L’ordinateur de plongée",
    sub: "Lire l’écran, le régler, plonger avec, et après",
    essentiel: `
<p>Ton ordinateur fait en continu ce que la table fait une seule fois : il mesure ta <b>profondeur</b> et ta <b>durée</b>, il estime l’<b>azote</b> que ton corps a absorbé, et il te dit combien de temps tu peux rester sans palier, à quelle vitesse remonter et où t’arrêter.</p>
<h3>Lire l’écran</h3>
<div data-diagram="n2-ordi-ecran"></div>
<div class="tbl"><table><tr><th>Affichage</th><th>Ce que ça veut dire</th><th>Ce que tu fais</th></tr>
<tr><td>Profondeur / max</td><td>Où tu es, et le plus profond atteint</td><td>Tu compares à la limite du briefing</td></tr>
<tr><td>NDL (temps sans palier)</td><td>Minutes restantes avant qu’un palier devienne obligatoire</td><td>Tu remontes bien avant qu’il arrive à zéro</td></tr>
<tr><td>Vitesse de remontée</td><td>Flèches, barre ou pourcentage</td><td>Alarme = tu ralentis, tu purges, tu te stabilises</td></tr>
<tr><td>STOP / SAFETY</td><td>Palier de sécurité conseillé</td><td>Tu le fais, il réduit le risque</td></tr>
<tr><td>DECO / STOP obligatoire</td><td>Profondeur et durée d’un palier imposé</td><td>Tu le fais, à cette profondeur, au moins cette durée</td></tr></table></div>
${ex("<p>À 18 m, ton écran indique <b>NDL 6</b>. Ça ne veut pas dire « encore 6 minutes de balade » : en 6 minutes, un palier deviendra obligatoire. Tu le montres à ton binôme et vous commencez à remonter vers des profondeurs moindres, où le NDL remonte.</p>")}
<h3>Le régler avant de plonger</h3>
<p>Un ordinateur mal réglé calcule juste… sur de fausses données. Avant la plongée, vérifie :</p>
<ul><li>le <b>mélange</b> : air (21 %) ou le pourcentage de Nitrox analysé ;</li><li>le <b>facteur de prudence</b> (conservatisme) : plus prudent si tu es fatigué, si l’eau est froide, si tu reprends ;</li><li>l’<b>altitude</b> pour un lac de montagne ;</li><li>la <b>batterie</b> et l’heure.</li></ul>
<h3>Plonger en palanquée avec des ordinateurs</h3>
<p>Chaque plongeur a <b>son</b> ordinateur, porté depuis la première plongée de la journée. Les ordinateurs n’ont pas tous le même modèle : la palanquée suit toujours <b>le plus pénalisant</b>, c’est-à-dire celui qui demande de remonter le plus tôt ou de faire le plus de paliers.</p>
${ex("<p>Jade : NDL 12 min. Toi : palier obligatoire de 2 min. La palanquée remonte et fait ton palier, tous ensemble. Ce n’est pas « ton » problème, c’est la règle de la palanquée.</p>")}
<h3>Après la plongée</h3>
<p>L’ordinateur continue de calculer en surface : <b>temps de désaturation</b>, intervalle avant une plongée successive, <b>interdiction de vol</b>. Ne l’éteins pas, ne le prête pas, ne l’échange pas dans la journée : il perdrait l’historique de ton azote.</p>
<div class="callout"><span class="eyebrow">À retenir</span><p>L’ordinateur est un outil de calcul, pas un garde du corps : il ne sait pas que tu as froid, que tu as forcé, ou que tu as mal dormi. C’est toi qui ajoutes la prudence.</p></div>`,
    approfondir: `
<h3>Comment il calcule</h3>
<p>L’ordinateur utilise un <b>modèle</b> : des compartiments (« tissus ») qui se chargent et se déchargent en azote à des vitesses différentes, selon la pression partielle d’azote respiré (loi de Henry). Quand un compartiment approche de sa limite de sursaturation, le NDL arrive à zéro et un palier devient nécessaire.</p>
<p>Contrairement à la table, il suit ton <b>profil réel</b> : si tu passes du temps moins profond, il te « rend » du temps. C’est pour ça qu’un ordinateur donne souvent plus de temps qu’une table sur une plongée en escalier. Ce n’est pas un cadeau : c’est un calcul, avec les limites d’un modèle.</p>
${ex("<p>Profil en escalier : 10 min à 25 m, puis 20 min à 12 m. La table compte toute la plongée comme si tu étais resté à 25 m. L’ordinateur sait que tu es remonté et calcule moins d’azote. Les deux sont « justes », l’ordinateur est simplement plus précis sur ton profil.</p>")}
<h3>Les profils à risque</h3>
<ul><li><b>Yo-yo</b> : monter et descendre plusieurs fois, favorise les bulles.</li><li><b>Profil inversé</b> : finir plus profond qu’au début. On fait toujours le plus profond en premier.</li><li><b>Successives profondes</b> sur plusieurs jours : on prévoit une journée de repos.</li><li><b>Effort, froid, déshydratation</b> : le modèle ne les voit pas. Augmente le facteur de prudence.</li></ul>
<h3>Panne en plongée</h3>
<p>Écran éteint ou affichage incohérent : tu le signales à ta palanquée, tu suis l’ordinateur d’un équipier qui a eu le même profil (ou ton ordinateur de secours), tu remontes lentement et tu fais un palier de sécurité allongé.</p>
${val("<p>Procédure du club en cas de panne, et délai avant de replonger avec un nouvel ordinateur (souvent 24 h, selon les fabricants et les clubs).</p>")}
<h3>Palier omis</h3>
<p>Si tu sors sans faire un palier obligatoire, l’ordinateur peut se bloquer en mode « erreur » pendant plusieurs heures. On prévient le DP, on surveille les signes, oxygène au moindre doute, et pas d’autre plongée.</p>
<h3>Avion et altitude</h3>
<p>En avion, la pression de la cabine est plus basse qu’au niveau de la mer : les micro-bulles grossissent. Respecte le délai affiché par l’ordinateur, et au minimum les recommandations de ta fédération.</p>
${val("<p>Délais avant l’avion recommandés par la FFESSM et par le fabricant de ton ordinateur.</p>")}`,
    memo: [["NDL", "Temps restant sans palier obligatoire : on remonte bien avant zéro."], ["Palanquée", "On suit l’ordinateur le plus pénalisant."], ["Un ordinateur par plongeur", "Porté toute la journée, jamais prêté ni échangé."], ["Réglages", "Mélange analysé, facteur de prudence, altitude, batterie."], ["Vitesse", "Alarme de remontée : ralentir, purger, se stabiliser."], ["Panne", "Signaler, suivre un équipier au même profil, palier de sécurité allongé."], ["Après", "Désaturation, successive, avion : on ne l’éteint pas."]],
    moniteur: ["Quel facteur de prudence conseilles-tu pour mon niveau ?", "Quelle procédure le club applique-t-il si mon ordinateur tombe en panne ?"],
    quiz: [
      { q: "À 18 m, ton ordinateur affiche « NDL 4 ». Que signifie ce chiffre ?", c: ["Il te reste 4 minutes d’air à cette profondeur selon ta consommation", "Dans 4 minutes, un palier deviendra obligatoire si tu restes à cette profondeur", "Tu devras faire 4 minutes de palier à 3 m en fin de plongée", "Tu peux encore descendre de 4 mètres avant la limite de ton niveau"], a: 1, e: "NDL = No Decompression Limit : le temps restant sans palier obligatoire. On remonte bien avant qu’il arrive à zéro." },
      { q: "Ton binôme a un NDL de 12 min, ton ordinateur demande 2 min de palier. Que fait la palanquée ?", c: ["Elle fait la moyenne des deux et un palier d’une minute", "Ton binôme sort et tu fais ton palier seul au mouillage", "Toute la palanquée fait le palier demandé par ton ordinateur", "Elle suit l’ordinateur le plus récent des deux, plus fiable"], a: 2, e: "La palanquée suit l’ordinateur le plus pénalisant et reste groupée." },
      { q: "L’alarme de vitesse de remontée se déclenche. Que fais-tu ?", c: ["Tu ralentis, tu purges ton gilet et tu te stabilises si besoin", "Tu remontes encore un peu plus vite pour finir la remontée au plus tôt", "Tu redescends de 10 mètres pour remettre l’alarme à zéro", "Tu continues : l’alarme est réglée très large par le fabricant"], a: 0, e: "Remonter trop vite favorise les bulles et la surpression pulmonaire. On ralentit tout de suite." },
      { q: "Tu plonges au Nitrox 32 % analysé à 32 %. Sur quoi règles-tu ton ordinateur ?", c: ["Sur air (21 %), pour garder une marge sur la décompression", "Sur 32 %, la valeur analysée", "Sur 40 %, pour être plus prudent sur l’oxygène", "Le réglage n’a aucune importance pour une plongée à 20 m"], a: 1, e: "On règle la valeur analysée : elle sert au calcul de l’azote et surtout de l’oxygène (profondeur maximale)." },
      { q: "Pourquoi ne pas prêter ton ordinateur à un ami pour sa deuxième plongée de la journée ?", c: ["Parce que les réglages de langue et d’unités seraient différents pour lui", "Parce que ton ordinateur garde en mémoire ton azote, pas le sien", "Parce que la batterie ne tiendrait pas deux plongées dans la même journée", "Parce que la loi interdit de plonger avec l’ordinateur d’une autre personne"], a: 1, e: "L’ordinateur calcule l’azote de celui qui l’a porté. Pour ton ami, le calcul serait faux, et toi tu perds ton historique." },
      { q: "Ton ordinateur indique « SAFETY STOP 3 min » à 5 m. C’est :", c: ["Un palier obligatoire, sinon l’ordinateur se bloque pour 24 heures", "Un palier de sécurité conseillé, qu’on fait toujours", "Une alarme de batterie faible qui demande de remonter", "Une limite de profondeur à ne pas dépasser pendant 3 minutes"], a: 1, e: "Facultatif en théorie, mais fortement recommandé : il réduit le risque d’accident de désaturation." },
      { q: "Pourquoi un ordinateur donne-t-il souvent plus de temps qu’une table sur une plongée en escalier ?", c: ["Parce qu’il est réglé moins prudemment que les tables par les fabricants", "Parce qu’il suit ton profil réel au lieu de compter toute la plongée à la profondeur maximale", "Parce qu’il ne prend pas en compte la profondeur maximale atteinte", "Parce que les tables comptent aussi le temps passé en surface avant la plongée"], a: 1, e: "La table prend la profondeur maxi pour toute la durée. L’ordinateur calcule sur ce que tu as vraiment fait." },
      { q: "Tu es fatigué, l’eau est à 14 °C et tu reprends après un an. Quel réglage modifies-tu ?", c: ["Le mélange, en passant sur un pourcentage d’oxygène plus élevé", "L’altitude, pour simuler une plongée plus difficile", "Le facteur de prudence, vers plus de conservatisme", "Aucun : l’ordinateur mesure déjà la température et ta fatigue"], a: 2, e: "Le modèle ne voit ni ta fatigue ni le froid. Le facteur de prudence raccourcit les temps sans palier." },
      { q: "Ton ordinateur s’éteint à 15 m. Que fais-tu ?", c: ["Tu continues la plongée en suivant simplement la palanquée, comme si de rien n’était", "Tu le signales et tu suis un équipier au même profil, avec un palier allongé", "Tu remontes seul en surface au plus vite pour le redémarrer", "Tu le secoues pour le relancer et tu restes au fond en attendant"], a: 1, e: "Signaler, s’appuyer sur un équipier au profil identique (ou un ordinateur de secours), remontée lente, palier de sécurité allongé. Procédure du club : à faire valider." },
      { q: "Quel profil est le plus risqué pour la décompression ?", c: ["Descendre au plus profond au début, puis remonter peu à peu", "Monter et redescendre plusieurs fois pendant la plongée (yo-yo)", "Rester à profondeur constante toute la plongée en surveillant le NDL", "Faire un palier de sécurité plus long que celui proposé"], a: 1, e: "Les montées-descentes répétées favorisent les bulles. On fait le plus profond d’abord, puis on remonte progressivement." },
      { q: "Après la plongée, l’écran affiche « NO FLY 20 h ». Cela veut dire :", c: ["Tu peux replonger dans 20 heures seulement, pas avant", "Tu dois attendre au moins ce délai avant de prendre l’avion", "Il te reste 20 heures de batterie avant de recharger", "C’est le temps total de plongée enregistré depuis l’achat"], a: 1, e: "En avion, la pression cabine baisse : les micro-bulles grossissent. On respecte ce délai, et les recommandations fédérales." },
      { q: "Tu remontes à 6 m avec un NDL qui augmente. Pourquoi ?", c: ["Parce que la batterie se recharge un peu quand l’ordinateur se rapproche de la surface", "Parce que moins profond, ton corps absorbe moins d’azote et en rend une partie", "Parce que l’ordinateur passe en mode surface à partir de 6 m", "Parce que la pression de ton bloc baisse et qu’il recalcule ton autonomie"], a: 1, e: "Moins de pression = moins d’azote absorbé, et les tissus rapides commencent à se décharger : le temps sans palier augmente." },
      { q: "Ton écran affiche « 23,5 m », la limite du DP est 20 m pour votre palanquée autonome. Que fais-tu ?", c: ["Rien de spécial, 3 m de plus restent dans la marge de l’ordinateur", "Tu remontes au-dessus de 20 m et tu le dis au débriefing", "Tu continues jusqu’à 25 m puisque le NDL est encore long", "Tu le signales au DP seulement si l’ordinateur sonne une alarme"], a: 1, e: "Le NDL ne fixe pas la profondeur : la limite vient de ton niveau et du briefing. On remonte. (Limites du N2 : à faire valider.)" },
      { q: "En surface, ton ordinateur indique un palier omis et se bloque. Que fais-tu ?", c: ["Tu le réinitialises pour pouvoir replonger l’après-midi normalement", "Tu redescends faire le palier une heure plus tard sans prévenir", "Tu préviens le DP, tu surveilles l’apparition de signes et tu ne replonges pas", "Tu empruntes un autre ordinateur pour pouvoir faire la plongée suivante de la journée"], a: 2, e: "Palier omis = risque d’ADD. Prévenir, surveiller, oxygène au moindre signe, pas d’autre plongée." },
      { q: "Pourquoi garder ton ordinateur allumé (ou en veille) entre deux plongées ?", c: ["Pour qu’il compte la désaturation et calcule correctement la plongée successive", "Pour qu’il reste chaud et donne une température de l’eau exacte", "Pour que le capteur de pression ne prenne pas l’humidité", "Pour qu’il garde l’heure exacte, sinon tout ton carnet de plongée serait faux ensuite"], a: 0, e: "Il suit l’élimination de l’azote en surface. Éteint ou réinitialisé, il repart de zéro et ta successive serait mal calculée." },
      { q: "Ton ordinateur indique encore 15 min de NDL, mais ton manomètre affiche 60 bar. Qui décide ?", c: ["L’ordinateur, puisqu’il calcule la décompression avec beaucoup de précision au fond", "Le manomètre : l’air nécessaire à la remontée passe avant le NDL", "Le binôme qui a le plus d’air, il peut partager avec toi", "On fait la moyenne entre le temps restant et l’air restant"], a: 1, e: "Le NDL dit ce que permet l’azote, pas ce que permet ton air. La réserve décide de la remontée." }
    ]
  });

  C.addCards([
    { id: "ordi-c1", m: "n2-ordi", f: "NDL", b: "Temps restant sans palier obligatoire à la profondeur actuelle. On remonte bien avant zéro." },
    { id: "ordi-c2", m: "n2-ordi", f: "Deux ordinateurs différents dans la palanquée", b: "On suit le plus pénalisant, tous ensemble." },
    { id: "ordi-c3", m: "n2-ordi", f: "Réglages avant de plonger", b: "Mélange analysé, facteur de prudence, altitude, batterie." },
    { id: "ordi-c4", m: "n2-ordi", f: "Panne d’ordinateur au fond", b: "Signaler, suivre un équipier au même profil, remontée lente, palier de sécurité allongé." },
    { id: "ordi-c5", m: "n2-ordi", f: "Pourquoi ne jamais prêter son ordinateur ?", b: "Il garde en mémoire l’azote de celui qui l’a porté." },
    { id: "ordi-c6", m: "n2-ordi", f: "NO FLY", b: "Délai avant de prendre l’avion : la pression cabine baisse, les bulles grossissent." }
  ]);

  C.notions = Object.assign(C.notions || {}, {
    "n2-ordi": [["ndl", "Le temps sans palier (NDL)", "ndl|sans palier|temps restant", "NDL"], ["palan", "Plusieurs ordinateurs dans la palanquée", "binome|palanquee|pretter|preter|ami|plus penalisant|deux ordinateurs", "palanquée"], ["regl", "Les réglages", "regl|nitrox|prudence|conservat|altitude|batterie|melange", "Le régler"], ["vitesse", "Vitesse de remontée et paliers", "vitesse|alarme|safety|palier de securite|stop", "Vitesse de remontée"], ["panne", "Panne et palier omis", "panne|s.eteint|omis|bloque|secours", "Panne en plongée"], ["apres", "Après la plongée : successive et avion", "no fly|avion|desatur|successive|allume|veille", "Après la plongée"], ["profil", "Profils et calcul", "profil|escalier|yo-yo|table|modele|tissu|ndl qui augmente|moins profond", "Comment il calcule"]]
  });
})();
