// src/pages/TrainerDashboard.tsx
import React, { useState, useEffect } from 'react';
import { getTrainerAnalytics, submitB2BRequest, getCourses, getTrainerProfile, getTrainerStudentProgressMock } from '../mocks/mockApi';
import { useApi } from '../hooks/useApi';

// Reusable Components
import TrainerNavbar from "../components/TrainerNavbar";
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
// Global Context
import { useLanguage } from '../context/LanguageContext';

export interface CourseItem {
  id: number; title: string; category: string; description: string; subtitle: string; instructor: string; trainerId: string;
  price: number; originalPrice: number; discount: string | null; duration: string; level: string; language: string;
  updated: string; rating: number; status: string; students: number; thumbnail: string; isVisible?: boolean;
}
export interface ReviewItem { id: number; name: string; rating: number; date: string; commentAr: string; commentEn: string; comment?: string; }
export interface StudentProgressItem { id: number; name: string; courseAr: string; courseEn: string; progress: number; }

interface FormDataState {
  title: string; price: string; durationWeeks: string; maxStudents: string; videoDurationMinutes: string;
  level: 'beginner' | 'intermediate' | 'advanced' | string;
  category: 'Cybersecurity' | 'Software Engineering' | 'Artificial Intelligence' | 'Cloud Computing' | string;
  description: string; requirementsNotes: string;
}

