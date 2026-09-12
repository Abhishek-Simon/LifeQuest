import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { characterService } from '../services/api/characterService';
import { CharacterHeader } from '../components/character/CharacterHeader';
import { AttributesDetail } from '../components/character/AttributesDetail';
import { PlaystyleCard } from '../components/character/PlaystyleCard';
import { LifeBalance } from '../components/character/LifeBalance';
import { RecentGrowth } from '../components/character/RecentGrowth';

export const Character = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCharacterData = async () => {
      try {
        setIsLoading(true);
        // Fetch all required data concurrently from the service abstraction
        const [character, attributes, playstyle, lifeBalance, progression] = await Promise.all([
          characterService.getCharacter(),
          characterService.getAttributes(),
          characterService.getPlaystyle(),
          characterService.getLifeBalance(),
          characterService.getProgression()
        ]);
        
        if (isMounted) {
          setData({ character, attributes, playstyle, lifeBalance, progression });
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchCharacterData();
    return () => { isMounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl animate-pulse">
        <div className="h-48 bg-surface-deck rounded-2xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="h-64 bg-surface-deck rounded-xl"></div>
            <div className="h-40 bg-surface-deck rounded-xl"></div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="h-48 bg-surface-deck rounded-xl"></div>
            <div className="h-48 bg-surface-deck rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Your character couldn't be loaded.</h2>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 mt-4 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl"
    >
      <div className="flex items-center gap-space-sm mb-space-xs">
        <span className="material-symbols-outlined text-primary text-[24px]">fingerprint</span>
        <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">Identity</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        {/* Left Column (Hero + Attributes + Growth) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <CharacterHeader character={data.character} />
          <AttributesDetail attributes={data.attributes} />
          <RecentGrowth progression={data.progression} />
        </div>

        {/* Right Column (Playstyle + Life Balance) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <PlaystyleCard playstyle={data.playstyle} />
          <LifeBalance lifeBalance={data.lifeBalance} />
        </div>
      </div>
    </motion.div>
  );
};
