/* Abysse Academy · contenu FR · Monde N2 et PA20
   Format : voir CONTRIBUTING.md. Le HTML des cours utilise les classes
   callout ex / trap / check, formula, tbl (voir css/app.css). */
AA.content.module({
  id: "pression", world: "n2", depth: "−3 m", icon: "gauge", diagram: "pression",
  title: "Pression",
  sub: "Atmosphérique, hydrostatique, absolue",
  essentiel: `
<p>Sous l’eau, tout part d’une idée : <b>plus tu descends, plus l’eau pèse sur toi.</b></p>
<h3>Les trois pressions</h3>
<ul>
<li><b>Pression atmosphérique</b> : le poids de l’air au-dessus de nous. Au niveau de la mer ≈ <b>1 bar</b>. Elle baisse en altitude (≈ 0,8 bar vers 2 000 m).</li>
<li><b>Pression hydrostatique</b> (ou relative) : le poids de l’eau. En mer, <b>+1 bar tous les 10 m</b>.</li>
<li><b>Pression absolue</b> : ce que subit vraiment le plongeur. C’est la somme des deux.</li>
</ul>
<div class="formula">P<sub>abs</sub> = P<sub>atm</sub> + P<sub>hydro</sub> &nbsp;&nbsp;→ en mer : P<sub>abs</sub> = 1 + profondeur/10</div>
<div class="tbl"><table><tr><th>Profondeur</th><th>P hydro</th><th>P absolue</th><th>Rapport à la surface</th></tr>
<tr><td>0 m</td><td>0 bar</td><td>1 bar</td><td>×1</td></tr>
<tr><td>10 m</td><td>1 bar</td><td>2 bar</td><td>×2</td></tr>
<tr><td>20 m</td><td>2 bar</td><td>3 bar</td><td>×3</td></tr>
<tr><td>30 m</td><td>3 bar</td><td>4 bar</td><td>×4</td></tr>
<tr><td>40 m</td><td>4 bar</td><td>5 bar</td><td>×5</td></tr></table></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>Quelle pression absolue à 35 m en mer ?
<pre>P abs = 1 + 35/10 = 1 + 3,5 = 4,5 bar</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · altitude</span>Lac à 1 500 m d’altitude, P atm ≈ 0,85 bar. Pression absolue à 20 m (eau douce, on garde ≈ 1 bar/10 m) ?
<pre>P abs = 0,85 + 2 = 2,85 bar
Rapport fond/surface = 2,85 / 0,85 ≈ 3,35 (contre 3 en mer)
→ les effets sont plus forts : on utilise des procédures « altitude ».</pre></div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>Le <b>manomètre du bloc</b> affiche une pression <b>relative</b> (il indique 0 quand le bloc est vide à l’air libre). Et c’est entre <b>0 et 10 m</b> que la pression varie le plus en proportion : elle double. C’est là que les barotraumatismes sont les plus fréquents.</div>
`,
  approfondir: `
<h3>Les unités, une fois pour toutes</h3>
<p>Une pression, c’est une force répartie sur une surface. En plongée on compte en <b>bar</b>, mais tu croiseras d’autres unités :</p>
<div class="tbl"><table><tr><th>Unité</th><th>Équivalence</th><th>Où tu la croises</th></tr>
<tr><td>1 bar</td><td>100 000 Pa = 1 000 hPa</td><td>manomètre, calculs</td></tr>
<tr><td>1 atm</td><td>≈ 1,013 bar</td><td>pression moyenne au niveau de la mer</td></tr>
<tr><td>1 013 hPa</td><td>≈ 1 bar</td><td>bulletin météo</td></tr>
<tr><td>760 mmHg</td><td>≈ 1,013 bar</td><td>médecine</td></tr></table></div>
<p>À l’examen on arrondit la pression atmosphérique à <b>1 bar</b>. C’est une convention de calcul, pas la réalité exacte.</p>
<h3>Pourquoi « 1 bar tous les 10 m » ?</h3>
<p>La pression de l’eau dépend de sa hauteur et de sa masse volumique. Une colonne d’eau douce de 10 m pèse environ 1 kg par cm², soit ≈ 1 bar. L’eau de mer est un peu plus dense (≈ 1,03) : en toute rigueur, 1 bar correspond à ≈ 9,7 m. La règle des 10 m reste la convention des calculs du N2.</p>
<div class="formula">P hydro (bar) ≈ profondeur (m) × densité / 10</div>
<h3>Le rapport de pression, la clé de tout</h3>
<p>Ce qui compte pour ton corps et pour les gaz, ce n’est pas la profondeur mais le <b>rapport</b> entre deux pressions. Mariotte, Dalton et la décompression en découlent.</p>
<div class="tbl"><table><tr><th>Trajet</th><th>Pressions</th><th>Rapport</th></tr>
<tr><td>10 m → 0 m</td><td>2 → 1 bar</td><td>÷ 2</td></tr>
<tr><td>20 m → 10 m</td><td>3 → 2 bar</td><td>÷ 1,5</td></tr>
<tr><td>40 m → 30 m</td><td>5 → 4 bar</td><td>÷ 1,25</td></tr></table></div>
<p>Les 10 derniers mètres de la remontée sont ceux où les volumes changent le plus : c’est là qu’il faut le plus de contrôle (gilet, poumons, vitesse).</p>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · plongée en lac</span>Lac à 2 000 m d’altitude, P atm ≈ 0,8 bar. Tu plonges à 15 m.<pre>P abs = 0,8 + 1,5 = 2,3 bar
Rapport fond / surface = 2,3 / 0,8 ≈ 2,9
En mer, à 15 m : 2,5 / 1 = 2,5
→ en altitude, le rapport est plus fort à profondeur égale.</pre></div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>On te demande la pression « relative » ou « hydrostatique » : c’est seulement l’eau (profondeur/10). La pression « absolue » ajoute l’atmosphère. Lis bien le mot.</div>
`,
  memo: [
    ["La formule","P abs = P atm + profondeur / 10 (en mer, à l’examen)."],
    ["Le rapport","Ce qui agit sur les gaz, c’est le rapport des pressions, pas la profondeur."],
    ["La zone sensible","De 0 à 10 m, la pression double : c’est là que tout change le plus vite."],
    ["Manomètre","Il affiche une pression relative."]
  ],
  moniteur: ["À l’écrit, doit-on utiliser 1 bar ou 1,013 bar pour la pression atmosphérique ?","Les exercices en altitude sont-ils au programme de notre examen ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Quelle est la pression absolue à 30 m en mer ?","c":["3 bar","4 bar","3,1 bar","30 bar"],"a":1,"e":"P abs = 1 (atm) + 30/10 (eau) = 4 bar."},
    {"q":"Dans quelle tranche la variation relative de pression est-elle la plus forte ?","c":["0 à 10 m","10 à 20 m","20 à 30 m","30 à 40 m"],"a":0,"e":"De 0 à 10 m on passe de 1 à 2 bar : la pression double. De 30 à 40 m on passe de 4 à 5 bar : seulement +25 %. D’où la vigilance près de la surface."},
    {"q":"Le manomètre de ton bloc affiche 180 bar. C’est une pression…","c":["relative","absolue","partielle","hydrostatique"],"a":0,"e":"Le manomètre mesure l’écart avec la pression ambiante : c’est une pression relative."},
    {"q":"Lac à 1 500 m (P atm ≈ 0,85 bar). Pression absolue à 20 m ?","c":["3 bar","2,85 bar","2,15 bar","2,7 bar"],"a":1,"e":"0,85 + 2 = 2,85 bar. On ajoute la pression de l’eau à la pression atmosphérique du lieu."},
    {"q":"Quelle est la pression hydrostatique à 25 m en mer ?","c":["3,5 bar","2,5 bar","25 bar","1,25 bar"],"a":1,"e":"Pression hydrostatique = profondeur / 10 = 2,5 bar. La pression absolue serait 3,5 bar."},
    {"q":"À quelle profondeur la pression absolue vaut-elle 3,5 bar en mer ?","c":["35 m","30 m","25 m","20 m"],"a":2,"e":"3,5 − 1 = 2,5 bar d’eau, soit 25 m."},
    {"q":"La pression atmosphérique au niveau de la mer vaut environ…","c":["1 bar","0,8 bar","10 bar","0 bar"],"a":0,"e":"≈ 1,013 bar, arrondi à 1 bar pour les calculs."},
    {"q":"Quand on monte en altitude, la pression atmosphérique…","c":["augmente","diminue","ne change pas","double tous les 1 000 m"],"a":1,"e":"Il y a moins d’air au-dessus de nous : elle baisse (≈ 0,8 bar vers 2 000 m)."},
    {"q":"À 10 m, la pression absolue a été multipliée par combien par rapport à la surface ?","c":["1,5","2","10","3"],"a":1,"e":"On passe de 1 à 2 bar : ×2. C’est le plus grand rapport de toute la plongée."},
    {"q":"À profondeur égale, la pression est légèrement plus forte…","c":["en eau douce","en mer","c’est identique","en piscine"],"a":1,"e":"L’eau de mer est plus dense (≈ 1,03), elle pèse un peu plus. On garde la convention de 1 bar par 10 m."},
    {"q": "1 013 hPa correspondent à environ…", "c": ["101 bar", "1 bar", "10 bar", "0,1 bar"], "a": 1, "e": "1 bar = 1 000 hPa. 1 013 hPa ≈ 1,013 bar, arrondi à 1 bar en calcul.", "lvl": 2},
    {"q": "Entre 40 et 30 m, la pression absolue est divisée par…", "c": ["2", "1,5", "4", "1,25"], "a": 3, "e": "5 bar → 4 bar : 5/4 = 1,25. Beaucoup moins qu’entre 10 m et la surface (÷ 2).", "lvl": 2},
    {"q": "Lac à 2 000 m (P atm ≈ 0,8 bar). Rapport fond/surface à 15 m ?", "c": ["1,5", "3,5", "≈ 2,9", "2,5"], "a": 2, "e": "(0,8 + 1,5) / 0,8 = 2,3 / 0,8 ≈ 2,9. Plus fort qu’en mer (2,5) : d’où des procédures adaptées en altitude.", "lvl": 2}
  ]
});

