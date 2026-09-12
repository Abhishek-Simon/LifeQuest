import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const authUser = await login(email, password);
      if (authUser.hasCompletedOnboarding) {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        navigate('/onboarding/ambition', { replace: true });
      }
    } catch (err) {
      setServerError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-space-md bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Link to="/" className="flex items-center justify-center gap-space-sm mb-space-xl">
          <span className="material-symbols-outlined text-primary text-[32px]">explore</span>
          <span className="font-headline-lg text-headline-lg text-text-primary tracking-tight">LifeQuest</span>
        </Link>

        <Card glow className="p-space-xl bg-surface-deck border-border-subtle shadow-2xl">
          <div className="text-center mb-space-xl">
            <h1 className="font-headline-lg text-headline-lg text-text-primary mb-1">
              Welcome Back, Adventurer
            </h1>
            <p className="font-body-md text-body-md text-text-secondary">
              Continue your journey.
            </p>
          </div>

          {serverError && (
            <div className="mb-space-md p-space-md bg-hazard-crimson/10 border border-hazard-crimson/50 rounded-lg text-hazard-crimson font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="operator@system.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <Link to="#" className="font-label-ui text-label-ui text-primary hover:text-primary-fixed transition-colors">
                Forgot Password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-space-sm" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </div>
              ) : (
                "Enter LifeQuest"
              )}
            </Button>
          </form>
        </Card>

        <p className="mt-space-lg text-center font-body-sm text-body-sm text-text-secondary">
          New to LifeQuest?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-fixed transition-colors font-medium">
            Create your character
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
