import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { getTrainerProfile } from './mocks/mockApi';
import { PaperAirplaneIcon, UserIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, PhoneIcon, BriefcaseIcon, StarIcon as OutlineStar, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';

export default function TrainerDetails() {
  // الاعتماد الكامل على الكونتيكست العالمي[cite: 5]
  const { t, lang } = useLanguage();
  
  const l = t.trainerDetails || {
    loading: lang === 'ar' ? 'جاري تحميل بيانات ملف المدرب الخبير...' : 'Loading trainer profile data...',
    error: lang === 'ar' ? 'فشل في تحميل تفاصيل المدرب، يرجى المحاولة لاحقاً.' : 'Failed to load trainer details.',
    heroTitle: lang === 'ar' ? 'ملف المدرب الشخصي' : 'Trainer Profile',
    heroSub: lang === 'ar' ? 'مراجعة شاملة للسيرة الذاتية للمدرب، الدورات التقنية المسندة إليه، والمقاييس العالمية.' : 'Comprehensive review of trainer biographies, assigned technical courses, and global metrics.',
    coursesTitle: lang === 'ar' ? 'الدورات التدريبية القائمة' : 'Training Courses',
    thName: lang === 'ar' ? 'اسم الدورة التدريبية' : 'Course Name',
    thStudents: lang === 'ar' ? 'عدد الطلاب المسجلين' : 'Number of Students',
    thStatus: lang === 'ar' ? 'الحالة الحالية' : 'Status',
    statusPub: lang === 'ar' ? 'منشورة حياً' : 'Published',
    statusRev: lang === 'ar' ? 'تحت المراجعة' : 'Under Review',
    reviewsTitle: lang === 'ar' ? 'آراء وتقييمات الطلاب المتدربين' : 'Students Feedbacks & Reviews',
    rateTitle: lang === 'ar' ? 'قيم تجربتك الحالية مع المدرب الخبير' : 'Rate Your Experience with the Trainer',
    rateDesc: lang === 'ar' ? 'انقر على النجوم لتحديث مقاييس التقييم الإجمالية فوراً وضمان الجودة الكلية للمنصة.' : 'Click on the stars to instantly update the overall evaluation metrics.',
    thankYou: lang === 'ar' ? 'نشكرك على تقييمك الفعّال والدائم!' : 'Thank you for your active feedback!',
    notRated: lang === 'ar' ? 'لم يتم اختيار أي تقييم بعد. مرر وانقر للتجربة المباشرة!' : 'No rating selected yet. Hover and click to test!',
    textSelection: lang === 'ar' ? 'اختيارك الحالي هو: ' : 'Your current selection: ',
    contactTitle: lang === 'ar' ? 'الاستشارة المباشرة وإرسال رسالة' : 'Direct Consultation & Message',
    contactSub: lang === 'ar' ? 'هل لديك استفسار حول تدريب مخصص للشركات؟ أرسل رسالة مباشرة إلى صندوق المدرب.' : 'Have a corporate training inquiry? Drop a message directly to the trainer.',
    msgSuccess: lang === 'ar' ? '✨ تم إرسال استفسارك بنجاح إلى المدرب!' : '✨ Your inquiry has been dispatched successfully!',
    labelName: lang === 'ar' ? 'الاسم الكامل' : 'Full Name',
    labelEmail: lang === 'ar' ? 'البريد الإلكتروني للاستجابة' : 'Email Address',
    labelMsg: lang === 'ar' ? 'تفاصيل رسالتك أو استشارتك' : 'Your Message',
    btnSend: lang === 'ar' ? 'إرسال الرسالة الآن' : 'Send Message Now',
    bioTitle: lang === 'ar' ? 'السيرة المهنية' : 'Biography',
    phoneTitle: lang === 'ar' ? 'رقم الهاتف' : 'Phone'
  };

  const { trainerId } = useParams();

  const [rawData, setRawData] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getTrainerProfile(trainerId);
        if (!isMounted) return;

        if (response.success && response.data) {
          setRawData(response.data);
          setCourses(response.data.courses || []);
        } else {
          setError(l.error);
        }
      } catch (err) {
        if (isMounted) setError(l.error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, [trainerId]);

  // إصلاح آلية التحويل الفوري لبيانات المدرب بناءً على تغير متغيّر lang
  useEffect(() => {
    if (rawData) {
      const isAr = lang === 'ar';
      setTrainer({
        fullName: isAr ? (rawData.nameAr || rawData.name) : (rawData.nameEn || rawData.name),
        specialization: isAr ? (rawData.specialtyAr || rawData.specialty) : (rawData.specialtyEn || rawData.specialty),
        bio: isAr ? (rawData.bioAr || rawData.bio) : (rawData.bioEn || rawData.bio),
        email: rawData.email || "",
        phone: rawData.phone || ""
      });
    }
  }, [rawData, lang]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowFormSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setShowFormSuccess(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#00A499] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-600">{l.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md text-center border border-red-100">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <p className="text-sm font-black text-slate-800">{error || l.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 selection:bg-[#00A499]/10" dir={t.dir}>
      <Navbar />

      {/* Hero Cover Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0D4C54] via-[#0A3A40] to-[#021E22] text-white pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,164,153,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#00A499]/20 text-[#26FFE6] text-xs font-black px-3 py-1 rounded-full border border-[#00A499]/30 mb-4 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26FFE6] animate-pulse"></span>
            {l.heroTitle}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">{trainer.fullName}</h1>
          <p className="text-slate-300 max-w-3xl text-sm md:text-base font-semibold leading-relaxed">{l.heroSub}</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Trainer Card Profile */}
          <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#00A499] to-[#0D4C54]"></div>
            
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00A499]/10 to-[#0D4C54]/5 flex items-center justify-center text-[#0D4C54] mb-4 relative group border border-slate-100">
                <UserIcon className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-black text-slate-900">{trainer.fullName}</h2>
              <p className="text-xs font-bold text-[#00A499] bg-[#00A499]/5 px-3 py-1 rounded-md mt-2 flex items-center gap-1">
                <BriefcaseIcon className="w-3.5 h-3.5" />
                {trainer.specialization}
              </p>
            </div>

            {/* Biography Profile Info */}
            <div className="py-6 border-b border-slate-100 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                  {l.bioTitle}
                </h3>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                  {trainer.bio}
                </p>
              </div>
            </div>

            {/* Contact Information Details */}
            <div className="pt-6 space-y-3.5">
              <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400"><EnvelopeIcon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0"><p className="text-xs font-bold text-slate-400">{l.labelEmail}</p><p className="text-sm font-bold truncate">{trainer.email}</p></div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400"><PhoneIcon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0"><p className="text-xs font-bold text-slate-400">{l.phoneTitle}</p><p className="text-sm font-bold truncate" dir="ltr">{trainer.phone}</p></div>
              </div>
            </div>
          </div>

          {/* Right Column: Courses, Ratings and Interactive Support */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Table of active published courses */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A499]"></span>
                  {l.coursesTitle}
                </h2>
                <span className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-md">{courses.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold bg-slate-50/20">
                      <th className={`p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{l.thName}</th>
                      <th className="p-4 text-center">{l.thStudents}</th>
                      <th className="p-4 text-center">{l.thStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-4 font-bold text-slate-900 max-w-xs md:max-w-sm truncate">{course.name || course.title}</td>
                        <td className="p-4 text-center text-slate-500 font-mono">{course.students ? course.students.toLocaleString() : 0}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full ${course.status === 'published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${course.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            {course.status === 'published' ? l.statusPub : l.statusRev}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Stars Reviews Section */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A499]"></span>
                {l.reviewsTitle}
              </h2>
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 text-center space-y-3">
                
                {/* Stars Logic Widget */}
                <div className="flex justify-center items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isSolid = hover ? star <= hover : star <= rating;
                    return (
                      <button key={star} type="button" disabled={hasRated} onClick={() => { setRating(star); setHasRated(true); }} onMouseEnter={() => !hasRated && setHover(star)} onMouseLeave={() => !hasRated && setHover(0)} className={`transition-transform duration-100 ${!hasRated ? 'hover:scale-110 active:scale-95 cursor-pointer' : 'cursor-default'} ${isSolid ? 'text-amber-400' : 'text-slate-200'}`}>
                        {isSolid ? <SolidStar className="w-8 h-8" /> : <OutlineStar className="w-8 h-8" />}
                      </button>
                    );
                  })}
                </div>
                
              </div>
            </div>

            {/* Direct Consultation Message Form Box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A499]"></span>
                  {l.contactTitle}
                </h2>
                <p className="text-xs font-semibold text-slate-400 mt-1">{l.contactSub}</p>
              </div>

              {showFormSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-700 text-sm font-bold flex items-center gap-2 animate-fade-in">
                  {l.msgSuccess}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5" />{l.labelName}</label>
                    <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-[#00A499] focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><EnvelopeIcon className="w-3.5 h-3.5" />{l.labelEmail}</label>
                    <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-[#00A499] focus:bg-white transition-all" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />{l.labelMsg}</label>
                  <textarea required rows={3} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-[#00A499] focus:bg-white transition-all resize-none" />
                </div>
                <div className="pt-1 flex justify-end">
                  <button type="submit" className="w-full sm:w-auto bg-[#0D4C54] hover:bg-[#003947] text-white font-black text-sm px-8 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 group transition-all">
                    <span>{l.btnSend}</span>
                    <PaperAirplaneIcon className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}