import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SkillDetailPanel = ({ skill, attributeKey, userSP, onClose }) => {
  if (!skill) return null;

  const { status } = skill;
  const isMastered = status === 'mastered';
  const isUnlocked = status === 'unlocked';
  const isAvailable = status === 'available';

  let statusColor = "text-text-muted";
  if (isMastered) statusColor = "text-[#FFD700]";
  else if (isUnlocked) statusColor = "text-vitality-emerald";
  else if (isAvailable) statusColor = "text-primary";
  else statusColor = "text-hazard-crimson";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="w-full bg-surface-card border border-border-subtle rounded-xl p-space-md shadow-lg sticky top-space-md flex flex-col gap-space-md h-full md:h-auto"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 pr-4">
            <span className="font-label-rpg-sm text-label-rpg-sm text-secondary uppercase tracking-wider">
              {attributeKey} Branch
            </span>
            <h3 className="font-headline-lg text-headline-lg text-text-primary uppercase leading-tight">
              {skill.name}
            </h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-text-muted hover:text-text-primary md:hidden p-2 -mt-2 -mr-2" aria-label="Close details">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          )}
        </div>

        <p className="font-body-md text-body-md text-text-secondary">
          {skill.desc}
        </p>

        <div className="p-space-sm bg-primary/5 border border-primary/20 rounded flex flex-col gap-1">
          <span className="font-label-rpg-sm text-label-rpg-sm text-primary uppercase flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">psychology</span> Synergy Bonus
          </span>
          <span className="font-body-sm text-body-sm text-text-primary">{skill.bonus}</span>
        </div>

        {(isUnlocked || isAvailable) && (
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex justify-between font-label-rpg-sm uppercase text-text-muted">
              <span>Skill Progress</span>
              <span className="font-stat-display-sm text-text-primary">{skill.progress}%</span>
            </div>
            <div className="w-full h-2 bg-surface-deck rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${skill.progress}%` }}></div>
            </div>
            <span className="font-label-rpg-sm text-[10px] text-text-muted uppercase text-right">
              {skill.progress < 100 ? `${(skill.progress / 100) * skill.requiredXP} / ${skill.requiredXP} XP` : 'MAXIMUM'}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-border-subtle pt-space-sm mt-auto">
          <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm uppercase">
            <span className="text-text-muted">Status</span>
            <span className={statusColor}>{status}</span>
          </div>

          {!isMastered && !isUnlocked && (
            <>
              <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm uppercase">
                <span className="text-text-muted">Cost</span>
                <span className={userSP >= skill.cost ? 'text-text-primary' : 'text-hazard-crimson'}>
                  {skill.cost} SP
                </span>
              </div>
              <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm uppercase">
                <span className="text-text-muted">Req Level</span>
                <span className="text-text-primary">{skill.reqLevel}</span>
              </div>
              <div className="flex justify-between font-label-rpg-sm text-label-rpg-sm uppercase">
                <span className="text-text-muted">Req {attributeKey}</span>
                <span className="text-text-primary">{skill.reqAttributeLevel}</span>
              </div>
            </>
          )}
        </div>

        <div className="pt-space-sm">
          {isMastered ? (
            <div className="w-full py-2 bg-surface-deck border border-[#FFD700]/30 rounded text-center text-[#FFD700] font-label-rpg uppercase flex justify-center items-center gap-2">
               <span className="material-symbols-outlined text-[18px]">workspace_premium</span> Mastered
            </div>
          ) : isUnlocked ? (
            <div className="w-full py-2 bg-surface-deck border border-vitality-emerald/30 rounded text-center text-vitality-emerald font-label-rpg uppercase">
               Currently Developing
            </div>
          ) : isAvailable ? (
            <button className="w-full py-2 bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg uppercase transition-colors shadow-[0_0_16px_rgba(139,92,246,0.3)]">
              Ready to Unlock
            </button>
          ) : (
            <div className="w-full p-2 bg-surface-deck border border-surface-overlay rounded text-center text-text-muted font-body-sm flex flex-col gap-1 items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Requirements not met
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
