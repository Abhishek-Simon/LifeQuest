import React from 'react';
import { cn } from '../../utils/cn';

export const XPBar = ({ currentXp, nextLevelXp, className }) => {
  const percentage = Math.min(100, Math.max(0, (currentXp / nextLevelXp) * 100));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1 font-label-rpg-sm text-label-rpg-sm">
        <span className="text-text-muted">{currentXp} XP</span>
        <span className="text-primary-fixed">{Math.round(percentage)}% TO NEXT LEVEL</span>
      </div>
      <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-border-subtle/50">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
