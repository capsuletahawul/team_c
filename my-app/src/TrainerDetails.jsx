import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { getTrainerProfile, updateTrainerProfile } from './mocks/mockApi';
import { PaperAirplaneIcon, UserIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, PhoneIcon, BriefcaseIcon, StarIcon as OutlineStar, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';

// قواميس النصوص الثابتة والترجمة للواجهة
const uiLabels = {
  en: {
    loading: 'Loading trainer profile data...', error: 'Failed to load trainer details.',
    heroTitle: 'Trainer Profile', heroSub: 'Comprehensive review of trainer biographies, assigned technical courses, and global metrics.',
    editBtn: 'Edit Profile', saveBtn: 'Save Changes', cancelBtn: 'Cancel', saving: 'Saving...',
    coursesTitle: 'Training Courses', thName: 'Course Name', thStudents: 'Number of Students', thStatus: 'Status', statusPub: 'Published', statusRev: 'Under Review',
    reviewsTitle: 'Students Feedbacks & Reviews', rateTitle: 'Rate Your Experience with the Trainer', rateDesc: 'Click on the stars to instantly update the overall evaluation metrics.',
    thankYou: 'Thank you for your active feedback!', notRated: 'No rating selected yet. Hover and click to test!', textSelection: 'Your current selection: ',
    contactTitle: 'Direct Consultation & Message', contactSub: 'Have a corporate training inquiry? Drop a message directly to the trainer.',
    msgSuccess: '✨ Your inquiry has been dispatched successfully!', labelName: 'Full Name', labelEmail: 'Email Address', labelMsg: 'Your Message', btnSend: 'Send Message Now'
  },
  ar: {
    loading: 'جاري جلب بيانات المدرب والتأكد من الاتصال...', error: 'عذراً، فشل تحميل بيانات المدرب الحالية.',
    heroTitle: 'الملف الشخصي للمدرب', heroSub: 'استعراض بيانات المدرب والدورات والإحصائيات الخاصة به.',
    editBtn: 'تعديل الملف الشخصي', saveBtn: 'حفظ التغييرات', cancelBtn: 'إلغاء', saving: 'جاري الحفظ...',
    coursesTitle: 'الدورات التدريبية', thName: 'اسم الدورة', thStudents: 'عدد الطلاب', thStatus: 'الحالة', statusPub: 'منشور', statusRev: 'قيد المراجعة',
    reviewsTitle: 'آراء وتقييمات الطلاب', rateTitle: 'قيّم تجربتك التدريبية مع المدرب', rateDesc: 'اضغط على النجوم لتحديث التقييم الفوري على لوحة التحكم التفاعلية للمستخدم.',
    thankYou: 'شكراً جزيلاً على تقييمك ومشاركتك الفعّالة!', notRated: 'لم تختر أي تقييم بعد. مرر الماوس واضغط للتقييم!', textSelection: 'اختيارك الحالي: ',
    contactTitle: 'طلب استشارة أو رسالة مباشرة', contactSub: 'هل لديك استفسار حول تدريب الشركات؟ أرسل رسالتك مباشرة إلى المدرب.',
    msgSuccess: '✨ تم إرسال طلب الاستشارة الخاص بك بنجاح إلى المدرب!', labelName: 'الاسم الكامل', labelEmail: 'البريد الإلكتروني', labelMsg: 'نص الرسالة أو تفاصيل الاستشارة', btnSend: 'إرسال الرسالة الآن'
  }
};

const starIndices = [1, 2, 3, 4, 5];

export default function TrainerDetails() {
  const { t: globalShared, lang } = useLanguage();
  const l = uiLabels[lang];
  const isRTL = lang === 'ar';

  // States مطابقة لـ StudentProfile
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', specialty: '', bio: '' });
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved

  // تفاعل التقييم وفورم التواصل
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // 1. جلب البيانات ديناميكياً عند تحميل الصفحة (نفس منطق الطالب)
  useEffect(() => {
    let isMounted = true;
    getTrainerProfile()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          setProfile(res.data);
          setFormValues({ name: res.data.name, specialty: res.data.specialty, bio: res.data.bio });
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) { setError(true); setLoading(false); }
      });
    return () => { isMounted = false; };
  }, []);

  // 2. معالجة حفظ التعديلات وإرسالها للـ API (نفس منطق الطالب)
  const handleSave = async (e) => {
    e.preventDefault();
    setSaveState('saving');
    const res = await updateTrainerProfile(formValues);
    if (res.success) {
      setProfile({ ...profile, ...formValues });
      setSaveState('saved');
      setTimeout(() => { setIsEditing(false); setSaveState('idle'); }, 800);
    } else {
      setSaveState('idle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
        <Navbar activePage="companies" showAuthButtons={true} />
        <div className="flex-grow flex items-center justify-center p-8"><div className="text-center font-bold text-slate-500 animate-pulse text-sm">{l.loading}</div></div>
        <Footer />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
        <Navbar activePage="companies" showAuthButtons={true} />
        <div className="flex-grow flex items-center justify-center p-8"><div className="text-center font-bold text-red-500 text-sm">{l.error}</div></div>
        <Footer />
      </div>
    );
  }

  return (
    <div dir={globalShared.dir} className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300">
      <Navbar activePage="companies" showAuthButtons={true} />
      
      <main className="flex-grow">
        {/* HERO COMPONENT */}
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#06282E] via-[#0D4C54] to-[#14707C] pt-14 pb-28 md:py-20 text-white min-h-[240px] flex items-center shadow-inner">
          <div className={`absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-500 ${isRTL ? 'left-6 md:left-16' : 'right-6 md:right-16'}`}>
            <div className="relative w-44 h-24 sm:w-64 sm:h-32 flex items-center justify-center">
              <div className="absolute w-full h-[70%] bg-black/20 backdrop-blur-md rounded-full transform rotate-[-25deg] translate-x-2 translate-y-3" />
              <div className="absolute w-full h-[70%] bg-gradient-to-r from-[#C2950C] to-[#EAB308] rounded-full transform rotate-[-25deg] shadow-lg border border-white/10" />
            </div>
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className={`max-w-2xl text-center md:text-start ${isRTL ? 'md:pr-6' : 'md:pl-6'}`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">{l.heroTitle}</h1>
              <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-lg">{l.heroSub}</p>
            </div>
          </div>
        </section>

        {/* MAIN WRAPPER CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16 space-y-8">
          
          {/* PROFILE COMPONENT (With True Inline Editing) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            {!isEditing ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 space-y-4 text-center md:text-start w-full">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0D4C54]">{profile.name}</h2>
                    <p className="text-sm font-bold text-[#00A499] mt-0.5">{profile.specialty}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-xs sm:text-sm font-semibold text-slate-500">
                    <div className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4 text-slate-400" /><a href={`mailto:${profile.email}`} className="hover:text-[#00A499]">{profile.email}</a></div>
                    <div className="hidden sm:block text-slate-300">|</div>
                    <div className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-slate-400" /><a href={`tel:${profile.phone}`} className="hover:text-[#00A499]">{profile.phone}</a></div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-flex">
                    <BriefcaseIcon className="w-4 h-4 text-[#00A499]" /><span>{isRTL ? `الخبرة: ${profile.experience} سنوات` : `Experience: ${profile.experience} Years`}</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">{profile.bio}</p>
                  <div className="pt-2 flex justify-center md:justify-start">
                    <button onClick={() => setIsEditing(true)} className="bg-[#387B84] hover:bg-[#2C6269] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-all">{l.editBtn}</button>
                  </div>
                </div>
                <div className="flex-shrink-0 order-first md:order-last">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#00A499] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-md">{profile.avatarLetter || 'A'}</div>
                </div>
              </div>
            ) : (
              /* فورم التعديل الحقيقي المطابق لـ StudentProfile */
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
                    <input type="text" required value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#00A499]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">{isRTL ? 'التخصص التدريبي' : 'Specialty'}</label>
                    <input type="text" required value={formValues.specialty} onChange={(e) => setFormValues({ ...formValues, specialty: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#00A499]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">{isRTL ? 'النبذة التعريفية' : 'Biography'}</label>
                  <textarea required rows={3} value={formValues.bio} onChange={(e) => setFormValues({ ...formValues, bio: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#00A499] resize-none" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" disabled={saveState === 'saving'} className="bg-[#0D4C54] hover:bg-[#003947] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs disabled:opacity-75">
                    {saveState === 'saving' ? l.saving : l.saveBtn}
                  </button>
                  <button type="button" onClick={() => { setIsEditing(false); setFormValues({ name: profile.name, specialty: profile.specialty, bio: profile.bio }); }} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm px-5 py-2.5 rounded-xl">
                    {l.cancelBtn}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* STATS METRICS COMPONENT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 flex flex-col justify-between items-center sm:items-start min-h-[110px]">
              <span className="text-xs font-bold text-slate-400">{isRTL ? 'عدد الدورات' : 'Number of Courses'}</span>
              <span className="text-4xl font-black text-[#0D4C54] mt-2 font-mono">{profile.stats?.coursesCount || 0}</span>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 flex flex-col justify-between items-center sm:items-start min-h-[110px]">
              <span className="text-xs font-bold text-slate-400">{isRTL ? 'عدد الطلاب' : 'Number of Students'}</span>
              <span className="text-4xl font-black text-[#00A499] mt-2 font-mono">{profile.stats?.studentsCount || 0}</span>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 flex flex-col justify-between items-center sm:items-start min-h-[110px]">
              <span className="text-xs font-bold text-slate-400">{isRTL ? 'التقييم العام' : 'Global Rating'}</span>
              <div className="flex items-center gap-2 mt-2"><span className="text-4xl font-black text-[#EAB308] font-mono">{profile.stats?.rating || '0.0'}</span><SolidStar className="w-7 h-7 text-[#EAB308]" /></div>
            </div>
          </div>

          {/* COURSES TABLE COMPONENT */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-black text-[#0D4C54]">{l.coursesTitle}</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className={`p-4 font-black ${isRTL ? 'text-right' : 'text-left'}`}>{l.thName}</th>
                    <th className="p-4 text-center font-black">{l.thStudents}</th>
                    <th className="p-4 text-center font-black">{l.thStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                  {(profile.courses || []).map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className={`p-4 font-black text-[#0d4c54] ${isRTL ? 'text-right' : 'text-left'}`}>{course.name}</td>
                      <td className="p-4 text-center text-slate-500 font-mono text-base">{course.students}</td>
                      <td className="p-4 text-center">
                        {course.status === 'published' ? (
                          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#E6F7F0] text-[#00A499] min-w-[95px]">{l.statusPub}</span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706] min-w-[95px]">{l.statusRev}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* REVIEWS & RATINGS SYSTEM */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3"><ChatBubbleLeftRightIcon className="w-5 h-5 text-[#00A499]" /><h3 className="text-lg font-black text-[#0D4C54]">{l.reviewsTitle}</h3></div>
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3 text-center sm:text-start">
              <h4 className="text-sm font-black text-slate-700">{l.rateTitle}</h4>
              <p className="text-xs font-semibold text-slate-400 max-w-xl leading-relaxed">{l.rateDesc}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <div className="flex items-center justify-center gap-1 text-[#EAB308]">
                  {starIndices.map((idx) => (
                    <button key={idx} type="button" disabled={hasRated} onClick={() => { setUserRating(idx); setHasRated(true); }} onMouseEnter={() => !hasRated && setHoverRating(idx)} onMouseLeave={() => !hasRated && setHoverRating(0)} className={`transition-transform duration-100 ${hasRated ? 'cursor-default' : 'hover:scale-125 focus:outline-none'}`}>
                      {(idx <= (hoverRating || userRating)) ? <SolidStar className="w-6 h-6" /> : <OutlineStar className="w-6 h-6 text-slate-300" />}
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold text-slate-500">{hasRated ? <span className="text-emerald-600 font-black">{l.thankYou}</span> : userRating > 0 ? <span>{l.textSelection} <strong className="text-[#EAB308] text-sm">{userRating}</strong></span> : <span className="text-slate-400 font-medium">{l.notRated}</span>}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {(profile.reviews || []).map((review) => (
                  <div key={review.id} className="p-5 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-all space-y-3 shadow-xs">
                    <div className="flex items-center justify-between gap-4">
                      <div><h5 className="text-sm font-black text-[#0D4C54]">{review.name}</h5><span className="text-[11px] font-bold text-slate-400">{review.date}</span></div>
                      <div className="flex items-center gap-0.5 text-[#EAB308]">
                        {starIndices.slice(0, review.rating).map((_, i) => <SolidStar key={i} className="w-4 h-4" />)}
                        {starIndices.slice(review.rating).map((_, i) => <OutlineStar key={i} className="w-4 h-4 text-slate-200" />)}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT TRAINER FORM CARD */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-6">
            <div><h3 className="text-lg font-black text-[#0D4C54]">{l.contactTitle}</h3><p className="text-xs sm:text-sm font-semibold text-slate-400 max-w-2xl mt-1">{l.contactSub}</p></div>
            {contactSubmitted && <div className="p-4 rounded-xl bg-[#E6F7F0] border border-[#00A499]/20 text-[#00A499] text-sm font-bold">{l.msgSuccess}</div>}
            <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); setContactForm({ name: '', email: '', message: '' }); }} className="space-y-4">
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
                  <span>{l.btnSend}</span><PaperAirplaneIcon className={`w-4 h-4 transform ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}