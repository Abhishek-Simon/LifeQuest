const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockEntries = [
  {
    id: 'j-1',
    questId: 'q-101',
    title: 'Binary Search Training',
    objective: 'Complete 2 Binary Search problems.',
    status: 'completed',
    attribute: 'INTELLECT',
    difficulty: 'Hard',
    date: new Date().toISOString(), // Today
    reward: { xp: 120, gold: 50 },
    chapter: null,
    type: 'normal'
  },
  {
    id: 'j-2',
    questId: 'q-102',
    title: 'Morning Run',
    objective: 'Run 5km without stopping.',
    status: 'completed',
    attribute: 'VITALITY',
    difficulty: 'Medium',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    reward: { xp: 150, gold: 40 },
    chapter: null,
    type: 'normal'
  },
  {
    id: 'j-3',
    questId: 'q-103',
    title: 'Design System Review',
    objective: 'Audit Figma for component parity.',
    status: 'active',
    attribute: 'FOCUS',
    difficulty: 'Medium',
    date: new Date().toISOString(),
    reward: { xp: 100, gold: 30 },
    chapter: null,
    type: 'normal'
  },
  {
    id: 'j-4',
    questId: 'q-104',
    title: 'The Algorithm Trial',
    objective: 'Defeat the DSA Interview Boss.',
    status: 'completed',
    attribute: 'INTELLECT',
    difficulty: 'Boss',
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    reward: { xp: 500, gold: 200 },
    chapter: 'CHAPTER III',
    type: 'story',
    narrative: 'You stood before the whiteboard, markers dry and hands sweating, but logic prevailed.'
  },
  {
    id: 'j-5',
    questId: 'q-105',
    title: 'Sleep Schedule Reset',
    objective: 'In bed by 10 PM.',
    status: 'failed',
    attribute: 'VITALITY',
    difficulty: 'Hard',
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    reward: { xp: 100, gold: 50 },
    chapter: null,
    type: 'normal'
  }
];

export const journalService = {
  getEntries: async () => {
    await delay(300);
    return mockEntries;
  },

  getActive: async () => {
    await delay(200);
    return mockEntries.filter(e => e.status === 'active');
  },

  getCompleted: async () => {
    await delay(200);
    return mockEntries.filter(e => e.status === 'completed');
  },

  getFailed: async () => {
    await delay(200);
    return mockEntries.filter(e => e.status === 'failed');
  },

  getStory: async () => {
    await delay(200);
    return mockEntries.filter(e => e.type === 'story');
  }
};
