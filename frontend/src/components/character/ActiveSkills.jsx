import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { SKILL_TREES } from '../../data/skills';

export const ActiveSkills = () => {
  const { gameState } = useGame();
  const navigate = useNavigate();
  
  const unlockedIds = gameState.player.unlockedSkills || [];
  
  // Find skill details from SKILL_TREES
  const unlockedSkills = unlockedIds.map(id => {
    for (const attr in SKILL_TREES) {
      const skill = SKILL_TREES[attr].find(s => s.id === id);
      if (skill) return skill;
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h4 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">account_tree</span> Active Skills
        </h4>
        <button 
          onClick={() => navigate('/skill-tree')}
          className="font-label-rpg-sm text-label-rpg-sm text-secondary uppercase hover:text-primary transition-colors flex items-center gap-1"
        >
          Develop <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {unlockedSkills.length === 0 ? (
        <p className="font-body-sm text-body-sm text-text-muted italic">No skills unlocked yet. Earn Skill Points by leveling up.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {unlockedSkills.slice(0, 4).map(skill => (
            <li key={skill.id} className="flex items-center gap-2 font-label-rpg-sm text-label-rpg-sm text-text-primary">
              <span className="material-symbols-outlined text-primary text-[14px]">diamond</span>
              {skill.name}
            </li>
          ))}
          {unlockedSkills.length > 4 && (
            <li className="font-label-rpg-sm text-label-rpg-sm text-text-muted italic mt-1">
              + {unlockedSkills.length - 4} more active skills
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
