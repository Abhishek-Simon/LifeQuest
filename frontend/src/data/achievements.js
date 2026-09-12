export const ACHIEVEMENT_CATEGORIES = ['progression', 'quests', 'streaks', 'bosses', 'skills', 'economy', 'attributes'];

export const ACHIEVEMENTS = [
  // PROGRESSION
  {
    id: "first_steps",
    title: "First Steps",
    category: "progression",
    rarity: "common",
    description: "Complete your first quest.",
    metric: "questsCompleted",
    tiers: [
      { level: 1, requirement: 1, reward: { type: "xp", value: 10 } }
    ]
  },
  {
    id: "rising_pathfinder",
    title: "Rising Pathfinder",
    category: "progression",
    rarity: "rare",
    description: "Reach Level 5.",
    metric: "level",
    tiers: [
      { level: 1, requirement: 5, reward: { type: "gold", value: 50 } },
      { level: 2, requirement: 10, reward: { type: "item", value: "basic-focus-token" } } // mapped item id
    ]
  },

  // QUESTS
  {
    id: "quest_initiate",
    title: "Quest Initiate",
    category: "quests",
    rarity: "uncommon",
    description: "Complete quests to prove your resolve.",
    metric: "questsCompleted",
    tiers: [
      { level: 1, requirement: 5, reward: { type: "xp", value: 50 } },
      { level: 2, requirement: 25, reward: { type: "gold", value: 100 } },
      { level: 3, requirement: 100, reward: { type: "xp", value: 500 } }
    ]
  },

  // STREAKS
  {
    id: "momentum_builder",
    title: "Momentum Builder",
    category: "streaks",
    rarity: "epic",
    description: "Maintain a continuous streak of action.",
    metric: "currentStreak",
    tiers: [
      { level: 1, requirement: 7, reward: { type: "gold", value: 100 } },
      { level: 2, requirement: 14, reward: { type: "gold", value: 250 } },
      { level: 3, requirement: 30, reward: { type: "item", value: "momentum-band" } }
    ]
  },

  // BOSSES
  {
    id: "first_blood",
    title: "First Blood",
    category: "bosses",
    rarity: "uncommon",
    description: "Damage your first Boss.",
    metric: "bossDamageDealt",
    tiers: [
      { level: 1, requirement: 1, reward: { type: "xp", value: 25 } }
    ]
  },
  {
    id: "boss_breaker",
    title: "Boss Breaker",
    category: "bosses",
    rarity: "epic",
    description: "Defeat a major obstacle in your life.",
    metric: "bossesDefeated",
    tiers: [
      { level: 1, requirement: 1, reward: { type: "gold", value: 200 } }
    ]
  },

  // ECONOMY
  {
    id: "first_purchase",
    title: "First Purchase",
    category: "economy",
    rarity: "common",
    description: "Acquire your first item from the Shop.",
    metric: "itemsPurchased",
    tiers: [
      { level: 1, requirement: 1, reward: { type: "xp", value: 10 } }
    ]
  }
];