AA.content.module({
  id: "mariotte", world: "n2", depth: "−6 m", icon: "balloon", diagram: "mariotte",
  title: "Loi de Mariotte",
  sub: "Volumes, consommation, autonomie",
  essentiel: `
<p>Quand la pression augmente, un gaz se comprime. Quand elle baisse, il se dilate. À température constante :</p>
<div class="formula">P × V = constante &nbsp;&nbsp;→&nbsp;&nbsp; P₁ × V₁ = P₂ × V₂</div>
<h3>Où ça te concerne</h3>
<ul>
<li><b>Les poumons</b> : si tu bloques ta respiration en remontant, l’air se dilate et peut déchirer les alvéoles (surpression pulmonaire). Règle d’or : <b>on ne bloque jamais sa respiration</b>.</li>
<li><b>Le gilet</b> : l’air qu’il contient gonfle à la remontée. Il faut purger en continu.</li>
<li><b>Les oreilles, le masque, les sinus</b> : les cavités d’air subissent ces variations de volume.</li>
<li><b>La consommation</b> : à chaque inspiration, le détendeur te donne de l’air à la pression ambiante. À 3 bar, une inspiration « coûte » trois fois plus d’air du bloc.</li>
</ul>
<div class="formula">Air disponible (L) = Volume du bloc × Pression utilisable<br>Conso au fond = Conso en surface × P abs<br>Autonomie (min) = Air disponible / Conso au fond</div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · ballon</span>Un ballon de 6 L à 20 m (3 bar) remonte en surface (1 bar). Volume final ?
<pre>3 × 6 = 1 × V  →  V = 18 L</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · autonomie</span>Bloc 15 L gonflé à 200 bar, réserve 50 bar, consommation 20 L/min en surface. Combien de temps à 20 m ?
<pre>Pression utilisable = 200 − 50 = 150 bar
Air disponible = 15 × 150 = 2 250 L
Conso à 20 m = 20 × 3 = 60 L/min
Autonomie = 2 250 / 60 ≈ 37 min
→ ce temps doit inclure la remontée et les paliers.</pre></div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>Utilise toujours la <b>pression absolue</b> (1 + prof/10) dans Mariotte, jamais la pression relative. Et pense à retirer la réserve avant de calculer l’autonomie.</div>
`,
  approfondir: `
<h3>La loi, et sa condition</h3>
<div class="formula">P₁ × V₁ = P₂ × V₂ (à température constante)</div>
<p>Elle s’applique à tout espace rempli de gaz et déformable : poumons, gilet, combinaison, masque, parachute, oreille moyenne, sinus.</p>
<h3>Et quand la température change ? (Charles)</h3>
<p>À volume constant (un bloc), la pression varie avec la température absolue (en kelvins : °C + 273).</p>
<div class="formula">P₁ / T₁ = P₂ / T₂</div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · bloc gonflé chaud</span>Bloc gonflé à 200 bar, il sort du compresseur à 40 °C. Dans l’eau à 15 °C ?<pre>T₁ = 40 + 273 = 313 K ; T₂ = 15 + 273 = 288 K
P₂ = 200 × 288 / 313 ≈ 184 bar</pre>Ce n’est pas une fuite : le bloc s’est refroidi. Et un bloc laissé au soleil monte en pression.</div>
<h3>Le volume « disponible » d’un bloc</h3>
<p>Un bloc de 12 L gonflé à 200 bar contient environ 12 × 200 = <b>2 400 L d’air détendu</b> (à pression atmosphérique). C’est ce volume que tu « dépenses » en respirant.</p>
<h3>Respirer plus dense</h3>
<p>À 30 m, chaque litre que tu inspires contient 4 fois plus de molécules qu’en surface. L’air est plus dense, plus « épais » : il demande plus d’effort pour circuler dans le détendeur et les bronches. Un effort au fond fait monter vite le CO₂ : c’est le terrain de l’essoufflement.</p>
<h3>Ce qui fait varier ta consommation</h3>
<ul><li><b>Profondeur</b> : × P abs (Mariotte).</li><li><b>Effort, courant, froid, stress</b> : la conso de surface elle-même augmente, souvent de 50 % ou plus.</li><li><b>Mauvaise stabilisation</b> : palmer pour compenser coûte de l’air.</li></ul>
<p>Prévois toujours une marge : une autonomie calculée est un maximum théorique.</p>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>Dans un calcul d’autonomie, on déduit la <b>réserve</b> avant de diviser. Et on arrondit le résultat <b>vers le bas</b> : 23,8 min, c’est 23 min.</div>
`,
  memo: [
    ["Mariotte","P × V = constante : la pression double, le volume est divisé par deux."],
    ["Conso au fond","Conso surface × P abs."],
    ["Autonomie","(P départ − réserve) × volume du bloc ÷ conso au fond."],
    ["Température","Un bloc qui refroidit perd de la pression sans perdre d’air."]
  ],
  moniteur: ["Quelle consommation de surface prendre par défaut dans les exercices (15, 20 L/min) ?","La loi de Charles (température) est-elle demandée à notre écrit ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Un ballon de 6 L à 20 m remonte en surface. Quel est son volume ?","c":["12 L","18 L","24 L","2 L"],"a":1,"e":"À 20 m, P = 3 bar. 3 × 6 = 1 × V → V = 18 L."},
    {"q":"Un bloc de 12 L gonflé à 200 bar contient environ…","c":["200 L d’air","1 200 L d’air","2 400 L d’air","2 600 L d’air"],"a":2,"e":"12 × 200 = 2 400 L d’air détendu à la pression atmosphérique."},
    {"q":"Tu consommes 20 L/min en surface. Combien à 30 m ?","c":["60 L/min","80 L/min","600 L/min","26 L/min"],"a":1,"e":"À 30 m, P abs = 4 bar. 20 × 4 = 80 L/min."},
    {"q":"Bloc 15 L à 200 bar, réserve 50 bar, conso 20 L/min en surface. Autonomie à 20 m ?","c":["Environ 37 min","Environ 56 min","Environ 50 min","Environ 112 min"],"a":0,"e":"(200 − 50) × 15 = 2 250 L. Conso à 20 m = 20 × 3 = 60 L/min. 2 250 / 60 ≈ 37 min, remontée comprise."},
    {"q":"Pourquoi ne faut-il jamais bloquer sa respiration à la remontée ?","c":["Pour économiser l’air","Parce que l’air des poumons se dilate et peut léser les alvéoles","Pour éviter la narcose","Parce que le détendeur se bloque"],"a":1,"e":"La pression baisse, le volume d’air des poumons augmente (Mariotte). Glotte fermée, il ne peut pas sortir : c’est la surpression pulmonaire."},
    {"q":"Ton gilet contient 1 L d’air à 30 m. Tu remontes à 10 m sans purger. Volume ?","c":["1 L","2 L","3 L","4 L"],"a":1,"e":"4 bar × 1 L = 2 bar × V → V = 2 L. Le volume double : il faut purger, sinon la remontée s’accélère."},
    {"q":"La loi de Mariotte concerne…","c":["les liquides","les gaz","les solides","la lumière"],"a":1,"e":"Seuls les gaz sont compressibles. L’eau et les tissus du corps ne le sont presque pas."},
    {"q":"Tu remontes de 10 m à la surface sans purger. L’air de ton gilet…","c":["diminue de moitié","double","reste identique","triple"],"a":1,"e":"2 bar → 1 bar : le volume double. C’est la zone où l’on s’emballe le plus facilement."},
    {"q":"Sur quel trajet le volume d’un ballon augmente-t-il le plus en proportion ?","c":["De 40 m à 30 m","De 30 m à 20 m","De 20 m à 10 m","De 10 m à 0 m"],"a":3,"e":"10 → 0 m : ×2. 40 → 30 m : seulement ×1,25 (5/4)."},
    {"q":"Bloc de 12 L à 200 bar. Tu as consommé 1 200 L d’air. Il reste…","c":["100 bar","150 bar","50 bar","80 bar"],"a":0,"e":"1 200 L / 12 L = 100 bar consommés. 200 − 100 = 100 bar."},
    {"q": "Un bloc gonflé à 200 bar à 40 °C est plongé dans une eau à 15 °C. Sa pression devient environ…", "c": ["184 bar", "200 bar", "75 bar", "215 bar"], "a": 0, "e": "200 × (15 + 273) / (40 + 273) ≈ 184 bar. On calcule avec les kelvins.", "lvl": 2},
    {"q": "Combien de litres d’air détendu dans un bloc de 12 L à 200 bar ?", "c": ["12 L", "2 400 L", "200 L", "1 200 L"], "a": 1, "e": "12 × 200 = 2 400 L à la pression atmosphérique.", "lvl": 2},
    {"q": "Pourquoi l’effort au fond essouffle plus vite qu’en surface ?", "c": ["L’eau est plus froide", "Le détendeur donne moins d’oxygène", "On a moins d’azote", "L’air est plus dense, plus difficile à faire circuler, et le CO₂ s’accumule"], "a": 3, "e": "La densité du gaz augmente avec la pression : le travail respiratoire aussi.", "lvl": 2}
  ]
});

AA.content.module({
  id: "archimede", world: "n2", depth: "−9 m", icon: "scale", diagram: "archimede",
  title: "Archimède",
  sub: "Flottabilité, lestage, relevage",
  essentiel: `
<p>Tout corps plongé dans un liquide reçoit une <b>poussée verticale vers le haut</b> égale au <b>poids du volume de liquide déplacé</b>.</p>
<div class="formula">Poids apparent = Poids réel − Poussée d’Archimède<br>Poussée (kg) = Volume (L) × densité de l’eau (1 en eau douce, ≈ 1,03 en mer)</div>
<ul>
<li>Poids apparent <b>positif</b> : l’objet coule.</li>
<li>Poids apparent <b>négatif</b> : il flotte.</li>
<li>Poids apparent <b>nul</b> : il est équilibré. C’est le but de la stabilisation.</li>
</ul>
<h3>Ce qui fait varier ta flottabilité pendant la plongée</h3>
<ul>
<li><b>La combinaison</b> : le néoprène s’écrase en profondeur, son volume diminue, tu deviens plus lourd. Tu compenses avec le gilet.</li>
<li><b>Le bloc</b> : il s’allège à mesure que tu consommes. 1 L d’air pèse ≈ 1,2 à 1,3 g.</li>
<li><b>L’eau</b> : l’eau de mer porte plus que l’eau douce. Du lac à la mer, il faut ajouter du lest.</li>
<li><b>Les poumons</b> : poumons pleins, tu montes un peu ; poumons vides, tu descends. C’est le « poumon ballast ».</li>
</ul>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · lestage</span>Plongeur équipé : 90 kg, volume 92 L, en mer. Quel lest ?
<pre>Poussée = 92 × 1,03 ≈ 94,8 kg
Poids apparent = 90 − 94,8 = −4,8 kg  → il flotte
Lest nécessaire ≈ 5 kg
En lac : 92 − 90 = −2 kg → ≈ 2 kg suffisent.</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · fin de plongée</span>Bloc 15 L, de 200 à 50 bar. Combien de poids en moins ?
<pre>Air consommé = 15 × 150 = 2 250 L
Masse ≈ 2 250 × 1,3 g ≈ 2,9 kg
→ c’est pour ça qu’on vérifie le lestage bloc presque vide :
  au palier, en fin de plongée, tu es ~3 kg plus léger.</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · relevage</span>Ancre de 40 kg, volume 10 L, en mer. Combien d’air dans le parachute pour l’équilibrer ?
<pre>Poids apparent = 40 − 10 × 1,03 = 29,7 kg
Il faut déplacer ≈ 29,7 kg d’eau de mer ≈ 29 L d’air dans le parachute, au fond.</pre></div>
`,
  approfondir: `
<h3>La poussée, précisément</h3>
<div class="formula">Poussée (kg) = volume immergé (L) × masse volumique du liquide (kg/L)</div>
<div class="formula">Poids apparent = poids réel − poussée</div>
<p>Poids apparent positif : tu coules. Négatif : tu flottes. Nul : tu es équilibré.</p>
<h3>Ce qui change entre le début et la fin de la plongée</h3>
<ul><li><b>Le bloc s’allège</b> : l’air a une masse (≈ 1,3 g par litre). Un bloc de 15 L qui passe de 200 à 50 bar perd environ 15 × 150 × 1,3 ≈ <b>2,9 kg</b>. Ton lestage doit te permettre de tenir le palier en fin de plongée, bloc presque vide.</li>
<li><b>La combinaison s’écrase</b> : le néoprène contient des bulles de gaz qui se compriment (Mariotte). Une combinaison épaisse peut perdre plusieurs kilos de flottabilité au fond.</li>
<li><b>Le poumon</b> : une inspiration complète ajoute quelques litres de volume. C’est ton réglage fin.</li></ul>
<h3>Le bon lestage</h3>
<p>Test courant en surface : gilet vide, poumons à mi-volume, tu dois flotter les yeux au niveau de l’eau. Fais le test avec un bloc proche de la réserve si possible. Trop lesté, tu compenses au gilet en permanence : plus d’air dans le gilet, plus de volume qui varie, plus de risque de remontée incontrôlée.</p>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · eau douce et mer</span>Plongeur équipé 85 kg pour 88 L.<pre>En mer : poussée = 88 × 1,03 = 90,6 kg → lest ≈ 5,6 kg
En lac : poussée = 88 × 1 = 88 kg → lest ≈ 3 kg</pre>En passant de la mer au lac, on enlève du lest.</div>
<h3>Le parachute de relevage</h3>
<p>Un parachute gonflé au fond prend de la poussée en montant (Mariotte) : l’objet accélère. On le gonfle juste assez pour décoller, on purge en remontant, et on ne s’accroche jamais à la charge.</p>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>La densité de l’eau de mer (≈ 1,03) s’applique au <b>volume</b> du plongeur, pas à son poids.</div>
`,
  memo: [
    ["Formule","Poussée = volume × densité de l’eau."],
    ["Fin de plongée","Le bloc s’allège de plusieurs kilos : c’est là que le lest doit suffire."],
    ["Combinaison","Elle s’écrase en profondeur : on compense au gilet."],
    ["Relevage","Gonfler juste assez, purger en montant, ne jamais suivre la charge."]
  ],
  moniteur: ["Quel test de lestage pratique-t-on au club, et avec quel bloc ?","Les calculs de relevage sont-ils au programme de l’écrit N2 ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"La poussée d’Archimède est égale…","c":["au poids de l’objet","au poids du volume de liquide déplacé","à la pression au fond","au volume de l’objet en kg toujours"],"a":1,"e":"C’est la définition : le poids du liquide déplacé, dirigé vers le haut."},
    {"q":"Objet de 30 kg, volume 20 L, en eau douce. Poids apparent ?","c":["+10 kg (il coule)","−10 kg (il flotte)","+50 kg","0 kg"],"a":0,"e":"30 − 20 × 1 = +10 kg. Poids apparent positif : il coule."},
    {"q":"Plongeur équipé de 90 kg pour 92 L, en mer (densité 1,03). Lest nécessaire ?","c":["≈ 2 kg","≈ 5 kg","≈ 9 kg","Aucun"],"a":1,"e":"Poussée ≈ 92 × 1,03 = 94,8 kg. 90 − 94,8 = −4,8 kg. Il faut ≈ 5 kg."},
    {"q":"Tu passes d’une plongée en mer à une plongée en lac. Ton lest…","c":["doit augmenter","doit diminuer","ne change pas","dépend uniquement du bloc"],"a":1,"e":"L’eau douce est moins dense, elle porte moins. Tu as besoin de moins de lest."},
    {"q":"En descendant, ta combinaison néoprène…","c":["te rend plus léger","te rend plus lourd car elle s’écrase","ne change rien","se remplit d’air"],"a":1,"e":"Les bulles du néoprène se compriment, son volume diminue, donc la poussée diminue. Tu compenses avec le gilet."},
    {"q":"En fin de plongée, bloc 15 L passé de 200 à 50 bar : tu es plus léger d’environ…","c":["300 g","1 kg","3 kg","10 kg"],"a":2,"e":"2 250 L d’air consommés × ≈1,3 g/L ≈ 2,9 kg. D’où le lestage vérifié bloc presque vide."},
    {"q":"Ancre de 40 kg, 10 L, en mer. Air à mettre dans le parachute au fond pour l’équilibrer ?","c":["≈ 10 L","≈ 30 L","≈ 40 L","≈ 50 L"],"a":1,"e":"Poids apparent = 40 − 10,3 ≈ 29,7 kg. Il faut ≈ 29 à 30 L d’air au fond."},
    {"q":"Pour amorcer ta descente, tu…","c":["gonfles ton gilet","vides ton gilet et expires","palmes vers le haut","retires du lest"],"a":1,"e":"Gilet vide et poumons vides : tu réduis ton volume, donc la poussée."},
    {"q":"Un poids apparent nul signifie que le plongeur…","c":["coule","flotte en surface","est équilibré","n’a pas de lest"],"a":2,"e":"Poids réel = poussée : il ne monte ni ne descend. C’est la stabilisation."},
    {"q":"Pourquoi un parachute de relevage a-t-il tendance à s’emballer en remontant ?","c":["Il devient plus lourd","L’air se dilate, la poussée augmente","L’eau devient moins dense","Le froid le gonfle"],"a":1,"e":"Mariotte + Archimède : plus il monte, plus l’air se dilate, plus il pousse, plus il accélère. On purge en remontant."},
    {"q":"La densité de l’eau de mer est d’environ…","c":["0,97","1","1,03","1,3"],"a":2,"e":"1 L d’eau de mer pèse ≈ 1,03 kg. On utilise souvent 1 pour simplifier, sauf indication."},
    {"q": "Un bloc de 15 L passe de 200 à 50 bar. Environ combien de masse d’air a-t-il perdu ?", "c": ["≈ 15 kg", "rien, l’air ne pèse rien", "≈ 2,9 kg", "≈ 0,3 kg"], "a": 2, "e": "15 × 150 = 2 250 L d’air × ≈ 1,3 g/L ≈ 2,9 kg.", "lvl": 2},
    {"q": "Pourquoi faut-il plus d’air dans le gilet au fond avec une combinaison épaisse ?", "c": ["Le néoprène s’écrase et perd du volume", "L’eau est plus dense au fond", "Le bloc s’alourdit", "Le lest grossit"], "a": 0, "e": "Les bulles du néoprène se compriment : volume plus petit, poussée plus faible.", "lvl": 2},
    {"q": "Tu passes de la mer au lac avec le même équipement. Ton lest…", "c": ["dépend de la profondeur seulement", "doit diminuer", "doit augmenter", "ne change pas"], "a": 1, "e": "L’eau douce porte moins (densité 1 au lieu de 1,03) : on coule plus facilement, il faut moins de lest.", "lvl": 2}
  ]
});

