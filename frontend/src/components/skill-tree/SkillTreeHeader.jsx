import React from 'react';

export const SkillTreeHeader = () => {
  return (
    <div className="flex flex-col gap-1 mb-space-lg">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[28px]">account_tree</span>
        <h1 className="font-headline-xl text-headline-xl text-text-primary uppercase tracking-tight">
          Skill Tree
        </h1>
      </div>
      <p className="font-body-lg text-body-lg text-text-secondary">
        Build your abilities and unlock your next level of mastery.
      </p>
    </div>
  );
};
