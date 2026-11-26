/* Abysse Academy · contenu FR · Monde N3 (autonome jusqu'à 60 m)
   Contenu écrit pour l'appli : les points réglementaires sont à faire
   valider par ton moniteur. Questions : ajoute à la fin, ne réordonne jamais. */
AA.content.module({
  id: "n3-gaz", world: "n3", depth: "−25 m", icon: "mol",
  title: "Les gaz en profondeur",
  sub: "Narcose, toxicité de l’oxygène, Dalton appliqué",
  gen: ["n3narc", "n3ppo2"],
  essentiel: `
<p>Au-delà de 40 m, les pressions partielles deviennent fortes. Deux gaz posent problème : <b>l’azote</b> (narcose) et <b>l’oxygène</b> (toxicité).</p>
<div class="formula">Pp gaz = P absolue × % du gaz</div>
<div class="tbl"><table><tr><th>Profondeur</th><th>P abs</th><th>Pp N₂ (air)</th><th>Pp O₂ (air)</th></tr>
<tr><td>30 m</td><td>4 bar</td><td>3,16 bar</td><td>0,84 bar</td></tr>
<tr><td>40 m</td><td>5 bar</td><td>3,95 bar</td><td>1,05 bar</td></tr>
<tr><td>50 m</td><td>6 bar</td><td>4,74 bar</td><td>1,26 bar</td></tr>
<tr><td>60 m</td><td>7 bar</td><td>5,53 bar</td><td>1,47 bar</td></tr></table></div>
<h3>La narcose (ivresse des profondeurs)</h3>
<p>L’azote sous forte pression agit comme un anesthésiant : euphorie ou angoisse, idées fixes, lenteur, erreurs de lecture. Elle est <b>très variable</b> d’un jour à l’autre. Elle <b>disparaît en remontant</b> de quelques mètres. Elle est aggravée par le froid, la fatigue, le stress, l’effort, l’alcool, le gaz carbonique.</p>
<h3>L’oxygène</h3>
<p>Au-delà d’environ <b>1,6 bar de Pp O₂</b>, l’oxygène devient toxique pour le système nerveux (convulsions possibles, mortelles sous l’eau). Avec l’air, ce seuil est atteint vers <b>66 m</b> : c’est une des raisons de la limite à 60 m.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>À 55 m à l’air : P abs = 6,5 bar ; Pp N₂ = 6,5 × 0,79 ≈ 5,1 bar ; Pp O₂ = 6,5 × 0,21 ≈ 1,37 bar.</div>`,
  approfondir: `
<h3>Le CO₂, l’ennemi caché</h3>
<p>En profondeur, l’air est plus dense : respirer demande plus d’effort, le gaz carbonique s’accumule plus vite. Or le CO₂ <b>aggrave la narcose</b> et favorise l’essoufflement. D’où la règle : en profondeur, <b>pas d’effort</b>, expiration longue, détendeur performant.</p>`,
  memo: [["Pp", "P abs × % du gaz."], ["Narcose", "Variable, aggravée par froid, effort, stress. Disparaît en remontant."], ["O₂", "Toxique au-delà d’environ 1,6 bar (≈ 66 m à l’air)."], ["CO₂", "L’effort l’augmente et aggrave tout."]],
  moniteur: ["Quel seuil de Pp O₂ retient-on dans notre formation N3 ?", "Comment travaille-t-on la gestion de la narcose en exercice ?"],
  quiz: [
    { q: "Pp N₂ de l’air à 50 m ?", c: ["3,95 bar", "4,74 bar", "5,53 bar", "6 bar"], a: 1, e: "P abs = 1 + 50/10 = 6 bar. 6 × 0,79 = 4,74 bar." },
    { q: "La narcose disparaît…", c: ["seulement en surface", "en remontant de quelques mètres", "après plusieurs heures", "jamais pendant la plongée"], a: 1, e: "Elle dépend de la Pp N₂ : en remontant un peu, elle diminue rapidement." },
    { q: "Qu’est-ce qui aggrave la narcose ?", c: ["Le calme et la chaleur", "Le froid, l’effort, le stress, le CO₂", "Une bonne nuit de sommeil", "Une descente lente"], a: 1, e: "Tous ces facteurs augmentent les effets de l’azote." },
    { q: "À quelle profondeur environ l’air atteint-il une Pp O₂ de 1,6 bar ?", c: ["40 m", "56 m", "66 m", "90 m"], a: 2, e: "1,6 ÷ 0,21 ≈ 7,6 bar absolu, soit environ 66 m." },
    { q: "Quel est le risque principal d’une Pp O₂ trop élevée ?", c: ["La narcose", "Des convulsions (toxicité neurologique)", "Le froid", "L’essoufflement seul"], a: 1, e: "L’oxygène sous forte pression agit sur le système nerveux : une crise convulsive sous l’eau peut être mortelle." },
    { q: "Pourquoi éviter l’effort en profondeur ?", c: ["Il augmente le CO₂, qui aggrave narcose et essoufflement", "Il fait remonter", "Il refroidit", "Ce n’est pas utile"], a: 0, e: "L’air dense se respire plus difficilement. L’effort fait monter le CO₂ : cercle vicieux." },
    { q: "Pp O₂ de l’air à 60 m ?", c: ["1,26 bar", "1,47 bar", "1,6 bar", "0,84 bar"], a: 1, e: "7 bar × 0,21 = 1,47 bar." },
    { q: "Un signe typique de narcose ?", c: ["Relire trois fois son manomètre sans comprendre", "Avoir faim", "Éternuer", "Avoir chaud aux mains"], a: 0, e: "Lenteur, difficulté à lire et à décider, idées fixes : on remonte de quelques mètres et on le signale." }
  ]
});

