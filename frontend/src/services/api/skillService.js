import { SKILL_TREES } from '../../data/skills';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated user state for determining unlocks without GameContext
const mockUserState = {
  level: 14,
  skillPoints: 2,
  attributes: {
    intellect: 32,
    discipline: 29,
    wisdom: 24,
    endurance: 21,
    strength: 18,
    creativity: 16
  },
  unlockedSkills: ['int-1', 'int-2', 'str-1', 'dis-1'] // Node IDs
};

export const skillService = {
  getSkillTree: async (branch) => {
    await delay(500); // simulate network latency
    const branchSkills = SKILL_TREES[branch] || [];
    
    // Process skills to attach 'status' (locked, available, unlocked, mastered)
    // and progression data so UI doesn't have to calculate it.
    const processedSkills = branchSkills.map(skill => {
      let status = 'locked';
      
      const isUnlocked = mockUserState.unlockedSkills.includes(skill.id);
      if (isUnlocked) {
        status = 'unlocked';
        // Simulating mastered if it's an early skill just for visual variety
        if (skill.id === 'int-1' || skill.id === 'str-1') {
          status = 'mastered'; 
        }
      } else {
        // Check if available
        const hasReqLevel = mockUserState.level >= skill.reqLevel;
        const hasReqAttr = (mockUserState.attributes[branch] || 0) >= skill.reqAttributeLevel;
        const hasPrereqs = skill.prerequisites.length === 0 || 
                           skill.prerequisites.every(prereq => mockUserState.unlockedSkills.includes(prereq));
        
        if (hasReqLevel && hasReqAttr && hasPrereqs) {
          status = 'available';
        }
      }

      // Progress mock based on status
      let progress = 0;
      if (status === 'unlocked') progress = 50;
      if (status === 'mastered') progress = 100;

      return {
        ...skill,
        status,
        progress,
        requiredXP: skill.cost * 1000 // Just a mock representation of requiredXP mentioned in prompt
      };
    });

    return {
      branch,
      totalSkills: branchSkills.length,
      unlockedCount: processedSkills.filter(s => s.status === 'unlocked' || s.status === 'mastered').length,
      skills: processedSkills,
      userSP: mockUserState.skillPoints
    };
  }
};
