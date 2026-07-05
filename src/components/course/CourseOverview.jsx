/**
 * CourseOverview.jsx
 * * Detailed learning outcomes and competencies section.
 * Features a colorful dual-tone grid with vibrant check badges
 * and smooth shadow layers to optimize scanning readability.
 */

import { CheckCircleIcon } from '@heroicons/react/24/solid';

// ============================================
// TRANSLATIONS & CORE OUTCOMES DATA
// ============================================
const overviewData = {
  en: {
    title: 'What You Will Master',
    description: 'This elite bootcamp bridges advanced software architecture with generative artificial intelligence, providing hands-on pipelines to upgrade your technical engineering capabilities completely.',
    outcomes: [
      'Architect and deploy end-to-end cloud-native Generative AI applications.',
      'Fine-tune open-source Large Language Models (LLMs) on private enterprise datasets.',
      'Build advanced Retrieval-Augmented Generation (RAG) knowledge intelligence architectures.',
      'Implement multi-agent autonomous workflows using modern AI orchestration tools.',
      'Optimize AI training pipelines for maximum performance and cost efficiency.',
      'Lead tactical enterprise digital transformations with safe corporate AI compliance.'
    ]
  },
  ar: {
    title: 'ما الذي ستتقنه في هذا المعسكر',
    description: 'يجمع هذا المعسكر النخبي بين هندسة البرمجيات المتقدمة والذكاء الاصطناعي التوليدي، مما يوفر لك خطوط إنتاج وتطبيق برمجية حية لترقية قدراتك التقنية والهندسية بالكامل.',
    outcomes: [
      'بناء وتطوير تطبيقات الذكاء الاصطناعي التوليدي السحابية من الصفر وحتى الإنتاج.',
      'ضبط وتعديل النماذج اللغوية الكبيرة (LLMs) مفتوحة المصدر على بيانات الشركات الخاصة.',
      'تأسيس بنية متقدمة لأنظمة استرجاع المعلومات المعززة بالتوليد (RAG) الذكية.',
      'تنفيذ تدفقات عمل برمجية ذاتية القيادة ومتعددة الوكلاء (Multi-Agent Systems).',
      'تحسين خطوط معالجة وتدريب نماذج الذكاء الاصطناعي لأعلى كفاءة وأقل تكلفة حوسبية.',
      'قيادة استراتيجيات التحول الرقمي بامتثال أمني وحوكمة تقنية صارمة للشركات.'
    ]
  }
};

export default function CourseOverview({ lang = 'ar' }) {
  const t = overviewData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md shadow-gray-100/40 relative overflow-hidden"
    >
      {/* Decorative Top-Edge Colored Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-capsule-teal to-cyan-500" />

      {/* Section Header & Summary */}
      <div className="space-y-3 mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-capsule-navy flex items-center gap-3">
          <span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-capsule-teal to-cyan-600 inline-block" />
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-capsule-navy/75 leading-relaxed max-w-3xl">
          {t.description}
        </p>
      </div>

      {/* Outcomes Grid with Vibrant Check Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {t.outcomes.map((outcome, idx) => (
          <div 
            key={idx}
            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-capsule-bg/40 to-white border border-gray-50/80 hover:border-capsule-teal/20 hover:bg-white transition-all duration-200 group"
          >
            {/* Colorful Icon Backdrop Wrapper */}
            <div className="flex-shrink-0 mt-0.5 text-capsule-teal group-hover:text-cyan-500 group-hover:scale-110 transition-all duration-200">
              <CheckCircleIcon className="w-6 h-6 drop-shadow-sm" />
            </div>

            {/* Outcome Descriptive Text */}
            <p className="text-sm sm:text-base font-semibold text-capsule-navy/85 leading-relaxed">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}