import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PurchaseModal = ({ state, item, currentGold, onClose, onConfirm, onEquip }) => {
  if (!state) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          onClick={state !== 'loading' ? onClose : undefined}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-sm bg-surface-card rounded-2xl border border-border-subtle shadow-2xl overflow-hidden flex flex-col p-space-xl text-center"
        >
          {/* STATE: CONFIRM */}
          {state === 'confirm' && (
            <>
              <h2 className="font-headline-md text-text-primary uppercase mb-space-md">Purchase Item</h2>
              
              <div className="w-20 h-20 mx-auto bg-surface-deck rounded-xl border border-border-subtle flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[40px] text-primary">{item.preview}</span>
              </div>
              
              <h3 className="font-headline-sm text-text-primary uppercase mb-1">{item.name}</h3>
              <span className="font-stat-display-sm text-[#FFD700] mb-space-lg block">{item.price} GOLD</span>
              
              <div className="w-full bg-surface-deck rounded-lg p-space-sm border border-surface-overlay flex flex-col gap-1 mb-space-xl">
                <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted">
                  <span>Your Balance</span>
                  <span>{currentGold} GOLD</span>
                </div>
                <div className="flex justify-between font-label-rpg-sm uppercase text-text-primary">
                  <span>After Purchase</span>
                  <span className="text-secondary">{currentGold - item.price} GOLD</span>
                </div>
              </div>

              <div className="flex gap-space-sm w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-surface-deck text-text-primary hover:text-text-primary rounded font-label-rpg uppercase transition-colors border border-border-subtle hover:bg-surface-overlay"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onConfirm(item.id)}
                  className="flex-1 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container rounded font-label-rpg uppercase transition-colors"
                >
                  Buy Item
                </button>
              </div>
            </>
          )}

          {/* STATE: LOADING */}
          {state === 'loading' && (
            <div className="py-space-2xl flex flex-col items-center">
              <span className="material-symbols-outlined text-[48px] text-primary animate-spin">sync</span>
              <span className="font-label-rpg uppercase text-text-muted mt-space-md">Processing Transaction...</span>
            </div>
          )}

          {/* STATE: SUCCESS */}
          {state === 'success' && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-vitality-emerald/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <span className="material-symbols-outlined text-[64px] text-vitality-emerald mb-space-sm relative z-10">
                check_circle
              </span>
              
              <h2 className="font-headline-md text-text-primary uppercase mb-1 relative z-10">Item Purchased</h2>
              <span className="font-label-rpg text-hazard-crimson uppercase tracking-widest mb-space-lg relative z-10">
                -{item.price} GOLD
              </span>
              
              <h3 className="font-headline-sm text-text-primary uppercase mb-space-xl relative z-10">{item.name}</h3>

              <div className="flex gap-space-sm w-full relative z-10">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-surface-deck text-text-primary rounded font-label-rpg uppercase transition-colors border border-border-subtle hover:bg-surface-overlay"
                >
                  Close
                </button>
                <button 
                  onClick={() => onEquip(item.id)}
                  className="flex-1 py-3 bg-surface-deck text-vitality-emerald border border-vitality-emerald/30 hover:bg-vitality-emerald/10 rounded font-label-rpg uppercase transition-colors"
                >
                  Equip Now
                </button>
              </div>
            </>
          )}

          {/* STATE: INSUFFICIENT FUNDS */}
          {state === 'insufficient' && (
            <>
              <span className="material-symbols-outlined text-[64px] text-hazard-crimson mb-space-sm">
                account_balance_wallet
              </span>
              <h2 className="font-headline-md text-text-primary uppercase mb-2">Not Enough Gold</h2>
              
              <div className="w-full bg-surface-deck rounded-lg p-space-md border border-hazard-crimson/30 flex flex-col gap-2 mb-space-xl mt-space-sm">
                <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted">
                  <span>You Need</span>
                  <span className="text-[#FFD700]">{item.price} GOLD</span>
                </div>
                <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted">
                  <span>Available</span>
                  <span className="text-text-primary">{currentGold} GOLD</span>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-3 bg-surface-deck text-text-primary rounded font-label-rpg uppercase transition-colors border border-border-subtle hover:bg-surface-overlay"
              >
                Close
              </button>
            </>
          )}

          {/* STATE: ERROR */}
          {state === 'error' && (
            <>
              <span className="material-symbols-outlined text-[64px] text-hazard-crimson mb-space-sm">
                error
              </span>
              <h2 className="font-headline-md text-text-primary uppercase mb-2">Purchase Failed</h2>
              <p className="font-body-md text-text-secondary mb-space-xl">
                We couldn't complete this purchase. Please try again.
              </p>
              <div className="flex gap-space-sm w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-surface-deck text-text-primary rounded font-label-rpg uppercase transition-colors border border-border-subtle hover:bg-surface-overlay"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onConfirm(item.id)}
                  className="flex-1 py-3 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                  Try Again
                </button>
              </div>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
