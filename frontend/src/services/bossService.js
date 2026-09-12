export const calculateBossDamage = (quest, boss, isCritical, comboCount) => {
  // Base damage scales with quest difficulty/energy
  let baseDamage = 5;
  if (quest.difficulty === 'moderate') baseDamage = 8;
  if (quest.difficulty === 'challenging') baseDamage = 12;
  if (quest.difficulty === 'hard') baseDamage = 18;
  if (quest.difficulty === 'epic') baseDamage = 25;

  let weaknessBonus = 0;
  if (boss.weaknesses.includes(quest.attribute)) {
    weaknessBonus = Math.max(2, Math.floor(baseDamage * 0.4)); // 40% bonus if weakness hit
  }

  let totalDamage = baseDamage + weaknessBonus;

  if (isCritical) {
    // Critical replaces normal flow with a massive flat jump
    return Math.floor(totalDamage * 2.5);
  }

  if (comboCount > 0) {
    const comboBonus = 1.0 + (comboCount * 0.1); // +10% per combo step
    totalDamage = Math.floor(totalDamage * comboBonus);
  }

  return totalDamage;
};

export const getBossPhase = (hp, maxHp) => {
  const percentage = (hp / maxHp) * 100;
  
  if (percentage <= 33) return { num: 3, title: "FINAL STAND" };
  if (percentage <= 66) return { num: 2, title: "ESCALATION" };
  return { num: 1, title: "RESISTANCE" };
};

export const getRecommendedBossQuests = (boss, quests) => {
  if (!boss || !quests) return [];
  
  // Filter active/available quests that target the boss's weaknesses
  return quests
    .filter(q => (q.status === 'available' || q.status === 'active') && boss.weaknesses.includes(q.attribute))
    .sort((a, b) => b.energyCost - a.energyCost); // Sort by highest impact
};
