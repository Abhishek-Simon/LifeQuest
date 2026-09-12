import React from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle } from 'lucide-react';

export const Input = React.forwardRef(({ 
  label, 
  error, 
  className,
  id,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="font-label-ui text-label-ui text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-surface-container-low border text-text-primary px-space-md py-space-sm rounded-lg font-body-md text-body-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-text-muted",
            error ? "border-hazard-crimson focus:border-hazard-crimson focus:ring-hazard-crimson/50" : "border-border-subtle hover:border-border-active",
            className
          )}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-hazard-crimson pointer-events-none">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {error && (
        <span className="font-body-sm text-body-sm text-hazard-crimson mt-1 flex items-center gap-1">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
