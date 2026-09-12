import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const AchievementToast = () => {
  const { gameState, clearAchievementNotification } = useGame();
  
  const notifications = gameState.achievements?.notifications || [];
  const currentNotif = notifications[0];

  useEffect(() => {
    if (currentNotif) {
      const timer = setTimeout(() => {
        clearAchievementNotification();
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentNotif, clearAchievementNotification]);

  if (!currentNotif) return null;

  const { achievement, tier } = currentNotif;

  let rarityColor = "text-text-muted";
  let rarityBorder = "border-border-subtle";
  
  if (achievement.rarity === 'uncommon') { rarityColor = "text-vitality-emerald"; rarityBorder = "border-vitality-emerald/50"; }
  if (achievement.rarity === 'rare') { rarityColor = "text-secondary"; rarityBorder = "border-secondary/50"; }
  if (achievement.rarity === 'epic') { rarityColor = "text-primary"; rarityBorder = "border-primary/50"; }
  if (achievement.rarity === 'legendary') { rarityColor = "text-[#FFD700]"; rarityBorder = "border-[#FFD700]/50"; }

  return (
    <AnimatePresence>
      {currentNotif && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`fixed bottom-6 right-6 z-50 bg-surface-card border ${rarityBorder} shadow-[0_4px_24px_rgba(0,0,0,0.5)] rounded-lg p-space-md flex gap-space-md max-w-sm overflow-hidden`}
        >
          {/* Animated Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>

          <div className={`w-12 h-12 shrink-0 bg-surface-deck border ${rarityBorder} rounded-lg flex items-center justify-center relative z-10`}>
            <span className={`material-symbols-outlined text-[28px] ${rarityColor}`}>
              military_tech
            </span>
          </div>

          <div className="flex flex-col relative z-10 pr-4">
            <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">star</span> Achievement Unlocked
            </span>
            <span className={`font-headline-sm text-sm uppercase truncate ${rarityColor}`}>
              {achievement.title} {achievement.tiers.length > 1 ? `(Tier ${tier.level})` : ''}
            </span>
            {tier.reward && (
              <span className="font-label-rpg-sm text-[11px] text-[#FFD700] uppercase mt-1">
                Reward: +{tier.reward.value} {tier.reward.type}
              </span>
            )}
          </div>
          
          <button 
            onClick={clearAchievementNotification}
            className="absolute top-2 right-2 text-text-muted hover:text-text-primary z-20"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
