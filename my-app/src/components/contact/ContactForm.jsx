/**
 * ContactForm.jsx
 * * The main contact form component.
 * Features:
 * - State management for form data (Name, Email, Subject, Category, Message)
 * - Real-time client-side validation
 * - Loading states and error handling
 * - Full RTL/LTR language support
 * - Accessible form elements (Labels, ARIA attributes)
 */

import { useState } from 'react';
import { PaperAirplaneIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
// We will create this mock API file next
import { submitContactForm } from '../../mocks/mockApi';

// ============================================
// TRANSLATIONS OBJECT
// ============================================
const translations = {
  en: {
    formTitle: 'Send us a message',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    email: 'University Email',
    emailPlaceholder: 'example@university.edu.sa',
    subject: 'Subject',
    subjectPlaceholder: 'How can we help you?',
    category: 'Category',
    categoryOptions: [
      { value: '', label: 'Select a category' },
      { value: 'bootcamps', label: 'Bootcamps & Courses' },
      { value: 'support', label: 'Technical Support' },
      { value: 'partnerships', label: 'Partnerships' },
      { value: 'other', label: 'Other' }
    ],
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    submitBtn: 'Send Message',
    loadingBtn: 'Sending...',
    errors: {
      required: 'This field is required',
      email: 'Please enter a valid university email',
      minLength: 'Message must be at least 10 characters long'
    }
  },
  ar: {
    formTitle: 'أرسل لنا رسالة',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الجامعي',
    emailPlaceholder: 'example@university.edu.sa',
    subject: 'الموضوع',
    subjectPlaceholder: 'كيف يمكننا مساعدتك؟',
    category: 'التصنيف',
    categoryOptions: [
      { value: '', label: 'اختر التصنيف' },
      { value: 'bootcamps', label: 'المعسكرات والدورات' },
      { value: 'support', label: 'الدعم الفني' },
      { value: 'partnerships', label: 'الشراكات' },
      { value: 'other', label: 'أخرى' }
    ],
    message: 'الرسالة',
    messagePlaceholder: 'اكتب رسالتك هنا...',
    submitBtn: 'إرسال الرسالة',
    loadingBtn: 'جاري الإرسال...',
    errors: {
      required: 'هذا الحقل مطلوب',
      email: 'الرجاء إدخال بريد جامعي صحيح',
      minLength: 'الرسالة يجب أن تتكون من 10 أحرف على الأقل'
    }
  }
};

export default function ContactForm({ lang = "en" }) {
  const t = translations[lang];
  const isRTL = lang === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  // ============================================
  // FORM STATE
  // ============================================
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  // Loading state during API call
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Status of the submission (null, 'success', or 'error')
  const [submitStatus, setSubmitStatus] = useState(null);

  // ============================================
  // INPUT HANDLER
  // Updates state dynamically based on input 'name'
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // ============================================
  // VALIDATION LOGIC
  // ============================================
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = t.errors.required;
    if (!formData.subject.trim()) newErrors.subject = t.errors.required;
    if (!formData.category) newErrors.category = t.errors.required;
    
    if (!formData.email.trim()) {
      newErrors.email = t.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Basic email regex
      newErrors.email = t.errors.email;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.errors.required;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.errors.minLength;
    }

    setErrors(newErrors);
    // Returns true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Call mock API (we will create this next)
      await submitContactForm(formData);
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable helper for showing error messages under inputs
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
        <ExclamationCircleIcon className="w-4 h-4" />
        {error}
      </p>
    );
  };

  return (
    <div dir={direction} className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Form Container Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-capsule-border overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-capsule-bg px-6 py-8 border-b border-capsule-border">
          <h2 className="text-2xl font-bold text-capsule-navy text-center">
            {t.formTitle}
          </h2>
        </div>

        {/* The Form Element */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Two-column layout on medium screens for Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-capsule-navy">
                {t.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t.fullNamePlaceholder}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors duration-200 
                  ${errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#C9D6DF] focus:border-capsule-teal focus:ring-1 focus:ring-capsule-teal'}
                `}
                disabled={isSubmitting}
              />
              <ErrorMessage error={errors.fullName} />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-capsule-navy">
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                dir="ltr"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors duration-200
                  ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#C9D6DF] focus:border-capsule-teal focus:ring-1 focus:ring-capsule-teal'}
                  ${isRTL ? 'text-right' : 'text-left'}
                `}
                disabled={isSubmitting}
              />
              <ErrorMessage error={errors.email} />
            </div>

          </div>

          {/* Two-column layout for Subject and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Subject Field */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-semibold text-capsule-navy">
                {t.subject} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t.subjectPlaceholder}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors duration-200 
                  ${errors.subject ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#C9D6DF] focus:border-capsule-teal focus:ring-1 focus:ring-capsule-teal'}
                `}
                disabled={isSubmitting}
              />
              <ErrorMessage error={errors.subject} />
            </div>

            {/* Category Select Field */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-semibold text-capsule-navy">
                {t.category} <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors duration-200 bg-white appearance-none cursor-pointer
                  ${errors.category ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#C9D6DF] focus:border-capsule-teal focus:ring-1 focus:ring-capsule-teal'}
                `}
                disabled={isSubmitting}
              >
                {t.categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ErrorMessage error={errors.category} />
            </div>

          </div>

          {/* Message Textarea */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-capsule-navy">
              {t.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors duration-200 resize-none
                ${errors.message ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#C9D6DF] focus:border-capsule-teal focus:ring-1 focus:ring-capsule-teal'}
              `}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.message} />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-capsule-teal hover:bg-capsule-navy text-white font-bold transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  {/* Loading spinner SVG */}
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.loadingBtn}
                </>
              ) : (
                <>
                  {t.submitBtn}
                  {/* Flips icon based on language direction */}
                  <PaperAirplaneIcon className={`w-5 h-5 ${isRTL ? 'transform rotate-180' : ''}`} />
                </>
              )}
            </button>
          </div>

          {/* Success / Error UI placeholder for now. We will replace this with SuccessAlert component later */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              {isRTL ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Message sent successfully! We will contact you soon.'}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}