/* Abysse Academy · contenu FR · Monde « Découverte » (avant le N1)
   Pour ceux qui n'ont jamais plongé ou qui sortent de leur baptême.
   Questions : ajoute à la fin d'un module, ne réordonne jamais. */
AA.content.module({
  id: "d-bapteme", world: "decouverte", depth: "−1 m", icon: "wave",
  title: "Ton premier baptême",
  sub: "Comment ça se passe, ce qu’on ressent",
  essentiel: `
<p>Le <b>baptême</b>, c’est ta toute première plongée avec une bouteille. Un moniteur est <b>juste à côté de toi</b> du début à la fin : il gère ta profondeur, ton équilibre et ton air. Toi, tu n’as qu’une chose à faire : <b>respirer calmement et profiter</b>.</p>
<h3>Le déroulement</h3>
<ol>
<li><b>Le briefing</b> à terre : le moniteur t’explique les signes et le matériel. Pose toutes tes questions.</li>
<li><b>L’équipement</b> : combinaison, masque, palmes, bouteille sur le dos avec le détendeur.</li>
<li><b>En surface</b> : tu mets le détendeur en bouche et tu respires la tête dans l’eau, sans bouger.</li>
<li><b>La descente</b>, doucement, en équilibrant tes oreilles. Souvent jusqu’à <b>quelques mètres</b> (environ 6 m au maximum).</li>
<li><b>La balade</b> : le moniteur te guide, toi tu regardes.</li>
<li><b>La remontée</b>, lente, en respirant normalement. Jamais en bloquant ta respiration.</li>
</ol>
<div class="callout ex"><span class="eyebrow">Ce qu’on ressent</span>Le son de ta respiration, les bulles, une impression d’apesanteur. Les premières minutes, on a parfois envie de respirer trop vite : <b>souffle longuement</b>, ça calme tout de suite.</div>
<div class="callout trap"><span class="eyebrow">Les deux règles d’or</span>1. <b>On ne bloque jamais sa respiration</b> sous l’eau avec une bouteille. 2. Si quelque chose ne va pas, <b>on le dit avec un signe</b> : le moniteur est là pour ça.</div>`,
  approfondir: `
<h3>Pourquoi on respire normalement en remontant ?</h3>
<p>L’air dans tes poumons <b>gonfle quand la pression baisse</b> en remontant. Si tu bloques ta respiration, il n’a pas de sortie. En respirant normalement, l’excès d’air s’échappe tout seul. C’est la base de toute la plongée : tu le reverras au N1 et au N2 avec la loi de Mariotte.</p>
<h3>Qui peut faire un baptême ?</h3>
<p>En général à partir de 8 ans, en bonne santé. Selon les clubs, un questionnaire ou un certificat médical peut être demandé. <i>À vérifier avec ton club.</i></p>`,
  memo: [["Le baptême", "Première plongée, un moniteur juste à côté de toi tout le temps."], ["Respirer", "Calmement, longuement. Jamais bloquer."], ["Profondeur", "Quelques mètres, environ 6 m au maximum."], ["Un souci ?", "Un signe au moniteur, tout de suite."]],
  moniteur: ["Jusqu’à quelle profondeur va un baptême dans notre club ?", "Faut-il un certificat médical pour un baptême ?"],
  quiz: [
    { q: "Pendant un baptême, qui gère ta profondeur et ton équilibre ?", c: ["Toi seul", "Le moniteur à côté de toi", "Ton ordinateur", "Personne"], a: 1, e: "Au baptême, le moniteur reste à ton contact et s’occupe de tout. Toi, tu respires et tu profites." },
    { q: "La règle n° 1 sous l’eau avec une bouteille ?", c: ["Bloquer sa respiration pour économiser l’air", "Ne jamais bloquer sa respiration", "Respirer le plus vite possible", "Retenir son souffle à la remontée"], a: 1, e: "L’air des poumons gonfle en remontant. Bloquer sa respiration peut abîmer les poumons. On respire toujours normalement." },
    { q: "Tu respires trop vite au début de la plongée. Que fais-tu ?", c: ["Tu remontes d’un coup", "Tu souffles longuement pour te calmer et tu le signales", "Tu retires ton détendeur", "Tu palmes très fort"], a: 1, e: "Une longue expiration ralentit la respiration. Et tu préviens le moniteur avec un signe : il t’aidera." },
    { q: "Jusqu’à quelle profondeur environ va un baptême ?", c: ["Quelques mètres (environ 6 m au maximum)", "20 m", "40 m", "Aussi profond qu’on veut"], a: 0, e: "On reste près de la surface, dans la zone la plus simple. La limite exacte dépend du cadre fixé par ton club." },
    { q: "À quoi sert le briefing avant le baptême ?", c: ["À rien, c’est une formalité", "À apprendre les signes et poser ses questions", "À choisir son poisson préféré", "À remplir la bouteille"], a: 1, e: "Le briefing te présente les signes, le matériel et le déroulement. C’est le moment de tout demander." },
    { q: "En remontant, l’air dans tes poumons…", c: ["diminue", "gonfle", "ne change pas", "se transforme en eau"], a: 1, e: "La pression baisse en remontant, l’air prend plus de place. En respirant normalement, l’excès sort tout seul." },
    { q: "Quelque chose ne va pas sous l’eau. Le bon réflexe ?", c: ["Le cacher pour ne pas gêner", "Faire un signe au moniteur", "Enlever son masque", "Remonter seul très vite"], a: 1, e: "Le moniteur est là pour t’aider. Un signe « ça ne va pas » et il s’occupe de toi." },
    { q: "Que fait-on en surface juste avant de descendre ?", c: ["On respire dans le détendeur, la tête dans l’eau", "On saute du bateau la tête la première", "On enlève ses palmes", "On retient son souffle 30 secondes"], a: 0, e: "On s’habitue d’abord à respirer dans le détendeur en surface, tranquillement. Puis on descend." }
  ]
});