AA.content.module({
  id: "dalton", world: "n2", depth: "−12 m", icon: "mol", diagram: "dalton",
  title: "Dalton et Henry",
  sub: "Pressions partielles et dissolution des gaz",
  essentiel: `
<h3>Loi de Dalton : chaque gaz a sa part</h3>
<p>Dans un mélange, chaque gaz exerce sa propre pression, la <b>pression partielle</b>, proportionnelle à sa part dans le mélange.</p>
<div class="formula">Pp gaz = P abs × % du gaz &nbsp;&nbsp;(air ≈ 21 % O₂, 79 % N₂)</div>
<div class="tbl"><table><tr><th>Seuil</th><th>Pourquoi</th><th>À l’air</th></tr>
<tr><td>Pp N₂ ≈ 3,2 bar</td><td>Narcose nette (très variable selon les personnes)</td><td>≈ 30 m</td></tr>
<tr><td>Pp O₂ = 1,6 bar</td><td>Risque d’hyperoxie (crise convulsive)</td><td>≈ 66 m</td></tr>
<tr><td>Pp O₂ &lt; 0,17 bar</td><td>Hypoxie</td><td>sans objet à l’air</td></tr></table></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>Pressions partielles à 40 m à l’air ?
<pre>P abs = 5 bar
Pp O₂ = 5 × 0,21 = 1,05 bar
Pp N₂ = 5 × 0,79 = 3,95 bar</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · profondeur limite</span>À quelle profondeur la Pp O₂ de l’air atteint 1,6 bar ?
<pre>P abs = 1,6 / 0,21 ≈ 7,6 bar  → (7,6 − 1) × 10 ≈ 66 m</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · air pollué</span>Un bloc contient 0,1 % de CO. À 40 m, quel effet ?
<pre>Pp CO = 5 × 0,001 = 0,005 bar → l’effet est celui de 0,5 % en surface.
Un gaz toxique est 5 fois plus dangereux à 40 m.</pre></div>
<h3>Loi de Henry : les gaz se dissolvent</h3>
<p>À température donnée, la quantité de gaz dissous dans un liquide est <b>proportionnelle à la pression partielle</b> de ce gaz au contact du liquide.</p>
<ul>
<li><b>Descente et fond</b> : la Pp N₂ augmente, ton corps absorbe de l’azote. Tes tissus sont en <b>sous-saturation</b> puis se chargent.</li>
<li><b>Équilibre</b> : <b>saturation</b>, le tissu n’absorbe plus.</li>
<li><b>Remontée</b> : la pression baisse, les tissus contiennent plus d’azote que l’équilibre : <b>sursaturation</b>. L’azote ressort par le sang et les poumons.</li>
<li>Si la sursaturation dépasse un seuil critique (remontée trop rapide), des <b>bulles</b> se forment : c’est l’origine de l’accident de désaturation.</li>
</ul>
<p>Image concrète : une bouteille de soda. Fermée, le gaz reste dissous. Ouverte d’un coup, ça mousse. Ouverte doucement, le gaz sort sans déborder. Les paliers, c’est ouvrir doucement.</p>
`,
  approfondir: `
<h3>Seuils à connaître (air)</h3>
<div class="tbl"><table><tr><th>Gaz</th><th>Seuil</th><th>Ce qui se passe</th><th>Profondeur à l’air</th></tr>
<tr><td>O₂</td><td>&lt; 0,17 bar</td><td>hypoxie</td><td>bloc mal gonflé, recycleur</td></tr>
<tr><td>O₂</td><td>&gt; 1,6 bar</td><td>hyperoxie (toxicité nerveuse, convulsions)</td><td>≈ 66 m</td></tr>
<tr><td>N₂</td><td>≈ 3,2 bar</td><td>narcose nette chez beaucoup de plongeurs</td><td>≈ 30 m</td></tr></table></div>
<p>La narcose est très variable selon les personnes et les jours (fatigue, froid, stress, alcool la veille). Elle peut commencer avant 30 m.</p>
<h3>Deux toxicités de l’oxygène</h3>
<ul><li><b>Nerveuse (effet Paul Bert)</b> : pression partielle élevée, effet rapide, risque de convulsion. C’est la limite de 1,6 bar.</li>
<li><b>Pulmonaire (effet Lorrain Smith)</b> : exposition longue à une pression partielle modérée (oxygénothérapie prolongée, longues plongées aux mélanges). Peu concernée par la plongée loisir à l’air.</li></ul>
<h3>Henry : saturation et période</h3>
<p>Un tissu se charge en azote plus ou moins vite. On le décrit par sa <b>période</b> : le temps qu’il met pour faire la moitié du chemin vers l’équilibre.</p>
<div class="tbl"><table><tr><th>Temps écoulé</th><th>1 période</th><th>2</th><th>3</th><th>4</th><th>6</th></tr>
<tr><td>Chargement</td><td>50 %</td><td>75 %</td><td>87,5 %</td><td>93,75 %</td><td>≈ 98 % (considéré saturé)</td></tr></table></div>
<figure data-diagram="periode"></figure>
<p>Trois états : <b>sous-saturé</b> (il absorbe, à la descente), <b>saturé</b> (équilibre), <b>sursaturé</b> (il rend du gaz, à la remontée). Une sursaturation trop forte (au-delà d’un seuil critique) forme des bulles : c’est l’accident de désaturation.</p>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · tissu de période 20 min</span>Tu descends à 30 m (Pp N₂ = 3,2 bar). Le tissu part de 0,8 bar.<pre>Écart à combler : 3,2 − 0,8 = 2,4 bar
Après 20 min : + 50 % → 0,8 + 1,2 = 2,0 bar
Après 40 min : + 75 % → 0,8 + 1,8 = 2,6 bar</pre></div>
<div class="callout ex"><span class="eyebrow">Exemple chiffré · pollution</span>Un air contient 0,1 % de CO₂ en surface (Pp = 0,001 bar). À 40 m (5 bar) : 0,005 bar, comme 0,5 % en surface. La profondeur multiplie l’effet d’un gaz polluant.</div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>Pp = P absolue × pourcentage. Jamais la pression relative.</div>
`,
  memo: [
    ["Dalton","Pp = P abs × % du gaz."],
    ["Seuils air","O₂ max 1,6 bar ; narcose vers Pp N₂ 3,2 bar (≈ 30 m)."],
    ["Henry","La quantité dissoute dépend de la Pp et du temps."],
    ["Période","1 période = 50 %, 2 = 75 %, 6 = saturé."]
  ],
  moniteur: ["Quels seuils de PpO₂ retient-on au club (1,4 ou 1,6 bar) ?","La notion de période est-elle demandée avec des calculs à l’écrit ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Pp O₂ de l’air à 40 m ?","c":["0,84 bar","1,05 bar","1,6 bar","3,95 bar"],"a":1,"e":"P abs = 5 bar ; 5 × 0,21 = 1,05 bar."},
    {"q":"À quelle profondeur la Pp O₂ de l’air atteint-elle 1,6 bar ?","c":["≈ 40 m","≈ 56 m","≈ 66 m","≈ 76 m"],"a":2,"e":"1,6 / 0,21 ≈ 7,6 bar absolus → 66 m."},
    {"q":"Pp N₂ à 30 m à l’air ?","c":["2,37 bar","3,16 bar","3,95 bar","0,84 bar"],"a":1,"e":"4 bar × 0,79 = 3,16 bar. On approche du seuil où la narcose devient nette."},
    {"q":"La loi de Henry dit que la quantité de gaz dissous est proportionnelle…","c":["au volume du gaz","à la température","à la pression partielle du gaz","à la profondeur au carré"],"a":2,"e":"À température donnée, gaz dissous ∝ pression partielle."},
    {"q":"Pendant la remontée, tes tissus sont généralement…","c":["en sous-saturation","saturés et stables","en sursaturation","vides d’azote"],"a":2,"e":"La pression baisse plus vite que les tissus ne se vident : ils sont sursaturés, l’azote ressort. Trop vite → bulles."},
    {"q":"Un bloc contient 0,1 % de CO. À 40 m, l’effet équivaut en surface à…","c":["0,1 %","0,4 %","0,5 %","1 %"],"a":2,"e":"Pp CO = 5 × 0,001 = 0,005 bar, soit l’effet de 0,5 % en surface."},
    {"q":"Pourquoi la narcose augmente-t-elle avec la profondeur ?","c":["Parce que la Pp N₂ augmente","Parce que l’eau est plus froide","Parce que la Pp O₂ diminue","Parce que le CO₂ disparaît"],"a":0,"e":"Pp N₂ = P abs × 0,79. Plus tu descends, plus elle monte. Froid, fatigue et CO₂ aggravent les effets."},
    {"q":"Composition simplifiée de l’air utilisée en plongée ?","c":["50 % O₂, 50 % N₂","21 % O₂, 79 % N₂","79 % O₂, 21 % N₂","32 % O₂, 68 % N₂"],"a":1,"e":"On arrondit à 21 % / 79 % (les autres gaz sont comptés avec l’azote)."},
    {"q":"La pression partielle d’un gaz dépend…","c":["uniquement de sa proportion","de la pression absolue et de sa proportion","uniquement de la profondeur","de la température seule"],"a":1,"e":"Pp = P abs × proportion."},
    {"q":"La narcose est provoquée principalement par…","c":["l’oxygène","le CO₂","l’azote sous pression","le froid"],"a":2,"e":"L’azote à forte pression partielle a un effet « anesthésiant ». Le froid et le CO₂ l’aggravent."},
    {"q":"En fin de plongée, le gaz en excès à éliminer est surtout…","c":["l’oxygène","l’azote","l’hélium","le CO₂"],"a":1,"e":"L’O₂ est consommé par le corps. L’azote, lui, n’est pas utilisé : il s’accumule et doit ressortir."},
    {"q": "Après 2 périodes, un tissu a fait quelle part du chemin vers la saturation ?", "c": ["50 %", "100 %", "25 %", "75 %"], "a": 3, "e": "50 % après 1 période, puis la moitié du reste : 75 % après 2.", "lvl": 2},
    {"q": "À l’air, la PpO₂ atteint 1,6 bar vers…", "c": ["30 m", "90 m", "66 m", "40 m"], "a": 2, "e": "1,6 / 0,21 ≈ 7,6 bar, soit ≈ 66 m. Bien au-delà des limites du N2.", "lvl": 2},
    {"q": "La toxicité nerveuse de l’oxygène porte le nom de…", "c": ["effet Paul Bert", "effet Lorrain Smith", "effet Haldane", "effet Henry"], "a": 0, "e": "Paul Bert : forte PpO₂, effet rapide. Lorrain Smith : effet pulmonaire, exposition longue.", "lvl": 2}
  ]
});

