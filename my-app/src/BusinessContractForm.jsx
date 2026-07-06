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
      courses: 'Courses',
      bootcamps: 'Bootcamps',
      companies: 'Companies',
      signIn: 'Sign In',
      signUp: 'Sign Up'
    },
    hero: {
      title: "Business Contract Form",
      subtitle: "Fill in the details for organizations seeking a strategic partnership to host a customized course or bootcamp."
    },
    form: {
      title: "Training Contract Request Details",
      successMsg: "Contract request submitted successfully! Our sales team will contact you soon."
    },
    inputs: {
      companyName: "Company / Organization Name",
      contactPerson: "Contact Person Name",
      email: "Official Email Address",
      phone: "Phone / Contact Number",
      trainingType: "Training Track Type",
      selectType: "Select Type",
      type1: "Customized Training Course",
      type2: "Intensive Bootcamp",
      type3: "Executive Workshop",
      trainees: "Expected Number of Trainees",
      startDate: "Proposed Start Date",
      notes: "Special Notes or Requirements",
      placeholderNotes: "Write any additional details about the required outcomes here...",
      submitBtn: "Submit Official Contract Request"
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
    }
  },
  ar: {
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
      title: "نموذج عقد الشركات",
      subtitle: "تعبئة بيانات الجهة الراغبة في شراكة إستراتيجية لإقامة دورة أو معسكر تدريبي مخصص."
    },
    form: {
      title: "بيانات طلب التعاقد التدريبي",
      successMsg: "تم إرسال طلب التعاقد بنجاح! سيتواصل معكم فريق مبيعات كبسولة تحول قريباً."
    },
    inputs: {
      companyName: "اسم الشركة / الجهة",
      contactPerson: "اسم مسؤول التواصل",
      email: "البريد الإلكتروني الرسمي",
      phone: "رقم الجوال / التواصل",
      trainingType: "نوع المسار التدريبي",
      selectType: "اختر النوع",
      type1: "دورة تدريبية مخصصة",
      type2: "معسكر تدريبي مكثف",
      type3: "ورشة عمل تنفيذية",
      trainees: "عدد المتدربين المتوقع",
      startDate: "التاريخ المقترح للبداية",
      notes: "ملاحظات أو متمتطلبات خاصة",
      placeholderNotes: "اكتب هنا أي تفاصيل إضافية حول المخرجات المطلوبة...",
      submitBtn: "تقديم طلب التعاقد الرسمي"
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
    }
  }
};

function BusinessContractForm() {
  const navigate = useNavigate();
  const { lang } = useTheme();
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    trainingType: "",
    trainees: "",
    startDate: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      trainingType: "",
      trainees: "",
      startDate: "",
      notes: "",
    });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      <Navbar />

      <main className="flex-grow">
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

        <div className="max-w-3xl mx-auto py-12 px-6">
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-xs p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-base font-bold text-[#0D4C54] mb-6 pb-3 border-b border-gray-100">{t.form.title}</h2>

            {submitted && (
              <div className={`p-4 bg-emerald-50 border-emerald-500 text-emerald-800 rounded-xl text-xs font-bold shadow-xs mb-6 flex items-center gap-2 ${isRTL ? 'border-r-4' : 'border-l-4'}`}>
                <span>✅</span>
                <span>{t.form.successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.companyName}</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] transition"
                  />
                </div>
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.contactPerson}</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] text-left transition"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.phone}</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] text-left transition"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.trainingType}</label>
                  <select
                    name="trainingType"
                    value={formData.trainingType}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-[#00A499] bg-gray-50 text-[#0D4C54] transition cursor-pointer"
                  >
                    <option value="" className="text-gray-400">{t.inputs.selectType}</option>
                    <option value="دورة تدريبية">{t.inputs.type1}</option>
                    <option value="معسكر تدريبي">{t.inputs.type2}</option>
                    <option value="ورشة عمل">{t.inputs.type3}</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.trainees}</label>
                  <input
                    type="number"
                    name="trainees"
                    min="1"
                    value={formData.trainees}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] transition"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.startDate}</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className={`w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] transition ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="font-bold text-xs text-gray-500 block mb-1.5">{t.inputs.notes}</label>
                <textarea
                  rows="4"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t.inputs.placeholderNotes}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] resize-none bg-gray-50/50 text-[#0D4C54] transition placeholder:text-gray-300"
                />
              </div>

              <div className={`pt-3 border-t border-gray-50 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <Button type="submit" variant="primary">
                  {t.inputs.submitBtn}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

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

export default BusinessContractForm;