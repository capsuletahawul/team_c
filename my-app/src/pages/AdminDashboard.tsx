import React, { useState, useEffect } from 'react';
import { 
  getAdminDashboardMetrics, 
  getAllUsersForAdmin, 
  updateUserRoleInMock, 
  toggleUserStatusInMock,
  getCourses
} from '../mocks/mockApi';

// Reusable Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingIndicator from '../components/LoadingIndicator';

import { useLanguage } from '../context/LanguageContext';

type ActiveTabType = 'overview' | 'users' | 'courses' | 'complaints';

// 1️⃣ استخدام نفس الـ interfaces والأسماء اللي يتوقعها كود الموك الحالي لإنهاء خطأ التصدير والـ Types
export interface UserPermission {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Trainer' | 'Company' | 'Admin' | string;
  status: 'active' | 'suspended' | string;
  joinedAt?: string;
}

export interface CourseItem {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  status: 'available' | 'coming_soon' | 'pending_deletion' | 'completed' | string;
}

export interface AdminDashboardMetrics {
  activeUserLoginsToday: number;
  publishedCoursesCount: number;
  pendingReportFlagsCount: number;
  serverResourceDistribution: string;
}

interface ComplaintItem {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface GrowthItem {
  month: string;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const { t, lang } = useLanguage();
  const l = t.admin;