AA.content.module({
  id: "physio", world: "n2", depth: "−15 m", icon: "lungs",
  title: "Anatomie et physiologie",
  sub: "Respiration, circulation, oreille",
  essentiel: `
<h3>Respiration</h3>
<ul>
<li>L’air passe par la trachée, les bronches, jusqu’aux <b>alvéoles</b>. C’est là que se font les <b>échanges gazeux</b> avec le sang : l’O₂ entre, le CO₂ sort.</li>
<li>Ce qui déclenche l’envie de respirer, c’est surtout <b>l’augmentation du CO₂</b> dans le sang, pas le manque d’O₂.</li>
<li>Après une expiration forcée, il reste toujours de l’air dans les poumons (volume résiduel).</li>
</ul>
<h3>Circulation</h3>
<ul>
<li>Cœur droit → poumons (le sang se charge en O₂ et se débarrasse du CO₂ et de l’azote) → cœur gauche → tout le corps.</li>
<li>Les poumons filtrent les petites bulles qui reviennent du corps. Le <b>foramen ovale perméable (FOP)</b>, une petite communication entre les oreillettes présente chez une partie de la population, peut laisser passer des bulles vers la circulation artérielle : risque d’accident de désaturation plus élevé.</li>
</ul>
<h3>Oreille</h3>
<ul>
<li>Oreille externe (conduit), <b>tympan</b>, oreille moyenne (cavité d’air), oreille interne (audition et équilibre).</li>
<li>La <b>trompe d’Eustache</b> relie l’oreille moyenne à l’arrière-gorge. Équilibrer, c’est y faire passer de l’air.</li>
<li>À la descente : équilibrer <b>tôt et souvent, avant la douleur</b>. Douleur = on remonte un peu et on réessaie.</li>
<li>Manœuvres : déglutition, mouvements de mâchoire, <b>Valsalva</b> (nez pincé, souffler doucement). Jamais de Valsalva forcé, et <b>jamais à la remontée</b>.</li>
</ul>
<div class="callout check"><span class="eyebrow">Pour l’écrit</span>Les questions de physiologie au N2 restent simples. Il faut surtout savoir relier un organe à un accident : alvéoles et surpression pulmonaire, oreille moyenne et barotraumatisme, circulation et ADD.</div>
`,
  approfondir: `
<h3>Les volumes pulmonaires</h3>
<div class="tbl"><table><tr><th>Volume</th><th>Ordre de grandeur adulte</th></tr>
<tr><td>Volume courant (respiration calme)</td><td>≈ 0,5 L</td></tr>
<tr><td>Capacité vitale (inspiration max après expiration max)</td><td>≈ 4 à 5 L</td></tr>
<tr><td>Volume résiduel (reste toujours dans les poumons)</td><td>≈ 1,2 à 1,5 L</td></tr></table></div>
<p>Valeurs indicatives : elles varient avec la taille, l’âge, l’entraînement.</p>
<h3>Qui commande la respiration ?</h3>
<p>Le besoin de respirer est déclenché surtout par la <b>montée du CO₂</b> dans le sang, pas par le manque d’oxygène. C’est pourquoi l’hyperventilation avant une apnée est dangereuse : elle fait baisser le CO₂, retarde l’envie de respirer, et on peut manquer d’oxygène sans prévenir (syncope).</p>
<h3>La circulation</h3>
<ul><li><b>Petite circulation</b> : cœur droit → poumons → cœur gauche. Le sang se charge en O₂ et rejette le CO₂ (et l’azote à la remontée).</li>
<li><b>Grande circulation</b> : cœur gauche → organes → cœur droit.</li>
<li>Les poumons filtrent normalement les petites bulles veineuses formées après une plongée.</li></ul>
<p>Chez une partie de la population, une petite communication entre les oreillettes peut rester ouverte (<b>foramen ovale perméable</b>). Des bulles peuvent alors passer côté artériel sans être filtrées : c’est un facteur de risque d’accident de désaturation, évoqué par les médecins après certains accidents.</p>
<h3>L’oreille, en détail</h3>
<ul><li><b>Externe</b> : conduit jusqu’au tympan.</li><li><b>Moyenne</b> : cavité d’air derrière le tympan, reliée à la gorge par la <b>trompe d’Eustache</b>. C’est elle qu’on équilibre.</li><li><b>Interne</b> : audition et équilibre (vestibule), remplie de liquide.</li></ul>
<div class="tbl"><table><tr><th>Méthode</th><th>Principe</th></tr>
<tr><td>Valsalva</td><td>souffler nez pincé, bouche fermée. Simple, mais pas en force.</td></tr>
<tr><td>Frenzel</td><td>la langue pousse l’air vers le nez, glotte fermée. Plus doux.</td></tr>
<tr><td>Béance tubaire volontaire</td><td>ouvrir les trompes par les muscles (bâillement, déglutition), sans pression.</td></tr>
<tr><td>Toynbee</td><td>déglutir nez pincé.</td></tr></table></div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>On équilibre <b>à la descente</b>, souvent et tôt, sans forcer. À la remontée, l’air s’échappe seul : on ne fait <b>jamais</b> de Valsalva en remontant.</div>
<h3>Le vertige alterno-barique</h3>
<p>Si une oreille s’équilibre moins bien que l’autre (souvent à la remontée), la différence de pression peut provoquer un vertige. On s’arrête, on redescend un peu si besoin, on se tient au binôme ou au mouillage.</p>
`,
  memo: [
    ["Commande","C’est le CO₂ qui donne envie de respirer : pas d’hyperventilation avant l’apnée."],
    ["Oreille moyenne","Air derrière le tympan, reliée à la gorge par la trompe d’Eustache."],
    ["Équilibrer","À la descente, tôt et souvent, sans forcer. Jamais de Valsalva à la remontée."],
    ["Foramen ovale","Passage possible des bulles côté artériel : facteur de risque d’ADD."]
  ],
  moniteur: ["Jusqu’où va le programme d’anatomie de l’écrit (schémas à légender ?)","Quelle méthode d’équilibrage recommandes-tu pour moi ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Où se font les échanges gazeux entre l’air et le sang ?","c":["Dans la trachée","Dans les bronches","Dans les alvéoles","Dans le cœur"],"a":2,"e":"Les alvéoles sont entourées de capillaires : l’O₂ y passe dans le sang, le CO₂ en sort."},
    {"q":"Qu’est-ce qui déclenche principalement l’envie de respirer ?","c":["La baisse d’O₂","La hausse du CO₂","La pression de l’eau","La fatigue musculaire"],"a":1,"e":"Le centre respiratoire réagit surtout au taux de CO₂. C’est pour ça que l’essoufflement est lié à l’accumulation de CO₂."},
    {"q":"La trompe d’Eustache relie…","c":["l’oreille externe et l’oreille moyenne","l’oreille moyenne et l’arrière-gorge","l’oreille interne et le cerveau","les sinus et le masque"],"a":1,"e":"Elle relie l’oreille moyenne au rhinopharynx. C’est par là que passe l’air quand tu équilibres."},
    {"q":"Quand dois-tu équilibrer tes oreilles ?","c":["Uniquement quand ça fait mal","Dès le début de la descente, souvent, avant la douleur","Seulement au fond","À la remontée"],"a":1,"e":"Tôt et souvent. Attendre la douleur, c’est déjà être en train de se blesser."},
    {"q":"Quel geste est à éviter à la remontée ?","c":["Expirer normalement","Faire une manœuvre de Valsalva","Purger son gilet","Regarder son ordinateur"],"a":1,"e":"À la remontée l’air sort tout seul de l’oreille moyenne. Un Valsalva peut provoquer un accident de l’oreille interne."},
    {"q":"Le sang oxygéné quitte les poumons et va vers…","c":["le cœur droit","le cœur gauche puis le corps","directement les muscles","le foie"],"a":1,"e":"Poumons → veines pulmonaires → cœur gauche → aorte → corps."},
    {"q":"Le foramen ovale perméable (FOP)…","c":["protège des barotraumatismes","peut laisser passer des bulles vers les artères","empêche la narcose","augmente la consommation d’air"],"a":1,"e":"Normalement les poumons filtrent les bulles. Avec un FOP, certaines peuvent passer directement du cœur droit au cœur gauche."},
    {"q":"Dans le sang, l’oxygène est surtout transporté par…","c":["le plasma seul","l’hémoglobine des globules rouges","les globules blancs","les plaquettes"],"a":1,"e":"L’hémoglobine fixe l’O₂ dans les poumons et le libère dans les tissus."},
    {"q":"Pourquoi le monoxyde de carbone (CO) est-il dangereux ?","c":["Il donne la narcose","Il prend la place de l’O₂ sur l’hémoglobine","Il fait gonfler les poumons","Il refroidit le corps"],"a":1,"e":"Le CO se fixe beaucoup plus fort que l’O₂ sur l’hémoglobine : les tissus manquent d’oxygène."},
    {"q":"L’oreille interne s’occupe…","c":["de l’audition et de l’équilibre","seulement de l’équilibrage","de la respiration","du goût"],"a":0,"e":"D’où les vertiges en cas d’atteinte de l’oreille interne."},
    {"q":"Les sinus sont…","c":["des muscles du visage","des cavités osseuses pleines d’air reliées au nez","des vaisseaux sanguins","une partie de l’oreille"],"a":1,"e":"Comme l’oreille moyenne, ils peuvent subir un barotraumatisme si le passage d’air est bouché (rhume)."},
    {"q": "Qu’est-ce qui déclenche principalement l’envie de respirer ?", "c": ["la pression de l’eau", "la hausse du CO₂ dans le sang", "la baisse de l’azote", "la baisse de l’O₂ seulement"], "a": 1, "e": "D’où le danger de l’hyperventilation : elle retarde ce signal.", "lvl": 2},
    {"q": "La trompe d’Eustache relie…", "c": ["l’oreille interne au cerveau", "le tympan au conduit externe", "les sinus aux poumons", "l’oreille moyenne à la gorge"], "a": 3, "e": "C’est par elle que l’air arrive dans l’oreille moyenne quand on équilibre.", "lvl": 2},
    {"q": "Un foramen ovale perméable augmente surtout le risque…", "c": ["d’essoufflement", "de placage de masque", "d’accident de désaturation", "de narcose"], "a": 2, "e": "Des bulles veineuses peuvent passer dans la circulation artérielle sans être filtrées par les poumons.", "lvl": 2}
  ]
});

