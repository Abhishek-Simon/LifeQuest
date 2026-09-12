import React from 'react';
import { HeroStatus } from '../components/dashboard/HeroStatus';
import { NextQuestCard } from '../components/dashboard/NextQuestCard';
import { AttributesPanel } from '../components/dashboard/AttributesPanel';
import { TacticalIntel } from '../components/dashboard/TacticalIntel';
import { RewardPopup } from '../components/common/RewardPopup';
import { LevelUpModal } from '../components/common/LevelUpModal';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg relative">
        <RewardPopup />
        <LevelUpModal />
        
        {/* Top: Hero Status */}
        <HeroStatus />

        {/* Main Grid: 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          
          {/* Left/Center Deck: Quest & Attributes (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-text-primary">Your Next Quest</h2>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-wider">Priority Targeting</span>
              </div>
              <NextQuestCard />
            </div>

            <AttributesPanel />
          </div>

          {/* Right Rail: Tactical Intel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            
            {/* Leaderboard Teaser */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-space-md flex flex-col gap-space-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-warm-gold">social_leaderboard</span>
                  <span className="font-label-rpg text-label-rpg text-text-primary uppercase">Leaderboard</span>
                </div>
                <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase tracking-wider">This Week</span>
              </div>
              <div className="flex items-end justify-between mt-2 z-10">
                <div className="flex flex-col">
                  <span className="font-headline-lg text-[32px] text-primary leading-none">#3</span>
                  <span className="font-label-rpg-sm text-text-secondary uppercase mt-1">Your Rank</span>
                </div>
                <Link to="/leaderboard" className="text-[12px] font-label-rpg text-primary hover:text-primary-light uppercase tracking-wider flex items-center gap-1 transition-colors">
                  View Board <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            <TacticalIntel />
          </div>

        </div>
      </div>
    </>
  );
};
