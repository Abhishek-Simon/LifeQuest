import React from 'react';
import { motion } from 'framer-motion';

const LoadoutSlot = ({ slotName, item }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase tracking-widest">{slotName}</span>
      <div className={`w-full h-24 rounded-xl border flex flex-col items-center justify-center relative overflow-hidden ${item ? 'border-vitality-emerald/30 bg-surface-deck shadow-sm' : 'border-border-subtle bg-surface-base border-dashed'}`}>
        
        {item ? (
          <>
             <div className="absolute inset-0 opacity-10 bg-vitality-emerald blur-lg"></div>
             <span className="material-symbols-outlined text-[32px] text-vitality-emerald mb-1 relative z-10">{item.preview}</span>
             <span className="font-label-rpg-sm text-[10px] text-text-primary uppercase truncate w-full text-center px-2 relative z-10">{item.name}</span>
          </>
        ) : (
          <>
             <span className="material-symbols-outlined text-[24px] text-text-muted opacity-50 mb-1">add</span>
             <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">Empty</span>
          </>
        )}
      </div>
    </div>
  );
};

export const LoadoutSection = ({ loadout }) => {
  if (!loadout) return null;

  return (
    <div className="bg-surface-card rounded-2xl p-space-lg border border-border-subtle shadow-md w-full">
      <div className="flex items-center gap-2 mb-space-md border-b border-border-subtle pb-space-sm">
        <span className="material-symbols-outlined text-primary text-[20px]">person_check</span>
        <h2 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider">Current Loadout</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        <LoadoutSlot slotName="Avatar" item={loadout.Avatar} />
        <LoadoutSlot slotName="Theme" item={loadout.Theme} />
        <LoadoutSlot slotName="Frame" item={loadout.Frame} />
        <LoadoutSlot slotName="Badge" item={loadout.Badge} />
      </div>
    </div>
  );
};
