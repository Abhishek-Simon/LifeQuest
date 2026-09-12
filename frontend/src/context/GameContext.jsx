import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_QUESTS } from '../data/mockQuests';
import { INITIAL_BOSSES } from '../data/bosses';
import { calculateBossDamage, getBossPhase } from '../services/bossService';
import { validatePurchase } from '../services/inventoryService';
import { getItemById } from '../data/items';
import { evaluateAchievements } from '../services/achievementService';
import { evaluateDiscoveries } from '../services/codexService';
import { AchievementToast } from '../components/common/AchievementToast';
import { EVENT_TYPES, buildJournalEvent, generateMockHistory } from '../services/journalService';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    player: {
      name: "Adventurer",
      level: 1,
      xp: 0,
      nextLevelXp: 1000,
      gold: 0,
      streak: 0,
      avatar: "",
      title: "LVL 1 Novice",
      energy: 100,
      maxEnergy: 100,
      rerolls: 3, // mock rerolls
      playstyle: "strategist",
      chapter: {
        id: 1,
        title: "The Awakening",
        description: "Build the foundation for your next evolution.",
        progress: 68
      },
      records: {
        longestStreak: 12,
        bestDailyXP: 480,
        hardestQuest: "Epic",
        highestAttribute: "Intellect"
      },
      skillPoints: 0,
      unlockedSkills: [],
      skillHistory: []
    },
    attributes: {
      strength: 10,
      intellect: 10,
      endurance: 10,
      wisdom: 10,
      creativity: 10,
      discipline: 10
    },
    dailyProgress: {
      completed: 0,
      total: 5,
    },
    availableQuests: [],
    recentActivity: [],
    activeCombo: null,
    comboCount: 0,
    showLevelUp: false,
    rewardPopup: null, // { xp, gold, attribute, attributeXP, isCritical, bossDamage, bossDefeated, itemDrop }
    bosses: INITIAL_BOSSES,
    activeBossId: "procrastination",
    bossHistory: [],
    inventory: {
      capacity: 30,
      items: [
        { itemId: "basic-focus-token", acquiredAt: new Date().toISOString(), equipped: false }
      ]
    },
    equipment: {
      head: null,
      core: null,
      tool: null,
      companion: null,
      badge: null
    },
    rewardPreferences: {
      primary: "equipment"
    },
    achievements: {
      unlocked: [],
      notifications: []
    },
    codex: {
      discovered: []
    },
    journal: {
      events: generateMockHistory()
    },
    questsCompleted: 0,
    itemsPurchased: 0
  });


  // Load from localStorage and backend on mount
  useEffect(() => {
    const loadGame = async () => {
      const userId = localStorage.getItem('lq_current_user_id') || 'default';
      const saved = localStorage.getItem(`lq_game_state_${userId}`);
      let initialState = gameState;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.availableQuests) {
            initialState = parsed;
            // Ensure skill fields exist for existing saves
            if (initialState.player.skillPoints === undefined) {
              initialState.player.skillPoints = Math.max((initialState.player.level || 1) - 1, 0);
            }
            if (!initialState.player.unlockedSkills) initialState.player.unlockedSkills = [];
            if (!initialState.player.skillHistory) initialState.player.skillHistory = [];
            
            if (!initialState.bosses) initialState.bosses = INITIAL_BOSSES;
            if (!initialState.activeBossId) initialState.activeBossId = "procrastination";
            if (!initialState.bossHistory) initialState.bossHistory = [];
            
            if (!initialState.inventory) {
              initialState.inventory = {
                capacity: 30,
                items: [{ itemId: "basic-focus-token", acquiredAt: new Date().toISOString(), equipped: false }]
              };
            }
            if (!initialState.equipment) {
              initialState.equipment = { head: null, core: null, tool: null, companion: null, badge: null };
            }
            if (!initialState.rewardPreferences) {
              initialState.rewardPreferences = { primary: "equipment" };
            }
            if (!initialState.achievements) {
              initialState.achievements = { unlocked: [], notifications: [] };
            }
            if (!initialState.codex) {
              initialState.codex = { discovered: [] };
            }
            if (!initialState.journal) {
              initialState.journal = { events: generateMockHistory() };
            }
            if (initialState.questsCompleted === undefined) initialState.questsCompleted = 0;
            if (initialState.itemsPurchased === undefined) initialState.itemsPurchased = 0;
          }
        } catch (e) {
          console.error('Failed to parse game state', e);
        }
      }

      // Fetch authoritative character from backend
      try {
        const { characterService } = await import('../services/api/characterService');
        const charData = await characterService.getCharacter();
        if (charData) {
          initialState.player = {
            ...initialState.player,
            name: charData.name,
            level: charData.level,
            xp: charData.xp,
            nextLevelXp: Math.floor(1000 * Math.pow(1.5, charData.level - 1)), // Simple frontend calculation for now
            gold: charData.gold,
            streak: charData.streak,
            avatar: charData.avatarUrl || initialState.player.avatar,
            title: charData.title || initialState.player.title,
            playstyle: charData.playstyle || initialState.player.playstyle,
            chapter: { ...initialState.player.chapter, id: charData.chapter_id }
          };
          initialState.attributes = {
            strength: charData.strength,
            intellect: charData.intellect,
            endurance: charData.endurance,
            wisdom: charData.wisdom,
            creativity: charData.creativity,
            discipline: charData.discipline,
          };
        }
      } catch (err) {
        console.error("Failed to load authoritative character", err);
      }
      
      setGameState(initialState);
    };
    
    loadGame();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const userId = localStorage.getItem('lq_current_user_id') || 'default';
    localStorage.setItem(`lq_game_state_${userId}`, JSON.stringify(gameState));
  }, [gameState]);

  const startQuest = (questId) => {
    setGameState((prev) => {
      const questIndex = prev.availableQuests.findIndex(q => q.id === questId);
      if (questIndex === -1) return prev;
      
      const quest = prev.availableQuests[questIndex];
      
      if (prev.player.energy < quest.energyCost) {
        return prev; // Not enough energy
      }

      const updatedQuests = [...prev.availableQuests];
      updatedQuests[questIndex] = { ...quest, status: 'active' };

      return {
        ...prev,
        player: {
          ...prev.player,
          energy: prev.player.energy - quest.energyCost
        },
        availableQuests: updatedQuests
      };
    });
  };

  // Central post-action evaluator for Discoveries and Achievements
  const processGameActionResult = (newState) => {
    let nextState = { ...newState };
    
    // Evaluate Codex
    const newDiscoveries = evaluateDiscoveries(nextState);
    if (newDiscoveries.length > 0) {
      nextState.codex = {
        ...nextState.codex,
        discovered: [...nextState.codex.discovered, ...newDiscoveries.map(d => d.id)]
      };
      
      const codexEvents = newDiscoveries.map(d => 
        buildJournalEvent(EVENT_TYPES.CODEX_DISCOVERY, d.title, 'Discovered new lore', { category: d.category })
      );
      nextState.journal.events = [...codexEvents, ...nextState.journal.events].slice(0, 500);
    }

    // Evaluate Achievements
    const newAchievements = evaluateAchievements(nextState);
    if (newAchievements.length > 0) {
      const newUnlockIds = newAchievements.map(a => a.unlockId);
      nextState.achievements = {
        ...nextState.achievements,
        unlocked: [...nextState.achievements.unlocked, ...newUnlockIds],
        notifications: [...nextState.achievements.notifications, ...newAchievements]
      };
      
      const achEvents = newAchievements.map(ach => 
        buildJournalEvent(EVENT_TYPES.ACHIEVEMENT_UNLOCK, ach.achievement.title, 'Unlocked an achievement', { rarity: ach.achievement.rarity, reward: ach.tier.reward ? `+${ach.tier.reward.value} ${ach.tier.reward.type}` : null })
      );
      nextState.journal.events = [...achEvents, ...nextState.journal.events].slice(0, 500);
      
      // Auto-grant achievement rewards
      newAchievements.forEach(ach => {
        if (ach.tier.reward) {
          if (ach.tier.reward.type === 'xp') nextState.player.xp += ach.tier.reward.value;
          if (ach.tier.reward.type === 'gold') nextState.player.gold += ach.tier.reward.value;
        }
      });
    }

    return nextState;
  };

  const completeQuest = (questId) => {
    setGameState((prev) => {
      const questIndex = prev.availableQuests.findIndex(q => q.id === questId);
      if (questIndex === -1) return prev;
      const quest = prev.availableQuests[questIndex];

      // Critical Success Check (15% chance)
      const isCritical = Math.random() < 0.15;
      const multiplier = isCritical ? 1.5 : 1.0;

      // Combo Logic
      let newComboId = quest.comboId || null;
      let newComboCount = 0;
      let comboBonus = 1.0;
      
      if (newComboId && newComboId === prev.activeCombo) {
        newComboCount = prev.comboCount + 1;
        comboBonus = 1.0 + (newComboCount * 0.1); // +10% per combo step
      } else if (newComboId) {
        newComboCount = 1;
      }

      const totalMultiplier = multiplier * comboBonus;
      const finalXp = Math.floor(quest.rewards.xp * totalMultiplier);
      let finalGold = Math.floor(quest.rewards.gold * totalMultiplier);

      let newXp = prev.player.xp + finalXp;
      let newLevel = prev.player.level;
      let newNextLevelXp = prev.player.nextLevelXp;
      let newSkillPoints = prev.player.skillPoints || 0;
      let leveledUp = false;

      // Handle Level Up
      if (newXp >= newNextLevelXp) {
        newLevel += 1;
        newXp = newXp - newNextLevelXp;
        newNextLevelXp = Math.floor(newNextLevelXp * 1.5);
        newSkillPoints += 1;
        leveledUp = true;
      }

      // Handle Attributes
      const newAttributes = { ...prev.attributes };
      if (quest.attribute && newAttributes[quest.attribute] !== undefined) {
        newAttributes[quest.attribute] += (quest.rewards.attributeXP || 1);
      }

      const updatedQuests = [...prev.availableQuests];
      updatedQuests[questIndex] = { ...quest, status: 'completed' };
      
      let newEvents = [];
      newEvents.push(
        buildJournalEvent(
          EVENT_TYPES.QUEST_COMPLETE, 
          quest.title, 
          isCritical ? 'Critical Success!' : 'Quest Completed',
          { xp: finalXp, gold: finalGold, attribute: quest.attribute, isCritical }
        )
      );
      
      // Unlock dependencies
      updatedQuests.forEach(q => {
        if (q.prerequisite === questId && q.status === 'locked') {
          q.status = 'available';
        }
      });

      // Boss Logic
      let updatedBosses = [...(prev.bosses || INITIAL_BOSSES)];
      let updatedBossHistory = [...(prev.bossHistory || [])];
      let bossDamageDealt = 0;
      let bossDefeated = null;
      let itemDrop = null;
      let updatedInventory = { ...prev.inventory };

      if (prev.activeBossId) {
        const bossIndex = updatedBosses.findIndex(b => b.id === prev.activeBossId);
        if (bossIndex !== -1 && updatedBosses[bossIndex].status === 'active') {
          const boss = updatedBosses[bossIndex];
          
          // Check if quest targets boss weaknesses
          if (boss.weaknesses.includes(quest.attribute)) {
            bossDamageDealt = calculateBossDamage(quest, boss, isCritical, newComboCount);
            
            const newHp = Math.max(0, boss.hp - bossDamageDealt);
            const newPhase = getBossPhase(newHp, boss.maxHp).num;
            
            updatedBosses[bossIndex] = {
              ...boss,
              hp: newHp,
              phase: newPhase
            };

            updatedBossHistory = [
              {
                id: Date.now().toString(),
                questTitle: quest.title,
                damage: bossDamageDealt,
                timestamp: new Date().toISOString()
              },
              ...updatedBossHistory
            ].slice(0, 20);

            if (newHp === 0) {
              updatedBosses[bossIndex].status = 'defeated';
              bossDefeated = boss;
              
              newEvents.push(
                buildJournalEvent(EVENT_TYPES.BOSS_DEFEAT, boss.name, 'Target Defeated', { reward: 'Massive XP & Gold' })
              );

              // Grant massive boss defeat reward
              newXp += 500;
              finalGold += 150;

              // Boss specific item drop logic
              if (boss.id === 'procrastination' && updatedInventory.items.length < updatedInventory.capacity) {
                // Ensure they don't already have it (isUnique check)
                if (!updatedInventory.items.some(i => i.itemId === 'procrastination-trophy')) {
                  itemDrop = getItemById('procrastination-trophy');
                  if (itemDrop) {
                    updatedInventory.items = [
                      ...updatedInventory.items,
                      { itemId: itemDrop.id, acquiredAt: new Date().toISOString(), equipped: false }
                    ];
                  }
                }
              }
              
              if (newXp >= newNextLevelXp) {
                newLevel += 1;
                newXp = newXp - newNextLevelXp;
                newNextLevelXp = Math.floor(newNextLevelXp * 1.5);
                newSkillPoints += 1;
                leveledUp = true;
              }

              // Try to unlock the next boss
              const nextLockedBossIndex = updatedBosses.findIndex(b => b.status === 'locked');
              if (nextLockedBossIndex !== -1) {
                updatedBosses[nextLockedBossIndex].status = 'available';
              }
            } else {
              newEvents.push(
                buildJournalEvent(EVENT_TYPES.BOSS_DAMAGE, boss.name, 'Target Damaged', { damage: bossDamageDealt, quest: quest.title })
              );
            }
          }
        }
      }

      if (leveledUp) {
        newEvents.push(
          buildJournalEvent(EVENT_TYPES.LEVEL_UP, `Level ${newLevel}`, 'Evolution Reached', { skillPoints: 1 })
        );
      }

      return {
        ...prev,
        player: {
          ...prev.player,
          level: newLevel,
          xp: newXp,
          nextLevelXp: newNextLevelXp,
          gold: prev.player.gold + finalGold,
          skillPoints: newSkillPoints,
        },
        attributes: newAttributes,
        dailyProgress: {
          ...prev.dailyProgress,
          completed: Math.min(prev.dailyProgress.completed + 1, prev.dailyProgress.total),
        },
        questsCompleted: (prev.questsCompleted || 0) + 1,
        availableQuests: updatedQuests,
        journal: {
          ...prev.journal,
          events: [...newEvents, ...prev.journal.events].slice(0, 500)
        },
        activeCombo: newComboId,
        comboCount: newComboCount,
        showLevelUp: leveledUp,
        bosses: updatedBosses,
        bossHistory: updatedBossHistory,
        inventory: updatedInventory,
        rewardPopup: {
          xp: finalXp,
          gold: finalGold,
          attribute: quest.attribute,
          isCritical,
          bossDamage: bossDamageDealt > 0 ? bossDamageDealt : undefined,
          bossDefeated: bossDefeated,
          itemDrop: itemDrop
        }
      };

      return processGameActionResult(newState);
    });
  };

  const failQuest = (questId) => {
    setGameState((prev) => {
      const questIndex = prev.availableQuests.findIndex(q => q.id === questId);
      if (questIndex === -1) return prev;
      
      const updatedQuests = [...prev.availableQuests];
      const quest = updatedQuests[questIndex];
      updatedQuests[questIndex] = { ...quest, status: 'failed' };
      
      const failEvent = buildJournalEvent(EVENT_TYPES.QUEST_FAIL, quest.title, 'Quest Failed', {});

      return {
        ...prev,
        activeCombo: null, // Break combo
        comboCount: 0,
        availableQuests: updatedQuests,
        journal: {
          ...prev.journal,
          events: [failEvent, ...prev.journal.events].slice(0, 500)
        }
      };
    });
  };

  const unlockSkill = (skill) => {
    setGameState((prev) => {
      if (prev.player.skillPoints < skill.cost) return prev;
      
      const newHistory = [
        {
          id: Date.now().toString(),
          skillName: skill.name,
          cost: skill.cost,
          timestamp: new Date().toISOString()
        },
        ...(prev.player.skillHistory || [])
      ].slice(0, 10);

      const unlockEvent = buildJournalEvent(EVENT_TYPES.SKILL_UNLOCK, skill.name, 'Skill Unlocked', { cost: skill.cost });

      return {
        ...prev,
        player: {
          ...prev.player,
          skillPoints: prev.player.skillPoints - skill.cost,
          unlockedSkills: [...(prev.player.unlockedSkills || []), skill.id],
          skillHistory: newHistory
        },
        journal: {
          ...prev.journal,
          events: [unlockEvent, ...prev.journal.events].slice(0, 500)
        }
      };
    });
  };

  const setActiveBoss = (bossId) => {
    setGameState((prev) => {
      const updatedBosses = prev.bosses.map(b => {
        if (b.id === bossId && b.status === 'available') return { ...b, status: 'active' };
        if (b.status === 'active') return { ...b, status: 'available' };
        return b;
      });
      return { ...prev, activeBossId: bossId, bosses: updatedBosses };
    });
  };

  const equipItem = (itemId) => {
    setGameState(prev => {
      const itemDef = getItemById(itemId);
      if (!itemDef) return prev;
      
      const { category } = itemDef;
      const currentEquippedId = prev.equipment[category];
      
      // Update inventory states
      let updatedItems = prev.inventory.items.map(i => {
        if (i.itemId === itemId) return { ...i, equipped: true };
        if (i.itemId === currentEquippedId) return { ...i, equipped: false };
        return i;
      });

      const equipEvent = buildJournalEvent(EVENT_TYPES.ITEM_EQUIP, itemDef.name, 'Item Equipped', { category, rarity: itemDef.rarity });

      return {
        ...prev,
        inventory: { ...prev.inventory, items: updatedItems },
        equipment: { ...prev.equipment, [category]: itemId },
        journal: {
          ...prev.journal,
          events: [equipEvent, ...prev.journal.events].slice(0, 500)
        }
      };
    });
  };

  const unequipItem = (slot) => {
    setGameState(prev => {
      const currentEquippedId = prev.equipment[slot];
      if (!currentEquippedId) return prev;

      let updatedItems = prev.inventory.items.map(i => {
        if (i.itemId === currentEquippedId) return { ...i, equipped: false };
        return i;
      });

      return {
        ...prev,
        inventory: { ...prev.inventory, items: updatedItems },
        equipment: { ...prev.equipment, [slot]: null }
      };
    });
  };

  const purchaseItem = (itemId) => {
    let success = false;
    setGameState(prev => {
      const validation = validatePurchase(itemId, prev.player.gold, prev.inventory);
      if (!validation.valid) return prev;

      success = true;
      const itemDef = validation.item;

      const purchaseEvent = buildJournalEvent(EVENT_TYPES.ITEM_PURCHASE, itemDef.name, 'Item Purchased', { price: itemDef.price, rarity: itemDef.rarity });

      let newState = {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - itemDef.price
        },
        itemsPurchased: (prev.itemsPurchased || 0) + 1,
        inventory: {
          ...prev.inventory,
          items: [
            { itemId: itemDef.id, acquiredAt: new Date().toISOString(), equipped: false },
            ...prev.inventory.items
          ]
        },
        journal: {
          ...prev.journal,
          events: [purchaseEvent, ...prev.journal.events].slice(0, 500)
        },
        rewardPopup: {
          itemDrop: itemDef // Reusing the popup to show acquisition
        }
      };

      return processGameActionResult(newState);
    });
    return success;
  };

  const setRewardPreference = (pref) => {
    setGameState(prev => ({
      ...prev,
      rewardPreferences: { primary: pref }
    }));
  };

  const clearAchievementNotification = () => {
    setGameState(prev => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        notifications: prev.achievements.notifications.slice(1) // remove first
      }
    }));
  };
  const closeLevelUp = () => setGameState(prev => ({ ...prev, showLevelUp: false }));
  const closeRewardPopup = () => setGameState(prev => ({ ...prev, rewardPopup: null }));

  return (
    <GameContext.Provider value={{ 
      gameState, 
      startQuest, 
      completeQuest, 
      failQuest,
      unlockSkill,
      setActiveBoss,
      equipItem,
      unequipItem,
      purchaseItem,
      setRewardPreference,
      closeLevelUp, 
      closeRewardPopup,
      clearAchievementNotification
    }}>
      {children}
      <AchievementToast />
    </GameContext.Provider>
  );
};
