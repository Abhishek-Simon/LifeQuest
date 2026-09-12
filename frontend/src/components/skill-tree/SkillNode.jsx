import React from 'react';
import { motion } from 'framer-motion';

export const SkillNode = ({ skill, isSelected, onClick }) => {
  const { status } = skill;
  const isLocked = status === 'locked';
  const isAvailable = status === 'available';
  const isUnlocked = status === 'unlocked';
  const isMastered = status === 'mastered';
  
  let borderColor = "border-border-subtle";
  let bgColor = "bg-surface-card";
  let textColor = "text-text-muted";
  let shadow = "";

  if (isMastered) {
    borderColor = "border-[#FFD700]";
    bgColor = "bg-[#FFD700]/20";
    textColor = "text-text-primary";
    shadow = "shadow-[0_0_16px_rgba(255,215,0,0.5)]";
  } else if (isUnlocked) {
    borderColor = "border-vitality-emerald";
    bgColor = "bg-vitality-emerald/20";
    textColor = "text-text-primary";
    shadow = "shadow-[0_0_16px_rgba(16,185,129,0.3)]";
  } else if (isAvailable) {
    borderColor = "border-primary";
    bgColor = "bg-primary/20";
    textColor = "text-text-primary";
    shadow = "shadow-[0_0_16px_rgba(139,92,246,0.5)]";
  } else if (isLocked) {
    bgColor = "bg-surface-deck opacity-60";
  }

  if (isSelected) {
    borderColor = "border-on-surface";
  }

  return (
    <motion.button
      whileHover={{ scale: isLocked ? 1 : 1.05 }}
      whileTap={{ scale: isLocked ? 1 : 0.95 }}
      onClick={onClick}
      className={`relative w-[180px] h-[80px] rounded-lg border-2 ${borderColor} ${bgColor} ${shadow} flex flex-col items-center justify-center gap-1 transition-all p-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      aria-label={`Skill: ${skill.name}. Status: ${status}`}
    >
      <span className={`font-label-rpg text-sm uppercase text-center leading-tight ${textColor}`}>
        {skill.name}
      </span>
      
      {isMastered && (
        <span className="material-symbols-outlined text-[#FFD700] text-[18px] absolute top-1 right-1">
          stars
        </span>
      )}

      {isUnlocked && (
        <span className="material-symbols-outlined text-vitality-emerald text-[18px] absolute top-1 right-1">
          check_circle
        </span>
      )}
      
      {isLocked && (
        <span className="material-symbols-outlined text-text-muted text-[16px] absolute top-1 right-1">
          lock
        </span>
      )}

      {isAvailable && (
        <span className="font-label-rpg-sm text-[10px] text-primary absolute bottom-1 uppercase tracking-widest">
          Available
        </span>
      )}
      
      {/* Small progress indicator if partially progressed (mocked) */}
      {(status === 'unlocked' && skill.progress > 0 && skill.progress < 100) && (
        <div className="absolute bottom-0 left-0 h-1 bg-vitality-emerald" style={{ width: `${skill.progress}%` }}></div>
      )}
    </motion.button>
  );
};
