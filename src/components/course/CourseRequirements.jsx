/**
 * CourseRequirements.jsx
 * * Technical prerequisites and hardware setup requirements for the bootcamp.
 * Engineered with clear structural layouts, colorful indicator tags,
 * and high accessibility contrast metrics.
 */

import { CodeBracketIcon, CpuChipIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

// ============================================
// TRANSLATIONS & REQUIREMENTS DATA
// ============================================
const requirementsData = {
  en: {
    title: 'Bootcamp Prerequisites',
    subtitle: 'Please review the technical background and hardware requirements needed to ensure an optimal learning experience.',
    items: [
      {
        id: 'tech',
        title: 'Technical Background',
        desc: 'Intermediate knowledge of JavaScript/Python and basic familiarity with modern web architectures and APIs.',
        icon: CodeBracketIcon,
        borderColor: 'border-cyan-100 hover:border-cyan-300',
        iconBg: 'bg-cyan-50 text-cyan-600'
      },
      {
        id: 'hardware',
        title: 'Hardware Setup',
        desc: 'A laptop (Mac/Windows/Linux) with at least 8GB RAM (16GB recommended) and stable internet connection for remote labs.',
        icon: CpuChipIcon,
        borderColor: 'border-purple-100 hover:border-purple-300',
        iconBg: 'bg-purple-50 text-purple-600'
      },
      {
        id: 'mindset',
        title: 'Commitment & Mindset',
        desc: 'Readiness to invest 10-15 hours per week for building engineering tasks, coding challenges, and interactive team review sessions.',
        icon: ShieldCheckIcon,
        borderColor: 'border-amber-100 hover:border-amber-300',
        iconBg: 'bg-amber-50 text-amber-600'
      }
    ]
  },
  ar: {
    title: 'المتطلبات المسبقة للانضمام',
    subtitle: 'يرجى مراجعة الخلفية التقنية والمواصفات اللازمة لضمان تحقيق أقصى استفادة ممكنة من غرف المعمل والتطبيق المتقدم.',
    items: [
      {
        id: 'tech',
        title: 'الخلفية التقنية المطلوبة',
        desc: 'معرفة متوسطة بلغة JavaScript أو Python، وفهم أساسي لكيفية التعامل مع واجهات برمجة التطبيقات (APIs).',
        icon: CodeBracketIcon,
        borderColor: 'border-cyan-100 hover:border-cyan-300',
        iconBg: 'bg-cyan-50 text-cyan-600'
      },
      {
        id: 'hardware',
        title: 'مواصفات جهاز الكمبيوتر',
        desc: 'جهاز كمبيوتر بذاكرة عشوائية لا تقل عن 8 جيجابايت (يفضل 16 جيجابايت)، مع اتصال إنترنت مستقر للمختبرات عن بعد.',
        icon: CpuChipIcon,
        borderColor: 'border-purple-100 hover:border-purple-300',
        iconBg: 'bg-purple-50 text-purple-600'
      },
      {
        id: 'mindset',
        title: 'الالتزام الذهني والوقتي',
        desc: 'الاستعداد المكامل لتخصيص 10 إلى 15 ساعة أسبوعياً لحل التحديات البرمجية وبناء المشاريع وجلسات التوجيه الجماعية.',
        icon: ShieldCheckIcon,
        borderColor: 'border-amber-100 hover:border-amber-300',
        iconBg: 'bg-amber-50 text-amber-600'
      }
    ]
  }
};

export default function CourseRequirements({ lang = 'ar' }) {
  const t = requirementsData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md shadow-gray-100/40 relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />

      {/* Header Info */}
      <div className="space-y-2 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-capsule-navy flex items-center gap-3">
          <span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-purple-600 inline-block" />
          {t.title}
        </h2>
        <p className="text-sm text-capsule-navy/70 max-w-xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Grid of Dynamic Requirements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.items.map((item) => {
          const IconComponent = item.icon;

          return (
            <div 
              key={item.id}
              className={`p-5 rounded-2xl border bg-white shadow-xs transition-all duration-300 transform hover:-translate-y-1 ${item.borderColor}`}
            >
              {/* Vibrant Colored Icon Backdrop */}
              <div className={`p-3 rounded-xl inline-block mb-4 ${item.iconBg}`}>
                <IconComponent className="w-6 h-6 stroke-[2]" aria-hidden="true" />
              </div>

              {/* Requirement Card Labels */}
              <h3 className="text-base font-extrabold text-capsule-navy mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-capsule-navy/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}