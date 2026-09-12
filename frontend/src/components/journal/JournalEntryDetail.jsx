import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const JournalEntryDetail = ({ entry, onClose }) => {
  if (!entry) return null;
  const { title, objective, status, attribute, difficulty, reward, type, chapter, narrative, date } = entry;

  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isFailed = status === 'failed';
  const isStory = type === 'story';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-surface-card rounded-2xl border border-border-subtle shadow-2xl overflow-hidden flex flex-col p-space-xl"
        >
          {/* Header row */}
          <div className="flex justify-between items-start mb-space-md">
            <div className="flex flex-col">
              <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase tracking-widest mb-1">
                {new Date(date).toLocaleDateString()}
              </span>
              {isStory && <span className="font-label-rpg-sm text-primary uppercase tracking-widest">{chapter}</span>}
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          
          <h2 className={`font-headline-lg uppercase mb-space-xs ${isStory ? 'text-primary' : 'text-text-primary'}`}>
            {title}
          </h2>
          
          <span className={`font-label-rpg-sm uppercase mb-space-md inline-block w-fit px-2 py-1 rounded border ${
              isCompleted ? 'border-vitality-emerald/30 text-vitality-emerald bg-vitality-emerald/5' : 
              isActive ? 'border-primary/30 text-primary bg-primary/5' : 
              'border-hazard-crimson/30 text-hazard-crimson bg-hazard-crimson/5'
            }`}>
              {status.replace('_', ' ')}
          </span>

          <p className="font-body-md text-text-secondary mb-space-xl">
            {isStory && narrative ? narrative : objective}
          </p>

          <div className="w-full bg-surface-deck rounded-xl p-space-md border border-border-subtle grid grid-cols-2 gap-space-md mb-space-xl">
             <div className="flex flex-col">
               <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Attribute</span>
               <span className="font-label-rpg text-text-primary uppercase">{attribute}</span>
             </div>
             <div className="flex flex-col">
               <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Difficulty</span>
               <span className="font-label-rpg text-text-primary uppercase">{difficulty}</span>
             </div>
             {isCompleted && reward && (
               <>
                 <div className="flex flex-col">
                   <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">XP Earned</span>
                   <span className="font-stat-display-sm text-secondary">+{reward.xp}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Gold Earned</span>
                   <span className="font-stat-display-sm text-[#FFD700]">+{reward.gold}</span>
                 </div>
               </>
             )}
          </div>

          <div className="flex gap-space-sm mt-auto">
            {isActive && (
              <button 
                onClick={onClose}
                className="flex-1 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container rounded font-label-rpg uppercase transition-colors"
              >
                View Quest
              </button>
            )}
            {isFailed && (
              <button 
                onClick={onClose}
                className="flex-1 py-3 bg-surface-deck border border-border-subtle text-text-primary hover:bg-surface-overlay rounded font-label-rpg uppercase transition-colors"
              >
                Dismiss
              </button>
            )}
            {isCompleted && (
              <button 
                onClick={onClose}
                className="flex-1 py-3 bg-surface-deck border border-border-subtle text-text-primary hover:bg-surface-overlay rounded font-label-rpg uppercase transition-colors"
              >
                Close Record
              </button>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
