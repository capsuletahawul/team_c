import React, { useState, useEffect } from 'react';
// الخروج خطوة للوراء باستخدام المسارات النسبية الصحيحة للوصول للموك
import { getTrainerAnalytics, submitB2BRequest, getCourses, getTrainerProfile } from '../mocks/mockApi';

// Reusable Components
import TrainerNavbar from "../components/TrainerNavbar.jsx";
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

// Global Context
import { useLanguage } from '../context/LanguageContext';

function TrainerDashboard() {
  const { t, lang } = useLanguage();
  const l = t.trainerDashboard;

  const [stats, setStats] = useState(null);
  const [coursesList, setCoursesList] = useState([]); 
  const [reviewsList, setReviewsList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // نموذج إنشاء الدورة المفصل بالكامل
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    durationWeeks: '',
    maxStudents: '',
    videoDurationMinutes: '',
    level: 'beginner', 
    category: 'Cybersecurity', 
    description: '', 
    requirementsNotes: ''
  });

  // حساب الأرباح ديناميكياً (صافي ربح المدرب 80% بعد خصم عمولة المنصة)
  const calculateCourseEarnings = (students, price) => {
    return Math.round((students || 0) * (price || 0) * 0.8);
  };

  // حساب الإجمالي ديناميكياً بدون هاردكود
  const totalPayoutCollected = coursesList
    .filter(c => c.status === 'available')
    .reduce((acc, course) => acc + calculateCourseEarnings(course.students, course.price), 0);

  const totalStudentsEnrolled = coursesList
    .filter(c => c.status === 'available')
    .reduce((acc, course) => acc + (course.students || 0), 0);

  useEffect(() => {
    let isMounted = true;
    
    Promise.all([getTrainerAnalytics(), getCourses(), getTrainerProfile()]).then(([analyticsResult, coursesResult, profileResult]) => {
      if (!isMounted) return;
      
      if (analyticsResult.success) setStats(analyticsResult.data);
      
      if (coursesResult.success) {
        const realisticCourses = coursesResult.data.courses.map(c => ({
          ...c,
          price: c.price > 1000 ? Math.floor(Math.random() * (500 - 200 + 1) + 200) : c.price,
          isVisible: true
        }));
        setCoursesList(realisticCourses);
      }

      if (profileResult.success) setReviewsList(profileResult.data.reviews || []);
      setLoading(false);
    });
    
    return () => { isMounted = false; };
  }, []);

  const requestDeletionFromAdmin = (courseId, courseTitle) => {
    const confirmRequest = window.confirm(
      lang === 'ar' ? `هل تريد إرسال طلب للمسؤول لحذف دورة "${courseTitle}"؟` : `Submit deletion request for "${courseTitle}"?`
    );
    if (confirmRequest) {
      setCoursesList(prev => prev.map(c => c.id === courseId ? { ...c, status: 'pending_deletion' } : c));
      setMessage(lang === 'ar' ? '🚀 تم إرسال طلب الحذف للمسؤول بنجاح.' : '🚀 Deletion request submitted successfully.');
    }
  };

  const toggleVisibility = (courseId) => {
    setCoursesList(prev => prev.map(c => c.id === courseId ? { ...c, isVisible: !c.isVisible } : c));
    setMessage(lang === 'ar' ? '👁️ تم تحديث حالة ظهور الدورة في المتجر.' : '👁️ Course store visibility updated.');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.requirementsNotes.length < 20) {
      setError(l.messages.valErrorLength);
      return;
    }

    submitB2BRequest({ requirementsNotes: formData.requirementsNotes, ...formData }).then(result => {
      if (result.success) {
        setMessage(`${lang === 'ar' ? '✅ تم رفع الدورة المفصلة بنجاح وهي قيد المراجعة: ' : '✅ Course submitted under review with ID: '}${result.data.ticketId}`);
        
        const newCourseDraft = {
          id: result.data.ticketId,
          title: formData.title,
          price: parseInt(formData.price) || 0,
          duration: `${formData.durationWeeks} Weeks`,
          status: "coming_soon", 
          students: 0,
          isVisible: true,
          category: formData.category,
          level: formData.level
        };
        
        setCoursesList(prev => [newCourseDraft, ...prev]);
        setFormData({ title: '', price: '', durationWeeks: '', maxStudents: '', videoDurationMinutes: '', level: 'beginner', category: 'Cybersecurity', description: '', requirementsNotes: '' });
      } else {
        setError(l.messages.genericError);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  const borderSide = t.dir === 'rtl' ? 'border-r-4' : 'border-l-4';

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased flex flex-col" dir={t.dir}>
      <TrainerNavbar activePage="dashboard" />
      
      {/* تقسيم الشاشة كلوحة تحكم كاملة ومتوازنة */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1️⃣ العمود الأول والثاني (يسار ووسط الشاشة): الإحصائيات، الـ Graph، وجدول خط المتابعة الرئيسي */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* كروت المؤشرات الحية */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <p className="text-xs font-bold text-gray-400 mb-1">{lang === 'ar' ? 'صافي الأرباح المحققة الحالي' : 'Total Dynamic Net Payout'}</p>
              <h3 className="text-2xl font-black text-capsule-teal font-mono">{totalPayoutCollected} SAR</h3>
            </div>
            <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${borderSide} border-capsule-gold hover:shadow-md transition`}>
              <p className="text-xs font-bold text-capsule-dark-gold mb-1 nudge-ar">{lang === 'ar' ? 'الطلاب بالدورات النشطة' : 'Active Course Students'}</p>
              <h3 className="text-2xl font-black text-capsule-navy font-mono">{totalStudentsEnrolled}</h3>
            </div>
            <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${borderSide} border-capsule-navy hover:shadow-md transition`}>
              <p className="text-xs font-bold text-capsule-navy mb-1">{l.stats.accountStatus}</p>
              <h3 className="text-md font-bold text-emerald-600 mt-1">{l.stats.verified}</h3>
            </div>
          </div>

          {/* 📊 الـ Graph ذو المغزى المقارن */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-capsule-navy mb-4">
              {lang === 'ar' ? '📊 مؤشرات الكثافة الاستيعابية وصافي الربح لكل دورة' : '📊 Course Density & Net Revenue Breakdown'}
            </h3>
            <div className="space-y-4 pt-1">
              {coursesList.map((course) => {
                const maxCapacity = 1300; 
                const ratio = Math.min((course.students / maxCapacity) * 100, 100);
                const netEarnings = calculateCourseEarnings(course.students, course.price);
                return (
                  <div key={course.id} className="bg-gray-50/60 p-3 rounded-xl border border-gray-100/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs font-bold">
                      <span className="text-capsule-navy font-semibold max-w-[45%] truncate">{course.title}</span>
                      <div className="flex items-center gap-3 text-gray-400">
                        <span className="text-gray-500 font-mono text-[11px]">{course.students} طالب</span>
                        <span className="text-capsule-teal font-extrabold font-mono text-[11px]">💰 {netEarnings} SAR</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${!course.isVisible ? 'bg-gray-400' : 'bg-gradient-to-l from-capsule-teal to-capsule-navy'}`} style={{ width: `${ratio || 4}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ⚙️ جدول خط التحكم والمتابعة الشامل للدورات */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-capsule-navy mb-4">
              {lang === 'ar' ? '⚙️ خط التحكم الشامل بالدورات التدريبية' : '⚙️ Interactive Course Pipeline Controls'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-gray-600 text-center border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-capsule-navy font-bold border-b border-gray-100">
                    <th className="py-2.5 px-2 text-start">{lang === 'ar' ? 'اسم الدورة' : 'Course Name'}</th>
                    <th className="py-2.5 px-2">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                    <th className="py-2.5 px-2">{lang === 'ar' ? 'الطلاب' : 'Students'}</th>
                    <th className="py-2.5 px-2 text-emerald-700 bg-emerald-50/30">{lang === 'ar' ? 'صافي ربحك (80%)' : 'Net Earnings'}</th>
                    <th className="py-2.5 px-2">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="py-2.5 px-2">{lang === 'ar' ? 'العمليات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {coursesList.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-2 text-start font-bold text-capsule-navy truncate max-w-[140px]">{course.title}</td>
                      <td className="py-3 px-2 font-mono">{course.price} SAR</td>
                      <td className="py-3 px-2 font-mono text-gray-500">{course.students}</td>
                      <td className="py-3 px-2 font-extrabold text-emerald-600 bg-emerald-50/20 font-mono">{calculateCourseEarnings(course.students, course.price)} SAR</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${course.status === 'available' ? 'bg-emerald-50 text-emerald-700' : course.status === 'coming_soon' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                          {course.status === 'available' && (lang === 'ar' ? 'نشطة' : 'Active')}
                          {course.status === 'coming_soon' && (lang === 'ar' ? 'قيد المراجعة' : 'Pending')}
                          {course.status === 'pending_deletion' && (lang === 'ar' ? 'انتظار الحذف' : 'Pending Delete')}
                        </span>
                      </td>
                      <td className="py-3 px-2 flex justify-center gap-1.5">
                        <button onClick={() => toggleVisibility(course.id)} className="px-2 py-1 rounded-md text-[10px] font-bold text-white bg-slate-600 hover:bg-slate-700 transition">
                          {course.isVisible ? (lang === 'ar' ? 'إخفاء' : 'Hide') : (lang === 'ar' ? 'عرض' : 'Show')}
                        </button>
                        <button onClick={() => requestDeletionFromAdmin(course.id, course.title)} disabled={course.status === 'pending_deletion'} className={`px-2 py-1 rounded-md text-[10px] font-bold text-white transition ${course.status === 'pending_deletion' ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}>
                          {course.status === 'pending_deletion' ? (lang === 'ar' ? 'مرفوع' : 'Sent') : (lang === 'ar' ? 'طلب حذف' : 'Delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 2️⃣ العمود الثالث (يمين الشاشة): نموذج إضافة كورس مفصل + ويدجتس المراجعات والطلاب الحية */}
        <div className="space-y-6">
          
          {/* نموذج رفع كورس تفصيلي */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit">
            <h2 className="text-md font-bold text-capsule-navy border-b border-gray-100 pb-3 mb-4">{lang === 'ar' ? '➕ إنشاء وتفصيل دورة جديدة' : '➕ Create Detailed Course'}</h2>
            {message && <div className={`mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold ${borderSide} border-emerald-500`}>{message}</div>}
            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.title} *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="معسكر هندسة برمجيات متقدم" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{lang === 'ar' ? 'التصنيف *' : 'Category *'}</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-capsule-teal">
                    <option value="Cybersecurity">{lang === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity'}</option>
                    <option value="Software Engineering">{lang === 'ar' ? 'هندسة البرمجيات' : 'Software Engineering'}</option>
                    <option value="Artificial Intelligence">{lang === 'ar' ? 'الذكاء الاصطناعي' : 'Artificial Intelligence'}</option>
                    <option value="Cloud Computing">{lang === 'ar' ? 'الحوسبة السحابية' : 'Cloud Computing'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{lang === 'ar' ? 'المستوى *' : 'Level *'}</label>
                  <select name="level" value={formData.level} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-capsule-teal">
                    <option value="beginner">{lang === 'ar' ? 'مبتدئ' : 'Beginner'}</option>
                    <option value="intermediate">{lang === 'ar' ? 'متوسط' : 'Intermediate'}</option>
                    <option value="advanced">{lang === 'ar' ? 'متقدم' : 'Advanced'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.price} (SAR) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="350" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.duration} *</label>
                  <input type="number" name="durationWeeks" value={formData.durationWeeks} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.maxStudents} *</label>
                  <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.videoDuration} *</label>
                  <input type="number" name="videoDurationMinutes" value={formData.videoDurationMinutes} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="120" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{lang === 'ar' ? 'نبذة ووصف مختصر للدورة *' : 'Short Description *'}</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="نبذة توضح محتوى الدورة للطلاب..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.requirements} *</label>
                <textarea name="requirementsNotes" value={formData.requirementsNotes} onChange={handleInputChange} required rows="2" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs resize-none" placeholder={l.form.placeholders.requirements}></textarea>
              </div>

              <Button type="submit" variant="primary">{l.form.submitBtn}</Button>
            </form>
          </div>

          {/* ويدجت: تقييمات الطلاب الحية المستدعاة من الموك */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">{lang === 'ar' ? '⭐ تقييمات الطلاب الحية' : '⭐ Live Student Reviews'}</h4>
            <div className="space-y-2 max-h-[160px] overflow-y-auto divide-y divide-gray-50">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="pt-2 text-[11px] font-medium">
                  <div className="flex justify-between items-center font-bold mb-0.5 text-capsule-navy">
                    <span>{rev.name}</span>
                    <span className="text-capsule-gold font-mono">{"★".repeat(rev.rating)}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ويدجت: سجل تقدم ومتابعة الطلاب */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">{lang === 'ar' ? '👥 سجل تقدم الطلاب المشتركين' : '👥 Students Progress Log'}</h4>
            <div className="space-y-2 text-[11px] font-medium text-gray-600">
              <div className="flex justify-between items-center bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                <div>
                  <p className="font-bold text-capsule-navy">سلمان العتيبي (#984)</p>
                  <p className="text-[10px] text-gray-400 truncate max-w-[150px]">React Bootcamp Deep Dive</p>
                </div>
                <span className="font-mono bg-capsule-teal/10 text-capsule-teal px-1.5 py-0.5 rounded font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                <div>
                  <p className="font-bold text-capsule-navy">نورة العلي (#221)</p>
                  <p className="text-[10px] text-gray-400 truncate max-w-[150px]">AI & ML Fundamentals</p>
                </div>
                <span className="font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">100%</span>
              </div>
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}

export default TrainerDashboard;