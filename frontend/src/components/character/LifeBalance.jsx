import React from 'react';
import { motion } from 'framer-motion';

export const LifeBalance = ({ lifeBalance }) => {
  if (!lifeBalance) return null;
  const { score, status } = lifeBalance;
  
  // Calculate width for the score bar
  const scorePercent = Math.min(Math.max(score, 0), 100);
  
  // Determine color based on score
  let color = 'text-hazard-crimson';
  let bgColor = 'bg-hazard-crimson';
  if (score >= 85) { color = 'text-primary'; bgColor = 'bg-primary'; }
  else if (score >= 60) { color = 'text-vitality-emerald'; bgColor = 'bg-vitality-emerald'; }
  else if (score >= 40) { color = 'text-secondary'; bgColor = 'bg-secondary'; }

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h4 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">balance</span> Life Balance Score
        </h4>
        <div className={`font-label-rpg text-label-rpg uppercase px-2 py-0.5 rounded bg-surface-deck border border-surface-overlay ${color}`}>
          {status}
        </div>
      </div>
      
      <div className="flex items-end gap-space-sm">
        <span className={`font-headline-xl text-[42px] leading-none tracking-tighter ${color}`}>
          {score}
        </span>
        <span className="font-label-rpg text-label-rpg text-text-muted uppercase mb-1">/ 100</span>
      </div>
      
      <div className="w-full h-1.5 bg-surface-deck rounded-full overflow-hidden mt-1">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${scorePercent}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full ${bgColor} shadow-[0_0_8px_currentColor]`}
        />
      </div>
      
      <p className="font-body-sm text-body-sm text-text-secondary mt-1">
        This gamified score reflects your attribute spread. A balanced approach yields a higher base score.
      </p>
    </div>
  );
};