AA.content.module({
  id: "n3-deco", world: "n3", depth: "−35 m", icon: "timer",
  title: "Décompression avancée",
  sub: "Successives, remontées anormales, ordinateurs",
  essentiel: `
<p>Au N3 tu planifies toi-même tes plongées avec palier. Tu dois maîtriser les <b>cas particuliers</b>.</p>
<h3>Plongées successives</h3>
<p>Après une plongée, il reste de l’<b>azote résiduel</b>. Une deuxième plongée dans la même journée (après un intervalle suffisant) en tient compte : la table donne un <b>groupe</b> en fin de plongée, puis une <b>majoration</b> à ajouter à la durée de la 2ᵉ plongée.</p>
<h3>Plongées consécutives</h3>
<p>Quand l’intervalle est trop court pour une successive (souvent moins de 15 min selon les tables), on considère <b>une seule plongée</b> : durée cumulée, profondeur la plus grande.</p>
<h3>Remontées anormales</h3>
<ul><li><b>Remontée trop rapide</b> : les procédures prévoient souvent de redescendre pour refaire des paliers majorés, si c’est possible et sans danger.</li>
<li><b>Palier interrompu</b> : procédures spécifiques de la table.</li></ul>
<h3>Ordinateur ou table ?</h3>
<p>L’ordinateur calcule en continu ton profil réel. Il ne te dispense pas de <b>connaître ta table</b> (panne, vérification). En palanquée, on suit <b>l’ordinateur le plus pénalisant</b>.</p>
<div class="callout trap"><span class="eyebrow">À valider</span>Les règles exactes (intervalles, procédures de remontée rapide, délai avant l’avion) dépendent de la table et de l’ordinateur utilisés : vérifie-les avec ton moniteur et ta table officielle.</div>`,
  memo: [["Successive", "Azote résiduel → groupe, puis majoration."], ["Consécutive", "Intervalle trop court : une seule plongée."], ["Remontée rapide", "Procédure de la table, si possible sans danger."], ["Ordinateurs", "On suit le plus pénalisant de la palanquée."]],
  moniteur: ["Quel intervalle minimal entre deux plongées retient-on pour une successive ?", "Quelle procédure de remontée rapide appliquons-nous ?"],
  quiz: [
    { q: "Qu’est-ce que l’azote résiduel ?", c: ["L’azote encore dissous dans le corps après une plongée", "L’azote du bloc vide", "L’azote de l’air en surface", "Un gaz rare"], a: 0, e: "Le corps met des heures à éliminer l’azote. Il faut en tenir compte pour la plongée suivante." },
    { q: "Deux plongées séparées par 10 minutes sont en général traitées comme…", c: ["deux plongées indépendantes", "une plongée successive", "une seule plongée (consécutive)", "une plongée sans palier"], a: 2, e: "Intervalle trop court : on cumule les durées et on prend la profondeur la plus grande. Vérifie le seuil sur ta table." },
    { q: "En palanquée, deux ordinateurs donnent des paliers différents. On suit…", c: ["le moins pénalisant", "le plus pénalisant", "la moyenne des deux", "celui du plus jeune"], a: 1, e: "La sécurité impose de suivre le calcul le plus prudent." },
    { q: "Pour une plongée successive, la table donne en fin de 1ʳᵉ plongée…", c: ["une lettre de groupe", "une vitesse", "une température", "un mélange"], a: 0, e: "Ce groupe, avec l’intervalle, permet de trouver l’azote résiduel et la majoration." },
    { q: "Pourquoi connaître sa table même avec un ordinateur ?", c: ["Pour pouvoir planifier et réagir en cas de panne", "Ce n’est pas utile", "Pour la décoration", "Pour aller plus vite"], a: 0, e: "Un ordinateur peut tomber en panne. Savoir planifier sans lui reste indispensable." },
    { q: "La majoration d’une plongée successive s’ajoute…", c: ["à la profondeur", "à la durée de la 2ᵉ plongée", "à la vitesse de remontée", "au palier de 3 m seulement"], a: 1, e: "On lit la table avec une durée fictive = durée réelle + majoration." }
  ]
});

