import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AppShell = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setIsMobileOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-space-md lg:p-space-xl relative">
          {/* Ambient Glows for authenticated app view */}
          <div className="pointer-events-none fixed top-1/4 left-1/2 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
