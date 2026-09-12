import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeaturedQuest } from '../components/quests/FeaturedQuest';
import { QuestCard } from '../components/quests/QuestCard';
import { questService } from '../services/api/questService';
import { decisionService } from '../services/api/decisionService';
import { CATEGORIES, DIFFICULTIES } from '../data/mockQuests';
import { CreateQuestModal } from '../components/quests/CreateQuestModal';

export const QuestBoard = () => {
  const [quests, setQuests] = useState([]);
  const [recommended, setRecommended] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const fetchBoardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [allQuests, recQuest] = await Promise.all([
        questService.getQuests(),
        decisionService.getRecommendation()
      ]);
      
      setQuests(allQuests);
      setRecommended(recQuest);
    } catch (err) {
      let errorMsg = "Failed to load Quest Board. Communications disrupted.";
      if (err.status === 0) {
        errorMsg = "Couldn't connect to LifeQuest. Check that the server is running and try again.";
      } else if (err.status === 401) {
        errorMsg = "Your session has expired. Please sign in again.";
      } else if (err.status >= 500) {
        errorMsg = "LifeQuest couldn't load your quests right now. Please try again.";
      } else if (err.status === 403) {
        errorMsg = "You don't have permission to access these quests.";
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, []);

  const handleRerollUpdate = (newRecommendation) => {
    setRecommended(newRecommendation);
  };

  const handleCreateQuest = async (questData) => {
    const newQuest = await questService.createQuest(questData);
    setQuests(prev => [newQuest, ...prev]);
  };

  const filteredQuests = useMemo(() => {
    return quests.filter(q => {
      if (search && !q.title.toLowerCase().includes(search.toLowerCase()) && !q.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== 'All' && q.category !== categoryFilter) return false;
      if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) return false;
      return true;
    }).sort((a, b) => {
      const order = { 'active': 0, 'available': 1, 'locked': 2, 'completed': 3, 'failed': 4 };
      return order[a.status] - order[b.status];
    });
  }, [quests, search, categoryFilter, difficultyFilter]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-xl pb-space-xl animate-pulse">
        <div className="h-20 bg-surface-deck rounded-lg"></div>
        <div className="h-64 bg-surface-deck rounded-xl"></div>
        <div className="h-16 bg-surface-deck rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-48 bg-surface-deck rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Sync Error</h2>
        <p className="font-body-md text-body-md text-text-secondary mb-space-md">{error}</p>
        <button 
          onClick={() => fetchBoardData()}
          disabled={isLoading}
          className="px-6 py-2 bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg uppercase transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Retrying...' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-space-xl pb-space-xl">
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-border-subtle pb-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-md">
            <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight uppercase">Quest Board</h1>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded flex items-center gap-1 font-label-rpg-sm uppercase transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Quest
            </button>
          </div>
          <p className="font-body-md text-body-md text-text-secondary">Choose your next mission.</p>
        </div>
        
        <div className="relative w-full md:max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search quests..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-deck border border-border-subtle rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Featured Quest (Decision Engine) */}
      {recommended && (
        <div className="flex flex-col gap-space-sm">
          <FeaturedQuest 
            recommendation={recommended} 
            onRerollUpdate={handleRerollUpdate} 
          />
        </div>
      )}

      {/* Filters Area */}
      <div className="flex flex-col gap-space-md mt-space-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-b border-border-subtle pb-space-sm">
          <h2 className="font-headline-md text-headline-md text-text-primary uppercase">Browse Quests</h2>
          
          <div className="flex items-center gap-space-sm overflow-x-auto pb-1 scrollbar-hide w-full sm:w-auto">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-surface-deck border border-border-subtle rounded px-3 py-1.5 font-label-rpg-sm text-label-rpg-sm uppercase text-text-primary focus:border-primary focus:outline-none flex-1 sm:flex-none"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-surface-deck border border-border-subtle rounded px-3 py-1.5 font-label-rpg-sm text-label-rpg-sm uppercase text-text-primary focus:border-primary focus:outline-none flex-1 sm:flex-none"
            >
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Strict 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <AnimatePresence>
            {filteredQuests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-space-xl flex flex-col items-center justify-center text-center bg-surface-deck border border-border-subtle rounded-xl border-dashed"
              >
                <span className="material-symbols-outlined text-4xl text-text-muted mb-space-sm">search_off</span>
                <p className="font-headline-sm text-headline-sm text-text-secondary uppercase">No Quests Yet</p>
                <p className="font-body-md text-body-md text-text-muted mt-1 mb-space-md">Your next adventure is waiting.</p>
                <button 
                  onClick={() => { setSearch(''); setCategoryFilter('All'); setDifficultyFilter('All'); }}
                  className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-overlay text-text-primary font-label-rpg uppercase rounded transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              filteredQuests.map(quest => (
                <QuestCard 
                  key={quest.id} 
                  quest={quest} 
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <CreateQuestModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateQuest} 
      />
    </div>
  );
};
