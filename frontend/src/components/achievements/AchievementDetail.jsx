import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AchievementDetail = ({ achievement, onClose }) => {
  if (!achievement) return null;
  const { name, description, tier, status, progress, target, icon, unlockedAt } = achievement;

  const isUnlocked = status === 'unlocked';
  const isLocked = status === 'locked';

  let tierColor = 'text-text-muted';
  let tierGlow = '';
  if (tier === 'Bronze') tierColor = 'text-[#cd7f32]';
  if (tier === 'Silver') tierColor = 'text-[#C0C0C0]';
  if (tier === 'Gold') { tierColor = 'text-[#FFD700]'; tierGlow = 'drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]'; }
  if (tier === 'Mythic') { tierColor = 'text-primary'; tierGlow = 'drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]'; }

  const progressPercent = Math.min(100, (progress / target) * 100) || 0;

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
          className={`relative w-full max-w-md bg-surface-card rounded-2xl border-2 ${isUnlocked ? 'border-border-subtle' : 'border-surface-overlay'} shadow-2xl overflow-hidden flex flex-col items-center p-space-xl text-center`}
        >
          {isUnlocked && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          )}

          <div className="flex justify-between w-full mb-space-md absolute top-4 px-4">
             <span className={`font-label-rpg-sm uppercase tracking-widest ${isUnlocked ? 'text-vitality-emerald' : 'text-text-muted'}`}>
               {status.replace('_', ' ')}
             </span>
             <button onClick={onClose} className="text-text-muted hover:text-text-primary">
               <span className="material-symbols-outlined text-[20px]">close</span>
             </button>
          </div>

          <div className="mt-space-lg mb-space-md relative">
            <span className={`material-symbols-outlined text-[64px] ${isUnlocked ? tierColor : 'text-text-muted opacity-50'} ${isUnlocked ? tierGlow : ''}`}>
              {isLocked ? 'lock' : icon}
            </span>
          </div>
          
          <span className={`font-label-rpg text-label-rpg uppercase tracking-widest mb-1 ${tierColor}`}>
            {tier} TIER
          </span>
          
          <h2 className="font-headline-lg text-headline-lg text-text-primary uppercase mb-space-sm">
            {name}
          </h2>

          <p className="font-body-md text-text-secondary italic mb-space-lg max-w-sm">
            "{isLocked && tier === 'Mythic' ? 'The conditions of this mythic feat remain hidden until you step closer to the threshold.' : description}"
          </p>

          <div className="w-full bg-surface-deck rounded-xl p-space-md border border-border-subtle flex flex-col gap-2">
            <div className="flex justify-between font-label-rpg-sm text-[12px] text-text-muted uppercase">
              <span>Requirement Progress</span>
              <span className={isUnlocked ? 'text-vitality-emerald' : 'text-text-primary'}>
                {isUnlocked ? target : progress} / {target}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-base rounded-full overflow-hidden">
              <div className={`h-full ${isUnlocked ? 'bg-vitality-emerald' : 'bg-secondary'}`} style={{ width: `${isUnlocked ? 100 : progressPercent}%` }}></div>
            </div>
            {!isUnlocked && progress < target && (
              <span className="font-body-sm text-[12px] text-text-muted text-center mt-1">
                {target - progress} more to unlock.
              </span>
            )}
          </div>

          {unlockedAt && (
             <div className="mt-space-md font-label-rpg-sm text-[10px] text-text-muted uppercase tracking-widest">
               Unlocked on: {new Date(unlockedAt).toLocaleDateString()}
             </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
