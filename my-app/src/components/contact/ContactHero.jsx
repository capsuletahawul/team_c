/**
 * ContactHero.jsx
 * * Hero section for the Contact page.
 * Displays the main heading and subtitle with a gradient background.
 * Supports RTL (Arabic) and LTR (English) layouts.
 */
import { EnvelopeIcon } from '@heroicons/react/24/outline';

// ============================================
// TRANSLATIONS OBJECT
// ============================================
const translations = {
  en: {
    badge: 'Contact Us',
    title: 'We\'re Here to Help',
    subtitle: 'Have questions about our courses or bootcamps? Need support with your learning journey? Our team is ready to assist you.',
  },
  ar: {
    badge: 'تواصل معنا',
    title: 'نحن هنا لمساعدتك',
    subtitle: 'هل لديك استفسارات حول دوراتنا أو معسكراتنا؟ تحتاج دعم في رحلتك التعليمية؟ فريقنا جاهز لمساعدتك.',
  },
};

export default function ContactHero({ lang = 'en' }) {
  const t = translations[lang];
  const isRTL = lang === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <section
      dir={direction}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#387B84]"
    >
      {/* ============================================
          DECORATIVE BACKGROUND ELEMENTS
          ============================================ */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FFD369]/10 blur-3xl"
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#387B84]/30 blur-2xl"
          aria-hidden="true"
        />
        <div 
          className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-[#FFD369]/5 blur-xl"
          aria-hidden="true"
        />
      </div>

      {/* ============================================
          MAIN CONTENT CONTAINER
          ============================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <EnvelopeIcon className="w-5 h-5 text-[#FFD369]" aria-hidden="true" />
            <span className="text-sm font-medium text-white">
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>

          {/* تم حذف شكل الكبسولة الذهبية من هنا بالكامل */}
        </div>
      </div>

      {/* ============================================
          BOTTOM WAVE DIVIDER
          ============================================ */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
            fill="#F0F5F9"
          />
        </svg>
      </div>
    </section>
  );
}