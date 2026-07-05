import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";

// ============================================
// BILINGUAL LOCAL TRANSLATION DICTIONARY
// ============================================
const translations = {
  en: {
    langBtn: 'EN',
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
    }
  },
  ar: {
    langBtn: 'AR',
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
      notes: "ملاحظات أو متطلبات خاصة",
      placeholderNotes: "اكتب هنا أي تفاصيل إضافية حول المخرجات المطلوبة...",
      submitBtn: "تقديم طلب التعاقد الرسمي"
    }
  }
};

function BusinessContractForm() {
  // Global page language state switcher (Defaults to Arabic)
  const [lang, setLang] = useState('ar');
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

  // Function to handle switching language smoothly
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

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
      className={`min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {/* ربط النافبار بصفحة الشركات التفاعلية */}
      <Navbar activePage="companies" />

      {/* الهيرو سكشن الفخم المتطابق مع الهوية البصرية */}
      <div className="relative bg-capsule-gradient text-white py-14 px-8 overflow-hidden shadow-inner">
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
          <div className="relative w-80 h-40">
            <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full rotate-[-25deg]"></div>
            <div className="absolute w-64 h-20 bg-capsule-gold rounded-full rotate-[-25deg] top-12 left-10 shadow-lg"></div>
          </div>
        </div>
        
        {/* هيدر مرن لتوزيع العناوين وزر اللغة على الأطراف بشكل متناسق */}
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{t.hero.title}</h1>
            <p className="text-gray-200 text-sm max-w-xl mt-2">{t.hero.subtitle}</p>
          </div>

          {/* 💊 زر تبديل اللغة البيضاوي مثل كود صديقتك تماماً */}
          <button 
            type="button"
            onClick={toggleLanguage}
            className="bg-[#EDF2F7] hover:bg-slate-200 text-[#4A5568] font-extrabold text-xs px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer border border-slate-200/50 shadow-xs self-start sm:self-auto"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8">
          <h2 className="text-base font-bold text-capsule-navy mb-6 pb-3 border-b border-gray-100">{t.form.title}</h2>

          {/* رسالة النجاح متناسقة مع ألوان التنبيهات بالمنصة والاتجاه الديناميكي */}
          {submitted && (
            <div className={`p-4 bg-emerald-50 border-emerald-500 text-emerald-800 rounded-xl text-xs font-bold shadow-xs mb-6 animate-fadeIn flex items-center gap-2 ${isRTL ? 'border-r-4' : 'border-l-4'}`}>
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
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy transition"
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
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy transition"
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
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy text-left transition"
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
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy text-left transition"
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
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-capsule-teal bg-gray-50 text-capsule-navy transition cursor-pointer"
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
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy transition"
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
                className={`w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy transition ${isRTL ? 'text-right' : 'text-left'}`}
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
                className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal resize-none bg-gray-50/50 text-capsule-navy transition placeholder:text-gray-300"
              />
            </div>

            <div className={`pt-3 border-t border-gray-50 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <Button type="submit" variant="primary">
                {t.inputs.submitBtn}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* الفوتر المشترك الكامل للمنصة */}
      <Footer />
    </div>
  );
}

export default BusinessContractForm;