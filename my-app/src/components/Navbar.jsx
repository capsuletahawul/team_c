import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function Navbar({ activePage = 'dashboard', showAuthButtons = false, onSignIn, onSignUp }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, toggleLanguage } = useLanguage();

  const navLinks = [
    { id: 'home', label: t.nav.home, href: '#' },
    { id: 'courses', label: t.nav.courses, href: '#' },
    { id: 'bootcamps', label: t.nav.bootcamps, href: '#' },
    { id: 'companies', label: t.nav.companies, href: '#' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm font-sans" dir={t.dir}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo and Main Links */}
        <div className="flex items-center space-x-8 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-tr from-capsule-navy to-capsule-teal rounded-lg flex items-center justify-center text-white font-black text-xs">CT</div>
            <span className="text-base font-black text-capsule-navy">{t.brand}</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 space-x-reverse text-sm font-semibold text-gray-500">
            {navLinks.map(link => (
              <a 
                key={link.id} 
                href={link.href} 
                className={`transition pb-1 ${activePage === link.id ? 'text-capsule-teal border-b-2 border-capsule-teal' : 'hover:text-capsule-navy'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop Actions: Toggle + Auth */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Language Toggle (Desktop) */}
          <button 
            onClick={toggleLanguage}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer border border-gray-200 shadow-xs"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>

          {showAuthButtons ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onSignIn}
                className="text-sm font-bold text-capsule-navy hover:text-capsule-teal transition cursor-pointer"
              >
                {t.tabs.login}
              </button>
              <button
                onClick={onSignUp}
                className="bg-capsule-navy hover:bg-capsule-teal text-white text-xs px-4 py-2 rounded-full font-bold shadow-xs transition cursor-pointer"
              >
                {t.tabs.signup}
              </button>
            </div>
          ) : (
            <span className="bg-capsule-navy text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-xs">
              {t.nav.portal}
            </span>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-capsule-navy focus:outline-none text-xl p-1 cursor-pointer">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-50 rounded-xl p-4 flex flex-col space-y-3 font-semibold text-sm border border-gray-100">
          
          {/* Language Toggle (Mobile) */}
          <button 
            onClick={toggleLanguage}
            className="self-start mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-extrabold text-xs px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
          >
            {lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          </button>

          {navLinks.map(link => (
            <a 
              key={link.id} 
              href={link.href} 
              className={`p-2 rounded-lg ${activePage === link.id ? 'bg-capsule-teal/10 text-capsule-teal' : 'text-gray-600'}`}
            >
              {link.label}
            </a>
          ))}

          {showAuthButtons && (
            <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-gray-200">
              <button
                onClick={onSignIn}
                className={`p-2 rounded-lg font-bold text-capsule-navy hover:bg-gray-100 transition cursor-pointer ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}
              >
                {t.tabs.login}
              </button>
              <button
                onClick={onSignUp}
                className="p-2.5 rounded-lg text-center font-bold text-white bg-capsule-navy hover:bg-capsule-teal transition cursor-pointer"
              >
                {t.tabs.signup}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;