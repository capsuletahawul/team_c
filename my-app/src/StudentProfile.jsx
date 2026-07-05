import React, { useState, useEffect } from 'react';
// Feature 6 (Academic Tracking & Dashboard Profile)
import { getStudentProfile, updateStudentProfile, getPurchasedCourses } from './mocks/mockApi';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Button from './components/Button.jsx';

function StudentProfile({ onBack }) {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ fullName: '', avatar: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved

  useEffect(() => {
    let isMounted = true;

    Promise.all([getStudentProfile(), getPurchasedCourses()]).then(([profileRes, coursesRes]) => {
      if (!isMounted) return;
      if (profileRes.success) {
        setProfile(profileRes.data);
        setFormValues({ fullName: profileRes.data.fullName, avatar: profileRes.data.avatar });
      }
      if (coursesRes.success) setCourses(coursesRes.data);
      setLoading(false);
    });

    return () => { isMounted = false; };
  }, []);

  const handleChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaveState('saving');
    setFieldErrors({});

    const result = await updateStudentProfile(formValues);

    if (!result.success) {
      setFieldErrors(result.details || {});
      setSaveState('idle');
      return;
    }

    setProfile(result.data);
    setIsEditing(false);
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  const handleCancel = () => {
    setFormValues({ fullName: profile.fullName, avatar: profile.avatar });
    setFieldErrors({});
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message="جاري تحميل ملفك الشخصي..." />
      </div>
    );
  }

  const completedCount = courses.filter(c => c.status === 'Completed').length;
  const activeCount = courses.filter(c => c.status !== 'Completed').length;

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
      <Navbar activePage="profile" />

      <div className="max-w-5xl mx-auto px-6 pt-6">
        <button onClick={onBack} className="text-xs font-bold text-capsule-teal hover:text-capsule-navy transition cursor-pointer">
          → العودة إلى لوحة التحكم
        </button>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {saveState === 'saved' && (
          <div className="mb-6 p-4 bg-emerald-50 border-r-4 border-emerald-500 text-emerald-700 rounded-xl text-xs font-bold shadow-xs">
            ✅ تم حفظ التعديلات بنجاح.
          </div>
        )}

        {/* بطاقة الهيدر الرئيسية */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="bg-capsule-gradient h-28"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-12">
              <img
                src={formValues.avatar || profile.avatar}
                alt="صورة الملف الشخصي"
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover bg-white"
              />

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-0">
                <div>
                  <h1 className="text-xl font-black text-capsule-navy">{profile.fullName}</h1>
                  <p className="text-xs text-gray-400 font-bold mt-1">{profile.email}</p>
                </div>

                {!isEditing && (
                  <Button variant="secondary" onClick={() => setIsEditing(true)}>
                    تعديل الملف الشخصي
                  </Button>
                )}
              </div>
            </div>

            {/* شارات سريعة */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="bg-capsule-teal/10 text-capsule-teal text-xs font-bold px-3 py-1.5 rounded-full">
                {profile.role === 'Student' ? 'طالب' : profile.role}
              </span>
              {profile.companyAffiliation && (
                <span className="bg-capsule-gold/20 text-capsule-dark-gold text-xs font-bold px-3 py-1.5 rounded-full">
                  {profile.companyAffiliation}
                </span>
              )}
              <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-full">
                عضو منذ {profile.joinedAt}
              </span>
            </div>

            {/* نموذج التعديل (Feature 6, Acceptance Criteria 1) */}
            {isEditing && (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h2 className="text-sm font-bold text-capsule-navy mb-4">تعديل البيانات الشخصية</h2>

                {fieldErrors.global && <ErrorMessage message={fieldErrors.global} />}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      value={formValues.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-capsule-teal"
                    />
                    {fieldErrors.fullName && (
                      <p className="text-xs font-bold text-capsule-dark-gold mt-1">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">رابط صورة الملف الشخصي</label>
                    <input
                      type="text"
                      value={formValues.avatar}
                      onChange={(e) => handleChange('avatar', e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-capsule-teal"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="primary" onClick={handleSave} disabled={saveState === 'saving'}>
                    {saveState === 'saving' ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>إلغاء</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ملخص التقدم الدراسي (Feature 6, Acceptance Criteria 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">الدورات الجارية</p>
            <p className="text-2xl font-black text-capsule-teal">{activeCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">الدورات المكتملة</p>
            <p className="text-2xl font-black text-emerald-600">{completedCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">إجمالي الدورات المسجلة</p>
            <p className="text-2xl font-black text-capsule-navy">{courses.length}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudentProfile;