AA.content.module({
  id: "n3-autonomie", world: "n3", depth: "−45 m", icon: "plan",
  title: "Autonome jusqu’à 60 m",
  sub: "Planifier, gérer l’air, décider",
  gen: ["n3air"],
  essentiel: `
<p>Le N3 plonge <b>en autonomie</b> avec d’autres plongeurs de même niveau, sous la responsabilité d’un <b>directeur de plongée</b> qui fixe les paramètres. <i>Prérogatives exactes : à vérifier.</i></p>
<h3>Planifier</h3>
<ol><li>Profondeur maximale et durée, compatibles avec <b>l’air disponible</b> et les <b>paliers</b>.</li>
<li>Pression de demi-tour et pression de début de remontée.</li>
<li>Procédure en cas de perte de palanquée, de panne d’air, de problème.</li></ol>
<h3>Gérer l’air</h3>
<p>Air nécessaire pour remonter = consommation pendant la remontée + paliers + <b>marge de sécurité</b>. En profondeur, la conso est multipliée par la pression : <b>à 50 m, ×6</b>.</p>
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>Bloc 15 L à 200 bar. Conso 20 L/min en surface. À 40 m (5 bar) : 100 L/min, soit environ 6,7 bar/min dans un 15 L. 10 minutes au fond = environ 67 bar. <b>Ça part très vite.</b></div>
<div class="callout trap"><span class="eyebrow">Le vrai danger</span>Le plongeur autonome profond cumule narcose, effort et consommation forte. La règle : <b>une marge large</b>, un plan simple, et le demi-tour décidé à l’avance.</div>`,
  memo: [["Cadre", "Autonome, sous la responsabilité d’un DP."], ["Conso", "× pression absolue : ×5 à 40 m, ×7 à 60 m."], ["Plan", "Demi-tour et remontée décidés avant."], ["Marge", "Toujours garder de quoi gérer un imprévu."]],
  moniteur: ["Quelle réserve et quelle marge retient-on pour les plongées profondes au club ?"],
  quiz: [
    { q: "Ta consommation à 50 m comparée à la surface est…", c: ["×5", "×6", "×50", "identique"], a: 1, e: "P abs à 50 m = 6 bar : la conso est multipliée par 6." },
    { q: "Qui fixe les paramètres d’une palanquée autonome ?", c: ["Le plus jeune", "Le directeur de plongée", "Personne", "Le pilote du bateau"], a: 1, e: "Le DP organise la plongée et fixe profondeur et durée maximales." },
    { q: "Bloc 12 L, conso 20 L/min en surface, à 30 m. Combien de bar par minute environ ?", c: ["≈ 1,7 bar/min", "≈ 6,7 bar/min", "≈ 10 bar/min", "≈ 3 bar/min"], a: 1, e: "Conso au fond = 20 × 4 = 80 L/min. 80 ÷ 12 ≈ 6,7 bar par minute." },
    { q: "La pression de demi-tour se décide…", c: ["au fond, au feeling", "avant la plongée", "après la plongée", "jamais"], a: 1, e: "Sous narcose on décide mal : tout se prépare à terre." },
    { q: "Pourquoi une marge d’air plus grande en profondeur ?", c: ["La conso est forte et les imprévus coûtent cher en air", "Pour rapporter de l’air au club", "Pour flotter", "Ce n’est pas nécessaire"], a: 0, e: "Un partage d’air ou un palier imprévu à 50 m consomme énormément." },
    { q: "Avant une plongée autonome, on convient…", c: ["de la procédure en cas de perte de palanquée", "du menu du soir", "de rien", "de la couleur des palmes"], a: 0, e: "Perte de palanquée, panne d’air, signes : tout se prévoit au briefing." }
  ]
});

