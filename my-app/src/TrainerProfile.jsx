import React, { useState, useEffect } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import Button from "./components/Button";

const translations = {
  en: {
    langBtn: 'EN',
    loading: "Loading trainer data...",
    nav: {
      logo: 'Capsule Tahawul',
      home: 'Home',
      courses: 'Courses',
      bootcamps: 'Bootcamps',
      companies: 'Companies',
      signIn: 'Sign In',
      signUp: 'Sign Up'
    },
    hero: {
      title: "Trainer Profile",
      subtitle: "Review trainer information, courses, and performance metrics."
    },
    profile: {
      experience: "Experience: ",
      editBtn: "Edit Profile"
    },
    stats: {
      coursesCount: "Courses Count",
      studentsCount: "Students Count",
      rating: "Rating"
    },
    table: {
      cardTitle: "Training Courses",
      colTitle: "Course Name",
      colStudents: "Students Count",
      colStatus: "Status"
    },
    footer: {
      desc: 'A Saudi platform connecting students with practical training opportunities, building a generation fully prepared for the financial and technical labor market.',
      quickLinks: 'Quick Links',
      home: 'Home',
      coursesPaths: 'Courses & Paths',
      howItWorks: 'How Platform Works',
      social: 'Social Media',
      newsletter: 'Newsletter',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      copyright: '© 2026 Capsule Tahawul. All rights reserved.'
    },
    data: {
      fullName: "Mr. Ahmed Al-Qahtani",
      specialization: "Web Development",
      experienceVal: "8 Years",
      bio: "Certified trainer in React, JavaScript, and modern web application development.",
      statusPublished: "Published",
      statusReview: "Under Review"
    }
  },
  ar: {
    langBtn: 'AR',
    loading: "جاري تحميل بيانات المدرب...",
    nav: {
      logo: 'كبسولة تحول',
      home: 'الرئيسية',
      courses: 'الدورات',
      bootcamps: 'المعسكرات',
      companies: 'الشركات',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب'
    },
    hero: {
      title: "الملف الشخصي للمدرب",
      subtitle: "استعراض بيانات المدرب والدورات والإحصائيات الخاصة به."
    },
    profile: {
      experience: "الخبرة: ",
      editBtn: "تعديل الملف الشخصي"
    },
    stats: {
      coursesCount: "عدد الدورات",
      studentsCount: "عدد الطلاب",
      rating: "التقييم"
    },
    table: {
      cardTitle: "الدورات التدريبية",
      colTitle: "اسم الدورة",
      colStudents: "عدد الطلاب",
      colStatus: "الحالة"
    },
    footer: {
      desc: 'منصة سعودية تربط الطلاب بفرص التدريب العملي، وتبني جيلاً جاهزاً لسوق العمل المالي والتقني.',
      quickLinks: 'روابط سريعة',
      home: 'الرئيسية',
      coursesPaths: 'الدورات والمسارات',
      howItWorks: 'كيف تعمل المنصة',
      social: 'التواصل الاجتماعي',
      newsletter: 'النشرة البريدية',
      emailPlaceholder: 'بريدك الإلكتروني',
      subscribe: 'اشترك',
      copyright: '© ٢٠٢٦ كبسولة تحول. جميع الحقوق محفوظة.'
    },
    data: {
      fullName: "أ. أحمد القحطاني",
      specialization: "تطوير الويب",
      experienceVal: "8 سنوات",
      bio: "مدرب معتمد في React و JavaScript وتطوير تطبيقات الويب الحديثة.",
      statusPublished: "منشور",
      statusReview: "قيد المراجعة"
    }
  }
};

