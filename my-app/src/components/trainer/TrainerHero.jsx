/**
 * TrainerHero.jsx
 * 
 * The Cover Banner component for the Trainer Profile view.
 * Replicates the fluid design found in 94d3bcae-8419-4e07-afcb-3f6c826afd12.JPG.
 * 
 * Features an organic deep-teal corporate gradient layout, layered glassmorphic
 * vector accents, and a distinctive golden capsule badge rotated symmetrically.
 * Completely responsive and localized for RTL (Arabic) and LTR (English).
 */

// ============================================
// BILINGUAL RESOURCE DICTIONARY
// ============================================
const heroData = {
  en: {
    title: 'Trainer Profile',
    subtitle: 'Comprehensive review of trainer biographies, assigned technical courses, and global metrics.'
  },
  ar: {
    title: 'الملف الشخصي للمدرب',
    subtitle: 'استعراض بيانات المدرب والدورات والإحصائيات الخاصة به.'
  }
};

export default function TrainerHero({ lang = 'ar' }) {
  const t = heroData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#06282E] via-[#0D4C54] to-[#14707C] pt-14 pb-28 md:py-20 text-white min-h-[240px] flex items-center shadow-inner"
    >
      
      {/* ============================================
          GEOMETRIC BRAND ARTWORK (Matches Reference Images)
          Replicating the iconic skewed yellow capsule and dark glass shadows
          ============================================ */}
      <div className={`absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-500 ${
        isRTL ? 'left-6 md:left-16' : 'right-6 md:right-16'
      }`}>
        <div className="relative w-44 h-24 sm:w-64 sm:h-32 flex items-center justify-center">
          
          {/* Layer 1: Dark Glass Backdrop Shadow (Rotated) */}
          <div className="absolute w-full h-[70%] bg-black/20 backdrop-blur-md rounded-full transform rotate-[-25deg] translate-x-2 translate-y-3" />
          
          {/* Layer 2: Main Vibrant Brand Golden/Yellow Pill */}
          <div className="absolute w-full h-[70%] bg-gradient-to-r from-[#C2950C] to-[#EAB308] rounded-full transform rotate-[-25deg] shadow-lg border border-white/10" />
          
          {/* Layer 3: Overlay Transparent Glossy Reflection Accent */}
          <div className="absolute w-[90%] h-[50%] bg-white/10 rounded-full transform rotate-[-25deg] -translate-y-2 opacity-60" />
          
        </div>
      </div>

      {/* Ambient background soft light flare to boost color richness */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/15 pointer-events-none" />

      {/* ============================================
          HERO TEXT CONTENT BLOCK
          ============================================ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`max-w-2xl text-center md:text-start ${
          isRTL ? 'md:pr-6' : 'md:pl-6'
        }`}>
          
          {/* Main Accessible Page Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3 drop-shadow-xs">
            {t.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-lg">
            {t.subtitle}
          </p>

        </div>
      </div>

    </section>
  );
}