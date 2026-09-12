import { apiClient as client } from './client';

export const characterService = {
  getCharacter: async () => {
    try {
      const response = await client.get('/character');
      return {
        ...response,
        avatar: response.avatar || response.avatarUrl || response.avatar_url
      };
    } catch (err) {
      if (err.status === 404 || err.status === 0) {
        // Fallback to mock state if backend endpoint is unavailable
        const userId = localStorage.getItem('lq_current_user_id') || 'default';
        const local = localStorage.getItem(`lq_character_${userId}`);
        if (!local) throw new Error("Character not found in mock state");
        const parsed = JSON.parse(local);
        return {
          ...parsed,
          avatar: parsed.avatar || parsed.avatarUrl || parsed.avatar_url
        };
      }
      throw err;
    }
  },

  // The following mock methods are retained as they are part of the scope not yet implemented in backend
  // We will migrate these once those features are added.
  getAttributes: async () => {
    const c = await characterService.getCharacter();
    return [
      { id: "intellect", name: "Intellect", value: c.intellect, max: 100, color: "text-primary", bg: "bg-primary" },
      { id: "discipline", name: "Discipline", value: c.discipline, max: 100, color: "text-secondary", bg: "bg-secondary" },
      { id: "wisdom", name: "Wisdom", value: c.wisdom, max: 100, color: "text-tertiary", bg: "bg-tertiary" },
      { id: "endurance", name: "Endurance", value: c.endurance, max: 100, color: "text-cyan-400", bg: "bg-cyan-400" },
      { id: "strength", name: "Strength", value: c.strength, max: 100, color: "text-hazard-crimson", bg: "bg-hazard-crimson" },
      { id: "creativity", name: "Creativity", value: c.creativity, max: 100, color: "text-purple-400", bg: "bg-purple-400" }
    ];
  },

  getPlaystyle: async () => {
    // Mock playstyle for now
    return {
      name: "Scholar",
      description: "Your recent activity suggests a strong focus on learning, problem solving, and intellect accumulation.",
      traits: ["Analytical", "Strategic", "Patient"]
    };
  },

  getLifeBalance: async () => {
    // Mock balance
    return {
      score: 84,
      status: "Balanced",
      radarData: {
        intellect: 80,
        discipline: 75,
        wisdom: 60,
        endurance: 50,
        strength: 45,
        creativity: 40
      }
    };
  },

  getProgression: async () => {
    // Mock progression
    return [
      { id: 1, type: "attribute", message: "+4 Intellect", date: "Today" },
      { id: 2, type: "attribute", message: "+2 Discipline", date: "Yesterday" },
      { id: 3, type: "level", message: "Level Up to 14", date: "3 days ago" },
      { id: 4, type: "streak", message: "Quest streak increased to 15", date: "3 days ago" }
    ];
  }
};
