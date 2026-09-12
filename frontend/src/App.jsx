import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OnboardingProvider } from './context/OnboardingContext';
import { GameProvider } from './context/GameContext';
import { AppShell } from './components/layout/AppShell';
import { OnboardingLayout } from './components/onboarding/OnboardingLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Ambition } from './pages/onboarding/Ambition';
import { GoalDetails } from './pages/onboarding/GoalDetails';
import { AdventurePath } from './pages/onboarding/AdventurePath';
import { Attributes } from './pages/onboarding/Attributes';
import { Awakening } from './pages/onboarding/Awakening';
import { Dashboard } from './pages/Dashboard';
import { QuestBoard } from './pages/QuestBoard';
import { QuestDetail } from './pages/QuestDetail';
import { Character } from './pages/Character';
import { SkillTree } from './pages/SkillTree';
import { BossRaids } from './pages/BossRaids';
import { Armory } from './pages/Armory';
import { Shop } from './pages/Shop';
import { Achievements } from './pages/Achievements';
import { Codex } from './pages/Codex';
import { Journal } from './pages/Journal';
import { Placeholder } from './pages/Placeholder';
import { WeeklyAdventure } from './pages/WeeklyAdventure';

const GlobalLoader = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
    <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-primary animate-spin z-10"></div>
    <span className="mt-space-md font-label-rpg text-label-rpg text-primary tracking-widest uppercase z-10 animate-pulse">Initializing System...</span>
  </div>
);

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <GlobalLoader />;
  if (isAuthenticated) {
    return user?.hasCompletedOnboarding ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding/ambition" replace />;
  }
  return children;
};

// Wrapper for authenticated routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <GlobalLoader />;
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

// Wrapper for main app routes (dashboard, quests, etc.)
const RequireOnboarding = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <GlobalLoader />;
  return user?.hasCompletedOnboarding ? children : <Navigate to="/onboarding/ambition" replace />;
};

const RequireIncompleteOnboarding = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <GlobalLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user && user.hasCompletedOnboarding) return <Navigate to="/dashboard" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public / Landing */}
      <Route path="/" element={<PublicOnlyRoute><Landing /></PublicOnlyRoute>} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
      
      {/* Onboarding Routes */}
      <Route path="/onboarding" element={
        <RequireIncompleteOnboarding>
          <OnboardingProvider>
            <OnboardingLayout />
          </OnboardingProvider>
        </RequireIncompleteOnboarding>
      }>
        <Route path="ambition" element={<Ambition />} />
        <Route path="goal" element={<GoalDetails />} />
        <Route path="path" element={<AdventurePath />} />
        <Route path="attributes" element={<Attributes />} />
        <Route path="awakening" element={<Awakening />} />
      </Route>

      {/* Authenticated Application with AppShell */}
      <Route element={
        <PrivateRoute>
          <RequireOnboarding>
            <GameProvider>
              <AppShell />
            </GameProvider>
          </RequireOnboarding>
        </PrivateRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quests" element={<QuestBoard />} />
        <Route path="/quests/:questId" element={<QuestDetail />} />
        <Route path="/character" element={<Character />} />
        <Route path="/skill-tree" element={<SkillTree />} />
        <Route path="/bosses" element={<BossRaids />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/inventory" element={<Armory />} />
        <Route path="/armory" element={<Armory />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/codex" element={<Codex />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/weekly" element={<WeeklyAdventure />} />
        <Route path="/reports" element={<Placeholder />} />
        <Route path="/settings" element={<Placeholder />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
