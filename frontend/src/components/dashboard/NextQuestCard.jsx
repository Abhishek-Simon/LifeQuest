import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { decisionService } from '../../services/api/decisionService';

export const NextQuestCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRerolling, setIsRerolling] = useState(false);
  
  const [showWhy, setShowWhy] = useState(false);
  const [showRerollConfirm, setShowRerollConfirm] = useState(false);

  const fetchRecommendation = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const res = await decisionService.getRecommendation();
      setData(res);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const handleReroll = async () => {
    try {
      setIsRerolling(true);
      setShowRerollConfirm(false);
      const res = await decisionService.rerollQuest();
      setData(res);
      setShowWhy(false); // Reset drawer state on new quest
    } catch (err) {
      // In a real app we might show a toast, but keeping it simple here
      console.error("Reroll failed:", err);
    } finally {
      setIsRerolling(false);
    }
  };

  const handleStartQuest = () => {
    // Navigate to Quest Detail page with the context
    navigate(`/quests/${data.quest.id}`, { state: { decisionContext: data.context } });
  };

  if (isLoading || isRerolling) {
    return (
      <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-space-xl flex flex-col gap-space-md animate-pulse shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="h-6 w-48 bg-surface-deck rounded mb-2"></div>
        <div className="h-10 w-3/4 bg-surface-deck rounded mb-4"></div>
        <div className="h-16 w-full bg-surface-deck rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-surface-card border border-hazard-crimson/30 rounded-xl p-space-xl flex flex-col items-center text-center shadow-[0_8px_32px_rgba(220,38,38,0.1)]">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h3 className="font-headline-md text-text-primary uppercase mb-2">Recommendation Unavailable</h3>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't determine your next quest.</p>
        <div className="flex gap-space-sm">
          <button onClick={fetchRecommendation} className="px-6 py-2 bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg uppercase transition-colors">
            Try Again
          </button>
          <button onClick={() => navigate('/quests')} className="px-6 py-2 bg-surface-deck text-text-primary border border-border-subtle hover:bg-surface-overlay rounded font-label-rpg uppercase transition-colors">
            View Quests
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.quest) {
    return (
      <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-space-xl flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <span className="material-symbols-outlined text-4xl text-text-muted mb-space-sm">explore</span>
        <h3 className="font-headline-md text-text-primary uppercase mb-2">No Quest Recommendation</h3>
        <p className="font-body-md text-text-secondary mb-space-md">You're caught up for now. Check your Quest Board for available missions.</p>
        <button onClick={() => navigate('/quests')} className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors hover:bg-primary-container hover:text-on-primary-container">
          View Quests
        </button>
      </div>
    );
  }

  const { quest, context } = data;

  return (
    <div className="w-full bg-surface-card border border-primary/20 rounded-xl relative overflow-hidden shadow-[0_8px_32px_rgba(139,92,246,0.15)] flex flex-col">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-secondary to-primary-container shadow-[0_0_16px_rgba(139,92,246,0.4)]"></div>
      
      {/* Top Section: What / Reward */}
      <div className="p-space-lg md:p-space-xl flex flex-col md:flex-row gap-space-lg justify-between items-start">
        <div className="flex flex-col gap-space-md w-full md:w-2/3 pl-2">
          
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="px-space-sm py-0.5 rounded bg-primary/10 text-primary font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider border border-primary/20 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">neurology</span> Recommended For You
            </span>
            <span className="px-space-sm py-0.5 rounded bg-surface-deck text-text-muted font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider">
              {quest.difficulty}
            </span>
            <span className="px-space-sm py-0.5 rounded bg-surface-deck text-text-muted font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">schedule</span>
              {quest.duration} MIN
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
              {quest.title}
            </h2>
            <p className="font-body-md text-text-secondary">
              {quest.objective}
            </p>
          </div>

          <div className="flex items-center gap-space-sm mt-space-sm">
            <span className="px-3 py-1.5 rounded bg-primary/10 border border-primary/20 text-primary font-label-rpg flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">bolt</span> +{quest.xpReward || quest.rewards?.xp} XP
            </span>
            <span className="px-3 py-1.5 rounded bg-tertiary/10 border border-tertiary/20 text-tertiary font-label-rpg flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">monetization_on</span> +{quest.goldReward || quest.rewards?.gold} G
            </span>
            <span className="px-3 py-1.5 rounded bg-surface-container-highest text-secondary font-label-rpg-sm text-label-rpg-sm uppercase">
              +{quest.difficulty === 'High' ? 2 : 1} {quest.attribute}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full md:w-1/3 flex flex-col gap-space-sm mt-space-md md:mt-0 items-end justify-center h-full pt-2">
          
          <button 
            onClick={handleStartQuest}
            className="w-full relative py-space-md px-space-lg font-headline-sm uppercase tracking-wider font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(139,92,246,0.25)] flex items-center justify-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary-container hover:shadow-[0_0_32px_rgba(139,92,246,0.5)]"
          >
            Start Quest
          </button>
          
          <div className="w-full flex items-center gap-2">
            <button 
              onClick={() => setShowWhy(!showWhy)}
              className={`flex-1 py-2 rounded border font-label-rpg-sm uppercase transition-colors ${showWhy ? 'bg-surface-overlay text-text-primary border-border-strong' : 'bg-surface-deck text-text-muted border-border-subtle hover:text-text-primary hover:border-border-strong'}`}
            >
              Why This?
            </button>
            <button 
              onClick={() => setShowRerollConfirm(true)}
              className="px-4 py-2 bg-surface-deck text-text-muted border border-border-subtle hover:text-hazard-crimson hover:border-hazard-crimson/30 rounded font-label-rpg-sm uppercase transition-colors"
              title="Reroll Quest"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Why This Quest Drawer */}
      <AnimatePresence>
        {showWhy && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-surface-deck border-t border-border-subtle"
          >
            <div className="p-space-lg flex flex-col gap-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">neurology</span>
                <h3 className="font-label-rpg text-primary uppercase tracking-widest">Why This Quest?</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                <div className="flex flex-col gap-1 border-l-2 border-primary/30 pl-3">
                  <span className="font-label-rpg-sm text-text-muted uppercase">Goal</span>
                  <span className="font-body-sm text-text-primary">{context.goal || 'General Progression'}</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-secondary/30 pl-3">
                  <span className="font-label-rpg-sm text-text-muted uppercase">Progression</span>
                  <span className="font-body-sm text-text-primary">{context.progression || 'Optimal difficulty scaling.'}</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-tertiary/30 pl-3">
                  <span className="font-label-rpg-sm text-text-muted uppercase">Balance</span>
                  <span className="font-body-sm text-text-primary">{context.balance || 'Maintains attribute balance.'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reroll Confirmation Modal Overlay */}
      <AnimatePresence>
        {showRerollConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-background/95 backdrop-blur flex items-center justify-center p-space-md"
          >
            <div className="max-w-sm w-full bg-surface-card border border-border-subtle rounded-xl p-space-lg flex flex-col items-center text-center shadow-2xl">
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
                  onClick={handleReroll}
                  className="flex-1 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                  Reroll Quest
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
