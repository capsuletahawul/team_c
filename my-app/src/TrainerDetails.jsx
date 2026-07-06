/**
 * TrainerDetails.jsx
 * * Main orchestration view for the Trainer Profile and Dashboard assembly.
 * Built for the Capsule Tahawul platform using React, Vite, and Tailwind CSS.
 * * Path Corrected: Tailored for direct placement under 'src/' directory.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useTheme } from './context/ThemeContext';

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
  const navigate = useNavigate();
  // Global page language state switcher (Defaults to Arabic)
  const { lang } = useTheme();
  const t = translations[lang];
  const isRTL = lang === 'ar';

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      
      {/* ============================================
          1. NATIVE BILINGUAL NAVBAR SYSTEM
          ============================================ */}
      <Navbar />

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