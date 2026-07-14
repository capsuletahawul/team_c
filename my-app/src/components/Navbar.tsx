import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Interface detailing structure for each navigation link.
 */
interface NavLinkItem {
  id: string;
  label: string;
  to: string;
}

/**
 * Prop interface for the general public Navbar component.
 */
interface NavbarProps {
  activePage?: string;
  showAuthButtons?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Navbar Component
 * 
 * Public-facing navigation system with translation controls, dark mode shell,
 * fully responsive mobile burger drawers, and conditional auth state layouts.
 */
function Navbar({ 
  activePage = 'dashboard', 
  showAuthButtons = false, 
  onSignIn, 
  onSignUp 
}: NavbarProps): React.JSX.Element {
  // Mobile drawer visible toggle state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Pull language metrics and context translation dictionaries
  const { t, lang, toggleLanguage } = useLanguage();

  /**
   * Statically mapped links matching your translatable global framework.
   */
  const navLinks: NavLinkItem[] = [
    { id: "home", label: t.nav.home, to: "/" },
    { id: "courses", label: t.nav.courses, to: "/courses-overview" },
    { id: "bootcamps", label: t.nav.bootcamps, to: "/courses-overview" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all"
      dir={t.dir}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        
        {/* Logo and Main Links */}
        <div className="flex items-center gap-12">
          {/* Logo Brand Frame */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src={logo}
              alt="Capsula Tahawul Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-lg font-extrabold tracking-wide text-capsule-navy">
              {t.brand}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className={`group relative pb-2 transition-all duration-300 ${
                  activePage === link.id
                    ? "text-capsule-teal"
                    : "text-gray-600 hover:text-capsule-teal"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-capsule-teal transition-all duration-300 ${
                    activePage === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Actions: Toggle + Auth */}
        <div className="hidden md:flex items-center gap-4 px-4">
          
          {/* Language Toggle (Desktop) */}
          <button 
            onClick={toggleLanguage}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer border border-gray-200 shadow-xs"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>

          {/* Theme Toggle Placeholder */}
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
            🌙
          </button>

          {/* Conditional authentication buttons framework */}
          {showAuthButtons ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onSignIn}
                className="px-4 h-8 rounded-full border border-capsule-navy text-capsule-navy font-semibold hover:bg-capsule-navy hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                {t.tabs.login}
              </button>

              <button
                onClick={onSignUp}
                className="px-4 h-8 rounded-full bg-gradient-to-r from-capsule-teal to-capsule-navy text-white font-semibold shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                {t.tabs.signup}
              </button>
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="px-4 h-9 rounded-full bg-capsule-navy hover:bg-capsule-teal text-white font-semibold flex items-center justify-center transition-all duration-300"
            >
              {lang === "ar" ? "تسجيل الخروج" : "Log Out"}
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-capsule-navy focus:outline-none text-xl p-1 cursor-pointer"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-50 rounded-xl p-4 flex flex-col space-y-3 font-semibold text-sm border border-gray-100 mx-6 mb-4">
          
          {/* Language Toggle (Mobile) */}
          <button 
            onClick={toggleLanguage}
            className="self-start mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-extrabold text-xs px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
          >
            {lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          </button>

          {/* FIXED: Swapped 'a' element mapping with 'href' to React Router 'Link' mapping with 'to' */}
          {navLinks.map(link => (
            <Link 
              key={link.id} 
              to={link.to} 
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-lg ${
                activePage === link.id ? 'bg-capsule-teal/10 text-capsule-teal' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {showAuthButtons && (
            <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-gray-200">
              <button
                onClick={onSignIn}
                className={`p-2 rounded-lg font-bold text-capsule-navy hover:bg-gray-100 transition cursor-pointer ${
                  t.dir === 'rtl' ? 'text-right' : 'text-left'
                }`}
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