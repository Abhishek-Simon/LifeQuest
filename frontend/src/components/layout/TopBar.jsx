import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';

export const TopBar = ({ onMenuClick }) => {
  const { gameState } = useGame();
  const { player } = gameState;
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    
    // Handle escape key
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

  const handleProfileNav = () => {
    setIsProfileOpen(false);
    navigate('/character');
  };

  return (
    <header className="h-20 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-border-subtle sticky top-0 z-30 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-md">
        <button 
          className="lg:hidden text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded"
          onClick={onMenuClick}
          aria-label="Open Sidebar"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-vitality-emerald/80 animate-pulse"></span>
          <span className="font-label-rpg-sm text-label-rpg-sm uppercase text-text-muted tracking-widest">HUD SYNCED // ACTIVE</span>
        </div>
      </div>

      <div className="flex items-center gap-space-lg">
        {/* Resource Displays */}
        <div className="hidden md:flex items-center gap-space-md bg-surface-container py-1 px-3 rounded-lg border border-border-subtle">
          <div className="flex items-center gap-1.5 font-stat-display-sm text-stat-display-sm text-tertiary">
            <span className="material-symbols-outlined text-[18px]">monetization_on</span>
            <span>{player.gold}</span>
          </div>
          <div className="w-px h-4 bg-border-active"></div>
          <div className="flex items-center gap-1.5 font-stat-display-sm text-stat-display-sm text-primary">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>{player.xp} XP</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-space-md">
          <button className="text-text-secondary hover:text-text-primary relative focus:outline-none focus:ring-2 focus:ring-primary rounded p-1" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-hazard-crimson rounded-full"></span>
          </button>
          
          {/* Profile Menu Wrapper */}
          <div className="relative" ref={profileRef}>
            <button 
              className="h-8 w-8 rounded-full overflow-hidden border border-border-subtle hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="Open profile menu"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <Avatar src={player.avatar} name={player.name} alt="Profile Avatar" className="w-full h-full object-cover" />
            </button>

            {/* Profile Dropdown Popover */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-space-sm w-48 bg-surface-card border border-border-subtle rounded-lg shadow-xl overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Header Info */}
                <div className="px-space-md py-space-sm border-b border-border-subtle bg-surface-container-lowest">
                  <div className="font-headline-sm text-headline-sm text-text-primary truncate">{player.name}</div>
                  <div className="font-label-rpg-sm text-label-rpg-sm text-primary uppercase">LVL {player.level}</div>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col py-1">
                  <button 
                    onClick={handleProfileNav}
                    className="w-full px-space-md py-space-sm flex items-center gap-space-sm text-left font-body-sm text-body-sm text-text-secondary hover:text-text-primary hover:bg-surface-container transition-colors focus:outline-none focus:bg-surface-container"
                    role="menuitem"
                  >
                    <UserIcon size={16} />
                    View Profile
                  </button>
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
  );
};