  const [adminStats, setAdminStats] = useState<AdminDashboardMetrics | null>(null);
  const [usersList, setUsersList] = useState<UserPermission[]>([]);
  const [coursesList, setCoursesList] = useState<CourseItem[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTabType>('overview');
  const [message, setMessage] = useState<string>('');

  const [complaintsList] = useState<ComplaintItem[]>(() => [
    { id: 'TKT-991', name: lang === 'ar' ? 'خالد عبدالله' : 'Khaled Abdullah', email: 'khaled@mail.com', message: lang === 'ar' ? 'تواجهني مشكلة أثناء تحميل ملفات موديول خطافات ريأكت المتقدمة.' : 'I face an issue downloading advanced React hooks modules.', date: '2026-07-10' },
    { id: 'TKT-302', name: lang === 'ar' ? 'سارة الأحمد' : 'Sara Al-Ahmad', email: 'sara.a@corporate.com', message: lang === 'ar' ? 'طلب تفعيل واجهة الشركة B2B لم يتم الرد عليه بعرض السعر حتى الآن.' : 'B2B corporate onboarding request has not been answered yet.', date: '2026-07-12' }
  ]);

  const userGrowthTrajectory: GrowthItem[] = [
    { month: lang === 'ar' ? 'مايو' : 'May', count: 420 },
    { month: lang === 'ar' ? 'يونيو' : 'June', count: 890 },
    { month: lang === 'ar' ? 'يوليو (الحالي)' : 'July (Current)', count: 1420 }
  ];

  useEffect(() => {
    let isMounted = true;
    Promise.all([getAdminDashboardMetrics(), getAllUsersForAdmin(), getCourses()]).then(([statsRes, usersRes, coursesRes]) => {
      if (!isMounted) return;
      
      // 2️⃣ تأمين البيانات عبر الـ Optional Chaining وفحص الحماية لمنع خطأ 'possibly undefined'
      if (statsRes && statsRes.success && statsRes.data) {
        setAdminStats(statsRes.data);
      }
      if (usersRes && usersRes.success && usersRes.data) {
        setUsersList(usersRes.data as UserPermission[]);
      }
      if (coursesRes && coursesRes.success && coursesRes.data && coursesRes.data.courses) {
        setCoursesList(coursesRes.data.courses as CourseItem[]);
      }
      setLoading(false);
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [lang]);

  const getTranslatedContent = (course: CourseItem, field: 'title' | 'instructor'): string => {
    if (lang === 'ar') {
      if (course.id === 15) return field === 'title' ? 'معسكر مطور ريأكت المتكامل العميق' : 'أحمد محمد';
      if (course.id === 16) return field === 'title' ? 'أساسيات الذكاء الاصطناعي وتعلم الآلة' : 'سارة علي';
      if (course.id === 17) return field === 'title' ? 'الدفاع السيبراني من الجيل القادم' : 'عبدالله ناصر';
    }
    return field === 'title' ? course.title : course.instructor;
  };

  const handleUpdateCourseStatus = (courseId: number, newStatus: CourseItem['status']) => {
    setCoursesList(prev => prev.map(c => c.id === courseId ? { ...c, status: newStatus } : c));
    setMessage(lang === 'ar' ? '📝 تم تحديث حالة الدورة بنجاح في النظام.' : '📝 Course operational status updated.');
  };

  const handleRoleChange = (userId: string, newRole: UserPermission['role']) => {
    updateUserRoleInMock(userId, newRole).then(() => {
      setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setMessage(lang === 'ar' ? '⚙️ تم تعديل رتبة وصلاحية حساب المستخدم.' : '⚙️ User system permissions updated.');
    });
  };

  const toggleUserStatus = (userId: string) => {
    toggleUserStatusInMock(userId).then(() => {
      setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
      setMessage(lang === 'ar' ? '🔒 تم تحديث وضع قفل الحساب الأمني بنجاح.' : '🔒 Security account state toggled.');
    });
  };

  if (loading) return <div className="min-h-screen bg-capsule-bg flex items-center justify-center"><LoadingIndicator message={l.loading} /></div>;

  const borderSide = t.dir === 'rtl' ? 'border-r-4' : 'border-l-4';

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased flex flex-col relative overflow-hidden" dir={t.dir}>
      
      <div className={`absolute top-24 ${t.dir === 'rtl' ? 'right-12' : 'left-12'} w-80 h-80 bg-capsule-gold/20 rounded-full blur-3xl pointer-events-none z-0 animate-pulse`}></div>
      <div className={`absolute top-60 ${t.dir === 'rtl' ? 'right-20' : 'left-20'} w-64 h-64 bg-capsule-teal/15 rounded-full blur-3xl pointer-events-none z-0`}></div>

      <Navbar activePage="home" />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        
        <div className="lg:col-span-1 bg-white/30 backdrop-blur-xl border border-white/50 p-4 rounded-3xl shadow-xs space-y-1.5 h-fit sticky top-6">
          <div className="p-3 border-b border-gray-200/40 mb-2">
            <p className="text-[10px] font-black tracking-widest text-capsule-teal uppercase">{lang === 'ar' ? 'لوحة تحكم المشرف' : 'SUPER ADMIN TERMINAL'}</p>
            <h4 className="text-xs font-bold text-capsule-navy mt-0.5">{lang === 'ar' ? 'إدارة الكورسات والمستخدمين' : 'Core Command Board'}</h4>
          </div>
          
          <button onClick={() => setActiveTab('overview')} className={`w-full text-start p-2.5 rounded-xl text-xs font-bold transition ${activeTab === 'overview' ? 'bg-capsule-navy text-white shadow-xs' : 'text-gray-500 hover:bg-white/60'}`}>
            📊 {lang === 'ar' ? 'نظرة عامة ومؤشرات النظام' : 'System Overview'}
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full text-start p-2.5 rounded-xl text-xs font-bold transition ${activeTab === 'users' ? 'bg-capsule-navy text-white shadow-xs' : 'text-gray-500 hover:bg-white/60'}`}>
            👥 {lang === 'ar' ? 'إدارة الهويات والصلاحيات' : 'Identity & IAM Control'}
          </button>
          <button onClick={() => setActiveTab('courses')} className={`w-full text-start p-2.5 rounded-xl text-xs font-bold transition ${activeTab === 'courses' ? 'bg-capsule-navy text-white shadow-xs' : 'text-gray-500 hover:bg-white/60'}`}>
            ⚙️ {lang === 'ar' ? 'إدارة واعتماد الكورسات' : 'Course Pipeline Control'}
          </button>
          <button onClick={() => setActiveTab('complaints')} className={`w-full text-start p-2.5 rounded-xl text-xs font-bold transition ${activeTab === 'complaints' ? 'bg-capsule-navy text-white shadow-xs' : 'text-gray-500 hover:bg-white/60'}`}>
            📥 {lang === 'ar' ? 'صندوق الشكاوى والتواصل' : 'Complaints Box'}
          </button>
        </div>

        <div className="lg:col-span-3 space-y-6">
          
          {message && <div className={`p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold ${borderSide} border-emerald-500 shadow-2xs`}>{message}</div>}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                  <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.activeUsers}</p>
                  <p className="text-xl font-black text-capsule-navy font-mono">{adminStats?.activeUserLoginsToday || 0}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                  <p className="text-xs font-bold text-gray-400 mb-1">{lang === 'ar' ? 'الكورسات الحالية' : 'Total Platform Courses'}</p>
                  <p className="text-xl font-black text-capsule-teal font-mono">{coursesList.length}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                  <p className="text-xs font-bold text-gray-400 mb-1">{lang === 'ar' ? 'المستخدمين النشطين' : 'Total Registered Users'}</p>
                  <p className="text-xl font-black text-capsule-navy font-mono">{usersList.length + 42} {lang === 'ar' ? 'حساب' : 'Users'}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                  <p className="text-xs font-bold text-gray-400 mb-1">{lang === 'ar' ? 'تذاكر شكاوى معلقة' : 'Open Complaints'}</p>
                  <p className="text-xl font-black text-rose-600 font-mono">{complaintsList.length}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
                <h3 className="text-xs font-bold text-capsule-navy mb-4 uppercase tracking-wider">
                  {lang === 'ar' ? '📈 المؤشر التزايدي الإجمالي لتفاعل ونمو مستخدمي المنصة' : '📈 Incremental Monthly User Registration Trajectory'}
                </h3>
                <div className="space-y-3.5">
                  {userGrowthTrajectory.map((tItem, idx) => {
                    const maxScale = 1600;
                    const growthRatio = Math.min((tItem.count / maxScale) * 100, 100);
                    return (
                      <div key={idx} className="bg-gray-50/70 p-3 rounded-xl border border-gray-100/50 flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-capsule-navy w-24">{tItem.month}</span>
                        <div className="flex-grow bg-gray-200 h-3 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-capsule-teal to-capsule-navy h-full rounded-full transition-all duration-1000" style={{ width: `${growthRatio}%` }}></div>
                        </div>
                        <span className="text-xs font-black font-mono text-capsule-teal w-24 text-end">{tItem.count} {lang === 'ar' ? 'حساب' : 'Accounts'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">{lang === 'ar' ? '👥 التحكم بالهويات والصلاحيات (IAM)' : '👥 Identity & Access Management'}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs text-center">
                  <thead>
                    <tr className="bg-gray-100/40 text-gray-500 font-bold border-b border-gray-100">
                      <th className="p-3 text-start">ID</th>
                      <th className="p-3">{lang === 'ar' ? 'الاسم الكامل' : 'Name'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الصلاحية (Permission Role)' : 'Role'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                      <th className="p-3">{lang === 'ar' ? 'إجراء الإدارة' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium text-gray-600">
                    {usersList.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/40 transition">
                        <td className="p-3 font-mono font-bold text-blue-600 text-start">{user.id}</td>
                        <td className="p-3 text-capsule-navy font-bold">{user.name}</td>
                        <td className="p-3">
                          <select 
                            value={user.role} 
                            onChange={(e) => handleRoleChange(user.id, e.target.value)} 
                            className="p-1.5 bg-gray-50 border rounded-lg text-[11px] font-bold text-capsule-navy"
                          >
                            <option value="Student">Student</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Company">Company</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                            {user.status === 'active' ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button onClick={() => toggleUserStatus(user.id)} className={`px-2.5 py-1 rounded-md text-[10px] font-black text-white transition ${user.status === 'active' ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                            {user.status === 'active' ? (lang === 'ar' ? 'حظر الحساب' : 'Block') : (lang === 'ar' ? 'تنشيط الحساب' : 'Activate')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">{lang === 'ar' ? '⚙️ التحكم ومتابعة خط إنتاج وحالة الكورسات التدريبية بالمنصة' : '⚙️ Core Course Management & Review Pipeline'}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs text-center">
                  <thead>
                    <tr className="bg-gray-100/40 text-gray-500 font-bold border-b border-gray-100">
                      <th className="p-3 text-start">{lang === 'ar' ? 'عنوان الدورة' : 'Course Title'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الموجّه / المدرب' : 'Instructor'}</th>
                      <th className="p-3">{lang === 'ar' ? 'المدة الزمنية' : 'Duration'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الطلاب المسجلين' : 'Students Enrolled'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الحالة الحالية' : 'Current Status'}</th>
                      <th className="p-3">{lang === 'ar' ? 'العمليات الفيدرالية' : 'Operational Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium text-gray-600">
                    {coursesList.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/40 transition">
                        <td className="p-3 text-start font-bold text-capsule-navy max-w-[160px] truncate">{getTranslatedContent(course, 'title')}</td>
                        <td className="p-3 text-gray-500 font-semibold">{getTranslatedContent(course, 'instructor')}</td>
                        <td className="p-3 font-mono text-gray-400">{course.duration || '24 Hours'}</td>
                        <td className="p-3 font-black text-capsule-navy font-mono">{course.students || 0}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            course.status === 'available' || course.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {course.status === 'available' ? (lang === 'ar' ? 'نشط ومتاح' : 'Active') : (lang === 'ar' ? 'قيد المراجعة' : 'Pending')}
                          </span>
                        </td>
                        <td className="p-3 flex justify-center gap-1.5">
                          {course.status !== 'available' ? (
                            <button 
                              onClick={() => handleUpdateCourseStatus(course.id, 'available')} 
                              className="px-2.5 py-1 text-[10px] font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
                            >
                              {lang === 'ar' ? 'اعتماد ونشر' : 'Approve & Publish'}
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleUpdateCourseStatus(course.id, 'coming_soon')} 
                              className="px-2.5 py-1 text-[10px] font-black text-white bg-amber-600 hover:bg-amber-700 rounded-md transition"
                            >
                              {lang === 'ar' ? 'إيقاف مؤقت' : 'Suspend'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">
                  {lang === 'ar' ? '📥 الشكاوى والاستفسارات المرفوعة من صفحة التواصل' : '📥 Direct User Support Tickets & Inquiries'}
                </h2>
              </div>
              <div className="p-4 space-y-4 max-h-[450px] overflow-y-auto">
                {complaintsList.map((complaint) => (
                  <div key={complaint.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs relative">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center font-bold text-capsule-navy mb-2 gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded text-[10px]">{complaint.id}</span>
                        <span>{complaint.name}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-[10px]">{complaint.email}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium bg-white p-3 rounded-xl border border-gray-100 shadow-3xs">{complaint.message}</p>
                    <span className="text-[10px] text-gray-400 font-mono block text-end mt-1.5">{complaint.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;