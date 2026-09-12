import React from 'react';
import { useGame } from '../../context/GameContext';

export const ArmoryHeader = () => {
  const { gameState } = useGame();
  const { player, inventory } = gameState;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl border-b border-border-subtle pb-space-lg">
      <div>
        <div className="flex items-center gap-space-sm mb-space-xs">
          <span className="material-symbols-outlined text-secondary text-[24px]">shield</span>
          <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight uppercase">Armory</h1>
        </div>
        <p className="font-body-md text-body-md text-text-secondary">
          Equip the rewards you've earned on your journey.
        </p>
      </div>

      <div className="flex gap-space-md bg-surface-card p-space-sm rounded-lg border border-border-subtle">
        <div className="flex flex-col items-center px-space-md border-r border-border-subtle">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Gold</span>
          <span className="font-stat-display-sm text-stat-display-sm text-[#FFD700]">{player.gold}</span>
        </div>
        <div className="flex flex-col items-center px-space-md border-r border-border-subtle">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Level</span>
          <span className="font-stat-display-sm text-stat-display-sm text-text-primary">{player.level}</span>
        </div>
        <div className="flex flex-col items-center px-space-md">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Inventory</span>
          <span className="font-stat-display-sm text-stat-display-sm text-text-primary">
            {inventory.items.length} <span className="text-text-muted text-lg">/ {inventory.capacity}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
