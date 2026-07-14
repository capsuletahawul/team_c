import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { 
  EnvelopeIcon, MapPinIcon, ClockIcon, PaperAirplaneIcon, 
  ExclamationCircleIcon, CheckCircleIcon, XMarkIcon 
} from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactForm } from '../mocks/mockApi';
import { useLanguage } from '../context/LanguageContext';

// ==========================================
// 1. تعريف واجهات البيانات (TypeScript Interfaces)
// ==========================================

// واجهة تصف هيكل بيانات نموذج الاتصال بالكامل
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

// واجهة تحدد أخطاء التحقق المحتملة لكل حقل
interface ContactFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  category?: string;
  message?: string;
}

// واجهة لعناصر معلومات التواصل الجانبية الممررة للمصفوفة
interface InfoItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  val: string;
  link: string | null;
}

// واجهة استجابة الدالة الموك لطلب الإرسال
interface ApiResponse {
  success: boolean;
  message?: string;
}

// ==========================================
// 2. المكون البرمجي الرئيسي لصفحة اتصل بنا
// ==========================================
export default function Contact() {
  // جلب النصوص والترجمات الحالية لإدارة اللغتين وتحديد اتجاه الصفحة
  const { t, lang } = useLanguage();
  const c = t.contact; // الوصول المباشر لنصوص صفحة الاتصال من كابيتال copy.js
  const isRTL = lang === 'ar';

  // إدارة حالات المدخلات والواجهة بأنواع صريحة ومقيدة
  const [formData, setFormData] = useState<ContactFormData>({ 
    fullName: '', email: '', phone: '', subject: '', category: '', message: '' 
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  // نقل الشاشة لأعلى الصفحة تلقائياً بمجرد تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==========================================
  // 3. دوال التحقق من صحة البيانات (Validation)
  // ==========================================
  const validateForm = (): boolean => {
    const tempErrors: ContactFormErrors = {};

    // التحقق من الاسم الثلاثي والحد الأدنى للحروف
    if (!formData.fullName.trim()) tempErrors.fullName = c.form.errRequired;
    else if (formData.fullName.trim().length < 3) tempErrors.fullName = c.form.errMinName;

    // التحقق من صيغة البريد الإلكتروني عبر الـ Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = c.form.errRequired;
    else if (!emailRegex.test(formData.email)) tempErrors.email = c.form.errEmail;

    // التحقق من صيغة رقم الجوال السعودي (يبدأ بـ 05 ويتكون من 10 أرقام)
    const phoneRegex = /^05\d{8}$/;
    if (!formData.phone.trim()) tempErrors.phone = c.form.errRequired;
    else if (!phoneRegex.test(formData.phone)) tempErrors.phone = c.form.errPhone;
    
    // التحقق من تعبئة باقي الحقول وطول الرسالة
    if (!formData.subject.trim()) tempErrors.subject = c.form.errRequired;
    if (!formData.category) tempErrors.category = c.form.errRequired;
    if (!formData.message.trim()) tempErrors.message = c.form.errRequired;
    else if (formData.message.trim().length < 20) tempErrors.message = c.form.errMinMsg;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ==========================================
  // 4. معالجة إرسال النموذج وحفظ الحالات
  // ==========================================
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const response = await submitContactForm(formData) as ApiResponse;
      if (response && response.success) {
        setShowAlert(true);
        setFormData({ fullName: '', email: '', phone: '', subject: '', category: '', message: '' });
      }
    } catch (err) {
      setSubmitError("حدث خطأ أثناء إرسال الرسالة، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // مصفوفة كروت معلومات التواصل الجانبية لتبسيط الـ Render عبر الـ Map
  const infoItems: InfoItem[] = [
    { icon: EnvelopeIcon, title: c.info.emailTitle, desc: c.info.emailDesc, val: c.info.emailValue, link: `mailto:${c.info.emailValue}` },
    { icon: MapPinIcon, title: c.info.locationTitle, desc: c.info.locationDesc, val: c.info.locationValue, link: null },
    { icon: ClockIcon, title: c.info.hoursTitle, desc: c.info.hoursDesc, val: c.info.hoursValue, link: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar activePage="contact" />

      {/* هيدر الصفحة العلوي (Hero Section) */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#387B84] py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <EnvelopeIcon className="w-5 h-5 text-[#FFD369]" />
            <span className="text-sm font-medium">{c.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">{c.hero.title}</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">{c.hero.subtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 60h1440V20c-360 40-1080-40-1440 0v40z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* الحاوية الأساسية المقسمة لعمودين (النموذج والمعلومات) */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full flex-grow">
        
        {/* نموذج إدخال البيانات */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-black text-[#0D4C54] border-b border-gray-100 pb-3">{c.form.title}</h2>
          
          {/* تنبيه نجاح العملية */}
          {showAlert && (
            <div className="w-full bg-green-50 border border-green-500 rounded-xl p-4 shadow-sm flex items-start gap-3 transition-all duration-300" role="alert">
              <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-base font-bold text-green-800 mb-0.5">{c.form.alertTitle}</h3>
                <p className="text-xs text-green-700">{c.form.alertDesc}</p>
              </div>
              <button onClick={() => setShowAlert(false)} className="p-1 rounded-lg text-green-700 hover:bg-green-100">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* تنبيه فشل الاتصال بالسيرفر */}
          {submitError && (
            <div className="w-full bg-red-50 border border-red-400 text-red-700 rounded-xl p-4 mb-4 font-semibold text-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{c.form.fullName}</label>
              <input type="text" value={formData.fullName} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, fullName: e.target.value})} placeholder={c.form.fullNamePlaceholder} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal transition-all ${errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'}`} />
              {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-4 h-4" />{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{c.form.email}</label>
              <input type="text" value={formData.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})} placeholder={c.form.emailPlaceholder} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'}`} />
              {errors.email && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-4 h-4" />{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{c.form.phone}</label>
              <input type="tel" value={formData.phone} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })} placeholder={c.form.phonePlaceholder} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal transition-all ${errors.phone ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-white"}`} />
              {errors.phone && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-4 h-4" />{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{c.form.subject}</label>
                <input type="text" value={formData.subject} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, subject: e.target.value})} placeholder={c.form.subjectPlaceholder} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal transition-all ${errors.subject ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'}`} />
                {errors.subject && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-4 h-4" />{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{c.form.category}</label>
                <select value={formData.category} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({...formData, category: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal transition-all ${errors.category ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'}`}>
                  <option value="">{c.form.categorySelect}</option>
                  <option value="bootcamps">{c.form.cat1}</option>
                  <option value="support">{c.form.cat2}</option>
                  <option value="partnerships">{c.form.cat3}</option>
                  <option value="other">{c.form.cat4}</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-4 h-4" />{errors.category}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{c.form.message}</label>
              <textarea rows={4} value={formData.message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})} placeholder={c.form.messagePlaceholder} className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal transition-all ${errors.message ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'}`}></textarea>
              {errors.message && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-4 h-4" />{errors.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#0D4C54] hover:bg-[#0A3A40] text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? (
                <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{c.form.loadingBtn}</>
              ) : (
                <>{c.form.submitBtn}<PaperAirplaneIcon className={`w-5 h-5 ${isRTL ? 'transform rotate-180' : ''}`} /></>
              )}
            </button>
          </form>
        </div>

        {/* كروت معلومات التواصل الجانبية */}
        <div className="flex flex-col justify-start space-y-6">
          {infoItems.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-capsule-teal mb-4 group-hover:bg-[#0D4C54] group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0D4C54] mb-1">{item.title}</h3>
              <p className="text-slate-400 text-xs mb-3">{item.desc}</p>
              {item.link ? (
                <a href={item.link} className="text-sm font-bold text-capsule-teal hover:text-amber-500 transition-colors duration-200">{item.val}</a>
              ) : (
                <p className="text-sm font-bold text-slate-700">{item.val}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}