AA.content.module({
  id: "accidents", world: "n2", depth: "−18 m", icon: "cross",
  title: "Accidents",
  sub: "Reconnaître, prévenir, réagir",
  essentiel: `
<p>Pour chaque accident, retiens quatre choses : <b>cause, signes, prévention, conduite à tenir</b>.</p>
<div class="tbl"><table>
<tr><th>Accident</th><th>Cause</th><th>Signes</th><th>Prévention / réaction</th></tr>
<tr><td><b>Barotraumatisme d’oreille</b></td><td>Pression non équilibrée</td><td>Douleur, vertige, bourdonnement</td><td>Équilibrer tôt. Douleur : remonter un peu.</td></tr>
<tr><td><b>Placage de masque</b></td><td>Air du masque comprimé</td><td>Yeux rouges, hématomes</td><td>Souffler un peu par le nez dans le masque.</td></tr>
<tr><td><b>Surpression pulmonaire</b></td><td>Remontée en bloquant sa respiration, même depuis peu de profondeur</td><td>Douleur thoracique, toux, crachat sanglant, troubles neurologiques</td><td>Ne jamais bloquer sa respiration. Urgence : O₂ et alerte.</td></tr>
<tr><td><b>ADD</b> (accident de désaturation)</td><td>Bulles d’azote : remontée trop rapide, paliers non faits</td><td>Fatigue anormale, démangeaisons, douleurs articulaires, fourmillements, paralysie, vertiges</td><td>Respecter vitesse et paliers. Urgence : O₂ et alerte.</td></tr>
<tr><td><b>Narcose</b></td><td>Pp N₂ élevée</td><td>Euphorie ou angoisse, réflexes lents, idée fixe</td><td>Remonter de quelques mètres : ça disparaît.</td></tr>
<tr><td><b>Essoufflement</b></td><td>Accumulation de CO₂ (effort, froid, stress, détendeur dur)</td><td>Respiration rapide et inefficace, sensation de manque d’air</td><td>Stopper l’effort, expirer longuement, prévenir le binôme, remonter un peu.</td></tr>
<tr><td><b>Hyperoxie</b></td><td>Pp O₂ trop élevée</td><td>Crise convulsive</td><td>Ne pas dépasser la limite de Pp O₂ (concerne surtout le Nitrox).</td></tr>
<tr><td><b>Hypothermie</b></td><td>Froid</td><td>Frissons, engourdissement</td><td>Bonne combinaison, écourter la plongée.</td></tr>
</table></div>
<h3>Facteurs qui favorisent l’ADD</h3>
<p>Effort (surtout à la remontée et après), froid, fatigue, déshydratation, stress, surpoids, âge, profils « yoyo », plongées successives, apnée ou avion après la plongée.</p>
<h3>Conduite à tenir face à un accident de plongée (suspicion d’ADD ou de surpression)</h3>
<ol>
<li><b>Mettre la victime sous oxygène</b> au plus tôt (inhalateur, haut débit, ≈ 15 L/min).</li>
<li><b>Alerter</b> : en mer, VHF canal 16 ou le <b>196</b> (CROSS) ; à terre, le 15 ou le 112.</li>
<li>Faire boire de l’eau plate si la victime est consciente et n’a pas de nausées.</li>
<li>L’allonger, la couvrir, la surveiller, noter heure et paramètres de plongée.</li>
<li>Ne jamais la renvoyer dans l’eau pour « refaire un palier ».</li>
</ol>
<div class="callout check"><span class="eyebrow">À vérifier avec ton moniteur</span>Le protocole exact (aspirine ou non, fiche d’évacuation, matériel du bateau) dépend de ton club et des recommandations en vigueur.</div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>Les signes d’un ADD peuvent apparaître <b>après</b> la plongée, souvent dans l’heure et parfois jusqu’à 24 h. Une fatigue inhabituelle ou des fourmillements sur le bateau ne sont jamais « juste de la fatigue ».</div>
`,
  approfondir: `
<h3>Ranger les accidents en trois familles</h3>
<div class="tbl"><table><tr><th>Famille</th><th>Cause</th><th>Exemples</th></tr>
<tr><td>Mécaniques (barotraumatismes)</td><td>variation de volume d’un espace aérien (Mariotte)</td><td>oreille, sinus, dents, placage de masque, surpression pulmonaire</td></tr>
<tr><td>Toxiques</td><td>pression partielle d’un gaz trop forte (Dalton)</td><td>narcose, hyperoxie, essoufflement (CO₂), monoxyde de carbone</td></tr>
<tr><td>Biophysiques</td><td>bulles d’azote (Henry)</td><td>accident de désaturation (ADD)</td></tr></table></div>
<p>Plus le froid, l’épuisement, la noyade et les animaux. Si tu sais dans quelle famille ranger un accident, tu retrouves sa cause, sa prévention et ses signes.</p>
<h3>La surpression pulmonaire, le plus grave des barotraumatismes</h3>
<p>Mécanisme : on bloque l’expiration en remontant (panique, toux, apnée, remontée trop rapide). L’air des poumons se dilate, les alvéoles se déchirent. L’air peut passer dans le sang et aller au cerveau.</p>
<p>Signes possibles : douleur thoracique, toux, crachat de sang mousseux, difficulté à respirer, troubles neurologiques, perte de connaissance. Ils apparaissent vite, souvent dès la sortie.</p>
<p>Prévention : expirer en remontant, ne jamais bloquer, remontée lente.</p>
<h3>L’ADD, formes et signes</h3>
<p>Une classification souvent utilisée en formation distingue :</p>
<ul><li><b>Formes « bénignes »</b> (souvent appelées type I) : démangeaisons et marbrures de la peau (« puces », « moutons »), douleurs articulaires (« bends »).</li>
<li><b>Formes graves</b> (type II) : neurologiques (fourmillements, paralysie, troubles de la vue ou de la parole), vestibulaires (vertiges, nausées), cardio-pulmonaires.</li></ul>
<p>En pratique, <b>tout signe après une plongée est un accident jusqu’à preuve du contraire</b>, et une forme « cutanée » peut précéder une forme grave. On ne trie pas, on agit.</p>
<p>Délai : la plupart des signes apparaissent dans l’heure qui suit la sortie, mais ils peuvent survenir plus tard (jusqu’à 24 h).</p>
<h3>Les facteurs qui comptent vraiment</h3>
<ul><li>Profil : profondeur, durée, remontée rapide, paliers écourtés, profils « yo-yo », plongées successives.</li>
<li>Toi : fatigue, déshydratation, froid, surpoids, âge, effort pendant ou après la plongée, alcool.</li>
<li>Après : apnée ou effort, avion ou montagne trop tôt.</li></ul>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>Protocole exact de ton club : débit d’oxygène, eau à boire, aspirine ou non (contre-indications, avis médical), numéros d’alerte, fiche d’évacuation. Ces points dépendent des recommandations en vigueur.</div>
`,
  memo: [
    ["3 familles","Mécaniques (Mariotte), toxiques (Dalton), biophysiques (Henry)."],
    ["Surpression","Bloquer l’expiration en remontant : le plus grave des barotraumatismes."],
    ["ADD","Tout signe après une plongée est un accident jusqu’à preuve du contraire."],
    ["Geste n°1","Oxygène à fort débit et alerte, sans attendre."]
  ],
  moniteur: ["Quel est le protocole exact du club en cas d’accident (O₂, eau, aspirine, alerte) ?","Où est le matériel de secours sur le bateau et qui sait s’en servir ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Après une remontée rapide en retenant ton souffle : douleur thoracique et crachats sanglants. C’est probablement…","c":["une narcose","une surpression pulmonaire","un placage de masque","un essoufflement"],"a":1,"e":"L’air dilaté a déchiré des alvéoles. Urgence vitale : oxygène et alerte."},
    {"q":"30 min après la plongée, ton binôme a des fourmillements dans un bras et une grande fatigue. Que fais-tu ?","c":["Il se repose, ça va passer","Il retourne faire un palier","Oxygène et alerte des secours","Il prend un café chaud"],"a":2,"e":"Suspicion d’ADD : oxygène au plus tôt et alerte. Jamais de « recompression » dans l’eau."},
    {"q":"Quel est le geste prioritaire face à une suspicion d’ADD sur le bateau ?","c":["Le faire boire de l’alcool","L’oxygène à haut débit","Le faire marcher","Attendre le port"],"a":1,"e":"L’oxygène aide à éliminer l’azote et à oxygéner les tissus. On alerte en même temps."},
    {"q":"Face à une narcose, la bonne réaction est de…","c":["remonter de quelques mètres","descendre pour se stabiliser","faire un Valsalva","nager plus vite"],"a":0,"e":"La narcose dépend de la Pp N₂ : en remontant un peu, les symptômes disparaissent rapidement."},
    {"q":"Tu sens que tu t’essouffles. Que fais-tu en premier ?","c":["Tu accélères pour finir vite","Tu stoppes l’effort et tu expires longuement","Tu bloques ta respiration","Tu enlèves ton détendeur"],"a":1,"e":"L’essoufflement vient du CO₂. Arrêter l’effort et allonger l’expiration permet de l’évacuer. Préviens ton binôme."},
    {"q":"Lequel n’est PAS un facteur favorisant l’ADD ?","c":["Bien s’hydrater avant la plongée","Le froid","Un effort à la remontée","Un profil en yoyo"],"a":0,"e":"La déshydratation favorise l’ADD. Boire de l’eau est au contraire une bonne prévention."},
    {"q":"Tes yeux sont rouges après la plongée et tu as senti le masque t’aspirer à la descente. Tu aurais dû…","c":["serrer la sangle","souffler un peu par le nez dans le masque","faire un Valsalva plus fort","descendre plus vite"],"a":1,"e":"C’est un placage de masque. On compense en soufflant par le nez pour rééquilibrer la pression dans le masque."},
    {"q":"En mer, pour alerter les secours, tu utilises…","c":["la VHF canal 16 ou le 196 (CROSS)","le 17 uniquement","la VHF canal 72","rien, on rentre au port"],"a":0,"e":"Le CROSS coordonne les secours en mer : VHF canal 16 ou 196 depuis un téléphone. À terre : 15 ou 112."},
    {"q":"Peut-on faire un ADD en ayant respecté sa table ou son ordinateur ?","c":["Non, jamais","Oui, c’est possible","Seulement au-delà de 40 m","Seulement en apnée"],"a":1,"e":"Les modèles réduisent le risque sans l’annuler. Facteurs favorisants et profils agressifs comptent aussi."},
    {"q":"Démangeaisons et marbrures sur la peau après une plongée évoquent…","c":["un coup de soleil","un ADD cutané","une allergie au néoprène, forcément","une narcose"],"a":1,"e":"Les « puces » et « moutons » sont des signes d’ADD cutané : oxygène et avis médical."},
    {"q":"Après une plongée, l’avion…","c":["c’est possible tout de suite","il faut attendre plusieurs heures","c’est interdit 7 jours","pas de règle"],"a":1,"e":"La baisse de pression en cabine favorise les bulles. Le délai exact (souvent 12 à 24 h) dépend de tes plongées : vérifie avec ton moniteur."},
    {"q":"Faire de l’apnée profonde juste après une plongée en bouteille…","c":["est recommandé pour se détendre","est déconseillé","n’a aucun effet","empêche l’ADD"],"a":1,"e":"Les efforts et variations de pression favorisent la formation de bulles."},
    {"q":"Une intoxication au CO en plongée vient le plus souvent…","c":["d’un air de bloc pollué au gonflage","de la narcose","d’une remontée rapide","de l’eau froide"],"a":0,"e":"Prise d’air du compresseur près d’un moteur : le CO passe dans le bloc. Maux de tête, nausées, malaise."},
    {"q": "Un accident de désaturation est un accident…", "c": ["biophysique (bulles d’azote)", "mécanique", "toxique", "thermique"], "a": 0, "e": "Il vient de l’azote dissous qui forme des bulles (loi de Henry).", "lvl": 2},
    {"q": "Des démangeaisons de la peau après une plongée :", "c": ["se traitent par une nouvelle plongée", "sont un signe possible d’ADD : on agit (O₂, alerte, surveillance)", "sont toujours bénignes, on attend", "viennent toujours du soleil"], "a": 1, "e": "Même une forme « cutanée » se prend au sérieux et peut évoluer.", "lvl": 2},
    {"q": "Qu’est-ce qui provoque une surpression pulmonaire ?", "c": ["descendre trop vite", "respirer trop vite au fond", "plonger dans l’eau froide", "bloquer son expiration en remontant"], "a": 3, "e": "L’air se dilate dans des poumons fermés : les alvéoles se déchirent.", "lvl": 2}
  ]
});

AA.content.module({
  id: "deco", world: "n2", depth: "−20 m", icon: "profile", diagram: "deco",
  title: "Décompression",
  sub: "Tables MN90 et ordinateur",
  essentiel: `
<p>La décompression sert à laisser l’azote ressortir sans faire de bulles. On la gère avec une <b>table</b> (en France, souvent la MN90 ou sa version fédérale) ou un <b>ordinateur</b>.</p>
<h3>Vocabulaire des tables</h3>
<ul>
<li><b>Profondeur</b> : la profondeur maximale atteinte. Si elle n’est pas dans la table, on prend la <b>ligne immédiatement supérieure</b> (23 m → ligne 25 m).</li>
<li><b>Durée de plongée</b> : du moment où tu quittes la surface au moment où tu <b>commences la remontée</b>. Si elle n’est pas dans la table, on prend la durée immédiatement supérieure.</li>
<li><b>Paliers</b> : arrêts à 3 m, 6 m, 9 m… avec une durée donnée par la table.</li>
<li><b>Groupe de plongée successive</b> (GPS) : une lettre qui résume l’azote qu’il te reste en sortant.</li>
</ul>
<h3>Vitesses de remontée (MN90)</h3>
<div class="formula">Du fond au premier palier : 15 à 17 m/min<br>Entre les paliers et du dernier palier à la surface : 6 m/min</div>
<h3>Deux plongées dans la journée</h3>
<ul>
<li><b>Intervalle de moins de 15 min</b> : <b>plongée consécutive</b>. On la traite comme une seule plongée : profondeur = la plus grande des deux, durée = la somme des deux.</li>
<li><b>Intervalle de 15 min à 12 h</b> : <b>plongée successive</b>. Avec la lettre GPS et l’intervalle, la table donne un <b>azote résiduel</b>, puis une <b>majoration</b> en minutes à ajouter à la durée réelle de la deuxième plongée.</li>
<li><b>Plus de 12 h</b> : plongée simple, comme si de rien n’était.</li>
</ul>
<div class="callout ex"><span class="eyebrow">Exemple de méthode · plongée successive</span>Le matin : 25 m pendant 30 min. Sortie avec une lettre de groupe. Intervalle de 3 h. L’après-midi : 20 m pendant 35 min.
<pre>1. Lettre du matin (table 1, ligne 25 m, colonne 30 min)
2. Lettre + 3 h d’intervalle → azote résiduel (table 2)
3. Azote résiduel + profondeur 20 m → majoration en min (table 3)
4. Durée fictive = 35 + majoration
5. On lit les paliers à 20 m avec cette durée fictive.</pre>
Fais l’exercice avec la table officielle de ton club : les valeurs ne sont pas reproduites ici pour éviter toute erreur de recopie.</div>
<h3>Ordinateur de plongée</h3>
<ul>
<li>Il calcule en continu sur ton <b>profil réel</b> (plusieurs niveaux), avec un modèle mathématique.</li>
<li>Il est <b>personnel</b> : on ne le prête pas entre deux plongées, il garde la mémoire de ton azote.</li>
<li>Dans une palanquée, on suit <b>l’ordinateur le plus pénalisant</b>.</li>
<li>Respecte sa vitesse de remontée et ses paliers. Un <b>palier de sécurité</b> de quelques minutes vers 3 à 5 m est recommandé même sans palier obligatoire.</li>
<li>Prévois un moyen de secours (table, ordinateur du binôme) en cas de panne.</li>
</ul>
<div class="callout check"><span class="eyebrow">À vérifier avec ton moniteur</span>Ton club utilise peut-être la version fédérale de la MN90 et des procédures spécifiques (remontée rapide, remontée lente, palier interrompu, avion après plongée). Apprends ces procédures sur la table officielle.</div>
`,
  approfondir: `
<h3>D’où viennent les tables ?</h3>
<p>Un modèle découpe le corps en <b>compartiments</b> fictifs, chacun avec sa période (vitesse de chargement en azote) et son seuil de sursaturation tolérée. La table MN90 utilise <b>12 compartiments</b>, de périodes 5 à 120 minutes. Le palier sert à laisser les compartiments se vider sans dépasser leur seuil.</p>
<h3>Lire une table sans erreur</h3>
<ol><li>Profondeur = la plus grande atteinte, même un instant.</li>
<li>Durée = de l’immersion au <b>début</b> de la remontée.</li>
<li>Profondeur ou durée absente de la table : on prend la valeur <b>immédiatement supérieure</b>.</li>
<li>On lit les paliers et le groupe de plongée successive (GPS).</li></ol>
<h3>Les vitesses de remontée</h3>
<ul><li>Du fond au premier palier : 15 à 17 m/min (MN90).</li><li>Entre les paliers et du dernier palier à la surface : 6 m/min (30 s pour 3 m).</li></ul>
<p>Les ordinateurs demandent souvent 10 m/min ou moins : suis ton ordinateur et la consigne du club.</p>
<h3>Durée totale de remontée (DTR)</h3>
<div class="formula">DTR = remontée jusqu’au 1er palier + durées des paliers + remontées entre paliers et vers la surface</div>
<div class="callout ex"><span class="eyebrow">Exemple de méthode</span>Plongée à 30 m, une table (fictive ici) indique 2 min à 6 m et 10 min à 3 m.<pre>30 → 6 m à 15 m/min : 24/15 ≈ 1,6 min, arrondi à 2 min
palier 6 m : 2 min ; 6 → 3 m : 0,5 min ; palier 3 m : 10 min ; 3 → 0 m : 0,5 min
DTR ≈ 2 + 2 + 0,5 + 10 + 0,5 = 15 min</pre>Valeurs inventées pour la méthode : utilise ta table officielle.</div>
<h3>Ordinateur : réglages et modèles</h3>
<p>Beaucoup d’ordinateurs utilisent un modèle de type Bühlmann avec des <b>facteurs de gradient</b> (par exemple 30/85, 40/85) : plus les chiffres sont bas, plus l’ordinateur est prudent. D’autres modèles existent. Un même plongeur garde le même ordinateur d’une plongée à l’autre de la journée : il mémorise l’azote résiduel.</p>
<h3>Altitude et avion</h3>
<p>Monter en altitude après une plongée, c’est remonter encore : la pression baisse. On respecte un délai avant l’avion (indiqué par l’ordinateur ou les recommandations) et on évite les cols de montagne juste après.</p>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>La table utilisée au club, les procédures particulières (remontée rapide, palier interrompu), les règles de plongée successive et consécutive et le délai avant l’avion.</div>
`,
  memo: [
    ["Durée","De l’immersion au début de la remontée."],
    ["Valeur absente","On prend la profondeur ou la durée immédiatement supérieure."],
    ["Vitesses MN90","15 à 17 m/min jusqu’au palier, 6 m/min ensuite."],
    ["Palanquée","On suit l’ordinateur le plus pénalisant."]
  ],
  moniteur: ["Quelle table utilise-t-on au club, et quelles procédures particulières faut-il connaître ?","Quel réglage de prudence conseilles-tu pour mon ordinateur ?","Quel délai avant l’avion retient le club ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Avec la MN90, quelle vitesse de remontée du fond jusqu’au premier palier ?","c":["6 m/min","10 m/min","15 à 17 m/min","Aussi vite que possible"],"a":2,"e":"15 à 17 m/min du fond au premier palier, puis 6 m/min entre les paliers et vers la surface."},
    {"q":"Et entre le dernier palier et la surface ?","c":["6 m/min","15 m/min","20 m/min","1 m/min"],"a":0,"e":"6 m/min : la fin de remontée est la plus lente, c’est là que la variation relative de pression est la plus forte."},
    {"q":"Tu as plongé à 23 m maxi. Quelle ligne lis-tu dans la table ?","c":["22 m","23 m (arrondi)","25 m","20 m"],"a":2,"e":"On prend toujours la profondeur immédiatement supérieure : 25 m."},
    {"q":"Dans les tables, la durée de plongée se compte…","c":["jusqu’à la sortie de l’eau","du départ de la surface jusqu’au début de la remontée","seulement le temps passé au fond","du premier palier à la surface"],"a":1,"e":"De l’immersion au début de la remontée. Le temps de remontée et de paliers n’en fait pas partie."},
    {"q":"Deux plongées séparées de 10 min. Comment les traiter ?","c":["Deux plongées simples","Plongée successive avec majoration","Une seule plongée : profondeur maxi, durées additionnées","On ignore la deuxième"],"a":2,"e":"Moins de 15 min : plongée consécutive. Profondeur = la plus grande, durée = la somme."},
    {"q":"Pour une plongée successive, la majoration…","c":["s’ajoute à la durée réelle de la 2e plongée","s’ajoute à la profondeur","se retire des paliers","remplace la lettre de groupe"],"a":0,"e":"La majoration (en minutes) s’ajoute à la durée de la 2e plongée pour lire les paliers."},
    {"q":"Dans une palanquée avec plusieurs ordinateurs, on suit…","c":["celui du plus expérimenté","celui qui donne le moins de paliers","le plus pénalisant","la moyenne"],"a":2,"e":"On suit l’ordinateur le plus conservateur, pour que personne ne remonte avec une désaturation insuffisante."},
    {"q":"Peut-on prêter son ordinateur à un ami pour sa plongée de l’après-midi ?","c":["Oui, s’il est à jour","Non, il garde la mémoire de ton azote","Oui, s’il le remet à zéro","Oui, en mode profondimètre seulement"],"a":1,"e":"L’ordinateur calcule ton azote résiduel. Il est personnel et ne doit pas changer de plongeur dans la journée."},
    {"q":"À quoi servent les paliers ?","c":["À économiser de l’air","À laisser l’azote s’éliminer sans former de bulles","À se réchauffer","À équilibrer les oreilles"],"a":1,"e":"On laisse les tissus se désaturer progressivement, sous une pression qui limite la sursaturation."},
    {"q":"Du palier de 3 m à la surface à 6 m/min, la remontée dure…","c":["3 s","30 s","1 min","3 min"],"a":1,"e":"3 m à 6 m/min = 0,5 min = 30 s."},
    {"q":"Tu remontes de 20 m au palier de 3 m à 15 m/min. Durée environ ?","c":["≈ 20 s","≈ 1 min","≈ 3 min","≈ 5 min"],"a":1,"e":"17 m / 15 m/min ≈ 1,1 min, soit un peu plus d’une minute."},
    {"q":"Ton ordinateur annonce un palier que la table ne demande pas. Tu…","c":["ignores l’ordinateur","fais le palier de l’ordinateur","remontes directement","fais la moyenne"],"a":1,"e":"On applique toujours la procédure la plus pénalisante."},
    {"q":"La table MN90 peut-elle s’utiliser telle quelle dans un lac de montagne ?","c":["Oui, sans changement","Non, il faut une procédure ou des tables altitude","Oui, si l’eau est froide","Seulement en été"],"a":1,"e":"La pression en surface est plus faible : les rapports de pression changent, il faut une procédure adaptée."},
    {"q": "Combien de compartiments utilise le modèle des tables MN90 ?", "c": ["16", "3", "12", "5"], "a": 2, "e": "12 compartiments de périodes 5 à 120 min. Les modèles de type Bühlmann en utilisent souvent 16.", "lvl": 2},
    {"q": "Facteurs de gradient 30/85 contre 50/95 : lequel est le plus prudent ?", "c": ["30/85", "50/95", "identiques", "ça dépend de la profondeur seulement"], "a": 0, "e": "Des chiffres plus bas tolèrent moins de sursaturation : plus de prudence, paliers plus longs.", "lvl": 2},
    {"q": "Tu as atteint 31 m un court instant, le reste à 25 m. Quelle profondeur pour la table ?", "c": ["20 m", "31 m, donc la ligne immédiatement supérieure", "25 m", "28 m (moyenne)"], "a": 1, "e": "La profondeur retenue est toujours la plus grande atteinte.", "lvl": 2}
  ]
});

