# Abysse Academy

Appli d’apprentissage de la plongée, ludique et hors ligne : N2 et PA20, RIFAP, initiateur, puis la suite vers E2.

- **Cours en couches** : l’essentiel pour l’examen, « Approfondir » pour comprendre, « À retenir », et un onglet « Mon moniteur » pour noter ses questions et cocher ce qui est validé.
- **Jeu** : carte des mondes, étoiles, XP et rangs, combos, jauge d’air, quêtes, trophées, défi apnée, duel.
- **Mémoire** : révisions espacées (flashcards en 5 boîtes), « Sauvetage » des erreurs, rappel des thèmes non revus depuis 10 jours, bouton « Je doute ».
- **Labo** : simulateur de plongée, mode ordinateur, scénarios d’accident, atelier tables (ta propre table du club), calculette.
- **Nouveautés 1.1** : fond marin qui change avec la profondeur, carte en parallaxe avec un plongeur qui descend, boss de fin de monde, aventures à choix, aquarium personnel, mode « 5 minutes », recherche globale, glossaire illustré, page « Mes erreurs fréquentes », gestes tactiles, taille du texte, mode daltonien, lecture vocale.
- **Partout** : du petit téléphone (Z Fold fermé) à l’écran 4K. Sur ordinateur, menu latéral, colonnes, raccourcis clavier (`/` ou Ctrl+K pour chercher, A à D pour répondre, Entrée pour continuer).
- **Hors ligne** : appli installable (PWA). Progression stockée sur l’appareil (IndexedDB + localStorage), copies de secours quotidiennes.
- **Synchro** : Google Drive entre téléphone et ordinateur (un seul fichier, droit `drive.file`), ou transfert sans compte par lien ou fichier.

## Synchronisation Google Drive

L’identifiant client Google est dans `js/core/ns.js` (`AA.CONFIG.googleClientId`). C’est celui de l’appli Budget : l’origine `https://geoffreyofficial.github.io` y est déjà autorisée, rien à faire. Pour utiliser un autre projet Google : Console Google Cloud → API Google Drive activée → écran de consentement (scope `drive.file`) → identifiant client « Application Web » avec cette origine, puis colle-le dans `ns.js` ou dans l’écran Sauvegarde (Réglage avancé).

## Tests

- `node tests/content.test.js` : vérifie le contenu (questions, calculs, glossaire, aventures…) et que **l’ordre des questions n’a pas changé** (la progression y est attachée). Après avoir ajouté des questions à la fin d’un module : `node tests/content.test.js --update`.
- `npm install && npm test` : ajoute les tests dans un vrai navigateur (tous les écrans à 5 largeurs, parties de jeu, reprise des sauvegardes, hors ligne).
- Sur GitHub, ces tests tournent tout seuls à chaque envoi (onglet **Actions**).

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt GitHub (par exemple `abysse-academy`).
2. Envoie tout le contenu de ce dossier à la racine du dépôt (sauf `dist/` si tu veux).
3. Dans **Settings → Pages**, choisis la branche `main` et le dossier `/ (root)`.
4. Ouvre l’adresse donnée par GitHub sur ton téléphone, puis **Réglages → Installer l’appli**.

Le fichier `.nojekyll` évite que GitHub transforme les fichiers.

## Version un seul fichier

`dist/abysse-academy.html` contient toute l’appli (polices comprises). Il s’ouvre directement dans un navigateur, même sans connexion, mais ne s’installe pas comme une appli.

## Mettre à jour

1. Modifie les fichiers (voir `CONTRIBUTING.md`).
2. Change le numéro `AA.VERSION` dans `js/core/ns.js`.
3. Lance `python3 build.py`, puis les tests : il régénère `index.html`, `sw.js` et `dist/abysse-academy.html`.
4. Publie. Les téléphones affichent « Nouvelle version », un toucher suffit.

## Reprise de l’ancienne appli

Au premier lancement, Abysse Academy récupère automatiquement la progression d’« Ardoise N2 » si elle est sur le même navigateur et la même adresse. Sinon : exporte la sauvegarde depuis l’ancienne appli et importe-la dans **Réglages → Sauvegarde et synchro → Recevoir une progression**.

## Avertissement

Les contenus sont écrits pour aider à apprendre. Ils ne remplacent ni le moniteur ni les textes officiels. Les points à faire valider sont listés dans **Réglages → À faire valider par ton moniteur**. L’appli ne reproduit pas les valeurs des tables MN90.
