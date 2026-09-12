import React from 'react';
import { ITEM_CATEGORIES } from '../../data/items';

export const ShopControls = ({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, sortMode, setSortMode }) => {
  return (
    <div className="flex flex-col gap-space-md mb-space-lg">
      <div className="flex flex-col md:flex-row gap-space-md items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
          <input 
            type="text" 
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-deck border border-border-subtle rounded-lg py-2 pl-10 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        {/* Category Filters (Horizontal Scroll on Mobile) */}
        <div className="flex-1 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex gap-2">
          <button 
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
              categoryFilter === 'all' 
                ? 'bg-text-primary text-surface-base' 
                : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
            }`}
          >
            All
          </button>
          {ITEM_CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full font-label-rpg-sm uppercase whitespace-nowrap transition-colors ${
                categoryFilter === cat 
                  ? 'bg-text-primary text-surface-base' 
                  : 'bg-surface-deck text-text-muted hover:text-text-primary border border-surface-overlay'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Sort Dropdown */}
        <div className="w-full md:w-auto shrink-0 relative flex items-center gap-2">
          <span className="material-symbols-outlined text-text-muted">sort</span>
          <select 
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="bg-surface-deck border border-border-subtle rounded-lg py-2 pl-3 pr-8 text-text-primary text-sm focus:outline-none focus:border-secondary appearance-none cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rarity">Rarity</option>
          </select>
        </div>
        
      </div>
    </div>
  );
};
