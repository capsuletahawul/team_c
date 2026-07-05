import React, { useState, useEffect } from 'react';
// Feature 6 (Academic Tracking & Dashboard Profile) + Feature 17 (System Notifications)
import { getStudentProfile, getPurchasedCourses, getNotifications } from './mocks/mockApi';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Button from './components/Button.jsx';

function StudentDashboard({ onNavigateToProfile }) {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    Promise.all([getStudentProfile(), getPurchasedCourses(), getNotifications()])
      .then(([profileRes, coursesRes, notificationsRes]) => {
        if (!isMounted) return;

        if (!profileRes.success) {
          setError('تعذر تحميل بيانات ملفك الشخصي حالياً.');
        } else {
          setProfile(profileRes.data);
        }

        if (coursesRes.success) setCourses(coursesRes.data);
        if (notificationsRes.success) setNotifications(notificationsRes.data);

        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('حدث خطأ غير متوقع أثناء الاتصال بالخادم.');
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message="جاري تجهيز لوحة التحكم الخاصة بك..." />
      </div>
    );
  }

  const activeCourses = courses.filter(c => c.status !== 'Completed');
  const completedCourses = courses.filter(c => c.status === 'Completed');
  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
      <Navbar activePage="dashboard" />

      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* الهيدر الترحيبي */}
      <div className="relative bg-capsule-gradient text-white py-10 px-8 overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-capsule-gold text-xs font-bold uppercase tracking-wider mb-1">لوحة تحكم الطالب</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              أهلاً بعودتك، {profile?.fullName?.split(' ')[0] || 'يا بطل'} 👋
            </h1>
            <p className="text-gray-200 text-sm mt-2 max-w-lg">
              استمر من حيث توقفت، وتابع تقدمك عبر جميع دوراتك المسجلة.
            </p>
          </div>

          {/* صورة البروفايل القابلة للنقر -> تنتقل للملف الشخصي (Feature 6) */}
          <button
            onClick={onNavigateToProfile}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-3 pl-5 transition cursor-pointer"
          >
            <img
              src={profile?.avatar}
              alt="صورة الملف الشخصي"
              className="w-12 h-12 rounded-full border-2 border-capsule-gold object-cover"
            />
            <div className="text-right">
              <p className="text-sm font-bold text-white">{profile?.fullName}</p>
              <p className="text-xs text-gray-300">عرض الملف الشخصي ←</p>
            </div>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* بطاقات الإحصائيات السريعة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">الدورات الجارية</p>
            <p className="text-2xl font-black text-capsule-teal">{activeCourses.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">الدورات المكتملة</p>
            <p className="text-2xl font-black text-emerald-600">{completedCourses.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">إشعارات غير مقروءة</p>
            <p className="text-2xl font-black text-capsule-dark-gold">{unreadNotifications.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">جهة الانتساب</p>
            <p className="text-base font-black text-capsule-navy mt-1 truncate">
              {profile?.companyAffiliation || 'مستقل'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* قسم "أكمل التعلم" (Feature 6, 7) */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h2 className="text-base font-bold text-capsule-navy">أكمل من حيث توقفت</h2>
            </div>

            {courses.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-bold text-gray-400">لم تسجل في أي دورة بعد.</p>
                <div className="mt-4 inline-block">
                  <Button variant="primary">تصفح الدورات المتاحة</Button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <div key={course.courseId || course.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-capsule-navy text-sm">{course.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{course.category} · {course.duration}</p>

                      <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
                        <div
                          className="bg-capsule-teal h-2 rounded-full transition-all"
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-bold text-gray-400 mt-1">{course.progress || 0}% مكتمل</p>
                    </div>

                    <Button variant={course.status === 'Completed' ? 'secondary' : 'primary'}>
                      {course.status === 'Completed' ? 'عرض الشهادة' : 'متابعة الدورة'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* قسم الإشعارات (Feature 17) */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden h-fit">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-base font-bold text-capsule-navy">آخر الإشعارات</h2>
            </div>

            {notifications.length === 0 ? (
              <p className="p-6 text-xs font-bold text-gray-400 text-center">لا توجد إشعارات جديدة حالياً.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((note) => (
                  <div key={note.notificationId} className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-capsule-navy">{note.title}</p>
                      {!note.isRead && <span className="w-2 h-2 rounded-full bg-capsule-dark-gold mt-1 flex-shrink-0"></span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{note.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudentDashboard;
