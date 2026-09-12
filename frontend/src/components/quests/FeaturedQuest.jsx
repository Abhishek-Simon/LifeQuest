import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { decisionService } from '../../services/api/decisionService';

export const FeaturedQuest = ({ recommendation, onRerollUpdate }) => {
  const [showWhy, setShowWhy] = useState(false);
  const [showRerollConfirm, setShowRerollConfirm] = useState(false);
  const [isRerolling, setIsRerolling] = useState(false);
  const navigate = useNavigate();

  if (!recommendation) return null;
  const { quest, context } = recommendation;

  const handleRerollClick = async () => {
    try {
      setIsRerolling(true);
      setShowRerollConfirm(false);
      const newRec = await decisionService.rerollQuest();
      onRerollUpdate(newRec); // Pass back up to Board to update state
      setShowWhy(false);
    } catch (err) {
      console.error("Reroll failed", err);
      // Let it fail silently on UI for now or we could add a toast.
    } finally {
      setIsRerolling(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-surface-card border border-primary/40 rounded-xl overflow-hidden relative shadow-[0_12px_40px_-10px_rgba(139,92,246,0.3)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className={`p-space-lg flex flex-col gap-space-md relative z-10 transition-opacity ${isRerolling ? 'opacity-50' : 'opacity-100'}`}>
        
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-rpg-sm text-label-rpg-sm text-primary uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">neurology</span> RECOMMENDED FOR YOU
              </span>
              <span className="px-1.5 py-0.5 bg-surface-overlay text-text-muted rounded font-label-rpg-sm text-label-rpg-sm uppercase">
                {quest.difficulty}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-text-primary mt-1">{quest.title}</h2>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="font-stat-display text-stat-display text-primary leading-none">+{quest.xpReward || quest.rewards?.xp} XP</span>
            <span className="font-label-rpg-sm text-label-rpg-sm text-tertiary uppercase flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[12px]">monetization_on</span> {quest.goldReward || quest.rewards?.gold} Gold
            </span>
          </div>
        </div>

        <p className="font-body-md text-body-md text-text-secondary max-w-2xl">
          {quest.objective || quest.description}
        </p>

        {/* Why This Quest Toggle */}
        <div className="bg-surface-deck rounded border border-border-subtle overflow-hidden">
          <button 
            onClick={() => setShowWhy(!showWhy)}
            className="w-full px-space-sm py-2 flex items-center justify-between hover:bg-surface-overlay transition-colors"
          >
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">help</span> Why This Quest?
            </span>
            <span className={`material-symbols-outlined text-text-muted transition-transform ${showWhy ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          <AnimatePresence>
            {showWhy && context && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-space-md text-body-sm text-text-secondary border-t border-surface-overlay grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <div className="flex flex-col gap-1 border-l-2 border-primary/30 pl-2">
                    <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Goal</span>
                    <span className="text-text-primary">{context.goal}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l-2 border-secondary/30 pl-2">
                    <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Progression</span>
                    <span className="text-text-primary">{context.progression}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l-2 border-tertiary/30 pl-2">
                    <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Balance</span>
                    <span className="text-text-primary">{context.balance}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Meta & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-sm mt-space-sm border-t border-primary/20">
          <div className="flex items-center gap-space-md w-full sm:w-auto text-text-muted font-label-rpg-sm text-label-rpg-sm">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span> {quest.duration}m
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full sm:w-auto">
            <button 
              onClick={() => setShowRerollConfirm(true)}
              className="w-full sm:w-auto px-4 py-2 border border-border-subtle text-text-muted hover:text-text-primary hover:bg-surface-overlay rounded font-label-rpg-sm text-label-rpg-sm uppercase transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span> 
              Reroll
            </button>
            
            <button 
              onClick={() => navigate(`/quests/${quest.id}`, { state: { decisionContext: context } })}
              className="w-full sm:w-auto px-6 py-2 bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg text-label-rpg uppercase transition-all shadow-[0_0_16px_rgba(139,92,246,0.4)] text-center"
            >
              View Quest
            </button>
          </div>
        </div>
      </div>

      {/* Reroll Confirmation Inline Modal */}
      <AnimatePresence>
        {showRerollConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-background/95 backdrop-blur flex items-center justify-center p-space-md"
          >
            <div className="max-w-sm w-full flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-space-sm">refresh</span>
              <h3 className="font-headline-sm text-text-primary uppercase mb-2">Find Another Quest?</h3>
              <p className="font-body-sm text-text-secondary mb-space-lg">We'll look for another action that supports your current goal.</p>
              <div className="flex gap-space-sm w-full">
                <button 
                  onClick={() => setShowRerollConfirm(false)}
                  className="flex-1 py-2 bg-surface-deck text-text-primary border border-border-subtle rounded font-label-rpg uppercase transition-colors hover:bg-surface-overlay"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRerollClick}
                  className="flex-1 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors hover:bg-primary-container"
                >
                  Reroll
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
