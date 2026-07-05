import React from 'react';

function Button({ children, variant = 'primary', onClick, type = 'button', disabled }) {
  // تحديد الستايل بناءً على الـ variant حسب الهوية
  const baseStyle = "px-5 py-2.5 font-bold text-sm rounded-xl transition-all duration-150 active:scale-[0.98] cursor-pointer focus:outline-none";
  
  const variants = {
    primary: "bg-capsule-teal hover:bg-capsule-navy text-white shadow-xs hover:shadow-md",
    secondary: "bg-white border border-gray-200 text-capsule-navy hover:bg-gray-50 shadow-xs",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-100"
  };

  const isButtonDisabled = variant === 'disabled' || disabled;

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[isButtonDisabled ? 'disabled' : variant]}`}
      onClick={!isButtonDisabled ? onClick : undefined}
      disabled={isButtonDisabled}
    >
      {children}
    </button>
  );
}

export default Button;