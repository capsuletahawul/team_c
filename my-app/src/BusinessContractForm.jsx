import React, { useState } from "react";

// Reusable Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";

// Global Context
import { useLanguage } from "./context/LanguageContext";

function BusinessContractForm() {
  const { t } = useLanguage();
  const l = t.businessForm;

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
      dir={t.dir} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      <Navbar activePage="companies" showAuthButtons={true} />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#0D4C54] to-[#00A499] text-white py-14 px-8 overflow-hidden shadow-inner">
          <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block opacity-80 ${t.dir === 'rtl' ? 'left-[-40px]' : 'right-[-40px]'}`}>
            <div className="relative w-80 h-40">
              <div className={`absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full ${t.dir === 'rtl' ? 'rotate-[-25deg]' : 'rotate-[25deg]'}`}></div>
              <div className={`absolute w-64 h-20 bg-[#EAB308] rounded-full top-12 shadow-lg ${t.dir === 'rtl' ? 'rotate-[-25deg] left-10' : 'rotate-[25deg] right-10'}`}></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-extrabold text-white">{l.hero.title}</h1>
            <p className="text-gray-100 text-sm max-w-xl mt-2">{l.hero.subtitle}</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto py-12 px-6">
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-xs p-8 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-base font-bold text-[#0D4C54] mb-6 pb-3 border-b border-gray-100">{l.form.title}</h2>

            {submitted && (
              <div className={`p-4 bg-emerald-50 border-emerald-500 text-emerald-800 rounded-xl text-xs font-bold shadow-xs mb-6 flex items-center gap-2 ${t.dir === 'rtl' ? 'border-r-4' : 'border-l-4'}`}>
                <span>✅</span>
                <span>{l.form.successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.companyName}</label>
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
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.contactPerson}</label>
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
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.email}</label>
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
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.phone}</label>
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
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.trainingType}</label>
                  <select
                    name="trainingType"
                    value={formData.trainingType}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-[#00A499] bg-gray-50 text-[#0D4C54] transition cursor-pointer"
                  >
                    <option value="" className="text-gray-400">{l.inputs.selectType}</option>
                    <option value="course">{l.inputs.type1}</option>
                    <option value="bootcamp">{l.inputs.type2}</option>
                    <option value="workshop">{l.inputs.type3}</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.trainees}</label>
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
                <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.startDate}</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className={`w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-[#00A499] bg-gray-50/50 text-[#0D4C54] transition ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="font-bold text-xs text-gray-500 block mb-1.5">{l.inputs.notes}</label>
                <textarea
                  rows="4"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={l.inputs.placeholderNotes}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-[#00A499] resize-none bg-gray-50/50 text-[#0D4C54] transition placeholder:text-gray-300"
                />
              </div>

              <div className={`pt-3 border-t border-gray-50 flex ${t.dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Button type="submit" variant="primary">
                  {l.inputs.submitBtn}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BusinessContractForm;