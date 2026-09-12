import React from 'react';
import { useGame } from '../../context/GameContext';

const attrConfig = {
  strength: { icon: 'fitness_center', color: 'hazard-crimson', short: 'STR' },
  intellect: { icon: 'memory', color: 'secondary', short: 'INT' },
  endurance: { icon: 'all_inclusive', color: 'vitality-emerald', short: 'END' },
  wisdom: { icon: 'psychology', color: 'primary', short: 'WIS' },
  creativity: { icon: 'auto_awesome', color: 'tertiary', short: 'CRE' },
  discipline: { icon: 'timer', color: 'primary-container', short: 'DIS' }
};

export const AttributesPanel = () => {
  const { gameState } = useGame();
  const { attributes } = gameState;

  return (
    <div className="w-full bg-surface-card rounded-xl p-space-md border border-border-subtle flex flex-col gap-space-md shadow-lg">
      <div className="flex items-center justify-between">
        <span className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider">Core Attributes</span>
        <span className="material-symbols-outlined text-text-muted text-[18px]">tune</span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-space-sm">
        {Object.entries(attributes).map(([key, value]) => {
          const config = attrConfig[key] || { icon: 'star', color: 'text-text-muted', short: key.substring(0,3).toUpperCase() };
          
          return (
            <div key={key} className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-deck border border-surface-container-highest hover:bg-surface-overlay transition-colors cursor-default">
              <div className={`w-8 h-8 rounded bg-${config.color}/10 text-${config.color} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[16px]">{config.icon}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">{config.short}</span>
                <span className="font-stat-display-sm text-stat-display-sm text-text-primary leading-none truncate">{value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
