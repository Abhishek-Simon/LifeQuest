export const SKILL_TREES = {
  strength: [
    { id: 'str-1', name: 'Physical Foundation', desc: 'Establish the core strength needed for all physical endeavors.', cost: 1, reqLevel: 10, reqAttributeLevel: 10, prerequisites: [], bonus: 'Base lifting volume increased 5%.' },
    { id: 'str-2', name: 'Power Routine', desc: 'Optimize your heavy lifting structure for maximum output.', cost: 1, reqLevel: 15, reqAttributeLevel: 15, prerequisites: ['str-1'], bonus: 'Strength quests grant +10% XP.' },
    { id: 'str-3', name: 'Resilient Body', desc: 'Develop extreme physical toughness and joint health.', cost: 2, reqLevel: 25, reqAttributeLevel: 25, prerequisites: ['str-2'], bonus: 'Energy cost of physical quests reduced by 10%.' },
    { id: 'str-4', name: 'Iron Will', desc: 'Mastery over the physical vessel.', cost: 3, reqLevel: 40, reqAttributeLevel: 40, prerequisites: ['str-3'], bonus: 'Critical success chance on physical quests +5%.' }
  ],
  intellect: [
    { id: 'int-1', name: 'Focused Mind', desc: 'The ability to concentrate deeply for extended periods.', cost: 1, reqLevel: 10, reqAttributeLevel: 10, prerequisites: [], bonus: 'Learning quests grant +10% XP.' },
    { id: 'int-2', name: 'Deep Work', desc: 'Complete focused work without distraction.', cost: 1, reqLevel: 15, reqAttributeLevel: 15, prerequisites: ['int-1'], bonus: '+5% XP from Intellect quests.' },
    { id: 'int-3', name: 'Rapid Learning', desc: 'Accelerated neural pathways for acquiring new skills.', cost: 2, reqLevel: 25, reqAttributeLevel: 25, prerequisites: ['int-2'], bonus: 'Intellect attribute scales 5% faster.' },
    { id: 'int-4', name: 'Strategic Thinking', desc: 'Mastery of long-term planning and problem-solving.', cost: 3, reqLevel: 40, reqAttributeLevel: 40, prerequisites: ['int-3'], bonus: 'Improved recommendation quality.' }
  ],
  endurance: [
    { id: 'end-1', name: 'Stamina Core', desc: 'Build the aerobic base required for long efforts.', cost: 1, reqLevel: 10, reqAttributeLevel: 10, prerequisites: [], bonus: 'Max Energy increased by 10.' },
    { id: 'end-2', name: 'Recovery Discipline', desc: 'Optimize rest to bounce back faster.', cost: 1, reqLevel: 15, reqAttributeLevel: 15, prerequisites: ['end-1'], bonus: '-10% Energy cost for recovery quests.' },
    { id: 'end-3', name: 'Long Haul', desc: 'Sustain output over grueling multi-hour tasks.', cost: 2, reqLevel: 25, reqAttributeLevel: 25, prerequisites: ['end-2'], bonus: 'Combo multiplier decays slower.' },
    { id: 'end-4', name: 'Relentless', desc: 'Never stop. Never tire.', cost: 3, reqLevel: 40, reqAttributeLevel: 40, prerequisites: ['end-3'], bonus: '10% chance to refund energy on quest complete.' }
  ],
  wisdom: [
    { id: 'wis-1', name: 'Reflection', desc: 'Take time to analyze past actions and learn.', cost: 1, reqLevel: 10, reqAttributeLevel: 10, prerequisites: [], bonus: 'Daily reflection grants a small XP boost.' },
    { id: 'wis-2', name: 'Pattern Recognition', desc: 'Identify underlying systems and habits in your life.', cost: 1, reqLevel: 15, reqAttributeLevel: 15, prerequisites: ['wis-1'], bonus: 'Discover hidden combo chains easier.' },
    { id: 'wis-3', name: 'Better Decisions', desc: 'Reduce impulsive actions and align with your path.', cost: 2, reqLevel: 25, reqAttributeLevel: 25, prerequisites: ['wis-2'], bonus: 'Rerolls regenerate 20% faster.' },
    { id: 'wis-4', name: 'Clear Judgment', desc: 'Perfect clarity in all situations.', cost: 3, reqLevel: 40, reqAttributeLevel: 40, prerequisites: ['wis-3'], bonus: 'Life Balance Score permanently boosted by 5.' }
  ],
  creativity: [
    { id: 'cre-1', name: 'Idea Forge', desc: 'A mind open to new possibilities.', cost: 1, reqLevel: 10, reqAttributeLevel: 10, prerequisites: [], bonus: 'Creative quests cost 5 less Energy.' },
    { id: 'cre-2', name: 'Creative Momentum', desc: 'Chain together ideas rapidly once started.', cost: 1, reqLevel: 15, reqAttributeLevel: 15, prerequisites: ['cre-1'], bonus: 'Combo multiplier for Creativity quests increased.' },
    { id: 'cre-3', name: 'Lateral Thinking', desc: 'Solve problems using unconventional approaches.', cost: 2, reqLevel: 25, reqAttributeLevel: 25, prerequisites: ['cre-2'], bonus: 'Can sometimes bypass quest prerequisites.' },
    { id: 'cre-4', name: 'Original Mind', desc: 'True mastery of artistic output.', cost: 3, reqLevel: 40, reqAttributeLevel: 40, prerequisites: ['cre-3'], bonus: 'Massive boost to gold rewards on creative tasks.' }
  ],
  discipline: [
    { id: 'dis-1', name: 'Consistency', desc: 'Show up, regardless of how you feel.', cost: 1, reqLevel: 10, reqAttributeLevel: 10, prerequisites: [], bonus: 'Base XP increased by 2% globally.' },
    { id: 'dis-2', name: 'Iron Routine', desc: 'Maintain consistency across daily quests.', cost: 1, reqLevel: 15, reqAttributeLevel: 15, prerequisites: ['dis-1'], bonus: '+1 streak protection.' },
    { id: 'dis-3', name: 'Momentum', desc: 'Use previous successes to fuel the next action.', cost: 2, reqLevel: 25, reqAttributeLevel: 25, prerequisites: ['dis-2'], bonus: 'Combo chains grant 5% more XP.' },
    { id: 'dis-4', name: 'Unbreakable Focus', desc: 'Nothing can break your routine.', cost: 3, reqLevel: 40, reqAttributeLevel: 40, prerequisites: ['dis-3'], bonus: 'Failed quests do not immediately break your streak.' }
  ]
};
