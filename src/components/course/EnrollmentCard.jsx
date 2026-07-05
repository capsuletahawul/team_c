/**
 * EnrollmentCard.jsx
 * * Sticky sidebar card for course registration.
 * Features a high-conversion design with pricing, discount badges,
 * and a clear call-to-action button, ensuring maximum impact on desktop users.
 */

import { ClockIcon, SparklesIcon, CheckIcon } from '@heroicons/react/24/solid';

// ============================================
// TRANSLATIONS DATA
// ============================================
const enrollmentData = {
  en: {
    price: '$499',
    originalPrice: '$899',
    discount: '45% OFF',
    title: 'Ready to Transform?',
    features: ['8 Weeks Intensive', 'Live Mentorship', 'Job Guarantee Support', 'Lifetime Access'],
    btnText: 'Secure Your Spot',
    timer: 'Enrollment closes in: 04:12:45'
  },
  ar: {
    price: '1,899 ر.س',
    originalPrice: '3,499 ر.س',
    discount: 'خصم 45%',
    title: 'جاهز لبدء رحلة التحول؟',
    features: ['8 أسابيع تدريب مكثف', 'جلسات توجيه مباشرة', 'دعم التوظيف الاحترافي', 'وصول دائم للمحتوى'],
    btnText: 'احجز مقعدك الآن',
    timer: 'ينتهي التسجيل خلال: 04:12:45'
  }
};

export default function EnrollmentCard({ lang = 'ar' }) {
  const t = enrollmentData[lang];
  const isRTL = lang === 'ar';

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 sm:p-7 relative overflow-hidden"
    >
      {/* Subtle Glowing Background Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-capsule-teal/5 rounded-full blur-3xl -mr-16 -mt-16" />

      {/* Pricing Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-3xl font-black text-capsule-navy">{t.price}</h3>
          <span className="text-sm font-bold text-gray-400 line-through">{t.originalPrice}</span>
          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md">
            {t.discount}
          </span>
        </div>
        <h4 className="text-lg font-bold text-capsule-navy">{t.title}</h4>
      </div>

      {/* Feature List */}
      <ul className="space-y-4 mb-8">
        {t.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-capsule-navy/80">
            <CheckIcon className="w-5 h-5 text-capsule-teal" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-capsule-navy to-[#2B636B] text-white font-black py-4 rounded-xl shadow-lg hover:shadow-capsule-teal/30 hover:-translate-y-0.5 transition-all duration-300 mb-4 flex items-center justify-center gap-2">
        <SparklesIcon className="w-5 h-5 text-amber-400" />
        {t.btnText}
      </button>

      {/* Timer Badge */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <ClockIcon className="w-4 h-4 text-purple-500" />
        {t.timer}
      </div>
    </div>
  );
}