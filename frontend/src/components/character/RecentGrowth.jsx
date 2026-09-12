import React from 'react';

export const RecentGrowth = ({ progression }) => {
  if (!progression) return null;

  return (
    <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md flex flex-col gap-space-md">
      <h4 className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">history</span> Recent Growth
      </h4>
      
      {progression.length === 0 ? (
        <p className="font-body-sm text-body-sm text-text-muted italic">No recent growth recorded.</p>
      ) : (
        <div className="flex flex-col gap-space-sm relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border-subtle">
          {progression.map((event, index) => {
            const isLevel = event.type === 'level';
            const isAttribute = event.type === 'attribute';
            
            let colorClass = 'text-primary border-primary bg-primary/10';
            let dotColor = 'bg-primary';
            if (isLevel) {
              colorClass = 'text-[#FFD700] border-[#FFD700] bg-[#FFD700]/10';
              dotColor = 'bg-[#FFD700]';
            } else if (isAttribute) {
              colorClass = 'text-vitality-emerald border-vitality-emerald bg-vitality-emerald/10';
              dotColor = 'bg-vitality-emerald';
            }

            return (
              <div key={event.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${colorClass} shrink-0 md:order-1 md:group-odd:-ml-3 md:group-even:-mr-3 z-10 bg-surface-card`}>
                  <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-surface-deck p-space-sm rounded-lg border border-surface-overlay flex flex-col">
                  <span className="font-label-rpg-sm text-label-rpg-sm text-text-secondary uppercase">{event.date}</span>
                  <span className="font-body-md text-body-md text-text-primary mt-1 line-clamp-1">{event.message}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
