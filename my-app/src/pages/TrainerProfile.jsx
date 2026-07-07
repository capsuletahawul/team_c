import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import { EnvelopeIcon, PhoneIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';

export default function TrainerProfile() {
  const { t } = useLanguage();
  const l = t.trainerProfile;
  const isRTL = t.dir === 'rtl';

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saveState, setSaveState] = useState('idle');

  // Mock API Data
  const [trainer, setTrainer] = useState({
    name: isRTL ? "أ. أحمد القحطاني" : "Mr. Ahmed Al-Qahtani",
    specialty: isRTL ? "تطوير الويب" : "Web Development",
    bio: isRTL ? "مدرب معتمد في React و JavaScript وتطوير تطبيقات الويب الحديثة." : "Certified trainer in React, JavaScript, and modern web application development.",
    email: "ahmed@capsule.sa",
    phone: "0551234567",
    experience: 8,
    students: 205,
    rating: 4.9,
  });

  const [formValues, setFormValues] = useState({ name: trainer.name, specialty: trainer.specialty, bio: trainer.bio });

  // The trainer sees ALL their courses, including 'underReview'
  const [allCourses] = useState([
    { id: 1, title: "React Bootcamp", students: 120, status: 'published' },
    { id: 2, title: "JavaScript Advanced", students: 85, status: 'published' },
    { id: 3, title: "Next.js Fundamentals", students: 0, status: 'underReview' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveState('saving');
    setTimeout(() => {
      setTrainer({ ...trainer, ...formValues });
      setIsEditing(false);
      setSaveState('idle');
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-capsule-bg">
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  return (
    <div dir={t.dir} className="min-h-screen bg-capsule-bg flex flex-col font-sans text-capsule-navy antialiased">
      <Navbar activePage="profile" showAuthButtons={false} />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-capsule-navy">{l.heroTitle}</h1>
            <p className="text-sm text-gray-500 mt-1">{isRTL ? "إدارة بياناتك ودوراتك التدريبية" : "Manage your data and training courses"}</p>
          </div>
          {!isEditing && (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              {isRTL ? "تعديل الملف الشخصي" : "Edit Profile"}
            </Button>
          )}
        </div>

        {/* 1. PROFILE INFO / EDIT FORM */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-slate-200/40">
          {!isEditing ? (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-28 h-28 rounded-full bg-capsule-teal text-white flex items-center justify-center text-4xl font-black shrink-0">
                {trainer.name.charAt(isRTL ? 3 : 0)}
              </div>
              <div className={`flex-1 ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                <h2 className="text-2xl font-black mb-2">{trainer.name}</h2>
                <p className="text-capsule-teal font-semibold mb-3">{trainer.specialty}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-semibold text-gray-500 mb-4">
                  <span dir="ltr">📧 {trainer.email}</span> | <span dir="ltr">📱 {trainer.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-flex">
                  <BriefcaseIcon className="w-4 h-4 text-capsule-teal" /><span>{l.experience}{trainer.experience}{l.years}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-gray-600 max-w-2xl mx-auto md:mx-0">{trainer.bio}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">{l.form.name}</label>
                  <input type="text" required value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-capsule-teal" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">{isRTL ? "التخصص" : "Specialty"}</label>
                  <input type="text" required value={formValues.specialty} onChange={(e) => setFormValues({ ...formValues, specialty: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-capsule-teal" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">{isRTL ? "النبذة التعريفية" : "Bio"}</label>
                <textarea required rows={3} value={formValues.bio} onChange={(e) => setFormValues({ ...formValues, bio: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-capsule-teal resize-none" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" variant="primary" disabled={saveState === 'saving'}>
                  {saveState === 'saving' ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ التغييرات' : 'Save Changes')}
                </Button>
                <Button type="button" variant="secondary" onClick={() => { setIsEditing(false); setFormValues({ name: trainer.name, specialty: trainer.specialty, bio: trainer.bio }); }}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* 2. STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-400 font-bold">{l.stats.courses}</p>
            <h3 className="text-3xl font-black mt-2 text-capsule-navy">{allCourses.length}</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-400 font-bold">{l.stats.students}</p>
            <h3 className="text-3xl font-black mt-2 text-capsule-teal">{trainer.students}</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-400 font-bold">{l.stats.rating}</p>
            <div className="flex items-center gap-2 mt-2">
              <h3 className="text-3xl font-black text-capsule-dark-gold">{trainer.rating}</h3>
              <SolidStar className="w-7 h-7 text-capsule-dark-gold" />
            </div>
          </div>
        </div>

        {/* 3. MANAGEMENT COURSES TABLE (Shows Review Status) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/70">
            <h2 className="text-base font-bold text-capsule-navy">{l.coursesTitle}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
              <thead>
                <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                  <th className="p-4">{l.thName}</th>
                  <th className="p-4 text-center">{l.thStudents}</th>
                  <th className="p-4 text-center">{isRTL ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {allCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-capsule-navy">{course.title}</td>
                    <td className="p-4 text-center text-gray-500 font-mono text-base">{course.students}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold min-w-[95px] ${course.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {course.status === 'published' ? (isRTL ? 'منشور' : 'Published') : (isRTL ? 'قيد المراجعة' : 'Under Review')}
                      </span>
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