export const CODEX_CATEGORIES = ['world', 'bosses', 'skills', 'items', 'attributes'];

export const CODEX_ENTRIES = [
  // BOSSES
  {
    id: "boss-procrastination",
    title: "Procrastination",
    category: "bosses",
    icon: "hourglass_disabled",
    rarity: "epic",
    description: "The Thief of Time. Procrastination thrives on avoidance and perfectionism, growing stronger the longer an action is delayed. It is weak to immediate, imperfect action.",
    relatedAttributes: ["Discipline", "Intellect"],
    discoveryCondition: "Encounter the Procrastination Boss.",
    discoveryMetric: "encountered_boss_procrastination" // Triggers when activeBossId is procrastination
  },
  {
    id: "boss-digital-distraction",
    title: "Digital Distraction",
    category: "bosses",
    icon: "notifications_paused",
    rarity: "rare",
    description: "The Fragmenter. This entity breaks focus into useless shards by providing constant, low-effort dopamine hits.",
    relatedAttributes: ["Discipline", "Focus"],
    discoveryCondition: "Defeat Procrastination.",
    discoveryMetric: "defeated_boss_procrastination"
  },

  // ITEMS
  {
    id: "item-focus-core",
    title: "Focus Core",
    category: "items",
    icon: "memory",
    rarity: "rare",
    description: "A highly tuned core module designed for sustained concentration and deep work. Found in the deepest reserves of focused energy.",
    relatedAttributes: ["Intellect"],
    discoveryCondition: "Acquire the Focus Core.",
    discoveryMetric: "acquired_item_focus-core"
  },
  {
    id: "item-procrastination-trophy",
    title: "Thief's Timepiece",
    category: "items",
    icon: "diamond",
    rarity: "epic",
    description: "A shattered clock wrested from the Thief of Time. It reminds its bearer that time is the only truly finite resource.",
    relatedAttributes: ["Discipline"],
    discoveryCondition: "Defeat Procrastination.",
    discoveryMetric: "acquired_item_procrastination-trophy"
  },

  // SKILLS
  {
    id: "skill-deep-work",
    title: "Deep Work Protocol",
    category: "skills",
    icon: "psychology",
    rarity: "uncommon",
    description: "The ability to focus without distraction on a cognitively demanding task. This state allows you to master complicated information quickly and produce better results in less time.",
    relatedAttributes: ["Intellect", "Discipline"],
    discoveryCondition: "Unlock the Deep Work skill.",
    discoveryMetric: "unlocked_skill_deep_work"
  },

  // WORLD
  {
    id: "world-lifequest",
    title: "The LifeQuest Interface",
    category: "world",
    icon: "explore",
    rarity: "legendary",
    description: "The master HUD that translates mundane reality into a measurable, progressing adventure. It responds to willpower and consistency.",
    relatedAttributes: [],
    discoveryCondition: "Awaken your character.",
    discoveryMetric: "auto_unlock", // Always unlocked from the start
    alwaysUnlocked: true
  }
];
