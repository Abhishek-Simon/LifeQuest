import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      const userData = await authApi.getMe();
      localStorage.setItem('lq_current_user_id', userData.id);
      
      let hasCompletedOnboarding = userData?.has_completed_onboarding === true;
      if (!hasCompletedOnboarding) {
        const localState = JSON.parse(localStorage.getItem(`lq_onboarding_state_${userData.id}`) || '{}');
        if (localState.is_complete === true) {
          hasCompletedOnboarding = true;
        }
      }
      
      const enrichedUser = { ...userData, hasCompletedOnboarding };
      setUser(enrichedUser);
      setIsAuthenticated(true);
      return enrichedUser;
    } catch (err) {
      console.error("Failed to load user session", err);
      // If token is invalid or expired, clear it
      logout();
      throw err;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('lq_access_token');
      if (token) {
        await loadUser();
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem('lq_access_token', data.access_token);
    return await loadUser();
  };

  const signup = async (email, password) => {
    await authApi.signup(email, password);
    // Automatically log in after successful signup
    return await login(email, password);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('lq_access_token');
    localStorage.removeItem('lq_current_user_id');
    // Note: lq_game_state_${userId} and lq_onboarding_state_${userId} remain safely in localStorage
    // to preserve individual mock user states between logins.
  };

  const completeOnboardingFlow = () => {
    if (user) {
      setUser({ ...user, hasCompletedOnboarding: true });
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    completeOnboardingFlow,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
