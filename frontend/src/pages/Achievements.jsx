import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { achievementService } from '../services/api/achievementService';
import { AchievementCard } from '../components/achievements/AchievementCard';
import { AchievementDetail } from '../components/achievements/AchievementDetail';

const TIER_FILTERS = ['All', 'Bronze', 'Silver', 'Gold', 'Mythic'];
const STATUS_FILTERS = ['All', 'Unlocked', 'In Progress', 'Locked'];

export const Achievements = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const achievements = await achievementService.getAchievements();
        if (isMounted) setData(achievements);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(ach => {
      const matchStatus = statusFilter === 'All' || 
                         (statusFilter === 'Unlocked' && ach.status === 'unlocked') ||
                         (statusFilter === 'In Progress' && ach.status === 'in_progress') ||
                         (statusFilter === 'Locked' && ach.status === 'locked');
      
      const matchTier = tierFilter === 'All' || ach.tier === tierFilter;
      
      return matchStatus && matchTier;
    });
  }, [data, statusFilter, tierFilter]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl animate-pulse px-space-md lg:px-0">
        <div className="h-32 bg-surface-deck rounded-2xl w-full"></div>
        <div className="h-12 bg-surface-deck rounded-lg w-full max-w-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md mt-4">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-48 bg-surface-deck rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Achievements Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't load your achievement collection.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-[64px] text-text-muted mb-space-sm opacity-50">military_tech</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2 uppercase">Your Trophies Are Waiting</h2>
        <p className="font-body-md text-text-secondary">Complete quests and milestones to build your collection.</p>
      </div>
    );
  }

  const unlockedCount = data.filter(a => a.status === 'unlocked').length;
  const inProgressCount = data.filter(a => a.status === 'in_progress').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl relative"
    >
      {/* HEADER & SUMMARY */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md px-space-md lg:px-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#FFD700] text-[28px]">military_tech</span>
            <h1 className="font-headline-xl text-headline-xl text-text-primary uppercase tracking-tight">
              Achievements
            </h1>
          </div>
          <p className="font-body-lg text-body-lg text-text-secondary">
            Track the milestones that define your adventure.
          </p>
        </div>

        {/* Compact Summary */}
        <div className="flex gap-space-md bg-surface-card p-space-sm rounded-lg border border-border-subtle shrink-0">
          <div className="flex flex-col items-center px-space-md border-r border-border-subtle">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Unlocked</span>
            <span className="font-stat-display-sm text-[#FFD700]">{unlockedCount}</span>
          </div>
          <div className="flex flex-col items-center px-space-md border-r border-border-subtle">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">In Progress</span>
            <span className="font-stat-display-sm text-secondary">{inProgressCount}</span>
          </div>
          <div className="flex flex-col items-center px-space-md">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Total</span>
            <span className="font-stat-display-sm text-text-primary">{data.length}</span>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col gap-space-sm px-space-md lg:px-0 mt-space-sm">
        <div className="flex flex-col sm:flex-row gap-space-md border-b border-border-subtle pb-space-md">
          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {STATUS_FILTERS.map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
                  statusFilter === status 
                    ? 'bg-text-primary text-surface-base' 
                    : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px bg-border-subtle"></div>

          {/* Tier Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {TIER_FILTERS.map(tier => (
              <button 
                key={tier}
                onClick={() => setTierFilter(tier)}
                className={`px-4 py-1.5 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
                  tierFilter === tier 
                    ? 'bg-text-primary text-surface-base' 
                    : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="px-space-md lg:px-0">
        {filteredData.length === 0 ? (
          <div className="w-full text-center py-space-xl text-text-muted font-body-md italic">
            No achievements match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
            {filteredData.map(ach => (
              <AchievementCard 
                key={ach.id} 
                achievement={ach} 
                onClick={() => setSelectedAchievement(ach)} 
              />
            ))}
          </div>
        )}
      </div>

      {selectedAchievement && (
        <AchievementDetail achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} />
      )}
    </motion.div>
  );
};