AA.content.module({
  id: "materiel", world: "n2", depth: "−25 m", icon: "tank", diagram: "materiel",
  title: "Matériel",
  sub: "Bloc, détendeur, gilet, entretien",
  essentiel: `
<h3>Le bloc</h3>
<ul>
<li>En acier ou en aluminium. Gonflé à sa <b>pression de service</b> (souvent 200 ou 230 bar).</li>
<li>Des marquages sur l’ogive : volume, pression de service et d’épreuve, date d’épreuve, poinçons.</li>
<li>Robinetterie à <b>étrier</b> ou <b>DIN</b> (vissé).</li>
<li>Contrôles : <b>inspection visuelle</b> régulière (TIV, en général annuelle en club) et <b>requalification</b> périodique.</li>
<li>Ne jamais le vider complètement : garder un peu de pression empêche l’eau et l’humidité d’entrer (corrosion). Pas au soleil, pas dans un coffre brûlant, bien calé pendant le transport.</li>
</ul>
<h3>Le détendeur</h3>
<ul>
<li><b>1er étage</b> (sur le bloc) : réduit la haute pression du bloc à une <b>moyenne pression</b> d’environ 8 à 10 bar au-dessus de la pression ambiante.</li>
<li><b>2e étage</b> (en bouche) : te donne l’air <b>à la pression ambiante</b>, à la demande, quand tu inspires.</li>
<li>Sorties : haute pression pour le manomètre ; moyenne pression pour les deux 2e étages et le direct system du gilet.</li>
<li><b>Octopus</b> : un second 2e étage pour donner de l’air à un plongeur en panne.</li>
<li>En eau froide, le détendeur peut <b>givrer</b> et se mettre en <b>débit continu</b> : on passe sur l’autre source d’air et on remonte en contrôlant sa vitesse.</li>
</ul>
<h3>Le gilet stabilisateur</h3>
<p>Il sert à <b>s’équilibrer</b> sous l’eau et à <b>flotter</b> en surface. Gonflage par le direct system (inflateur), purges haute et basse.</p>
<h3>Le reste</h3>
<p>Ordinateur ou profondimètre et montre, parachute de palier, combinaison adaptée à la température, couteau ou coupe-fil, lampe.</p>
<h3>Entretien</h3>
<ul>
<li>Rincer tout à l’<b>eau douce</b>, avec le <b>capuchon sec en place</b> sur le 1er étage.</li>
<li>Sécher à l’ombre, révision du détendeur selon les préconisations.</li>
</ul>
<div class="callout check"><span class="eyebrow">À vérifier avec ton moniteur</span>Les fréquences exactes de TIV et de requalification et le matériel obligatoire en autonomie sont fixés par la réglementation et le club. Fais-les confirmer.</div>
`,
  approfondir: `
<h3>Le bloc</h3>
<ul><li>Marquages : volume en litres, pression de service, pression d’épreuve, dates d’épreuves, poinçons.</li>
<li><b>Inspection visuelle</b> intérieure et extérieure (TIV) régulière, et <b>requalification</b> périodique : les fréquences dépendent de la réglementation et de l’usage, ton club les applique.</li>
<li>Robinetterie : raccord à étrier (INT) ou à vis (DIN), parfois deux sorties pour monter deux premiers étages.</li>
<li>Acier ou aluminium : l’alu est plus volumineux et devient flottant vide, il faut en tenir compte au lestage.</li></ul>
<h3>Le détendeur</h3>
<ul><li><b>1er étage</b> : abaisse la pression du bloc à une moyenne pression (≈ 8 à 10 bar au-dessus de la pression ambiante). Il est dit <b>compensé</b> quand sa moyenne pression ne varie pas avec la pression du bloc.</li>
<li><b>2e étage</b> : délivre l’air à la pression ambiante, à la demande.</li>
<li><b>Givrage</b> en eau froide : la détente de l’air refroidit fortement le mécanisme ; il peut se bloquer en débit continu. On limite les gros débits (gilet, purge) et on prévoit deux détendeurs complets sur deux sorties.</li></ul>
<h3>Instruments</h3>
<p>Manomètre (pression du bloc), ordinateur ou ensemble profondimètre et montre avec tables, boussole, parachute de palier, lampe. Toute la palanquée autonome doit pouvoir gérer sa remontée.</p>
<h3>Entretien et vérifications</h3>
<ul><li>Rinçage à l’eau douce, séchage à l’ombre, bouchon sec sur le 1er étage.</li>
<li>Vérification avant chaque plongée : air ouvert, pression, 2e étages qui respirent, gilet qui gonfle et purge, lest, ordinateur allumé.</li></ul>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>Fréquences d’inspection et de requalification des blocs, matériel exigé en autonomie, configuration en eau froide.</div>
`,
  memo: [
    ["1er étage","Bloc → moyenne pression (≈ ambiante + 8 à 10 bar)."],
    ["2e étage","Moyenne pression → pression ambiante, à la demande."],
    ["Givrage","Eau froide + gros débit : risque de débit continu."],
    ["Avant de plonger","Air ouvert, pression, détendeurs, gilet, lest, ordinateur."]
  ],
  moniteur: ["Quelles sont les fréquences TIV et requalification appliquées au club ?","Quel matériel est obligatoire pour une palanquée autonome chez nous ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Le 1er étage du détendeur…","c":["donne l’air à la pression ambiante","réduit la haute pression du bloc à une moyenne pression","sert de manomètre","gonfle le bloc"],"a":1,"e":"Il transforme la haute pression du bloc (ex. 200 bar) en moyenne pression (≈ 8 à 10 bar au-dessus de l’ambiante)."},
    {"q":"Le 2e étage délivre l’air…","c":["à 200 bar","à la moyenne pression","à la pression ambiante, à la demande","à 1 bar quelle que soit la profondeur"],"a":2,"e":"Il s’ouvre quand tu inspires et donne l’air à la pression ambiante, pour que tes poumons puissent l’utiliser."},
    {"q":"Ton détendeur se met en débit continu dans une eau à 10 °C. Que fais-tu ?","c":["Tu continues la plongée","Tu passes sur l’autre source d’air et tu remontes","Tu le tapes contre le bloc","Tu descends plus profond"],"a":1,"e":"C’est probablement un givrage. Change de source d’air, signale-le, et mets fin à la plongée en remontant normalement."},
    {"q":"Pourquoi garder un peu de pression dans un bloc après la plongée ?","c":["Pour la prochaine plongée","Pour éviter que l’humidité entre et corrode le bloc","C’est obligatoire pour le transport aérien","Pour le peser"],"a":1,"e":"Un bloc vide peut laisser entrer de l’air humide ou de l’eau : corrosion interne."},
    {"q":"Comment rincer son détendeur ?","c":["À l’eau de mer","À l’eau douce, capuchon sec en place","Au jet haute pression, sans capuchon","On ne le rince jamais"],"a":1,"e":"Eau douce, capuchon bien en place pour qu’aucune eau n’entre dans le 1er étage."},
    {"q":"L’octopus sert à…","c":["mesurer la pression du bloc","donner de l’air à un autre plongeur ou avoir une source de secours","gonfler le parachute uniquement","mesurer la profondeur"],"a":1,"e":"C’est un second 2e étage : il permet d’assister un plongeur en panne d’air."},
    {"q":"Le manomètre est branché sur une sortie…","c":["haute pression du 1er étage","moyenne pression","du 2e étage","du gilet"],"a":0,"e":"Il doit lire la pression du bloc : sortie HP."},
    {"q":"Le direct system du gilet est alimenté en…","c":["haute pression","moyenne pression","pression ambiante","oxygène"],"a":1,"e":"Comme les 2e étages, il est sur une sortie moyenne pression."},
    {"q":"Le raccord DIN se distingue de l’étrier car il…","c":["se visse dans le robinet","est réservé au Nitrox","n’a pas de joint","se clipse"],"a":0,"e":"Le 1er étage DIN se visse directement dans la robinetterie."},
    {"q":"Le parachute de palier sert surtout à…","c":["remonter plus vite","signaler la palanquée en surface pendant les paliers","remplacer le gilet","relever une ancre de 100 kg"],"a":1,"e":"Il montre au bateau où tu es pendant les paliers et aide à tenir la profondeur."},
    {"q": "Un 1er étage « compensé » donne une moyenne pression…", "c": ["qui baisse quand le bloc se vide", "égale à la pression du bloc", "égale à la pression ambiante", "stable quelle que soit la pression du bloc"], "a": 3, "e": "La respiration reste aussi facile en début et en fin de bloc.", "lvl": 2},
    {"q": "Pourquoi un détendeur peut-il givrer ?", "c": ["le bloc est trop plein", "la moyenne pression est trop basse", "la détente de l’air refroidit le mécanisme", "l’eau salée gèle"], "a": 2, "e": "Une détente rapide fait chuter la température : en eau froide, de la glace peut bloquer le clapet.", "lvl": 2},
    {"q": "Un bloc aluminium presque vide a tendance à…", "c": ["devenir flottant", "devenir plus lourd", "rester neutre", "exploser"], "a": 0, "e": "Volume plus grand qu’un acier, et il perd la masse de l’air : il remonte. À prévoir dans le lestage.", "lvl": 2}
  ]
});

