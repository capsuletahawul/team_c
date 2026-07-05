/**
 * TrainerStats.jsx
 * 
 * Renders the primary metrics section for the trainer.
 * Synchronized with the design specs in 94d3bcae-8419-4e07-afcb-3f6c826afd12.JPG.
 * 
 * Displays a three-column card grid highlighting:
 * - Number of active training courses (Capsule Navy tone)
 * - Total enrolled student count (Capsule Teal accent)
 * - Global performance rating accompanied by a polished golden star.
 */

import { StarIcon } from '@heroicons/react/24/solid';

// ============================================
// BILINGUAL TRANSLATION DATA
// ============================================
const statsData = {
  en: {
    courses: {
      label: 'Number of Courses',
      value: '6'
    },
    students: {
      label: 'Number of Students',
      value: '320'
    },
    rating: {
      label: 'Rating',
      value: '4.9'
    }
  },
  ar: {
    courses: {
      label: 'عدد الدورات',
      value: '6'
    },
    students: {
      label: 'عدد الطلاب',
      value: '320'
    },
    rating: {
      label: 'التقييم',
      value: '4.9'
    }
  }
};

export default function TrainerStats({ lang = 'ar' }) {
  const t = statsData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5"
    >
      
      {/* 1. Courses Count Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-200/40 p-6 flex flex-col justify-between items-center sm:items-start min-h-[120px] transition-all duration-200 hover:shadow-lg">
        <span className="text-xs font-bold text-slate-400 tracking-wide">
          {t.courses.label}
        </span>
        <span className="text-4xl font-black text-[#0D4C54] mt-2 select-none">
          {t.courses.value}
        </span>
      </div>

      {/* 2. Students Count Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-200/40 p-6 flex flex-col justify-between items-center sm:items-start min-h-[120px] transition-all duration-200 hover:shadow-lg">
        <span className="text-xs font-bold text-slate-400 tracking-wide">
          {t.students.label}
        </span>
        <span className="text-4xl font-black text-[#00A499] mt-2 select-none">
          {t.students.value}
        </span>
      </div>

      {/* 3. Global Evaluation Rating Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-200/40 p-6 flex flex-col justify-between items-center sm:items-start min-h-[120px] transition-all duration-200 hover:shadow-lg relative overflow-hidden">
        <span className="text-xs font-bold text-slate-400 tracking-wide">
          {t.rating.label}
        </span>
        
        {/* Rating Value with Responsive Star Alignment */}
        <div className="flex items-center gap-2 mt-2 w-full justify-center sm:justify-start">
          <span className="text-4xl font-black text-[#EAB308] select-none">
            {t.rating.value}
          </span>
          <StarIcon className="w-8 h-8 text-[#EAB308] drop-shadow-xs animate-pulse" aria-hidden="true" />
        </div>
      </div>

    </section>
  );
}