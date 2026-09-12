export const ITEM_CATEGORIES = ['head', 'core', 'tool', 'companion', 'badge', 'relic'];
export const ITEM_RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

export const ITEMS_CATALOG = [
  // COMMON
  {
    id: "basic-focus-token",
    name: "Basic Focus Token",
    category: "badge",
    rarity: "common",
    description: "A simple token representing your commitment to getting things done.",
    bonus: { type: "flat_xp", value: 5, description: "+5 Flat XP per quest" },
    price: 50,
    unlockCondition: null,
    source: "shop"
  },
  {
    id: "recovery-band",
    name: "Recovery Band",
    category: "tool",
    rarity: "common",
    description: "A lightweight band that aids in energy conservation.",
    bonus: { type: "energy_reduction", value: 5, description: "-5% Energy Cost" },
    price: 75,
    unlockCondition: null,
    source: "shop"
  },
  
  // UNCOMMON
  {
    id: "momentum-band",
    name: "Momentum Band",
    category: "tool",
    rarity: "uncommon",
    description: "Channels the kinetic energy of daily action into continuous progress.",
    bonus: { type: "streak_xp", value: 5, description: "+5% XP while maintaining a 3+ day streak" },
    price: 150,
    unlockCondition: null,
    source: "shop"
  },
  {
    id: "explorers-compass",
    name: "Explorer's Compass",
    category: "tool",
    rarity: "uncommon",
    description: "Helps navigate complex tasks and long-term goals.",
    bonus: { type: "wisdom_boost", value: 2, description: "Improves Wisdom quest rewards" },
    price: 180,
    unlockCondition: null,
    source: "shop"
  },

  // RARE
  {
    id: "focus-core",
    name: "Focus Core",
    category: "core",
    rarity: "rare",
    description: "A highly tuned core module designed for sustained concentration and deep work.",
    bonus: { type: "intellect_xp", value: 10, description: "+10% XP from Intellect quests" },
    price: 350,
    unlockCondition: null,
    source: "shop"
  },
  {
    id: "strategist-lens",
    name: "Strategist's Lens",
    category: "head",
    rarity: "rare",
    description: "Advanced optics that reveal the optimal path through complex workflows.",
    bonus: { type: "tactical_insight", value: 1, description: "+1 to Tactical rolls (Critical Chance)" },
    price: 400,
    unlockCondition: "Reach Chapter II.",
    source: "shop"
  },

  // EPIC
  {
    id: "discipline-sigil",
    name: "Discipline Sigil",
    category: "badge",
    rarity: "epic",
    description: "A heavy, glowing sigil earned through unwavering consistency.",
    bonus: { type: "boss_damage", value: 5, description: "+5 Bonus Damage against Bosses" },
    price: 800,
    unlockCondition: "Defeat Procrastination.",
    source: "boss_drop"
  },
  {
    id: "procrastination-trophy",
    name: "Thief's Timepiece",
    category: "relic",
    rarity: "epic",
    description: "A shattered clock wrested from the Thief of Time.",
    bonus: { type: "time_mastery", value: 10, description: "+10% XP to all Quests completed before noon." },
    price: 0,
    unlockCondition: "Defeat Procrastination.",
    source: "boss_drop",
    isUnique: true
  },

  // LEGENDARY
  {
    id: "lifequest-keystone",
    name: "LifeQuest Keystone",
    category: "core",
    rarity: "legendary",
    description: "The foundational anchor of your journey. It pulses with the accumulated energy of a thousand small victories.",
    bonus: { type: "all_stats", value: 5, description: "+5% to ALL XP and Gold yields" },
    price: 5000,
    unlockCondition: "Reach Level 50.",
    source: "achievement"
  }
];

export const getItemById = (id) => ITEMS_CATALOG.find(item => item.id === id);
