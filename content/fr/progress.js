/* Abysse Academy · contenu FR · Trophées et quêtes
   Les conditions (test) sont déclaratives, évaluées par js/core/game.js (G.cond).
   Exemples : {k:"stars", m:"pa20", n:2}  {k:"worldStars", w:"n2", n:"all"}
   {k:"exam", min:15, full:true}  {k:"day", f:"ans", n:20} */
AA.content.addBadges([
  { id: "first", icon: "balloon", name: "Première bulle", desc: "Terminer un premier quiz", test: { k: "modulesDone", n: 1 } },
  { id: "reader", icon: "book", name: "Rat de bibliothèque", desc: "Lire 5 cours", test: { k: "read", n: 5 } },
  { id: "deep", icon: "layers", name: "Plus profond", desc: "Lire 3 parties « Approfondir »", test: { k: "deep", n: 3 } },
  { id: "perfect", icon: "star", name: "Sans faute", desc: "100 % sur un thème", test: { k: "perfect" } },
  { id: "combo5", icon: "bolt", name: "Combo ×5", desc: "5 bonnes réponses d’affilée", test: { k: "combo", n: 5 } },
  { id: "combo10", icon: "bolt", name: "Combo ×10", desc: "10 bonnes réponses d’affilée", test: { k: "combo", n: 10 } },
  { id: "half", icon: "profile", name: "Mi-profondeur", desc: "1 étoile sur 5 thèmes N2", test: { k: "worldStars", w: "n2", n: 5 } },
  { id: "bottom", icon: "fish", name: "Touché le fond", desc: "1 étoile sur tous les thèmes N2", test: { k: "worldStars", w: "n2", n: "all" } },
  { id: "gold", icon: "star", name: "Abysse dorée", desc: "3 étoiles sur tout le N2", test: { k: "worldStars", w: "n2", min: 3, n: "all" } },
  { id: "exam", icon: "exam", name: "Prêt pour l’écrit", desc: "15/20 à un examen blanc", test: { k: "exam", min: 15 } },
  { id: "examfull", icon: "timer", name: "Épreuve complète", desc: "Finir un examen complet", test: { k: "exam", full: true } },
  { id: "apnee", icon: "timer", name: "Apnéiste", desc: "8 bonnes réponses au défi apnée", test: { k: "apnee", n: 8 } },
  { id: "rescue", icon: "buoy", name: "Sauveteur", desc: "Repêcher 10 erreurs", test: { k: "rescued", n: 10 } },
  { id: "daily", icon: "sun", name: "Rituel", desc: "Finir une plongée du jour", test: { k: "daily", n: 1 } },
  { id: "daily5", icon: "sun", name: "Routine de pro", desc: "5 plongées du jour", test: { k: "daily", n: 5 } },
  { id: "flash", icon: "cards", name: "Mémoire d’éléphant", desc: "Réviser 50 flashcards", test: { k: "flash", n: 50 } },
  { id: "scen", icon: "cross", name: "Bon réflexe", desc: "Réussir tous les scénarios", test: { k: "scenAll" } },
  { id: "sim", icon: "dive", name: "Plongée propre", desc: "Simulateur : plongée sans alerte", test: { k: "sim" } },
  { id: "table", icon: "table", name: "Ma table", desc: "Saisir 5 lignes de ta table", test: { k: "table", n: 5 } },
  { id: "duel", icon: "users", name: "Duelliste", desc: "Jouer un duel", test: { k: "duel" } },
  { id: "pa20", icon: "users", name: "Autonome", desc: "2 étoiles sur Plonger autonome (PA20)", test: { k: "stars", m: "pa20", n: 2 } },
  { id: "rifap", icon: "cross", name: "Secouriste", desc: "1 étoile sur tous les récifs RIFAP", test: { k: "worldStars", w: "rifap", n: "all" } },
  { id: "e2", icon: "flag", name: "Cap sur E1", desc: "1 étoile sur une île initiateur", test: { k: "worldStars", w: "e1", n: 1 } },
  { id: "keep", icon: "refresh", name: "Rien n’est perdu", desc: "Réviser un thème « À réviser »", test: { k: "keep" } },
  { id: "validated", icon: "check", name: "Validé par le moniteur", desc: "3 cours validés avec ton moniteur", test: { k: "validated", n: 3 } },
  { id: "quest1", icon: "flag", name: "Chapitre N2 terminé", desc: "Finir la quête N2 · PA20", test: { k: "chapter", id: "q1" } },
  { id: "streak3", icon: "flame", name: "Assidu", desc: "3 jours d’affilée", test: { k: "streak", n: 3 } },
  { id: "streak7", icon: "flame", name: "Semaine bleue", desc: "7 jours d’affilée", test: { k: "streak", n: 7 } },
  { id: "streak30", icon: "flame", name: "Mois des abysses", desc: "30 jours d’affilée", test: { k: "streak", n: 30 } },
  { id: "lvl5", icon: "gauge", name: "Stabilisé", desc: "Atteindre le niveau 5", test: { k: "level", n: 5 } }
]);

