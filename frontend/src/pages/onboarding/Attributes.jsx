import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import { OnboardingProgress } from '../../components/onboarding/OnboardingProgress';

export const Attributes = () => {
  const { state } = useOnboarding();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto px-margin md:px-margin-desktop py-space-lg flex flex-col gap-space-xl relative">
      <OnboardingProgress step={4} title="CALIBRATION" percentage={80} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-space-sm max-w-3xl">
          <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-0.5 rounded bg-surface-container-high text-primary shadow-sm shadow-primary/10">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider">Chapter 0 // Attribute Calibration</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">
            Every action trains your core attributes.
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
            Real-world habits and productivity directly boost these 6 RPG stats. Do not worry about balancing everything at once—your chosen path directs your natural gravity.
          </p>
        </div>
        <div className="bg-surface-card rounded-xl p-space-md flex items-center gap-space-md shadow-md">
          <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Active Archetype Matrix</span>
            <span className="font-headline-sm text-headline-sm text-text-primary">{state.ambition || 'Generalist Protocol'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {/* Strength */}
        <div className="group relative bg-surface-card rounded-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:bg-surface-container-high shadow-sm hover:shadow-md">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-hazard-crimson/10 flex items-center justify-center text-hazard-crimson">
                <span className="material-symbols-outlined text-[26px]">fitness_center</span>
              </div>
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted px-space-xs py-0.5 rounded bg-surface-deck">STR // 01</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight">Strength</h2>
              <p className="font-body-md text-body-md text-text-secondary mt-space-xs">
                Physical vitality, cardiovascular capacity, endurance training, and raw physical exertion.
              </p>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md flex items-center justify-between text-text-muted font-label-rpg text-label-rpg">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">bolt</span> BASE CAPACITY
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-hazard-crimson">LVL 08</span>
          </div>
        </div>

        {/* Intellect */}
        <div className="group relative bg-surface-card rounded-xl p-space-lg flex flex-col justify-between transition-all duration-300 shadow-md ring-1 ring-secondary/30 bg-gradient-to-b from-surface-card to-surface-card/90">
          <div className="absolute -top-3 right-6 bg-secondary text-surface-container-lowest font-label-rpg-sm text-label-rpg-sm font-bold uppercase tracking-wider px-space-sm py-0.5 rounded shadow-sm">
            Prime Directive
          </div>
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shadow-sm shadow-secondary/20">
                <span className="material-symbols-outlined text-[26px]">memory</span>
              </div>
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-secondary px-space-xs py-0.5 rounded bg-secondary/10">INT // 02</span>
            </div>
            <div>
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight">Intellect</h2>
                <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              </div>
              <p className="font-body-md text-body-md text-text-secondary mt-space-xs">
                Algorithmic logic, system architecture, reading, coding, and technical problem solving.
              </p>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md flex items-center justify-between text-secondary font-label-rpg text-label-rpg">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> ACCELERATED GROWTH
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-secondary">LVL 24</span>
          </div>
        </div>

        {/* Endurance */}
        <div className="group relative bg-surface-card rounded-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:bg-surface-container-high shadow-sm hover:shadow-md">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-vitality-emerald/10 flex items-center justify-center text-vitality-emerald">
                <span className="material-symbols-outlined text-[26px]">all_inclusive</span>
              </div>
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted px-space-xs py-0.5 rounded bg-surface-deck">END // 03</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight">Endurance</h2>
              <p className="font-body-md text-body-md text-text-secondary mt-space-xs">
                Consistency across days, long work sessions, grit, and maintaining streaks through resistance.
              </p>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md flex items-center justify-between text-text-muted font-label-rpg text-label-rpg">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">history</span> STREAK MULTIPLIER
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-vitality-emerald">LVL 14</span>
          </div>
        </div>

        {/* Wisdom */}
        <div className="group relative bg-surface-card rounded-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:bg-surface-container-high shadow-sm hover:shadow-md">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">psychology</span>
              </div>
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted px-space-xs py-0.5 rounded bg-surface-deck">WIS // 04</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight">Wisdom</h2>
              <p className="font-body-md text-body-md text-text-secondary mt-space-xs">
                Reflection, mental models, emotional regulation, meditation, and strategic decision making.
              </p>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md flex items-center justify-between text-text-muted font-label-rpg text-label-rpg">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">self_improvement</span> EQUANIMITY
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-primary">LVL 12</span>
          </div>
        </div>

        {/* Creativity */}
        <div className="group relative bg-surface-card rounded-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:bg-surface-container-high shadow-sm hover:shadow-md">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[26px]">auto_awesome</span>
              </div>
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted px-space-xs py-0.5 rounded bg-surface-deck">CRE // 05</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight">Creativity</h2>
              <p className="font-body-md text-body-md text-text-secondary mt-space-xs">
                Writing, brainstorming, building original software, novel solutions, and design craft.
              </p>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md flex items-center justify-between text-text-muted font-label-rpg text-label-rpg">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lightbulb</span> SYNTHESIS
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-tertiary">LVL 10</span>
          </div>
        </div>

        {/* Discipline */}
        <div className="group relative bg-surface-card rounded-xl p-space-lg flex flex-col justify-between transition-all duration-300 shadow-md ring-1 ring-tertiary/30 bg-gradient-to-b from-surface-card to-surface-card/90">
          <div className="absolute -top-3 right-6 bg-tertiary text-on-tertiary-container font-label-rpg-sm text-label-rpg-sm font-bold uppercase tracking-wider px-space-sm py-0.5 rounded shadow-sm">
            Secondary Focus
          </div>
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary shadow-sm shadow-tertiary/20">
                <span className="material-symbols-outlined text-[26px]">timer</span>
              </div>
              <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-tertiary px-space-xs py-0.5 rounded bg-tertiary/10">DIS // 06</span>
            </div>
            <div>
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight">Discipline</h2>
                <span className="material-symbols-outlined text-tertiary text-[16px]">stars</span>
              </div>
              <p className="font-body-md text-body-md text-text-secondary mt-space-xs">
                Waking on time, deep focus blocks, finishing daily protocols, and avoiding distraction.
              </p>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md flex items-center justify-between text-tertiary font-label-rpg text-label-rpg">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock_clock</span> PROTOCOL SYNC
            </span>
            <span className="font-stat-display-sm text-stat-display-sm text-tertiary">LVL 19</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-surface-card rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-md">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined">radar</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-rpg-sm text-label-rpg-sm uppercase tracking-wider text-text-muted">Trajectory Analysis</span>
            <p className="font-body-md text-body-md text-text-primary">
              Your path primarily advances <span className="text-secondary font-semibold">Intellect</span> &amp; <span className="text-tertiary font-semibold">Discipline</span>. Stat weightings rebalance dynamically.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm text-text-secondary font-label-rpg-sm text-label-rpg-sm whitespace-nowrap bg-surface-deck px-space-md py-space-xs rounded">
          <span className="w-2 h-2 rounded-full bg-vitality-emerald animate-ping"></span>
          EXP GAIN BIAS: +35% INT / +20% DIS
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-space-md mt-4 border-t border-surface-deck pt-6">
        <button onClick={() => navigate(-1)} className="group px-space-lg py-space-sm rounded bg-surface-card hover:bg-surface-container text-text-secondary hover:text-text-primary transition-colors flex items-center gap-space-xs font-headline-sm text-headline-sm shadow-sm" type="button">
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back
        </button>
        <div className="flex items-center gap-space-md">
          <span className="hidden sm:inline font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Configuration Staged</span>
          <button onClick={() => navigate('/onboarding/awakening')} className="group px-space-xl py-space-sm rounded bg-primary text-surface-container-lowest font-headline-sm text-headline-sm font-bold transition-all duration-200 hover:bg-primary-fixed shadow-md shadow-primary/20 hover:shadow-primary/40 flex items-center gap-space-xs" type="button">
            Confirm Attributes
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
