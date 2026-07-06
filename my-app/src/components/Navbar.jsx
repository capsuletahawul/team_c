import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function CapsuleMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="capsuleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FB1BC" />
          <stop offset="0.5" stopColor="#164961" />
          <stop offset="1" stopColor="#537E84" />
        </linearGradient>
      </defs>
      <rect x="6" y="24" width="30" height="14" rx="7" transform="rotate(-18 21 31)" fill="url(#capsuleGrad)" />
      <rect x="28" y="26" width="30" height="14" rx="7" transform="rotate(-18 43 33)" fill="#FFD369" opacity="0.9" />
      <path d="M11 15 L13 20 L18 21 L13 22 L11 27 L9 22 L4 21 L9 20 Z" fill="#FFD369" />
    </svg>
  );
}

function Navbar() {
  const { lang, toggleLang } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: { ar: 'الرئيسية', en: 'Home' }, to: '/' },
    { id: 'courses', label: { ar: 'الدورات', en: 'Courses' }, to: '/courses-overview' },
    { id: 'bootcamps', label: { ar: 'المعسكرات', en: 'Bootcamps' }, to: '/courses-overview' },
    { id: 'companies', label: { ar: 'الشركات', en: 'Companies' }, to: '/business-contract' },
    { id: 'contact', label: { ar: 'تواصل معنا', en: 'Contact' }, to: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'trainer') return '/trainer-dashboard';
    return '/student-dashboard';
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer text-decoration-none select-none">
          <CapsuleMark size={34} />
          <span className="text-lg font-black text-capsule-navy">
            {lang === 'ar' ? 'كبسولة تحول' : 'Capsule Tahawul'}
          </span>
        </Link>
        
        {/* Center Links */}
        <div className="hidden md:flex items-center justify-center gap-7 flex-1 mx-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) => 
                `text-[14.5px] font-semibold pb-1 border-b-2 transition-colors ${
                  isActive 
                    ? 'text-capsule-teal border-capsule-gold' 
                    : 'text-gray-500 border-transparent hover:text-capsule-navy'
                }`
              }
            >
              {link.label[lang]}
            </NavLink>
          ))}
        </div>

        {/* Actions (Language Switcher, User Auth / Dashboard) */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="bg-capsule-bg border border-capsule-border text-capsule-navy font-black text-xs px-4 py-1.5 rounded-full transition hover:bg-gray-200 cursor-pointer"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-9 h-9 rounded-full bg-capsule-teal/10 text-capsule-navy flex items-center justify-center border border-capsule-border/50 shadow-xs cursor-pointer overflow-hidden"
              >
                {user.profile?.avatar ? (
                  <img src={user.profile.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span>👤</span>
                )}
              </button>
              
              {userMenuOpen && (
                <div className={`absolute top-11 ${lang === 'ar' ? 'left-0' : 'right-0'} bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-48 z-50`}>
                  <div className="px-4 py-2 border-b border-gray-100 text-right">
                    <p className="text-xs font-bold text-capsule-navy">{user.name?.ar || user.name || user.email}</p>
                    <p className="text-[10px] text-gray-400">{user.email}</p>
                  </div>
                  <Link 
                    to={getDashboardLink()} 
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 text-right"
                  >
                    {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-right block px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                  >
                    {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/sign-in')}
                className="text-sm font-bold text-capsule-navy hover:text-capsule-teal transition cursor-pointer"
              >
                {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
              </button>
              <button
                onClick={() => navigate('/sign-up')}
                className="bg-capsule-navy hover:bg-capsule-teal text-white text-xs px-4 py-2 rounded-full font-bold shadow-xs transition cursor-pointer"
              >
                {lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-capsule-navy focus:outline-none text-xl p-1 cursor-pointer">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-50 rounded-xl p-4 flex flex-col space-y-3 font-semibold text-sm border border-gray-100">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `p-2 rounded-lg ${isActive ? 'bg-capsule-teal/10 text-capsule-teal' : 'text-gray-600'}`
              }
            >
              {link.label[lang]}
            </NavLink>
          ))}

          <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-gray-200">
            <button 
              onClick={() => { toggleLang(); setIsOpen(false); }}
              className="text-right p-2 rounded-lg font-bold text-capsule-navy hover:bg-gray-100 transition cursor-pointer"
            >
              {lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}
            </button>

            {user ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-right font-bold text-capsule-navy hover:bg-gray-100 transition"
                >
                  {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="p-2 rounded-lg text-right font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate('/sign-in'); setIsOpen(false); }}
                  className="p-2 rounded-lg text-right font-bold text-capsule-navy hover:bg-gray-100 transition cursor-pointer"
                >
                  {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <button
                  onClick={() => { navigate('/sign-up'); setIsOpen(false); }}
                  className="p-2.5 rounded-lg text-center font-bold text-white bg-capsule-navy hover:bg-capsule-teal transition cursor-pointer"
                >
                  {lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;