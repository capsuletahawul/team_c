/**
 * CourseDetails.jsx
 * * Main view for the Course Details page of the Capsule Tahawul platform.
 * Integrates all child components (Hero, Overview, Curriculum, Instructor, Requirements, Stats, and EnrollmentCard).
 * Coordinates global language switching (AR/EN) and responsive layout grid.
 */

import { useState } from 'react';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// Importing our modular course components
import CourseHero from '../components/course/CourseHero';
import CourseStats from '../components/course/CourseStats';
import CourseOverview from '../components/course/CourseOverview';
import CourseCurriculum from '../components/course/CourseCurriculum';
import CourseInstructor from '../components/course/CourseInstructor';
import CourseRequirements from '../components/course/CourseRequirements';
import EnrollmentCard from '../components/course/EnrollmentCard';

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

export default function CourseDetails() {
  // Global language state initialized to Arabic ('ar')
  const [lang, setLang] = useState('ar');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col font-sans transition-colors duration-300">
      
      {/* ============================================
          MAIN NAVIGATION BAR (Consistent with Brand)
          ============================================ */}
      <nav dir={isRTL ? 'rtl' : 'ltr'} className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Area */}
            <div className="flex items-center gap-2">
              <div className="bg-capsule-navy text-white font-bold w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
                ك
              </div>
              <span className="text-xl font-extrabold text-capsule-navy">
                {isRTL ? 'كبسولة تحول' : 'Capsule Tahawul'}
              </span>
            </div>

            {/* Links Area (Desktop Only) */}
            <div className="hidden lg:flex gap-8">
              {Object.entries(t.nav).map(([key, item]) => (
                <a 
                  key={key} 
                  href="#" 
                  className={`font-semibold transition-colors ${
                    key === 'courses' ? 'text-capsule-teal border-b-2 border-capsule-teal pb-1' : 'text-capsule-navy hover:text-capsule-teal'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Actions Area */}
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLanguage} 
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md font-bold text-sm text-capsule-navy transition-colors"
                aria-label="Toggle language"
              >
                {t.langBtn}
              </button>
              <MagnifyingGlassIcon className="w-6 h-6 text-capsule-navy cursor-pointer hover:text-capsule-teal" />
              <UserCircleIcon className="w-7 h-7 text-capsule-navy cursor-pointer hover:text-capsule-teal" />
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================
          MAIN CONTENT AREA
          ============================================ */}
      <main className="flex-grow">
        
        {/* Full-width Brand Hero Component */}
        <CourseHero lang={lang} />

        {/* Content Layout Grid */}
        <div dir={isRTL ? 'rtl' : 'ltr'} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left/Right Column: Main Technical Details (Takes 2 columns on large devices) */}
            <div className="lg:col-span-2 space-y-8Order">
              <CourseStats lang={lang} />
              <CourseOverview lang={lang} />
              <CourseCurriculum lang={lang} />
              <CourseInstructor lang={lang} />
              <CourseRequirements lang={lang} />
            </div>

            {/* Right/Left Column: Sticky Action Sidebar Card (Takes 1 column) */}
            <div className="lg:sticky lg:top-24">
              <EnrollmentCard lang={lang} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}