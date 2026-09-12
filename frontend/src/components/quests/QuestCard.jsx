import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const QuestCard = ({ quest }) => {
  const navigate = useNavigate();
  
  const isLocked = quest.status === 'locked';
  const isActive = quest.status === 'active';
  const isCompleted = quest.status === 'completed';
  const isFailed = quest.status === 'failed';
  let borderClass = "border-border-subtle hover:border-border-active";
  let bgClass = "bg-surface-card";
  let opacityClass = "opacity-100";
  
  if (isLocked) {
    borderClass = "border-border-subtle";
    bgClass = "bg-surface-deck";
    opacityClass = "opacity-60";
  } else if (isActive) {
    borderClass = "border-primary/50 shadow-[0_0_16px_rgba(139,92,246,0.18)]";
    bgClass = "bg-surface-card";
  } else if (isCompleted) {
    borderClass = "border-vitality-emerald/30";
    bgClass = "bg-surface-base";
    opacityClass = "opacity-80";
  } else if (isFailed || quest.status === 'stalled') {
    borderClass = "border-hazard-crimson/30";
    bgClass = "bg-surface-base";
    opacityClass = "opacity-80";
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full rounded-lg border ${borderClass} ${bgClass} ${opacityClass} p-space-md flex flex-col gap-space-sm transition-all relative overflow-hidden`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">
              {quest.category}
            </span>
            <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded">
              {quest.difficulty}
            </span>
            {quest.attribute && (
              <span className="px-2 py-0.5 bg-surface-deck border border-surface-overlay rounded font-label-rpg-sm uppercase text-text-secondary whitespace-nowrap">
                {quest.attribute}
              </span>
            )}
            {isLocked && (
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted bg-surface-overlay px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">lock</span> Locked
              </span>
            )}
            {quest.energyIntensity && (
              <span className="font-label-rpg-sm text-[10px] text-secondary border border-secondary/30 px-1.5 py-0.5 rounded uppercase">
                {quest.energyIntensity}
              </span>
            )}
          </div>
          <h3 className={`font-headline-sm text-headline-sm ${isLocked || isCompleted || isFailed ? 'text-text-secondary' : 'text-text-primary'}`}>
            {quest.title}
          </h3>
        </div>
        
        {/* Rewards Block */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="font-stat-display-sm text-stat-display-sm text-primary leading-none">+{quest.rewards.xp} XP</span>
          <div className="flex items-center gap-1 font-label-rpg-sm text-label-rpg-sm text-tertiary uppercase">
            <span className="material-symbols-outlined text-[12px]">monetization_on</span> {quest.rewards.gold} G
          </div>
        </div>
      </div>

      <p className="font-body-sm text-body-sm text-text-secondary line-clamp-2">
        {quest.description}
      </p>

      {isLocked && quest.prerequisite && (
        <div className="mt-space-xs p-space-sm rounded bg-surface-overlay border border-surface-container-highest flex items-start gap-space-xs">
          <span className="material-symbols-outlined text-text-muted text-[14px]">key</span>
          <span className="font-body-sm text-body-sm text-text-muted">
            Requires previous quest
          </span>
        </div>
      )}

      {quest.status === 'stalled' && (
        <div className="mt-space-xs p-space-sm rounded bg-hazard-crimson/10 border border-hazard-crimson/30 flex items-start gap-space-xs">
          <span className="material-symbols-outlined text-hazard-crimson text-[14px]">warning</span>
          <span className="font-body-sm text-body-sm text-hazard-crimson">
            Stalled. Recovery required.
          </span>
        </div>
      )}

      {/* Meta info & Action */}
      <div className="mt-auto pt-space-sm flex items-center justify-between border-t border-border-subtle">
        <div className="flex items-center gap-space-sm text-text-muted font-label-rpg-sm text-label-rpg-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span> {quest.duration}m
          </span>
        </div>
        
        <div>
          <button 
            onClick={() => navigate(`/quests/${quest.id}`)}
            className="px-4 py-1.5 bg-surface-card border border-border-subtle hover:bg-surface-overlay text-text-primary font-label-rpg text-label-rpg uppercase rounded transition-colors"
          >
            View Quest
          </button>
        </div>
      </div>
    </motion.div>
  );
};
