import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ children, variant = 'primary', icon, className, pulse = false }) => {
  const variants = {
    primary: "bg-primary/15 text-primary-fixed",
    secondary: "bg-secondary/15 text-secondary",
    tertiary: "bg-tertiary/15 text-tertiary",
    success: "bg-vitality-emerald/15 text-vitality-emerald",
    danger: "bg-hazard-crimson/15 text-hazard-crimson",
    neutral: "bg-surface-container text-text-muted"
  };

  const dotColors = {
    primary: "bg-primary-fixed",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
    success: "bg-vitality-emerald",
    danger: "bg-hazard-crimson",
    neutral: "bg-text-muted"
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-space-sm py-1 rounded font-label-rpg text-label-rpg uppercase tracking-wider",
      variants[variant],
      className
    )}>
      {pulse && (
        <div className="relative flex h-2 w-2">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColors[variant])}></span>
          <span className={cn("relative inline-flex rounded-full h-2 w-2", dotColors[variant])}></span>
        </div>
      )}
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </div>
  );
};
