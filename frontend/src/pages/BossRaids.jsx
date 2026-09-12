import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bossService } from '../services/api/bossService';
import { BossOverview } from '../components/boss/BossOverview';
import { BossStages } from '../components/boss/BossStages';
import { ChapterProgress } from '../components/boss/ChapterProgress';
import { VictoryModal } from '../components/boss/VictoryModal';

export const BossRaids = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBossData = async () => {
      try {
        setIsLoading(true);
        const bosses = await bossService.getBosses();
        if (isMounted) {
          if (bosses && bosses.length > 0) {
            setData(bosses[0]);
            // If HP is 0 (or progress is 100%), trigger victory state
            if (bosses[0].hp <= 0 || bosses[0].progress >= 100) {
              setShowVictory(true);
            }
          } else {
            setData(null); // Empty state
          }
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchBossData();
    return () => { isMounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl animate-pulse px-space-md lg:px-0">
        <div className="h-64 bg-surface-deck rounded-2xl w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="h-40 bg-surface-deck rounded-xl"></div>
            <div className="h-32 bg-surface-deck rounded-xl"></div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="h-48 bg-surface-deck rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Boss Data Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't load your current challenge.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-text-muted mb-space-sm opacity-50">security</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2 uppercase">No Active Boss</h2>
        <p className="font-body-md text-text-secondary">Your next challenge will appear here.</p>
      </div>
    );
  }

  // Simulate killing the boss manually for testing the UI
  const handleSimulateVictory = () => {
    setData(prev => ({ ...prev, hp: 0, progress: 100 }));
    setShowVictory(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl relative"
    >
      <div className="flex items-center gap-space-sm mb-space-xs px-space-md lg:px-0">
        <span className="material-symbols-outlined text-hazard-crimson text-[24px]">swords</span>
        <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight uppercase">Active Boss</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg px-space-md lg:px-0">
        {/* Left Column (Boss Overview + Stages) */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          <BossOverview boss={data} onSimulateVictory={handleSimulateVictory} />
          <BossStages stages={data.stages} />
        </div>

        {/* Right Column (Chapter Progress + Player Section) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <ChapterProgress chapter={data.chapter} bossName={data.name} />
          
          {/* Compact Player Status */}
          <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md">
            <h4 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-wider mb-space-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">person</span> Current Status
            </h4>
            <div className="flex justify-between items-end border-b border-surface-overlay pb-2 mb-2">
              <span className="font-headline-sm text-text-primary">{data.playerStats.name}</span>
              <span className="font-stat-display-sm text-primary">LVL {data.playerStats.level}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted">
                <span>XP</span>
                <span className="text-text-secondary">{data.playerStats.xp} / {data.playerStats.nextLevelXp}</span>
              </div>
              <div className="w-full h-1 bg-surface-deck rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(data.playerStats.xp / data.playerStats.nextLevelXp) * 100}%` }}></div>
              </div>
              <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted mt-2">
                <span>Dominant Attribute</span>
                <span className="text-vitality-emerald">{data.playerStats.relevantAttribute.name} {data.playerStats.relevantAttribute.value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVictory && (
        <VictoryModal boss={data} onClose={() => setShowVictory(false)} />
      )}
    </motion.div>
  );
};
