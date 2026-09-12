import React, { useState } from 'react';
import { ITEM_CATEGORIES, ITEMS_CATALOG } from '../../data/items';
import { useGame } from '../../context/GameContext';

export const InventoryGrid = ({ onItemClick, initialFilter = 'all' }) => {
  const { gameState } = useGame();
  const { inventory, equipment } = gameState;
  const [filter, setFilter] = useState(initialFilter);

  // Derive state for the catalog items to display
  // In a real game, this might only show owned items, but the prompt asks to show 
  // items you can buy or are locked as well. We'll show all items in the catalog, 
  // but explicitly mark if they are owned or equipped.
  
  const displayItems = ITEMS_CATALOG.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'equipped') return Object.values(equipment).includes(item.id);
    return item.category === filter;
  });

  return (
    <div className="flex flex-col gap-space-md">
      
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
            filter === 'all' 
              ? 'bg-text-primary text-surface-base' 
              : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('equipped')}
          className={`px-4 py-2 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
            filter === 'equipped' 
              ? 'bg-secondary text-surface-base' 
              : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
          }`}
        >
          Equipped
        </button>
        {ITEM_CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
              filter === cat 
                ? 'bg-text-primary text-surface-base' 
                : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle p-space-lg min-h-[400px]">
        {displayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted py-12">
            <span className="material-symbols-outlined text-[48px] mb-2 opacity-50">inventory_2</span>
            <p className="font-body-md italic">No items found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-space-sm">
            {displayItems.map(item => {
              const isOwned = inventory.items.some(i => i.itemId === item.id);
              const isEquipped = Object.values(equipment).includes(item.id);
              
              let rarityColor = "border-border-subtle text-text-muted";
              let bg = isOwned ? "bg-surface-deck hover:bg-surface-overlay" : "bg-surface-base opacity-60";
              let glow = "";
              
              if (item.rarity === 'uncommon') rarityColor = "border-vitality-emerald text-vitality-emerald";
              if (item.rarity === 'rare') rarityColor = "border-secondary text-secondary";
              
              if (item.rarity === 'epic') {
                rarityColor = "border-primary text-primary";
                if (isOwned) glow = "hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]";
              }
              if (item.rarity === 'legendary') {
                rarityColor = "border-[#FFD700] text-[#FFD700]";
                if (isOwned) glow = "hover:shadow-[0_0_16px_rgba(255,215,0,0.3)]";
              }

              return (
                <div 
                  key={item.id}
                  onClick={() => onItemClick(item, isOwned, isEquipped)}
                  className={`aspect-square rounded-xl border ${rarityColor} ${bg} ${glow} p-space-sm flex flex-col items-center justify-center gap-2 cursor-pointer transition-all relative overflow-hidden group`}
                >
                  {isEquipped && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                  )}
                  
                  {!isOwned && item.source === 'shop' && (
                    <div className="absolute bottom-2 font-label-rpg-sm text-[10px] text-[#FFD700] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">monetization_on</span> {item.price}
                    </div>
                  )}
                  {!isOwned && item.source !== 'shop' && (
                    <div className="absolute bottom-2 font-label-rpg-sm text-[10px] text-text-muted flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">lock</span>
                    </div>
                  )}

                  <span className={`material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform ${!isOwned ? 'opacity-50' : ''}`}>
                    {item.category === 'relic' ? 'diamond' : 'token'}
                  </span>
                  
                  <span className={`font-label-rpg-sm text-[10px] uppercase text-center truncate w-full ${!isOwned ? 'text-text-muted' : 'text-text-primary'}`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
