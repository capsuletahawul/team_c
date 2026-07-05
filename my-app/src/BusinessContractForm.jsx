import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";

function BusinessContractForm() {
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
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
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
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl font-extrabold text-white">نموذج عقد الشركات</h1>
          <p className="text-gray-200 text-sm max-w-xl mt-2">
            تعبئة بيانات الجهة الراغبة في شراكة إستراتيجية لإقامة دورة أو معسكر تدريبي مخصص.
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8">
          <h2 className="text-base font-bold text-capsule-navy mb-6 pb-3 border-b border-gray-100">بيانات طلب التعاقد التدريبي</h2>

          {/* رسالة النجاح متناسقة مع ألوان التنبيهات بالمنصة */}
          {submitted && (
            <div className="p-4 bg-emerald-50 border-r-4 border-emerald-500 text-emerald-800 rounded-xl text-xs font-bold shadow-xs mb-6 animate-fadeIn flex items-center space-x-2 space-x-reverse">
              <span>✅</span>
              <span>تم إرسال طلب التعاقد بنجاح! سيتواصل معكم فريق مبيعات كبسولة تحول قريباً.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-bold text-xs text-gray-500 block mb-1.5">اسم الشركة / الجهة</label>
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
                <label className="font-bold text-xs text-gray-500 block mb-1.5">اسم مسؤول التواصل</label>
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
                <label className="font-bold text-xs text-gray-500 block mb-1.5">البريد الإلكتروني الرسمي</label>
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
                <label className="font-bold text-xs text-gray-500 block mb-1.5">رقم الجوال / التواصل</label>
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
                <label className="font-bold text-xs text-gray-500 block mb-1.5">نوع المسار التدريبي</label>
                <select
                  name="trainingType"
                  value={formData.trainingType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-capsule-teal bg-gray-50 text-capsule-navy transition cursor-pointer"
                >
                  <option value="" className="text-gray-400">اختر النوع</option>
                  <option value="دورة تدريبية">دورة تدريبية مخصصة</option>
                  <option value="معسكر تدريبي">معسكر تدريبي مكثف</option>
                  <option value="ورشة عمل">ورشة عمل تنفيذية</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-xs text-gray-500 block mb-1.5">عدد المتدربين المتوقع</label>
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
              <label className="font-bold text-xs text-gray-500 block mb-1.5">التاريخ المقترح للبداية</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-capsule-teal bg-gray-50/50 text-capsule-navy text-right transition"
              />
            </div>

            <div>
              <label className="font-bold text-xs text-gray-500 block mb-1.5">ملاحظات أو متطلبات خاصة</label>
              <textarea
                rows="4"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="اكتب هنا أي تفاصيل إضافية حول المخرجات المطلوبة..."
                className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-capsule-teal resize-none bg-gray-50/50 text-capsule-navy transition placeholder:text-gray-300"
              />
            </div>

            <div className="pt-3 border-t border-gray-50 flex justify-end">
              <Button type="submit" variant="primary">
                تقديم طلب التعاقد الرسمي
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