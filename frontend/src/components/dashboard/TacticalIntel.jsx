import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { getBossPhase } from '../../services/bossService';
import { ACHIEVEMENTS } from '../../data/achievements';
import { getAchievementProgress } from '../../services/achievementService';
import { CODEX_ENTRIES } from '../../data/codex';
import { encounterService } from '../../services/api/encounterService';

export const TacticalIntel = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { bosses, activeBossId, dailyProgress, journal, player } = gameState;
  const recentActivity = journal?.events?.slice(0, 3) || [];
  
  const [encounter, setEncounter] = useState(null);
  const [isEncounterLoading, setIsEncounterLoading] = useState(true);
  const [encounterActionState, setEncounterActionState] = useState(null);

  useEffect(() => {
    const fetchEncounter = async () => {
      try {
        const data = await encounterService.getDailyEncounter();
        setEncounter(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsEncounterLoading(false);
      }
    };
    fetchEncounter();
  }, []);

  const handleAcceptEncounter = async () => {
    setEncounterActionState('loading');
    const data = await encounterService.acceptEncounter();
    setEncounter(data);
    setEncounterActionState(null);
  };

  const handleDismissEncounter = async () => {
    setEncounterActionState('loading');
    await encounterService.dismissEncounter();
    setEncounter(null);
    setEncounterActionState(null);
  };
  
  const activeBoss = bosses?.find(b => b.id === activeBossId);

  // Derived state for previews
  const latestAchievement = ACHIEVEMENTS.map(ach => ({
    ...ach,
    progress: getAchievementProgress(gameState, ach)
  }))
  .filter(a => a.progress.highestUnlockedLevel > 0)
  .sort((a, b) => b.progress.highestUnlockedLevel - a.progress.highestUnlockedLevel)[0];

  const latestDiscoveryId = gameState.codex.discovered[gameState.codex.discovered.length - 1];
  const latestDiscovery = CODEX_ENTRIES.find(e => e.id === latestDiscoveryId);

  return (
    <div className="flex flex-col gap-space-lg w-full">
      
      {/* Daily Adventure / Random Encounter */}
      {!isEncounterLoading && encounter && encounter.status === 'available' && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-card rounded-xl p-space-md border border-secondary/50 shadow-[0_0_20px_rgba(3,218,197,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className="font-label-rpg text-label-rpg text-secondary tracking-widest uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">swords</span> Daily Adventure
              </span>
              <span className="font-label-rpg-sm text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded uppercase">
                Optional
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-primary mb-3 relative z-10">
              {encounter.objective}
            </p>
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="font-label-rpg-sm text-label-rpg-sm text-primary flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">bolt</span> +{encounter.xpReward} XP
              </span>
              <span className="font-label-rpg-sm text-label-rpg-sm text-tertiary flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">monetization_on</span> +{encounter.goldReward} G
              </span>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <button 
                onClick={handleDismissEncounter}
                disabled={encounterActionState === 'loading'}
                className="flex-1 py-1.5 rounded border border-border-subtle text-text-muted hover:text-text-primary hover:bg-surface-overlay font-label-rpg-sm uppercase transition-colors disabled:opacity-50"
              >
                Later
              </button>
              <button 
                onClick={handleAcceptEncounter}
                disabled={encounterActionState === 'loading'}
                className="flex-1 py-1.5 rounded bg-secondary text-on-secondary font-label-rpg-sm uppercase hover:bg-[#02b3a1] transition-colors disabled:opacity-50 flex justify-center items-center gap-1"
              >
                {encounterActionState === 'loading' ? '...' : 'Accept'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Daily Progress */}
      <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-rpg text-label-rpg text-text-secondary tracking-widest uppercase">Daily Adventure</span>
          <span className="font-stat-display-sm text-stat-display-sm text-primary">
            {dailyProgress.completed} / {dailyProgress.total}
          </span>
        </div>
        <div className="w-full flex gap-1 h-2">
          {Array.from({ length: dailyProgress.total }).map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-full h-full ${i < dailyProgress.completed ? 'bg-primary shadow-[0_0_8px_rgba(208,188,255,0.4)]' : 'bg-surface-deck'}`}
            ></div>
          ))}
        </div>
        <p className="font-body-sm text-body-sm text-text-muted mt-space-sm">
          {dailyProgress.completed === dailyProgress.total 
            ? "Daily protocol complete. Neural rest advised." 
            : "Complete quests to fulfill daily protocol."}
        </p>
      </div>

      {/* Current Chapter & Boss Progress */}
      <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span> Current Boss
            </span>
            {activeBoss ? (
              <h3 className="font-headline-lg text-headline-lg text-hazard-crimson uppercase">
                {activeBoss.name}
              </h3>
            ) : (
              <h3 className="font-headline-lg text-headline-lg text-text-muted uppercase">
                None Active
              </h3>
            )}
          </div>
          
          {activeBoss && (
            <div className="flex items-center gap-space-md">
              <div className="flex flex-col items-end">
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Health</span>
                <span className="font-stat-display-sm text-stat-display-sm text-text-primary">
                  {activeBoss.hp} <span className="text-text-muted text-sm">/ {activeBoss.maxHp}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {activeBoss ? (
          <>
            <div className="w-full h-2 bg-surface-base rounded-full overflow-hidden mt-space-sm border border-border-subtle">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(activeBoss.hp / activeBoss.maxHp) * 100}%` }}
                className="h-full bg-hazard-crimson shadow-[0_0_8px_rgba(255,82,82,0.6)]"
              />
            </div>

            <div className="flex items-center gap-2 font-label-rpg-sm text-label-rpg-sm text-text-secondary mt-space-xs uppercase">
              <span>Phase {getBossPhase(activeBoss.hp, activeBoss.maxHp).num}</span>
              <span className="w-1 h-1 rounded-full bg-text-muted"></span>
              <span>Weaknesses: {activeBoss.weaknesses.join(', ')}</span>
            </div>

            <button 
              onClick={() => navigate('/boss-raids')}
              className="w-full py-3 bg-hazard-crimson hover:bg-red-700 text-white font-label-rpg text-label-rpg uppercase rounded mt-space-md transition-colors"
            >
              Engage Target
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate('/boss-raids')}
            className="w-full py-3 bg-surface-deck hover:bg-surface-overlay text-text-primary border border-border-subtle font-label-rpg text-label-rpg uppercase rounded mt-space-md transition-colors"
          >
            View Target Roster
          </button>
        )}
      </div>

      <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between text-text-secondary mb-2">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px]">history</span>
            <span className="font-label-rpg text-label-rpg uppercase tracking-wider">Recent Adventure</span>
          </div>
          <button onClick={() => navigate('/journal')} className="font-label-rpg-sm text-[10px] text-primary hover:text-primary-hover uppercase tracking-widest transition-colors">
            Open Journal
          </button>
        </div>
        <div className="flex flex-col gap-space-xs">
          {recentActivity.length === 0 ? (
            <span className="font-body-sm text-body-sm text-text-muted">No recent activity detected.</span>
          ) : (
            recentActivity.map((activity) => {
              // Extract primary reward text to show on right side if possible
              let rewardStr = null;
              if (activity.data?.xp) rewardStr = `+${activity.data.xp} XP`;
              else if (activity.data?.damage) rewardStr = `-${activity.data.damage} HP`;
              else if (activity.data?.reward) rewardStr = activity.data.reward;
              
              return (
                <div key={activity.id} className="flex items-start justify-between py-2 border-b border-surface-deck last:border-0 group cursor-pointer hover:bg-surface-deck transition-colors px-2 -mx-2 rounded" onClick={() => navigate('/journal')}>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-text-primary line-clamp-1" title={activity.title}>{activity.title}</span>
                    <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">{activity.type.replace('_', ' ')} · {new Date(activity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  {rewardStr && (
                    <span className="font-label-rpg-sm text-[10px] text-secondary shrink-0 ml-2 mt-1">{rewardStr}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Discovery & Milestones */}
      <div className="flex gap-space-sm w-full">
        {/* Latest Achievement */}
        <div 
          onClick={() => navigate('/achievements')}
          className="flex-1 bg-surface-card rounded-xl p-space-sm border border-border-subtle shadow-md cursor-pointer hover:bg-surface-overlay transition-colors flex flex-col items-center text-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[20px] text-[#FFD700]">military_tech</span>
          <span className="font-label-rpg-sm text-[9px] text-text-muted uppercase tracking-widest">Latest Achievement</span>
          <span className="font-headline-sm text-xs text-text-primary uppercase truncate w-full px-1">
            {latestAchievement ? latestAchievement.title : 'None Yet'}
          </span>
        </div>

        {/* Latest Discovery */}
        <div 
          onClick={() => navigate('/codex')}
          className="flex-1 bg-surface-card rounded-xl p-space-sm border border-border-subtle shadow-md cursor-pointer hover:bg-surface-overlay transition-colors flex flex-col items-center text-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[20px] text-secondary">menu_book</span>
          <span className="font-label-rpg-sm text-[9px] text-text-muted uppercase tracking-widest">New Discovery</span>
          <span className="font-headline-sm text-xs text-text-primary uppercase truncate w-full px-1">
            {latestDiscovery ? latestDiscovery.title : 'None Yet'}
          </span>
        </div>
      </div>

    </div>
  );
};
