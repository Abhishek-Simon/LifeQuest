import React from 'react';
import { useGame } from '../../context/GameContext';

export const ShopGrid = ({ items, onAcquireClick, onDetailsClick }) => {
  const { gameState } = useGame();
  const { inventory } = gameState;

  if (items.length === 0) {
    return (
      <div className="bg-surface-card rounded-2xl border border-border-subtle py-24 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-[48px] text-text-muted opacity-50 mb-4">search_off</span>
        <p className="font-body-md text-text-secondary italic">No items match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
      {items.map(item => {
        const isOwned = inventory.items.some(i => i.itemId === item.id);
        const isLocked = item.source !== 'shop';
        
        let rarityColor = "text-text-muted";
        let rarityBorder = "border-border-subtle";
        let glow = "";
        
        if (item.rarity === 'uncommon') { rarityColor = "text-vitality-emerald"; rarityBorder = "border-vitality-emerald/30"; }
        if (item.rarity === 'rare') { rarityColor = "text-secondary"; rarityBorder = "border-secondary/30"; }
        
        if (item.rarity === 'epic') {
          rarityColor = "text-primary";
          rarityBorder = "border-primary/50";
          glow = "shadow-[0_0_12px_rgba(139,92,246,0.1)]";
        }
        if (item.rarity === 'legendary') {
          rarityColor = "text-[#FFD700]";
          rarityBorder = "border-[#FFD700]/50";
          glow = "shadow-[0_0_16px_rgba(255,215,0,0.15)]";
        }

        return (
          <div 
            key={item.id}
            className={`bg-surface-card rounded-xl border ${rarityBorder} ${glow} overflow-hidden flex flex-col transition-transform hover:-translate-y-1 relative group cursor-pointer`}
            onClick={(e) => {
              // Ensure we don't trigger details if they clicked the exact Acquire button
              if (!e.defaultPrevented) onDetailsClick(item, isOwned);
            }}
          >
            {/* Visual Header */}
            <div className={`h-24 bg-surface-deck border-b ${rarityBorder} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:8px_8px]"></div>
              <span className={`material-symbols-outlined text-[48px] ${rarityColor} relative z-10 transition-transform group-hover:scale-110`}>
                {item.category === 'relic' ? 'diamond' : 'token'}
              </span>
            </div>

            {/* Content */}
            <div className="p-space-md flex flex-col flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-headline-sm text-text-primary uppercase tracking-tight truncate max-w-[150px]">{item.name}</h3>
                <span className={`font-label-rpg-sm text-[10px] uppercase ${rarityColor}`}>{item.category}</span>
              </div>
              
              <p className="font-body-sm text-text-secondary line-clamp-2 italic mb-space-md h-10">
                "{item.description}"
              </p>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex justify-between items-center px-2 py-1 bg-surface-deck rounded">
                  <span className="font-label-rpg-sm text-text-muted">Price</span>
                  {isLocked ? (
                    <span className="font-label-rpg-sm text-text-muted flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">lock</span> Locked
                    </span>
                  ) : (
                    <span className="font-stat-display-sm text-[#FFD700] flex items-center gap-1">
                      {item.price} G
                    </span>
                  )}
                </div>

                {isOwned ? (
                  <button 
                    disabled
                    className="w-full py-2 bg-surface-base text-text-muted border border-border-subtle rounded font-label-rpg uppercase"
                  >
                    Owned
                  </button>
                ) : isLocked ? (
                  <button 
                    disabled
                    className="w-full py-2 bg-surface-base text-text-muted border border-border-subtle rounded font-label-rpg uppercase text-[10px] tracking-wider truncate px-1"
                  >
                    Req: {item.unlockCondition}
                  </button>
                ) : (
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAcquireClick(item); }}
                    className="w-full py-2 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 rounded font-label-rpg uppercase transition-colors flex justify-center items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span> Acquire
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
