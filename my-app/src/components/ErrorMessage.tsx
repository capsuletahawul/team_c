import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function ErrorMessage({ message }) {
  const { t } = useLanguage();

  if (!message) return null;

  // بعض ردود السيرفر ترجع أخطاء التحقق كـ object (حقل -> رسائل) بدل نص جاهز.
  // نحولها هنا لنص عشان ما يصير كراش "Objects are not valid as a React child".
  const displayMessage =
    typeof message === "string" ? message : Object.values(message).flat().join(" ");

  if (!displayMessage) return null;

  // Swap border side based on direction
  const borderSide = t.dir === 'rtl' ? 'border-r-4' : 'border-l-4';
  
  // Handle spacing logic for RTL vs LTR
  const spacingLogic = t.dir === 'rtl' ? 'space-x-reverse' : '';

  return (
    <div 
      dir={t.dir}
      className={`p-4 bg-amber-50 ${borderSide} border-capsule-dark-gold text-amber-800 rounded-xl text-xs font-bold shadow-xs my-4 animate-fadeIn`}
    >
      <div className={`flex items-center space-x-2 ${spacingLogic}`}>
        <span>⚠️</span>
        <span>{displayMessage}</span>
      </div>
    </div>
  );
}

export default ErrorMessage;