import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./components/Button.jsx";
import Navbar from "./components/Navbar.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

const translations = {
  en: {
    nav: {
      logo: 'Capsule Tahawul',
      home: 'Home',
      courses: 'Courses Approval',
      bootcamps: 'Bootcamps',
      companies: 'Companies',
      signIn: 'Sign In',
      signUp: 'Sign Up'
    },
    hero: {
      title: "Courses Approval",
      subtitle: "Review and approve courses uploaded by trainers before publishing and activating them on the platform."
    },
    stats: {
      total: "Total Requests",
      approved: "Approved",
      pending: "Pending Review"
    },
    table: {
      cardTitle: "Uploaded Courses Checklist",
      colTitle: "Course Name",
      colTrainer: "Trainer",
      colCategory: "Category",
      colDuration: "Duration",
      colStatus: "Status",
      colActions: "Actions",
      actionApprove: "Approve",
      actionReject: "Reject",
      statusApproved: "Approved ✅",
      statusRejected: "Rejected ✕",
      unitHours: " Hours"
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
      pendingText: "Pending Review",
      approvedText: "Approved",
      rejectedText: "Rejected",
      catCyber: "Cybersecurity",
      catWeb: "Web Development",
      course1Title: "Advanced Cyber Engineering Bootcamp",
      course2Title: "Web Application Development with React",
      trainer1: "Mr. Khalid",
      trainer2: "Ms. Hind"
    }
  },
  ar: {
    nav: {
      logo: 'كبسولة تحول',
      home: 'الرئيسية',
      courses: 'اعتماد الدورات',
      bootcamps: 'المعسكرات',
      companies: 'الشركات',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب'
    },
    hero: {
      title: "اعتماد الدورات التدريبية",
      subtitle: "مراجعة واعتماد الدورات المرفوعة من المدربين قبل نشرها وتفعيلها في المنصة."
    },
    stats: {
      total: "إجمالي الطلبات",
      approved: "تمت الموافقة",
      pending: "بانتظار المراجعة"
    },
    table: {
      cardTitle: "قائمة مراجعة الدورات المرفوعة",
      colTitle: "اسم الدورة",
      colTrainer: "المدرب",
      colCategory: "التصنيف",
      colDuration: "المدة",
      colStatus: "الحالة",
      colActions: "الإجراءات",
      actionApprove: "اعتماد",
      actionReject: "رفض",
      statusApproved: "تم الاعتماد ✅",
      statusRejected: "مرفوض ✕",
      unitHours: " ساعة"
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
      pendingText: "بانتظار المراجعة",
      approvedText: "تمت الموافقة",
      rejectedText: "مرفوض",
      catCyber: "الأمن السيبراني",
      catWeb: "تطوير الويب",
      course1Title: "معسكر الهندسة السيبرانية المتقدم",
      course2Title: "تطوير تطبيقات الويب بـ React",
      trainer1: "أ. خالد ",
      trainer2: "أ. هند"
    }
  }
};

export default function CoursesApproval() {
  const navigate = useNavigate();
  // Global page language state switcher (Defaults to Arabic)
  const { lang } = useTheme();
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const [courses, setCourses] = useState([
    {
      id: 1,
      titleKey: "course1Title",
      trainerKey: "trainer1",
      categoryKey: "catCyber",
      durationVal: 32,
      status: "بانتظار المراجعة", 
    },
    {
      id: 2,
      titleKey: "course2Title",
      trainerKey: "trainer2",
      categoryKey: "catWeb",
      durationVal: 28,
      status: "بانتظار المراجعة",
    },
  ]);

  const approveCourse = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: "تمت الموافقة" } : course
      )
    );
  };

  const rejectCourse = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: "مرفوض" } : course
      )
    );
  };

  const getStatusLabel = (status) => {
    if (status === "تمت الموافقة") return t.data.approvedText;
    if (status === "مرفوض") return t.data.rejectedText;
    return t.data.pendingText;
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      <Navbar />

      {/* ============================================
          MAIN STRUCTURED HERO SYSTEM
          ============================================ */}
      <main className="flex-grow">
        
        {/* Full-width Gradient Hero Cover Block */}
        <div className="relative bg-gradient-to-r from-[#0D4C54] to-[#00A499] text-white py-14 px-8 overflow-hidden shadow-inner">
          <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
            <div className="relative w-80 h-40">
              <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full rotate-[-25deg]"></div>
              <div className="absolute w-64 h-20 bg-[#EAB308] rounded-full rotate-[-25deg] top-12 left-10 shadow-lg"></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-extrabold text-white">{t.hero.title}</h1>
            <p className="text-gray-100 text-sm max-w-xl mt-2">{t.hero.subtitle}</p>
          </div>
        </div>

        {/* Central Component Content Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Quick Metrics Line */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{t.stats.total}</p>
              <p className="text-2xl font-black text-[#0D4C54]">{courses.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{t.stats.approved}</p>
              <p className="text-2xl font-black text-emerald-600">
                {courses.filter((c) => c.status === "تمت الموافقة").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{t.stats.pending}</p>
              <p className="text-2xl font-black text-[#EAB308]">
                {courses.filter((c) => c.status === "بانتظار المراجعة").length}
              </p>
            </div>
          </div>

          {/* Core Technical Data Table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-base font-bold text-[#0D4C54]">{t.table.cardTitle}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                    <th className="p-4">{t.table.colTitle}</th>
                    <th className="p-4">{t.table.colTrainer}</th>
                    <th className="p-4">{t.table.colCategory}</th>
                    <th className="p-4">{t.table.colDuration}</th>
                    <th className="p-4">{t.table.colStatus}</th>
                    <th className="p-4 text-center">{t.table.colActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 text-[#0D4C54] font-bold">{t.data[course.titleKey]}</td>
                      <td className="p-4 text-gray-500">{t.data[course.trainerKey]}</td>
                      <td className="p-4 text-gray-500">{t.data[course.categoryKey]}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-teal-50 text-[#00A499]">
                          {course.durationVal}{t.table.unitHours}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-bold ${
                            course.status === "تمت الموافقة"
                              ? "text-emerald-600"
                              : course.status === "مرفوض"
                              ? "text-red-600"
                              : "text-[#EAB308]"
                          }`}
                        >
                          {getStatusLabel(course.status)}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {course.status === "بانتظار المراجعة" ? (
                          <div className="flex gap-2 justify-center">
                            <Button onClick={() => approveCourse(course.id)}>
                              {t.table.actionApprove}
                            </Button>
                            <button
                              type="button"
                              onClick={() => rejectCourse(course.id)}
                              className="px-5 py-2.5 text-sm font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl transition duration-150 active:scale-[0.98] shadow-xs cursor-pointer"
                            >
                              {t.table.actionReject}
                            </button>
                          </div>
                        ) : course.status === "تمت الموافقة" ? (
                          <span className="text-emerald-600 text-xs font-bold">{t.table.statusApproved}</span>
                        ) : (
                          <span className="text-red-600 text-xs font-bold">{t.table.statusRejected}</span>
                        )}
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
          2. CORPORATE FOOTER SYSTEM
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