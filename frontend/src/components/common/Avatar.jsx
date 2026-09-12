import React, { useState } from 'react';

/**
 * Common Avatar component that handles missing or broken image URLs gracefully.
 * Fallbacks to a stylised initial or placeholder silhouette.
 */
export const Avatar = ({ src, alt, name, className }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Determine fallback character (initials of name or "?")
  const initial = name && typeof name === 'string' ? name.charAt(0).toUpperCase() : '?';

  if (!src || hasError) {
    return (
      <div 
        className={`bg-surface-card border border-border-subtle flex items-center justify-center font-headline-xl text-primary/50 shadow-inner ${className}`}
        aria-label={alt || "Fallback Avatar"}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Avatar"}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};
