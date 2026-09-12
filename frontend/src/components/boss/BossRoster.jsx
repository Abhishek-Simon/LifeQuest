import React from 'react';
import { useGame } from '../../context/GameContext';

export const BossRoster = () => {
  const { gameState, setActiveBoss } = useGame();
  const { bosses, activeBossId } = gameState;

  return (
    <div className="flex flex-col gap-space-md mt-space-xl pt-space-xl border-t border-border-subtle">
      <h3 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">view_list</span> Target Roster
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm">
        {bosses.map(boss => {
          const isActive = boss.id === activeBossId;
          const isDefeated = boss.status === 'defeated';
          const isLocked = boss.status === 'locked';
          const isAvailable = boss.status === 'available';

          let statusColor = "text-text-muted";
          let icon = "lock";
          let border = "border-border-subtle";
          let bg = "bg-surface-deck";
          
          if (isActive) {
            statusColor = "text-hazard-crimson";
            icon = "my_location";
            border = "border-hazard-crimson";
            bg = "bg-hazard-crimson/10";
          } else if (isDefeated) {
            statusColor = "text-vitality-emerald";
            icon = "check_circle";
            bg = "bg-surface-card";
          } else if (isAvailable) {
            statusColor = "text-secondary";
            icon = "radio_button_unchecked";
            border = "border-surface-overlay hover:border-secondary cursor-pointer";
            bg = "bg-surface-card";
          }

          return (
            <div 
              key={boss.id} 
              onClick={() => {
                if (isAvailable && !isActive) setActiveBoss(boss.id);
              }}
              className={`p-space-sm rounded-lg border transition-colors flex items-center gap-space-sm ${border} ${bg}`}
            >
              <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${statusColor} bg-surface-base border border-border-subtle`}>
                <span className="material-symbols-outlined">{icon}</span>
              </div>
              
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-label-rpg text-label-rpg uppercase text-text-primary truncate">{boss.name}</span>
                <span className={`font-label-rpg-sm text-label-rpg-sm uppercase truncate ${statusColor}`}>
                  {isActive ? 'Active Target' : isDefeated ? 'Defeated' : isLocked ? 'Locked' : 'Available'}
                </span>
              </div>
              
              {isLocked && (
                <div className="text-text-muted" title={boss.unlockCondition}>
                  <span className="material-symbols-outlined text-[18px]">info</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
