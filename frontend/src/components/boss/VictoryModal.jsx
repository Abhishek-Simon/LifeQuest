import React from 'react';
import { motion } from 'framer-motion';

export const VictoryModal = ({ boss, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-surface-card rounded-2xl border-2 border-[#FFD700]/50 shadow-[0_0_64px_rgba(255,215,0,0.2)] overflow-hidden flex flex-col items-center p-space-2xl text-center"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-[64px] pointer-events-none"></div>

        <span className="material-symbols-outlined text-[64px] text-[#FFD700] mb-space-md drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]">
          emoji_events
        </span>
        
        <span className="font-label-rpg text-label-rpg text-[#FFD700] uppercase tracking-widest mb-2">
          Victory Achieved
        </span>
        
        <h2 className="font-headline-xl text-[48px] leading-[48px] text-text-primary uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-space-md">
          {boss.name} DEFEATED
        </h2>

        <p className="font-body-lg text-text-secondary max-w-md mx-auto mb-space-xl">
          You have conquered this challenge and proven your mastery. The next chapter of your journey begins now.
        </p>

        <div className="flex gap-space-lg mb-space-xl w-full justify-center">
          <div className="flex flex-col items-center bg-surface-deck px-6 py-4 rounded-xl border border-border-subtle min-w-[120px]">
             <span className="font-label-rpg-sm text-text-muted uppercase mb-1">XP Earned</span>
             <span className="font-stat-display text-secondary">+1500</span>
          </div>
          <div className="flex flex-col items-center bg-surface-deck px-6 py-4 rounded-xl border border-border-subtle min-w-[120px]">
             <span className="font-label-rpg-sm text-text-muted uppercase mb-1">Gold Earned</span>
             <span className="font-stat-display text-[#FFD700]">+500</span>
          </div>
        </div>

        <div className="p-space-md bg-surface-deck border border-surface-overlay rounded-xl w-full max-w-md mb-space-xl flex flex-col items-center gap-2">
           <span className="font-label-rpg-sm text-text-muted uppercase">Chapter Complete</span>
           <span className="font-headline-md text-text-primary uppercase">{boss.chapter.name}</span>
           <div className="w-full h-px bg-border-subtle my-2"></div>
           <span className="font-label-rpg-sm text-primary uppercase flex items-center gap-1">
             <span className="material-symbols-outlined text-[14px]">lock_open</span> Unlocked: {boss.chapter.nextChapter}
           </span>
        </div>

        <button 
          onClick={onClose}
          className="px-8 py-3 bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg uppercase transition-colors shadow-[0_0_24px_rgba(139,92,246,0.4)]"
        >
          Continue Journey
        </button>
      </motion.div>
    </div>
  );
};
