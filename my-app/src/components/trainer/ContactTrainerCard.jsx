/**
 * ContactTrainerCard.jsx
 * 
 * Premium Direct Communication and Consultation Form for the Trainer.
 * Engineered for the Capsule Tahawul ecosystem using Tailwind CSS semantic tokens.
 * 
 * Features responsive input grids, interactive custom focus rings matching the brand 
 * capsule-teal palette, and a high-visibility vibrant submission action button.
 */

import { useState } from 'react';
import { PaperAirplaneIcon, UserIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

// ============================================
// BILINGUAL TRANSLATION DATA
// ============================================
const contactData = {
  en: {
    title: 'Direct Consultation & Message',
    subtitle: 'Have a corporate training inquiry or need a custom technical consultation? Drop a message directly to the trainer.',
    labelName: 'Full Name',
    labelEmail: 'Email Address',
    labelMessage: 'Your Message',
    placeholderName: 'John Doe',
    placeholderEmail: 'name@company.com',
    placeholderMessage: 'Write your training details or consulting inquiry here...',
    submitBtn: 'Send Message Now',
    successMsg: '✨ Your inquiry has been dispatched successfully to the trainer!'
  },
  ar: {
    title: 'طلب استشارة أو رسالة مباشرة',
    subtitle: 'هل لديك استفسار حول تدريب الشركات أو ترغب في طلب استشارة تقنية مخصصة؟ أرسل رسالتك مباشرة إلى المدرب.',
    labelName: 'الاسم الكامل',
    labelEmail: 'البريد الإلكتروني',
    labelMessage: 'نص الرسالة أو الاستشارة',
    placeholderName: 'عبدالله محمد',
    placeholderEmail: 'name@company.com',
    placeholderMessage: 'اكتب تفاصيل مشروعك التدريبي أو استفسارك هنا...',
    submitBtn: 'إرسال الرسالة الآن',
    successMsg: '✨ تم إرسال رسالتك بنجاح! سيتواصل معك المدرب قريباً.'
  }
};

export default function ContactTrainerCard({ lang = 'ar' }) {
  const t = contactData[lang];
  const isRTL = lang === 'ar';

  // Form handling primitive front-end state management
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      // Reset form variables upon successful simulation
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-8 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative Brand Color Left/Right Strip Accent */}
      <div className={`absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0D4C54] to-[#00A499] ${
        isRTL ? 'right-0' : 'left-0'
      }`} />

      {/* Header Info Block */}
      <div className="mb-8 space-y-2">
        <h3 className="text-lg font-black text-[#0D4C54] tracking-tight">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
          {t.subtitle}
        </p>
      </div>

      {/* Submission Success Alert Notification Bar */}
      {isSubmitted && (
        <div className="mb-6 p-4 rounded-xl bg-[#E6F7F0] border border-[#00A499]/20 text-[#00A499] text-xs sm:text-sm font-bold animate-fade-in flex items-center gap-2">
          <span>{t.successMsg}</span>
        </div>
      )}

      {/* Main Interactive Contact Form Layout */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name and Email Horizontal Input Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Field 1: Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-slate-400" />
              {t.labelName}
            </label>
            <input
              type="text"
              required
              placeholder={t.placeholderName}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 placeholder:text-slate-400/70 focus:outline-none focus:border-[#00A499] focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Field 2: Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <EnvelopeIcon className="w-3.5 h-3.5 text-slate-400" />
              {t.labelEmail}
            </label>
            <input
              type="email"
              required
              placeholder={t.placeholderEmail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 placeholder:text-slate-400/70 focus:outline-none focus:border-[#00A499] focus:bg-white transition-all duration-200 text-left"
              style={{ direction: 'ltr' }}
            />
          </div>

        </div>

        {/* Field 3: Text Message Textarea Area */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5 text-slate-400" />
            {t.labelMessage}
          </label>
          <textarea
            required
            rows={4}
            placeholder={t.placeholderMessage}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 placeholder:text-slate-400/70 focus:outline-none focus:border-[#00A499] focus:bg-white transition-all duration-200 resize-none leading-relaxed"
          />
        </div>

        {/* Form Action Submit Trigger Button Component */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#0D4C54] hover:bg-[#003947] text-white font-black text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-slate-900/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <span>{t.submitBtn}</span>
            <PaperAirplaneIcon className={`w-4 h-4 transform transition-transform group-hover:translate-x-0.5 ${
              isRTL ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

      </form>

    </section>
  );
}