AA.content.module({
  id: "regles", world: "n2", depth: "−30 m", icon: "flag",
  title: "Réglementation",
  sub: "Prérogatives N2, organisation",
  essentiel: `
<p>En France, la plongée de loisir est encadrée par le <b>Code du sport</b>. La FFESSM délivre les brevets qui donnent des <b>aptitudes</b>.</p>
<h3>Ce que permet le N2</h3>
<ul>
<li><b>PE40</b> : plonger <b>encadré</b> par un guide de palanquée jusqu’à <b>40 m</b>.</li>
<li><b>PA20</b> : plonger <b>en autonomie</b> jusqu’à <b>20 m</b>, avec d’autres plongeurs autonomes, en palanquée de <b>3 maximum</b>, sous la responsabilité d’un <b>directeur de plongée</b> présent sur le site.</li>
<li>La limite pour la plongée à l’air en France est de <b>60 m</b>. Au-delà de 40 m, il faut d’autres brevets.</li>
</ul>
<h3>Les rôles</h3>
<ul>
<li><b>Directeur de plongée (DP)</b> : organise la sortie, compose les palanquées, fixe les paramètres (profondeur, durée), tient la fiche de sécurité.</li>
<li><b>Guide de palanquée</b> (GP, niveau 4 ou moniteur) : encadre la palanquée sous l’eau.</li>
<li><b>Toi en autonomie</b> : tu respectes les consignes du DP, tu surveilles tes binômes, tu rends compte en sortant.</li>
</ul>
<h3>Documents</h3>
<ul>
<li><b>Licence fédérale</b> (avec son assurance responsabilité civile). Une assurance individuelle complémentaire est conseillée.</li>
<li><b>Certificat médical</b> d’absence de contre-indication en cours de validité.</li>
<li><b>Carnet de plongée</b> : il prouve ton expérience.</li>
</ul>
<h3>En surface</h3>
<p>Le <b>pavillon Alpha</b> (blanc et bleu) signale des plongeurs en immersion : les bateaux doivent s’écarter et ralentir.</p>
<div class="callout check"><span class="eyebrow">À vérifier avec ton moniteur</span>Les âges minimums, la taille maximale des palanquées encadrées, le matériel obligatoire et la durée de validité du certificat médical ont changé plusieurs fois. Fais confirmer les règles en vigueur cette saison.</div>
`,
  approfondir: `
<h3>Le cadre</h3>
<p>En France, la plongée à l’air en structure (club, centre) est encadrée par le <b>Code du sport</b> (articles A.322-71 et suivants). Il définit les espaces d’évolution, les aptitudes des plongeurs et le rôle du directeur de plongée.</p>
<div class="tbl"><table><tr><th>Espace</th><th>Profondeur</th></tr>
<tr><td>Espace proche</td><td>0 à 6 m</td></tr><tr><td></td><td>0 à 12 m</td></tr><tr><td></td><td>0 à 20 m</td></tr><tr><td>Espace médian</td><td>0 à 40 m</td></tr><tr><td>Espace lointain</td><td>0 à 60 m</td></tr></table></div>
<h3>Aptitudes du N2</h3>
<ul><li><b>PE40</b> : encadré par un guide de palanquée jusqu’à 40 m.</li>
<li><b>PA20</b> : autonome jusqu’à 20 m, en palanquée de plongeurs autonomes, sur décision du directeur de plongée qui fixe les paramètres.</li></ul>
<h3>Les rôles</h3>
<ul><li><b>Directeur de plongée (DP)</b> : organise, choisit le site, compose les palanquées, fixe les paramètres, déclenche les secours. Il a le dernier mot.</li>
<li><b>Guide de palanquée</b> : conduit la palanquée encadrée (N4 minimum).</li>
<li><b>Plongeurs autonomes</b> : responsables ensemble du respect des consignes.</li></ul>
<h3>Le matériel de secours du site</h3>
<p>Le DP dispose d’un moyen d’alerte, d’oxygène, d’une trousse de secours, d’eau douce, d’une couverture, d’une fiche d’évacuation. Sur un bateau, le pavillon Alpha signale des plongeurs dans l’eau.</p>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>Âges minimums, nombre maximal de plongeurs autonomes, matériel exigé en autonomie, validité du certificat médical : ces règles évoluent, vérifie la version en vigueur.</div>
`,
  memo: [
    ["Code du sport","Articles A.322-71 et suivants pour la plongée à l’air."],
    ["Espaces","0-6, 0-12, 0-20, 0-40, 0-60 m."],
    ["N2","PE40 encadré, PA20 autonome sur décision du DP."],
    ["Le DP","Fixe les paramètres et a le dernier mot."]
  ],
  moniteur: ["Combien de plongeurs autonomes maximum dans une palanquée PA20 ?","Quels documents dois-je toujours avoir (licence, certificat médical, carnet) ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Quelles aptitudes donne le niveau 2 FFESSM ?","c":["PE20 et PA12","PE40 et PA20","PE60 et PA40","PA40 uniquement"],"a":1,"e":"N2 = encadré jusqu’à 40 m (PE40) et autonome jusqu’à 20 m (PA20)."},
    {"q":"En autonomie, une palanquée de N2 compte au maximum…","c":["2 plongeurs","3 plongeurs","4 plongeurs","5 plongeurs"],"a":1,"e":"Trois plongeurs autonomes maximum, sous la responsabilité d’un directeur de plongée."},
    {"q":"Qui fixe les paramètres de la plongée (profondeur, durée) ?","c":["Le pilote du bateau","Le directeur de plongée","Le plus ancien de la palanquée","Chacun pour soi"],"a":1,"e":"Le DP organise la plongée et fixe les paramètres de chaque palanquée."},
    {"q":"Pour descendre à 35 m, un N2 doit être…","c":["en autonomie avec un autre N2","encadré par un guide de palanquée","seul avec un ordinateur","interdit"],"a":1,"e":"Au-delà de 20 m, le N2 plonge encadré (PE40)."},
    {"q":"Quelle est la profondeur maximale autorisée à l’air en plongée de loisir en France ?","c":["40 m","50 m","60 m","66 m"],"a":2,"e":"60 m. Les 66 m correspondent à la limite physiologique de Pp O₂ à 1,6 bar, ce n’est pas la règle."},
    {"q":"Le pavillon Alpha signifie…","c":["bateau en panne","plongeurs en immersion, s’écarter et ralentir","zone de baignade","homme à la mer"],"a":1,"e":"Il signale des plongeurs sous l’eau à proximité."},
    {"q":"Le directeur de plongée doit être…","c":["dans l’eau avec chaque palanquée","présent sur le site de plongée","joignable par téléphone","facultatif en autonomie"],"a":1,"e":"Il est présent sur le site et organise la sécurité depuis la surface."},
    {"q":"Avant de s’immerger, une palanquée autonome…","c":["choisit seule ses paramètres","reçoit ses paramètres du DP","n’a rien à faire","doit appeler le CROSS"],"a":1,"e":"Le DP fixe profondeur et durée. En sortant, la palanquée lui rend compte."},
    {"q":"Pour plonger en autonomie entre 20 et 40 m, il faut au minimum…","c":["le N2","le N3","le N1","aucun brevet"],"a":1,"e":"Le N3 donne l’autonomie jusqu’à 60 m (PA60). Le N2 est autonome jusqu’à 20 m."},
    {"q":"La licence FFESSM comprend…","c":["une assurance responsabilité civile","une assurance voyage","le prêt de matériel","un certificat médical"],"a":0,"e":"Elle couvre la RC. Une assurance individuelle accident est conseillée en plus."},
    {"q": "Quel espace d’évolution correspond à 0-40 m ?", "c": ["l’espace côtier", "l’espace médian", "l’espace proche", "l’espace lointain"], "a": 1, "e": "Proche 0-6 m, médian 0-40 m, lointain 0-60 m (et les paliers 0-12, 0-20).", "lvl": 2},
    {"q": "Qui compose les palanquées et fixe leurs paramètres ?", "c": ["le plus ancien de la palanquée", "le pilote du bateau", "chaque plongeur", "le directeur de plongée"], "a": 3, "e": "C’est un rôle central du DP.", "lvl": 2},
    {"q": "Le texte qui encadre la plongée à l’air en club est…", "c": ["le Code civil seulement", "le règlement intérieur du port", "le Code du sport", "le Code de la route"], "a": 2, "e": "Articles A.322-71 et suivants, complétés par les règles fédérales.", "lvl": 2}
  ]
});

