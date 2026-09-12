import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { XPBar } from '../components/common/XPBar';
import { mockCharacter, mockQuests } from '../data/mockData';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Landing = () => {
  const sampleQuest = mockQuests[0];

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface overflow-hidden font-body-md selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Global Atmospheric Background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(160,120,255,0.08),transparent_50%)]"></div>
      
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-border-subtle/50">
        <div className="h-20 max-w-7xl mx-auto px-space-lg flex items-center justify-between">
          <Link to="/" className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[28px]">explore</span>
            <span className="font-headline-md text-headline-md text-text-primary tracking-tight">LifeQuest</span>
          </Link>
          <div className="flex items-center gap-space-md">
            <Link to="/login" className="font-body-md text-body-md text-text-secondary hover:text-text-primary transition-colors">
              Login
            </Link>
            <Link to="/signup">
              <Button size="sm">Begin Journey</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full pt-20">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-space-md lg:px-space-xl py-space-xl">
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-container/15 rounded-full blur-[140px] pointer-events-none"></div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-center"
          >
            {/* Left: Copy */}
            <div className="flex flex-col items-start z-20">
              <motion.div variants={fadeUp} className="flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-high shadow-sm mb-space-lg border border-border-subtle">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary -ml-3.5"></span>
                <span className="font-label-rpg text-label-rpg uppercase text-secondary tracking-widest">CHAPTER 0 // REAL-WORLD PROGRESSION</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="font-headline-xl text-[48px] md:text-[64px] text-text-primary tracking-tight uppercase leading-[1.1] mb-space-md">
                Turn your everyday life <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-fixed">into an adventure.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="font-body-lg text-[18px] text-text-secondary max-w-lg mb-space-xl leading-relaxed">
                Complete real-world quests. Earn XP. Level up your character. Build the life you actually want.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full">
                    Start Your Adventure <ArrowRight size={20} />
                  </Button>
                </Link>
                <a href="#explore" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full">
                    See How It Works
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right: Cinematic Visual Anchor */}
            <motion.div variants={fadeUp} className="relative w-full h-[500px] lg:h-[600px] z-10 flex items-center justify-center">
              {/* Character Status Panel (Floating Center) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px]"
              >
                <Card glow className="bg-surface-deck/90 backdrop-blur-xl border-border-subtle shadow-2xl p-space-lg">
                  <div className="flex items-center gap-space-md mb-space-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container border border-primary/30">
                      <img src={mockCharacter.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-wider mb-1">SOVEREIGN AGENT</div>
                      <div className="font-headline-sm text-headline-sm text-text-primary">{mockCharacter.name}</div>
                      <div className="font-label-rpg text-label-rpg text-primary">LEVEL 05</div>
                    </div>
                  </div>
                  
                  <XPBar currentXp={720} nextLevelXp={1000} className="mb-space-lg" />
                  
                  <div className="grid grid-cols-2 gap-space-md mb-space-lg">
                    <div className="bg-surface-container p-space-sm rounded-lg border border-border-subtle">
                      <div className="font-label-rpg-sm text-label-rpg-sm text-text-muted mb-1">GOLD</div>
                      <div className="font-stat-display-sm text-stat-display-sm text-tertiary">340</div>
                    </div>
                    <div className="bg-surface-container p-space-sm rounded-lg border border-border-subtle">
                      <div className="font-label-rpg-sm text-label-rpg-sm text-text-muted mb-1">STREAK</div>
                      <div className="font-stat-display-sm text-stat-display-sm text-vitality-emerald">8 DAYS</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm border-b border-border-subtle/50 pb-1">
                      <span className="text-text-secondary">INTELLECT</span>
                      <span className="text-text-primary">32</span>
                    </div>
                    <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm border-b border-border-subtle/50 pb-1">
                      <span className="text-text-secondary">DISCIPLINE</span>
                      <span className="text-text-primary">29</span>
                    </div>
                    <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm">
                      <span className="text-text-secondary">WISDOM</span>
                      <span className="text-text-primary">24</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Floating Quest Card (Offset Bottom Right) */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute z-30 bottom-10 -right-4 lg:right-0 w-full max-w-[300px]"
              >
                <Card className="bg-surface-overlay/95 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-primary/20">
                  <div className="font-label-rpg-sm text-label-rpg-sm uppercase text-text-muted mb-2 tracking-widest">DAILY QUEST</div>
                  <h4 className="font-headline-sm text-headline-sm text-text-primary leading-tight mb-space-md">
                    Solve 2 Dynamic Programming Problems
                  </h4>
                  <div className="flex items-center gap-space-sm mb-space-md">
                    <Badge variant="secondary" className="scale-90 origin-left">+4 INTELLECT</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-space-md font-stat-display-sm text-[14px]">
                    <span className="text-primary">+50 XP</span>
                    <span className="text-tertiary">+15 GOLD</span>
                  </div>
                  <Button variant="primary" className="w-full py-2 shadow-none pointer-events-none">
                    Complete Quest
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted"
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* ================= EXPLANATION SECTIONS ================= */}
        <section id="explore" className="w-full py-24 bg-surface-deck border-t border-border-subtle relative z-10">
          <div className="max-w-7xl mx-auto px-space-lg">
            <div className="text-center mb-20">
              <span className="font-label-rpg text-label-rpg text-secondary uppercase tracking-widest">WHY LIFEQUEST</span>
              <h2 className="mt-4 font-headline-xl text-[36px] md:text-[48px] text-text-primary tracking-tight">
                The Paradigm Shift
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
              
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <Card className="h-full bg-surface-container-low border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-space-lg">
                    <span className="material-symbols-outlined text-[24px]">fact_check</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Traditional Productivity</h3>
                  <div className="font-body-md text-body-md text-text-secondary leading-relaxed flex flex-col gap-2 font-mono text-sm">
                    <span className="text-text-muted">Task &rarr; Check &rarr; Done</span>
                  </div>
                  <p className="mt-4 text-sm text-text-muted italic">Cold, transactional, easily abandoned.</p>
                </Card>
              </motion.div>

              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <Card className="h-full bg-surface-container-low border-0 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden ring-1 ring-secondary/50">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-vitality-emerald"></div>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-space-lg">
                    <span className="material-symbols-outlined text-[24px]">military_tech</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">LifeQuest System</h3>
                  <div className="font-body-md text-body-md text-secondary leading-relaxed flex flex-col gap-2 font-mono text-sm font-bold">
                    <span>Quest &rarr; Completion &rarr; Reward &rarr; Growth &rarr; Progression</span>
                  </div>
                  <p className="mt-4 text-sm text-text-primary">Rewarding, addictive, continuously compounding.</p>
                </Card>
              </motion.div>

              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <Card className="h-full bg-surface-container-low border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-vitality-emerald/10 flex items-center justify-center text-vitality-emerald mb-space-lg">
                    <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Consistency Becomes Progression</h3>
                  <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                    Build unstoppable momentum. Streaks, achievements, and chapters reward daily consistency, turning friction into flow and discipline into a dopamine conduit.
                  </p>
                </Card>
              </motion.div>

              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <Card className="h-full bg-surface-container-low border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-hazard-crimson/10 flex items-center justify-center text-hazard-crimson mb-space-lg">
                    <span className="material-symbols-outlined text-[24px]">swords</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Every Goal Has An Adventure</h3>
                  <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                    Long-term ambitions transform into epic quest chains and boss battles. Chip away at massive milestones by executing high-impact daily missions.
                  </p>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ================= RPG PREVIEW LOOP ================= */}
        <section className="w-full py-24 bg-surface-container-lowest relative z-10 overflow-hidden">
          <div className="max-w-5xl mx-auto px-space-lg">
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true, margin: "-150px" }}
              variants={staggerContainer}
              className="flex flex-col md:flex-row items-center justify-between gap-space-lg relative"
            >
              <div className="absolute top-1/2 left-0 w-full h-1 bg-border-subtle -translate-y-1/2 hidden md:block z-0"></div>

              {[
                { label: "GOAL", icon: "flag", color: "text-text-muted" },
                { label: "QUEST", icon: "assignment", color: "text-text-muted" },
                { label: "ACTION", icon: "play_arrow", color: "text-text-muted" },
                { label: "XP + GOLD", icon: "bolt", color: "text-primary" },
                { label: "CHARACTER GROWTH", icon: "person", color: "text-vitality-emerald" },
                { label: "PROGRESSION", icon: "upgrade", color: "text-tertiary" },
              ].map((step, idx) => (
                <motion.div 
                  key={step.label}
                  variants={fadeUp}
                  className="relative z-10 flex flex-col items-center gap-space-sm bg-surface-container-lowest p-2"
                >
                  <div className={`w-16 h-16 rounded-full bg-surface-card border-2 border-border-subtle flex items-center justify-center shadow-lg ${step.color}`}>
                    <span className="material-symbols-outlined text-[32px]">{step.icon}</span>
                  </div>
                  <span className="font-label-rpg text-label-rpg uppercase tracking-widest text-text-secondary">{step.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative w-full py-32 bg-surface-deck border-t border-border-subtle text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[400px] bg-primary-container/20 rounded-full blur-[140px]"></div>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative z-10 max-w-2xl mx-auto px-space-lg flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high shadow-md mb-space-lg border border-border-subtle">
              <span className="w-2 h-2 rounded-full bg-vitality-emerald"></span>
              <span className="font-label-rpg text-label-rpg uppercase text-on-surface-variant tracking-widest">SYSTEM READY</span>
            </div>
            <h2 className="font-headline-xl text-[40px] md:text-[56px] text-text-primary tracking-tight uppercase leading-[1.1] mb-space-md">
              Your adventure starts <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-fixed">with one quest.</span>
            </h2>
            <Link to="/signup" className="mt-space-xl">
              <Button size="lg" className="px-12 py-4 text-[18px]">
                Start Your Adventure <ArrowRight size={22} />
              </Button>
            </Link>
          </motion.div>
        </section>

      </main>
    </div>
  );
};