AA.content.module({
  id: "n3-accidents", world: "n3", depth: "−50 m", icon: "heart",
  title: "Accidents de décompression",
  sub: "Mécanismes, signes, facteurs, conduite",
  essentiel: `
<p>L’accident de décompression (ADD) vient de <b>bulles d’azote</b> qui se forment quand le corps élimine l’azote trop vite.</p>
<div class="tbl"><table><tr><th>Forme</th><th>Signes possibles</th></tr>
<tr><td>Cutanée</td><td>Démangeaisons, marbrures de la peau</td></tr>
<tr><td>Ostéo-articulaire (« bends »)</td><td>Douleur d’une articulation (épaule, coude, genou)</td></tr>
<tr><td>Neurologique</td><td>Fourmillements, faiblesse d’un membre, troubles de la vue, de la parole, de l’équilibre, paralysie</td></tr>
<tr><td>Vestibulaire (oreille interne)</td><td>Vertiges, nausées, perte d’équilibre</td></tr></table></div>
<h3>Facteurs favorisants</h3>
<p>Fatigue, froid, déshydratation, effort pendant ou après la plongée, âge, surpoids, remontée rapide, plongées répétées, efforts à glottes fermées (porter lourd) et avion trop tôt après.</p>
<h3>Conduite à tenir</h3>
<ol><li><b>Alerte</b> des secours (en France, le 112 ou le CROSS en mer — à vérifier selon le site).</li>
<li><b>Oxygène</b> au masque à haute concentration, le plus tôt possible.</li>
<li>Eau à boire si la victime est consciente, position adaptée, surveillance, fiche d’évacuation.</li>
<li>Le traitement est en <b>caisson hyperbare</b>.</li></ol>
<div class="callout trap"><span class="eyebrow">Ne jamais</span>Faire redescendre une victime d’ADD pour la « recompresser » dans l’eau. Et un signe même léger après une plongée doit être pris au sérieux.</div>`,
  memo: [["Cause", "Bulles d’azote formées à la décompression."], ["Signes", "Peau, articulations, nerfs, oreille interne."], ["Conduite", "Alerte, oxygène, eau, surveillance, caisson."], ["Facteurs", "Fatigue, froid, effort, déshydratation, remontée rapide."]],
  moniteur: ["Quel protocole de secours (oxygène, eau, aspirine) est en vigueur au club ?"],
  quiz: [
    { q: "Une douleur au coude une heure après une plongée profonde peut évoquer…", c: ["une crampe sans importance", "un accident de décompression ostéo-articulaire", "un coup de soleil", "une narcose"], a: 1, e: "Une douleur articulaire après plongée doit faire penser à un ADD : on alerte et on donne de l’oxygène." },
    { q: "Le premier geste de secours après l’alerte, face à un ADD ?", c: ["Faire redescendre la victime", "L’oxygène au masque", "Un bain chaud", "La faire courir"], a: 1, e: "L’oxygène aide à éliminer l’azote et limite les dégâts. Le plus tôt possible." },
    { q: "Lequel favorise l’ADD ?", c: ["Bien s’hydrater", "Un effort intense juste après la plongée", "Remonter lentement", "Bien dormir"], a: 1, e: "L’effort après plongée favorise la formation de bulles." },
    { q: "Vertiges et nausées après plongée peuvent évoquer…", c: ["un ADD vestibulaire", "une indigestion seulement", "rien du tout", "une narcose"], a: 0, e: "L’oreille interne peut être touchée : c’est une urgence." },
    { q: "Où se traite un ADD ?", c: ["En recompression dans l’eau", "En caisson hyperbare", "À la maison", "Sur le bateau sans aide"], a: 1, e: "Seul le caisson hyperbare, à l’hôpital, traite l’ADD. Ne jamais redescendre la victime dans l’eau." },
    { q: "Des marbrures de la peau après plongée évoquent…", c: ["un ADD cutané", "le froid uniquement", "une allergie au néoprène", "une narcose"], a: 0, e: "Les marbrures peuvent être un signe d’ADD cutané, parfois annonciateur d’une forme plus grave." },
    { q: "Pourquoi éviter l’avion juste après la plongée ?", c: ["La pression baisse en altitude et favorise les bulles", "On risque la narcose", "Pour économiser l’air", "C’est une superstition"], a: 0, e: "La cabine est pressurisée à moins de 1 bar : comme une remontée supplémentaire. Délai à respecter : vérifie la règle de ta table." }
  ]
});

