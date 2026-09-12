import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const LevelUpModal = () => {
  const { gameState, closeLevelUp } = useGame();
  const { showLevelUp, player } = gameState;

  return (
    <AnimatePresence>
      {showLevelUp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-base/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="relative w-full max-w-sm bg-surface-card rounded-2xl p-space-xl flex flex-col items-center text-center shadow-[0_0_60px_rgba(160,120,255,0.3)] border border-primary/30"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,120,255,0.15),transparent_70%)] pointer-events-none rounded-2xl"></div>
            
            <div className="relative w-24 h-24 mb-space-md flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-20"></div>
              <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-stat-display text-stat-display text-[40px] shadow-[0_0_20px_#a078ff]">
                {player.level}
              </div>
            </div>
            
            <span className="font-label-rpg text-label-rpg text-primary tracking-widest uppercase mb-1">
              Rank Advancement
            </span>
            <h2 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">
              Level Up!
            </h2>
            <p className="font-body-md text-body-md text-text-secondary mt-space-sm mb-space-lg">
              Your capacity increases. New paths and advanced protocols are now accessible.
            </p>
            
            <button 
              onClick={closeLevelUp}
              className="w-full px-space-md py-space-sm rounded bg-primary hover:bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider transition-colors shadow-md"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
