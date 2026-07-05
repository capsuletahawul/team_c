/**
 * SuccessAlert.jsx
 * * A reusable alert component displayed when the contact form is successfully submitted.
 * Features:
 * - Full RTL/LTR language support.
 * - Accessible close button (Screen reader friendly).
 * - Styled with Tailwind CSS standard semantic success colors (Greens).
 */

import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

// ============================================
// TRANSLATIONS OBJECT
// ============================================
const translations = {
  en: {
    title: 'Message Sent Successfully!',
    description: 'Thank you for reaching out. Our team will get back to you via your university email soon.',
    close: 'Close alert'
  },
  ar: {
    title: 'تم إرسال رسالتك بنجاح!',
    description: 'شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك عبر بريدك الجامعي في أقرب وقت.',
    close: 'إغلاق التنبيه'
  }
};

export default function SuccessAlert({ lang = "en", isVisible, onClose }) {
  // If the alert is not meant to be visible, don't render anything
  if (!isVisible) return null;

  const t = translations[lang];
  const isRTL = lang === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <div 
      dir={direction}
      // Using semantic green colors for success indication
      className="w-full bg-green-50 border border-green-500 rounded-xl p-4 sm:p-6 mb-6 shadow-sm flex items-start gap-4 transition-all duration-300"
      role="alert" // Accessibility: Tells screen readers this is an important message
    >
      {/* Success Checkmark Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
      </div>

      {/* Alert Content (Title & Description) */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-green-800 mb-1">
          {t.title}
        </h3>
        <p className="text-sm sm:text-base text-green-700">
          {t.description}
        </p>
      </div>

      {/* Close Button */}
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600 transition-colors duration-200"
          aria-label={t.close} // Accessibility: Reads "Close alert" for screen readers
        >
          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}