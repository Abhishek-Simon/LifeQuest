import { CODEX_ENTRIES } from '../data/codex';

export const evaluateDiscoveries = (gameState) => {
  const newDiscoveries = [];

  // Helper sets for quick lookup
  const unlockedAchievements = new Set(gameState.achievements.unlocked);
  const ownedItems = new Set(gameState.inventory.items.map(i => i.itemId));
  const defeatedBosses = new Set(gameState.bosses.filter(b => b.status === 'defeated').map(b => b.id));
  const activeBossId = gameState.activeBossId;

  CODEX_ENTRIES.forEach(entry => {
    if (entry.alwaysUnlocked && !gameState.codex.discovered.includes(entry.id)) {
      newDiscoveries.push(entry);
      return;
    }

    if (!gameState.codex.discovered.includes(entry.id)) {
      let isDiscovered = false;

      // Deterministic triggers
      switch (entry.discoveryMetric) {
        case 'encountered_boss_procrastination':
          if (activeBossId === 'procrastination' || defeatedBosses.has('procrastination')) isDiscovered = true;
          break;
        case 'defeated_boss_procrastination':
          if (defeatedBosses.has('procrastination')) isDiscovered = true;
          break;
        case 'acquired_item_focus-core':
          if (ownedItems.has('focus-core')) isDiscovered = true;
          break;
        case 'acquired_item_procrastination-trophy':
          if (ownedItems.has('procrastination-trophy')) isDiscovered = true;
          break;
        case 'unlocked_skill_deep_work':
          // Mock checking if deep work skill is unlocked
          // if (gameState.unlockedSkills.includes('deep_work')) isDiscovered = true;
          break;
        default:
          break;
      }

      if (isDiscovered) {
        newDiscoveries.push(entry);
      }
    }
  });

  return newDiscoveries;
};
