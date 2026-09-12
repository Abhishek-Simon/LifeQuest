import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { ACHIEVEMENTS } from '../../data/achievements';
import { getAchievementProgress } from '../../services/achievementService';

export const AchievementPreview = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();

  const achievementsWithProgress = ACHIEVEMENTS.map(ach => ({
    ...ach,
    progress: getAchievementProgress(gameState, ach)
  }));

  const unlockedCount = gameState.achievements.unlocked.length;
  const rareCount = achievementsWithProgress.filter(a => 
    (a.rarity === 'rare' || a.rarity === 'epic' || a.rarity === 'legendary') && 
    a.progress.highestUnlockedLevel > 0
  ).length;

  const latestUnlocked = achievementsWithProgress
    .filter(a => a.progress.highestUnlockedLevel > 0)
    .sort((a, b) => b.progress.highestUnlockedLevel - a.progress.highestUnlockedLevel)[0];

  return (
    <div className="bg-surface-card rounded-2xl border border-border-subtle p-space-lg flex flex-col">
      <div className="flex justify-between items-center mb-space-lg">
        <h3 className="font-headline-md text-text-primary uppercase flex items-center gap-2">
          <span className="material-symbols-outlined text-[#FFD700]">military_tech</span>
          Achievements
        </h3>
        <button onClick={() => navigate('/achievements')} className="font-label-rpg text-primary hover:text-primary-fixed uppercase tracking-widest text-xs flex items-center gap-1">
          View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      <div className="flex gap-space-md mb-space-lg">
        <div className="flex-1 bg-surface-deck border border-border-subtle rounded-lg p-space-sm flex flex-col items-center">
          <span className="font-label-rpg-sm text-text-muted uppercase mb-1">Unlocked</span>
          <span className="font-stat-display-sm text-[#FFD700]">{unlockedCount}</span>
        </div>
        <div className="flex-1 bg-surface-deck border border-border-subtle rounded-lg p-space-sm flex flex-col items-center">
          <span className="font-label-rpg-sm text-text-muted uppercase mb-1">Rare</span>
          <span className="font-stat-display-sm text-primary">{rareCount}</span>
        </div>
      </div>

      {latestUnlocked ? (
        <div className="bg-surface-deck rounded border border-border-subtle p-space-md flex items-center gap-space-md">
          <div className="w-10 h-10 shrink-0 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px] text-[#FFD700]">emoji_events</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-rpg-sm text-text-muted uppercase">Latest</span>
            <span className="font-headline-sm text-text-primary uppercase truncate max-w-[150px]">{latestUnlocked.title}</span>
          </div>
        </div>
      ) : (
        <div className="bg-surface-deck rounded border border-border-subtle p-space-md flex items-center justify-center text-center">
          <span className="font-label-rpg-sm text-text-muted uppercase">No Milestones Yet</span>
        </div>
      )}
    </div>
  );
};