AA.content.module({
  id: "n3-materiel", world: "n3", depth: "−55 m", icon: "tank",
  title: "Matériel du plongeur profond",
  sub: "Redondance, parachute, éclairage",
  essentiel: `
<p>Plus on plonge profond et loin de la surface, plus on doit pouvoir <b>gérer une panne seul</b> : c’est la <b>redondance</b>.</p>
<ul>
<li><b>Deux sorties de détendeur indépendantes</b> (deux premiers étages sur un bloc à deux robinets, ou bloc + source de secours) : si l’un fuit ou givre, on ferme et on respire sur l’autre.</li>
<li><b>Deux moyens de connaître ses paramètres</b> : ordinateur + profondimètre/montre, ou deux ordinateurs.</li>
<li>Un <b>parachute de palier</b> (bouée de signalisation) pour se signaler et tenir un palier en pleine eau.</li>
<li>Une <b>lampe</b> : la lumière baisse vite et les couleurs disparaissent (le rouge en premier).</li>
<li>Un <b>outil coupant</b> pour se libérer d’un fil ou d’un filet.</li>
</ul>
<div class="callout ex"><span class="eyebrow">Le givrage</span>En eau froide, un détendeur peut se mettre en débit continu. On <b>ferme le robinet</b> de ce détendeur et on passe sur l’autre : d’où l’intérêt de deux sorties séparées.</div>`,
  memo: [["Redondance", "Deux sorties d’air, deux sources d’info."], ["Parachute", "Se signaler et tenir le palier."], ["Givrage", "Fermer, changer de détendeur."], ["Lampe", "Couleurs et lumière disparaissent en profondeur."]],
  moniteur: ["Quelle configuration de bloc et de détendeurs est exigée au club pour les plongées profondes ?"],
  quiz: [
    { q: "Pourquoi deux sorties de détendeur indépendantes ?", c: ["Pour pouvoir isoler celle qui a un problème et respirer sur l’autre", "Pour la mode", "Pour respirer deux fois plus", "Pour gonfler le parachute"], a: 0, e: "C’est la redondance : une panne ne doit pas devenir une panne d’air." },
    { q: "Un détendeur se met en débit continu en eau froide. Que fais-tu ?", c: ["Tu remontes très vite", "Tu fermes son robinet et passes sur l’autre détendeur", "Tu le secoues", "Tu ne fais rien"], a: 1, e: "On coupe l’arrivée d’air du détendeur fautif et on respire sur la seconde sortie, puis on organise la fin de plongée." },
    { q: "À quoi sert le parachute de palier ?", c: ["À descendre plus vite", "À se signaler en surface et tenir un palier en pleine eau", "À remonter un objet lourd seulement", "À rien"], a: 1, e: "Il indique ta position au bateau et sert de repère pour le palier." },
    { q: "Quelle couleur disparaît en premier en profondeur ?", c: ["Le bleu", "Le rouge", "Le vert", "Le blanc"], a: 1, e: "L’eau absorbe d’abord le rouge, puis l’orange et le jaune : une lampe rend les vraies couleurs." },
    { q: "Pourquoi un outil coupant ?", c: ["Pour pêcher", "Pour se libérer d’un fil ou d’un filet", "Pour ouvrir les oursins", "Pour décorer"], a: 1, e: "Fils de pêche et filets peuvent piéger un plongeur : il faut pouvoir couper." },
    { q: "Deux moyens d’avoir ses paramètres, c’est par exemple…", c: ["Un ordinateur et une montre + profondimètre", "Deux masques", "Deux paires de palmes", "Un seul ordinateur"], a: 0, e: "Si l’ordinateur tombe en panne, on doit encore connaître sa profondeur et son temps." }
  ]
});
