import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import { Avatar } from '../../components/common/Avatar';
import { useAuth } from '../../context/AuthContext';
import { OnboardingProgress } from '../../components/onboarding/OnboardingProgress';

export const Awakening = () => {
  const { state, forgeCharacter, completeOnboarding } = useOnboarding();
  const { completeOnboardingFlow } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('initializing'); // initializing, success, error

  useEffect(() => {
    let isMounted = true;
    
    const initialize = async () => {
      if (state.character) {
        if (isMounted) setStatus('success');
        return;
      }
      
      try {
        if (isMounted) setStatus('initializing');
        await Promise.all([
          forgeCharacter(),
          new Promise(resolve => setTimeout(resolve, 1500)) // minimum cinematic delay
        ]);
        if (isMounted) setStatus('success');
      } catch (err) {
        if (isMounted) setStatus('error');
      }
    };

    initialize();
    return () => { isMounted = false; };
  }, []);

  const handleInitiate = () => {
    completeOnboarding();
    completeOnboardingFlow();
    navigate('/dashboard');
  };

  if (status === 'error') {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center relative gap-space-md">
        <span className="material-symbols-outlined text-[64px] text-hazard-crimson">warning</span>
        <h2 className="font-headline-lg text-headline-lg text-text-primary uppercase tracking-wider">CHARACTER FORGING FAILED</h2>
        <p className="font-body-md text-body-md text-text-secondary text-center max-w-md">
          Your progress is safe. Try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-space-sm mt-space-md">
           <button onClick={() => window.location.reload()} className="px-space-lg py-space-sm bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg uppercase transition-colors shadow-md">
              RETRY
           </button>
           <button onClick={() => navigate('/onboarding/attributes')} className="px-space-lg py-space-sm bg-surface-deck hover:bg-surface-overlay text-text-secondary border border-border-subtle rounded font-label-rpg uppercase transition-colors">
              RETURN TO ATTRIBUTES
           </button>
        </div>
      </div>
    );
  }

  if (status === 'initializing' || !state.character) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center relative">
        <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
        <span className="font-label-rpg text-label-rpg text-primary tracking-widest mt-space-md uppercase animate-pulse">Forging Character...</span>
      </div>
    );
  }

  const { character } = state;

  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="w-full px-margin md:px-margin-desktop pt-space-sm pb-space-lg">
        <OnboardingProgress step={5} title="SEQUENCE CALIBRATION" percentage={100} syncText="SYNCED" />
      </div>

      <div className="w-full px-margin md:px-margin-desktop py-space-md flex-1 flex flex-col justify-center relative">
        {/* Ambient Holographic Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-primary/10 via-secondary/10 to-transparent blur-3xl pointer-events-none rounded-full -z-10"></div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-space-lg">
          
          <div className="flex flex-col items-center text-center gap-space-xs">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-card shadow-md text-primary font-label-rpg text-label-rpg tracking-wider uppercase">
              <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              <span>Chapter 0 // Character Forged</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight max-w-2xl uppercase">
              Your adventure begins
            </h1>
            <p className="font-body-md text-body-md text-text-secondary max-w-xl">
              Your real-world journey has been initialized. Complete your first quest to claim your starting XP and unlock the command deck.
            </p>
          </div>

          {/* Character Reveal Manifest */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-stretch">
            
            {/* Left Column: Character Dossier */}
            <div className="lg:col-span-5 bg-surface-card rounded-xl p-space-lg flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="absolute top-3 right-3 font-label-rpg-sm text-label-rpg-sm text-text-muted flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-vitality-emerald rounded-full"></span>
                <span>SYSTEM IDENTIFIED</span>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="relative w-full aspect-square max-h-64 rounded-lg overflow-hidden bg-surface-deck border-2 border-primary group shadow-inner">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                  <Avatar 
                    alt={`${character.name}'s character art`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={character.avatarUrl} 
                    name={character.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent z-20"></div>
                  <div className="absolute bottom-3 left-3 bg-surface-overlay/85 backdrop-blur-md px-space-sm py-1 rounded-md shadow-md z-30">
                    <span className="font-label-rpg text-label-rpg text-secondary tracking-widest uppercase">CLASS NODE: {character.archetype.split('//')[0].trim().toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-stat-display text-stat-display text-text-primary uppercase tracking-wide">{character.name}</h2>
                    <span className="font-label-rpg text-label-rpg text-primary bg-primary-container/20 px-space-xs py-0.5 rounded uppercase">{character.title}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-secondary">Specialization: {character.specialization}</p>
                </div>
              </div>

              <div className="pt-space-md mt-space-sm bg-surface-deck/70 rounded-lg p-space-sm shadow-sm flex flex-col gap-space-xs">
                <div className="text-text-muted font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider">Calibration Core Stats</div>
                <div className="grid grid-cols-3 gap-space-xs text-center">
                  <div className="bg-surface-card p-2 rounded flex flex-col items-center">
                    <span className="font-stat-display-sm text-stat-display-sm text-secondary font-bold">{character.stats.intellect}</span>
                    <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Intellect</span>
                  </div>
                  <div className="bg-surface-card p-2 rounded flex flex-col items-center">
                    <span className="font-stat-display-sm text-stat-display-sm text-primary font-bold">{character.stats.discipline}</span>
                    <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Discipline</span>
                  </div>
                  <div className="bg-surface-card p-2 rounded flex flex-col items-center">
                    <span className="font-stat-display-sm text-stat-display-sm text-vitality-emerald font-bold">{character.stats.endurance}</span>
                    <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Endurance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Directives */}
            <div className="lg:col-span-7 flex flex-col gap-space-md justify-between">
              
              <div className="bg-surface-deck rounded-xl p-space-md shadow-md flex items-center justify-between">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-surface-card flex items-center justify-center text-tertiary flex-shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-rpg-sm text-label-rpg-sm text-tertiary uppercase tracking-widest">Active Primary Directive</span>
                    <span className="font-headline-sm text-headline-sm text-text-primary truncate">Goal: {character.pathName}</span>
                  </div>
                </div>
                <span className="font-label-rpg text-label-rpg text-on-surface-variant bg-surface-card px-space-sm py-1 rounded flex-shrink-0 ml-2 hidden sm:inline-block">Stage 1 of 6</span>
              </div>

              <div className="bg-surface-card rounded-xl p-space-lg relative overflow-hidden shadow-xl flex flex-col gap-space-md">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-secondary to-vitality-emerald"></div>
                <div className="flex flex-wrap items-center justify-between gap-space-xs">
                  <div className="inline-flex items-center gap-space-xs text-secondary font-label-rpg text-label-rpg uppercase tracking-wider bg-secondary/10 px-space-xs py-0.5 rounded">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>Recommended First Action • 15 Min</span>
                  </div>
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest hidden sm:inline-block">Reroll Cost: 0G</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    Initialize Setup &amp; Baseline Assessment
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary">
                    Establishing your isolated environment and running the baseline warmup builds immediate starting velocity and clears sensory friction.
                  </p>
                </div>

                <div className="bg-surface-deck rounded-lg p-space-md flex flex-col gap-space-xs">
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-wider">Loot &amp; Exp Allocation Upon Completion:</span>
                  <div className="flex flex-wrap gap-space-xs">
                    <div className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container rounded font-label-rpg text-label-rpg text-primary">
                      <span className="material-symbols-outlined text-sm text-primary">bolt</span>
                      <span>+100 XP</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container rounded font-label-rpg text-label-rpg text-tertiary">
                      <span className="material-symbols-outlined text-sm text-tertiary">monetization_on</span>
                      <span>+50 Gold</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container rounded font-label-rpg text-label-rpg text-secondary">
                      <span className="material-symbols-outlined text-sm text-secondary">psychology</span>
                      <span>+3 Intellect</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-space-sm p-space-xs rounded hover:bg-surface-deck transition-colors cursor-pointer select-none">
                  <input defaultChecked className="w-5 h-5 rounded bg-surface-deck accent-primary cursor-pointer" type="checkbox"/>
                  <span className="font-body-sm text-body-sm text-text-primary">Auto-load this objective onto your Command Deck pinned list</span>
                </label>
              </div>

              <div className="px-space-md py-space-sm bg-surface-container rounded-lg flex items-center justify-between text-text-muted font-body-sm text-body-sm">
                <span className="italic font-body-sm">"The disciplined mind turns simple habits into sovereign mastery."</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-primary">V1.0 INITIALIZED</span>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-md flex flex-col-reverse sm:flex-row items-center justify-between gap-space-md">
            <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-space-md py-space-sm rounded bg-surface-card hover:bg-surface-overlay text-text-secondary hover:text-text-primary transition-all flex items-center justify-center gap-space-xs font-headline-sm text-headline-sm shadow-sm" type="button">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back</span>
            </button>
            <span className="font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors tracking-wide uppercase font-label-rpg-sm cursor-pointer hidden sm:inline-block" onClick={handleInitiate}>
              Skip Intro &amp; Go to Dashboard
            </span>
            <button onClick={handleInitiate} className="w-full sm:w-auto relative group overflow-hidden px-space-xl py-space-md bg-primary hover:bg-primary-container text-on-primary-container rounded shadow-[0_0_24px_rgba(160,120,255,0.4)] hover:shadow-[0_0_36px_rgba(160,120,255,0.7)] transition-all duration-300 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-sm" type="button">
              <span className="relative z-10 flex items-center gap-space-xs font-bold text-on-primary-container">
                <span>BEGIN ADVENTURE</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
