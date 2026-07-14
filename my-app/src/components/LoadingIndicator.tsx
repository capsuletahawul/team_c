import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Prop interface for the LoadingIndicator component.
 * @property {string} [message] - An optional descriptive string representing what is currently loading.
 */
interface LoadingIndicatorProps {
  message?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * LoadingIndicator Component
 * 
 * Renders a centered, infinitely spinning animation ring with accompanying text
 * indicating pending background tasks or network queries.
 */
function LoadingIndicator({ message }: LoadingIndicatorProps): React.JSX.Element {
  // Destructure translation object from language context configuration
  const { t } = useLanguage();

  /**
   * Safe Fallback Evaluation:
   * Uses the passed-in message parameter if present. Otherwise, defaults to the 
   * global multi-lingual layout dictionary setting.
   */
  const displayMessage = message || t.ui.defaultLoading;

  return (
    <div 
      // Sets reading direction context to support seamless global LTR/RTL layouts
      dir={t.dir}
      className="flex flex-col items-center justify-center p-8 font-sans"
    >
      {/* Dynamic Animated Spinner Ring */}
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-capsule-teal border-t-transparent mb-3"></div>
      
      {/* Pulse-animated display text indicator */}
      <p className="text-capsule-navy text-xs font-bold animate-pulse">
        {displayMessage}
      </p>
    </div>
  );
}

export default LoadingIndicator;