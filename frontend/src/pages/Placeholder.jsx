import React from 'react';
import { useLocation } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { Card } from '../components/common/Card';

export const Placeholder = () => {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop() || 'Home';
  const formattedName = pathName.charAt(0).toUpperCase() + pathName.slice(1).replace('-', ' ');

  return (
    <div className="flex flex-col gap-space-xl h-full">
      <SectionHeader 
        title={formattedName} 
        subtitle="This module is currently offline or under construction."
        badge="SYSTEM OFFLINE"
      />
      
      <Card className="flex-1 min-h-[400px] flex flex-col items-center justify-center text-center bg-surface-container-low border-dashed border-2">
        <span className="material-symbols-outlined text-[64px] text-text-muted mb-space-md opacity-50">
          construction
        </span>
        <h3 className="font-headline-lg text-headline-lg text-text-secondary">
          {formattedName} Module
        </h3>
        <p className="font-body-md text-body-md text-text-muted mt-space-sm max-w-md">
          The engineering team is currently constructing this sector of the LifeQuest platform. Check back soon for deployment.
        </p>
      </Card>
    </div>
  );
};
