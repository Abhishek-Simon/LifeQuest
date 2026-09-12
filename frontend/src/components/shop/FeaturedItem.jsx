import React from 'react';

export const FeaturedItem = ({ item, onAcquireClick }) => {
  if (!item) return null;

  // Determine rarity colors
  let rarityColor = "text-text-muted";
  let rarityBg = "bg-surface-deck";
  let rarityBorder = "border-border-subtle";
  
  if (item.rarity === 'uncommon') { rarityColor = "text-vitality-emerald"; rarityBorder = "border-vitality-emerald/50"; }
  if (item.rarity === 'rare') { rarityColor = "text-secondary"; rarityBorder = "border-secondary/50"; rarityBg = "bg-secondary/5"; }
  if (item.rarity === 'epic') { rarityColor = "text-primary"; rarityBorder = "border-primary/50"; rarityBg = "bg-primary/5"; }
  if (item.rarity === 'legendary') { rarityColor = "text-[#FFD700]"; rarityBorder = "border-[#FFD700]/50"; rarityBg = "bg-[#FFD700]/5"; }

  return (
    <div className="flex flex-col mb-space-xl">
      <span className="font-label-rpg text-label-rpg text-[#FFD700] uppercase tracking-wider flex items-center gap-2 mb-space-sm">
        <span className="material-symbols-outlined text-[16px]">stars</span> Recommended For You
      </span>
      
      <div className={`relative w-full rounded-2xl border ${rarityBorder} ${rarityBg} overflow-hidden shadow-lg p-space-xl flex flex-col md:flex-row items-center gap-space-xl`}>
        {/* Background Decal */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.05),transparent_70%)] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
        
        <div className={`w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-xl bg-surface-base border ${rarityBorder} flex items-center justify-center relative z-10 shadow-[0_0_24px_rgba(0,0,0,0.5)]`}>
          <span className={`material-symbols-outlined text-[64px] md:text-[96px] ${rarityColor}`}>
            {item.category === 'relic' ? 'diamond' : 'token'}
          </span>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-label-rpg-sm uppercase tracking-widest ${rarityColor}`}>{item.rarity}</span>
            <span className="text-text-muted">•</span>
            <span className="font-label-rpg-sm uppercase tracking-widest text-text-muted">{item.category}</span>
          </div>
          
          <h2 className="font-headline-xl text-[40px] leading-tight text-text-primary uppercase tracking-tight mb-2">
            {item.name}
          </h2>
          
          <p className="font-body-md text-text-secondary italic mb-space-md max-w-xl">
            "{item.description}"
          </p>

          <div className="w-full max-w-md bg-surface-base/80 border border-surface-overlay rounded-lg p-space-sm mb-space-lg flex items-center justify-center md:justify-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span>
            <span className="font-body-sm text-text-primary">{item.bonus.description}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-space-md w-full max-w-md">
            <span className="font-stat-display text-stat-display text-[#FFD700] flex items-center gap-2">
              {item.price} <span className="font-label-rpg text-label-rpg mt-1">GOLD</span>
            </span>
            <button 
              onClick={() => onAcquireClick(item)}
              className="flex-1 w-full py-3 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50 rounded font-label-rpg uppercase transition-colors flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
              Acquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
