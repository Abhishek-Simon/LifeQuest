import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weeklyService } from '../services/api/weeklyService';

export const WeeklyAdventure = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await weeklyService.getWeeklyReport();
        setReport(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-space-lg animate-pulse">
        <div className="h-16 bg-surface-card rounded-xl"></div>
        <div className="h-48 bg-surface-card rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="h-32 bg-surface-card rounded-xl"></div>
          <div className="h-32 bg-surface-card rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-space-xl text-center">
        <span className="material-symbols-outlined text-[48px] text-hazard-crimson mb-space-md">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Weekly Adventure Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-lg max-w-md">We couldn't load your weekly progress.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors hover:bg-primary-hover"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { summary, bossProgress, attributes, lifeBalance, personalRecords, nextWeekRecommendations, insight, dateRange } = report;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-space-xl pb-space-xl"
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-headline-xl text-headline-xl text-text-primary uppercase tracking-tight">Weekly Adventure</h1>
        <div className="flex items-center justify-between text-text-muted">
          <p className="font-body-lg text-body-lg">Your journey this week.</p>
          <span className="font-label-rpg text-label-rpg uppercase tracking-widest">{dateRange}</span>
        </div>
      </div>

      {/* Hero Summary */}
      <section className="bg-surface-card rounded-xl p-space-lg shadow-lg border border-border-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-widest mb-space-lg border-b border-border-subtle pb-2">Hero Summary</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          <div className="flex flex-col gap-1">
            <span className="font-label-rpg-sm text-text-secondary uppercase">XP Earned</span>
            <span className="font-stat-display text-primary">{summary.xpEarned}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-rpg-sm text-text-secondary uppercase">Quests Completed</span>
            <span className="font-stat-display text-text-primary">{summary.questsCompleted}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-rpg-sm text-text-secondary uppercase">Gold Earned</span>
            <span className="font-stat-display text-[#FFD700]">{summary.goldEarned}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-rpg-sm text-text-secondary uppercase">Current Streak</span>
            <span className="font-stat-display text-vitality-emerald">{summary.currentStreak}</span>
          </div>
        </div>
      </section>

      {/* Key Progress Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {/* Boss Progress */}
        <section className="col-span-1 md:col-span-2 bg-surface-card rounded-xl p-space-md shadow-md border border-border-subtle flex flex-col justify-center">
          <h3 className="font-label-rpg-sm text-text-muted uppercase tracking-widest mb-4">Boss Progress: {bossProgress.name}</h3>
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-rpg text-text-primary uppercase tracking-widest">{bossProgress.progress}% Defeated</span>
          </div>
          <div className="w-full h-2 bg-surface-deck rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${bossProgress.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-hazard-crimson"
            />
          </div>
        </section>

        {/* Life Balance */}
        <section className="col-span-1 bg-surface-card rounded-xl p-space-md shadow-md border border-border-subtle flex flex-col items-center justify-center text-center">
          <h3 className="font-label-rpg-sm text-text-muted uppercase tracking-widest mb-2">Life Balance</h3>
          <span className="font-stat-display-sm text-text-primary mb-1">{lifeBalance}</span>
          <span className="font-label-rpg-sm text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded">Balanced</span>
        </section>
      </div>

      {/* Attributes & Insight */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        <div className="bg-surface-card rounded-xl p-space-md shadow-md border border-border-subtle flex flex-col gap-space-md">
          <h3 className="font-label-rpg-sm text-text-muted uppercase tracking-widest border-b border-border-subtle pb-2">Attribute Development</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-rpg-sm text-vitality-emerald uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> Strongest
              </span>
              <span className="font-headline-sm text-text-primary uppercase">{attributes.strongest.name}</span>
            </div>
            <span className="font-stat-display-sm text-secondary">+{attributes.strongest.gainedXp} XP</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle/50">
            <div className="flex flex-col">
              <span className="font-label-rpg-sm text-hazard-crimson uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span> Weakest
              </span>
              <span className="font-headline-sm text-text-primary uppercase">{attributes.weakest.name}</span>
            </div>
            <span className="font-stat-display-sm text-text-muted">+{attributes.weakest.gainedXp} XP</span>
          </div>
        </div>

        <div className="bg-surface-card rounded-xl p-space-md shadow-md border border-border-subtle flex flex-col justify-center">
          <h3 className="font-label-rpg-sm text-text-muted uppercase tracking-widest mb-space-sm">Weekly Insight</h3>
          <p className="font-body-md text-text-primary leading-relaxed border-l-2 border-primary pl-space-sm">
            "{insight}"
          </p>
        </div>
      </section>

      {/* Personal Records */}
      <section className="bg-surface-card rounded-xl p-space-lg shadow-md border border-border-subtle">
        <h2 className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-widest mb-space-md border-b border-border-subtle pb-2">Personal Records</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          {personalRecords.map((record, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex flex-col p-space-sm bg-surface-deck rounded-lg border border-border-subtle items-center text-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-secondary text-[20px] mb-1">emoji_events</span>
              <span className="font-label-rpg-sm text-[10px] text-text-secondary uppercase tracking-wider">{record.label}</span>
              <span className="font-stat-display-sm text-text-primary">{record.value}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Week's Adventure */}
      <section className="bg-surface-card rounded-xl p-space-lg shadow-md border border-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
        <h2 className="font-label-rpg text-label-rpg text-secondary uppercase tracking-widest mb-space-md flex items-center gap-2 relative z-10">
          <span className="material-symbols-outlined text-[18px]">explore</span> Next Week's Adventure
        </h2>
        <ul className="flex flex-col gap-space-sm relative z-10">
          {nextWeekRecommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
              <span className="font-body-md text-text-primary">{rec}</span>
            </li>
          ))}
        </ul>
      </section>

    </motion.div>
  );
};
