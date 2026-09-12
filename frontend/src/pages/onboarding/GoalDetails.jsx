import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import { OnboardingProgress } from '../../components/onboarding/OnboardingProgress';

export const GoalDetails = () => {
  const { state, updateGoalDetails } = useOnboarding();
  const navigate = useNavigate();
  
  const [desc, setDesc] = useState(state.goalDetails?.description || '');

  const handleInsert = (snippet) => {
    setDesc((prev) => prev.trim() ? prev.trim() + ' ' + snippet : snippet);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    updateGoalDetails({ description: desc });
    navigate('/onboarding/path');
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-margin md:px-margin-desktop py-space-xl relative">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-secondary-container/5 blur-[100px] rounded-full pointer-events-none"></div>

      <OnboardingProgress step={2} title="CALIBRATION" percentage={40} />

      <div className="relative z-10 flex flex-col items-start gap-space-lg">
        
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-primary-container/15 text-primary font-label-rpg-sm text-label-rpg-sm tracking-wider shadow-[0_0_12px_rgba(160,120,255,0.25)]">
            <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>terminal</span>
            CHAPTER 0 // CALIBRATION
          </span>
          <div onClick={() => navigate(-1)} className="inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-card shadow-sm hover:bg-surface-container-high transition-colors group cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-vitality-emerald shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
            <span className="font-label-ui text-label-ui text-text-primary tracking-tight">
              Target: <span className="text-on-surface">{state.ambition || 'Unknown'}</span>
            </span>
            <button className="text-text-muted group-hover:text-primary transition-colors flex items-center">
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
            </button>
          </div>
        </div>

        <div className="space-y-space-xs max-w-2xl">
          <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight font-bold uppercase">
            Tell us more
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
            Share your target timeline, current roadblocks, or specific milestones. LifeQuest's Decision Engine uses this to forge your customized campaign.
          </p>
        </div>

        <div className="w-full relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container/30 via-secondary-container/20 to-primary-container/30 rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative w-full bg-surface-card rounded-xl shadow-xl overflow-hidden">
            <div className="w-full px-space-md py-space-xs bg-surface-container-lowest flex items-center justify-between font-label-rpg-sm text-label-rpg-sm text-text-muted">
              <div className="flex items-center gap-space-xs">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                <span>SYNAPSE ENGINE // CONTEXT FEED</span>
              </div>
              <span className="font-stat-display-sm text-stat-display-sm text-text-secondary">{desc.length} CHARS</span>
            </div>
            
            <div className="p-space-lg">
              <textarea 
                className="w-full bg-transparent font-body-lg text-body-lg text-text-primary placeholder:text-text-muted resize-none focus:outline-none leading-relaxed transition-all" 
                placeholder="Detail your ambition, timeline constraints, bottlenecks, or target frequency..." 
                rows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            
            <div className="px-space-lg py-space-sm bg-surface-container/60 flex flex-wrap items-center justify-between gap-space-sm text-text-muted font-label-ui text-label-ui">
              <span className="flex items-center gap-1.5 text-secondary font-label-rpg-sm text-label-rpg-sm tracking-wider">
                <span className="material-symbols-outlined text-[16px]">neurology</span>
                NEURAL PARSING READY
              </span>
              <span className="hidden sm:inline-block text-text-muted/60">Auto-saves to memory matrix</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-space-sm pt-space-xs">
          <div className="flex items-center gap-space-xs font-label-rpg-sm text-label-rpg-sm text-text-muted tracking-wider uppercase">
            <span className="material-symbols-outlined text-[14px]">lightbulb</span>
            <span>QUICK CALIBRATION PROMPTS</span>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            <button type="button" onClick={() => handleInsert('Target timeline: In 90 days (Q3 Interview Loop).')} className="group px-space-md py-2 rounded bg-surface-deck hover:bg-surface-container shadow-sm transition-all text-left flex items-center gap-space-xs cursor-pointer">
              <span className="material-symbols-outlined text-[16px] text-tertiary">calendar_clock</span>
              <span className="font-body-sm text-body-sm text-text-secondary group-hover:text-text-primary">
                Target deadline <span className="text-text-muted">(e.g. In 90 days)</span>
              </span>
            </button>
            <button type="button" onClick={() => handleInsert('Key friction: DP, Complex Graphs, and System Design.')} className="group px-space-md py-2 rounded bg-surface-deck hover:bg-surface-container shadow-sm transition-all text-left flex items-center gap-space-xs cursor-pointer">
              <span className="material-symbols-outlined text-[16px] text-secondary">crisis_alert</span>
              <span className="font-body-sm text-body-sm text-text-secondary group-hover:text-text-primary">
                Key weak areas <span className="text-text-muted">(e.g. DP, System Design)</span>
              </span>
            </button>
            <button type="button" onClick={() => handleInsert('Daily protocol: 45 min deep focus per day.')} className="group px-space-md py-2 rounded bg-surface-deck hover:bg-surface-container shadow-sm transition-all text-left flex items-center gap-space-xs cursor-pointer">
              <span className="material-symbols-outlined text-[16px] text-vitality-emerald">timer</span>
              <span className="font-body-sm text-body-sm text-text-secondary group-hover:text-text-primary">
                Daily commitment <span className="text-text-muted">(e.g. 45 min/day)</span>
              </span>
            </button>
          </div>
        </div>

        <div className="w-full pt-space-xl flex items-center justify-between gap-space-md">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-surface-deck text-text-secondary hover:text-text-primary hover:bg-surface-container transition-all font-headline-sm text-headline-sm shadow-sm" type="button">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-space-md">
            <span className="hidden sm:flex items-center gap-1.5 font-label-ui text-label-ui text-text-muted">
              <kbd className="px-2 py-0.5 bg-surface-card rounded text-text-secondary font-mono text-[11px] shadow">⌘</kbd>
              <kbd className="px-2 py-0.5 bg-surface-card rounded text-text-secondary font-mono text-[11px] shadow">Enter</kbd>
              <span>to submit</span>
            </span>
            <button onClick={handleContinue} disabled={!desc.trim()} className={`inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-primary text-on-primary font-headline-sm text-headline-sm font-bold shadow-[0_0_24px_rgba(160,120,255,0.4)] hover:shadow-[0_0_32px_rgba(208,188,255,0.6)] transition-all ${!desc.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 active:scale-[0.99]'}`} type="button">
              <span>Continue</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
