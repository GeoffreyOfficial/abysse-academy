# Faire évoluer Abysse Academy

Pas de framework, pas d’installation : du HTML, du CSS et du JavaScript simple. Après chaque modification, lance `python3 build.py`.

## Où est quoi

| Dossier | Contenu |
|---|---|
| `css/tokens.css` | couleurs, polices, tailles : les **thèmes visuels** |
| `css/app.css` | les composants et les écrans |
| `js/core/` | le moteur : sauvegarde, règles du jeu, navigation, effets |
| `js/views/` | les écrans (accueil, carte, cours, quiz, entraînement, labo, profil) |
| `locales/fr.js` | **tous les textes de l’interface** |
| `content/fr/` | **tous les contenus** : mondes, cours, quiz, cartes, scénarios, calculs, schémas, trophées, quêtes |
| `js/manifest.js` | la liste des fichiers chargés, dans l’ordre |

Le moteur ne connaît aucun contenu en dur : tout passe par `AA.content`.

## Ajouter une question

Dans `content/fr/n2.js` (ou `rifap.js`, `e1.js`), dans le `quiz` du module, **à la fin de la liste** :

```js
{"q":"La question ?","c":["choix A","choix B","choix C","choix D"],"a":1,"e":"L’explication.","lvl":2}
```

- `a` = position de la bonne réponse (0 = premier choix). L’ordre est mélangé à l’affichage.
- `lvl: 2` = question du niveau « Approfondir » (facultatif).
- **Ne réordonne et ne supprime jamais** les questions existantes : la progression est attachée à leur position. Pour retirer une question, remplace-la plutôt par une autre sur le même thème.

## Enrichir un cours

Chaque module a :

- `essentiel` : le cours pour l’examen (HTML) ;
- `approfondir` : pour aller plus loin ;
- `memo` : les points à retenir, `[["Titre", "Texte"]]` ;
- `moniteur` : des questions à poser à son moniteur.

Blocs utiles dans le HTML :

```html
<div class="callout ex"><span class="eyebrow">Exemple chiffré</span>… <pre>calcul</pre></div>
<div class="callout trap"><span class="eyebrow">Piège d’examen</span>…</div>
<div class="callout check"><span class="eyebrow">À valider avec ton moniteur</span>…</div>
<div class="formula">P abs = 1 + profondeur / 10</div>
<div class="tbl"><table>…</table></div>
<figure data-diagram="periode"></figure>   <!-- insère un schéma de content/fr/diagrams.js -->
```

## Ajouter un module (un nouveau point sur la carte)

```js
AA.content.module({
  id: "narcose-plus", world: "n2", depth: "−42 m", icon: "mol",
  title: "Titre", sub: "Sous-titre",
  essentiel: `<p>…</p>`, approfondir: `<p>…</p>`,
  memo: [["…", "…"]], moniteur: ["…"],
  quiz: [ /* au moins 6 questions */ ]
});
```

Les modules s’affichent dans l’ordre où ils sont déclarés. Un module s’ouvre quand le précédent a 1 étoile. Les icônes disponibles sont dans `js/ui/icons.js`.

## Ajouter un monde (N3, N4, E2…)

1. Dans `content/fr/worlds.js`, retire `soon: true` du monde « abysses » ou déclare un nouveau monde avec `AA.content.world({...})`. `unlock: { world: "e1", count: 3 }` l’ouvre après 3 thèmes étoilés du monde E1. `unlock: { world: "e1", all: true }` l’ouvre quand tout le monde E1 est étoilé.
2. Crée `content/fr/n3.js` avec ses modules (`world: "n3"`).
3. Ajoute le fichier dans `js/manifest.js`, puis `python3 build.py`.
4. Ajoute une couleur `--world-n3` dans chaque thème de `css/tokens.css` si tu veux une couleur à lui.

## Flashcards, scénarios, ordinateur, calculs

- `cards.js` : `{id, m, f, b}`. Donne un nouvel `id` unique (par exemple `c58`, `c59`…).
- `scenarios.js` : chaque étape a `q` et `c: [[texte, 1 si bon sinon 0, explication]]`.
- `computer.js` : l’écran (`scr`) puis une question.
- `generators.js` : une fonction `make` qui fabrique un calcul avec `M(question, réponse, [leurres], unité, explication, décimales)`.

## Trophées et quêtes

Dans `content/fr/progress.js`. Les conditions sont déclaratives, par exemple `{ k: "stars", m: "pa20", n: 2 }` ou `{ k: "worldStars", w: "n2", n: "all" }`. La liste complète est dans `js/core/game.js`, fonction `G.cond`.

## Ajouter un thème visuel

1. Dans `css/tokens.css`, copie un bloc `[data-aa-theme="..."]`, renomme-le et change les couleurs.
2. Dans `js/core/ns.js`, ajoute une entrée à `AA.THEMES` (id, trois couleurs d’aperçu, couleur de la barre du navigateur).
3. Dans `locales/fr.js`, ajoute `"theme.<id>": "Nom affiché"`.

## Traduire l’appli

1. Copie `locales/fr.js` en `locales/en.js`, remplace `AA.i18n.add("fr"` par `AA.i18n.add("en"` et traduis les valeurs.
2. Crée `content/en/` avec les fichiers à traduire. Garde **les mêmes `id`** : un module redéclaré remplace la version française. Tout ce qui n’est pas traduit reste en français.
3. Dans `js/core/ns.js`, ajoute la langue : `{ id: "en", name: "English", locale: "en-GB", files: ["locales/en.js", "content/en/n2.js"] }`.
4. Le choix de la langue apparaît dans les Réglages dès qu’il y en a deux.

## Faire évoluer la sauvegarde

L’état est dans `js/core/store.js`. Si tu changes sa forme, augmente `SCHEMA` et ajoute une fonction dans `MIGRATIONS` qui transforme l’ancienne version en la nouvelle : personne ne perd sa progression.

## Tester

Lance un petit serveur dans le dossier (`python3 -m http.server`) puis ouvre `http://localhost:8000`. Le service worker ne fonctionne qu’en `http(s)`, pas en `file://`.
