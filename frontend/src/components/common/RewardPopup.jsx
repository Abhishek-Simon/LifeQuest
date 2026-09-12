import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { comboService } from '../../services/api/comboService';
import { difficultyService } from '../../services/api/difficultyService';

export const RewardPopup = ({ reward, onClose, questId }) => {
  const [combo, setCombo] = useState(null);
  const [stage, setStage] = useState('reward'); // 'reward' | 'feedback'
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (reward) {
      comboService.getComboState().then(data => {
        if (data && data.active) {
          setCombo(data);
        }
      });
    }
  }, [reward]);

  if (!reward) return null;

  const { xp, gold, attribute, attributeXP, isCritical, bossDamage, bossDefeated, itemDrop, levelUp } = reward;

  const handleContinue = () => {
    if (questId) {
      setStage('feedback');
    } else {
      onClose();
    }
  };

  const handleFeedback = async (feedbackValue) => {
    setIsSubmitting(true);
    try {
      await difficultyService.submitFeedback(questId, feedbackValue);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-space-md"
      >
        <div className="absolute inset-0 bg-surface-base/80 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className={`relative w-full max-w-sm bg-surface-card border rounded-2xl p-space-xl shadow-2xl overflow-hidden ${
            isCritical ? 'border-primary shadow-[0_0_40px_rgba(139,92,246,0.3)]' : 'border-border-subtle'
          }`}
        >
          {isCritical && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          )}

          {bossDefeated && (
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-hazard-crimson via-vitality-emerald to-hazard-crimson animate-pulse" />
          )}

          <div className="flex items-center justify-between mb-4">
            <span className="font-label-rpg text-label-rpg text-primary tracking-widest uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">{stage === 'reward' ? 'verified' : 'neurology'}</span>
              {stage === 'reward' 
                ? (levelUp ? 'LEVEL UP!' : isCritical ? 'CRITICAL SUCCESS' : bossDefeated ? 'BOSS DEFEATED' : 'QUEST COMPLETE')
                : 'CALIBRATE DIFFICULTY'
              }
            </span>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          
          {stage === 'reward' ? (
            <>
              {bossDefeated && (
                <p className="text-center font-label-rpg text-hazard-crimson uppercase tracking-widest mb-4">
                  {bossDefeated.name} destroyed!
                </p>
              )}

              <div className="grid grid-cols-2 gap-space-sm mb-space-lg">
            {levelUp && (
               <div className="col-span-2 flex flex-col items-center justify-center p-space-sm bg-secondary/10 rounded-lg border border-secondary/30 mb-2">
                 <span className="font-label-rpg-sm text-label-rpg-sm text-secondary uppercase mb-1">Evolution Reached</span>
                 <span className="font-stat-display-sm text-stat-display-sm text-secondary">Skill Point +1</span>
               </div>
            )}
            <div className="flex flex-col items-center justify-center p-space-sm bg-surface-deck rounded-lg border border-surface-overlay">
              <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase mb-1">XP Gained</span>
              <span className="font-stat-display-sm text-stat-display-sm text-primary">+{xp}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-space-sm bg-surface-deck rounded-lg border border-surface-overlay">
              <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase mb-1">Gold</span>
              <span className="font-stat-display-sm text-stat-display-sm text-[#FFD700]">+{gold}</span>
            </div>

            {attribute && (
              <div className="col-span-2 flex flex-col items-center justify-center p-space-sm bg-surface-deck rounded-lg border border-surface-overlay">
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase mb-1">{attribute} Increased</span>
                <span className="font-stat-display-sm text-stat-display-sm text-secondary">+{attributeXP || 1} PT</span>
              </div>
            )}
            
            {bossDamage && !bossDefeated && (
              <div className="col-span-2 flex flex-col items-center justify-center p-space-sm bg-hazard-crimson/10 rounded-lg border border-hazard-crimson/30">
                <span className="font-label-rpg-sm text-label-rpg-sm text-hazard-crimson uppercase mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">swords</span> Boss Damage
                </span>
                <span className="font-stat-display-sm text-stat-display-sm text-hazard-crimson">-{bossDamage} HP</span>
              </div>
            )}
            
            {itemDrop && (
              <div className="col-span-2 flex flex-col items-center justify-center p-space-sm bg-primary/10 rounded-lg border border-primary/30 relative overflow-hidden mt-2">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:16px_16px]"></div>
                <span className="font-label-rpg-sm text-label-rpg-sm text-primary uppercase mb-1 flex items-center gap-1 relative z-10">
                  <span className="material-symbols-outlined text-[14px]">star</span> Item Acquired
                </span>
                <span className="font-stat-display-sm text-stat-display-sm text-primary relative z-10">{itemDrop.name}</span>
                <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase relative z-10">{itemDrop.rarity} {itemDrop.category}</span>
              </div>
            )}
          </div>

          {combo && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-primary-container/20 border border-primary/40 rounded-lg p-space-sm flex flex-col items-center justify-center mb-space-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]"></div>
              <span className="font-headline-md text-primary uppercase tracking-widest relative z-10">{combo.multiplier}× COMBO</span>
              <span className="font-label-rpg-sm text-secondary uppercase relative z-10">+{combo.bonusXp} BONUS XP</span>
            </motion.div>
          )}

          <button 
            onClick={handleContinue}
            className="w-full py-3 bg-primary text-on-primary font-label-rpg uppercase rounded hover:bg-primary-container transition-colors shadow-[0_0_16px_rgba(139,92,246,0.3)]"
          >
            Continue
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center text-center py-space-md">
          <p className="font-body-md text-text-secondary mb-space-lg">How did this quest feel?</p>
          <div className="flex flex-col gap-space-sm w-full">
            <button 
              disabled={isSubmitting}
              onClick={() => handleFeedback('too_easy')}
              className="w-full py-2 bg-surface-deck border border-border-subtle rounded text-text-primary font-label-rpg-sm uppercase hover:bg-surface-overlay hover:border-secondary transition-colors"
            >
              Too Easy
            </button>
            <button 
              disabled={isSubmitting}
              onClick={() => handleFeedback('just_right')}
              className="w-full py-2 bg-surface-deck border border-border-subtle rounded text-text-primary font-label-rpg-sm uppercase hover:bg-surface-overlay hover:border-primary transition-colors"
            >
              Just Right
            </button>
            <button 
              disabled={isSubmitting}
              onClick={() => handleFeedback('too_hard')}
              className="w-full py-2 bg-surface-deck border border-border-subtle rounded text-text-primary font-label-rpg-sm uppercase hover:bg-surface-overlay hover:border-hazard-crimson transition-colors"
            >
              Too Hard
            </button>
          </div>
          <button 
            onClick={onClose}
            className="mt-space-md text-text-muted hover:text-text-primary font-label-rpg-sm uppercase underline decoration-text-muted/50 underline-offset-2 transition-colors"
          >
            Skip
          </button>
        </div>
      )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
