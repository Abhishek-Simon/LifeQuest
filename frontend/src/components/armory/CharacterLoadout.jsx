import React from 'react';
import { useGame } from '../../context/GameContext';
import { getLoadoutPower, getActiveBonuses } from '../../services/inventoryService';
import { getItemById } from '../../data/items';

export const CharacterLoadout = ({ onSlotClick }) => {
  const { gameState } = useGame();
  const { equipment, player } = gameState;

  const power = getLoadoutPower(equipment);
  const activeBonuses = getActiveBonuses(equipment);

  const slots = [
    { id: 'head', label: 'Head', x: '50%', y: '10%' },
    { id: 'core', label: 'Core', x: '25%', y: '40%' },
    { id: 'badge', label: 'Badge', x: '75%', y: '40%' },
    { id: 'tool', label: 'Tool', x: '35%', y: '75%' },
    { id: 'companion', label: 'Companion', x: '65%', y: '75%' }
  ];

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="bg-surface-card rounded-2xl border border-border-subtle relative overflow-hidden flex flex-col items-center justify-center p-space-xl min-h-[400px]">
        
        {/* Background Graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[240px]">person</span>
        </div>

        {/* Loadout Slots */}
        <div className="relative w-full max-w-[300px] aspect-[3/4] z-10">
          {slots.map(slot => {
            const equippedId = equipment[slot.id];
            const item = equippedId ? getItemById(equippedId) : null;
            
            let rarityColor = "border-border-subtle text-text-muted";
            let glow = "";
            let icon = "add";

            if (item) {
              icon = "check";
              if (item.rarity === 'common') rarityColor = "border-text-secondary text-text-secondary";
              if (item.rarity === 'uncommon') rarityColor = "border-vitality-emerald text-vitality-emerald";
              if (item.rarity === 'rare') rarityColor = "border-secondary text-secondary";
              if (item.rarity === 'epic') {
                rarityColor = "border-primary text-primary";
                glow = "shadow-[0_0_12px_rgba(139,92,246,0.3)]";
              }
              if (item.rarity === 'legendary') {
                rarityColor = "border-[#FFD700] text-[#FFD700]";
                glow = "shadow-[0_0_16px_rgba(255,215,0,0.4)]";
              }
            }

            return (
              <div 
                key={slot.id}
                onClick={() => onSlotClick(slot.id)}
                className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: slot.x, top: slot.y }}
              >
                <div className={`w-14 h-14 rounded bg-surface-deck border-2 flex items-center justify-center transition-all ${rarityColor} ${glow} group-hover:scale-110`}>
                  {item ? (
                    <span className="material-symbols-outlined text-[24px]">{item.category === 'relic' ? 'diamond' : 'token'}</span>
                  ) : (
                    <span className="material-symbols-outlined text-[24px] opacity-50">add</span>
                  )}
                </div>
                <div className="text-center">
                  <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase tracking-widest block">{slot.label}</span>
                  {item && <span className="font-label-rpg-sm text-[11px] text-text-primary uppercase truncate max-w-[80px] block">{item.name}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Loadout Power */}
        <div className="absolute top-4 left-4 flex flex-col">
          <span className="font-label-rpg-sm text-text-muted uppercase tracking-wider">Loadout Power</span>
          <span className="font-stat-display text-secondary">{power}</span>
        </div>
      </div>

      {/* Active Bonuses Panel */}
      <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-sm">
        <h3 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider mb-space-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">bolt</span> Active Bonuses
        </h3>
        <div className="flex flex-col gap-2">
          {activeBonuses.length > 0 ? (
            activeBonuses.map((bonus, idx) => (
              <div key={idx} className="font-body-sm text-text-secondary flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                {bonus}
              </div>
            ))
          ) : (
            <p className="font-body-sm text-text-muted italic">No active bonuses. Equip items to gain effects.</p>
          )}
        </div>
      </div>
    </div>
  );
};
