import { apiClient as client } from './client';
import { MOCK_QUESTS } from '../../data/mockQuests';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const MOCK_DELAY = 400; // ms

// Helper to manage mock quests in local storage so they are persistent across refreshes
const getLocalQuests = () => {
  const local = localStorage.getItem('lq_quests_mock');
  if (local) return JSON.parse(local);
  localStorage.setItem('lq_quests_mock', JSON.stringify(MOCK_QUESTS));
  return MOCK_QUESTS;
};
const setLocalQuests = (quests) => {
  localStorage.setItem('lq_quests_mock', JSON.stringify(quests));
};

const mapQuest = (q) => {
  if (q.rewards && !q.xp_reward_preview) {
     return q;
  }
  return {
    ...q,
    duration: q.estimated_minutes || q.duration || 0,
    rewards: {
      xp: q.xp_reward_preview,
      gold: q.gold_reward_preview,
      attributeXP: 1
    }
  };
};

export const questService = {
  getQuests: async (filters = {}) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, MOCK_DELAY));
      let quests = getLocalQuests();
      
      if (filters.status && filters.status !== 'All') {
        quests = quests.filter(q => q.status === filters.status.toLowerCase());
      }
      if (filters.category && filters.category !== 'All') {
        quests = quests.filter(q => q.category === filters.category);
      }
      
      return quests;
    }

    // Real API mode
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'All') params.append('status', filters.status.toLowerCase());
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    
    const response = await client.get(`/quests?${params.toString()}`);
    return response.map(mapQuest);
  },

  getRecommendedQuest: async () => {
    if (USE_MOCK) {
      const quests = getLocalQuests();
      const available = quests.filter(q => q.status === 'available' || q.status === 'active');
      if (available.length === 0) return null;
      
      const recommended = available.sort((a, b) => b.rewards.xp - a.rewards.xp)[0];
      return {
        quest: recommended,
        reason: `${recommended.title} strengthens an area you have not trained today and aligns with your long-term progression.`
      };
    }

    // Real API mode
    const response = await client.get('/quests');
    const available = response.filter(q => q.status === 'available' || q.status === 'active');
    if (available.length === 0) return null;
    
    const recommended = available.sort((a, b) => b.xp_reward_preview - a.xp_reward_preview)[0];
    return {
      quest: mapQuest(recommended),
      reason: `${recommended.title} strengthens an area you have not trained today and aligns with your long-term progression.`
    };
  },

  getQuestById: async (id) => {
    if (USE_MOCK) {
      const quests = getLocalQuests();
      const quest = quests.find(q => q.id === id);
      if (!quest) throw new Error("Quest not found");
      return quest;
    }

    // Real API mode
    const response = await client.get(`/quests/${id}`);
    return mapQuest(response);
  },

  createQuest: async (questData) => {
    if (USE_MOCK) {
      const quests = getLocalQuests();
      const newQuest = {
         id: `q_${Date.now()}`,
         status: 'available',
         ...questData,
         rewards: {
           xp: Math.floor(Math.random() * 100) + 50,
           gold: Math.floor(Math.random() * 20) + 10,
           attributeXP: 5
         }
      };
      quests.push(newQuest);
      setLocalQuests(quests);
      return newQuest;
    }

    // Real API mode
    const response = await client.post('/quests', questData);
    return mapQuest(response);
  },

  updateQuest: async (id, questData) => {
    if (USE_MOCK) {
      const quests = getLocalQuests();
      const index = quests.findIndex(q => q.id === id);
      if (index === -1) throw new Error("Quest not found");
      quests[index] = { ...quests[index], ...questData };
      setLocalQuests(quests);
      return quests[index];
    }

    // Real API mode
    const response = await client.patch(`/quests/${id}`, questData);
    return mapQuest(response);
  },

  deleteQuest: async (id) => {
    if (USE_MOCK) {
      let quests = getLocalQuests();
      quests = quests.filter(q => q.id !== id);
      setLocalQuests(quests);
      return true;
    }

    // Real API mode
    await client.delete(`/quests/${id}`);
    return true;
  },

  startQuest: async (id) => {
    if (USE_MOCK) {
      const quests = getLocalQuests();
      const index = quests.findIndex(q => q.id === id);
      if (index === -1) throw new Error("Quest not found");
      quests[index].status = 'active';
      setLocalQuests(quests);
      return { success: true, status: 'active', quest: quests[index] };
    }

    // Real API mode
    const response = await client.patch(`/quests/${id}`, { status: 'active' });
    return { success: true, status: 'active', quest: mapQuest(response) };
  },

  completeQuest: async (id) => {
    if (USE_MOCK) {
      const quests = getLocalQuests();
      const index = quests.findIndex(q => q.id === id);
      if (index === -1) throw new Error("Quest not found");
      quests[index].status = 'completed';
      setLocalQuests(quests);
      const quest = quests[index];
      return {
        success: true,
        status: 'completed',
        rewards: {
          xp: quest.rewards.xp,
          gold: quest.rewards.gold,
          attribute: quest.attribute,
          attributeXP: quest.rewards.attributeXP,
          isCritical: false,
          levelUp: false
        }
      };
    }

    // Real API mode
    const response = await client.patch(`/quests/${id}`, { status: 'completed' });
    const quest = response;
    return {
      success: true,
      status: 'completed',
      rewards: {
        xp: quest.xp_reward_preview,
        gold: quest.gold_reward_preview,
        attribute: quest.attribute,
        attributeXP: 1,
        isCritical: false,
        levelUp: false
      }
    };
  }
};
