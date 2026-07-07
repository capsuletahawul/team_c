import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function LoadingIndicator({ message }) {
  const { t } = useLanguage();

  // If a specific message is passed, use it. Otherwise, use the global default.
  const displayMessage = message || t.ui.defaultLoading;

  return (
    <div className="flex flex-col items-center justify-center p-8 font-sans" dir={t.dir}>
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-capsule-teal border-t-transparent mb-3"></div>
      <p className="text-capsule-navy text-xs font-bold animate-pulse">{displayMessage}</p>
    </div>
  );
}

export default LoadingIndicator;