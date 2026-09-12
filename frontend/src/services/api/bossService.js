const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockChapter = {
  id: 'chap-3',
  name: 'CHAPTER III: THE ALGORITHM TRIAL',
  narrative: 'A crucible of logic and optimization. Prove your computational mastery to proceed.',
  progress: 75,
  bossId: 'boss-1',
  nextChapter: 'CHAPTER IV: THE SYSTEM ARCHITECT'
};

const mockBoss = {
  id: 'boss-1',
  name: 'DSA INTERVIEW',
  description: 'The ultimate guardian of the tech tier. Test your problem-solving under extreme pressure.',
  hp: 360,
  maxHp: 1000,
  progress: 64, // (1000 - 360)/1000
  chapter: mockChapter,
  playerStats: {
    name: 'Player One',
    level: 14,
    xp: 2450,
    nextLevelXp: 5000,
    relevantAttribute: { name: 'INTELLECT', value: 32 }
  },
  stages: [
    { id: 'stg-1', name: 'Arrays', status: 'completed' },
    { id: 'stg-2', name: 'Binary Search', status: 'current', objective: 'Complete 2 Binary Search Problems', rewardXP: 120, rewardGold: 50 },
    { id: 'stg-3', name: 'Trees', status: 'locked' },
    { id: 'stg-4', name: 'Graphs', status: 'locked' },
    { id: 'stg-5', name: 'Dynamic Programming', status: 'locked' },
    { id: 'stg-6', name: 'Mock Interview', status: 'locked' }
  ]
};

export const bossService = {
  getBosses: async () => {
    await delay(600);
    return [mockBoss];
  },
  
  getBossById: async (id) => {
    await delay(600);
    if (id === mockBoss.id) return mockBoss;
    throw new Error("Boss not found");
  },

  getBossProgress: async (id) => {
    await delay(200);
    return { hp: mockBoss.hp, maxHp: mockBoss.maxHp, progress: mockBoss.progress };
  },

  getChapterProgress: async () => {
    await delay(400);
    return mockChapter;
  },

  getChapterById: async (id) => {
    await delay(400);
    if (id === mockChapter.id) return mockChapter;
    throw new Error("Chapter not found");
  }
};
