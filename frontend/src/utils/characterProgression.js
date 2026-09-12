export const getLifeBalanceScore = (attributes) => {
  if (!attributes) return { score: 0, label: "Developing" };
  const values = Object.values(attributes);
  const total = values.reduce((acc, val) => acc + val, 0);
  const average = total / values.length;
  
  // Calculate variance to penalize heavily skewed builds
  const variance = values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / values.length;
  
  // Mock calculation: higher average = better score, high variance = lower score
  let score = Math.min(100, Math.floor((average * 3) - (Math.sqrt(variance) * 0.5)));
  if (score < 0) score = 0;

  let label = "Developing";
  if (score >= 85) label = "Thriving";
  else if (score >= 60) label = "Balanced";
  else if (score >= 40) label = "Needs Attention";

  return { score, label };
};

export const getStrongestAttributes = (attributes) => {
  if (!attributes) return [];
  return Object.entries(attributes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);
};

export const getDevelopmentAreas = (attributes) => {
  if (!attributes) return [];
  return Object.entries(attributes)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(entry => entry[0]);
};

export const getCharacterTitle = (level, playstyle) => {
  const titles = {
    strategist: ["Novice Planner", "Tactician", "The Strategist", "Master Architect"],
    explorer: ["Wanderer", "Pathfinder", "The Explorer", "Grand Voyager"],
    builder: ["Apprentice", "Artisan", "The Builder", "World Weaver"],
    scholar: ["Student", "Researcher", "The Scholar", "Sage of Truth"],
    warrior: ["Initiate", "Gladiator", "The Warrior", "Apex Champion"],
    balanced: ["Initiate", "Adept", "The Paragon", "Universal Master"]
  };

  const rank = level < 5 ? 0 : level < 15 ? 1 : level < 30 ? 2 : 3;
  const style = playstyle ? playstyle.toLowerCase() : 'balanced';
  
  return (titles[style] || titles.balanced)[rank];
};

export const getPlaystyleBonus = (playstyle) => {
  const bonuses = {
    strategist: "Planning quests provide increased Discipline progression.",
    explorer: "Discovery quests reveal hidden Adventure Path nodes faster.",
    builder: "Project quests have a 5% higher chance of Critical Success.",
    scholar: "Learning quests grant a temporary Intellect boost.",
    warrior: "Health and endurance quests regenerate Energy 10% faster.",
    balanced: "All quest types have a slightly balanced XP curve."
  };
  return bonuses[playstyle ? playstyle.toLowerCase() : 'balanced'] || bonuses.balanced;
};
