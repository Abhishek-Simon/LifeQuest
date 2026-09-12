import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { LayoutDashboard, Target, User, Swords, Shield, ShoppingBag, Store, Award, BookOpen, Book, BarChart3, Settings, Menu, X, PackageOpen, Trophy, Crown } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leaderboard', label: 'Leaderboard', icon: Crown },
  { path: '/quests', label: 'Quests', icon: Target },
  { path: '/character', label: 'Character', icon: User },
  { path: '/skill-tree', label: 'Skill Tree', icon: Swords },
  { path: '/bosses', label: 'Boss Raids', icon: Shield },
  { path: '/armory', label: 'Armory', icon: PackageOpen },
  { path: '/shop', label: 'Shop', icon: Store },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/codex', label: 'Codex', icon: BookOpen },
  { path: '/journal', label: 'Journal', icon: Book },
  { path: '/weekly', label: 'Weekly Adventure', icon: BarChart3 }
];

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-surface-deck border-r border-border-subtle flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Header */}
        <div className="h-20 flex items-center justify-between px-space-lg border-b border-border-subtle">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[28px]">explore</span>
            <span className="font-headline-md text-headline-md text-text-primary tracking-tight">LifeQuest</span>
          </div>
          <button 
            className="lg:hidden text-text-muted hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-space-lg px-space-md">
          <nav className="flex flex-col gap-1">
            <span className="px-space-md text-xs font-label-rpg text-text-muted uppercase tracking-widest mb-2">Systems</span>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-colors font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium shadow-[inset_2px_0_0_0_#d0bcff]" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-container"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-space-md border-t border-border-subtle flex flex-col gap-1">
          <NavLink
            to="/settings"
            className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-colors font-body-md text-body-md text-text-secondary hover:text-text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsMobileOpen(false)}
          >
            <Settings size={20} />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
};
