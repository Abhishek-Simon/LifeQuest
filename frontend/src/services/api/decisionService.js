import { questService } from './questService';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const baseQuests = [
  {
    id: 'q-rec-1',
    title: 'Complete 2 Binary Search Problems',
    objective: 'Practice algorithmic thinking with sorted arrays.',
    attribute: 'intellect',
    difficulty: 'Medium',
    duration: 30,
    xpReward: 120,
    goldReward: 50,
    status: 'available',
    energyCost: 15
  },
  {
    id: 'q-rec-2',
    title: 'Morning 5k Run',
    objective: 'Maintain physical endurance.',
    attribute: 'vitality',
    difficulty: 'Hard',
    duration: 45,
    xpReward: 150,
    goldReward: 40,
    status: 'available',
    energyCost: 20
  },
  {
    id: 'q-rec-3',
    title: 'Design System Audit',
    objective: 'Check all components for accessibility compliance.',
    attribute: 'focus',
    difficulty: 'Medium',
    duration: 60,
    xpReward: 100,
    goldReward: 60,
    status: 'available',
    energyCost: 10
  }
];

// Singleton mock state
let currentIndex = 0;

export const decisionService = {
  getRecommendation: async () => {
    if (USE_MOCK) {
      await delay(600); // Simulate network
      
      // Simulate finding a recommendation
      const quest = baseQuests[currentIndex % baseQuests.length];
      
      if (!quest) {
        return null;
      }

      return {
        quest,
        reason: 'This quest matches your current progression trajectory.',
        context: {
          goal: 'Frontend Architecture Mastery',
          balance: `${quest.attribute.toUpperCase()} hasn't been trained today.`,
          progression: 'Optimal difficulty scaling detected.'
        }
      };
    }

    // Real API mode: Fallback to pseudo-recommendation using real quest API
    // since the Decision Engine API does not exist yet.
    return await questService.getRecommendedQuest();
  },

  rerollQuest: async () => {
    if (USE_MOCK) {
      await delay(800);
      currentIndex++;
      
      // Hardcode a simulation of running out of rerolls after a few times
      if (currentIndex > 10) {
        throw new Error("Reroll limit reached.");
      }
      
      return decisionService.getRecommendation();
    }

    // Real API mode: Reroll simply calls the pseudo-recommendation again (which will return the same for now)
    return await questService.getRecommendedQuest();
  }
};
