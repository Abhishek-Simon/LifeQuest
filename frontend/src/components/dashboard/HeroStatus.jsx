import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { energyService } from '../../services/api/energyService';
import { Avatar } from '../common/Avatar';

export const HeroStatus = () => {
  const { gameState } = useGame();
  const { player } = gameState;
  const navigate = useNavigate();
  
  const [energyState, setEnergyState] = useState(null);

  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const state = await energyService.getEnergyState();
        setEnergyState(state);
      } catch (err) {
        console.error("Failed to load energy state");
      }
    };
    fetchEnergy();
  }, []);
  
  const xpPercentage = Math.min((player.xp / player.nextLevelXp) * 100, 100);

  return (
    <div className="w-full bg-surface-deck rounded-xl p-space-lg shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
        <div className="flex items-center gap-space-md">
          {/* Avatar Ring */}
          <div className="relative group shrink-0">
            {/* Animated border layers */}
            <div className="absolute inset-0 rounded-full border-[3px] border-primary/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-[-4px] rounded-full border border-secondary/20 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[4px] border-primary bg-surface-base p-1 shadow-[0_0_24px_rgba(139,92,246,0.3)] relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface-deck">
                <Avatar src={player.avatar} name={player.name} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Level Badge Overlay */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface-card border border-primary px-4 py-0.5 rounded-full z-20 shadow-lg flex items-center justify-center min-w-[80px]">
              <span className="font-stat-display text-stat-display text-primary whitespace-nowrap">LVL {player.level}</span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest">
              Neural Sync Established
            </span>
            <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
              Welcome back, {player.name}.
            </h1>
            <p className="font-body-md text-body-md text-text-secondary mb-2">
              {player.title} • Your next move awaits.
            </p>
            <button 
              onClick={() => navigate('/character')}
              className="text-primary hover:text-primary-container font-label-rpg-sm uppercase flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">person</span> View Character Profile
            </button>
          </div>
        </div>

        {/* XP HUD and Gold */}
        <div className="flex flex-col gap-space-xs w-full md:w-80">
          <div className="flex items-end justify-between">
            <span className="font-label-rpg text-label-rpg text-text-secondary tracking-widest uppercase">
              Current Rank XP
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-text-primary">
              {player.xp} / <span className="text-text-muted">{player.nextLevelXp}</span>
            </span>
          </div>
          <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden shadow-inner p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full shadow-[0_0_12px_rgba(208,188,255,0.6)]"
            />
          </div>
          
          <div className="flex flex-col gap-2 pt-space-xs">
            <div className="flex items-center justify-between font-label-rpg-sm text-label-rpg-sm">
              <div className="flex items-center gap-1 px-2 py-1 bg-tertiary/10 text-tertiary rounded">
                <span className="material-symbols-outlined text-[14px]">monetization_on</span>
                <span>{player.gold} GOLD</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-vitality-emerald/10 text-vitality-emerald rounded">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>{player.streak} DAY STREAK</span>
              </div>
            </div>
            
            {energyState && (
              <div className="flex flex-col gap-1 px-2 py-1.5 bg-surface-overlay rounded border border-border-subtle mt-1">
                <div className="flex items-center justify-between font-label-rpg-sm text-label-rpg-sm uppercase">
                  <span className={`flex items-center gap-1 ${energyState.isLow ? 'text-hazard-crimson' : 'text-secondary'}`}>
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Energy
                  </span>
                  <span className="font-stat-display-sm text-text-primary">{energyState.current} <span className="text-text-muted">/ {energyState.max}</span></span>
                </div>
                <div className="w-full h-1 bg-surface-base rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(energyState.current / energyState.max) * 100}%` }}
                    className={`h-full ${energyState.isLow ? 'bg-hazard-crimson' : 'bg-secondary'}`}
                  />
                </div>
                {energyState.isLow && (
                  <span className="font-label-rpg-sm text-[10px] text-hazard-crimson uppercase mt-0.5">Low Energy: {energyState.message}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
