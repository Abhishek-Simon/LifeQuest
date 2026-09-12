import React, { createContext, useContext, useState, useEffect } from 'react';
import { onboardingService } from '../services/api/onboardingService';
import { characterService } from '../services/api/characterService';

const OnboardingContext = createContext();

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }) => {
  const [state, setState] = useState({
    ambition: '',
    goalDetails: {
      description: '',
    },
    adventurePath: [],
    attributes: {},
    character: null,
  });

  // Load from backend on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const data = await onboardingService.getState();
        setState(prev => ({
          ...prev,
          ambition: data.ambition || '',
          goalDetails: {
            description: data.goal_description || '',
            deadline: data.deadline || '',
            commitment: data.daily_commitment || '',
            difficulty: data.difficulty || '',
            weakAreas: data.weak_areas || [],
          },
          adventurePath: data.adventure_path || [],
          attributes: data.selected_attributes || {},
          characterName: data.character_name || '',
          playstyle: data.playstyle || ''
        }));
      } catch (e) {
        console.error('Failed to load onboarding state', e);
      }
    };
    loadState();
  }, []);

  const updateState = async (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
    try {
      // Sync to backend
      const backendUpdates = {};
      if (updates.ambition !== undefined) backendUpdates.ambition = updates.ambition;
      if (updates.characterName !== undefined) backendUpdates.character_name = updates.characterName;
      if (updates.playstyle !== undefined) backendUpdates.playstyle = updates.playstyle;
      if (updates.adventurePath !== undefined) backendUpdates.adventure_path = updates.adventurePath;
      if (updates.attributes !== undefined) backendUpdates.selected_attributes = updates.attributes;
      
      if (Object.keys(backendUpdates).length > 0) {
        await onboardingService.updateState(backendUpdates);
      }
    } catch (e) {
      console.error('Failed to save onboarding state', e);
    }
  };

  const updateGoalDetails = async (updates) => {
    setState((prev) => ({
      ...prev,
      goalDetails: { ...prev.goalDetails, ...updates },
    }));
    try {
      const backendUpdates = {};
      if (updates.description !== undefined) backendUpdates.goal_description = updates.description;
      if (updates.deadline !== undefined) backendUpdates.deadline = updates.deadline;
      if (updates.commitment !== undefined) backendUpdates.daily_commitment = updates.commitment;
      if (updates.difficulty !== undefined) backendUpdates.difficulty = updates.difficulty;
      if (updates.weakAreas !== undefined) backendUpdates.weak_areas = updates.weakAreas;
      
      if (Object.keys(backendUpdates).length > 0) {
        await onboardingService.updateState(backendUpdates);
      }
    } catch (e) {
      console.error('Failed to save goal details', e);
    }
  };

  const completeOnboarding = () => {
    // Left for backwards compatibility, actual completion happens in forgeCharacter
  };

  const forgeCharacter = async () => {
    try {
      try {
        await onboardingService.completeOnboarding();
      } catch (err) {
        // If it fails because it's already completed (400), we can just fetch the existing character
        if (err.response?.status !== 400 || err.response?.data?.detail !== "Onboarding already completed") {
          throw err;
        }
      }
      
      const newChar = await characterService.getCharacter();
      
      const formattedChar = {
        ...newChar,
        pathName: newChar.adventure_path,
        stats: {
          strength: newChar.strength,
          intellect: newChar.intellect,
          endurance: newChar.endurance,
          wisdom: newChar.wisdom,
          creativity: newChar.creativity,
          discipline: newChar.discipline,
        }
      };
      
      setState(prev => ({ ...prev, character: formattedChar }));
      return formattedChar;
    } catch (e) {
      console.error('Failed to forge character', e);
      throw e;
    }
  };

  return (
    <OnboardingContext.Provider value={{ state, updateState, updateGoalDetails, forgeCharacter, completeOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};
