import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';

export const AdventurePath = () => {
  const { state } = useOnboarding();
  const navigate = useNavigate();

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8 md:gap-12">
      {/* Top System Telemetry / Step Tracker */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/60 backdrop-blur-md p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_#4cd7f6] animate-pulse"></div>
          <div className="flex flex-col">
            <span className="font-label-rpg text-label-rpg text-secondary tracking-widest uppercase">Protocol Milestone Calibrator</span>
            <span className="font-headline-sm text-headline-sm text-text-primary">Step 03 // Campaign Path Synthesis</span>
          </div>
        </div>
        <div className="flex flex-col sm:items-end gap-1.5 w-full sm:w-72">
          <div className="flex items-center justify-between w-full font-label-rpg-sm text-label-rpg-sm">
            <span className="text-text-muted uppercase tracking-wider">Calibration Sequence</span>
            <span className="text-primary font-bold">60% COMPLETE</span>
          </div>
          <div className="w-full h-1.5 bg-surface-deck rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary-fixed rounded-full w-3/5 shadow-[0_0_12px_rgba(208,188,255,0.7)]"></div>
          </div>
        </div>
      </div>

      {/* Main Strategic Header & Directive Brief */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-surface-deck to-surface-card p-6 md:p-10 shadow-xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-primary-container/20 text-primary shadow-[0_0_14px_rgba(160,120,255,0.2)]">
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span className="font-label-rpg text-label-rpg tracking-widest uppercase font-semibold">Chapter 0 // Campaign Generation</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">
            Your Adventure Path: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-fixed">{state.ambition || 'Custom Quest'}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
            LifeQuest has converted your ambition into a structured progression tree. Every node unlocks the next tier of mastery, transforming algorithmic concepts into field-tested combat attributes.
          </p>
          {/* Compact Metadata Metric Tickers */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-text-muted font-label-rpg text-label-rpg">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-deck/80 text-text-secondary">
              <span className="material-symbols-outlined text-base text-secondary">alt_route</span>
              <span>PATH ARCHETYPE: <strong className="text-text-primary">NEURAL RECURSION</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-deck/80 text-text-secondary">
              <span className="material-symbols-outlined text-base text-vitality-emerald">verified</span>
              <span>DIFFICULTY CURVE: <strong className="text-text-primary">PARABOLIC ASCENT</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-deck/80 text-text-secondary">
              <span className="material-symbols-outlined text-base text-tertiary">military_tech</span>
              <span>MAX TIER: <strong className="text-tertiary font-bold">LEGENDARY APEX</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Central Progression Tree & Tactical Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Progression Chain Canvas (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Node 1: Unlocked Active Origin */}
          <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-surface-card hover:bg-surface-overlay transition-all duration-300 shadow-lg cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary rounded-l-xl shadow-[0_0_12px_#4cd7f6]"></div>
            <div className="flex items-center gap-4 pl-2">
              <div className="relative flex-shrink-0 w-12 h-12 rounded-lg bg-surface-deck flex items-center justify-center text-secondary shadow-[0_0_16px_rgba(76,215,246,0.3)]">
                <span className="material-symbols-outlined text-2xl">grid_view</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-secondary/15 text-secondary uppercase font-semibold">Node 01 // Starting Node</span>
                  <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-vitality-emerald/15 text-vitality-emerald uppercase">Unlocked</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary mt-0.5">Arrays &amp; Two Pointers</h2>
                <span className="font-body-sm text-body-sm text-text-secondary">Difficulty: Novice Tier I · In-Place Partitioning, Window Sliders</span>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-3 md:pt-0 pl-2 md:pl-0 border-t md:border-t-0 border-surface-deck">
              <div className="flex flex-col md:items-end font-stat-display-sm text-stat-display-sm text-secondary">
                <span>+350 XP</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted tracking-wider">12 QUESTS</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-deck flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-lg">play_arrow</span>
              </div>
            </div>
          </div>

          {/* Glowing Luminescent Connector 1 -> 2 */}
          <div className="flex items-center justify-center my-[-4px] md:pl-10">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-secondary to-primary-container shadow-[0_0_8px_#4cd7f6]"></div>
              <span className="material-symbols-outlined text-xs text-secondary -my-1">expand_more</span>
            </div>
          </div>

          {/* Node 2: Searching & Binary Search */}
          <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-surface-card hover:bg-surface-overlay transition-all duration-300 shadow-lg cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container rounded-l-xl"></div>
            <div className="flex items-center gap-4 pl-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-deck flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-2xl">search_check</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-primary-container/15 text-primary uppercase font-semibold">Node 02</span>
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Locked · Sequence Required</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary mt-0.5">Searching &amp; Binary Search</h2>
                <span className="font-body-sm text-body-sm text-text-secondary">Difficulty: Intermediate Tier II · Logarithmic Space Reduction</span>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-3 md:pt-0 pl-2 md:pl-0 border-t md:border-t-0 border-surface-deck">
              <div className="flex flex-col md:items-end font-stat-display-sm text-stat-display-sm text-primary">
                <span>+450 XP</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted tracking-wider">10 QUESTS</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-deck flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-base">lock</span>
              </div>
            </div>
          </div>

          {/* Connector 2 -> 3 */}
          <div className="flex items-center justify-center my-[-4px] md:pl-10">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-surface-deck"></div>
              <span className="material-symbols-outlined text-xs text-text-muted -my-1">expand_more</span>
            </div>
          </div>

          {/* Node 3: Trees & Binary Search Trees */}
          <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-surface-card hover:bg-surface-overlay transition-all duration-300 shadow-lg cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container rounded-l-xl"></div>
            <div className="flex items-center gap-4 pl-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-deck flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">account_tree</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-primary-container/15 text-primary uppercase font-semibold">Node 03</span>
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Locked · Prerequisites Inactive</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary mt-0.5">Trees &amp; Binary Search Trees</h2>
                <span className="font-body-sm text-body-sm text-text-secondary">Difficulty: Intermediate Tier II · Hierarchical Traversal &amp; Balancing</span>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-3 md:pt-0 pl-2 md:pl-0 border-t md:border-t-0 border-surface-deck">
              <div className="flex flex-col md:items-end font-stat-display-sm text-stat-display-sm text-primary">
                <span>+600 XP</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted tracking-wider">14 QUESTS</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-deck flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-base">lock</span>
              </div>
            </div>
          </div>

          {/* Connector 3 -> 4 */}
          <div className="flex items-center justify-center my-[-4px] md:pl-10">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-surface-deck"></div>
              <span className="material-symbols-outlined text-xs text-text-muted -my-1">expand_more</span>
            </div>
          </div>

          {/* Node 4: Graphs & Cycle Detection */}
          <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-surface-card hover:bg-surface-overlay transition-all duration-300 shadow-lg cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary rounded-l-xl"></div>
            <div className="flex items-center gap-4 pl-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-deck flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-tertiary/15 text-tertiary uppercase font-semibold">Node 04</span>
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Locked</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary mt-0.5">Graphs &amp; Cycle Detection</h2>
                <span className="font-body-sm text-body-sm text-text-secondary">Difficulty: Adept Tier III · Topological Sort, BFS/DFS Exploration</span>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-3 md:pt-0 pl-2 md:pl-0 border-t md:border-t-0 border-surface-deck">
              <div className="flex flex-col md:items-end font-stat-display-sm text-stat-display-sm text-tertiary">
                <span>+750 XP</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted tracking-wider">16 QUESTS</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-deck flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-base">lock</span>
              </div>
            </div>
          </div>

          {/* Connector 4 -> 5 */}
          <div className="flex items-center justify-center my-[-4px] md:pl-10">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-surface-deck"></div>
              <span className="material-symbols-outlined text-xs text-text-muted -my-1">expand_more</span>
            </div>
          </div>

          {/* Node 5: Dynamic Programming Foundations */}
          <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-surface-card hover:bg-surface-overlay transition-all duration-300 shadow-lg cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-hazard-crimson rounded-l-xl"></div>
            <div className="flex items-center gap-4 pl-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-deck flex items-center justify-center text-hazard-crimson">
                <span className="material-symbols-outlined text-2xl">memory</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-rpg-sm text-label-rpg-sm px-2 py-0.5 rounded bg-hazard-crimson/15 text-hazard-crimson uppercase font-semibold">Node 05</span>
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase">Locked</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary mt-0.5">Dynamic Programming Foundations</h2>
                <span className="font-body-sm text-body-sm text-text-secondary">Difficulty: Master Tier IV · State Memoization &amp; Optimal Substructure</span>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-3 md:pt-0 pl-2 md:pl-0 border-t md:border-t-0 border-surface-deck">
              <div className="flex flex-col md:items-end font-stat-display-sm text-stat-display-sm text-hazard-crimson">
                <span>+1,000 XP</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted tracking-wider">20 QUESTS</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-deck flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-base">lock</span>
              </div>
            </div>
          </div>

          {/* Connector 5 -> Boss Raid */}
          <div className="flex items-center justify-center my-[-4px] md:pl-10">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-surface-deck via-tertiary to-tertiary-fixed shadow-[0_0_12px_#ffb95f]"></div>
              <span className="material-symbols-outlined text-sm text-tertiary -my-1">expand_more</span>
            </div>
          </div>

          {/* Final Boss Node: Senior Technical Mock Interview */}
          <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-xl bg-gradient-to-r from-surface-card via-surface-overlay to-surface-card transition-all duration-300 shadow-[0_0_30px_rgba(255,185,95,0.15)] cursor-pointer">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-tertiary via-tertiary-fixed to-tertiary rounded-l-xl shadow-[0_0_16px_#ffb95f]"></div>
            <div className="flex items-center gap-5 pl-2">
              <div className="relative flex-shrink-0 w-16 h-16 rounded-xl bg-surface-deck flex items-center justify-center text-tertiary shadow-[0_0_24px_rgba(255,185,95,0.35)]">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>swords</span>
                <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded bg-tertiary text-on-tertiary font-label-rpg-sm text-label-rpg-sm font-bold tracking-wider uppercase">
                  BOSS
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-label-rpg text-label-rpg px-2.5 py-0.5 rounded bg-tertiary/20 text-tertiary uppercase font-bold tracking-wider">
                    Chapter Boss Raid // Final Trial
                  </span>
                  <span className="font-label-rpg-sm text-label-rpg-sm text-tertiary-fixed font-semibold tracking-wider uppercase">
                    Apex Crucible
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-text-primary mt-1 flex items-center gap-2">
                  Senior Technical Mock Interview
                  <span className="material-symbols-outlined text-tertiary text-xl">workspace_premium</span>
                </h2>
                <span className="font-body-md text-body-md text-text-secondary">
                  Live System Design &amp; Complex Problem Synthesis with FAANG-calibrated AI Evaluator.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-5 mt-5 md:mt-0 pt-4 md:pt-0 pl-2 md:pl-0 border-t md:border-t-0 border-surface-deck">
              <div className="flex flex-col md:items-end">
                <span className="font-stat-display text-stat-display text-tertiary font-bold tracking-wide">+2,500 XP</span>
                <span className="font-label-rpg text-label-rpg text-tertiary-fixed font-semibold tracking-wider uppercase">Legendary Title Unlocked</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-deck flex items-center justify-center text-tertiary shadow-inner">
                <span className="material-symbols-outlined text-xl">lock</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tactical Intel Panel / Side Deck (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Campaign Summary Card */}
          <div className="p-6 rounded-xl bg-surface-deck shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="font-label-rpg text-label-rpg text-secondary tracking-widest uppercase">Telemetry Overview</span>
              <span className="material-symbols-outlined text-text-muted">analytics</span>
            </div>
            {/* Radar/Progress Radial Vector Graphic */}
            <div className="relative flex items-center justify-center py-2">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                <circle className="stroke-surface-card" cx="60" cy="60" fill="transparent" r="50" strokeWidth="8"></circle>
                <circle className="stroke-primary-container" cx="60" cy="60" fill="transparent" r="50" strokeDasharray="314.159" strokeDashoffset="125.66" strokeLinecap="round" strokeWidth="8"></circle>
                <circle className="stroke-secondary" cx="60" cy="60" fill="transparent" r="38" strokeDasharray="238.76" strokeDashoffset="143.25" strokeLinecap="round" strokeWidth="4"></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-stat-display text-stat-display text-text-primary leading-none">60%</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-widest mt-1">Calibration</span>
              </div>
            </div>
            {/* Structured Tactical Stats */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-card">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">flag</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">Total Milestones</span>
                </div>
                <span className="font-stat-display-sm text-stat-display-sm text-text-primary">6 Nodes</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-card">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">task_alt</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">Estimated Quests</span>
                </div>
                <span className="font-stat-display-sm text-stat-display-sm text-text-primary">72 Missions</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-card">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">crisis_alert</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">Boss Encounters</span>
                </div>
                <span className="font-stat-display-sm text-stat-display-sm text-tertiary">12 Battles</span>
              </div>
            </div>
          </div>

          {/* Mentorship / Companion Pod */}
          <div className="p-6 rounded-xl bg-surface-deck shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-lg object-cover shadow-[0_0_14px_rgba(76,215,246,0.3)]" alt="Mentor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQOBw_IL7iZTD8_2ZPNLYbIoPy-sl0X8j-ZqlJK3ku1ZG0wMVDRDh80r4Nk1SrS7CFNho36wXqBe-Sm2dZlXBsFZggyTCSnOV-NqfIzcyLR_0E6o7NSiz23Ksu7sUDIA9xRxJpokZhSRTf7kxjRpSzq5NbAwUNUZrEALuZ5JcX0pGjOsX-lCANfzB8WNziebPvt_b2BELlcYvaMdkdqAle-T6LJVvwBB9fiZlRuNcD2mfqM1kbjNVBtA"/>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-text-primary">AURA // Path AI</span>
                <span className="font-label-rpg-sm text-label-rpg-sm text-secondary uppercase tracking-wider">Tactical Advisor</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-text-secondary italic">
              "Your journey starts with Arrays. Do not underestimate Node 01; mastering two-pointer mechanics yields a 34% velocity boost in dynamic programming later."
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-surface-card text-text-muted font-label-rpg-sm text-label-rpg-sm">
              <span>DIFFICULTY TUNING</span>
              <span className="text-vitality-emerald uppercase font-semibold">Adaptive Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Info Pill Ribbon */}
      <div className="w-full flex items-center justify-center mt-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-6 px-6 py-3 rounded-full bg-surface-card/80 backdrop-blur-md shadow-lg font-label-rpg text-label-rpg text-text-secondary uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            6 Milestones
          </span>
          <span className="text-text-muted">•</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Estimated 72 Quests
          </span>
          <span className="text-text-muted">•</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            12 Boss Encounters
          </span>
        </div>
      </div>

      {/* Interactive Navigation Controls Footer */}
      <div className="w-full pt-6 border-t border-surface-deck flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-2">
        <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-6 py-3.5 rounded bg-surface-card hover:bg-surface-overlay text-text-secondary hover:text-text-primary font-headline-sm text-headline-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md" type="button">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Back</span>
        </button>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button onClick={() => navigate('/onboarding/attributes')} className="w-full sm:w-auto px-8 py-3.5 rounded bg-primary-container hover:bg-primary text-on-primary-container font-headline-sm text-headline-sm font-bold transition-all duration-200 shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:shadow-[0_0_32px_rgba(160,120,255,0.6)] flex items-center justify-center gap-3 active:scale-[0.98]" type="button">
            <span>Accept Campaign Path</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