function TrainerProfile() {
  const [lang, setLang] = useState('ar');
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const [loading, setLoading] = useState(true);

  const [trainer] = useState({
    email: "ahmed@capsule.sa",
    phone: "0551234567",
    courses: 6,
    students: 320,
    rating: 4.9,
  });

  const [courses] = useState([
    {
      id: 1,
      title: "React Bootcamp",
      students: 120,
      status: "منشور",
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      students: 85,
      status: "منشور",
    },
    {
      id: 3,
      title: "Next.js Fundamentals",
      students: 0,
      status: "قيد المراجعة",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const getStatusLabel = (status) => {
    if (status === "منشور") return t.data.statusPublished;
    return t.data.statusReview;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <LoadingIndicator message={t.loading} />
      </div>
    );
  }

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      
      {/* ============================================
          1. NATIVE BILINGUAL NAVBAR SYSTEM 
          ============================================ */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs h-20 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <span className="w-8 h-8 rounded-lg bg-[#0D4C54] text-white flex items-center justify-center font-black text-sm">CT</span>
              <span className="text-[#0D4C54] font-black text-lg tracking-tight">{t.nav.logo}</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
              <a href="#" className="text-[#00A499] hover:text-[#0D4C54] transition-colors">{t.nav.home}</a>
              <a href="#" className="hover:text-[#0D4C54] transition-colors">{t.nav.courses}</a>
              <a href="#" className="hover:text-[#0D4C54] transition-colors">{t.nav.bootcamps}</a>
              <a href="#" className="hover:text-[#0D4C54] transition-colors">{t.nav.companies}</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* 💊 زر تغيير اللغة البيضاوي داخل النافبار */}
            <button 
              onClick={toggleLanguage}
              className="bg-[#EDF2F7] hover:bg-slate-200 text-[#4A5568] font-extrabold text-xs px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer border border-slate-200/50 shadow-xs"
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            <button className="text-[#00A499] hover:text-[#0D4C54] transition p-1.5 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
              </svg>
            </button>

            <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#4A5568] flex items-center justify-center border border-slate-300/30 cursor-pointer hover:bg-slate-300 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>

            <div className="h-5 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="hidden sm:flex items-center gap-3 text-xs font-bold">
              <button className="text-[#0D4C54] hover:text-[#00A499] transition px-3 py-2 cursor-pointer">
                {t.nav.signIn}
              </button>
              <button className="bg-[#00A499] hover:bg-[#0D4C54] text-white px-4 py-2 rounded-xl transition shadow-xs cursor-pointer">
                {t.nav.signUp}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ============================================
          MAIN STRUCTURED HERO SYSTEM
          ============================================ */}
      <main className="flex-grow">
        
        {/* Full-width Gradient Hero Cover Block */}
        <div className="relative bg-gradient-to-tr from-[#0f172a] to-[#0d9488] text-white py-14 px-8 overflow-hidden shadow-inner">
          <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
            <div className="relative w-80 h-40">
              <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full rotate-[-25deg]"></div>
              <div className="absolute w-64 h-20 bg-[#eab308] rounded-full rotate-[-25deg] top-12 left-10 shadow-lg"></div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-extrabold text-white">{t.hero.title}</h1>
            <p className="text-sm text-gray-200 mt-2">{t.hero.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* بطاقة معلومات المدرب */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-28 h-28 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-4xl font-black shadow-sm select-none">
                {t.data.fullName.charAt(0)}
              </div>

              <div className={`flex-1 ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                <h2 className="text-2xl font-black mb-2 text-[#0f172a]">{t.data.fullName}</h2>
                <p className="text-[#0d9488] font-semibold mb-2">{t.data.specialization}</p>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <p dir="ltr" className={isRTL ? 'text-right' : 'text-left'}>📧 {trainer.email}</p>
                  <p dir="ltr" className={isRTL ? 'text-right' : 'text-left'}>📱 {trainer.phone}</p>
                  <p className="text-sm text-gray-600 font-bold mt-2">
                    {t.profile.experience}{t.data.experienceVal}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600 max-w-2xl">
                  {t.data.bio}
                </p>

                <div className="mt-6">
                  <Button variant="primary">{t.profile.editBtn}</Button>
                </div>
              </div>
            </div>
          </div>

          {/* الإحصائيات بالكروت */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{t.stats.coursesCount}</p>
              <h3 className="text-3xl font-black mt-2 text-[#0f172a]">{trainer.courses}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{t.stats.studentsCount}</p>
              <h3 className="text-3xl font-black mt-2 text-[#0d9488]">{trainer.students}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{t.stats.rating}</p>
              <h3 className="text-3xl font-black mt-2 text-[#eab308]">⭐ {trainer.rating}</h3>
            </div>
          </div>

          {/* جدول الدورات */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/70">
              <h2 className="text-base font-bold text-[#0f172a]">{t.table.cardTitle}</h2>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                    <th className="p-4">{t.table.colTitle}</th>
                    <th className="p-4">{t.table.colStudents}</th>
                    <th className="p-4">{t.table.colStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-[#0f172a]">{course.title}</td>
                      <td className="p-4 text-gray-500">{course.students}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-block ${
                            course.status === "منشور"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-amber-50 text-[#ca8a04] border border-amber-100"
                          }`}
                        >
                          {getStatusLabel(course.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* ============================================
          2. NATIVE BILINGUAL FOOTER SYSTEM 
          ============================================ */}
      <footer className="bg-[#2B3566] text-white pt-16 pb-8 border-t border-slate-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            <div className="space-y-4">
              <h4 className="text-xl font-black text-white">📍 {t.nav.logo}</h4>
              <p className="text-sm font-medium text-white/70 leading-relaxed">{t.footer.desc}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide">{t.footer.quickLinks}</h4>
              <ul className="space-y-2.5 text-sm font-semibold text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.home}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.coursesPaths}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.howItWorks}</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide">{t.footer.social}</h4>
              <div className="flex items-center gap-4 text-white/70 text-lg">
                <a href="#" className="hover:text-white transition-colors">𝕏</a>
                <a href="#" className="hover:text-white transition-colors">💼</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white tracking-wide">{t.footer.newsletter}</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder={t.footer.emailPlaceholder} 
                  className="bg-white/10 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 flex-grow placeholder:text-white/40"
                />
                <button className="bg-[#EAB308] hover:bg-[#ca9a07] text-slate-900 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md">
                  {t.footer.subscribe}
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-white/50">
            <p>{t.footer.copyright}</p>
            <p className="tracking-wider">Capsule Tahawul Architecture Ecosystem v2.6</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default TrainerProfile;