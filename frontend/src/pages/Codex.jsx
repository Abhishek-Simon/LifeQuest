import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { CODEX_ENTRIES, CODEX_CATEGORIES } from '../data/codex';

export const Codex = () => {
  const { gameState } = useGame();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [inspectedEntry, setInspectedEntry] = useState(null);

  // Stats
  const discoveredCount = gameState.codex.discovered.length;
  const totalCount = CODEX_ENTRIES.length;

  // Derived Data
  const displayEntries = useMemo(() => {
    let result = CODEX_ENTRIES;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(e => e.category === categoryFilter);
    }

    return result;
  }, [searchQuery, categoryFilter]);

  const handleCrossLink = (category) => {
    switch (category) {
      case 'bosses': navigate('/bosses'); break;
      case 'items': navigate('/shop'); break; // or armory
      case 'skills': navigate('/skill-tree'); break;
      default: navigate('/dashboard');
    }
    setInspectedEntry(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col pb-space-xl"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg pb-space-lg border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="material-symbols-outlined text-secondary text-[24px]">menu_book</span>
            <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight uppercase">Codex</h1>
          </div>
          <p className="font-body-md text-body-md text-text-secondary">
            Records of your journey and discoveries.
          </p>
        </div>

        <div className="flex gap-space-md bg-surface-card p-space-sm rounded-lg border border-border-subtle">
          <div className="flex flex-col items-center px-space-md">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Discovered</span>
            <span className="font-stat-display-sm text-stat-display-sm text-secondary">{discoveredCount} <span className="text-text-muted text-sm">/ {totalCount}</span></span>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-space-md items-center mb-space-lg">
        <div className="relative w-full md:w-64 shrink-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
          <input 
            type="text" 
            placeholder="Search archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-deck border border-border-subtle rounded-lg py-2 pl-10 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors"
          />
        </div>
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
          {CODEX_CATEGORIES.map(cat => (
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
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {displayEntries.map(entry => {
          const isDiscovered = gameState.codex.discovered.includes(entry.id);
          
          return (
            <div 
              key={entry.id}
              onClick={() => setInspectedEntry(entry)}
              className={`bg-surface-card rounded-xl border border-border-subtle overflow-hidden flex flex-col transition-all cursor-pointer ${isDiscovered ? 'hover:bg-surface-overlay hover:border-secondary/50' : 'opacity-70'}`}
            >
              <div className="p-space-md flex flex-row items-center gap-space-md">
                <div className={`w-12 h-12 shrink-0 rounded bg-surface-deck border ${isDiscovered ? 'border-secondary/30' : 'border-border-subtle'} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-[24px] ${isDiscovered ? 'text-secondary' : 'text-text-muted blur-[2px]'}`}>
                    {isDiscovered ? entry.icon : 'help'}
                  </span>
                </div>
                
                <div className="flex flex-col flex-1">
                  <span className={`font-label-rpg-sm text-[10px] uppercase text-text-muted`}>{entry.category}</span>
                  <h3 className={`font-headline-sm uppercase tracking-tight ${isDiscovered ? 'text-text-primary' : 'text-text-muted'}`}>
                    {isDiscovered ? entry.title : '???'}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {inspectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-space-md"
          >
            <div className="absolute inset-0 bg-surface-base/90 backdrop-blur-md" onClick={() => setInspectedEntry(null)} />
            
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-surface-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden flex flex-col p-space-xl"
            >
              <div className="flex justify-between items-start mb-space-md">
                <span className="font-label-rpg text-label-rpg text-text-muted uppercase tracking-widest">
                  {inspectedEntry.category}
                </span>
                <button onClick={() => setInspectedEntry(null)} className="text-text-muted hover:text-text-primary">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {gameState.codex.discovered.includes(inspectedEntry.id) ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 shrink-0 rounded bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[32px] text-secondary">
                        {inspectedEntry.icon}
                      </span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-text-primary uppercase">
                      {inspectedEntry.title}
                    </h2>
                  </div>
                  
                  <p className="font-body-md text-text-secondary mb-space-lg">
                    {inspectedEntry.description}
                  </p>
                  
                  {inspectedEntry.relatedAttributes && inspectedEntry.relatedAttributes.length > 0 && (
                    <div className="mb-space-lg">
                      <span className="font-label-rpg-sm text-text-muted uppercase mb-2 block">Related Attributes</span>
                      <div className="flex flex-wrap gap-2">
                        {inspectedEntry.relatedAttributes.map(attr => (
                          <span key={attr} className="px-2 py-1 bg-surface-deck border border-border-subtle rounded text-xs font-label-rpg uppercase text-text-secondary">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => handleCrossLink(inspectedEntry.category)}
                    className="w-full mt-4 py-3 bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-secondary rounded font-label-rpg uppercase transition-colors flex justify-center items-center gap-2"
                  >
                    View System
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4 opacity-50">
                    <div className="w-16 h-16 shrink-0 rounded bg-surface-deck border border-border-subtle flex items-center justify-center">
                      <span className="material-symbols-outlined text-[32px] text-text-muted blur-[2px]">
                        help
                      </span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-text-muted uppercase">
                      UNKNOWN RECORD
                    </h2>
                  </div>
                  
                  <div className="bg-surface-deck p-4 rounded border border-border-subtle mt-4">
                    <span className="font-label-rpg-sm text-text-muted uppercase block mb-1">Discovery Requirement</span>
                    <span className="font-body-sm text-text-secondary">{inspectedEntry.discoveryCondition}</span>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
