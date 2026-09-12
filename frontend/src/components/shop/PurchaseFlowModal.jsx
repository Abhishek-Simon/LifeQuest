import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';

export const PurchaseFlowModal = ({ item, status, onClose, onConfirm, onEquip }) => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  
  if (!item) return null;

  const currentGold = gameState.player.gold;
  
  // Rarity styling
  let rarityColor = "text-text-muted";
  if (item.rarity === 'uncommon') rarityColor = "text-vitality-emerald";
  if (item.rarity === 'rare') rarityColor = "text-secondary";
  if (item.rarity === 'epic') rarityColor = "text-primary";
  if (item.rarity === 'legendary') rarityColor = "text-[#FFD700]";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-space-md"
      >
        <div className="absolute inset-0 bg-surface-base/90 backdrop-blur-md" onClick={status !== 'success' ? onClose : undefined} />
        
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 10 }}
          className="relative w-full max-w-sm bg-surface-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {status === 'confirm' && (
            <div className="p-space-xl flex flex-col items-center text-center gap-space-md">
              <span className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-widest">Acquire Item?</span>
              <h2 className={`font-headline-md text-headline-md uppercase ${rarityColor}`}>{item.name}</h2>
              
              <div className="bg-surface-deck border border-surface-overlay rounded w-full py-4 px-2 my-2">
                <span className="font-stat-display text-stat-display text-[#FFD700]">{item.price} G</span>
              </div>
              
              <div className="flex flex-col w-full gap-1 font-label-rpg-sm text-text-secondary uppercase">
                <div className="flex justify-between">
                  <span>Current Balance:</span>
                  <span>{currentGold} G</span>
                </div>
                <div className="flex justify-between border-t border-surface-overlay pt-1 mt-1">
                  <span>After Purchase:</span>
                  <span className="text-text-primary">{currentGold - item.price} G</span>
                </div>
              </div>

              <div className="flex gap-space-sm w-full mt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-surface-deck text-text-primary rounded font-label-rpg uppercase transition-colors hover:bg-surface-overlay"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onConfirm(item.id)}
                  className="flex-1 py-3 bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/50 rounded font-label-rpg uppercase transition-colors hover:bg-[#FFD700]/20"
                >
                  Acquire
                </button>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="p-space-xl flex flex-col items-center text-center gap-space-md">
              <div className="w-16 h-16 rounded-full bg-[#FFD700]/10 border border-[#FFD700] flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(255,215,0,0.3)]">
                <span className="material-symbols-outlined text-[32px] text-[#FFD700]">check</span>
              </div>
              <span className="font-label-rpg text-label-rpg text-[#FFD700] uppercase tracking-widest">Item Acquired</span>
              
              <h2 className={`font-headline-md text-headline-md uppercase ${rarityColor} mb-2`}>{item.name}</h2>
              
              <span className="font-label-rpg-sm text-hazard-crimson uppercase px-3 py-1 bg-hazard-crimson/10 rounded">
                -{item.price} Gold
              </span>

              <div className="flex gap-space-sm w-full mt-6">
                <button 
                  onClick={() => { onClose(); navigate('/armory'); }}
                  className="flex-1 py-3 bg-surface-deck text-text-primary rounded font-label-rpg uppercase transition-colors hover:bg-surface-overlay"
                >
                  View Armory
                </button>
                <button 
                  onClick={() => onEquip(item.id)}
                  className="flex-1 py-3 bg-secondary text-white rounded font-label-rpg uppercase transition-colors hover:bg-cyan-600"
                >
                  Equip Now
                </button>
              </div>
            </div>
          )}

          {status === 'error_funds' && (
            <div className="p-space-xl flex flex-col items-center text-center gap-space-md">
              <span className="material-symbols-outlined text-[48px] text-hazard-crimson mb-2">error</span>
              <span className="font-label-rpg text-label-rpg text-hazard-crimson uppercase tracking-widest">Insufficient Funds</span>
              
              <p className="font-body-md text-text-secondary">
                You need {item.price - currentGold} more Gold to acquire the {item.name}.
              </p>

              <div className="flex gap-space-sm w-full mt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-surface-deck text-text-primary rounded font-label-rpg uppercase transition-colors hover:bg-surface-overlay"
                >
                  Close
                </button>
                <button 
                  onClick={() => { onClose(); navigate('/quests'); }}
                  className="flex-1 py-3 bg-hazard-crimson text-white rounded font-label-rpg uppercase transition-colors hover:bg-red-700"
                >
                  View Quests
                </button>
              </div>
            </div>
          )}

          {status === 'error_full' && (
            <div className="p-space-xl flex flex-col items-center text-center gap-space-md">
              <span className="material-symbols-outlined text-[48px] text-hazard-crimson mb-2">inventory_2</span>
              <span className="font-label-rpg text-label-rpg text-hazard-crimson uppercase tracking-widest">Inventory Full</span>
              
              <p className="font-body-md text-text-secondary">
                Make room in your Armory before acquiring another item.
              </p>

              <button 
                onClick={() => { onClose(); navigate('/armory'); }}
                className="w-full mt-4 py-3 bg-surface-deck hover:bg-surface-overlay border border-border-subtle text-text-primary rounded font-label-rpg uppercase transition-colors"
              >
                Manage Armory
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
