import React, { useState, useEffect } from 'react';
import { getAdminDashboardMetrics } from '../mocks/mockApi.js';

// Reusable Components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import Button from '../components/Button.jsx';

// Global Context
import { useLanguage } from '../context/LanguageContext.jsx';

function AdminDashboard() {
  const { t, lang } = useLanguage();
  const l = t.admin;

  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replaced hardcoded strings with keys for seamless translation
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      titleKey: 'course1', 
      trainerKey: 'trainer1', 
      durationKey: 'duration1', 
      durationNum: 22, 
      status: 'pending' 
    },
    { 
      id: 2, 
      titleKey: 'course2', 
      trainerKey: 'trainer2', 
      durationKey: 'duration2', 
      durationNum: 15, 
      status: 'pending' 
    }
  ]);

  useEffect(() => {
    getAdminDashboardMetrics().then(result => {
      if (result.success) {
        setAdminStats(result.data); 
      }
      setLoading(false);
    });
  }, []);

  const handleApprove = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: 'approved' } : course
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
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased" dir={t.dir}>
      <Navbar activePage="home" />

      {/* Admin Hero Section */}
      <div className="relative bg-capsule-gradient text-white py-14 px-8 overflow-hidden shadow-inner">
        <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block opacity-80 ${t.dir === 'rtl' ? 'left-[-40px]' : 'right-[-40px]'}`}>
          <div className="relative w-80 h-40">
            <div className={`absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full ${t.dir === 'rtl' ? 'rotate-[-25deg]' : 'rotate-[25deg]'}`}></div>
            <div className={`absolute w-64 h-20 bg-capsule-gold rounded-full top-12 shadow-lg ${t.dir === 'rtl' ? 'rotate-[-25deg] left-10' : 'rotate-[25deg] right-10'}`}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl font-extrabold text-white">{l.hero.title}</h1>
          <p className="text-gray-200 text-sm max-w-xl mt-2">{l.hero.subtitle}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.activeUsers}</p>
            <p className="text-2xl font-black text-capsule-navy">{adminStats?.activeUserLoginsToday}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.totalCourses}</p>
            <p className="text-2xl font-black text-capsule-teal">{adminStats?.publishedCoursesCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.pendingReports}</p>
            <p className="text-2xl font-black text-capsule-dark-gold">{adminStats?.pendingReportFlagsCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.serverStatus}</p>
            <p className="text-base font-black text-emerald-600 uppercase mt-1">{adminStats?.serverResourceDistribution}</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-base font-bold text-capsule-navy">{l.table.title}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <thead>
                <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                  <th className="p-4">{l.table.colCourse}</th>
                  <th className="p-4">{l.table.colTrainer}</th>
                  <th className="p-4">{l.table.colDuration}</th>
                  <th className="p-4">{l.table.colStatus}</th>
                  <th className="p-4 text-center">{l.table.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 text-capsule-navy font-bold">{l.mockData[course.titleKey]}</td>
                    <td className="p-4 text-gray-500">{l.mockData[course.trainerKey]}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${course.durationNum > 20 ? 'bg-amber-50 text-capsule-dark-gold' : 'bg-teal-50 text-capsule-teal'}`}>
                        {l.mockData[course.durationKey]}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${course.status === 'approved' ? 'text-emerald-600' : 'text-capsule-dark-gold'}`}>
                        {l.actions[course.status]}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center">
                      {course.status === 'pending' ? (
                        <Button variant="primary" onClick={() => handleApprove(course.id)}>
                          {l.actions.approveBtn}
                        </Button>
                      ) : (
                        <span className="text-emerald-600 text-xs font-bold mt-2 inline-block">
                          {l.actions.approvedLabel}
                        </span>
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