/**
 * TrainerReviews.jsx
 * 
 * Interactive 5-Star Student Review and Feedback Management System.
 * Engineered for the Capsule Tahawul platform using Tailwind CSS and React state.
 * 
 * Features:
 * - Dynamic interactive star selection (Click to lock rating, Hover to preview).
 * - Real-time frontend calculation updating the global average score.
 * - Bilingual support for review items and layout grids (RTL/LTR).
 */

import { useState } from 'react';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStar, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

// ============================================
// BILINGUAL RESOURCE DICTIONARY
// ============================================
const reviewsData = {
  en: {
    sectionTitle: 'Students Feedbacks & Reviews',
    interactiveTitle: 'Rate Your Experience with the Trainer',
    interactiveDesc: 'Click on the stars to instantly update the overall evaluation metrics on the client-side dashboard.',
    totalReviewsText: 'Based on 320 global student submissions',
    yourRatingLabel: 'Your current selection: ',
    thankYou: 'Thank you for your active feedback!',
    notRatedYet: 'No rating selected yet. Hover and click to test!',
    studentReviewsTitle: 'Recent Student Testimonials',
    reviewsList: [
      { id: 1, name: 'Eng. Sarah Ali', date: 'June 2026', comment: 'Excellent presentation style. Dr. Ahmed explains complex software state-machines in an incredible step-by-step methodology.', rating: 5 },
      { id: 2, name: 'Mohammed Al-Saeed', date: 'May 2026', comment: 'The bootcamp labs were deeply rigorous. Highly recommend his React architectural approach.', rating: 4 }
    ]
  },
  ar: {
    sectionTitle: 'تقييمات وآراء الطلاب',
    interactiveTitle: 'قيّم تجربتك التدريبية مع هذا المدرب',
    interactiveDesc: 'انقر على النجوم لتجربة تحديث متوسط التقييم العام فورياً في الواجهة الأمامية للمنصة.',
    totalReviewsText: 'بناءً على 320 تقييم من الطلاب الخريجين',
    yourRatingLabel: 'تقييمك الحالي: ',
    thankYou: 'شكراً لك على مشاركتنا تقييمك الفعّال!',
    notRatedYet: 'لم تقم بالاختيار بعد. مرر الفأرة واضغط للتجربة!',
    studentReviewsTitle: 'مراجعات الطلاب الأخيرة',
    reviewsList: [
      { id: 1, name: 'م. سارة علي', date: 'يونيو ٢٠٢٦', comment: 'أسلوب شرح ممتاز ومبسط جداً. المهندس أحمد يمتلك مهارة تبسيط المفاهيم المعمارية المعقدة لـ React خطوة بخطوة.', rating: 5 },
      { id: 2, name: 'محمد السعيد', date: 'مايو ٢٠٢٦', comment: 'المختبرات العملي في المعسكر كانت عميقة ومكثفة جداً. أنصح بمتابعة هذا المسار الهندسي معه.', rating: 4 }
    ]
  }
};

export default function TrainerReviews({ lang = 'ar' }) {
  const t = reviewsData[lang];
  const isRTL = lang === 'ar';

  // State values managing the interactive 5-star rating matrix
  const [userRating, setUserRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // Initial dashboard baseline setup metrics
  const baselineTotalReviews = 320;
  const baselineAverage = 4.9;

  /**
   * Dynamically calculates a simulated live average when the user interacts
   * with the frontend star system without requiring database mutations.
   */
  const calculatedAverage = userRating 
    ? (((baselineAverage * baselineTotalReviews) + userRating) / (baselineTotalReviews + 1)).toFixed(2)
    : baselineAverage.toFixed(1);

  const handleStarClick = (ratingValue) => {
    setUserRating(ratingValue);
    setHasRated(true);
  };

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-8 transition-all duration-300 space-y-8"
    >
      {/* 1. Header Section */}
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-lg font-black text-[#0D4C54] flex items-center gap-2.5">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-capsule-teal" />
          {t.sectionTitle}
        </h3>
      </div>

      {/* ============================================
          INTERACTIVE RATING SYSTEM BOX (Vibrant/Cool Aesthetic)
          ============================================ */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-slate-50 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Sub-block A: Real-Time Score Engine Display */}
        <div className="text-center md:text-start space-y-2">
          <h4 className="text-base font-extrabold text-[#0D4C54]">{t.interactiveTitle}</h4>
          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">{t.interactiveDesc}</p>
          
          {/* Live Updating Large Indicator Badge */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="px-5 py-2.5 rounded-2xl bg-[#0D4C54] text-white font-black text-2xl shadow-md flex items-center gap-2 select-none animate-fade-in">
              <span>{calculatedAverage}</span>
              <SolidStar className="w-6 h-6 text-[#EAB308]" />
            </div>
            <span className="text-xs font-bold text-slate-400">
              {userRating ? `(${baselineTotalReviews + 1} ${isRTL ? 'تقييم متاح' : 'total submissions'})` : t.totalReviewsText}
            </span>
          </div>
        </div>

        {/* Sub-block B: Interactive Dynamic Clickable Stars Row */}
        <div className="flex flex-col items-center justify-center space-y-3 bg-white p-5 rounded-xl border border-slate-100/60 shadow-xs">
          
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starValue) => {
              // Logic to decide whether a star looks filled based on hover state or final locked click state
              const isFilled = hoverRating ? starValue <= hoverRating : starValue <= userRating;

              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform duration-150 active:scale-90 hover:scale-110 p-1"
                  aria-label={`Rate ${starValue} Stars`}
                >
                  {isFilled ? (
                    <SolidStar className="w-9 h-9 text-[#EAB308] drop-shadow-xs cursor-pointer" />
                  ) : (
                    <OutlineStar className="w-9 h-9 text-slate-300 hover:text-[#EAB308] cursor-pointer" />
                  )}
                </button>
              );
            })}
          </div>

          {/* User Feedback Label Hint */}
          <p className="text-xs font-bold text-center transition-colors duration-200">
            {hasRated ? (
              <span className="text-[#00A499]">✨ {t.thankYou} ({t.yourRatingLabel} {userRating}/5)</span>
            ) : (
              <span className="text-slate-400">{t.notRatedYet}</span>
            )}
          </p>

        </div>
      </div>

      {/* ============================================
          STATIC STUDENT TESTIMONIALS LIST
          ============================================ */}
      <div className="space-y-4 pt-2">
        <h4 className="text-sm font-black text-slate-500 uppercase tracking-wide">
          {t.studentReviewsTitle}
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {t.reviewsList.map((review) => (
            <div 
              key={review.id}
              className="p-5 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 space-y-3 shadow-xs"
            >
              {/* Review Item Header Details */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-black text-[#0D4C54]">{review.name}</h5>
                  <span className="text-[11px] font-bold text-slate-400">{review.date}</span>
                </div>

                {/* Score display logic for targeted review node */}
                <div className="flex items-center gap-0.5 text-[#EAB308]">
                  {[...Array(review.rating)].map((_, i) => (
                    <SolidStar key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>

              {/* Review Content Paragraph */}
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}