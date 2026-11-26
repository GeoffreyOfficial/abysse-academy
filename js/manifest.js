/* =====================================================================
   Abysse Academy · liste des fichiers, dans l'ordre de chargement.
   Utilisée par build.py (version un seul fichier) et sw.js (cache).
   index.html charge les mêmes fichiers avec des balises <script>.
   ===================================================================== */
var AA_FILES = {
  css: ["assets/fonts/fonts.css", "css/tokens.css", "css/app.css", "css/app-11.css"],
  js: [
    "js/core/ns.js", "js/core/i18n.js", "js/core/store.js", "js/core/content.js", "js/ui/icons.js", "js/ui/creatures.js", "js/core/a11y.js",
    "js/core/fx.js", "js/ui/scene.js", "js/ui/gestures.js", "js/core/game.js", "js/core/router.js", "js/ui/ui.js", "js/core/pwa.js", "js/core/sync.js",
    "js/views/home.js", "js/views/learn.js", "js/views/quiz.js", "js/views/train.js", "js/views/lab.js", "js/views/profile.js",
    "js/views/aquarium.js", "js/views/story.js", "js/views/search.js", "js/views/mistakes.js", "js/views/backup.js",
    "locales/fr.js",
    "content/fr/worlds.js", "content/fr/n2.js", "content/fr/rifap.js", "content/fr/e1.js", "content/fr/cards.js", "content/fr/computer.js",
    "content/fr/scenarios.js", "content/fr/generators.js", "content/fr/diagrams.js", "content/fr/progress.js",
    "content/fr/aquarium.js", "content/fr/glossary.js", "content/fr/story.js", "content/fr/pitfalls.js",
    "js/app.js"
  ]
};
if (typeof module !== "undefined") module.exports = AA_FILES;
