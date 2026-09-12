import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { calculateBossDamage } from '../../services/bossService';

export const BossDamageQuests = ({ boss, recommendedQuests }) => {
  const { startQuest } = useGame();
  const navigate = useNavigate();

  if (recommendedQuests.length === 0) {
    return (
      <div className="bg-surface-card rounded-xl p-space-lg border border-border-subtle text-center flex flex-col items-center gap-space-sm">
        <span className="material-symbols-outlined text-[48px] text-text-muted">assignment_late</span>
        <h3 className="font-headline-md text-text-primary uppercase">No Actionable Intel</h3>
        <p className="font-body-sm text-text-secondary">You currently have no available quests that target this boss's weaknesses.</p>
        <button 
          onClick={() => navigate('/quests')}
          className="mt-2 px-4 py-2 bg-surface-deck border border-border-subtle rounded hover:bg-surface-overlay transition-colors font-label-rpg uppercase text-primary"
        >
          View Quest Board
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-space-md">
      <h3 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">swords</span> Attack Vectors
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
        {recommendedQuests.map(quest => {
          // Calculate potential base damage without criticals/combos for preview
          const potentialDamage = calculateBossDamage(quest, boss, false, 0);

          return (
            <div key={quest.id} className="bg-surface-card rounded-xl p-space-md border border-hazard-crimson/20 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline-sm text-text-primary">{quest.title}</h4>
                  <div className="px-2 py-0.5 bg-hazard-crimson/10 border border-hazard-crimson/30 rounded text-hazard-crimson font-label-rpg-sm uppercase whitespace-nowrap">
                    +{potentialDamage} DMG
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="font-label-rpg-sm text-text-muted uppercase">{quest.difficulty}</span>
                  <span className="text-text-muted">•</span>
                  <span className="font-label-rpg-sm text-primary uppercase">{quest.attribute}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border-subtle">
                <button 
                  onClick={() => {
                    startQuest(quest.id);
                    navigate('/quests');
                  }}
                  className="flex-1 py-2 bg-hazard-crimson/10 hover:bg-hazard-crimson hover:text-white text-hazard-crimson border border-hazard-crimson/30 rounded font-label-rpg uppercase transition-all"
                >
                  Begin Assault
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
