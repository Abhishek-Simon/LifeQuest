export const mockCharacter = {
  name: "Abhishek",
  level: 5,
  title: "Sovereign Agent",
  xp: 720,
  nextLevelXp: 1000,
  gold: 340,
  streak: 8,
  multiplier: 1.35,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  attributes: {
    strength: 18,
    intellect: 32,
    endurance: 21,
    wisdom: 24,
    creativity: 16,
    discipline: 29
  }
};

export const mockQuests = [
  {
    id: "q1",
    title: "Complete 2 Binary Search Implementations",
    type: "intellect",
    difficulty: "High",
    xpReward: 120,
    goldReward: 25,
    estimatedMinutes: 45,
    status: "active"
  },
  {
    id: "q2",
    title: "Deep Work Block (90m)",
    type: "discipline",
    difficulty: "Medium",
    xpReward: 150,
    goldReward: 40,
    estimatedMinutes: 90,
    status: "active"
  },
  {
    id: "q3",
    title: "Morning 5K Run",
    type: "endurance",
    difficulty: "Medium",
    xpReward: 100,
    goldReward: 20,
    estimatedMinutes: 30,
    status: "completed"
  }
];

export const mockAchievements = [
  {
    id: "a1",
    title: "Monk Mode Protocol",
    description: "Unlocked at 30-day deep work streak",
    status: "locked",
    icon: "hotel_class"
  },
  {
    id: "a2",
    title: "First Blood",
    description: "Completed your first quest",
    status: "unlocked",
    icon: "military_tech"
  }
];

export const mockBosses = [
  {
    id: "b1",
    title: "Q3 Product Launch Alpha",
    currentHp: 42000,
    maxHp: 100000,
    phase: "PHASE 2: API HARDENING",
    partySize: 3
  }
];
