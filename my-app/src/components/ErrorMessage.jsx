import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="p-4 bg-amber-50 border-r-4 border-capsule-dark-gold text-amber-800 rounded-xl text-xs font-bold shadow-xs my-4 animate-fadeIn">
      <div className="flex items-center space-x-2 space-x-reverse">
        <span>⚠️</span>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default ErrorMessage;