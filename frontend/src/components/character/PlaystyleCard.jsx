import React from 'react';

export const PlaystyleCard = ({ playstyle }) => {
  if (!playstyle) return null;

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-primary/30 shadow-[0_4px_24px_rgba(139,92,246,0.15)] flex flex-col gap-space-sm relative overflow-hidden">
      <div className="absolute -right-10 -top-10 text-[120px] text-primary/5 material-symbols-outlined pointer-events-none">
        explore
      </div>
      
      <span className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-widest flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[16px]">account_tree</span>
        Active Playstyle
      </span>
      
      <h3 className="font-headline-lg text-headline-lg text-primary uppercase mt-1">
        The {playstyle.name}
      </h3>
      
      <p className="font-body-md text-body-md text-text-secondary mt-2">
        {playstyle.description}
      </p>

      {playstyle.traits && playstyle.traits.length > 0 && (
        <div className="mt-space-sm flex flex-wrap gap-2">
          {playstyle.traits.map(trait => (
            <span key={trait} className="px-2 py-1 rounded bg-surface-deck border border-surface-overlay text-text-primary font-label-rpg-sm uppercase">
              {trait}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
