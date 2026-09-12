import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  asChild,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-space-sm font-headline-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-primary text-on-primary shadow-[0_0_16px_rgba(160,120,255,0.4)] hover:bg-primary-fixed hover:text-on-primary-fixed hover:scale-[1.02]",
    secondary: "bg-surface-card text-text-primary hover:bg-surface-overlay shadow-md",
    outline: "border border-border-subtle bg-transparent text-text-primary hover:bg-surface-card",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-card",
    danger: "bg-hazard-crimson/10 text-hazard-crimson hover:bg-hazard-crimson/20 border border-transparent hover:border-hazard-crimson/50"
  };

  const sizes = {
    sm: "px-space-md py-space-xs text-sm",
    md: "px-space-lg py-space-sm text-base",
    lg: "px-space-xl py-space-md text-lg"
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  return (
    <motion.button 
      ref={ref}
      whileTap={{ scale: 0.97 }}
      className={classes} 
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
