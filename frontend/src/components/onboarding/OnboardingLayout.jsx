import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

export const OnboardingLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Extract path to highlight active nav
  const currentPath = location.pathname;

  const isActive = (path) => currentPath.includes(path) ? 'bg-primary-container text-on-primary-container font-headline-sm' : 'font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface';

  const isStep5 = currentPath.includes('awakening');

  // Close profile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(160,120,255,0.08),transparent_70%)] z-0"></div>
      
      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-50 bg-surface-base/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        <div className="h-16 w-full px-margin md:px-margin-desktop flex items-center justify-between relative">
          
          <button type="button" onClick={() => navigate('/')} aria-label="Go to LifeQuest Home" className="flex items-center gap-space-sm hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded">
            <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">explore</span>
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight uppercase hidden sm:inline-block">LifeQuest</span>
            <span className="font-label-rpg-sm text-label-rpg-sm text-secondary bg-surface-card px-space-xs py-0.5 rounded ml-space-xs uppercase tracking-wider">Protocol V1</span>
          </button>

          <nav className="hidden md:flex items-center gap-space-lg" aria-label="Onboarding Progress">
            <button type="button" onClick={() => navigate('/onboarding/ambition')} className={`transition-colors uppercase tracking-wider px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary ${isActive('ambition')}`}>Origin</button>
            <button type="button" onClick={() => navigate('/onboarding/goal')} className={`transition-colors uppercase tracking-wider px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary ${isActive('goal')}`}>Directives</button>
            <button type="button" onClick={() => navigate('/onboarding/path')} className={`transition-colors uppercase tracking-wider px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary ${isActive('path')}`}>Cadence</button>
            <button type="button" onClick={() => navigate('/onboarding/attributes')} className={`transition-colors uppercase tracking-wider px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary ${isActive('attributes')}`}>Attributes</button>
            <button type="button" onClick={() => navigate('/onboarding/awakening')} className={`transition-colors uppercase tracking-wider px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary ${isActive('awakening')}`}>Initiation</button>
          </nav>

          <div className="flex items-center gap-space-md">
            {!isStep5 && (
              <button 
                type="button" 
                onClick={() => navigate('/onboarding/awakening')} 
                aria-label="Skip Introduction" 
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-wider hidden sm:inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              >
                Skip Intro
              </button>
            )}
            
            {/* Profile Menu Wrapper */}
            <div className="relative" ref={profileRef}>
              <button 
                type="button"
                className="w-8 h-8 rounded-full bg-primary-container/20 border border-primary text-primary flex items-center justify-center font-bold hover:bg-primary-container/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                {user?.name?.[0] || 'U'}
              </button>

              {/* Profile Dropdown Popover */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-space-sm w-48 bg-surface-card border border-border-subtle rounded-lg shadow-xl overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-space-md py-space-sm border-b border-border-subtle bg-surface-container-lowest">
                    <div className="font-headline-sm text-headline-sm text-text-primary truncate">{user?.name || 'User'}</div>
                    <div className="font-label-rpg-sm text-label-rpg-sm text-primary uppercase">INDUCTEE</div>
                  </div>
                  <div className="flex flex-col py-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full px-space-md py-space-sm flex items-center gap-space-sm text-left font-body-sm text-body-sm text-hazard-crimson hover:bg-hazard-crimson/10 transition-colors focus:outline-none focus:bg-hazard-crimson/10"
                      role="menuitem"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full pt-16 min-h-screen flex flex-col bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex-1 flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        
        {/* Footer */}
        <footer className="w-full py-space-md bg-transparent mt-auto relative z-10">
          <div className="w-full px-margin md:px-margin-desktop flex items-center justify-between font-label-rpg-sm text-label-rpg-sm text-text-muted uppercase tracking-wider">
            <span>Neural Synapse Link // Active</span>
            <span className="hidden sm:inline-block">LifeQuest Progression Architecture</span>
          </div>
        </footer>
      </main>
    </div>
  );
};
