import React from 'react';
import { motion } from 'framer-motion';

export const AchievementCard = ({ achievement, onClick }) => {
  const { name, description, tier, status, progress, target, icon } = achievement;

  const isUnlocked = status === 'unlocked';
  const isInProgress = status === 'in_progress';
  const isLocked = status === 'locked';

  // Tier Styling
  let tierColor = 'text-text-muted';
  let tierBg = 'bg-surface-deck';
  let tierBorder = 'border-border-subtle';
  let badgeShadow = '';

  if (tier === 'Bronze') {
    tierColor = 'text-[#cd7f32]';
    tierBg = 'bg-[#cd7f32]/10';
    tierBorder = 'border-[#cd7f32]/30';
  } else if (tier === 'Silver') {
    tierColor = 'text-[#C0C0C0]';
    tierBg = 'bg-[#C0C0C0]/10';
    tierBorder = 'border-[#C0C0C0]/30';
  } else if (tier === 'Gold') {
    tierColor = 'text-[#FFD700]';
    tierBg = 'bg-[#FFD700]/10';
    tierBorder = 'border-[#FFD700]/40';
    if (isUnlocked) badgeShadow = 'shadow-[0_0_12px_rgba(255,215,0,0.3)]';
  } else if (tier === 'Mythic') {
    tierColor = 'text-primary';
    tierBg = 'bg-primary/10';
    tierBorder = 'border-primary/50';
    if (isUnlocked) badgeShadow = 'shadow-[0_0_16px_rgba(139,92,246,0.5)]';
  }

  // State Styling
  let cardOpacity = isLocked ? 'opacity-60' : 'opacity-100';
  let cardBorder = isUnlocked ? tierBorder : 'border-border-subtle';
  
  const progressPercent = Math.min(100, (progress / target) * 100) || 0;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`bg-surface-card rounded-xl border ${cardBorder} p-space-md flex flex-col gap-space-sm cursor-pointer hover:bg-surface-overlay transition-colors ${cardOpacity}`}
    >
      <div className="flex justify-between items-start mb-1">
        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${isUnlocked ? tierBg : 'bg-surface-deck'} ${isUnlocked ? tierBorder : 'border-border-subtle'} ${isUnlocked ? tierColor : 'text-text-muted'} ${badgeShadow}`}>
          <span className="material-symbols-outlined text-[24px]">
            {isLocked ? 'lock' : icon}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className={`font-label-rpg-sm uppercase tracking-widest ${isUnlocked ? tierColor : 'text-text-muted'}`}>{tier}</span>
          <span className={`font-label-rpg-sm uppercase mt-1 ${isUnlocked ? 'text-vitality-emerald' : isInProgress ? 'text-secondary' : 'text-text-muted'}`}>
            {status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <h3 className={`font-headline-sm uppercase tracking-tight line-clamp-1 ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}>
        {name}
      </h3>

      <p className="font-body-sm text-text-secondary line-clamp-2 h-10">
        {isLocked && tier === 'Mythic' ? '???' : description}
      </p>

      <div className="mt-auto pt-space-sm">
        <div className="flex justify-between font-label-rpg-sm text-[10px] text-text-muted uppercase mb-1">
          <span>Progress</span>
          <span>{isUnlocked ? target : progress} / {target}</span>
        </div>
        <div className="w-full h-1.5 bg-surface-base rounded-full overflow-hidden">
          <div className={`h-full ${isUnlocked ? 'bg-vitality-emerald' : 'bg-secondary'}`} style={{ width: `${isUnlocked ? 100 : progressPercent}%` }}></div>
        </div>
      </div>
    </motion.div>
  );
};
