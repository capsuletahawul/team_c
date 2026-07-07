import React, { useState, useEffect } from 'react';
import { getStudentProfile, getPurchasedCourses, getNotifications } from '../mocks/mockApi.js';

// Reusable Components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Button from '../components/Button.jsx';

// Global Context
import { useLanguage } from '../context/LanguageContext.jsx';

function StudentDashboard({ onNavigateToProfile }) {
  const { t, lang } = useLanguage();
  const l = t.studentDashboard;

  const [profile, setProfile] = useState(null);
  
  // Hardcoded mock data using translation keys to ensure bilingual functionality 
  // before the backend is fully translated.
  const [courses, setCourses] = useState([
    { id: 1, titleKey: 'course1Title', catKey: 'course1Cat', durKey: 'course1Dur', progress: 45, status: 'Active' },
    { id: 2, titleKey: 'course2Title', catKey: 'course2Cat', durKey: 'course2Dur', progress: 100, status: 'Completed' }
  ]);
  const [notifications, setNotifications] = useState([
    { notificationId: 1, titleKey: 'notif1Title', msgKey: 'notif1Msg', isRead: false },
    { notificationId: 2, titleKey: 'notif2Title', msgKey: 'notif2Msg', isRead: true }
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    // We still fetch the profile data from the mock API. 
    // The courses and notifications are handled via local state above for translation mapping purposes.
    getStudentProfile()
      .then((profileRes) => {
        if (!isMounted) return;

        if (!profileRes.success) {
          setError(l.errorProfile);
        } else {
          setProfile(profileRes.data);
        }

        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(l.errorNetwork);
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [lang, l.errorProfile, l.errorNetwork]); // Refetch/update on lang change

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  const activeCourses = courses.filter(c => c.status !== 'Completed');
  const completedCourses = courses.filter(c => c.status === 'Completed');
  const unreadNotifications = notifications.filter(n => !n.isRead);

  // Extract first name for the greeting
  const firstName = profile?.fullName?.split(' ')[0] || l.hero.fallbackName;

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased flex flex-col" dir={t.dir}>
      <Navbar activePage="dashboard" showAuthButtons={false} />

      <main className="flex-grow">
        {error && (
          <div className="max-w-7xl mx-auto px-6 pt-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Hero Section */}
        <div className="relative bg-capsule-gradient text-white py-10 px-8 overflow-hidden shadow-inner">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-capsule-gold text-xs font-bold uppercase tracking-wider mb-1">
                {l.hero.badge}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {l.hero.welcomePrefix} {firstName} {l.hero.welcomeSuffix}
              </h1>
              <p className="text-gray-200 text-sm mt-2 max-w-lg">
                {l.hero.subtitle}
              </p>
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={onNavigateToProfile}
              className={`flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-3 transition cursor-pointer ${t.dir === 'rtl' ? 'pl-5' : 'pr-5'}`}
            >
              <img
                src={profile?.avatar || 'https://via.placeholder.com/150'}
                alt="Profile Avatar"
                className="w-12 h-12 rounded-full border-2 border-capsule-gold object-cover"
              />
              <div className={t.dir === 'rtl' ? 'text-right' : 'text-left'}>
                <p className="text-sm font-bold text-white">{profile?.fullName}</p>
                <p className="text-xs text-gray-300">{l.hero.viewProfile}</p>
              </div>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.activeCourses}</p>
              <p className="text-2xl font-black text-capsule-teal">{activeCourses.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.completedCourses}</p>
              <p className="text-2xl font-black text-emerald-600">{completedCourses.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.unreadNotifs}</p>
              <p className="text-2xl font-black text-capsule-dark-gold">{unreadNotifications.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.affiliation}</p>
              <p className="text-base font-black text-capsule-navy mt-1 truncate">
                {profile?.companyAffiliation || l.stats.independent}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Resume Learning Section */}
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h2 className="text-base font-bold text-capsule-navy">{l.resume.title}</h2>
              </div>

              {courses.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-sm font-bold text-gray-400">{l.resume.empty}</p>
                  <div className="mt-4 inline-block">
                    <Button variant="primary">{l.resume.browseBtn}</Button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {courses.map((course) => (
                    <div key={course.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-capsule-navy text-sm">{l.mockData[course.titleKey]}</p>
                        <p className="text-xs text-gray-400 mt-1">{l.mockData[course.catKey]} · {l.mockData[course.durKey]}</p>

                        <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
                          <div
                            className="bg-capsule-teal h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 mt-1">{course.progress}% {l.resume.completedProgress}</p>
                      </div>

                      <Button variant={course.status === 'Completed' ? 'secondary' : 'primary'}>
                        {course.status === 'Completed' ? l.resume.certBtn : l.resume.continueBtn}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Section */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden h-fit">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-base font-bold text-capsule-navy">{l.notifications.title}</h2>
              </div>

              {notifications.length === 0 ? (
                <p className="p-6 text-xs font-bold text-gray-400 text-center">{l.notifications.empty}</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((note) => (
                    <div key={note.notificationId} className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-capsule-navy">{l.mockData[note.titleKey]}</p>
                        {!note.isRead && (
                          <span className="w-2 h-2 rounded-full bg-capsule-dark-gold mt-1 flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{l.mockData[note.msgKey]}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudentDashboard;