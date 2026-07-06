import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// استدعاء الدوال بالأسماء الصحيحة الموجودة في ملف الموك حقتك
import { getTrainerAnalytics, submitB2BRequest } from './mocks/mockApi';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

function TrainerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    durationWeeks: '',
    maxStudents: '',
    videoDurationMinutes: '',
    requirementsNotes: '' // أضفنا هذا الحقل لأن الموك حقتك تطلب حقل الـ requirementsNotes لا يقل عن 20 حرف
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // استدعاء الدالة الصحيحة من ملفك getTrainerAnalytics
    getTrainerAnalytics().then(result => {
      if (result.success) {
        setStats(result.data);
      }
      setLoading(false);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // التحقق من شرط الموك (RequirementsNotes يجب أن تكون 20 حرف أو أكثر)
    if (formData.requirementsNotes.length < 20) {
      setError("حقل تفاصيل المعسكر والمواصفات يجب ألا يقل عن 20 حرفاً للقبول في السيرفر.");
      return;
    }

    // ربط مع الدالة المتاحة بالموك submitB2BRequest لتسجيل الطلب
    submitB2BRequest({ requirementsNotes: formData.requirementsNotes, ...formData }).then(result => {
      if (result.success) {
        setMessage("تم إرسال طلب إنشاء المعسكر بنجاح وتوليد تذكرة برقم: " + result.data.ticketId);
        setFormData({ title: '', price: '', durationWeeks: '', maxStudents: '', videoDurationMinutes: '', requirementsNotes: '' });
      } else {
        setError(result.details?.requirementsNotes || "فشل في تسجيل الطلب.");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message="جاري جلب إحصائيات المدرب من فضاء كبسولة تحوّل..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
      <Navbar activePage="bootcamps" />

      {/* الهيرو سكشن بالتأثيرات والأشكال المنحنية مثل لقطة الموقع */}
      <div className="relative bg-capsule-gradient text-white py-16 px-8 overflow-hidden shadow-md">
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-90">
          <div className="relative w-80 h-40">
            <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full -rotate-25 backdrop-blur-xs"></div>
            <div className="absolute w-64 h-20 bg-capsule-gold rounded-full -rotate-25 top-12 left-10 shadow-lg"></div>
            <span className="absolute text-capsule-gold text-xl top-[-10px] right-24 animate-pulse">✦</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-right">
          <span className="bg-white/10 border border-white/20 text-xs px-4 py-1.5 rounded-full font-semibold mb-4 inline-block backdrop-blur-xs">
            🔹 منصة كبسولة تحول التعليمية
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">لوحة تحكم المدرب</h1>
          <p className="text-gray-200 text-sm max-w-xl leading-relaxed">أدير مبيعاتك، تتبع طلابك، وساهم في بناء جيل جاهز لسوق العمل عبر رفع معسكرات تطبيقية بحتة.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* كروت الأرقام من الموك الفعلي حقتك */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-gray-400 mb-2">إجمالي الأرباح المستلمة</p>
            <h3 className="text-3xl font-black text-capsule-teal">{stats?.totalPayoutCollected} <span className="text-xs font-normal text-gray-400">SAR</span></h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-r-4 border-capsule-gold hover:shadow-md transition">
            <p className="text-xs font-bold text-capsule-dark-gold mb-2">الطلاب النشطين المسجلين</p>
            <h3 className="text-3xl font-black text-capsule-navy">{stats?.activeEnrolledStudentsCount} <span className="text-sm font-bold text-capsule-teal">طالب</span></h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-r-4 border-capsule-navy hover:shadow-md transition flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-capsule-navy mb-2">حالة الحساب التدريبي</p>
              <h3 className="text-xl font-bold text-emerald-600 mt-2">موثق ونشط ✅</h3>
            </div>
            <button 
              onClick={() => navigate('/trainer-profile')}
              className="text-xs font-bold text-capsule-teal hover:text-capsule-navy transition mt-3 text-right cursor-pointer"
            >
              عرض وتعديل ملفك الشخصي للمدرب ←
            </button>
          </div>
        </div>

        {/* نموذج إنشاء معسكر */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-3xl mx-auto shadow-sm">
          <div className="border-b border-gray-100 pb-5 mb-6">
            <h2 className="text-xl font-bold text-capsule-navy flex items-center">🚀 إنشاء معسكر عملي جديد</h2>
          </div>

          {message && <div className="mb-5 p-4 bg-emerald-50 border-r-4 border-emerald-500 text-emerald-800 rounded-xl text-xs font-bold">{message}</div>}
          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">عنوان المعسكر التطبيقي</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="مثال: معسكر هندسة واجهات الويب الاحترافية" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">رسوم التسجيل (SAR)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">المدة الزمنية (بالأسابيع)</label>
                <input type="number" name="durationWeeks" value={formData.durationWeeks} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">الحد الأقصى للمقاعد</label>
                <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">متوسط طول المقطع (بالدقائق)</label>
                <input type="number" name="videoDurationMinutes" value={formData.videoDurationMinutes} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">مواصفات ومتطلبات المعسكر (مهم: لا يقل عن 20 حرف لتجاوز فحص الموك)</label>
              <textarea name="requirementsNotes" value={formData.requirementsNotes} onChange={handleInputChange} required rows="3" placeholder="اكتب هنا المتطلبات التقنية والأدوات المطلوبة من الطلاب..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium resize-none"></textarea>
            </div>

            <Button type="submit" variant="primary">إرسال طلب المعسكر للاعتماد والنشر الحي</Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TrainerDashboard;