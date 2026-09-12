import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, DIFFICULTIES } from '../../data/mockQuests';

export const QuestFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[1],
    difficulty: DIFFICULTIES[1],
    attribute: 'strength',
    duration: 30
  });
  
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          description: initialData.description || '',
          category: initialData.category || CATEGORIES[1],
          difficulty: initialData.difficulty || DIFFICULTIES[1],
          attribute: initialData.attribute || 'strength',
          duration: initialData.duration || 30
        });
      } else {
        setFormData({
          title: '',
          description: '',
          category: CATEGORIES[1],
          difficulty: DIFFICULTIES[1],
          attribute: 'strength',
          duration: 30
        });
      }
      setError(null);
    }
  }, [isOpen, initialData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const attributes = ['strength', 'intellect', 'endurance', 'wisdom', 'discipline', 'creativity'];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} quest.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface-card border border-border-subtle rounded-xl w-full max-w-md p-space-lg shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h2 className="font-headline-md text-headline-md text-text-primary uppercase mb-space-md">
          {isEditing ? 'Edit Quest' : 'Create Quest'}
        </h2>
        
        {error && <div className="text-hazard-crimson mb-2 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
          <div>
            <label className="block font-label-rpg uppercase text-text-secondary mb-1 text-sm">Title</label>
            <input 
              type="text"
              required
              maxLength={255}
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-surface-deck border border-border-subtle rounded-lg px-4 py-2 text-text-primary focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label className="block font-label-rpg uppercase text-text-secondary mb-1 text-sm">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-surface-deck border border-border-subtle rounded-lg px-4 py-2 text-text-primary focus:border-primary focus:outline-none transition-colors h-24 resize-none"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-space-sm">
            <div>
              <label className="block font-label-rpg uppercase text-text-secondary mb-1 text-sm">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-surface-deck border border-border-subtle rounded-lg px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block font-label-rpg uppercase text-text-secondary mb-1 text-sm">Difficulty</label>
              <select 
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full bg-surface-deck border border-border-subtle rounded-lg px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
              >
                {DIFFICULTIES.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-space-sm">
            <div>
              <label className="block font-label-rpg uppercase text-text-secondary mb-1 text-sm">Attribute Focus</label>
              <select 
                value={formData.attribute}
                onChange={(e) => setFormData({...formData, attribute: e.target.value})}
                className="w-full bg-surface-deck border border-border-subtle rounded-lg px-3 py-2 text-text-primary focus:border-primary focus:outline-none capitalize"
              >
                {attributes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block font-label-rpg uppercase text-text-secondary mb-1 text-sm">Duration (mins)</label>
              <input 
                type="number"
                min="1"
                max="1440"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                className="w-full bg-surface-deck border border-border-subtle rounded-lg px-4 py-2 text-text-primary focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          <div className="mt-space-md flex justify-end gap-space-sm">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-text-secondary hover:text-text-primary font-label-rpg uppercase transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary hover:bg-primary-container text-on-primary-container rounded font-label-rpg uppercase transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
