import React from 'react';
import { motion } from 'framer-motion';

export const BossStages = ({ stages }) => {
  if (!stages || stages.length === 0) return null;

  const currentStage = stages.find(s => s.status === 'current');
  const completedCount = stages.filter(s => s.status === 'completed').length;

  return (
    <div className="flex flex-col gap-space-lg">
      
      {/* Current Objective Callout */}
      {currentStage && (
        <div className="bg-primary/5 border border-primary/30 rounded-xl p-space-md shadow-[0_0_24px_rgba(139,92,246,0.1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
           <div className="flex flex-col gap-1">
             <span className="font-label-rpg-sm text-label-rpg-sm text-primary uppercase tracking-widest flex items-center gap-1">
               <span className="material-symbols-outlined text-[14px]">track_changes</span> Current Objective
             </span>
             <h3 className="font-headline-md text-text-primary uppercase">{currentStage.name}</h3>
             <p className="font-body-sm text-text-secondary">{currentStage.objective}</p>
           </div>
           
           <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
             <div className="flex gap-2 font-stat-display-sm text-[14px]">
               <span className="text-secondary">+{currentStage.rewardXP} XP</span>
               <span className="text-[#FFD700]">+{currentStage.rewardGold} GOLD</span>
             </div>
             <button className="px-4 py-2 bg-surface-deck hover:bg-primary/20 border border-primary text-primary rounded font-label-rpg uppercase transition-colors">
               View Quest
             </button>
           </div>
        </div>
      )}

      {/* Progression Path */}
      <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md">
        <div className="flex justify-between items-center mb-space-md">
           <h4 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider">Battle Stages</h4>
           <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest">{completedCount} of {stages.length} Stages Complete</span>
        </div>
        
        <div className="flex items-center w-full gap-2 overflow-x-auto scrollbar-hide py-2">
          {stages.map((stage, index) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isLocked = stage.status === 'locked';
            
            let color = 'text-text-muted border-border-subtle bg-surface-deck';
            let icon = 'lock';
            
            if (isCompleted) {
              color = 'text-vitality-emerald border-vitality-emerald bg-vitality-emerald/10 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
              icon = 'check_circle';
            } else if (isCurrent) {
              color = 'text-primary border-primary bg-primary/10 shadow-[0_0_12px_rgba(139,92,246,0.4)]';
              icon = 'adjust';
            }

            return (
              <React.Fragment key={stage.id}>
                {/* Node */}
                <div className={`flex flex-col items-center gap-2 shrink-0 min-w-[100px]`}>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${color}`}>
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </div>
                  <span className={`font-label-rpg-sm text-[10px] text-center uppercase tracking-widest ${isCurrent ? 'text-primary' : isCompleted ? 'text-vitality-emerald' : 'text-text-muted'}`}>
                    {stage.name}
                  </span>
                </div>
                
                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="flex-1 min-w-[30px] h-0.5 bg-border-subtle relative shrink-0 -translate-y-4">
                    {(isCompleted || (stages[index+1].status === 'current' && isCompleted)) && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="absolute inset-0 bg-vitality-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

    </div>
  );
};
