import { ACHIEVEMENTS } from '../data/achievements';

export const evaluateAchievements = (gameState) => {
  const newUnlocks = [];
  
  // Extract metrics from gameState
  const metrics = {
    questsCompleted: gameState.questsCompleted || 0,
    level: gameState.player.level || 1,
    currentStreak: gameState.player.streak || 0,
    bossDamageDealt: gameState.bossDamageDealt || 0,
    bossesDefeated: gameState.bosses.filter(b => b.status === 'defeated').length || 0,
    itemsPurchased: gameState.itemsPurchased || 0
  };

  ACHIEVEMENTS.forEach(achievement => {
    const currentVal = metrics[achievement.metric] || 0;
    
    // Check all tiers
    achievement.tiers.forEach((tier) => {
      const unlockId = `${achievement.id}_tier_${tier.level}`;
      
      // If they haven't unlocked this tier yet, and they meet the requirement
      if (!gameState.achievements.unlocked.includes(unlockId)) {
        if (currentVal >= tier.requirement) {
          newUnlocks.push({
            achievement,
            tier,
            unlockId
          });
        }
      }
    });
  });

  return newUnlocks;
};

export const getAchievementProgress = (gameState, achievement) => {
  const metrics = {
    questsCompleted: gameState.questsCompleted || 0,
    level: gameState.player.level || 1,
    currentStreak: gameState.player.streak || 0,
    bossDamageDealt: gameState.bossDamageDealt || 0,
    bossesDefeated: gameState.bosses.filter(b => b.status === 'defeated').length || 0,
    itemsPurchased: gameState.itemsPurchased || 0
  };

  const currentVal = metrics[achievement.metric] || 0;
  
  // Find highest unlocked tier and next requirement
  let highestUnlockedLevel = 0;
  let nextTier = achievement.tiers[0];

  for (const tier of achievement.tiers) {
    const unlockId = `${achievement.id}_tier_${tier.level}`;
    if (gameState.achievements.unlocked.includes(unlockId)) {
      highestUnlockedLevel = tier.level;
    } else {
      nextTier = tier;
      break; // Found the tier they are currently working on
    }
  }

  const isFullyMastered = highestUnlockedLevel === achievement.tiers.length;
  if (isFullyMastered) {
    nextTier = achievement.tiers[achievement.tiers.length - 1]; // lock it to the max tier
  }

  return {
    currentVal,
    nextTier,
    highestUnlockedLevel,
    isFullyMastered
  };
};
