import React from 'react';
import { useGame } from '../../context/GameContext';
import { getItemById } from '../../data/items';

export const RecentAcquisitions = () => {
  const { gameState } = useGame();
  const { inventory } = gameState;

  // Sort inventory items by acquiredAt descending
  const recentItems = [...inventory.items]
    .sort((a, b) => new Date(b.acquiredAt) - new Date(a.acquiredAt))
    .slice(0, 4);

  const formatRelativeTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="bg-surface-card rounded-xl border border-border-subtle p-space-md shadow-sm h-fit">
      <h3 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider mb-space-md flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">history</span> Recent
      </h3>
      
      <div className="flex flex-col gap-space-sm">
        {recentItems.length > 0 ? (
          recentItems.map(invItem => {
            const item = getItemById(invItem.itemId);
            if (!item) return null;

            let rarityColor = "text-text-muted";
            if (item.rarity === 'uncommon') rarityColor = "text-vitality-emerald";
            if (item.rarity === 'rare') rarityColor = "text-secondary";
            if (item.rarity === 'epic') rarityColor = "text-primary";
            if (item.rarity === 'legendary') rarityColor = "text-[#FFD700]";

            return (
              <div key={`${invItem.itemId}-${invItem.acquiredAt}`} className="flex justify-between items-center p-2 rounded bg-surface-deck border border-surface-overlay">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="font-label-rpg-sm text-[11px] text-text-primary uppercase truncate">{item.name}</span>
                  <span className={`font-label-rpg-sm text-[10px] uppercase ${rarityColor}`}>{item.rarity}</span>
                </div>
                <span className="font-body-sm text-xs text-text-muted shrink-0">
                  {formatRelativeTime(invItem.acquiredAt)}
                </span>
              </div>
            );
          })
        ) : (
          <p className="font-body-sm text-text-muted italic text-center py-4">No items acquired yet.</p>
        )}
      </div>
    </div>
  );
};
