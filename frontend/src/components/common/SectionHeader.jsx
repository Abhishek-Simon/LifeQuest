import React from 'react';
import { cn } from '../../utils/cn';

export const SectionHeader = ({ title, subtitle, badge, action, className }) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg", className)}>
      <div>
        {badge && (
          <div className="mb-space-xs font-label-rpg text-label-rpg uppercase text-secondary tracking-widest">
            {badge}
          </div>
        )}
        <h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 font-body-md text-body-md text-text-secondary max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
