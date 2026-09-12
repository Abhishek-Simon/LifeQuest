import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { journalService } from '../services/api/journalService';
import { JournalEvent } from '../components/journal/JournalEvent';
import { JournalEntryDetail } from '../components/journal/JournalEntryDetail';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'failed', label: 'Failed' },
  { id: 'story', label: 'Story' }
];

export const Journal = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchJournalData = async () => {
    try {
      setIsLoading(true);
      const entries = await journalService.getEntries();
      setData(entries);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJournalData();
  }, []);

  const filteredEntries = useMemo(() => {
    let result = data;
    
    // Tab filter
    if (activeTab === 'active') result = result.filter(e => e.status === 'active');
    else if (activeTab === 'completed') result = result.filter(e => e.status === 'completed');
    else if (activeTab === 'failed') result = result.filter(e => e.status === 'failed');
    else if (activeTab === 'story') result = result.filter(e => e.type === 'story');

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.objective.toLowerCase().includes(q)
      );
    }

    return result;
  }, [data, activeTab, searchQuery]);

  const groupedEntries = useMemo(() => {
    const groups = {};
    
    // Sort descending by date
    const sorted = [...filteredEntries].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(e => {
      const dateObj = new Date(e.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateKey = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      if (dateObj.toDateString() === today.toDateString()) dateKey = 'TODAY';
      else if (dateObj.toDateString() === yesterday.toDateString()) dateKey = 'YESTERDAY';

      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(e);
    });

    return groups;
  }, [filteredEntries]);

  if (isLoading && data.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-space-lg pb-space-xl animate-pulse px-space-md lg:px-0">
        <div className="h-24 bg-surface-deck rounded-xl w-full"></div>
        <div className="flex gap-2 mb-4">
          {[1,2,3,4].map(i => <div key={i} className="h-10 w-24 bg-surface-deck rounded-full"></div>)}
        </div>
        {[1,2,3].map(i => (
          <div key={i} className="flex flex-col gap-4">
            <div className="h-6 w-32 bg-surface-deck rounded"></div>
            <div className="h-24 bg-surface-card rounded-xl border border-border-subtle w-full ml-8"></div>
            <div className="h-24 bg-surface-card rounded-xl border border-border-subtle w-full ml-8"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-text-primary mb-2">Journal Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't load your adventure history.</p>
        <button onClick={fetchJournalData} className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  const renderEmptyState = () => {
    let icon = 'menu_book';
    let title = 'Your Journal Is Empty';
    let copy = "Your first chapter hasn't been written yet.";

    if (activeTab === 'active') {
      icon = 'explore';
      title = 'No Active Quests';
      copy = 'Your next mission is waiting.';
    } else if (activeTab === 'completed') {
      icon = 'workspace_premium';
      title = "Your Adventure Hasn't Started Yet";
      copy = 'Complete your first quest to begin your journal.';
    } else if (activeTab === 'failed') {
      icon = 'shield_with_error';
      title = 'No Failed Quests';
      copy = 'You have not failed any quests. Keep it up!';
    } else if (activeTab === 'story') {
      icon = 'auto_stories';
      title = 'No Story Progress Yet';
      copy = 'Continue your main journey to unlock story entries.';
    }

    if (searchQuery) {
      icon = 'search_off';
      title = 'No Matches Found';
      copy = 'Try adjusting your search terms.';
    }

    return (
      <div className="bg-transparent rounded-xl p-space-2xl flex flex-col items-center text-center mt-space-xl">
        <span className="material-symbols-outlined text-[48px] text-text-muted mb-space-md opacity-50">{icon}</span>
        <h3 className="font-headline-md text-text-primary uppercase mb-2">{title}</h3>
        <p className="font-body-md text-text-secondary">{copy}</p>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto flex flex-col gap-space-lg pb-space-xl relative"
    >
      {/* Header */}
      <div className="flex flex-col gap-1 px-space-md lg:px-0 mb-space-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[28px]">history_edu</span>
          <h1 className="font-headline-xl text-headline-xl text-text-primary uppercase tracking-tight">
            Quest Journal
          </h1>
        </div>
        <p className="font-body-lg text-text-secondary">
          Your adventure, recorded.
        </p>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row gap-space-md items-center px-space-md lg:px-0">
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full sm:w-auto">
          {TABS.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-label-rpg uppercase whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-text-primary text-surface-base' 
                  : 'bg-surface-deck text-text-muted hover:text-text-primary border border-border-subtle'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0 sm:ml-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">search</span>
          <input 
            type="text" 
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-deck border border-border-subtle rounded-full py-2 pl-10 pr-4 font-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col relative px-space-md lg:px-0 mt-space-md">
        {filteredEntries.length === 0 ? (
          renderEmptyState()
        ) : (
          Object.keys(groupedEntries).map(dateKey => (
            <div key={dateKey} className="mb-space-xl relative">
              <div className="font-label-rpg-sm text-text-muted uppercase tracking-widest mb-space-md sticky top-0 bg-background/95 backdrop-blur z-20 py-2">
                {dateKey}
              </div>
              <div className="flex flex-col relative z-10">
                {groupedEntries[dateKey].map(entry => (
                  <JournalEvent key={entry.id} entry={entry} onClick={() => setSelectedEntry(entry)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Detail */}
      {selectedEntry && (
        <JournalEntryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </motion.div>
  );
};
