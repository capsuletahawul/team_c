/**
 * CourseHero.jsx
 * * The vibrant Hero section for the Course Details page.
 * Uses rich gradients, glowing background blobs, and dynamic spacing
 * to create a premium, visually engaging "cool" aesthetic.
 * Fully supports RTL (Arabic) and LTR (English) layouts.
 */

import { CalendarDaysIcon, ChartBarIcon, LanguageIcon, StarIcon } from '@heroicons/react/24/solid';

// ============================================
// DATA & TRANSLATIONS OBJECT
// ============================================
const courseHeroData = {
  en: {
    category: 'Advanced Tech & Artificial Intelligence',
    title: 'Full-Stack Generative AI & Digital Transformation Bootcamp',
    subtitle: 'Master building scalable AI applications, fine-tuning LLMs, and leading enterprise-level digital transformations using cutting-edge modern frameworks.',
    rating: '4.9 (1,240 global reviews)',
    meta: {
      updated: 'Last updated 06/2026',
      level: 'Intermediate to Advanced',
      language: 'Arabic / English'
    }
  },
  ar: {
    category: 'التقنيات المتقدمة والذكاء الاصطناعي',
    title: 'معسكر مطور الذكاء الاصطناعي التوليدي المتكامل والتحول الرقمي',
    subtitle: 'أتقن بناء تطبيقات الذكاء الاصطناعي القابلة للتوسع، وضبط النماذج اللغوية الكبيرة (LLMs)، وقيادة التحول الرقمي للشركات باستخدام أحدث الإطارات التقنية.',
    rating: '4.9 (1,240 تقييم عالمي)',
    meta: {
      updated: 'آخر تحديث 06/2026',
      level: 'متوسط إلى متقدم',
      language: 'العربية / الإنجليزية'
    }
  }
};

export default function CourseHero({ lang = 'ar' }) {
  const t = courseHeroData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#2B636B] py-16 lg:py-24 text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      
      {/* ============================================
          COOL DECORATIVE BACKGROUND BLOBS (Vibrant Art)
          ============================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top Right Golden Glow */}
        <div className="absolute -top-40 -right-45 w-96 h-96 rounded-full bg-[#FFD369] opacity-15 blur-[100px]" />
        {/* Center Teal/Cyan Wave */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#387B84] opacity-30 blur-[120px]" />
        {/* Bottom Left Indigo Shift */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#4A3F6B] opacity-25 blur-[90px]" />
      </div>

      {/* ============================================
          MAIN WRAPPER & GRID
          ============================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Glassmorphic Category Badge */}
          <div className="inline-block px-3 py-1.5 mb-6 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-white/10 text-[#FFD369] backdrop-blur-md border border-white/10 shadow-sm">
            {t.category}
          </div>

          {/* Impactful Responsive Course Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight sm:leading-snug mb-4 drop-shadow-sm">
            {t.title}
          </h1>

          {/* Descriptive Vibrant Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-white/85 mb-6 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Social Proof: Rating Component */}
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-black/15 p-2 rounded-xl inline-flex border border-white/5 backdrop-blur-sm">
            <div className="flex items-center text-[#FFD369]">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 drop-shadow" />
              ))}
            </div>
            <span className="text-sm font-medium text-white px-1">
              {t.rating}
            </span>
          </div>

          {/* ============================================
              METADATA GRID (Dynamic Informative Badges)
              ============================================ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            
            {/* Metadata Item: Last Updated */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="p-2 rounded-lg bg-[#387B84]/40 text-[#FFD369]">
                <CalendarDaysIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60">{isRTL ? 'التحديث' : 'Version'}</span>
                <span className="text-sm font-medium text-white/95">{t.meta.updated}</span>
              </div>
            </div>

            {/* Metadata Item: Difficulty Level */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="p-2 rounded-lg bg-[#387B84]/40 text-[#FFD369]">
                <ChartBarIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60">{isRTL ? 'المستوى' : 'Level'}</span>
                <span className="text-sm font-medium text-white/95">{t.meta.level}</span>
              </div>
            </div>

            {/* Metadata Item: Teaching Language */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="p-2 rounded-lg bg-[#387B84]/40 text-[#FFD369]">
                <LanguageIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60">{isRTL ? 'لغة التدريس' : 'Language'}</span>
                <span className="text-sm font-medium text-white/95">{t.meta.language}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}