import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { getItemById } from '../../data/items';

export const LoadoutPreview = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { equipment } = gameState;

  // Extract equipped items that are not null
  const equippedItems = Object.entries(equipment)
    .filter(([slot, itemId]) => itemId !== null)
    .map(([slot, itemId]) => getItemById(itemId));

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-md h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">shield</span> Current Loadout
        </h3>
        <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase border border-border-subtle px-2 py-0.5 rounded">Preview</span>
      </div>
      
      <div className="flex flex-col gap-space-sm flex-1">
        {equippedItems.length > 0 ? (
          equippedItems.map((item, idx) => {
            if (!item) return null;
            let rarityColor = "text-text-muted";
            let bg = "bg-surface-base";
            let border = "border-surface-overlay";
            
            if (item.rarity === 'uncommon') { rarityColor = "text-vitality-emerald"; }
            if (item.rarity === 'rare') { rarityColor = "text-secondary"; border = "border-secondary/30"; bg = "bg-secondary/10"; }
            if (item.rarity === 'epic') { rarityColor = "text-primary"; border = "border-primary/30"; bg = "bg-primary/10"; }
            if (item.rarity === 'legendary') { rarityColor = "text-[#FFD700]"; border = "border-[#FFD700]/30"; bg = "bg-[#FFD700]/10"; }

            return (
              <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg border ${border} ${bg}`}>
                <div className={`w-10 h-10 rounded border ${border} bg-surface-base flex items-center justify-center ${rarityColor} shrink-0`}>
                  <span className="material-symbols-outlined">token</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase">{item.category}</span>
                  <span className={`font-body-sm text-sm uppercase tracking-wide truncate max-w-[150px] ${rarityColor}`}>{item.name}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="font-body-sm text-text-muted italic text-center py-4">No items currently equipped. Visit the Armory to equip items.</p>
        )}
      </div>

      <button 
        onClick={() => navigate('/armory')}
        className="w-full py-2 bg-surface-deck hover:bg-surface-overlay text-text-primary border border-border-subtle rounded font-label-rpg uppercase transition-colors"
      >
        View Armory
      </button>
    </div>
  );
};
