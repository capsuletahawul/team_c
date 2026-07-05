/**
 * TrainerDetails.jsx
 * * Main orchestration view for the Trainer Profile and Dashboard assembly.
 * Built for the Capsule Tahawul platform using React, Vite, and Tailwind CSS.
 * * Path Corrected: Tailored for direct placement under 'src/' directory.
 */

import { useState } from 'react';

// 🛠️ Importing modular Trainer sub-components (Corrected Local Paths)
import TrainerHero from './components/trainer/TrainerHero';
import TrainerProfile from './components/trainer/TrainerProfile';
import TrainerStats from './components/trainer/TrainerStats';
import TrainerCourses from './components/trainer/TrainerCourses';
import TrainerReviews from './components/trainer/TrainerReviews';
import ContactTrainerCard from './components/trainer/ContactTrainerCard';

// ============================================
// BILINGUAL LOCAL TRANSLATION DICTIONARY
// ============================================
const translations = {
  en: {
    nav: {
      logo: 'Capsule Tahawul',
      home: 'Home',
      courses: 'Courses',
      bootcamps: 'Bootcamps',
      companies: 'Companies',
      signIn: 'Sign In',
      signUp: 'Sign Up'
    },
    footer: {
      desc: 'A Saudi platform connecting students with practical training opportunities, building a generation fully prepared for the financial and technical labor market.',
      quickLinks: 'Quick Links',
      home: 'Home',
      coursesPaths: 'Courses & Paths',
      howItWorks: 'How Platform Works',
      social: 'Social Media',
      newsletter: 'Newsletter',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      copyright: '© 2026 Capsule Tahawul. All rights reserved.'
    }
  },
  ar: {
    nav: {
      logo: 'كبسولة تحول',
      home: 'الرئيسية',
      courses: 'الدورات',
      bootcamps: 'المعسكرات',
      companies: 'الشركات',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب'
    },
    footer: {
      desc: 'منصة سعودية تربط الطلاب بفرص التدريب العملي، وتبني جيلاً جاهزاً لسوق العمل المالي والتقني.',
      quickLinks: 'روابط سريعة',
      home: 'الرئيسية',
      coursesPaths: 'الدورات والمسارات',
      howItWorks: 'كيف تعمل المنصة',
      social: 'التواصل الاجتماعي',
      newsletter: 'النشرة البريدية',
      emailPlaceholder: 'بريدك الإلكتروني',
      subscribe: 'اشترك',
      copyright: '© ٢٠٢٦ كبسولة تحول. جميع الحقوق محفوظة.'
    }
  }
};

export default function TrainerDetails() {
  // Global page language state switcher (Defaults to Arabic)
  const [lang, setLang] = useState('ar');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  // Function to handle switching language smoothly
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      
      {/* ============================================
          1. NATIVE BILINGUAL NAVBAR SYSTEM
          ============================================ */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs h-20 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Identity & Core Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Logo Badge */}
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <span className="w-8 h-8 rounded-lg bg-[#0D4C54] text-white flex items-center justify-center font-black text-sm">CT</span>
              <span className="text-[#0D4C54] font-black text-lg tracking-tight">{t.nav.logo}</span>
            </div>

            {/* Navigation Menu Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
              <a href="#" className="text-[#00A499] hover:text-[#0D4C54] transition-colors">{t.nav.home}</a>
              <a href="#" className="hover:text-[#0D4C54] transition-colors">{t.nav.courses}</a>
              <a href="#" className="hover:text-[#0D4C54] transition-colors">{t.nav.bootcamps}</a>
              <a href="#" className="hover:text-[#0D4C54] transition-colors">{t.nav.companies}</a>
            </div>
          </div>

          {/* Language Capsule, Search, Profile, and Auth Actions */}
          <div className="flex items-center gap-4">
            
            {/* 💊 White Oval Language Capsule */}
            <button 
              onClick={toggleLanguage}
              className="bg-[#EDF2F7] hover:bg-slate-200 text-[#4A5568] font-extrabold text-xs px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer border border-slate-200/50 shadow-xs"
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* 🔍 Teal Minimalist Search Icon */}
            <button className="text-[#00A499] hover:text-[#0D4C54] transition p-1.5 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
              </svg>
            </button>

            {/* 👤 Gray Profile Avatar Shell */}
            <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#4A5568] flex items-center justify-center border border-slate-300/30 cursor-pointer hover:bg-slate-300 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>

            {/* Subtle Divider */}
            <div className="h-5 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

            {/* Team Authentication Buttons */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-bold">
              <button className="text-[#0D4C54] hover:text-[#00A499] transition px-3 py-2 cursor-pointer">
                {t.nav.signIn}
              </button>
              <button className="bg-[#00A499] hover:bg-[#0D4C54] text-white px-4 py-2 rounded-xl transition shadow-xs cursor-pointer">
                {t.nav.signUp}
              </button>
            </div>

          </div>

        </div>
      </nav>

      {/* ============================================
          MAIN STRUCTURED COMPONENT SYSTEM
          ============================================ */}
      <main className="flex-grow">
        
        {/* Full-width Gradient Hero Cover Block */}
        <TrainerHero lang={lang} />

        {/* Central Component Grid Content Wrap */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16 space-y-8">
          
          {/* Main Bio Card Information Block */}
          <TrainerProfile lang={lang} />

          {/* Quick Metrics Multi-Colored Grid Line */}
          <TrainerStats lang={lang} />

          {/* Core Embedded Technical Data Table */}
          <TrainerCourses lang={lang} />

          {/* Reviews & Interactive Rating Area */}
          <TrainerReviews lang={lang} />

          {/* Trainer Communications Component Card */}
          <ContactTrainerCard lang={lang} />

        </div>
      </main>

      {/* ============================================
          2. CORPORATE FOOTER SYSTEM
          ============================================ */}
      <footer className="bg-[#2B3566] text-white pt-16 pb-8 border-t border-slate-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            <div className="space-y-4">
              <h4 className="text-xl font-black text-white">📍 {isRTL ? 'كبسولة تحول' : 'Capsule Tahawul'}</h4>
              <p className="text-sm font-medium text-white/70 leading-relaxed">{t.footer.desc}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide">{t.footer.quickLinks}</h4>
              <ul className="space-y-2.5 text-sm font-semibold text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.home}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.coursesPaths}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.howItWorks}</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide">{t.footer.social}</h4>
              <div className="flex items-center gap-4 text-white/70 text-lg">
                <a href="#" className="hover:text-white transition-colors">𝕏</a>
                <a href="#" className="hover:text-white transition-colors">💼</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide">{t.footer.newsletter}</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder={t.footer.emailPlaceholder} 
                  className="bg-white/10 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 flex-grow placeholder:text-white/40"
                />
                <button className="bg-[#EAB308] hover:bg-[#ca9a07] text-slate-900 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md">
                  {t.footer.subscribe}
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-white/50">
            <p>{t.footer.copyright}</p>
            <p className="tracking-wider">Capsule Tahawul Architecture Ecosystem v2.6</p>
          </div>
        </div>
      </footer>

    </div>
  );
}