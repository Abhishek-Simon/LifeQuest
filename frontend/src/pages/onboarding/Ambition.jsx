import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';

export const Ambition = () => {
  const { state, updateState } = useOnboarding();
  const navigate = useNavigate();
  
  const [inputValue, setInputValue] = useState(state.ambition || '');

  const handleArchetypeClick = (title) => {
    setInputValue(title);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    updateState({ ambition: inputValue });
    navigate('/onboarding/goal');
  };

  const handleClear = () => {
    setInputValue('');
  };

  const archetypes = [
    {
      title: "Crack my DSA interview",
      desc: "Master graph theory, trees & dynamic algorithms",
      icon: "code_blocks",
      color: "primary",
      stats: ["INTELLECT +15", "DISCIPLINE +12"],
      tier: "TIER A QUEST"
    },
    {
      title: "Get fit & run 10k",
      desc: "Cardio threshold, cadence & physical grit",
      icon: "directions_run",
      color: "vitality-emerald",
      stats: ["STRENGTH +18", "VITALITY +14"],
      tier: "TIER B QUEST"
    },
    {
      title: "Read 25 books this year",
      desc: "Cognitive breadth & continuous mental synthesis",
      icon: "auto_stories",
      color: "tertiary",
      stats: ["WISDOM +20", "FOCUS +10"],
      tier: "TIER B QUEST"
    },
    {
      title: "Build a profitable startup",
      desc: "Launch MVP, acquire users & generate initial ARR",
      icon: "rocket_launch",
      color: "secondary",
      stats: ["CREATIVITY +16", "ENDURANCE +15"],
      tier: "LEGENDARY"
    },
    {
      title: "Master deep work discipline",
      desc: "4 hours uninterrupted daily cognitive flow sessions",
      icon: "timer",
      color: "primary-container",
      stats: ["DISCIPLINE +16", "FOCUS +18"],
      tier: "",
      spanTwo: true
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Progress Header Rail */}
      <div className="w-full px-margin md:px-margin-desktop py-space-md flex flex-col gap-space-xs bg-surface-deck/40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-rpg text-label-rpg text-primary tracking-widest uppercase">Protocol Initialization</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted">SYNC PHASE 1/5</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="font-label-rpg text-label-rpg text-secondary tracking-wider">20% SYSTEM CALIBRATION</span>
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted hidden sm:inline">[LINKED ID: #9842]</span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto w-full h-1 bg-surface-container-lowest overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary w-1/5 shadow-[0_0_12px_rgba(160,120,255,0.8)]"></div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-margin md:px-margin-desktop py-space-xl flex flex-col items-center justify-center">
        {/* Ambient Lights */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="w-full max-w-3xl flex flex-col gap-space-xl">
          
          <div className="flex flex-col items-center text-center gap-space-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-card text-primary shadow-[0_0_16px_-4px_rgba(160,120,255,0.3)]">
              <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>terminal</span>
              <span className="font-label-rpg text-label-rpg tracking-widest uppercase">CHAPTER 0 // AWAKENING</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight mt-space-xs uppercase">
              What do you want to achieve?
            </h1>
            <p className="font-body-lg text-body-lg text-text-secondary max-w-xl">
              Choose an archetype quest below or transmit your ambition in natural language.
            </p>
          </div>

          <form onSubmit={handleContinue} className="w-full relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-300"></div>
            <div className="relative w-full bg-surface-card rounded-xl p-space-sm shadow-xl flex items-center gap-space-md">
              <div className="pl-space-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">neurology</span>
              </div>
              <input 
                className="w-full bg-transparent font-body-lg text-body-lg text-text-primary placeholder:text-text-muted focus:outline-none py-space-sm" 
                placeholder="e.g. Crack my DSA interview, Run a half marathon, Build my SaaS MVP..." 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="button" onClick={handleClear} className="px-space-xs text-text-muted hover:text-text-primary transition-colors flex items-center">
                <span className="material-symbols-outlined text-lg">cancel</span>
              </button>
              <div className="hidden sm:flex items-center gap-1 bg-surface-deck px-space-sm py-1 rounded text-text-muted font-label-rpg-sm text-label-rpg-sm">
                <span>PROMPT ACTIVE</span>
              </div>
            </div>
          </form>

          <div className="flex flex-col gap-space-sm w-full">
            <div className="flex items-center justify-between">
              <span className="font-label-rpg text-label-rpg text-text-muted tracking-wider uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">view_timeline</span>
                Preset Archetypes Matrix
              </span>
              <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Select one or compose custom</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {archetypes.map((arch) => {
                const isSelected = inputValue.toLowerCase() === arch.title.toLowerCase();
                
                return (
                  <div 
                    key={arch.title}
                    onClick={() => handleArchetypeClick(arch.title)}
                    className={`cursor-pointer relative p-space-md rounded-xl transition-all duration-200 flex flex-col justify-between gap-space-md ${arch.spanTwo ? 'md:col-span-2 sm:flex-row sm:items-center' : ''} ${isSelected ? 'shadow-[0_0_20px_-4px_rgba(160,120,255,0.35)] bg-gradient-to-br from-surface-card via-surface-card to-primary/10' : 'bg-surface-card hover:bg-surface-overlay'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className={`w-9 h-9 rounded bg-${arch.color}/20 text-${arch.color} flex items-center justify-center shadow-inner`}>
                          <span className="material-symbols-outlined text-xl">{arch.icon}</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-text-primary">{arch.title}</h2>
                          <p className="font-body-sm text-body-sm text-text-muted">{arch.desc}</p>
                        </div>
                      </div>
                      {!arch.spanTwo && (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary-container text-on-primary-container' : 'bg-surface-deck text-transparent'}`}>
                          <span className="material-symbols-outlined text-xs">check</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex flex-wrap items-center gap-space-xs ${arch.spanTwo ? 'justify-between sm:justify-end' : 'pt-space-xs'}`}>
                      {arch.stats.map((stat, idx) => {
                        const bgCol = idx === 0 ? `bg-${arch.color}/10 text-${arch.color}` : `bg-secondary/10 text-secondary`;
                        return (
                          <span key={idx} className={`font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded ${bgCol} tracking-wider`}>
                            {stat}
                          </span>
                        );
                      })}
                      {arch.tier && (
                        <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-surface-deck text-text-muted ml-auto tracking-wider font-stat-display-sm">
                          {arch.tier}
                        </span>
                      )}
                      {arch.spanTwo && (
                        <div className={`ml-2 w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary-container text-on-primary-container' : 'bg-surface-deck text-transparent'}`}>
                          <span className="material-symbols-outlined text-xs">check</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Conduit Rail */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md">
            <div className="flex items-center gap-space-sm text-text-muted font-label-rpg-sm text-label-rpg-sm">
              <span className="px-2 py-1 bg-surface-card rounded text-text-secondary">RETURN ↵</span>
              <span>PRESS ENTER TO COMMIT DIRECTIVE</span>
            </div>
            <div className="flex items-center gap-space-md w-full sm:w-auto">
              <button 
                onClick={handleContinue}
                disabled={!inputValue.trim()}
                className={`w-full sm:w-auto px-space-xl py-space-sm bg-primary-container hover:bg-primary text-on-primary-container font-headline-sm text-headline-sm rounded-lg shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:shadow-[0_0_32px_rgba(160,120,255,0.7)] transition-all duration-200 flex items-center justify-center gap-space-sm ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
