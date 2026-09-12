import React from 'react';
import { cn } from '../../utils/cn';

export const OnboardingProgress = ({ step, title, percentage, syncText, stepNumber }) => {
  // We expect step to be 1, 2, 3, 4, or 5
  return (
    <div className="w-full mb-space-xl">
      <div className="flex items-center justify-between font-label-rpg text-label-rpg text-text-secondary tracking-widest uppercase mb-space-xs">
        <span className="flex items-center gap-space-xs text-secondary">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          PHASE {title} : STAGE 0{step}/05
        </span>
        <span className="font-stat-display-sm text-stat-display-sm text-primary">{percentage}% {syncText || 'SYNCED'}</span>
      </div>
      
      {/* Segmented Tactical Bar */}
      <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden flex gap-1 p-0.5 shadow-inner">
        {[1, 2, 3, 4, 5].map((idx) => {
          if (idx < step) {
            return <div key={idx} className="h-full w-1/5 bg-primary rounded-full transition-all duration-500"></div>;
          } else if (idx === step) {
            return <div key={idx} className="h-full w-1/5 bg-primary shadow-[0_0_8px_rgba(208,188,255,0.6)] rounded-full transition-all duration-500"></div>;
          } else {
            return <div key={idx} className="h-full w-1/5 bg-surface-container-high rounded-full transition-all duration-500"></div>;
          }
        })}
      </div>
    </div>
  );
};
