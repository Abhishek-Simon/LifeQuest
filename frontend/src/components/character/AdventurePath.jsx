import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const AdventurePath = () => {
  const { gameState } = useGame();
  const { chapter } = gameState.player;
  
  if (!chapter) return null;

  return (
    <div className="bg-surface-deck rounded-xl p-space-md border border-secondary/30 shadow-[0_4px_24px_rgba(6,182,212,0.1)] flex flex-col gap-space-md relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-[100px]">map</span>
      </div>
      
      <div>
        <span className="font-label-rpg text-label-rpg text-secondary tracking-widest uppercase mb-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">signpost</span> Adventure Path
        </span>
        <h3 className="font-headline-lg text-headline-lg text-text-primary mt-1">
          Chapter {chapter.id} — {chapter.title}
        </h3>
      </div>
      
      <p className="font-body-md text-body-md text-text-secondary">
        {chapter.description}
      </p>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm text-text-primary uppercase">
          <span>Completion</span>
          <span className="text-secondary">{chapter.progress}%</span>
        </div>
        
        <div className="w-full h-2 bg-surface-base rounded-full overflow-hidden border border-border-subtle">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${chapter.progress}%` }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-full bg-secondary shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          />
        </div>
      </div>
      
      <div className="mt-2 grid grid-cols-2 gap-space-sm border-t border-border-subtle pt-space-md">
        <div className="flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Current Milestone</span>
          <span className="font-body-sm text-body-sm text-text-primary">Establish Consistency</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Next Unlock</span>
          <span className="font-body-sm text-body-sm text-text-primary">Companion AI</span>
        </div>
      </div>
    </div>
  );
};
