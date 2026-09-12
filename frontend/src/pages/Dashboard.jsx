import React from 'react';
import { HeroStatus } from '../components/dashboard/HeroStatus';
import { NextQuestCard } from '../components/dashboard/NextQuestCard';
import { AttributesPanel } from '../components/dashboard/AttributesPanel';
import { TacticalIntel } from '../components/dashboard/TacticalIntel';
import { RewardPopup } from '../components/common/RewardPopup';
import { LevelUpModal } from '../components/common/LevelUpModal';

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
            <TacticalIntel />
          </div>

        </div>
      </div>
    </>
  );
};
