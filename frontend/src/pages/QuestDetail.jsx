import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questService } from '../services/api/questService';
import { RewardPopup } from '../components/common/RewardPopup';

export const QuestDetail = () => {
  const { questId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const decisionContext = location.state?.decisionContext;
  
  const [quest, setQuest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [reward, setReward] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchQuest = async () => {
      try {
        setIsLoading(true);
        const data = await questService.getQuestById(questId);
        if (isMounted) setQuest(data);
      } catch (err) {
        if (isMounted) setError("Quest data corrupted or unavailable.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchQuest();
    return () => { isMounted = false; };
  }, [questId]);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-space-lg animate-pulse">
        <div className="flex items-center gap-4 border-b border-border-subtle pb-space-md">
          <div className="w-10 h-10 bg-surface-deck rounded-full"></div>
          <div className="w-48 h-8 bg-surface-deck rounded"></div>
        </div>
        <div className="h-24 bg-surface-deck rounded-lg"></div>
        <div className="h-32 bg-surface-deck rounded-lg"></div>
        <div className="h-12 bg-surface-deck rounded-lg mt-space-xl"></div>
      </div>
    );
  }

  if (error || !quest) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Transmission Failed</h2>
        <p className="font-body-md text-body-md text-text-secondary mb-space-md">{error}</p>
        <button 
          onClick={() => navigate('/quests')}
          className="px-6 py-2 bg-surface-card border border-border-subtle hover:bg-surface-overlay text-text-primary rounded font-label-rpg uppercase transition-colors"
        >
          Return to Board
        </button>
      </div>
    );
  }

  const isLocked = quest.status === 'locked';

  const handleStartQuest = async () => {
    try {
      setIsSubmitting(true);
      setActionError(null);
      // Optimistic UI Update
      setQuest(prev => ({ ...prev, status: 'active' }));
      
      await questService.startQuest(questId);
    } catch (err) {
      // Rollback on error
      setQuest(prev => ({ ...prev, status: 'available' }));
      setActionError("Couldn't start quest. Check your energy levels.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteQuest = async () => {
    try {
      setIsSubmitting(true);
      setActionError(null);
      
      const response = await questService.completeQuest(questId);
      
      if (response.success) {
        setQuest(prev => ({ ...prev, status: 'completed' }));
        setReward(response.rewards);
      }
    } catch (err) {
      setActionError("We couldn't complete this quest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseReward = () => {
    setReward(null);
    navigate('/quests'); // Return to board after completion
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto flex flex-col gap-space-xl pb-space-xl relative"
    >
      <RewardPopup reward={reward} onClose={handleCloseReward} questId={quest.id} />
      {/* Header */}
      <div className="flex flex-col gap-space-md border-b border-border-subtle pb-space-md">
        <button 
          onClick={() => navigate('/quests')}
          className="self-start flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors font-label-rpg-sm uppercase"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Quest Board
        </button>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">
              {quest.category}
            </span>
            <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded">
              {quest.difficulty}
            </span>
            {isLocked && (
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted bg-surface-overlay px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">lock</span> Locked
              </span>
            )}
            {quest.energyIntensity && (
              <span className="font-label-rpg-sm text-[10px] text-secondary border border-secondary/30 px-1.5 py-0.5 rounded uppercase">
                {quest.energyIntensity} Intensity
              </span>
            )}
          </div>
          <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">
            {quest.title}
          </h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
        <div className="md:col-span-2 flex flex-col gap-space-lg">
          
          {/* Objective */}
          <section className="flex flex-col gap-space-xs">
            <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider">Objective</h2>
            <div className="p-space-md bg-surface-deck border border-border-subtle rounded-lg">
              <p className="font-body-lg text-body-lg text-text-primary leading-relaxed">
                {quest.description}
              </p>
            </div>
          </section>

          {/* Stalled / Failed State */}
          {quest.status === 'stalled' && (
            <section className="flex flex-col gap-space-xs">
              <h2 className="font-label-rpg text-label-rpg text-hazard-crimson uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">warning</span> Quest Stalled
              </h2>
              <div className="p-space-md bg-hazard-crimson/10 border border-hazard-crimson/30 rounded-lg">
                <p className="font-body-md text-text-primary">
                  Your progress is paused. Complete a recovery quest to continue.
                </p>
              </div>
            </section>
          )}

          {/* Why This Quest? (Conditional from Decision Engine) */}
          {decisionContext && (
            <section className="flex flex-col gap-space-xs">
              <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">neurology</span> Decision Engine Context
              </h2>
              <div className="p-space-md bg-surface-card border border-primary/20 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                <div className="flex flex-col gap-1 border-l-2 border-primary/30 pl-2">
                  <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Goal</span>
                  <span className="font-body-sm text-text-primary">{decisionContext.goal || 'General Progression'}</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-secondary/30 pl-2">
                  <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Progression</span>
                  <span className="font-body-sm text-text-primary">{decisionContext.progression || 'Optimal difficulty scaling.'}</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-tertiary/30 pl-2">
                  <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Balance</span>
                  <span className="font-body-sm text-text-primary">{decisionContext.balance || 'Maintains attribute balance.'}</span>
                </div>
              </div>
            </section>
          )}

          {/* Prerequisites */}
          {quest.prerequisite && (
            <section className="flex flex-col gap-space-xs">
              <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider">Requirements</h2>
              <div className="p-space-md bg-surface-deck border border-border-subtle rounded-lg flex flex-col gap-2">
                <div className="flex items-center gap-2 text-text-secondary">
                  <span className={`material-symbols-outlined text-[18px] ${isLocked ? 'text-hazard-crimson' : 'text-vitality-emerald'}`}>
                    {isLocked ? 'close' : 'check'}
                  </span>
                  <span className="font-body-md text-body-md">Complete prerequisite chain</span>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-space-lg">
          {/* Reward */}
          <section className="flex flex-col gap-space-xs">
            <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider">Projected Reward</h2>
            <div className="p-space-md bg-surface-deck border border-primary/30 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.1)] flex flex-col gap-space-sm">
              <div className="flex items-center justify-between border-b border-border-subtle pb-space-sm">
                <span className="font-label-rpg text-label-rpg text-text-secondary">Experience</span>
                <span className="font-stat-display text-stat-display text-primary">+{quest.rewards.xp} XP</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-space-sm">
                <span className="font-label-rpg text-label-rpg text-text-secondary">Currency</span>
                <span className="font-stat-display text-stat-display text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">monetization_on</span> +{quest.rewards.gold} G
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label-rpg text-label-rpg text-text-secondary capitalize">{quest.attribute}</span>
                <span className="font-stat-display-sm text-stat-display-sm text-secondary">+{quest.rewards.attributeXP || 1} PT</span>
              </div>
            </div>
          </section>

          {/* Meta */}
          <section className="flex flex-col gap-space-xs">
            <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider">Mission Parameters</h2>
            <div className="p-space-md bg-surface-deck border border-border-subtle rounded-lg flex flex-col gap-space-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="font-body-sm text-body-sm">Est. Time: {quest.duration} mins</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span className="font-body-sm text-body-sm">Energy Cost: {quest.energyCost}</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Primary Action Footer */}
      <div className="mt-space-lg pt-space-lg border-t border-border-subtle flex flex-col items-end gap-space-sm">
        
        {/* Error Feedback */}
        <AnimatePresence>
          {actionError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 text-hazard-crimson bg-hazard-crimson/10 px-4 py-3 rounded-lg border border-hazard-crimson/20"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span className="font-body-sm text-body-sm">{actionError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLocked ? (
          quest.status === 'completed' ? (
            <button 
              onClick={() => navigate('/quests')}
              className="w-full md:w-auto px-8 py-3 bg-surface-card border border-border-subtle hover:bg-surface-overlay text-text-primary rounded-lg font-label-rpg text-label-rpg uppercase transition-all shadow-sm"
            >
              Return to Board
            </button>
          ) : (
            <button 
              onClick={quest.status === 'active' ? handleCompleteQuest : handleStartQuest}
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-container text-on-primary-container rounded-lg font-label-rpg text-label-rpg uppercase transition-all shadow-[0_0_16px_rgba(139,92,246,0.4)] text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  Processing...
                </>
              ) : (
                quest.status === 'active' ? 'Resume Quest' : 'Start Quest'
              )}
            </button>
          )
        ) : (
          <button disabled className="w-full md:w-auto px-8 py-3 bg-surface-overlay text-text-muted rounded-lg font-label-rpg text-label-rpg uppercase cursor-not-allowed text-center">
            Locked
          </button>
        )}
      </div>

    </motion.div>
  );
};
