import React from 'react';
import { useGame } from '../../context/GameContext';

export const PersonalRecords = () => {
  const { gameState } = useGame();
  const { records } = gameState.player;
  
  if (!records) return null;

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-md">
      <h4 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">emoji_events</span> Personal Records
      </h4>
      
      <div className="grid grid-cols-2 gap-space-sm">
        <div className="bg-surface-deck rounded-lg p-space-sm border border-surface-overlay flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Longest Streak</span>
          <span className="font-stat-display-sm text-stat-display-sm text-primary">{records.longestStreak} days</span>
        </div>
        
        <div className="bg-surface-deck rounded-lg p-space-sm border border-surface-overlay flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Best Daily XP</span>
          <span className="font-stat-display-sm text-stat-display-sm text-secondary">{records.bestDailyXP} XP</span>
        </div>
        
        <div className="bg-surface-deck rounded-lg p-space-sm border border-surface-overlay flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Hardest Quest</span>
          <span className="font-stat-display-sm text-stat-display-sm text-hazard-crimson">{records.hardestQuest}</span>
        </div>
        
        <div className="bg-surface-deck rounded-lg p-space-sm border border-surface-overlay flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Top Attribute</span>
          <span className="font-stat-display-sm text-stat-display-sm text-vitality-emerald">{records.highestAttribute}</span>
        </div>
      </div>
    </div>
  );
};
