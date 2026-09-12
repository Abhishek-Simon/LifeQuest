import React from 'react';
import { useGame } from '../../context/GameContext';

export const BossHistory = () => {
  const { gameState } = useGame();
  const { bossHistory } = gameState;

  return (
    <div className="flex flex-col gap-space-md">
      <h3 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">history</span> Attack History
      </h3>
      
      {bossHistory && bossHistory.length > 0 ? (
        <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md">
          <div className="flex flex-col gap-space-sm relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-border-subtle">
            {bossHistory.slice(0, 5).map((event, index) => {
              const date = new Date(event.timestamp);
              const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={event.id || index} className="relative flex items-center group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-hazard-crimson bg-surface-card text-hazard-crimson shrink-0 shadow-[0_0_8px_rgba(255,82,82,0.3)] z-10">
                    <div className="w-2 h-2 bg-hazard-crimson rounded-full"></div>
                  </div>
                  <div className="ml-4 flex-1 bg-surface-deck p-space-sm rounded-lg border border-surface-overlay flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted">{timeString}</span>
                      <span className="font-body-sm text-body-sm text-text-primary">{event.questTitle}</span>
                    </div>
                    <span className="font-label-rpg text-label-rpg text-hazard-crimson">
                      -{event.damage} HP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle text-center">
          <p className="font-body-sm text-text-muted italic">No recent attacks recorded. Start a relevant quest to damage the boss.</p>
        </div>
      )}
    </div>
  );
};
