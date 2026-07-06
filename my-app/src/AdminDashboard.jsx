import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// استدعاء الدالة الصحيحة المتوفرة بموك النظامgetAdminDashboardMetrics
import { getAdminDashboardMetrics } from './mocks/mockApi';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([
    { id: 1, title: 'معسكر الهندسة السيبرانية المتقدم', trainer: 'أ. خالد', duration: '22 دقيقة', status: 'بانتظار المراجعة' },
    { id: 2, title: 'تطوير تطبيقات الويب بـ React', trainer: 'أ. هند', duration: '15 دقيقة', status: 'بانتظار المراجعة' }
  ]);

useEffect(() => {
    // استدعاء الموك الفعلي حقتك
    getAdminDashboardMetrics().then(result => {
      if (result.success) {
        setAdminStats(result.data); 
      }
      setLoading(false);
    });
  }, []);

  const handleApprove = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: 'تمت الموافقة' } : course
    ));
    if (adminStats) {
      setAdminStats({
        ...adminStats,
        pendingReportFlagsCount: Math.max(0, adminStats.pendingReportFlagsCount - 1),
        publishedCoursesCount: adminStats.publishedCoursesCount + 1
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message="جاري جلب إحصائيات الإدارة العامة للنظام..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
      <Navbar activePage="home" />

      {/* الهيرو سكشن الفخم للأدمن */}
      <div className="relative bg-capsule-gradient text-white py-14 px-8 overflow-hidden shadow-inner">
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
          <div className="relative w-80 h-40">
            <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full rotate-[-25deg]"></div>
            <div className="absolute w-64 h-20 bg-capsule-gold rounded-full rotate-[-25deg] top-12 left-10 shadow-lg"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl font-extrabold text-white">إدارة مبادرة كبسولة تحول الشاملة</h1>
          <p className="text-gray-200 text-sm max-w-xl mt-2">مراجعة طلبات المعسكرات المرفوعة من المدربين، ومتابعة الأرباح الإجمالية للمنصة بنسبة الـ 20%.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* ربط مع مفاتيح الموك الحقيقية المرجوعة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">المستخدمين النشطين اليوم</p>
            <p className="text-2xl font-black text-capsule-navy">{adminStats?.activeUserLoginsToday}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">إجمالي الكورسات بالمنصة</p>
            <p className="text-2xl font-black text-capsule-teal">{adminStats?.publishedCoursesCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">بلاغات التقارير المعلقة</p>
            <p className="text-2xl font-black text-capsule-dark-gold">{adminStats?.pendingReportFlagsCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">حالة خوادم النظام</p>
            <p className="text-base font-black text-emerald-600 uppercase mt-1">{adminStats?.serverResourceDistribution}</p>
          </div>
        </div>

        {/* الجدول */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="text-base font-bold text-capsule-navy">مراجعة طلبات المعسكرات والدورات التدريبية</h2>
            <button 
              onClick={() => navigate('/courses-approval')}
              className="text-xs font-bold text-capsule-teal hover:text-capsule-navy transition cursor-pointer"
            >
              انتقل لصفحة اعتماد الكورسات (Courses Approval) ←
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                  <th className="p-4">اسم المعسكر</th>
                  <th className="p-4">المدرب</th>
                  <th className="p-4">مدة المقطع</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 text-capsule-navy font-bold">{course.title}</td>
                    <td className="p-4 text-gray-500">{course.trainer}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${parseInt(course.duration) > 20 ? 'bg-amber-50 text-capsule-dark-gold' : 'bg-teal-50 text-capsule-teal'}`}>
                        {course.duration}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${course.status === 'تمت الموافقة' ? 'text-emerald-600' : 'text-capsule-dark-gold'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {course.status === 'بانتظار المراجعة' ? (
                        <button onClick={() => handleApprove(course.id)} className="bg-capsule-teal hover:bg-capsule-navy text-white text-xs px-4 py-2 rounded-xl font-bold shadow-xs transition duration-150 cursor-pointer">
                          اعتماد ونشر المعسكر
                        </button>
                      ) : (
                        <span className="text-emerald-600 text-xs font-bold">تم الاعتماد حيّاً ✅</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;