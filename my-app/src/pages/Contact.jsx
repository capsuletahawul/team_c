/**
 * Contact.jsx
 * The main Contact Us page for the Capsule Tahawul platform.
 * Includes full Navbar with Logo, Links, and dynamic Language switcher.
 */

import { useState } from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// ============================================
// NAVBAR TRANSLATIONS
// ============================================
const translations = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      bootcamps: 'Bootcamps',
      companies: 'Companies',
      about: 'About Us',
      contact: 'Contact'
    },
    langBtn: 'AR'
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      courses: 'الدورات',
      bootcamps: 'المعسكرات',
      companies: 'الشركات',
      about: 'من نحن',
      contact: 'تواصل معنا'
    },
    langBtn: 'EN'
  }
};

export default function Contact() {
  const [lang, setLang] = useState('ar');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col font-sans transition-colors duration-300">
      
      {/* ============================================
          MAIN NAVBAR
          Includes Logo, Navigation, and Action buttons
          ============================================ */}
      <nav dir={isRTL ? 'rtl' : 'ltr'} className="w-full bg-white border-b border-capsule-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-8 h-4 bg-capsule-teal rounded-full transform -rotate-45 opacity-80"></div>
                <div className="absolute w-8 h-4 bg-capsule-navy rounded-full transform rotate-45 opacity-80"></div>
              </div>
              <span className="text-xl font-extrabold text-capsule-navy tracking-tight">
                {isRTL ? 'كبسولة تحول' : 'Capsule Tahawul'}
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {Object.values(t.nav).map((item, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className={`text-base font-semibold transition-colors duration-200 ${
                    item === t.nav.contact 
                      ? 'text-capsule-teal border-b-2 border-capsule-teal pb-1'
                      : 'text-capsule-navy hover:text-capsule-teal'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-capsule-bg hover:bg-[#C9D6DF] text-capsule-navy font-bold text-sm transition-colors duration-200"
              >
                {t.langBtn}
              </button>

              <button className="text-capsule-navy hover:text-capsule-teal transition-colors">
                <MagnifyingGlassIcon className="w-6 h-6" strokeWidth={2} />
              </button>

              <button className="text-capsule-navy hover:text-capsule-teal transition-colors">
                <UserCircleIcon className="w-7 h-7" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Page Content */}
      <main className="flex-grow pb-16">
        <ContactHero lang={lang} />
        <ContactInfo lang={lang} />
        <div className="mt-8">
          <ContactForm lang={lang} />
        </div>
      </main>
    </div>
  );
}