/**
 * CourseInstructor.jsx
 * * Biography and technical profile of the lead bootcamp instructor.
 * Features a modern card design with interactive social links, 
 * glowing gradient avatar rings, and multi-colored technical skill tags.
 */

import { AcademicCapIcon, BriefcaseIcon, StarIcon, UsersIcon } from '@heroicons/react/24/solid';

// ============================================
// TRANSLATIONS & INSTRUCTOR MOCK DATA
// ============================================
const instructorData = {
  en: {
    sectionTitle: 'Meet Your Instructor',
    name: 'Dr. Rayan Al-Qahtani',
    role: 'Chief AI Architect & Digital Transformation Advisor',
    bio: 'With over 15 years of industry experience, Dr. Rayan has directed core enterprise AI system deployments across elite cloud technology hubs in Silicon Valley and Saudi Arabia. He specialized in large-scale LLMOps and structural optimization for banking and government transformation sectors.',
    stats: {
      rating: '4.9 Instructor Rating',
      students: '18,500+ Students',
      courses: '7 Deep-Tech Bootcamps'
    },
    skills: ['LLMOps Architecture', 'Fine-Tuning Expert', 'Cloud Security', 'Corporate Strategy']
  },
  ar: {
    sectionTitle: 'تعرّف على موجّه المعسكر',
    name: 'د. ريان القحطاني',
    role: 'كبير مهندسي الذكاء الاصطناعي ومستشار التحول الرقمي',
    bio: 'على مدى أكثر من 15 عاماً من الخبرة العملية، قاد الدكتور ريان مشاريع كبرى لنشر أنظمة الذكاء الاصطناعي في نخبة من مراكز الحوسبة السحابية في وادي السيليكون والمملكة العربية السعودية. متخصّص في عمليات النماذج اللغوية الضخمة (LLMOps) والتحول الرقمي للقطاعات المصرفية والحكومية.',
    stats: {
      rating: '4.9 تقييم المدرب',
      students: '+18,500 طالب وطالبة',
      courses: '7 معسكرات تقنية عميقة'
    },
    skills: ['هندسة الـ LLMOps', 'ضبط النماذج الرقمية', 'أمن الحوسبة السحابية', 'الاستراتيجية الرقمية']
  }
};

export default function CourseInstructor({ lang = 'ar' }) {
  const t = instructorData[lang];
  const isRTL = lang === 'ar';

  // Array of vibrant background combinations for the skills tags to keep it cool & colorful
  const tagColors = [
    'bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-100',
    'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100',
    'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100',
    'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
  ];

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md shadow-gray-100/40 relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />

      {/* Section Global Title */}
      <h2 className="text-xl sm:text-2xl font-black text-capsule-navy flex items-center gap-3 mb-8">
        <span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 inline-block" />
        {t.sectionTitle}
      </h2>

      {/* Profile Layout Split Box */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
        
        {/* Left Side Avatar & Mini Quick Metrics */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Cool Glowing Gradient Outer Circle Wrapper */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-capsule-teal to-purple-600 shadow-lg">
            {/* Inner avatar box */}
            <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-3xl">
                RQ
              </div>
            </div>
          </div>

          {/* Social / Verified Label Badge */}
          <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isRTL ? 'مدرّب معتمد' : 'Verified Expert'}
          </span>
        </div>

        {/* Right Side Rich Description and Text Details */}
        <div className="flex-grow text-center md:text-start space-y-4">
          <div>
            <h3 className="text-xl font-black text-capsule-navy tracking-tight">
              {t.name}
            </h3>
            <p className="text-sm font-bold text-capsule-teal mt-0.5">
              {t.role}
            </p>
          </div>

          {/* Quick Mini Horizontal Stats Grid */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-bold text-gray-500 py-1">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
              <StarIcon className="w-4 h-4 text-amber-400" />
              <span>{t.stats.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
              <UsersIcon className="w-4 h-4 text-capsule-teal" />
              <span>{t.stats.students}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
              <AcademicCapIcon className="w-4 h-4 text-purple-500" />
              <span>{t.stats.courses}</span>
            </div>
          </div>

          {/* Main Biography Block */}
          <p className="text-sm sm:text-base text-capsule-navy/75 leading-relaxed">
            {t.bio}
          </p>

          {/* Core Skills Tags Array Row */}
          <div className="pt-3">
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {t.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-default transition-colors duration-200 ${
                    tagColors[index % tagColors.length]
                  }`}
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}