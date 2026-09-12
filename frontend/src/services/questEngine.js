import { MOCK_QUESTS } from '../data/mockQuests';

export class QuestEngine {
  constructor(gameState) {
    this.gameState = gameState;
    // Base pool is all mock quests, filtering out completed/failed ones 
    // For simplicity, we just use MOCK_QUESTS and assume the engine regenerates from available ones.
    this.availableQuests = MOCK_QUESTS;
  }

  getRecommendedQuest(currentQuests) {
    if (!currentQuests || currentQuests.length === 0) return null;
    
    const { attributes, player } = this.gameState;
    
    // Simple logic: Find the lowest attribute and recommend a quest for it, 
    // OR recommend a quest that fits current energy.
    const sortedAttributes = Object.entries(attributes).sort((a, b) => a[1] - b[1]);
    const lowestAttribute = sortedAttributes[0][0];

    // Filter by energy
    let affordableQuests = currentQuests.filter(q => q.energyCost <= player.energy && q.status !== 'locked');
    
    if (affordableQuests.length === 0) {
      // Return lowest energy cost quest just to show something
      affordableQuests = [...currentQuests].sort((a,b) => a.energyCost - b.energyCost);
    }

    // Try to find one matching lowest attribute
    let recommended = affordableQuests.find(q => q.attribute === lowestAttribute);

    if (!recommended) {
      recommended = affordableQuests[0];
    }

    return {
      quest: recommended,
      reason: `Your ${lowestAttribute} attribute is currently underdeveloped. This quest focuses on training it.`
    };
  }

  // Gets initial active/available quests (merging status if needed)
  initializeQuests(existingQuests = []) {
    if (existingQuests.length > 0) return existingQuests;
    return JSON.parse(JSON.stringify(this.availableQuests)); // Deep copy
  }
}
