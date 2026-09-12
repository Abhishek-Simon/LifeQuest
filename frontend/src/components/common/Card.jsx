import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const Card = ({ children, className, glow = false, ...props }) => {
  return (
    <div className="relative group" {...props}>
      {glow && (
        <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-primary-container/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative bg-surface-card rounded-2xl p-space-lg shadow-md border border-border-subtle overflow-hidden",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};
