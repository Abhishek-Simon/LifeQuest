export const getSkillState = (skill, gameState, attributeKey) => {
  const { player, attributes } = gameState;
  const isUnlocked = player.unlockedSkills && player.unlockedSkills.includes(skill.id);
  
  if (isUnlocked) return 'unlocked';

  const attrLevel = attributes[attributeKey] || 0;
  
  // Check prerequisites
  const hasPrereqs = skill.prerequisites.length === 0 || skill.prerequisites.every(reqId => 
    player.unlockedSkills && player.unlockedSkills.includes(reqId)
  );
  
  if (hasPrereqs && player.level >= skill.reqLevel && attrLevel >= skill.reqAttributeLevel) {
    return 'available';
  }

  return 'locked';
};

export const getSkillUnlockError = (skill, gameState, attributeKey) => {
  const { player, attributes } = gameState;
  const attrLevel = attributes[attributeKey] || 0;

  if (player.skillPoints < skill.cost) {
    return `Requires ${skill.cost} Skill Point${skill.cost > 1 ? 's' : ''}.`;
  }

  if (player.level < skill.reqLevel) {
    return `Requires Player Level ${skill.reqLevel}.`;
  }

  if (attrLevel < skill.reqAttributeLevel) {
    return `Requires ${attributeKey.charAt(0).toUpperCase() + attributeKey.slice(1)} ${skill.reqAttributeLevel}. (Current: ${attrLevel})`;
  }

  const hasPrereqs = skill.prerequisites.length === 0 || skill.prerequisites.every(reqId => 
    player.unlockedSkills && player.unlockedSkills.includes(reqId)
  );

  if (!hasPrereqs) {
    return `Requires completion of previous nodes in the branch.`;
  }

  return null;
};
