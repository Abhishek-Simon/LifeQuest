import React from 'react';
import { motion } from 'framer-motion';

const attrConfig = {
  intellect: { icon: 'memory', desc: 'Cognitive processing and problem-solving capability.' },
  discipline: { icon: 'timer', desc: 'The ability to execute regardless of motivation.' },
  wisdom: { icon: 'psychology', desc: 'Strategic insight and emotional regulation.' },
  endurance: { icon: 'all_inclusive', desc: 'Stamina and cardiovascular capacity.' },
  strength: { icon: 'fitness_center', desc: 'Physical power and resilience.' },
  creativity: { icon: 'auto_awesome', desc: 'Lateral thinking and artistic output.' }
};

export const AttributesDetail = ({ attributes }) => {
  if (!attributes) return null;

  // Find max attribute to scale the bars relative to the best stat
  const maxAttr = Math.max(...attributes.map(a => a.value), 10);

  return (
    <div className="flex flex-col gap-space-md w-full">
      <h3 className="font-headline-md text-headline-md text-text-primary flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">analytics</span> Neural Attributes
      </h3>
      
      <div className="bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          {attributes.map((attr, idx) => {
            const config = attrConfig[attr.id] || { icon: 'star', desc: '' };
            const percentage = Math.min((attr.value / maxAttr) * 100, 100);
            
            return (
              <div key={attr.id} className="flex flex-col bg-surface-deck border border-border-subtle rounded-lg p-space-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded ${attr.bg}/10 ${attr.color} flex items-center justify-center shrink-0`}>
                      <span className="material-symbols-outlined text-[18px]">{config.icon}</span>
                    </div>
                    <span className="font-label-rpg text-label-rpg text-text-primary uppercase tracking-wider">{attr.name}</span>
                  </div>
                  <span className="font-stat-display text-stat-display text-text-primary">Lv {attr.value}</span>
                </div>
                
                <div className="w-full h-1.5 bg-surface-base rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full ${attr.bg} shadow-[0_0_8px_currentColor] opacity-80`}
                  />
                </div>
                
                <p className="font-body-sm text-body-sm text-text-secondary">
                  {config.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
