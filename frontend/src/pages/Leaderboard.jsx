import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leaderboardService } from '../services/api/leaderboardService';
import { LeaderboardRow } from '../components/leaderboard/LeaderboardRow';

export const Leaderboard = () => {
  const [period, setPeriod] = useState('weekly');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async (selectedPeriod) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await leaderboardService.getLeaderboard(selectedPeriod);
      setData(result);
    } catch (err) {
      setError("We couldn't load the rankings right now.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(period);
  }, [period]);

  const periods = [
    { id: 'weekly', label: 'THIS WEEK' },
    { id: 'monthly', label: 'THIS MONTH' },
    { id: 'all_time', label: 'ALL TIME' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-space-lg">
      
      {/* Header */}
      <div className="flex flex-col gap-space-xs">
        <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight uppercase">Leaderboard</h1>
        <p className="font-body-md text-body-md text-text-secondary">See how your progress compares.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-space-sm border-b border-border-subtle overflow-x-auto scrollbar-hide pb-1">
        {periods.map(p => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`px-4 py-2 font-label-rpg uppercase transition-colors whitespace-nowrap relative ${period === p.id ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}
          >
            {p.label}
            {period === p.id && (
              <motion.div 
                layoutId="activePeriodTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-space-md pb-32">
        {isLoading ? (
          // Skeleton loader
          Array(5).fill(0).map((_, i) => (
            <div key={`skel-${i}`} className="w-full h-20 bg-surface-deck border border-border-subtle rounded-lg animate-pulse" />
          ))
        ) : error ? (
          // Error state
          <div className="flex flex-col items-center justify-center py-space-3xl text-center">
            <span className="material-symbols-outlined text-[48px] text-hazard-crimson mb-space-md opacity-80">error</span>
            <h3 className="font-headline-md text-headline-md text-text-primary uppercase mb-space-sm">Leaderboard Unavailable</h3>
            <p className="font-body-md text-body-md text-text-secondary mb-space-lg">{error}</p>
            <button 
              onClick={() => fetchLeaderboard(period)}
              className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded font-label-rpg uppercase transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : !data || data.entries.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-space-3xl text-center border border-border-subtle bg-surface-deck rounded-lg">
            <span className="material-symbols-outlined text-[48px] text-text-muted mb-space-md">leaderboard</span>
            <h3 className="font-headline-md text-headline-md text-text-primary uppercase mb-space-sm">Leaderboard is just getting started</h3>
            <p className="font-body-md text-body-md text-text-secondary">Complete quests to appear on the board.</p>
          </div>
        ) : (
          // List
          <AnimatePresence mode="wait">
            <motion.div 
              key={period}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2"
            >
              {data.entries.map(entry => (
                <LeaderboardRow key={entry.userId} entry={entry} isCurrentUser={entry.isCurrentUser} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Sticky Current User Context */}
      {!isLoading && !error && data?.currentUser && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface-card/95 backdrop-blur-md border-t border-border-subtle p-space-md z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-space-md">
              <div className="flex flex-col">
                <span className="font-label-rpg text-label-rpg text-text-secondary uppercase">Your Current Rank</span>
                <span className="font-headline-lg text-headline-lg text-primary">#{data.currentUser.rank}</span>
              </div>
              
              {data.currentUser.xpToNextRank > 0 && (
                <div className="hidden sm:flex flex-col border-l border-border-subtle pl-space-md ml-space-xs">
                  <span className="font-label-rpg text-label-rpg text-text-secondary uppercase">Next Rank In</span>
                  <span className="font-stat-display-sm text-stat-display-sm text-warm-gold">{data.currentUser.xpToNextRank.toLocaleString()} XP</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-end">
              <span className="font-label-rpg text-label-rpg text-text-secondary uppercase">Your Progress</span>
              <span className="font-stat-display-sm text-stat-display-sm text-vitality-emerald">+{data.currentUser.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};
