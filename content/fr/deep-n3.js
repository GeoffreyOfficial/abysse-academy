/* Abysse Academy · contenu FR · Niveau 3 approfondi (1.5)
   Complète les cours de content/fr/n3.js (C.extend ajoute à la fin, sans réordonner)
   et ajoute les thèmes manquants. Points réglementaires : à faire valider par ton moniteur. */
(function () {
  "use strict";
  const C = AA.content;

  C.extend("n3-gaz", {
    essentiel: `
<h3>Lire la narcose chez soi et chez les autres</h3>
<p>La narcose ne prévient pas : on ne la sent pas toujours chez soi. Les signes se voient souvent <b>chez le binôme</b> :</p>
<ul><li>regard fixe, réponses lentes aux signes, gestes répétés ;</li><li>rire sans raison ou au contraire angoisse soudaine ;</li><li>erreurs de lecture : manomètre ou ordinateur relus plusieurs fois ;</li><li>oubli du plan (demi-tour, pression de remontée).</li></ul>
<p><b>Réflexe</b> : signe « ça ne va pas », on remonte <b>de quelques mètres</b> ensemble, on se stabilise, on vérifie l’air. Si ça ne passe pas, on termine la plongée.</p>
<h3>Méthode : calculer une pression partielle sans se tromper</h3>
<ol><li>Profondeur → <b>pression absolue</b> : 1 + profondeur ÷ 10.</li><li>Pourcentage → <b>fraction</b> : 21 % = 0,21 ; 79 % = 0,79.</li><li>Pp = P abs × fraction.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple</span>À 45 m : P abs = 5,5 bar. Pp O₂ = 5,5 × 0,21 ≈ 1,16 bar ; Pp N₂ = 5,5 × 0,79 ≈ 4,35 bar.</div>
<div class="callout ex"><span class="eyebrow">Dans l’autre sens</span>À quelle profondeur l’air atteint-il une Pp O₂ de 1,4 bar ? 1,4 ÷ 0,21 ≈ 6,67 bar absolu ; − 1 = 5,67 bar d’eau ; × 10 ≈ <b>56 m</b>.</div>`,
    approfondir: `
<h3>Pourquoi l’azote endort-il ?</h3>
<p>L’azote se dissout dans les graisses, notamment dans les membranes des cellules nerveuses. Sous forte pression, il perturbe la transmission de l’influx nerveux, comme certains gaz anesthésiants. C’est pour cela que la narcose ressemble à une ivresse et qu’elle <b>disparaît dès que la pression baisse</b>.</p>
<h3>Les deux toxicités de l’oxygène</h3>
<ul><li><b>Neurologique</b> (effet Paul Bert) : forte Pp O₂, effet rapide, convulsions. C’est le risque de la plongée profonde à l’air et du nitrox.</li>
<li><b>Pulmonaire</b> (effet Lorrain Smith) : Pp O₂ plus modérée mais longtemps (oxygénothérapie prolongée, plongées techniques). Irritation des poumons.</li></ul>`,
    memo: [["Narcose chez l’autre", "Regard fixe, lenteur, rires ou angoisse : on remonte de quelques mètres."], ["Pp", "1) P abs 2) fraction 3) multiplier."], ["O₂ neurologique", "Paul Bert : convulsions, forte Pp O₂."]],
    quiz: [
      { q: "Ton binôme relit trois fois son manomètre à 48 m et rit sans raison. Que fais-tu ?", c: ["Tu continues la descente", "Tu lui fais signe et vous remontez de quelques mètres ensemble", "Tu le laisses seul", "Tu lâches ton lest"], a: 1, e: "Signes de narcose : on remonte un peu ensemble, on se stabilise, on vérifie l’air. Si ça persiste, fin de plongée." },
      { q: "Pp O₂ de l’air à 35 m ?", c: ["0,74 bar", "0,95 bar", "1,05 bar", "3,56 bar"], a: 1, e: "P abs = 4,5 bar. 4,5 × 0,21 ≈ 0,95 bar." },
      { q: "L’effet Paul Bert désigne…", c: ["la toxicité neurologique de l’oxygène", "la narcose", "l’ADD", "le froid"], a: 0, e: "Forte Pp O₂ : atteinte du système nerveux, convulsions possibles.", lvl: 2 },
      { q: "Pourquoi la narcose ressemble-t-elle à une ivresse ?", c: ["L’azote sous pression perturbe le fonctionnement des nerfs", "On boit de l’eau de mer", "Le froid fait boire", "L’oxygène manque"], a: 0, e: "L’azote dissous dans les membranes nerveuses agit comme un anesthésiant.", lvl: 2 },
      { q: "Un plongeur ressent la narcose à 40 m un jour et pas un autre. C’est…", c: ["impossible", "normal : la narcose varie selon la forme, le froid, le stress", "un problème de matériel", "un signe d’ADD"], a: 1, e: "La sensibilité varie d’un jour à l’autre : on reste humble à chaque plongée profonde." },
      { q: "Pour calculer une Pp, la première étape est…", c: ["la pression absolue", "la vitesse de remontée", "le volume du bloc", "la température"], a: 0, e: "On part toujours de la pression absolue (1 + profondeur ÷ 10)." },
      { q: "Pp N₂ de l’air à 25 m ?", c: ["1,98 bar", "2,77 bar", "3,5 bar", "0,74 bar"], a: 1, e: "P abs = 3,5 bar. 3,5 × 0,79 ≈ 2,77 bar." }
    ]
  });

  C.extend("n3-deco", {
    essentiel: `
<h3>Comment le corps se charge et se décharge en azote</h3>
<p>Sous pression, l’azote se <b>dissout</b> dans le sang puis dans les tissus (loi de Henry). Certains tissus se chargent vite (sang, cerveau), d’autres lentement (graisses, articulations). À la remontée, l’azote doit sortir <b>par les poumons</b>. Si la pression baisse trop vite, il forme des <b>bulles</b> : c’est l’accident de décompression.</p>
<p>Les <b>paliers</b> donnent le temps à l’azote de sortir sans former de grosses bulles. La <b>vitesse de remontée</b> lente joue le même rôle.</p>
<h3>La courbe de sécurité</h3>
<p>Pour chaque profondeur, il existe une durée au-delà de laquelle un palier devient obligatoire : c’est la <b>courbe de sécurité</b> (plongée « sans palier »). Plus on est profond, plus cette durée est courte. Ta table et ton ordinateur te la donnent.</p>
<div class="callout"><span class="eyebrow">Bon réflexe</span>Même sans palier obligatoire, un <b>palier de principe</b> de quelques minutes vers 3 à 5 m est une bonne habitude (à confirmer selon ta formation).</div>
<h3>Planifier une plongée avec paliers</h3>
<ol><li>Choisis la <b>profondeur maximale</b> et la <b>durée</b> avec ta table (ou le mode planification de l’ordinateur).</li><li>Note les <b>paliers</b> et la <b>durée totale de remontée</b>.</li><li>Vérifie que l’<b>air</b> suffit pour la remontée et les paliers, avec une marge.</li><li>Prévois le plan B : que fais-tu si tu dépasses le temps ou la profondeur ?</li></ol>`,
    approfondir: `
<h3>Le modèle de Haldane, en deux idées</h3>
<p>Les tables reposent sur un modèle : le corps est vu comme plusieurs <b>compartiments</b> qui se chargent et se déchargent à des vitesses différentes (périodes). Chaque compartiment tolère une certaine <b>sursaturation</b> (rapport entre l’azote dissous et la pression ambiante) sans former de bulles dangereuses. Le palier sert à rester sous ce seuil.</p>
<p>Les ordinateurs utilisent des modèles dérivés (par exemple à compartiments avec des « facteurs de prudence »). Ils calculent en continu ton vrai profil, d’où des durées souvent différentes de la table.</p>
<h3>Les bulles silencieuses</h3>
<p>Même après une plongée parfaite, on détecte souvent de petites bulles dans le sang veineux, sans symptôme : elles sont filtrées par les poumons. Les règles (vitesse lente, paliers, pas d’effort, hydratation) visent à en limiter le nombre.</p>`,
    memo: [["Henry", "Plus de pression = plus d’azote dissous."], ["Courbe de sécurité", "Au-delà : palier obligatoire."], ["Haldane", "Compartiments + sursaturation critique."]],
    moniteur: ["Quelle vitesse de remontée et quel palier de principe appliquons-nous ?"],
    quiz: [
      { q: "La « courbe de sécurité » indique…", c: ["la durée maximale sans palier obligatoire à une profondeur", "la profondeur maximale du N3", "la vitesse du bateau", "la réserve d’air"], a: 0, e: "Au-delà de cette durée, la table impose des paliers." },
      { q: "Par où l’azote dissous sort-il du corps ?", c: ["Par les poumons, à l’expiration", "Par la peau seulement", "Par l’estomac", "Il ne sort jamais"], a: 0, e: "Le sang ramène l’azote aux poumons, qui l’éliminent à chaque expiration." },
      { q: "Les tissus qui se chargent lentement en azote…", c: ["se déchargent aussi lentement", "se vident instantanément", "ne comptent pas", "sont uniquement le sang"], a: 0, e: "Graisses et articulations se chargent et se vident lentement : d’où l’importance des successives.", lvl: 2 },
      { q: "Dans le modèle de Haldane, un compartiment est caractérisé par…", c: ["sa période (vitesse de charge)", "sa couleur", "sa profondeur maximale", "sa température"], a: 0, e: "Chaque compartiment a une période et un seuil de sursaturation critique.", lvl: 2 },
      { q: "Pourquoi l’ordinateur donne-t-il souvent plus de temps que la table ?", c: ["Il calcule le profil réel, pas la profondeur maximale pendant tout le temps", "Il est moins prudent par défaut", "Il ne gère pas la décompression", "Il se trompe"], a: 0, e: "La table suppose toute la plongée à la profondeur maximale ; l’ordinateur suit ta profondeur réelle." },
      { q: "Avant une plongée avec paliers, on vérifie que l’air suffit pour…", c: ["la remontée et les paliers, avec une marge", "le fond seulement", "le retour en bateau", "rien de plus"], a: 0, e: "L’air des paliers fait partie du plan : sans air, pas de palier." }
    ]
  });

  C.extend("n3-autonomie", {
    essentiel: `
<h3>Méthode : combien de temps au fond ?</h3>
<ol><li><b>Air utilisable</b> = (pression du bloc − pression de remontée) × volume du bloc.</li><li><b>Conso au fond</b> = conso en surface × pression absolue.</li><li><b>Temps</b> = air utilisable ÷ conso au fond.</li></ol>
<div class="callout ex"><span class="eyebrow">Exemple</span>Bloc 12 L à 210 bar, remontée décidée à 100 bar, conso 18 L/min en surface, à 35 m (4,5 bar). Air utilisable : 110 × 12 = 1 320 L. Conso au fond : 18 × 4,5 = 81 L/min. Temps ≈ 1 320 ÷ 81 ≈ <b>16 min</b>.</div>
<h3>La règle des tiers (variante prudente)</h3>
<p>Certains plongeurs appliquent : un tiers de l’air pour l’aller, un tiers pour le retour, un tiers en réserve. En mer depuis le bateau, on raisonne plutôt avec une <b>pression de remontée</b> qui couvre remontée, paliers et imprévus.</p>
<h3>Perte de palanquée</h3>
<ol><li>Chercher autour de soi <b>une minute</b> environ, en tournant, en regardant vers le haut (bulles).</li><li>Si rien : <b>remonter</b> en respectant vitesse et paliers.</li><li>Se retrouver <b>en surface</b>, signaler au bateau.</li></ol>
<p>La procédure exacte est fixée <b>avant</b> la plongée avec le DP.</p>`,
    approfondir: `
<h3>Gérer un incident à 50 m</h3>
<p>À 50 m, une minute de panique consomme plus d’air que cinq minutes de calme en surface. Ordre de priorité : <b>respirer, se stabiliser, réfléchir, agir</b>. Un problème de détendeur ? Source d’air de secours (octopus ou second détendeur sur une autre sortie), puis remontée contrôlée. Un essoufflement ? On arrête tout effort, expirations longues, on remonte de quelques mètres.</p>
<h3>Le directeur de plongée (DP)</h3>
<p>Il organise la plongée sur le site : palanquées, paramètres maximum (profondeur, durée), matériel de secours, procédures. Les plongeurs autonomes restent responsables du respect de ces paramètres.</p>`,
    memo: [["Temps au fond", "(P bloc − P remontée) × V ÷ (conso × P abs)."], ["Perte de palanquée", "1 min de recherche, puis remontée normale, rendez-vous en surface."], ["Ordre", "Respirer, stabiliser, réfléchir, agir."]],
    quiz: [
      { q: "Bloc 15 L à 200 bar, remontée à 90 bar, conso 20 L/min, à 45 m. Temps au fond environ ?", c: ["≈ 8 min", "≈ 15 min", "≈ 30 min", "≈ 55 min"], a: 1, e: "Air utilisable : 110 × 15 = 1 650 L. Conso au fond : 20 × 5,5 = 110 L/min. 1 650 ÷ 110 = 15 min." },
      { q: "Tu as perdu ta palanquée à 40 m. Après environ une minute de recherche…", c: ["tu restes au fond à attendre", "tu remontes normalement (vitesse, paliers) et tu retrouves les autres en surface", "tu remontes le plus vite possible", "tu continues seul la plongée"], a: 1, e: "Procédure classique : recherche courte, remontée normale, rendez-vous en surface. À fixer avant avec le DP." },
      { q: "En cas d’incident en profondeur, l’ordre conseillé est…", c: ["agir vite sans réfléchir", "respirer, se stabiliser, réfléchir, agir", "remonter d’abord, réfléchir ensuite", "appeler le bateau"], a: 1, e: "Le calme économise l’air et évite l’erreur." },
      { q: "Qui fixe la profondeur et la durée maximales d’une palanquée autonome sur un site ?", c: ["Le directeur de plongée", "Le pilote", "Le plus expérimenté de la palanquée seul", "Personne"], a: 0, e: "Le DP organise et fixe les paramètres ; la palanquée les respecte." },
      { q: "La conso au fond se calcule…", c: ["conso surface × pression absolue", "conso surface + profondeur", "conso surface ÷ pression", "conso surface × profondeur"], a: 0, e: "Le volume d’air respiré est multiplié par la pression absolue." }
    ]
  });

  C.extend("n3-accidents", {
    essentiel: `
<h3>Les autres accidents à connaître au N3</h3>
<div class="tbl"><table><tr><th>Accident</th><th>Cause</th><th>Prévention</th></tr>
<tr><td>Surpression pulmonaire</td><td>Blocage de l’expiration à la remontée (panique, toux, apnée)</td><td>Toujours expirer en remontant, ne jamais bloquer</td></tr>
<tr><td>Essoufflement</td><td>CO₂ qui s’accumule (effort, froid, détendeur dur, stress)</td><td>Pas d’effort, expirer longuement, matériel entretenu</td></tr>
<tr><td>Hypothermie</td><td>Froid prolongé</td><td>Combinaison adaptée, durée raisonnable</td></tr>
<tr><td>Noyade</td><td>Panne d’air, panique, malaise</td><td>Gestion de l’air, binôme attentif</td></tr>
<tr><td>Barotraumatismes</td><td>Pressions mal équilibrées (oreilles, sinus, masque, dents)</td><td>Équilibrer tôt et souvent, ne pas plonger enrhumé</td></tr></table></div>
<h3>Le bilan d’une victime après la plongée</h3>
<p>On note : <b>l’heure</b> des signes, les <b>paramètres</b> de la plongée (profondeur, durée, paliers, ordinateur), ce qui s’est passé (remontée rapide ? effort ?), les gestes faits (oxygène depuis quelle heure, eau). Ces informations aident le médecin.</p>`,
    approfondir: `
<h3>Le foramen ovale perméable (FOP)</h3>
<p>Une petite communication entre les oreillettes du cœur, présente chez une partie de la population. Elle peut laisser passer des bulles du sang veineux vers le sang artériel, et explique certains ADD neurologiques « immérités ». Le sujet est médical : on en parle avec un médecin fédéral, pas entre plongeurs.</p>`,
    memo: [["Surpression pulmonaire", "Bloquer l’expiration en remontant."], ["Essoufflement", "CO₂ : stop effort, expirer longtemps."], ["Bilan", "Heure, paramètres, faits, gestes."]],
    quiz: [
      { q: "La surpression pulmonaire vient le plus souvent…", c: ["d’un blocage de l’expiration à la remontée", "d’un excès d’azote", "du froid", "d’un masque mal vidé"], a: 0, e: "L’air des poumons se dilate en remontant : s’il ne sort pas, il déchire les alvéoles." },
      { q: "Face à un essoufflement sous l’eau, on…", c: ["accélère pour remonter", "arrête l’effort et expire longuement", "retient sa respiration", "lâche son détendeur"], a: 1, e: "L’essoufflement vient du CO₂ : on réduit l’effort et on vide bien les poumons." },
      { q: "Pour le médecin, on note en priorité…", c: ["l’heure des signes et les paramètres de la plongée", "la couleur des palmes", "le nom du bateau", "la météo de la veille"], a: 0, e: "Horaires, profondeur, durée, paliers et gestes faits guident le traitement." },
      { q: "Le foramen ovale perméable peut expliquer…", c: ["certains ADD neurologiques sans faute apparente", "la narcose", "le mal de mer", "les crampes"], a: 0, e: "Il peut laisser passer des bulles vers la circulation artérielle. Sujet à voir avec un médecin.", lvl: 2 }
    ]
  });

  C.extend("n3-materiel", {
    essentiel: `
<h3>Pourquoi la redondance ?</h3>
<p>En autonomie profonde, il n’y a pas de guide pour te dépanner. Ton matériel doit pouvoir <b>tomber en panne sans te mettre en danger</b> : deux premiers étages (bloc à deux sorties), deux moyens de connaître ta profondeur et ton temps, un moyen de te signaler en surface.</p>
<h3>Le parachute de palier</h3>
<p>Gonflé depuis le palier, il signale ta position au bateau et sert de repère vertical. On s’entraîne à le lancer <b>sans remonter avec lui</b> : le moulinet ou la bobine doit se dérouler librement.</p>
<h3>Check avant la plongée</h3>
<ul><li>Bloc ouvert, pression vérifiée, deux détendeurs qui respirent bien.</li><li>Gilet qui gonfle et purge, direct-system fixé.</li><li>Ordinateur réglé (mélange, niveau de prudence), batterie.</li><li>Lest bien réparti, largable.</li><li>Parachute, lampe, couteau ou coupe-fil accessibles.</li></ul>`,
    quiz: [
      { q: "La redondance du matériel, c’est…", c: ["pouvoir subir une panne sans être en danger", "avoir du matériel neuf", "plonger plus lourd", "porter deux masques"], a: 0, e: "Deux sources d’air, deux instruments : une panne ne doit pas devenir un accident." },
      { q: "En lançant ton parachute au palier, le risque principal est…", c: ["d’être entraîné vers la surface", "de perdre ton masque", "d’avoir froid", "aucun"], a: 0, e: "Si la bobine se bloque, le parachute t’emmène : on s’entraîne et on garde le contrôle." },
      { q: "Avant une plongée profonde, on vérifie le réglage de l’ordinateur…", c: ["mélange et niveau de prudence", "la langue uniquement", "la couleur de l’écran", "rien"], a: 0, e: "Un mauvais mélange ou un mauvais réglage fausse tous les calculs." }
    ]
  });

  /* ---------- Nouveaux thèmes N3 ---------- */
  C.module({
    id: "n3-cadre", world: "n3", depth: "−58 m", icon: "shield",
    title: "Le cadre du N3",
    sub: "Prérogatives, directeur de plongée, matériel exigé",
    essentiel: `
<p>Le N3 est un plongeur <b>autonome jusqu’à 60 m</b>. Autonome ne veut pas dire seul : il plonge en <b>palanquée</b> avec d’autres plongeurs autonomes, sur un site organisé par un <b>directeur de plongée</b> (DP).</p>
<div class="tbl"><table><tr><th>Espace</th><th>Le N3 peut…</th></tr>
<tr><td>0 à 20 m</td><td>plonger autonome (comme le N2)</td></tr>
<tr><td>20 à 40 m</td><td>plonger autonome</td></tr>
<tr><td>40 à 60 m</td><td>plonger autonome, en palanquée de N3 (ou plus)</td></tr></table></div>
<h3>Le rôle du DP</h3>
<ul><li>Il <b>compose les palanquées</b> et fixe les paramètres (profondeur, durée maximales).</li><li>Il vérifie le matériel de secours présent sur le site (oxygène, trousse, moyen d’alerte).</li><li>Il note les paramètres au retour (fiche de sécurité).</li></ul>
<h3>Le matériel exigé en autonomie</h3>
<p>Chaque plongeur autonome doit avoir de quoi connaître sa <b>profondeur</b> et son <b>temps</b> (ordinateur ou profondimètre + montre), ses <b>paliers</b> (table ou ordinateur), un <b>gilet</b>, une <b>source d’air de secours</b> (deuxième détendeur complet) et un moyen d’alerte en surface.</p>
<div class="callout trap"><span class="eyebrow">À valider</span>Les prérogatives, l’âge et les équipements obligatoires viennent du Code du sport et du cursus fédéral, qui évoluent : fais-les confirmer par ton moniteur.</div>`,
    approfondir: `
<h3>Le Code du sport en pratique</h3>
<p>La plongée en club est encadrée par le Code du sport (établissements d’activités physiques et sportives). Il définit les espaces d’évolution (0-6, 0-12, 0-20, 0-40, 0-60 m), les aptitudes (PE = encadré, PA = autonome), le matériel de secours obligatoire et le rôle du directeur de plongée. Les brevets fédéraux (FFESSM, ANMP…) donnent ces aptitudes.</p>
<h3>Plonger à l’étranger</h3>
<p>Les règles locales s’appliquent. Les centres demandent ta carte de niveau et souvent ton carnet de plongées. Les équivalences (CMAS, ISO) aident à faire reconnaître ton niveau.</p>`,
    memo: [["N3", "Autonome jusqu’à 60 m, en palanquée."], ["DP", "Compose les palanquées, fixe les paramètres."], ["Matériel", "Profondeur, temps, paliers, gilet, 2ᵉ détendeur, alerte."]],
    moniteur: ["Quelles prérogatives exactes du N3 appliquons-nous au club ?", "Quel matériel exiges-tu pour une plongée à 50 m ?"],
    quiz: [
      { q: "Le N3 peut plonger en autonomie jusqu’à…", c: ["20 m", "40 m", "60 m", "sans limite"], a: 2, e: "Le N3 est autonome jusqu’à 60 m (PA60), sous l’organisation d’un DP." },
      { q: "Qui compose les palanquées sur le site ?", c: ["Le directeur de plongée", "Le plus âgé", "Le pilote du bateau", "Chacun choisit seul"], a: 0, e: "Le DP compose les palanquées et fixe les paramètres." },
      { q: "Lequel n’est PAS exigé d’un plongeur autonome ?", c: ["Un moyen de connaître profondeur et temps", "Une source d’air de secours", "Un appareil photo", "Un gilet"], a: 2, e: "L’appareil photo est un loisir ; les autres sont des équipements de sécurité." },
      { q: "PA60 signifie…", c: ["plongée autonome jusqu’à 60 m", "plongée accompagnée 60 minutes", "palier à 60 m", "pression 60 bar"], a: 0, e: "PA = autonome, PE = encadré, le nombre = profondeur maximale." },
      { q: "D’où viennent les espaces 0-6, 0-12, 0-20, 0-40, 0-60 m ?", c: ["Du Code du sport", "Des fabricants d’ordinateurs", "De la météo", "Des assurances seulement"], a: 0, e: "Le Code du sport fixe ces espaces et les aptitudes qui y donnent accès.", lvl: 2 },
      { q: "À l’étranger, quelles règles s’appliquent ?", c: ["Les règles locales", "Toujours le Code du sport français", "Aucune", "Celles de ton ordinateur"], a: 0, e: "On suit les règles du pays et du centre ; les équivalences aident à faire reconnaître son niveau.", lvl: 2 }
    ]
  });

  C.module({
    id: "n3-physio", world: "n3", depth: "−60 m", icon: "lungs",
    title: "Le corps en profondeur",
    sub: "Respiration, circulation, froid, effort",
    essentiel: `
<p>Comprendre son corps aide à comprendre <b>pourquoi</b> les règles existent.</p>
<h3>La respiration</h3>
<p>À chaque inspiration, l’oxygène passe des alvéoles au sang ; le CO₂ fait le chemin inverse. Sous l’eau, l’air est <b>plus dense</b> : respirer demande plus de travail. Le CO₂ s’élimine moins bien si on respire court et vite.</p>
<p><b>Bonne ventilation</b> : expiration longue et complète, inspiration calme. On vide le CO₂ et on économise l’air.</p>
<h3>La circulation</h3>
<p>Le cœur envoie le sang oxygéné vers les organes (circulation artérielle) et ramène le sang chargé en CO₂ et en azote vers les poumons (circulation veineuse). L’azote dissous voyage avec le sang : c’est pourquoi l’<b>effort</b> et le <b>froid</b>, qui modifient la circulation, influencent la décompression.</p>
<h3>Le froid</h3>
<p>Le corps perd sa chaleur environ 20 fois plus vite dans l’eau que dans l’air. Le froid fait consommer plus, favorise l’essoufflement et la narcose, et perturbe l’élimination de l’azote.</p>
<div class="callout ex"><span class="eyebrow">Exemple</span>Deux plongées identiques à 35 m : l’une à 24 °C, l’autre à 13 °C. Dans la seconde, conso plus forte, plus de fatigue et une décompression moins efficace : on prévoit une marge plus large.</div>`,
    approfondir: `
<h3>Les échanges gazeux</h3>
<p>Le gaz passe des alvéoles au sang selon les <b>différences de pression partielle</b> : il va toujours de la plus forte vers la plus faible. En profondeur, la Pp d’azote inspirée est forte, l’azote entre dans le sang. À la remontée, elle baisse, l’azote ressort. C’est la loi de Henry vue de l’intérieur.</p>
<h3>L’espace mort</h3>
<p>Une partie de l’air respiré reste dans le tuba, la bouche, la trachée sans servir aux échanges. Respirer court et vite ventile surtout cet espace mort : le CO₂ s’accumule. D’où l’expiration longue.</p>`,
    memo: [["Air dense", "Respirer coûte plus d’effort en profondeur."], ["Ventilation", "Expirer long, inspirer calme."], ["Froid", "Conso, essoufflement, narcose, décompression moins bonne."]],
    quiz: [
      { q: "Pourquoi expirer longuement sous l’eau ?", c: ["Pour bien éliminer le CO₂", "Pour couler", "Pour économiser le gilet", "Ce n’est pas utile"], a: 0, e: "Une expiration complète vide le CO₂ et évite l’essoufflement." },
      { q: "Le corps perd sa chaleur dans l’eau…", c: ["moins vite que dans l’air", "aussi vite que dans l’air", "beaucoup plus vite que dans l’air", "jamais"], a: 2, e: "Environ 20 fois plus vite : la protection thermique est un élément de sécurité." },
      { q: "En profondeur, respirer demande plus d’effort car…", c: ["l’air est plus dense", "l’air est plus chaud", "le détendeur rétrécit", "il y a moins d’oxygène"], a: 0, e: "La densité de l’air augmente avec la pression." },
      { q: "Respirer court et vite ventile surtout…", c: ["l’espace mort", "les alvéoles", "l’estomac", "le gilet"], a: 0, e: "L’air reste dans les voies respiratoires sans participer aux échanges : le CO₂ monte.", lvl: 2 },
      { q: "Un gaz passe des alvéoles au sang…", c: ["de la plus forte pression partielle vers la plus faible", "au hasard", "seulement en surface", "seulement à l’expiration"], a: 0, e: "Les échanges suivent les différences de pression partielle.", lvl: 2 },
      { q: "Plonger dans une eau froide demande…", c: ["une marge plus large (air, déco)", "moins de lest", "une descente plus rapide", "rien de particulier"], a: 0, e: "Le froid augmente la conso, la fatigue et gêne l’élimination de l’azote." }
    ]
  });

  /* Calcul en plus : temps au fond (chiffres neufs à chaque fois). */
  const u = AA.u, G = AA.game, PK = u.pick, N = u.num, M = (...a) => G.mkCalc(...a);
  C.addGenerators({
    n3temps: { m: "n3-autonomie", make: () => { const V = PK([12, 15]), P0 = PK([200, 210, 230]), Pr = PK([80, 100, 110]), c = PK([16, 18, 20, 22]), d = PK([30, 35, 40, 45, 50]); const p = 1 + d / 10, tm = Math.floor((P0 - Pr) * V / (c * p));
      return M(`Bloc ${V} L à ${P0} bar, remontée à ${Pr} bar, conso ${c} L/min en surface, à ${d} m. Temps au fond environ ?`, tm, [Math.floor((P0 - Pr) * V / c), Math.floor(P0 * V / (c * p)), tm + 6], ` min`, `Air utilisable = (${P0} − ${Pr}) × ${V} = ${(P0 - Pr) * V} L. Conso au fond = ${c} × ${N(p)} = ${N(c * p)} L/min. ${(P0 - Pr) * V} ÷ ${N(c * p)} ≈ ${tm} min.`, 0); } },
    n3prof: { m: "n3-gaz", make: () => { const lim = PK([1.4, 1.5, 1.6]); const d = Math.floor((lim / .21 - 1) * 10);
      return M(`À l’air, à quelle profondeur environ la Pp O₂ atteint-elle ${N(lim)} bar ?`, d, [Math.floor(lim / .21 * 10), Math.floor((lim / .79 - 1) * 10) + 30, d - 10], ` m`, `${N(lim)} ÷ 0,21 = ${N(lim / .21)} bar absolu. − 1 = ${N(lim / .21 - 1)} bar d’eau. × 10 ≈ ${d} m.`, 0); } }
  });
  ["n3temps"].forEach(k => C.byId["n3-autonomie"].gen.push(k));
  C.byId["n3-gaz"].gen.push("n3prof");
})();