AA.content.module({
  id: "d-materiel", world: "decouverte", depth: "−2 m", icon: "tank",
  title: "Le matériel de base",
  sub: "Masque, palmes, bouteille, détendeur",
  essentiel: `
<p>Tout le matériel sert à trois choses : <b>voir, respirer, se déplacer</b> sous l’eau, et <b>ne pas avoir froid</b>.</p>
<div class="tbl"><table><tr><th>Matériel</th><th>À quoi il sert</th></tr>
<tr><td>Masque</td><td>Voir net sous l’eau. Il couvre aussi le nez, pour pouvoir souffler dedans.</td></tr>
<tr><td>Palmes</td><td>Avancer avec les jambes, sans fatigue.</td></tr>
<tr><td>Combinaison</td><td>Protéger du froid (l’eau refroidit beaucoup plus vite que l’air).</td></tr>
<tr><td>Bouteille (bloc)</td><td>Contient l’air comprimé, environ 200 bar.</td></tr>
<tr><td>Détendeur</td><td>Te donne l’air à la bonne pression, quand tu inspires.</td></tr>
<tr><td>Gilet (stab)</td><td>On le gonfle ou on le vide pour flotter, descendre ou rester stable.</td></tr>
<tr><td>Lest (plombs)</td><td>Compenser la flottabilité de la combinaison pour pouvoir descendre.</td></tr></table></div>
<div class="callout ex"><span class="eyebrow">Astuce masque</span>Pour vérifier qu’il est étanche : pose-le sur ton visage sans la sangle et inspire doucement par le nez. S’il reste collé, il est à ta taille.</div>
<div class="callout trap"><span class="eyebrow">Bien comprendre</span>Dans la bouteille, ce n’est <b>pas de l’oxygène pur</b> : c’est de <b>l’air</b>, le même que celui que tu respires dehors, juste comprimé.</div>`,
  memo: [["Masque", "Voir et pouvoir souffler par le nez."], ["Bouteille", "De l’air comprimé, pas de l’oxygène pur."], ["Détendeur", "Donne l’air à la bonne pression quand on inspire."], ["Gilet", "Gonfler pour flotter, vider pour descendre."]],
  moniteur: ["Quelle épaisseur de combinaison conseilles-tu ici selon la saison ?"],
  quiz: [
    { q: "Que contient la bouteille d’un plongeur loisir ?", c: ["De l’oxygène pur", "De l’air comprimé", "De l’hélium", "De l’eau"], a: 1, e: "C’est de l’air, le même que dehors (environ 21 % d’oxygène et 79 % d’azote), comprimé à environ 200 bar." },
    { q: "Pourquoi le masque couvre-t-il aussi le nez ?", c: ["Pour faire joli", "Pour pouvoir souffler dedans et équilibrer sa pression", "Pour respirer par le nez", "Pour sentir les odeurs"], a: 1, e: "En soufflant par le nez dans le masque, on évite qu’il « colle » au visage quand on descend." },
    { q: "À quoi sert le détendeur ?", c: ["À gonfler le gilet seulement", "À donner l’air à la bonne pression quand on inspire", "À mesurer la profondeur", "À éclairer"], a: 1, e: "Il « détend » l’air très comprimé de la bouteille pour qu’on puisse le respirer facilement." },
    { q: "Pourquoi porter une combinaison même en été ?", c: ["L’eau refroidit le corps bien plus vite que l’air", "Pour aller plus vite", "C’est obligatoire pour la photo", "Pour flotter moins"], a: 0, e: "L’eau enlève la chaleur du corps environ 25 fois plus vite que l’air. Sans protection, on a vite froid." },
    { q: "Pour descendre, on…", c: ["gonfle le gilet", "vide le gilet", "enlève les palmes", "retient son souffle"], a: 1, e: "On vide l’air du gilet pour flotter moins, et on souffle calmement pour descendre." },
    { q: "Comment vérifier qu’un masque est à ta taille ?", c: ["Le serrer très fort", "Le poser sans sangle et inspirer doucement par le nez : il doit tenir", "Le mettre à l’envers", "Le remplir d’eau"], a: 1, e: "S’il reste collé tout seul en inspirant par le nez, il est étanche sur ton visage." },
    { q: "À quoi servent les plombs (le lest) ?", c: ["À couler le plus vite possible", "À compenser la flottabilité de la combinaison", "À faire du poids pour la marche", "À rien"], a: 1, e: "La combinaison flotte beaucoup. Le lest permet de descendre et de rester stable, sans excès." },
    { q: "À environ quelle pression est gonflée une bouteille pleine ?", c: ["2 bar", "20 bar", "200 bar", "2 000 bar"], a: 2, e: "Autour de 200 bar (parfois 230). Le manomètre te le montre." }
  ]
});

