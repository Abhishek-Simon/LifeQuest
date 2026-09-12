import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';

export const ActiveBossPreview = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { bosses, activeBossId } = gameState;
  
  const activeBoss = bosses?.find(b => b.id === activeBossId);

  if (!activeBoss || activeBoss.status !== 'active') return null;

  return (
    <div className="bg-hazard-crimson/5 rounded-xl p-space-md border border-hazard-crimson/20 shadow-md flex flex-col gap-space-sm relative overflow-hidden">
      {/* Decorative background slash */}
      <div className="absolute top-0 right-0 w-32 h-full bg-[linear-gradient(45deg,transparent_40%,rgba(255,82,82,0.1)_50%,transparent_60%)] pointer-events-none -translate-y-4 translate-x-8"></div>
      
      <div className="flex items-center justify-between">
        <h4 className="font-label-rpg text-label-rpg text-hazard-crimson uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">warning</span> Current Boss
        </h4>
        <button 
          onClick={() => navigate('/boss-raids')}
          className="font-label-rpg-sm text-label-rpg-sm text-hazard-crimson uppercase hover:text-white transition-colors flex items-center gap-1 bg-hazard-crimson/10 px-2 py-1 rounded"
        >
          View Raid <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      <div className="flex justify-between items-end mt-1 z-10 relative">
        <span className="font-headline-sm text-text-primary uppercase tracking-wide truncate pr-4">{activeBoss.name}</span>
        <span className="font-stat-display-sm text-stat-display-sm text-hazard-crimson shrink-0">
          {activeBoss.hp} <span className="text-text-muted text-xs">/ {activeBoss.maxHp} HP</span>
        </span>
      </div>
    </div>
  );
};
