import React from 'react';
import { motion } from 'framer-motion';

export const BossOverview = ({ boss, onSimulateVictory }) => {
  return (
    <div className="w-full bg-surface-deck rounded-2xl p-space-xl border border-hazard-crimson/20 shadow-[0_16px_48px_-12px_rgba(220,38,38,0.25)] relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-space-xl text-center md:text-left">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1),transparent_60%)] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      {/* Detail Container */}
      <div className="flex flex-col flex-1 w-full relative z-10">
        <span className="font-label-rpg text-label-rpg text-hazard-crimson tracking-widest uppercase mb-1">
          Target Identified
        </span>
        <h1 className="font-headline-xl text-[48px] leading-[48px] font-extrabold text-text-primary tracking-tight mb-space-sm uppercase drop-shadow-[0_0_12px_rgba(220,38,38,0.3)]">
          {boss.name}
        </h1>
        <p className="font-body-md text-text-secondary max-w-lg mb-space-lg">
          {boss.description}
        </p>

        {/* HP Bar */}
        <div className="flex flex-col gap-space-xs w-full max-w-xl mt-auto">
          <div className="flex items-end justify-between font-stat-display-sm text-stat-display-sm">
            <span className="text-text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-hazard-crimson text-[18px]">favorite</span>
              BOSS HP
            </span>
            <span className="text-hazard-crimson drop-shadow-[0_0_4px_rgba(220,38,38,0.8)]">
              {boss.progress}%
            </span>
          </div>
          
          <div className="w-full h-4 bg-surface-container-lowest rounded-full overflow-hidden shadow-inner p-0.5 border border-hazard-crimson/30 relative group cursor-pointer" onClick={onSimulateVictory}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${100 - boss.progress}%` }} // Remaining HP
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-[linear-gradient(90deg,#dc2626,#ef4444)] rounded-full shadow-[0_0_16px_rgba(239,68,68,0.8)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]"></div>
            </motion.div>
            
            {/* Tooltip for Dev Click */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm rounded-full">
               <span className="font-label-rpg-sm text-[10px] text-white uppercase tracking-widest">Click to Simulate Victory</span>
            </div>
          </div>
          <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase text-right mt-1 tracking-widest">
            {boss.hp} / {boss.maxHp} HP Remaining
          </span>
        </div>
      </div>
    </div>
  );
};
