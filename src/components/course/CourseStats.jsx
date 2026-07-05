/**
 * CourseStats.jsx
 * * A highly vibrant, colorful stats grid component.
 * Displays key metrics like hours, projects, live sessions, and certification.
 * Features hover transformations, dynamic border colors, and custom icon backdrops.
 */

import { 
  ClockIcon, 
  CodeBracketIcon, 
  VideoCameraIcon, 
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

// ============================================
// TRANSLATIONS & METRICS DATA
// ============================================
const statsData = {
  en: [
    {
      id: 'duration',
      value: '120+ Hours',
      label: 'Intensive Practical Learning',
      color: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      icon: ClockIcon
    },
    {
      id: 'projects',
      value: '12+ Projects',
      label: 'Production-Ready Portfolios',
      color: 'from-amber-400 to-orange-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      icon: CodeBracketIcon
    },
    {
      id: 'sessions',
      value: 'Live Coding',
      label: 'Interactive Mentorship Sessions',
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: VideoCameraIcon
    },
    {
      id: 'cert',
      value: 'Certified',
      label: 'Accredited Digital Transformation Certificate',
      color: 'from-emerald-400 to-teal-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      icon: AcademicCapIcon
    }
  ],
  ar: [
    {
      id: 'duration',
      value: '120+ ساعة',
      label: 'تعليم عملي مكثف وعميق',
      color: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      icon: ClockIcon
    },
    {
      id: 'projects',
      value: '+12 مشروع حقيقي',
      label: 'بناء ملف أعمال احترافي جاهز للعمل',
      color: 'from-amber-400 to-orange-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      icon: CodeBracketIcon
    },
    {
      id: 'sessions',
      value: 'جلسات مباشرة',
      label: 'توجيه وتطبيق تفاعلي مع الخبراء',
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: VideoCameraIcon
    },
    {
      id: 'cert',
      value: 'شهادة معتمدة',
      label: 'شهادة كبسولة تحول للتحول الرقمي',
      color: 'from-emerald-400 to-teal-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      icon: AcademicCapIcon
    }
  ]
};

export default function CourseStats({ lang = 'ar' }) {
  const currentStats = statsData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="w-full"
    >
      {/* Dynamic Grid Layout - Auto adjustment for fluid layouts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="group relative bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-md shadow-gray-100/40 hover:shadow-xl hover:shadow-gray-200/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Decorative Colorful Card Border Strip */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${stat.color}`} />

              <div className="flex flex-col items-start gap-4">
                {/* Icon Wrapper with Custom Color-themed Background */}
                <div className={`p-3 rounded-xl ${stat.bgLight} ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 stroke-[2]" aria-hidden="true" />
                </div>

                {/* Statistics Content Labels */}
                <div className="space-y-1">
                  <h3 className={`text-xl sm:text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-capsule-navy/70 leading-snug">
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Cool subtle ambient glow effect behind cards on hover */}
              <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300 pointer-events-none`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}