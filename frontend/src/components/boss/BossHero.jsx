import React from 'react';
import { motion } from 'framer-motion';
import { getBossPhase } from '../../services/bossService';

export const BossHero = ({ boss }) => {
  if (!boss) return null;

  const phase = getBossPhase(boss.hp, boss.maxHp);
  const hpPercent = Math.max(0, (boss.hp / boss.maxHp) * 100);
  
  let threatColor = "text-hazard-crimson";
  let threatGlow = "shadow-[0_0_24px_rgba(255,82,82,0.15)]";
  
  if (boss.threat === "Moderate") {
    threatColor = "text-secondary";
    threatGlow = "shadow-[0_0_24px_rgba(6,182,212,0.15)]";
  } else if (boss.threat === "Legendary") {
    threatColor = "text-[#ffaa00]";
    threatGlow = "shadow-[0_0_32px_rgba(255,170,0,0.2)]";
  }

  return (
    <div className={`relative bg-surface-card border border-border-subtle rounded-2xl p-space-xl overflow-hidden ${threatGlow} flex flex-col gap-space-lg mb-space-lg`}>
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,82,82,0.05),transparent_70%)] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>

      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <span className="font-label-rpg text-label-rpg text-text-muted tracking-widest uppercase flex items-center gap-2">
          Current Target <span className={`w-2 h-2 rounded-full bg-current ${threatColor} animate-pulse`}></span>
        </span>
        <h1 className="font-headline-xl text-[56px] leading-tight font-extrabold text-text-primary uppercase tracking-tighter drop-shadow-lg">
          {boss.name}
        </h1>
        <h2 className={`font-headline-md text-headline-md ${threatColor} uppercase tracking-widest`}>
          {boss.title}
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-3xl mt-space-md">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Health Points</span>
            <span className="font-stat-display text-stat-display text-text-primary">
              {boss.hp} <span className="text-text-muted text-2xl">/ {boss.maxHp}</span>
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Phase {phase.num}</span>
            <span className={`font-label-rpg text-label-rpg ${threatColor} uppercase`}>{phase.title}</span>
          </div>
        </div>

        <div className="w-full h-6 bg-surface-deck rounded overflow-hidden border border-border-subtle relative p-0.5">
          {/* Damage trailing bar (red background that slowly depletes) */}
          <div className="absolute top-0.5 left-0.5 bottom-0.5 right-0.5 bg-surface-base rounded-sm"></div>
          
          <motion.div 
            initial={{ width: `${hpPercent}%` }}
            animate={{ width: `${hpPercent}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="h-full bg-[linear-gradient(90deg,#ff5252,#8b0000)] relative z-10 rounded-sm overflow-hidden"
          >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:16px_16px]"></div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-space-lg pt-space-lg border-t border-border-subtle mt-4">
        <div>
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest block mb-2">Intel</span>
          <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
            {boss.description}
          </p>
        </div>

        <div>
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest block mb-2">Known Weaknesses</span>
          <div className="flex flex-wrap gap-2">
            {boss.weaknesses.map(w => (
              <div key={w} className="px-3 py-1 bg-surface-deck border border-surface-overlay rounded flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-text-muted">target</span>
                <span className="font-label-rpg text-label-rpg uppercase">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
