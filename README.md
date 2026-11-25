# Abysse Academy

Appli d’apprentissage de la plongée, ludique et hors ligne : N2 et PA20, RIFAP, initiateur, puis la suite vers E2.

- **Cours en couches** : l’essentiel pour l’examen, « Approfondir » pour comprendre, « À retenir », et un onglet « Mon moniteur » pour noter ses questions et cocher ce qui est validé.
- **Jeu** : carte des mondes, étoiles, XP et rangs, combos, jauge d’air, quêtes, trophées, défi apnée, duel.
- **Mémoire** : révisions espacées (flashcards en 5 boîtes), « Sauvetage » des erreurs, rappel des thèmes non revus depuis 10 jours, bouton « Je doute ».
- **Labo** : simulateur de plongée, mode ordinateur, scénarios d’accident, atelier tables (ta propre table du club), calculette.
- **Hors ligne** : appli installable (PWA). Progression stockée sur le téléphone (IndexedDB + localStorage), export et import.

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
3. Lance `python3 build.py` : il régénère `index.html`, `sw.js` et `dist/abysse-academy.html`.
4. Publie. Les téléphones affichent « Nouvelle version », un toucher suffit.

## Reprise de l’ancienne appli

Au premier lancement, Abysse Academy récupère automatiquement la progression d’« Ardoise N2 » si elle est sur le même navigateur et la même adresse. Sinon : exporte la sauvegarde depuis l’ancienne appli et importe-la dans **Réglages → Importer une sauvegarde**.

## Avertissement

Les contenus sont écrits pour aider à apprendre. Ils ne remplacent ni le moniteur ni les textes officiels. Les points à faire valider sont listés dans **Réglages → À faire valider par ton moniteur**. L’appli ne reproduit pas les valeurs des tables MN90.
