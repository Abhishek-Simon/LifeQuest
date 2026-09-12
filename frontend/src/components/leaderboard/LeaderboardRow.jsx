import React from 'react';
import { motion } from 'framer-motion';

export const LeaderboardRow = ({ entry, isCurrentUser }) => {
  const isTop3 = entry.rank <= 3;
  
  let rankColor = "text-text-muted";
  let badgeColor = "bg-surface-overlay";
  
  if (entry.rank === 1) {
    rankColor = "text-warm-gold";
    badgeColor = "bg-warm-gold/20 border-warm-gold/40";
  } else if (entry.rank === 2) {
    rankColor = "text-text-secondary";
    badgeColor = "bg-text-secondary/20 border-text-secondary/40";
  } else if (entry.rank === 3) {
    rankColor = "text-tertiary";
    badgeColor = "bg-tertiary/20 border-tertiary/40";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between p-space-md rounded-lg border ${isCurrentUser ? 'border-primary/50 bg-primary/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]' : 'border-border-subtle bg-surface-card hover:bg-surface-deck transition-colors'} mb-space-sm`}
    >
      <div className="flex items-center gap-space-md">
        <div className={`w-8 h-8 rounded-full border ${badgeColor} flex items-center justify-center`}>
          <span className={`font-stat-display-sm text-stat-display-sm ${rankColor}`}>#{entry.rank}</span>
        </div>
        
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-surface-overlay flex items-center justify-center overflow-hidden border border-border-subtle">
            {entry.avatar ? (
              <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-text-muted">person</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className={`font-headline-sm text-headline-sm ${isCurrentUser ? 'text-primary' : 'text-text-primary'}`}>
              {isCurrentUser ? 'YOU' : entry.name}
            </span>
            {entry.streak > 0 && (
              <span className="font-label-rpg-sm text-label-rpg-sm text-vitality-emerald uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                {entry.streak} day streak
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <span className="font-stat-display-sm text-stat-display-sm text-primary tracking-wide">{entry.xp.toLocaleString()} XP</span>
      </div>
    </motion.div>
  );
};
