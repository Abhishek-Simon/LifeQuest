import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cosmeticService } from '../services/api/cosmeticService';
import { CosmeticCard } from '../components/shop/CosmeticCard';
import { PurchaseModal } from '../components/shop/PurchaseModal';

const CATEGORIES = ['All', 'Avatars', 'Themes', 'Frames', 'Badges'];

export const Shop = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Purchase Modal State: { state: 'confirm'|'loading'|'success'|'insufficient'|'error', item: Object }
  const [purchaseFlow, setPurchaseFlow] = useState(null);

  const fetchShopData = async () => {
    try {
      setIsLoading(true);
      const result = await cosmeticService.getShopState();
      setData(result);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  const handleAction = (item) => {
    if (item.equipped) return;
    
    if (item.owned) {
      // It's owned but not equipped, so the action is "EQUIP"
      handleEquip(item.id);
      return;
    }

    // Otherwise, initiate purchase
    if (data.gold < item.price) {
      setPurchaseFlow({ state: 'insufficient', item });
    } else {
      setPurchaseFlow({ state: 'confirm', item });
    }
  };

  const handleConfirmPurchase = async (itemId) => {
    const item = data.items.find(i => i.id === itemId);
    setPurchaseFlow({ state: 'loading', item });
    
    try {
      await cosmeticService.purchaseItem(itemId);
      setPurchaseFlow({ state: 'success', item });
      // Refresh background data to update gold/ownership silently
      const freshData = await cosmeticService.getShopState();
      setData(freshData);
    } catch (err) {
      setPurchaseFlow({ state: 'error', item });
    }
  };

  const handleEquip = async (itemId) => {
    try {
      await cosmeticService.equipItem(itemId);
      // Close modal if open
      setPurchaseFlow(null);
      // Refresh to show equipped state
      const freshData = await cosmeticService.getShopState();
      setData(freshData);
    } catch (err) {
      console.error("Failed to equip", err);
    }
  };

  const filteredItems = useMemo(() => {
    if (!data?.items) return [];
    if (categoryFilter === 'All') return data.items;
    return data.items.filter(i => i.category === categoryFilter);
  }, [data, categoryFilter]);

  if (isLoading && !data) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl animate-pulse px-space-md lg:px-0">
        <div className="h-24 bg-surface-deck rounded-2xl w-full"></div>
        <div className="h-12 bg-surface-deck rounded-full w-full max-w-md"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md mt-4">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-72 bg-surface-deck rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-text-primary mb-2">Shop Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't load the cosmetic collection.</p>
        <button onClick={fetchShopData} className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-space-lg pb-space-xl relative"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md px-space-md lg:px-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#FFD700] text-[28px]">storefront</span>
            <h1 className="font-headline-xl text-headline-xl text-text-primary uppercase tracking-tight">
              Shop
            </h1>
          </div>
          <p className="font-body-lg text-text-secondary">
            Customize your adventure.
          </p>
        </div>

        {/* Gold Balance */}
        <div className="flex items-center gap-3 bg-surface-card px-space-md py-space-sm rounded-xl border border-[#FFD700]/30 shadow-[0_0_12px_rgba(255,215,0,0.1)] shrink-0">
          <span className="material-symbols-outlined text-[#FFD700]">monetization_on</span>
          <div className="flex flex-col">
            <span className="font-label-rpg-sm text-text-muted uppercase tracking-widest text-[10px]">Available</span>
            <span className="font-stat-display text-[#FFD700] leading-none">{data.gold} GOLD</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-space-md lg:px-0 pb-2 border-b border-border-subtle">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-6 py-2 rounded-full font-label-rpg uppercase whitespace-nowrap transition-colors ${
              categoryFilter === cat 
                ? 'bg-text-primary text-surface-base' 
                : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-space-md lg:px-0 min-h-[400px]">
        {filteredItems.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-space-2xl text-center text-text-muted">
            <span className="material-symbols-outlined text-[48px] mb-space-sm opacity-50">category</span>
            <h3 className="font-headline-md uppercase mb-2">No Cosmetics Here</h3>
            <p className="font-body-md">Try another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
            {filteredItems.map(item => (
              <CosmeticCard 
                key={item.id} 
                item={item} 
                isShop={true} 
                onAction={handleAction} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Purchase Flow */}
      {purchaseFlow && (
        <PurchaseModal 
          state={purchaseFlow.state} 
          item={purchaseFlow.item} 
          currentGold={data.gold}
          onClose={() => setPurchaseFlow(null)}
          onConfirm={handleConfirmPurchase}
          onEquip={handleEquip}
        />
      )}
    </motion.div>
  );
};