AA.content.module({
  id: "pa20", world: "n2", depth: "−35 m", icon: "users",
  title: "Plonger autonome (PA20)",
  sub: "Préparer, gérer l’air, se retrouver",
  essentiel: `
<p>Le cœur du N2 : plonger <b>sans guide</b> jusqu’à 20 m, avec un ou deux autres plongeurs autonomes. Toute la palanquée est responsable de sa sécurité.</p>
<h3>Avant</h3><ul><li>Recevoir les <b>paramètres du DP</b> : profondeur maxi, durée maxi, zone, heure de retour.</li>
<li>Se mettre d’accord : qui mène, signes, pression de retour (mi-pression, réserve), procédure en cas de perte.</li>
<li>Vérifier l’équipement de chacun, le sien et celui du binôme : air ouvert, gilet, lest, ordinateur, parachute.</li></ul>
<h3>Pendant</h3><ul><li>Rester proches et <b>se voir en permanence</b>. Échanger régulièrement OK et pression.</li>
<li>Respecter la profondeur et la durée. Annoncer la <b>mi-pression</b> et la <b>réserve</b>.</li>
<li>Prévoir l’air pour la remontée, les paliers et un imprévu. La plongée se termine sur le plongeur qui a le moins d’air.</li></ul>
<h3>Perte de palanquée (principe courant)</h3><ol><li>Tourner sur soi-même et chercher les bulles ou la lumière, environ 1 minute.</li><li>Puis remonter à vitesse normale en faisant les paliers.</li><li>Se retrouver en surface, gonfler le gilet, se signaler au bateau.</li></ol>
<h3>Après</h3><p>Rendre compte au DP : paramètres réels, incidents. Remplir le carnet.</p>
<div class="callout check"><span class="eyebrow">À vérifier avec ton moniteur</span>La procédure de perte, le seuil de retour (mi-pression, 100 bar, réserve à 50 bar…) et le matériel exigé en autonomie peuvent varier selon le club.</div>
`,
  approfondir: `
<h3>Préparer comme une vraie palanquée</h3>
<ul><li><b>Paramètres du DP</b> : profondeur maxi, durée maxi, zone, heure de retour, conduite à tenir.</li>
<li><b>Plan</b> : direction aller, repère de demi-tour, qui mène, pression de demi-tour, pression de retour.</li>
<li><b>Signes</b> : revoir ensemble les signes essentiels, ceux du club et ceux de la panne d’air.</li>
<li><b>Contrôle mutuel</b> : chacun vérifie l’équipement de l’autre, à voix haute.</li></ul>
<h3>Gérer l’air à deux ou trois</h3>
<p>Le plongeur qui consomme le plus fixe le rythme. Pratique courante : demi-tour à <b>mi-pression</b> utilisable, et arriver au palier avec la <b>réserve</b> intacte. Exemple : départ 200 bar, réserve 50 bar, il reste 150 bar utilisables : demi-tour vers 125 bar.</p>
<h3>S’orienter</h3>
<ul><li>Repères naturels : relief, sable, herbier, sens de la houle sur le fond, lumière.</li>
<li>Boussole : on la tient bien à plat, alignée avec l’axe du corps. Un aller-retour se fait en faisant demi-tour de 180°.</li>
<li>Le courant : on part plutôt contre lui, pour revenir avec lui quand on a moins d’air.</li></ul>
<h3>Le parachute de palier</h3>
<p>Il signale la palanquée en surface pendant le palier, surtout en dérive ou loin du bateau. On le gonfle stabilisé, dévidoir libre, sans s’y attacher. À s’entraîner d’abord à faible profondeur avec ton moniteur.</p>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>La procédure de perte de palanquée du club, les règles d’air (mi-pression, réserve), le matériel exigé en autonomie.</div>
`,
  memo: [
    ["Avant","Paramètres du DP, plan, signes, contrôle mutuel."],
    ["Air","Demi-tour vers la mi-pression utilisable, réserve intacte au palier."],
    ["Perte","Chercher ≈ 1 min, puis remonter normalement et se retrouver en surface."],
    ["Fin","La plongée se termine sur celui qui a le moins d’air."]
  ],
  moniteur: ["Quelle procédure de perte de palanquée appliquer au club ?","Peux-tu me faire pratiquer le parachute de palier ?","Quelles pressions de demi-tour et de retour recommandes-tu ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"Qui fixe les paramètres d’une palanquée autonome ?","c":["Le plus expérimenté de la palanquée","Le directeur de plongée","Chacun pour soi","L’ordinateur"],"a":1,"e":"Le DP donne profondeur et durée maxi. La palanquée les respecte et rend compte."},
    {"q":"Une palanquée autonome de N2 compte au maximum…","c":["2 plongeurs","3 plongeurs","4 plongeurs","6 plongeurs"],"a":1,"e":"Trois plongeurs autonomes maximum."},
    {"q":"La plongée se termine en fonction…","c":["de celui qui a le plus d’air","de celui qui a le moins d’air","de la moyenne","de l’heure"],"a":1,"e":"Le plus gros consommateur fixe le rythme : on surveille tous les manomètres."},
    {"q":"Tu perds de vue ton binôme à 18 m. Que fais-tu d’abord ?","c":["Remonter tout de suite à toute vitesse","Chercher autour de toi environ 1 min (bulles, lumière)","Descendre plus profond","Attendre 15 min au fond"],"a":1,"e":"Principe courant : une courte recherche, puis remontée normale avec paliers et retrouvailles en surface."},
    {"q":"Après une minute de recherche sans le retrouver…","c":["Tu continues seul la plongée","Tu remontes normalement avec tes paliers et le retrouves en surface","Tu restes au fond jusqu’à la réserve","Tu remontes sans palier"],"a":1,"e":"On ne plonge jamais seul. Remontée normale, puis on se signale en surface."},
    {"q":"Avant de t’immerger en autonomie, tu vérifies…","c":["seulement ton matériel","ton matériel et celui de tes binômes","rien, le club l’a fait","seulement le bloc"],"a":1,"e":"Vérification croisée : air ouvert, gilet, lest, ordinateur, parachute."},
    {"q":"Pourquoi annoncer la mi-pression ?","c":["Pour faire la conversation","Pour décider du demi-tour avec assez d’air pour revenir","C’est inutile","Pour gonfler le gilet"],"a":1,"e":"La moitié de l’air disponible sert à l’aller, l’autre au retour et à la remontée (selon la règle choisie)."},
    {"q":"En sortant de l’eau, la palanquée autonome…","c":["range et part","rend compte au DP de ses paramètres et incidents","attend qu’on l’appelle","efface ses ordinateurs"],"a":1,"e":"Le DP doit savoir que tout le monde est sorti et comment s’est passée la plongée."},
    {"q":"Ton binôme a l’air distrait et ralentit à 20 m. Que soupçonnes-tu ?","c":["Une narcose ou un début d’essoufflement","Qu’il s’ennuie","Rien du tout","Un problème de lest"],"a":0,"e":"En autonomie, c’est à toi de repérer les signes chez l’autre : OK ? Remontez de quelques mètres."},
    {"q":"Le DP a fixé 20 m / 40 min. Ton ordinateur te propose encore 15 min sans palier à 40 min.","c":["Tu restes 15 min de plus","Tu respectes les 40 min du DP","Tu restes 5 min de plus","Tu changes de zone"],"a":1,"e":"Les consignes du DP priment sur ce que l’ordinateur permet."},
    {"q": "Départ 200 bar, réserve 50 bar. Pression de demi-tour à mi-air utilisable ?", "c": ["125 bar", "100 bar", "150 bar", "75 bar"], "a": 0, "e": "150 bar utilisables, la moitié = 75 bar : demi-tour à 200 − 75 = 125 bar.", "lvl": 2},
    {"q": "Avec du courant, on part plutôt…", "c": ["peu importe", "contre le courant", "avec le courant", "en travers, toujours"], "a": 1, "e": "Le retour, avec moins d’air et plus de fatigue, se fait alors avec le courant.", "lvl": 2},
    {"q": "Pour lire une boussole, tu la tiens…", "c": ["verticale devant le masque", "n’importe comment, elle s’oriente seule", "contre le bloc", "à plat, alignée avec l’axe du corps"], "a": 3, "e": "Inclinée, l’aiguille frotte et donne un cap faux.", "lvl": 2}
  ]
});

AA.content.module({
  id: "environnement", world: "n2", depth: "−40 m", icon: "fish", diagram: "environnement",
  title: "Environnement",
  sub: "Milieu, faune, flore, bons gestes",
  essentiel: `
<h3>Le milieu</h3>
<ul>
<li><b>Lumière</b> : l’eau absorbe les couleurs. Le <b>rouge disparaît en premier</b> (dès quelques mètres), puis l’orange, le jaune. Le bleu reste. Une lampe rend les couleurs.</li>
<li><b>Vision</b> : avec le masque, les objets paraissent environ <b>un tiers plus gros</b> et <b>plus proches</b> (≈ 3/4 de la distance réelle).</li>
<li><b>Son</b> : il va environ 4 à 5 fois plus vite dans l’eau. On l’entend bien mais on ne sait pas d’où il vient.</li>
<li><b>Chaleur</b> : l’eau refroidit bien plus vite que l’air. La <b>thermocline</b> est une couche où la température chute brusquement.</li>
<li><b>Météo</b> : vent, houle, courant et marée décident de la plongée autant que la profondeur.</li>
</ul>
<h3>Faune et flore à connaître (Méditerranée)</h3>
<ul>
<li><b>Posidonie</b> : une plante à fleurs, pas une algue. Protégée, elle abrite des alevins et stabilise les fonds. On ne mouille pas dedans.</li>
<li><b>Gorgones</b> : animaux fragiles, un coup de palme les casse.</li>
<li><b>Mérou brun</b> et <b>grande nacre</b> : espèces protégées.</li>
<li><b>Rascasse, vive</b> : épines venimeuses. Le venin craint la chaleur : on trempe la zone dans de l’eau très chaude sans se brûler, et on consulte.</li>
<li><b>Méduses, oursins, murènes</b> : on regarde, on ne touche pas.</li>
</ul>
<h3>Les bons gestes</h3>
<ul>
<li>Maîtriser sa stabilisation et son palmage pour ne pas toucher le fond ni soulever le sable.</li>
<li>Ne rien toucher, ne rien prélever, ne pas nourrir.</li>
<li>S’amarrer sur une bouée plutôt que d’ancrer.</li>
</ul>
<div class="callout check"><span class="eyebrow">Pour toi</span>Les espèces protégées dépendent de la région. Si tu plonges en Atlantique, en Manche ou sous les tropiques, demande la liste locale à ton club.</div>
`,
  approfondir: `
<h3>Les marées et la règle des douzièmes</h3>
<p>Sur l’Atlantique et la Manche, la mer monte et descend environ toutes les 6 h. Elle ne monte pas régulièrement : on l’estime avec la <b>règle des douzièmes</b>.</p>
<div class="tbl"><table><tr><th>Heure de marée</th><th>1re</th><th>2e</th><th>3e</th><th>4e</th><th>5e</th><th>6e</th></tr>
<tr><td>Part du marnage</td><td>1/12</td><td>2/12</td><td>3/12</td><td>3/12</td><td>2/12</td><td>1/12</td></tr></table></div>
<figure data-diagram="douziemes"></figure>
<p>Les courants sont les plus forts aux 3e et 4e heures, et les plus faibles autour de l’<b>étale</b> (pleine ou basse mer) : c’est le bon moment pour plonger sur les sites à courant. Le <b>coefficient</b> (de 20 à 120) indique l’ampleur de la marée.</p>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>Marnage de 6 m. Combien d’eau monte pendant les 3 premières heures ?<pre>1/12 + 2/12 + 3/12 = 6/12 = la moitié → 3 m</pre></div>
<h3>L’eau et tes sens</h3>
<ul><li><b>Vue</b> : à travers le masque, les objets paraissent plus gros (≈ 4/3) et plus proches.</li>
<li><b>Couleurs</b> : le rouge disparaît dès les premiers mètres, puis l’orange et le jaune.</li>
<li><b>Son</b> : il va environ 4 à 5 fois plus vite dans l’eau, on n’arrive pas à savoir d’où il vient.</li>
<li><b>Froid</b> : l’eau enlève la chaleur beaucoup plus vite que l’air (une vingtaine de fois). On se refroidit même dans une eau « bonne ».</li></ul>
<h3>Espèces à protéger (exemples en Méditerranée)</h3>
<ul><li><b>Posidonie</b> : plante à fleurs, pas une algue. Ses herbiers abritent la vie et produisent de l’oxygène.</li>
<li><b>Grande nacre</b> : protégée, très touchée par une maladie depuis 2016. On n’y touche pas.</li>
<li><b>Mérou brun</b>, <b>datte de mer</b>, corail rouge : protégés ou réglementés.</li></ul>
<h3>Ce qui pique, mord ou brûle</h3>
<p>Rascasse et vive (épines venimeuses), méduses (pélagie), anémones, oursins, murène (morsure si on la dérange). Règle simple : on regarde, on ne touche pas.</p>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>Les espèces protégées de ta région de plongée et les règles locales (réserves, mouillages).</div>
`,
  memo: [
    ["Douzièmes","1, 2, 3, 3, 2, 1 : courant maxi aux 3e et 4e heures."],
    ["Étale","Moment le plus calme pour plonger sur un site à courant."],
    ["Sens","Objets plus gros, rouge absorbé, son sans direction, froid rapide."],
    ["Respect","On regarde, on ne touche pas, on ne prélève rien."]
  ],
  moniteur: ["Quelles espèces protégées faut-il connaître pour l’écrit ?","La règle des douzièmes est-elle au programme chez nous ?"],
  /* Questions : ajoute à la fin, ne réordonne pas (la progression y est liée). lvl:2 = niveau « Approfondir ». */
  quiz: [
    {"q":"La posidonie est…","c":["une algue","une plante à fleurs protégée","un corail","une éponge"],"a":1,"e":"C’est une plante à fleurs marine. Ses herbiers sont protégés : nurserie, oxygène, stabilité des fonds."},
    {"q":"Piqûre de vive ou de rascasse : premier geste ?","c":["Glace","Eau très chaude sans se brûler, puis consulter","Vinaigre","Rien, ça passe"],"a":1,"e":"Le venin est détruit par la chaleur. Attention à ne pas brûler la peau."},
    {"q":"Quelle couleur disparaît la première avec la profondeur ?","c":["Le bleu","Le vert","Le rouge","Le jaune"],"a":2,"e":"L’eau absorbe d’abord le rouge. C’est pour ça que le sang paraît vert ou noir au fond."},
    {"q":"Sous l’eau, avec un masque, un objet paraît…","c":["plus petit et plus loin","plus gros et plus proche","identique","plus gros et plus loin"],"a":1,"e":"Réfraction : environ un tiers plus gros et aux trois quarts de la distance réelle."},
    {"q":"Sous l’eau, tu entends un moteur de bateau. Tu peux facilement savoir…","c":["d’où il vient","qu’il est là, mais pas sa direction","sa vitesse exacte","rien du tout"],"a":1,"e":"Le son va très vite dans l’eau et arrive presque en même temps aux deux oreilles : la direction est difficile à repérer. Prudence à la remontée."},
    {"q":"Une thermocline, c’est…","c":["un courant de fond","une couche où la température chute brusquement","un poisson","une algue toxique"],"a":1,"e":"Une limite nette entre une eau chaude en surface et une eau plus froide en dessous."},
    {"q":"Le meilleur geste pour protéger les fonds ?","c":["Se tenir aux rochers pour se stabiliser","Maîtriser sa flottabilité et son palmage","Nager près du fond","Ramasser un souvenir"],"a":1,"e":"Une bonne stabilisation évite de toucher et de soulever le sédiment qui étouffe les organismes fixés."},
    {"q":"Pourquoi ne pas nourrir les poissons ?","c":["C’est cher","Ça modifie leur comportement et leur alimentation","Ils n’ont pas faim","C’est bon pour eux"],"a":1,"e":"Ils deviennent dépendants ou agressifs, et l’équilibre du milieu est perturbé."},
    {"q":"En Méditerranée, la marée est…","c":["très forte","faible","inexistante partout","plus forte qu’en Bretagne"],"a":1,"e":"Quelques dizaines de centimètres. En Atlantique et Manche, elle crée de forts courants à prendre en compte."},
    {"q":"Pour amarrer le bateau sur un herbier de posidonie, on…","c":["jette l’ancre dans l’herbier","utilise une bouée d’amarrage","ancre sur le sable à côté, toujours","s’amarre à une gorgone"],"a":1,"e":"Les ancres arrachent les herbiers. Les bouées sont faites pour ça."},
    {"q":"À 20 m sans lampe, du sang paraît…","c":["rouge vif","verdâtre ou sombre","blanc","jaune"],"a":1,"e":"Le rouge est absorbé dès les premiers mètres."},
    {"q": "Marnage de 6 m : combien d’eau monte pendant les 3 premières heures ?", "c": ["4,5 m", "6 m", "3 m", "1 m"], "a": 2, "e": "1/12 + 2/12 + 3/12 = 6/12, soit la moitié du marnage.", "lvl": 2},
    {"q": "La posidonie est…", "c": ["une plante à fleurs", "une algue", "un corail", "une éponge"], "a": 0, "e": "Elle fleurit, fait des fruits et forme des herbiers protégés.", "lvl": 2},
    {"q": "Sous l’eau, à travers le masque, un objet paraît…", "c": ["plus loin seulement", "plus gros et plus proche", "plus petit et plus loin", "identique"], "a": 1, "e": "La réfraction grossit d’environ 4/3.", "lvl": 2}
  ]
});
