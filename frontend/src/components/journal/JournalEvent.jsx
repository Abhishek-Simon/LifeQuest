import React from 'react';
import { motion } from 'framer-motion';

export const JournalEvent = ({ entry, onClick }) => {
  const { title, objective, status, attribute, reward, type, chapter, narrative } = entry;

  let borderColor = 'border-border-subtle';
  let dotColor = 'bg-surface-overlay border-border-subtle';
  let icon = 'history_edu';
  let statusText = status.toUpperCase();

  if (status === 'completed') {
    borderColor = 'border-vitality-emerald/30';
    dotColor = 'bg-vitality-emerald text-background shadow-[0_0_8px_rgba(16,185,129,0.5)] border-transparent';
    icon = 'check';
  } else if (status === 'active') {
    borderColor = 'border-primary/30';
    dotColor = 'bg-primary text-background shadow-[0_0_8px_rgba(139,92,246,0.5)] border-transparent';
    icon = 'play_arrow';
    statusText = 'IN PROGRESS';
  } else if (status === 'failed') {
    borderColor = 'border-hazard-crimson/30';
    dotColor = 'bg-hazard-crimson text-background shadow-[0_0_8px_rgba(220,38,38,0.5)] border-transparent';
    icon = 'close';
  }

  const isStory = type === 'story';

  return (
    <motion.div 
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`relative pl-8 mb-space-md cursor-pointer group`}
    >
      {/* Timeline Line */}
      <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-border-subtle group-last:bg-transparent"></div>
      
      {/* Timeline Dot */}
      <div className={`absolute left-0 top-3 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${dotColor}`}>
        <span className="material-symbols-outlined text-[14px]">{icon}</span>
      </div>

      {/* Card Content */}
      <div className={`bg-surface-card rounded-xl border ${borderColor} p-space-md shadow-sm group-hover:bg-surface-overlay transition-colors ${isStory ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.05),transparent)]' : ''}`}>
        
        {isStory && chapter && (
          <div className="flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-[14px] text-primary">auto_stories</span>
            <span className="font-label-rpg-sm text-[10px] text-primary uppercase tracking-widest">{chapter}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-1">
          <h3 className={`font-headline-sm uppercase ${isStory ? 'text-primary' : 'text-text-primary'}`}>{title}</h3>
          
          <div className="flex flex-wrap gap-2 shrink-0">
            <span className="font-label-rpg-sm text-[10px] bg-surface-deck border border-border-subtle px-2 py-0.5 rounded text-text-muted uppercase">
              {attribute}
            </span>
            <span className={`font-label-rpg-sm text-[10px] px-2 py-0.5 rounded uppercase border ${
              status === 'completed' ? 'border-vitality-emerald/30 text-vitality-emerald' : 
              status === 'active' ? 'border-primary/30 text-primary' : 
              'border-hazard-crimson/30 text-hazard-crimson'
            }`}>
              {statusText}
            </span>
          </div>
        </div>

        <p className={`font-body-sm mb-2 line-clamp-2 ${isStory ? 'text-text-secondary italic' : 'text-text-muted'}`}>
          {isStory ? narrative : objective}
        </p>

        {/* Reward Metadata (only for completed story/normal quests) */}
        {status === 'completed' && reward && (
          <div className="flex items-center gap-3 font-stat-display-sm text-[12px] mt-space-sm pt-space-sm border-t border-border-subtle">
            {reward.xp && <span className="text-secondary">+{reward.xp} XP</span>}
            {reward.gold && <span className="text-[#FFD700]">+{reward.gold} GOLD</span>}
          </div>
        )}

      </div>
    </motion.div>
  );
};
