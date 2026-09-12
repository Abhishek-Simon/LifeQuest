import { apiClient as client } from './client';

const MOCK_DELAY = 600; // ms

export const onboardingService = {
  getState: async () => {
    try {
      const response = await client.get('/onboarding');
      return response;
    } catch (err) {
      if (err.status === 404 || err.status === 0) {
        const userId = localStorage.getItem('lq_current_user_id') || 'default';
        const local = localStorage.getItem(`lq_onboarding_state_${userId}`);
        return local ? JSON.parse(local) : {};
      }
      throw err;
    }
  },

  updateState: async (updates) => {
    try {
      const response = await client.patch('/onboarding', updates);
      return response;
    } catch (err) {
      if (err.status === 404 || err.status === 0) {
        const userId = localStorage.getItem('lq_current_user_id') || 'default';
        const local = localStorage.getItem(`lq_onboarding_state_${userId}`) || '{}';
        const state = { ...JSON.parse(local), ...updates };
        localStorage.setItem(`lq_onboarding_state_${userId}`, JSON.stringify(state));
        return state;
      }
      throw err;
    }
  },

  completeOnboarding: async () => {
    try {
      const response = await client.post('/onboarding/complete');
      return response;
    } catch (err) {
      if (err.status === 404 || err.status === 0) {
        await new Promise(r => setTimeout(r, MOCK_DELAY));
        const userId = localStorage.getItem('lq_current_user_id') || 'default';
        const local = localStorage.getItem(`lq_onboarding_state_${userId}`) || '{}';
        const state = JSON.parse(local);
        
        if (state.is_complete) {
          const error = new Error("Onboarding already completed");
          error.response = { status: 400, data: { detail: "Onboarding already completed" } };
          throw error;
        }

        state.is_complete = true;
        localStorage.setItem(`lq_onboarding_state_${userId}`, JSON.stringify(state));
        
        const stats = { strength: 10, intellect: 10, endurance: 10, wisdom: 10, creativity: 10, discipline: 10 };
        if (state.selected_attributes) {
            for (const [key, val] of Object.entries(state.selected_attributes)) {
                stats[key] = val;
            }
        }
        
        const character = {
          name: state.character_name || "Adventurer",
          level: 1,
          title: "LVL 1 Novice",
          specialization: "Adventurer",
          archetype: "Generalist Protocol",
          adventure_path: state.adventure_path || "Unknown Quest",
          playstyle: state.playstyle || "",
          strength: stats.strength,
          intellect: stats.intellect,
          endurance: stats.endurance,
          wisdom: stats.wisdom,
          creativity: stats.creativity,
          discipline: stats.discipline,
          avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXJInTLSuZMWrDJkU8lYaAdeuj_PLWlAqg0gGN-0xzzCPxxeIILvjVKUC_OnQ8guwfGD4A1dOh7Y4ZQjrtIZWNIVJgiLhXHip14a_ELgs1zalY-VkVlrI9iXXrAr3uruCaUYtmbBNjhbtRY_f7ageT7Drj7XK9ia-6OwlX3uiyE-xsqqWnMeJMeknYT7ghZGoEoiFeB_O5cna6sSNzmGWnpzVXmO7aNIve01aWQ7XJHkuHCLkgHodD7A"
        };
        localStorage.setItem(`lq_character_${userId}`, JSON.stringify(character));
        
        return { message: "Onboarding completed successfully" };
      }
      throw err;
    }
  }
};
