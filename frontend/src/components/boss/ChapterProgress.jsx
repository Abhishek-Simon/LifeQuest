import React from 'react';
import { motion } from 'framer-motion';

export const ChapterProgress = ({ chapter, bossName }) => {
  if (!chapter) return null;

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-md">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-secondary text-[18px]">auto_stories</span>
        <h4 className="font-label-rpg text-label-rpg text-secondary uppercase tracking-wider">Current Chapter</h4>
      </div>
      
      <h3 className="font-headline-md text-text-primary uppercase leading-tight">
        {chapter.name}
      </h3>
      
      <p className="font-body-sm text-text-secondary">
        {chapter.narrative}
      </p>

      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted">
          <span>Chapter Progress</span>
          <span className="font-stat-display-sm text-text-primary">{chapter.progress}%</span>
        </div>
        <div className="w-full h-2 bg-surface-deck rounded-full overflow-hidden">
          <div className="h-full bg-secondary" style={{ width: `${chapter.progress}%` }}></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 border-t border-border-subtle pt-space-sm mt-2">
         <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm uppercase">
            <span className="text-text-muted">Current Target</span>
            <span className="text-hazard-crimson">{bossName}</span>
         </div>
      </div>

      <div className="p-space-sm bg-surface-deck border border-surface-overlay rounded mt-2 flex flex-col gap-1">
        <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">lock</span> Next Unlock
        </span>
        <span className="font-label-rpg text-text-secondary uppercase">{chapter.nextChapter}</span>
        <span className="font-body-sm text-[10px] text-text-muted">Locked until current chapter is complete.</span>
      </div>
    </div>
  );
};
