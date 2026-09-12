export const INITIAL_BOSSES = [
  {
    id: "procrastination",
    name: "Procrastination",
    title: "The Thief of Time",
    description: "A persistent force that turns intention into delay. It feeds on unstructured time and vague goals.",
    hp: 100,
    maxHp: 100,
    threat: "High",
    weaknesses: ["discipline", "intellect"],
    phase: 1,
    status: "active", // active, defeated, locked, available
    unlockCondition: "Default starting boss.",
    rewardPreview: "+500 XP, +150 Gold, Unlock Digital Distraction"
  },
  {
    id: "digital-distraction",
    name: "Digital Distraction",
    title: "The Attention Vampire",
    description: "An endless stream of notifications and infinite scrolling designed to fragment your focus.",
    hp: 150,
    maxHp: 150,
    threat: "Moderate",
    weaknesses: ["discipline", "endurance"],
    phase: 1,
    status: "locked",
    unlockCondition: "Defeat Procrastination to unlock.",
    rewardPreview: "+750 XP, +250 Gold, +1 Skill Point"
  },
  {
    id: "inconsistency",
    name: "Inconsistency",
    title: "The Momentum Breaker",
    description: "The insidious habit of starting strong but failing to follow through. It thrives when streaks are broken.",
    hp: 200,
    maxHp: 200,
    threat: "Severe",
    weaknesses: ["endurance", "strength"],
    phase: 1,
    status: "locked",
    unlockCondition: "Defeat Digital Distraction to unlock.",
    rewardPreview: "+1000 XP, Legendary Title"
  },
  {
    id: "financial-chaos",
    name: "Financial Chaos",
    title: "The Resource Drain",
    description: "Impulse spending and lack of budgeting that slowly depletes your real-world resources.",
    hp: 250,
    maxHp: 250,
    threat: "High",
    weaknesses: ["wisdom", "discipline"],
    phase: 1,
    status: "locked",
    unlockCondition: "Reach Chapter II.",
    rewardPreview: "+1500 XP, Massive Gold Boost"
  },
  {
    id: "burnout",
    name: "Burnout",
    title: "The Flame Extinguisher",
    description: "The physical and mental exhaustion that follows periods of unsustainable output.",
    hp: 300,
    maxHp: 300,
    threat: "Legendary",
    weaknesses: ["wisdom", "creativity"],
    phase: 1,
    status: "locked",
    unlockCondition: "Defeat Inconsistency and reach Level 10.",
    rewardPreview: "+2000 XP, Unique Avatar Frame"
  }
];
