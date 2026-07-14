import React, { ReactNode } from 'react';

// 1. Define the allowed custom shapes (Props)
interface ButtonProps {
  children: ReactNode;                       // Anything that can be rendered inside a tag
  variant?: 'primary' | 'secondary';          // ONLY allow these two brand styles
  onClick?: () => void;                      // Make click handler optional (disabled buttons don't need it)
  type?: 'button' | 'submit' | 'reset';      // Match strict HTML form element specifications
  disabled?: boolean;                        // Suffixing with '?' explicitly makes it optional!
}

function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button', 
  disabled = false                           // Provide a sensible default fallback value
}: ButtonProps) {

  // Layout foundation utility classes (Tailwind)
  const baseStyle = "px-5 py-2.5 font-bold text-sm rounded-xl transition-all duration-150 active:scale-[0.98] focus:outline-none";

  // Brand style variations
  const variants = {
    primary: "bg-capsule-teal hover:bg-capsule-navy text-white shadow-xs hover:shadow-md cursor-pointer",
    secondary: "bg-white border border-gray-200 text-capsule-navy hover:bg-gray-50 shadow-xs cursor-pointer",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-100"
  };

  return (
    <button
      type={type}
      // If disabled is true, explicitly overwrite style palette to 'disabled'
      className={`${baseStyle} ${disabled ? variants.disabled : variants[variant]}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;