function TrainerDashboard() {
  const { t, lang } = useLanguage();
  const l = t.trainerDashboard;

  const [coursesList, setCoursesList] = useState<CourseItem[]>([]); 
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([]); 
  const [progressList, setProgressList] = useState<StudentProgressItem[]>([]);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [formData, setFormData] = useState<FormDataState>({
    title: '', price: '', durationWeeks: '', maxStudents: '', videoDurationMinutes: '', level: 'beginner', category: 'Cybersecurity', description: '', requirementsNotes: ''
  });

  // 🌟 استدعاء نظيف ومختصر بدون تكرار أسطر متوافق مع ويك 2
  const { data: coursesData, loading: cLoad } = useApi(getCourses);
  const { data: profileData, loading: pLoad } = useApi(getTrainerProfile);
  const { data: progressData, loading: prLoad } = useApi(getTrainerStudentProgressMock);

  useEffect(() => {
    if (coursesData?.courses) {
      setCoursesList((coursesData.courses as CourseItem[]).map(c => ({ ...c, price: c.price > 1000 ? 350 : c.price, isVisible: true })));
    }
  }, [coursesData]);

  useEffect(() => {
    if (profileData?.reviews) {
      setReviewsList((profileData.reviews as any[]).map(r => ({ ...r, comment: lang === 'ar' ? (r.commentAr || r.comment) : (r.commentEn || r.comment) })));
    }
  }, [profileData, lang]);

  useEffect(() => { if (progressData) setProgressList(progressData as StudentProgressItem[]); }, [progressData]);

  const calculateCourseEarnings = (students: number, price: number): number => {
    return Math.round((students || 0) * (price || 0) * 0.8);
  };

  const totalPayoutCollected = coursesList
    .filter((c: CourseItem) => c.status === 'available')
    .reduce((acc: number, course: CourseItem) => acc + calculateCourseEarnings(course.students, course.price), 0);

  const totalStudentsEnrolled = coursesList
    .filter((c: CourseItem) => c.status === 'available')
    .reduce((acc: number, course: CourseItem) => acc + (course.students || 0), 0);

  const requestDeletionFromAdmin = (courseId: number, courseTitle: string) => {
    const confirmRequest = window.confirm(lang === 'ar' ? `هل تريد إرسال طلب للمسؤول لحذف دورة "${courseTitle}"؟` : `Submit deletion request for "${courseTitle}"?`);
    if (confirmRequest) {
      setCoursesList((prev: CourseItem[]) => prev.map((c: CourseItem) => c.id === courseId ? { ...c, status: 'pending_deletion' } : c));
      setMessage(lang === 'ar' ? '🚀 تم إرسال طلب الحذف للمسؤول بنجاح.' : '🚀 Deletion request submitted successfully.');
    }
  };

  const toggleVisibility = (courseId: number) => {
    setCoursesList((prev: CourseItem[]) => prev.map((c: CourseItem) => c.id === courseId ? { ...c, isVisible: !c.isVisible } : c));
    setMessage(lang === 'ar' ? '👁️ تم تحديث حالة ظهور الدورة في المتجر.' : '👁️ Course store visibility updated.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.requirementsNotes.length < 20) {
      setError(l.messages.valErrorLength);
      return;
    }

    submitB2BRequest(formData).then(result => {
      if (result.success && result.data) {
        setMessage(`${lang === 'ar' ? '✅ تم رفع الدورة المفصلة بنجاح وهي قيد المراجعة: ' : '✅ Course submitted under review with ID: '}${result.data.ticketId}`);
        
        const newCourseDraft: CourseItem = {
          id: result.data.ticketId, title: formData.title, category: formData.category, description: formData.description, subtitle: formData.description,
          instructor: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed', trainerId: 'ahmed-mohammed', price: parseInt(formData.price) || 0,
          originalPrice: (parseInt(formData.price) || 0) * 1.5, discount: '30% OFF', duration: `${formData.durationWeeks} Weeks`, level: formData.level,
          language: 'Arabic / English', updated: '07/2026', rating: 0, status: "coming_soon", students: 0, thumbnail: 'default.jpg', isVisible: true
        };
        
        setCoursesList((prev: CourseItem[]) => [newCourseDraft, ...prev]);
        setFormData({ title: '', price: '', durationWeeks: '', maxStudents: '', videoDurationMinutes: '', level: 'beginner', category: 'Cybersecurity', description: '', requirementsNotes: '' });
      } else {
        setError(l.messages.genericError);
      }
    });
  };

  if (cLoad || pLoad || prLoad) {
    return <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center"><LoadingIndicator message={l.loading} /></div>;
  }

  const borderSide = t.dir === 'rtl' ? 'border-r-4' : 'border-l-4';

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased flex flex-col" dir={t.dir}>
      <TrainerNavbar activePage="dashboard" />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <p className="text-xs font-bold text-gray-400 mb-1">{lang === 'ar' ? 'صافي الأرباح المحققة الحالي' : 'Total Dynamic Net Payout'}</p>
              <h3 className="text-2xl font-black text-capsule-teal font-mono">{totalPayoutCollected} SAR</h3>
            </div>
            <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${borderSide} border-capsule-gold hover:shadow-md transition`}>
              <p className="text-xs font-bold text-capsule-dark-gold mb-1">{lang === 'ar' ? 'الطلاب بالدورات النشطة' : 'Active Course Students'}</p>
              <h3 className="text-2xl font-black text-capsule-navy font-mono">{totalStudentsEnrolled}</h3>
            </div>
            <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${borderSide} border-capsule-navy hover:shadow-md transition`}>
              <p className="text-xs font-bold text-capsule-navy mb-1">{l.stats.accountStatus}</p>
              <h3 className="text-md font-bold text-emerald-600 mt-1">{l.stats.verified}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-capsule-navy mb-4">
              {lang === 'ar' ? '📊 مؤشرات الكثافة الاستيعابية وصافي الربح لكل دورة' : '📊 Course Density & Net Revenue Breakdown'}
            </h3>
            <div className="space-y-4 pt-1">
              {coursesList.map((course: CourseItem) => {
                const ratio = Math.min((course.students / 1300) * 100, 100);
                return (
                  <div key={course.id} className="bg-gray-50/60 p-3 rounded-xl border border-gray-100/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs font-bold">
                      <span className="text-capsule-navy font-semibold max-w-[45%] truncate">{course.title}</span>
                      <div className="flex items-center gap-3 text-gray-400">
                        <span className="text-gray-500 font-mono text-[11px]">{course.students} {lang === 'ar' ? 'طالب' : 'Students'}</span>
                        <span className="text-capsule-teal font-extrabold font-mono text-[11px]">💰 {calculateCourseEarnings(course.students, course.price)} SAR</span>
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

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-capsule-navy mb-4">
              {lang === 'ar' ? '⚙️ خط التحكم الشامل بالدورات التدريبية' : '⚙️ Interactive Course Pipeline Controls'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-gray-600 text-center border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-capsule-navy font-bold border-b border-gray-100">
                    <th className="py-2.5 px-2 text-start">{lang === 'ar' ? 'اسم الدورة' : 'Course Name'}</th>
                    <th className="py-2.5 px-2">السعر</th>
                    <th className="py-2.5 px-2">الطلاب</th>
                    <th className="py-2.5 px-2 text-emerald-700 bg-emerald-50/30">صافي ربحك</th>
                    <th className="py-2.5 px-2">الحالة</th>
                    <th className="py-2.5 px-2">العمليات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium text-center">
                  {coursesList.map((course: CourseItem) => (
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

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit">
            <h2 className="text-md font-bold text-capsule-navy border-b border-gray-100 pb-3 mb-4">{lang === 'ar' ? '➕ إنشاء وتفصيل دورة جديدة' : '➕ Create Detailed Course'}</h2>
            {message && <div className={`mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold ${borderSide} border-emerald-500`}>{message}</div>}
            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.title} *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" placeholder="معسكر هندسة برمجيات متقدم" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{lang === 'ar' ? 'التصنيف *' : 'Category *'}</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none">
                    <option value="Cybersecurity">{lang === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity'}</option>
                    <option value="Software Engineering">{lang === 'ar' ? 'هندسة البرمجيات' : 'Software Engineering'}</option>
                    <option value="Artificial Intelligence">{lang === 'ar' ? 'الذكاء الاصطناعي' : 'Artificial Intelligence'}</option>
                    <option value="Cloud Computing">{lang === 'ar' ? 'الحوسبة السحابية' : 'Cloud Computing'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{lang === 'ar' ? 'المستوى *' : 'Level *'}</label>
                  <select name="level" value={formData.level} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none">
                    <option value="beginner">{lang === 'ar' ? 'مبتدئ' : 'Beginner'}</option>
                    <option value="intermediate">{lang === 'ar' ? 'متوسط' : 'Intermediate'}</option>
                    <option value="advanced">{lang === 'ar' ? 'متقدم' : 'Advanced'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.price} (SAR) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" placeholder="350" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.duration} *</label>
                  <input type="number" name="durationWeeks" value={formData.durationWeeks} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" placeholder="6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.maxStudents} *</label>
                  <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" placeholder="50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.videoDuration} *</label>
                  <input type="number" name="videoDurationMinutes" value={formData.videoDurationMinutes} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" placeholder="120" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{lang === 'ar' ? 'نبذة ووصف مختصر للدورة *' : 'Short Description *'}</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" placeholder="نبذة توضح محتوى الدورة للطلاب..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{l.form.labels.requirements} *</label>
                <textarea name="requirementsNotes" value={formData.requirementsNotes} onChange={handleInputChange} required rows={2} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold resize-none" placeholder={l.form.placeholders.requirements}></textarea>
              </div>

              <Button type="submit" variant="primary">{l.form.submitBtn}</Button>
            </form>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">{lang === 'ar' ? '⭐ تقييمات الطلاب الحية' : '⭐ Live Student Reviews'}</h4>
            <div className="space-y-2 max-h-[160px] overflow-y-auto divide-y divide-gray-50">
              {reviewsList.map((rev: ReviewItem) => (
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

          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-capsule-navy uppercase tracking-wider">{lang === 'ar' ? '👥 سجل تقدم الطلاب المشتركين' : '👥 Students Progress Log'}</h4>
            <div className="space-y-2 text-[11px] font-medium text-gray-600">
              {progressList.map((student: StudentProgressItem) => (
                <div key={student.id} className="flex justify-between items-center bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                  <div>
                    <p className="font-bold text-capsule-navy">{student.name} (#{student.id})</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[150px]">
                      {lang === 'ar' ? student.courseAr : student.courseEn}
                    </p>
                  </div>
                  <span className="font-mono text-capsule-teal font-bold">{student.progress}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TrainerDashboard;