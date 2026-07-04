import React from 'react';

function LoadingIndicator({ message = "جاري جلب البيانات والتأكد من الاتصال..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 font-sans">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-capsule-teal border-t-transparent mb-3"></div>
      <p className="text-capsule-navy text-xs font-bold animate-pulse">{message}</p>
    </div>
  );
}

export default LoadingIndicator;