export const EVENT_TYPES = {
  QUEST_COMPLETE: 'quest_complete',
  QUEST_FAIL: 'quest_fail',
  BOSS_DAMAGE: 'boss_damage',
  BOSS_DEFEAT: 'boss_defeat',
  ACHIEVEMENT_UNLOCK: 'achievement_unlock',
  CODEX_DISCOVERY: 'codex_discovery',
  SKILL_UNLOCK: 'skill_unlock',
  ITEM_PURCHASE: 'item_purchase',
  ITEM_EQUIP: 'item_equip',
  LEVEL_UP: 'level_up'
};

const generateId = () => `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const buildJournalEvent = (type, title, description, data = {}) => {
  return {
    id: generateId(),
    type,
    title,
    description,
    data,
    timestamp: new Date().toISOString()
  };
};

export const generateMockHistory = () => {
  const events = [];
  const now = new Date();
  
  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  // 3 Days Ago
  events.push({
    id: generateId(),
    type: EVENT_TYPES.QUEST_COMPLETE,
    title: 'Morning Routine',
    description: 'Completed a daily quest.',
    timestamp: addDays(now, -3).toISOString(),
    data: { xp: 50, gold: 10, attribute: 'vitality' }
  });

  events.push({
    id: generateId(),
    type: EVENT_TYPES.ACHIEVEMENT_UNLOCK,
    title: 'First Steps',
    description: 'Completed your first quest.',
    timestamp: addDays(now, -3).toISOString(),
    data: { rarity: 'common', reward: '+10 XP' }
  });

  // 2 Days Ago
  events.push({
    id: generateId(),
    type: EVENT_TYPES.BOSS_DAMAGE,
    title: 'Procrastination',
    description: 'Dealt damage to a Boss.',
    timestamp: addDays(now, -2).toISOString(),
    data: { damage: 15, quest: 'Deep Work Session' }
  });

  // 1 Day Ago
  events.push({
    id: generateId(),
    type: EVENT_TYPES.ITEM_PURCHASE,
    title: 'Focus Core',
    description: 'Purchased an item from the Armory.',
    timestamp: addDays(now, -1).toISOString(),
    data: { price: 120, rarity: 'rare' }
  });

  // Today
  events.push({
    id: generateId(),
    type: EVENT_TYPES.SKILL_UNLOCK,
    title: 'Iron Will',
    description: 'Unlocked a new skill.',
    timestamp: addDays(now, -0.5).toISOString(),
    data: { cost: 1, attribute: 'discipline' }
  });

  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};
