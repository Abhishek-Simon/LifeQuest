import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const ItemDetailModal = ({ itemDef, isOwned, isEquipped, onClose }) => {
  const { equipItem, unequipItem, purchaseItem, gameState } = useGame();
  
  if (!itemDef) return null;

  const handleEquip = () => {
    equipItem(itemDef.id);
    onClose();
  };

  const handleUnequip = () => {
    unequipItem(itemDef.category);
    onClose();
  };

  const handlePurchase = () => {
    if (purchaseItem(itemDef.id)) {
      onClose(); // Alternatively could stay open and change to Equip state
    }
  };

  const canAfford = gameState.player.gold >= itemDef.price;
  const isShopItem = itemDef.source === 'shop';

  // Rarity styling
  let rarityColor = "text-text-muted";
  let rarityBg = "bg-surface-deck";
  let border = "border-border-subtle";
  
  if (itemDef.rarity === 'uncommon') { rarityColor = "text-vitality-emerald"; border = "border-vitality-emerald"; rarityBg = "bg-vitality-emerald/10"; }
  if (itemDef.rarity === 'rare') { rarityColor = "text-secondary"; border = "border-secondary"; rarityBg = "bg-secondary/10"; }
  if (itemDef.rarity === 'epic') { rarityColor = "text-primary"; border = "border-primary"; rarityBg = "bg-primary/10"; }
  if (itemDef.rarity === 'legendary') { rarityColor = "text-[#FFD700]"; border = "border-[#FFD700]"; rarityBg = "bg-[#FFD700]/10"; }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-space-md"
      >
        <div className="absolute inset-0 bg-surface-base/80 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 10 }}
          className={`relative w-full max-w-md bg-surface-card border rounded-2xl shadow-2xl overflow-hidden flex flex-col ${border}`}
        >
          {/* Header Graphic */}
          <div className={`w-full h-32 ${rarityBg} border-b ${border} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:16px_16px]"></div>
            <span className={`material-symbols-outlined text-[64px] ${rarityColor} relative z-10`}>
              {itemDef.category === 'relic' ? 'diamond' : 'token'}
            </span>
          </div>

          <div className="p-space-xl flex flex-col gap-space-md">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h2 className="font-headline-md text-text-primary uppercase tracking-tight">{itemDef.name}</h2>
                {isEquipped && (
                  <span className="px-2 py-0.5 bg-secondary/10 text-secondary border border-secondary/30 rounded font-label-rpg-sm uppercase">Equipped</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className={`font-label-rpg-sm uppercase tracking-widest ${rarityColor}`}>{itemDef.rarity}</span>
                <span className="text-text-muted">•</span>
                <span className="font-label-rpg-sm text-text-muted uppercase tracking-widest">{itemDef.category}</span>
              </div>
            </div>

            <p className="font-body-md text-text-secondary italic">
              "{itemDef.description}"
            </p>

            <div className="bg-surface-deck border border-surface-overlay rounded-lg p-space-sm flex flex-col gap-1">
              <span className="font-label-rpg-sm text-text-muted uppercase">Effect</span>
              <span className="font-body-sm text-text-primary">{itemDef.bonus.description}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-label-rpg-sm text-text-muted uppercase">Source</span>
              <span className="font-body-sm text-text-secondary capitalize">{itemDef.source.replace('_', ' ')}</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-space-md pt-space-md border-t border-border-subtle flex gap-space-sm">
              {isOwned ? (
                isEquipped ? (
                  <button 
                    onClick={handleUnequip}
                    className="flex-1 py-3 bg-surface-deck hover:bg-surface-overlay text-text-primary border border-border-subtle rounded font-label-rpg uppercase transition-colors"
                  >
                    Unequip
                  </button>
                ) : (
                  <button 
                    onClick={handleEquip}
                    className="flex-1 py-3 bg-secondary hover:bg-cyan-600 text-white rounded font-label-rpg uppercase transition-colors"
                  >
                    Equip to Loadout
                  </button>
                )
              ) : (
                isShopItem ? (
                  <button 
                    onClick={handlePurchase}
                    disabled={!canAfford}
                    className={`flex-1 py-3 rounded font-label-rpg uppercase flex items-center justify-center gap-2 transition-colors ${
                      canAfford 
                        ? 'bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30' 
                        : 'bg-surface-deck text-text-muted border border-border-subtle cursor-not-allowed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">monetization_on</span>
                    {canAfford ? `Purchase for ${itemDef.price} G` : `Need ${itemDef.price - gameState.player.gold} more G`}
                  </button>
                ) : (
                  <div className="flex-1 py-3 bg-surface-deck text-text-muted border border-border-subtle rounded font-label-rpg uppercase text-center flex flex-col">
                    <span>Locked</span>
                    <span className="font-body-sm text-xs lowercase italic normal-case">{itemDef.unlockCondition}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