/* Chapitres : real:true = vraies étapes à cocher soi-même. xp = récompense. */
AA.content.addChapters([
  { id: "q1", title: "Chapitre 1 · Brevet N2 et autonomie PA20", desc: "La priorité : réussir l’écrit et devenir autonome à 20 m.", color: "--world-n2", steps: [
    { t: "Finir le quiz d’un premier cours", test: { k: "modulesDone", n: 1 }, xp: 30 },
    { t: "Lire la partie « Approfondir » d’un cours", test: { k: "deep", n: 1 }, xp: 20 },
    { t: "2 étoiles sur « Plonger autonome (PA20) »", test: { k: "stars", m: "pa20", n: 2 }, xp: 60 },
    { t: "Réussir le scénario « Panne d’air à 18 m »", test: { k: "scen", id: "s2" }, xp: 40 },
    { t: "1 étoile sur 6 thèmes N2", test: { k: "worldStars", w: "n2", n: 6 }, xp: 50 },
    { t: "1 étoile sur tous les thèmes N2", test: { k: "worldStars", w: "n2", n: "all" }, xp: 80 },
    { t: "Saisir 5 lignes de ta table du club", test: { k: "table", n: 5 }, xp: 40 },
    { t: "5 plongées du jour", test: { k: "daily", n: 5 }, xp: 60 },
    { t: "15/20 à un examen complet", test: { k: "exam", min: 15, full: true }, xp: 100 }] },
  { id: "q2", title: "Chapitre 2 · RIFAP", desc: "Savoir réagir face à un accident de plongée.", color: "--world-rifap", steps: [
    { t: "1 étoile sur chacun des récifs RIFAP", test: { k: "worldStars", w: "rifap", n: "all" }, xp: 80 },
    { t: "Réussir tous les scénarios d’accident", test: { k: "scenAll" }, xp: 60 },
    { t: "3 étoiles sur « Accidents »", test: { k: "stars", m: "accidents", n: 3 }, xp: 50 }] },
  { id: "q3", title: "Chapitre 3 · Initiateur E1", desc: "Apprendre à transmettre, sans perdre tes bases N2.", color: "--world-e1", steps: [
    { t: "1 étoile sur toutes les îles de l’initiateur", test: { k: "worldStars", w: "e1", n: "all" }, xp: 80 },
    { t: "3 étoiles sur « Pédagogie »", test: { k: "stars", m: "e2-peda", n: 3 }, xp: 50 },
    { t: "Maintien des acquis : aucun thème N2 « À réviser »", test: { k: "noStale", w: "n2" }, xp: 60 },
    { t: "2 étoiles sur tous les thèmes N2", test: { k: "worldStars", w: "n2", min: 2, n: "all" }, xp: 100 }] },
  { id: "q4", title: "Chapitre 4 · Vers E2", desc: "Tes vraies étapes, à cocher quand tu les obtiens.", color: "--muted", real: true, steps: [
    { t: "Niveau 2 obtenu" }, { t: "RIFAP validé" }, { t: "Initiateur (E1) obtenu" }, { t: "Niveau 3 obtenu" }, { t: "Niveau 4 · guide de palanquée obtenu" }, { t: "E2" }] }
]);

/* Quêtes du jour : 3 tirées chaque jour (pinned = toujours présente). 20 XP chacune, 30 XP de bonus. */
AA.content.addDailyQuests([
  { id: "daily", t: "Finir la plongée du jour", test: { k: "dailyDone" }, pinned: true },
  { id: "ans20", t: "Répondre à 20 questions", test: { k: "day", f: "ans", n: 20 } },
  { id: "ok15", t: "Donner 15 bonnes réponses", test: { k: "day", f: "ok", n: 15 } },
  { id: "flash10", t: "Réviser 10 flashcards", test: { k: "day", f: "flash", n: 10 } },
  { id: "scen", t: "Jouer un scénario d’accident", test: { k: "day", f: "scen", n: 1 } },
  { id: "apnee5", t: "Défi apnée : 5 bonnes réponses", test: { k: "day", f: "apnee", n: 5 } },
  { id: "read", t: "Lire ou relire un cours", test: { k: "day", f: "read", n: 1 } },
  { id: "keep", t: "Réviser un thème « À réviser » ou ton plus ancien", test: { k: "keepToday" } }
]);

/* 1.1 : trophées des nouveaux modes */
AA.content.addBadges([
  { id: "boss-n2", icon: "swords", name: "Gardien vaincu", desc: "Battre le boss du monde N2", test: { k: "boss", w: "n2" } },
  { id: "boss-all", icon: "trophy", name: "Chasseur de boss", desc: "Battre les 3 boss", test: { k: "bossAny", n: 3 } },
  { id: "story1", icon: "scroll", name: "Conteur des fonds", desc: "Finir une aventure", test: { k: "story", n: 1 } },
  { id: "five5", icon: "timer", name: "Plongeur pressé", desc: "Finir 5 sessions « 5 minutes »", test: { k: "five", n: 5 } },
  { id: "gloss20", icon: "book", name: "Dictionnaire vivant", desc: "Ouvrir 20 mots du glossaire", test: { k: "gloss", n: 20 } },
  { id: "aqua10", icon: "fish", name: "Aquariophile", desc: "10 espèces dans ton aquarium", test: { k: "aqua", n: 10 } }
]);
AA.content.addDailyQuests([
  { id: "dq-five", t: "Faire une session « 5 minutes »", test: { k: "day", f: "five", n: 1 } }
]);