AA.content.module({
  id: "d-oreilles", world: "decouverte", depth: "−3 m", icon: "lungs",
  title: "Respirer et équilibrer",
  sub: "Les oreilles, le masque, le calme",
  essentiel: `
<p>En descendant, l’eau appuie de plus en plus. Tes <b>oreilles</b> le sentent en premier, comme dans un avion ou en montagne.</p>
<h3>Équilibrer ses oreilles</h3>
<ul>
<li>Bouche fermée sur le détendeur, <b>pince le nez</b> à travers le masque.</li>
<li><b>Souffle doucement</b> par le nez, comme pour te moucher, sans forcer. Tu sens un petit « pop ».</li>
<li>Fais-le <b>tôt et souvent</b> : dès la surface, puis tous les mètres. N’attends jamais d’avoir mal.</li>
</ul>
<div class="callout trap"><span class="eyebrow">Si ça bloque</span>Ne force jamais. <b>Remonte un peu</b> (un mètre), réessaie doucement, et préviens le moniteur avec le signe « oreilles ».</div>
<h3>Le masque</h3>
<p>Souffle un peu d’air par le nez dans le masque en descendant pour qu’il ne serre pas ton visage. S’il entre de l’eau, pas de panique : on apprend à le vider au N1.</p>
<h3>Rester calme</h3>
<p>Une respiration lente et <b>profonde</b>, avec une <b>longue expiration</b>, c’est la meilleure arme contre le stress et l’essoufflement.</p>`,
  memo: [["Oreilles", "Tôt, souvent, doucement. Jamais forcer."], ["Si ça bloque", "Remonter un peu, réessayer, prévenir."], ["Masque", "Souffler un peu par le nez dedans en descendant."], ["Calme", "Expire longuement."]],
  moniteur: ["Quelle méthode d’équilibrage me conseilles-tu en plus de la Valsalva ?"],
  quiz: [
    { q: "Quand faut-il équilibrer ses oreilles ?", c: ["Seulement quand on a mal", "Tôt et souvent, dès le début de la descente", "Une fois au fond", "Jamais"], a: 1, e: "Attendre la douleur, c’est trop tard. On équilibre avant que ça tire, tous les mètres au début." },
    { q: "Tes oreilles ne passent pas. Que fais-tu ?", c: ["Tu forces très fort", "Tu remontes un peu et tu réessaies doucement", "Tu continues de descendre", "Tu enlèves ton masque"], a: 1, e: "Remonter d’un mètre diminue la pression : l’équilibrage redevient facile. Forcer peut blesser l’oreille." },
    { q: "Comment équilibrer avec la méthode la plus connue ?", c: ["Pincer le nez et souffler doucement", "Avaler de l’eau", "Crier", "Bloquer sa respiration"], a: 0, e: "Nez pincé, bouche fermée, on souffle doucement : l’air rejoint l’oreille moyenne." },
    { q: "Ton masque te serre le visage en descendant. Pourquoi ?", c: ["Il est trop grand", "L’air dedans se comprime : il faut souffler un peu par le nez", "Il y a un trou", "C’est normal, on ne fait rien"], a: 1, e: "L’air du masque diminue avec la pression. Un peu d’air par le nez rééquilibre." },
    { q: "Le meilleur moyen de calmer une respiration rapide ?", c: ["Inspirer très fort", "Une longue expiration", "Arrêter de respirer", "Palmer plus vite"], a: 1, e: "Une expiration longue ralentit le rythme et chasse le gaz carbonique qui donne la sensation d’étouffer." },
    { q: "Où sent-on en premier l’augmentation de pression ?", c: ["Aux pieds", "Aux oreilles", "Au ventre", "Aux mains"], a: 1, e: "Les oreilles contiennent de l’air : elles réagissent dès le premier mètre." }
  ]
});
