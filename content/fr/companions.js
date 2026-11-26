/* Abysse Academy · contenu FR · Compagnons (avatar créature)
   Chaque compagnon évolue avec ton niveau, en 5 formes (niveaux 1, 3, 5, 7, 9).
   shape : forme dessinée par js/ui/creatures.js ; c : couleurs [corps, motif, nageoires]
   de la forme adulte ; L : couleurs de la forme légendaire ; n : nom de chaque forme. */
AA.content.companions = [
  { id: "poulpe", shape: "octopus", c: ["#C8553D", "#F2A65A", "#8E3B2B"], L: ["#6B2FA8", "#7DF0FF", "#2A0F4A"], n: ["Poulpinet", "Poulpe", "Poulpe malin", "Poulpe des grottes", "Kraken des abysses"] },
  { id: "hippo", shape: "seahorse", c: ["#E3A33B", "#B5651D", "#F6D27A"], L: ["#F2C14E", "#FFF3C4", "#E07A1F"], n: ["Hippopuce", "Hippocampe", "Hippocampe moucheté", "Cavalier des herbiers", "Hippocampe céleste"] },
  { id: "tortue", shape: "turtle", c: ["#6E8B3D", "#3E5223", "#A7B86A"], L: ["#2D9C8F", "#F2C14E", "#86E0D0"], n: ["Tortinette", "Tortue", "Tortue caouanne", "Tortue luth", "Tortue ancestrale"] },
  { id: "raie", shape: "ray", c: ["#3E5566", "#D9E4EA", "#2A3A46"], L: ["#1A1F4A", "#9BE7FF", "#3B2A7A"], n: ["Raiette", "Pastenague", "Raie aigle", "Manta", "Manta astrale"] },
  { id: "meduse", shape: "jelly", c: ["#E58FB8", "#F7C6DE", "#B8578A"], L: ["#7DF0FF", "#C9A8FF", "#F2C14E"], n: ["Gouttelette", "Méduse", "Pélagie", "Méduse lune", "Méduse aurore"] },
  { id: "merou", shape: "grouper", c: ["#7A5A3C", "#E8D3A8", "#5A4029"], L: ["#3A2A1C", "#F2C14E", "#8E5A2A"], n: ["Mérillon", "Mérou", "Mérou brun", "Mérou ancien", "Mérou titan"] },
  { id: "murene", shape: "moray", c: ["#5D5A2E", "#E5D68C", "#3B3A1C"], L: ["#13212E", "#7DF0FF", "#F2C14E"], n: ["Murénette", "Murène", "Murène tigrée", "Murène gardienne", "Murène des abysses"] },
  { id: "nudi", shape: "nudi", c: ["#8E5BD9", "#F2A65A", "#FFFFFF"], L: ["#FF5FA2", "#7DF0FF", "#F2C14E"], n: ["Nudi", "Flabelline", "Doris dorée", "Nudibranche royal", "Nudi arc-en-ciel"] },
  { id: "etoile", shape: "star", c: ["#D9402B", "#F6A07C", "#D9402B"], L: ["#F2C14E", "#FFFFFF", "#F2C14E"], n: ["Étoilette", "Étoile de mer", "Étoile rouge", "Étoile filante", "Étoile polaire"] },
  { id: "lune", shape: "sunfish", c: ["#9DAAB3", "#5E6B73", "#C9D2D8"], L: ["#D7E3FF", "#7A8BD9", "#F2C14E"], n: ["Lunette", "Poisson-lune", "Môle", "Môle géant", "Lune des abysses"] },
  { id: "barra", shape: "barracuda", c: ["#A9B8C2", "#3A4650", "#E5C24A"], L: ["#E8F0F5", "#2B6FD6", "#7DF0FF"], n: ["Bécunette", "Bécune", "Barracuda", "Barracuda éclair", "Barracuda d’argent"] },
  { id: "rascasse", shape: "scorpion", c: ["#C9452F", "#F3B38A", "#8E2B1E"], L: ["#5A0F1E", "#F2C14E", "#E0482B"], n: ["Rascassou", "Rascasse", "Rascasse rouge", "Chapon", "Rascasse dragon"] },
  { id: "congre", shape: "conger", c: ["#4E5A62", "#C9D2D8", "#2E363C"], L: ["#1C2A4A", "#BFF3F7", "#7DF0FF"], n: ["Congrillon", "Congre", "Congre géant", "Seigneur de l’épave", "Congre fantôme"] },
  { id: "crabe", shape: "crab", c: ["#D2642F", "#FFFFFF", "#A8461C"], L: ["#2D2A6E", "#F2C14E", "#7DF0FF"], n: ["Crabichon", "Crabe", "Crabe vert", "Araignée de mer", "Crabe titan"] },
  { id: "girelle", shape: "wrasse", c: ["#E8763A", "#2BA8C8", "#F3C64A"], L: ["#2BD9A0", "#FF5FA2", "#F2C14E"], n: ["Girellette", "Girelle", "Girelle paon", "Girelle royale", "Girelle arc-en-ciel"] },
  { id: "demoiselle", shape: "damsel", c: ["#2B6FD6", "#7DD6FF", "#1A4A9A"], L: ["#00C2FF", "#FFFFFF", "#F2C14E"], n: ["Bleuet", "Castagnole", "Castagnole bleue", "Demoiselle", "Demoiselle d’azur"] },
  { id: "sar", shape: "bream", c: ["#C9D2D8", "#3A4650", "#9AA6AE"], L: ["#F2C14E", "#8E5A2A", "#FFE08A"], n: ["Sarillon", "Sar", "Sar tambour", "Sar impérial", "Sar d’or"] },
  { id: "daurade", shape: "fish", c: ["#B8C4CC", "#E6B93C", "#7E95A0"], L: ["#F2C14E", "#FFFFFF", "#E07A1F"], n: ["Daurinette", "Daurade", "Daurade royale", "Daurade dorée", "Daurade solaire"] },
  { id: "eponge", shape: "sponge", c: ["#E3A33B", "#F6D27A", "#C9452F"], L: ["#9B6CFF", "#7DF0FF", "#F2C14E"], n: ["Bourgeon", "Éponge", "Éponge tube", "Éponge géante", "Récif vivant"] }
];
