const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockAchievements = [
  {
    id: 'ach-1',
    name: 'First Quest',
    description: 'Complete your first quest.',
    tier: 'Bronze',
    status: 'unlocked',
    progress: 1,
    target: 1,
    unlockedAt: '2026-09-01T10:00:00Z',
    icon: 'flag'
  },
  {
    id: 'ach-2',
    name: 'Getting Serious',
    description: 'Complete 10 quests.',
    tier: 'Silver',
    status: 'in_progress',
    progress: 7,
    target: 10,
    unlockedAt: null,
    icon: 'swords'
  },
  {
    id: 'ach-3',
    name: 'Unstoppable',
    description: 'Maintain a 30-day streak.',
    tier: 'Gold',
    status: 'in_progress',
    progress: 12,
    target: 30,
    unlockedAt: null,
    icon: 'local_fire_department'
  },
  {
    id: 'ach-4',
    name: 'No Excuses',
    description: 'Complete a quest when Life Balance is critically low.',
    tier: 'Silver',
    status: 'locked',
    progress: 0,
    target: 1,
    unlockedAt: null,
    icon: 'shield'
  },
  {
    id: 'ach-5',
    name: 'Scholar',
    description: 'Reach Intellect Level 50.',
    tier: 'Gold',
    status: 'locked',
    progress: 32,
    target: 50,
    unlockedAt: null,
    icon: 'psychology'
  },
  {
    id: 'ach-6',
    name: 'Balanced Hero',
    description: 'Reach Level 20 with all attributes at least Level 15.',
    tier: 'Mythic',
    status: 'in_progress',
    progress: 80,
    target: 100, // Representing percentage for complex goals
    unlockedAt: null,
    icon: 'balance'
  }
];

export const achievementService = {
  getAchievements: async () => {
    await delay(500);
    return mockAchievements;
  },

  getAchievementById: async (id) => {
    await delay(300);
    const ach = mockAchievements.find(a => a.id === id);
    if (!ach) throw new Error("Achievement not found");
    return ach;
  }
};
