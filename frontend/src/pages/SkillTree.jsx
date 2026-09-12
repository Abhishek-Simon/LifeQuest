import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillService } from '../services/api/skillService';
import { SkillTreeHeader } from '../components/skill-tree/SkillTreeHeader';
import { SkillNode } from '../components/skill-tree/SkillNode';
import { SkillDetailPanel } from '../components/skill-tree/SkillDetailPanel';

const attributesList = ['strength', 'intellect', 'endurance', 'wisdom', 'creativity', 'discipline'];

export const SkillTree = () => {
  const [activeBranch, setActiveBranch] = useState('intellect');
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  const [treeData, setTreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTree = async () => {
      try {
        setIsLoading(true);
        const data = await skillService.getSkillTree(activeBranch);
        if (isMounted) {
          setTreeData(data);
          // Auto-select the lowest unlocked or available node to focus the view
          const focusNode = data.skills.find(s => s.status === 'available') || 
                            data.skills.slice().reverse().find(s => s.status === 'unlocked' || s.status === 'mastered');
          setSelectedSkill(focusNode || null);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchTree();
    return () => { isMounted = false; };
  }, [activeBranch]);

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-space-2xl text-center h-full">
        <span className="material-symbols-outlined text-4xl text-hazard-crimson mb-space-sm">error</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Skill Tree Unavailable</h2>
        <p className="font-body-md text-text-secondary mb-space-md">We couldn't load your progression path.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-on-primary rounded font-label-rpg uppercase transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col h-full"
    >
      <SkillTreeHeader />

      <div className="flex flex-col md:flex-row gap-space-lg flex-1 min-h-0">
        
        {/* Branch Selector */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0 w-full md:w-48 lg:w-56 scrollbar-hide">
          <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest hidden md:block mb-2">Branches</span>
          {attributesList.map(attr => {
            const isActive = activeBranch === attr;
            return (
              <button
                key={attr}
                onClick={() => {
                  if (!isActive) {
                    setActiveBranch(attr);
                    setSelectedSkill(null);
                    setTreeData(null);
                  }
                }}
                className={`flex flex-col items-start px-4 py-3 rounded-lg border transition-colors whitespace-nowrap min-w-[120px] md:min-w-0 ${isActive ? 'bg-primary/10 border-primary text-text-primary' : 'bg-surface-deck border-transparent text-text-muted hover:bg-surface-overlay hover:text-text-secondary'}`}
              >
                <span className="font-label-rpg text-label-rpg uppercase tracking-wider">{attr}</span>
              </button>
            );
          })}
        </div>

        {/* Tree Canvas */}
        <div className="flex-1 bg-surface-deck rounded-xl border border-border-subtle relative overflow-hidden flex flex-col md:flex-row shadow-inner min-h-[500px]">
          {/* Subtle Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
          
          <div className="flex-1 overflow-y-auto p-space-xl relative flex flex-col items-center">
            
            {isLoading || !treeData ? (
               <div className="flex flex-col items-center gap-12 relative w-full animate-pulse mt-8">
                 <div className="w-48 h-20 bg-surface-base rounded-lg border border-border-subtle"></div>
                 <div className="w-0.5 h-12 bg-border-subtle"></div>
                 <div className="w-48 h-20 bg-surface-base rounded-lg border border-border-subtle"></div>
                 <div className="w-0.5 h-12 bg-border-subtle"></div>
                 <div className="w-48 h-20 bg-surface-base rounded-lg border border-border-subtle opacity-50"></div>
               </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeBranch}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center relative w-full max-w-sm pb-24 md:pb-0" // Extra padding for mobile bottom sheet
                >
                  <div className="mb-space-lg text-center">
                    <h2 className="font-headline-lg text-headline-lg text-primary uppercase">{activeBranch} Branch</h2>
                    <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest">{treeData.unlockedCount} / {treeData.totalSkills} Mastered</span>
                  </div>

                  {treeData.skills.length === 0 ? (
                    <div className="text-center p-space-lg bg-surface-card border border-border-subtle rounded-xl mt-8">
                       <h3 className="font-headline-md text-text-primary uppercase mb-2">Your Skill Tree is Waiting</h3>
                       <p className="font-body-md text-text-secondary">Complete quests to begin building your progression path.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-12 relative w-full">
                      {/* Base connection line spanning the whole tree height */}
                      <div className="absolute top-10 bottom-10 w-0.5 bg-border-subtle z-0"></div>

                      {treeData.skills.map((skill, index) => {
                        const isSelected = selectedSkill?.id === skill.id;
                        const isLineActive = skill.status === 'available' || skill.status === 'unlocked' || skill.status === 'mastered';

                        return (
                          <div key={skill.id} className="relative z-10 w-full flex flex-col items-center">
                            {/* Active connection overlay (lights up the path to available/unlocked nodes) */}
                            {index > 0 && isLineActive && (
                              <div className="absolute bottom-full w-0.5 h-12 bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                            )}
                            
                            <SkillNode 
                              skill={skill}
                              isSelected={isSelected}
                              onClick={() => setSelectedSkill(skill)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
            
          </div>

          {/* Detail Panel Area (Desktop: Right side fixed width, Mobile: Bottom fixed) */}
          <div className={`w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-border-subtle bg-surface-base/95 md:bg-surface-base/80 backdrop-blur z-20 
                           fixed md:relative bottom-0 left-0 right-0 max-h-[50vh] md:max-h-none overflow-y-auto shadow-[0_-8px_24px_rgba(0,0,0,0.5)] md:shadow-none
                           ${selectedSkill ? 'block' : 'hidden md:block opacity-50'}`}>
            <div className="p-space-md h-full">
              {selectedSkill ? (
                <SkillDetailPanel 
                  skill={selectedSkill}
                  attributeKey={activeBranch}
                  userSP={treeData?.userSP || 0}
                  onClose={() => setSelectedSkill(null)}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-text-muted p-space-lg border-2 border-dashed border-border-subtle rounded-xl">
                  <span className="material-symbols-outlined text-[48px] mb-2 opacity-50">account_tree</span>
                  <span className="font-label-rpg text-label-rpg uppercase">Select a Skill Node</span>
                  <span className="font-body-sm text-body-sm mt-1">Tap any node on the tree to view its requirements and bonuses.</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
