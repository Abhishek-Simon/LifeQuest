import React from 'react';
import { motion } from 'framer-motion';

export const CosmeticCard = ({ item, isShop, onAction }) => {
  const { name, rarity, category, price, owned, equipped, preview } = item;

  // Determine Primary CTA & Status
  let actionText = 'BUY';
  let actionColor = 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container';
  let isActionDisabled = false;

  if (equipped) {
    actionText = 'EQUIPPED';
    actionColor = 'bg-surface-deck text-vitality-emerald border border-vitality-emerald/30';
    isActionDisabled = true;
  } else if (owned) {
    actionText = 'EQUIP';
    actionColor = 'bg-surface-deck text-text-primary border border-border-subtle hover:bg-surface-overlay hover:border-text-primary';
  }

  // Rarity Styling
  let rarityColor = 'text-text-muted';
  let rarityGlow = '';
  if (rarity === 'Common') rarityColor = 'text-text-muted';
  if (rarity === 'Rare') rarityColor = 'text-secondary';
  if (rarity === 'Epic') { rarityColor = 'text-primary'; rarityGlow = 'drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]'; }
  if (rarity === 'Legendary') { rarityColor = 'text-[#FFD700]'; rarityGlow = 'drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]'; }
  if (rarity === 'Mythic') { rarityColor = 'text-hazard-crimson'; rarityGlow = 'drop-shadow-[0_0_12px_rgba(220,38,38,0.6)]'; }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`bg-surface-card rounded-2xl border ${equipped ? 'border-vitality-emerald/50 shadow-[0_0_16px_rgba(16,185,129,0.1)]' : 'border-border-subtle hover:border-border-strong'} overflow-hidden flex flex-col transition-all`}
    >
      {/* Preview Area */}
      <div className="w-full h-48 bg-surface-deck relative flex items-center justify-center overflow-hidden border-b border-border-subtle">
        {/* Background Accent */}
        <div className={`absolute inset-0 opacity-10 blur-xl ${rarity === 'Epic' ? 'bg-primary' : rarity === 'Legendary' ? 'bg-[#FFD700]' : rarity === 'Mythic' ? 'bg-hazard-crimson' : 'bg-transparent'}`}></div>
        
        {/* Icon / Image */}
        <span className={`material-symbols-outlined text-[80px] relative z-10 ${rarityColor} ${rarityGlow}`}>
          {preview}
        </span>
        
        {/* Rarity Tag */}
        <div className="absolute top-3 left-3 bg-background/80 backdrop-blur border border-border-subtle px-2 py-1 rounded font-label-rpg-sm uppercase tracking-widest text-[10px]">
          <span className={rarityColor}>{rarity}</span>
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-3 right-3 text-text-muted font-label-rpg-sm uppercase tracking-widest text-[10px]">
          {category}
        </div>
      </div>

      {/* Details Area */}
      <div className="p-space-md flex flex-col flex-1">
        <h3 className="font-headline-sm uppercase text-text-primary mb-1 truncate">{name}</h3>
        
        <div className="flex justify-between items-end mt-auto pt-space-sm">
          {/* Price / Status */}
          <div className="flex flex-col">
            {isShop && !owned && (
              <span className="font-stat-display-sm text-[#FFD700] flex items-center gap-1">
                {price} <span className="font-label-rpg-sm uppercase">Gold</span>
              </span>
            )}
            {owned && !equipped && (
              <span className="font-label-rpg text-text-muted uppercase tracking-widest">
                Owned
              </span>
            )}
            {equipped && (
              <span className="font-label-rpg text-vitality-emerald uppercase tracking-widest">
                Equipped
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => onAction(item)}
            disabled={isActionDisabled}
            className={`px-6 py-2 rounded font-label-rpg uppercase transition-colors shadow-sm ${actionColor} ${isActionDisabled ? 'opacity-50 cursor-default' : ''}`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
