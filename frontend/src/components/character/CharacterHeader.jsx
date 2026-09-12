import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '../common/Avatar';

export const CharacterHeader = ({ character }) => {
  if (!character) return null;
  const xpPercentage = Math.min((character.xp / character.nextLevelXp) * 100, 100);

  return (
    <div className="w-full bg-surface-deck rounded-2xl p-space-xl border border-primary/20 shadow-[0_24px_48px_-12px_rgba(139,92,246,0.25)] relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-space-xl text-center md:text-left">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_60%)] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      {/* Avatar Container */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 border-[3px] border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-[-8px] border border-secondary/20 rounded-full border-dashed animate-[spin_20s_linear_infinite_reverse]"></div>
        
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[4px] border-primary shadow-[0_0_24px_rgba(160,120,255,0.5)] relative z-10 p-1 bg-surface-base flex items-center justify-center">
          <Avatar 
            src={character.avatar} 
            name={character.name}
            alt={`${character.name}'s avatar`} 
            className="w-full h-full object-cover rounded-full" 
          />
        </div>
        
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-surface-card border border-primary px-4 py-1 rounded-full font-stat-display text-stat-display text-primary shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap">
          LVL {character.level}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-1 w-full relative z-10 pt-2 md:pt-4">
        <span className="font-label-rpg text-label-rpg text-secondary tracking-widest uppercase mb-1">
          {character.title}
        </span>
        <h1 className="font-headline-xl text-[48px] leading-[48px] font-extrabold text-text-primary tracking-tight mb-space-md uppercase">
          {character.name}
        </h1>

        {/* Stats Summary */}
        <div className="flex gap-4 mb-4 justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-label-rpg-sm text-text-muted uppercase">Gold</span>
            <span className="font-stat-display-sm text-[#FFD700]">{character.gold}</span>
          </div>
          <div className="w-px bg-border-subtle my-1"></div>
          <div className="flex flex-col items-center md:items-start">
            <span className="font-label-rpg-sm text-text-muted uppercase">Streak</span>
            <span className="font-stat-display-sm text-vitality-emerald">{character.streak} Days</span>
          </div>
        </div>

        <div className="flex flex-col gap-space-xs w-full max-w-lg mt-auto">
          <div className="flex items-end justify-between font-stat-display-sm text-stat-display-sm">
            <span className="text-primary">{character.xp} <span className="text-text-muted text-sm font-label-rpg">/ {character.nextLevelXp} XP</span></span>
            <span className="text-text-secondary">{xpPercentage.toFixed(1)}%</span>
          </div>
          
          <div className="w-full h-3 bg-surface-container-lowest rounded-full overflow-hidden shadow-inner p-0.5 border border-border-subtle">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-[linear-gradient(90deg,#8b5cf6,#06b6d4)] rounded-full shadow-[0_0_16px_rgba(208,188,255,0.8)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
