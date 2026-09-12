import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cosmeticService } from '../services/api/cosmeticService';
import { CosmeticCard } from '../components/shop/CosmeticCard';
import { LoadoutSection } from '../components/shop/LoadoutSection';

const CATEGORIES = ['All', 'Avatars', 'Themes', 'Frames', 'Badges'];

export const Armory = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [equipToast, setEquipToast] = useState(null);

  const fetchInventoryData = async () => {
    try {
      setIsLoading(true);
      const result = await cosmeticService.getInventoryState();
      setData(result);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const handleEquip = async (item) => {
    if (item.equipped) return; // already equipped
    
    try {
      await cosmeticService.equipItem(item.id);
      
      // Show toast feedback
      setEquipToast(`Equipped ${item.name}`);
      setTimeout(() => setEquipToast(null), 3000);

      // Refresh data
      const freshData = await cosmeticService.getInventoryState();
      setData(freshData);
    } catch (err) {
      console.error("Equip failed", err);
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
        <div className="h-32 bg-surface-deck rounded-2xl w-full"></div>
        <div className="h-12 bg-surface-deck rounded-full w-full max-w-md"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md mt-4">
          {[1,2,3,4].map(i => <div key={i} className="h-72 bg-surface-deck rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-text-primary mb-2">Inventory Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't load your items.</p>
        <button onClick={fetchInventoryData} className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors">
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
            <span className="material-symbols-outlined text-text-primary text-[28px]">backpack</span>
            <h1 className="font-headline-xl text-headline-xl text-text-primary uppercase tracking-tight">
              Inventory
            </h1>
          </div>
          <p className="font-body-lg text-text-secondary">
            Your collected cosmetics.
          </p>
        </div>
      </div>

      <div className="px-space-md lg:px-0">
        <LoadoutSection loadout={data.loadout} />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-space-md lg:px-0 pb-2 border-b border-border-subtle mt-space-sm">
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
        {data.items.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-space-2xl text-center text-text-muted">
            <span className="material-symbols-outlined text-[48px] mb-space-sm opacity-50">backpack</span>
            <h3 className="font-headline-md uppercase mb-2 text-text-primary">Your Inventory is Empty</h3>
            <p className="font-body-md">Earn Gold through quests and start building your collection.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="w-full text-center py-space-xl text-text-muted font-body-md italic">
            No items in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
            {filteredItems.map(item => (
              <CosmeticCard 
                key={item.id} 
                item={item} 
                isShop={false} 
                onAction={() => handleEquip(item)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Equip Feedback Toast */}
      <AnimatePresence>
        {equipToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 bg-vitality-emerald text-background px-6 py-3 rounded-full font-label-rpg uppercase tracking-widest shadow-[0_4px_16px_rgba(16,185,129,0.4)] flex items-center gap-2"
          >
            <span className="material-symbols-outlined">check_circle</span>
            {equipToast}
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  );
};
